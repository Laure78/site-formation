'use client';

import dynamic from 'next/dynamic';

const ScrollToHashOnLoad = dynamic(
  () =>
    import('@/components/navigation/ScrollToHashOnLoad').then((mod) => ({
      default: mod.ScrollToHashOnLoad,
    })),
  { ssr: false },
);

/** Ancres `#` — chunk hors hydratation initiale du layout serveur. */
export function DeferredScrollToHashOnLoad() {
  return <ScrollToHashOnLoad />;
}
