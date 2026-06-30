import Link from 'next/link';
import { AccueilHeroVideoEmbed } from '@/components/landing/AccueilHeroVideoEmbed';
import { LINKS } from '@/lib/internal-links';
import { getOfcPromoVideoTitle } from '@/lib/ofc-promo-video';

/**
 * Bloc hero vidéo accueil — structure sémantique pour l’indexation Google Video.
 */
export function AccueilHeroVideoSection() {
  const title = getOfcPromoVideoTitle();

  return (
    <section
      id="video-formation-ia-btp"
      aria-labelledby="accueil-hero-video-title"
      className="w-full"
    >
      <h2 id="accueil-hero-video-title" className="sr-only">
        {title}
      </h2>
      <p className="mb-2 text-center text-xs font-medium text-slate-600 sm:text-left">
        Vidéo — formations IA BTP Qualiopi
      </p>
      <AccueilHeroVideoEmbed />
      <p className="mt-2 text-center text-xs leading-relaxed text-slate-500 sm:text-left">
        Présentation des formations IA pour le bâtiment et les travaux publics (devis, AO, chantier).{' '}
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
