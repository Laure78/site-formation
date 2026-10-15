import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/JsonLd';
import { ParcoursDetailView } from '@/components/formations/catalogue-2027/ParcoursDetailView';
import {
  PARCOURS_CATALOGUE_2027,
  computeParcours,
  getParcoursBySlug,
} from '@/data/catalogue-2027';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';
import { parcoursHref } from '@/lib/catalogue-2027/parcours-href';
import { SCHEMA_ORGANIZATION_OFC } from '@/lib/schema-constants';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PARCOURS_CATALOGUE_2027.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const parcours = getParcoursBySlug(slug);
  if (!parcours) return {};
  const computed = computeParcours(parcours);
  const title = `${parcours.titre} : parcours formation BTP | Laure Olivié`.slice(0, 65);
  const description =
    `${parcours.benefice} ${computed.dureeHeures} h, formation IA pour le BTP et compétences métier. Présentiel Île-de-France.`.slice(
      0,
      160,
    );
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
  const { slug } = await params;
  const parcours = getParcoursBySlug(slug);
  if (!parcours) notFound();
  const computed = computeParcours(parcours);
  const path = parcoursHref(parcours.id);
  const url = `${SITE_CONFIG.url.replace(/\/$/, '')}${path}`;

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `Parcours ${parcours.titre}`,
    description: parcours.objectif,
    provider: {
      '@type': 'Organization',
      name: SCHEMA_ORGANIZATION_OFC.name,
      url: SITE_CONFIG.url,
    },
    url,
    educationalCredentialAwarded: 'Attestation de fin de formation et certificat de réalisation',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'onsite',
      location: {
        '@type': 'Place',
        name: 'Île-de-France',
      },
    },
    offers: {
      '@type': 'Offer',
      category: 'Paid',
      price: computed.prixInterHt,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/PreOrder',
      url,
    },
    timeRequired: `PT${computed.dureeHeures}H`,
  };

  return (
    <>
      <JsonLd id={`schema-parcours-${parcours.id}`} schema={courseSchema} />
      <ParcoursDetailView parcours={computed} />
    </>
  );
}
