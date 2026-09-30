import Link from 'next/link';
import type { CatalogueLevel } from '@/lib/formations-catalogue-display';
import {
  libelleTarifParticipantGrilleCatalogue,
  parseDureeHeures,
  type TarifDureeHeures,
} from '@/lib/tarifs-sessions';
import { MentionTVA, MentionTvaAsterisque } from '@/components/MentionTVA';
import { LINKS } from '@/lib/internal-links';
import { FINANCEMENT_FORMULATION_PRUDENTE } from '@/lib/financement-copy';

export type CataloguePriceVariant = 'overlay' | 'pill' | 'banner' | 'hero' | 'strip';

type Props = {
  level: CatalogueLevel;
  /** Durée libellée — ex. « 4 h » (source formation.duree) */
  duree?: string;
  /** Libellé tarif custom (parcours 7 h applications métier). */
  labelOverride?: string;
  /** @deprecated Préférer duree — montant intra ignoré si duree fournie */
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

function resolveDureeHeures(duree?: string): TarifDureeHeures {
  return duree ? parseDureeHeures(duree) : 4;
}

function ParticipantPriceContent({
  dureeHeures,
  compact = false,
}: {
  dureeHeures: TarifDureeHeures;
  compact?: boolean;
}) {
  const label = libelleTarifParticipantGrilleCatalogue(dureeHeures);
  if (compact) {
    return (
      <p className="text-[10px] font-semibold leading-tight">
        {label.replace('à partir de ', 'dès ')}
      </p>
    );
  }
  return (
    <p className="text-sm font-semibold leading-snug">
      {label}
      <MentionTvaAsterisque />
    </p>
  );
}

export function CataloguePriceBadge({
  level,
  duree,
  labelOverride,
  variant = 'pill',
  className = '',
}: Props) {
  const dureeHeures = resolveDureeHeures(duree);
  const colors = levelColors(level);

  if (labelOverride) {
    if (variant === 'hero') {
      return (
        <div
          className={`inline-flex flex-col gap-2 rounded-2xl border-2 px-5 py-4 shadow-sm ${colors.hero} ${className}`}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#64748B]">Tarif session</p>
          <p className="font-display text-lg font-bold leading-snug text-[#0F172A] md:text-xl">
            {labelOverride}
            <MentionTvaAsterisque />
          </p>
        </div>
      );
    }
    if (variant === 'overlay') {
      return (
        <div
          className={`absolute bottom-3 left-3 z-10 max-w-[85%] rounded-xl border px-2.5 py-2 text-[10px] font-semibold leading-tight shadow-[0_8px_24px_-8px_rgba(15,23,42,0.35)] backdrop-blur-sm ${colors.surface} ${className}`}
        >
          {labelOverride}
        </div>
      );
    }
    if (variant === 'banner') {
      return (
        <div className={`rounded-xl border px-4 py-3 text-sm font-semibold ${colors.banner} ${className}`}>
          {labelOverride}
        </div>
      );
    }
    return (
      <span className={`inline-flex rounded-xl border px-3 py-2 text-xs font-semibold shadow-sm ${colors.surface} ${className}`}>
        {labelOverride}
      </span>
    );
  }

  if (variant === 'overlay') {
    return (
      <div
        className={`absolute bottom-3 left-3 z-10 max-w-[85%] rounded-xl border px-2.5 py-2 shadow-[0_8px_24px_-8px_rgba(15,23,42,0.35)] backdrop-blur-sm ${colors.surface} ${className}`}
      >
        <ParticipantPriceContent dureeHeures={dureeHeures} compact />
      </div>
    );
  }

  if (variant === 'banner') {
    return (
      <div className={`rounded-xl border px-4 py-3 ${colors.banner} ${className}`}>
        <ParticipantPriceContent dureeHeures={dureeHeures} />
      </div>
    );
  }

  if (variant === 'hero') {
    const label = libelleTarifParticipantGrilleCatalogue(dureeHeures);
    return (
      <div
        className={`inline-flex flex-col gap-2 rounded-2xl border-2 px-5 py-4 shadow-sm ${colors.hero} ${className}`}
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#64748B]">Tarif catalogue</p>
        <p className="font-display text-lg font-bold leading-snug text-[#0F172A] md:text-xl">
          {label}
          <MentionTvaAsterisque />
        </p>
      </div>
    );
  }

  if (variant === 'strip') {
    const label = libelleTarifParticipantGrilleCatalogue(dureeHeures);
    return (
      <span
        className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur-sm ${colors.surface} ${className}`}
      >
        {label}
      </span>
    );
  }

  const label = libelleTarifParticipantGrilleCatalogue(dureeHeures);
  return (
    <span
      className={`inline-flex shrink-0 flex-col items-end rounded-xl border px-3 py-2 text-right text-xs shadow-sm ${colors.surface} ${className}`}
    >
      <span className="font-semibold leading-snug">{label}</span>
    </span>
  );
}

type StripProps = {
  className?: string;
  onAccent?: boolean;
  showMention?: boolean;
};

/** Bandeau récapitulatif — grille intra / inter catalogue 4 h. */
export function CatalogueTarifStrip({
  className = '',
  onAccent = false,
  showMention = true,
}: StripProps) {
  const wrap = onAccent
    ? 'border-white/25 bg-white/10 text-white'
    : 'border-[#377CF3]/15 bg-white';
  const label = onAccent ? 'text-white/80' : 'text-[#64748B]';
  const participant = libelleTarifParticipantGrilleCatalogue(4);

  return (
    <div className={className}>
      <div className={`flex flex-col gap-2 rounded-2xl border px-4 py-3 shadow-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 ${wrap}`}>
        <span className={`text-[10px] font-bold uppercase tracking-[0.14em] ${label}`}>
          Tarifs formations IA BTP
        </span>
        <span className={`text-sm font-semibold ${onAccent ? 'text-white' : 'text-[#0F172A]'}`}>
          {participant}
          <MentionTvaAsterisque className={onAccent ? 'text-white' : undefined} />
        </span>
      </div>
      {showMention ? (
        <MentionTVA className={`mt-3 max-w-3xl ${onAccent ? 'text-white/90' : ''}`.trim()} />
      ) : null}
    </div>
  );
}
