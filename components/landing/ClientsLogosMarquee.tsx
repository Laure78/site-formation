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
          className="flex min-h-[5rem] shrink-0 flex-col items-center justify-center gap-0.5 px-4 py-0.5 md:min-h-[5.5rem] md:px-5"
        >
          {/* Cadre strictement identique pour chaque logo : fill + object-contain = même zone d’affichage */}
          <div className="relative h-10 w-[9.5rem] shrink-0 md:h-11 md:w-[10.5rem]">
            <Image
              src={logo.src}
              alt={logo.alt}
              fill
              sizes="(max-width: 768px) 152px, 168px"
              className="object-contain object-center p-0.5 opacity-[0.92]"
            />
          </div>
          {logo.caption ? (
            <span className="max-w-[9rem] text-center text-[0.6rem] font-medium leading-tight text-slate-500 md:text-[0.65rem]">
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
      className="border-b border-slate-200/90 bg-slate-100/70 py-7 md:py-9"
      aria-labelledby="clients-logos-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-8 lg:gap-10">
          <div className="flex shrink-0 md:pt-0.5">
            <span
              className="block h-10 w-1 rounded-full bg-[var(--accent)] md:h-12"
              aria-hidden
            />
          </div>
          <div className="min-w-0 flex-1">
            <h2
              id="clients-logos-heading"
              className="font-display text-base font-bold tracking-tight text-slate-900 md:text-lg"
            >
              Ils m&apos;ont fait confiance
            </h2>
            <p className="mt-0.5 text-xs text-slate-600 md:text-sm">
              Fédérations, organismes de formation et entreprises du secteur.
            </p>
          </div>
        </div>

        <div className="relative mt-6 overflow-hidden md:mt-8">
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
