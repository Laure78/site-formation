'use server';

import { createClient } from '@/lib/supabase/server';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export type LeadChecklistData = {
  nom: string;
  email: string;
  entreprise?: string;
  secteur?: string;
  consent_rgpd: boolean;
};


export async function submitLeadChecklistAction(
  data: LeadChecklistData
): Promise<{ ok: boolean; error?: string }> {
  if (!data.nom?.trim() || !data.email?.trim()) {
    return { ok: false, error: 'Nom et email requis.' };
  }
  if (!data.consent_rgpd) {
    return { ok: false, error: 'Vous devez accepter de recevoir nos conseils.' };
  }
  const email = data.email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'Email invalide.' };
  }

  const supabase = await createClient();
  const { data: lead, error: errInsert } = await supabase
    .from('leads_checklist')
    .insert({
      nom: data.nom.trim(),
      email,
      entreprise: data.entreprise?.trim() || null,
      secteur: data.secteur?.trim() || null,
      consent_rgpd: true,
    })
    .select('id')
    .single();

  if (errInsert) {
    console.error('[submitLeadChecklist]', errInsert);
    return { ok: false, error: errInsert.message };
  }

  // Envoi email avec lien vers la checklist (page Next.js, fiable sur tous hébergements)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.laureolivie.fr';
  const docLink = `${baseUrl}/checklist-prompts-btp`;

  if (resend) {
    const { error: errEmail } = await resend.emails.send({
      from: 'Laure Olivié <noreply@laureolivie.fr>',
      to: email,
      subject: 'Votre checklist IA pour le BTP',
      html: `
        <p>Bonjour${data.nom.trim() ? ` ${data.nom.split(' ')[0]}` : ''},</p>
        <p>Voici la checklist :</p>
        <p><strong>10 Prompts ChatGPT pour les entreprises du BTP</strong></p>
        <p><a href="${docLink}" style="display:inline-block;background:#166534;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;">Télécharger ici</a></p>
        <p>Bonne découverte.</p>
        <p>Laure Olivie<br/>
        Formatrice en IA pour les entreprises du BTP</p>
      `,
    });
    if (errEmail) {
      console.error('[submitLeadChecklist] email', errEmail);
      // On ne bloque pas : le lead est enregistré
    }
  }

  return { ok: true };
}

export async function deleteLeadAction(id: string): Promise<boolean> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;
  const profile = await import('@/lib/auth').then((m) => m.getProfile(user.id));
  if (!profile || !['admin', 'formateur'].includes(profile.role ?? '')) return false;
  const { error } = await supabase.from('leads_checklist').delete().eq('id', id);
  return !error;
}
