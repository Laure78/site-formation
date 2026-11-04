import { createPageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { getFinancementConstructysUnifiedJsonLd } from '@/lib/schema-financement-constructys-page';
import {
  FINANCEMENT_PAGE_META_DESCRIPTION,
  FINANCEMENT_PAGE_META_TITLE,
} from '@/lib/financement-constructys-page-config';
import { PHOTOS } from '@/lib/photos';
import {
  FinancementConstructysHero,
  FinancementConstructysCta,
} from '@/components/financement/FinancementConstructysHero';
import { FinancementReassuranceBand } from '@/components/financement/constructys/FinancementReassuranceBand';
import { FinancementEssentielSection } from '@/components/financement/constructys/FinancementEssentielSection';
import { FinancementBaremesSection } from '@/components/financement/constructys/FinancementBaremesSection';
import { FinancementEstimationCards } from '@/components/financement/constructys/FinancementEstimationCards';
import { FinancementEtapesSection } from '@/components/financement/constructys/FinancementEtapesSection';
import { FinancementCircuitTransitoireBanner } from '@/components/financement/constructys/FinancementCircuitTransitoireBanner';
import { FinancementQuiFaitQuoiSection } from '@/components/financement/constructys/FinancementQuiFaitQuoiSection';
import { FinancementFormationsAdapteesSection } from '@/components/financement/constructys/FinancementFormationsAdapteesSection';
import { FinancementTarifsSection } from '@/components/financement/constructys/FinancementTarifsSection';
import { FinancementOpcoEtenduSection } from '@/components/financement/FinancementOpcoEtenduSection';
import { FinancementConstructysFaqSection } from '@/components/financement/constructys/FinancementConstructysFaqSection';
import { FinancementSourcesSection } from '@/components/financement/constructys/FinancementSourcesSection';
import { getFaqFinancementConstructysPage } from '@/lib/faq';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { LINKS } from '@/lib/internal-links';
import Link from 'next/link';
import { FC_PAGE } from '@/lib/financement-constructys-ui';

const HERO = PHOTOS.financementConstructysHero2026;

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
  image: {
    url: HERO.src,
    width: HERO.width,
    height: HERO.height,
    alt: HERO.alt,
  },
});

export default function FinancementConstructysPage() {
  const faqItems = getFaqFinancementConstructysPage();

  return (
    <div className={FC_PAGE}>
      <JsonLd data={getFinancementConstructysUnifiedJsonLd()} />

      <FinancementConstructysHero />
      <FinancementReassuranceBand />

      <div className="financement-constructys-body mx-auto max-w-[80rem] px-4 pb-16 sm:px-6 lg:px-8">
        <div className="space-y-14 md:space-y-[4.5rem]">
          <FinancementEssentielSection />
          <FinancementBaremesSection />
          <FinancementEstimationCards />
          <FinancementEtapesSection />
          <FinancementCircuitTransitoireBanner />
          <FinancementQuiFaitQuoiSection />
          <FinancementFormationsAdapteesSection />
          <FinancementTarifsSection />
          <FinancementOpcoEtenduSection layout="maquette" />
          <FinancementConstructysFaqSection
            items={faqItems}
            title="Questions fréquentes"
            subtitle="Réponses courtes sur l’éligibilité, les plafonds et le circuit de paiement."
          />
          <FinancementSourcesSection />
          <FinancementConstructysCta />
        </div>
      </div>

      <div className="border-t border-ofc-border bg-[var(--ofc-color-canvas)] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[80rem]">
          <Link href="/" className="font-medium text-ofc-accent hover:underline">
            ← Retour à l&apos;accueil
          </Link>
          <div className="mt-8">
            <AllerPlusLoin
              links={[
                { href: LINKS.formations, label: 'Catalogue des formations IA pour le BTP' },
                { href: LINKS.parcoursMetiers, label: 'Parcours métiers — formation IA BTP' },
                {
                  href: LINKS.blogFinancerFormationIaBtpConstructys,
                  label: 'Article — financer une formation IA BTP avec Constructys',
                },
                { href: LINKS.formationIleDeFrance, label: 'Formation IA BTP en Île-de-France' },
                { href: LINKS.prendreRdv, label: 'Prendre RDV' },
                { href: LINKS.contact, label: 'Demander un devis' },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
