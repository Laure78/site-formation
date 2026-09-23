import {
  PhotoThumbnailLightbox,
  type PhotoThumbnailLightboxProps,
} from '@/components/ui/PhotoThumbnailLightbox';

type DevWebIaSectionVisualProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  title?: string;
  /** Description longue — lightbox uniquement (légende section conservée ailleurs). */
  description?: string;
  priority?: boolean;
  className?: string;
  /** Légende sous la miniature (défaut : title). */
  caption?: string;
};

/**
 * Illustration NIV-10 — miniature compacte + lightbox (fichier source inchangé).
 */
export function DevWebIaSectionVisual({
  src,
  alt,
  width,
  height,
  title,
  description,
  priority,
  className = '',
  caption,
}: DevWebIaSectionVisualProps) {
  const lightboxProps: PhotoThumbnailLightboxProps = {
    src,
    alt,
    width,
    height,
    title,
    caption: caption ?? title,
    detail: description,
    priority,
    className,
  };

  return <PhotoThumbnailLightbox {...lightboxProps} />;
}
