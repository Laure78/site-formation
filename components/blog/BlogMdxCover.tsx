import Image from 'next/image';
import { normalizePhotoAlt } from '@/lib/image-alt';

type Props = {
  src: string;
  alt: string;
  /** LCP — couverture visible au-dessus de la ligne de flottaison sur mobile */
  priority?: boolean;
};

/**
 * Couverture article blog MDX — même visuel que la carte `/blog` (ratio 16/10, object-cover).
 */
export function BlogMdxCover({ src, alt, priority }: Props) {
  const normalizedAlt = normalizePhotoAlt(alt);
  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={src}
          alt={normalizedAlt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 768px"
          priority={priority}
          quality={75}
        />
      </div>
    </figure>
  );
}
