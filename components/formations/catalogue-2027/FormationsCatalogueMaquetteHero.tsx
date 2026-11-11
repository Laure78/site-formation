import Image from 'next/image';
import { ArrowRight, BarChart3, CalendarDays, MapPin, ShieldCheck } from 'lucide-react';
import { PHOTOS } from '@/lib/photos';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { CtaVisio } from '@/components/CtaVisio';

const REASSURANCE = [
  {
    id: 'qualiopi',
    label: 'Certifié Qualiopi',
    Icon: ShieldCheck,
  },
  {
    id: 'idf',
    label: 'Présentiel en Île-de-France',
    Icon: MapPin,
  },
  {
    id: 'pratique',
    label: '70 % de pratique',
    Icon: BarChart3,
  },
] as const;

export function FormationsCatalogueMaquetteHero() {
  const visual = PHOTOS.formationsCatalogueHero2026;
  return (
    <section
      id="formations-catalogue-hero"
      className="relative overflow-hidden bg-white"
      aria-labelledby="formations-catalogue-hero-h1"
    >
      <div className="mx-auto grid max-w-[80rem] min-h-[min(28rem,80svh)] grid-cols-1 items-stretch lg:min-h-[min(32rem,85svh)] lg:grid-cols-[minmax(0,1fr)_minmax(0,52%)]">
        <div className="relative z-10 flex flex-col justify-center px-4 py-10 sm:px-6 lg:px-8 lg:py-14 xl:pr-10">
          <p className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-[#377CF3] sm:text-xs">
            Formations IA pour le BTP
          </p>
          <h1
            id="formations-catalogue-hero-h1"
            className="mt-3 font-display text-[clamp(1.75rem,1.2rem+2.2vw,2.75rem)] font-extrabold leading-[1.12] tracking-tight text-[#101936] text-balance"
          >
            L’IA au service de vos métiers du BTP
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
            Devis, appels d&apos;offres, conduite de travaux : des formations concrètes et directement
            applicables.
          </p>
          <div className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href="#catalogue-formations"
              className={`${OFC_CTA_PRIMARY} motion-safe:transition-transform motion-safe:duration-200 motion-safe:active:scale-[0.98] inline-flex min-h-11 items-center justify-center gap-2 rounded-[8px] px-6 py-3 text-sm font-semibold md:text-base`}
            >
              Découvrir les formations
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
            </a>
            <CtaVisio
              src="formations-catalogue-hero"
              variant="secondary"
              leadingAdornment={<CalendarDays className="h-4 w-4 shrink-0" aria-hidden />}
              className={`${OFC_CTA_SECONDARY} rounded-[8px] border-2 border-[#377CF3] px-6 py-3 text-sm font-semibold text-[#377CF3] shadow-sm hover:bg-[#F8FAFF] md:text-base`}
            />
          </div>
          <ul
            className="mt-10 grid max-w-lg grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 lg:max-w-none"
            aria-label="Informations clés"
          >
            {REASSURANCE.map(({ id, label, Icon }) => (
              <li
                key={id}
                className="flex items-center gap-2.5 rounded-lg border border-[#E2E8F0]/80 bg-[#FAFBFC] px-3 py-2.5 text-xs font-semibold text-[#101936] sm:flex-col sm:items-start sm:gap-2 sm:border-0 sm:bg-transparent sm:p-0 sm:text-sm"
              >
                <Icon className="h-5 w-5 shrink-0 text-[#101936] opacity-90" strokeWidth={1.75} aria-hidden />
                <span className="leading-snug">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative min-h-[14rem] bg-[#F2F2F2] lg:m-6 lg:min-h-0 lg:overflow-hidden lg:rounded-2xl">
          <Image
            src={visual.src}
            alt={visual.alt}
            width={visual.width}
            height={visual.height}
            className="h-full w-full object-cover object-[center_35%] motion-reduce:object-[center_30%] max-lg:max-h-[22rem] max-lg:min-h-[16rem] lg:aspect-[16/10] lg:object-[center_32%]"
            sizes="(max-width: 1024px) 100vw, 45vw"
            priority
            fetchPriority="high"
          />
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-[min(100%,4.5rem)] bg-gradient-to-r from-white via-white/85 to-transparent max-lg:h-24 max-lg:w-full max-lg:bg-gradient-to-b max-lg:from-white max-lg:via-white/90 max-lg:to-transparent lg:w-[42%]"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
