'use client';

import Link from 'next/link';
import { Accordion } from '@/components/readability/Accordion';
import { OFC_SEC } from '@/lib/ofc-section-classes';
import { LINKS } from '@/lib/internal-links';
import { QUALIOPI_BEWORK_DISTINCTION } from '@/config/qualiopi';

/** BeWork en accordéon replié — service distinct OFC, fin de page accueil. */
export function AccueilBeworkAccordionSection() {
  return (
    <section className={OFC_SEC.mutedCompact} aria-labelledby="offre-bework-title">
      <div className="mx-auto max-w-7xl">
        <Accordion
          id="offre-bework"
          defaultOpen={false}
          summaryLabel="Découvrir BeWork — créer avec l’IA sans savoir coder"
          summaryLabelExpanded="Masquer BeWork"
          preview={
            <p className="mb-4 text-sm leading-relaxed text-slate-600">
              Formation progressive distincte des actions de formation de l&apos;organisme certifié
              Qualiopi — créer sites, apps et outils avec l’IA, sans programmer.
            </p>
          }
        >
          <aside
            aria-labelledby="offre-bework-title"
            className="scroll-mt-28 rounded-2xl border border-[#1D4ED8]/25 bg-gradient-to-br from-[#EFF6FF] via-white to-[#DBEAFE]/40 px-6 py-7 shadow-[0_4px_16px_rgba(29,78,216,0.08)] md:px-8 md:py-8"
          >
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#1D4ED8]">
              BeWork · Apprendre aujourd’hui, créer demain
            </p>
            <h3
              id="offre-bework-title"
              className="mt-3 font-display text-xl font-bold tracking-tight text-[#1E3A8A] md:text-2xl"
            >
              Sans savoir coder. Créez ce que vous imaginez.
            </h3>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#1E3A8A]/90">
              Formation progressive : 7 h (300 €) pour apprendre à commencer, 14 h (600 €) pour
              construire plus loin — en petit groupe, présentiel ou visio.
            </p>
            <p className="mt-2 max-w-3xl text-base font-semibold italic leading-relaxed text-[#1D4ED8]">
              Vous n’apprenez pas à tout savoir. Vous apprenez à savoir commencer.
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#475569]">
              {QUALIOPI_BEWORK_DISTINCTION}
            </p>
            <Link
              href={LINKS.bework}
              title="BeWork — créer avec l’IA sans savoir coder"
              className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#1D4ED8] transition-colors hover:text-[#1E40AF] hover:underline"
            >
              Découvrir BeWork →
            </Link>
          </aside>
        </Accordion>
      </div>
    </section>
  );
}
