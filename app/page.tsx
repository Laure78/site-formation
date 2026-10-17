import type { Metadata } from 'next';
import { preload } from 'react-dom';
import { EvenementAoBtpPromoEncart } from '@/components/evenements/EvenementAoBtpPromoEncart';
import { AccueilHeroSection } from '@/components/landing/AccueilHeroSection';
import { AccueilPreuvesConfianceSection } from '@/components/landing/accueil/AccueilPreuvesConfianceSection';
import { AccueilNiveauxOrientationSection } from '@/components/landing/accueil/AccueilNiveauxOrientationSection';
import { AccueilFormationsDisponiblesSection } from '@/components/landing/accueil/AccueilFormationsDisponiblesSection';
import { AccueilParcoursMetiersSection } from '@/components/landing/accueil/AccueilParcoursMetiersSection';
import { AccueilCasExercicesSection } from '@/components/landing/accueil/AccueilCasExercicesSection';
import { AccueilMethodePedagogiqueSection } from '@/components/landing/accueil/AccueilMethodePedagogiqueSection';
import { AccueilLaureFormateursSection } from '@/components/landing/accueil/AccueilLaureFormateursSection';
import { AccueilIntraFinancementSection } from '@/components/landing/accueil/AccueilIntraFinancementSection';
import { AccueilFaqSection } from '@/components/landing/accueil/AccueilFaqSection';
import { AccueilCtaFinalSection } from '@/components/landing/accueil/AccueilCtaFinalSection';
import { buildMetadata } from '@/lib/seo';
import { buildHomeFAQPageJsonLd } from '@/lib/faq';
import { JsonLd } from '@/components/JsonLd';
import { PHOTOS } from '@/lib/photos';
import { buildHomeUnifiedGraphJsonLd } from '@/lib/schema-home-unified-graph';

const HOME_META_TITLE_ABSOLUTE =
  'Laure Olivié — formatrice IA pour le BTP en Île-de-France';
const HOME_META_DESCRIPTION =
  'Formation IA pour le BTP : devis, DCE, comptes rendus et mémoires techniques avec ChatGPT et Claude. Présentiel Île-de-France, Qualiopi, OPCO selon éligibilité.';

const HOME_FAQ_PAGE_JSON_LD = buildHomeFAQPageJsonLd();

preload(PHOTOS.heroAccueilFormationIABtpEchange2026.src, { as: 'image', fetchPriority: 'high' });

export const revalidate = 3600;

const homeMetadata = buildMetadata({
  title: 'Formation IA pour le BTP',
  description: HOME_META_DESCRIPTION,
  descriptionFinal: true,
  path: '/',
  keywords: [
    'formation IA pour le BTP',
    'formation IA appliquée au bâtiment',
    'formation IA bâtiment',
    'formation IA construction',
    'intelligence artificielle bâtiment',
    'ChatGPT BTP',
    'devis BTP',
    'appels d\'offres BTP',
    'compte rendu chantier IA',
    'Qualiopi formation IA pour le BTP',
  ],
  category: 'education',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  image: {
    url: PHOTOS.heroAccueilFormationIABtpEchange2026.src,
    width: PHOTOS.heroAccueilFormationIABtpEchange2026.width,
    height: PHOTOS.heroAccueilFormationIABtpEchange2026.height,
    alt: PHOTOS.heroAccueilFormationIABtpEchange2026.alt,
  },
});

export const metadata: Metadata = {
  ...homeMetadata,
  title: { absolute: HOME_META_TITLE_ABSOLUTE },
  openGraph: {
    ...homeMetadata.openGraph,
    title: HOME_META_TITLE_ABSOLUTE,
  },
  twitter: {
    ...homeMetadata.twitter,
    title: HOME_META_TITLE_ABSOLUTE,
  },
};

export default function HomePage() {
  return (
    <div>
      <AccueilHeroSection />
      <EvenementAoBtpPromoEncart placement="accueil" />
      <AccueilPreuvesConfianceSection />
      <AccueilNiveauxOrientationSection />
      <AccueilFormationsDisponiblesSection />
      <AccueilParcoursMetiersSection />
      <AccueilLaureFormateursSection />
      <AccueilCasExercicesSection />
      <AccueilMethodePedagogiqueSection />
      <AccueilIntraFinancementSection />
      <AccueilFaqSection />
      <AccueilCtaFinalSection />

      <JsonLd id="schema-home-unified-graph" schema={buildHomeUnifiedGraphJsonLd()} />
      <JsonLd id="faq-schema-home" schema={HOME_FAQ_PAGE_JSON_LD} />
    </div>
  );
}
