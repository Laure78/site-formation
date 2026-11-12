import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Users, MapPin, Award } from 'lucide-react';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

const TRUST = [
  { Icon: MapPin, label: 'Présentiel en Île-de-France' },
  { Icon: Users, label: 'Petits groupes de 6 à 12' },
  { Icon: Award, label: 'Organisme certifié Qualiopi' },
] as const;

export function DatesLieuxHero() {
  return (
    <section className="relative overflow-hidden bg-white" aria-labelledby="dates-lieux-h1">
      <div className="mx-auto grid max-w-[80rem] min-h-[min(28rem,80svh)] grid-cols-1 items-stretch lg:min-h-[min(32rem,85svh)] lg:grid-cols-[minmax(0,1fr)_minmax(0,52%)]">
        <div className="relative z-10 flex flex-col justify-center px-4 py-10 sm:px-6 lg:px-8 lg:py-14 xl:pr-10">
          <p className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-[#377CF3] sm:text-xs">
            Formations IA BTP · Île-de-France
          </p>
          <h1
            id="dates-lieux-h1"
            className="mt-3 font-display text-[clamp(1.75rem,1.2rem+2.2vw,2.75rem)] font-extrabold leading-[1.12] tracking-tight text-[#101936] text-balance"
          >
            Trouvez votre prochaine session de formation IA BTP
          </h1>
          <p className="mt-4 max-w-xl rounded-xl border border-[#E2E8F0] bg-[#FAFBFC] px-4 py-3 text-sm leading-relaxed text-slate-700 md:text-base">
            <strong className="font-semibold text-[#101936]">En bref :</strong> Laure Olivié (OFC Création
            d&apos;Entreprise) liste ici les sessions inter confirmées en présentiel en Île-de-France — données
            catalogue Qualiopi, sans date fictive.
          </p>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
            Des formations pratiques pour les équipes des PME du bâtiment et des travaux publics.
          </p>
          <div className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href="#prochaines-sessions"
              className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center gap-2 rounded-[8px] px-6 py-3 text-sm font-semibold md:text-base`}
            >
              Voir les sessions
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
            </a>
            <Link
              href="#proposer-date"
              className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center gap-2 rounded-[8px] border-2 border-[#377CF3] px-6 py-3 text-sm font-semibold text-[#377CF3] hover:bg-[#F8FAFF] md:text-base`}
            >
              Proposer une date
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
            </Link>
          </div>
        </div>

        <div className="relative min-h-[14rem] bg-[#F2F2F2] lg:m-6 lg:min-h-0 lg:overflow-hidden lg:rounded-2xl">
          <Image
            src="/images/dates-lieux/formation-ia-btp-hero.webp"
            alt="Professionnels du BTP en formation IA autour d’un ordinateur portable et de plans — présentiel Île-de-France"
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 52vw"
          />
        </div>
      </div>

      <div className="border-y border-[#E2E8F0] bg-[#F0F6FF]">
        <ul className="mx-auto flex max-w-[80rem] flex-col gap-4 px-4 py-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-10 lg:px-8">
          {TRUST.map(({ Icon, label }) => (
            <li key={label} className="flex items-center gap-2.5 text-sm font-semibold text-[#101936]">
              <Icon className="h-5 w-5 text-[#377CF3]" strokeWidth={1.75} aria-hidden />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
