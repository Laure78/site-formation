import { createPageMetadata } from '@/lib/seo';
import { ApplicationMetierBtpFormationPage } from '@/components/formations/ApplicationMetierBtpFormationPage';
import { APPLICATION_METIER_NIVEAU_1 } from '@/lib/parcours-applications-metier-btp-content';

export const metadata = createPageMetadata({
  title: APPLICATION_METIER_NIVEAU_1.metaTitle,
  description: APPLICATION_METIER_NIVEAU_1.metaDescription,
  descriptionFinal: true,
  path: APPLICATION_METIER_NIVEAU_1.path,
  keywords: [
    'créer application métier BTP',
    'développement application BTP IA',
    'prototype application bâtiment',
    'formation développement IA BTP',
    'automatiser processus BTP',
  ],
});

export default function FormationApplicationMetierBtpNiveau1Page() {
  return <ApplicationMetierBtpFormationPage config={APPLICATION_METIER_NIVEAU_1} />;
}
