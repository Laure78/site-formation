'use client';

import { ParcoursMetierPrimaryCtas } from './ParcoursMetierPrimaryCtas';

export function ParcoursMetierStickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 backdrop-blur lg:hidden">
      <ParcoursMetierPrimaryCtas variant="sticky" />
    </div>
  );
}
