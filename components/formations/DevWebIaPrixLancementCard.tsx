import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';
import {
  DEV_WEB_IA_BADGE_NOUVELLE,
  DEV_WEB_IA_CTA_PRIMARY_LABEL,
  DEV_WEB_IA_CTA_SECONDARY_LABEL,
  DEV_WEB_IA_FINANCEMENT_MENTION,
  DEV_WEB_IA_PARCOURS_14H,
  DEV_WEB_IA_PDF_14H_HREF,
  PROGRAMME_PDF_14H,
  DEV_WEB_IA_PRIX_LANCEMENT_LABEL,
  devWebIaInscriptionHref,
  devWebIaPrimaryCtaHref,
} from '@/lib/formation-developpement-web-ia-content';
import { formatTarifHt, MENTIONS_TVA_INTRA_COURTE } from '@/lib/tarifs-sessions';
import { MentionTvaAsterisque } from '@/components/MentionTVA';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { cn } from '@/lib/cn';

type Props = {
  className?: string;
  /** Affiche les CTA inscription / projet. */
  showCtas?: boolean;
  /** @deprecated Conservé pour compatibilité des appels — non utilisé. */
  formationTitle?: string;
};

/**
 * Carte tarif — parcours catalogue 14 h — NIV-10 (HT par participant).
 */
export function DevWebIaPrixLancementCard({ className, showCtas = true }: Props) {
  const primaryHref = devWebIaPrimaryCtaHref();
  const secondaryHref = devWebIaInscriptionHref();
  const data = DEV_WEB_IA_PARCOURS_14H;

  return (
    <aside
      className={cn(
        'rounded-2xl border border-[#377CF3]/25 bg-gradient-to-br from-[#EFF6FF] via-white to-white p-5 shadow-[0_8px_28px_rgba(55,124,243,0.08)] sm:p-6',
        className,
      )}
      aria-label="Tarif — parcours 14 heures"
    >
      <p className="inline-flex rounded-full bg-[#377CF3] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white">
        {DEV_WEB_IA_BADGE_NOUVELLE}
      </p>
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#377CF3]">
        {DEV_WEB_IA_PRIX_LANCEMENT_LABEL}
      </p>

      <div className="mt-4 rounded-xl border border-slate-200/90 bg-white/90 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#377CF3]">
          {data.joursLabel} · {data.dureeLabel}
        </p>
        <p className="mt-2 font-display text-2xl font-bold leading-none text-ofc-ink">
          {formatTarifHt(data.tarifHt)} €
          <span className="ml-1 text-sm font-semibold text-ofc-ink-muted">
            HT / participant
            <MentionTvaAsterisque />
          </span>
        </p>
        <p className="mt-2 text-sm text-ofc-ink-muted">{data.effectif}</p>
        <p className="mt-2 text-sm font-medium text-ofc-ink">{data.outcome}</p>
        <a
          href={DEV_WEB_IA_PDF_14H_HREF}
          download={PROGRAMME_PDF_14H}
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#377CF3] hover:underline"
        >
          <Download className="h-4 w-4 shrink-0" aria-hidden />
          Programme PDF ({data.dureeLabel})
        </a>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-ofc-ink-subtle">{MENTIONS_TVA_INTRA_COURTE}</p>
      <p className="mt-2 text-xs leading-relaxed text-ofc-ink-subtle">{DEV_WEB_IA_FINANCEMENT_MENTION}</p>

      {showCtas ? (
        <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
          <Link
            href={primaryHref}
            className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg px-5 py-3 sm:flex-none`}
          >
            {DEV_WEB_IA_CTA_PRIMARY_LABEL}
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
          </Link>
          <Link
            href={secondaryHref}
            className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-3`}
          >
            {DEV_WEB_IA_CTA_SECONDARY_LABEL}
          </Link>
        </div>
      ) : null}
    </aside>
  );
}
