'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { scrollToInPageHash } from '@/components/navigation/InPageAnchor';

function scrollFromLocationHash() {
  const hash = window.location.hash;
  if (!hash) return;
  requestAnimationFrame(() => {
    if (scrollToInPageHash(hash)) return;
    window.setTimeout(() => scrollToInPageHash(hash), 120);
  });
}

/** Au chargement, changement de hash ou clic same-page — scroll fiable (Next.js `Link` + `#` ignore l’ancre). */
export function ScrollToHashOnLoad() {
  const pathname = usePathname();

  useEffect(() => {
    scrollFromLocationHash();
  }, [pathname]);

  useEffect(() => {
    window.addEventListener('hashchange', scrollFromLocationHash);
    return () => window.removeEventListener('hashchange', scrollFromLocationHash);
  }, []);

  useEffect(() => {
    const onClickCapture = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest('a');
      if (!anchor) return;

      const rawHref = anchor.getAttribute('href');
      if (!rawHref || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:')) return;

      let url: URL;
      try {
        url = new URL(rawHref, window.location.href);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;
      if (url.pathname !== window.location.pathname) return;
      if (!url.hash) return;

      if (scrollToInPageHash(url.hash)) {
        event.preventDefault();
        const next = `${url.pathname}${url.search}${url.hash}`;
        const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
        if (current !== next) {
          window.history.pushState(null, '', next);
        }
      }
    };

    document.addEventListener('click', onClickCapture, true);
    return () => document.removeEventListener('click', onClickCapture, true);
  }, []);

  return null;
}
