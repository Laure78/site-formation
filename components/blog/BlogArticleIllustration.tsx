import Image from 'next/image';
import type { BlogIllustration } from '@/lib/blog-article-illustrations';

type Props = {
  ill: BlogIllustration;
  /** LCP — uniquement pour la première image de l’article */
  priority?: boolean;
};

/**
 * Figure responsive pour les articles blog — bordure et ratio cohérents avec le site.
 */
export function BlogArticleIllustration({ ill, priority }: Props) {
  return (
    <figure className="my-10 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={ill.src}
          alt={ill.alt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 768px"
          priority={priority}
        />
      </div>
    </figure>
  );
}
