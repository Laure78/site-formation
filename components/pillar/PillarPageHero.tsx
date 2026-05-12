import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight, Calendar } from 'lucide-react';

export type PillarHeroCta = {
  href: string;
  label: string;
  /** `true` : lien absolu / nouvel onglet (Calendly). `false` : navigation interne (`Link`). */
  external?: boolean;
};

export type PillarPageHeroProps = {
  variant: 'immersive' | 'splitImage';
  /** Image de fond plein écran (variant immersive, ou split si besoin) */
  backgroundImageSrc?: string;
  backgroundImageAlt?: string;
  eyebrow: string;
  title: string;
  titleId: string;
  subtitle?: ReactNode;
  metaLine?: string;
  tags?: readonly string[];
  credibilityLine?: ReactNode;
  primaryCta: PillarHeroCta;
  secondaryCta?: PillarHeroCta;
  /** Colonne droite — portrait ou visuel page */
  sideImage?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    caption?: string;
  };
  /** Ligne de pied sous la ligne crédibilité (ex. page Claude) */
  bottomNote?: ReactNode;
  /** Hero moins haut, titres plus contenus (ex. page financement Constructys) */
  layoutDensity?: 'default' | 'compact';
};

/**
 * Hero page pilier — même langage visuel que `/claude-ai-btp` (dégradé OFC, CTA, tags).
 */
export function PillarPageHero({
  variant,
  backgroundImageSrc = '/images/claude-btp-hero-chantier-2026.png',
  backgroundImageAlt = '',
  eyebrow,
  title,
  titleId,
  subtitle,
  metaLine,
  tags,
  credibilityLine,
  primaryCta,
  secondaryCta,
  sideImage,
  bottomNote,
  layoutDensity = 'default',
}: PillarPageHeroProps) {
  const compact = layoutDensity === 'compact';

  const primaryBtnClass = compact
    ? 'inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-[#1E40AF] shadow-md shadow-black/15 transition hover:bg-white/95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
    : 'inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-semibold text-[#1E40AF] shadow-lg shadow-black/20 transition hover:scale-[1.02] hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

  const secondaryBtnClass = compact
    ? 'inline-flex items-center justify-center rounded-xl border border-white/45 bg-transparent px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/60 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
    : 'inline-flex items-center justify-center rounded-2xl border border-white/40 bg-transparent px-8 py-4 text-base font-semibold text-white transition hover:scale-[1.01] hover:border-white/60 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

  const primaryEl =
    primaryCta.external === false ? (
      <Link href={primaryCta.href} className={primaryBtnClass}>
        {primaryCta.label}
        <ArrowRight className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
      </Link>
    ) : (
      <a
        href={primaryCta.href}
        target="_blank"
        rel="noopener noreferrer"
        className={primaryBtnClass}
      >
        <Calendar className="h-5 w-5 shrink-0" aria-hidden />
        {primaryCta.label}
        <ArrowRight className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
      </a>
    );

  const secondaryEl =
    secondaryCta &&
    (secondaryCta.external === true ? (
      <a href={secondaryCta.href} target="_blank" rel="noopener noreferrer" className={secondaryBtnClass}>
        {secondaryCta.label}
      </a>
    ) : (
      <Link href={secondaryCta.href} className={secondaryBtnClass}>
        {secondaryCta.label}
      </Link>
    ));

  const contentBlock = (
    <>
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/80 md:text-xs">{eyebrow}</p>

      <h1
        id={titleId}
        className={
          compact
            ? 'mt-4 max-w-4xl text-3xl font-bold leading-[1.12] tracking-tight md:text-4xl lg:text-[42px] lg:leading-[1.08]'
            : 'mt-5 max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl lg:text-[56px] lg:leading-[1.06]'
        }
      >
        {title}
      </h1>

      {subtitle ? (
        <div
          className={
            compact
              ? 'mt-4 max-w-2xl text-base font-normal leading-relaxed text-white/90 md:text-lg'
              : 'mt-6 max-w-2xl text-lg font-normal leading-relaxed text-white/90 md:text-xl md:leading-relaxed'
          }
        >
          {subtitle}
        </div>
      ) : null}

      {metaLine ? (
        <p className={compact ? 'mt-4 text-xs text-white/80 md:text-sm' : 'mt-6 text-sm text-white/80 md:text-base'}>
          {metaLine}
        </p>
      ) : null}

      {tags && tags.length > 0 ? (
        <ul className={compact ? 'mt-4 flex flex-wrap gap-1.5' : 'mt-6 flex flex-wrap gap-2'} aria-label="Thématiques de la page">
          {tags.map((tag) => (
            <li key={tag}>
              <span
                className={
                  compact
                    ? 'inline-flex rounded-full border border-white/28 bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/95 backdrop-blur-sm md:text-xs'
                    : 'inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/95 backdrop-blur-sm'
                }
              >
                #{tag}
              </span>
            </li>
          ))}
        </ul>
      ) : null}

      <div className={compact ? 'mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap' : 'mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap'}>
        {primaryEl}
        {secondaryEl}
      </div>

      {credibilityLine ? (
        <div
          className={
            compact
              ? 'mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-white/20 pt-5 text-xs text-white/75 md:text-sm'
              : 'mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-white/20 pt-8 text-sm text-white/70'
          }
        >
          {credibilityLine}
        </div>
      ) : null}

      {bottomNote ? (
        <p className="mt-8 max-w-3xl text-center text-xs leading-relaxed text-white/65 md:text-left">{bottomNote}</p>
      ) : null}
    </>
  );

  return (
    <section
      className={
        compact
          ? 'relative min-h-0 overflow-hidden border-b border-white/10 text-white'
          : 'relative min-h-[520px] overflow-hidden border-b border-white/10 text-white md:min-h-[560px]'
      }
      aria-labelledby={titleId}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src={backgroundImageSrc}
          alt={backgroundImageAlt}
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#1E40AF]/85 via-[#377CF3]/82 to-[#2563EB]/85"
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:32px_32px]"
          aria-hidden
        />
      </div>

      <div
        className={
          compact
            ? 'relative mx-auto max-w-6xl px-4 py-10 md:py-14 lg:py-16'
            : 'relative mx-auto max-w-6xl px-4 py-14 md:py-20 lg:py-24'
        }
      >
        {variant === 'immersive' ? (
          <div className="max-w-4xl">{contentBlock}</div>
        ) : (
          <div
            className={
              compact
                ? 'grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(260px,360px)] lg:items-center lg:gap-10'
                : 'grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,400px)] lg:items-center lg:gap-12'
            }
          >
            <div className="min-w-0">{contentBlock}</div>
            {sideImage ? (
              <figure className="mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
                <div
                  className={
                    compact
                      ? 'overflow-hidden rounded-xl border border-white/25 bg-white/10 shadow-lg shadow-black/20 ring-1 ring-white/15'
                      : 'overflow-hidden rounded-2xl border border-white/25 bg-white/10 shadow-2xl shadow-black/25 ring-1 ring-white/20'
                  }
                >
                  <Image
                    src={sideImage.src}
                    alt={sideImage.alt}
                    width={sideImage.width}
                    height={sideImage.height}
                    className="h-auto w-full object-cover"
                    sizes="(max-width: 1024px) 100vw, 400px"
                    priority
                  />
                </div>
                {sideImage.caption ? (
                  <figcaption className="mt-3 text-center text-xs leading-relaxed text-white/75 lg:text-left">
                    {sideImage.caption}
                  </figcaption>
                ) : null}
              </figure>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
