import Image from 'next/image';
import Link from 'next/link';
import { Clock, Download, MapPin, Percent } from 'lucide-react';
import { NIV01_MAQUETTE_HERO } from '@/lib/formation-niv01-maquette-assets';
import { OFC_SECTION_INNER } from '@/lib/ofc-section-classes';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { TRAINING_ANCHOR } from '@/lib/training-fiche-nav';
import { SITE_FORMATION_MODALITE_ENCART } from '@/lib/site-config';

type Props = {
  h1Id: string;
  title: string;
  lead: string;
  pdfHref?: string;
};

const ICON_STROKE = 2;

/** Hero deux colonnes — carte bleu clair, visuel IA à droite. */
export function Niv01MaquetteHero({ h1Id, title, lead, pdfHref }: Props) {
  const photo = NIV01_MAQUETTE_HERO;

  return (
    <section className="formation-niv01-maquette__hero border-b border-[#DAE3F0] bg-white px-4 py-6 md:py-8">
      <div className={`${OFC_SECTION_INNER} formation-niv01-maquette__inner`}>
        <div className="overflow-hidden rounded-[1.125rem] bg-[#EAF3FF] ring-1 ring-[#377CF3]/12 md:rounded-[1.25rem]">
          <div className="grid gap-0 lg:grid-cols-2 lg:items-stretch">
            <div className="flex flex-col justify-center px-5 py-8 sm:px-8 md:py-10 lg:px-10">
              <p className="ofc-eyebrow text-xs font-bold uppercase tracking-wider text-[#0755E8]">
                Niveau 1 · Débutant
              </p>
              <h1
                id={h1Id}
                className="mt-3 font-display text-[1.65rem] font-extrabold leading-tight tracking-tight text-[#101936] md:text-[2rem] lg:text-[2.125rem]"
              >
                {title}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-ofc-ink-muted md:text-[1.0625rem]">
                {lead}
              </p>
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-[#101936]">
                <li className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#377CF3]" strokeWidth={ICON_STROKE} aria-hidden />
                  4 h
                </li>
                <li className="inline-flex items-center gap-2">
                  <Percent className="h-4 w-4 text-[#377CF3]" strokeWidth={ICON_STROKE} aria-hidden />
                  70&nbsp;% pratique
                </li>
                <li className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#377CF3]" strokeWidth={ICON_STROKE} aria-hidden />
                  {SITE_FORMATION_MODALITE_ENCART}
                </li>
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href={`#${TRAINING_ANCHOR.sessions}`}
                  className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center px-6 py-3`}
                >
                  Voir les dates
                </Link>
                {pdfHref ? (
                  <a
                    href={pdfHref}
                    download
                    className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center gap-2 px-6 py-3`}
                  >
                    <Download className="h-4 w-4 shrink-0" aria-hidden />
                    Télécharger le programme
                  </a>
                ) : null}
              </div>
            </div>
            <div className="relative min-h-[14rem] bg-[#DAE3F0]/40 lg:min-h-[22rem]">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                priority
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="h-full w-full object-cover object-[center_30%] lg:object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
