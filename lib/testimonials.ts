import type { TestimonialProps } from '@/components/testimonials/Testimonial';

/**
 * Témoignages clients — à remplir avec de VRAIS avis vérifiables.
 *
 * ⚠️ 3 emplacements ci-dessous sont à compléter avec des avis RÉELS (citation fidèle,
 * fonction, entreprise uniquement si accord, et idéalement le lien vers l'avis Google).
 * Tant qu'un emplacement a une `quote` ou un `firstNameInitial` vide, il N'EST PAS affiché
 * (voir `getFilledTestimonials`), pour éviter d'exposer des témoignages fictifs.
 *
 * ───────────────────────────────────────────────────────────────────────────
 * TODO(SEO — schéma Review / AggregateRating) :
 *   NE PAS générer de JSON-LD `Review` / `AggregateRating` tant que ces avis ne sont
 *   pas réels et vérifiables (risque de pénalité Google + non-conformité aux Rich
 *   Results guidelines).
 *   Le mécanisme existe déjà et est désactivé : une fois les 3 avis réels obtenus,
 *     1) renseigner `HOME_VERIFIED_REVIEWS_FOR_SCHEMA` dans
 *        `lib/schema-home-verified-reviews-data.ts` (identité + date + citation fidèle) ;
 *     2) passer `HOME_USE_VERIFIED_REVIEWS_IN_JSON_LD` à `true` dans
 *        `lib/schema-home-organization.ts`.
 *   Ne PAS dupliquer de schéma d'avis ici.
 * ───────────────────────────────────────────────────────────────────────────
 */
export const TESTIMONIALS: TestimonialProps[] = [
  // TODO(avis réel #1) — prénom + initiale, fonction, entreprise (si accord), citation, lien Google
  {
    firstNameInitial: '',
    role: '',
    quote: '',
    // company: '',
    // googleReviewUrl: '',
    // rating: 5,
  },
  // TODO(avis réel #2)
  {
    firstNameInitial: '',
    role: '',
    quote: '',
    // company: '',
    // googleReviewUrl: '',
    // rating: 5,
  },
  // TODO(avis réel #3)
  {
    firstNameInitial: '',
    role: '',
    quote: '',
    // company: '',
    // googleReviewUrl: '',
    // rating: 5,
  },
];

/** Ne renvoie que les témoignages réellement remplis (citation + auteur non vides). */
export function getFilledTestimonials(): TestimonialProps[] {
  return TESTIMONIALS.filter(
    (t) => t.quote.trim().length > 0 && t.firstNameInitial.trim().length > 0
  );
}
