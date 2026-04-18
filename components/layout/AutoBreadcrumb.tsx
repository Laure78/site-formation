'use client';

import { usePathname } from 'next/navigation';
import { Breadcrumb } from '@/components/Breadcrumb';
import { autoBreadcrumbFromPathname } from '@/lib/auto-breadcrumb';
import { breadcrumbItemsFromPaths } from '@/lib/seo';

const SKIP_PREFIXES = ['/blog', '/formations', '/etudes-de-cas', '/ressources', '/admin'] as const;

function shouldSkipAutoBreadcrumb(pathname: string): boolean {
  if (!pathname || pathname === '/') return true;
  return SKIP_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

/**
 * Fil d'Ariane + JSON-LD sur les pages qui n'ont pas déjà un layout dédié (blog, formations, …).
 */
export function AutoBreadcrumb() {
  const pathname = usePathname();
  if (shouldSkipAutoBreadcrumb(pathname)) return null;

  const raw = autoBreadcrumbFromPathname(pathname);
  if (raw.length <= 1) return null;

  const items = breadcrumbItemsFromPaths(raw);
  return (
    <div className="border-b border-slate-100 bg-slate-50/80">
      <div className="mx-auto max-w-[1400px] px-4 py-3 sm:px-8">
        <Breadcrumb items={items} showVisual className="text-sm" />
      </div>
    </div>
  );
}
