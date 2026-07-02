import Image from 'next/image';
import { PHOTOS } from '@/lib/photos';

const Q = PHOTOS.qualiopiLogoOfficiel;

type QualiopiLogoInlineProps = {
  heightPx?: number;
  className?: string;
  alt?: string;
};

/** Inline — libellé texte uniquement (le bloc Certifopac ne se redimensionne pas en miniature). */
export function QualiopiLogoInline({ className = '', alt: _alt = '' }: QualiopiLogoInlineProps) {
  return (
    <span className={`inline-block shrink-0 font-semibold text-[#1e3a8a] ${className}`} aria-hidden>
      Qualiopi
    </span>
  );
}

export function QualiopiWordmark({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 align-middle font-semibold text-[#1e3a8a] ${className ?? ''}`}>
      Qualiopi
    </span>
  );
}

/** Bloc Certifopac — mention ACTIONS DE FORMATION intégrée au visuel (sans texte dupliqué). */
export function QualiopiLogoBlock({ className }: { className?: string }) {
  return (
    <span className={`inline-block rounded-lg bg-white p-2 ${className ?? ''}`}>
      <Image
        src={Q.src}
        alt={Q.alt}
        width={Q.width}
        height={Q.height}
        className="h-auto w-full max-w-[min(100%,32rem)] object-contain object-left"
        sizes="(max-width: 640px) 100vw, 32rem"
      />
    </span>
  );
}

/** Alias charte Qualiopi — toujours utiliser ce composant plutôt que l'image seule. */
export function QualiopiBadge({ className }: { className?: string }) {
  return <QualiopiLogoBlock className={className} />;
}
