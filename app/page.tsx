import type { Metadata } from 'next';
import { preload } from 'react-dom';
import { AccueilHeroSection } from '@/components/landing/AccueilHeroSection';
import { AccueilBandeauReassuranceSection } from '@/components/landing/accueil/AccueilBandeauReassuranceSection';
import { AccueilFormationsCatalogueSection } from '@/components/landing/accueil/AccueilFormationsCatalogueSection';
import { AccueilMetiersIaSection } from '@/components/landing/accueil/AccueilMetiersIaSection';
import { AccueilExemplesConcretsSection } from '@/components/landing/accueil/AccueilExemplesConcretsSection';
import { AccueilOrganismeSection } from '@/components/landing/accueil/AccueilOrganismeSection';
import { AccueilIntraBandeauSection } from '@/components/landing/accueil/AccueilIntraBandeauSection';
import { AccueilRessourcesGratuitesSection } from '@/components/landing/accueil/AccueilRessourcesGratuitesSection';
import { AccueilMethodeAccompagnementSection } from '@/components/landing/accueil/AccueilMethodeAccompagnementSection';
import { AccueilPreuvesConfianceSection } from '@/components/landing/accueil/AccueilPreuvesConfianceSection';
import { AccueilFaqSection } from '@/components/landing/accueil/AccueilFaqSection';
import { AccueilCtaFinalSection } from '@/components/landing/accueil/AccueilCtaFinalSection';
import { RevealShell } from '@/components/motion/RevealShell';
import { ACCUEIL_MOTION_REVEAL } from '@/components/landing/accueil/accueil-maquette-icons';
import { buildMetadata } from '@/lib/seo';
import { buildHomeFAQPageJsonLd } from '@/lib/faq';
import { JsonLd } from '@/components/JsonLd';
import { PHOTOS } from '@/lib/photos';
import { buildHomeUnifiedGraphJsonLd } from '@/lib/schema-home-unified-graph';

const HOME_META_TITLE_ABSOLUTE =
  'Formations IA BTP en Île-de-France | Laure Olivié';
const HOME_META_DESCRIPTION =
  'Formation IA BTP en Île-de-France : ChatGPT et Claude pour vos devis, DCE et chantiers. Présentiel, Qualiopi, OPCO selon éligibilité. Visio offerte.';

const HOME_FAQ_PAGE_JSON_LD = buildHomeFAQPageJsonLd();

preload(PHOTOS.accueilHeroEquipeBtp.src, { as: 'image', fetchPriority: 'high' });

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
    url: PHOTOS.accueilHeroEquipeBtp.src,
    width: PHOTOS.accueilHeroEquipeBtp.width,
    height: PHOTOS.accueilHeroEquipeBtp.height,
    alt: PHOTOS.accueilHeroEquipeBtp.alt,
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
    <div className="accueil-maquette">
      <AccueilHeroSection />
      <AccueilBandeauReassuranceSection />
      <AccueilFormationsCatalogueSection />
      <AccueilMetiersIaSection />
      <AccueilExemplesConcretsSection />
      <AccueilOrganismeSection />
      <AccueilIntraBandeauSection />
      <AccueilRessourcesGratuitesSection />
      <AccueilMethodeAccompagnementSection />
      <AccueilPreuvesConfianceSection />
      <AccueilFaqSection />
      <RevealShell distance={ACCUEIL_MOTION_REVEAL.distance}>
        <AccueilCtaFinalSection />
      </RevealShell>

      <JsonLd id="schema-home-unified-graph" schema={buildHomeUnifiedGraphJsonLd()} />
      <JsonLd id="faq-schema-home" schema={HOME_FAQ_PAGE_JSON_LD} />
    </div>
  );
}
