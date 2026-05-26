import { headers } from 'next/headers';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { buildBreadcrumbTrail } from '@/lib/breadcrumb-trail';

/**
 * Fil d'Ariane global — injecté dans `app/layout.tsx` (toutes les pages sauf l'accueil).
 */
export async function GlobalBreadcrumbs() {
  const h = await headers();
  const pathname = h.get('x-pathname') ?? '/';
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
