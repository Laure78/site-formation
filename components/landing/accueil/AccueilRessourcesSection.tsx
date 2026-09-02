import Link from 'next/link';
import { ACCUEIL_RESSOURCES } from '@/lib/accueil-config';
import { LINKS } from '@/lib/internal-links';
import {
  OFC_CARD,
  OFC_CTA_PRIMARY,
  OFC_LINK,
  OFC_TYPE_H2,
} from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';

/** Trois ressources gratuites — liens vers pages existantes. */
export function AccueilRessourcesSection() {
  return (
    <section className={OFC_SEC.muted} aria-labelledby="accueil-ressources">
      <div className="mx-auto max-w-6xl">
        <h2 id="accueil-ressources" className={`${OFC_TYPE_H2} text-center`}>
          Ressources IA gratuites pour les professionnels du BTP
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {ACCUEIL_RESSOURCES.map((ressource) => (
            <article key={ressource.href} className={`${OFC_CARD} flex h-full flex-col p-6`}>
              <h3 className="font-display text-lg font-bold text-ofc-ink">{ressource.titre}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                {ressource.phrase}
              </p>
              <Link
                href={ressource.href}
                className={`${OFC_CTA_PRIMARY} mt-5 inline-flex min-h-11 items-center justify-center px-5 py-3 text-sm`}
              >
                Accéder à la ressource
              </Link>
            </article>
          ))}
        </div>
        <p className="mt-10 text-center">
          <Link href={LINKS.ressources} className={`${OFC_LINK} text-base font-semibold`}>
            Voir toutes les ressources →
          </Link>
        </p>
      </div>
    </section>
  );
}
