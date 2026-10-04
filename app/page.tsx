import type { Metadata } from 'next';
import { preload } from 'react-dom';
import { AccueilHeroSection } from '@/components/landing/AccueilHeroSection';
import { AccueilPreuveSocialeCompact } from '@/components/landing/accueil/AccueilPreuveSocialeCompact';
import { AccueilEntreeParBesoinSection } from '@/components/landing/accueil/AccueilEntreeParBesoinSection';
import { AccueilFormationsPrioritairesSection } from '@/components/landing/accueil/AccueilFormationsPrioritairesSection';
import { AccueilBeworkBandeau } from '@/components/landing/accueil/AccueilBeworkBandeau';
import { AccueilMethodeResultatsSection } from '@/components/landing/accueil/AccueilMethodeResultatsSection';
import { AccueilFinancementSection } from '@/components/landing/accueil/AccueilFinancementSection';
import { AccueilFormatriceSection } from '@/components/landing/accueil/AccueilFormatriceSection';
import { AccueilFaqSection } from '@/components/landing/accueil/AccueilFaqSection';
import { AccueilCtaFinalSection } from '@/components/landing/accueil/AccueilCtaFinalSection';
import { EvenementAoBtpPromoEncart } from '@/components/evenements/EvenementAoBtpPromoEncart';
import { buildMetadata } from '@/lib/seo';
import { buildHomeFAQPageJsonLd } from '@/lib/faq';
import { JsonLd } from '@/components/JsonLd';
import { PHOTOS } from '@/lib/photos';
import { buildHomeUnifiedGraphJsonLd } from '@/lib/schema-home-unified-graph';

/** Titre HTML complet — 57 car., déjà signé, sans « | Laure Olivié ». */
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

/** `title.absolute` : le helper `buildTitle` ajouterait sinon un second « | Laure Olivié ». */
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
      <AccueilPreuveSocialeCompact />
      <EvenementAoBtpPromoEncart placement="accueil" />
      <AccueilEntreeParBesoinSection />
      <AccueilFormationsPrioritairesSection />
      <AccueilBeworkBandeau />
      <AccueilMethodeResultatsSection />
      <AccueilFinancementSection />
      <AccueilFormatriceSection />
      <AccueilFaqSection />
      <AccueilCtaFinalSection />

      <JsonLd id="schema-home-unified-graph" schema={buildHomeUnifiedGraphJsonLd()} />
      <JsonLd id="faq-schema-home" schema={HOME_FAQ_PAGE_JSON_LD} />
    </div>
  );
}
