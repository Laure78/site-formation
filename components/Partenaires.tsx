import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import {
  PARTENAIRES_CARDS,
  PARTENAIRES_CTA_INTRO,
  PARTENAIRES_CTA_LABEL,
  PARTENAIRES_GEO_CITATION,
  PARTENAIRES_INTRO_PARAGRAPHS,
  PARTENAIRES_LOGO_BAND,
  PARTENAIRES_LOGO_BAND_TITLE,
  PARTENAIRES_SECTION_TITLE,
} from '@/lib/partenaires-content';
import { LINKS } from '@/lib/internal-links';
import { OFC_CARD, OFC_CTA_PRIMARY, OFC_LINK } from '@/lib/ofc-interaction-classes';
import { OFC_SEC, OFC_SECTION_INNER } from '@/lib/ofc-section-classes';

type PartenairesProps = {
  id?: string;
  /** `h1` sur la page dédiée, `h2` en section intégrée. */
  headingLevel?: 'h1' | 'h2';
  /** Lien vers la page /partenaires (accueil, à propos). */
  showPageLink?: boolean;
  /** Affiche la phrase GEO citable (§7 brief). */
  showGeoCitation?: boolean;
  /** Intégré dans le hero accueil — `<div>` sans padding section. */
  embedded?: boolean;
  /** Lien vers #rdv au lieu d’un embed Calendly (accueil). */
  rdvAnchor?: boolean;
  calendlyCampaign?: string;
  className?: string;
};

function LogoBandItem({ item }: { item: (typeof PARTENAIRES_LOGO_BAND)[number] }) {
  if (item.href) {
    return (
      <ExternalLinkAnchor
        href={item.href}
        title={`Site officiel ${item.name}`}
        className="group flex w-full max-w-[11.5rem] flex-col items-center justify-center rounded-lg px-2 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
      >
        {item.logo ? (
          <div className="relative flex h-14 w-full items-center justify-center md:h-16">
            <Image
              src={item.logo.src}
              alt={item.logo.alt}
              width={item.logo.width}
              height={item.logo.height}
              className="max-h-14 w-auto object-contain object-center opacity-90 transition group-hover:opacity-100 md:max-h-16"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="flex h-14 min-w-[9rem] items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-4 transition group-hover:border-[#377CF3]/40 group-hover:bg-white md:h-16">
            <span className="text-center text-sm font-semibold leading-tight text-slate-800">{item.name}</span>
          </div>
        )}
      </ExternalLinkAnchor>
    );
  }

  return (
    <div className="flex w-full items-center justify-center px-2 py-2">
      <span className="text-sm font-semibold text-slate-800">{item.name}</span>
    </div>
  );
}

export function Partenaires({
  id = 'partenaires',
  headingLevel = 'h2',
  showPageLink = false,
  showGeoCitation = false,
  embedded = false,
  rdvAnchor = false,
  calendlyCampaign = 'partenaires-section',
  className = '',
}: PartenairesProps) {
  const Heading = headingLevel;

  const inner = (
      <div className={`${embedded ? 'min-w-0' : OFC_SECTION_INNER}`.trim()}>
        <div className="mx-auto max-w-4xl text-center">
          <Heading
            id={`${id}-heading`}
            className="font-display text-balance text-2xl font-bold tracking-tight text-slate-900 md:text-3xl lg:text-[2rem]"
          >
            {PARTENAIRES_SECTION_TITLE}
          </Heading>
          <div className="mx-auto mt-4 max-w-3xl space-y-3 text-base leading-relaxed text-slate-600 md:text-lg">
            {PARTENAIRES_INTRO_PARAGRAPHS.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </div>

        <ul className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:gap-5">
          {PARTENAIRES_CARDS.map((card) => (
            <li key={card.id}>
              <article className={`${OFC_CARD} flex h-full flex-col p-6 md:p-7`}>
                <div className="mb-4 flex h-16 items-center justify-center rounded-lg bg-[#F2F2F2]/80 px-4 md:h-[4.5rem]">
                  <Image
                    src={card.logo.src}
                    alt={card.logo.alt}
                    width={card.logo.width}
                    height={card.logo.height}
                    className="max-h-12 w-auto object-contain object-center md:max-h-14"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-display text-lg font-bold text-slate-900">
                  {card.href ? (
                    <ExternalLinkAnchor href={card.href} className={`${OFC_LINK} hover:underline`}>
                      {card.title}
                    </ExternalLinkAnchor>
                  ) : (
                    card.title
                  )}
                </h3>
                {card.subtitle ? (
                  <p className="mt-1 text-sm font-medium text-slate-500">{card.subtitle}</p>
                ) : null}
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 md:text-[0.9375rem]">
                  {card.description}
                </p>
              </article>
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-10 max-w-5xl rounded-2xl border border-slate-200 bg-white px-4 py-6 shadow-sm md:px-8 md:py-8">
          <p className="text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
            {PARTENAIRES_LOGO_BAND_TITLE}
          </p>
          <ul className="mt-6 grid list-none grid-cols-2 items-center justify-items-center gap-x-4 gap-y-6 sm:grid-cols-3 md:gap-x-8 lg:grid-cols-4">
            {PARTENAIRES_LOGO_BAND.map((item) => (
              <li key={item.id} className="flex w-full justify-center">
                <LogoBandItem item={item} />
              </li>
            ))}
          </ul>
        </div>

        {showGeoCitation ? (
          <p
            className="citation-sentence mx-auto mt-10 max-w-3xl rounded-2xl border border-slate-200/80 bg-white p-4 text-center text-[0.9375rem] leading-relaxed text-slate-800 shadow-sm md:p-5 md:text-base"
            data-citation="true"
          >
            {PARTENAIRES_GEO_CITATION}
          </p>
        ) : null}

        <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-4 text-center">
          <p className="text-sm leading-relaxed text-slate-600 md:text-base">{PARTENAIRES_CTA_INTRO}</p>
          {rdvAnchor ? (
            <Link
              href={LINKS.accueilRdv}
              className={`${OFC_CTA_PRIMARY} inline-flex min-w-[min(100%,280px)] items-center justify-center gap-1`}
            >
              {PARTENAIRES_CTA_LABEL}
              <ArrowRight size={18} strokeWidth={1.5} aria-hidden className="ml-1.5" />
            </Link>
          ) : (
            <CalendlyEmbed
              type="link"
              variant="primary"
              ctaPosition="middle"
              campaign={calendlyCampaign}
              className="min-w-[min(100%,280px)]"
            >
              {PARTENAIRES_CTA_LABEL}
              <ArrowRight size={18} strokeWidth={1.5} aria-hidden className="ml-1.5" />
            </CalendlyEmbed>
          )}
          {showPageLink ? (
            <Link href={LINKS.partenaires} className={`${OFC_LINK} text-sm font-semibold`}>
              Voir le détail des partenariats →
            </Link>
          ) : null}
        </div>
      </div>
  );

  if (embedded) {
    return (
      <div
        id={id}
        className={`min-w-0 overflow-hidden ${className}`.trim()}
        role="region"
        aria-labelledby={`${id}-heading`}
      >
        {inner}
      </div>
    );
  }

  return (
    <section
      id={id}
      className={`${OFC_SEC.mutedCompact} scroll-mt-24 ${className}`.trim()}
      aria-labelledby={`${id}-heading`}
    >
      {inner}
    </section>
  );
}
