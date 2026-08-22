import { FormationSeoClusterLanding } from '@/components/seo-cluster/FormationSeoClusterLanding';
import { createPageMetadata } from '@/lib/seo';
import {
  FORMATION_CHATGPT_BTP_CONFIG,
  FORMATION_CHATGPT_BTP_PATH,
} from '@/lib/formation-chatgpt-btp-landing';

export const revalidate = 3600;

export const metadata = createPageMetadata({
  title: FORMATION_CHATGPT_BTP_CONFIG.seo.title,
  titleAbsolute: FORMATION_CHATGPT_BTP_CONFIG.seo.titleAbsolute,
  description: FORMATION_CHATGPT_BTP_CONFIG.seo.description,
  descriptionFinal: true,
  path: FORMATION_CHATGPT_BTP_PATH,
  openGraphTitle: FORMATION_CHATGPT_BTP_CONFIG.seo.openGraphTitle,
  openGraphDescription: FORMATION_CHATGPT_BTP_CONFIG.seo.description,
  keywords: FORMATION_CHATGPT_BTP_CONFIG.seo.keywords,
  image: FORMATION_CHATGPT_BTP_CONFIG.seo.image,
  appendAuthorSuffix: false,
});

export default function FormationChatgptBtpPage() {
  return <FormationSeoClusterLanding config={FORMATION_CHATGPT_BTP_CONFIG} />;
}
