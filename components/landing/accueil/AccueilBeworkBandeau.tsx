import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  ACCUEIL_DEV_WEB_IA_HIGHLIGHT,
  getAccueilDevWebIaEssentialsLine,
} from '@/lib/accueil-config';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY } from '@/lib/ofc-interaction-classes';

const H = ACCUEIL_DEV_WEB_IA_HIGHLIGHT;

/**
 * Accueil — mise en avant compacte NIV-10 (complément du catalogue BTP).
 */
export function AccueilBeworkBandeau() {
  const essentials = getAccueilDevWebIaEssentialsLine();

  return (
    <section
      id="creation-avec-ia"
      className="scroll-mt-24 border-y border-[#BFDBFE] bg-gradient-to-br from-[#EFF6FF] via-white to-[#DBEAFE]/60 px-4 py-10 md:py-14"
      aria-labelledby="accueil-dev-web-ia"
    >
      <div className="mx-auto max-w-3xl text-center md:max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">{H.eyebrow}</p>
        <h2
          id="accueil-dev-web-ia"
          className="mt-3 font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl"
        >
          {H.title}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-[#475569] md:text-lg">{H.lead}</p>
        <p className="mt-2 text-sm text-[#64748B]">{H.audience}</p>

        <p className="mt-5 flex flex-wrap justify-center gap-2" aria-label="Exemples de projets">
          {H.examples.map((ex) => (
            <span
              key={ex}
              className="rounded-full border border-[#BFDBFE] bg-white/90 px-3 py-1.5 text-sm font-medium text-[#334155]"
            >
              {ex}
            </span>
          ))}
        </p>

        <p className="mt-6 text-sm font-semibold text-[#0F172A]">{essentials}</p>
        <p className="mt-3 text-sm leading-relaxed text-[#64748B]">{H.promiseNote}</p>

        <div className="mt-8">
          <Link
            href={LINKS.formationDeveloppementWebIaSansCoder}
            className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 w-full items-center justify-center gap-2 px-6 py-3 sm:w-auto`}
          >
            {H.ctaLabel}
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
