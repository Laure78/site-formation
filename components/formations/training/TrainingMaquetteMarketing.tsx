import Image from 'next/image';
import { SITE_FORMATION_MODALITE_ENCART } from '@/lib/site-config';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  Coins,
  Download,
  FileText,
  HardHat,
  Layers,
  MapPin,
  Shield,
  Target,
  Users,
} from 'lucide-react';
import { CtaVisio } from '@/components/CtaVisio';
import type { CatalogueProgramModule } from '@/lib/catalogue-formation-page-content';
import type { FormationCatalogueCode } from '@/lib/formation-catalogue-visibility';
import { getFormationMaquetteAssets } from '@/lib/formation-maquette-assets';
import { getFormationMaquetteMarketingSlice } from '@/lib/formation-maquette-marketing-config';
import {
  formationHeroBadgeNiveau,
  formationNiveauOfficielLabel,
} from '@/lib/formation-niveaux-officiels';
import { FORMATION_SECTION_PROGRAMME } from '@/lib/formation-pedagogy-sections';
import { buildProgrammeModuleCards } from '@/lib/formation-program-module-display';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { formatNumberFr } from '@/lib/format-number-fr';
import { libelleTarifParticipantCatalogue } from '@/lib/tarifs-catalogue-participant';
import { TRAINING_ANCHOR } from '@/lib/training-fiche-nav';
import { getFormationByCode } from '@/data/formations';

type Props = {
  programmeRef: FormationCatalogueCode;
  h1Id: string;
  /** Titre affiché en H1 — conserver l’identité SEO de chaque fiche. */
  heroH1: string;
  formationTitle: string;
  effectifMin: number;
  effectifMax: number;
  pdfHref?: string;
  programModules: readonly CatalogueProgramModule[];
  programmeHeading?: string;
};

const DEFAULT_PEDAGOGY_ICONS = [HardHat, FileText, Layers, Shield, Target] as const;

/**
 * Sections marketing communes — modèle graphique NIV-02 (hero → CTA final + barre mobile).
 */
export function TrainingMaquetteMarketing({
  programmeRef,
  h1Id,
  heroH1,
  formationTitle,
  effectifMin,
  effectifMax,
  pdfHref,
  programModules,
  programmeHeading,
}: Props) {
  const slice = getFormationMaquetteMarketingSlice(programmeRef);
  const assets = getFormationMaquetteAssets(programmeRef);
  const formation = getFormationByCode(programmeRef)!;
  const tarifHt = formation.tarifParticipantHt ?? 0;
  const tarifLabel = libelleTarifParticipantCatalogue(tarifHt);
  const is14h = formation.duree.includes('14');
  const heroBadge = formationHeroBadgeNiveau(formation.niveau);
  const levelKeyFact = formationNiveauOfficielLabel(formation.niveau);

  const programCards = buildProgrammeModuleCards(programModules, slice.programmeFixedLabels);

  const programmeTitle = programmeHeading ?? FORMATION_SECTION_PROGRAMME;
  const pedagogyLabels = slice.pedagogyLabels ?? [
    'Cas pratiques BTP',
    'Documents métier',
    'Modèles réutilisables',
    'Validation humaine des propositions IA',
    'Méthodes terrain',
  ];

  const programmeButton = pdfHref ? (
    <a
      href={pdfHref}
      download
      className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center gap-2 px-5 py-3 sm:w-auto`}
    >
      <Download className="h-4 w-4 shrink-0" aria-hidden />
      Recevoir le programme
    </a>
  ) : (
    <Link
      href={`${LINKS.contact}?objet=devis&formation=${encodeURIComponent(formationTitle)}`}
      className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center gap-2 px-5 py-3 sm:w-auto`}
    >
      <Download className="h-4 w-4 shrink-0" aria-hidden />
      Recevoir le programme
    </Link>
  );

  const footnote = is14h
    ? `${slice.programmeFootnote14h ?? 'Durée totale : 14 h'} — ${tarifLabel} (identique intra et inter).`
    : `${slice.programmeFootnote4h ?? 'Durée totale : 4 h'} — ${tarifLabel} (identique intra et inter).`;

  const tarifKeyFact = `${formatNumberFr(tarifHt)} € HT / participant`;
  const durationKeyFact = formation.duree;

  return (
    <div className={`formation-maquette formation-${programmeRef.toLowerCase()}-maquette overflow-x-hidden bg-white`}>
      <section className="border-b border-slate-100 bg-white" aria-labelledby={h1Id}>
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
              <li className="font-medium text-[#101936]" aria-current="page">
                {formationTitle}
              </li>
            </ol>
          </nav>
        </div>

        <div className="mx-auto grid max-w-[80rem] items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-14">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#377CF3]">{heroBadge}</p>
            <h1 id={h1Id} className="ofc-type-hero mt-4 text-balance text-[#101936]">
              {heroH1}
            </h1>
            <p className="ofc-type-lead mt-4 text-balance text-[#101936]">{slice.heroLead}</p>
            <p className="mt-3 text-base text-slate-600">{slice.heroDescription}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <CtaVisio
                src={`${slice.ctaSrcPrefix}-hero`}
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 px-5 py-3 sm:w-auto"
                leadingAdornment={<Calendar className="h-4 w-4 shrink-0" aria-hidden />}
              />
              {programmeButton}
            </div>
          </div>

          <div className="relative min-h-0 w-full">
            <figure className="overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100 shadow-sm">
              <div className="relative aspect-video w-full">
                <Image
                  src={assets.hero.src}
                  alt={assets.hero.alt}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </figure>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[80rem] space-y-14 px-4 sm:space-y-16 sm:px-6 lg:px-8">
        <section aria-labelledby={`${programmeRef}-indicateurs-title`} className="-mt-4 scroll-mt-24 pt-2 sm:pt-4">
          <h2 id={`${programmeRef}-indicateurs-title`} className="sr-only">
            Informations clés de la formation
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
            {[
              { icon: Layers, sub: levelKeyFact },
              { icon: Clock, sub: durationKeyFact },
              { icon: Coins, sub: tarifKeyFact },
              { icon: MapPin, sub: SITE_FORMATION_MODALITE_ENCART },
              { icon: Users, sub: `${effectifMin} à ${effectifMax} participants` },
            ].map((item) => (
              <div
                key={item.sub}
                className="flex flex-col gap-2 rounded-2xl border border-[#BFDBFE] bg-[#F8FAFC] p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <item.icon className="h-5 w-5 text-[#377CF3]" aria-hidden />
                <p className="text-sm font-semibold leading-snug text-[#101936]">{item.sub}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby={`${programmeRef}-benefices-title`}>
          <h2 id={`${programmeRef}-benefices-title`} className="ofc-type-h2 text-center text-[#101936] md:text-left">
            {slice.benefitsTitle}
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {slice.benefits.map((card) => (
              <div
                key={card.titre}
                className="rounded-2xl border border-slate-200 border-b-[3px] border-b-[#377CF3] bg-[#F8FAFC] p-6 shadow-sm ring-1 ring-slate-50"
              >
                <span className="inline-flex rounded-xl bg-[#EFF6FF] p-2.5">
                  <card.icon className="h-6 w-6 text-[#377CF3]" aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-[#101936]">{card.titre}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.texte}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          aria-labelledby={`${programmeRef}-format-court-title`}
          className="flex flex-col gap-5 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-6 md:flex-row md:items-center md:justify-between md:gap-8"
        >
          <div className="flex min-w-0 gap-4 md:max-w-[58%]">
            <Layers className="mt-0.5 h-8 w-8 shrink-0 text-[#1D4ED8]" aria-hidden />
            <div>
              <h2
                id={`${programmeRef}-format-court-title`}
                className="font-display text-lg font-semibold text-[#101936]"
              >
                {slice.formatTitle}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{slice.formatDescription}</p>
            </div>
          </div>
          {programmeButton}
        </section>

        {programCards.length > 0 ? (
          <section
            id={TRAINING_ANCHOR.programme}
            className="scroll-mt-24"
            aria-labelledby={`${programmeRef}-programme-title`}
          >
            <h2 id={`${programmeRef}-programme-title`} className="ofc-type-h2 text-[#101936]">
              {programmeTitle}
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {programCards.map((card) => {
                const cardTitleId = `${programmeRef}-programme-${card.numero}`;
                return (
                  <article
                    key={card.numero}
                    className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ring-1 ring-slate-50"
                    aria-labelledby={cardTitleId}
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 shrink-0 text-[#377CF3]" aria-hidden />
                      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#377CF3]">
                        MODULE {card.numero}
                        {card.dureeLabel ? ` — ${card.dureeLabel}` : ''}
                      </p>
                    </div>
                    <h3
                      id={cardTitleId}
                      className="mt-3 font-display text-base font-semibold leading-snug text-[#101936]"
                    >
                      {card.titre}
                    </h3>
                    {card.competence ? (
                      <p className="mt-2 text-sm font-medium text-[#1D4ED8]">{card.competence}</p>
                    ) : null}
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-slate-600">
                      {card.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                    {card.practice ? (
                      <p className="mt-3 rounded-lg border border-slate-100 bg-[#F8FAFC] p-3 text-sm text-slate-600">
                        <span className="font-medium text-[#101936]">Mise en pratique : </span>
                        {card.practice}
                      </p>
                    ) : null}
                    {card.livrable ? (
                      <p className="mt-3 rounded-lg border border-[#BFDBFE]/60 bg-[#EFF6FF] p-3 text-sm text-slate-700">
                        <span className="font-medium text-[#101936]">Livrable : </span>
                        {card.livrable}
                      </p>
                    ) : null}
                  </article>
                );
              })}
            </div>
            <p className="mt-4 text-sm text-slate-500">{footnote}</p>
          </section>
        ) : null}

        <section aria-labelledby={`${programmeRef}-pedagogie-title`} className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0" aria-hidden>
            <Image
              src={assets.pedagogyBg}
              alt=""
              fill
              className="object-cover object-center"
              sizes="100vw"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F4F]/95 via-[#0B1F4F]/90 to-[#377CF3]/40" />
          </div>
          <div className="relative px-6 py-10 text-white md:px-10 md:py-12">
            <h2 id={`${programmeRef}-pedagogie-title`} className="ofc-type-h2 text-white">
              Une pédagogie ancrée dans la réalité du BTP
            </h2>
            <ul className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-stretch lg:flex-nowrap lg:divide-x lg:divide-white/25">
              {pedagogyLabels.map((label, index) => {
                const Icon = DEFAULT_PEDAGOGY_ICONS[index % DEFAULT_PEDAGOGY_ICONS.length];
                return (
                  <li
                    key={label}
                    className="flex flex-1 flex-col items-center gap-2 px-0 text-center sm:min-w-[9rem] lg:px-4"
                  >
                    <Icon className="h-7 w-7 text-white" aria-hidden />
                    <span className="text-sm font-semibold leading-snug text-white">{label}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section
          aria-labelledby={`${programmeRef}-cta-final-title`}
          className="rounded-2xl border border-slate-200 bg-[#F8FAFC] px-6 py-10 text-center md:px-10"
        >
          <h2
            id={`${programmeRef}-cta-final-title`}
            className="font-display text-2xl font-bold text-balance text-[#101936]"
          >
            {slice.finalCtaTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 md:text-base">{slice.finalCtaDescription}</p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <CtaVisio
              src={`${slice.ctaSrcPrefix}-final`}
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 px-6 py-3 sm:w-auto"
              leadingAdornment={<Calendar className="h-4 w-4 shrink-0" aria-hidden />}
            />
            {programmeButton}
          </div>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-[80rem] gap-2">
          <CtaVisio
            src={`${slice.ctaSrcPrefix}-sticky`}
            variant="primary"
            className="inline-flex min-h-11 flex-1 items-center justify-center px-3 py-2 text-sm"
          />
          {pdfHref ? (
            <a
              href={pdfHref}
              download
              className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 flex-1 items-center justify-center px-3 py-2 text-sm`}
            >
              Programme
            </a>
          ) : (
            <Link
              href={`#${TRAINING_ANCHOR.programme}`}
              className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 flex-1 items-center justify-center px-3 py-2 text-sm`}
            >
              Programme
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
