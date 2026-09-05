'use client';

import { useEffect, useState } from 'react';
import {
  PRENDRE_RDV_CTA_PRIMARY,
  PRENDRE_RDV_FORM_ANCHOR,
} from '@/lib/prendre-rendez-vous-page-config';

/**
 * CTA sticky mobile — masqué dès que le formulaire (#agenda) est visible.
 * JS minimal (IntersectionObserver) ; pas de lib.
 */
export function RdvStickyMobileCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const target = document.getElementById(PRENDRE_RDV_FORM_ANCHOR);
    if (!target) return;

    const mq = window.matchMedia('(max-width: 767px)');
    const sync = (formVisible: boolean) => {
      setShow(mq.matches && !formVisible);
    };

    const io = new IntersectionObserver(
      ([entry]) => sync(Boolean(entry?.isIntersecting)),
      { rootMargin: '-40px 0px 0px 0px', threshold: 0.05 },
    );
    io.observe(target);

    const onMq = () => {
      /* recalcul via dernier état IO au prochain tick */
    };
    mq.addEventListener('change', onMq);

    // État initial : formulaire pas encore vu → afficher sur mobile
    sync(false);

    return () => {
      io.disconnect();
      mq.removeEventListener('change', onMq);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 backdrop-blur-sm md:hidden"
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      <a
        href={`#${PRENDRE_RDV_FORM_ANCHOR}`}
        className="flex min-h-12 w-full items-center justify-center rounded-xl bg-[var(--accent)] px-4 text-base font-semibold text-white"
      >
        {PRENDRE_RDV_CTA_PRIMARY}
      </a>
    </div>
  );
}
