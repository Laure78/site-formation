import type { CatalogueLevel } from '@/lib/formations-catalogue-display';
import { libelleTarifParcoursCatalogue } from '@/lib/formations-catalogue-display';
import { getFormationByCode, libelleEffectifFormation } from '@/data/formations';
import { MentionTVA, MentionTvaAsterisque } from '@/components/MentionTVA';
import { FINANCEMENT_FORMULATION_PRUDENTE } from '@/lib/financement-copy';
import {
  libelleTarifParticipantCatalogue,
  TARIF_PARTICIPANT_NIV01_HT,
  TARIF_PARTICIPANT_NIV02_HT,
} from '@/lib/tarifs-catalogue-participant';

export type CataloguePriceVariant = 'overlay' | 'pill' | 'banner' | 'hero' | 'strip';

type Props = {
  level: CatalogueLevel;
  /** Durée libellée — ex. « 4 h » (source formation.duree) */
  duree?: string;
  /** Libellé tarif custom (parcours catalogue). */
  labelOverride?: string;
  /** Effectif à afficher sous le tarif (ex. « 6 à 12 participants »). */
  effectifOverride?: string;
  /** @deprecated Ignoré — tarifs issus de la formation. */
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

function defaultLabelForLevel(level: CatalogueLevel): string {
  return level === 'DÉBUTANT'
    ? libelleTarifParticipantCatalogue(TARIF_PARTICIPANT_NIV01_HT)
    : libelleTarifParticipantCatalogue(TARIF_PARTICIPANT_NIV02_HT);
}

export function CataloguePriceBadge({
  level,
  labelOverride,
  effectifOverride,
  variant = 'pill',
  className = '',
}: Props) {
  const colors = levelColors(level);
  const label = labelOverride ?? defaultLabelForLevel(level);

  if (variant === 'hero') {
    return (
      <div
        className={`inline-flex flex-col gap-2 rounded-2xl border-2 px-5 py-4 shadow-sm ${colors.hero} ${className}`}
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#64748B]">
          Tarif
        </p>
        <p className="font-display text-lg font-bold leading-snug text-[#0F172A] md:text-xl">
          {label}
          <MentionTvaAsterisque />
        </p>
        {effectifOverride ? (
          <p className="text-sm font-medium text-[#475569]">{effectifOverride}</p>
        ) : null}
      </div>
    );
  }

  if (variant === 'overlay') {
    return (
      <div
        className={`absolute bottom-3 left-3 z-10 max-w-[85%] rounded-xl border px-2.5 py-2 text-[10px] font-semibold leading-tight shadow-[0_8px_24px_-8px_rgba(15,23,42,0.35)] backdrop-blur-sm ${colors.surface} ${className}`}
      >
        <p>{label}</p>
        {effectifOverride ? (
          <p className={`mt-0.5 font-medium ${colors.muted}`}>{effectifOverride}</p>
        ) : null}
      </div>
    );
  }

  if (variant === 'banner') {
    return (
      <div className={`rounded-xl border px-4 py-3 text-sm font-semibold ${colors.banner} ${className}`}>
        <p>
          {label}
          <MentionTvaAsterisque />
        </p>
        {effectifOverride ? (
          <p className="mt-1 text-xs font-medium opacity-90">{effectifOverride}</p>
        ) : null}
      </div>
    );
  }

  if (variant === 'strip') {
    return (
      <span
        className={`inline-flex flex-col gap-0.5 rounded-full border px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur-sm ${colors.surface} ${className}`}
      >
        <span>{label}</span>
        {effectifOverride ? (
          <span className={`font-medium ${colors.muted}`}>{effectifOverride}</span>
        ) : null}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex shrink-0 flex-col items-end rounded-xl border px-3 py-2 text-right text-xs shadow-sm ${colors.surface} ${className}`}
    >
      <span className="font-semibold leading-snug">{label}</span>
      {effectifOverride ? (
        <span className={`mt-0.5 font-medium leading-snug ${colors.muted}`}>
          {effectifOverride}
        </span>
      ) : null}
    </span>
  );
}

type StripProps = {
  className?: string;
  onAccent?: boolean;
  showMention?: boolean;
};

/** Bandeau récapitulatif — tarifs HT / participant catalogue. */
export function CatalogueTarifStrip({
  className = '',
  onAccent = false,
  showMention = true,
}: StripProps) {
  const wrap = onAccent
    ? 'border-white/25 bg-white/10 text-white'
    : 'border-[#377CF3]/15 bg-white';
  const label = onAccent ? 'text-white/80' : 'text-[#64748B]';

  return (
    <div className={className}>
      <div
        className={`flex flex-col gap-2 rounded-2xl border px-4 py-3 shadow-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 ${wrap}`}
      >
        <span className={`text-[10px] font-bold uppercase tracking-[0.14em] ${label}`}>
          Tarifs formations IA BTP
        </span>
        <span className={`text-sm font-semibold ${onAccent ? 'text-white' : 'text-[#0F172A]'}`}>
          {libelleTarifParticipantCatalogue(TARIF_PARTICIPANT_NIV01_HT)} (bases)
          <MentionTvaAsterisque className={onAccent ? 'text-white' : undefined} />
        </span>
        <span className={`text-sm font-medium ${label}`}>
          {libelleTarifParticipantCatalogue(TARIF_PARTICIPANT_NIV02_HT)} (sessions métier 4 h)
        </span>
      </div>
      {showMention ? (
        <MentionTVA className={`mt-3 max-w-3xl ${onAccent ? 'text-white/90' : ''}`.trim()} />
      ) : null}
      {!onAccent ? (
        <p className="mt-2 text-xs text-[#64748B]">{FINANCEMENT_FORMULATION_PRUDENTE}</p>
      ) : null}
    </div>
  );
}

/** Helper — libellé + effectif depuis une référence catalogue. */
export function cataloguePriceFromRef(ref: string): {
  label: string;
  effectif: string;
} | null {
  const f = getFormationByCode(ref);
  if (!f) return null;
  return {
    label: libelleTarifParcoursCatalogue(f),
    effectif: libelleEffectifFormation(f),
  };
}
