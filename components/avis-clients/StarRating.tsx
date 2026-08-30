import { Star } from 'lucide-react';

type StarRatingProps = {
  rating: number;
  max?: number;
  size?: number;
  className?: string;
};

/** Étoiles accessibles — aria-label explicite, pas d’info véhiculée par la couleur seule. */
export function StarRating({ rating, max = 5, size = 16, className = '' }: StarRatingProps) {
  const clamped = Math.max(0, Math.min(max, Math.round(rating)));
  const label = `${clamped} étoile${clamped > 1 ? 's' : ''} sur ${max}`;

  return (
    <div
      className={`flex gap-0.5 text-amber-400 ${className}`.trim()}
      role="img"
      aria-label={label}
    >
      {[...Array(max)].map((_, i) => (
        <Star
          key={i}
          size={size}
          fill={i < clamped ? 'currentColor' : 'none'}
          strokeWidth={1.5}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

/** Cinq étoiles pleines — preuve sociale sans note chiffrée. */
export function FiveStarsDisplay({ size = 20, className = '' }: { size?: number; className?: string }) {
  return <StarRating rating={5} max={5} size={size} className={className} />;
}
