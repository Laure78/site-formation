import Link from 'next/link';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';
import { LINKS } from '@/lib/internal-links';
import { SITE_CONFIG } from '@/lib/seo';

export function FormationsCatalogueMidCta() {
  return (
    <section
      className="mt-16 overflow-hidden rounded-3xl bg-gradient-to-br from-[#1E40AF] to-[#377CF3] px-6 py-10 text-white md:px-12 md:py-12"
      aria-labelledby="catalogue-mid-cta-heading"
    >
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-10 lg:grid-cols-[3fr_2fr] lg:items-center">
          <div>
            <h2
              id="catalogue-mid-cta-heading"
              className="font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl"
            >
              Pas sûr(e) de la formation qui convient à votre équipe ?
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/90">
              Réservez un échange gratuit de 30 minutes en visio avec Laure Olivié. On identifie ensemble la formation la
              plus adaptée à votre équipe — devis personnalisé sous 24 heures.
            </p>
            <p className="mt-6 flex flex-wrap gap-x-3 gap-y-2 text-sm text-white/70">
              <span>✓ </span>
              <span className="text-white/40" aria-hidden>
                ·
              </span>
              <span>✓ Qualiopi</span>
              <span className="text-white/40" aria-hidden>
                ·
              </span>
              <span>✓ FFB · CSFE · CNAM · Le Moniteur Formations</span>
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <CalendlyEmbed
              type="link"
              variant="on-accent"
              ctaPosition="middle"
              campaign="formations-mid-page"
              className="font-bold shadow-xl"
            />
            <Link
              href={LINKS.financement}
              className="inline-flex items-center justify-center rounded-xl border-[1.5px] border-white px-7 py-4 text-center text-base font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Voir le financement Constructys
            </Link>
            <p className="text-center text-sm italic text-white/70 md:text-left">
              Ou écrivez-moi à{' '}
              <a href={`mailto:${SITE_CONFIG.email}`} className="underline hover:text-white">
                {SITE_CONFIG.email}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
