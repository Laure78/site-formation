import Link from 'next/link';
import { AccueilHeroVideo } from '@/components/landing/AccueilHeroVideo';
import { Badge } from '@/components/ui/Badge';
import {
  getAccueilHeroModalitesLine,
  getAccueilHeroProofItems,
} from '@/lib/accueil-config';
import { ACCUEIL_OFFRE_SECTION_ID } from '@/lib/accueil-offre-catalogue';
import { CTA_RDV_LABEL } from '@/lib/cta-rdv-label';
import { LINKS } from '@/lib/internal-links';
import {
  OFC_CTA_PRIMARY,
  OFC_CTA_SECONDARY,
  OFC_TYPE_LEAD,
} from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';

/** Hero accueil — promesse claire, double CTA, réassurance compacte. */
export function AccueilHeroSection() {
  const proofs = getAccueilHeroProofItems();
  const reassurance = proofs.map((p) => `${p.value} ${p.label}`).join(' · ');

  return (
    <section className={`${OFC_SEC.hero} relative overflow-hidden !py-10 md:!py-14 lg:!py-16`}>
      <div className="relative mx-auto max-w-[80rem]">
        <div className="accueil-hero-fold">
          <div className="accueil-hero-content min-w-0">
            <Badge>Formatrice IA spécialisée BTP</Badge>
            <h1 className="mt-4 max-w-3xl font-display text-[clamp(1.75rem,1.15rem+2.2vw,2.75rem)] font-extrabold leading-[1.12] tracking-tight text-ofc-ink text-balance">
              Formations IA pour les professionnels du BTP en Île-de-France
            </h1>
            <p className={`${OFC_TYPE_LEAD} mt-4 max-w-xl text-base leading-[1.65] text-ofc-ink md:text-lg`}>
              Devis, DCE, appels d&apos;offres et suivi de chantier&nbsp;: utilisez ChatGPT et
              Claude sur vos documents réels.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={`#${ACCUEIL_OFFRE_SECTION_ID}`}
                data-cta="trouver-formation"
                className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 w-full items-center justify-center px-6 py-3 sm:w-auto`}
              >
                Découvrir les formations
              </a>
              <Link
                href={`${LINKS.prendreRdv}?src=accueil-hero`}
                data-cta="rdv"
                className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center px-6 py-3 sm:w-auto`}
              >
                {CTA_RDV_LABEL}
              </Link>
            </div>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-ofc-ink-muted">
              {getAccueilHeroModalitesLine()}
            </p>
            <p className="mt-2 max-w-xl text-sm font-medium leading-relaxed text-ofc-ink">
              {reassurance}
            </p>
          </div>

          <aside className="accueil-hero-aside order-last mt-8 w-full min-w-0 md:order-none md:mt-0 md:max-w-sm md:justify-self-end lg:max-w-none">
            <div className="overflow-hidden rounded-ofc-card bg-white p-1 shadow-ofc-sm ring-1 ring-ofc-border">
              <AccueilHeroVideo className="aspect-[4/3] h-auto w-full rounded-[calc(var(--radius-ofc-card)-2px)] object-cover" />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
