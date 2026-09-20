import {
  CHAMBER_KEYWORDS,
  workforceFromCategory,
  type ExtractedCompany,
} from './directories-types';

const FOOTER_RE =
  /^\d+\s*\|\s*ANNUAIRE|ANNUAIRE\s*2025|LISTE DES ENTREPRISES|^\d+\/[A-Z]$|^[A-Z]\s*$/i;

const ROLE_RE =
  /^(Gérant|Gérante|Président|Présidente|Directeur|Directrice|Cogérant|Associé|Associée|Directeur\s+général|Directrice\s+générale)\s*:\s*(.+)$/i;

const POSTAL_RE = /^(\d{5})\s+(.+)$/;
const PHONE_RE = /^Tél\.?\s*(.+)$/i;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
const WEB_RE = /^(https?:\/\/|www\.)/i;
const CAT_EFF_RE = /^Cat\.?\s*EFF\s*:\s*([1-6])\b/i;
const QUALIBAT_RE = /^Qualibat\s*:\s*(.+)$/i;

function nullIfEmpty(s: string | null | undefined): string | null {
  const t = s?.trim();
  return t ? t : null;
}

function deptFromPostal(cp: string | null): string | null {
  if (!cp || cp.length < 2) return null;
  if (cp.startsWith('97') || cp.startsWith('98')) return cp.slice(0, 3);
  return cp.slice(0, 2);
}

function detectChamber(name: string): { specialty: string; chamber: string } | null {
  for (const k of CHAMBER_KEYWORDS) {
    if (k.pattern.test(name)) return { specialty: k.specialty, chamber: k.chamber };
  }
  return null;
}

function cleanCompanyName(raw: string): string {
  return raw
    .replace(/\s+/g, ' ')
    .replace(/^[A-Z]\s+(?=[A-Z0-9])/, '') // lettre de colonne (ex. "C CRG BAT")
    .replace(/\s+\d+$/, '')
    .trim();
}

function isLikelyCompanyHeader(line: string): boolean {
  if (line.length < 3 || line.length > 120) return false;
  if (FOOTER_RE.test(line)) return false;
  if (POSTAL_RE.test(line) || PHONE_RE.test(line) || EMAIL_RE.test(line)) return false;
  if (ROLE_RE.test(line) || CAT_EFF_RE.test(line) || QUALIBAT_RE.test(line)) return false;
  if (WEB_RE.test(line)) return false;
  // Prefer ALL CAPS-ish company names (allow accents / digits / punctuation)
  const letters = line.replace(/[^A-Za-zÀ-ÿ]/g, '');
  if (letters.length < 3) return false;
  const upperRatio =
    letters.replace(/[^A-ZÀ-Ÿ]/g, '').length / Math.max(1, letters.length);
  return upperRatio >= 0.65;
}

function parseBlock(lines: string[], page: number): ExtractedCompany | null {
  if (lines.length < 2) return null;
  const company_name = cleanCompanyName(lines[0]!);
  if (!company_name || company_name.length < 3) return null;

  let address: string | null = null;
  let postal_code: string | null = null;
  let city: string | null = null;
  let phone: string | null = null;
  let email: string | null = null;
  let website: string | null = null;
  let manager_name: string | null = null;
  let manager_role: string | null = null;
  let workforce_category: string | null = null;
  let qualibat_codes: string[] = [];
  const quality_labels: string[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]!.trim();
    if (!line || FOOTER_RE.test(line)) continue;

    const postal = line.match(POSTAL_RE);
    if (postal) {
      postal_code = postal[1]!;
      city = postal[2]!.trim();
      continue;
    }
    const phoneM = line.match(PHONE_RE);
    if (phoneM) {
      phone = phoneM[1]!.trim();
      continue;
    }
    if (EMAIL_RE.test(line)) {
      email = line.toLowerCase();
      continue;
    }
    if (WEB_RE.test(line)) {
      website = line.replace(/^https?:\/\//i, '').replace(/\/$/, '');
      continue;
    }
    const role = line.match(ROLE_RE);
    if (role) {
      manager_role = role[1]!.trim();
      manager_name = role[2]!
        .replace(/^(M\.|Mme|Mlle|Mr|Monsieur|Madame)\s+/i, '')
        .trim();
      continue;
    }
    const cat = line.match(CAT_EFF_RE);
    if (cat) {
      workforce_category = cat[1]!;
      continue;
    }
    const q = line.match(QUALIBAT_RE);
    if (q) {
      qualibat_codes = q[1]!
        .split(/[\s,;]+/)
        .map((x) => x.trim())
        .filter((x) => /^\d{3,5}$/.test(x));
      continue;
    }
    if (/RGE|Accessibilité|Garant/i.test(line)) {
      if (/RGE|Environnement/i.test(line)) quality_labels.push('RGE');
      if (/Accessibilité/i.test(line)) quality_labels.push('Accessibilité');
      continue;
    }
    // address line if not yet set and looks like street
    if (!address && !postal_code && /rue|avenue|boulevard|impasse|place|chemin|allée|passage|route|quai|cours|square|lot/i.test(line)) {
      address = line;
      continue;
    }
    if (!address && !postal_code && /\d/.test(line) && line.length < 80) {
      address = line;
    }
  }

  // Need at least a name + (postal or phone or email) to count as company
  if (!postal_code && !phone && !email) return null;

  const wf = workforceFromCategory(workforce_category);
  const chamber = detectChamber(company_name);
  const specialties = chamber ? [chamber.specialty] : [];
  const tags = [
    'FFB',
    'BTP',
    ...(deptFromPostal(postal_code) ? [deptFromPostal(postal_code)!] : []),
    ...specialties,
    ...(wf.label ? [`${wf.label} salariés`] : []),
    ...(qualibat_codes.length ? ['Qualibat'] : []),
  ];

  return {
    company_name,
    address,
    postal_code,
    city,
    departement: deptFromPostal(postal_code),
    phone: nullIfEmpty(phone),
    email: nullIfEmpty(email),
    website: nullIfEmpty(website),
    manager_name: nullIfEmpty(manager_name),
    manager_role: nullIfEmpty(manager_role),
    workforce_category,
    workforce_min: wf.min,
    workforce_max: wf.max,
    workforce_label: wf.label,
    specialties,
    professional_chamber: chamber?.chamber ?? null,
    quality_labels: [...new Set(quality_labels)],
    qualibat_codes,
    tags: [...new Set(tags)],
    source_page: page,
    raw_block: lines.join('\n'),
  };
}

/** Parse le texte d’une page annuaire en entreprises. */
export function parseDirectoryPageText(
  pageText: string,
  pageNumber: number
): ExtractedCompany[] {
  const lines = pageText
    .split(/\r?\n/)
    .map((l) => l.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .filter((l) => !FOOTER_RE.test(l));

  const results: ExtractedCompany[] = [];
  let current: string[] = [];

  const flush = () => {
    if (current.length === 0) return;
    const parsed = parseBlock(current, pageNumber);
    if (parsed) results.push(parsed);
    current = [];
  };

  for (const line of lines) {
    if (isLikelyCompanyHeader(line) && current.length >= 2) {
      flush();
      current = [line];
      continue;
    }
    if (isLikelyCompanyHeader(line) && current.length === 0) {
      current = [line];
      continue;
    }
    if (current.length > 0) current.push(line);
  }
  flush();
  return results;
}

export async function extractCompaniesFromDirectoryPdf(
  absoluteOrPublicPath: string
): Promise<{ companies: ExtractedCompany[]; pageCount: number }> {
  const { readFile } = await import('fs/promises');
  const { extractText } = await import('unpdf');
  const path = await import('path');

  const resolved = absoluteOrPublicPath.startsWith('/')
    ? path.join(process.cwd(), 'public', absoluteOrPublicPath.replace(/^\//, ''))
    : absoluteOrPublicPath;

  const buf = await readFile(resolved);
  const { totalPages, text } = await extractText(new Uint8Array(buf), {
    mergePages: false,
  });

  const pages = Array.isArray(text) ? text : [String(text)];
  const all: ExtractedCompany[] = [];
  const seen = new Set<string>();

  for (let i = 0; i < pages.length; i++) {
    const pageText = String(pages[i] ?? '');
    const pageNum = i + 1;
    // Liste des entreprises : pages avec Cat. EFF (typiquement à partir de ~61)
    if (!/Cat\.?\s*EFF\s*:/i.test(pageText)) continue;
    // Exclure sommaires / pub (peu d'entreprises, pas de liste)
    if (pageNum < 55 && !/LISTE DES ENTREPRISES/i.test(pageText)) continue;

    const parsed = parseDirectoryPageText(pageText, pageNum);
    for (const c of parsed) {
      // Filtrer les faux positifs (titres, organismes)
      if (/^PÔLE CONSTRUCTION|^FFB |^BUS$|^LISTE /i.test(c.company_name)) continue;
      if (!c.postal_code && !c.email && !c.phone) continue;

      const key = `${c.company_name.toLowerCase()}|${(c.email ?? '').toLowerCase()}|${c.postal_code ?? ''}`;
      if (seen.has(key)) continue;
      seen.add(key);
      all.push(c);
    }
  }

  return { companies: all, pageCount: totalPages };
}
