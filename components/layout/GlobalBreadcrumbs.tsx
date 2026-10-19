'use client';

import { usePathname } from 'next/navigation';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { buildBreadcrumbTrail } from '@/lib/breadcrumb-trail';
import { cn } from '@/lib/cn';
import { isAuthConnexionPage } from '@/lib/auth-connexion-chrome';

/**
 * Fil d'Ariane visuel — injecté dans `app/layout.tsx` (toutes les pages sauf l'accueil / admin).
 * Pas de JSON-LD ici : chaque page émet son `BreadcrumbList` plus précis.
 */
export function GlobalBreadcrumbs() {
  const pathname = usePathname() ?? '/';
  if (isAuthConnexionPage(pathname)) return null;
  const pathNorm = pathname.replace(/\/$/, '') || '/';
  /** Fil explicite — évite un écart d’hydratation sur le hub formateurs. */
  const items =
    pathNorm === '/formateurs'
      ? [
          { label: 'Accueil', href: '/' },
          { label: 'Formateurs', href: '/formateurs' },
        ]
      : buildBreadcrumbTrail(pathname);

  if (items.length === 0) return null;

  const isFormateursHub = pathNorm === '/formateurs';
  const isFinancementConstructys = pathNorm === '/financement-constructys-formation-ia-btp';

  return (
    <div
      className={cn(
        isFinancementConstructys ? 'bg-[var(--ofc-color-canvas)]' : 'bg-white',
        isFormateursHub || isFinancementConstructys ? 'border-b-0' : 'border-b border-slate-100',
      )}
    >
      <div
        className={cn(
          'mx-auto max-w-[80rem] sm:px-6 lg:px-8',
          isFormateursHub && 'px-5 pb-1 pt-2',
          isFinancementConstructys && 'px-4 pb-0 pt-1.5 sm:px-6 lg:px-8',
          !isFormateursHub && !isFinancementConstructys && 'max-w-[1400px] px-4 py-3 sm:px-8',
        )}
      >
        <Breadcrumbs items={items} omitJsonLd />
      </div>
    </div>
  );
}
