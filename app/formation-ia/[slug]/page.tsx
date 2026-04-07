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
import { createPageMetadata, getBreadcrumbSchema, SITE_CONFIG } from '@/lib/seo';
import {
  FormationIaMetierBody,
  FormationIaVilleBody,
} from '@/components/formation-ia/FormationIaSlugContent';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return FORMATION_IA_ALL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getFormationIaEntry(slug);
  if (!entry) return {};
  const path = `/formation-ia/${slug}`;
  if (entry.kind === 'metier' && entry.metier) {
    const { title, description, keywords } = buildMetierMetadata(entry.metier, path);
    return createPageMetadata({ title, description, path, keywords });
  }
  if (entry.kind === 'ville' && entry.ville) {
    const { title, description, keywords } = buildVilleMetadata(entry.ville, path);
    return createPageMetadata({ title, description, path, keywords });
  }
  return {};
}

export default async function FormationIaSlugPage({ params }: Props) {
  const { slug } = await params;
  const entry = getFormationIaEntry(slug);
  if (!entry) notFound();

  const path = `/formation-ia/${slug}`;
  const courseName =
    entry.kind === 'metier' && entry.metier
      ? `Formation IA — ${entry.metier.label} (ChatGPT & Claude AI)`
      : entry.kind === 'ville' && entry.ville
        ? `Formation IA BTP ${entry.ville.label} (ChatGPT & Claude AI)`
        : 'Formation IA BTP';

  const courseDescription =
    entry.kind === 'metier' && entry.metier
      ? `Formation IA BTP pour ${entry.metier.label} (${entry.metier.categorie}) : ChatGPT et Claude AI pour devis, dossiers et chantier. Qualiopi, OFC Création d'Entreprise.`
      : entry.kind === 'ville' && entry.ville
        ? `Formation IA BTP à ${entry.ville.label} (${entry.ville.deptName}) : ChatGPT et Claude AI pour artisans et entreprises. Qualiopi, financement OPCO Constructys.`
        : SITE_CONFIG.description;

  const courseJson = buildFormationIaCourseJsonLd({
    name: courseName,
    description: courseDescription,
    path,
    areaServed:
      entry.kind === 'ville' && entry.ville
        ? [entry.ville.label, `${entry.ville.deptName}`, 'Île-de-France', 'France']
        : ['Île-de-France', 'France'],
  });

  const localJson = buildFormationIaLocalBusinessJsonLd();
  const orgJson = buildEducationalOrgSnippetJsonLd();
  const breadcrumb = getBreadcrumbSchema([
    { name: 'Accueil', path: '/' },
    { name: 'Formation IA BTP (hub)', path: '/formation-ia' },
    {
      name:
        entry.kind === 'metier' && entry.metier
          ? entry.metier.label
          : entry.kind === 'ville' && entry.ville
            ? entry.ville.label
            : 'Page',
      path,
    },
  ]);

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
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
