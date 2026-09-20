import Image from 'next/image';
import { cn } from '@/lib/cn';

type AccueilPhoto = {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  width: number;
  height: number;
};

type AccueilSectionPhotoProps = {
  photo: AccueilPhoto;
  /** Légende visible (figcaption) — ne pas recopier l’alt. */
  caption?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  /**
   * sm ≈ 280px · md ≈ 360px · lg ≈ 420px (largeur max desktop).
   * Par défaut md — ancrage discret, pas de bannière pleine largeur.
   */
  size?: 'sm' | 'md' | 'lg';
};

const SIZE_CLASS = {
  sm: 'max-w-[17.5rem]',
  md: 'max-w-[22.5rem]',
  lg: 'max-w-[26.25rem]',
} as const;

/**
 * Visuel de section accueil — format compact, coin arrondi, légende discrète.
 * Alt / title / description viennent de `lib/photos.ts`.
 */
export function AccueilSectionPhoto({
  photo,
  caption,
  className,
  priority = false,
  sizes,
  size = 'md',
}: AccueilSectionPhotoProps) {
  const legend = caption ?? photo.description;
  const sizesAttr =
    sizes ??
    (size === 'sm'
      ? '(max-width: 768px) 70vw, 280px'
      : size === 'lg'
        ? '(max-width: 768px) 85vw, 420px'
        : '(max-width: 768px) 80vw, 360px');

  return (
    <figure className={cn('w-full', SIZE_CLASS[size], className)}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-ofc-canvas ring-1 ring-ofc-border/70">
        <Image
          src={photo.src}
          alt={photo.alt}
          title={photo.title}
          width={photo.width}
          height={photo.height}
          className="h-full w-full object-cover"
          sizes={sizesAttr}
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          quality={70}
        />
      </div>
      {legend ? (
        <figcaption className="mt-2.5 text-xs leading-relaxed text-ofc-ink-subtle md:text-[0.8125rem]">
          {legend}
        </figcaption>
      ) : null}
    </figure>
  );
}
