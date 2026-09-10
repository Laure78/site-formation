import fs from 'node:fs';
import path from 'node:path';

export function ensureDir(dir: string): void {
  fs.mkdirSync(dir, { recursive: true });
}

export function writeJson(filePath: string, data: unknown): void {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

export function readJson<T>(filePath: string): T | null {
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf8')) as T;
}

/** Vérifie l’en-tête magique PDF (%PDF). */
export function isPdfBuffer(buf: Buffer): boolean {
  if (buf.length < 5) return false;
  return buf.subarray(0, 5).toString('utf8') === '%PDF-';
}

/** XLSX = ZIP (PK). XLS ancien = OLE compound (D0 CF 11 E0). */
export function isSpreadsheetBuffer(buf: Buffer, kind: 'xlsx' | 'xls' | 'file'): boolean {
  if (buf.length < 8) return false;
  if (kind === 'xlsx' || kind === 'file') {
    // ZIP local file header
    if (buf[0] === 0x50 && buf[1] === 0x4b) return true;
  }
  if (kind === 'xls' || kind === 'file') {
    // OLE Compound Document
    if (buf[0] === 0xd0 && buf[1] === 0xcf && buf[2] === 0x11 && buf[3] === 0xe0) return true;
  }
  return kind === 'file'; // autres fichiers : accepter si pas HTML
}

/** Détecte une page HTML de connexion / erreur. */
export function looksLikeHtml(buf: Buffer): boolean {
  const head = buf.subarray(0, 200).toString('utf8').toLowerCase();
  return head.includes('<!doctype html') || head.includes('<html');
}
