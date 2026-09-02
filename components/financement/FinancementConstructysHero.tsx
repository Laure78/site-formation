import Link from 'next/link';
import { ArrowRight, Calendar, FileText } from 'lucide-react';
import { LINKS } from '@/lib/internal-links';
import { FINANCEMENT_PAGE_H1 } from '@/lib/financement-constructys-page-config';

const ANCHOR_ETAPES = '#etapes-financement';

export function FinancementConstructysHero() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-[#EFF6FF] via-white to-white px-4 pb-12 pt-10 sm:px-6 lg:px-8 lg:pb-16 lg:pt-14"
      aria-labelledby="financement-hero-title"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#377CF3]">
          Financement OPCO · Constructys · 2026
        </p>
        <h1
          id="financement-hero-title"
          className="font-display mt-4 text-3xl font-bold leading-tight tracking-tight text-[#0F172A] sm:text-4xl lg:text-[2.5rem]"
        >
          {FINANCEMENT_PAGE_H1}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#475569] sm:text-lg">
          Plafonds, délai de dépôt, reste à charge et nouveau circuit de remboursement à compter du
          1<sup>er</sup> octobre 2026.
        </p>
        <p className="mt-3 text-sm font-medium text-[#64748B]">
          OFC certifié Qualiopi · Programme et devis fournis · Île-de-France
        </p>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Link
            href={LINKS.contact}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#377CF3] px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#2563EB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
          >
            <FileText className="h-5 w-5 shrink-0" aria-hidden />
            Demander un devis
          </Link>
          <a
            href={ANCHOR_ETAPES}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-6 py-3 text-base font-semibold text-[#0F172A] transition-colors hover:border-[#377CF3] hover:text-[#377CF3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
          >
            Vérifier les étapes
            <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}

/** CTA conversion bas de page — réutilise les liens contact + Calendly. */
export function FinancementConstructysCta() {
  return (
    <section
      className="rounded-2xl border border-[#BFDBFE] bg-gradient-to-br from-[#EFF6FF] to-white px-6 py-10 sm:px-10"
      aria-labelledby="financement-cta-title"
    >
      <h2
        id="financement-cta-title"
        className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl"
      >
        Préparez votre demande avant le délai de dépôt
      </h2>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#475569]">
        Recevez le programme détaillé et le devis nécessaires à votre demande Constructys. Le dépôt
        et la validation restent gérés par l’entreprise avec Constructys.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link
          href={LINKS.contact}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#377CF3] px-6 py-3 text-base font-semibold text-white hover:bg-[#2563EB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
        >
          <FileText className="h-5 w-5" aria-hidden />
          Demander un devis
        </Link>
        <Link
          href={LINKS.prendreRdv}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-6 py-3 text-base font-semibold text-[#0F172A] hover:border-[#377CF3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
        >
          <Calendar className="h-5 w-5" aria-hidden />
          Réserver un échange
        </Link>
      </div>
    </section>
  );
}
