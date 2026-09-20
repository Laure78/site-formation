'use server';

import { revalidatePath } from 'next/cache';
import { requireOrganisationAdminAccess } from '@/lib/admin-access';
import { createAdminClient } from '@/lib/supabase/admin';
import type { ProspectionStatut } from '@/lib/prospection/constants';

async function requireProspectionAdmin() {
  const access = await requireOrganisationAdminAccess();
  if (!access.ok) {
    return { ok: false as const, error: 'Accès réservé aux administrateurs' };
  }
  return { ok: true as const, userId: access.userId };
}

function revalidateProspection(prospectId?: string) {
  revalidatePath('/admin/prospection');
  revalidatePath('/admin/prospection/prospects');
  revalidatePath('/admin/prospection/relances');
  revalidatePath('/admin/prospection/emails');
  revalidatePath('/admin/prospection/entreprises');
  revalidatePath('/admin/prospection/modeles');
  if (prospectId) revalidatePath(`/admin/prospection/prospects/${prospectId}`);
}

export type ProspectInput = {
  prenom: string;
  nom: string;
  email: string;
  telephone?: string | null;
  entreprise?: string | null;
  fonction?: string | null;
  linkedin_url?: string | null;
  site_web?: string | null;
  ville?: string | null;
  departement?: string | null;
  region?: string | null;
  type_structure?: string | null;
  taille_entreprise?: string | null;
  corps_metier?: string | null;
  effectif_approx?: string | null;
  besoins_identifies?: string[];
  formations_interessees?: string[];
  source_prospect?: string | null;
  notes_crm?: string | null;
  statut?: string | null;
  prochaine_relance_at?: string | null;
};

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function upsertProspectAction(
  input: ProspectInput,
  prospectId?: string
): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const auth = await requireProspectionAdmin();
  if (!auth.ok) return auth;

  const email = normalizeEmail(input.email);
  if (!input.prenom?.trim() || !input.nom?.trim() || !email) {
    return { ok: false, error: 'Prénom, nom et email sont obligatoires.' };
  }

  const supabase = createAdminClient();
  const payload = {
    prenom: input.prenom.trim(),
    nom: input.nom.trim(),
    email,
    telephone: input.telephone?.trim() || null,
    entreprise: input.entreprise?.trim() || null,
    fonction: input.fonction?.trim() || null,
    linkedin_url: input.linkedin_url?.trim() || null,
    site_web: input.site_web?.trim() || null,
    ville: input.ville?.trim() || null,
    departement: input.departement?.trim() || null,
    region: input.region?.trim() || 'Île-de-France',
    type_structure: input.type_structure || null,
    taille_entreprise: input.taille_entreprise || null,
    corps_metier: input.corps_metier?.trim() || null,
    effectif_approx: input.effectif_approx?.trim() || null,
    besoins_identifies: input.besoins_identifies ?? [],
    formations_interessees: input.formations_interessees ?? [],
    source_prospect: input.source_prospect?.trim() || null,
    notes_crm: input.notes_crm?.trim() || null,
    statut: (input.statut as ProspectionStatut) || 'a_contacter',
    prochaine_relance_at: input.prochaine_relance_at || null,
    date_modification: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: auth.userId,
  };

  if (prospectId) {
    const { error } = await supabase.from('prospects').update(payload).eq('id', prospectId);
    if (error) return { ok: false, error: error.message };
    revalidateProspection(prospectId);
    return { ok: true, id: prospectId };
  }

  // Doublon email
  const { data: existing } = await supabase
    .from('prospects')
    .select('id')
    .ilike('email', email)
    .maybeSingle();
  if (existing?.id) {
    return { ok: false, error: 'Un prospect avec cet email existe déjà.' };
  }

  const { data, error } = await supabase
    .from('prospects')
    .insert({ ...payload, date_creation: new Date().toISOString() })
    .select('id')
    .single();
  if (error) return { ok: false, error: error.message };

  await supabase.from('prospecting_actions').insert({
    prospect_id: data.id,
    action_type: 'creation',
    title: 'Prospect ajouté',
    created_by: auth.userId,
  });

  revalidateProspection(data.id);
  return { ok: true, id: data.id };
}

export async function deleteProspectAction(
  prospectId: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const auth = await requireProspectionAdmin();
  if (!auth.ok) return auth;
  const supabase = createAdminClient();
  const { error } = await supabase.from('prospects').delete().eq('id', prospectId);
  if (error) return { ok: false, error: error.message };
  revalidateProspection();
  return { ok: true };
}

export async function updateProspectStatutAction(
  prospectId: string,
  statut: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const auth = await requireProspectionAdmin();
  if (!auth.ok) return auth;
  const supabase = createAdminClient();
  const { error } = await supabase
    .from('prospects')
    .update({
      statut,
      date_modification: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', prospectId);
  if (error) return { ok: false, error: error.message };

  await supabase.from('prospecting_actions').insert({
    prospect_id: prospectId,
    action_type: 'statut',
    title: `Statut → ${statut}`,
    created_by: auth.userId,
  });

  revalidateProspection(prospectId);
  return { ok: true };
}

export async function addProspectNoteAction(
  prospectId: string,
  note: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const auth = await requireProspectionAdmin();
  if (!auth.ok) return auth;
  if (!note.trim()) return { ok: false, error: 'Note vide' };

  const supabase = createAdminClient();
  await supabase.from('prospecting_actions').insert({
    prospect_id: prospectId,
    action_type: 'note',
    title: 'Note',
    details: note.trim(),
    created_by: auth.userId,
  });

  // Aussi dans notes_crm (append) + prospect_notes legacy
  const { data: p } = await supabase
    .from('prospects')
    .select('notes_crm')
    .eq('id', prospectId)
    .maybeSingle();
  const prev = p?.notes_crm?.trim() ? `${p.notes_crm.trim()}\n\n` : '';
  await supabase
    .from('prospects')
    .update({
      notes_crm: `${prev}${new Date().toLocaleDateString('fr-FR')} — ${note.trim()}`,
      updated_at: new Date().toISOString(),
    })
    .eq('id', prospectId);

  await supabase.from('prospect_notes').insert({
    prospect_id: prospectId,
    type_note: 'note',
    contenu: note.trim(),
    created_by: auth.userId,
  });

  revalidateProspection(prospectId);
  return { ok: true };
}

export async function scheduleRelanceAction(
  prospectId: string,
  daysFromNow: number
): Promise<{ ok: true; at: string } | { ok: false; error: string }> {
  const auth = await requireProspectionAdmin();
  if (!auth.ok) return auth;

  const at = new Date();
  at.setDate(at.getDate() + Math.max(0, daysFromNow));
  at.setHours(9, 0, 0, 0);
  const iso = at.toISOString();

  const supabase = createAdminClient();
  const { error } = await supabase
    .from('prospects')
    .update({
      prochaine_relance_at: iso,
      statut: 'a_relancer',
      updated_at: new Date().toISOString(),
    })
    .eq('id', prospectId);
  if (error) return { ok: false, error: error.message };

  await supabase.from('prospecting_actions').insert({
    prospect_id: prospectId,
    action_type: 'relance_planifiee',
    title: `Relance planifiée (J+${daysFromNow})`,
    due_at: iso,
    created_by: auth.userId,
  });

  revalidateProspection(prospectId);
  return { ok: true, at: iso };
}

export async function markEmailSentAction(input: {
  prospectId: string;
  subject: string;
  body: string;
  emailType: string;
  scheduleRelanceDays?: number;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const auth = await requireProspectionAdmin();
  if (!auth.ok) return auth;

  const supabase = createAdminClient();
  const now = new Date().toISOString();

  const { data: email, error: emailErr } = await supabase
    .from('prospecting_emails')
    .insert({
      prospect_id: input.prospectId,
      subject: input.subject.trim(),
      body: input.body.trim(),
      email_type: input.emailType || 'autre',
      status: 'envoye',
      sent_at: now,
      created_by: auth.userId,
    })
    .select('id')
    .single();
  if (emailErr) return { ok: false, error: emailErr.message };

  await supabase.from('prospecting_actions').insert({
    prospect_id: input.prospectId,
    action_type: 'email_envoye',
    title: `Email envoyé — ${input.subject.trim()}`,
    details: input.body.trim().slice(0, 500),
    email_id: email.id,
    created_by: auth.userId,
  });

  const days = input.scheduleRelanceDays ?? 5;
  const relance = new Date();
  relance.setDate(relance.getDate() + days);
  relance.setHours(9, 0, 0, 0);

  await supabase
    .from('prospects')
    .update({
      statut: 'email_envoye',
      dernier_contact_at: now,
      prochaine_relance_at: relance.toISOString(),
      updated_at: now,
    })
    .eq('id', input.prospectId);

  await supabase.from('prospecting_actions').insert({
    prospect_id: input.prospectId,
    action_type: 'relance_planifiee',
    title: `Relance proposée dans ${days} jours`,
    due_at: relance.toISOString(),
    created_by: auth.userId,
  });

  revalidateProspection(input.prospectId);
  return { ok: true };
}

export async function saveTemplateAction(input: {
  id?: string;
  name: string;
  target_type?: string | null;
  email_type: string;
  subject_template: string;
  body_template: string;
}): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const auth = await requireProspectionAdmin();
  if (!auth.ok) return auth;
  if (!input.name.trim() || !input.subject_template.trim() || !input.body_template.trim()) {
    return { ok: false, error: 'Nom, objet et corps obligatoires' };
  }

  const supabase = createAdminClient();
  const payload = {
    name: input.name.trim(),
    target_type: input.target_type || null,
    email_type: input.email_type,
    subject_template: input.subject_template,
    body_template: input.body_template,
    updated_at: new Date().toISOString(),
    created_by: auth.userId,
  };

  if (input.id) {
    const { error } = await supabase
      .from('prospecting_templates')
      .update(payload)
      .eq('id', input.id);
    if (error) return { ok: false, error: error.message };
    revalidateProspection();
    return { ok: true, id: input.id };
  }

  const { data, error } = await supabase
    .from('prospecting_templates')
    .insert(payload)
    .select('id')
    .single();
  if (error) return { ok: false, error: error.message };
  revalidateProspection();
  return { ok: true, id: data.id };
}

export async function deleteTemplateAction(
  id: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const auth = await requireProspectionAdmin();
  if (!auth.ok) return auth;
  const supabase = createAdminClient();
  const { error } = await supabase.from('prospecting_templates').delete().eq('id', id);
  if (error) return { ok: false, error: error.message };
  revalidateProspection();
  return { ok: true };
}

export async function duplicateTemplateAction(
  id: string
): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const auth = await requireProspectionAdmin();
  if (!auth.ok) return auth;
  const supabase = createAdminClient();
  const { data: src, error } = await supabase
    .from('prospecting_templates')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error || !src) return { ok: false, error: error?.message ?? 'Modèle introuvable' };

  const { data, error: insErr } = await supabase
    .from('prospecting_templates')
    .insert({
      name: `${src.name} (copie)`,
      target_type: src.target_type,
      email_type: src.email_type,
      subject_template: src.subject_template,
      body_template: src.body_template,
      created_by: auth.userId,
    })
    .select('id')
    .single();
  if (insErr) return { ok: false, error: insErr.message };
  revalidateProspection();
  return { ok: true, id: data.id };
}
