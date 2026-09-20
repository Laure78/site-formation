import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  DEV_WEB_IA_BADGE_NOUVELLE,
  DEV_WEB_IA_DUREE_COURTE,
  DEV_WEB_IA_PRIX_LANCEMENT_LABEL,
  TARIF_INTER_DEV_WEB_IA_HT,
  devWebIaDevisHref,
  devWebIaInscriptionHref,
} from '@/lib/formation-developpement-web-ia-content';
import { FINANCEMENT_FORMULATION_COURTE } from '@/lib/financement-copy';
import { MENTIONS_TVA_INTRA_COURTE, formatTarifHt } from '@/lib/tarifs-sessions';
import { MentionTvaAsterisque } from '@/components/MentionTVA';
import {
  OFC_CTA_PRIMARY,
  OFC_CTA_SECONDARY,
} from '@/lib/ofc-interaction-classes';
import { cn } from '@/lib/cn';

type Props = {
  className?: string;
  /** Affiche les CTA inscription / intra (hero). */
  showCtas?: boolean;
  formationTitle: string;
};

/**
 * Carte tarif « prix de lancement » — NIV-10.
 * Sobre, bleu/blanc OFC — pas de prix barré ni d’urgence artificielle.
 */
export function DevWebIaPrixLancementCard({
  className,
  showCtas = true,
  formationTitle,
}: Props) {
  const inscriptionHref = devWebIaInscriptionHref();
  const devisHref = devWebIaDevisHref(formationTitle);

  return (
    <aside
      className={cn(
        'rounded-2xl border border-[#377CF3]/25 bg-gradient-to-br from-[#EFF6FF] via-white to-white p-5 shadow-[0_8px_28px_rgba(55,124,243,0.08)] sm:p-6',
        className,
      )}
      aria-label="Tarif prix de lancement"
    >
      <p className="inline-flex rounded-full bg-[#377CF3] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white">
        {DEV_WEB_IA_BADGE_NOUVELLE}
      </p>

      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#377CF3]">
        {DEV_WEB_IA_PRIX_LANCEMENT_LABEL}
      </p>

      <p className="mt-2 font-display text-[2.15rem] font-bold leading-none tracking-tight text-ofc-ink sm:text-[2.35rem]">
        {formatTarifHt(TARIF_INTER_DEV_WEB_IA_HT)} €
        <span className="ml-1.5 text-base font-semibold text-ofc-ink-muted">
          HT / participant
          <MentionTvaAsterisque />
        </span>
      </p>

      <p className="mt-3 text-sm font-medium text-ofc-ink">
        {DEV_WEB_IA_DUREE_COURTE} · Formation pratique
      </p>
      <p className="mt-1 text-sm text-ofc-ink-muted">Interentreprises</p>
      <p className="mt-0.5 text-sm text-ofc-ink-muted">Intra-entreprise : sur devis</p>

      <p className="mt-4 text-xs leading-relaxed text-ofc-ink-subtle">
        {MENTIONS_TVA_INTRA_COURTE}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-ofc-ink-subtle">
        {FINANCEMENT_FORMULATION_COURTE}
      </p>

      {showCtas ? (
        <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
          <Link
            href={inscriptionHref}
            className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 flex-1 items-center justify-center gap-2 px-5 py-3 sm:flex-none`}
          >
            S&apos;inscrire à la formation
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
          </Link>
          <Link
            href={devisHref}
            className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center px-5 py-3`}
          >
            Demander une session intra-entreprise
          </Link>
        </div>
      ) : null}
    </aside>
  );
}
