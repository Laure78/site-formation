import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { JsonLd } from '@/components/JsonLd';
import { DatesLieuxHero } from '@/components/dates-lieux/DatesLieuxHero';
import { DatesLieuxSessionsExplorer } from '@/components/dates-lieux/DatesLieuxSessionsExplorer';
import { DatesLieuxModalityCards } from '@/components/dates-lieux/DatesLieuxModalityCards';
import { DatesLieuxProposeBanner } from '@/components/dates-lieux/DatesLieuxProposeBanner';
import { DatesLieuxFaqSection } from '@/components/dates-lieux/DatesLieuxFaqSection';
import { formationHref } from '@/data/formations';
import { getPublishedFormations } from '@/lib/formation-catalogue-visibility';
import {
  buildDatesLieuxOnDemandRows,
  loadDatesLieuxConfirmedSessions,
} from '@/lib/dates-lieux/public-sessions';
import {
  buildDatesLieuxBreadcrumbJsonLd,
  buildDatesLieuxCourseInstancesJsonLd,
} from '@/lib/dates-lieux/schema';
import { LINKS } from '@/lib/internal-links';
import { createPageMetadata, siteAbsoluteUrl } from '@/lib/seo';

const PAGE_PATH = LINKS.datesEtLieux;
const TITLE = 'Dates des formations IA BTP en Île-de-France | Laure Olivié';
const DESCRIPTION =
  'Consultez les dates et lieux des formations IA pour les PME du BTP en Île-de-France. Sessions en présentiel, programmes pratiques et demandes d’inscription.';

export const revalidate = 300;

export const metadata: Metadata = {
  ...createPageMetadata({
    title: TITLE,
    titleAbsolute: TITLE,
    description: DESCRIPTION,
    descriptionFinal: true,
    path: PAGE_PATH,
    appendAuthorSuffix: false,
    keywords: [
      'formation IA BTP',
      'dates formation IA Île-de-France',
      'formation ChatGPT BTP',
      'sessions inter-entreprises BTP',
    ],
  }),
  alternates: {
    canonical: siteAbsoluteUrl(PAGE_PATH),
    languages: { 'fr-FR': siteAbsoluteUrl(PAGE_PATH) },
  },
};

const breadcrumbItems = [
  { label: 'Accueil', href: LINKS.home },
  { label: 'Dates et lieux', href: PAGE_PATH },
];

export default async function DatesEtLieuxPage() {
  const confirmed = await loadDatesLieuxConfirmedSessions();
  const onDemand = buildDatesLieuxOnDemandRows(confirmed);
  const published = getPublishedFormations();
  const formationOptions = published.map((f) => ({
    slug: f.slug,
    title: f.titre,
  }));
  const formationOptionsWithHref = published.map((f) => ({
    slug: f.slug,
    title: f.titre,
    href: formationHref(f),
  }));

  const courseInstances = buildDatesLieuxCourseInstancesJsonLd(confirmed);
  const graph = [buildDatesLieuxBreadcrumbJsonLd(), courseInstances].filter(Boolean);

  return (
    <>
      <BreadcrumbJsonLd
        id="schema-breadcrumb-dates-et-lieux"
        items={[
          { name: 'Accueil', url: siteAbsoluteUrl(LINKS.home) },
          { name: 'Dates et lieux', url: siteAbsoluteUrl(PAGE_PATH) },
        ]}
      />
      {graph.length ? (
        <JsonLd
          id="schema-dates-et-lieux-graph"
          schema={{
            '@context': 'https://schema.org',
            '@graph': graph,
          }}
        />
      ) : null}

      <div className="mx-auto max-w-[80rem] px-4 pt-4 sm:px-6 lg:px-8">
        <Breadcrumb items={breadcrumbItems} omitJsonLd showVisual className="text-sm" />
      </div>

      <DatesLieuxHero />
      <DatesLieuxSessionsExplorer
        confirmed={confirmed}
        onDemand={onDemand}
        formationOptions={formationOptions}
      />
      <DatesLieuxModalityCards />
      <DatesLieuxProposeBanner formationOptions={formationOptionsWithHref} />
      <DatesLieuxFaqSection />
    </>
  );
}
