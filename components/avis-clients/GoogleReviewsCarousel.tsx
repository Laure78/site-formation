'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { GoogleReviewEntry } from '@/data/googleReviews';
import { GoogleReviewCard } from '@/components/avis-clients/GoogleReviewCard';

type GoogleReviewsCarouselProps = {
  reviews: GoogleReviewEntry[];
};

/** Largeur d’une carte selon la fenêtre (1 / 2 / 3 visibles). */
function getSlideStride(container: HTMLElement): number {
  const first = container.querySelector<HTMLElement>('[data-review-slide]');
  if (!first) return container.clientWidth;
  const gap = parseFloat(getComputedStyle(container).columnGap || getComputedStyle(container).gap || '0');
  return first.offsetWidth + (Number.isFinite(gap) ? gap : 0);
}

/**
 * Carrousel horizontal d’avis Google — repli sans widget Elfsight.
 * Desktop 3 · tablette 2 · mobile 1 — flèches + défilement tactile.
 */
export function GoogleReviewsCarousel({ reviews }: GoogleReviewsCarouselProps) {
  const regionId = useId();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const syncArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < maxScroll - 8);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    syncArrows();
    el.addEventListener('scroll', syncArrows, { passive: true });
    const ro = new ResizeObserver(syncArrows);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', syncArrows);
      ro.disconnect();
    };
  }, [reviews.length, syncArrows]);

  const scrollBySlides = useCallback((direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const stride = getSlideStride(el);
    el.scrollBy({ left: direction * stride, behavior: 'smooth' });
  }, []);

  if (reviews.length === 0) return null;

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] hidden w-12 bg-gradient-to-r from-white to-transparent md:block" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] hidden w-12 bg-gradient-to-l from-white to-transparent md:block" />

      <div
        id={regionId}
        ref={scrollerRef}
        role="region"
        aria-roledescription="carrousel"
        aria-label="Avis Google des clients"
        tabIndex={0}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((review) => (
          <div
            key={review.id}
            data-review-slide
            className="w-[min(100%,calc(100%-0px))] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
          >
            <GoogleReviewCard review={review} />
          </div>
        ))}
      </div>

      {reviews.length > 1 ? (
        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => scrollBySlides(-1)}
            disabled={!canPrev}
            aria-controls={regionId}
            aria-label="Avis précédents"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={20} strokeWidth={1.5} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollBySlides(1)}
            disabled={!canNext}
            aria-controls={regionId}
            aria-label="Avis suivants"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight size={20} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
