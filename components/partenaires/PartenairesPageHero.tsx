import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import {
  PARTENAIRES_PAGE_CLARIFICATION,
  PARTENAIRES_PAGE_H1,
  PARTENAIRES_PAGE_SUBTITLE,
} from '@/lib/partenaires-references-config';
import { LINKS } from '@/lib/internal-links';

export function PartenairesPageHero() {
  return (
    <section
      className="bg-gradient-to-b from-[#EFF6FF] via-white to-white px-4 pb-12 pt-10 sm:px-6 lg:px-8 lg:pb-14 lg:pt-12"
      aria-labelledby="partenaires-hero-title"
    >
      <div className="mx-auto max-w-6xl text-center">
        <h1
          id="partenaires-hero-title"
          className="font-display text-3xl font-bold leading-tight tracking-tight text-[#0F172A] sm:text-4xl"
        >
          {PARTENAIRES_PAGE_H1}
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-[#475569] sm:text-lg">
          {PARTENAIRES_PAGE_SUBTITLE}
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-[#64748B]">{PARTENAIRES_PAGE_CLARIFICATION}</p>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Link
            href={LINKS.prendreRdv}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#377CF3] px-6 py-3 text-base font-semibold text-white hover:bg-[#2563EB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
          >
            <Calendar className="h-5 w-5 shrink-0" aria-hidden />
            Organiser une session
          </Link>
          <Link
            href={LINKS.formations}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-6 py-3 text-base font-semibold text-[#0F172A] hover:border-[#377CF3] hover:text-[#377CF3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
          >
            Voir les formations
            <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
