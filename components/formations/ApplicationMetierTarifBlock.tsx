import {
  libelleTarifApplicationMetierBtpCourt,
  TARIF_SESSION_INTRA_MENTION,
  type ApplicationMetierBtpTarifKey,
} from '@/lib/tarifs-applications-metier-btp';
import { MentionTvaAsterisque } from '@/components/MentionTVA';

type Props = {
  tarifKey: ApplicationMetierBtpTarifKey;
  duree: string;
  className?: string;
};

/** Bloc tarif parcours applications métier — forfait intra session (ensemble du groupe). */
export function ApplicationMetierTarifBlock({ tarifKey, duree, className = '' }: Props) {
  return (
    <div
      className={`rounded-2xl border border-[var(--accent)]/25 bg-[var(--accent-soft)]/50 px-5 py-5 ${className}`}
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
        Tarif — session {duree}
      </p>
      <p className="mt-2 font-display text-2xl font-bold leading-snug text-slate-900 md:text-3xl">
        {libelleTarifApplicationMetierBtpCourt(tarifKey)}
        <MentionTvaAsterisque />
      </p>
      <p className="mt-1 text-sm font-medium text-slate-700">par session intra-entreprise</p>
      <p className="mt-3 text-sm text-slate-600">{TARIF_SESSION_INTRA_MENTION}</p>
    </div>
  );
}
