import Image from 'next/image';
import { PHOTOS } from '@/lib/photos';

const Q = PHOTOS.qualiopiLogoOfficiel;

type QualiopiLogoInlineProps = {
  /** Hauteur d’affichage (px) — largeur calculée au ratio du logo officiel */
  heightPx?: number;
  className?: string;
  /**
   * Vide si le mot « Qualiopi » est déjà présent à côté (logo décoratif).
   * Sinon utiliser `Q.alt` pour un bloc image seul.
   */
  alt?: string;
};

/** Logo Qualiopi horizontal — usage inline à côté du mot « Qualiopi » (alt vide par défaut). */
export function QualiopiLogoInline({
  heightPx = 18,
  className = '',
  alt = '',
}: QualiopiLogoInlineProps) {
  const w = Math.max(1, Math.round((Q.width / Q.height) * heightPx));
  return (
    <Image
      src={Q.src}
      alt={alt}
      width={w}
      height={heightPx}
      className={`inline-block shrink-0 object-contain object-left ${className}`}
      sizes={`${w}px`}
    />
  );
}

/** Logo + libellé « Qualiopi » — accessibilité : texte visible + image décorative */
export function QualiopiWordmark({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 align-middle ${className ?? ''}`}>
      <QualiopiLogoInline heightPx={16} />
      <span>Qualiopi</span>
    </span>
  );
}

/** Logo officiel pour encarts (footer, cartes) — texte alternatif complet */
export function QualiopiLogoBlock({ className }: { className?: string }) {
  return (
    <Image
      src={Q.src}
      alt={Q.alt}
      width={Q.width}
      height={Q.height}
      className={`h-auto w-full max-w-[200px] object-contain ${className ?? ''}`}
      sizes="200px"
    />
  );
}
