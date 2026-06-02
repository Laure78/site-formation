import { ExternalLink, Quote, Star } from 'lucide-react';

/**
 * Données d'un témoignage client.
 * - `firstNameInitial` : prénom + initiale du nom (anonymisation RGPD-friendly, ex. « Marc D. »).
 * - `company` : à renseigner UNIQUEMENT si la personne a donné son accord explicite.
 * - `googleReviewUrl` : lien direct vers l'avis Google → rend le témoignage vérifiable.
 */
export type TestimonialProps = {
  firstNameInitial: string;
  role: string;
  company?: string;
  quote: string;
  googleReviewUrl?: string;
  /** Note sur 5 (affichage uniquement ; ne pas dériver de schéma sans avis vérifiable). */
  rating?: number;
};

export function Testimonial({
  firstNameInitial,
  role,
  company,
  quote,
  googleReviewUrl,
  rating,
}: TestimonialProps) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <Quote
        size={24}
        strokeWidth={1.5}
        className="text-[var(--accent)]"
        aria-hidden="true"
      />

      {typeof rating === 'number' ? (
        <div className="mt-3 flex gap-0.5 text-amber-400" aria-label={`Note ${rating} sur 5`}>
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              fill={i < Math.floor(rating) ? 'currentColor' : 'none'}
              strokeWidth={1.5}
              aria-hidden="true"
            />
          ))}
        </div>
      ) : null}

      <blockquote className="mt-4 flex-1 text-slate-700">
        <p>«&nbsp;{quote}&nbsp;»</p>
      </blockquote>

      <figcaption className="mt-5 border-t border-slate-100 pt-4">
        <div className="font-semibold text-slate-900">{firstNameInitial}</div>
        <div className="text-sm text-slate-600">
          {role}
          {company ? ` — ${company}` : ''}
        </div>
        {googleReviewUrl ? (
          <a
            href={googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] hover:underline"
          >
            Voir l&apos;avis sur Google
            <ExternalLink size={14} strokeWidth={1.5} aria-hidden="true" />
          </a>
        ) : null}
      </figcaption>
    </figure>
  );
}
