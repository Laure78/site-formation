import Link from 'next/link';
import { ArrowRight, CalendarCheck } from 'lucide-react';
import { LINKS } from '@/lib/internal-links';

export function RessourcesFinalCta() {
  return (
    <section
      id="formation-cta"
      aria-labelledby="ressources-final-cta-heading"
      className="scroll-mt-28 border-t border-slate-200 bg-gradient-to-br from-[#377CF3] to-[#2d66d6] py-14 text-white md:py-16"
    >
      <div className="mx-auto max-w-3xl px-4 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]">
          <CalendarCheck size={14} aria-hidden />
          Accompagnement
        </span>
        <h2 id="ressources-final-cta-heading" className="mt-4 font-display text-2xl font-bold md:text-3xl">
          Vous souhaitez adapter ces méthodes à votre entreprise ?
        </h2>
        <p className="mt-3 text-base leading-relaxed text-white/90 md:text-lg">
          Découvrez les formations IA BTP ou présentez votre besoin lors d&apos;un échange.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href={LINKS.formations}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-white px-6 py-3 text-[0.95rem] font-semibold text-[#377CF3] shadow-lg transition hover:bg-[#F2F2F2]"
          >
            Voir les formations
            <ArrowRight size={16} aria-hidden />
          </Link>
          <Link
            href={LINKS.prendreRdv}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border-2 border-white/80 bg-transparent px-6 py-3 text-[0.95rem] font-semibold text-white transition hover:bg-white/10"
          >
            Réserver un échange
          </Link>
        </div>
        <p className="mt-6">
          <Link
            href={LINKS.diagnostic}
            className="text-sm text-white/80 underline-offset-2 hover:text-white hover:underline"
          >
            Diagnostic IA BTP gratuit
          </Link>
        </p>
      </div>
    </section>
  );
}
