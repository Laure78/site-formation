import type { CatalogueLevel } from '@/lib/formations-catalogue-display';
import { formatTarifHt, tarifHtDepuisBadgeCatalogue } from '@/lib/tarifs-sessions';
import { LaunchPriceBadge } from '@/components/formations/LaunchPriceBadge';

export type CataloguePriceVariant = 'overlay' | 'pill' | 'banner' | 'hero' | 'strip';

type Props = {
  level: CatalogueLevel;
  launchPrice?: boolean;
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

export function CataloguePriceBadge({
  level,
  launchPrice = false,
  variant = 'pill',
  className = '',
}: Props) {
  const amount = formatTarifHt(tarifHtDepuisBadgeCatalogue(level));
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
        {launchPrice ? <LaunchPriceBadge className="mt-2 !bg-white/85" /> : null}
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
          {launchPrice ? <LaunchPriceBadge className="mt-1.5 !bg-white/80" /> : null}
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
        {launchPrice ? <LaunchPriceBadge className="!text-[#1D4ED8]" /> : null}
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
        {launchPrice ? <LaunchPriceBadge className="!bg-white/85" /> : null}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex shrink-0 flex-col items-end rounded-xl border px-3 py-2 text-right shadow-sm ${colors.surface} ${className}`}
    >
      <span className="font-display text-lg font-bold leading-none">{amount} €</span>
      <span className={`mt-0.5 text-[10px] font-bold uppercase tracking-wide ${colors.muted}`}>HT / session</span>
      {launchPrice ? <LaunchPriceBadge className="mt-1.5 !bg-white/85" /> : null}
    </span>
  );
}

/** Bandeau récapitulatif niveau 1 / niveau 2 — hero catalogue ou accueil. */
export function CatalogueTarifStrip({ className = '', onAccent = false }: { className?: string; onAccent?: boolean }) {
  const wrap = onAccent
    ? 'border-white/25 bg-white/10 text-white'
    : 'border-[#377CF3]/15 bg-white';
  const label = onAccent ? 'text-white/80' : 'text-[#64748B]';
  const price = onAccent ? 'text-white' : 'text-[#0F172A]';

  return (
    <div
      className={`flex flex-wrap items-center gap-3 rounded-2xl border px-4 py-3 shadow-sm ${wrap} ${className}`}
    >
      <span className={`text-[10px] font-bold uppercase tracking-[0.14em] ${label}`}>Forfaits 2026</span>
      <span className={`inline-flex items-center gap-2 rounded-full bg-[#D1FAE5] px-3 py-1.5 text-sm font-bold text-[#047857] ${onAccent ? 'shadow-md' : ''}`}>
        NIV-01 · {formatTarifHt(tarifHtDepuisBadgeCatalogue('DÉBUTANT'))} € HT
      </span>
      <span className={`inline-flex items-center gap-2 rounded-full bg-[#FED7AA] px-3 py-1.5 text-sm font-bold text-[#C2410C] ${onAccent ? 'shadow-md' : ''}`}>
        NIV-02 à 04 · {formatTarifHt(tarifHtDepuisBadgeCatalogue('AVANCÉ'))} € HT
      </span>
      <span className={`text-xs font-medium ${label}`}>/ session · programmes PDF sur chaque fiche</span>
    </div>
  );
}
