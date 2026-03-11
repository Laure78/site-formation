'use server';

import { createClient } from '@/lib/supabase/server';

type Secteur = 'btp' | 'automobile' | 'industrie' | 'service' | 'autre';
type Taille = '1-10' | '10-50' | '50-250' | '250+';
type NiveauIa = 'oui_regulier' | 'teste' | 'jamais';
type Objectif = 'temps_admin' | 'automatisation' | 'marketing' | 'recrutement' | 'prospection' | 'autre';
type Budget = 'moins_1000' | '1000_5000' | '5000_plus';

export type QualificationFormData = {
  start_at: string;
  end_at: string;
  prenom: string;
  nom: string;
  email: string;
  telephone?: string;
  entreprise?: string;
  secteur?: Secteur | string;
  taille_entreprise?: Taille | string;
  niveau_ia?: NiveauIa | string;
  objectif?: Objectif | string;
  budget?: Budget | string;
  projet?: string;
};

function computeLeadScore(q: QualificationFormData): number {
  let score = 0;
  if (q.secteur === 'btp' || q.secteur === 'automobile') score += 20;
  if (q.taille_entreprise === '10-50') score += 15;
  if (q.taille_entreprise === '50-250') score += 20;
  if (q.taille_entreprise === '250+') score += 15;
  if (q.budget === '5000_plus') score += 20;
  if (q.budget === '1000_5000') score += 10;
  if (q.niveau_ia === 'oui_regulier') score += 10;
  if (q.niveau_ia === 'teste') score += 5;
  return Math.min(100, score);
}

export async function createProspectAndAppointment(data: QualificationFormData) {
  const { start_at: startAt, end_at: endAt, ...q } = data;
  const supabase = await createClient();
  const score = computeLeadScore({ ...q, start_at: startAt, end_at: endAt });

  const questionnaireToken = crypto.randomUUID();

  const { data: prospect, error: errProspect } = await supabase
    .from('prospects')
    .insert({
      nom: q.nom,
      prenom: q.prenom,
      email: q.email.trim().toLowerCase(),
      telephone: q.telephone || null,
      entreprise: q.entreprise || null,
      secteur: q.secteur || null,
      taille_entreprise: q.taille_entreprise || null,
      niveau_ia: q.niveau_ia || null,
      objectif: q.objectif || null,
      budget: q.budget || null,
      projet: q.projet || null,
      score,
      pipeline_etape: 'rdv_programme',
      questionnaire_token: questionnaireToken,
    })
    .select('id')
    .single();

  if (errProspect) {
    console.error('[createProspect]', errProspect);
    return { ok: false, error: errProspect.message };
  }

  const { error: errAppt } = await supabase.from('appointments').insert({
    start_at: startAt,
    end_at: endAt,
    client_name: `${q.prenom} ${q.nom}`,
    client_email: q.email,
    client_phone: q.telephone || null,
    client_message: q.projet || null,
    prospect_id: prospect.id,
  });

  if (errAppt) {
    console.error('[createAppointment]', errAppt);
    return { ok: false, error: errAppt.message };
  }

  return { ok: true, prospectId: prospect.id, score, questionnaireToken };
}

export async function addProspectNoteAction(
  prospectId: string,
  data: { type_note: 'note' | 'cr_rdv' | 'action_suivante'; contenu: string }
): Promise<boolean> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { error } = await supabase.from('prospect_notes').insert({
    prospect_id: prospectId,
    type_note: data.type_note,
    contenu: data.contenu,
    created_by: user.id,
  });
  return !error;
}

export type QuestionnaireData = {
  nb_salaries?: string;
  outils_utilises?: string;
  taches_chronophages?: string;
};

export async function submitQuestionnaireAction(token: string, data: QuestionnaireData): Promise<{ ok: boolean; error?: string }> {
  if (!token?.trim()) return { ok: false, error: 'Token manquant' };
  const supabase = await createClient();
  const { data: res, error } = await supabase.rpc('update_prospect_questionnaire', {
    p_token: token.trim(),
    p_nb_salaries: data.nb_salaries?.trim() || null,
    p_outils: data.outils_utilises?.trim() || null,
    p_taches: data.taches_chronophages?.trim() || null,
  });
  if (error) {
    console.error('[submitQuestionnaire]', error);
    return { ok: false, error: error.message };
  }
  const ok = (res as { ok?: boolean })?.ok === true;
  const errMsg = (res as { error?: string })?.error;
  return { ok, error: ok ? undefined : (errMsg ?? 'Erreur inconnue') };
}

export async function updatePipelineEtapeAction(prospectId: string, etape: string): Promise<boolean> {
  const allowed = ['nouveaux', 'rdv_programme', 'proposition_envoyee', 'negociation', 'client_gagne', 'client_perdu'];
  if (!allowed.includes(etape)) return false;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (!profile || !['admin', 'formateur'].includes(profile.role ?? '')) return false;
  const { error } = await supabase
    .from('prospects')
    .update({ pipeline_etape: etape, date_modification: new Date().toISOString() })
    .eq('id', prospectId);
  return !error;
}
