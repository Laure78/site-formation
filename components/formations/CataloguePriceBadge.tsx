import Link from 'next/link';
import type { CatalogueLevel } from '@/lib/formations-catalogue-display';
import {
  getTarifGrille,
  libelleTarifInterParParticipant,
  libelleTarifIntraParSession,
  libelleTarifsCarteCatalogue,
  parseDureeHeures,
  type TarifDureeHeures,
  TARIF_INTRA_4H_HT,
} from '@/lib/tarifs-sessions';
import { MentionTVA, MentionTvaAsterisque } from '@/components/MentionTVA';
import { LINKS } from '@/lib/internal-links';
import { FINANCEMENT_FORMULATION_PRUDENTE } from '@/lib/financement-copy';

export type CataloguePriceVariant = 'overlay' | 'pill' | 'banner' | 'hero' | 'strip';

type Props = {
  level: CatalogueLevel;
  /** Durée libellée — ex. « 4 h » (source formation.duree) */
  duree?: string;
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

function DualPriceContent({
  dureeHeures,
  compact = false,
}: {
  dureeHeures: TarifDureeHeures;
  compact?: boolean;
}) {
  const { intra, inter } = libelleTarifsCarteCatalogue(dureeHeures);
  if (compact) {
    return (
      <>
        <p className="text-[10px] font-semibold leading-tight">
          Intra : {intra.replace(' par session', ' / session')}
        </p>
        {inter ? (
          <p className="mt-0.5 text-[10px] font-medium leading-tight opacity-90">
            Inter : {inter.replace('à partir de ', 'dès ')}
          </p>
        ) : null}
      </>
    );
  }
  return (
    <>
      <p className="text-sm font-semibold leading-snug">
        Intra-entreprise : {intra}
        <MentionTvaAsterisque />
      </p>
      {inter ? (
        <p className="mt-1 text-xs font-medium leading-snug opacity-90">
          Interentreprises : {inter}
        </p>
      ) : null}
    </>
  );
}

export function CataloguePriceBadge({
  level,
  duree,
  variant = 'pill',
  className = '',
}: Props) {
  const dureeHeures = resolveDureeHeures(duree);
  const colors = levelColors(level);

  if (variant === 'overlay') {
    return (
      <div
        className={`absolute bottom-3 left-3 z-10 max-w-[85%] rounded-xl border px-2.5 py-2 shadow-[0_8px_24px_-8px_rgba(15,23,42,0.35)] backdrop-blur-sm ${colors.surface} ${className}`}
      >
        <DualPriceContent dureeHeures={dureeHeures} compact />
      </div>
    );
  }

  if (variant === 'banner') {
    return (
      <div className={`rounded-xl border px-4 py-3 ${colors.banner} ${className}`}>
        <DualPriceContent dureeHeures={dureeHeures} />
      </div>
    );
  }

  if (variant === 'hero') {
    const g = getTarifGrille(dureeHeures);
    return (
      <div
        className={`inline-flex flex-col gap-2 rounded-2xl border-2 px-5 py-4 shadow-sm ${colors.hero} ${className}`}
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#64748B]">Tarifs catalogue</p>
        <p className="font-display text-lg font-bold leading-snug text-[#0F172A] md:text-xl">
          Intra-entreprise : {libelleTarifIntraParSession(g.intraHT, g.intraFrom)}
          <MentionTvaAsterisque />
        </p>
        {g.interHT != null ? (
          <p className="text-sm font-medium text-[#475569]">
            Interentreprises : {libelleTarifInterParParticipant(g.interHT)}
          </p>
        ) : null}
      </div>
    );
  }

  if (variant === 'strip') {
    const { intra, inter } = libelleTarifsCarteCatalogue(dureeHeures);
    return (
      <span
        className={`inline-flex flex-col gap-0.5 rounded-full border px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur-sm ${colors.surface} ${className}`}
      >
        <span>Intra : {intra}</span>
        {inter ? <span className={`font-medium ${colors.muted}`}>Inter : {inter}</span> : null}
      </span>
    );
  }

  const { intra, inter } = libelleTarifsCarteCatalogue(dureeHeures);
  return (
    <span
      className={`inline-flex shrink-0 flex-col items-end rounded-xl border px-3 py-2 text-right text-xs shadow-sm ${colors.surface} ${className}`}
    >
      <span className="font-semibold leading-snug">Intra : {intra}</span>
      {inter ? (
        <span className={`mt-0.5 font-medium leading-snug ${colors.muted}`}>Inter : {inter}</span>
      ) : null}
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
  const { intra, inter } = libelleTarifsCarteCatalogue(4);

  return (
    <div className={className}>
      <div className={`flex flex-col gap-2 rounded-2xl border px-4 py-3 shadow-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 ${wrap}`}>
        <span className={`text-[10px] font-bold uppercase tracking-[0.14em] ${label}`}>
          Tarifs formations IA BTP
        </span>
        <span className={`text-sm font-semibold ${onAccent ? 'text-white' : 'text-[#0F172A]'}`}>
          Intra : {intra}
          <MentionTvaAsterisque className={onAccent ? 'text-white' : undefined} />
        </span>
        <span className={`text-sm font-medium ${label}`}>Inter : {inter}</span>
      </div>
      {showMention ? (
        <MentionTVA className={`mt-3 max-w-3xl ${onAccent ? 'text-white/90' : ''}`.trim()} />
      ) : null}
    </div>
  );
}
