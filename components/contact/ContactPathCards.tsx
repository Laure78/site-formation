'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CONTACT_PATH_CARDS } from '@/lib/contact-page-config';
import { trackContactCtaClick } from '@/lib/ga4-analytics';
import { OFC_CARD, OFC_CARD_ARROW, OFC_TYPE_H2, OFC_TYPE_H3 } from '@/lib/ofc-interaction-classes';

export function ContactPathCards() {
  return (
    <section aria-labelledby="contact-path-title">
      <h2 id="contact-path-title" className={OFC_TYPE_H2}>
        Choisir le bon contact
      </h2>
      <ul className="mt-8 grid gap-5 md:grid-cols-2">
        {CONTACT_PATH_CARDS.map((card) => (
          <li key={card.id}>
            <Link
              href={card.href}
              onClick={() => trackContactCtaClick(card.track)}
              className={`${OFC_CARD} group flex h-full flex-col p-6 sm:p-7`}
            >
              <h3 className={`${OFC_TYPE_H3} group-hover:text-ofc-accent`}>{card.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ofc-ink-muted">{card.text}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ofc-accent">
                {card.cta}
                <ArrowRight className={`${OFC_CARD_ARROW} h-4 w-4`} aria-hidden />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
