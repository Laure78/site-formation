import Image from 'next/image';
import Link from 'next/link';
import { Clock, Download, MapPin, Percent } from 'lucide-react';
import { CtaVisio } from '@/components/CtaVisio';
import { NIV11_MAQUETTE_HERO } from '@/lib/formation-niv11-maquette-assets';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { TRAINING_ANCHOR } from '@/lib/training-fiche-nav';
import { SITE_FORMATION_MODALITE_ENCART } from '@/lib/site-config';

type Props = {
  h1Id: string;
  title: string;
  subtitle: string;
  intro: string;
  formationTitle: string;
  pdfHref?: string;
};

const ICON_STROKE = 2;

/** Hero deux colonnes — fil d’Ariane, badge, H1, CTAs et visuel AMO. */
export function Niv11MaquetteHero({
  h1Id,
  title,
  subtitle,
  intro,
  formationTitle,
  pdfHref,
}: Props) {
  const photo = NIV11_MAQUETTE_HERO;

  const programmeButton = pdfHref ? (
    <a
      href={pdfHref}
      download
      className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center gap-2 px-5 py-3 sm:w-auto`}
    >
      <Download className="h-4 w-4 shrink-0" aria-hidden />
      Télécharger le programme PDF
    </a>
  ) : (
    <Link
      href={`${LINKS.contact}?objet=devis&formation=${encodeURIComponent(formationTitle)}`}
      className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center gap-2 px-5 py-3 sm:w-auto`}
    >
      <Download className="h-4 w-4 shrink-0" aria-hidden />
      Télécharger le programme PDF
    </Link>
  );

  return (
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
              IA assistance à maîtrise d&apos;ouvrage
            </li>
          </ol>
        </nav>
      </div>

      <div className="mx-auto grid max-w-[80rem] items-center gap-8 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8 lg:py-10">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#377CF3]">
            Niveau avancé · 4 h
          </p>
          <h1 id={h1Id} className="ofc-type-hero mt-3 text-balance text-[#101936]">
            {title}
          </h1>
          <p className="ofc-type-lead mt-3 text-balance text-[#101936]">{subtitle}</p>
          <p className="mt-3 text-base leading-relaxed text-slate-600">{intro}</p>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-[#101936]">
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
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CtaVisio
              src="formation-niv11-amo-hero"
              className="inline-flex min-h-11 w-full items-center justify-center px-5 py-3 sm:w-auto"
            />
            <Link
              href={`#${TRAINING_ANCHOR.sessions}`}
              className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center px-5 py-3 sm:w-auto`}
            >
              Voir les prochaines sessions
            </Link>
            {programmeButton}
          </div>
        </div>

        <div className="relative min-h-0 w-full">
          <figure className="overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100 shadow-sm">
            <div className="relative aspect-[16/10] w-full sm:aspect-[3/2]">
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
  );
}
