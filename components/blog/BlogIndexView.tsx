import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { FAQSectionServer } from '@/components/landing/FAQSectionServer';
import { CTABlock } from '@/components/CTABlock';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { ArrowRight } from 'lucide-react';
import { FAQ_BLOG } from '@/lib/faq';
import {
  BLOG_CATEGORIES,
  getAllArticles,
  getArticleCategory,
  getArticlesByCategory,
  getFeaturedBlogArticles,
  type BlogArticle,
  type BlogCategoryId,
} from '@/lib/blog';
import { SITE_CONFIG } from '@/lib/seo';
import { getFAQSchema } from '@/lib/seo';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';
import { BlogArticleCard } from '@/components/blog/BlogArticleCard';
import { buildBlogListingJsonLd, getBlogIndexLastModifiedIso } from '@/lib/blog-index-schema';
import { blogCategoryListingHref, blogIndexListingHref } from '@/lib/blog-index-urls';

const STARTER_SLUGS = [
  'formation-ia-btp-guide-complet-2026',
  'chatgpt-devis-btp-methode-2026',
  'financer-formation-ia-btp-constructys',
] as const;

const TOP_SLUGS = [
  'ia-memoire-technique-appel-offres-guide-2026',
  'formation-ia-btp-guide-complet-2026',
  'financer-formation-ia-btp-constructys',
  '5-cas-usage-chatgpt-artisans-btp',
  'compte-rendu-chantier-ia-automatiser-gagner-temps',
] as const;

function resolveBySlugs(slugs: readonly string[]): BlogArticle[] {
  const map = new Map(getAllArticles().map((a) => [a.slug, a]));
  return slugs.map((s) => map.get(s)).filter((a): a is BlogArticle => a != null);
}

export type BlogIndexViewProps = {
  items: BlogArticle[];
  currentPage: number;
  totalPages: number;
  mode: 'all' | 'category';
  categoryId?: BlogCategoryId;
  categoryPathSlug?: string;
  searchQuery?: string;
  canonicalPath: string;
};

export function BlogIndexView({
  items,
  currentPage,
  totalPages,
  mode,
  categoryId,
  searchQuery,
  canonicalPath,
}: BlogIndexViewProps) {
  const allCount = getAllArticles().length;
  const grouped = getArticlesByCategory();
  const featured = getFeaturedBlogArticles();
  const starter = resolveBySlugs(STARTER_SLUGS);
  const topRead = resolveBySlugs(TOP_SLUGS);

  const listingLd = buildBlogListingJsonLd({
    canonicalPath,
    dateModifiedIso: getBlogIndexLastModifiedIso(),
  });
  const faqSchema = getFAQSchema(FAQ_BLOG);

  const buildPageHref = (p: number) => {
    if (mode === 'category' && categoryId) {
      return blogCategoryListingHref(categoryId, p);
    }
    return blogIndexListingHref(p);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <JsonLd id="schema-blog-listing" schema={listingLd} />
      {faqSchema ? <JsonLd id="schema-blog-faq" schema={faqSchema} /> : null}

      <section className="border-b border-slate-200 bg-white px-4 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#377CF3]">Blog expert IA BTP</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            {mode === 'category' && categoryId
              ? `Articles IA BTP — ${BLOG_CATEGORIES[categoryId]}`
              : 'Blog Formation IA pour le BTP : ressources et articles'}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-600 md:text-xl">
            Guides pratiques sur l&apos;IA pour le BTP, le financement des formations et les gains de productivité.
          </p>
          <p className="mt-2 text-sm font-medium text-slate-700">
            {allCount} articles · {SOCIAL_PROOF.AVERAGE_RATING} · {formatProfessionalsTrainedCount()} professionnels
            formés (OFC)
          </p>

          <nav
            className="mt-8 flex flex-wrap gap-2 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-sm"
            aria-label="Accès rapide aux thématiques"
          >
            <span className="font-semibold text-slate-800">Aller à :</span>
            <a href="#a-la-une" className="text-[#377CF3] hover:underline">
              À la une
            </a>
            <span>·</span>
            <a href="#commencer" className="text-[#377CF3] hover:underline">
              Par où commencer
            </a>
            <span>·</span>
            <a href="#liste-articles" className="text-[#377CF3] hover:underline">
              Tous les articles
            </a>
            <span>·</span>
            <a href="#chiffres-blog" className="text-[#377CF3] hover:underline">
              En chiffres
            </a>
            <span>·</span>
            <a href="#faq" className="text-[#377CF3] hover:underline">
              FAQ
            </a>
          </nav>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 pb-20 pt-10 md:pb-28 md:pt-12">

      <form method="get" action="/blog" className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label htmlFor="blog-search" className="sr-only">
          Rechercher un article
        </label>
        <input
          id="blog-search"
          name="q"
          type="search"
          defaultValue={searchQuery ?? ''}
          placeholder="Rechercher par titre ou thème…"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 shadow-sm focus:border-[#377CF3] focus:outline-none focus:ring-2 focus:ring-[#377CF3]/20"
        />
        <button
          type="submit"
          className="rounded-xl bg-[#377CF3] px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Rechercher
        </button>
      </form>

      <div className="mt-8">
        <CTABlock
          variant="compact"
          title="Prêt à vous former à l'IA ?"
          description="Réservez un échange de 30 minutes gratuit pour discuter de votre projet. Formation dispensée par un organisme certifié Qualiopi · Financement possible selon éligibilité."
          primaryLabel="Prendre rendez-vous"
          primaryHref={CALENDLY_BOOKING_URL}
          primaryCalendlyCampaign="blog-index-block-top"
          secondaryLabel="Découvrir les formations"
          secondaryHref="/formations"
        />
      </div>

      <section className="mt-10 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
        <h2 className="font-display text-lg font-bold text-slate-900">Newsletter & ressource</h2>
        <p className="mt-2 text-slate-600">
          Recevez le guide gratuit <strong>Créez votre 1er Skill IA</strong> (PDF) et les prochains articles
          pédagogiques.
        </p>
        <Link
          href={LINKS.skillIaConducteurTravaux}
          className="mt-4 inline-flex items-center gap-2 font-semibold text-[#377CF3] hover:underline"
        >
          Télécharger le guide Skill IA
          <ArrowRight size={18} strokeWidth={1.5} aria-hidden />
        </Link>
      </section>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-6">
          <p className="font-semibold text-slate-900">
            Formations IA pour le BTP — Devis et chiffrage · Appels d&apos;offres · Productivité chantier
          </p>
          <Link
            href="/formations"
            className="mt-3 inline-flex items-center gap-2 font-medium text-[#377CF3] hover:underline"
          >
            Voir le catalogue formations
            <ArrowRight size={18} strokeWidth={1.5} />
          </Link>
        </div>
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
          <p className="font-semibold text-slate-900">Guides pratiques</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <Link href="/claude-ai-btp" className="text-sm font-medium text-[#377CF3] hover:underline">
              Claude AI BTP
            </Link>
            <Link href="/formation-ia-artisans-btp" className="text-sm font-medium text-[#377CF3] hover:underline">
              ChatGPT pour entreprises BTP
            </Link>
            <Link href="/ia-devis-batiment" className="text-sm font-medium text-[#377CF3] hover:underline">
              IA devis bâtiment
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-wrap gap-2">
        <Link
          href="/blog"
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            mode === 'all' && !searchQuery
              ? 'bg-[#377CF3] text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Tous
        </Link>
        {(Object.entries(BLOG_CATEGORIES) as [BlogCategoryId, string][]).map(([id, label]) => {
          const count = grouped[id]?.length ?? 0;
          if (count === 0) return null;
          const href = blogCategoryListingHref(id, 1);
          const active = mode === 'category' && categoryId === id;
          return (
            <Link
              key={id}
              href={href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active ? 'bg-[#377CF3] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {label} ({count})
            </Link>
          );
        })}
      </div>

      {featured.length > 0 && mode === 'all' && !searchQuery && (
        <section id="a-la-une" className="mt-10 scroll-mt-24" aria-labelledby="blog-a-la-une">
          <h2 id="blog-a-la-une" className="font-display text-xl font-bold text-slate-900">
            À la une
          </h2>
          <p className="mt-1 text-sm text-slate-600">Sélection mise à jour régulièrement — à lire en priorité.</p>
          <div className="mt-6 space-y-8">
            {featured.map((article) => (
              <BlogArticleCard key={article.slug} article={article} highlighted />
            ))}
          </div>
        </section>
      )}

      {mode === 'all' && !searchQuery && (
        <section id="commencer" className="mt-14 scroll-mt-24 rounded-2xl border border-[#E2E8F0] bg-white p-8">
          <h2 className="font-display text-xl font-bold text-slate-900">Par où commencer ?</h2>
          <p className="mt-2 text-sm text-slate-600">Trois articles pour cadrer votre projet IA BTP.</p>
          <ol className="mt-6 list-decimal space-y-3 pl-6 text-slate-800">
            {starter.map((a) => (
              <li key={a.slug}>
                <Link href={`/blog/${a.slug}`} className="font-medium text-[#377CF3] hover:underline">
                  {a.title}
                </Link>
              </li>
            ))}
          </ol>
        </section>
      )}

      {mode === 'all' && !searchQuery && (
        <section id="chiffres-blog" className="mt-12 scroll-mt-24 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
          <h2 className="font-display text-lg font-bold text-slate-900">IA BTP en chiffres (blog)</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
            <li>{allCount} articles publiés sur l&apos;IA dans le BTP (guides, prompts, cas d&apos;usage).</li>
            <li>Contenus alignés Qualiopi, Constructys et méthode terrain (OFC).</li>
            <li>Plafond Constructys 2026 (repère) : 24 € HT/h participant — voir le guide financement.</li>
            <li>Temps de lecture moyen : environ 8 minutes par article (estimation).</li>
          </ul>
        </section>
      )}

      {mode === 'all' && !searchQuery && (
        <section className="mt-12" aria-labelledby="titre-tendances">
          <h2 id="titre-tendances" className="font-display text-xl font-bold text-slate-900">
            Articles mis en avant
          </h2>
          <p className="mt-1 text-sm text-slate-600">Sélection éditoriale (réactualisable selon vos stats).</p>
          <ul className="mt-4 space-y-2">
            {topRead.map((a) => (
              <li key={a.slug}>
                <Link href={`/blog/${a.slug}`} className="text-[#377CF3] hover:underline">
                  {a.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section id="liste-articles" className="mt-12 scroll-mt-24 space-y-8">
        <h2 className="font-display text-xl font-bold text-slate-900">
          {searchQuery ? `Résultats (${items.length})` : 'Tous les articles'}
        </h2>
        {items.length === 0 ? (
          <p className="text-slate-600">Aucun article ne correspond à votre recherche.</p>
        ) : (
          items.map((article) => <BlogArticleCard key={article.slug} article={article} />)
        )}
      </section>

      {totalPages > 1 && (
        <nav className="mt-10 flex items-center justify-between gap-4" aria-label="Pagination des articles">
          <Link
            href={buildPageHref(currentPage - 1)}
            aria-disabled={currentPage <= 1}
            className={`rounded-xl px-4 py-2 text-sm font-medium ${
              currentPage <= 1
                ? 'pointer-events-none bg-slate-100 text-slate-400'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Précédent
          </Link>
          <span className="text-sm text-slate-600">
            Page {currentPage} / {totalPages}
          </span>
          <Link
            href={buildPageHref(currentPage + 1)}
            aria-disabled={currentPage >= totalPages}
            className={`rounded-xl px-4 py-2 text-sm font-medium ${
              currentPage >= totalPages
                ? 'pointer-events-none bg-slate-100 text-slate-400'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Suivant
          </Link>
        </nav>
      )}

      <p className="mt-8 text-center text-xs text-slate-500">
        <a
          type="application/rss+xml"
          href="/blog/rss.xml"
          className="inline-flex items-center gap-1 font-medium text-[#377CF3] hover:underline"
        >
          Flux RSS du blog
        </a>
      </p>

      <section className="mt-16 border-t border-slate-200 pt-16">
        <FAQSectionServer
          id="faq"
          items={FAQ_BLOG}
          title="Questions fréquentes — Blog formation IA pour les pros du BTP"
        />
      </section>

      <div className="mt-16">
        <CTABlock
          variant="compact"
          title="Prêt à vous former à l'IA ?"
          description="Réservez un échange de 30 minutes gratuit. Devis personnalisé sous 24h. Formation Financement possible selon éligibilité."
          primaryLabel="Prendre rendez-vous"
          primaryHref={CALENDLY_BOOKING_URL}
          primaryCalendlyCampaign="blog-index-block-bottom"
          secondaryLabel="Voir le financement"
          secondaryHref="/financement-constructys-formation-ia-btp"
        />
      </div>
      </div>
    </div>
  );
}
