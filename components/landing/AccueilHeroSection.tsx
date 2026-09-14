import Link from 'next/link';
import { AccueilHeroVideo } from '@/components/landing/AccueilHeroVideo';
import { AccueilPrendreRdvLink } from '@/components/landing/accueil/AccueilPrendreRdvLink';
import { Badge } from '@/components/ui/Badge';
import { Stat } from '@/components/ui/Stat';
import { CTA_RDV_LABEL } from '@/components/CtaRdv';
import {
  getAccueilHeroModalitesLine,
  getAccueilHeroProofItems,
} from '@/lib/accueil-config';
import { LINKS } from '@/lib/internal-links';
import {
  OFC_CTA_PRIMARY,
  OFC_CTA_SECONDARY,
  OFC_TYPE_HERO,
  OFC_TYPE_LEAD,
} from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';
import { PHOTOS } from '@/lib/photos';

const HERO_ASIDE_LINK = {
  href: LINKS.formations,
  title: PHOTOS.heroAccueilFormationIABtpEchange2026.title,
} as const;

/** Hero accueil — composition premium, double CTA, preuves. */
export function AccueilHeroSection() {
  const proofs = getAccueilHeroProofItems();

  return (
    <section className={`${OFC_SEC.hero} relative overflow-hidden`}>
      <div className="relative mx-auto max-w-[80rem]">
        <div className="accueil-hero-fold">
          <div className="accueil-hero-content min-w-0">
            <Badge>Formation IA pour le BTP</Badge>
            <h1 className={`${OFC_TYPE_HERO} mt-5 max-w-[14ch]`}>
              Formation IA pour les professionnels du BTP
            </h1>
            <p className={`${OFC_TYPE_LEAD} mt-6 max-w-xl text-ofc-ink-muted`}>
              Gagnez du temps sur vos devis, DCE, comptes rendus, documents de chantier et appels
              d&apos;offres grâce à l&apos;intelligence artificielle.
            </p>
            <p className="mt-4 max-w-xl text-sm font-medium text-ofc-ink-muted md:text-[0.95rem]">
              {getAccueilHeroModalitesLine()}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <AccueilPrendreRdvLink
                origin="accueil-hero"
                className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 w-full items-center justify-center px-6 py-3 sm:w-auto`}
              >
                {CTA_RDV_LABEL}
              </AccueilPrendreRdvLink>
              <Link
                href={LINKS.formations}
                data-cta="formations"
                className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center px-6 py-3 sm:w-auto`}
              >
                Découvrir les formations
              </Link>
            </div>
            <ul
              className="mt-10 grid max-w-2xl grid-cols-2 gap-4 border-t border-ofc-border pt-8 sm:grid-cols-4 sm:gap-6"
              aria-label="Preuves et indicateurs"
            >
              {proofs.map((item) => (
                <li key={item.label}>
                  <Stat value={item.value} label={item.label} className="text-left" />
                </li>
              ))}
            </ul>
          </div>

          <aside className="accueil-hero-aside mt-10 w-full min-w-0 md:mt-0 lg:justify-self-end">
            <Link
              href={HERO_ASIDE_LINK.href}
              title={HERO_ASIDE_LINK.title}
              className="ofc-card block overflow-hidden bg-white/95 p-1.5 transition hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] lg:max-w-none"
            >
              <AccueilHeroVideo className="aspect-[4/3] h-auto w-full rounded-[1.05rem] object-cover sm:aspect-[16/10] lg:aspect-[4/3]" />
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
