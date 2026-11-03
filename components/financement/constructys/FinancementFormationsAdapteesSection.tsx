import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { LINKS } from '@/lib/internal-links';
import { PHOTOS } from '@/lib/photos';
import {
  FC_CTA_SECONDARY,
  FC_SECTION,
  FC_SUBTITLE,
  FC_TITLE,
} from '@/lib/financement-constructys-ui';

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
      <ul className="mt-8 flex flex-col gap-4">
        {FORMATIONS.map((formation) => (
          <li key={formation.href}>
            <Link
              href={formation.href}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[#D7E5F7] bg-white shadow-[0_1px_3px_rgba(8,25,67,0.06)] transition-[box-shadow,border-color] duration-200 motion-safe:hover:border-[#377CF3]/30 motion-safe:hover:shadow-[0_8px_24px_-8px_rgba(55,124,243,0.2)] sm:flex-row sm:items-stretch"
            >
              <div className="relative aspect-[364/169] w-full shrink-0 bg-[#EAF3FF] sm:aspect-auto sm:w-[38%] sm:min-h-[9.5rem]">
                <Image
                  src={formation.photo.src}
                  alt={formation.photo.alt}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 100vw, 38vw"
                />
              </div>
              <div className="flex flex-1 items-center justify-between gap-4 p-5 sm:p-6">
                <div className="min-w-0">
                  <span className="inline-flex rounded-full bg-[#EAF3FF] px-2.5 py-0.5 text-[0.6875rem] font-bold uppercase tracking-wide text-[#2563EB]">
                    {formation.badge}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-bold text-[#081943] group-hover:text-[#377CF3]">
                    {formation.titre}
                  </h3>
                </div>
                <span
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D7E5F7] text-[#377CF3] transition-colors group-hover:border-[#377CF3] group-hover:bg-[#377CF3] group-hover:text-white"
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
          className={`${FC_CTA_SECONDARY} inline-flex items-center gap-2`}
        >
          Découvrir les formations
          <ArrowRight className="h-5 w-5" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
