import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, Layers, Users } from 'lucide-react';
import { getModuleByCode, getThematiquesForParcoursMetier, type ParcoursComputed } from '@/data/catalogue-2027';
import type { ParcoursMetierTemplateContent } from '@/lib/catalogue-2027/parcours-metier-template-content';
import { PARCOURS_METIER_PEDAGOGIE_BACKGROUND } from '@/lib/catalogue-2027/parcours-metier-template-content';
import { libelleDisponibilite } from '@/lib/catalogue-2027/search-modules';
import { catalogueDemandeHref } from '@/lib/training-page-helpers';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { FormateurCard } from '@/components/formateurs/FormateurCard';
import { getFormateursForMetier } from '@/lib/formateurs';
import { CtaDevis } from '@/components/CtaDevis';
import { CtaVisio } from '@/components/CtaVisio';
import { ParcoursIndicateursCles } from './ParcoursIndicateursCles';
import { ParcoursMentionsOptionnelles } from './ParcoursMentionsOptionnelles';
import { ParcoursModuleCard } from './ParcoursModuleCard';
import { FormationsContact2027 } from './FormationsContact2027';
import { ParcoursChoixModulesRdvCta } from './ParcoursChoixModulesRdvCta';
import { ParcoursEncadrerIaBlock } from '@/components/formations/ParcoursEncadrerIaBlock';
import { PageMaillageSection } from '@/components/maillage/PageMaillageSection';
import { buildParcoursPageMaillageBlocks } from '@/lib/page-maillage-blocks';
import { FinancementOpcoEtenduCourtBlock } from '@/components/financement/FinancementOpcoEtenduCourtBlock';
import { parcoursIdShowsFinancementOpcoEtendu } from '@/lib/financement-opco-etendu-config';
import { ParcoursMetierFaqSection } from './ParcoursMetierFaqSection';

type Props = {
  parcours: ParcoursComputed;
  content: ParcoursMetierTemplateContent;
};

export function ParcoursMetierTemplate({ parcours: p, content }: Props) {
  const formateurs = getFormateursForMetier(p.metierId);
  const thematiquesChantier = getThematiquesForParcoursMetier(p.metierId);
  const maillageBlocks = buildParcoursPageMaillageBlocks(p);

  const programmeHref = catalogueDemandeHref({
    formationOuParcours: `Parcours ${p.titre}`,
    nature: 'choix-formation',
    metier: p.metierId,
  });
  const devisHref = catalogueDemandeHref({
    formationOuParcours: `Parcours ${p.titre}`,
    nature: 'devis',
    metier: p.metierId,
  });
  const adaptHref = catalogueDemandeHref({
    formationOuParcours: `Parcours ${p.titre} — adaptation équipe`,
    nature: 'intra',
    metier: p.metierId,
  });

  const heroTitleId = `parcours-hero-title-${p.id}`;
  const modulesSectionId = content.modulesSectionId;
  const calendrierIndicateurs =
    p.mentionDisponibilite ?? (p.id === 'referent-ia-btp' ? libelleDisponibilite(p.disponibilite) : undefined);

  return (
    <div className="overflow-x-hidden bg-white pb-24 lg:pb-20">
      {/* 01–02 Hero + fil d'Ariane */}
      <section className="border-b border-slate-100 bg-white" aria-labelledby={heroTitleId}>
        <div className="mx-auto max-w-[80rem] px-4 pt-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-slate-600" aria-label="Fil d'Ariane">
            <ol className="flex flex-wrap items-center gap-x-1 gap-y-1">
              <li>
                <Link href="/" className="underline decoration-slate-300 underline-offset-2 hover:text-[#377CF3]">
                  Accueil
                </Link>
              </li>
              <li className="text-slate-400" aria-hidden>
                /
              </li>
              <li>
                <Link
                  href={LINKS.formations}
                  className="underline decoration-slate-300 underline-offset-2 hover:text-[#377CF3]"
                >
                  Formations
                </Link>
              </li>
              <li className="text-slate-400" aria-hidden>
                /
              </li>
              <li>
                <Link
                  href={LINKS.parcoursMetiers}
                  className="underline decoration-slate-300 underline-offset-2 hover:text-[#377CF3]"
                >
                  Parcours métiers
                </Link>
              </li>
              <li className="text-slate-400" aria-hidden>
                /
              </li>
              <li className="font-medium text-[#101936]" aria-current="page">
                {p.titre}
              </li>
            </ol>
          </nav>
        </div>

        <div className="mx-auto grid max-w-[80rem] items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-14">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#377CF3]">
              Parcours métier · Ouverture 2027
            </p>
            <h1 id={heroTitleId} className="ofc-type-hero mt-4 text-balance text-[#101936]">
              {p.titre}
            </h1>
            <p className="ofc-type-lead mt-4 text-balance text-[#101936]">{p.benefice}</p>
            <p className="mt-3 text-base text-slate-600">{content.heroDescription}</p>
            <p className="mt-3 text-sm text-slate-600">
              <span className="font-medium text-[#101936]">Public :</span> {p.publicCible}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={`#${modulesSectionId}`}
                className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 w-full items-center justify-center gap-2 px-5 py-3 sm:w-auto`}
              >
                Choisir mes modules
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </Link>
              <CtaDevis
                href={devisHref}
                variant="secondary"
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 px-5 py-3 sm:w-auto"
              />
            </div>
          </div>

          <div className="relative min-h-0 w-full">
            <figure className="overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100 shadow-sm">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={content.heroImage.src}
                  alt={content.heroImage.alt}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              {content.heroFigcaption ? (
                <figcaption className="border-t border-slate-100 bg-white px-3 py-2 text-center text-xs text-slate-500">
                  {content.heroFigcaption}
                </figcaption>
              ) : null}
            </figure>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[80rem] space-y-14 px-4 sm:space-y-16 sm:px-6 lg:px-8">
        {/* 03 Informations clés */}
        <section aria-labelledby={`parcours-indicateurs-${p.id}`} className="-mt-4 scroll-mt-24 pt-2 sm:pt-4">
          <h2 id={`parcours-indicateurs-${p.id}`} className="sr-only">
            Informations clés du parcours
          </h2>
          <ParcoursIndicateursCles parcours={p} calendrierLabel={calendrierIndicateurs} />
        </section>

        {/* 04 Ce que vous apprendrez */}
        <section aria-labelledby={`parcours-apprendre-${p.id}`}>
          <h2 id={`parcours-apprendre-${p.id}`} className="ofc-type-h2 text-center text-[#101936] md:text-left">
            Ce que vous apprendrez
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {content.apprentissageCards.map((card) => (
              <div
                key={card.titre}
                className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 shadow-sm ring-1 ring-slate-50 transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="inline-flex rounded-xl bg-[#EFF6FF] p-2.5">
                  <card.icon className="h-6 w-6 text-[#377CF3]" aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-[#101936]">{card.titre}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.texte}</p>
              </div>
            ))}
          </div>
          <h3 className="ofc-type-h3 mt-10 text-[#101936]">Compétences visées</h3>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
            {p.competencesVisees.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>

        {/* 05 Parcours complet ou modules à la carte */}
        <section
          aria-labelledby={`parcours-modularite-${p.id}`}
          className="flex flex-col gap-5 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-6 md:flex-row md:items-center md:justify-between md:gap-8"
        >
          <div className="flex min-w-0 gap-4 md:max-w-[58%]">
            <Layers className="mt-0.5 h-8 w-8 shrink-0 text-[#1D4ED8]" aria-hidden />
            <div>
              <h2 id={`parcours-modularite-${p.id}`} className="font-display text-lg font-semibold text-[#101936]">
                Parcours complet ou modules à la carte
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                Vous pouvez suivre l&apos;ensemble du parcours ou choisir chaque module indépendamment, sous réserve des
                prérequis et du positionnement.
              </p>
            </div>
          </div>
          <Link
            href={`#${modulesSectionId}`}
            className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-start px-6 py-3 md:self-center`}
          >
            Voir les modules
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
          </Link>
        </section>

        {/* 06 Programme du parcours */}
        <section id={modulesSectionId} className="scroll-mt-24" aria-labelledby={`parcours-programme-${p.id}`}>
          <h2 id={`parcours-programme-${p.id}`} className="ofc-type-h2 text-[#101936]">
            Programme du parcours — {p.moduleCount} modules
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-600">
            Chaque bloc correspond à un module du catalogue : vous pouvez suivre le parcours complet ou ne retenir que
            certains modules — sous réserve des prérequis. Un cas pratique commun relie les étapes lorsque vous suivez le
            parcours entier ; les journées peuvent être espacées.
          </p>
          <div className="mt-6">
            <ParcoursChoixModulesRdvCta />
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {p.etapes.map((etape, index) => {
              const mod = getModuleByCode(etape.moduleCode);
              const moduleTitleId = `parcours-module-${p.id}-${etape.moduleCode}-${index}`;
              const accordionId = `parcours-module-accordion-${p.id}-${etape.moduleCode}-${index}`;
              const numero = String(index + 1).padStart(2, '0');
              const illustration = content.moduleIllustrations?.[etape.moduleCode];

              if (!mod) {
                return (
                  <article
                    key={`${etape.moduleCode}-${index}`}
                    className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600"
                  >
                    <p className="font-semibold text-[#377CF3]">{etape.moduleCode}</p>
                    <p className="mt-2">Module en cours d’intégration au catalogue.</p>
                  </article>
                );
              }

              const moduleDevisHref = catalogueDemandeHref({
                formationOuParcours: `${mod.code} — ${mod.titre}`,
                nature: 'devis',
                metier: p.metierId,
              });

              return (
                <ParcoursModuleCard
                  key={`${etape.moduleCode}-${index}`}
                  mod={mod}
                  etape={etape}
                  numero={numero}
                  titleId={moduleTitleId}
                  accordionId={accordionId}
                  devisHref={moduleDevisHref}
                  ficheHref={mod.href}
                  illustration={illustration}
                />
              );
            })}
          </div>
        </section>

        {/* 07 Méthodes pédagogiques et livrables */}
        <section aria-labelledby={`parcours-pedagogie-${p.id}`} className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0" aria-hidden>
            <Image
              src={PARCOURS_METIER_PEDAGOGIE_BACKGROUND}
              alt=""
              fill
              className="object-cover object-center"
              sizes="100vw"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[#0B1F4F]/92" />
          </div>
          <div className="relative px-6 py-10 text-white md:px-10 md:py-12">
            <h2 id={`parcours-pedagogie-${p.id}`} className="ofc-type-h2 text-white">
              Méthodes pédagogiques et livrables
            </h2>
            <p className="mt-3 max-w-3xl text-sm text-white/90">
              Présentiel en Île-de-France, exercices sur cas professionnels, livrables réutilisables. Évaluation des acquis
              intégrée à la durée annoncée. Formations non certifiantes.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {content.pedagogyCards.map((item) => (
                <div key={item.titre} className="rounded-xl border border-white/15 bg-white/5 p-4">
                  <item.icon className="h-7 w-7 text-white" aria-hidden />
                  <h3 className="mt-3 font-display text-base font-semibold text-white">{item.titre}</h3>
                  <p className="mt-2 text-sm text-white/85">{item.texte}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 08 Prérequis et modalités */}
        <section aria-labelledby={`parcours-prerequis-${p.id}`}>
          <h2 id={`parcours-prerequis-${p.id}`} className="ofc-type-h2 text-[#101936]">
            Prérequis et modalités
          </h2>
          <p className="mt-3 text-slate-600">{p.prerequis}</p>
          <p className="mt-2 text-sm text-slate-600">
            Un positionnement permet d’ajuster le parcours. L’évaluation des acquis est intégrée à la durée annoncée.
          </p>
          <ParcoursMentionsOptionnelles
            parcours={p}
            className="mt-4 rounded-xl border border-slate-200 bg-[#F8FAFC] p-4"
          />

          {thematiquesChantier.length > 0 ? (
            <div className="mt-8">
              <h3 className="font-display text-lg font-semibold text-[#101936]">Organisation et prévention avec l’IA</h3>
              <p className="mt-2 text-sm text-slate-600">
                Ce parcours intègre les sujets des sous-domaines IA chantier du catalogue (modules existants — durées et
                tarifs au module).
              </p>
              <ul className="mt-4 space-y-4">
                {thematiquesChantier.map((t) => (
                  <li
                    key={t.id}
                    className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4 text-sm text-slate-600"
                  >
                    <Link
                      href={`${LINKS.formations}#${t.slug}`}
                      className="font-semibold text-[#377CF3] underline"
                    >
                      {t.titre}
                    </Link>
                    <ul className="mt-2 list-disc space-y-1 pl-5">
                      {(t.integrationParcours[p.metierId] ?? []).map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-8">
            <ParcoursEncadrerIaBlock />
          </div>
        </section>

        {/* 09 Formateurs */}
        {formateurs.length > 0 ? (
          <section className="scroll-mt-28" aria-labelledby={`parcours-formateurs-${p.id}`}>
            <h2 id={`parcours-formateurs-${p.id}`} className="ofc-type-h2 text-[#101936]">
              Les formateurs du parcours
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
              Intervenants associés aux domaines du parcours.
            </p>
            <ul className="mt-8 grid list-none gap-6 lg:grid-cols-2">
              {formateurs.map((f, index) => (
                <li key={f.id} className="min-w-0">
                  <div className="h-full rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4 sm:p-5">
                    <FormateurCard
                      formateur={f}
                      showFormations={false}
                      variant="catalogue-hub"
                      portraitPriority={index === 0}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm">
              <Link href={LINKS.formateurs} className="font-semibold text-[#377CF3] underline underline-offset-2">
                Voir tous les formateurs
              </Link>
            </p>
          </section>
        ) : null}

        {/* 10 Financement et adaptation */}
        <section aria-labelledby={`parcours-financement-${p.id}`}>
          <h2 id={`parcours-financement-${p.id}`} className="ofc-type-h2 text-[#101936]">
            Financement et adaptation
          </h2>
          <p className="mt-3 text-slate-600">
            Le parcours peut être adapté en intra : ordre des modules, documents d’entreprise, effectif et calendrier.
            Tarif intra : sur devis. Prise en charge OPCO possible selon éligibilité.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href={programmeHref}
              className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center px-5 py-3`}
            >
              Demander le programme
            </Link>
            <Link
              href={adaptHref}
              className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center gap-2 px-5 py-3`}
            >
              <Users className="h-4 w-4 shrink-0" aria-hidden />
              Adapter ce parcours à mon équipe
            </Link>
          </div>
          {parcoursIdShowsFinancementOpcoEtendu(p.id) ? (
            <FinancementOpcoEtenduCourtBlock className="mt-8" />
          ) : null}
        </section>

        {/* 11 FAQ */}
        <ParcoursMetierFaqSection />

        {/* 12 Devis + formulaire */}
        <section
          aria-labelledby={`parcours-devis-${p.id}`}
          className="rounded-2xl border border-slate-200 bg-[#F8FAFC] px-6 py-10 text-center md:px-10"
        >
          <h2 id={`parcours-devis-${p.id}`} className="ofc-type-h2 text-balance text-[#101936]">
            Demander un devis
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 md:text-base">
            Indiquez les modules retenus ou votre besoin de parcours complet : nous vous répondons avec un programme et
            un devis HT par participant (intra sur mesure).
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <CtaDevis
              href={devisHref}
              className="inline-flex min-h-11 w-full items-center justify-center px-6 py-3 sm:w-auto"
            />
            <CtaVisio
              src={`${content.ctaAnalyticsPrefix}-devis`}
              className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center gap-2 px-6 py-3 sm:w-auto`}
              leadingAdornment={<Calendar className="h-4 w-4 shrink-0" aria-hidden />}
            />
          </div>
        </section>

        <FormationsContact2027 formationHint={`Parcours ${p.titre}`} initialObjet="devis" />
      </div>

      {/* Ressources / maillage */}
      <div className="mx-auto mt-16 max-w-[80rem] space-y-12 px-4 sm:px-6 lg:px-8">
        {maillageBlocks.map((block) => (
          <PageMaillageSection key={block.id} {...block} tone="white" className="!px-0" />
        ))}
      </div>

      {/* CTA mobile sticky */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-[80rem] gap-2">
          <CtaVisio
            src={`${content.ctaAnalyticsPrefix}-sticky`}
            variant="primary"
            className="inline-flex min-h-11 flex-1 items-center justify-center px-3 py-2 text-sm"
          />
          <CtaDevis
            href={devisHref}
            variant="secondary"
            className="inline-flex min-h-11 flex-1 items-center justify-center px-3 py-2 text-sm"
          />
        </div>
      </div>
    </div>
  );
}
