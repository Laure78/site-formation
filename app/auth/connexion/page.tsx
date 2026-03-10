import { Suspense } from 'react';
import ConnexionClient from './ConnexionClient';

export default function ConnexionPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-md px-4 py-8 md:py-16 animate-pulse text-slate-500">Chargement…</div>}>
      <ConnexionClient />
    </Suspense>
  );
}
