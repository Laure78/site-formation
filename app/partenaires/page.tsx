import { createPageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { getPartenairesPageJsonLd } from '@/lib/schema-partenaires-page';
import {
  getPartenairesReferencesByCategory,
  PARTENAIRES_PAGE_META_DESCRIPTION,
  PARTENAIRES_PAGE_META_TITLE,
} from '@/lib/partenaires-references-config';
import { PartenairesPageHero } from '@/components/partenaires/PartenairesPageHero';
import { PartenairesReassuranceBar } from '@/components/partenaires/PartenairesReassuranceBar';
import { PartenairesReferencesSection } from '@/components/partenaires/PartenairesReferencesSection';
import { PartenairesInterventionSection } from '@/components/partenaires/PartenairesInterventionSection';
import { PartenairesCadreSection } from '@/components/partenaires/PartenairesCadreSection';
import { PartenairesCtaSection } from '@/components/partenaires/PartenairesCtaSection';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { LINKS } from '@/lib/internal-links';
import Link from 'next/link';

export const revalidate = 3600;

export const metadata = createPageMetadata({
  title: PARTENAIRES_PAGE_META_TITLE,
  titleAbsolute: PARTENAIRES_PAGE_META_TITLE,
  description: PARTENAIRES_PAGE_META_DESCRIPTION,
  descriptionFinal: true,
  path: LINKS.partenaires,
  keywords: [
    'références formation IA BTP',
    'formatrice IA fédération BTP',
    'formation IA adhérents FFB',
    'intervention IA BTP Île-de-France',
    'Laure Olivié références',
  ],
  appendAuthorSuffix: false,
  openGraphTitle: PARTENAIRES_PAGE_META_TITLE,
  openGraphDescription: PARTENAIRES_PAGE_META_DESCRIPTION,
  openGraphType: 'article',
});

export default function PartenairesPage() {
  const referencesBtp = getPartenairesReferencesByCategory('btp');
  const autresOrganismes = getPartenairesReferencesByCategory('autres');

  return (
    <>
      <JsonLd data={getPartenairesPageJsonLd()} />

      <PartenairesPageHero />

      <div className="mx-auto max-w-6xl space-y-14 px-4 pb-16 sm:px-6 lg:px-8">
        <PartenairesReassuranceBar />

        <PartenairesReferencesSection
          id="references-btp"
          titleId="references-btp-title"
          title="Fédérations et réseaux du BTP"
          references={referencesBtp}
        />

        <PartenairesReferencesSection
          id="autres-organismes"
          titleId="autres-organismes-title"
          title="Autres organismes pour lesquels j’interviens"
          references={autresOrganismes}
        />

        <PartenairesInterventionSection />
        <PartenairesCadreSection />
        <PartenairesCtaSection />
      </div>

      <div className="border-t border-[#E2E8F0] bg-[#F8FAFC] px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <Link href="/" className="font-medium text-[#377CF3] hover:underline">
            ← Retour à l&apos;accueil
          </Link>
          <div className="mt-8">
            <AllerPlusLoin
              links={[
                { href: LINKS.formations, label: 'Catalogue des formations IA pour le BTP' },
                { href: LINKS.etudesCasFfbCsfe, label: 'Étude de cas FFB & CSFE' },
                { href: LINKS.contact, label: 'Demander une session ou un devis' },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
