import { FormationCityPage } from '@/components/formations/FormationCityPage';
import { LILLE } from '@/lib/formation-cities';
import { FAQ_FORMATION_VILLE } from '@/lib/faq';
import { createPageMetadata, getCourseSchema, getFAQSchema, SITE_CONFIG } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Formation IA BTP Lille : Automatiser devis & appels d\'offres',
  description:
    "Formation IA BTP Lille et Hauts-de-France : devis, appels d'offres, productivité. Nord, Pas-de-Calais, Somme. Qualiopi, Constructys. Échangez avec un expert.",
  path: '/formations/ia-btp-lille',
  keywords: [
    'formation IA BTP Lille',
    'formation ChatGPT BTP Lille',
    'IA bâtiment Lille',
    'formation IA Nord',
    'formation IA Hauts-de-France',
    'automatisation BTP Lille',
    'OPCO Constructys Lille',
  ],
});

const courseSchema = getCourseSchema({
  name: 'Formation IA BTP à Lille',
  description: 'Formation IA pour entreprises du BTP à Lille et Hauts-de-France. Automatiser devis, appels d\'offres, emails. Nord, Pas-de-Calais, Somme. Qualiopi · Constructys.',
  path: '/formations/ia-btp-lille',
  providerName: SITE_CONFIG.legalName,
  areaServed: LILLE.areaServed,
});

const faqSchema = getFAQSchema(FAQ_FORMATION_VILLE);

export default function FormationIABTPLillePage() {
  return (
    <FormationCityPage
      config={LILLE}
      courseSchema={courseSchema}
      faqSchema={faqSchema}
      faqItems={FAQ_FORMATION_VILLE}
    />
  );
}
