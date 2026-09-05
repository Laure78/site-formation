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
              À la fin de la journée, vous aurez construit un premier prototype
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
            <p className="mt-4 text-sm text-slate-600">{config.promesseRealiste}</p>
          </div>
        </section>
      ) : null}

      {/* 3 — Cas d’usage */}
      {ux ? (
        <section className="bg-white px-4 py-12 md:py-14" aria-labelledby="cas-usage">
          <div className="mx-auto max-w-3xl">
            <h2 id="cas-usage" className="font-display text-xl font-bold text-slate-900 md:text-2xl">
              Que pouvez-vous commencer à créer ?
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

      {/* 4 — Définition */}
      {ux ? (
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

      {/* 5 — Avant / après */}
      {ux ? (
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

      {/* 6 — Pour qui */}
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
              <p className="mt-4 text-sm text-slate-600">
                Aucune compétence en programmation n&apos;est nécessaire.
              </p>
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

      {/* 7 — Programme */}
      <section id="programme" className="scroll-mt-24 bg-white px-4 py-12 md:py-14" aria-labelledby="programme-title">
        <div className="mx-auto max-w-3xl">
          <h2 id="programme-title" className="font-display text-xl font-bold text-slate-900 md:text-2xl">
            Programme — {config.duree}
          </h2>

          {ux?.programmeSteps ? (
            <ol className="mt-8 space-y-5">
              {ux.programmeSteps.map((step) => (
                <li key={step.label} className="flex gap-4 border-l-2 border-[var(--accent)]/40 pl-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent)]">
                      {step.label}
                    </p>
                    <p className="mt-1 font-semibold text-slate-900">{step.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          ) : null}

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
        </div>
      </section>

      {/* 8 — Livrables */}
      {ux ? (
        <section className="border-t border-slate-100 bg-[#F2F2F2] px-4 py-12" aria-labelledby="repartez">
          <div className="mx-auto max-w-3xl">
            <h2 id="repartez" className="font-display text-xl font-bold text-slate-900 md:text-2xl">
              Vous repartez avec
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

      {/* 9 — Parcours N1→N2→N3 */}
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

      {/* 10 — Tarif (une seule fois) */}
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
          <div className="mt-6">
            <ApplicationMetierRdvCta
              label="Parler de mon projet"
              origin={`application-metier-${config.slug}-tarif`}
              formationHint={hint}
            />
          </div>
        </div>
      </section>

      {/* 11 — Financement */}
      <section className="bg-white px-4 py-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-lg font-bold text-slate-900">Financement</h2>
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-slate-700">
            Prise en charge possible par votre OPCO selon votre éligibilité et les règles applicables.
            Les plafonds peuvent être inférieurs au tarif de la formation.
          </p>
          <p className="mt-3 text-sm">
            <Link href={LINKS.financement} className={OFC_LINK}>
              En savoir plus sur le financement Constructys / OPCO
            </Link>
          </p>
        </div>
      </section>

      {/* 12 — Preuves */}
      <section className="border-t border-slate-100 bg-[#F2F2F2] px-4 py-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-lg font-bold text-slate-900">Pourquoi cette formation</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            <li>• Organisme de formation certifié Qualiopi</li>
            <li>• {formatVolumeProsFormesBtpLibelle()} — satisfaction {PREUVES.satisfaction}</li>
            <li>• Exercices réalisés sur les situations métier des participants</li>
            <li>
              • Présentiel en Île-de-France (Guyancourt / Yvelines) — développement assisté par l’IA,
              pas une formation « développeur »
            </li>
          </ul>
        </div>
      </section>

      {/* 13 — Infos pratiques / Qualiopi / PDF (indexable, bas de page) */}
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

      {/* 14 — FAQ */}
      <div className={OFC_SEC.muted}>
        <div className="mx-auto max-w-3xl">
          <FAQSection
            items={[...config.faq]}
            title="Questions fréquentes"
            subtitle="Prototypage, outils, financement, organisation."
          />
        </div>
      </div>

      {/* 15 — CTA final */}
      <section className="bg-white px-4 py-14">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Vous avez une idée d&apos;outil pour votre entreprise ?
          </h2>
          <p className="mt-3 text-slate-600">
            Présentez-moi votre besoin. Nous vérifierons ensemble si ce parcours correspond à votre
            projet.
          </p>
          <div className="mt-8 flex justify-center">
            <ApplicationMetierRdvCta
              label="Réserver une visio de 30 minutes"
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
