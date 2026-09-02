import Link from 'next/link';
import { AccueilHeroVideo } from '@/components/landing/AccueilHeroVideo';
import { getAccueilHeroReassuranceLine } from '@/lib/accueil-config';
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

/** Hero accueil — promesse, preuve compacte, double CTA. */
export function AccueilHeroSection() {
  return (
    <section className={`${OFC_SEC.hero} relative overflow-hidden`}>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23377cf3\' fill-opacity=\'0.045\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-90" />
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="accueil-hero-fold">
          <div className="accueil-hero-content min-w-0">
            <h1 className={`${OFC_TYPE_HERO} mt-2`}>
              Formation IA pour les professionnels du BTP
            </h1>
            <p className={`${OFC_TYPE_LEAD} mt-4 font-medium text-ofc-ink`}>
              Gagnez du temps sur vos devis, DCE, comptes rendus, documents de chantier et appels
              d&apos;offres grâce à l&apos;intelligence artificielle.
            </p>
            <p className="mt-4 text-sm font-medium text-slate-600 md:text-base">
              {getAccueilHeroReassuranceLine()}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={LINKS.formations}
                data-cta="formations"
                className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 w-full items-center justify-center px-6 py-3 sm:w-auto`}
              >
                Découvrir les formations
              </Link>
              <Link
                href={LINKS.contact}
                data-cta="contact-besoin"
                className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center px-6 py-3 sm:w-auto`}
              >
                Parler de mon besoin
              </Link>
            </div>
          </div>

          <aside className="accueil-hero-aside mx-auto w-full max-w-[280px] shrink-0 lg:mx-0 lg:max-w-none xl:max-w-[360px]">
            <Link
              href={HERO_ASIDE_LINK.href}
              title={HERO_ASIDE_LINK.title}
              className="block overflow-hidden rounded-2xl bg-white/95 p-1 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.25)] ring-1 ring-slate-200/80 transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
            >
              <AccueilHeroVideo className="h-auto w-full rounded-[0.85rem] object-cover" />
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
