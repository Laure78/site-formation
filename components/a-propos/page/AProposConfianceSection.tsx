import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, GraduationCap, Star } from 'lucide-react';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { QualiopiBadge } from '@/components/QualiopiLogo';
import { getAProposConfianceItems } from '@/lib/a-propos-page-config';
import { LOGO_ACTIVATEUR_FRANCE_NUM, LOGO_LINKEDIN_LEARNING } from '@/lib/client-logos';
import { SCHEMA_CONTACT } from '@/lib/schema-constants';

/** Grille repères de confiance — logos et liens vérifiés. */
export function AProposConfianceSection() {
  const items = getAProposConfianceItems();

  return (
    <section aria-labelledby="confiance-title">
      <h2
        id="confiance-title"
        className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl"
      >
        Repères de <span className="text-ofc-accent">confiance</span>
      </h2>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const isQualiopi = item.label === 'Qualiopi';
          const isLinkedIn = item.label === 'LinkedIn Learning';
          const isFranceNum = item.label === 'Activateur France Num';
          const isNda = item.label === 'NDA';
          const isSatisfaction = item.label === 'Satisfaction';
          const isMaster = item.label === 'Master Stratégie d’entreprise';

          return (
            <li
              key={item.label}
              className="flex flex-col rounded-xl border border-ofc-border bg-white p-5 shadow-sm transition-shadow hover:shadow-md motion-reduce:transition-none"
            >
              <div className="flex min-h-[3rem] items-center justify-between gap-3">
                {isQualiopi ? (
                  <QualiopiBadge size="default" className="max-w-[9rem]" />
                ) : isLinkedIn ? (
                  <Image
                    src={LOGO_LINKEDIN_LEARNING.src}
                    alt={LOGO_LINKEDIN_LEARNING.alt}
                    width={120}
                    height={40}
                    className="h-8 w-auto object-contain"
                    sizes="120px"
                    loading="lazy"
                  />
                ) : isFranceNum ? (
                  <Image
                    src={LOGO_ACTIVATEUR_FRANCE_NUM.src}
                    alt={LOGO_ACTIVATEUR_FRANCE_NUM.alt}
                    width={80}
                    height={72}
                    className="h-10 w-auto object-contain"
                    sizes="80px"
                    loading="lazy"
                  />
                ) : isNda ? (
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-ofc-accent-soft text-ofc-accent">
                    <GraduationCap className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </span>
                ) : isSatisfaction ? (
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-ofc-accent-soft text-ofc-accent">
                    <Star className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </span>
                ) : isMaster ? (
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-ofc-accent-soft text-ofc-accent">
                    <GraduationCap className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </span>
                ) : (
                  <span className="font-semibold text-[#0F172A]">{item.label}</span>
                )}
                {item.href ? (
                  item.external ? (
                    <ExternalLink className="h-4 w-4 shrink-0 text-ofc-ink-subtle" aria-hidden />
                  ) : (
                    <Link href={item.href} className="shrink-0 text-ofc-accent" aria-label={`En savoir plus — ${item.label}`}>
                      <ExternalLink className="h-4 w-4" aria-hidden />
                    </Link>
                  )
                ) : null}
              </div>
              <p className="mt-3 font-semibold text-[#0F172A]">{isNda ? `NDA ${SCHEMA_CONTACT.nda}` : item.label}</p>
              <p className="mt-1 flex-1 text-sm leading-relaxed text-ofc-ink-muted">{item.detail}</p>
              {item.href ? (
                <p className="mt-3 text-sm">
                  {item.external ? (
                    <ExternalLinkAnchor href={item.href} className="font-medium text-ofc-accent hover:underline">
                      En savoir plus
                    </ExternalLinkAnchor>
                  ) : (
                    <Link href={item.href} className="font-medium text-ofc-accent hover:underline">
                      En savoir plus
                    </Link>
                  )}
                </p>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
