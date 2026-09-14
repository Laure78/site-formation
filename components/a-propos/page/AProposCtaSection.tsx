import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CTA_RDV_LABEL } from '@/components/CtaRdv';
import { LINKS } from '@/lib/internal-links';
import {
  OFC_CTA_PRIMARY,
  OFC_CTA_SECONDARY,
  OFC_TYPE_H2,
} from '@/lib/ofc-interaction-classes';

export function AProposCtaSection() {
  return (
    <section
      id="contact-cta"
      className="ofc-card scroll-mt-24 overflow-hidden bg-ofc-accent p-8 text-white sm:p-10 md:p-12"
      aria-labelledby="a-propos-cta-title"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/75">Échange</p>
      <h2 id="a-propos-cta-title" className={`${OFC_TYPE_H2} mt-3 text-white`}>
        Parlons de vos besoins de formation
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90">
        Présentez-moi les profils à former et les tâches sur lesquelles votre équipe souhaite gagner
        du temps.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link
          href={LINKS.prendreRdv}
          className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center gap-2 border-0 bg-white px-6 py-3 text-ofc-accent shadow-none hover:bg-white/95`}
        >
          {CTA_RDV_LABEL}
        </Link>
        <Link
          href={LINKS.formations}
          className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center gap-2 border-white/40 bg-transparent px-6 py-3 text-white hover:border-white hover:bg-white/10 hover:text-white`}
        >
          Voir le catalogue
          <ArrowRight className="h-5 w-5" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
