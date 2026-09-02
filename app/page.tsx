import { preload } from 'react-dom';
import { AccueilHeroSection } from '@/components/landing/AccueilHeroSection';
import { AccueilPreuveSocialeCompact } from '@/components/landing/accueil/AccueilPreuveSocialeCompact';
import { AccueilProblemesMetierSection } from '@/components/landing/accueil/AccueilProblemesMetierSection';
import { AccueilFormationsPrioritairesSection } from '@/components/landing/accueil/AccueilFormationsPrioritairesSection';
import { AccueilDifferentiationSection } from '@/components/landing/accueil/AccueilDifferentiationSection';
import { AccueilResultatsConcretsSection } from '@/components/landing/accueil/AccueilResultatsConcretsSection';
import { AccueilFinancementSection } from '@/components/landing/accueil/AccueilFinancementSection';
import { AccueilFormatriceSection } from '@/components/landing/accueil/AccueilFormatriceSection';
import { AccueilRessourcesSection } from '@/components/landing/accueil/AccueilRessourcesSection';
import { AccueilBeworkBandeau } from '@/components/landing/accueil/AccueilBeworkBandeau';
import { AccueilFaqSection } from '@/components/landing/accueil/AccueilFaqSection';
import { AccueilCtaFinalSection } from '@/components/landing/accueil/AccueilCtaFinalSection';
import { buildMetadata } from '@/lib/seo';
import { buildHomeFAQPageJsonLd } from '@/lib/faq';
import { JsonLd } from '@/components/JsonLd';
import { PHOTOS } from '@/lib/photos';
import { buildHomeUnifiedGraphJsonLd } from '@/lib/schema-home-unified-graph';

/** Segment sans suffixe — `buildMetadata` ajoute « | Laure Olivié ». */
const HOME_META_TITLE = "Formation IA BTP | Devis, chantier & appels d'offres";
const HOME_META_DESCRIPTION =
  'Formations IA pour les professionnels du BTP : devis, DCE, conduite de travaux, comptes rendus et appels d\'offres. Une approche directement applicable en entreprise.';

const HOME_FAQ_PAGE_JSON_LD = buildHomeFAQPageJsonLd();

preload(PHOTOS.heroAccueilFormationIABtpEchange2026.src, { as: 'image', fetchPriority: 'high' });

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: HOME_META_TITLE,
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
    'Qualiopi IA BTP',
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

export default function HomePage() {
  return (
    <div>
      <AccueilHeroSection />
      <AccueilPreuveSocialeCompact />
      <AccueilProblemesMetierSection />
      <AccueilFormationsPrioritairesSection />
      <AccueilDifferentiationSection />
      <AccueilResultatsConcretsSection />
      <AccueilFinancementSection />
      <AccueilFormatriceSection />
      <AccueilRessourcesSection />
      <AccueilBeworkBandeau />
      <AccueilFaqSection />
      <AccueilCtaFinalSection />

      <JsonLd id="schema-home-unified-graph" schema={buildHomeUnifiedGraphJsonLd()} />
      <JsonLd id="faq-schema-home" schema={HOME_FAQ_PAGE_JSON_LD} />
    </div>
  );
}
