import { FormationCityPage } from '@/components/formations/FormationCityPage';
import { IleDeFranceSeoSections } from '@/components/formations/IleDeFranceSeoSections';
import { ILE_DE_FRANCE } from '@/lib/formation-cities';
import { FAQ_FORMATION_VILLE } from '@/lib/faq';
import { createPageMetadata, getCourseSchema, getFAQSchema, SITE_CONFIG } from '@/lib/seo';

export const metadata = createPageMetadata({
  title:
    'Formation IA BTP Île-de-France — chantiers, devis, dossiers | Laure Olivié',
  description:
    "Formation IA BTP en Île-de-France (présentiel) : gagner du temps sur devis, emails, mémoires techniques et organisation chantier. Paris, Yvelines, 8 départements. Qualiopi, OPCO Constructys.",
  path: '/formations/ia-btp-ile-de-france',
  keywords: [
    'formation IA PME bâtiment Île-de-France',
    'formation IA BTP Île-de-France',
    'IA mémoire technique appel d\'offres',
    'formation IA Guyancourt',
    'formation ChatGPT BTP Yvelines',
    'IA bâtiment Île-de-France',
    'formation intelligence artificielle BTP Paris',
    'financement formation IA OPCO Constructys',
  ],
});

const courseSchema = getCourseSchema({
  name: 'Formation IA BTP en Île-de-France',
  description:
    "Formation IA BTP Île-de-France : devis, chantiers, dossiers, appels d'offres. Présentiel inter ou intra. Guyancourt, Paris et 8 départements. OPCO Constructys. Qualiopi.",
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
      afterHero={<IleDeFranceSeoSections />}
    />
  );
}
