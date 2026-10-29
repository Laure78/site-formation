import type { Metadata } from 'next';
import { preload } from 'react-dom';
import { AccueilHeroSection } from '@/components/landing/AccueilHeroSection';
import { AccueilRecrutementCatalogue2027Section } from '@/components/landing/accueil/AccueilRecrutementCatalogue2027Section';
import { AccueilEnBrefSection } from '@/components/landing/accueil/AccueilEnBrefSection';
import { AccueilPreuvesConfianceSection } from '@/components/landing/accueil/AccueilPreuvesConfianceSection';
import { AccueilFormationsParcoursSection } from '@/components/landing/accueil/AccueilFormationsParcoursSection';
import { AccueilCasExercicesSection } from '@/components/landing/accueil/AccueilCasExercicesSection';
import { AccueilFinancementCourtSection } from '@/components/landing/accueil/AccueilFinancementCourtSection';
import { AccueilLaureFormateursSection } from '@/components/landing/accueil/AccueilLaureFormateursSection';
import { AccueilIntraFinancementSection } from '@/components/landing/accueil/AccueilIntraFinancementSection';
import { AccueilRessourcesEvenementSection } from '@/components/landing/accueil/AccueilRessourcesEvenementSection';
import { AccueilFaqSection } from '@/components/landing/accueil/AccueilFaqSection';
import { AccueilCtaFinalSection } from '@/components/landing/accueil/AccueilCtaFinalSection';
import { buildMetadata } from '@/lib/seo';
import { buildHomeFAQPageJsonLd } from '@/lib/faq';
import { JsonLd } from '@/components/JsonLd';
import { PHOTOS } from '@/lib/photos';
import { buildHomeUnifiedGraphJsonLd } from '@/lib/schema-home-unified-graph';

const HOME_META_TITLE_ABSOLUTE =
  'Formations IA BTP en Île-de-France | Laure Olivié';
const HOME_META_DESCRIPTION =
  'Laure Olivié, organisme de formation IA BTP (OFC Création d'Entreprise) en Île-de-France : devis, appels d’offres et chantier avec ChatGPT et Claude. Qualiopi. Visio découverte gratuite.';

const HOME_FAQ_PAGE_JSON_LD = buildHomeFAQPageJsonLd();

preload(PHOTOS.heroAccueilFormationIABtpEchange2026.src, { as: 'image', fetchPriority: 'high' });

export const revalidate = 3600;

const homeMetadata = buildMetadata({
  title: 'Formations IA pour le BTP',
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
    'organisme de formation IA BTP',
    'organisme de formation IA bâtiment',
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
      <AccueilRecrutementCatalogue2027Section />
      <AccueilEnBrefSection />
      <AccueilPreuvesConfianceSection />
      <AccueilFormationsParcoursSection />
      <AccueilCasExercicesSection />
      <AccueilFinancementCourtSection />
      <AccueilLaureFormateursSection />
      <AccueilIntraFinancementSection />
      <AccueilRessourcesEvenementSection />
      <AccueilFaqSection />
      <AccueilCtaFinalSection />

      <JsonLd id="schema-home-unified-graph" schema={buildHomeUnifiedGraphJsonLd()} />
      <JsonLd id="faq-schema-home" schema={HOME_FAQ_PAGE_JSON_LD} />
    </div>
  );
}
