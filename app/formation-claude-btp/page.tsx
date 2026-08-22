import { FormationSeoClusterLanding } from '@/components/seo-cluster/FormationSeoClusterLanding';
import { createPageMetadata } from '@/lib/seo';
import {
  FORMATION_CLAUDE_BTP_CONFIG,
  FORMATION_CLAUDE_BTP_PATH,
} from '@/lib/formation-claude-btp-landing';

export const revalidate = 3600;

export const metadata = createPageMetadata({
  title: FORMATION_CLAUDE_BTP_CONFIG.seo.title,
  titleAbsolute: FORMATION_CLAUDE_BTP_CONFIG.seo.titleAbsolute,
  description: FORMATION_CLAUDE_BTP_CONFIG.seo.description,
  descriptionFinal: true,
  path: FORMATION_CLAUDE_BTP_PATH,
  openGraphTitle: FORMATION_CLAUDE_BTP_CONFIG.seo.openGraphTitle,
  openGraphDescription: FORMATION_CLAUDE_BTP_CONFIG.seo.description,
  keywords: FORMATION_CLAUDE_BTP_CONFIG.seo.keywords,
  image: FORMATION_CLAUDE_BTP_CONFIG.seo.image,
  appendAuthorSuffix: false,
});

export default function FormationClaudeBtpPage() {
  return <FormationSeoClusterLanding config={FORMATION_CLAUDE_BTP_CONFIG} />;
}
