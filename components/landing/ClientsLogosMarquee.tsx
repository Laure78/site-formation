'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { CLIENT_LOGOS_MARQUEE } from '@/lib/client-logos';
import { Reveal, RevealGroup } from '@/components/motion/Reveal';
import { OFC_SEC } from '@/lib/ofc-section-classes';

function LogoTile({
  logo,
  idSuffix = '',
  decorativeDuplicate = false,
}: {
  logo: (typeof CLIENT_LOGOS_MARQUEE)[number];
  idSuffix?: string;
  decorativeDuplicate?: boolean;
}) {
  const imageBlock = (
    <>
      <div className="relative h-10 w-[9.5rem] shrink-0 md:h-11 md:w-[10.5rem]">
        <Image
          src={logo.src}
          alt={decorativeDuplicate ? '' : logo.alt}
          title={
            decorativeDuplicate
              ? undefined
              : logo.linkTitle ?? (logo.caption ? `${logo.name} — ${logo.caption}` : logo.name)
          }
          fill
          loading="lazy"
          sizes="(max-width: 768px) 152px, 168px"
          className="object-contain object-center p-0.5 opacity-[0.92] transition group-hover:opacity-100"
        />
      </div>
      {logo.caption ? (
        <span className="max-w-[9rem] text-center text-[0.6rem] font-medium leading-tight text-slate-500 md:text-[0.65rem]">
          {logo.caption}
        </span>
      ) : null}
    </>
  );

  return (
    <div
      key={`${logo.id}${idSuffix}`}
      className="flex min-h-[5rem] shrink-0 flex-col items-center justify-center gap-0.5 px-4 py-0.5 md:min-h-[5.5rem] md:px-5"
    >
      {decorativeDuplicate ? (
        imageBlock
      ) : (
        <ExternalLinkAnchor
          href={logo.href}
          title={logo.linkTitle ?? `Site officiel ${logo.name}`}
          className="group flex flex-col items-center justify-center gap-0.5 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
        >
          {imageBlock}
        </ExternalLinkAnchor>
      )}
    </div>
  );
}

function LogoRow({
  idSuffix = '',
  decorativeDuplicate = false,
}: {
  idSuffix?: string;
  decorativeDuplicate?: boolean;
}) {
  return (
    <>
      {CLIENT_LOGOS_MARQUEE.map((logo) => (
        <LogoTile
          key={`${logo.id}${idSuffix}`}
          logo={logo}
          idSuffix={idSuffix}
          decorativeDuplicate={decorativeDuplicate}
        />
      ))}
    </>
  );
}

type ClientsLogosMarqueeProps = {
  /** Sans wrapper `<section>` — fusion preuve sociale accueil. */
  embedded?: boolean;
};

export function ClientsLogosMarquee({ embedded = false }: ClientsLogosMarqueeProps) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const handler = () => setReduceMotion(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const inner = (
      <div className={embedded ? undefined : 'mx-auto max-w-6xl px-4 sm:px-8'}>
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-8 lg:gap-10">
          <div className="flex shrink-0 md:pt-0.5">
            <span
              className="block h-10 w-1 rounded-full bg-[var(--accent)] md:h-12"
              aria-hidden
            />
          </div>
          <Reveal className="min-w-0 flex-1">
            <h2
              id="clients-logos-heading"
              className="font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl"
            >
              Ils m&apos;ont fait confiance
            </h2>
            <p className="mt-0.5 text-xs text-slate-600 md:text-sm">
              Fédérations, organismes de formation et entreprises du secteur.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-6 overflow-hidden md:mt-8">
          {reduceMotion ? (
            <RevealGroup
              className="flex flex-wrap items-center justify-center gap-x-4 gap-y-6 py-2 md:gap-x-8"
              staggerMs={45}
            >
              {CLIENT_LOGOS_MARQUEE.map((logo) => (
                <LogoTile key={logo.id} logo={logo} />
              ))}
            </RevealGroup>
          ) : (
            <Reveal>
              <div className="flex w-max animate-marquee-scroll will-change-transform">
                <div className="flex items-center">
                  <LogoRow idSuffix="-a" />
                </div>
                <div className="flex items-center" aria-hidden>
                  <LogoRow idSuffix="-b" decorativeDuplicate />
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </div>
  );

  if (embedded) {
    return <div className="min-w-0 overflow-hidden">{inner}</div>;
  }

  return (
    <section
      className={`${OFC_SEC.mutedCompact} scroll-mt-24`}
      aria-labelledby="clients-logos-heading"
    >
      {inner}
    </section>
  );
}
