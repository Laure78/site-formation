import Link from 'next/link';
import { Calendar, ExternalLink } from 'lucide-react';
import {
  CONTACT_CALENDLY_TEXT,
  CONTACT_CALENDLY_TITLE,
} from '@/lib/contact-page-config';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { LINKS } from '@/lib/internal-links';

export function ContactCalendlyBlock() {
  return (
    <section id="contact-calendly" aria-labelledby="contact-calendly-title" className="scroll-mt-24">
      <h2
        id="contact-calendly-title"
        className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl"
      >
        {CONTACT_CALENDLY_TITLE}
      </h2>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#475569]">{CONTACT_CALENDLY_TEXT}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link
          href={LINKS.prendreRdv}
          data-calendly-tracked="contact-page-rdv"
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#377CF3] px-6 py-3 text-base font-semibold text-white hover:bg-[#2563EB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
        >
          <Calendar className="h-5 w-5" aria-hidden />
          Réserver un créneau
        </Link>
        <a
          href={CALENDLY_BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-6 py-3 text-base font-semibold text-[#0F172A] hover:border-[#377CF3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
        >
          Ouvrir l&apos;agenda dans un nouvel onglet
          <ExternalLink className="h-4 w-4" aria-hidden />
        </a>
      </div>
    </section>
  );
}
