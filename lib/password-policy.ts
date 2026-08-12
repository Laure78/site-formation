import { z } from 'zod';

/** Politique mot de passe apprenant (acceptation invitation). */
export const PASSWORD_MIN_LENGTH = 12;
export const PASSWORD_MAX_LENGTH = 128;

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
