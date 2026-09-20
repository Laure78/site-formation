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
    title: `Changement de statut → ${statut}`,
    details: `Nouveau statut : ${statut}`,
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

export async function markEmailSentAction(input: {
  prospectId: string;
  subject: string;
  body: string;
  emailType: string;
  scheduleRelanceDays?: number | null;
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

  const days = input.scheduleRelanceDays;
  const update: Record<string, unknown> = {
    statut: 'email_envoye',
    dernier_contact_at: now,
    updated_at: now,
  };

  if (days != null && days > 0) {
    const relance = new Date();
    relance.setDate(relance.getDate() + days);
    relance.setHours(9, 0, 0, 0);
    update.prochaine_relance_at = relance.toISOString();
    update.next_action = `Relancer (J+${days})`;
    update.next_action_type = 'relancer';
    update.next_action_at = relance.toISOString();
    update.relance_motif = `Suite email — J+${days}`;

    await supabase.from('prospecting_actions').insert({
      prospect_id: input.prospectId,
      action_type: 'relance_planifiee',
      title: `Relance proposée dans ${days} jours`,
      due_at: relance.toISOString(),
      created_by: auth.userId,
    });
  } else if (days === null) {
    update.next_action = 'Attendre réponse';
    update.next_action_type = 'attendre_reponse';
  } else {
    // défaut J+5
    const relance = new Date();
    relance.setDate(relance.getDate() + 5);
    relance.setHours(9, 0, 0, 0);
    update.prochaine_relance_at = relance.toISOString();
    update.next_action = 'Relancer (J+5)';
    update.next_action_type = 'relancer';
    update.next_action_at = relance.toISOString();
  }

  await supabase.from('prospects').update(update).eq('id', input.prospectId);

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

export type ImportProspectsJsonResult =
  | {
      ok: true;
      imported: number;
      skippedDuplicates: number;
      errors: string[];
      ids: string[];
    }
  | { ok: false; error: string };

type ExistingProspectLite = {
  id: string;
  prenom: string;
  nom: string;
  email: string;
  entreprise: string | null;
  fonction: string | null;
  telephone: string | null;
  linkedin_url: string | null;
  ville: string | null;
  departement: string | null;
  region: string | null;
  type_structure: string | null;
  prospect_type: string | null;
  department_name: string | null;
  source_prospect: string | null;
  source_metadata: Record<string, unknown> | null;
  notes_crm: string | null;
  tags: string[] | null;
  besoins_identifies: string[] | null;
  statut: string | null;
  prochaine_relance_at: string | null;
};

async function findDuplicateProspect(
  supabase: ReturnType<typeof createAdminClient>,
  draft: {
    email: string | null;
    prenom: string;
    nom: string;
    entreprise?: string | null;
    fonction?: string | null;
  }
): Promise<ExistingProspectLite | null> {
  const select =
    'id, prenom, nom, email, entreprise, fonction, telephone, linkedin_url, ville, departement, region, type_structure, prospect_type, department_name, source_prospect, source_metadata, notes_crm, tags, besoins_identifies, statut, prochaine_relance_at';

  if (draft.email) {
    const { data } = await supabase
      .from('prospects')
      .select(select)
      .ilike('email', draft.email)
      .limit(1)
      .maybeSingle();
    if (data) return data as ExistingProspectLite;
  }

  if (draft.prenom && draft.nom && draft.entreprise) {
    const { data } = await supabase
      .from('prospects')
      .select(select)
      .ilike('prenom', draft.prenom)
      .ilike('nom', draft.nom)
      .ilike('entreprise', draft.entreprise)
      .limit(5);
    const match = (data ?? []).find(
      (p) =>
        p.prenom?.toLowerCase() === draft.prenom.toLowerCase() &&
        p.nom?.toLowerCase() === draft.nom.toLowerCase() &&
        (p.entreprise ?? '').toLowerCase() === draft.entreprise!.toLowerCase()
    );
    if (match) return match as ExistingProspectLite;
  }

  if (!draft.email && draft.entreprise && draft.fonction) {
    const { data } = await supabase
      .from('prospects')
      .select(select)
      .ilike('entreprise', draft.entreprise)
      .ilike('fonction', draft.fonction)
      .limit(5);
    const match = (data ?? []).find(
      (p) =>
        (p.entreprise ?? '').toLowerCase() === draft.entreprise!.toLowerCase() &&
        (p.fonction ?? '').toLowerCase() === draft.fonction!.toLowerCase()
    );
    if (match) return match as ExistingProspectLite;
  }

  return null;
}

function mergeMissingOnly(
  existing: ExistingProspectLite,
  draft: import('@/lib/prospection/import-json').ProspectImportDraft
) {
  const fill = <T,>(cur: T | null | undefined, next: T | null | undefined): T | null | undefined =>
    cur == null || cur === '' || (Array.isArray(cur) && cur.length === 0) ? next : cur;

  return {
    telephone: fill(existing.telephone, draft.telephone ?? null),
    fonction: fill(existing.fonction, draft.fonction ?? null),
    linkedin_url: fill(existing.linkedin_url, draft.linkedin_url ?? null),
    entreprise: fill(existing.entreprise, draft.entreprise ?? null),
    ville: fill(existing.ville, draft.ville ?? null),
    departement: fill(existing.departement, draft.departement ?? null),
    region: fill(existing.region, draft.region ?? null),
    type_structure: fill(existing.type_structure, draft.type_structure ?? null),
    prospect_type: fill(existing.prospect_type, draft.prospect_type ?? null),
    department_name: fill(existing.department_name, draft.department_name ?? null),
    source_prospect: fill(existing.source_prospect, draft.source_prospect ?? null),
    source_metadata: fill(existing.source_metadata, draft.source_metadata ?? null),
    notes_crm: fill(existing.notes_crm, draft.notes_crm ?? null),
    tags: [
      ...new Set([...(existing.tags ?? []), ...(draft.tags ?? [])]),
    ],
    besoins_identifies: [
      ...new Set([
        ...(existing.besoins_identifies ?? []),
        ...(draft.besoins_identifies ?? []),
      ]),
    ],
    prochaine_relance_at: fill(
      existing.prochaine_relance_at,
      draft.prochaine_relance_at ?? null
    ),
    date_modification: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

function draftToInsertPayload(
  draft: import('@/lib/prospection/import-json').ProspectImportDraft,
  userId: string
) {
  const now = new Date().toISOString();
  const email =
    draft.email?.trim().toLowerCase() ||
    `sans-email+${draft.prenom}.${draft.nom}.${Date.now()}@import.local`.toLowerCase();

  return {
    prenom: draft.prenom.trim(),
    nom: draft.nom.trim(),
    email,
    telephone: draft.telephone?.trim() || null,
    entreprise: draft.entreprise?.trim() || null,
    fonction: draft.fonction?.trim() || null,
    linkedin_url: draft.linkedin_url?.trim() || null,
    site_web: draft.site_web?.trim() || null,
    ville: draft.ville?.trim() || null,
    departement: draft.departement?.trim() || null,
    department_name: draft.department_name?.trim() || null,
    region: draft.region?.trim() || 'Île-de-France',
    type_structure: draft.type_structure || null,
    prospect_type: draft.prospect_type?.trim() || null,
    besoins_identifies: draft.besoins_identifies ?? [],
    tags: draft.tags ?? [],
    source_prospect: draft.source_prospect?.trim() || null,
    source_metadata: draft.source_metadata ?? null,
    notes_crm: draft.notes_crm?.trim() || null,
    statut: (draft.statut as ProspectionStatut) || 'a_contacter',
    prochaine_relance_at: draft.prochaine_relance_at || null,
    date_creation: now,
    date_modification: now,
    updated_at: now,
    created_by: userId,
    pipeline_etape: 'nouveaux',
  };
}

/** Analyse un JSON sans écrire en base — aperçu + doublons. */
export async function analyzeProspectsJsonAction(
  rawJson: string
): Promise<
  | (import('@/lib/prospection/import-json').AnalyzeImportResult)
  | { ok: false; error: string }
> {
  const auth = await requireProspectionAdmin();
  if (!auth.ok) return auth;

  const { parseImportJsonBlock } = await import('@/lib/prospection/import-json');
  const parsed = parseImportJsonBlock(rawJson);
  if (!parsed.ok) return parsed;

  const supabase = createAdminClient();
  const rows: import('@/lib/prospection/import-json').AnalyzedProspectRow[] = [];

  for (const err of parsed.rowErrors) {
    rows.push({
      draft: {
        prenom: err.label?.split(' ')[0] ?? '?',
        nom: err.label?.split(' ').slice(1).join(' ') || '?',
        email: null,
        rowIndex: err.rowIndex,
      },
      status: 'error',
      error: err.error,
      defaultMode: 'ignore',
    });
  }

  for (const draft of parsed.drafts) {
    const existing = await findDuplicateProspect(supabase, draft);
    if (existing) {
      rows.push({
        draft,
        status: 'duplicate',
        existingId: existing.id,
        existingLabel: `${existing.prenom} ${existing.nom}${existing.entreprise ? ` — ${existing.entreprise}` : ''}`,
        defaultMode: 'merge_missing',
      });
    } else {
      rows.push({ draft, status: 'new', defaultMode: 'ignore' });
    }
  }

  rows.sort((a, b) => a.draft.rowIndex - b.draft.rowIndex);

  return {
    ok: true,
    source: parsed.source,
    rows,
    counts: {
      detected: rows.length,
      news: rows.filter((r) => r.status === 'new').length,
      duplicates: rows.filter((r) => r.status === 'duplicate').length,
      errors: rows.filter((r) => r.status === 'error').length,
    },
  };
}

export type ConfirmImportDecision = {
  rowIndex: number;
  mode: import('@/lib/prospection/import-json').DuplicateMode;
};

/** Confirme l’import après analyse (création / merge / ignore). */
export async function confirmProspectsJsonImportAction(
  rawJson: string,
  decisions: ConfirmImportDecision[] = []
): Promise<
  | {
      ok: true;
      imported: number;
      updated: number;
      skipped: number;
      errors: { label: string; reason: string }[];
      ids: string[];
    }
  | { ok: false; error: string }
> {
  const auth = await requireProspectionAdmin();
  if (!auth.ok) return auth;

  const analyzed = await analyzeProspectsJsonAction(rawJson);
  if (!analyzed.ok) return analyzed;

  const decisionMap = new Map(decisions.map((d) => [d.rowIndex, d.mode]));
  const supabase = createAdminClient();
  const ids: string[] = [];
  const errors: { label: string; reason: string }[] = [];
  let imported = 0;
  let updated = 0;
  let skipped = 0;

  for (const row of analyzed.rows) {
    const label = `${row.draft.prenom} ${row.draft.nom}`;

    if (row.status === 'error') {
      errors.push({ label, reason: row.error ?? 'erreur' });
      skipped += 1;
      continue;
    }

    if (row.status === 'duplicate') {
      const mode = decisionMap.get(row.draft.rowIndex) ?? row.defaultMode;
      if (mode === 'ignore') {
        skipped += 1;
        continue;
      }
      if (!row.existingId) {
        skipped += 1;
        continue;
      }

      const { data: existing } = await supabase
        .from('prospects')
        .select(
          'id, prenom, nom, email, entreprise, fonction, telephone, linkedin_url, ville, departement, region, type_structure, prospect_type, department_name, source_prospect, source_metadata, notes_crm, tags, besoins_identifies, statut, prochaine_relance_at'
        )
        .eq('id', row.existingId)
        .maybeSingle();

      if (!existing) {
        errors.push({ label, reason: 'fiche existante introuvable' });
        skipped += 1;
        continue;
      }

      const payload =
        mode === 'update'
          ? {
              telephone: row.draft.telephone ?? existing.telephone,
              fonction: row.draft.fonction ?? existing.fonction,
              linkedin_url: row.draft.linkedin_url ?? existing.linkedin_url,
              entreprise: row.draft.entreprise ?? existing.entreprise,
              ville: row.draft.ville ?? existing.ville,
              departement: row.draft.departement ?? existing.departement,
              region: row.draft.region ?? existing.region,
              type_structure: row.draft.type_structure ?? existing.type_structure,
              prospect_type: row.draft.prospect_type ?? existing.prospect_type,
              department_name: row.draft.department_name ?? existing.department_name,
              source_prospect: row.draft.source_prospect ?? existing.source_prospect,
              source_metadata: row.draft.source_metadata ?? existing.source_metadata,
              notes_crm: row.draft.notes_crm ?? existing.notes_crm,
              tags: [...new Set([...(existing.tags ?? []), ...(row.draft.tags ?? [])])],
              besoins_identifies: [
                ...new Set([
                  ...(existing.besoins_identifies ?? []),
                  ...(row.draft.besoins_identifies ?? []),
                ]),
              ],
              statut: row.draft.statut ?? existing.statut,
              prochaine_relance_at:
                row.draft.prochaine_relance_at ?? existing.prochaine_relance_at,
              date_modification: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            }
          : mergeMissingOnly(existing as ExistingProspectLite, row.draft);

      const { error } = await supabase
        .from('prospects')
        .update(payload)
        .eq('id', row.existingId);
      if (error) {
        errors.push({ label, reason: error.message });
        skipped += 1;
        continue;
      }

      await supabase.from('prospecting_actions').insert({
        prospect_id: row.existingId,
        action_type: 'import',
        title: 'Fiche enrichie via import JSON',
        details: row.draft.source_prospect
          ? `Source : ${row.draft.source_prospect}`
          : 'Import JSON — informations ajoutées',
        created_by: auth.userId,
      });

      ids.push(row.existingId);
      updated += 1;
      continue;
    }

    // new — email facultatif : placeholder local si absent
    const payload = draftToInsertPayload(row.draft, auth.userId);
    const { data, error } = await supabase
      .from('prospects')
      .insert(payload)
      .select('id')
      .single();

    if (error || !data?.id) {
      errors.push({ label, reason: error?.message ?? 'échec création' });
      skipped += 1;
      continue;
    }

    await supabase.from('prospecting_actions').insert({
      prospect_id: data.id,
      action_type: 'import',
      title: 'Prospect ajouté au CRM',
      details: row.draft.source_prospect
        ? `Importé depuis JSON\nSource : ${row.draft.source_prospect}`
        : 'Importé depuis JSON',
      created_by: auth.userId,
    });

    ids.push(data.id);
    imported += 1;
  }

  revalidateProspection();
  return { ok: true, imported, updated, skipped, errors, ids };
}

/** Compat : import direct (ignore doublons). */
export async function importProspectsJsonAction(
  rawJson: string
): Promise<ImportProspectsJsonResult> {
  const analyzed = await analyzeProspectsJsonAction(rawJson);
  if (!analyzed.ok) return analyzed;

  const decisions = analyzed.rows
    .filter((r) => r.status === 'duplicate')
    .map((r) => ({ rowIndex: r.draft.rowIndex, mode: 'ignore' as const }));

  const res = await confirmProspectsJsonImportAction(rawJson, decisions);
  if (!res.ok) return res;
  return {
    ok: true,
    imported: res.imported,
    skippedDuplicates: res.skipped,
    errors: res.errors.map((e) => `${e.label} : ${e.reason}`),
    ids: res.ids,
  };
}

export async function scheduleRelanceAction(
  prospectId: string,
  daysFromNow: number,
  motif?: string | null,
  atIso?: string | null
): Promise<{ ok: true; at: string } | { ok: false; error: string }> {
  const auth = await requireProspectionAdmin();
  if (!auth.ok) return auth;

  let iso = atIso ?? null;
  if (!iso) {
    const at = new Date();
    at.setDate(at.getDate() + Math.max(0, daysFromNow));
    at.setHours(9, 0, 0, 0);
    iso = at.toISOString();
  }

  const supabase = createAdminClient();
  const { error } = await supabase
    .from('prospects')
    .update({
      prochaine_relance_at: iso,
      relance_motif: motif?.trim() || null,
      statut: 'a_relancer',
      next_action: motif?.trim() || `Relance J+${daysFromNow}`,
      next_action_type: 'relancer',
      next_action_at: iso,
      updated_at: new Date().toISOString(),
    })
    .eq('id', prospectId);
  if (error) return { ok: false, error: error.message };

  await supabase.from('prospecting_actions').insert({
    prospect_id: prospectId,
    action_type: 'relance',
    title: motif?.trim()
      ? `Relance planifiée — ${motif.trim()}`
      : `Relance planifiée (J+${daysFromNow})`,
    details: motif?.trim() || null,
    due_at: iso,
    created_by: auth.userId,
  });

  revalidateProspection(prospectId);
  return { ok: true, at: iso };
}

/** Marquer comme contacté + proposer relance. */
export async function markProspectContactedAction(
  prospectId: string,
  scheduleRelanceDays?: number | null,
  motif?: string | null
): Promise<{ ok: true } | { ok: false; error: string }> {
  const auth = await requireProspectionAdmin();
  if (!auth.ok) return auth;

  const supabase = createAdminClient();
  const now = new Date().toISOString();

  const update: Record<string, unknown> = {
    dernier_contact_at: now,
    updated_at: now,
    date_modification: now,
  };

  if (scheduleRelanceDays != null && scheduleRelanceDays > 0) {
    const at = new Date();
    at.setDate(at.getDate() + scheduleRelanceDays);
    at.setHours(9, 0, 0, 0);
    update.prochaine_relance_at = at.toISOString();
    update.relance_motif = motif?.trim() || 'Suite au dernier contact';
    update.statut = 'a_relancer';
  }

  const { error } = await supabase.from('prospects').update(update).eq('id', prospectId);
  if (error) return { ok: false, error: error.message };

  await supabase.from('prospecting_actions').insert({
    prospect_id: prospectId,
    action_type: 'appel',
    title: 'Contact enregistré',
    details: 'Marqué comme contacté',
    created_by: auth.userId,
  });

  if (scheduleRelanceDays != null && scheduleRelanceDays > 0) {
    await supabase.from('prospecting_actions').insert({
      prospect_id: prospectId,
      action_type: 'relance',
      title: `Relance proposée dans ${scheduleRelanceDays} jours`,
      due_at: update.prochaine_relance_at as string,
      created_by: auth.userId,
    });
  }

  revalidateProspection(prospectId);
  return { ok: true };
}

export async function postponeRelanceAction(
  prospectId: string,
  daysFromNow: number
): Promise<{ ok: true } | { ok: false; error: string }> {
  return scheduleRelanceAction(prospectId, daysFromNow, 'Report de relance');
}

/** Marquer comme « Relancé » + proposer nouvelle date. */
export async function markRelanceDoneAction(
  prospectId: string,
  nextDays?: number | null
): Promise<{ ok: true } | { ok: false; error: string }> {
  const auth = await requireProspectionAdmin();
  if (!auth.ok) return auth;

  const supabase = createAdminClient();
  const now = new Date().toISOString();

  await supabase.from('prospecting_actions').insert({
    prospect_id: prospectId,
    action_type: 'relance',
    title: 'Relancé',
    details: 'Marqué comme relancé',
    created_by: auth.userId,
  });

  const update: Record<string, unknown> = {
    statut: 'relance',
    dernier_contact_at: now,
    updated_at: now,
    date_modification: now,
  };

  if (nextDays != null && nextDays > 0) {
    const at = new Date();
    at.setDate(at.getDate() + nextDays);
    at.setHours(9, 0, 0, 0);
    update.prochaine_relance_at = at.toISOString();
    update.next_action = `Relancer (J+${nextDays})`;
    update.next_action_type = 'relancer';
    update.next_action_at = at.toISOString();
    update.statut = 'a_relancer';
  } else {
    update.next_action = 'Attendre réponse';
    update.next_action_type = 'attendre_reponse';
    update.next_action_at = null;
    update.prochaine_relance_at = null;
  }

  const { error } = await supabase.from('prospects').update(update).eq('id', prospectId);
  if (error) return { ok: false, error: error.message };

  revalidateProspection(prospectId);
  return { ok: true };
}

export async function setNextActionAction(
  prospectId: string,
  input: {
    next_action: string;
    next_action_type?: string | null;
    next_action_at?: string | null;
  }
): Promise<{ ok: true } | { ok: false; error: string }> {
  const auth = await requireProspectionAdmin();
  if (!auth.ok) return auth;
  const supabase = createAdminClient();
  const { error } = await supabase
    .from('prospects')
    .update({
      next_action: input.next_action.trim(),
      next_action_type: input.next_action_type || 'autre',
      next_action_at: input.next_action_at || null,
      prochaine_relance_at: input.next_action_at || null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', prospectId);
  if (error) return { ok: false, error: error.message };

  await supabase.from('prospecting_actions').insert({
    prospect_id: prospectId,
    action_type: 'note',
    title: `Prochaine action : ${input.next_action.trim()}`,
    due_at: input.next_action_at || null,
    created_by: auth.userId,
  });

  revalidateProspection(prospectId);
  return { ok: true };
}

export async function getProspectDrawerDataAction(prospectId: string): Promise<
  | {
      ok: true;
      prospect: import('@/lib/prospection/types').ProspectRow;
      actions: import('@/lib/prospection/types').ProspectingActionRow[];
      emails: import('@/lib/prospection/types').ProspectingEmailRow[];
    }
  | { ok: false; error: string }
> {
  const auth = await requireProspectionAdmin();
  if (!auth.ok) return auth;

  const supabase = createAdminClient();
  const {
    getProspect,
    listProspectActions,
    listProspectEmails,
  } = await import('@/lib/prospection/queries');

  const prospect = await getProspect(supabase, prospectId);
  if (!prospect) return { ok: false, error: 'Prospect introuvable' };

  const [actions, emails] = await Promise.all([
    listProspectActions(supabase, prospectId),
    listProspectEmails(supabase, prospectId),
  ]);

  return {
    ok: true,
    prospect,
    actions: actions.slice(0, 8),
    emails: emails.slice(0, 5),
  };
}
