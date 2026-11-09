import Link from 'next/link';
import { adminRecrutementEvaluation } from '@/lib/internal-links';
import { getRecruitmentInterviewPrep, INTERVIEW_DEROULE_30_MIN } from '@/lib/recruitment/interview-prep';
import type { RecruitmentCandidatRow } from '@/lib/recruitment/types';

/** Dossiers entretien (liste candidats admin recrutement). */
export function PlanningDossiersSection({ candidats }: { candidats: RecruitmentCandidatRow[] }) {
  const rows = candidats.filter((c) => !c.is_example);
  if (rows.length === 0) {
    return (
      <p className="text-sm text-slate-500">
        Aucun candidat réel en base — exécutez la migration 076 ou créez les fiches dans l’onglet Candidats.
      </p>
    );
  }

  return (
    <div className="divide-y divide-slate-200">
      {rows.map((c) => (
        <PlanningDossierBlock key={c.id} candidat={c} />
      ))}
    </div>
  );
}

function PlanningDossierBlock({ candidat }: { candidat: RecruitmentCandidatRow }) {
  const prep = getRecruitmentInterviewPrep(candidat.email);
  const dispo =
    candidat.availability_notes?.trim() ||
    prep?.availabilityHint ||
    '— (à compléter après entretien)';
  const cvParts = [prep?.cvSummary, candidat.btp_background, candidat.ai_usage ? `IA : ${candidat.ai_usage}` : null]
    .filter(Boolean)
    .join('\n\n');

  return (
    <article id={`recrutement-candidat-${candidat.id}`} className="scroll-mt-6 space-y-4 py-8 first:pt-2">
      <header className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-display text-xl font-bold text-slate-900">
          {candidat.first_name} {candidat.last_name}
        </h2>
        <Link
          href={adminRecrutementEvaluation(candidat.id, 1)}
          className="rounded-lg bg-[#377CF3] px-3 py-1.5 text-sm font-semibold text-white hover:bg-[#2d6ad8]"
        >
          Grille d’évaluation (étape 1)
        </Link>
      </header>

      <DossierSection title="Disponibilités">
        <p className="whitespace-pre-wrap text-sm text-slate-700">{dispo}</p>
        {candidat.phone ? <p className="mt-1 text-sm text-slate-500">Tél. {candidat.phone}</p> : null}
      </DossierSection>

      <DossierSection title="Résumé CV">
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">{cvParts || '—'}</p>
      </DossierSection>

      {prep ? (
        <>
          <DossierSection title="Déroulé 30 min">
            <ul className="space-y-1 text-sm text-slate-700">
              {INTERVIEW_DEROULE_30_MIN.map((step) => (
                <li key={step.range}>
                  <span className="font-medium">{step.range}</span> — {step.title}
                </li>
              ))}
            </ul>
          </DossierSection>
          <DossierSection title="Questions ciblées">
            <ol className="list-decimal space-y-1 pl-5 text-sm text-slate-700">
              {prep.questions.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ol>
          </DossierSection>
          <div className="grid gap-4 sm:grid-cols-2 text-sm">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Forces</h3>
              <ul className="mt-1 list-inside list-disc text-slate-700">
                {prep.strengths.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Vigilance</h3>
              <ul className="mt-1 list-inside list-disc text-slate-700">
                {prep.vigilance.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </>
      ) : null}
    </article>
  );
}

function DossierSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</h3>
      <div className="mt-1">{children}</div>
    </div>
  );
}
