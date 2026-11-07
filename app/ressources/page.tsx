import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { createPageMetadata } from '@/lib/seo';
import { RessourcesHubHero } from '@/components/ressources/RessourcesHubHero';
import { RessourcesHubStatsBar } from '@/components/ressources/RessourcesHubStatsBar';
import { RessourcesHubValueSections } from '@/components/ressources/RessourcesHubValueSections';
import { RessourcesHubBtpBanner } from '@/components/ressources/RessourcesHubBtpBanner';
import { RessourcesHubMain } from '@/components/ressources/RessourcesHubMain';
import { getRessourcesHubDisplayCounts } from '@/lib/ressources-hub-display-counts';
import { buildGuidesPdfItemListJsonLd } from '@/lib/schema-ressources-guides-pdf-jsonld';
import { RessourcesHubComplementary } from '@/components/ressources/RessourcesHubComplementary';
import { RessourcesDisclaimerSection } from '@/components/ressources/RessourcesDisclaimerSection';
import { RessourcesFinalCta } from '@/components/ressources/RessourcesFinalCta';
import { buildRessourcesHubJsonLd } from '@/lib/schema-ressources-hub-jsonld';
import { getRessourcesCatalog } from '@/lib/ressources-catalog';
import { getGuidesLibraryEntries } from '@/lib/ressources-guides';
import { LINKS } from '@/lib/internal-links';
import { RelatedLinks } from '@/components/RelatedLinks';

const PATH = LINKS.ressources;

export const metadata: Metadata = createPageMetadata({
  title: 'Ressources IA BTP : guides et tutos',
  description:
    'Guides, tutoriels, prompts et modèles IA gratuits pour le BTP : analyser un DCE, mémoire technique, devis, chantier et DOE. Ressources OFC Qualiopi Île-de-France.',
  descriptionFinal: true,
  path: PATH,
  openGraphType: 'website',
  openGraphTitle: 'Ressources IA BTP : guides et tutos',
  openGraphDescription:
    'Guides, tutoriels, prompts et modèles IA gratuits pour le BTP : analyser un DCE, mémoire technique, devis, chantier et DOE. Ressources OFC Qualiopi Île-de-France.',
  appendAuthorSuffix: false,
  image: {
    url: '/images/ressources/ressources-hub-hero-2026.webp',
    width: 1600,
    height: 900,
    alt: 'Ressources IA BTP : guides, tutoriels et outils pour professionnels du bâtiment',
  },
});

const hubJsonLd = buildRessourcesHubJsonLd();

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function buildInitialSearch(params: Record<string, string | string[] | undefined>): string {
  const qs = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      for (const v of value) qs.append(key, v);
    } else {
      qs.set(key, value);
    }
  }
  const str = qs.toString();
  return str ? `?${str}` : '';
}

export default async function RessourcesIndexPage({ searchParams }: PageProps) {
  const catalog = getRessourcesCatalog();
  /** Bibliothèque complète hors guides (section `#guides-pdf` dédiée). */
  const libraryCatalog = catalog.filter(
    (r) => r.resourceType !== 'guide' && r.resourceType !== 'modele-fichier',
  );
  const guides = getGuidesLibraryEntries();
  const counts = getRessourcesHubDisplayCounts(guides, libraryCatalog);
  const resolvedParams = searchParams ? await searchParams : {};
  const initialSearch = buildInitialSearch(resolvedParams);

  return (
    <div className="ressources-page ofc-editorial min-h-0 overflow-x-hidden bg-white pb-24 lg:pb-0">
      <JsonLd id="schema-ressources-hub" data={hubJsonLd} />

      <RessourcesHubHero />
      <RessourcesHubStatsBar
        guideCount={counts.guides}
        complementaryCount={counts.complementary}
      />
      <RessourcesHubValueSections />

      <div
        id="catalogue-ressources"
        className="scroll-mt-[calc(var(--site-header-height,4.5rem)+0.75rem)]"
      >
        <JsonLd id="schema-guides-pdf-itemlist" data={buildGuidesPdfItemListJsonLd()} />

        <nav className="sr-only" aria-label="Liste complète des ressources">
          <ul>
            {catalog.map((resource) => (
              <li key={`crawl-${resource.id}`}>
                <a href={resource.viewUrl}>{resource.title}</a>
              </li>
            ))}
          </ul>
        </nav>

        <RessourcesHubMain
          guides={guides}
          libraryResources={libraryCatalog}
          initialSearch={initialSearch}
        />
      </div>

      <RessourcesHubComplementary />

      <RessourcesDisclaimerSection />

      <RelatedLinks path={PATH} tone="muted" excludeHrefs={[LINKS.formations, LINKS.parcoursMetiers]} />

      <RessourcesHubBtpBanner />

      <RessourcesFinalCta />
    </div>
  );
}
