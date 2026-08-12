import { Award } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { OFC_SEC } from '@/lib/ofc-section-classes';

/**
 * Coquille SSR — aligne le kicker sur l’état sans avis (Option B : BÉNÉFICES),
 * sans titre qui promet des témoignages absents.
 */
export function GoogleReviewsSectionPlaceholder() {
  return (
    <section id="temoignages" className={`${OFC_SEC.muted} scroll-mt-24`} aria-busy="true">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)]">
            <Award size={16} strokeWidth={1.5} />
            <span>BÉNÉFICES</span>
          </div>
          <div className="mt-4 h-10 max-w-xl rounded-lg bg-slate-200/70" aria-hidden />
        </Reveal>
        <div
          className="mt-10 min-h-[12rem] rounded-2xl border border-dashed border-slate-200 bg-white/50"
          aria-hidden
        />
      </div>
    </section>
  );
}
