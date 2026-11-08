import Link from 'next/link';
import { Calendar, Download } from 'lucide-react';
import { CtaVisio } from '@/components/CtaVisio';
import { CtaDevis } from '@/components/CtaDevis';
import { OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { LINKS } from '@/lib/internal-links';

type Props = {
  formationTitle: string;
  pdfHref?: string;
  title?: string;
  description?: string;
};

export function Niv05MaquetteFinalCta({ formationTitle, pdfHref, title, description }: Props) {
  const programmeButton = pdfHref ? (
    <a
      href={pdfHref}
      download
      className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center gap-2 px-6 py-3 sm:w-auto`}
    >
      <Download className="h-4 w-4 shrink-0" aria-hidden />
      Recevoir le programme
    </a>
  ) : (
    <Link
      href={`${LINKS.contact}?objet=devis&formation=${encodeURIComponent(formationTitle)}`}
      className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center gap-2 px-6 py-3 sm:w-auto`}
    >
      <Download className="h-4 w-4 shrink-0" aria-hidden />
      Recevoir le programme
    </Link>
  );

  return (
    <section
      aria-labelledby="niv05-cta-final-title"
      className="mx-auto max-w-[80rem] px-4 pb-6 sm:px-6 lg:px-8"
    >
      <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] px-6 py-10 text-center md:px-10">
        <h2
          id="niv05-cta-final-title"
          className="font-display text-2xl font-bold text-balance text-[#101936]"
        >
          {title ?? 'Structurez vos missions MOE avec ChatGPT et Claude'}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 md:text-base">
          {description ??
            'CCTP, DPGF, DCE, comptes rendus, ordres de service et réserves — de la conception au suivi de chantier, sous votre contrôle.'}
        </p>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <CtaVisio
            src="formation-ia-maitrise-oeuvre-final"
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 px-6 py-3 sm:w-auto"
            leadingAdornment={<Calendar className="h-4 w-4 shrink-0" aria-hidden />}
          />
          {programmeButton}
          <CtaDevis
            href={`${LINKS.contact}?objet=devis&formation=${encodeURIComponent(formationTitle)}`}
            variant="secondary"
            className="inline-flex min-h-11 w-full items-center justify-center px-6 py-3 sm:w-auto"
          />
        </div>
      </div>
    </section>
  );
}
