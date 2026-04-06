import Image from 'next/image';
import { PHOTOS, GALERIE_LINKEDIN_FORMATION, type PhotoKey } from '@/lib/photos';

type Props = {
  /** Sous-ensemble ou ordre personnalisé ; par défaut toute la galerie */
  keys?: PhotoKey[];
  className?: string;
};

/**
 * Grille de visuels uniformes (4:3) pour cours LinkedIn Learning & formatrice.
 */
export function LinkedInFormationGallery({
  keys = GALERIE_LINKEDIN_FORMATION,
  className = '',
}: Props) {
  return (
    <div
      className={`grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 ${className}`}
    >
      {keys.map((key) => {
        const p = PHOTOS[key];
        return (
          <div
            key={key}
            className="relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm"
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 240px"
            />
          </div>
        );
      })}
    </div>
  );
}
