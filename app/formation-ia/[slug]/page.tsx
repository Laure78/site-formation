import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  FORMATION_IA_ALL_SLUGS,
  getFormationIaEntry,
} from '@/lib/seo-formation-ia-hub-data';
import { buildMetierMetadata, buildVilleMetadata } from '@/lib/seo-formation-ia-hub-meta';
import {
  buildEducationalOrgSnippetJsonLd,
  buildFormationIaCourseJsonLd,
  buildFormationIaLocalBusinessJsonLd,
} from '@/lib/seo-formation-ia-schemas';
import { createPageMetadata } from '@/lib/seo';
import {
  FormationIaMetierBody,
  FormationIaVilleBody,
} from '@/components/formation-ia/FormationIaSlugContent';
import { FormationIaMetierDynamicTemplate } from '@/components/formation-ia-metier/FormationIaMetierDynamicTemplate';
import { getFormationIaHubMetierRichConfig } from '@/lib/formation-ia-hub-metier-rich';

export const revalidate = 3600;
type Props = { params: Promise<{ slug: string }> };

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
      path: rich.path,
      keywords: rich.keywords,
      appendAuthorSuffix: false,
      openGraphType: 'website',
      image: rich.ogImage,
      robots: { index: true, follow: true },
    });
  }

  const entry = getFormationIaEntry(slug);
  if (!entry) return {};
  const path = `/formation-ia/${slug}`;
  if (entry.kind === 'metier' && entry.metier) {
    const { title, description, keywords } = buildMetierMetadata(entry.metier, path);
    return createPageMetadata({ title, description, path, keywords, robots: { index: false, follow: true } });
  }
  if (entry.kind === 'ville' && entry.ville) {
    const { title, description, keywords } = buildVilleMetadata(entry.ville, path);
    return createPageMetadata({ title, description, path, keywords, robots: { index: false, follow: true } });
  }
  return {};
}

export default async function FormationIaSlugPage({ params }: Props) {
  const { slug } = await params;
  const rich = getFormationIaHubMetierRichConfig(slug);
  if (rich) {
    return <FormationIaMetierDynamicTemplate config={rich} />;
  }

  const entry = getFormationIaEntry(slug);
  if (!entry) notFound();

  const courseJson = buildFormationIaCourseJsonLd({
    areaServed:
      entry.kind === 'ville' && entry.ville
        ? [entry.ville.label, `${entry.ville.deptName}`, 'Île-de-France', 'France']
        : ['Île-de-France', 'France'],
  });

  const localJson = buildFormationIaLocalBusinessJsonLd();
  const orgJson = buildEducationalOrgSnippetJsonLd();

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJson) }}
      />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {entry.kind === 'metier' && entry.metier ? (
          <FormationIaMetierBody metier={entry.metier} />
        ) : entry.kind === 'ville' && entry.ville ? (
          <FormationIaVilleBody ville={entry.ville} />
        ) : null}
      </div>
    </div>
  );
}
