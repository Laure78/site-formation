'use server';

import { createClient } from '@/lib/supabase/server';

export type Devis60sData = {
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  entreprise?: string;
  metier?: string;
  nb_salaries?: string;
  problematique?: string;
};

const METIER_VALUES = ['artisan', 'conducteur_travaux', 'bureau_etude', 'administratif', 'autre'] as const;
const NB_SALARIES_VALUES = ['1-5', '6-10', '11-50', '50+'] as const;
const PROBLEMATIQUE_VALUES = ['automatiser_devis', 'gain_temps_admin', 'communication_client', 'chatgpt_entreprise'] as const;

export async function submitDevis60sAction(data: Devis60sData): Promise<{ ok: boolean; error?: string }> {
  if (!data.nom?.trim() || !data.prenom?.trim() || !data.email?.trim()) {
    return { ok: false, error: 'Nom, prénom et email requis.' };
  }
  const email = data.email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'Email invalide.' };
  }

  const supabase = await createClient();
  const { error } = await supabase.from('devis_60s_leads').insert({
    nom: data.nom.trim(),
    prenom: data.prenom.trim(),
    email,
    telephone: data.telephone?.trim() || null,
    entreprise: data.entreprise?.trim() || null,
    metier: data.metier && METIER_VALUES.includes(data.metier as (typeof METIER_VALUES)[number]) ? data.metier : null,
    nb_salaries: data.nb_salaries && NB_SALARIES_VALUES.includes(data.nb_salaries as (typeof NB_SALARIES_VALUES)[number]) ? data.nb_salaries : null,
    problematique: data.problematique && PROBLEMATIQUE_VALUES.includes(data.problematique as (typeof PROBLEMATIQUE_VALUES)[number]) ? data.problematique : null,
  });

  if (error) {
    console.error('[submitDevis60s]', error);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

export async function deleteDevis60sLeadAction(id: string): Promise<boolean> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;
  const profile = await import('@/lib/auth').then((m) => m.getProfile(user.id));
  if (!profile || !['admin', 'formateur'].includes(profile.role ?? '')) return false;
  const { error } = await supabase.from('devis_60s_leads').delete().eq('id', id);
  return !error;
}
