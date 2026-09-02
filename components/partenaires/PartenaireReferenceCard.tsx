import Image from 'next/image';
import Link from 'next/link';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import type { PartenaireReference } from '@/lib/partenaires-references-config';

type Props = {
  reference: PartenaireReference;
};

export function PartenaireReferenceCard({ reference }: Props) {
  const displayName = reference.shortName ?? reference.name;

  return (
    <article
      id={reference.id}
      className="scroll-mt-24 flex h-full flex-col rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm"
      aria-labelledby={`${reference.id}-name`}
    >
      <div className="mb-4 flex h-16 items-center justify-center rounded-lg bg-[#F8FAFC] px-4">
        <Image
          src={reference.logo.src}
          alt={reference.logo.alt}
          width={reference.logo.width}
          height={reference.logo.height}
          className="max-h-12 w-auto max-w-full object-contain"
          sizes="160px"
          loading="lazy"
          quality={70}
        />
      </div>

      <span className="inline-flex w-fit rounded-full bg-[#EFF6FF] px-3 py-1 text-xs font-semibold text-[#377CF3]">
        {reference.relationshipLabel}
      </span>

      <h3
        id={`${reference.id}-name`}
        className="font-display mt-3 text-lg font-bold text-[#0F172A]"
      >
        {reference.name}
      </h3>
      <p className="mt-0.5 text-xs font-medium text-[#64748B]">{reference.organizationType}</p>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-[#475569]">
        {reference.interventionSummary}
      </p>

      <p className="mt-3 text-sm text-[#334155]">
        <span className="font-semibold text-[#0F172A]">Public : </span>
        {reference.audiences.join(' · ')}
      </p>

      {reference.topics.length > 0 ? (
        <p className="mt-2 text-sm text-[#334155]">
          <span className="font-semibold text-[#0F172A]">Sujets : </span>
          {reference.topics.join(' · ')}
        </p>
      ) : null}

      <div className="mt-4 flex flex-col gap-2 border-t border-[#F1F5F9] pt-4">
        {reference.proofUrl && reference.proofLabel ? (
          <Link
            href={reference.proofUrl}
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[#377CF3] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2563EB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
          >
            {reference.proofLabel}
          </Link>
        ) : null}
        <ExternalLinkAnchor
          href={reference.officialUrl}
          className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-[#CBD5E1] px-4 py-2 text-sm font-semibold text-[#0F172A] hover:border-[#377CF3] hover:text-[#377CF3]"
        >
          Site officiel — {displayName}
        </ExternalLinkAnchor>
      </div>
    </article>
  );
}
