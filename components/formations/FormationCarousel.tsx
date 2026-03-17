'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface FormationCarouselSlide {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface FormationCarouselProps {
  slides: FormationCarouselSlide[];
  title?: string;
  className?: string;
}

export function FormationCarousel({ slides, title, className = '' }: FormationCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!slides.length) return null;

  const goNext = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
  const goPrev = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className={`overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 ${className}`}>
      {title && (
        <h3 className="border-b border-slate-200 bg-white px-6 py-4 font-display text-lg font-semibold text-slate-900">
          {title}
        </h3>
      )}
      <div className="relative">
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          <Image
            src={slides[currentIndex].src}
            alt={slides[currentIndex].alt}
            fill
            className="object-cover transition-opacity duration-300"
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </div>
        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg transition-colors hover:bg-white"
              aria-label="Slide précédent"
            >
              <ChevronLeft size={24} strokeWidth={2} className="text-slate-700" />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg transition-colors hover:bg-white"
              aria-label="Slide suivant"
            >
              <ChevronRight size={24} strokeWidth={2} className="text-slate-700" />
            </button>
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    i === currentIndex ? 'bg-[var(--accent)]' : 'bg-white/60 hover:bg-white/80'
                  }`}
                  aria-label={`Aller à la slide ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
