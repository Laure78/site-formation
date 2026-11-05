import Image from 'next/image';
import {
  A_PROPOS_APPORTS,
  A_PROPOS_EXPERTISE_METIER_POINTS,
  A_PROPOS_POSITIONNEMENT,
} from '@/lib/a-propos-page-config';
import { PHOTOS } from '@/lib/photos';
import { BookOpen, CheckCircle2, ShieldCheck } from 'lucide-react';

const CARD_ICONS = [BookOpen, CheckCircle2, ShieldCheck] as const;

/** Section expertise métier — image chantier + cartes pédagogiques. */
export function AProposExpertiseMetierSection() {
  const photo = PHOTOS.aProposExperienceChantier;
  const [intro] = A_PROPOS_POSITIONNEMENT;

  return (
    <section
      id="expertise-metier"
      className="scroll-mt-24"
      aria-labelledby="expertise-metier-title"
    >
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div className="order-2 lg:order-1">
          <h2
            id="expertise-metier-title"
            className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl"
          >
            Une expertise née{' '}
            <span className="text-ofc-accent">du terrain</span>
          </h2>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-ofc-ink-muted sm:text-base">
            {intro}
          </p>
          <ul className="mt-5 space-y-2.5">
            {A_PROPOS_EXPERTISE_METIER_POINTS.map((point) => (
              <li key={point} className="flex gap-2.5 text-sm leading-snug text-ofc-ink sm:text-[0.9375rem]">
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 shrink-0 text-ofc-accent"
                  strokeWidth={2}
                  aria-hidden
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <figure className="order-1 lg:order-2">
          <div className="overflow-hidden rounded-2xl border border-ofc-border bg-[#F2F2F2] shadow-sm">
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              className="h-auto w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
              quality={85}
            />
          </div>
        </figure>
      </div>

      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {A_PROPOS_APPORTS.map((item, index) => {
          const Icon = CARD_ICONS[index] ?? BookOpen;
          return (
            <li
              key={item.title}
              className="rounded-xl border border-ofc-border bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md motion-reduce:transition-none"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-ofc-accent-soft text-ofc-accent">
                <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </span>
              <h3 className="mt-4 font-semibold text-[#0F172A]">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ofc-ink-muted">{item.text}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
