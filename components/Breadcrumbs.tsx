import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import {
  buildBreadcrumbListJsonLd,
  siteAbsoluteUrl,
  type BreadcrumbListItem,
} from '@/lib/seo';

export type BreadcrumbItem = {
  label: string;
  /** URL pour le JSON-LD ; le libellé peut rester non cliquable si `link` vaut false. */
  href: string;
  /** Afficher comme lien (défaut true pour les entrées intermédiaires). */
  link?: boolean;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  /** id du script JSON-LD (éviter les doublons sur une page). */
  jsonLdId?: string;
  className?: string;
};

/**
 * Fil d'Ariane réutilisable — navigation visuelle + JSON-LD `BreadcrumbList`.
 * Liens internes via `<Link />` (App Router).
 */
export function Breadcrumbs({ items, jsonLdId, className }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  const schemaItems: BreadcrumbListItem[] = items.map((item) => ({
    name: item.label,
    url: siteAbsoluteUrl(item.href),
  }));
  const schema = buildBreadcrumbListJsonLd(schemaItems);
  const scriptId =
    jsonLdId ??
    `schema-breadcrumb-${items
      .map((i) => i.href.replace(/\//g, '_'))
      .join('-')
      .replace(/^_+|_+$/g, '')
      .slice(0, 80) || 'root'}`;

  return (
    <>
      <nav aria-label="Fil d'Ariane" className={className ?? 'text-sm text-[#64748B]'}>
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={`${item.href}-${index}`} className="flex items-center gap-1.5">
                {index > 0 ? (
                  <span aria-hidden className="select-none text-[#64748B]">
                    ›
                  </span>
                ) : null}
                {isLast ? (
                  <span className="font-medium text-slate-800" aria-current="page">
                    {item.label}
                  </span>
                ) : item.link === false ? (
                  <span className="font-medium text-slate-600">{item.label}</span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-[#64748B] transition-colors hover:text-slate-900 hover:underline"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd id={scriptId} schema={schema} />
    </>
  );
}

export default Breadcrumbs;
