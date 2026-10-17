import Link from 'next/link';
import { MessageSquareQuote } from 'lucide-react';
import { TrainingSection } from '@/components/formations/training/TrainingSection';
import { TRAINING_ANCHOR } from '@/lib/training-fiche-nav';
import {
  QUALIOPI_MENTION_PERIMETRE,
  QUALIOPI_STATS,
} from '@/config/qualiopi';
import { PREUVES_MENTION_SOURCE } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';

/** Avis agrégés (organisme) + engagements Qualiopi — pas de note inventée par formation. */
export function TrainingAvisQualiopiSection() {
  return (
    <TrainingSection id={TRAINING_ANCHOR.avis} title="Avis et engagements qualité" tone="muted" icon={MessageSquareQuote}>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="font-display text-lg font-semibold text-slate-900">
            Satisfaction des stagiaires (organisme)
          </h3>
          <p className="mt-2 text-2xl font-bold text-[#377CF3]">
            {QUALIOPI_STATS.NOTE_MOYENNE_VALEUR}/5
          </p>
          <p className="mt-1 text-sm text-slate-600">
            {QUALIOPI_STATS.NB_REPONDANTS} répondants · {QUALIOPI_STATS.PERIODE_REFERENCE} ·{' '}
            {PREUVES_MENTION_SOURCE}
          </p>
          <p className="mt-3 text-sm text-slate-600">
            Indicateur global OFC — non spécifique à une seule formation.
          </p>
          <p className="mt-4">
            <Link href={LINKS.avisClients} className="text-sm font-semibold text-[#377CF3] hover:underline">
              Voir les avis clients
            </Link>
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="font-display text-lg font-semibold text-slate-900">Certification Qualiopi</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">{QUALIOPI_MENTION_PERIMETRE}</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href={LINKS.qualiopi} className="font-semibold text-[#377CF3] hover:underline">
                Certification et preuves
              </Link>
            </li>
            <li>
              <Link href={LINKS.reclamations} className="font-semibold text-[#377CF3] hover:underline">
                Réclamations
              </Link>
            </li>
            <li>
              <Link href={LINKS.accessibiliteHandicap} className="font-semibold text-[#377CF3] hover:underline">
                Accessibilité et handicap
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </TrainingSection>
  );
}
