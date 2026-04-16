import { JsonLd } from '@/components/JsonLd';
import { buildBreadcrumbListJsonLd, type BreadcrumbListItem } from '@/lib/seo';

/** Entrée fil d’Ariane : `url` absolue (domaine + chemin) pour Schema.org `item`. */
export type BreadcrumbJsonLdItem = BreadcrumbListItem;

type Props = {
  items: BreadcrumbJsonLdItem[];
  /** id du script JSON-LD (éviter les doublons si plusieurs blocs sur la page) */
  id?: string;
};

/**
 * JSON-LD `BreadcrumbList` (Schema.org) à partir d’une liste `{ name, url }`.
 * À combiner avec le fil d’Ariane visuel `<Breadcrumb items={…} omitJsonLd showVisual />`.
 *
 * Exemple de sortie (extrait) pour une fiche formation :
 * ```json
 * {
 *   "@context": "https://schema.org",
 *   "@type": "BreadcrumbList",
 *   "itemListElement": [
 *     { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.laureolivie.fr" },
 *     { "@type": "ListItem", "position": 2, "name": "Formations", "item": "https://www.laureolivie.fr/formations" },
 *     { "@type": "ListItem", "position": 3, "name": "…", "item": "https://www.laureolivie.fr/formations/…" }
 *   ]
 * }
 * ```
 */
export function BreadcrumbJsonLd({ items, id = 'schema-breadcrumb-jsonld' }: Props) {
  if (!items.length) return null;
  return <JsonLd id={id} schema={buildBreadcrumbListJsonLd(items)} />;
}
