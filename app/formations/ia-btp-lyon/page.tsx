import { FormationCityPage } from '@/components/formations/FormationCityPage';
import { LYON } from '@/lib/formation-cities';
import { FAQ_FORMATION_VILLE } from '@/lib/faq';
import { createPageMetadata, getCourseSchema, getFAQSchema, SITE_CONFIG } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Formation IA BTP Lyon | Automatiser devis, appels d\'offres et administratif',
  description:
    'Formation IA BTP à Lyon et Auvergne-Rhône-Alpes. Rhône, Ain, Isère, Loire. Devis, appels d\'offres, emails en 4h. 100% finançable Constructys. Qualiopi.',
  path: '/formations/ia-btp-lyon',
  keywords: [
    'formation IA BTP Lyon',
    'formation ChatGPT BTP',
    'IA bâtiment Lyon',
    'formation intelligence artificielle BTP',
    'automatisation appels d\'offres BTP',
    'IA pour entreprises du bâtiment',
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
