import { FormationCityPage } from '@/components/formations/FormationCityPage';
import { ILE_DE_FRANCE } from '@/lib/formation-cities';
import { FAQ_FORMATION_VILLE } from '@/lib/faq';
import { createPageMetadata, getCourseSchema, getFAQSchema, SITE_CONFIG } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Formation IA BTP Île-de-France | Guyancourt, Yvelines, Paris',
  description:
    'Formation IA BTP Île-de-France. Guyancourt (78), Paris, 8 départements. Devis, appels d\'offres, emails. 4h. 100% finançable Constructys. Qualiopi.',
  path: '/formations/ia-btp-ile-de-france',
  keywords: [
    'formation IA BTP Île-de-France',
    'formation IA Guyancourt',
    'formation ChatGPT BTP Yvelines',
    'IA bâtiment Île-de-France',
    'formation intelligence artificielle BTP Paris',
  ],
});

const courseSchema = getCourseSchema({
  name: 'Formation IA BTP en Île-de-France',
  description: 'Formation IA pour entreprises du BTP en Île-de-France. Basée à Guyancourt (Yvelines). Intervention Paris et 8 départements. Devis, appels d\'offres, emails. Qualiopi · Constructys.',
  path: '/formations/ia-btp-ile-de-france',
  providerName: SITE_CONFIG.legalName,
  areaServed: ILE_DE_FRANCE.areaServed,
});

const faqSchema = getFAQSchema(FAQ_FORMATION_VILLE);

export default function FormationIABTPIleDeFrancePage() {
  return (
    <FormationCityPage
      config={ILE_DE_FRANCE as import('@/lib/formation-cities').CityFormationConfig}
      courseSchema={courseSchema}
      faqSchema={faqSchema}
      faqItems={FAQ_FORMATION_VILLE}
    />
  );
}
