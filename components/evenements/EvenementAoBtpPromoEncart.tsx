import Link from 'next/link';
import {
  EVENEMENT_AO_BTP,
  isEvenementAoBtpActif,
} from '@/lib/evenements/repondre-appel-offres-btp-5-etapes';
import { OFC_CTA_PRIMARY, OFC_TYPE_H3 } from '@/lib/ofc-interaction-classes';
import { OFC_SEC, OFC_SECTION_INNER } from '@/lib/ofc-section-classes';

type EvenementAoBtpPromoEncartProps = {
  /** Identifiant d’emplacement (analytics / a11y). */
  placement: 'accueil' | 'formation-ao' | 'ressources' | 'guide-ao';
  /** Variante visuelle. */
  variant?: 'default' | 'compact';
};

/**
 * Encart promo événement AO BTP — masqué automatiquement après la fin (heure de Paris).
 * Un seul encart par page appelante.
 */
export function EvenementAoBtpPromoEncart({
  placement,
  variant = 'default',
}: EvenementAoBtpPromoEncartProps) {
  if (!isEvenementAoBtpActif()) return null;

  const event = EVENEMENT_AO_BTP;
  const headingId = `promo-ao-btp-${placement}`;

  if (variant === 'compact') {
    return (
      <aside
        className="border-b border-[#377CF3]/25 bg-[#377CF3]/05 px-4 py-5"
        aria-labelledby={headingId}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#377CF3]">
              {event.promoMention}
            </p>
            <h2 id={headingId} className="mt-1 font-display text-lg font-bold text-slate-900">
              Appels d’offres BTP : une méthode en 5 étapes avec l’IA
            </h2>
            <p className="mt-1 text-sm text-slate-700">
              Le 5 novembre, de 12 h à 13 h, retrouvez Laure Olivié en ligne. Au programme : DCE,
              Go/No-Go, chiffrage, mémoire technique et contrôles IA.
            </p>
          </div>
          <Link
            href={event.path}
            className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 shrink-0 items-center justify-center px-5 py-2.5 text-sm`}
          >
            Découvrir l’événement
          </Link>
        </div>
      </aside>
    );
  }

  return (
    <section
      className={`${OFC_SEC.mutedCompact} border-y border-[#377CF3]/20`}
      aria-labelledby={headingId}
    >
      <div className={`${OFC_SECTION_INNER} flex flex-col gap-5 md:flex-row md:items-center md:justify-between`}>
        <div className="min-w-0 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#377CF3]">
            {event.promoMention}
          </p>
          <h2 id={headingId} className={`${OFC_TYPE_H3} mt-1 text-slate-900`}>
            Appels d’offres BTP : une méthode en 5 étapes avec l’IA
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-700 md:text-base">
            Le 5 novembre, de 12 h à 13 h, retrouvez Laure Olivié en ligne. Au programme : DCE,
            Go/No-Go, chiffrage, mémoire technique et contrôles IA.
          </p>
        </div>
        <Link
          href={event.path}
          className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 shrink-0 items-center justify-center px-6 py-3`}
        >
          Découvrir l’événement
        </Link>
      </div>
    </section>
  );
}
