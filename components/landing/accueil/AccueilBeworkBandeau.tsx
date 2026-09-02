import Link from 'next/link';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_SECONDARY, OFC_TYPE_H3 } from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';

/** BeWork — bandeau secondaire, distinct de l'offre formation Qualiopi. */
export function AccueilBeworkBandeau() {
  return (
    <section
      className={`${OFC_SEC.whiteCompact} border-y border-slate-200`}
      aria-labelledby="accueil-bework"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="min-w-0">
          <h2 id="accueil-bework" className={`${OFC_TYPE_H3} text-slate-800`}>
            Vous cherchez plutôt un outil IA sur mesure ?
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600 md:text-base">
            Applications métier, assistants IA et automatisations adaptés aux processus de votre
            entreprise.
          </p>
        </div>
        <Link
          href={LINKS.bework}
          className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 shrink-0 items-center justify-center px-6 py-3`}
        >
          Découvrir BeWork
        </Link>
      </div>
    </section>
  );
}
