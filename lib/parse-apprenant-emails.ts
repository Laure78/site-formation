/**
 * Parse une liste d’emails saisie en admin (une ligne, virgules ou points-virgules).
 * Normalise en minuscules, dédoublonne, sépare valides / invalides.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ParsedApprenantEmails = {
  /** Emails valides, uniques, en minuscules (ordre d’apparition). */
  valid: string[];
  /** Jetons non vides mais invalides. */
  invalid: string[];
  /** Doublons détectés dans la saisie (après normalisation). */
  duplicatesInInput: string[];
};

export function parseApprenantEmails(raw: string): ParsedApprenantEmails {
  const tokens = raw
    .split(/[\n,;]+/)
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);

  const valid: string[] = [];
  const invalid: string[] = [];
  const duplicatesInInput: string[] = [];
  const seen = new Set<string>();

  for (const token of tokens) {
    if (!EMAIL_RE.test(token) || token.length > 254) {
      invalid.push(token);
      continue;
    }
    if (seen.has(token)) {
      duplicatesInInput.push(token);
      continue;
    }
    seen.add(token);
    valid.push(token);
  }

  return { valid, invalid, duplicatesInInput };
}

/** Prénom / nom de secours quand seuls les emails sont fournis. */
export function namesFromEmail(email: string): { firstName: string; lastName: string } {
  const local = email.split('@')[0] ?? 'apprenant';
  const part = local.split(/[._+-]/)[0]?.replace(/\d+/g, '') || 'Apprenant';
  const firstName = part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
  return { firstName: firstName.slice(0, 80) || 'Apprenant', lastName: '—' };
}
