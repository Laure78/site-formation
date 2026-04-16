import Link from 'next/link';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { type BreadcrumbListItem } from '@/lib/seo';

export type BreadcrumbItem = BreadcrumbListItem;

export type BreadcrumbProps = {
  items: BreadcrumbItem[];
  /** id du script JSON-LD */
  jsonLdId?: string;
  /** Affiche le fil d'Ariane (HTML + liens internes) */
  showVisual?: boolean;
  className?: string;
  /** Si true, pas de script JSON-LD (ex. JSON-LD déjà fourni par `<BreadcrumbJsonLd />`) */
  omitJsonLd?: boolean;
};

function hrefFromCanonicalUrl(canonicalUrl: string): string {
  try {
    const u = new URL(canonicalUrl);
    return `${u.pathname}${u.search}${u.hash}`;
  } catch {
    return '/';
  }
}

/**
 * Fil d'Ariane : JSON-LD BreadcrumbList + option visuelle.
 * La home (/) n'utilise pas ce composant.
 */
export function Breadcrumb({
  items,
  jsonLdId = 'schema-breadcrumb',
  showVisual = false,
  className,
  omitJsonLd = false,
}: BreadcrumbProps) {
  if (items.length === 0) return null;
  return (
    <>
      {!omitJsonLd && <BreadcrumbJsonLd id={jsonLdId} items={items} />}
      {showVisual && (
        <nav aria-label="Fil d'Ariane" className={className}>
          <ol className="flex flex-wrap items-center gap-1 text-sm text-slate-600">
            {items.map((item, i) => {
              const isLast = i === items.length - 1;
              const href = hrefFromCanonicalUrl(item.url);
              return (
                <li key={`bc-${i}-${item.name}`} className="flex items-center gap-1">
                  {i > 0 && (
                    <span aria-hidden className="text-slate-400">
                      /
                    </span>
                  )}
                  {isLast ? (
                    <span className="font-medium text-slate-900" aria-current="page">
                      {item.name}
                    </span>
                  ) : (
                    <Link href={href} className="text-[var(--accent)] hover:underline">
                      {item.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      )}
    </>
  );
}
