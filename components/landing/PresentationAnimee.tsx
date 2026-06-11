'use client';

import { useState, useRef, useEffect } from 'react';
import { Play } from 'lucide-react';
import { VisioDecouverteCalendlyLink } from '@/components/VisioDecouverteCalendlyLink';
import { OFC_SEC } from '@/lib/ofc-section-classes';

/** Durée déclarée de l’animation (pack) ; marge avant relance pour laisser finir la dernière slide. */
const PRESENTATION_LOOP_MS = 43_000;
const LOOP_SRC_QUERY = '?loop=auto';

/**
 * Animation de présentation des 2 parcours formation IA appliquée au bâtiment (niveaux 1 et 2).
 * À la première apparition dans le viewport : chargement léger puis lecture.
 * Après démarrage, l’iframe se recharge en boucle (même origine) pour un visionnage continu.
 *
 * Le fichier source se trouve dans : public/presentation-formations.html
 */
export function PresentationAnimee() {
  const [loaded, setLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Précharge + chargement automatique dès que la section approche du viewport
  useEffect(() => {
    if (loaded) return;
    if (typeof IntersectionObserver === 'undefined') return;

    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = '/presentation-formations.html';
          link.as = 'document';
          document.head.appendChild(link);
          window.setTimeout(() => setLoaded(true), 320);
          observer.disconnect();
        });
      },
      { rootMargin: '120px', threshold: 0.06 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [loaded]);

  // Boucle continue : même origine → reload pour relancer l’animation
  useEffect(() => {
    if (!loaded || !iframeRef.current) return;
    const id = window.setInterval(() => {
      const frame = iframeRef.current;
      if (!frame) return;
      try {
        frame.contentWindow?.location.reload();
      } catch {
        const base = frame.src.split('?')[0] || '/presentation-formations.html';
        frame.src = `${base}${LOOP_SRC_QUERY}&t=${Date.now()}`;
      }
    }, PRESENTATION_LOOP_MS);
    return () => window.clearInterval(id);
  }, [loaded]);

  return (
    <section
      className={OFC_SEC.whiteMesh}
      aria-labelledby="presentation-animee-heading"
    >
      <div ref={sectionRef} className="mx-auto max-w-7xl">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)]">
            <span>PRÉSENTATION ANIMÉE · BOUCLE</span>
          </div>
          <h2
            id="presentation-animee-heading"
            className="mt-4 font-display text-2xl font-bold text-slate-900 md:text-3xl lg:text-4xl"
          >
            Découvrez les 2 formations IA pour les pro du BTP en 40 secondes
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-slate-600">
            Un tour rapide du catalogue : bâtiment, travaux publics, appels
            d&apos;offres. Elle se rejoue automatiquement en continu.
          </p>
        </div>

        <div
          className="relative mx-auto mt-8 w-full max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-lg shadow-slate-900/5 sm:max-w-md md:max-w-lg lg:max-w-3xl"
          style={{ aspectRatio: '16 / 9' }}
        >
          {loaded ? (
            <iframe
              ref={iframeRef}
              src={`/presentation-formations.html${LOOP_SRC_QUERY}`}
              title="Présentation animée — 2 formations IA appliquées au bâtiment (lecture en boucle)"
              className="absolute inset-0 h-full w-full border-0"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setLoaded(true)}
              aria-label="Charger tout de suite la présentation animée des 2 formations IA pour le BTP"
              className="group absolute inset-0 flex cursor-pointer items-center justify-center border-0 bg-white transition-colors hover:bg-slate-50"
            >
              <div className="absolute inset-0 opacity-40">
                <svg
                  viewBox="0 0 1200 800"
                  className="h-full w-full"
                  preserveAspectRatio="xMidYMid slice"
                  aria-hidden
                >
                  <defs>
                    <radialGradient id="presentation-bg" cx="50%" cy="40%">
                      <stop offset="0%" stopColor="#eff6ff" />
                      <stop offset="100%" stopColor="#ffffff" />
                    </radialGradient>
                  </defs>
                  <rect width="1200" height="800" fill="url(#presentation-bg)" />
                  <circle cx="600" cy="320" r="140" fill="#377CF3" opacity="0.12" />
                </svg>
              </div>

              <div className="relative z-10 flex flex-col items-center gap-4 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent)] text-white shadow-xl shadow-blue-500/30 transition-transform group-hover:scale-105 md:h-20 md:w-20">
                  <Play size={28} strokeWidth={1.5} fill="currentColor" className="ml-1 md:h-8 md:w-8" />
                </span>
                <div>
                  <p className="font-display text-xl font-semibold text-slate-900 md:text-2xl">
                    Charger la présentation
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    Animation · ~40 s · sans son · lecture en boucle
                  </p>
                </div>
              </div>
            </button>
          )}
        </div>

        <div className="mt-6 flex flex-col items-center gap-3">
          <VisioDecouverteCalendlyLink />
          <p className="text-center text-xs text-slate-400">
            La présentation se lance dès que le bloc est visible ; sinon cliquez pour charger immédiatement.
          </p>
        </div>
      </div>
    </section>
  );
}
