import { FormationCityPage } from '@/components/formations/FormationCityPage';
import { BORDEAUX } from '@/lib/formation-cities';
import { FAQ_FORMATION_VILLE } from '@/lib/faq';
import { createPageMetadata, getCourseSchema, getFAQSchema, SITE_CONFIG } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Formation IA BTP Bordeaux | Automatiser devis, appels d\'offres et administratif',
  description:
    'Formation IA BTP à Bordeaux et Nouvelle-Aquitaine. Gironde, Charente, Dordogne, Landes. Devis, appels d\'offres, emails en 4h. 100% finançable Constructys.',
  path: '/formations/ia-btp-bordeaux',
  keywords: [
    'formation IA BTP Bordeaux',
    'formation ChatGPT BTP',
    'IA bâtiment Bordeaux',
    'formation intelligence artificielle BTP',
    'automatisation appels d\'offres BTP',
    'IA pour entreprises du bâtiment',
  ],
});

const courseSchema = getCourseSchema({
  name: 'Formation IA BTP à Bordeaux',
  description: 'Formation IA pour entreprises du BTP à Bordeaux et Nouvelle-Aquitaine. Automatiser devis, appels d\'offres, emails. Gironde, Charente, Dordogne, Landes. Qualiopi · Constructys.',
  path: '/formations/ia-btp-bordeaux',
  providerName: SITE_CONFIG.legalName,
  areaServed: BORDEAUX.areaServed,
});

const faqSchema = getFAQSchema(FAQ_FORMATION_VILLE);

export default function FormationIABTPBordeauxPage() {
  return (
    <FormationCityPage
      config={BORDEAUX}
      courseSchema={courseSchema}
      faqSchema={faqSchema}
      faqItems={FAQ_FORMATION_VILLE}
    />
  );
}
