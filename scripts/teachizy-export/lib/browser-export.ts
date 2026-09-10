import fs from 'node:fs';
import path from 'node:path';
import { chromium, type BrowserContext, type Page, type Response } from 'playwright';
import {
  DEFAULT_ADMIN_URL,
  DEFAULT_STORE_URL,
  LOGIN_TIMEOUT_MS,
  MAX_RETRIES,
  REQUEST_DELAY_MS,
  authDir,
  exportRoot,
  fingerprintsPath,
  storageStatePath,
} from './config';
import { ensureDir, isPdfBuffer, isSpreadsheetBuffer, looksLikeHtml, readJson, writeJson } from './fs-utils';
import { sha256Buffer, sha256File } from './hash';
import { sanitizeUrlForManifest, sleep, slugify, padOrder } from './slug';
import type {
  AssetKind,
  TeachizyAsset,
  TeachizyFormation,
  TeachizyLesson,
  TeachizyModule,
} from './types';

export interface BrowserExportOptions {
  adminUrl: string;
  storeUrl: string;
  inventoryOnly: boolean;
  /** Titre exact ou partiel de la formation à traiter (1re correspondance). */
  formationFilter?: string;
  /** Nombre max de formations à télécharger (défaut 1 au premier essai). */
  maxFormations: number;
  headed: boolean;
}

interface FingerprintIndex {
  bySha256: Record<string, string>;
  bySourceId: Record<string, string>;
}

interface CapturedJson {
  url: string;
  body: unknown;
}

interface ExtractedAsset {
  kind: AssetKind;
  url: string;
  name: string;
  linkHost?: string | null;
  linkCaption?: string | null;
}

function loadFingerprints(): FingerprintIndex {
  return (
    readJson<FingerprintIndex>(fingerprintsPath()) ?? {
      bySha256: {},
      bySourceId: {},
    }
  );
}

function saveFingerprints(idx: FingerprintIndex): void {
  writeJson(fingerprintsPath(), idx);
}

function isProbablyPdfUrl(url: string): boolean {
  const lower = url.toLowerCase();
  if (lower.includes('.pdf')) return true;
  if (lower.includes('application/pdf')) return true;
  return false;
}

function extFromUrl(url: string): string {
  try {
    const pathname = new URL(url).pathname;
    const m = pathname.match(/\.([a-z0-9]+)$/i);
    return (m?.[1] || '').toLowerCase();
  } catch {
    const m = url.split('?')[0].match(/\.([a-z0-9]+)$/i);
    return (m?.[1] || '').toLowerCase();
  }
}

function kindFromFileUrl(url: string): AssetKind {
  const ext = extFromUrl(url);
  if (ext === 'pdf') return 'pdf';
  if (ext === 'xlsx') return 'xlsx';
  if (ext === 'xls') return 'xls';
  return 'file';
}

/** Extrait PDF, Excel et liens depuis le JSON training_item de la leçon. */
function extractLessonAssetsFromTrainingItemJson(
  body: unknown,
  expectedItemId?: string
): ExtractedAsset[] {
  const out: ExtractedAsset[] = [];
  if (!body || typeof body !== 'object') return out;
  const data = (body as { data?: Record<string, unknown> }).data;
  if (!data || typeof data !== 'object') return out;
  if (expectedItemId && String(data.id) !== String(expectedItemId)) return out;
  const lessonName = typeof data.name === 'string' ? data.name : 'support';
  const content = data.content;
  if (!Array.isArray(content)) return out;

  for (const block of content) {
    if (!block || typeof block !== 'object') continue;
    const b = block as { type?: string; data?: Record<string, unknown> };
    if (!b.data) continue;

    if (b.type === 'resource' || b.type === 'pdf_viewer') {
      const pathVal = b.data.path;
      if (typeof pathVal !== 'string' || !/^https?:\/\//i.test(pathVal)) continue;
      const kind = b.type === 'pdf_viewer' ? 'pdf' : kindFromFileUrl(pathVal);
      if (b.type === 'pdf_viewer' && kind !== 'pdf') continue;
      const name =
        (typeof b.data.name === 'string' && b.data.name) ||
        (typeof b.data.caption === 'string' && b.data.caption) ||
        (b.type === 'pdf_viewer' ? `${lessonName} (visionneuse)` : lessonName);
      out.push({ kind, url: pathVal, name });
      continue;
    }

    if (b.type === 'url') {
      const linkUrl = b.data.url;
      if (typeof linkUrl !== 'string' || !/^https?:\/\//i.test(linkUrl)) continue;
      const title =
        (typeof b.data.title === 'string' && b.data.title) ||
        (typeof b.data.caption === 'string' && b.data.caption) ||
        (typeof b.data.host === 'string' && b.data.host) ||
        lessonName;
      out.push({
        kind: 'link',
        url: linkUrl,
        name: title,
        linkHost: typeof b.data.host === 'string' ? b.data.host : null,
        linkCaption: typeof b.data.caption === 'string' ? b.data.caption : null,
      });
    }
  }
  return out;
}

function stripSensitiveUrl(url: string): string {
  return sanitizeUrlForManifest(url) ?? url.split('?')[0];
}

/** Pour les liens externes : retire les query trop sensibles, garde l’URL utile (ex. Tally). */
function sanitizeExternalLink(url: string): string {
  try {
    const u = new URL(url);
    // Supprimer jetons courants éventuels
    for (const key of [...u.searchParams.keys()]) {
      if (/token|signature|sig|auth|key|password|secret/i.test(key)) {
        u.searchParams.delete(key);
      }
    }
    return u.toString();
  } catch {
    return url.split('#')[0];
  }
}

/**
 * Extrait des URL de fichiers depuis un JSON arbitraire (sans endpoint inventé).
 * Ne conserve que les chaînes ressemblant à des PDF / fichiers storage.
 */
function collectPdfUrlsFromJson(value: unknown, out: Set<string>, depth = 0): void {
  if (depth > 12 || value == null) return;
  if (typeof value === 'string') {
    if (
      /^https?:\/\//i.test(value) &&
      (isProbablyPdfUrl(value) ||
        /\/storage\//i.test(value) ||
        /\/uploads?\//i.test(value) ||
        /\/media\//i.test(value) ||
        /\/files?\//i.test(value))
    ) {
      out.add(value);
    }
    return;
  }
  if (Array.isArray(value)) {
    for (const v of value) collectPdfUrlsFromJson(v, out, depth + 1);
    return;
  }
  if (typeof value === 'object') {
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      const key = k.toLowerCase();
      if (
        typeof v === 'string' &&
        /^https?:\/\//i.test(v) &&
        (key.includes('url') ||
          key.includes('file') ||
          key.includes('pdf') ||
          key.includes('path') ||
          key.includes('src') ||
          key.includes('media') ||
          key.includes('attachment') ||
          key.includes('download'))
      ) {
        out.add(v);
      }
      collectPdfUrlsFromJson(v, out, depth + 1);
    }
  }
}

/** Heuristique : payload proche de l’API documentée trainings/items. */
function tryParseTrainingsPayload(body: unknown): TeachizyFormation[] | null {
  if (!body || typeof body !== 'object') return null;
  const data = (body as { data?: unknown }).data;
  if (!Array.isArray(data) || data.length === 0) return null;

  const first = data[0] as Record<string, unknown>;
  // Liste de formations : uuid + name
  if (typeof first.uuid === 'string' && typeof first.name === 'string' && !('order' in first)) {
    return data.map((t) => {
      const row = t as { uuid: string; name: string };
      return {
        sourceId: row.uuid,
        title: row.name,
        sourcePageUrl: null,
        modules: [],
        rootLessons: [],
      } satisfies TeachizyFormation;
    });
  }

  // Items d’une formation : order + name + type
  if ('order' in first && 'name' in first && 'type' in first) {
    return null; // géré ailleurs avec le contexte formation
  }

  return null;
}

function parseItemsToModules(data: unknown[]): {
  modules: TeachizyModule[];
  rootLessons: TeachizyLesson[];
} {
  const modules: TeachizyModule[] = [];
  const rootLessons: TeachizyLesson[] = [];

  for (const raw of data) {
    const item = raw as {
      id: string | number;
      order: number;
      name: string;
      type: string;
      children?: Array<{ id: string | number; order: number; name: string; type: string }>;
    };
    if (item.type === 'SECTION' && Array.isArray(item.children) && item.children.length) {
      modules.push({
        sourceId: String(item.id),
        title: item.name,
        order: item.order,
        lessons: item.children
          .slice()
          .sort((a, b) => a.order - b.order)
          .map((c) => ({
            sourceId: String(c.id),
            title: c.name,
            order: c.order,
            type: c.type,
            sourcePageUrl: null,
            assets: [],
          })),
      });
    } else {
      rootLessons.push({
        sourceId: String(item.id),
        title: item.name,
        order: item.order,
        type: item.type,
        sourcePageUrl: null,
        assets: [],
      });
    }
  }

  modules.sort((a, b) => a.order - b.order);
  rootLessons.sort((a, b) => a.order - b.order);
  return { modules, rootLessons };
}

async function waitForEnterOrFile(label: string, signalFile: string): Promise<void> {
  console.log(`\n=== ${label} ===`);
  console.log('Quand c’est prêt : Entrée dans ce terminal, ou créez le fichier signal :');
  console.log(`  ${signalFile}\n`);

  if (fs.existsSync(signalFile)) fs.unlinkSync(signalFile);

  await new Promise<void>((resolve, reject) => {
    const timer = setTimeout(() => {
      cleanup();
      reject(new Error(`Délai dépassé (${LOGIN_TIMEOUT_MS / 60000} min) — ${label}`));
    }, LOGIN_TIMEOUT_MS);

    const onData = () => {
      cleanup();
      resolve();
    };

    const poll = setInterval(() => {
      if (fs.existsSync(signalFile)) {
        cleanup();
        try {
          fs.unlinkSync(signalFile);
        } catch {
          /* ignore */
        }
        resolve();
      }
    }, 1000);

    function cleanup() {
      clearTimeout(timer);
      clearInterval(poll);
      process.stdin.off('data', onData);
    }

    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', onData);
  });
}

async function waitForManualLogin(page: Page): Promise<void> {
  console.log('\n=== Connexion Teachizy ===');
  console.log('1. Connectez-vous dans la fenêtre du navigateur (ne partagez pas votre mot de passe ici).');
  console.log('2. Une fois dans le tableau de bord admin, revenez dans ce terminal.');
  await waitForEnterOrFile(
    'Confirmer la connexion',
    path.join(authDir(), 'continue-login')
  );

  ensureDir(authDir());
  await page.context().storageState({ path: storageStatePath() });
  console.log(`Session enregistrée localement : ${storageStatePath()} (hors Git).\n`);
}

function attachNetworkCapture(page: Page, bucket: CapturedJson[], pdfHits: Set<string>): void {
  page.on('response', async (response: Response) => {
    try {
      const url = response.url();
      const ct = (response.headers()['content-type'] || '').toLowerCase();
      const status = response.status();
      if (status < 200 || status >= 400) return;

      if (
        ct.includes('application/pdf') ||
        isProbablyPdfUrl(url) ||
        /\.xlsx(\?|$)/i.test(url) ||
        /\.xls(\?|$)/i.test(url) ||
        ct.includes('spreadsheet') ||
        ct.includes('officedocument')
      ) {
        pdfHits.add(url);
      }

      if (!ct.includes('json') && !ct.includes('javascript')) {
        // certains endpoints renvoient JSON sans content-type clair
        if (!url.includes('api.teachizy.fr') && !url.includes('/api/')) return;
      }

      if (ct.includes('json') || url.includes('api.teachizy.fr') || url.includes('/api/')) {
        const text = await response.text();
        if (!text || text.length > 5_000_000) return;
        try {
          bucket.push({ url, body: JSON.parse(text) });
        } catch {
          /* ignore non-JSON */
        }
      }
    } catch {
      /* réponse déjà consommée / navigation */
    }
  });
}

/**
 * Parcourt les liens visibles de la page courante (sans sélecteurs inventés :
 * uniquement getByRole link + href).
 */
async function collectVisibleLinks(page: Page): Promise<Array<{ text: string; href: string }>> {
  // String evaluate : évite l’injection __name de tsx dans le navigateur
  return page.evaluate(`(() => {
    const out = [];
    for (const a of Array.from(document.querySelectorAll('a[href]'))) {
      const href = a.href;
      const text = (a.textContent || '').trim().replace(/\\s+/g, ' ');
      if (href && text) out.push({ text, href });
    }
    return out;
  })()`) as Promise<Array<{ text: string; href: string }>>;
}

async function expandCollapsed(page: Page): Promise<void> {
  await page.evaluate(`(() => {
    const nodes = Array.from(document.querySelectorAll('[aria-expanded="false"]'));
    for (const n of nodes) {
      if (n instanceof HTMLElement) n.click();
    }
  })()`);
  await sleep(400);
}

async function downloadFileWithContext(
  context: BrowserContext,
  url: string,
  kind: AssetKind
): Promise<{ ok: true; buffer: Buffer } | { ok: false; reason: string }> {
  let lastErr = 'échec inconnu';
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await context.request.get(url, { timeout: 60_000 });
      if (!res.ok()) {
        lastErr = `HTTP ${res.status()}`;
        if (res.status() === 401 || res.status() === 403) {
          return { ok: false, reason: `inaccessible (${lastErr})` };
        }
        await sleep(REQUEST_DELAY_MS * attempt);
        continue;
      }
      const buf = Buffer.from(await res.body());
      if (looksLikeHtml(buf)) {
        return { ok: false, reason: 'réponse HTML (probable page de connexion), non téléchargé' };
      }
      if (kind === 'pdf' && !isPdfBuffer(buf)) {
        return { ok: false, reason: 'contenu non-PDF' };
      }
      if ((kind === 'xlsx' || kind === 'xls') && !isSpreadsheetBuffer(buf, kind)) {
        return { ok: false, reason: `contenu non-${kind}` };
      }
      return { ok: true, buffer: buf };
    } catch (e) {
      lastErr = e instanceof Error ? e.message : String(e);
      await sleep(REQUEST_DELAY_MS * attempt);
    }
  }
  return { ok: false, reason: lastErr };
}

function lessonDir(
  formationSlug: string,
  moduleOrder: number,
  moduleTitle: string,
  lessonOrder: number,
  lessonTitle: string
): string {
  const mod = `${padOrder(moduleOrder)}-${slugify(moduleTitle)}`;
  const les = `${padOrder(lessonOrder)}-${slugify(lessonTitle)}`;
  return path.join(exportRoot(), formationSlug, mod, les);
}

function fileExtForKind(kind: AssetKind, url: string): string {
  if (kind === 'pdf') return 'pdf';
  if (kind === 'xlsx') return 'xlsx';
  if (kind === 'xls') return 'xls';
  const ext = extFromUrl(url);
  return ext || 'bin';
}

async function ensureAssetDownloaded(
  context: BrowserContext,
  asset: TeachizyAsset,
  destDir: string,
  fileIndex: number,
  fingerprints: FingerprintIndex
): Promise<void> {
  if (asset.kind === 'link') {
    asset.status = 'recorded';
    asset.sourceUrlSafe = asset.sourceUrlSafe ? sanitizeExternalLink(asset.sourceUrlSafe) : null;
    return;
  }

  if (
    asset.status === 'downloaded' &&
    asset.localPath &&
    fs.existsSync(path.join(exportRoot(), asset.localPath))
  ) {
    return;
  }
  if (fingerprints.bySourceId[asset.sourceId]) {
    asset.status = 'skipped_duplicate';
    asset.localPath = fingerprints.bySourceId[asset.sourceId];
    asset.error = 'doublon sourceId';
    return;
  }

  const rawUrl = (asset as TeachizyAsset & { _rawUrl?: string })._rawUrl;
  const url = rawUrl || asset.sourceUrlSafe;
  if (!url) {
    asset.status = 'inaccessible';
    asset.error = 'URL fichier absente';
    return;
  }

  await sleep(REQUEST_DELAY_MS);
  const result = await downloadFileWithContext(context, url, asset.kind);
  if (result.ok === false) {
    const reason = result.reason;
    asset.status = reason.startsWith('inaccessible') ? 'inaccessible' : 'error';
    if (reason.includes('non-') || reason.includes('HTML')) {
      asset.status = 'invalid_file';
    }
    asset.error = reason;
    return;
  }

  const hash = sha256Buffer(result.buffer);
  ensureDir(destDir);
  const ext = fileExtForKind(asset.kind, url);
  const baseName = `${padOrder(fileIndex)}-${slugify(asset.originalTitle) || 'support'}.${ext}`;
  let localPath = path.join(destDir, baseName);
  if (fs.existsSync(localPath)) {
    localPath = path.join(
      destDir,
      `${padOrder(fileIndex)}-${slugify(asset.originalTitle)}-${hash.slice(0, 8)}.${ext}`
    );
  }

  if (fingerprints.bySha256[hash]) {
    const existing = path.join(exportRoot(), fingerprints.bySha256[hash]);
    if (fs.existsSync(existing)) fs.copyFileSync(existing, localPath);
    else fs.writeFileSync(localPath, result.buffer);
    asset.localPath = path.relative(exportRoot(), localPath);
    asset.bytes = result.buffer.length;
    asset.sha256 = hash;
    asset.status = 'skipped_duplicate';
    asset.error = `contenu identique à ${fingerprints.bySha256[hash]}`;
    fingerprints.bySourceId[asset.sourceId] = asset.localPath;
    return;
  }

  fs.writeFileSync(localPath, result.buffer);
  asset.localPath = path.relative(exportRoot(), localPath);
  asset.bytes = result.buffer.length;
  asset.sha256 = await sha256File(localPath);
  asset.status = 'downloaded';
  fingerprints.bySha256[hash] = asset.localPath;
  fingerprints.bySourceId[asset.sourceId] = asset.localPath;
}

function writeLessonLinksJson(destDir: string, links: TeachizyAsset[]): void {
  if (!links.length) return;
  ensureDir(destDir);
  const payload = links.map((l) => ({
    title: l.originalTitle,
    url: l.sourceUrlSafe,
    host: l.linkHost ?? null,
    caption: l.linkCaption ?? null,
    status: l.status,
  }));
  writeJson(path.join(destDir, 'liens.json'), payload);
}

function attachRawUrl(asset: TeachizyAsset, raw: string): TeachizyAsset {
  const a = asset as TeachizyAsset & { _rawUrl?: string };
  a._rawUrl = raw;
  return a;
}

function makeFileAsset(
  sourceId: string,
  kind: AssetKind,
  title: string,
  pageUrl: string,
  fileUrl: string,
  extra?: { linkHost?: string | null; linkCaption?: string | null }
): TeachizyAsset {
  const safe = kind === 'link' ? sanitizeExternalLink(fileUrl) : stripSensitiveUrl(fileUrl);
  return attachRawUrl(
    {
      sourceId,
      kind,
      originalTitle: title,
      sourcePageUrl: stripSensitiveUrl(pageUrl),
      sourceUrlSafe: safe,
      localPath: null,
      bytes: null,
      sha256: null,
      status: 'pending',
      linkHost: extra?.linkHost ?? null,
      linkCaption: extra?.linkCaption ?? null,
    },
    fileUrl
  );
}

const ADMIN_NAV_TITLES = new Set(
  [
    'Mon compte',
    'Abonnement',
    'Programme affilié',
    'Assistants IA',
    'Communauté',
    'Calendrier',
    'Statistiques',
    'Formations',
    'Gérer les formations',
    'Certificat de réussite',
    'Classes virtuelles',
    'Packs',
    'Ventes',
    'Codes promo',
    'Suivi / Tracking',
    'Autorépondeurs',
    'Automatisations (Zapier...)',
    'Emails',
    'Personnalisation',
    'Affiliation',
    'Intégrations externes',
    'Nos offres',
    'Général',
    'Équipe',
    'Paiements',
    'Entreprise',
    'Référencement SEO',
    'Liens légaux et RGPD',
    'APIs développeur',
    'Facturation',
    'Retour aux formations',
    'Contenu',
    'Prix',
    'Descriptions',
    'Commentaires',
    "Revenir à l'accueil",
  ].map((s) => s.toLowerCase())
);

function cleanFormationTitle(raw: string): string {
  return raw
    .replace(/\s*\|\s*Teachizy\s*$/i, '')
    .replace(/^Contenu\s*[-–—]\s*/i, '')
    .replace(/\s*–\s*MAJ.*$/i, '')
    .trim();
}

function isAdminNoiseTitle(title: string): boolean {
  const t = title.replace(/Nouveauté\s*Nouveau/gi, '').trim().toLowerCase();
  if (ADMIN_NAV_TITLES.has(t)) return true;
  if (/^statistiques\b/i.test(t) && /forfait/i.test(t)) return true;
  return false;
}

function formationUuidFromUrl(url: string): string | null {
  const m = url.match(/\/formations\/([0-9a-f-]{36})/i);
  return m?.[1] ?? null;
}

/**
 * Inventaire depuis la page Contenu Teachizy :
 * - chapitres : blocs .tiscomp
 * - leçons : liens a.tilcomp vers /editor/{id} (découverts en session, pas inventés)
 */
async function inventoryContentTree(page: Page): Promise<TeachizyFormation> {
  const pageUrl = page.url();
  const uuid = formationUuidFromUrl(pageUrl);
  const rawTitle = await page.title().catch(() => 'Formation');
  const title = cleanFormationTitle(rawTitle);

  const tree = (await page.evaluate(`(() => {
    const chapters = [];
    const boxes = Array.from(document.querySelectorAll('.tiscomp'));
    for (const box of boxes) {
      const nameEl = box.querySelector('.tiscomp_name, h2');
      let chapterTitle = nameEl ? (nameEl.innerText || nameEl.textContent || '').trim() : '';
      chapterTitle = chapterTitle.replace(/\\(\\d+\\s+contenus?\\s+p[ée]dagogiques?\\)/i, '').trim();
      if (!chapterTitle) continue;
      const lessons = [];
      for (const a of Array.from(box.querySelectorAll('a.tilcomp[href*="/editor/"]'))) {
        const href = a.href;
        const text = (a.textContent || '').replace(/\\s+/g, ' ').trim();
        const m = href.match(/\\/editor\\/(\\d+)/);
        if (!m || !text) continue;
        lessons.push({ id: m[1], title: text, href });
      }
      chapters.push({ title: chapterTitle, lessons });
    }

    // Fallback : tous les liens éditeur si aucun chapitre
    if (!chapters.length || chapters.every((c) => !c.lessons.length)) {
      const lessons = [];
      const seen = new Set();
      for (const a of Array.from(document.querySelectorAll('a.tilcomp[href*="/editor/"], a[href*="/editor/"]'))) {
        const href = a.href;
        const text = (a.textContent || '').replace(/\\s+/g, ' ').trim();
        const m = href.match(/\\/editor\\/(\\d+)/);
        if (!m || !text || seen.has(m[1])) continue;
        seen.add(m[1]);
        lessons.push({ id: m[1], title: text, href });
      }
      return { chapters: [{ title: 'Contenu', lessons }] };
    }
    return { chapters };
  })()`)) as {
    chapters: Array<{ title: string; lessons: Array<{ id: string; title: string; href: string }> }>;
  };

  const modules: TeachizyModule[] = tree.chapters
    .map((ch, i) => ({
      sourceId: `chapter-${i + 1}-${slugify(ch.title)}`,
      title: ch.title,
      order: i + 1,
      lessons: ch.lessons.map((l, j) => ({
        sourceId: l.id,
        title: l.title,
        order: j + 1,
        sourcePageUrl: stripSensitiveUrl(l.href),
        assets: [],
      })),
    }))
    .filter((m) => m.lessons.length > 0);

  return {
    sourceId: uuid || `dom-formation-${Date.now()}`,
    title,
    sourcePageUrl: stripSensitiveUrl(pageUrl),
    modules,
    rootLessons: [],
  };
}

async function clickLessonByTitle(page: Page, title: string): Promise<boolean> {
  // Préférer le lien éditeur exact
  const editorLink = page.locator(`a.tilcomp[href*="/editor/"]`, { hasText: title }).first();
  if ((await editorLink.count().catch(() => 0)) > 0) {
    await editorLink.click({ timeout: 10_000 }).catch(() => undefined);
    await sleep(REQUEST_DELAY_MS);
    return true;
  }
  const exact = page.getByRole('link', { name: title, exact: true }).first();
  if ((await exact.count().catch(() => 0)) > 0) {
    await exact.click({ timeout: 10_000 }).catch(() => undefined);
    await sleep(REQUEST_DELAY_MS);
    return true;
  }
  return false;
}

/**
 * Après connexion : laisse l’utilisateur ouvrir une formation, capture le réseau,
 * puis tente de parcourir les leçons détectées.
 */

async function listFormationsFromAdminPage(page: Page, adminUrl: string): Promise<
  Array<{ uuid: string; title: string; href: string }>
> {
  const listUrl = new URL('/formations', adminUrl).toString();
  await page.goto(listUrl, { waitUntil: 'networkidle', timeout: 90_000 }).catch(async () => {
    await page.goto(listUrl, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  });
  await sleep(1500);
  const rows = (await page.evaluate(`(() => {
    const out = [];
    const seen = new Set();
    for (const a of document.querySelectorAll('a[href*="/formations/"]')) {
      const href = a.href.split('?')[0];
      const m = href.match(/\\/formations\\/([0-9a-f-]{36})\\/?$/i) || href.match(/\\/formations\\/([0-9a-f-]{36})/i);
      if (!m) continue;
      if (seen.has(m[1])) continue;
      // Ignorer liens éditeur
      if (/\\/editor\\//i.test(href)) continue;
      seen.add(m[1]);
      const text = (a.textContent || '').replace(/\\s+/g, ' ').trim();
      if (text.length < 3) continue;
      out.push({ uuid: m[1], title: text, href: href.endsWith('/') ? href : href + '/' });
    }
    return out;
  })()`)) as Array<{ uuid: string; title: string; href: string }>;
  return rows.map((r) => ({
    ...r,
    title: cleanFormationTitle(r.title),
  }));
}

function formationAlreadyExported(formation: TeachizyFormation): boolean {
  const slug = slugify(formation.title);
  const dir = path.join(exportRoot(), slug);
  if (!fs.existsSync(dir)) return false;
  // Reprise : au moins un fichier support ou liens.json
  const walk = (d: string): boolean => {
    for (const name of fs.readdirSync(d)) {
      const p = path.join(d, name);
      const st = fs.statSync(p);
      if (st.isDirectory() && walk(p)) return true;
      if (/\\.(pdf|xlsx|xls)$/i.test(name) || name === 'liens.json') return true;
    }
    return false;
  };
  return walk(dir);
}


export async function runBrowserExport(
  options: BrowserExportOptions,
  seedFormations?: TeachizyFormation[]
): Promise<TeachizyFormation[]> {
  ensureDir(exportRoot());
  ensureDir(authDir());


  const hasState = fs.existsSync(storageStatePath());
  const browser = await chromium.launch({
    headless: !options.headed,
    // Évite que la fermeture accidentelle de la fenêtre tue tout le process trop tôt
    handleSIGINT: true,
  });
  const context = await browser.newContext(
    hasState ? { storageState: storageStatePath() } : {}
  );
  let activePage = await context.newPage();

  const jsonBucket: CapturedJson[] = [];
  const pdfHits = new Set<string>();
  attachNetworkCapture(activePage, jsonBucket, pdfHits);

  const ensurePage = async (): Promise<Page> => {
    if (!activePage.isClosed()) return activePage;
    console.warn('Fenêtre fermée — réouverture de l’admin…');
    activePage = await context.newPage();
    attachNetworkCapture(activePage, jsonBucket, pdfHits);
    await activePage.goto(options.adminUrl, { waitUntil: 'domcontentloaded', timeout: 60_000 });
    return activePage;
  };

  await activePage.goto(options.adminUrl, { waitUntil: 'domcontentloaded', timeout: 60_000 });

  if (!hasState) {
    await waitForManualLogin(activePage);
  } else {
    console.log('Session locale réutilisée. Si vous êtes déconnecté, relancez avec --login.\n');
  }

  const multi = options.maxFormations > 1;
  let formations: TeachizyFormation[] = seedFormations ? structuredClone(seedFormations) : [];

  if (multi || !options.formationFilter) {
    // Mode multi / défaut élargi : lister toutes les formations admin
    console.log('\n=== Liste des formations (admin) ===');
    await ensurePage();
    const listed = await listFormationsFromAdminPage(activePage, options.adminUrl);
    console.log(`${listed.length} formation(s) détectée(s) sur /formations`);
    for (const row of listed.slice(0, 5)) console.log(` - ${row.title}`);
    if (listed.length > 5) console.log(` - … +${listed.length - 5} autres`);

    if (!hasState) {
      await waitForEnterOrFile(
        'Confirmer pour lancer l’export de toutes les formations listées',
        path.join(authDir(), 'continue-inventory')
      );
    } else {
      console.log('Session OK — démarrage automatique de l’export multi-formations.\n');
    }

    let rows = listed;
    if (options.formationFilter) {
      const q = options.formationFilter.toLowerCase();
      rows = rows.filter(
        (r) => r.title.toLowerCase().includes(q) || r.uuid.toLowerCase().includes(q)
      );
    }
    rows = rows.slice(0, Math.max(1, options.maxFormations));

    formations = [];
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      console.log(`\n[${i + 1}/${rows.length}] Inventaire : ${row.title}`);
      await ensurePage();
      jsonBucket.length = 0;
      await activePage
        .goto(row.href, { waitUntil: 'networkidle', timeout: 90_000 })
        .catch(async () => {
          await activePage.goto(row.href, { waitUntil: 'domcontentloaded', timeout: 60_000 });
        });
      await sleep(800);
      await expandCollapsed(activePage).catch(() => undefined);
      let formation = await inventoryContentTree(activePage);
      formation.sourceId = row.uuid;
      formation.title = cleanFormationTitle(row.title || formation.title);
      formation.sourcePageUrl = stripSensitiveUrl(row.href);
      formations.push(formation);
      const nLessons =
        formation.rootLessons.length +
        formation.modules.reduce((acc, m) => acc + m.lessons.length, 0);
      console.log(`   → ${formation.modules.length} modules, ${nLessons} leçons`);
    }
  } else {
    // Mode une formation (filtre) : comportement guidé historique
    const prevManifest = readJson<{ formations?: Array<{ sourcePageUrl?: string | null }> }>(
      path.join(exportRoot(), 'manifest.json')
    );
    const prevFormationUrl = prevManifest?.formations?.[0]?.sourcePageUrl;
    if (prevFormationUrl && formationUuidFromUrl(prevFormationUrl)) {
      console.log(`Ouverture de la formation connue : ${prevFormationUrl}`);
      await activePage
        .goto(prevFormationUrl, { waitUntil: 'networkidle', timeout: 60_000 })
        .catch(() => undefined);
      await sleep(800);
    }

    console.log('\n=== Inventaire ===');
    console.log('Dans le navigateur : ouvrez Formations → formation → Contenu.');
    await waitForEnterOrFile(
      'Structure formation visible',
      path.join(authDir(), 'continue-inventory')
    );

    await ensurePage();
    await expandCollapsed(activePage).catch(() => undefined);
    await sleep(500);

    formations = seedFormations ? structuredClone(seedFormations) : [];
    if (formations.length === 0 || formations.every((f) => f.modules.length === 0 && f.rootLessons.length === 0)) {
      console.log('Inventaire depuis la page Contenu…');
      await activePage.reload({ waitUntil: 'networkidle', timeout: 60_000 }).catch(() => undefined);
      await sleep(800);
      formations = [await inventoryContentTree(activePage)];
    }
    for (const f of formations) {
      f.title = cleanFormationTitle(f.title);
      if (!f.sourcePageUrl) f.sourcePageUrl = stripSensitiveUrl(activePage.url());
    }
    if (options.formationFilter) {
      const q = options.formationFilter.toLowerCase();
      formations = formations.filter(
        (f) => f.title.toLowerCase().includes(q) || f.sourceId.toLowerCase().includes(q)
      );
      if (!formations.length) {
        await browser.close();
        throw new Error(`Aucune formation ne correspond au filtre « ${options.formationFilter} ».`);
      }
    }
    formations = formations.slice(0, Math.max(1, options.maxFormations));
  }

  console.log(`\nFormations retenues (${formations.length}) :`);
  for (const f of formations) {
    const nLessons =
      f.rootLessons.length + f.modules.reduce((acc, m) => acc + m.lessons.length, 0);
    console.log(` - ${f.title} (${f.modules.length} modules, ${nLessons} leçons)`);
  }

  if (options.inventoryOnly) {
    await context.storageState({ path: storageStatePath() }).catch(() => undefined);
    await browser.close();
    return formations;
  }

  const fingerprints = loadFingerprints();
  console.log(
    multi
      ? `\n=== Téléchargement multi-formations (${formations.length}) ===`
      : '\n=== Téléchargement des supports ==='
  );

  const progressPath = path.join(exportRoot(), 'manifest-progress.json');
  const prevFull = readJson<{ formations?: TeachizyFormation[] }>(
    path.join(exportRoot(), 'manifest.json')
  );

  for (let fi = 0; fi < formations.length; fi++) {
    const formation = formations[fi];
    if (multi && formationAlreadyExported(formation)) {
      const prev =
        prevFull?.formations?.find(
          (f) =>
            f.sourceId === formation.sourceId ||
            slugify(f.title) === slugify(formation.title)
        ) ?? null;
      if (prev) {
        formations[fi] = prev;
        console.log(
          `\n[${fi + 1}/${formations.length}] ↷ Reprise manifeste existant : ${formation.title}`
        );
      } else {
        console.log(
          `\n[${fi + 1}/${formations.length}] ↷ Déjà sur disque (inventaire seul) : ${formation.title}`
        );
      }
      continue;
    }

    console.log(`\n[${fi + 1}/${formations.length}] Formation : ${formation.title}`);
    const formationSlug = slugify(formation.title);
    const lessons: Array<{
      moduleOrder: number;
      moduleTitle: string;
      lesson: TeachizyLesson;
    }> = [];

    for (const m of formation.modules) {
      for (const l of m.lessons) {
        lessons.push({ moduleOrder: m.order, moduleTitle: m.title, lesson: l });
      }
    }
    for (const l of formation.rootLessons) {
      lessons.push({ moduleOrder: 0, moduleTitle: 'racine', lesson: l });
    }

    for (const { moduleOrder, moduleTitle, lesson } of lessons) {
      // Ne parcourir que les leçons « contenu » (pas quiz/tasks si type connu)
      if (lesson.type && /QUIZ|TASKS/i.test(lesson.type)) continue;

      const beforePdf = new Set(pdfHits);
      const beforeJsonLen = jsonBucket.length;

      console.log(`Leçon : ${lesson.title}`);
      await ensurePage();
      if (!lesson.assets) lesson.assets = [];

      const editorUrl =
        lesson.sourcePageUrl && /\/editor\/\d+/.test(lesson.sourcePageUrl)
          ? lesson.sourcePageUrl
          : null;

      if (editorUrl) {
        await activePage
          .goto(editorUrl, { waitUntil: 'domcontentloaded', timeout: 90_000 })
          .catch(() => undefined);
        await activePage.waitForLoadState('networkidle', { timeout: 20_000 }).catch(() => undefined);
        await sleep(REQUEST_DELAY_MS + 400);
      } else {
        const formationUrl = formation.sourcePageUrl;
        if (formationUrl) {
          const onFormation =
            formationUuidFromUrl(activePage.url()) === formationUuidFromUrl(formationUrl);
          if (!onFormation) {
            await activePage
              .goto(formationUrl, { waitUntil: 'networkidle', timeout: 60_000 })
              .catch(() => undefined);
            await sleep(REQUEST_DELAY_MS);
          }
        }
        const clicked = await clickLessonByTitle(activePage, lesson.title);
        if (!clicked) {
          console.warn(`  ⚠ Leçon non ouverte : ${lesson.title}`);
          lesson.assets.push({
            sourceId: `${lesson.sourceId}::missing`,
            kind: 'file',
            originalTitle: lesson.title,
            sourcePageUrl: stripSensitiveUrl(activePage.url()) || lesson.sourcePageUrl || '',
            sourceUrlSafe: null,
            localPath: null,
            bytes: null,
            sha256: null,
            status: 'inaccessible',
            error: 'pas d’URL /editor/ et clic sommaire impossible',
          });
          continue;
        }
      }

      lesson.sourcePageUrl = stripSensitiveUrl(activePage.url());
      await expandCollapsed(activePage);
      await sleep(REQUEST_DELAY_MS);

      // Assets de CETTE leçon : PDF, Excel, liens (training_items JSON)
      const extracted: ExtractedAsset[] = [];
      for (const cap of jsonBucket.slice(beforeJsonLen)) {
        if (!/training_items\/\d+/i.test(cap.url)) continue;
        extracted.push(...extractLessonAssetsFromTrainingItemJson(cap.body, lesson.sourceId));
      }

      // Fallback réseau PDF S3 si rien dans le JSON
      if (!extracted.some((e) => e.kind === 'pdf')) {
        const newPdfUrls = [...pdfHits].filter(
          (u) => !beforePdf.has(u) && /\.pdf(\?|$)/i.test(u) && /scw\.cloud/i.test(u)
        );
        for (const u of newPdfUrls) {
          extracted.push({ kind: 'pdf', url: u, name: lesson.title });
        }
      }

      const seenUrl = new Set<string>();
      const candidates = extracted.filter((r) => {
        const key = `${r.kind}::${stripSensitiveUrl(r.url) || r.url}`;
        if (seenUrl.has(key)) return false;
        seenUrl.add(key);
        return true;
      });

      const dest = lessonDir(formationSlug, moduleOrder || 1, moduleTitle, lesson.order, lesson.title);
      ensureDir(dest);

      if (!candidates.length) {
        lesson.assets.push({
          sourceId: `${lesson.sourceId}::empty`,
          kind: 'file',
          originalTitle: lesson.title,
          sourcePageUrl: stripSensitiveUrl(activePage.url()) || lesson.sourcePageUrl || '',
          sourceUrlSafe: null,
          localPath: null,
          bytes: null,
          sha256: null,
          status: 'inaccessible',
          error: 'aucun PDF, Excel ni lien détecté dans la leçon',
        });
        continue;
      }

      let idx = 1;
      const linkAssets: TeachizyAsset[] = [];
      for (const file of candidates) {
        const asset = makeFileAsset(
          `${lesson.sourceId}::${file.kind}::${stripSensitiveUrl(file.url)}`,
          file.kind,
          file.name || lesson.title,
          activePage.url(),
          file.url,
          { linkHost: file.linkHost, linkCaption: file.linkCaption }
        );
        await ensureAssetDownloaded(context, asset, dest, idx, fingerprints);
        const mark =
          asset.status === 'downloaded' || asset.status === 'recorded'
            ? '✓'
            : asset.status === 'skipped_duplicate'
              ? '·'
              : '!';
        console.log(
          `  ${mark} [${asset.kind}] ${asset.originalTitle} → ${asset.status}` +
            (asset.error ? ` (${asset.error})` : '') +
            (asset.kind === 'link' && asset.sourceUrlSafe ? ` ${asset.sourceUrlSafe}` : '')
        );
        lesson.assets.push(asset);
        if (asset.kind === 'link') linkAssets.push(asset);
        idx += 1;
      }
      writeLessonLinksJson(dest, linkAssets);
      // Compat manifeste ancien champ
      lesson.pdfs = lesson.assets.filter((a) => a.kind === 'pdf');

      saveFingerprints(fingerprints);
    }

    // Sauvegarde progressive (reprise / crash)
    writeJson(progressPath, {
      updatedAt: new Date().toISOString(),
      doneIndex: fi + 1,
      total: formations.length,
      formations,
    });
  }

  await context.storageState({ path: storageStatePath() }).catch(() => undefined);
  await browser.close();
  return formations;
}

export { DEFAULT_ADMIN_URL, DEFAULT_STORE_URL };
