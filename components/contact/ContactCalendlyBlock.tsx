'use client';

import Link from 'next/link';
import { Calendar } from 'lucide-react';
import {
  CONTACT_CALENDLY_TEXT,
  CONTACT_CALENDLY_TITLE,
} from '@/lib/contact-page-config';
import { LINKS } from '@/lib/internal-links';
import { CALENDLY_BOOKING_URL, buildCalendlyUrlWithUtm } from '@/lib/calendly';
import { trackContactCtaClick } from '@/lib/ga4-analytics';

/**
 * Bloc RDV sur /contact — parcours natif + lien Calendly direct.
 */
export function ContactCalendlyBlock() {
  const calendlyUrl = buildCalendlyUrlWithUtm({
    baseUrl: CALENDLY_BOOKING_URL,
    utmSource: 'site',
    utmMedium: 'cta',
    utmCampaign: 'contact-page-calendly',
  });

  return (
    <section id="contact-rdv" aria-labelledby="contact-rdv-title" className="scroll-mt-24">
      <h2
        id="contact-rdv-title"
        className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl"
      >
        {CONTACT_CALENDLY_TITLE}
      </h2>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#475569]">{CONTACT_CALENDLY_TEXT}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <Link
          href={LINKS.prendreRdv}
          onClick={() => trackContactCtaClick('rdv')}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#377CF3] px-6 py-3 text-base font-semibold text-white hover:bg-[#2563EB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
        >
          <Calendar className="h-5 w-5" aria-hidden />
          Réserver un créneau
        </Link>
        <a
          href={calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackContactCtaClick('rdv')}
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-[#CBD5E1] bg-white px-6 py-3 text-base font-semibold text-[#0F172A] hover:border-[#377CF3]"
          data-calendly
        >
          Ouvrir Calendly
        </a>
      </div>
      <p className="mt-3 text-sm text-slate-500">
        <a
          href={`${LINKS.prendreRdv}#calendly`}
          onClick={() => trackContactCtaClick('rdv')}
          className="font-medium text-[#377CF3] underline"
        >
          Afficher l’agenda Calendly sur la page rendez-vous
        </a>
      </p>
    </section>
  );
}
