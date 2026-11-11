import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Calculator,
  Calendar,
  CheckSquare,
  Clock,
  Coins,
  Download,
  FileText,
  FolderOpen,
  GraduationCap,
  HardHat,
  Layers,
  RefreshCw,
  Search,
  Shield,
  Sparkles,
  Users,
  Mail,
  Rss,
} from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { FAQSectionServer } from '@/components/landing/FAQSectionServer';
import { CtaVisio } from '@/components/CtaVisio';
import { LINKS } from '@/lib/internal-links';
import { FAQ_BLOG } from '@/lib/faq';
import {
  BLOG_CATEGORIES,
  getAllArticles,
  getArticleCategory,
  getArticlesByCategory,
  getBlogLandingSecondaryFeaturedArticles,
  getFeaturedBlogArticles,
  type BlogArticle,
  type BlogCategoryId,
} from '@/lib/blog';
import { getBlogArticleCanonicalPath } from '@/lib/blog-article-path';
import {
  BLOG_LANDING_HERO_ALT,
  BLOG_LANDING_HERO_IMAGE,
  getBlogLandingCardCoverAlt,
  getBlogLandingCardCoverSrc,
} from '@/lib/blog-landing-covers';
import { getFAQSchema } from '@/lib/seo';
import { buildBlogListingJsonLd, getBlogIndexLastModifiedIso } from '@/lib/blog-index-schema';
import { blogCategoryListingHref, blogIndexListingHref } from '@/lib/blog-index-urls';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { getRessourcesCounts } from '@/lib/ressources-catalog';

const LISTING_SECTION_ID = 'liste-articles';

/** 5 thématiques visibles sur la landing — chaque entrée pointe vers une catégorie réelle du blog. */
const BLOG_LANDING_CATEGORY_CARDS: {
  id: BlogCategoryId;
  label: string;
  icon: typeof FileText;
}[] = [
  { id: 'appels-offres', label: "Appels d'offres", icon: Layers },
  { id: 'devis', label: 'Devis & chiffrage', icon: Calculator },
  { id: 'metiers', label: 'Conduite de travaux', icon: HardHat },
  { id: 'chatgpt', label: 'ChatGPT & Claude', icon: Sparkles },
  { id: 'financement', label: 'Financement', icon: Coins },
];

const CATEGORY_FILTER_ICONS: Record<BlogCategoryId, typeof FileText> = {
  devis: Calculator,
  'appels-offres': Layers,
  financement: Coins,
  chatgpt: Sparkles,
  metiers: HardHat,
  rh: Users,
  productivite: Mail,
};

export type BlogIndexLandingViewProps = {
  items: BlogArticle[];
  currentPage: number;
  totalPages: number;
  searchQuery?: string;
  canonicalPath: string;
};

function BlogCardCover({
  article,
  sizes,
  priority,
  className,
  showCategoryBadge = true,
}: {
  article: BlogArticle;
  sizes: string;
  priority?: boolean;
  className?: string;
  showCategoryBadge?: boolean;
}) {
  const src = getBlogLandingCardCoverSrc(article);
  const cat = getArticleCategory(article.slug);
  const alt = getBlogLandingCardCoverAlt(article);
  return (
    <div className={`relative overflow-hidden bg-slate-100 ${className ?? ''}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
        sizes={sizes}
        priority={priority}
      />
      {showCategoryBadge ? (
        <span className="absolute bottom-3 left-3 rounded-lg bg-[#0B1F4F]/85 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {BLOG_CATEGORIES[cat]}
        </span>
      ) : null}
    </div>
  );
}

function FeaturedMainCard({ article }: { article: BlogArticle }) {
  const href = getBlogArticleCanonicalPath(article);
  const pub = new Date(article.date);
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-50 transition-shadow hover:shadow-md">
      <Link href={href} className="block">
        <BlogCardCover
          article={article}
          sizes="(max-width: 1024px) 100vw, 66vw"
          priority
          className="aspect-[16/10] w-full"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <time dateTime={article.date} className="text-sm text-slate-500">
          {pub.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
        </time>
        <h3 className="mt-2 font-display text-xl font-bold leading-snug text-[#101936] sm:text-2xl">
          <Link
            href={href}
            className="hover:text-[#377CF3] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#377CF3]"
          >
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600 sm:text-base">{article.description}</p>
        <Link
          href={href}
          className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-[#377CF3] underline underline-offset-2 hover:no-underline"
        >
          Lire l&apos;article
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </article>
  );
}

function FeaturedSideCard({ article }: { article: BlogArticle }) {
  const href = getBlogArticleCanonicalPath(article);
  const pub = new Date(article.date);
  const cat = getArticleCategory(article.slug);
  return (
    <article className="group flex flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-50 transition-shadow hover:shadow-md">
      <Link href={href} className="block">
        <BlogCardCover
          article={article}
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="aspect-[16/10] w-full"
          showCategoryBadge={false}
        />
      </Link>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#377CF3]">{BLOG_CATEGORIES[cat]}</p>
        <time dateTime={article.date} className="mt-1 text-xs text-slate-500">
          {pub.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
        </time>
        <h3 className="mt-2 font-display text-base font-semibold leading-snug text-[#101936]">
          <Link
            href={href}
            className="hover:text-[#377CF3] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#377CF3]"
          >
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-slate-600">{article.description}</p>
        <Link
          href={href}
          className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-semibold text-[#377CF3] underline underline-offset-2 hover:no-underline"
        >
          Lire l&apos;article
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </article>
  );
}

function BlogGridCard({ article }: { article: BlogArticle }) {
  const href = getBlogArticleCanonicalPath(article);
  const pub = new Date(article.date);
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-50 transition-shadow hover:shadow-md">
      <Link href={href} className="block">
        <BlogCardCover
          article={article}
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="aspect-[16/10] w-full"
        />
      </Link>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <time dateTime={article.date} className="text-xs text-slate-500">
          {pub.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
        </time>
        <h3 className="mt-2 font-display text-base font-semibold leading-snug text-[#101936]">
          <Link
            href={href}
            className="hover:text-[#377CF3] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#377CF3]"
          >
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm text-slate-600">{article.description}</p>
        <Link
          href={href}
          className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#377CF3] underline underline-offset-2 hover:no-underline"
        >
          Lire l&apos;article
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </article>
  );
}

export function BlogIndexLandingView({
  items,
  currentPage,
  totalPages,
  searchQuery,
  canonicalPath,
}: BlogIndexLandingViewProps) {
  const allCount = getAllArticles().length;
  const grouped = getArticlesByCategory();
  const ressourcesCounts = getRessourcesCounts();
  const casUsageArticles = grouped.metiers?.length ?? 0;
  const guidesGratuitsCount = ressourcesCounts.guides + ressourcesCounts.tutoriels;

  const featured = getFeaturedBlogArticles();
  const secondarySpotlight = getBlogLandingSecondaryFeaturedArticles();

  const listingLd = buildBlogListingJsonLd({
    canonicalPath,
    dateModifiedIso: getBlogIndexLastModifiedIso(),
  });
  const faqSchema = getFAQSchema(FAQ_BLOG);

  const buildPageHref = (p: number) => blogIndexListingHref(p);

  const showLandingExtras = currentPage === 1 && !searchQuery;

  return (
    <div className="overflow-x-hidden bg-white pb-20">
      <JsonLd id="schema-blog-listing" schema={listingLd} />
      {faqSchema ? <JsonLd id="schema-blog-faq" schema={faqSchema} /> : null}

      <section className="border-b border-slate-100 bg-white" aria-labelledby="blog-hero-title">
        <div className="mx-auto max-w-[80rem] px-4 pt-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-slate-600" aria-label="Fil d'Ariane">
            <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
              <li>
                <Link href="/" className="underline decoration-slate-300 underline-offset-2 hover:text-[#377CF3]">
                  Accueil
                </Link>
              </li>
              <li className="text-slate-400" aria-hidden>
                &gt;
              </li>
              <li className="font-medium text-[#101936]" aria-current="page">
                Blog
              </li>
            </ol>
          </nav>
        </div>

        <div className="mx-auto grid max-w-[80rem] items-center gap-10 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-12">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#377CF3]">Blog IA BTP</p>
            <h1 id="blog-hero-title" className="ofc-type-hero mt-3 text-balance text-[#101936]">
              Le blog IA au service des métiers du BTP
            </h1>
            <p className="ofc-type-lead mt-4 text-balance font-semibold text-[#101936]">
              Conseils, méthodes et retours d&apos;expérience pour les PME du BTP en Île-de-France.
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Articles concrets sur les appels d&apos;offres, le chiffrage, la conduite de travaux, ChatGPT, Claude et le
              financement OPCO — applicables dès le bureau ou le chantier.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={`#${LISTING_SECTION_ID}`}
                className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 w-full items-center justify-center gap-2 px-5 py-3 sm:w-auto`}
              >
                Explorer les articles
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </Link>
              <Link
                href={LINKS.formations}
                className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center gap-2 px-5 py-3 sm:w-auto`}
              >
                <GraduationCap className="h-4 w-4 shrink-0" aria-hidden />
                Découvrir les formations
              </Link>
            </div>
          </div>

          <figure className="relative min-h-0 w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100 shadow-sm">
            <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
              <Image
                src={BLOG_LANDING_HERO_IMAGE}
                alt={BLOG_LANDING_HERO_ALT}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </figure>
        </div>
      </section>

      <div className="mx-auto max-w-[80rem] space-y-14 px-4 sm:space-y-16 sm:px-6 lg:px-8 lg:py-4">
        {showLandingExtras ? (
          <section aria-labelledby="blog-categories-title">
            <h2 id="blog-categories-title" className="sr-only">
              Thématiques du blog
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
              {BLOG_LANDING_CATEGORY_CARDS.map((card) => {
                const count = grouped[card.id]?.length ?? 0;
                if (count === 0) return null;
                const href = blogCategoryListingHref(card.id, 1);
                return (
                  <Link
                    key={card.id}
                    href={href}
                    className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4 shadow-sm transition-shadow hover:shadow-md focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#377CF3]"
                  >
                    <card.icon className="h-5 w-5 text-[#377CF3]" aria-hidden />
                    <span className="text-sm font-semibold leading-snug text-[#101936]">{card.label}</span>
                    <span className="text-xs text-slate-500">{count} articles</span>
                  </Link>
                );
              })}
            </div>
          </section>
        ) : null}

        {showLandingExtras ? (
          <section aria-labelledby="blog-benefits-title">
            <h2 id="blog-benefits-title" className="ofc-type-h2 text-center text-[#101936] md:text-left">
              Des contenus concrets pour les PME du BTP
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  icon: Clock,
                  titre: 'Gagner du temps',
                  texte: 'Méthodes et prompts pour accélérer devis, comptes-rendus et dossiers administratifs.',
                },
                {
                  icon: FolderOpen,
                  titre: 'Structurer vos documents',
                  texte: 'Modèles et checklists pour DCE, mémoires techniques, chartes IA et livrables chantier.',
                },
                {
                  icon: Shield,
                  titre: 'Fiabiliser vos usages IA',
                  texte: 'Bonnes pratiques, validation humaine et conformité pour un déploiement responsable.',
                },
                {
                  icon: RefreshCw,
                  titre: 'Rester à jour',
                  texte: 'Veille outils, cas d’usage terrain et évolutions réglementaires pour vos équipes.',
                },
              ].map((card) => (
                <div
                  key={card.titre}
                  className="rounded-2xl border border-slate-200 border-b-[3px] border-b-[#377CF3] bg-[#F8FAFC] p-6 shadow-sm ring-1 ring-slate-50"
                >
                  <span className="inline-flex rounded-xl bg-[#EFF6FF] p-2.5">
                    <card.icon className="h-6 w-6 text-[#377CF3]" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-[#101936]">{card.titre}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.texte}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {showLandingExtras ? (
          <section
            aria-labelledby="blog-bandeau-title"
            className="flex flex-col gap-5 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-6 md:flex-row md:items-center md:justify-between md:gap-8"
          >
            <div className="flex min-w-0 gap-4 md:max-w-[65%]">
              <Layers className="mt-0.5 h-8 w-8 shrink-0 text-[#1D4ED8]" aria-hidden />
              <div>
                <h2 id="blog-bandeau-title" className="font-display text-lg font-semibold text-[#101936]">
                  Un blog pratique, terrain et directement utile à vos équipes
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Des articles, cas d&apos;usage et ressources gratuites pour appels d&apos;offres, chiffrage, chantier et
                  productivité — rédigés par une formatrice du BTP, certifiée Qualiopi.
                </p>
              </div>
            </div>
            <Link
              href={`#${LISTING_SECTION_ID}`}
              className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 shrink-0 items-center justify-center gap-2 px-6 py-3`}
            >
              Explorer nos articles
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
            </Link>
          </section>
        ) : null}

        {showLandingExtras ? (
          <section aria-labelledby="blog-stats-title">
            <h2 id="blog-stats-title" className="sr-only">
              Repères du blog
            </h2>
            <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
              {[
                {
                  icon: FileText,
                  titre: `${allCount} articles`,
                  texte: 'Conseils, tutoriels et retours d’expérience',
                },
                {
                  icon: Layers,
                  titre: 'Cas d’usage BTP',
                  texte: `${casUsageArticles} articles IA par métier — exemples concrets et applicables`,
                  href: LINKS.casUsage,
                },
                {
                  icon: BookOpen,
                  titre: 'Guides gratuits',
                  texte: `${guidesGratuitsCount} guides et tutoriels prêts à l’emploi`,
                  href: LINKS.ressources,
                },
              ].map((card) => {
                const inner = (
                  <>
                    <card.icon className="h-5 w-5 text-[#377CF3]" aria-hidden />
                    <p className="mt-3 text-sm font-semibold text-[#101936]">{card.titre}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{card.texte}</p>
                  </>
                );
                return card.href ? (
                  <Link
                    key={card.titre}
                    href={card.href}
                    className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5 shadow-sm transition-shadow hover:shadow-md focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#377CF3]"
                  >
                    {inner}
                  </Link>
                ) : (
                  <div key={card.titre} className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5 shadow-sm">
                    {inner}
                  </div>
                );
              })}
            </div>
          </section>
        ) : null}

        {showLandingExtras && featured.length > 0 ? (
          <section id="a-la-une" className="scroll-mt-24" aria-labelledby="blog-a-la-une-title">
            <h2 id="blog-a-la-une-title" className="ofc-type-h2 text-[#101936]">
              À la une
            </h2>
            <div className="mt-6 grid gap-5 lg:grid-cols-3 lg:gap-6">
              <div className="lg:col-span-2">
                <FeaturedMainCard article={featured[0]} />
              </div>
              <div className="flex flex-col gap-4">
                {secondarySpotlight.map((article) => (
                  <FeaturedSideCard key={article.slug} article={article} />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section
          id={LISTING_SECTION_ID}
          className="scroll-mt-24"
          aria-labelledby="blog-listing-title"
        >
          <h2 id="blog-listing-title" className="ofc-type-h2 text-[#101936]">
            {searchQuery ? `Résultats (${items.length})` : 'Tous les articles'}
          </h2>

          <form method="get" action="/blog" className="mt-6">
            <label htmlFor="blog-search-landing" className="sr-only">
              Rechercher un article
            </label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                aria-hidden
              />
              <input
                id="blog-search-landing"
                name="q"
                type="search"
                defaultValue={searchQuery ?? ''}
                placeholder="Rechercher par titre ou thème…"
                className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-slate-900 shadow-sm focus:border-[#377CF3] focus:outline-none focus:ring-2 focus:ring-[#377CF3]/20"
              />
            </div>
            <button type="submit" className="sr-only">
              Rechercher
            </button>
          </form>

          <div
            className="mt-6 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="toolbar"
            aria-label="Filtrer par catégorie"
          >
            <Link
              href="/blog"
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                !searchQuery
                  ? 'border-[#377CF3] bg-[#377CF3] text-white'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              }`}
            >
              Tous les articles
            </Link>
            {(Object.entries(BLOG_CATEGORIES) as [BlogCategoryId, string][]).map(([id, label]) => {
              const count = grouped[id]?.length ?? 0;
              if (count === 0) return null;
              const Icon = CATEGORY_FILTER_ICONS[id];
              const href = blogCategoryListingHref(id, 1);
              return (
                <Link
                  key={id}
                  href={href}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-[#377CF3]/40 hover:bg-[#F8FAFC] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#377CF3]"
                >
                  <Icon className="h-4 w-4 text-[#377CF3]" aria-hidden />
                  {label}
                </Link>
              );
            })}
          </div>

          {items.length === 0 ? (
            <p className="mt-8 text-slate-600">Aucun article ne correspond à votre recherche.</p>
          ) : (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((article) => (
                <BlogGridCard key={article.slug} article={article} />
              ))}
            </div>
          )}

          {totalPages > 1 ? (
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
          ) : null}

          <p className="mt-8 text-center text-xs text-slate-500">
            <a
              href="/blog/rss.xml"
              className="inline-flex items-center gap-1 font-medium text-[#377CF3] hover:underline"
            >
              <Rss className="h-3.5 w-3.5" aria-hidden />
              Flux RSS du blog
            </a>
          </p>
        </section>

        {showLandingExtras ? (
          <section aria-labelledby="blog-pedagogie-title" className="relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-[#0B1F4F]" aria-hidden />
            <div className="relative px-6 py-10 text-white md:px-10 md:py-12">
              <h2 id="blog-pedagogie-title" className="ofc-type-h2 text-white">
                Des méthodes testées sur le terrain
              </h2>
              <ul className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-stretch lg:flex-nowrap lg:divide-x lg:divide-white/25">
                {[
                  { icon: HardHat, label: 'Cas pratiques' },
                  { icon: FileText, label: 'Documents métier' },
                  { icon: CheckSquare, label: 'Méthodes terrain' },
                  { icon: RefreshCw, label: 'Veille IA' },
                ].map((item) => (
                  <li
                    key={item.label}
                    className="flex flex-1 flex-col items-center gap-2 px-0 text-center sm:min-w-[9rem] lg:px-4"
                  >
                    <item.icon className="h-7 w-7 text-white" aria-hidden />
                    <span className="text-sm font-semibold leading-snug text-white">{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {showLandingExtras ? (
          <section
            aria-labelledby="blog-guide-gratuit-title"
            className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 md:flex-row md:items-center md:gap-10 md:p-8"
          >
            <div className="relative mx-auto aspect-[4/3] w-full max-w-[220px] shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm md:mx-0">
              <Image
                src="/images/creer-skill-claude-btp.webp"
                alt="Couverture du guide gratuit pour créer un Skill IA BTP"
                fill
                className="object-cover"
                sizes="220px"
                loading="lazy"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h2 id="blog-guide-gratuit-title" className="font-display text-xl font-bold text-[#101936] md:text-2xl">
                Téléchargez votre guide gratuit
              </h2>
              <p className="mt-2 text-sm text-slate-600 md:text-base">
                Ressource OFC : créer votre premier Skill IA pour le BTP — PDF et tutoriel pas à pas.
              </p>
              <Link
                href={LINKS.ressourcesCreerSkillChatgptClaudeBtp}
                className={`${OFC_CTA_PRIMARY} mt-6 inline-flex min-h-11 items-center justify-center gap-2 px-6 py-3`}
              >
                <Download className="h-4 w-4 shrink-0" aria-hidden />
                Télécharger le guide
              </Link>
            </div>
          </section>
        ) : null}

        <FAQSectionServer
          id="faq"
          items={FAQ_BLOG}
          title="FAQ — Blog IA BTP"
          className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white px-4 py-10 sm:px-8"
          layout="wide"
        />

        {showLandingExtras ? (
          <section
            aria-labelledby="blog-cta-final-title"
            className="rounded-2xl border border-slate-200 bg-[#F8FAFC] px-6 py-10 text-center md:px-10"
          >
            <h2
              id="blog-cta-final-title"
              className="font-display text-2xl font-bold text-balance text-[#101936]"
            >
              Développez vos compétences IA dans le BTP
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 md:text-base">
              Formations en présentiel en Île-de-France, certifiées Qualiopi — appels d&apos;offres, devis, chantier et
              productivité.
            </p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <CtaVisio
                src="blog-index-final"
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 px-6 py-3 sm:w-auto"
                leadingAdornment={<Calendar className="h-4 w-4 shrink-0" aria-hidden />}
              />
              <Link
                href={LINKS.formations}
                className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center gap-2 px-6 py-3 sm:w-auto`}
              >
                <GraduationCap className="h-4 w-4 shrink-0" aria-hidden />
                Découvrir les formations
              </Link>
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
