/**
 * Parse CSV / Excel FR pour l’import d’apprenants.
 * Accepte séparateur virgule ou point-virgule, BOM UTF-8, guillemets.
 */

const MAX_CSV_ROWS = 50;

export { MAX_CSV_ROWS as APPRENANTS_CSV_MAX_ROWS };

function splitCsvLine(line: string, delimiter: string): string[] {
  const cells: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (ch === delimiter && !inQuotes) {
      cells.push(current.trim());
      current = '';
      continue;
    }
    current += ch;
  }
  cells.push(current.trim());
  return cells.map((c) => c.replace(/^"|"$/g, '').trim());
}

function detectDelimiter(headerLine: string): ',' | ';' {
  const commas = (headerLine.match(/,/g) ?? []).length;
  const semis = (headerLine.match(/;/g) ?? []).length;
  return semis > commas ? ';' : ',';
}

function normalizeHeader(raw: string): string {
  return raw
    .replace(/^\uFEFF/, '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '_');
}

/**
 * Colonnes reconnues : email|mail, prenom|first_name|firstname, nom|last_name|lastname
 */
export function parseApprenantsCsv(text: string): Record<string, string>[] {
  const cleaned = text.replace(/^\uFEFF/, '').trim();
  if (!cleaned) return [];

  const lines = cleaned.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) return [];
  if (lines.length - 1 > MAX_CSV_ROWS) {
    throw new Error(`Le fichier CSV dépasse ${MAX_CSV_ROWS} lignes de données (max ${MAX_CSV_ROWS}).`);
  }

  const delimiter = detectDelimiter(lines[0]);
  const headers = splitCsvLine(lines[0], delimiter).map(normalizeHeader);
  if (!headers.some((h) => h === 'email' || h === 'mail')) {
    throw new Error(
      'Colonne « email » introuvable. Attendu : email, prenom, nom (séparateur , ou ;).'
    );
  }

  const rows: Record<string, string>[] = [];
  for (let i = 1; i < lines.length; i++) {
    const values = splitCsvLine(lines[i], delimiter);
    const row: Record<string, string> = {};
    headers.forEach((h, j) => {
      row[h] = values[j] ?? '';
    });
    rows.push(row);
  }
  return rows;
}
