import Link from 'next/link';
import { requireExtranetTrainerAccess } from '@/lib/extranet-formateurs/access';
import { computeCompleteness } from '@/lib/extranet-formateurs/completeness';
import { NDA_STATUS_LABELS, DOC_STATUS_LABELS } from '@/lib/extranet-formateurs/document-types';
import {
  fetchCharterAcceptance,
  fetchCurrentCharter,
  fetchTrainerDocuments,
} from '@/lib/extranet-formateurs/queries';
import { fetchUpcomingMissionsForTrainer } from '@/lib/extranet-formateurs/queries-phase2';
import { MISSION_STATUS_LABELS } from '@/lib/extranet-formateurs/phase2-types';
import { LINKS } from '@/lib/internal-links';

export default async function EspaceFormateursAccueilPage() {
  const access = await requireExtranetTrainerAccess();
  if (!access.ok) return null;

  const { trainer } = access;
  const [docs, charter, upcoming] = await Promise.all([
    fetchTrainerDocuments(trainer.id),
    fetchCurrentCharter(),
    fetchUpcomingMissionsForTrainer(trainer.id),
  ]);

  const acceptance =
    charter != null
      ? await fetchCharterAcceptance(trainer.id, charter.id)
      : null;

  const completeness = computeCompleteness(trainer, docs, Boolean(acceptance));

  const pendingDocs = docs.filter((d) => d.status === 'pending');
  const rejectedDocs = docs.filter((d) => d.status === 'rejected');

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
          Tableau de bord
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Synthèse de votre dossier et des actions à effectuer avant vos interventions.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Complétude</p>
          <p className="mt-2 font-display text-3xl font-bold text-[#377CF3]">{completeness.percent} %</p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-[#377CF3] transition-all"
              style={{ width: `${completeness.percent}%` }}
            />
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Documents manquants</p>
          <p className="mt-2 font-display text-3xl font-bold text-slate-900">{completeness.missingCount}</p>
          <Link href={LINKS.espaceFormateursDocuments} className="mt-2 inline-block text-sm font-medium text-[#377CF3] hover:underline">
            Compléter mon dossier
          </Link>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">En validation</p>
          <p className="mt-2 font-display text-3xl font-bold text-slate-900">{completeness.pendingCount}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Charte</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">
            {acceptance ? 'Acceptée' : 'À accepter'}
          </p>
          {!acceptance ? (
            <Link href={LINKS.espaceFormateursCharte} className="mt-2 inline-block text-sm font-medium text-[#377CF3] hover:underline">
              Lire et accepter
            </Link>
          ) : null}
        </div>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-display text-lg font-bold text-slate-900">Situation administrative</h2>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-slate-500">NDA</dt>
            <dd className="font-medium text-slate-900">{NDA_STATUS_LABELS[trainer.nda_status]}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Validation OFC</dt>
            <dd className="font-medium text-slate-900">{trainer.admin_validation_status}</dd>
          </div>
          {trainer.first_contract_at ? (
            <div>
              <dt className="text-slate-500">Première contractualisation</dt>
              <dd className="font-medium text-slate-900">
                {new Date(trainer.first_contract_at).toLocaleDateString('fr-FR')}
              </dd>
            </div>
          ) : null}
          {trainer.nda_declaration_deadline ? (
            <div>
              <dt className="text-slate-500">Échéance déclaration NDA</dt>
              <dd className="font-medium text-amber-800">
                {new Date(trainer.nda_declaration_deadline).toLocaleDateString('fr-FR')}
              </dd>
            </div>
          ) : null}
        </dl>
        {trainer.admin_validation_status !== 'approved' ? (
          <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
            Votre dossier doit être validé par l&apos;équipe OFC avant toute intervention en
            session. L&apos;absence de NDA ne bloque pas votre candidature, mais une validation
            humaine est obligatoire.
          </p>
        ) : null}
      </section>

      {(pendingDocs.length > 0 || rejectedDocs.length > 0) && (
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-display text-lg font-bold text-slate-900">Notifications documents</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {rejectedDocs.map((d) => (
              <li key={d.id} className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-red-900">
                Document refusé — {DOC_STATUS_LABELS[d.status]}
                {d.admin_comment ? ` : ${d.admin_comment}` : ''}
              </li>
            ))}
            {pendingDocs.slice(0, 5).map((d) => (
              <li key={d.id} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-700">
                {d.original_filename} — en attente de validation OFC
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-lg font-bold text-slate-900">Prochaines interventions</h2>
          <Link href={LINKS.espaceFormateursInterventions} className="text-sm font-medium text-[#377CF3] hover:underline">
            Tout voir
          </Link>
        </div>
        {upcoming.length === 0 ? (
          <p className="mt-3 text-sm text-slate-600">Aucune intervention à venir.</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {upcoming.map((m) => (
              <li key={m.id}>
                <Link
                  href={`${LINKS.espaceFormateursInterventions}/${m.id}`}
                  className="block rounded-lg border border-slate-100 px-3 py-2 text-sm hover:bg-slate-50"
                >
                  <span className="font-medium text-slate-900">{m.title}</span>
                  <span className="text-slate-600">
                    {' '}
                    — {new Date(m.starts_on).toLocaleDateString('fr-FR')} · {MISSION_STATUS_LABELS[m.status]}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
