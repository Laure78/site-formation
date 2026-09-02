import Link from 'next/link';
import { getAccueilFormationsPrioritaires } from '@/lib/accueil-config';
import { LINKS } from '@/lib/internal-links';
import {
  OFC_CARD,
  OFC_CTA_PRIMARY,
  OFC_LINK,
  OFC_TYPE_H2,
} from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';

/** Quatre formations prioritaires — données catalogue réelles. */
export function AccueilFormationsPrioritairesSection() {
  const formations = getAccueilFormationsPrioritaires();

  return (
    <section
      id="offre-formations"
      className={`${OFC_SEC.white} scroll-mt-24`}
      aria-labelledby="accueil-formations-prioritaires"
    >
      <div className="mx-auto max-w-6xl">
        <h2 id="accueil-formations-prioritaires" className={`${OFC_TYPE_H2} text-center`}>
          Choisissez votre formation IA BTP
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {formations.map((f) => (
            <article key={f.href} className={`${OFC_CARD} flex h-full flex-col p-6`}>
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wide text-ofc-accent">
                {f.niveau ? <span>{f.niveau}</span> : null}
                <span className="text-slate-400" aria-hidden>
                  ·
                </span>
                <span className="text-slate-500">{f.duree}</span>
              </div>
              <h3 className="mt-3 font-display text-lg font-bold leading-snug text-ofc-ink md:text-xl">
                {f.titre}
              </h3>
              <p className="ofc-read-width mt-3 flex-1 text-sm leading-relaxed text-slate-600 md:text-base">
                {f.benefice}
              </p>
              <Link
                href={f.href}
                className={`${OFC_CTA_PRIMARY} mt-6 inline-flex min-h-11 w-full items-center justify-center px-5 py-3 text-sm sm:w-auto`}
              >
                Découvrir la formation
              </Link>
            </article>
          ))}
        </div>
        <p className="mt-10 text-center">
          <Link href={LINKS.formations} className={`${OFC_LINK} text-base font-semibold`}>
            Voir toutes les formations →
          </Link>
        </p>
      </div>
    </section>
  );
}
