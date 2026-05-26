'use client';

import Script from 'next/script';
import Link from 'next/link';
import {
  buildBreadcrumbListJsonLd,
  siteAbsoluteUrl,
  type BreadcrumbListItem,
} from '@/lib/seo';

/** Chemins relatifs (slug) — template page intérieure. */
export type BreadcrumbHrefEntry = { label: string; href: string };

/** URLs absolues Schema.org — même forme que `breadcrumbItemsFromPaths`. */
export type BreadcrumbCanonicalEntry = BreadcrumbListItem;

export type BreadcrumbItemProp = BreadcrumbHrefEntry | BreadcrumbCanonicalEntry;

export type BreadcrumbProps = {
  items: BreadcrumbItemProp[];
  /** id du bloc JSON-LD (éviter les doublons sur une même page). */
  jsonLdId?: string;
  showVisual?: boolean;
  className?: string;
  /** Si true : pas de `<Script>` JSON-LD (ex. `BreadcrumbJsonLd` à part). */
  omitJsonLd?: boolean;
};

function isHrefEntry(item: BreadcrumbItemProp): item is BreadcrumbHrefEntry {
  return (
    'href' in item &&
    'label' in item &&
    typeof (item as BreadcrumbHrefEntry).href === 'string' &&
    typeof (item as BreadcrumbHrefEntry).label === 'string'
  );
}

function pathnameFromCanonicalUrl(url: string): string {
  try {
    const u = new URL(url);
    const path = `${u.pathname}${u.search}${u.hash}`;
    return path || '/';
  } catch {
    return '/';
  }
}

function normalizeTrail(items: BreadcrumbItemProp[]): {
  label: string;
  href: string;
  absoluteUrl: string;
}[] {
  return items.map((item) => {
    if (isHrefEntry(item)) {
      const href = item.href.startsWith('/') ? item.href : `/${item.href}`;
      return {
        label: item.label.trim(),
        href,
        absoluteUrl: siteAbsoluteUrl(href),
      };
    }
    const href = pathnameFromCanonicalUrl(item.url);
    return {
      label: item.name.trim(),
      href,
      absoluteUrl: item.url,
    };
  });
}

function schemaScriptId(
  jsonLdId: string | undefined,
  trail: ReturnType<typeof normalizeTrail>
): string {
  if (jsonLdId?.trim()) return jsonLdId.trim();
  const slug = trail
    .map((t) => t.href.replace(/\//g, '_').replace(/^_|_$/g, ''))
    .filter(Boolean)
    .join('_')
    .slice(0, 100);
  return slug ? `breadcrumb-schema-${slug}` : 'breadcrumb-schema-root';
}

function inferDefaultShowVisual(items: BreadcrumbItemProp[]): boolean {
  if (!items.length) return false;
  return isHrefEntry(items[0]);
}

/**
 * Fil d’Ariane visuel + JSON-LD `BreadcrumbList` (`next/script`).
 *
 * - `{ label, href }` : chemins relatifs (ex. `'/'`, `/formations`).
 * - `{ name, url }` : URLs absolues (rétrocompatibilité `breadcrumbItemsFromPaths`).
 */
export function Breadcrumb({
  items,
  jsonLdId,
  showVisual: showVisualProp,
  className,
  omitJsonLd = false,
}: BreadcrumbProps) {
  if (items.length === 0) return null;

  const trail = normalizeTrail(items);
  const listForSchema: BreadcrumbListItem[] = trail.map((t) => ({
    name: t.label,
    url: t.absoluteUrl,
  }));

  const schema = buildBreadcrumbListJsonLd(listForSchema);
  const scriptId = schemaScriptId(jsonLdId, trail);
  const showVisual = showVisualProp ?? inferDefaultShowVisual(items);

  return (
    <>
      {showVisual ? (
        <nav
          aria-label="Fil d'Ariane"
          className={className ?? 'text-sm text-[#64748B]'}
        >
          <ol className="flex flex-wrap items-center gap-2">
            {trail.map((item, index) => {
              const isLast = index === trail.length - 1;
              return (
                <li key={`${item.href}-${index}`} className="flex items-center gap-2">
                  {index > 0 ? (
                    <span aria-hidden className="select-none text-[#64748B]">
                      ›
                    </span>
                  ) : null}
                  {isLast ? (
                    <span className="font-medium text-slate-800" aria-current="page">
                      {item.label}
                    </span>
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
      ) : null}

      {!omitJsonLd ? (
        <Script
          id={scriptId}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ) : null}
    </>
  );
}

export default Breadcrumb;
