import Link from 'next/link';
import { existsSync } from 'fs';
import { join } from 'path';
import { createPageMetadata, getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import { FAQ_BLOG } from '@/lib/faq';
import {
  BLOG_CATEGORIES,
  getArticlesByCategory,
  getAllArticles,
  getFeaturedBlogArticles,
  excludeArticlesBySlug,
  getArticleCategory,
  estimateWordCountForSection,
} from '@/lib/blog';
import type { BlogCategoryId } from '@/lib/blog';
import { ArrowRight } from 'lucide-react';
import { FAQSection } from '@/components/landing/FAQSection';
import { CTABlock } from '@/components/CTABlock';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { JsonLd } from '@/components/JsonLd';

export const metadata = createPageMetadata({
  title: 'Formation IA BTP — Articles, guides pratiques',
  description:
    'Articles et guides IA pour le BTP : devis, appels d\'offres, CCTP/DCE, ChatGPT, Constructys. Méthode terrain par Laure Olivié, formatrice Qualiopi.',
  path: '/blog',
  keywords: ['blog formation IA BTP', 'ressources IA bâtiment', 'articles ChatGPT BTP'],
});

const faqSchema = getFAQSchema(FAQ_BLOG);

function safeInt(value: unknown, fallback: number): number {
  const n = typeof value === 'string' ? parseInt(value, 10) : typeof value === 'number' ? value : NaN;
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function estimateReadingMinutes(article: {
  sections: Array<{ content: string | string[] | Array<{ titre: string; prompt: string; usage?: string }> }>;
}): number {
  const words = article.sections.reduce((sum, s) => sum + estimateWordCountForSection(s as never), 0);
  // Règle simple (200 mots/min) — bornée à 1 min minimum.
  return Math.max(1, Math.round(words / 200));
}

function resolveCoverImageUrl(article: { slug: string; coverImage?: string }): string {
  if (article.coverImage) {
    return article.coverImage.startsWith('http')
      ? article.coverImage
      : `${SITE_CONFIG.url.replace(/\/$/, '')}${article.coverImage}`;
  }
  const localPath = join(process.cwd(), 'content', 'blog', article.slug, 'cover.png');
  if (existsSync(localPath)) {
    return `/content/blog/${article.slug}/cover.png`;
  }
  return '/images/laure-olivie-formatrice.png';
}

function buildBlogJsonLd(): Record<string, unknown> {
  const base = SITE_CONFIG.url.replace(/\/$/, '');
  const articles = getAllArticles();
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${base}/blog#blog`,
    name: 'Blog Formation IA BTP — Laure Olivié',
    publisher: { '@id': `${base}/#organization` },
    author: { '@type': 'Person', name: SITE_CONFIG.name },
    blogPost: articles.map((a) => ({
      '@type': 'BlogPosting',
      headline: a.title,
      url: `${base}/blog/${a.slug}`,
      datePublished: a.date,
      image: resolveCoverImageUrl(a),
      author: { '@type': 'Person', name: SITE_CONFIG.name },
    })),
  };
}

function ArticleCard({
  article,
  highlighted,
}: {
  article: {
    slug: string;
    title: string;
    description: string;
    date: string;
    sections?: unknown;
    coverImage?: string;
    readingTime?: string;
  };
  highlighted?: boolean;
}) {
  const readingMinutes =
    article.sections && Array.isArray(article.sections) && article.sections.length > 0
      ? estimateReadingMinutes(article as never)
      : null;
  const readingLabel = article.readingTime
    ? article.readingTime
    : readingMinutes != null
      ? `${readingMinutes} min de lecture`
      : null;
  return (
    <article
      className={`rounded-2xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:p-8 ${
        highlighted
          ? 'border-2 border-[var(--accent)] ring-1 ring-[var(--accent)]/20'
          : 'border border-slate-200'
      }`}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
        <time dateTime={article.date}>
          {new Date(article.date).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </time>
        {readingLabel != null && (
          <>
            <span aria-hidden>·</span>
            <span>{readingLabel}</span>
          </>
        )}
        <span aria-hidden>·</span>
        <span>Par {SITE_CONFIG.name}</span>
      </div>
      <h3 className="mt-3 font-display text-2xl font-bold text-slate-900">
        <Link
          href={`/blog/${article.slug}`}
          className="hover:text-[var(--accent)] hover:underline"
        >
          {article.title}
        </Link>
      </h3>
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
  searchParams: Promise<{ categorie?: string; page?: string }>;
}) {
  const { categorie, page } = await searchParams;
  const isValidCat =
    categorie && categorie in BLOG_CATEGORIES ? (categorie as BlogCategoryId) : null;
  const currentPage = Math.max(1, safeInt(page, 1));
  const PAGE_SIZE = 9;

  const grouped = getArticlesByCategory();
  const featured = getFeaturedBlogArticles();
  const featuredForView = isValidCat
    ? featured.filter((a) => getArticleCategory(a.slug) === isValidCat)
    : featured;
  const slugsToExclude = new Set(featuredForView.map((a) => a.slug));

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <JsonLd id="schema-faq-page" schema={faqSchema} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBlogJsonLd()) }}
      />
      <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
        Formation IA BTP : ressources et articles
      </h1>
      <p className="mt-4 text-xl text-slate-600">
        Guides pratiques sur l&apos;IA pour le BTP, le financement des formations et
        les gains de productivité.
      </p>

      {/* CTA prise de rendez-vous */}
      <div className="mt-8">
        <CTABlock
          variant="compact"
          title="Prêt à vous former à l'IA ?"
          description="Réservez un échange de 30 minutes gratuit pour discuter de votre projet. Formation certifiée Qualiopi · 100% finançable Constructys."
          primaryLabel="Prendre rendez-vous"
          primaryHref={CALENDLY_BOOKING_URL}
          secondaryLabel="Découvrir les formations"
          secondaryHref="/formations"
        />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border-2 border-[var(--accent)] bg-[var(--accent-soft)] p-6">
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
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <p className="font-semibold text-slate-900">
            Guides pratiques
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <Link href="/claude-ai-btp" className="text-sm font-medium text-[var(--accent)] hover:underline">
              Claude AI BTP (page pilier)
            </Link>
            <Link href="/formation-ia-artisans-btp" className="text-sm font-medium text-[var(--accent)] hover:underline">
              ChatGPT pour entreprises BTP
            </Link>
            <Link href="/ia-devis-batiment" className="text-sm font-medium text-[var(--accent)] hover:underline">
              IA devis bâtiment
            </Link>
            <Link href="/ia-conducteur-travaux" className="text-sm font-medium text-[var(--accent)] hover:underline">
              IA conducteur de travaux
            </Link>
          </div>
        </div>
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

      {/* À la une — articles mis en avant (lib/blog.ts → BLOG_FEATURED_SLUGS) */}
      {featuredForView.length > 0 && (
        <section className="mt-10" aria-labelledby="blog-a-la-une">
          <h2
            id="blog-a-la-une"
            className="font-display text-xl font-bold text-slate-900"
          >
            À la une
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Sélection mise à jour régulièrement — à lire en priorité.
          </p>
          <div className="mt-6 space-y-8">
            {featuredForView.map((article) => (
              <ArticleCard key={article.slug} article={article} highlighted />
            ))}
          </div>
        </section>
      )}

      {/* Liste des articles */}
      <div className={`space-y-10 ${featuredForView.length > 0 ? 'mt-12' : 'mt-10'}`}>
        {isValidCat ? (
          (() => {
            const list = excludeArticlesBySlug(
              grouped[isValidCat] ?? [],
              slugsToExclude
            );
            const totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
            const safePage = Math.min(currentPage, totalPages);
            const slice = list.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
            return list.length > 0 ? (
              <>
                {slice.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
                {totalPages > 1 && (
                  <nav className="flex items-center justify-between pt-2" aria-label="Pagination articles">
                    <Link
                      href={
                        safePage > 1
                          ? `/blog?categorie=${isValidCat}&page=${safePage - 1}`
                          : `/blog?categorie=${isValidCat}&page=1`
                      }
                      aria-disabled={safePage <= 1}
                      className={`rounded-xl px-4 py-2 text-sm font-medium ${
                        safePage <= 1
                          ? 'pointer-events-none bg-slate-100 text-slate-400'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      Précédent
                    </Link>
                    <span className="text-sm text-slate-600">
                      Page {safePage} / {totalPages}
                    </span>
                    <Link
                      href={`/blog?categorie=${isValidCat}&page=${Math.min(totalPages, safePage + 1)}`}
                      aria-disabled={safePage >= totalPages}
                      className={`rounded-xl px-4 py-2 text-sm font-medium ${
                        safePage >= totalPages
                          ? 'pointer-events-none bg-slate-100 text-slate-400'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      Suivant
                    </Link>
                  </nav>
                )}
              </>
            ) : featuredForView.length === 0 ? (
              <p className="text-slate-600">Aucun article dans cette catégorie.</p>
            ) : null;
          })()
        ) : (
          (Object.keys(BLOG_CATEGORIES) as BlogCategoryId[])
            .filter((id) => grouped[id]?.length > 0)
            .map((id) => (
              <section key={id}>
                <h2 className="mb-6 border-b border-slate-200 pb-2 font-display text-xl font-bold text-slate-900">
                  {BLOG_CATEGORIES[id]}
                </h2>
                <div className="space-y-8">
                  {excludeArticlesBySlug(grouped[id], slugsToExclude)
                    .slice(0, 3)
                    .map((article) => (
                      <ArticleCard key={article.slug} article={article} />
                    ))}
                  {excludeArticlesBySlug(grouped[id], slugsToExclude).length > 3 && (
                    <div className="pt-2">
                      <Link
                        href={`/blog?categorie=${id}`}
                        className="inline-flex items-center gap-2 font-medium text-[var(--accent)] hover:underline"
                      >
                        Voir tous les articles « {BLOG_CATEGORIES[id]} »
                        <ArrowRight size={18} strokeWidth={1.5} />
                      </Link>
                    </div>
                  )}
                </div>
              </section>
            ))
        )}
      </div>

      {/* FAQ */}
      <section className="mt-16 border-t border-slate-200 pt-16">
        <FAQSection
          items={FAQ_BLOG}
          title="Questions fréquentes — Blog formation IA BTP"
        />
      </section>

      {/* CTA en bas de page */}
      <div className="mt-16">
        <CTABlock
          variant="compact"
          title="Prêt à vous former à l'IA ?"
          description="Réservez un échange de 30 minutes gratuit. Devis personnalisé sous 24h. Formation 100% finançable Constructys."
          primaryLabel="Prendre rendez-vous"
          primaryHref={CALENDLY_BOOKING_URL}
          secondaryLabel="Voir le financement"
          secondaryHref="/financement-constructys-formation-ia-btp"
        />
      </div>
    </div>
  );
}
