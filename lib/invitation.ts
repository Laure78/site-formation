import type { SupabaseClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { createAdminClient } from '@/lib/supabase/admin';
import {
  generateInvitationToken,
  hashInvitationToken,
  invitationExpiresAt,
} from '@/lib/invitation-token';
import { sendInvitationEmail } from '@/lib/send-invitation-email';
import { generateInvitePassword } from '@/lib/password-policy';
import { randomBytes } from 'crypto';

/** Plafond de renvois d’email par chaîne d’invitation (anti-spam Resend). */
export const MAX_INVITATION_SENT_COUNT = 5;

export const inviteApprenantSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Email invalide')
    .max(254)
    .transform((v) => v.toLowerCase()),
  firstName: z.string().trim().min(1, 'Prénom requis').max(80),
  lastName: z.string().trim().min(1, 'Nom requis').max(80),
  formationId: z.string().uuid('Formation invalide'),
  action: z.enum(['create', 'resend']).default('create'),
  invitationId: z.string().uuid().optional(),
  /** Envoie un mot de passe temporaire dans l’email (défaut : oui). */
  includePassword: z.boolean().default(true),
});

export type InviteApprenantInput = z.infer<typeof inviteApprenantSchema>;

export type InviteApprenantResult =
  | { ok: true; status: 'cree' | 'deja_invite' | 'renvoye'; invitationId: string }
  | { ok: false; error: string; code?: 'validation' | 'auth' | 'email' | 'not_found' | 'forbidden' };

export type InvitationByTokenHash = {
  id: string;
  email: string;
  formation_id: string | null;
  expires_at: string;
  accepted_at: string | null;
  status: 'pending' | 'accepted' | 'expired' | 'revoked';
  first_name: string | null;
  last_name: string | null;
  user_id: string | null;
  sent_count: number;
};

const PRIVILEGED_ROLES = new Set(['admin', 'formateur', 'moderator']);

/** Résout une invitation via le SHA-256 du token (RPC SECURITY DEFINER). */
export async function getInvitationByToken(
  supabase: SupabaseClient,
  token: string
): Promise<InvitationByTokenHash | null> {
  if (!token || token.length < 20 || token.length > 200) return null;
  const tokenHash = hashInvitationToken(token);
  const { data, error } = await supabase.rpc('get_invitation_by_token_hash', {
    p_token_hash: tokenHash,
  });
  if (error) {
    console.error('[getInvitationByToken] lookup failed');
    return null;
  }
  const row = (Array.isArray(data) ? data[0] : data) as InvitationByTokenHash | undefined;
  return row ?? null;
}

function bootstrapPassword(): string {
  return randomBytes(24).toString('base64url') + 'Aa1!';
}

function genericUserError(): Error {
  return new Error('Impossible de préparer le compte. Contactez le support.');
}

async function ensureInvitedUser(params: {
  email: string;
  firstName: string;
  lastName: string;
}): Promise<{ userId: string }> {
  const admin = createAdminClient();
  const fullName = `${params.firstName} ${params.lastName}`.trim();
  const email = params.email.toLowerCase();

  const { data: existingProfile } = await admin
    .from('profiles')
    .select('id, account_status, role')
    .eq('email', email)
    .maybeSingle();

  if (existingProfile) {
    if (PRIVILEGED_ROLES.has(existingProfile.role ?? '')) {
      throw new Error(
        'Cet email correspond à un compte staff. Impossible de l’inviter comme apprenant.'
      );
    }

    const patch: Record<string, string> = {
      first_name: params.firstName,
      last_name: params.lastName,
      full_name: fullName,
      updated_at: new Date().toISOString(),
    };
    if (!existingProfile.role || existingProfile.role === 'apprenant') {
      patch.role = 'apprenant';
    }
    if (existingProfile.account_status !== 'active') {
      patch.account_status = 'invited';
    }
    await admin.from('profiles').update(patch).eq('id', existingProfile.id);
    return { userId: existingProfile.id };
  }

  const { data: created, error: createError } = await admin.auth.admin.createUser({
    email,
    password: bootstrapPassword(),
    email_confirm: true,
    user_metadata: {
      first_name: params.firstName,
      last_name: params.lastName,
      full_name: fullName,
    },
  });
  if (createError || !created.user) {
    if (/already|registered|exists/i.test(createError?.message ?? '')) {
      for (let page = 1; page <= 5; page++) {
        const { data: listed } = await admin.auth.admin.listUsers({ page, perPage: 200 });
        const found = listed?.users?.find((u) => u.email?.toLowerCase() === email);
        if (found) {
          const { data: existingById } = await admin
            .from('profiles')
            .select('role')
            .eq('id', found.id)
            .maybeSingle();
          if (existingById && PRIVILEGED_ROLES.has(existingById.role ?? '')) {
            throw new Error(
              'Cet email correspond à un compte staff. Impossible de l’inviter comme apprenant.'
            );
          }
          await admin.from('profiles').upsert({
            id: found.id,
            email,
            first_name: params.firstName,
            last_name: params.lastName,
            full_name: fullName,
            role: 'apprenant',
            account_status: 'invited',
            updated_at: new Date().toISOString(),
          });
          return { userId: found.id };
        }
        if (!listed?.users?.length || listed.users.length < 200) break;
      }
    }
    console.error('[ensureInvitedUser] createUser failed');
    throw genericUserError();
  }

  await admin.from('profiles').upsert({
    id: created.user.id,
    email,
    first_name: params.firstName,
    last_name: params.lastName,
    full_name: fullName,
    role: 'apprenant',
    account_status: 'invited',
    updated_at: new Date().toISOString(),
  });

  return { userId: created.user.id };
}

/**
 * Pose le mot de passe temporaire, active le compte et inscrit à la formation.
 * Le mot de passe n’est jamais persisté en clair.
 */
async function setPasswordActivateAndEnroll(params: {
  userId: string;
  formationId: string;
  firstName: string;
  lastName: string;
  password: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const admin = createAdminClient();
  const fullName = `${params.firstName} ${params.lastName}`.trim();

  const { error: pwdError } = await admin.auth.admin.updateUserById(params.userId, {
    password: params.password,
    email_confirm: true,
  });
  if (pwdError) {
    console.error('[setPasswordActivateAndEnroll] password update failed');
    return { ok: false, error: 'Impossible de définir le mot de passe temporaire.' };
  }

  await admin
    .from('profiles')
    .update({
      account_status: 'active',
      first_name: params.firstName,
      last_name: params.lastName,
      full_name: fullName || null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', params.userId)
    .neq('role', 'admin')
    .neq('role', 'formateur');

  await admin.from('enrollments').upsert(
    { user_id: params.userId, course_id: params.formationId, progress_percent: 0 },
    { onConflict: 'user_id,course_id' }
  );

  return { ok: true };
}

async function getFormationTitle(formationId: string): Promise<string | null> {
  const admin = createAdminClient();
  const { data } = await admin.from('courses').select('title').eq('id', formationId).maybeSingle();
  return data?.title ?? null;
}

async function createInvitationRow(params: {
  email: string;
  formationId: string;
  invitedBy: string;
  firstName: string;
  lastName: string;
  userId: string;
  sentCount: number;
}): Promise<{ id: string; token: string } | null> {
  const admin = createAdminClient();
  const token = generateInvitationToken();
  const tokenHash = hashInvitationToken(token);
  const expiresAt = invitationExpiresAt();

  const { data: inserted, error: insertError } = await admin
    .from('invitations')
    .insert({
      email: params.email,
      formation_id: params.formationId,
      token_hash: tokenHash,
      status: 'pending',
      expires_at: expiresAt.toISOString(),
      invited_by: params.invitedBy,
      first_name: params.firstName,
      last_name: params.lastName,
      user_id: params.userId,
      sent_count: params.sentCount,
    })
    .select('id')
    .single();

  if (insertError || !inserted) {
    console.error('[createInvitationRow] insert failed');
    return null;
  }
  return { id: inserted.id, token };
}

/**
 * Crée une invitation + envoie l’email (lien + mot de passe temporaire),
 * ou indique « déjà invité ».
 * action=resend : révoque l’ancien token, génère un nouveau MDP, renvoie l’email.
 */
export async function inviteOrResendApprenant(
  input: InviteApprenantInput,
  invitedBy: string
): Promise<InviteApprenantResult> {
  const admin = createAdminClient();
  const includePassword = input.includePassword !== false;
  const formationTitle = await getFormationTitle(input.formationId);
  if (!formationTitle) {
    return { ok: false, error: 'Formation introuvable', code: 'not_found' };
  }

  let userId: string;
  try {
    ({ userId } = await ensureInvitedUser({
      email: input.email,
      firstName: input.firstName,
      lastName: input.lastName,
    }));
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Erreur utilisateur';
    const code = /staff/i.test(msg) ? 'forbidden' : undefined;
    return { ok: false, error: msg, code };
  }

  if (input.action === 'resend') {
    let targetId = input.invitationId;
    if (!targetId) {
      const { data: pending } = await admin
        .from('invitations')
        .select('id, sent_count')
        .eq('email', input.email)
        .eq('formation_id', input.formationId)
        .in('status', ['pending', 'expired', 'accepted'])
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      targetId = pending?.id;
    }
    if (!targetId) {
      return { ok: false, error: 'Aucune invitation à renvoyer', code: 'not_found' };
    }

    const { data: current } = await admin
      .from('invitations')
      .select('id, sent_count, email')
      .eq('id', targetId)
      .eq('email', input.email)
      .maybeSingle();
    if (!current) {
      return { ok: false, error: 'Invitation introuvable', code: 'not_found' };
    }

    const nextCount = (current.sent_count ?? 1) + 1;
    if (nextCount > MAX_INVITATION_SENT_COUNT) {
      return {
        ok: false,
        error: `Nombre maximum de renvois atteint (${MAX_INVITATION_SENT_COUNT}).`,
        code: 'forbidden',
      };
    }

    await admin.from('invitations').update({ status: 'revoked' }).eq('id', current.id);

    const temporaryPassword = includePassword ? generateInvitePassword() : null;
    if (temporaryPassword) {
      const activated = await setPasswordActivateAndEnroll({
        userId,
        formationId: input.formationId,
        firstName: input.firstName,
        lastName: input.lastName,
        password: temporaryPassword,
      });
      if (!activated.ok) {
        return { ok: false, error: activated.error, code: 'auth' };
      }
    }

    const created = await createInvitationRow({
      email: input.email,
      formationId: input.formationId,
      invitedBy,
      firstName: input.firstName,
      lastName: input.lastName,
      userId,
      sentCount: nextCount,
    });
    if (!created) {
      return { ok: false, error: 'Échec de création de l’invitation' };
    }

    const sent = await sendInvitationEmail({
      to: input.email,
      formationTitle,
      token: created.token,
      firstName: input.firstName,
      temporaryPassword,
    });
    if (!sent.ok) {
      return { ok: false, error: 'Échec d’envoi de l’email', code: 'email' };
    }
    return { ok: true, status: 'renvoye', invitationId: created.id };
  }

  const { data: existingPending } = await admin
    .from('invitations')
    .select('id, expires_at')
    .eq('email', input.email)
    .eq('formation_id', input.formationId)
    .eq('status', 'pending')
    .gt('expires_at', new Date().toISOString())
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (existingPending) {
    return { ok: true, status: 'deja_invite', invitationId: existingPending.id };
  }

  await admin
    .from('invitations')
    .update({ status: 'expired' })
    .eq('email', input.email)
    .eq('formation_id', input.formationId)
    .eq('status', 'pending')
    .lt('expires_at', new Date().toISOString());

  const temporaryPassword = includePassword ? generateInvitePassword() : null;
  if (temporaryPassword) {
    const activated = await setPasswordActivateAndEnroll({
      userId,
      formationId: input.formationId,
      firstName: input.firstName,
      lastName: input.lastName,
      password: temporaryPassword,
    });
    if (!activated.ok) {
      return { ok: false, error: activated.error, code: 'auth' };
    }
  }

  const created = await createInvitationRow({
    email: input.email,
    formationId: input.formationId,
    invitedBy,
    firstName: input.firstName,
    lastName: input.lastName,
    userId,
    sentCount: 1,
  });
  if (!created) {
    return { ok: false, error: 'Échec de création de l’invitation' };
  }

  const sent = await sendInvitationEmail({
    to: input.email,
    formationTitle,
    token: created.token,
    firstName: input.firstName,
    temporaryPassword,
  });
  if (!sent.ok) {
    return { ok: false, error: 'Échec d’envoi de l’email', code: 'email' };
  }

  return { ok: true, status: 'cree', invitationId: created.id };
}

/**
 * Demande publique d’un nouveau lien / identifiants : réponse toujours neutre.
 */
export async function requestNewInvitationLink(emailRaw: string): Promise<void> {
  const parsed = z.string().trim().email().max(254).safeParse(emailRaw);
  if (!parsed.success) return;
  const email = parsed.data.toLowerCase();

  try {
    const admin = createAdminClient();
    const { data: inv } = await admin
      .from('invitations')
      .select('id, email, formation_id, first_name, last_name, sent_count, invited_by, user_id')
      .eq('email', email)
      .in('status', ['pending', 'expired', 'accepted'])
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!inv?.formation_id) return;
    if ((inv.sent_count ?? 1) >= MAX_INVITATION_SENT_COUNT) return;

    await inviteOrResendApprenant(
      {
        email,
        firstName: inv.first_name || 'Apprenant',
        lastName: inv.last_name || ' ',
        formationId: inv.formation_id,
        action: 'resend',
        invitationId: inv.id,
        includePassword: true,
      },
      inv.invited_by || inv.user_id || inv.id
    );
  } catch {
    // silence volontaire — pas de fuite d’existence
  }
}
