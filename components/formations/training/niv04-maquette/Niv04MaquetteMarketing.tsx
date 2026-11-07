import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  Coins,
  Download,
  FileText,
  FolderKanban,
  HardHat,
  Layers,
  Link2,
  MapPin,
  Puzzle,
  Target,
  Users,
  UsersRound,
} from 'lucide-react';
import { CtaVisio } from '@/components/CtaVisio';
import type { CatalogueProgramModule } from '@/lib/catalogue-formation-page-content';
import {
  NIV04_MAQUETTE_HERO,
  NIV04_MAQUETTE_PEDAGOGIE_BG,
} from '@/lib/formation-niv04-maquette-assets';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { formatNumberFr } from '@/lib/format-number-fr';
import {
  libelleTarifParticipantCatalogue,
  TARIF_PARTICIPANT_NIV04_HT,
} from '@/lib/tarifs-catalogue-participant';
import { TRAINING_ANCHOR } from '@/lib/training-fiche-nav';

type Props = {
  h1Id: string;
  formationTitle: string;
  effectifMin: number;
  effectifMax: number;
  pdfHref?: string;
  programModules: readonly CatalogueProgramModule[];
};

function parseDurationFromModuleTitle(title: string): string | null {
  const match = title.match(/—\s*([^—]+)$/);
  return match ? match[1].trim() : null;
}

function stripModuleHeading(title: string): string {
  const withoutMeta = title.replace(/—\s*[^—]+$/, '').trim();
  return withoutMeta.replace(/^MODULE\s+\d+\s*—\s*/i, '').trim() || withoutMeta;
}

function pickTeachingModules(modules: readonly CatalogueProgramModule[]) {
  return modules
    .filter((m) => /^MODULE \d/i.test(m.title))
    .map((mod, index) => ({
      numero: String(index + 1).padStart(2, '0'),
      titre: stripModuleHeading(mod.title),
      duree: parseDurationFromModuleTitle(mod.title) ?? '',
      points: mod.points,
      competence: mod.competence,
      practice: mod.practice,
    }));
}

/** Sections marketing maquette NIV-04 — hero à CTA final. */
export function Niv04MaquetteMarketing({
  h1Id,
  formationTitle,
  effectifMin,
  effectifMax,
  pdfHref,
  programModules,
}: Props) {
  const photo = NIV04_MAQUETTE_HERO;
  const tarifLabel = libelleTarifParticipantCatalogue(TARIF_PARTICIPANT_NIV04_HT);
  const programCards = pickTeachingModules(programModules);

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

  return (
    <div className="formation-niv04-maquette overflow-x-hidden bg-white">
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
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#377CF3]">
              Formation IA BTP · Niveau avancé
            </p>
            <h1 id={h1Id} className="ofc-type-hero mt-4 text-balance text-[#101936]">
              {formationTitle}
            </h1>
            <p className="ofc-type-lead mt-4 text-balance text-[#101936]">
              Projects, Skills, Cowork et connecteurs au service de vos documents de chantier
            </p>
            <p className="mt-3 text-base text-slate-600">
              Exploitez Claude pour analyser et structurer vos pièces BTP (DCE, CCTP, CCAP, comptes rendus, DOE,
              dossiers chantier) : Projets, bibliothèque de skills, production supervisée et automatisations — sous
              votre contrôle avant diffusion.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <CtaVisio
                src="formation-niv04-claude-hero"
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 px-5 py-3 sm:w-auto"
                leadingAdornment={<Calendar className="h-4 w-4 shrink-0" aria-hidden />}
              />
              {programmeButton}
            </div>
          </div>

          <div className="relative min-h-0 w-full">
            <figure className="overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-slate-100 shadow-sm">
              <div className="relative aspect-[3/2] w-full">
                <Image
                  src={photo.src}
                  alt={photo.alt}
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
        <section aria-labelledby="niv04-indicateurs-title" className="-mt-4 scroll-mt-24 pt-2 sm:pt-4">
          <h2 id="niv04-indicateurs-title" className="sr-only">
            Informations clés de la formation
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
            {[
              { icon: Layers, sub: 'Niveau avancé' },
              { icon: Clock, sub: '4 h' },
              {
                icon: Coins,
                sub: `${formatNumberFr(TARIF_PARTICIPANT_NIV04_HT)} € HT / participant`,
              },
              { icon: MapPin, sub: 'Présentiel · Île-de-France' },
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

        <section aria-labelledby="niv04-benefices-title">
          <h2 id="niv04-benefices-title" className="ofc-type-h2 text-center text-[#101936] md:text-left">
            Une formation concrète pour exploiter Claude dans vos projets BTP
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                icon: FolderKanban,
                titre: 'Projects Claude',
                texte: 'Un Projet par affaire ou chantier : instructions permanentes et base documentaire partagée.',
              },
              {
                icon: Puzzle,
                titre: 'Skills métier',
                texte: 'Assistants spécialisés BTP : création, tests et bibliothèque réutilisable par métier.',
              },
              {
                icon: UsersRound,
                titre: 'Cowork',
                texte: 'Production collaborative de dossiers chantier en autonomie supervisée, avec jalons de validation.',
              },
              {
                icon: Link2,
                titre: 'Connecteurs',
                texte: 'Relier Claude à la messagerie, au drive ou à l’agenda — workflow sécurisé sur vos sources.',
              },
            ].map((card) => (
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
          aria-labelledby="niv04-format-court-title"
          className="flex flex-col gap-5 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-6 md:flex-row md:items-center md:justify-between md:gap-8"
        >
          <div className="flex min-w-0 gap-4 md:max-w-[58%]">
            <Layers className="mt-0.5 h-8 w-8 shrink-0 text-[#1D4ED8]" aria-hidden />
            <div>
              <h2 id="niv04-format-court-title" className="font-display text-lg font-semibold text-[#101936]">
                Un format court, concret et 100&nbsp;% terrain
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                Des cas pratiques issus de chantiers réels, sur vos documents (CCTP, mémoires, dossiers, exports) —
                l&apos;IA prépare et structure, vous validez avant tout envoi ou publication.
              </p>
            </div>
          </div>
          {programmeButton}
        </section>

        <section
          id={TRAINING_ANCHOR.programme}
          className="scroll-mt-24"
          aria-labelledby="niv04-programme-title"
        >
          <h2 id="niv04-programme-title" className="ofc-type-h2 text-[#101936]">
            Le programme de la formation (4 h)
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {programCards.map((card) => {
              const cardTitleId = `niv04-programme-${card.numero}`;
              return (
                <article
                  key={card.numero}
                  className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ring-1 ring-slate-50"
                  aria-labelledby={cardTitleId}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#377CF3] text-sm font-bold text-white"
                        aria-hidden
                      >
                        {card.numero}
                      </span>
                      <FileText className="h-5 w-5 shrink-0 text-[#377CF3]" aria-hidden />
                    </div>
                    {card.duree ? (
                      <p className="text-sm font-semibold text-slate-500">{card.duree}</p>
                    ) : null}
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
                </article>
              );
            })}
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Durée totale : 4 h (accueil, modules 1 à 4 et bilan inclus) — {tarifLabel} en inter-entreprises.
          </p>
        </section>

        <section aria-labelledby="niv04-pedagogie-title" className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0" aria-hidden>
            <Image
              src={NIV04_MAQUETTE_PEDAGOGIE_BG}
              alt=""
              fill
              className="object-cover object-center"
              sizes="100vw"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F4F]/95 via-[#0B1F4F]/90 to-[#377CF3]/40" />
          </div>
          <div className="relative px-6 py-10 text-white md:px-10 md:py-12">
            <h2 id="niv04-pedagogie-title" className="ofc-type-h2 text-white">
              Une pédagogie ancrée dans la réalité du BTP
            </h2>
            <ul className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-stretch lg:flex-nowrap lg:divide-x lg:divide-white/25">
              {[
                { icon: HardHat, label: 'Cas pratiques réels' },
                { icon: FileText, label: 'Documents métier' },
                { icon: Layers, label: 'Modèles réutilisables' },
                { icon: Target, label: 'Méthodes applicables dès le chantier' },
                { icon: Clock, label: 'Gain de temps et de fiabilité' },
              ].map((item) => (
                <li
                  key={item.label}
                  className="flex flex-1 flex-col items-center gap-2 px-0 text-center sm:min-w-[9rem] lg:px-4"
                >
                  <item.icon className="h-7 w-7 text-white" aria-hidden />
                  <span className="text-sm font-semibold leading-snug text-white">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          aria-labelledby="niv04-cta-final-title"
          className="rounded-2xl border border-slate-200 bg-[#F8FAFC] px-6 py-10 text-center md:px-10"
        >
          <h2
            id="niv04-cta-final-title"
            className="font-display text-2xl font-bold text-balance text-[#101936]"
          >
            Exploitez Claude pour des chantiers plus efficaces
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 md:text-base">
            Projets, skills, Cowork et connecteurs : industrialisez vos usages documentaires BTP avec Claude, sous
            validation humaine.
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <CtaVisio
              src="formation-niv04-claude-final"
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
            src="formation-niv04-claude-sticky"
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
