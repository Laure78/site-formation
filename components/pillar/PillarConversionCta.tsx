import Link from 'next/link';
import type { ReactNode } from 'react';

type Props = {
  title: string;
  titleId: string;
  description: ReactNode;
  bullets?: readonly string[];
  footnote?: ReactNode;
  primaryCta: { href: string; label: string; external?: boolean };
  secondaryCta?: { href: string; label: string; external?: boolean };
  /**
   * `compact` : bandeau moins « massif », sans carte blanche interne — titres plus petits, CTA en ligne avec le texte.
   */
  variant?: 'default' | 'compact';
};

function renderPrimary(
  cta: { href: string; label: string; external?: boolean },
  btnClassName: string,
) {
  return cta.external === false ? (
    <Link href={cta.href} className={btnClassName}>
      {cta.label}
    </Link>
  ) : (
    <a href={cta.href} target="_blank" rel="noopener noreferrer" className={btnClassName}>
      {cta.label}
    </a>
  );
}

function renderSecondary(
  cta: { href: string; label: string; external?: boolean } | undefined,
  btnClassName: string,
) {
  if (!cta) return null;
  return cta.external === true ? (
    <a href={cta.href} target="_blank" rel="noopener noreferrer" className={btnClassName}>
      {cta.label}
    </a>
  ) : (
    <Link href={cta.href} className={btnClassName}>
      {cta.label}
    </Link>
  );
}

/**
 * Bandeau conversion fin de page — gradient OFC (aligné `/claude-ai-btp`).
 */
export function PillarConversionCta({
  title,
  titleId,
  description,
  bullets,
  footnote,
  primaryCta,
  secondaryCta,
  variant = 'default',
}: Props) {
  const isCompact = variant === 'compact';

  const primaryDefault =
    'inline-flex items-center justify-center rounded-2xl border-2 border-[#1E40AF] bg-[#EFF6FF] px-8 py-4 text-center text-base font-semibold text-[#1E40AF] shadow-lg transition hover:scale-[1.02] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF]';

  const secondaryDefault =
    'inline-flex items-center justify-center rounded-2xl border-2 border-[#377CF3] bg-transparent px-8 py-4 text-center text-base font-semibold text-[#377CF3] transition hover:bg-[#EFF6FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]';

  const primaryCompact =
    'inline-flex min-h-[42px] items-center justify-center rounded-xl bg-white px-5 py-2.5 text-center text-sm font-semibold text-[#1E40AF] shadow-sm transition hover:bg-white/95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

  const secondaryCompact =
    'inline-flex min-h-[42px] items-center justify-center rounded-xl border border-white/70 bg-white/10 px-5 py-2.5 text-center text-sm font-semibold text-white backdrop-blur-[2px] transition hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

  const primary = renderPrimary(primaryCta, isCompact ? primaryCompact : primaryDefault);
  const secondary = renderSecondary(secondaryCta, isCompact ? secondaryCompact : secondaryDefault);

  if (isCompact) {
    return (
      <section
        className="relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-[#1E40AF] via-[#377CF3] to-[#2563EB] px-5 py-8 text-white shadow-[0_12px_40px_-12px_rgba(30,64,175,0.35)] md:px-8 md:py-9"
        aria-labelledby={titleId}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:24px_24px]"
          aria-hidden
        />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <div className="min-w-0 max-w-2xl">
            <h2 id={titleId} className="font-display text-xl font-bold leading-snug tracking-tight text-white md:text-2xl">
              {title}
            </h2>
            <div className="mt-2.5 text-sm leading-relaxed text-white/90 md:text-[15px]">{description}</div>
            {bullets && bullets.length > 0 ? (
              <ul className="mt-4 grid gap-1.5 text-xs text-white/85 sm:grid-cols-2 sm:gap-x-4">
                {bullets.map((b) => (
                  <li key={b}>• {b}</li>
                ))}
              </ul>
            ) : null}
            {footnote ? <div className="mt-4 text-xs leading-relaxed text-white/65">{footnote}</div> : null}
          </div>

          <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row sm:items-center lg:flex-col lg:items-stretch xl:flex-row">
            {primary}
            {secondary}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative overflow-hidden border-t border-white/10 bg-gradient-to-br from-[#1E40AF] via-[#377CF3] to-[#2563EB] px-6 py-16 text-white md:px-10 md:py-20"
      aria-labelledby={titleId}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:28px_28px]"
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <h2 id={titleId} className="font-display text-3xl font-bold leading-tight tracking-tight text-white md:text-[40px]">
            {title}
          </h2>
          <div className="mt-5 max-w-2xl text-sm leading-relaxed text-white/90 md:text-base">{description}</div>
          {bullets && bullets.length > 0 ? (
            <ul className="mt-6 grid gap-2 text-sm text-white/85 sm:grid-cols-2">
              {bullets.map((b) => (
                <li key={b}>• {b}</li>
              ))}
            </ul>
          ) : null}
          {footnote ? <div className="mt-6 text-xs leading-relaxed text-white/70">{footnote}</div> : null}
        </div>

        <div className="flex flex-col justify-center rounded-3xl border border-white/25 bg-white p-8 text-[#0F172A] shadow-2xl">
          <div className="flex flex-col gap-4">
            {primary}
            {secondary}
          </div>
        </div>
      </div>
    </section>
  );
}
