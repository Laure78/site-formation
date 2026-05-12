import Link from 'next/link';
import { Check } from 'lucide-react';
import { calendlyCatalogueUrl } from '@/lib/calendly';
import { LINKS } from '@/lib/internal-links';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';

const visioHeroUrl = calendlyCatalogueUrl('hero');

/**
 * Hero catalogue formations — texte SEO inchangé (H1 + paragraphe intro).
 */
export function FormationsHero() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-[#377CF3] via-[#2563EB] to-[#1E40AF] py-10 sm:py-12 md:py-14"
      aria-labelledby="formations-catalogue-hero-h1"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045] [background-image:linear-gradient(to_right,rgba(255,255,255,0.45)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.45)_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4">
        <p className="inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/95 backdrop-blur-sm sm:px-3.5 sm:py-2 sm:text-xs">
          Catalogue 2026 · 2 formations Qualiopi
        </p>
        <h1
          id="formations-catalogue-hero-h1"
          className="mt-4 max-w-3xl text-balance text-[1.5rem] font-bold leading-snug tracking-tight text-white sm:text-[1.65rem] md:mt-5 md:text-[1.875rem] md:leading-[1.2] lg:text-[2.125rem]"
        >
          Catalogue formation IA BTP : 2 formations Qualiopi de 4 h (niveaux 1 et 2), programmes PDF
        </h1>
        <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap sm:gap-4">
          <a
            href={visioHeroUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-center text-[0.9375rem] font-semibold text-[#1E40AF] shadow-md transition hover:bg-white/95 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Réserver ma visio gratuite
          </a>
          <Link
            href={LINKS.financement}
            className="inline-flex items-center justify-center rounded-full border border-white/50 bg-transparent px-6 py-3 text-center text-[0.9375rem] font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Voir le financement Constructys
          </Link>
        </div>
        <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs text-white/75 sm:mt-7 sm:text-sm">
          <span className="inline-flex items-center gap-1">
            <Check className="h-3.5 w-3.5 shrink-0 opacity-90" strokeWidth={2.5} aria-hidden />
            Qualiopi
          </span>
          <span className="text-white/35" aria-hidden>
            ·
          </span>
          <span className="inline-flex items-center gap-1">
            <Check className="h-3.5 w-3.5 shrink-0 opacity-90" strokeWidth={2.5} aria-hidden />
            100% finançable
          </span>
          <span className="text-white/35" aria-hidden>
            ·
          </span>
          <span>{formatProfessionalsTrainedCount()} pros formés</span>
          <span className="text-white/35" aria-hidden>
            ·
          </span>
          <span>{SOCIAL_PROOF.AVERAGE_RATING}</span>
        </p>
      </div>
    </section>
  );
}
