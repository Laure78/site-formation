import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight, Award, Calendar } from 'lucide-react';
import {
  OFC_CTA_GHOST_ON_ACCENT,
  OFC_CTA_ON_ACCENT,
  OFC_CTA_PRIMARY,
  OFC_CTA_SECONDARY,
} from '@/lib/ofc-interaction-classes';

export type PillarHeroCta = {
  href: string;
  label: string;
  /** `true` : lien absolu / nouvel onglet (Calendly). `false` : navigation interne (`Link`). */
  external?: boolean;
};

export type PillarPageHeroProps = {
  variant: 'immersive' | 'splitImage';
  /**
   * `brand` : photo chantier + dégradé bleu (pages pilier classiques).
   * `muted` : fond neutre charte (#F2F2F2), texte foncé, accent #377CF3 — évite le « plein bleu ».
   */
  surface?: 'brand' | 'muted';
  /** Image de fond plein écran (variant immersive, ou split si besoin) — ignorée si surface === muted */
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
 * Hero page pilier — fond bleu « brand » ou variante sobre `surface="muted"` (charte OFC).
 */
export function PillarPageHero({
  variant,
  surface = 'brand',
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
  const muted = surface === 'muted';

  const primaryBtnClass = muted
    ? `${OFC_CTA_PRIMARY} inline-flex items-center justify-center gap-2 ${compact ? 'rounded-xl px-5 py-2.5 text-sm shadow-[0_10px_30px_-6px_rgba(55,124,243,0.45)]' : ''}`
    : `${OFC_CTA_ON_ACCENT} inline-flex items-center justify-center gap-2 ${compact ? 'rounded-xl px-5 py-2.5 text-sm' : 'rounded-2xl'}`;

  const secondaryBtnClass = muted
    ? `${OFC_CTA_SECONDARY} inline-flex items-center justify-center ${compact ? 'px-5 py-2.5 text-sm' : ''}`
    : `${OFC_CTA_GHOST_ON_ACCENT} inline-flex items-center justify-center gap-2 ${compact ? 'rounded-xl px-5 py-2.5 text-sm' : 'rounded-2xl'}`;

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
      <p
        className={
          muted
            ? 'font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-[#377CF3] md:text-xs md:tracking-[0.26em]'
            : 'text-[11px] font-semibold uppercase tracking-[0.28em] text-white/80 md:text-xs'
        }
      >
        {eyebrow}
      </p>

      <h1
        id={titleId}
        className={
          muted
            ? compact
              ? 'font-display mt-4 max-w-4xl text-3xl font-bold leading-[1.14] tracking-tight text-[#0F172A] md:text-4xl lg:text-[2.625rem]'
              : 'font-display mt-5 max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight text-[#0F172A] md:text-5xl lg:text-[2.85rem]'
            : compact
              ? 'mt-4 max-w-4xl text-3xl font-bold leading-[1.12] tracking-tight md:text-4xl lg:text-[42px] lg:leading-[1.08]'
              : 'mt-5 max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl lg:text-[56px] lg:leading-[1.06]'
        }
      >
        {title}
      </h1>

      {subtitle ? (
        <div
          className={
            muted
              ? compact
                ? 'mt-5 max-w-2xl text-base font-normal leading-relaxed text-[#475569] md:text-lg'
                : 'mt-6 max-w-2xl text-lg font-normal leading-relaxed text-[#475569]'
              : compact
                ? 'mt-4 max-w-2xl text-base font-normal leading-relaxed text-white/90 md:text-lg'
                : 'mt-6 max-w-2xl text-lg font-normal leading-relaxed text-white/90 md:text-xl md:leading-relaxed'
          }
        >
          {subtitle}
        </div>
      ) : null}

      {metaLine ? (
        <p
          className={
            muted
              ? compact
                ? 'mt-4 text-xs text-[#64748B] md:text-sm'
                : 'mt-5 text-sm text-[#64748B] md:text-base'
              : compact
                ? 'mt-4 text-xs text-white/80 md:text-sm'
                : 'mt-6 text-sm text-white/80 md:text-base'
          }
        >
          {metaLine}
        </p>
      ) : null}

      {tags && tags.length > 0 ? (
        <ul className={compact ? 'mt-5 flex flex-wrap gap-2' : 'mt-7 flex flex-wrap gap-2'} aria-label="Thématiques de la page">
          {tags.map((tag) => (
            <li key={tag}>
              <span
                className={
                  muted
                    ? compact
                      ? 'inline-flex rounded-full border border-slate-200/90 bg-white px-2.5 py-1 text-[11px] font-medium text-[#475569] shadow-[0_1px_2px_rgba(15,23,42,0.05)] md:text-xs'
                      : 'inline-flex rounded-full border border-slate-200/90 bg-white px-3 py-1.5 text-xs font-medium text-[#475569] shadow-[0_1px_2px_rgba(15,23,42,0.06)]'
                    : compact
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
            muted
              ? compact
                ? 'mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-slate-200/90 pt-5 text-xs text-[#475569] md:text-sm'
                : 'mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-slate-200/90 pt-8 text-sm text-[#475569]'
              : compact
                ? 'mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-white/20 pt-5 text-xs text-white/75 md:text-sm'
                : 'mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-white/20 pt-8 text-sm text-white/70'
          }
        >
          {credibilityLine}
        </div>
      ) : null}

      {bottomNote ? (
        <p
          className={
            muted
              ? 'mt-8 max-w-3xl text-center text-xs leading-relaxed text-[#64748B] md:text-left'
              : 'mt-8 max-w-3xl text-center text-xs leading-relaxed text-white/65 md:text-left'
          }
        >
          {bottomNote}
        </p>
      ) : null}
    </>
  );

  return (
    <section
      className={
        muted
          ? compact
            ? 'relative min-h-0 overflow-hidden border-b border-slate-200/80 bg-[#F2F2F2] text-[#0F172A]'
            : 'relative min-h-0 overflow-hidden border-b border-slate-200/80 bg-[#F2F2F2] pb-6 text-[#0F172A] md:pb-8'
          : compact
            ? 'relative min-h-0 overflow-hidden border-b border-white/10 text-white'
            : 'relative min-h-[520px] overflow-hidden border-b border-white/10 text-white md:min-h-[560px]'
      }
      aria-labelledby={titleId}
    >
      {muted ? (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="absolute -right-24 -top-28 h-[22rem] w-[22rem] rounded-full bg-[#377CF3]/[0.07] blur-2xl" />
          <div className="absolute -bottom-40 -left-20 h-[24rem] w-[24rem] rounded-full bg-[#D4E3FC]/60 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,rgba(55,124,243,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(55,124,243,0.06)_1px,transparent_1px)] [background-size:48px_48px]"
            aria-hidden
          />
        </div>
      ) : (
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
      )}

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
              <figure className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
                <div
                  className={
                    muted
                      ? compact
                        ? 'relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_20px_48px_-16px_rgba(15,23,42,0.14)] ring-4 ring-white'
                        : 'relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-[0_24px_56px_-18px_rgba(15,23,42,0.16)] ring-4 ring-white'
                      : compact
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
                  {muted ? (
                    <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-xl border border-slate-200/90 bg-white/95 px-3 py-2 shadow-md backdrop-blur-sm">
                      <Award className="h-4 w-4 shrink-0 text-[#377CF3]" aria-hidden strokeWidth={2} />
                      <span className="text-[11px] font-bold uppercase tracking-wide text-[#377CF3] md:text-xs">Qualiopi</span>
                    </div>
                  ) : null}
                </div>
                {sideImage.caption ? (
                  <figcaption
                    className={
                      muted
                        ? 'mt-4 text-center text-xs leading-relaxed text-[#64748B] lg:text-left'
                        : 'mt-3 text-center text-xs leading-relaxed text-white/75 lg:text-left'
                    }
                  >
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
