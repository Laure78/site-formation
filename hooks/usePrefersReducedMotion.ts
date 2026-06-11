'use client';

import { useSyncExternalStore } from 'react';

const MEDIA_QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(onStoreChange: () => void) {
  const mq = window.matchMedia(MEDIA_QUERY);
  mq.addEventListener('change', onStoreChange);
  return () => mq.removeEventListener('change', onStoreChange);
}

function getSnapshot() {
  return window.matchMedia(MEDIA_QUERY).matches;
}

/** Côté serveur : on suppose « pas de réduction » — le contenu reste visible. */
function getServerSnapshot() {
  return false;
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
