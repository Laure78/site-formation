import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { A_PROPOS_REFERENCES_LOGOS } from '@/lib/a-propos-page-config';
import { LINKS } from '@/lib/internal-links';

export function AProposReferencesTeaser() {
  return (
    <section id="references" aria-labelledby="references-title" className="scroll-mt-24">
      <h2
        id="references-title"
        className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl"
      >
        Ils nous font <span className="text-ofc-accent">confiance</span>
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ofc-ink-muted sm:text-base">
        Interventions pour des entreprises clientes, des fédérations professionnelles et des
        organismes de formation — sans présenter une intervention ponctuelle comme un partenariat
        permanent. Le détail est sur la page références.
      </p>
      <ul className="mt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:justify-start">
        {A_PROPOS_REFERENCES_LOGOS.map((logo) => (
          <li key={logo.id} className="flex h-14 items-center justify-center px-2">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className="max-h-10 w-auto max-w-[140px] object-contain opacity-90 grayscale transition hover:opacity-100 hover:grayscale-0 motion-reduce:transition-none"
              sizes="140px"
              loading="lazy"
              quality={70}
            />
          </li>
        ))}
      </ul>
      <p className="mt-6">
        <Link
          href={LINKS.partenaires}
          className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-ofc-accent hover:underline"
        >
          Découvrir nos références
          <ArrowRight className="h-5 w-5" aria-hidden />
        </Link>
      </p>
    </section>
  );
}