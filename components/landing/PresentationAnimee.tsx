'use client';

import { useState, useRef, useEffect } from 'react';
import { Play } from 'lucide-react';
import { VisioDecouverteCalendlyLink } from '@/components/VisioDecouverteCalendlyLink';

/**
 * Animation de présentation des 6 formations IA BTP.
 * Lazy-loaded : l'iframe (~4,7 Mo) ne se charge qu'au clic,
 * pour ne pas impacter les perfs / LCP de la home.
 *
 * Le fichier source se trouve dans : public/presentation-formations.html
 */
export function PresentationAnimee() {
  const [loaded, setLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Précharge doucement le HTML en arrière-plan dès que la section devient visible
  useEffect(() => {
    if (loaded) return;
    if (typeof IntersectionObserver === 'undefined') return;

    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Prefetch discret
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = '/presentation-formations.html';
            link.as = 'document';
            document.head.appendChild(link);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '200px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [loaded]);

  return (
    <section
      className="border-b border-slate-200 bg-gradient-to-b from-white via-slate-50/40 to-white px-4 py-20"
      aria-labelledby="presentation-animee-heading"
    >
      <div ref={sectionRef} className="mx-auto max-w-6xl">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)]">
            <span>PRÉSENTATION ANIMÉE · 40 s</span>
          </div>
          <h2
            id="presentation-animee-heading"
            className="mt-4 font-display text-3xl font-bold text-slate-900 md:text-4xl"
          >
            Découvrez les 6 formations IA BTP en 40 secondes
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Un tour rapide du catalogue : bâtiment, travaux publics, appels
            d&apos;offres, RH, architecte, assistants IA sur-mesure.
          </p>
        </div>

        <div
          className="relative mx-auto mt-10 w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-xl shadow-slate-900/5"
          style={{ aspectRatio: '16 / 9' }}
        >
          {loaded ? (
            <iframe
              src="/presentation-formations.html"
              title="Présentation animée — 6 formations IA BTP"
              className="absolute inset-0 h-full w-full border-0"
              allowFullScreen
              loading="lazy"
            />
          ) : (
            <button
              type="button"
              onClick={() => setLoaded(true)}
              aria-label="Lancer la présentation animée des 6 formations IA BTP"
              className="group absolute inset-0 flex cursor-pointer items-center justify-center border-0 bg-white transition-colors hover:bg-slate-50"
            >
              {/* Fond décoratif style thumbnail */}
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

              {/* Contenu centré */}
              <div className="relative z-10 flex flex-col items-center gap-5 text-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--accent)] text-white shadow-xl shadow-blue-500/30 transition-transform group-hover:scale-105">
                  <Play size={32} strokeWidth={1.5} fill="currentColor" className="ml-1" />
                </span>
                <div>
                  <p className="font-display text-2xl font-semibold text-slate-900 md:text-3xl">
                    Lancer la présentation
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    Animation · 40 secondes · sans son
                  </p>
                </div>
              </div>
            </button>
          )}
        </div>

        <div className="mt-8 flex flex-col items-center gap-4">
          <VisioDecouverteCalendlyLink />
          <p className="text-center text-xs text-slate-400">
            Astuce : cliquez sur play dans le lecteur pour dérouler l&apos;animation.
          </p>
        </div>
      </div>
    </section>
  );
}
