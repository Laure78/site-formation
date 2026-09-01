'use client';

import { usePathname } from 'next/navigation';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { buildBreadcrumbTrail } from '@/lib/breadcrumb-trail';

/**
 * Fil d'Ariane unique — injecté dans `app/layout.tsx` (toutes les pages sauf l'accueil / admin).
 * Client minimal (`usePathname` uniquement) pour ne pas forcer le rendu dynamique du layout root.
 */
export function GlobalBreadcrumbs() {
  const pathname = usePathname() ?? '/';
  const items = buildBreadcrumbTrail(pathname);

  if (items.length === 0) return null;

  return (
    <div className="border-b border-slate-100 bg-white">
      <div className="mx-auto max-w-[1400px] px-4 py-3 sm:px-8">
        <Breadcrumbs items={items} jsonLdId="schema-breadcrumb-global" />
      </div>
    </div>
  );
}
