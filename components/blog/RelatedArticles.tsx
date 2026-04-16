import Link from 'next/link';
import type { BlogArticle } from '@/lib/blog';

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
            className="group block rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:border-[var(--accent)] hover:shadow-md"
          >
            <span className="font-medium text-slate-900 group-hover:text-[var(--accent)]">{a.title}</span>
            {a.description && (
              <p className="mt-2 line-clamp-2 text-sm text-slate-600">{a.description}</p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
