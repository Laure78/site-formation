import { createHash, randomBytes, timingSafeEqual } from 'crypto';

const TOKEN_BYTES = 32;
const INVITATION_TTL_DAYS = 7;

/** Génère un token d’invitation (base64url). Ne jamais le logger ni le stocker en clair. */
export function generateInvitationToken(): string {
  return randomBytes(TOKEN_BYTES).toString('base64url');
}

/** SHA-256 hex du token — seule forme persistée en base. */
export function hashInvitationToken(token: string): string {
  return createHash('sha256').update(token, 'utf8').digest('hex');
}

/**
 * Comparaison en temps constant de deux hash hex.
 * Retourne false si longueurs différentes (sans fuite sur le contenu).
 */
export function safeEqualHex(a: string, b: string): boolean {
  try {
    const bufA = Buffer.from(a, 'hex');
    const bufB = Buffer.from(b, 'hex');
    if (bufA.length === 0 || bufA.length !== bufB.length) return false;
    return timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

export function invitationExpiresAt(from: Date = new Date()): Date {
  const d = new Date(from);
  d.setDate(d.getDate() + INVITATION_TTL_DAYS);
  return d;
}

export const INVITATION_TTL_DAYS_LABEL = INVITATION_TTL_DAYS;
