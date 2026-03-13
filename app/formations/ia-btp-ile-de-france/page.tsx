import { FormationCityPage } from '@/components/formations/FormationCityPage';
import { ILE_DE_FRANCE } from '@/lib/formation-cities';
import { createPageMetadata, getCourseSchema, SITE_CONFIG } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Formation IA BTP Île-de-France | Guyancourt, Yvelines, Paris',
  description:
    'Formation IA pour entreprises du BTP en Île-de-France. Basée à Guyancourt (Yvelines), intervention Paris et 8 départements. Devis, appels d\'offres, administratif. Qualiopi · Constructys.',
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

export default function FormationIABTPIleDeFrancePage() {
  return <FormationCityPage config={ILE_DE_FRANCE as import('@/lib/formation-cities').CityFormationConfig} courseSchema={courseSchema} />;
}
