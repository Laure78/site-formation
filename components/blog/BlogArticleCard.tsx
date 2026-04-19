import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { BlogArticle } from '@/lib/blog';
import { SITE_CONFIG } from '@/lib/seo';
import { getArticleCategory } from '@/lib/blog';
import { BLOG_CATEGORIES } from '@/lib/blog';
import { estimateWordCountForSection } from '@/lib/blog';

type CardArticle = Pick<
  BlogArticle,
  | 'slug'
  | 'title'
  | 'description'
  | 'date'
  | 'dateModified'
  | 'sections'
  | 'readingTime'
  | 'coverImage'
  | 'keywords'
>;

function estimateReadingMinutes(article: {
  sections: BlogArticle['sections'];
}): number {
  const words = article.sections.reduce((sum, s) => sum + estimateWordCountForSection(s as never), 0);
  return Math.max(1, Math.round(words / 200));
}

export function BlogArticleCard({
  article,
  highlighted,
  showTags = true,
}: {
  article: CardArticle;
  highlighted?: boolean;
  showTags?: boolean;
}) {
  const readingMinutes =
    article.sections && Array.isArray(article.sections) && article.sections.length > 0
      ? estimateReadingMinutes(article as BlogArticle)
      : null;
  const readingLabel = article.readingTime
    ? article.readingTime
    : readingMinutes != null
      ? `${readingMinutes} min de lecture`
      : null;

  const cat = getArticleCategory(article.slug);
  const pub = new Date(article.date);
  const updated = article.dateModified ? new Date(article.dateModified) : null;

  return (
    <article
      className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition-shadow hover:shadow-md ${
        highlighted
          ? 'border-2 border-[#377CF3] ring-1 ring-[#377CF3]/20'
          : 'border border-slate-200'
      }`}
    >
      <div className="p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
          <time dateTime={article.date}>
            {pub.toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </time>
          {updated && updated.getTime() !== pub.getTime() && (
            <>
              <span aria-hidden>·</span>
              <span>
                Mis à jour le{' '}
                {updated.toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </>
          )}
          {readingLabel != null && (
            <>
              <span aria-hidden>·</span>
              <span>{readingLabel}</span>
            </>
          )}
          <span aria-hidden>·</span>
          <span>{BLOG_CATEGORIES[cat]}</span>
        </div>
        <h3 className="mt-3 font-display text-2xl font-bold text-slate-900">
          <Link href={`/blog/${article.slug}`} className="hover:text-[#377CF3] hover:underline">
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 text-slate-600">{article.description}</p>
        {showTags && article.keywords && article.keywords.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-2" aria-label="Mots-clés">
            {article.keywords.slice(0, 5).map((k) => (
              <li key={k}>
                <span className="rounded-full bg-[#F2F2F2] px-2.5 py-0.5 text-xs font-medium text-slate-700">
                  {k}
                </span>
              </li>
            ))}
          </ul>
        )}
        <p className="sr-only">Par {SITE_CONFIG.name}</p>
        <Link
          href={`/blog/${article.slug}`}
          className="mt-4 inline-flex items-center gap-2 font-medium text-[#377CF3] hover:underline"
        >
          Lire l&apos;article
          <ArrowRight size={18} strokeWidth={1.5} aria-hidden />
        </Link>
      </div>
    </article>
  );
}
