import { Award } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { OFC_SEC } from '@/lib/ofc-section-classes';

/** Coquille SSR — témoignages (données chargées en streaming / au scroll). */
export function GoogleReviewsSectionPlaceholder() {
  return (
    <section id="temoignages" className={`${OFC_SEC.muted} scroll-mt-24`}>
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)]">
            <Award size={16} strokeWidth={1.5} />
            <span>AVIS CLIENTS</span>
          </div>
          <h3 className="mt-4 font-display text-3xl font-bold text-slate-900 md:text-4xl">
            Cas concrets d&apos;entreprises du BTP formées
          </h3>
          <p className="mt-3 text-slate-600">
            Découvrez comment des entreprises du BTP comme la vôtre utilisent l&apos;IA au quotidien.
          </p>
        </Reveal>
        <div
          className="mt-10 min-h-[12rem] rounded-2xl border border-dashed border-slate-200 bg-white/50"
          aria-hidden
        />
      </div>
    </section>
  );
}
