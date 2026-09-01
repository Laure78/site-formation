import { createPageMetadata } from '@/lib/seo';
import { ApplicationMetierBtpFormationPage } from '@/components/formations/ApplicationMetierBtpFormationPage';
import { APPLICATION_METIER_NIVEAU_2 } from '@/lib/parcours-applications-metier-btp-content';

export const metadata = createPageMetadata({
  title: APPLICATION_METIER_NIVEAU_2.metaTitle,
  description: APPLICATION_METIER_NIVEAU_2.metaDescription,
  descriptionFinal: true,
  path: APPLICATION_METIER_NIVEAU_2.path,
  keywords: [
    'application métier BTP connectée',
    'CRM BTP',
    'application devis BTP',
    'développement logiciel métier bâtiment',
    'formation IA BTP',
  ],
});

export default function FormationApplicationMetierBtpNiveau2Page() {
  return <ApplicationMetierBtpFormationPage config={APPLICATION_METIER_NIVEAU_2} />;
}
