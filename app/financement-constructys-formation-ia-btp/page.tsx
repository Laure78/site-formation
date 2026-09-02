import { createPageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { getFinancementConstructysUnifiedJsonLd } from '@/lib/schema-financement-constructys-page';
import {
  FINANCEMENT_PAGE_META_DESCRIPTION,
  FINANCEMENT_PAGE_META_TITLE,
} from '@/lib/financement-constructys-page-config';
import {
  FinancementConstructysHero,
  FinancementConstructysCta,
} from '@/components/financement/FinancementConstructysHero';
import { FinancementOct2026Alert } from '@/components/financement/constructys/FinancementOct2026Alert';
import { FinancementEssentielSection } from '@/components/financement/constructys/FinancementEssentielSection';
import { FinancementEstimationCards } from '@/components/financement/constructys/FinancementEstimationCards';
import { FinancementAvantApresTable } from '@/components/financement/constructys/FinancementAvantApresTable';
import { FinancementEtapesSection } from '@/components/financement/constructys/FinancementEtapesSection';
import { FinancementQuiFaitQuoiSection } from '@/components/financement/constructys/FinancementQuiFaitQuoiSection';
import { FinancementTarifsSection } from '@/components/financement/constructys/FinancementTarifsSection';
import { FinancementSourcesSection } from '@/components/financement/constructys/FinancementSourcesSection';
import { FormationsFaqSection } from '@/components/formations/FormationsFaqSection';
import { getFaqFinancementConstructysPage } from '@/lib/faq';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { LINKS } from '@/lib/internal-links';
import Link from 'next/link';

export const metadata = createPageMetadata({
  title: FINANCEMENT_PAGE_META_TITLE,
  titleAbsolute: FINANCEMENT_PAGE_META_TITLE,
  description: FINANCEMENT_PAGE_META_DESCRIPTION,
  descriptionFinal: true,
  path: '/financement-constructys-formation-ia-btp',
  keywords: null,
  appendAuthorSuffix: false,
  openGraphTitle: FINANCEMENT_PAGE_META_TITLE,
  openGraphDescription: FINANCEMENT_PAGE_META_DESCRIPTION,
});

export default function FinancementConstructysPage() {
  const faqItems = getFaqFinancementConstructysPage();

  return (
    <>
      <JsonLd data={getFinancementConstructysUnifiedJsonLd()} />

      <FinancementConstructysHero />

      <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="space-y-14">
          <FinancementOct2026Alert />
          <FinancementEssentielSection />
          <FinancementEstimationCards />
          <FinancementAvantApresTable />
          <FinancementEtapesSection />
          <FinancementQuiFaitQuoiSection />
          <FinancementTarifsSection />
          <FinancementConstructysCta />
          <FormationsFaqSection
            items={faqItems}
            title="Questions fréquentes"
            subtitle="Réponses courtes sur l’éligibilité, les plafonds et le circuit de paiement 2026."
          />
          <FinancementSourcesSection />
        </div>
      </div>

      <div className="border-t border-[#E2E8F0] bg-[#F8FAFC] px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <Link href="/" className="font-medium text-[#377CF3] hover:underline">
            ← Retour à l&apos;accueil
          </Link>
          <div className="mt-8">
            <AllerPlusLoin
              links={[
                { href: LINKS.formations, label: 'Catalogue des formations IA pour le BTP' },
                {
                  href: LINKS.blogFinancerFormationIaBtpConstructys,
                  label: 'Article — financer une formation IA BTP avec Constructys',
                },
                { href: LINKS.formationIleDeFrance, label: 'Formation IA BTP en Île-de-France' },
                { href: LINKS.formationAO, label: 'Formation IA appels d’offres BTP' },
                { href: LINKS.contact, label: 'Demander un devis ou un programme' },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
