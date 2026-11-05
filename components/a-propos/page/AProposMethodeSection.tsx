import Image from 'next/image';
import { ArrowRight, Crosshair, FileText, Laptop, ShieldCheck } from 'lucide-react';
import { A_PROPOS_METHODE_ETAPES, A_PROPOS_MODALITES_RESUME } from '@/lib/a-propos-page-config';
import { PHOTOS } from '@/lib/photos';

const STEP_ICONS = [Crosshair, FileText, Laptop, ShieldCheck] as const;

/** Pédagogie concrète — photo session + 4 étapes. */
export function AProposMethodeSection() {
  const photo = PHOTOS.aProposFormationGroupe;

  return (
    <section aria-labelledby="methode-title">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
        <figure>
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
        <div>
          <h2
            id="methode-title"
            className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl"
          >
            Une pédagogie{' '}
            <span className="text-ofc-accent">concrète</span>
          </h2>
          <p className="mt-3 text-sm text-ofc-ink-muted sm:text-base">
            {A_PROPOS_MODALITES_RESUME.replace(' : voir la page formations.', '.')}
          </p>
          <ol className="mt-8 grid gap-3 sm:grid-cols-2">
            {A_PROPOS_METHODE_ETAPES.map((step, index) => {
              const Icon = STEP_ICONS[index] ?? Crosshair;
              return (
                <li
                  key={step.title}
                  className="relative rounded-xl border border-ofc-border bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ofc-accent text-white">
                      <Icon className="h-4 w-4" strokeWidth={2} aria-hidden />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-[#0F172A]">{step.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-ofc-ink-muted sm:text-sm">
                        {step.text}
                      </p>
                    </div>
                  </div>
                  {index < A_PROPOS_METHODE_ETAPES.length - 1 && index % 2 === 0 ? (
                    <ArrowRight
                      className="absolute -right-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-ofc-accent sm:block lg:hidden"
                      aria-hidden
                    />
                  ) : null}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
