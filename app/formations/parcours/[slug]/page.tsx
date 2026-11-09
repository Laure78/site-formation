import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/JsonLd';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { ParcoursDetailView } from '@/components/formations/catalogue-2027/ParcoursDetailView';
import {
  PARCOURS_CATALOGUE_2027,
  computeParcours,
  getParcoursBySlug,
} from '@/data/catalogue-2027';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';
import { parcoursHref } from '@/lib/catalogue-2027/parcours-href';
import { LINKS } from '@/lib/internal-links';
import { isParcoursMetiers2027Visible } from '@/lib/parcours-metiers-2027-visibility';
import { redirect } from 'next/navigation';
import {
  parcoursMetierPageDescription,
  parcoursMetierPageTitle,
} from '@/lib/catalogue-2027/parcours-seo-metadata';
import {
  buildParcoursMetierCourseJsonLd,
  buildParcoursModulesItemListJsonLd,
} from '@/lib/schema-parcours-metiers-jsonld';
import { getParcoursMetierFaqForPage } from '@/lib/catalogue-2027/parcours-metiers-faq-pages';
import { FAQSchema } from '@/components/seo/FAQSchema';

type Props = { params: Promise<{ slug: string }> };

const PARCOURS_SLUGS_RETIRES = new Set(['chef-dequipe', 'chef-de-chantier']);

export function generateStaticParams() {
  return PARCOURS_CATALOGUE_2027.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (PARCOURS_SLUGS_RETIRES.has(slug)) return {};
  const parcours = getParcoursBySlug(slug);
  if (!parcours) return {};
  const computed = computeParcours(parcours);
  const title = parcoursMetierPageTitle(parcours.id);
  const description = parcoursMetierPageDescription(computed);
  const path = parcoursHref(parcours.id);

  return {
    ...createPageMetadata({
      title,
      titleAbsolute: title,
      description,
      descriptionFinal: true,
      path,
      appendAuthorSuffix: false,
      robots: { index: true, follow: true },
    }),
    alternates: {
      canonical: `${SITE_CONFIG.url.replace(/\/$/, '')}${path}`,
    },
  };
}

export default async function ParcoursPage({ params }: Props) {
  if (!isParcoursMetiers2027Visible()) {
    redirect(LINKS.formations);
  }

  const { slug } = await params;
  if (PARCOURS_SLUGS_RETIRES.has(slug)) {
    redirect(LINKS.parcoursMetiers);
  }
  const parcours = getParcoursBySlug(slug);
  if (!parcours) notFound();
  const computed = computeParcours(parcours);
  const path = parcoursHref(parcours.id);
  const url = `${SITE_CONFIG.url.replace(/\/$/, '')}${path}`;

  const courseSchema = buildParcoursMetierCourseJsonLd(computed);
  const modulesListSchema = buildParcoursModulesItemListJsonLd(computed);
  const faqItems = getParcoursMetierFaqForPage(parcours.id, computed);

  const base = SITE_CONFIG.url.replace(/\/$/, '');

  return (
    <>
      <JsonLd id={`schema-parcours-${parcours.id}`} schema={courseSchema} />
      <JsonLd id={`schema-parcours-modules-${parcours.id}`} schema={modulesListSchema} />
      <FAQSchema
        id={`schema-parcours-faq-${parcours.id}`}
        items={faqItems.map((item) => ({
          question: item.q,
          answer: item.a,
        }))}
      />
      <BreadcrumbJsonLd
        id={`schema-breadcrumb-parcours-${parcours.id}`}
        items={[
          { name: 'Accueil', url: `${base}/` },
          { name: 'Formations', url: `${base}/formations` },
          { name: 'Parcours métiers', url: `${base}${LINKS.parcoursMetiers}` },
          { name: parcours.titre, url },
        ]}
      />
      <ParcoursDetailView parcours={computed} />
    </>
  );
}
