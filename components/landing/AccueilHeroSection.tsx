import Link from 'next/link';
import { AccueilHeroVideo } from '@/components/landing/AccueilHeroVideo';
import { AccueilPreuveSocialeCompact } from '@/components/landing/accueil/AccueilPreuveSocialeCompact';
import { Badge } from '@/components/ui/Badge';
import { getAccueilHeroModalitesLine } from '@/lib/accueil-config';
import { CTA_RDV_LABEL } from '@/lib/cta-rdv-label';
import { LINKS } from '@/lib/internal-links';
import {
  OFC_CTA_PRIMARY,
  OFC_CTA_SECONDARY,
  OFC_TYPE_LEAD,
} from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';

/** Hero accueil — promesse claire, double CTA orientation, vidéo large, logos dans le fold. */
export function AccueilHeroSection() {
  return (
    <section className={`${OFC_SEC.hero} relative overflow-hidden !py-5 md:!py-6 lg:!py-7`}>
      <div className="relative mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
        <div className="accueil-hero-fold">
          <div className="accueil-hero-content order-1 min-w-0">
            <Badge>Formatrice IA spécialisée BTP</Badge>
            <h1 className="mt-2 max-w-3xl font-display text-[clamp(1.45rem,1.1rem+1.25vw,1.95rem)] font-extrabold leading-[1.18] tracking-tight text-ofc-ink text-balance">
              Formations IA pour les professionnels du BTP en Île-de-France
            </h1>
            <p className={`${OFC_TYPE_LEAD} mt-2 max-w-xl text-[0.9375rem] leading-[1.55] text-ofc-ink md:text-base`}>
              Devis, DCE, appels d&apos;offres et suivi de chantier&nbsp;: utilisez ChatGPT et
              Claude sur vos documents réels.
            </p>
            <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
              <Link
                href={LINKS.parcoursMetiers}
                data-cta="parcours-metier"
                className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 w-full items-center justify-center px-5 py-2.5 text-sm sm:w-auto md:px-6 md:py-3 md:text-base`}
              >
                Choisir mon parcours métier
              </Link>
              <Link
                href={LINKS.formations}
                data-cta="formations-ia"
                className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center px-5 py-2.5 text-sm sm:w-auto md:px-6 md:py-3 md:text-base`}
              >
                Voir les formations IA
              </Link>
            </div>
            <p className="mt-3 max-w-xl text-xs leading-relaxed text-ofc-ink-muted md:text-sm">
              <Link
                href={`${LINKS.prendreRdv}?src=accueil-hero`}
                data-cta="rdv"
                className="font-medium text-ofc-accent hover:underline"
              >
                {CTA_RDV_LABEL}
              </Link>
              {' · '}
              {getAccueilHeroModalitesLine()}
            </p>
          </div>

          <aside className="accueil-hero-aside order-2 mt-5 w-full min-w-0 md:order-none md:mt-0">
            <div className="accueil-hero-aside-inner overflow-hidden rounded-ofc-card bg-white p-1 shadow-ofc-sm ring-1 ring-ofc-border">
              <AccueilHeroVideo className="accueil-hero-video-media aspect-[4/3] h-auto w-full rounded-[calc(var(--radius-ofc-card)-2px)] object-cover" />
            </div>
          </aside>
        </div>

        <AccueilPreuveSocialeCompact variant="embedded" />
      </div>
    </section>
  );
}
