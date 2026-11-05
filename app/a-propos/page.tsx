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
import { AProposParcoursSection } from '@/components/a-propos/page/AProposParcoursSection';
import { AProposExpertiseDocumentaireSection } from '@/components/a-propos/page/AProposExpertiseDocumentaireSection';
import { AProposConfianceSection } from '@/components/a-propos/page/AProposConfianceSection';
import { AProposReferencesTeaser } from '@/components/a-propos/page/AProposReferencesTeaser';
import { AProposMethodeSection } from '@/components/a-propos/page/AProposMethodeSection';
import { AProposCtaSection } from '@/components/a-propos/page/AProposCtaSection';
import { AProposPageFaqSection } from '@/components/a-propos/page/AProposPageFaqSection';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { LINKS } from '@/lib/internal-links';
import { SCHEMA_CONTACT } from '@/lib/schema-constants';
import Link from 'next/link';

export const revalidate = 3600;

/** Title A5 figé (déjà ≤ 60 car.) — sans re-suffixe « | Laure Olivié ». */
export const metadata: Metadata = {
  ...createPageMetadata({
    title: A_PROPOS_PAGE_META_TITLE,
    titleAbsolute: A_PROPOS_PAGE_META_TITLE,
    description: A_PROPOS_PAGE_META_DESCRIPTION,
    descriptionFinal: true,
    path: '/a-propos',
    keywords: null,
    appendAuthorSuffix: false,
    openGraphTitle: A_PROPOS_PAGE_META_TITLE,
    openGraphDescription: A_PROPOS_PAGE_META_DESCRIPTION,
    image: {
      url: '/og/og-a-propos-laure-olivie-formatrice-ia-btp.png',
      width: 1200,
      height: 630,
      alt: 'Laure Olivié, formatrice IA BTP — page À propos',
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

      <div className="mx-auto max-w-[80rem] space-y-14 px-4 py-14 sm:px-6 md:space-y-16 md:py-16 lg:px-8">
        <AProposExpertiseMetierSection />
        <AProposParcoursSection />
      </div>

      <AProposExpertiseDocumentaireSection />

      <div className="mx-auto max-w-[80rem] space-y-14 px-4 py-14 sm:px-6 md:space-y-16 md:py-16 lg:px-8">
        <AProposConfianceSection />
        <AProposReferencesTeaser />
        <AProposMethodeSection />
      </div>

      <AProposCtaSection />

      <div className="mx-auto max-w-[80rem] px-4 pb-16 pt-14 sm:px-6 lg:px-8">
        <AProposPageFaqSection items={faqItems} />
      </div>

      <div className="border-t border-ofc-border bg-[var(--ofc-color-canvas)] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[80rem]">
          <Link href="/" className="font-medium text-ofc-accent hover:underline">
            ← Retour à l&apos;accueil
          </Link>
          <div className="mt-8">
            <AllerPlusLoin
              links={[
                { href: LINKS.formations, label: 'Découvrir les formations IA pour le BTP' },
                { href: LINKS.formationIaConducteurDeTravaux, label: 'Formation IA et conduite de travaux' },
                { href: LINKS.formateurIaBtp, label: 'Formateur IA bâtiment en Île-de-France' },
                { href: LINKS.financement, label: 'Financement OPCO Constructys' },
                { href: LINKS.contact, label: 'Contact' },
              ]}
            />
          </div>
          <p className="mt-8 text-xs text-ofc-ink-subtle">
            OFC Création d&apos;Entreprise — SIREN {SCHEMA_CONTACT.sirenFormatted} ·{' '}
            {SCHEMA_CONTACT.rcsLibelle} · NDA {SCHEMA_CONTACT.nda}
          </p>
        </div>
      </div>
    </>
  );
}
