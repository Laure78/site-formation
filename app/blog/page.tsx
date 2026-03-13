import Link from 'next/link';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';
import {
  BLOG_CATEGORIES,
  getArticlesByCategory,
} from '@/lib/blog';
import type { BlogCategoryId } from '@/lib/blog';
import { ArrowRight } from 'lucide-react';

export const metadata = createPageMetadata({
  title: 'Formation IA BTP — Articles, guides pratiques',
  description:
    'Articles et guides sur la formation IA BTP : ChatGPT artisans, financement Constructys, automatiser devis bâtiment. Qualiopi.',
  path: '/blog',
  keywords: ['blog formation IA BTP', 'ressources IA bâtiment', 'articles ChatGPT BTP'],
});

function ArticleCard({
  article,
}: {
  article: { slug: string; title: string; description: string; date: string };
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:p-8">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
        <time dateTime={article.date}>
          {new Date(article.date).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </time>
        <span aria-hidden>·</span>
        <span>Par {SITE_CONFIG.name}</span>
      </div>
      <h2 className="mt-3 font-display text-2xl font-bold text-slate-900">
        <Link
          href={`/blog/${article.slug}`}
          className="hover:text-[var(--accent)] hover:underline"
        >
          {article.title}
        </Link>
      </h2>
      <p className="mt-2 text-slate-600">{article.description}</p>
      <Link
        href={`/blog/${article.slug}`}
        className="mt-4 inline-flex items-center gap-2 font-medium text-[var(--accent)] hover:underline"
      >
        Lire l&apos;article
        <ArrowRight size={18} strokeWidth={1.5} />
      </Link>
    </article>
  );
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ categorie?: string }>;
}) {
  const { categorie } = await searchParams;
  const isValidCat =
    categorie && categorie in BLOG_CATEGORIES ? (categorie as BlogCategoryId) : null;

  const grouped = getArticlesByCategory();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
        Formation IA BTP : ressources et articles
      </h1>
      <p className="mt-4 text-xl text-slate-600">
        Guides pratiques sur l&apos;IA pour le BTP, le financement des formations et
        les gains de productivité.
      </p>

      <div className="mt-8 rounded-2xl border-2 border-[var(--accent)] bg-[var(--accent-soft)] p-6">
        <p className="font-semibold text-slate-900">
          Formations IA BTP — Devis et chiffrage · Appels d&apos;offres · Productivité chantier
        </p>
        <Link
          href="/formations"
          className="mt-3 inline-flex items-center gap-2 font-medium text-[var(--accent)] hover:underline"
        >
          Voir le catalogue formations
          <ArrowRight size={18} strokeWidth={1.5} />
        </Link>
      </div>

      {/* Filtres par catégorie */}
      <div className="mt-12 flex flex-wrap gap-2">
        <Link
          href="/blog"
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            !isValidCat
              ? 'bg-[var(--accent)] text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Tous
        </Link>
        {(Object.entries(BLOG_CATEGORIES) as [BlogCategoryId, string][]).map(
          ([id, label]) => {
            const count = grouped[id]?.length ?? 0;
            if (count === 0) return null;
            return (
              <Link
                key={id}
                href={`/blog?categorie=${id}`}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isValidCat === id
                    ? 'bg-[var(--accent)] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {label} ({count})
              </Link>
            );
          }
        )}
      </div>

      {/* Liste des articles */}
      <div className="mt-10 space-y-10">
        {isValidCat ? (
          grouped[isValidCat].length > 0 ? (
            grouped[isValidCat].map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))
          ) : (
            <p className="text-slate-600">Aucun article dans cette catégorie.</p>
          )
        ) : (
          (Object.keys(BLOG_CATEGORIES) as BlogCategoryId[])
            .filter((id) => grouped[id]?.length > 0)
            .map((id) => (
              <section key={id}>
                <h2 className="mb-6 border-b border-slate-200 pb-2 font-display text-xl font-bold text-slate-900">
                  {BLOG_CATEGORIES[id]}
                </h2>
                <div className="space-y-8">
                  {grouped[id].map((article) => (
                    <ArticleCard key={article.slug} article={article} />
                  ))}
                </div>
              </section>
            ))
        )}
      </div>
    </div>
  );
}
