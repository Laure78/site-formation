'use server';

import { createClient } from '@/lib/supabase/server';

export type DiagnosticAnswers = {
  metier?: string;
  nb_personnes?: string;
  tache_chronophage?: string;
  ia_deja_utilisee?: string;
  decouvrir_ia?: string;
};

export type DiagnosticLeadData = {
  nom: string;
  entreprise?: string;
  email: string;
  telephone?: string;
  answers: DiagnosticAnswers;
};

export async function submitDiagnosticAction(
  data: DiagnosticLeadData
): Promise<{ ok: boolean; error?: string }> {
  if (!data.nom?.trim() || !data.email?.trim()) {
    return { ok: false, error: 'Nom et email requis.' };
  }
  const email = data.email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'Email invalide.' };
  }

  const supabase = await createClient();
  const { error } = await supabase.from('diagnostic_ia_btp_leads').insert({
    nom: data.nom.trim(),
    entreprise: data.entreprise?.trim() || null,
    email,
    telephone: data.telephone?.trim() || null,
    reponses: data.answers || {},
  });

  if (error) {
    console.error('[submitDiagnostic]', error);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}
