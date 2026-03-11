import { createClient } from '@/lib/supabase/server';
import { PipelineKanban } from './PipelineKanban';

const ETAPES = [
  { id: 'nouveaux', label: 'Nouveaux prospects', color: 'bg-slate-100' },
  { id: 'rdv_programme', label: 'RDV programmé', color: 'bg-blue-50' },
  { id: 'proposition_envoyee', label: 'Proposition envoyée', color: 'bg-amber-50' },
  { id: 'negociation', label: 'Négociation', color: 'bg-violet-50' },
  { id: 'client_gagne', label: 'Client gagné', color: 'bg-emerald-50' },
  { id: 'client_perdu', label: 'Client perdu', color: 'bg-red-50' },
] as const;

export default async function PipelinePage() {
  const supabase = await createClient();
  const { data: prospects } = await supabase
    .from('prospects')
    .select('id, prenom, nom, entreprise, secteur, score, pipeline_etape, date_creation')
    .order('date_creation', { ascending: false });

  const byEtape: Record<string, Array<{ id: string; prenom: string; nom: string; entreprise?: string | null; secteur?: string | null; score: number; pipeline_etape?: string | null; date_creation: string }>> = {};
  for (const e of ETAPES) {
    byEtape[e.id] = (prospects ?? []).filter((p) => (p.pipeline_etape || 'nouveaux') === e.id);
  }

  const { data: appointments } = await supabase
    .from('appointments')
    .select('prospect_id, start_at')
    .in('status', ['demande', 'confirme']);

  const rdvByProspect: Record<string, string> = {};
  for (const a of appointments ?? []) {
    if (a.prospect_id) rdvByProspect[a.prospect_id] = a.start_at;
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="font-display text-2xl font-bold text-slate-900">Pipeline commercial</h1>
      <p className="mt-2 text-slate-600">Suivez vos prospects et faites glisser les cartes entre les étapes</p>

      <PipelineKanban
        etapes={ETAPES}
        byEtape={byEtape}
        rdvByProspect={rdvByProspect}
      />
    </div>
  );
}
