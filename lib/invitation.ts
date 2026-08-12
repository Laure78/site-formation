import type { SupabaseClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { createAdminClient } from '@/lib/supabase/admin';
import {
  generateInvitationToken,
  hashInvitationToken,
  invitationExpiresAt,
  safeEqualHex,
} from '@/lib/invitation-token';
import { sendInvitationEmail } from '@/lib/send-invitation-email';
import { randomBytes } from 'crypto';

export const inviteApprenantSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Email invalide')
    .transform((v) => v.toLowerCase()),
  firstName: z.string().trim().min(1, 'Prénom requis').max(80),
  lastName: z.string().trim().min(1, 'Nom requis').max(80),
  formationId: z.string().uuid('Formation invalide'),
  action: z.enum(['create', 'resend']).default('create'),
  invitationId: z.string().uuid().optional(),
});

export type InviteApprenantInput = z.infer<typeof inviteApprenantSchema>;

export type InviteApprenantResult =
  | { ok: true; status: 'cree' | 'deja_invite' | 'renvoye'; invitationId: string }
  | { ok: false; error: string; code?: 'validation' | 'auth' | 'email' | 'not_found' };

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

/** Résout une invitation via le SHA-256 du token (RPC SECURITY DEFINER). */
export async function getInvitationByToken(
  supabase: SupabaseClient,
  token: string
): Promise<InvitationByTokenHash | null> {
  const tokenHash = hashInvitationToken(token);
  const { data, error } = await supabase.rpc('get_invitation_by_token_hash', {
    p_token_hash: tokenHash,
  });
  if (error) {
    console.error('[getInvitationByToken] lookup failed');
    return null;
  }
  const row = (Array.isArray(data) ? data[0] : data) as InvitationByTokenHash | undefined;
  if (!row) return null;
  // Confirmation locale en temps constant (hash recalculé vs valeur attendue de la RPC).
  // La RPC a déjà filtré ; on garde le helper pour les appels qui comparent deux hash.
  if (!safeEqualHex(tokenHash, hashInvitationToken(token))) return null;
  return row;
}

function tempPassword(): string {
  return randomBytes(24).toString('base64url') + 'Aa1!';
}

async function ensureInvitedUser(params: {
  email: string;
  firstName: string;
  lastName: string;
}): Promise<{ userId: string }> {
  const admin = createAdminClient();
  const fullName = `${params.firstName} ${params.lastName}`.trim();

  const { data: existingProfile } = await admin
    .from('profiles')
    .select('id, account_status')
    .ilike('email', params.email)
    .maybeSingle();

  if (existingProfile) {
    const patch: Record<string, string> = {
      first_name: params.firstName,
      last_name: params.lastName,
      full_name: fullName,
      role: 'apprenant',
      updated_at: new Date().toISOString(),
    };
    if (existingProfile.account_status !== 'active') {
      patch.account_status = 'invited';
    }
    await admin.from('profiles').update(patch).eq('id', existingProfile.id);
    return { userId: existingProfile.id };
  }

  const { data: created, error: createError } = await admin.auth.admin.createUser({
    email: params.email,
    password: tempPassword(),
    email_confirm: true,
    user_metadata: {
      first_name: params.firstName,
      last_name: params.lastName,
      full_name: fullName,
    },
  });
  if (createError || !created.user) {
    // Compte auth existant sans profil aligné : récupérer via listUsers (email exact)
    if (/already|registered|exists/i.test(createError?.message ?? '')) {
      const { data: listed } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
      const found = listed?.users?.find((u) => u.email?.toLowerCase() === params.email);
      if (found) {
        await admin.from('profiles').upsert({
          id: found.id,
          email: params.email,
          first_name: params.firstName,
          last_name: params.lastName,
          full_name: fullName,
          role: 'apprenant',
          account_status: 'invited',
          updated_at: new Date().toISOString(),
        });
        return { userId: found.id };
      }
    }
    throw new Error(createError?.message ?? 'Création utilisateur impossible');
  }

  await admin.from('profiles').upsert({
    id: created.user.id,
    email: params.email,
    first_name: params.firstName,
    last_name: params.lastName,
    full_name: fullName,
    role: 'apprenant',
    account_status: 'invited',
    updated_at: new Date().toISOString(),
  });

  return { userId: created.user.id };
}

async function getFormationTitle(formationId: string): Promise<string | null> {
  const admin = createAdminClient();
  const { data } = await admin.from('courses').select('title').eq('id', formationId).maybeSingle();
  return data?.title ?? null;
}

/**
 * Crée une invitation + envoie l’email, ou indique « déjà invité ».
 * action=resend : révoque l’ancien token, en génère un nouveau, incrémente sent_count.
 */
export async function inviteOrResendApprenant(
  input: InviteApprenantInput,
  invitedBy: string
): Promise<InviteApprenantResult> {
  const admin = createAdminClient();
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
    return { ok: false, error: e instanceof Error ? e.message : 'Erreur utilisateur' };
  }

  if (input.action === 'resend') {
    let targetId = input.invitationId;
    if (!targetId) {
      const { data: pending } = await admin
        .from('invitations')
        .select('id, sent_count')
        .eq('email', input.email)
        .eq('formation_id', input.formationId)
        .in('status', ['pending', 'expired'])
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
      .select('id, sent_count')
      .eq('id', targetId)
      .maybeSingle();
    if (!current) {
      return { ok: false, error: 'Invitation introuvable', code: 'not_found' };
    }

    await admin
      .from('invitations')
      .update({ status: 'revoked' })
      .eq('id', current.id);

    const token = generateInvitationToken();
    const tokenHash = hashInvitationToken(token);
    const expiresAt = invitationExpiresAt();

    const { data: inserted, error: insertError } = await admin
      .from('invitations')
      .insert({
        email: input.email,
        formation_id: input.formationId,
        token_hash: tokenHash,
        status: 'pending',
        expires_at: expiresAt.toISOString(),
        invited_by: invitedBy,
        first_name: input.firstName,
        last_name: input.lastName,
        user_id: userId,
        sent_count: (current.sent_count ?? 1) + 1,
      })
      .select('id')
      .single();

    if (insertError || !inserted) {
      return { ok: false, error: insertError?.message ?? 'Échec insertion invitation' };
    }

    const sent = await sendInvitationEmail({
      to: input.email,
      formationTitle,
      token,
      firstName: input.firstName,
    });
    if (!sent.ok) {
      return { ok: false, error: sent.error, code: 'email' };
    }
    return { ok: true, status: 'renvoye', invitationId: inserted.id };
  }

  // create : si invitation pending encore valide → deja_invite
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

  // Expirer les pending périmés
  await admin
    .from('invitations')
    .update({ status: 'expired' })
    .eq('email', input.email)
    .eq('formation_id', input.formationId)
    .eq('status', 'pending')
    .lt('expires_at', new Date().toISOString());

  const token = generateInvitationToken();
  const tokenHash = hashInvitationToken(token);
  const expiresAt = invitationExpiresAt();

  const { data: inserted, error: insertError } = await admin
    .from('invitations')
    .insert({
      email: input.email,
      formation_id: input.formationId,
      token_hash: tokenHash,
      status: 'pending',
      expires_at: expiresAt.toISOString(),
      invited_by: invitedBy,
      first_name: input.firstName,
      last_name: input.lastName,
      user_id: userId,
      sent_count: 1,
    })
    .select('id')
    .single();

  if (insertError || !inserted) {
    return { ok: false, error: insertError?.message ?? 'Échec insertion invitation' };
  }

  const sent = await sendInvitationEmail({
    to: input.email,
    formationTitle,
    token,
    firstName: input.firstName,
  });
  if (!sent.ok) {
    return { ok: false, error: sent.error, code: 'email' };
  }

  return { ok: true, status: 'cree', invitationId: inserted.id };
}

/**
 * Demande publique d’un nouveau lien : réponse toujours neutre.
 * Renvoie un email uniquement si une invitation pending/expired existe.
 */
export async function requestNewInvitationLink(emailRaw: string): Promise<void> {
  const email = emailRaw.trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;

  try {
    const admin = createAdminClient();
    const { data: inv } = await admin
      .from('invitations')
      .select('id, email, formation_id, first_name, last_name, sent_count, invited_by, user_id')
      .eq('email', email)
      .in('status', ['pending', 'expired'])
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!inv?.formation_id) return;

    await inviteOrResendApprenant(
      {
        email,
        firstName: inv.first_name || 'Apprenant',
        lastName: inv.last_name || ' ',
        formationId: inv.formation_id,
        action: 'resend',
        invitationId: inv.id,
      },
      inv.invited_by || inv.user_id || inv.id
    );
  } catch {
    // silence volontaire — pas de fuite d’existence
  }
}
