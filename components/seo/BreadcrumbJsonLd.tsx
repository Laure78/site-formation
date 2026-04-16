import { JsonLd } from '@/components/JsonLd';
import { buildBreadcrumbListJsonLd, type BreadcrumbListItem } from '@/lib/seo';

export type BreadcrumbJsonLdItem = BreadcrumbListItem;

type Props = {
  items: BreadcrumbJsonLdItem[];
  /** id du script JSON-LD (éviter les doublons si plusieurs blocs sur la page) */
  id?: string;
};

/**
 * JSON-LD BreadcrumbList — à associer au fil d’Ariane HTML (`<Breadcrumb omitJsonLd />`).
 */
export function BreadcrumbJsonLd({ items, id = 'schema-breadcrumb-jsonld' }: Props) {
  if (!items.length) return null;
  return <JsonLd id={id} schema={buildBreadcrumbListJsonLd(items)} />;
}
