import Image from 'next/image';
import { ClipboardList, Crosshair, FileText, ShieldCheck } from 'lucide-react';
import { A_PROPOS_METHODE_ETAPES } from '@/lib/a-propos-page-config';
import { PHOTOS } from '@/lib/photos';

const STEP_ICONS = [Crosshair, FileText, ClipboardList, ShieldCheck] as const;

/** Notre approche pédagogique — 4 étapes + photo session. */
export function AProposMethodeSection() {
  const photo = PHOTOS.aProposFormationGroupe;

  return (
    <section id="approche-pedagogique" aria-labelledby="methode-title" className="scroll-mt-24">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-10">
        <figure className="order-2 lg:order-1">
          <div className="overflow-hidden rounded-2xl border border-ofc-border bg-[#F2F2F2] shadow-sm">
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              className="h-auto w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
              loading="lazy"
              quality={85}
            />
          </div>
        </figure>
        <div className="order-1 lg:order-2">
          <h2
            id="methode-title"
            className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl"
          >
            Des compétences directement applicables{' '}
            <span className="text-ofc-accent">en entreprise</span>
          </h2>
          <ol className="mt-8 space-y-4">
            {A_PROPOS_METHODE_ETAPES.map((step, index) => {
              const Icon = STEP_ICONS[index] ?? Crosshair;
              return (
                <li
                  key={step.title}
                  className="flex gap-3 rounded-xl border border-ofc-border bg-white p-4 shadow-sm"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ofc-accent text-sm font-bold text-white">
                    <Icon className="h-4 w-4" strokeWidth={2} aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-[#0F172A]">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ofc-ink-muted">{step.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}