import { createPageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { getAProposUnifiedJsonLd } from '@/lib/schema-a-propos-unified-graph';
import { getAProposPersonJsonLd } from '@/lib/schema-a-propos-person-jsonld';
import { getAProposOrganizationJsonLd } from '@/lib/schema-a-propos-organization-jsonld';
import {
  A_PROPOS_PAGE_META_DESCRIPTION,
  A_PROPOS_PAGE_META_TITLE,
  getFaqAProposPage,
} from '@/lib/a-propos-page-config';
import { AProposPageHero } from '@/components/a-propos/page/AProposPageHero';
import { AProposPositionnementSection } from '@/components/a-propos/page/AProposPositionnementSection';
import { AProposApportsSection } from '@/components/a-propos/page/AProposApportsSection';
import { AProposParcoursSection } from '@/components/a-propos/page/AProposParcoursSection';
import { AProposConfianceSection } from '@/components/a-propos/page/AProposConfianceSection';
import { AProposReferencesTeaser } from '@/components/a-propos/page/AProposReferencesTeaser';
import { AProposLinkedInSection } from '@/components/a-propos/page/AProposLinkedInSection';
import { AProposMethodeSection } from '@/components/a-propos/page/AProposMethodeSection';
import { AProposCtaSection } from '@/components/a-propos/page/AProposCtaSection';
import { FormationsFaqSection } from '@/components/formations/FormationsFaqSection';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { LINKS } from '@/lib/internal-links';
import { SCHEMA_CONTACT } from '@/lib/schema-constants';
import Link from 'next/link';

export const revalidate = 3600;

export const metadata = createPageMetadata({
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
});

export default function AProposPage() {
  const faqItems = getFaqAProposPage();

  return (
    <>
      <JsonLd id="schema-a-propos-person" schema={getAProposPersonJsonLd()} />
      <JsonLd id="schema-a-propos-organization" schema={getAProposOrganizationJsonLd()} />
      <JsonLd id="schema-a-propos-unified-graph" schema={getAProposUnifiedJsonLd()} />

      <AProposPageHero />

      <div className="mx-auto max-w-6xl space-y-14 px-4 pb-16 sm:px-6 lg:px-8">
        <AProposPositionnementSection />
        <AProposApportsSection />
        <AProposParcoursSection />
        <AProposConfianceSection />
        <AProposReferencesTeaser />
        <AProposLinkedInSection />
        <AProposMethodeSection />
        <AProposCtaSection />
        <FormationsFaqSection
          items={faqItems}
          title="Questions fréquentes"
          subtitle="Public, zone d’intervention et choix de parcours."
        />
      </div>

      <div className="border-t border-[#E2E8F0] bg-[#F8FAFC] px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <Link href="/" className="font-medium text-[#377CF3] hover:underline">
            ← Retour à l&apos;accueil
          </Link>
          <div className="mt-8">
            <AllerPlusLoin
              links={[
                { href: LINKS.financement, label: 'Financement OPCO Constructys' },
                { href: LINKS.formationsLinkedInLearning, label: 'Formations LinkedIn Learning' },
                { href: LINKS.contact, label: 'Contact' },
              ]}
            />
          </div>
          <p className="mt-8 text-xs text-[#64748B]">
            OFC Création d&apos;Entreprise — SIRET {SCHEMA_CONTACT.siretFormatted} · NDA{' '}
            {SCHEMA_CONTACT.nda}
          </p>
        </div>
      </div>
    </>
  );
}
