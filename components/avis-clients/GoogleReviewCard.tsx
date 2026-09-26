'use client';

import { useCallback, useId, useState } from 'react';
import Image from 'next/image';
import type { GoogleReviewEntry } from '@/data/googleReviews';
import { OFC_CARD } from '@/lib/ofc-interaction-classes';
import { StarRating } from '@/components/avis-clients/StarRating';

type GoogleReviewCardProps = {
  review: GoogleReviewEntry;
};

/** Carte avis Google — photo, étoiles, texte extensible. */
export function GoogleReviewCard({ review }: GoogleReviewCardProps) {
  const [expanded, setExpanded] = useState(false);
  const textId = useId();
  const subtitle = [review.optionalRole, review.optionalCompany].filter(Boolean).join(' — ');
  const isLong = review.text.length > 280;

  const toggle = useCallback(() => setExpanded((v) => !v), []);

  return (
    <article className={`${OFC_CARD} flex h-full flex-col p-6`}>
      <header className="flex items-start gap-4">
        {review.profilePhotoUrl ? (
          <Image
            src={review.profilePhotoUrl}
            alt=""
            width={48}
            height={48}
            className="h-12 w-12 shrink-0 rounded-full object-cover"
            unoptimized
          />
        ) : (
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-sm font-bold text-[var(--accent)]"
            aria-hidden="true"
          >
            {review.initials}
          </div>
        )}
        <div className="min-w-0 flex-1">
          {review.authorUrl ? (
            <a
              href={review.authorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-slate-900 hover:text-[var(--accent)]"
            >
              {review.author}
            </a>
          ) : (
            <p className="font-semibold text-slate-900">{review.author}</p>
          )}
          {subtitle ? <p className="mt-0.5 text-sm text-slate-600">{subtitle}</p> : null}
          <p className="mt-1 text-xs text-slate-500">
            {review.date}
            {review.relativeTime ? ` · ${review.relativeTime}` : null}
          </p>
        </div>
      </header>

      <StarRating rating={review.rating} size={16} className="mt-4" />

      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-700 md:text-base">
        <p
          id={textId}
          className={
            expanded || !isLong
              ? undefined
              : 'line-clamp-[5] [overflow-wrap:anywhere]'
          }
        >
          {review.text}
        </p>
        {isLong ? (
          <button
            type="button"
            onClick={toggle}
            className="mt-2 text-sm font-semibold text-[var(--accent)] hover:underline"
            aria-expanded={expanded}
            aria-controls={textId}
          >
            {expanded ? 'Réduire' : 'Lire la suite'}
          </button>
        ) : null}
      </blockquote>

      <footer className="mt-5 border-t border-slate-100 pt-3">
        <p className="text-xs font-medium text-slate-500">Avis Google</p>
      </footer>
    </article>
  );
}
