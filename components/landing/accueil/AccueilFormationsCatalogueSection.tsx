import Image from 'next/image';
import Link from 'next/link';
import { GraduationCap } from 'lucide-react';
import { getAccueilMaquetteFormations } from '@/lib/accueil-config';
import { AccueilMaquetteArrowButton } from '@/components/landing/accueil/AccueilMaquetteArrowButton';
import {
  AccueilMaquetteHeading,
  AccueilMaquetteSection,
} from '@/components/landing/accueil/AccueilMaquetteSection';

/** Quatre cartes formations — visuels bandeau bas + flèche (maquette). */
export function AccueilFormationsCatalogueSection() {
  const formations = getAccueilMaquetteFormations();

  return (
    <AccueilMaquetteSection
      id="accueil-offre-choix"
      className="scroll-mt-[calc(var(--site-header-height,4.5rem)+0.5rem)]"
      aria-labelledby="accueil-formations-maquette-title"
    >
      <AccueilMaquetteHeading
        id="accueil-formations-maquette-title"
        title="Choisissez votre formation IA BTP"
        description="Des formations pratiques, orientées métiers, adaptées à vos besoins et au niveau de votre équipe."
      />

      <ul className="accueil-maquette__grid grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3.5">
        {formations.map((f) => (
          <li key={f.code} className="list-none">
            <Link
              href={f.href}
              className="group flex h-full min-h-[17.5rem] flex-col overflow-hidden rounded-xl border border-ofc-border bg-white shadow-sm transition hover:border-[#377CF3]/35 hover:shadow-md"
            >
              <div className="flex flex-1 flex-col p-4 pb-3">
                <GraduationCap className="h-5 w-5 text-[#377CF3]" strokeWidth={1.75} aria-hidden />
                <p className="mt-2 inline-flex w-fit rounded-full bg-[#EAF3FF] px-2.5 py-0.5 text-[11px] font-semibold text-[#377CF3]">
                  {f.badge}
                </p>
                <h3 className="mt-2 font-display text-[0.9375rem] font-bold leading-snug text-[#101936]">
                  {f.titre}
                </h3>
                <p className="mt-1.5 line-clamp-3 flex-1 text-xs leading-relaxed text-ofc-ink-muted">
                  {f.description}
                </p>
              </div>
              <div className="relative h-[4.75rem] w-full shrink-0 overflow-hidden sm:h-[5.25rem]">
                <Image
                  src={f.imageSrc}
                  alt={f.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center transition duration-300 group-hover:scale-[1.02]"
                />
                <span className="absolute bottom-2 right-2">
                  <AccueilMaquetteArrowButton className="!h-9 !w-9" />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </AccueilMaquetteSection>
  );
}
