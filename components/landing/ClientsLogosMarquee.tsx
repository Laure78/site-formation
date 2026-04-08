'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { CLIENT_LOGOS_MARQUEE } from '@/lib/client-logos';

function LogoRow({ idSuffix = '' }: { idSuffix?: string }) {
  return (
    <>
      {CLIENT_LOGOS_MARQUEE.map((logo) => (
        <div
          key={`${logo.id}${idSuffix}`}
          className={`flex shrink-0 flex-col items-center justify-center gap-1 px-6 md:px-8 ${
            logo.wide ? 'min-h-[5.5rem] py-1 md:min-h-[6rem]' : 'h-[4.5rem] md:h-[5rem]'
          }`}
        >
          <div
            className={`relative flex items-center justify-center ${
              logo.wide
                ? 'h-20 max-h-20 w-[min(18rem,85vw)] md:h-24 md:max-h-24 md:w-[min(22rem,40vw)]'
                : 'h-11 max-h-11 w-[min(9rem,28vw)] md:h-12 md:max-h-12 md:w-40'
            }`}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className={`w-auto max-w-full object-contain opacity-[0.92] ${
                logo.wide
                  ? 'max-h-20 md:max-h-24'
                  : 'max-h-11 md:max-h-12'
              }`}
              sizes={logo.wide ? '(max-width: 768px) 85vw, 320px' : '(max-width: 768px) 28vw, 160px'}
            />
          </div>
          {logo.caption ? (
            <span className="max-w-[10rem] text-center text-[0.65rem] font-medium leading-tight text-slate-500 md:text-xs">
              {logo.caption}
            </span>
          ) : null}
        </div>
      ))}
    </>
  );
}

export function ClientsLogosMarquee() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const handler = () => setReduceMotion(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <section
      className="border-b border-slate-200/90 bg-slate-100/70 py-10 md:py-12"
      aria-labelledby="clients-logos-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10 lg:gap-14">
          <div className="flex shrink-0 md:pt-1">
            <span
              className="block h-12 w-1 rounded-full bg-[var(--accent)] md:h-16"
              aria-hidden
            />
          </div>
          <div className="min-w-0 flex-1">
            <h2
              id="clients-logos-heading"
              className="font-display text-lg font-bold tracking-tight text-slate-900 md:text-xl"
            >
              Ils m&apos;ont fait confiance
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Fédérations, organismes de formation et entreprises du secteur.
            </p>
          </div>
        </div>

        <div className="relative mt-8 overflow-hidden md:mt-10">
          {reduceMotion ? (
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-6 py-2 md:gap-x-8">
              <LogoRow />
            </div>
          ) : (
            <div className="flex w-max animate-marquee-scroll will-change-transform">
              <div className="flex items-center">
                <LogoRow idSuffix="-a" />
              </div>
              <div className="flex items-center" aria-hidden>
                <LogoRow idSuffix="-b" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
