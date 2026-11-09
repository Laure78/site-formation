import Link from 'next/link';
import { adminRecrutementEvaluation } from '@/lib/internal-links';
import { formatRecruitmentFormations, RECRUITMENT_FORMATION_OPTIONS } from '@/lib/recruitment/constants';
import {
  getRecruitmentInterviewPrep,
  INTERVIEW_DEROULE_30_MIN,
} from '@/lib/recruitment/interview-prep';
import type { RecruitmentCandidatRow } from '@/lib/recruitment/types';

const FORMATION_IDS = new Set(RECRUITMENT_FORMATION_OPTIONS.map((f) => f.id));

export function CandidatInterviewPrepPanel({ candidat }: { candidat: RecruitmentCandidatRow }) {
  const prep = getRecruitmentInterviewPrep(candidat.email);
  const availability =
    candidat.availability_notes?.trim() ||
    prep?.availabilityHint ||
    '— (à renseigner en fiche : disponibilités 2027, mobilité IDF)';

  const cvBlock = [
    prep?.cvSummary,
    candidat.btp_background?.trim(),
    candidat.ai_usage?.trim() ? `IA : ${candidat.ai_usage.trim()}` : null,
  ]
    .filter(Boolean)
    .join('\n\n');

  const formations =
    candidat.formations.length > 0
      ? formatRecruitmentFormations(candidat.formations)
      : prep?.suggestedFormations.length
        ? formatRecruitmentFormations([...prep.suggestedFormations].filter((id) => FORMATION_IDS.has(id)))
        : '—';

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-[#377CF3]/25 bg-[#377CF3]/5 p-4">
        <h2 className="font-display text-lg font-bold text-slate-900">Entretien du jour — aide mémoire</h2>
        <p className="mt-1 text-sm text-slate-600">
          Résumé CV, disponibilités et questions personnalisées. Grille de notation :{' '}
          <Link href={adminRecrutementEvaluation(candidat.id, 1)} className="font-medium text-[#377CF3] hover:underline">
            étape 1
          </Link>
          .
        </p>
      </div>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Disponibilités</h3>
        <p className="whitespace-pre-wrap text-sm text-slate-800">{availability}</p>
        {candidat.interview_at ? (
          <p className="text-sm text-slate-600">
            Créneau enregistré :{' '}
            <time dateTime={candidat.interview_at}>
              {new Date(candidat.interview_at).toLocaleString('fr-FR', {
                timeZone: 'Europe/Paris',
                dateStyle: 'full',
                timeStyle: 'short',
              })}
            </time>
            {candidat.interview_modality ? ` · ${candidat.interview_modality.replace(/_/g, ' ')}` : null}
          </p>
        ) : null}
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Résumé CV</h3>
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-800">
          {cvBlock || '— Renseignez les champs Parcours BTP et Usage IA dans la fiche.'}
        </p>
      </section>

      {prep ? (
        <>
          <section className="grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Forces probables</h3>
              <ul className="mt-2 list-inside list-disc text-sm text-slate-800">
                {prep.strengths.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Vigilance</h3>
              <ul className="mt-2 list-inside list-disc text-sm text-slate-800">
                {prep.vigilance.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Formations envisagées</h3>
            <p className="text-sm text-slate-800">{formations}</p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Déroulé 30 min</h3>
            <ol className="space-y-2 text-sm">
              {INTERVIEW_DEROULE_30_MIN.map((step) => (
                <li key={step.range} className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                  <span className="font-semibold text-slate-900">{step.range}</span>
                  <span className="text-slate-700"> — {step.title}</span>
                  <p className="mt-0.5 text-slate-600">{step.detail}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Questions ciblées
            </h3>
            <ol className="list-decimal space-y-1 pl-5 text-sm text-slate-800">
              {prep.questions.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ol>
            {prep.etape2Subject ? (
              <p className="mt-3 text-sm text-slate-600">
                <span className="font-medium text-slate-800">Sujet étape 2 proposé :</span> {prep.etape2Subject}
              </p>
            ) : null}
          </section>
        </>
      ) : (
        <section className="space-y-2">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Déroulé 30 min</h3>
          <ol className="space-y-2 text-sm">
            {INTERVIEW_DEROULE_30_MIN.map((step) => (
              <li key={step.range} className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                <span className="font-semibold text-slate-900">{step.range}</span> — {step.title}
              </li>
            ))}
          </ol>
        </section>
      )}
    </div>
  );
}
