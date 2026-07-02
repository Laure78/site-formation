import Link from 'next/link';
import { AccueilHeroVideoEmbed } from '@/components/landing/AccueilHeroVideoEmbed';
import { LINKS } from '@/lib/internal-links';
import { getOfcPromoVideoSectionHeading } from '@/lib/ofc-promo-video';

/**
 * Bloc hero vidéo accueil — structure sémantique pour l’indexation Google Video.
 */
export function AccueilHeroVideoSection() {
  const heading = getOfcPromoVideoSectionHeading();

  return (
    <section
      id="video-formation-ia-btp"
      aria-labelledby="accueil-hero-video-title"
      className="w-full"
    >
      <h2
        id="accueil-hero-video-title"
        className="mb-3 text-center font-display text-base font-semibold text-slate-800 sm:text-left md:text-lg"
      >
        {heading}
      </h2>
      <AccueilHeroVideoEmbed />
      <p className="mt-2 text-center text-xs leading-relaxed text-slate-500 sm:text-left">
        Présentation des formations IA pour le bâtiment et les travaux publics (devis, appels
        d&apos;offres, comptes rendus de chantier) — présentiel Île-de-France, Qualiopi.{' '}
        <Link
          href={LINKS.videoFormationsIaBtp}
          className="font-medium text-[#377CF3] underline-offset-2 hover:underline"
        >
          Page vidéo dédiée
        </Link>
      </p>
    </section>
  );
}
