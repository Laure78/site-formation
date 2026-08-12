#!/usr/bin/env node
/**
 * Audit des liens Qualiopi (périmètre légal) — HEAD puis GET si besoin.
 * Usage : node scripts/audit-liens-qualiopi.mjs [--base https://www.laureolivie.fr]
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const baseArg = process.argv.find((a) => a.startsWith('--base='));
const BASE = (baseArg?.split('=')[1] ?? process.env.AUDIT_BASE ?? 'https://www.laureolivie.fr').replace(
  /\/$/,
  '',
);

const LEGAL_PAGES = [
  '/cgv',
  '/mentions-legales',
  '/politique-confidentialite',
  '/reglement-interieur',
  '/accessibilite-handicap',
  '/annuaire-handicap',
  '/indicateurs-resultats',
  '/qualiopi',
  '/reclamations',
];

const FORMATION_PDFS = [
  { ref: 'NIV-01', href: '/formations/pdf/programme-niveau-1-ia-batiment-travaux-publics.pdf' },
  {
    ref: 'NIV-02',
    href: '/formations/ia-appels-offre-btp/Programme_IA_AO_DCE_MT_ClaudePro_OFC.pdf',
  },
  {
    ref: 'NIV-03',
    href: '/formations/ia-conduite-travaux-suivi-chantier/Programme_IA_Conduite_Travaux_OFC.pdf',
  },
  {
    ref: 'NIV-04',
    href: '/formations/maitriser-claude-ai-btp/Programme_Maitriser_Claude_BTP_OFC.pdf',
  },
  { ref: 'NIV-05', href: '/formations/ia-maitrise-oeuvre/programme_OFC_IA_MOE_4h.pdf' },
];

const EXTERNAL = [
  {
    label: 'Qualiopi data.gouv (footer QualiopiCertificationNotice)',
    href: 'https://annuaire-entreprises.data.gouv.fr/labels-certificats/905244281',
  },
  {
    label: 'Fiche OFC annuaire-entreprises (home + /qualiopi)',
    href: 'https://annuaire-entreprises.data.gouv.fr/entreprise/ofc-creation-d-entreprise-ofc-creation-d-entreprise-905244281',
  },
];

const TARGETS = [
  { group: 'Certificat Qualiopi', href: '/documents/certificat-qualiopi-ofc.pdf', expectPdf: true },
  ...FORMATION_PDFS.map((f) => ({
    group: `Programme ${f.ref}`,
    href: f.href,
    expectPdf: true,
  })),
  ...LEGAL_PAGES.map((href) => ({ group: 'Page légale', href, expectPdf: false })),
  ...EXTERNAL.map((e) => ({ group: 'Externe', href: e.href, label: e.label, expectPdf: false })),
];

const UA =
  'Mozilla/5.0 (compatible; OFC-Qualiopi-Audit/1.0; +https://www.laureolivie.fr)';

async function fetchCheck(url, expectPdf) {
  const localPath = url.startsWith('http') ? null : path.join(ROOT, 'public', url);
  if (localPath && !fs.existsSync(localPath)) {
    return { status: 'LOCAL_MISSING', contentType: null, finalUrl: url, ok: false, note: 'fichier absent de public/' };
  }

  let res;
  try {
    res = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      headers: { 'User-Agent': UA },
    });
    if (res.status === 405 || res.status === 403 || !res.headers.get('content-type')) {
      res = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        headers: { 'User-Agent': UA },
      });
    }
  } catch (err) {
    return { status: 'ERR', contentType: null, finalUrl: url, ok: false, note: String(err.message ?? err) };
  }

  const contentType = res.headers.get('content-type') ?? '';
  const isPdf = contentType.includes('application/pdf') || contentType.includes('application/octet-stream');
  const ok =
    res.status >= 200 &&
    res.status < 400 &&
    (!expectPdf || isPdf || (localPath && fs.existsSync(localPath)));

  return {
    status: res.status,
    contentType,
    finalUrl: res.url,
    ok,
    note:
      expectPdf && res.ok && !isPdf
        ? `type inattendu : ${contentType || '(vide)'}`
        : res.url !== url
          ? `redirigé vers ${res.url}`
          : '',
  };
}

function actionFor(row) {
  if (row.ok) return 'OK';
  if (row.status === 'LOCAL_MISSING') return 'Ajouter le fichier dans public/ ou corriger le href';
  if (row.status === 404) return 'Corriger le lien ou déployer le fichier manquant';
  if (row.status >= 300 && row.status < 400) return 'Vérifier la redirection (cassée ?)';
  if (row.note?.includes('type inattendu')) return 'Vérifier que la ressource est bien un PDF';
  if (row.status === 'ERR') return `Erreur réseau : ${row.note}`;
  return 'Investiguer';
}

async function main() {
  console.log(`\nAudit liens Qualiopi — base : ${BASE}\n`);
  console.log('| Groupe | URL | Statut | Type | Action |');
  console.log('|--------|-----|--------|------|--------|');

  let failures = 0;

  for (const t of TARGETS) {
    const absolute = t.href.startsWith('http') ? t.href : `${BASE}${t.href}`;
    const result = await fetchCheck(absolute, t.expectPdf);
    const action = actionFor(result);
    if (!result.ok) failures++;

    const displayUrl = t.label ? `${t.href} (${t.label})` : t.href;
    const type = result.contentType?.split(';')[0] ?? (result.status === 'LOCAL_MISSING' ? '—' : '—');
    console.log(
      `| ${t.group} | ${displayUrl} | ${result.status} | ${type} | ${action}${result.note && action !== 'OK' ? ` — ${result.note}` : ''} |`,
    );
  }

  console.log(`\nRésumé : ${TARGETS.length - failures}/${TARGETS.length} OK, ${failures} problème(s).\n`);
  process.exit(failures > 0 ? 1 : 0);
}

main();
