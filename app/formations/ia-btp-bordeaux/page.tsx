import { FormationCityPage } from '@/components/formations/FormationCityPage';
import { BORDEAUX } from '@/lib/formation-cities';
import { FAQ_FORMATION_VILLE } from '@/lib/faq';
import { createPageMetadata, getCourseSchema, getFAQSchema, SITE_CONFIG } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Formation IA BTP Bordeaux : Devis & appels d\'offres automatisés',
  description:
    "Formation IA BTP Bordeaux et Nouvelle-Aquitaine : devis, emails, administratif. Gironde et départements voisins. Qualiopi, Constructys. Planifiez votre session.",
  path: '/formations/ia-btp-bordeaux',
  keywords: [
    'formation IA BTP Bordeaux',
    'formation ChatGPT BTP Bordeaux',
    'IA bâtiment Bordeaux',
    'formation IA Gironde',
    'formation IA Nouvelle-Aquitaine',
    'automatisation BTP Bordeaux',
    'OPCO Constructys Bordeaux',
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
