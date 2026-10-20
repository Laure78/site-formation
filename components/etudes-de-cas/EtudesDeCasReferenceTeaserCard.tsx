import Image from 'next/image';
import Link from 'next/link';
import type { EtudesDeCasReferenceTeaser } from '@/lib/etudes-de-cas-references-teaser';

type Props = {
  reference: EtudesDeCasReferenceTeaser;
};

export function EtudesDeCasReferenceTeaserCard({ reference }: Props) {
  return (
    <article
      className="flex h-full flex-col rounded-xl border border-slate-200/90 bg-white p-5 shadow-sm"
      aria-labelledby={`etudes-ref-${reference.id}-name`}
    >
      <div
        className={`mb-4 flex items-center justify-center rounded-lg bg-[#F8FAFC] px-4 ${
          reference.logo.imageClassName ? 'h-24' : 'h-16'
        }`}
      >
        <Image
          src={reference.logo.src}
          alt={reference.logo.alt}
          width={reference.logo.width}
          height={reference.logo.height}
          className={`w-auto max-w-full object-contain ${
            reference.logo.imageClassName ?? 'max-h-12'
          }`.trim()}
          sizes="(max-width: 640px) 50vw, 160px"
          loading="lazy"
          quality={70}
        />
      </div>

      <span className="inline-flex w-fit rounded-full bg-[#EFF6FF] px-3 py-1 text-xs font-semibold text-[var(--accent)]">
        {reference.relationshipLabel}
      </span>

      <h3
        id={`etudes-ref-${reference.id}-name`}
        className="font-display mt-3 text-base font-bold leading-snug text-slate-900 md:text-lg"
      >
        {reference.name}
      </h3>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{reference.hubDescription}</p>

      {reference.relatedLink ? (
        <p className="mt-4 border-t border-slate-100 pt-3 text-sm">
          <Link
            href={reference.relatedLink.href}
            className="font-medium text-[var(--accent)] hover:underline"
          >
            {reference.relatedLink.label} →
          </Link>
        </p>
      ) : null}
    </article>
  );
}
