'use server';

import { createClient } from '@/lib/supabase/server';
import type { DiagnosticAnswers, DiagnosticResult } from '@/lib/diagnostic-ia-btp/types';

export type DiagnosticLeadData = {
  prenom: string;
  entreprise?: string;
  email: string;
  telephone?: string;
  answers: DiagnosticAnswers;
  result: DiagnosticResult;
};

/** @deprecated — compatibilité imports legacy */
export type { DiagnosticAnswers };

export async function submitDiagnosticAction(
  data: DiagnosticLeadData,
): Promise<{ ok: boolean; error?: string }> {
  if (!data.prenom?.trim() || !data.email?.trim()) {
    return { ok: false, error: 'Prénom et email requis.' };
  }
  const email = data.email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'Email invalide.' };
  }

  const supabase = await createClient();
  const { error } = await supabase.from('diagnostic_ia_btp_leads').insert({
    nom: data.prenom.trim(),
    entreprise: data.entreprise?.trim() || null,
    email,
    telephone: data.telephone?.trim() || null,
    reponses: {
      answers: data.answers,
      result: data.result,
      version: 2,
    },
  });

  if (error) {
    console.error('[submitDiagnostic]', error);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}
