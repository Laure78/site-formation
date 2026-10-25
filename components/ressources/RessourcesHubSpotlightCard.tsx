import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Download, ExternalLink } from 'lucide-react';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import type { RessourceCatalogEntry } from '@/lib/ressources-catalog';
import {
  getRessourcePrimaryCta,
  getRessourceSpotlightBenefit,
} from '@/lib/ressources-catalog';
import { OFC_TYPE_BODY } from '@/lib/ofc-interaction-classes';

type Props = {
  resource: RessourceCatalogEntry;
};

export function RessourcesHubSpotlightCard({ resource }: Props) {
  const primaryCta = getRessourcePrimaryCta(resource);
  const benefit = getRessourceSpotlightBenefit(resource);
  const showDownload =
    Boolean(resource.downloadUrl) && !resource.requiresRegistration && resource.isFree;

  const primaryLinkClass =
    'inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#377CF3] px-4 py-2.5 text-base font-semibold text-white transition hover:bg-[#2d66d6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]';

  const primaryAction =
    resource.external ? (
      <ExternalLinkAnchor
        href={resource.viewUrl}
        className={primaryLinkClass}
        aria-label={`${primaryCta} — ${resource.title}`}
      >
        {primaryCta}
        <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
      </ExternalLinkAnchor>
    ) : (
      <Link
        href={resource.viewUrl}
        className={primaryLinkClass}
        aria-label={`${primaryCta} — ${resource.title}`}
      >
        {primaryCta}
        <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
      </Link>
    );

  return (
    <article className="ressources-spotlight-card flex h-full flex-col rounded-xl border border-slate-200/90 bg-white p-3.5 shadow-sm sm:p-5">
      {resource.image ? (
        <div className="relative mb-3 hidden aspect-[5/3] overflow-hidden rounded-lg bg-[#F2F2F2] sm:block">
          <Image
            src={resource.image.src}
            alt=""
            fill
            className="object-contain object-left"
            sizes="(max-width: 1024px) 33vw, 320px"
            quality={70}
          />
        </div>
      ) : null}

      <p className="text-xs font-semibold uppercase tracking-wide text-[#377CF3]">
        {resource.format}
      </p>

      <h2 className="mt-2 font-display text-lg font-bold leading-snug text-slate-900 md:text-xl">
        {resource.title}
      </h2>

      <p className={`${OFC_TYPE_BODY} mt-2 flex-1 text-ofc-ink-muted`}>{benefit}</p>

      <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-4">
        {primaryAction}
        {showDownload ? (
          <a
            href={resource.downloadUrl}
            download
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-base font-medium text-slate-700 transition hover:border-[#377CF3]/40 hover:text-[#377CF3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
            aria-label={`${resource.downloadLabel ?? 'Télécharger'} — ${resource.title}`}
          >
            <Download className="h-4 w-4 shrink-0" aria-hidden />
            {resource.downloadLabel ?? `Télécharger (${resource.format})`}
          </a>
        ) : null}
      </div>
    </article>
  );
}
