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
};

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
}: Props) {
  const primary =
    primaryCta.external === false ? (
      <Link
        href={primaryCta.href}
        className="inline-flex items-center justify-center rounded-2xl border-2 border-[#1E40AF] bg-[#EFF6FF] px-8 py-4 text-center text-base font-semibold text-[#1E40AF] shadow-lg transition hover:scale-[1.02] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF]"
      >
        {primaryCta.label}
      </Link>
    ) : (
      <a
        href={primaryCta.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-2xl border-2 border-[#1E40AF] bg-[#EFF6FF] px-8 py-4 text-center text-base font-semibold text-[#1E40AF] shadow-lg transition hover:scale-[1.02] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF]"
      >
        {primaryCta.label}
      </a>
    );

  const secondary =
    secondaryCta &&
    (secondaryCta.external === true ? (
      <a
        href={secondaryCta.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-2xl border-2 border-[#377CF3] bg-transparent px-8 py-4 text-center text-base font-semibold text-[#377CF3] transition hover:bg-[#EFF6FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
      >
        {secondaryCta.label}
      </a>
    ) : (
      <Link
        href={secondaryCta.href}
        className="inline-flex items-center justify-center rounded-2xl border-2 border-[#377CF3] bg-transparent px-8 py-4 text-center text-base font-semibold text-[#377CF3] transition hover:bg-[#EFF6FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
      >
        {secondaryCta.label}
      </Link>
    ));

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
