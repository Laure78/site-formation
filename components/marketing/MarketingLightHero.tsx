import Image from 'next/image';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

export type MarketingLightHeroStat = {
  icon: LucideIcon;
  value: ReactNode;
  label: string;
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

export type MarketingLightHeroProps = {
  eyebrow: string;
  title: string;
  titleId: string;
  description: ReactNode;
  stats: readonly MarketingLightHeroStat[];
  /** Tarifs, CTAs, tags — inséré entre stats et navigation rapide */
  middle?: ReactNode;
  quickLinks?: readonly MarketingLightHeroQuickLink[];
  quickNavAriaLabel?: string;
  quickNavLabel?: string;
  heroVisual: MarketingLightHeroVisual;
};

/**
 * Hero marketing sobre — fond #F2F2F2, stats en cartes, visuel à droite (pages ressources, formations, financement).
 */
export function MarketingLightHero({
  eyebrow,
  title,
  titleId,
  description,
  stats,
  middle,
  quickLinks,
  quickNavAriaLabel = 'Accès rapide aux sections',
  quickNavLabel = 'Aller à',
  heroVisual,
}: MarketingLightHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-[#F2F2F2]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_100%_-10%,rgba(55,124,243,0.14),transparent_55%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-10 md:pb-16 md:pt-14">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(240px,320px)] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#377CF3]">{eyebrow}</p>
            <h1
              id={titleId}
              className="mt-3 max-w-4xl font-display text-3xl font-bold leading-tight tracking-tight text-slate-900 md:text-4xl lg:text-[2.65rem]"
            >
              {title}
            </h1>
            <div className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-700">{description}</div>

            <ul className="mt-8 grid gap-3 sm:grid-cols-3 sm:gap-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <li
                    key={stat.label}
                    className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-sm"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#377CF3]/10 text-[#377CF3]">
                      <Icon size={20} aria-hidden />
                    </span>
                    <div>
                      <p className="font-display text-xl font-bold text-slate-900">{stat.value}</p>
                      <p className="text-xs text-slate-600">{stat.label}</p>
                    </div>
                  </li>
                );
              })}
            </ul>

            {middle ? <div className="mt-8">{middle}</div> : null}

            {quickLinks && quickLinks.length > 0 ? (
              <nav
                aria-label={quickNavAriaLabel}
                className="mt-8 flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200/80 bg-white/80 p-3 shadow-sm backdrop-blur-sm md:p-4"
              >
                <span className="px-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 md:text-sm">
                  {quickNavLabel}
                </span>
                {quickLinks.map((link, index) => (
                  <span key={link.href} className="flex items-center gap-2">
                    {index > 0 ? <span className="hidden text-slate-300 sm:inline" aria-hidden>·</span> : null}
                    <Link
                      href={link.href}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-[#377CF3] shadow-sm transition hover:border-[#377CF3] hover:bg-[#377CF3]/5"
                    >
                      {link.label}
                    </Link>
                  </span>
                ))}
              </nav>
            ) : null}
          </div>

          <aside className="mx-auto w-full max-w-[280px] shrink-0 lg:mx-0 lg:max-w-none">
            <div className="overflow-hidden rounded-2xl bg-white/95 p-1 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.25)] ring-1 ring-slate-200/80">
              <Image
                src={heroVisual.src}
                alt={heroVisual.alt}
                title={heroVisual.title}
                width={heroVisual.width}
                height={heroVisual.height}
                priority
                className="h-auto w-full rounded-[0.85rem] object-cover"
                sizes="(max-width: 1024px) 280px, 360px"
              />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
