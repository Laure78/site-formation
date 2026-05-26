import Link from 'next/link';
import { Check } from 'lucide-react';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';
import { LINKS } from '@/lib/internal-links';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';

/**
 * Hero catalogue formations — texte SEO inchangé (H1 + paragraphe intro).
 */
export function FormationsHero() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-[#377CF3] via-[#2563EB] to-[#1E40AF] py-5 sm:py-6 md:py-7"
      aria-labelledby="formations-catalogue-hero-h1"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045] [background-image:linear-gradient(to_right,rgba(255,255,255,0.45)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.45)_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4">
        <p className="inline-flex rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/95 backdrop-blur-sm sm:px-3 sm:text-[11px]">
          Catalogue 2026 · 2 formations Qualiopi
        </p>
        <h1
          id="formations-catalogue-hero-h1"
          className="mt-3 max-w-3xl text-balance text-[1.35rem] font-bold leading-snug tracking-tight text-white sm:mt-3.5 sm:text-[1.45rem] md:text-[1.6rem] md:leading-[1.22] lg:text-[1.75rem]"
        >
          Catalogue formation IA pour le BTP : 2 formations Qualiopi de 4 h (niveaux 1 et 2), programmes PDF
        </h1>
        <div className="mt-4 flex flex-col gap-2.5 sm:mt-4 sm:flex-row sm:flex-wrap sm:gap-3">
          <CalendlyEmbed
            type="popup"
            variant="unstyled"
            ctaPosition="hero"
            campaign="formations-hero"
            className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-center text-sm font-semibold text-[#1E40AF] shadow-md transition hover:bg-white/95 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:px-6"
          />
          <Link
            href={LINKS.financement}
            className="inline-flex items-center justify-center rounded-full border border-white/50 bg-transparent px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:px-6"
          >
            Voir le financement Constructys
          </Link>
        </div>
        <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-white/75 sm:text-xs">
          <span className="inline-flex items-center gap-1">
            <Check className="h-3.5 w-3.5 shrink-0 opacity-90" strokeWidth={2.5} aria-hidden />
            Qualiopi
          </span>
          <span className="text-white/35" aria-hidden>
            ·
          </span>
          <span className="inline-flex items-center gap-1">
            <Check className="h-3.5 w-3.5 shrink-0 opacity-90" strokeWidth={2.5} aria-hidden />
            Financement possible selon éligibilité
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
