import {
  RESSOURCES_THEMATIC_BLOCKS,
  ressourcesBlogCategoryCta,
  ressourcesBlogCategoryHref,
} from '@/lib/ressources-thematic-hub';
import { RessourcesThematicHubTabs } from '@/components/ressources/RessourcesThematicHubTabs';

/** Hub « par thématique » : données serveur + onglets client. */
export function RessourcesThematicHub() {
  const blocks = RESSOURCES_THEMATIC_BLOCKS.map((block) => ({
    id: block.id,
    title: block.title,
    description: block.description,
    pilier: block.pilier,
    tutos: block.tutos,
    guides: block.guides,
    articles: block.articles,
    blogCategoryCta: block.blogCategory ? ressourcesBlogCategoryCta(block.blogCategory) : undefined,
    blogCategoryHref: block.blogCategory ? ressourcesBlogCategoryHref(block.blogCategory) : undefined,
  }));

  return (
    <section
      id="hub-par-theme"
      aria-labelledby="ressources-par-theme-heading"
      className="scroll-mt-28 border-t border-slate-200 bg-white py-14 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-4">
        <header className="mb-8 max-w-3xl md:mb-10">
          <h2 id="ressources-par-theme-heading" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Appels d&apos;offres &amp; marchés : tutos, guides et articles
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
            Commencez par les marchés publics et privés (DCE, CCAP, mémoire technique), puis enchaînez chantier,
            QSE, productivité ou cadre Qualiopi — chaque thème regroupe tutos PDF, pages formation et articles
            blog pour les pros du BTP en Île-de-France.
          </p>
        </header>

        <RessourcesThematicHubTabs blocks={blocks} />
      </div>
    </section>
  );
}
