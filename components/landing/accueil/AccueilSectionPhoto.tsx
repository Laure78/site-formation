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
};

/**
 * Visuel de section accueil — figure sémantique + figcaption SEO.
 * Alt / title / description viennent de `lib/photos.ts`.
 */
export function AccueilSectionPhoto({
  photo,
  caption,
  className,
  priority = false,
  sizes = '(max-width: 768px) 100vw, 896px',
}: AccueilSectionPhotoProps) {
  const legend = caption ?? photo.description;

  return (
    <figure className={cn('overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50', className)}>
      <div className="relative aspect-[16/9] w-full">
        <Image
          src={photo.src}
          alt={photo.alt}
          title={photo.title}
          width={photo.width}
          height={photo.height}
          className="h-full w-full object-cover"
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          quality={75}
        />
      </div>
      {legend ? (
        <figcaption className="border-t border-slate-100 bg-white px-4 py-3 text-sm leading-relaxed text-slate-600 md:px-5 md:py-3.5">
          {legend}
        </figcaption>
      ) : null}
    </figure>
  );
}
