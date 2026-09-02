import {
  libelleTarifApplicationMetierBtp,
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
      className={`rounded-2xl border-2 border-[#FDBA74]/50 bg-gradient-to-br from-[#FFF7ED] to-white px-5 py-4 shadow-sm ${className}`}
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#64748B]">
        Tarif — session {duree}
      </p>
      <p className="mt-2 font-display text-lg font-bold leading-snug text-[#0F172A] md:text-xl">
        {libelleTarifApplicationMetierBtp(tarifKey)}
        <MentionTvaAsterisque />
      </p>
      <p className="mt-2 text-sm text-slate-600">{TARIF_SESSION_INTRA_MENTION}</p>
    </div>
  );
}
