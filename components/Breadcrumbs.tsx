import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/seo';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

function absoluteUrl(href: string): string {
  const base = SITE_CONFIG.url.replace(/\/$/, '');
  if (href === '/' || href === '') return `${base}/`;
  return `${base}${href.startsWith('/') ? href : `/${href}`}`;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const allItems: BreadcrumbItem[] = [{ label: 'Accueil', href: '/' }, ...items];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  };

  return (
    <>
      <script
        id="schema-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Fil d'Ariane" className="mb-6 text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-1">
          {allItems.map((item, i) => (
            <li key={i} className="flex items-center gap-1">
              {i > 0 && <span className="text-gray-300">/</span>}
              {item.href && i < allItems.length - 1 ? (
                <Link href={item.href} className="hover:text-[#377CF3] hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-700">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
