import Image from 'next/image';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { ACCUEIL_RESULTATS_PRODUITS_MAQUETTE } from '@/lib/accueil-config';
import {
  ACCUEIL_MAQUETTE_ICON_STROKE,
  ACCUEIL_RESULTAT_ICONS,
} from '@/components/landing/accueil/accueil-maquette-icons';
import { AccueilMaquetteArrowButton } from '@/components/landing/accueil/AccueilMaquetteArrowButton';
import { AccueilMaquetteSection } from '@/components/landing/accueil/AccueilMaquetteSection';
import { RevealGroupShell } from '@/components/motion/RevealShell';
import { ACCUEIL_MOTION_REVEAL } from '@/components/landing/accueil/accueil-maquette-icons';
import { LINKS } from '@/lib/internal-links';
import { OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';
import { PHOTOS } from '@/lib/photos';

const ARGUMENTS = [
  'Expertise du BTP et de l’IA.',
  'Cas pratiques sur documents métier.',
  'Formations en présentiel en Île-de-France.',
  'Accompagnement adapté aux entreprises.',
] as const;

/** Résultats concrets + Pourquoi Laure Olivié — grille maquette. */
export function AccueilResultatsPourquoiSection() {
  const photo = PHOTOS.accueilOrganismeSalleBtp;

  return (
    <AccueilMaquetteSection tone="muted" aria-labelledby="accueil-resultats-title">
      <RevealGroupShell
        className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-10"
        staggerMs={ACCUEIL_MOTION_REVEAL.staggerMs}
        distance={ACCUEIL_MOTION_REVEAL.distance}
      >
        <div className="min-w-0">
          <h2 id="accueil-resultats-title" className={`${OFC_TYPE_H2} text-xl font-extrabold text-[#081A3D] md:text-2xl`}>
            Ce que vos équipes sauront produire
          </h2>
          <ul className="mt-4 grid list-none gap-3 sm:grid-cols-2">
            {ACCUEIL_RESULTATS_PRODUITS_MAQUETTE.map((item) => {
              const Icon = ACCUEIL_RESULTAT_ICONS[item.id];
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    aria-label={item.ariaLabel}
                    className="accueil-maquette-card--interactive group flex h-full flex-col rounded-xl border border-[#DAE3F0] bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EAF3FF] text-[#0755E8]">
                        <Icon className="h-5 w-5" strokeWidth={ACCUEIL_MAQUETTE_ICON_STROKE} aria-hidden />
                      </span>
                      <AccueilMaquetteArrowButton className="!h-9 !w-9" />
                    </div>
                    <h3 className="mt-2 font-display text-sm font-bold text-[#081A3D]">{item.titre}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-ofc-ink-muted">{item.phrase}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="mt-3 text-[11px] leading-relaxed text-ofc-ink-muted">
            Les documents produits avec l&apos;IA doivent être relus et validés par un professionnel.
          </p>
        </div>

        <div className="min-w-0">
          <h2 className={`${OFC_TYPE_H2} text-xl font-extrabold text-[#081A3D] md:text-2xl`}>
            Pourquoi choisir Laure Olivié ?
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-[minmax(0,11.5rem)_minmax(0,1fr)] sm:items-start">
            <div className="accueil-maquette-pourquoi__media overflow-hidden rounded-xl bg-[#F2F2F2] ring-1 ring-[#DAE3F0]">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(max-width: 640px) 85vw, 184px"
                className="h-auto w-full object-cover object-center"
              />
            </div>
            <ul className="space-y-2.5">
              {ARGUMENTS.map((line) => (
                <li key={line} className="flex gap-2.5 text-sm leading-snug text-[#081A3D]">
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0755E8]"
                    aria-hidden
                  >
                    <Check className="h-3 w-3 text-white" strokeWidth={2.5} />
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-3 text-sm text-ofc-ink-muted">
            Laure Olivié, marque commerciale d&apos;OFC Création d&apos;Entreprise — organisme certifié
            Qualiopi (actions de formation).
          </p>
          <p className="mt-2 text-sm">
            <Link href={LINKS.aPropos} className="font-semibold text-[#0755E8] hover:underline">
              En savoir plus sur l&apos;organisme
            </Link>
            {' · '}
            <Link href={LINKS.formateurs} className="font-semibold text-[#0755E8] hover:underline">
              Nos formateurs
            </Link>
          </p>
        </div>
      </RevealGroupShell>
    </AccueilMaquetteSection>
  );
}
