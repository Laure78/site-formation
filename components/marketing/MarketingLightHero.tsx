import Image from 'next/image';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { ContentUpdatedLine } from '@/components/seo/ContentUpdatedLine';
import { IndicateursResultatsLink } from '@/components/formation/IndicateursResultatsLink';
import { Badge } from '@/components/ui/Badge';
import { OFC_TYPE_HERO, OFC_TYPE_LEAD } from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';

export type MarketingLightHeroStat = {
  icon: LucideIcon;
  value: ReactNode;
  label: string;
  /** Ancre ou URL — rend la carte cliquable */
  href?: string;
};

export type MarketingLightHeroQuickLink = {
  href: string;
  label: string;
};

export type MarketingLightHeroVisual = {
  src: string;
  alt: string;
  title?: string;
  width: number;
  height: number;
};

export type MarketingLightHeroVisualSlot = {
  visual: MarketingLightHeroVisual;
  shape?: 'card' | 'circle';
  href?: string;
  linkTitle?: string;
};

export type MarketingLightHeroProps = {
  eyebrow: string;
  title: string;
  titleId: string;
  /** Date de mise à jour figée (YYYY-MM-DD) — affichée sous le H1. */
  contentUpdatedAt?: string;
  description: ReactNode;
  /** Cartes stats optionnelles — absentes = pas de bandeau chiffres. */
  stats?: readonly MarketingLightHeroStat[];
  /** Tarifs, CTAs, tags — après description (et stats si présentes) */
  middle?: ReactNode;
  quickLinks?: readonly MarketingLightHeroQuickLink[];
  quickNavAriaLabel?: string;
  quickNavLabel?: string;
  heroVisual: MarketingLightHeroVisual;
  visualShape?: 'card' | 'circle';
  visualHref?: string;
  visualLinkTitle?: string;
  /** Illustration additionnelle sous le visuel principal (ex. guide PDF sur /ressources) */
  extraVisual?: MarketingLightHeroVisualSlot;
};

function HeroVisualBlock({
  visual,
  shape = 'card',
  href,
  linkTitle,
  priority = false,
}: MarketingLightHeroVisualSlot & { priority?: boolean }) {
  const image = (
    <Image
      src={visual.src}
      alt={visual.alt}
      title={visual.title}
      width={visual.width}
      height={visual.height}
      priority={priority}
      className={
        shape === 'circle'
          ? 'h-auto w-full object-contain'
          : 'h-auto w-full rounded-[1.05rem] object-cover'
      }
      sizes="(max-width: 1024px) 280px, 360px"
      quality={75}
    />
  );

  const shell =
    shape === 'circle' ? (
      <div className="overflow-hidden rounded-full shadow-ofc-lg ring-4 ring-white">
        {image}
      </div>
    ) : (
      <div className="ofc-card overflow-hidden bg-white/95 p-1.5">
        {image}
      </div>
    );

  if (href) {
    return (
      <Link
        href={href}
        title={linkTitle ?? visual.alt}
        className="block transition hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
      >
        {shell}
      </Link>
    );
  }

  return shell;
}

/**
 * Hero marketing premium — canvas aéré, typo forte, visuel à droite.
 * Utilisé sur catalogue, ressources, etc.
 */
export function MarketingLightHero({
  eyebrow,
  title,
  titleId,
  contentUpdatedAt,
  description,
  stats,
  middle,
  quickLinks,
  quickNavAriaLabel = 'Accès rapide aux sections',
  quickNavLabel = 'Aller à',
  heroVisual,
  visualShape = 'card',
  visualHref,
  visualLinkTitle,
  extraVisual,
}: MarketingLightHeroProps) {
  return (
    <section className={`${OFC_SEC.hero} relative overflow-hidden`}>
      <div className="relative mx-auto max-w-[80rem]">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(260px,380px)] lg:gap-14">
          <div className="min-w-0">
            <Badge>{eyebrow}</Badge>
            <h1 id={titleId} className={`${OFC_TYPE_HERO} mt-5 max-w-[18ch]`}>
              {title}
            </h1>
            {contentUpdatedAt ? <ContentUpdatedLine date={contentUpdatedAt} /> : null}
            <div className={`${OFC_TYPE_LEAD} mt-5 max-w-2xl text-ofc-ink-muted`}>{description}</div>

            {stats && stats.length > 0 ? (
              <>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
                  {stats.map((stat) => {
                    const Icon = stat.icon;
                    const content = (
                      <>
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ofc-accent-soft text-ofc-accent">
                          <Icon size={20} aria-hidden />
                        </span>
                        <div>
                          <p className="font-display text-xl font-extrabold tracking-tight text-ofc-ink">
                            {stat.value}
                          </p>
                          <p className="text-xs text-ofc-ink-subtle">{stat.label}</p>
                        </div>
                      </>
                    );
                    const cardClass =
                      'ofc-card flex w-full items-center gap-3 px-4 py-3';
                    return (
                      <li key={stat.label}>
                        {stat.href ? (
                          <Link
                            href={stat.href}
                            className={`${cardClass} transition hover:border-ofc-accent/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]`}
                          >
                            {content}
                          </Link>
                        ) : (
                          <div className={cardClass}>{content}</div>
                        )}
                      </li>
                    );
                  })}
                </ul>
                <IndicateursResultatsLink className="mt-3" />
              </>
            ) : null}

            {middle ? <div className="mt-8">{middle}</div> : null}

            {quickLinks && quickLinks.length > 0 ? (
              <nav
                aria-label={quickNavAriaLabel}
                className="ofc-card mt-8 flex flex-wrap items-center gap-2 p-3 md:p-4"
              >
                <span className="px-1 text-xs font-semibold uppercase tracking-[0.14em] text-ofc-ink-subtle md:text-sm">
                  {quickNavLabel}
                </span>
                {quickLinks.map((link, index) => (
                  <span key={link.href} className="flex items-center gap-2">
                    {index > 0 ? (
                      <span className="hidden text-ofc-border-strong sm:inline" aria-hidden>
                        ·
                      </span>
                    ) : null}
                    <Link
                      href={link.href}
                      className="rounded-full border border-ofc-border bg-white px-3 py-1.5 text-sm font-medium text-ofc-accent transition hover:border-ofc-accent"
                    >
                      {link.label}
                    </Link>
                  </span>
                ))}
              </nav>
            ) : null}
          </div>

          <aside className="mx-auto flex w-full max-w-[300px] shrink-0 flex-col gap-5 lg:mx-0 lg:max-w-none">
            <HeroVisualBlock
              visual={heroVisual}
              shape={visualShape}
              href={visualHref}
              linkTitle={visualLinkTitle}
              priority
            />
            {extraVisual ? <HeroVisualBlock {...extraVisual} /> : null}
          </aside>
        </div>
      </div>
    </section>
  );
}
