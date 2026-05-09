'use client';

import { usePathname } from 'next/navigation';
import { Breadcrumb } from '@/components/Breadcrumb';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

/** Préfixe automatiquement « Accueil », complète la dernière entrée avec l’URL courante si `href` manque — délégué à `<Breadcrumb />` (visuel + JSON-LD Script). */
export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const pathname = usePathname() || '/';

  const resolved = items.map((it, i, arr) => {
    const isLast = i === arr.length - 1;
    const href = it.href ?? (isLast ? pathname : '/');
    return { label: it.label, href };
  });

  const full = [{ label: 'Accueil', href: '/' as const }, ...resolved];

  const jsonLdSuffix =
    pathname.replace(/^\/+|\/+$/g, '').replace(/\//g, '-') || 'home';

  return (
    <Breadcrumb
      items={full}
      showVisual
      className="mb-6 text-sm text-slate-600"
      jsonLdId={`schema-breadcrumbs-${jsonLdSuffix}`}
    />
  );
}
