import { FormationCityPage } from '@/components/formations/FormationCityPage';
import { LYON } from '@/lib/formation-cities';
import { createPageMetadata, getCourseSchema, SITE_CONFIG } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Formation IA BTP Lyon | Automatiser devis, appels d\'offres et administratif',
  description:
    'Formation IA pour entreprises du BTP à Lyon. Automatisez devis, réponses aux appels d\'offres, emails clients et gestion administrative grâce à l\'IA générative.',
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

export default function FormationIABTPLyonPage() {
  return <FormationCityPage config={LYON} courseSchema={courseSchema} />;
}
