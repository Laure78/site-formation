import { createPageMetadata } from '@/lib/seo';
import { ApplicationMetierBtpFormationPage } from '@/components/formations/ApplicationMetierBtpFormationPage';
import { APPLICATION_METIER_NIVEAU_3 } from '@/lib/parcours-applications-metier-btp-content';

export const metadata = createPageMetadata({
  title: APPLICATION_METIER_NIVEAU_3.metaTitle,
  description: APPLICATION_METIER_NIVEAU_3.metaDescription,
  descriptionFinal: true,
  path: APPLICATION_METIER_NIVEAU_3.path,
  keywords: [
    'application métier IA BTP',
    'intégrer IA application',
    'assistant DCE application',
    'workflow IA BTP',
    'formation développement IA BTP',
  ],
});

export default function FormationApplicationMetierBtpNiveau3Page() {
  return <ApplicationMetierBtpFormationPage config={APPLICATION_METIER_NIVEAU_3} />;
}
