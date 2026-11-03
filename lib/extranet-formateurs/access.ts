import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { requireAdminAccess } from '@/lib/admin-access';
import type { ExtranetTrainerRow } from './types';

export type ExtranetAccessDeniedReason = 'unauthenticated' | 'forbidden' | 'no_trainer';

export type ExtranetAccessResult =
  | { ok: true; userId: string; email: string; trainer: ExtranetTrainerRow }
  | { ok: false; reason: ExtranetAccessDeniedReason };

/** Lie un dossier extranet invité au compte auth (même email). */
export async function linkExtranetTrainerByEmail(userId: string, email: string): Promise<void> {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) return;
  const admin = createAdminClient();
  const normalized = email.trim().toLowerCase();
  const { data: row } = await admin
    .from('extranet_trainers')
    .select('id, user_id, status')
    .eq('email', normalized)
    .maybeSingle();

  if (!row || row.user_id) return;
  if (row.status === 'archived' || row.status === 'suspended') return;

  await admin
    .from('extranet_trainers')
    .update({
      user_id: userId,
      status: row.status === 'invited' ? 'onboarding' : row.status,
      activated_at: new Date().toISOString(),
    })
    .eq('id', row.id);
}

export async function userHasExtranetTrainer(email: string | null | undefined, userId: string): Promise<boolean> {
  if (!email) return false;
  await linkExtranetTrainerByEmail(userId, email);
  const trainer = await getExtranetTrainerForUser(userId);
  return Boolean(
    trainer && trainer.status !== 'suspended' && trainer.status !== 'archived'
  );
}

export async function getExtranetTrainerForUser(userId: string): Promise<ExtranetTrainerRow | null> {
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const admin = createAdminClient();
      const { data } = await admin
        .from('extranet_trainers')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();
      if (data) return data as ExtranetTrainerRow;
    } catch {
      // fallback session
    }
  }
  const supabase = await createClient();
  const { data } = await supabase
    .from('extranet_trainers')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();
  return (data as ExtranetTrainerRow | null) ?? null;
}

export async function requireExtranetTrainerAccess(): Promise<ExtranetAccessResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return { ok: false, reason: 'unauthenticated' };
  }

  await linkExtranetTrainerByEmail(user.id, user.email);

  const trainer = await getExtranetTrainerForUser(user.id);
  if (!trainer) {
    return { ok: false, reason: 'no_trainer' };
  }
  if (trainer.status === 'suspended' || trainer.status === 'archived') {
    return { ok: false, reason: 'forbidden' };
  }

  return { ok: true, userId: user.id, email: user.email, trainer };
}

export async function requireExtranetAdminAccess() {
  return requireAdminAccess();
}

export function extranetAccessDeniedMessage(reason: ExtranetAccessDeniedReason): string {
  switch (reason) {
    case 'unauthenticated':
      return 'Connectez-vous pour accéder à l’espace formateurs.';
    case 'no_trainer':
      return 'Aucun dossier formateur n’est associé à ce compte. Contactez Laure Olivié.';
    case 'forbidden':
      return 'Votre accès à l’extranet formateurs est suspendu.';
    default:
      return 'Accès refusé.';
  }
}
