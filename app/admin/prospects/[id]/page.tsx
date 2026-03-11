import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { User, Building2, Target, ChevronLeft } from 'lucide-react';
import { AddNoteForm } from './AddNoteForm';

const SECTEUR_LABELS: Record<string, string> = {
  btp: 'BTP',
  automobile: 'Automobile',
  industrie: 'Industrie',
  service: 'Service',
  autre: 'Autre',
};

const TAILLE_LABELS: Record<string, string> = {
  '1-10': '1 à 10',
  '10-50': '10 à 50',
  '50-250': '50 à 250',
  '250+': '250+',
};

const NIVEAU_LABELS: Record<string, string> = {
  oui_regulier: 'Oui, régulièrement',
  teste: 'Testé quelques outils',
  jamais: 'Jamais utilisé',
};

const OBJECTIF_LABELS: Record<string, string> = {
  temps_admin: 'Gagner du temps administratif',
  automatisation: 'Automatiser des tâches',
  marketing: 'Marketing / communication',
  recrutement: 'Recrutement RH',
  prospection: 'Prospection commerciale',
  autre: 'Autre',
};

const BUDGET_LABELS: Record<string, string> = {
  moins_1000: 'Moins de 1000 €',
  '1000_5000': '1000 € à 5000 €',
  '5000_plus': '5000 € et plus',
};

export default async function ProspectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: prospect } = await supabase.from('prospects').select('*').eq('id', id).single();
  if (!prospect) notFound();

  const { data: appointments } = await supabase
    .from('appointments')
    .select('id, start_at, end_at, status')
    .eq('prospect_id', id)
    .order('start_at', { ascending: false });

  const { data: notes } = await supabase
    .from('prospect_notes')
    .select('id, type_note, contenu, created_at')
    .eq('prospect_id', id)
    .order('created_at', { ascending: false });

  const qualificationLabel =
    (prospect.score ?? 0) >= 80 ? 'Prospect chaud' : (prospect.score ?? 0) >= 50 ? 'Prospect qualifié' : 'Prospect froid';

  return (
    <div className="p-4 md:p-8">
      <Link
        href="/admin/prospects"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-[var(--accent)]"
      >
        <ChevronLeft size={18} strokeWidth={1.5} />
        Retour aux prospects
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                <User size={28} strokeWidth={1.5} className="text-slate-600" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-slate-900">
                  {prospect.prenom} {prospect.nom}
                </h1>
                <p className="text-slate-600">{prospect.email}</p>
                {prospect.telephone && <p className="text-sm text-slate-500">{prospect.telephone}</p>}
                <div className="mt-3">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                      (prospect.score ?? 0) >= 80
                        ? 'bg-emerald-100 text-emerald-800'
                        : (prospect.score ?? 0) >= 50
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    Score : {prospect.score ?? 0} — {qualificationLabel}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-slate-900">
              <Building2 size={20} strokeWidth={1.5} />
              Entreprise & projet
            </h2>
            <dl className="mt-4 space-y-2">
              <div>
                <dt className="text-xs font-medium uppercase text-slate-500">Entreprise</dt>
                <dd className="text-slate-700">{prospect.entreprise ?? '—'}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase text-slate-500">Secteur</dt>
                <dd className="text-slate-700">{SECTEUR_LABELS[prospect.secteur ?? ''] ?? prospect.secteur ?? '—'}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase text-slate-500">Taille</dt>
                <dd className="text-slate-700">{TAILLE_LABELS[prospect.taille_entreprise ?? ''] ?? '—'}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase text-slate-500">Niveau IA</dt>
                <dd className="text-slate-700">{NIVEAU_LABELS[prospect.niveau_ia ?? ''] ?? '—'}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase text-slate-500">Objectif</dt>
                <dd className="text-slate-700">{OBJECTIF_LABELS[prospect.objectif ?? ''] ?? prospect.objectif ?? '—'}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase text-slate-500">Budget</dt>
                <dd className="text-slate-700">{BUDGET_LABELS[prospect.budget ?? ''] ?? '—'}</dd>
              </div>
              {prospect.projet && (
                <div>
                  <dt className="text-xs font-medium uppercase text-slate-500">Projet / besoin</dt>
                  <dd className="mt-1 whitespace-pre-wrap rounded-lg bg-slate-50 p-3 text-slate-700">{prospect.projet}</dd>
                </div>
              )}
              {prospect.resume_ia && (
                <div>
                  <dt className="text-xs font-medium uppercase text-slate-500">Résumé IA</dt>
                  <dd className="mt-1 whitespace-pre-wrap rounded-lg bg-blue-50 p-3 text-slate-700">{prospect.resume_ia}</dd>
                </div>
              )}
              {(prospect.questionnaire_nb_salaries || prospect.questionnaire_outils || prospect.questionnaire_taches_chronophages) && (
                <>
                  <div className="mt-4 border-t border-slate-200 pt-4">
                    <dt className="text-xs font-medium uppercase text-slate-500">Questionnaire complémentaire</dt>
                    <dd className="mt-2 space-y-2">
                      {prospect.questionnaire_nb_salaries && (
                        <div>
                          <span className="text-xs text-slate-500">Salariés :</span>
                          <p className="text-slate-700">{prospect.questionnaire_nb_salaries}</p>
                        </div>
                      )}
                      {prospect.questionnaire_outils && (
                        <div>
                          <span className="text-xs text-slate-500">Outils utilisés :</span>
                          <p className="text-slate-700">{prospect.questionnaire_outils}</p>
                        </div>
                      )}
                      {prospect.questionnaire_taches_chronophages && (
                        <div>
                          <span className="text-xs text-slate-500">Tâches chronophages :</span>
                          <p className="whitespace-pre-wrap text-slate-700">{prospect.questionnaire_taches_chronophages}</p>
                        </div>
                      )}
                      {prospect.questionnaire_completed_at && (
                        <p className="text-xs text-slate-500">
                          Complété le {new Date(prospect.questionnaire_completed_at).toLocaleDateString('fr-FR')}
                        </p>
                      )}
                    </dd>
                  </div>
                </>
              )}
            </dl>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-display text-lg font-semibold text-slate-900">Rendez-vous</h2>
            {(appointments ?? []).length === 0 ? (
              <p className="mt-4 text-sm text-slate-500">Aucun rendez-vous</p>
            ) : (
              <ul className="mt-4 space-y-2">
                {(appointments ?? []).map((a) => (
                  <li key={a.id} className="flex items-center justify-between rounded-lg border border-slate-100 p-3">
                    <span className="font-medium text-slate-900">
                      {new Date(a.start_at).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="text-sm text-slate-600">
                      {new Date(a.start_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                      {' — '}
                      {new Date(a.end_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">{a.status}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-display text-lg font-semibold text-slate-900">Notes commerciales</h2>
            <AddNoteForm prospectId={id} />
            <ul className="mt-6 space-y-3">
              {(notes ?? []).map((n) => (
                <li key={n.id} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-medium">{n.type_note === 'cr_rdv' ? 'Compte rendu RDV' : n.type_note === 'action_suivante' ? 'Action suivante' : 'Note'}</span>
                    <span>{new Date(n.created_at).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <p className="mt-2 whitespace-pre-wrap text-slate-700">{n.contenu}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
