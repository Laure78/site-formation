import type { CatalogueLevel } from '@/lib/formations-catalogue-display';
import {
  formatTarifHt,
  MENTIONS_TVA_EXONERATION_COURTE,
  TARIF_SESSION_AVANCE_HT,
  TARIF_SESSION_DEBUTANT_HT,
} from '@/lib/tarifs-sessions';
import { PRIX_NIVEAU_1_HT, PRIX_NIVEAU_2_HT } from '@/data/formations';

export type CataloguePriceVariant = 'overlay' | 'pill' | 'banner' | 'hero' | 'strip';

type Props = {
  level: CatalogueLevel;
  /** Prix HT session — source `formation.prixHT` / `entry.prixHT` */
  prixHT?: number;
  variant?: CataloguePriceVariant;
  className?: string;
};

function levelColors(level: CatalogueLevel) {
  return level === 'DÉBUTANT'
    ? {
        surface: 'bg-[#D1FAE5]/95 text-[#047857] border-[#6EE7B7]/60',
        muted: 'text-[#065F46]/80',
        banner: 'bg-[#ECFDF5] border-[#6EE7B7]/50 text-[#047857]',
        hero: 'border-[#6EE7B7]/50 bg-gradient-to-br from-[#ECFDF5] to-white',
      }
    : {
        surface: 'bg-[#FED7AA]/95 text-[#C2410C] border-[#FDBA74]/60',
        muted: 'text-[#9A3412]/80',
        banner: 'bg-[#FFF7ED] border-[#FDBA74]/50 text-[#C2410C]',
        hero: 'border-[#FDBA74]/50 bg-gradient-to-br from-[#FFF7ED] to-white',
      };
}

function resolvePrix(level: CatalogueLevel, prixHT?: number): number {
  if (typeof prixHT === 'number') return prixHT;
  return level === 'DÉBUTANT' ? TARIF_SESSION_DEBUTANT_HT : TARIF_SESSION_AVANCE_HT;
}

export function CataloguePriceBadge({
  level,
  prixHT,
  variant = 'pill',
  className = '',
}: Props) {
  const amount = formatTarifHt(resolvePrix(level, prixHT));
  const colors = levelColors(level);

  if (variant === 'overlay') {
    return (
      <div
        className={`absolute bottom-3 left-3 z-10 flex flex-col rounded-xl border px-3 py-2 shadow-[0_8px_24px_-8px_rgba(15,23,42,0.35)] backdrop-blur-sm ${colors.surface} ${className}`}
      >
        <span className="font-display text-[1.35rem] font-bold leading-none tracking-tight">{amount} €</span>
        <span className={`mt-1 text-[10px] font-bold uppercase tracking-[0.12em] ${colors.muted}`}>
          HT / session
        </span>
      </div>
    );
  }

  if (variant === 'banner') {
    return (
      <div
        className={`flex flex-wrap items-center justify-between gap-2 rounded-xl border px-4 py-3 ${colors.banner} ${className}`}
      >
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] opacity-80">Forfait session</p>
          <p className="font-display text-2xl font-bold leading-none tracking-tight">
            {amount} € <span className="text-sm font-semibold">HT</span>
          </p>
        </div>
        <div className="text-right text-xs font-medium opacity-90">
          <p>/ session groupe</p>
        </div>
      </div>
    );
  }

  if (variant === 'hero') {
    return (
      <div
        className={`inline-flex flex-wrap items-center gap-3 rounded-2xl border-2 px-5 py-4 shadow-sm ${colors.hero} ${className}`}
      >
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#64748B]">Tarif catalogue</p>
          <p className="font-display text-3xl font-bold leading-none tracking-tight text-[#0F172A] md:text-[2.15rem]">
            {amount} €{' '}
            <span className="text-base font-semibold text-[#64748B]">HT / session</span>
          </p>
        </div>
      </div>
    );
  }

  if (variant === 'strip') {
    return (
      <span
        className={`inline-flex flex-wrap items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-bold shadow-sm backdrop-blur-sm ${colors.surface} ${className}`}
      >
        <span className="font-display text-base leading-none">{amount} € HT</span>
        <span className={`text-[10px] font-semibold uppercase tracking-wide ${colors.muted}`}>/ session</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex shrink-0 flex-col items-end rounded-xl border px-3 py-2 text-right shadow-sm ${colors.surface} ${className}`}
    >
      <span className="font-display text-lg font-bold leading-none">{amount} €</span>
      <span className={`mt-0.5 text-[10px] font-bold uppercase tracking-wide ${colors.muted}`}>HT / session</span>
    </span>
  );
}

/** Bandeau récapitulatif — deux forfaits catalogue (niv. 1 / niv. 2). */
export function CatalogueTarifStrip({ className = '', onAccent = false }: { className?: string; onAccent?: boolean }) {
  const wrap = onAccent
    ? 'border-white/25 bg-white/10 text-white'
    : 'border-[#377CF3]/15 bg-white';
  const label = onAccent ? 'text-white/80' : 'text-[#64748B]';
  const badge = onAccent
    ? 'bg-white/20 text-white shadow-md'
    : 'bg-[#EFF6FF] text-[#1E40AF]';

  return (
    <div
      className={`flex flex-wrap items-center gap-3 rounded-2xl border px-4 py-3 shadow-sm ${wrap} ${className}`}
    >
      <span className={`text-[10px] font-bold uppercase tracking-[0.14em] ${label}`}>Tarif catalogue 2026</span>
      <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-bold ${badge}`}>
        Niveau 1 · {formatTarifHt(PRIX_NIVEAU_1_HT)} € HT
      </span>
      <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-bold ${badge}`}>
        Niveau 2 · {formatTarifHt(PRIX_NIVEAU_2_HT)} € HT
      </span>
      <span className={`text-xs font-medium ${label}`}>
        {MENTIONS_TVA_EXONERATION_COURTE} · programmes PDF sur chaque fiche
      </span>
    </div>
  );
}
