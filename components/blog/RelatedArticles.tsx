import Link from 'next/link';
import type { BlogArticle } from '@/lib/blog';
import { OFC_CARD } from '@/lib/ofc-interaction-classes';

type Props = {
  articles: BlogArticle[];
  title?: string;
  className?: string;
};

export function RelatedArticles({
  articles,
  title = 'Articles associés — à lire aussi',
  className = '',
}: Props) {
  if (articles.length === 0) return null;
  return (
    <section className={`border-t border-slate-200 pt-12 ${className}`}>
      <h2 className="font-display text-xl font-semibold text-slate-900">{title}</h2>
      <p className="mt-2 text-sm text-slate-600">
        Continuez à explorer nos ressources sur l&apos;IA pour le BTP.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <Link
            key={a.slug}
            href={`/blog/${a.slug}`}
            className={`${OFC_CARD} group block p-4`}
          >
            <span className="font-medium text-slate-900 transition-colors duration-150 group-hover:text-[#377CF3]">
              {a.title}
            </span>
            {a.description && (
              <p className="mt-2 line-clamp-2 text-sm text-slate-600">{a.description}</p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
