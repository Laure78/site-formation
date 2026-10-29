import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { AccueilHeroVideo } from '@/components/landing/AccueilHeroVideo';
import { AccueilHeroReassurance } from '@/components/landing/accueil/AccueilHeroReassurance';
import { AnimHeroRotatorBadges } from '@/components/motion/AnimHeroRotatorBadges';
import { HeroWordReveal } from '@/components/motion/HeroWordReveal';
import { Badge } from '@/components/ui/Badge';
import { PRENDRE_RDV_DUREE_MINUTES } from '@/lib/prendre-rendez-vous-page-config';
import { LINKS } from '@/lib/internal-links';
import {
  OFC_CTA_PRIMARY,
  OFC_CTA_SECONDARY,
  OFC_LINK,
  OFC_TYPE_LEAD,
} from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';
import { EnBref } from '@/app/components/EnBref';
import { ACCUEIL_EN_BREF } from '@/lib/accueil-geo';

/** Hero accueil — 1 CTA primaire RDV, 1 secondaire formations, vidéo sous le texte sur mobile. */
export function AccueilHeroSection() {
  return (
    <section
      id="accueil-hero"
      className={`${OFC_SEC.hero} relative overflow-hidden !py-5 md:!py-6 lg:!py-7`}
    >
      <div className="relative mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
        <div className="accueil-hero-fold">
          <div className="accueil-hero-content order-1 min-w-0">
            <Badge>Formatrice IA spécialisée BTP</Badge>
            <AnimHeroRotatorBadges />
            <h1
              data-anim="split-words"
              className="accueil-hero-title mt-2 max-w-3xl font-display text-[clamp(1.45rem,1.1rem+1.25vw,1.95rem)] font-extrabold leading-[1.18] tracking-tight text-ofc-ink text-balance"
            >
              <HeroWordReveal text="Formations IA pour les entreprises du BTP en Île-de-France" />
            </h1>
            <EnBref text={ACCUEIL_EN_BREF} className="mt-4 max-w-xl" />
            <p
              data-anim-follow
              className={`${OFC_TYPE_LEAD} mt-2 max-w-xl text-[0.9375rem] leading-[1.55] text-ofc-ink md:text-base`}
            >
              Apprenez à utiliser ChatGPT et Claude pour préparer vos devis, analyser vos appels
              d’offres et simplifier le suivi de chantier. Des formations pratiques, en présentiel,
              adaptées à votre métier — dispensées par{' '}
              <Link href={LINKS.aPropos} className={`${OFC_LINK} font-medium`}>
                notre organisme de formation spécialisé dans le BTP
              </Link>
              .
            </p>
            <div data-anim-follow className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
              <Link
                href={`${LINKS.prendreRdv}?src=accueil-hero`}
                data-cta="rdv-hero"
                data-anim="roll-button"
                className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 w-full items-center justify-center gap-2 px-5 py-2.5 text-sm sm:w-auto md:px-6 md:py-3 md:text-base`}
              >
                <span className="anim-roll-icon" aria-hidden>
                  <ChevronRight className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
                </span>
                <span data-roll-label>
                  Échanger sur mon besoin — visio {PRENDRE_RDV_DUREE_MINUTES} min offerte
                </span>
              </Link>
              <Link
                href="#accueil-offre-choix"
                data-cta="voir-formations"
                data-anim="roll-button"
                className={`${OFC_CTA_SECONDARY} ofc-cta-with-arrow inline-flex min-h-11 w-full items-center justify-center gap-1.5 px-5 py-2.5 text-sm sm:w-auto md:px-6 md:py-3 md:text-base`}
              >
                <span data-roll-label>Voir les formations</span>
                <ChevronRight className="ofc-cta__arrow h-4 w-4 shrink-0" strokeWidth={2.25} aria-hidden />
              </Link>
            </div>
            <p data-anim-follow className="mt-2.5">
              <Link
                href={`${LINKS.formationIaIntraEntrepriseBtp}?src=accueil-hero`}
                className={`${OFC_LINK} text-xs font-medium text-ofc-ink-muted md:text-sm`}
              >
                Former mon équipe en intra-entreprise
              </Link>
            </p>
            <div data-anim-follow>
              <AccueilHeroReassurance />
            </div>
          </div>

          <aside
            data-anim="scale-media"
            className="anim-scale-media-shell accueil-hero-aside order-2 mt-5 w-full min-w-0 md:order-none md:mt-0"
          >
            <div className="accueil-hero-aside-inner mx-auto w-full max-w-none overflow-hidden rounded-ofc-card bg-white p-1 shadow-ofc-md ring-1 ring-ofc-border md:mx-0">
              <AccueilHeroVideo className="accueil-hero-video-media aspect-video h-auto w-full rounded-[calc(var(--radius-ofc-card)-2px)] object-cover" />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
