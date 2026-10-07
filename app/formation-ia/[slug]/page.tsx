import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';
import { FORMATION_IA_ALL_SLUGS } from '@/lib/seo-formation-ia-hub-data';
import { createPageMetadata } from '@/lib/seo';
import { FormationIaMetierDynamicTemplate } from '@/components/formation-ia-metier/FormationIaMetierDynamicTemplate';
import { getFormationIaHubMetierRichConfig } from '@/lib/formation-ia-hub-metier-rich';
import { LINKS } from '@/lib/internal-links';

export const revalidate = 3600;
type Props = { params: Promise<{ slug: string }> };

/**
 * Uniquement les hubs riches indexables + slugs thin (308 vers hub).
 */
export function generateStaticParams() {
  return FORMATION_IA_ALL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const rich = getFormationIaHubMetierRichConfig(slug);
  if (rich) {
    return createPageMetadata({
      title: rich.seoTitle,
      description: rich.seoDescription,
      descriptionFinal: true,
      path: rich.path,
      keywords: rich.keywords,
      appendAuthorSuffix: false,
      openGraphType: 'website',
      image: rich.ogImage,
      robots: { index: true, follow: true },
    });
  }
  // Pages redirigées — ne pas indexer
  return { robots: { index: false, follow: true } };
}

export default async function FormationIaSlugPage({ params }: Props) {
  const { slug } = await params;
  const rich = getFormationIaHubMetierRichConfig(slug);
  if (rich) {
    return <FormationIaMetierDynamicTemplate config={rich} />;
  }

  // Anciennes pages hub thin / noindex → hub canon (réduit crawl waste + soft-404)
  permanentRedirect(LINKS.formationIaHub);
}
