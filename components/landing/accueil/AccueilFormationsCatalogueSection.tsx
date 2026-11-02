import Image from 'next/image';
import Link from 'next/link';
import { GraduationCap } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { getAccueilMaquetteFormations } from '@/lib/accueil-config';
import { AccueilMaquetteArrowButton } from '@/components/landing/accueil/AccueilMaquetteArrowButton';
import { OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';

/** Quatre cartes formations — maquette accueil. */
export function AccueilFormationsCatalogueSection() {
  const formations = getAccueilMaquetteFormations();

  return (
    <Section
      id="accueil-offre-choix"
      tone="white"
      className="scroll-mt-[calc(var(--site-header-height,4.5rem)+0.5rem)]"
      aria-labelledby="accueil-formations-maquette-title"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 id="accueil-formations-maquette-title" className={`${OFC_TYPE_H2} text-[#101936]`}>
          Choisissez votre formation IA BTP
        </h2>
        <p className="mt-3 text-base leading-relaxed text-ofc-ink-muted">
          Des formations pratiques, orientées métiers, adaptées à vos besoins et au niveau de votre
          équipe.
        </p>
      </div>

      <ul className="mt-10 grid list-none gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {formations.map((f) => (
          <li key={f.code} className="list-none">
            <Link
              href={f.href}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ofc-border bg-white shadow-sm transition hover:border-[#377CF3]/35 hover:shadow-md"
            >
              <div className="flex flex-1 flex-col p-5 pb-4">
                <GraduationCap className="h-6 w-6 text-[#377CF3]" strokeWidth={1.75} aria-hidden />
                <p className="mt-3 inline-flex w-fit rounded-full bg-[#EAF3FF] px-3 py-1 text-xs font-semibold text-[#377CF3]">
                  {f.badge}
                </p>
                <h3 className="mt-3 font-display text-base font-bold leading-snug text-[#101936]">
                  {f.titre}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ofc-ink-muted">
                  {f.description}
                </p>
                <div className="mt-4 flex justify-end">
                  <AccueilMaquetteArrowButton />
                </div>
              </div>
              <div className="relative aspect-[16/7] w-full overflow-hidden">
                <Image
                  src={f.imageSrc}
                  alt={f.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  className="object-cover transition duration-300 group-hover:scale-[1.02]"
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
