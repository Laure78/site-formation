'use client';

import { useEffect } from 'react';

/** Ancre `#catalogue-modules` → catalogue unifié `#catalogue-formations`. */
export function CatalogModulesLegacyAnchor() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.location.hash !== '#catalogue-modules') return;
    const search = window.location.search;
    const next = `${window.location.pathname}${search}#catalogue-formations`;
    window.history.replaceState(null, '', next);
    document.getElementById('catalogue-formations')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return <span id="catalogue-modules" className="sr-only" aria-hidden />;
}
