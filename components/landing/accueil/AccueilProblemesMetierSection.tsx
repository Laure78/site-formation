import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getAccueilCartesProblemesMetier } from '@/lib/accueil-config';
import { OFC_CARD, OFC_LINK, OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';

/** Entrée par problème métier — 4 cartes scannables. */
export function AccueilProblemesMetierSection() {
  const cartes = getAccueilCartesProblemesMetier();

  return (
    <section className={OFC_SEC.muted} aria-labelledby="accueil-problemes-metier">
      <div className="mx-auto max-w-6xl">
        <h2 id="accueil-problemes-metier" className={`${OFC_TYPE_H2} text-center`}>
          Sur quoi voulez-vous gagner du temps ?
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {cartes.map((carte) => (
            <Link
              key={carte.id}
              href={carte.href}
              className={`${OFC_CARD} group flex h-full flex-col p-6`}
            >
              <h3 className="font-display text-xl font-bold text-ofc-ink group-hover:text-ofc-accent">
                {carte.titre}
              </h3>
              <ul className="mt-4 flex-1 space-y-2 text-sm leading-relaxed text-slate-600">
                {carte.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="text-ofc-accent" aria-hidden>
                      ·
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <span className={`mt-5 inline-flex items-center gap-1 text-sm font-semibold ${OFC_LINK}`}>
                Voir la formation adaptée
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
