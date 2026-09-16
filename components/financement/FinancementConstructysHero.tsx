import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { LINKS } from '@/lib/internal-links';
import { FINANCEMENT_PAGE_H1 } from '@/lib/financement-constructys-page-config';
import { PHOTOS } from '@/lib/photos';
import {
  OFC_CTA_PRIMARY,
  OFC_CTA_SECONDARY,
  OFC_TYPE_H2,
  OFC_TYPE_HERO,
  OFC_TYPE_LEAD,
} from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';

const ANCHOR_ETAPES = '#etapes-financement';

export function FinancementConstructysHero() {
  const photo = PHOTOS.financementConstructysHero2026;

  return (
    <section
      className={`${OFC_SEC.hero} relative overflow-hidden`}
      aria-labelledby="financement-hero-title"
    >
      <div className="relative mx-auto grid max-w-[80rem] items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,420px)] lg:gap-14">
        <div className="min-w-0 text-center lg:text-left">
          <Badge className="mx-auto lg:mx-0">Financement OPCO · Constructys · 2026</Badge>
          <h1 id="financement-hero-title" className={`${OFC_TYPE_HERO} mt-5`}>
            {FINANCEMENT_PAGE_H1}
          </h1>
          <p className={`${OFC_TYPE_LEAD} mx-auto mt-5 max-w-2xl text-ofc-ink-muted lg:mx-0`}>
            Plafonds, délai de dépôt, reste à charge et nouveau circuit de remboursement à compter du
            1<sup>er</sup> octobre 2026.
          </p>
          <p className="mt-3 text-sm font-medium text-ofc-ink-subtle">
            OFC certifié Qualiopi · Programme et devis fournis · Île-de-France
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
            <Link
              href={LINKS.contact}
              className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center gap-2 px-6 py-3`}
            >
              <FileText className="h-5 w-5 shrink-0" aria-hidden />
              Demander un devis
            </Link>
            <a
              href={ANCHOR_ETAPES}
              className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center gap-2 px-6 py-3`}
            >
              Vérifier les étapes
              <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
            </a>
          </div>
        </div>

        <figure className="mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
          <div className="ofc-card overflow-hidden bg-white/95 p-1.5">
            <Image
              src={photo.src}
              alt={photo.alt}
              title={photo.title}
              width={photo.width}
              height={photo.height}
              priority
              className="h-auto w-full rounded-[1.05rem] object-cover"
              sizes="(max-width: 1024px) 90vw, 420px"
              quality={75}
            />
          </div>
          <figcaption className="mt-3 text-center text-sm leading-relaxed text-ofc-ink-muted lg:text-left">
            {photo.description}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

/** CTA conversion bas de page — programme / devis Constructys. */
export function FinancementConstructysCta() {
  return (
    <section
      className="ofc-card overflow-hidden bg-ofc-accent p-8 text-white sm:p-10 md:p-12"
      aria-labelledby="financement-cta-title"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/75">Financement</p>
      <h2 id="financement-cta-title" className={`${OFC_TYPE_H2} mt-3 text-white`}>
        Préparez votre demande avant le délai de dépôt
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90">
        Recevez le programme détaillé et le devis nécessaires à votre demande Constructys. Le dépôt
        et la validation restent gérés par l’entreprise avec Constructys.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link
          href={LINKS.contact}
          className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center gap-2 border-0 bg-white px-6 py-3 text-ofc-accent shadow-none hover:bg-white/95`}
        >
          <FileText className="h-5 w-5" aria-hidden />
          Demander un devis
        </Link>
        <Link
          href={LINKS.prendreRdv}
          className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center gap-2 border-white/40 bg-transparent px-6 py-3 text-white hover:border-white hover:bg-white/10 hover:text-white`}
        >
          <Calendar className="h-5 w-5" aria-hidden />
          Réserver un échange
        </Link>
      </div>
    </section>
  );
}
