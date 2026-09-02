import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { createPageMetadata } from '@/lib/seo';
import { RessourcesHubHero } from '@/components/ressources/RessourcesHubHero';
import { RessourcesFeaturedSection } from '@/components/ressources/RessourcesFeaturedSection';
import { RessourcesGuidesPdfSection } from '@/components/ressources/RessourcesGuidesPdfSection';
import { RessourcesHubLibrary } from '@/components/ressources/RessourcesHubLibrary';
import { RessourcesDisclaimerSection } from '@/components/ressources/RessourcesDisclaimerSection';
import { RessourcesFinalCta } from '@/components/ressources/RessourcesFinalCta';
import { buildRessourcesHubJsonLd } from '@/lib/schema-ressources-hub-jsonld';
import { getFeaturedRessources, getRessourcesCatalog } from '@/lib/ressources-catalog';
import { LINKS } from '@/lib/internal-links';

const PATH = LINKS.ressources;

export const metadata: Metadata = createPageMetadata({
  title: 'Ressources IA BTP gratuites | Guides, tutos et outils',
  description:
    'Guides, tutoriels, prompts et outils gratuits pour utiliser l’IA dans le BTP : DCE, mémoire technique, chantier, PPSPS, DOE et productivité.',
  descriptionFinal: true,
  path: PATH,
  openGraphType: 'website',
  openGraphTitle: 'Ressources IA BTP gratuites | Guides, tutos et outils',
  openGraphDescription:
    'Guides, tutoriels, prompts et outils gratuits pour utiliser l’IA dans le BTP : DCE, mémoire technique, chantier, PPSPS, DOE et productivité.',
  appendAuthorSuffix: false,
  image: {
    url: '/images/ressources-gratuites-ia-btp-hero.png',
    width: 1024,
    height: 1024,
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
  const featured = getFeaturedRessources();
  const resolvedParams = searchParams ? await searchParams : {};
  const initialSearch = buildInitialSearch(resolvedParams);

  return (
    <div className="min-h-screen bg-white">
      <JsonLd id="schema-ressources-hub" data={hubJsonLd} />

      <RessourcesHubHero />

      <RessourcesFeaturedSection resources={featured} />

      <RessourcesGuidesPdfSection />

      {/* Maillage HTML crawlable — indépendant du « Afficher plus » client */}
      <nav className="sr-only" aria-label="Liste complète des ressources">
        <ul>
          {catalog.map((resource) => (
            <li key={`crawl-${resource.id}`}>
              <a href={resource.viewUrl}>{resource.title}</a>
            </li>
          ))}
        </ul>
      </nav>

      <RessourcesHubLibrary resources={libraryCatalog} initialSearch={initialSearch} />

      <RessourcesDisclaimerSection />

      <RessourcesFinalCta />
    </div>
  );
}
