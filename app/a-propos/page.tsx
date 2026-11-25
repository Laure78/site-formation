import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { getAProposUnifiedJsonLd } from '@/lib/schema-a-propos-unified-graph';
import {
  A_PROPOS_PAGE_META_DESCRIPTION,
  A_PROPOS_PAGE_META_TITLE,
  getFaqAProposPage,
} from '@/lib/a-propos-page-config';
import { AProposPageHero } from '@/components/a-propos/page/AProposPageHero';
import { AProposReperesBandeau } from '@/components/a-propos/page/AProposReperesBandeau';
import { AProposExpertiseMetierSection } from '@/components/a-propos/page/AProposExpertiseMetierSection';
import { AProposEquipeSection } from '@/components/a-propos/page/AProposEquipeSection';
import { AProposHistoireSection } from '@/components/a-propos/page/AProposHistoireSection';
import { AProposDomainesSection } from '@/components/a-propos/page/AProposDomainesSection';
import { AProposMethodeSection } from '@/components/a-propos/page/AProposMethodeSection';
import { AProposReferencesTeaser } from '@/components/a-propos/page/AProposReferencesTeaser';
import { AProposConfianceSection } from '@/components/a-propos/page/AProposConfianceSection';
import { AProposZoneSection } from '@/components/a-propos/page/AProposZoneSection';
import { AProposPageFaqSection } from '@/components/a-propos/page/AProposPageFaqSection';
import { AProposCtaSection } from '@/components/a-propos/page/AProposCtaSection';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { LINKS } from '@/lib/internal-links';
import { SCHEMA_CONTACT } from '@/lib/schema-constants';
import Link from 'next/link';

export const revalidate = 3600;

export const metadata: Metadata = {
  ...createPageMetadata({
    title: 'Organisme de formation IA BTP certifié Qualiopi',
    titleAbsolute: A_PROPOS_PAGE_META_TITLE,
    description: A_PROPOS_PAGE_META_DESCRIPTION,
    descriptionFinal: true,
    path: LINKS.aPropos,
    keywords: [
      'organisme de formation IA construction',
      'organisme de formation IA pour le bâtiment',
      'formation intelligence artificielle travaux publics',
      'organisme de formation IA Île-de-France',
      'formation IA PME BTP',
      'équipe de formateurs IA BTP',
      'organisme de formation certifié Qualiopi',
    ],
    appendAuthorSuffix: false,
    openGraphTitle: A_PROPOS_PAGE_META_TITLE,
    openGraphDescription: A_PROPOS_PAGE_META_DESCRIPTION,
    image: {
      url: '/og/og-a-propos-laure-olivie-formatrice-ia-btp.png',
      width: 1200,
      height: 630,
      alt: 'Organisme de formation IA BTP certifié Qualiopi — Laure Olivié, équipe et formations en Île-de-France',
    },
  }),
  title: { absolute: A_PROPOS_PAGE_META_TITLE },
};

export default function AProposPage() {
  const faqItems = getFaqAProposPage();

  return (
    <>
      <JsonLd id="schema-a-propos-unified-graph" schema={getAProposUnifiedJsonLd()} />

      <AProposPageHero />
      <AProposReperesBandeau />

      <div className="mx-auto max-w-[80rem] space-y-12 px-4 py-10 sm:px-6 md:space-y-14 md:py-12 lg:px-8">
        <AProposExpertiseMetierSection />
        <AProposEquipeSection />
        <AProposHistoireSection />
        <AProposDomainesSection />
        <AProposMethodeSection />
        <AProposReferencesTeaser />
        <AProposConfianceSection />
        <AProposZoneSection />
        <AProposPageFaqSection items={faqItems} />
      </div>

      <AProposCtaSection />

      <div className="border-t border-ofc-border bg-[var(--ofc-color-canvas)] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[80rem]">
          <Link href={LINKS.home} className="font-medium text-ofc-accent hover:underline">
            ← Retour à l&apos;accueil
          </Link>
          <div className="mt-6">
            <AllerPlusLoin
              links={[
                { href: LINKS.formations, label: 'Catalogue des formations IA BTP' },
                { href: LINKS.formateurs, label: 'Notre équipe de formateurs' },
                { href: LINKS.formationIaBtp, label: 'Formation IA pour le BTP' },
                { href: LINKS.financement, label: 'Financement OPCO Constructys' },
                { href: LINKS.contact, label: 'Demander un devis' },
              ]}
            />
          </div>
          <p className="mt-6 text-xs text-ofc-ink-subtle">
            OFC Création d&apos;Entreprise — SIREN {SCHEMA_CONTACT.sirenFormatted} ·{' '}
            {SCHEMA_CONTACT.rcsLibelle} · NDA {SCHEMA_CONTACT.nda}
          </p>
        </div>
      </div>
    </>
  );
}