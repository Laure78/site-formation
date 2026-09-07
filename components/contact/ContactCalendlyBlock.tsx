'use client';

import Link from 'next/link';
import { Calendar } from 'lucide-react';
import {
  CONTACT_CALENDLY_TEXT,
  CONTACT_CALENDLY_TITLE,
} from '@/lib/contact-page-config';
import { LINKS } from '@/lib/internal-links';
import { trackContactCtaClick } from '@/lib/ga4-analytics';

/**
 * Bloc RDV sur /contact — renvoie vers le parcours natif `/prendre-rendez-vous`
 * (pas d’iframe Calendly : perf + consentement).
 */
export function ContactCalendlyBlock() {
  return (
    <section id="contact-rdv" aria-labelledby="contact-rdv-title" className="scroll-mt-24">
      <h2
        id="contact-rdv-title"
        className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl"
      >
        {CONTACT_CALENDLY_TITLE}
      </h2>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#475569]">{CONTACT_CALENDLY_TEXT}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link
          href={LINKS.prendreRdv}
          onClick={() => trackContactCtaClick('rdv')}
          data-calendly-tracked="contact-page-rdv"
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#377CF3] px-6 py-3 text-base font-semibold text-white hover:bg-[#2563EB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
        >
          <Calendar className="h-5 w-5" aria-hidden />
          Réserver un créneau
        </Link>
        <Link
          href={LINKS.prendreRdv}
          onClick={() => trackContactCtaClick('rdv')}
          className="text-sm font-medium text-[#377CF3] underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ouvrir l’agenda dans un nouvel onglet
        </Link>
      </div>
    </section>
  );
}
