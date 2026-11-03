import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { LINKS } from '@/lib/internal-links';
import { PHOTOS } from '@/lib/photos';
import { FC_SECTION, FC_SUBTITLE, FC_TITLE } from '@/lib/financement-constructys-ui';
import { OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

const FORMATIONS = [
  {
    titre: 'Initiation à l’IA BTP',
    badge: 'Niveau 1 · 4 h',
    href: LINKS.formationIaBtpNiveau1BatimentTp,
    photo: PHOTOS.constructysPlanningChantierIa,
  },
  {
    titre: 'Appels d’offres et DCE',
    badge: 'Niveau 2 · 4 à 7 h',
    href: LINKS.formationIaCctpAnalyseDceBtp,
    photo: PHOTOS.constructysDceCasquePlans,
  },
  {
    titre: 'IA et conduite de travaux',
    badge: 'Niveau 2 · 4 à 7 h',
    href: LINKS.formationConduiteTravauxSuiviChantier,
    photo: PHOTOS.constructysConducteurTravaux,
  },
] as const;

export function FinancementFormationsAdapteesSection() {
  return (
    <section aria-labelledby="formations-adaptees-title" className={FC_SECTION}>
      <h2 id="formations-adaptees-title" className={FC_TITLE}>
        Formations IA adaptées au BTP
      </h2>
      <p className={FC_SUBTITLE}>
        Parcours présentiel en Île-de-France, certifiés Qualiopi — éligibles selon votre dossier
        Constructys.
      </p>
      <ul className="mt-8 grid gap-5 lg:grid-cols-3">
        {FORMATIONS.map((formation) => (
          <li key={formation.href}>
            <Link
              href={formation.href}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#D7E5F7] bg-white shadow-sm transition-[box-shadow,border-color] duration-200 motion-safe:hover:border-[#377CF3]/35 motion-safe:hover:shadow-md"
            >
              <div className="relative aspect-[364/169] w-full bg-[#EAF3FF]">
                <Image
                  src={formation.photo.src}
                  alt={formation.photo.alt}
                  width={formation.photo.width}
                  height={formation.photo.height}
                  className="h-full w-full object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="inline-flex w-fit rounded-full bg-[#EAF3FF] px-2.5 py-0.5 text-xs font-semibold text-[#2563EB]">
                  {formation.badge}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold text-[#081943] group-hover:text-[#377CF3]">
                  {formation.titre}
                </h3>
                <span
                  className="mt-4 inline-flex h-9 w-9 items-center justify-center self-end rounded-full border border-[#D7E5F7] text-[#377CF3] transition-colors group-hover:bg-[#377CF3] group-hover:text-white"
                  aria-hidden
                >
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-8 text-center">
        <Link
          href={LINKS.formations}
          className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center gap-2 px-6 py-3`}
        >
          Découvrir les formations
          <ArrowRight className="h-5 w-5" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
