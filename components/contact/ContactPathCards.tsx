import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CONTACT_PATH_CARDS } from '@/lib/contact-page-config';

export function ContactPathCards() {
  return (
    <section aria-labelledby="contact-path-title">
      <h2
        id="contact-path-title"
        className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl"
      >
        Choisir le bon contact
      </h2>
      <ul className="mt-6 grid gap-4 md:grid-cols-2">
        {CONTACT_PATH_CARDS.map((card) => (
          <li
            key={card.id}
            className="flex flex-col rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-sm"
          >
            <h3 className="font-semibold text-[#0F172A]">{card.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-[#475569]">{card.text}</p>
            <p className="mt-5">
              <Link
                href={card.href}
                className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-[#377CF3] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
              >
                {card.cta}
                <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
