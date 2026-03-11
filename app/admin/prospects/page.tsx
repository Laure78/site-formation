import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { ProspectsFilters } from './ProspectsFilters';

const SECTEUR_LABELS: Record<string, string> = {
  btp: 'BTP',
  automobile: 'Automobile',
  industrie: 'Industrie',
  service: 'Service',
  autre: 'Autre',
};

const TAILLE_LABELS: Record<string, string> = {
  '1-10': '1-10',
  '10-50': '10-50',
  '50-250': '50-250',
  '250+': '250+',
};

export default async function AdminProspectsPage({
  searchParams,
}: { searchParams: Promise<{ secteur?: string; score_min?: string; score_max?: string }> }) {
  const params = await searchParams;
  const supabase = await createClient();
  let query = supabase
    .from('prospects')
    .select('id, prenom, nom, email, entreprise, secteur, taille_entreprise, score, pipeline_etape, date_creation')
    .order('date_creation', { ascending: false });

  if (params.secteur) query = query.eq('secteur', params.secteur);
  if (params.score_min) query = query.gte('score', parseInt(params.score_min, 10));
  if (params.score_max) query = query.lte('score', parseInt(params.score_max, 10));

  const { data: prospects } = await query;

  const { data: appointments } = await supabase
    .from('appointments')
    .select('prospect_id, start_at')
    .in('status', ['demande', 'confirme']);

  const rdvByProspect: Record<string, string> = {};
  for (const a of appointments ?? []) {
    if (a.prospect_id) rdvByProspect[a.prospect_id] = a.start_at;
  }

  const getStatutLabel = (etape: string | null) => {
    const m: Record<string, string> = {
      nouveaux: 'Nouveau',
      rdv_programme: 'RDV programmé',
      proposition_envoyee: 'Proposition envoyée',
      negociation: 'Négociation',
      client_gagne: 'Gagné',
      client_perdu: 'Perdu',
    };
    return m[etape || 'nouveaux'] ?? etape;
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="font-display text-2xl font-bold text-slate-900">Prospects</h1>
      <p className="mt-2 text-slate-600">Liste des prospects qualifiés et leur score</p>

      <ProspectsFilters currentSecteur={params.secteur} currentScoreMin={params.score_min} currentScoreMax={params.score_max} />

      <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Nom</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Entreprise</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Secteur</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Score</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Statut</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Date RDV</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(prospects ?? []).length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                  Aucun prospect pour l&apos;instant. Les prospects apparaissent ici lorsqu&apos;un visiteur réserve un rendez-vous via /prendre-rdv.
                </td>
              </tr>
            ) : (
              (prospects ?? []).map((p) => (
                <tr key={p.id} className="border-b border-slate-100 last:border-0">
                  <td className="px-6 py-4">
                    <Link href={`/admin/prospects/${p.id}`} className="font-medium text-slate-900 hover:text-[var(--accent)]">
                      {p.prenom} {p.nom}
                    </Link>
                    <p className="text-xs text-slate-500">{p.email}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-700">{p.entreprise ?? '—'}</td>
                  <td className="px-6 py-4 text-slate-600">{SECTEUR_LABELS[p.secteur ?? ''] ?? p.secteur ?? '—'}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        (p.score ?? 0) >= 80
                          ? 'bg-emerald-100 text-emerald-800'
                          : (p.score ?? 0) >= 50
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {p.score ?? 0}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{getStatutLabel(p.pipeline_etape)}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {rdvByProspect[p.id]
                      ? new Date(rdvByProspect[p.id]).toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : '—'}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/prospects/${p.id}`}
                      className="text-sm font-medium text-[var(--accent)] hover:underline"
                    >
                      Voir
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
