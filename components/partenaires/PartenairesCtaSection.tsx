import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { LINKS } from '@/lib/internal-links';

export function PartenairesCtaSection() {
  return (
    <section
      className="rounded-2xl border border-[#BFDBFE] bg-gradient-to-br from-[#EFF6FF] to-white px-6 py-10 sm:px-10"
      aria-labelledby="partenaires-cta-title"
    >
      <h2
        id="partenaires-cta-title"
        className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl"
      >
        Vous représentez une fédération, un réseau ou une entreprise du BTP ?
      </h2>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#475569]">
        Échangeons sur les profils à former, les usages prioritaires et le format de la session.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link
          href={LINKS.prendreRdv}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#377CF3] px-6 py-3 text-base font-semibold text-white hover:bg-[#2563EB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
        >
          <Calendar className="h-5 w-5" aria-hidden />
          Organiser une session
        </Link>
        <Link
          href={LINKS.formations}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-6 py-3 text-base font-semibold text-[#0F172A] hover:border-[#377CF3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
        >
          Consulter le catalogue
          <ArrowRight className="h-5 w-5" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
