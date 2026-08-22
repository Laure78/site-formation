import { FormationSeoClusterLanding } from '@/components/seo-cluster/FormationSeoClusterLanding';
import { createPageMetadata } from '@/lib/seo';
import {
  FORMATION_IA_ENTREPRISE_BATIMENT_PARIS_CONFIG,
  FORMATION_IA_ENTREPRISE_BATIMENT_PARIS_PATH,
} from '@/lib/formation-ia-entreprise-batiment-paris-landing';

export const revalidate = 3600;

export const metadata = createPageMetadata({
  title: FORMATION_IA_ENTREPRISE_BATIMENT_PARIS_CONFIG.seo.title,
  titleAbsolute: FORMATION_IA_ENTREPRISE_BATIMENT_PARIS_CONFIG.seo.titleAbsolute,
  description: FORMATION_IA_ENTREPRISE_BATIMENT_PARIS_CONFIG.seo.description,
  descriptionFinal: true,
  path: FORMATION_IA_ENTREPRISE_BATIMENT_PARIS_PATH,
  openGraphTitle: FORMATION_IA_ENTREPRISE_BATIMENT_PARIS_CONFIG.seo.openGraphTitle,
  openGraphDescription: FORMATION_IA_ENTREPRISE_BATIMENT_PARIS_CONFIG.seo.description,
  keywords: FORMATION_IA_ENTREPRISE_BATIMENT_PARIS_CONFIG.seo.keywords,
  image: FORMATION_IA_ENTREPRISE_BATIMENT_PARIS_CONFIG.seo.image,
  appendAuthorSuffix: false,
});

export default function FormationIaEntrepriseBatimentParisPage() {
  return <FormationSeoClusterLanding config={FORMATION_IA_ENTREPRISE_BATIMENT_PARIS_CONFIG} />;
}
