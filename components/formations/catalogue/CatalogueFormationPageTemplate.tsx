import type { ReactNode } from 'react';
import { TrainingPageTemplate } from '@/components/formations/training/TrainingPageTemplate';
import type { CatalogueFormationPageContent } from '@/lib/catalogue-formation-page-content';
import type { FAQItem } from '@/lib/faq';

type Props = {
  content: CatalogueFormationPageContent;
  /** Accordéon ou liste programme — spécifique à la formation. */
  programme?: ReactNode;
  faqItems?: readonly FAQItem[];
  faqSectionId: string;
  h1Id: string;
  afterObjectives?: ReactNode;
  afterDeliverables?: ReactNode;
  customHero?: ReactNode;
  tariffsSection?: ReactNode;
  programmeSupplement?: ReactNode;
  afterProgrammeSupplement?: ReactNode;
  beforeTariffs?: ReactNode;
};

/**
 * Facade catalogue → délègue au template de référence `TrainingPageTemplate`.
 * Conservée pour compatibilité des imports existants (NIV-02…NIV-10).
 */
export function CatalogueFormationPageTemplate(props: Props) {
  return <TrainingPageTemplate {...props} />;
}
