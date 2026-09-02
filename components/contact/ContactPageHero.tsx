import Link from 'next/link';
import { Calendar } from 'lucide-react';
import {
  CONTACT_PAGE_H1,
  CONTACT_PAGE_PROOF_LINE,
  CONTACT_PAGE_SUBTITLE,
} from '@/lib/contact-page-config';
import { LINKS } from '@/lib/internal-links';

export function ContactPageHero() {
  return (
    <section
      className="bg-gradient-to-b from-[#EFF6FF] via-white to-white px-4 pb-12 pt-10 sm:px-6 lg:px-8 lg:pb-14 lg:pt-12"
      aria-labelledby="contact-hero-title"
    >
      <div className="mx-auto max-w-6xl">
        <h1
          id="contact-hero-title"
          className="font-display text-3xl font-bold leading-tight tracking-tight text-[#0F172A] sm:text-4xl"
        >
          {CONTACT_PAGE_H1}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#475569] sm:text-lg">
          {CONTACT_PAGE_SUBTITLE}
        </p>
        <p className="mt-3 text-sm font-medium text-[#64748B]">{CONTACT_PAGE_PROOF_LINE}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="?objet=devis#contact-form"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#377CF3] px-6 py-3 text-base font-semibold text-white hover:bg-[#2563EB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
          >
            Demander un devis
          </Link>
          <Link
            href="#contact-calendly"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-6 py-3 text-base font-semibold text-[#0F172A] hover:border-[#377CF3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
          >
            <Calendar className="h-5 w-5 shrink-0" aria-hidden />
            Réserver un échange
          </Link>
        </div>
      </div>
    </section>
  );
}
