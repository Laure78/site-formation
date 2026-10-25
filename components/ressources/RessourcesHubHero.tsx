import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import type { RessourceCatalogEntry } from '@/lib/ressources-catalog';
import {
  RESSOURCES_HUB_H1,
  RESSOURCES_HUB_INTRO,
} from '@/lib/ressources-catalog';
import { RessourcesHubSpotlightCard } from '@/components/ressources/RessourcesHubSpotlightCard';
import { OFC_TYPE_HERO, OFC_TYPE_LEAD } from '@/lib/ofc-interaction-classes';

type Props = {
  spotlight: readonly RessourceCatalogEntry[];
};

/** Hero hub ressources — H1, intro courte et trois ressources actionnables. */
export function RessourcesHubHero({ spotlight }: Props) {
  return (
    <section
      className="ressources-hub-hero scroll-mt-[var(--site-header-height)] border-b border-slate-200/80 bg-white"
      aria-labelledby="ressources-hero-title"
    >
      <div className="ressources-hub-hero__inner mx-auto max-w-7xl px-4 pb-5 pt-2 sm:px-6 md:pb-7 md:pt-3 lg:px-8">
        <h1 id="ressources-hero-title" className={`${OFC_TYPE_HERO} ressources-hub-hero__title max-w-3xl`}>
          {RESSOURCES_HUB_H1}
        </h1>
        <p className={`${OFC_TYPE_LEAD} ressources-hub-hero__intro max-w-2xl text-ofc-ink-muted`}>
          {RESSOURCES_HUB_INTRO}
        </p>

        {spotlight.length > 0 ? (
          <ul className="ressources-hub-hero__grid mt-4 grid list-none gap-3 md:mt-5 md:gap-4 lg:grid-cols-3">
            {spotlight.map((resource) => (
              <li key={resource.id} className="min-w-0">
                <RessourcesHubSpotlightCard resource={resource} />
              </li>
            ))}
          </ul>
        ) : null}

        <p className="mt-5 md:mt-6">
          <Link
            href="#catalogue-ressources"
            className="inline-flex min-h-11 items-center gap-1.5 text-base font-semibold text-[#377CF3] underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
          >
            Voir toutes les ressources
            <ChevronDown className="h-4 w-4 shrink-0" aria-hidden />
          </Link>
        </p>
      </div>
    </section>
  );
}
