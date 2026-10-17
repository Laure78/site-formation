import Link from 'next/link';
import { ApplicationMetierLearningPath } from '@/components/formations/ApplicationMetierLearningPath';
import { ApplicationMetierParcoursContinueSection } from '@/components/formations/ApplicationMetierParcoursContinueSection';
import { ApplicationMetierTarifBlock } from '@/components/formations/ApplicationMetierTarifBlock';
import type { ApplicationMetierNiveauConfig } from '@/lib/parcours-applications-metier-btp-content';
import { getApplicationMetierParcoursStepByRef } from '@/lib/application-metier-btp-parcours-nav';
import { getFormationByCode, libelleEffectifFormation } from '@/data/formations';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

type Props = {
  config: ApplicationMetierNiveauConfig;
  formationHint: string;
};

/** Sections UX spécifiques parcours applications métier (hors template catalogue commun). */
export function ApplicationMetierTemplateExtras({ config, formationHint }: Props) {
  const formation = getFormationByCode(config.ref)!;
  const ux = config.ux;
  const parcoursStep = getApplicationMetierParcoursStepByRef(config.ref);
  const effectifLabel = libelleEffectifFormation(formation);

  if (!ux) return null;

  return (
    <>
      {ux.resultatJournee.length > 0 ? (
        <section className="border-b border-slate-200 bg-slate-50 px-4 py-10 md:py-12">
          <div className="mx-auto max-w-[78rem]">
            <h2 className="font-display text-xl font-bold text-slate-900 md:text-2xl">
              {ux.resultatJourneeTitle ?? 'À la fin de la journée, vous aurez construit un premier prototype'}
            </h2>
            <ul className="mt-5 space-y-2.5">
              {ux.resultatJournee.map((item) => (
                <li key={item} className="flex gap-2.5 text-slate-800">
                  <span className="font-bold text-[#377CF3]" aria-hidden>
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {ux.comparison ? (
        <section className="border-b border-slate-200 bg-white px-4 py-12">
          <div className="mx-auto max-w-[78rem]">
            <h2 className="font-display text-xl font-bold text-slate-900 md:text-2xl">{ux.comparison.title}</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-slate-200 p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{ux.comparison.left.title}</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {ux.comparison.left.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-[#377CF3]/30 bg-[#377CF3]/5 p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-[#377CF3]">{ux.comparison.right.title}</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-800">
                  {ux.comparison.right.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {ux.workflow ? (
        <section className="border-b border-slate-200 bg-slate-50 px-4 py-12">
          <div className="mx-auto max-w-[78rem]">
            <h2 className="font-display text-xl font-bold text-slate-900 md:text-2xl">{ux.workflow.title}</h2>
            <ol className="mt-6 flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-800">
              {ux.workflow.steps.map((step, i) => (
                <li key={step} className="flex items-center gap-2">
                  <span className="rounded-lg border border-slate-200 bg-white px-3 py-2">{step}</span>
                  {i < ux.workflow!.steps.length - 1 ? (
                    <span className="text-[#377CF3]" aria-hidden>
                      →
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
            <p className="mt-4 max-w-prose text-sm text-slate-600">{ux.workflow.caption}</p>
          </div>
        </section>
      ) : null}

      {ux.iaValidation ? (
        <section className="border-b border-slate-200 bg-white px-4 py-12">
          <div className="mx-auto max-w-[78rem]">
            <h2 className="font-display text-xl font-bold text-slate-900 md:text-2xl">{ux.iaValidation.title}</h2>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
              <table className="min-w-full w-full text-left text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 font-semibold">L’IA peut</th>
                    <th className="px-4 py-3 font-semibold">Vous validez</th>
                  </tr>
                </thead>
                <tbody>
                  {ux.iaValidation.rows.map((row) => (
                    <tr key={row.ia} className="border-t border-slate-100">
                      <td className="px-4 py-3 text-slate-700">{row.ia}</td>
                      <td className="px-4 py-3 text-slate-700">{row.humain}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-b border-slate-200 bg-white px-4 py-12">
        <div className="mx-auto max-w-[78rem]">
          <h2 className="font-display text-xl font-bold text-slate-900 md:text-2xl">Votre parcours Applications métier BTP</h2>
          <div className="mt-6">
            <ApplicationMetierLearningPath currentStep={parcoursStep.step} />
          </div>
        </div>
      </section>

      <ApplicationMetierParcoursContinueSection step={parcoursStep} />
    </>
  );
}

export function ApplicationMetierTarifsSection({
  config,
  formationHint,
}: {
  config: ApplicationMetierNiveauConfig;
  formationHint: string;
}) {
  const formation = getFormationByCode(config.ref)!;
  const effectifLabel = libelleEffectifFormation(formation);

  return (
    <section id="tarif" className="scroll-mt-[calc(var(--site-header-height)+3.25rem)] border-b border-slate-200 bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-[78rem]">
        <h2 className="font-display text-xl font-bold text-slate-900 md:text-2xl">Tarif</h2>
        <div className="mt-5 max-w-md">
          <ApplicationMetierTarifBlock tarifKey={config.tarifKey} duree={config.duree} />
        </div>
        <p className="mt-3 text-sm text-slate-600">
          Jusqu&apos;à {formation.effectifMax} participants · {effectifLabel}. Formation organisée pour votre entreprise.
        </p>
        <p className="mt-3 text-sm text-slate-700">Prise en charge possible par votre OPCO selon éligibilité.</p>
        <p className="mt-4 text-sm">
          <Link href={LINKS.financement} className={OFC_LINK}>
            En savoir plus sur le financement Constructys / OPCO
          </Link>
        </p>
        <p className="mt-2 text-xs text-slate-500">{formationHint}</p>
      </div>
    </section>
  );
}
