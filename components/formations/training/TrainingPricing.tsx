import Link from 'next/link';
import { MentionTVA, MentionTvaAsterisque } from '@/components/MentionTVA';
import { TrainingSection } from '@/components/formations/training/TrainingSection';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY, OFC_LINK } from '@/lib/ofc-interaction-classes';
import { MENTION_ABONNEMENTS_IA_HORS_FORFAIT } from '@/lib/tarifs-sessions';

type Props = {
  /** Libellé tarif unique (source de vérité externe). */
  priceLabel: string;
  effectifLabel: string;
  durationLabel: string;
  bullets?: readonly string[];
  devisHref: string;
  devisLabel?: string;
  showTvaAsterisk?: boolean;
  showFinancement?: boolean;
  id?: string;
  title?: string;
};

/**
 * Carte tarif premium — une seule source `priceLabel` (jamais de tarif en dur ici).
 */
export function TrainingPricing({
  priceLabel,
  effectifLabel,
  durationLabel,
  bullets = [
    'Présentiel — Île-de-France',
    'Dans les locaux de l’entreprise ou session collective selon calendrier',
    'Programme adaptable aux besoins de l’équipe',
  ],
  devisHref,
  devisLabel = 'Demander un devis',
  showTvaAsterisk = true,
  showFinancement = true,
  id = 'tarifs-modalites',
  title = 'Format et tarifs',
}: Props) {
  return (
    <TrainingSection id={id} title={title} tone="muted">
      <div className="mx-auto max-w-xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            Tarif HT / participant
          </p>
          <p className="mt-3 font-display text-3xl font-bold tracking-tight text-[#377CF3] md:text-4xl">
            {priceLabel}
            {showTvaAsterisk ? <MentionTvaAsterisque /> : null}
          </p>
          <p className="mt-2 text-base font-semibold text-slate-800">{effectifLabel}</p>
          <ul className="mt-5 space-y-2.5 border-t border-slate-100 pt-5 text-base text-slate-700">
            <li className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#377CF3]" aria-hidden />
              {durationLabel}
            </li>
            {bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#377CF3]" aria-hidden />
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Link
              href={devisHref}
              className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 w-full items-center justify-center px-6 py-3 sm:w-auto`}
            >
              {devisLabel}
            </Link>
          </div>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-slate-600">{MENTION_ABONNEMENTS_IA_HORS_FORFAIT}</p>
        <MentionTVA className="mt-2" />
        {showFinancement ? (
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Financement possible par votre OPCO selon les critères, plafonds et budgets en vigueur. Un
            reste à charge peut s’appliquer.{' '}
            <Link href={LINKS.financement} className={OFC_LINK}>
              Financement Constructys — formation IA pour le BTP
            </Link>
            .
          </p>
        ) : null}
      </div>
    </TrainingSection>
  );
}
