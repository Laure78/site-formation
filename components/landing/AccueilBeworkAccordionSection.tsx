'use client';

import Link from 'next/link';
import { Accordion } from '@/components/readability/Accordion';
import { OFC_SEC } from '@/lib/ofc-section-classes';
import { LINKS } from '@/lib/internal-links';

/** Accordion replié — formation création avec l’IA (NIV-10), fin de page accueil. */
export function AccueilBeworkAccordionSection() {
  return (
    <section className={OFC_SEC.mutedCompact} aria-labelledby="offre-dev-web-ia-title">
      <div className="mx-auto max-w-7xl">
        <Accordion
          id="offre-dev-web-ia"
          defaultOpen={false}
          summaryLabel="Voir la formation — Développement web avec l’IA sans savoir coder"
          summaryLabelExpanded="Masquer la formation"
          preview={
            <p className="mb-4 text-sm leading-relaxed text-slate-600">
              Formation « Développement web avec l’IA — sans savoir coder » — 7 h, distincte du
              catalogue IA pour le BTP. Financement OPCO possible selon éligibilité.
            </p>
          }
        >
          <aside
            aria-labelledby="offre-dev-web-ia-title"
            className="scroll-mt-28 rounded-2xl border border-[#377CF3]/25 bg-gradient-to-br from-[#EFF6FF] via-white to-[#DBEAFE]/40 px-6 py-7 shadow-[0_4px_16px_rgba(55,124,243,0.08)] md:px-8 md:py-8"
          >
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#377CF3]">
              Une idée · Une journée · Une première version
            </p>
            <h3
              id="offre-dev-web-ia-title"
              className="mt-3 font-display text-xl font-bold tracking-tight text-[#1E3A8A] md:text-2xl"
            >
              Développement web avec l’IA — sans savoir coder
            </h3>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#1E3A8A]/90">
              Formation pratique de 7 h (300 € HT inter) pour créer une première version de site,
              d’application ou d’outil métier avec l’IA — en petit groupe, présentiel ou visio.
            </p>
            <p className="mt-2 max-w-3xl text-base font-semibold italic leading-relaxed text-[#377CF3]">
              Vous n’apprenez pas à tout savoir. Vous apprenez à savoir commencer.
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#475569]">
              Prise en charge par un OPCO possible selon l’éligibilité de l’entreprise et du dossier.
            </p>
            <Link
              href={LINKS.formationDeveloppementWebIaSansCoder}
              title="Développement web avec l’IA — sans savoir coder"
              className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#377CF3] transition-colors hover:text-[#2A6BD9] hover:underline"
            >
              Voir la formation →
            </Link>
          </aside>
        </Accordion>
      </div>
    </section>
  );
}
