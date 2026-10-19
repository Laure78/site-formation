import Link from 'next/link';
import Image from 'next/image';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { Section } from '@/components/ui/Section';
import {
  ACCUEIL_LOGOS_PARTENAIRES,
  getAccueilHeroProofItems,
} from '@/lib/accueil-config';
import { QUALIOPI_LEGAL } from '@/lib/qualiopi-info';
import { QUALIOPI_STATS } from '@/config/qualiopi';
import { PREUVES_MENTION_SOURCE } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';
import { PARTNER_LOGO_BAND_CELL } from '@/lib/client-logos';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

/** Preuves de confiance — Qualiopi, indicateurs sourcés, partenaires (distincts des clients). */
export function AccueilPreuvesConfianceSection() {
  const proofItems = getAccueilHeroProofItems();

  return (
    <Section tone="canvas" size="compact" aria-labelledby="accueil-preuves-title">
      <h2 id="accueil-preuves-title" className="sr-only">
        Preuves de confiance
      </h2>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
        <div className="rounded-xl border border-ofc-border bg-white p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-ofc-accent">
            Organisme certifié Qualiopi
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ofc-ink-muted">
            {QUALIOPI_LEGAL.raisonSociale} — {QUALIOPI_LEGAL.qualiopiCategoryMention}
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-ofc-ink">
            {proofItems.map((item) => (
              <li key={item.label}>
                <span className="font-display font-bold text-ofc-ink">{item.value}</span>{' '}
                <span className="text-ofc-ink-muted">{item.label}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-ofc-ink-muted">
            Satisfaction {QUALIOPI_STATS.NOTE_MOYENNE} — {QUALIOPI_STATS.NB_REPONDANTS}{' '}
            répondants · {QUALIOPI_STATS.PERIODE_REFERENCE}. {PREUVES_MENTION_SOURCE}
          </p>
          <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <Link href={QUALIOPI_LEGAL.certificatPdfHref} className={`${OFC_LINK} font-semibold`}>
              Consulter le certificat Qualiopi
            </Link>
            <Link href={LINKS.qualiopi} className={`${OFC_LINK} font-semibold`}>
              Page certification
            </Link>
            <Link href={LINKS.indicateursResultats} className={`${OFC_LINK} font-semibold`}>
              Indicateurs de résultats
            </Link>
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-ofc-ink">Partenaires et références</p>
          <p className="mt-1 text-xs text-ofc-ink-muted">Partenaires institutionnels.</p>
          <ul
            className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-4"
            aria-label="Logos partenaires"
          >
            {ACCUEIL_LOGOS_PARTENAIRES.map((logo) => (
              <li key={logo.id}>
                <ExternalLinkAnchor
                  href={logo.href}
                  title={logo.linkTitle ?? `Site officiel ${logo.name}`}
                  className="group block rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
                >
                  <div className={`${PARTNER_LOGO_BAND_CELL.className} grayscale opacity-80 transition group-hover:grayscale-0 group-hover:opacity-100`}>
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      fill
                      loading="lazy"
                      sizes={PARTNER_LOGO_BAND_CELL.sizes}
                      className="object-contain object-center"
                      quality={70}
                    />
                  </div>
                </ExternalLinkAnchor>
              </li>
            ))}
          </ul>
          <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <Link href={LINKS.partenaires} className={`${OFC_LINK} font-semibold`}>
              Nos partenaires
            </Link>
            <Link href={LINKS.etudesCasHub} className={`${OFC_LINK} font-semibold`}>
              Voir les études de cas
            </Link>
            <Link href={LINKS.avisClients} className={`${OFC_LINK} font-semibold`}>
              Lire les avis clients
            </Link>
          </p>
        </div>
      </div>
    </Section>
  );
}
