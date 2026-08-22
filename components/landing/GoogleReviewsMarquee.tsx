'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import type { ReviewMarqueeItem } from '@/lib/google-reviews-marquee';

function ReviewCard({
  review,
  decorativeAvatar,
}: {
  review: ReviewMarqueeItem;
  /** Doublon carrousel : avatar décoratif (nom lisible dans le texte). */
  decorativeAvatar?: boolean;
}) {
  const avatarAlt = decorativeAvatar ? '' : `Photo de profil Google — ${review.authorName}`;
  return (
    <article
      className="w-[min(100vw-3rem,20rem)] shrink-0 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-[0_4px_20px_-8px_rgba(15,23,42,0.12)] sm:w-[22rem] sm:p-5"
    >
      <div className="flex items-start gap-3">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-slate-100">
          {review.profilePhotoUrl ? (
            <Image
              src={review.profilePhotoUrl}
              alt={avatarAlt}
              fill
              className="object-cover"
              sizes="40px"
            
              quality={70}
              loading="lazy"/>
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm font-bold text-slate-500">
              {review.authorName.charAt(0)}
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-slate-900">{review.authorName}</p>
          {review.relativeTime ? (
            <p className="text-xs text-slate-500">{review.relativeTime}</p>
          ) : null}
        </div>
      </div>
      <div className="mt-2 flex gap-0.5 text-amber-400">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className="shrink-0"
            fill={i < review.rating ? 'currentColor' : 'none'}
            strokeWidth={1.5}
            aria-hidden
          />
        ))}
      </div>
      <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-slate-700">
        « {review.text} »
      </p>
      {review.authorUrl ? (
        <a
          href={review.authorUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-xs font-medium text-[var(--accent)] hover:underline"
        >
          Avis Google
        </a>
      ) : null}
    </article>
  );
}

function ReviewRow({
  items,
  idSuffix = '',
  decorativeAvatar,
}: {
  items: ReviewMarqueeItem[];
  idSuffix?: string;
  decorativeAvatar?: boolean;
}) {
  return (
    <>
      {items.map((review) => (
        <ReviewCard
          key={`${review.id}${idSuffix}`}
          review={review}
          decorativeAvatar={decorativeAvatar}
        />
      ))}
    </>
  );
}

export function GoogleReviewsMarquee({ reviews }: { reviews: ReviewMarqueeItem[] }) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const handler = () => setReduceMotion(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  if (reviews.length === 0) return null;

  return (
    <div className="relative -mx-4 overflow-hidden sm:mx-0">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-slate-50 to-transparent sm:w-16"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-slate-50 to-transparent sm:w-16"
        aria-hidden
      />
      {reduceMotion ? (
        <div className="flex flex-wrap justify-center gap-4 px-4 py-2">
          <ReviewRow items={reviews} />
        </div>
      ) : (
        <div className="flex w-max animate-marquee-reviews will-change-transform">
          <div className="flex items-stretch gap-5 pr-5">
            <ReviewRow items={reviews} idSuffix="-a" />
          </div>
          <div className="flex items-stretch gap-5 pr-5" aria-hidden>
            <ReviewRow items={reviews} idSuffix="-b" decorativeAvatar />
          </div>
        </div>
      )}
    </div>
  );
}
