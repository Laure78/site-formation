import { Reveal } from '@/components/motion/Reveal';
import { OFC_SEC } from '@/lib/ofc-section-classes';

/** Coquille SSR — bande logos (contenu animé chargé au scroll). */
export function ClientsLogosMarqueePlaceholder() {
  return (
    <section
      className={`${OFC_SEC.mutedCompact} scroll-mt-24`}
      aria-labelledby="clients-logos-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-8 lg:gap-10">
          <div className="flex shrink-0 md:pt-0.5">
            <span className="block h-10 w-1 rounded-full bg-[var(--accent)] md:h-12" aria-hidden />
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
        <div
          className="mt-6 flex min-h-[5.5rem] items-center justify-center rounded-xl border border-dashed border-slate-200/90 bg-white/60 md:mt-8"
          aria-hidden
        >
          <span className="text-sm text-slate-500">Logos partenaires</span>
        </div>
      </div>
    </section>
  );
}
