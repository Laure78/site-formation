import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { isAdmin } from '@/lib/auth';
import { Devis60sTable } from './Devis60sTable';

const METIER_LABELS: Record<string, string> = {
  artisan: 'Artisan',
  conducteur_travaux: 'Conducteur de travaux',
  bureau_etude: "Bureau d'études",
  administratif: 'Administratif',
  autre: 'Autre',
};

const NB_SALARIES_LABELS: Record<string, string> = {
  '1-5': '1 à 5',
  '6-10': '6 à 10',
  '11-50': '11 à 50',
  '50+': '50+',
};

const PROBLEMATIQUE_LABELS: Record<string, string> = {
  automatiser_devis: 'Automatiser les devis',
  gain_temps_admin: 'Gagner du temps administratif',
  communication_client: 'Améliorer la communication client',
  chatgpt_entreprise: 'Utiliser ChatGPT dans l\'entreprise',
};

export default async function AdminDevis60sPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/auth/connexion');
  const profile = await import('@/lib/auth').then((m) => m.getProfile(user.id));
  if (!profile || !isAdmin(profile.role)) redirect('/admin');

  const { data: leads } = await supabase
    .from('devis_60s_leads')
    .select('*')
    .order('date_creation', { ascending: false });

  const count = (leads ?? []).length;

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-slate-900">
          Leads Devis 60 secondes
        </h1>
        <p className="mt-1 text-slate-600">
          {count} demande{count > 1 ? 's' : ''} de devis via le formulaire rapide
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Formulaire présent sur la homepage et la page /prendre-rdv
        </p>
      </div>

      <Devis60sTable
        leads={leads ?? []}
        metierLabels={METIER_LABELS}
        nbSalariesLabels={NB_SALARIES_LABELS}
        problematiqueLabels={PROBLEMATIQUE_LABELS}
      />
    </div>
  );
}
