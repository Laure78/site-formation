import { FormationCityPage } from '@/components/formations/FormationCityPage';
import { LYON } from '@/lib/formation-cities';
import { FAQ_FORMATION_VILLE } from '@/lib/faq';
import { createPageMetadata, getCourseSchema, getFAQSchema, SITE_CONFIG } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Formation IA BTP Lyon : Automatiser devis & appels d\'offres',
  description:
    'Formation IA BTP Lyon et Auvergne-Rhône-Alpes. Devis, appels d\'offres automatisés. 4h. 100% finançable. Rhône, Ain, Isère.',
  path: '/formations/ia-btp-lyon',
  keywords: [
    'formation IA BTP Lyon',
    'formation ChatGPT BTP Lyon',
    'IA bâtiment Lyon',
    'formation IA Rhône',
    'formation IA Auvergne Rhône-Alpes',
    'automatisation BTP Lyon',
    'OPCO Constructys Lyon',
  ],
});

const courseSchema = getCourseSchema({
  name: 'Formation IA BTP à Lyon',
  description: 'Formation IA pour entreprises du BTP à Lyon et région Auvergne-Rhône-Alpes. Automatiser devis, appels d\'offres, emails. Rhône, Ain, Isère, Loire. Qualiopi · Constructys.',
  path: '/formations/ia-btp-lyon',
  providerName: SITE_CONFIG.legalName,
  areaServed: LYON.areaServed,
});

const faqSchema = getFAQSchema(FAQ_FORMATION_VILLE);

export default function FormationIABTPLyonPage() {
  return (
    <FormationCityPage
      config={LYON}
      courseSchema={courseSchema}
      faqSchema={faqSchema}
      faqItems={FAQ_FORMATION_VILLE}
    />
  );
}
