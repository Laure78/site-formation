import Image from 'next/image';
import { PHOTOS } from '@/lib/photos';

const Q = PHOTOS.qualiopiLogoOfficiel;

type QualiopiLogoSize = 'default' | 'lg';

type QualiopiLogoBlockProps = {
  className?: string;
  size?: QualiopiLogoSize;
};

/**
 * Mention textuelle « Qualiopi » dans le corps de texte.
 * Ne remplace pas le logo officiel Certifopac — utiliser `QualiopiBadge` pour tout affichage graphique.
 */
export function QualiopiWordmark({ className }: { className?: string }) {
  return <span className={className}>Qualiopi</span>;
}

/** Bloc Certifopac — mention ACTIONS DE FORMATION intégrée au visuel (sans texte dupliqué). */
export function QualiopiLogoBlock({ className = '', size = 'default' }: QualiopiLogoBlockProps) {
  const isLarge = size === 'lg';

  return (
    <span
      className={`inline-block shrink-0 rounded-lg bg-white ${isLarge ? 'p-1.5' : 'p-2'} ${className}`}
    >
      <Image
        src={Q.src}
        alt={Q.alt}
        width={Q.width}
        height={Q.height}
        className={
          isLarge
            ? 'h-auto w-full max-w-[min(100%,28rem)] object-contain object-left sm:w-[28rem] sm:max-w-[28rem]'
            : 'h-auto w-full max-w-[min(100%,32rem)] object-contain object-left'
        }
        sizes={isLarge ? '(max-width: 640px) 100vw, 28rem' : '(max-width: 640px) 100vw, 32rem'}
      
        quality={70}
        loading="lazy"/>
    </span>
  );
}

/** Alias charte Qualiopi — toujours utiliser ce composant plutôt que l'image seule. */
export function QualiopiBadge({ className, size = 'default' }: QualiopiLogoBlockProps) {
  return <QualiopiLogoBlock className={className} size={size} />;
}
