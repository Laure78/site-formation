import { Partenaires } from '@/components/Partenaires';
import { createPageMetadata } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import {
  PARTENAIRES_PAGE_META_DESCRIPTION,
  PARTENAIRES_PAGE_META_TITLE,
} from '@/lib/partenaires-content';

export const revalidate = 3600;

export const metadata = createPageMetadata({
  title: PARTENAIRES_PAGE_META_TITLE,
  titleAbsolute: PARTENAIRES_PAGE_META_TITLE,
  description: PARTENAIRES_PAGE_META_DESCRIPTION,
  descriptionFinal: true,
  path: LINKS.partenaires,
  keywords: [
    'partenaires formation IA BTP',
    'FFB Grand Paris formation IA',
    'CSFE formation IA',
    'UMB-FFB métiers du bois',
    'Laure Olivié partenaires BTP',
    'LinkedIn Learning IA BTP',
  ],
  appendAuthorSuffix: false,
  openGraphTitle: PARTENAIRES_PAGE_META_TITLE,
  openGraphDescription: PARTENAIRES_PAGE_META_DESCRIPTION,
  openGraphType: 'article',
});

export default function PartenairesPage() {
  return (
    <div>
      <Partenaires
        id="partenaires-page"
        headingLevel="h1"
        showGeoCitation
        calendlyCampaign="partenaires-page"
        className="!bg-white"
      />
    </div>
  );
}
