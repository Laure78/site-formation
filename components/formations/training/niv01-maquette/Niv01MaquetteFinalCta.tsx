import Image from 'next/image';
import Link from 'next/link';
import { Download } from 'lucide-react';
import { CtaDevis } from '@/components/CtaDevis';
import { NIV01_MAQUETTE_CTA_FINAL } from '@/lib/formation-niv01-maquette-assets';
import { OFC_SECTION_INNER } from '@/lib/ofc-section-classes';
import { OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

type Props = {
  devisHref: string;
  pdfHref?: string;
};

/** Bandeau final — photo chantier + dégradé bleu marine. */
export function Niv01MaquetteFinalCta({ devisHref, pdfHref }: Props) {
  const photo = NIV01_MAQUETTE_CTA_FINAL;

  return (
    <section className="bg-white px-4 py-8 md:py-10" aria-labelledby="niv01-cta-final-title">
      <div className={`${OFC_SECTION_INNER} formation-niv01-maquette__inner`}>
        <div className="relative overflow-hidden rounded-2xl bg-[#071B42]">
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-40"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#071B42] via-[#071B42]/92 to-[#071B42]/75"
            aria-hidden
          />
          <div className="relative z-10 flex min-h-[12rem] flex-col justify-center px-6 py-10 md:min-h-[14rem] md:px-10">
            <h2
              id="niv01-cta-final-title"
              className="max-w-xl font-display text-xl font-extrabold leading-tight text-white md:text-2xl"
            >
              Formez votre équipe à l&apos;IA appliquée au BTP
            </h2>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <CtaDevis
                href={devisHref}
                className="inline-flex min-h-11 w-full items-center justify-center border-0 bg-[#377CF3] px-6 py-3 text-white hover:bg-[#2f6bd4] sm:w-auto"
              />
              {pdfHref ? (
                <a
                  href={pdfHref}
                  download
                  className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center gap-2 border-white/35 bg-white/10 px-6 py-3 text-white hover:bg-white/15 sm:w-auto`}
                >
                  <Download className="h-4 w-4 shrink-0" aria-hidden />
                  Consulter le programme
                </a>
              ) : (
                <Link
                  href="#programme"
                  className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center border-white/35 bg-white/10 px-6 py-3 text-white hover:bg-white/15 sm:w-auto`}
                >
                  Consulter le programme
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
