import { FormationSeoClusterLanding } from '@/components/seo-cluster/FormationSeoClusterLanding';
import { createPageMetadata } from '@/lib/seo';
import {
  FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_CONFIG,
  FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_PATH,
} from '@/lib/formation-ia-conducteur-de-travaux-landing';

export const revalidate = 3600;

export const metadata = createPageMetadata({
  title: FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_CONFIG.seo.title,
  titleAbsolute: FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_CONFIG.seo.titleAbsolute,
  description: FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_CONFIG.seo.description,
  descriptionFinal: true,
  path: FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_PATH,
  openGraphTitle: FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_CONFIG.seo.openGraphTitle,
  openGraphDescription: FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_CONFIG.seo.description,
  keywords: FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_CONFIG.seo.keywords,
  image: FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_CONFIG.seo.image,
  appendAuthorSuffix: false,
});

export default function FormationIaConducteurDeTravauxPage() {
  return <FormationSeoClusterLanding config={FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_CONFIG} />;
}
