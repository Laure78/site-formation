'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getProfile } from '@/lib/auth';
import { resolvePostAuthPath } from '@/lib/admin-access';
import { sanitizeInternalPath } from '@/lib/sanitize-internal-path';

function mapAuthError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes('invalid login') || m.includes('invalid credentials')) {
    return 'Email ou mot de passe incorrect.';
  }
  if (m.includes('email not confirmed')) {
    return 'Compte non confirmé. Vérifiez vos emails ou contactez le formateur.';
  }
  if (m.includes('too many requests') || m.includes('rate limit')) {
    return 'Trop de tentatives. Réessayez dans quelques minutes.';
  }
  return 'Connexion impossible. Vérifiez vos identifiants ou réessayez.';
}

/** Détermine la redirection après connexion (sans exposer la liste blanche côté client). */
export async function resolvePostLoginRedirect(nextRaw: string | null): Promise<string> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return '/auth/connexion';

  const profile = await getProfile(user.id);
  return resolvePostAuthPath(nextRaw, profile, user.email);
}

/**
 * Connexion email/mot de passe côté serveur (cookies de session posés correctement),
 * puis redirection. Évite le « Connexion… » bloqué du flux 100 % client.
 */
export async function loginWithPassword(
  email: string,
  password: string,
  nextRaw: string | null
): Promise<{ error: string }> {
  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail || !password) {
    return { error: 'Email et mot de passe requis.' };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: normalizedEmail,
    password,
  });

  if (error) {
    return { error: mapAuthError(error.message) };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Connexion impossible. Réessayez.' };
  }

  const profile = await getProfile(user.id);
  const destination = resolvePostAuthPath(nextRaw, profile, user.email);
  const safe =
    sanitizeInternalPath(destination) ??
    (destination.startsWith('/') ? destination : '/espace-apprenant');

  redirect(safe);
}
