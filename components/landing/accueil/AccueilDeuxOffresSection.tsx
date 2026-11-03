import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, Laptop, HardHat } from 'lucide-react';
import {
  AccueilMaquetteHeading,
  AccueilMaquetteSection,
} from '@/components/landing/accueil/AccueilMaquetteSection';
import { AccueilMaquettePill } from '@/components/landing/accueil/AccueilMaquettePill';
import { ACCUEIL_MAQUETTE_ICON_STROKE } from '@/components/landing/accueil/accueil-maquette-icons';
import { RevealGroupShell } from '@/components/motion/RevealShell';
import { ACCUEIL_MOTION_REVEAL } from '@/components/landing/accueil/accueil-maquette-icons';
import { LINKS } from '@/lib/internal-links';
import { PHOTOS } from '@/lib/photos';

const MAQUETTE_BTN_PRIMARY =
  'inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#0755E8] px-4 py-2.5 text-sm font-semibold text-white motion-safe:transition-[transform,background-color] motion-safe:duration-200 motion-safe:hover:-translate-y-px motion-safe:hover:bg-[#0648c7] motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0755E8]';

const MAQUETTE_BTN_SECONDARY =
  'inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#0755E8] bg-white px-4 py-2.5 text-sm font-semibold text-[#0755E8] motion-safe:transition-[transform,background-color] motion-safe:duration-200 motion-safe:hover:-translate-y-px motion-safe:hover:bg-[#F5F9FF] motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0755E8]';

/** Deux cartes commerciales — Formations IA vs Parcours métiers (maquette). */
export function AccueilDeuxOffresSection() {
  const photoFormations = PHOTOS.accueilCarteFormationsIa;
  const photoParcours = PHOTOS.accueilCarteParcoursMetiers;

  return (
    <AccueilMaquetteSection
      id="formations-parcours"
      className="scroll-mt-[calc(var(--site-header-height,4.5rem)+0.5rem)]"
      aria-labelledby="accueil-deux-offres-title"
    >
      <AccueilMaquetteHeading
        id="accueil-deux-offres-title"
        title="Choisissez la formation adaptée à vos besoins"
      />

      <RevealGroupShell
        className="accueil-maquette__grid grid gap-4 lg:grid-cols-2 lg:gap-5"
        staggerMs={ACCUEIL_MOTION_REVEAL.staggerMs}
        distance={ACCUEIL_MOTION_REVEAL.distance}
      >
        <article className="accueil-maquette-card--interactive flex h-full flex-col overflow-hidden rounded-xl border border-[#DAE3F0] bg-white shadow-sm">
          <div className="flex flex-1 flex-col p-5 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#EAF3FF] text-[#0755E8]">
                <Laptop className="h-5 w-5" strokeWidth={ACCUEIL_MAQUETTE_ICON_STROKE} aria-hidden />
              </span>
              <h3 className="font-display text-lg font-bold text-[#081A3D]">Formations IA BTP</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ofc-ink-muted">
              Des formations opérationnelles pour utiliser l&apos;IA dans vos missions du quotidien.
            </p>
            <ul className="mt-3 space-y-2 text-sm text-[#081A3D]">
              {[
                'Deux formats courts : 4 h ou 7 h.',
                'Des cas d’usage concrets BTP.',
                'ChatGPT, Claude et assistants IA.',
                'Ateliers avancés de 14 h également proposés.',
              ].map((line) => (
                <li key={line} className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0755E8]" strokeWidth={2.5} aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <div className="relative mt-4 aspect-[16/9] w-full overflow-hidden rounded-lg bg-[#F5F9FF]">
              <Image
                src={photoFormations.src}
                alt={photoFormations.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
            <Link href={LINKS.formations} className={`${MAQUETTE_BTN_PRIMARY} mt-4`}>
              Découvrir les formations IA
              <ArrowRight className="h-4 w-4" strokeWidth={ACCUEIL_MAQUETTE_ICON_STROKE} aria-hidden />
            </Link>
          </div>
        </article>

        <article className="accueil-maquette-card--interactive flex h-full flex-col overflow-hidden rounded-xl border border-[#DAE3F0] bg-white shadow-sm">
          <div className="flex flex-1 flex-col p-5 pb-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#EAF3FF] text-[#0755E8]">
                <HardHat className="h-5 w-5" strokeWidth={ACCUEIL_MAQUETTE_ICON_STROKE} aria-hidden />
              </span>
              <h3 className="font-display text-lg font-bold text-[#081A3D]">
                Parcours métiers BTP avec l&apos;IA
              </h3>
              <AccueilMaquettePill variant="violet" className="text-[10px]">
                Ouverture 2027
              </AccueilMaquettePill>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ofc-ink-muted">
              Des formations complètes pour développer les compétences de vos équipes, avec l&apos;IA en
              appui des pratiques métier.
            </p>
            <ul className="mt-3 space-y-2 text-sm text-[#081A3D]">
              {[
                'Conducteur de travaux, chargé d’affaires et autres métiers BTP.',
                'Une approche métier et opérationnelle.',
                'Des mises en situation sur vos documents.',
              ].map((line) => (
                <li key={line} className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0755E8]" strokeWidth={2.5} aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <div className="relative mt-4 aspect-[16/9] w-full overflow-hidden rounded-lg bg-[#F5F9FF]">
              <Image
                src={photoParcours.src}
                alt={photoParcours.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
            <Link href={LINKS.parcoursMetiers} className={`${MAQUETTE_BTN_SECONDARY} mt-4`}>
              Découvrir les parcours métiers
              <ArrowRight className="h-4 w-4" strokeWidth={ACCUEIL_MAQUETTE_ICON_STROKE} aria-hidden />
            </Link>
          </div>
        </article>
      </RevealGroupShell>
    </AccueilMaquetteSection>
  );
}
