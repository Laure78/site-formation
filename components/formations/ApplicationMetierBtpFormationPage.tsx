import Link from 'next/link';
import { FAQSection } from '@/components/landing/FAQSection';
import { JsonLd } from '@/components/JsonLd';
import { CatalogueInfosPratiques } from '@/components/InfosPratiques';
import { FormationProgrammePdfSection } from '@/components/formations/FormationCourseHero';
import { ApplicationMetierFormationHero } from '@/components/formations/ApplicationMetierFormationHero';
import { ApplicationMetierTarifBlock } from '@/components/formations/ApplicationMetierTarifBlock';
import { ApplicationMetierLearningPath } from '@/components/formations/ApplicationMetierLearningPath';
import { ApplicationMetierParcoursContinueSection } from '@/components/formations/ApplicationMetierParcoursContinueSection';
import { ApplicationMetierRdvCta } from '@/components/formations/ApplicationMetierRdvCta';
import { getFormationByCode, libelleEffectifFormation } from '@/data/formations';
import { getFAQSchema } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';
import type { ApplicationMetierNiveauConfig } from '@/lib/parcours-applications-metier-btp-content';
import { buildCatalogueCourseApplicationMetierJsonLd } from '@/lib/schema-catalogue-course-jsonld';
import {
  APPLICATION_METIER_PARCOURS_MOTHER,
  getApplicationMetierParcoursStepByRef,
} from '@/lib/application-metier-btp-parcours-nav';
import { PREUVES } from '@/lib/constants';
import { formatVolumeProsFormesBtpLibelle } from '@/lib/data/indicateurs-resultats';

type Props = {
  config: ApplicationMetierNiveauConfig;
};

function formationHint(config: ApplicationMetierNiveauConfig): string {
  return `Applications métier BTP — ${config.progressionLabel} | ${config.path}`;
}

/**
 * Fiche formation parcours applications métier (N1–N3).
 * Server Component — JS client limité aux CTA RDV.
 *
 * Note tarif : ne pas utiliser `FormationTarifsModalitesSection` (grille 7 h générique = 1 800 €)
 * pour N2/N3 — source unique `lib/tarifs-applications-metier-btp.ts`.
 */
export function ApplicationMetierBtpFormationPage({ config }: Props) {
  const formation = getFormationByCode(config.ref)!;
  const parcoursStep = getApplicationMetierParcoursStepByRef(config.ref);
  const courseSchema = buildCatalogueCourseApplicationMetierJsonLd(config.ref);
  const faqSchema = getFAQSchema(config.faq);
  const ux = config.ux;
  const hint = formationHint(config);
  const effectifLabel = libelleEffectifFormation(formation);
  const programmeHasDurees = Boolean(ux?.programmeSteps?.some((s) => s.duree));

  return (
    <main>
      <JsonLd id={`schema-course-${config.ref.toLowerCase()}`} schema={courseSchema} />
      {faqSchema ? <JsonLd id={`schema-faq-${config.slug}`} schema={faqSchema} /> : null}

      <ApplicationMetierFormationHero
        config={config}
        stepBadge={parcoursStep.stepBadge}
        formationHint={hint}
      />

      {/* 2 — Résultat journée */}
      {ux ? (
        <section className="border-b border-slate-100 bg-[#F8FAFC] px-4 py-10 md:py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-xl font-bold text-slate-900 md:text-2xl">
              {ux.resultatJourneeTitle ??
                'À la fin de la journée, vous aurez construit un premier prototype'}
            </h2>
            <ul className="mt-5 space-y-2.5">
              {ux.resultatJournee.map((item) => (
                <li key={item} className="flex gap-2.5 text-slate-800">
                  <span className="font-bold text-[var(--accent)]" aria-hidden>
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {!ux.livrablesNote ? (
              <p className="mt-4 text-sm text-slate-600">{config.promesseRealiste}</p>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* 3 — Comparaison N1 / N2 (si définie) */}
      {ux?.comparison ? (
        <section className="bg-white px-4 py-12" aria-labelledby="comparaison-niveaux">
          <div className="mx-auto max-w-3xl">
            <h2
              id="comparaison-niveaux"
              className="font-display text-xl font-bold text-slate-900 md:text-2xl"
            >
              {ux.comparison.title}
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  {ux.comparison.left.title}
                </p>
                {ux.comparison.left.subtitle ? (
                  <p className="mt-1 font-semibold text-slate-900">{ux.comparison.left.subtitle}</p>
                ) : null}
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {ux.comparison.left.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-[var(--accent)]/30 bg-[var(--accent-soft)]/40 p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent)]">
                  {ux.comparison.right.title}
                </p>
                {ux.comparison.right.subtitle ? (
                  <p className="mt-1 font-semibold text-slate-900">{ux.comparison.right.subtitle}</p>
                ) : null}
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

      {/* 4 — Cas d’usage */}
      {ux ? (
        <section className="bg-white px-4 py-12 md:py-14" aria-labelledby="cas-usage">
          <div className="mx-auto max-w-3xl">
            <h2 id="cas-usage" className="font-display text-xl font-bold text-slate-900 md:text-2xl">
              {ux.casUsageTitle ?? 'Que pouvez-vous commencer à créer ?'}
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {ux.casUsageCards.map((card) => (
                <li
                  key={card.title}
                  className="rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3.5"
                >
                  <p className="font-semibold text-slate-900">{card.title}</p>
                  <p className="mt-0.5 text-sm text-slate-600">{card.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : config.casUsageExemples?.length ? (
        <section className="bg-white px-4 py-12" aria-labelledby="cas-usage">
          <div className="mx-auto max-w-3xl">
            <h2 id="cas-usage" className="font-display text-xl font-bold text-slate-900">
              Exemples de cas d&apos;usage
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Illustrations possibles — pas des modules obligatoires.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {config.casUsageExemples.map((cas) => (
                <div key={cas.title} className="rounded-xl border border-slate-200 p-4">
                  <h3 className="font-semibold text-slate-900">{cas.title}</h3>
                  <ul className="mt-2 space-y-1 text-sm text-slate-600">
                    {cas.items.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* 5 — Workflow */}
      {ux?.workflow ? (
        <section className="border-t border-slate-100 bg-[#F8FAFC] px-4 py-12" aria-labelledby="workflow">
          <div className="mx-auto max-w-3xl">
            <h2 id="workflow" className="font-display text-xl font-bold text-slate-900 md:text-2xl">
              {ux.workflow.title}
            </h2>
            <ol className="mt-6 flex flex-wrap items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-800">
              {ux.workflow.steps.map((step, i) => (
                <li key={step} className="flex items-center gap-2">
                  <span className="rounded-lg border border-slate-200 bg-white px-3 py-2">{step}</span>
                  {i < ux.workflow!.steps.length - 1 ? (
                    <span className="text-[var(--accent)]" aria-hidden>
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

      {/* 6 — Concepts métier OU définition N1 */}
      {ux?.concepts ? (
        <section className="bg-white px-4 py-12" aria-labelledby="concepts">
          <div className="mx-auto max-w-3xl">
            <h2 id="concepts" className="font-display text-xl font-bold text-slate-900 md:text-2xl">
              {ux.concepts.title}
            </h2>
            <ul className="mt-6 space-y-3">
              {ux.concepts.items.map((item) => (
                <li key={item.title} className="rounded-xl border border-slate-200 px-4 py-3.5">
                  <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent)]">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm text-slate-700">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : ux?.definitionApp ? (
        <section className="border-t border-slate-100 bg-[#F2F2F2] px-4 py-12" aria-labelledby="def-app">
          <div className="mx-auto max-w-3xl">
            <h2 id="def-app" className="font-display text-xl font-bold text-slate-900 md:text-2xl">
              Une application métier, concrètement ?
            </h2>
            <p className="mt-3 max-w-prose text-slate-700">{ux.definitionApp.intro}</p>
            <ul className="mt-5 space-y-2 text-slate-800">
              {ux.definitionApp.points.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="text-[var(--accent)]" aria-hidden>
                    →
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : (
        <section className="bg-[#F2F2F2] px-4 py-10">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-xl font-bold text-slate-900">{config.progressionTagline}</h2>
            <p className="mt-3 max-w-prose text-slate-700">{config.positionnement}</p>
          </div>
        </section>
      )}

      {/* 7 — Avant / après (N1) */}
      {ux?.avant && ux?.apres ? (
        <section className="bg-white px-4 py-12" aria-labelledby="avant-apres">
          <div className="mx-auto max-w-3xl">
            <h2 id="avant-apres" className="font-display text-xl font-bold text-slate-900 md:text-2xl">
              Du problème métier au prototype
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Avant</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {ux.avant.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-[var(--accent)]/30 bg-[var(--accent-soft)]/40 p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent)]">
                  Après la formation
                </p>
                <ul className="mt-3 space-y-2 text-sm text-slate-800">
                  {ux.apres.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* 8 — Pour qui */}
      <section className="border-t border-slate-100 bg-[#F8FAFC] px-4 py-12" aria-labelledby="pour-qui">
        <div className="mx-auto max-w-3xl">
          <h2 id="pour-qui" className="font-display text-xl font-bold text-slate-900 md:text-2xl">
            Pour qui ?
          </h2>
          {ux ? (
            <>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {ux.pourQui.map((p) => (
                  <li
                    key={p}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800"
                  >
                    {p}
                  </li>
                ))}
              </ul>
              {ux.pourQuiNote ? (
                <p className="mt-4 text-sm text-slate-600">{ux.pourQuiNote}</p>
              ) : null}
              <p className="mt-3 rounded-xl border-2 border-[var(--accent)]/25 bg-white p-4 text-sm font-semibold text-slate-900">
                {ux.pourQuiHighlight}
              </p>
            </>
          ) : (
            <>
              <p className="mt-3 text-slate-700">{formation.public}</p>
              <p className="mt-4 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
                <strong className="text-slate-900">Prérequis :</strong> {config.prerequis}
              </p>
            </>
          )}
        </div>
      </section>

      {/* 9 — Programme */}
      <section id="programme" className="scroll-mt-24 bg-white px-4 py-12 md:py-14" aria-labelledby="programme-title">
        <div className="mx-auto max-w-3xl">
          <h2 id="programme-title" className="font-display text-xl font-bold text-slate-900 md:text-2xl">
            Programme — {config.duree}
          </h2>

          {ux?.programmeSteps ? (
            <ol className="mt-8 space-y-5">
              {ux.programmeSteps.map((step) => (
                <li key={step.label} className="flex gap-4 border-l-2 border-[var(--accent)]/40 pl-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent)]">
                        {step.duree ? `${step.label} — ${step.title}` : step.label}
                      </p>
                      {step.duree ? (
                        <p className="text-xs font-semibold text-slate-500">{step.duree}</p>
                      ) : null}
                    </div>
                    {!step.duree ? (
                      <p className="mt-1 font-semibold text-slate-900">{step.title}</p>
                    ) : null}
                    <p className="mt-1 text-sm text-slate-600">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          ) : null}

          {programmeHasDurees ? (
            <p className="mt-6 text-sm font-semibold text-slate-800">Total : 7 heures.</p>
          ) : (
            <div className="mt-10 space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Modules et durées (programme officiel)
              </h3>
              {config.modules.map((mod, i) => (
                <div key={mod.title} className="rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3">
                  <p className="font-semibold text-slate-900">
                    <span className="text-[var(--accent)]">{i + 1}.</span> {mod.title}{' '}
                    <span className="font-normal text-slate-500">— {mod.duree}</span>
                  </p>
                  <ul className="mt-1 space-y-0.5 text-sm text-slate-600">
                    {mod.items.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 10 — Livrables */}
      {ux ? (
        <section className="border-t border-slate-100 bg-[#F2F2F2] px-4 py-12" aria-labelledby="repartez">
          <div className="mx-auto max-w-3xl">
            <h2 id="repartez" className="font-display text-xl font-bold text-slate-900 md:text-2xl">
              {ux.livrablesTitle ?? 'Vous repartez avec'}
            </h2>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {ux.livrables.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800"
                >
                  {item}
                </li>
              ))}
            </ul>
            {ux.livrablesNote ? (
              <p className="mt-4 text-sm text-slate-600">{ux.livrablesNote}</p>
            ) : null}
          </div>
        </section>
      ) : (
        <section className="bg-[#F2F2F2] px-4 py-10">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-xl font-bold text-slate-900">Objectifs pédagogiques</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {config.objectifs.map((obj) => (
                <li key={obj}>• {obj}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 11 — IA / validation humaine */}
      {ux?.iaValidation ? (
        <section className="bg-white px-4 py-12" aria-labelledby="ia-humain">
          <div className="mx-auto max-w-3xl">
            <h2 id="ia-humain" className="font-display text-xl font-bold text-slate-900 md:text-2xl">
              {ux.iaValidation.title}
            </h2>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[20rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="py-2 pr-4 font-semibold text-slate-900">L’IA peut</th>
                    <th className="py-2 font-semibold text-slate-900">Vous validez</th>
                  </tr>
                </thead>
                <tbody>
                  {ux.iaValidation.rows.map((row) => (
                    <tr key={row.ia} className="border-b border-slate-100">
                      <td className="py-3 pr-4 text-slate-700">{row.ia}</td>
                      <td className="py-3 text-slate-700">{row.humain}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ) : null}

      {/* 12 — Parcours N1→N2→N3 */}
      <section className="bg-white px-4 py-12" aria-labelledby="parcours-niveaux">
        <div className="mx-auto max-w-3xl">
          <h2 id="parcours-niveaux" className="font-display text-xl font-bold text-slate-900 md:text-2xl">
            Votre parcours Applications métier BTP
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Progression claire : concevoir, connecter, industrialiser.
          </p>
          <div className="mt-6">
            <ApplicationMetierLearningPath currentStep={parcoursStep.step} />
          </div>
          <p className="mt-4 text-sm">
            <Link href={APPLICATION_METIER_PARCOURS_MOTHER.path} className={OFC_LINK}>
              Voir le parcours complet (21 h)
            </Link>
            {' · '}
            <Link href={LINKS.formations} className={OFC_LINK}>
              Catalogue formations
            </Link>
          </p>
        </div>
      </section>

      <ApplicationMetierParcoursContinueSection step={parcoursStep} />

      {/* 13 — Tarif (une seule fois) */}
      <section id="tarif" className="scroll-mt-24 border-t border-slate-100 bg-[#F8FAFC] px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-xl font-bold text-slate-900 md:text-2xl">Tarif</h2>
          <div className="mt-5">
            <ApplicationMetierTarifBlock tarifKey={config.tarifKey} duree={config.duree} />
          </div>
          <p className="mt-3 text-sm text-slate-600">
            Jusqu&apos;à {formation.effectifMax} participants · {effectifLabel}. Formation organisée
            pour votre entreprise.
          </p>
          <p className="mt-3 text-sm text-slate-700">
            Prise en charge possible par votre OPCO selon éligibilité.
          </p>
          <div className="mt-6">
            <ApplicationMetierRdvCta
              label="Parler de mon projet"
              origin={`application-metier-${config.slug}-tarif`}
              formationHint={hint}
            />
          </div>
          <p className="mt-4 text-sm">
            <Link href={LINKS.financement} className={OFC_LINK}>
              En savoir plus sur le financement Constructys / OPCO
            </Link>
          </p>
        </div>
      </section>

      {/* 14 — Preuves */}
      <section className="border-t border-slate-100 bg-[#F2F2F2] px-4 py-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-lg font-bold text-slate-900">Pourquoi cette formation</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            <li>• Organisme de formation certifié Qualiopi</li>
            <li>• {formatVolumeProsFormesBtpLibelle()} — satisfaction {PREUVES.satisfaction}</li>
            <li>• Références BTP : FFB, CSFE, CNAM Entreprise, Le Moniteur Formations</li>
          </ul>
        </div>
      </section>

      {/* 15 — Formatrice */}
      {ux?.formatrice ? (
        <section className="bg-white px-4 py-10" aria-labelledby="formatrice">
          <div className="mx-auto max-w-3xl">
            <h2 id="formatrice" className="font-display text-lg font-bold text-slate-900">
              {ux.formatrice.title}
            </h2>
            <p className="mt-1 text-sm font-medium text-slate-600">{ux.formatrice.role}</p>
            {ux.formatrice.paragraphs.map((p) => (
              <p key={p} className="mt-3 max-w-prose text-sm text-slate-700">
                {p}
              </p>
            ))}
            <p className="mt-4 text-sm">
              <Link href={LINKS.aPropos} className={OFC_LINK}>
                Découvrir Laure Olivié
              </Link>
            </p>
          </div>
        </section>
      ) : null}

      {/* 16 — Infos pratiques / Qualiopi / PDF */}
      <section className="bg-white px-4 py-10" aria-labelledby="infos-reglementaires">
        <div className="mx-auto max-w-3xl">
          <h2 id="infos-reglementaires" className="font-display text-lg font-bold text-slate-900">
            Informations pratiques et réglementaires
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Prérequis, modalités, évaluation, délai d&apos;accès, accessibilité handicap et programme
            PDF officiel.
          </p>
          {ux ? (
            <p className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              <strong className="text-slate-900">Prérequis :</strong> {config.prerequis}
            </p>
          ) : null}
        </div>
      </section>

      <FormationProgrammePdfSection catalogueRef={config.ref} />
      <CatalogueInfosPratiques programmeRef={config.ref} />

      {/* 17 — FAQ */}
      <div className={OFC_SEC.muted}>
        <div className="mx-auto max-w-3xl">
          <FAQSection
            items={[...config.faq]}
            title="Questions fréquentes"
            subtitle="Prérequis, application connectée, financement, parcours."
          />
        </div>
      </div>

      {/* 18 — CTA final */}
      <section className="bg-white px-4 py-14">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            {ux?.ctaFinal?.title ?? 'Vous avez une idée d’outil pour votre entreprise ?'}
          </h2>
          <p className="mt-3 text-slate-600">
            {ux?.ctaFinal?.text ??
              'Présentez-moi votre besoin. Nous vérifierons ensemble si ce parcours correspond à votre projet.'}
          </p>
          <div className="mt-8 flex justify-center">
            <ApplicationMetierRdvCta
              label={ux?.ctaFinal?.label ?? 'Réserver une visio de 30 minutes'}
              origin={`application-metier-${config.slug}-footer`}
              formationHint={hint}
            />
          </div>
          <p className="mt-3 text-sm font-medium text-slate-600">Gratuit · Sans engagement</p>
          <p className="mt-6 text-sm">
            <Link href={LINKS.ressources} className={OFC_LINK}>
              Ressources IA BTP
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
