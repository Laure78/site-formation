import Image from 'next/image';
import Link from 'next/link';
import { DisclaimerGains } from '@/components/formation/DisclaimerGains';
import type { EtudeDeCasHubCard } from '@/lib/etudes-de-cas-hub';
import { OFC_CARD } from '@/lib/ofc-interaction-classes';

type EtudeCasHubCardProps = {
  etude: EtudeDeCasHubCard;
};

export function EtudeCasHubCard({ etude }: EtudeCasHubCardProps) {
  return (
    <article className={`${OFC_CARD} flex h-full flex-col overflow-hidden p-0`}>
      <div className="relative aspect-[3/2] w-full bg-slate-100">
        <Image
          src={etude.photo.src}
          alt={etude.photo.alt}
          title={etude.photo.title}
          width={etude.photo.width}
          height={etude.photo.height}
          className="h-full w-full object-cover"
          sizes="(max-width: 768px) 100vw, 560px"
          quality={75}
        />
        {etude.visualKind === 'illustration' ? (
          <span className="absolute bottom-3 left-3 rounded-md bg-white/95 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-slate-600 shadow-sm">
            Schéma d&apos;usage
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
          {etude.category}
        </p>
        <h2 className="mt-2 font-display text-xl font-bold leading-snug text-ofc-ink md:text-[1.35rem]">
          {etude.title}
        </h2>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600 md:text-base">
          {etude.description}
        </p>

        <ul className="mt-4 space-y-2 text-sm text-slate-700">
          {etude.keyFacts.map((fact) => (
            <li key={fact} className="flex gap-2 leading-snug">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
              <span>{fact}</span>
            </li>
          ))}
        </ul>

        {etude.showGainsDisclaimer ? <DisclaimerGains className="mt-4" /> : null}

        <p className="mt-4 text-sm text-slate-600">
          Formation associée :{' '}
          <Link href={etude.formationHref} className="font-medium text-[var(--accent)] hover:underline">
            {etude.formationLabel}
          </Link>
        </p>

        <p className="mt-auto pt-5">
          <Link
            href={etude.href}
            className="inline-flex min-h-11 items-center text-sm font-semibold text-[var(--accent)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
          >
            {etude.linkLabel}
          </Link>
        </p>
      </div>
    </article>
  );
}
