import { randomBytes } from 'crypto';
import { z } from 'zod';

/** Politique mot de passe apprenant (acceptation invitation). */
export const PASSWORD_MIN_LENGTH = 12;
export const PASSWORD_MAX_LENGTH = 128;

/** Alphabet sans caractères ambigus (0/O, 1/l/I). */
const INVITE_PASSWORD_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';

export const invitationPasswordSchema = z
  .string()
  .min(PASSWORD_MIN_LENGTH, `Le mot de passe doit contenir au moins ${PASSWORD_MIN_LENGTH} caractères.`)
  .max(PASSWORD_MAX_LENGTH, `Le mot de passe ne peut pas dépasser ${PASSWORD_MAX_LENGTH} caractères.`)
  .refine((v) => /[A-Za-z]/.test(v) && /\d/.test(v), {
    message: 'Le mot de passe doit contenir au moins une lettre et un chiffre.',
  });

export function passwordPolicyHint(): string {
  return `${PASSWORD_MIN_LENGTH} caractères min., au moins une lettre et un chiffre`;
}

/**
 * Mot de passe temporaire lisible pour envoi email (jamais stocké en clair en base).
 * Format : XXXX-XXXX-XXXX (12 caractères utiles + tirets).
 */
export function generateInvitePassword(): string {
  const pick = (n: number): string => {
    const bytes = randomBytes(n);
    let out = '';
    for (let i = 0; i < n; i++) {
      out += INVITE_PASSWORD_ALPHABET[bytes[i]! % INVITE_PASSWORD_ALPHABET.length];
    }
    return out;
  };
  // Garantir au moins une lettre et un chiffre
  let password = `${pick(4)}-${pick(4)}-${pick(4)}`;
  if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    password = `${pick(3)}A-${pick(3)}2-${pick(4)}`;
  }
  return password;
}
