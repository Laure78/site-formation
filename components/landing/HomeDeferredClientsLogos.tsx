'use client';

import dynamic from 'next/dynamic';
import { DeferUntilVisible } from '@/components/performance/DeferUntilVisible';
import { ClientsLogosMarqueePlaceholder } from '@/components/landing/ClientsLogosMarqueePlaceholder';

const ClientsLogosMarquee = dynamic(
  () =>
    import('@/components/landing/ClientsLogosMarquee').then((mod) => ({
      default: mod.ClientsLogosMarquee,
    })),
  { loading: () => <ClientsLogosMarqueePlaceholder /> },
);

/** Bande logos partenaires — import dynamique + montage au scroll. */
export function HomeDeferredClientsLogos() {
  return (
    <DeferUntilVisible fallback={<ClientsLogosMarqueePlaceholder />} minHeight="11rem">
      <ClientsLogosMarquee />
    </DeferUntilVisible>
  );
}
