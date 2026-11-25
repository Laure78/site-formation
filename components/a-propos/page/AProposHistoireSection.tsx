import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { A_PROPOS_HISTOIRE_PARAGRAPHS } from '@/lib/a-propos-page-config';
import { LINKS } from '@/lib/internal-links';
import { PHOTOS } from '@/lib/photos';

/** Notre histoire — portrait fondatrice, sans frise détaillée. */
export function AProposHistoireSection() {
  const portrait = PHOTOS.aProposHero2026;

  return (
    <section id="notre-histoire" className="scroll-mt-24" aria-labelledby="histoire-title">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(220px,300px)] lg:items-start lg:gap-10">
        <div>
          <h2
            id="histoire-title"
            className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl"
          >
            Un organisme né de l&apos;expérience du{' '}
            <span className="text-ofc-accent">terrain</span>
          </h2>
          <div className="mt-4 space-y-3 text-[0.9375rem] leading-relaxed text-ofc-ink-muted sm:text-base">
            {A_PROPOS_HISTOIRE_PARAGRAPHS.map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}
          </div>
          <p className="mt-6">
            <Link
              href={`${LINKS.formateurs}/laure-olivie`}
              className="inline-flex min-h-11 items-center gap-2 font-semibold text-ofc-accent hover:underline"
            >
              Découvrir le parcours de notre fondatrice
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
          </p>
        </div>
        <figure className="mx-auto w-full max-w-[300px] lg:mx-0">
          <div className="overflow-hidden rounded-2xl border border-ofc-border bg-[#F2F2F2] shadow-sm">
            <Image
              src={portrait.src}
              alt={portrait.alt}
              width={portrait.width}
              height={portrait.height}
              className="h-auto w-full object-cover"
              sizes="(max-width: 1024px) 280px, 300px"
              loading="lazy"
              quality={80}
            />
          </div>
        </figure>
      </div>
    </section>
  );
}