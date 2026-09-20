import Link from 'next/link';
import type { ReactNode } from 'react';
import { Download } from 'lucide-react';
import { LINKS } from '@/lib/internal-links';
import { FormationHeroPhoto } from '@/components/formations/FormationHeroPhoto';
import { CataloguePriceBadge } from '@/components/formations/CataloguePriceBadge';
import { FormationHeroOutilsNote } from '@/components/formations/FormationHeroOutilsNote';
import { getFormationCatalogueByRef } from '@/lib/formations-catalogue-display';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY, OFC_LINK } from '@/lib/ofc-interaction-classes';
import { cn } from '@/lib/cn';

export type TrainingHeroBadge = {
  label: string;
  variant?: 'category' | 'level' | 'accent';
};

export type TrainingHeroCta = {
  href: string;
  label: string;
  download?: string | boolean;
  primary?: boolean;
};

type Props = {
  title: ReactNode;
  titleId?: string;
  subtitle?: string;
  /** Accroche courte (2–3 lignes). */
  lead?: ReactNode;
  badges?: TrainingHeroBadge[];
  /** Ligne meta : « 4 h · Présentiel · Île-de-France · 8 participants max. » */
  metaLine?: string;
  /** Tarif libre (ex. prix de lancement) — sinon CataloguePriceBadge si catalogueRef. */
  priceSlot?: ReactNode;
  catalogueRef?: string;
  primaryCta?: TrainingHeroCta;
  secondaryCta?: TrainingHeroCta;
  /** Lien texte discret (parcours, programme ancré). */
  textLink?: { href: string; label: string };
  media?: ReactNode;
  summaryTitle?: string;
  summaryItems?: string[];
  className?: string;
  backHref?: string;
  backLabel?: string;
};

/**
 * Hero commun fiches formation — badges, H1, meta, tarif, 2 CTA max + lien discret.
 */
export function TrainingHero({
  title,
  titleId = 'formation-h1',
  subtitle,
  lead,
  badges,
  metaLine,
  priceSlot,
  catalogueRef,
  primaryCta,
  secondaryCta,
  textLink,
  media,
  summaryTitle = 'En résumé',
  summaryItems,
  className,
  backHref = LINKS.formations,
  backLabel = 'Catalogue des formations',
}: Props) {
  const catalogueEntry = catalogueRef ? getFormationCatalogueByRef(catalogueRef) : undefined;
  const resolvedMedia =
    media ??
    (catalogueEntry ? (
      <FormationHeroPhoto
        src={catalogueEntry.visuel.src}
        alt={catalogueEntry.visuel.alt}
        width={catalogueEntry.visuel.width}
        height={catalogueEntry.visuel.height}
        title={
          'title' in catalogueEntry.visuel && typeof catalogueEntry.visuel.title === 'string'
            ? catalogueEntry.visuel.title
            : undefined
        }
        priority
      />
    ) : null);

  return (
    <section className={cn('border-b border-slate-200 bg-white px-4 py-10 md:py-14', className)}>
      <div className="mx-auto max-w-[70rem]">
        <Link href={backHref} className={`${OFC_LINK} text-sm`}>
          {backLabel}
        </Link>

        <div
          className={`mt-6 grid items-start gap-10 ${
            resolvedMedia || summaryItems?.length
              ? 'lg:grid-cols-[minmax(0,1.15fr)_minmax(260px,0.85fr)] lg:gap-12'
              : ''
          }`}
        >
          <div className="min-w-0">
            {badges && badges.length > 0 ? (
              <ul className="flex flex-wrap gap-2" aria-label="Catégorie et niveau">
                {badges.map((b) => (
                  <li key={b.label}>
                    <span
                      className={cn(
                        'inline-flex rounded-full px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.12em]',
                        b.variant === 'accent'
                          ? 'bg-[#377CF3] text-white'
                          : b.variant === 'level'
                            ? 'bg-[#377CF3]/10 text-[#377CF3]'
                            : 'border border-slate-200 bg-slate-50 text-slate-700',
                      )}
                    >
                      {b.label}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}

            <h1
              id={titleId}
              className="mt-4 font-display text-[clamp(1.75rem,3.5vw,2.65rem)] font-bold leading-[1.12] tracking-tight text-slate-900"
            >
              {title}
            </h1>
            {subtitle ? (
              <p className="mt-3 max-w-xl text-lg font-medium leading-snug text-slate-700">{subtitle}</p>
            ) : null}
            {lead ? (
              <div className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 [&_a]:font-medium [&_a]:text-[#377CF3] [&_a]:hover:underline [&_strong]:font-semibold">
                {lead}
              </div>
            ) : null}

            {metaLine ? (
              <p className="mt-5 text-sm font-medium text-slate-800">{metaLine}</p>
            ) : null}

            {priceSlot ? (
              <div className="mt-5">{priceSlot}</div>
            ) : catalogueEntry ? (
              <div className="mt-5">
                <CataloguePriceBadge
                  level={catalogueEntry.level}
                  duree={catalogueEntry.duree}
                  variant="hero"
                  labelOverride={catalogueEntry.tarifParcoursLabel}
                />
              </div>
            ) : null}

            {catalogueRef ? (
              <FormationHeroOutilsNote catalogueRef={catalogueRef} className="mt-5 max-w-xl" />
            ) : null}

            {(primaryCta || secondaryCta) && (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {primaryCta ? (
                  <a
                    href={primaryCta.href}
                    {...(primaryCta.download
                      ? {
                          download:
                            typeof primaryCta.download === 'string'
                              ? primaryCta.download
                              : true,
                        }
                      : {})}
                    className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center gap-2 px-6 py-3`}
                  >
                    {primaryCta.label}
                  </a>
                ) : null}
                {secondaryCta ? (
                  <a
                    href={secondaryCta.href}
                    {...(secondaryCta.download
                      ? {
                          download:
                            typeof secondaryCta.download === 'string'
                              ? secondaryCta.download
                              : true,
                        }
                      : {})}
                    className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center gap-2 px-6 py-3`}
                  >
                    {secondaryCta.download ? (
                      <Download className="h-4 w-4 shrink-0" aria-hidden />
                    ) : null}
                    {secondaryCta.label}
                  </a>
                ) : null}
              </div>
            )}

            {textLink ? (
              <p className="mt-4 text-sm">
                <a href={textLink.href} className={OFC_LINK}>
                  {textLink.label}
                </a>
              </p>
            ) : null}

            {catalogueRef ? (
              <p className="mt-3 text-sm">
                <a href="#informations-pratiques" className={OFC_LINK}>
                  Informations réglementaires Qualiopi
                </a>
              </p>
            ) : null}
          </div>

          {(resolvedMedia || (summaryItems && summaryItems.length > 0)) && (
            <aside className="min-w-0 space-y-5">
              {resolvedMedia}
              {summaryItems && summaryItems.length > 0 ? (
                <div className="rounded-xl border border-slate-200/90 bg-slate-50/80 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">
                    {summaryTitle}
                  </p>
                  <ul className="mt-3 space-y-2.5 text-sm text-slate-700">
                    {summaryItems.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#377CF3]"
                          aria-hidden
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
