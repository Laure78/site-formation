import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Download,
  FileText,
  GraduationCap,
  HardHat,
  Layers,
  Search,
  Shield,
  Sparkles,
  Wallet,
  Users,
  Briefcase,
  Mail,
  MessageSquare,
} from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { FAQSectionServer } from '@/components/landing/FAQSectionServer';
import { LINKS } from '@/lib/internal-links';
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
import { getBlogArticleCanonicalPath } from '@/lib/blog-article-path';
import { getBlogCardCoverSrc } from '@/lib/blog-cover';
import { getFAQSchema } from '@/lib/seo';
import { buildBlogListingJsonLd, getBlogIndexLastModifiedIso } from '@/lib/blog-index-schema';
import { blogCategoryListingHref, blogIndexListingHref } from '@/lib/blog-index-urls';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { getRessourcesCounts } from '@/lib/ressources-catalog';

const HERO_IMAGE = '/images/blog/photo_blog_btp_hero.png';
const HERO_IMAGE_ALT =
  'Chantier BTP en arrière-plan avec ordinateur portable affichant un planning sur un bureau de chantier';

const LISTING_SECTION_ID = 'liste-articles';

const CATEGORY_ICONS: Record<BlogCategoryId, typeof FileText> = {
  devis: Wallet,
  'appels-offres': FileText,
  financement: Wallet,
  chatgpt: Sparkles,
  metiers: Briefcase,
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
}: {
  article: BlogArticle;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const src = getBlogCardCoverSrc(article);
  const cat = getArticleCategory(article.slug);
  return (
    <div className={`relative overflow-hidden bg-slate-100 ${className ?? ''}`}>
      <Image
        src={src}
        alt=""
        fill
        className="object-cover object-center"
        sizes={sizes}
        priority={priority}
      />
      <span className="absolute bottom-3 left-3 rounded-lg bg-[#0B1F4F]/85 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
        {BLOG_CATEGORIES[cat]}
      </span>
    </div>
  );
}

function FeaturedMainCard({ article }: { article: BlogArticle }) {
  const href = getBlogArticleCanonicalPath(article);
  const pub = new Date(article.date);
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-50">
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
          <Link href={href} className="hover:text-[#377CF3] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#377CF3]">
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
  const cat = getArticleCategory(article.slug);
  return (
    <article className="flex flex-1 flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm ring-1 ring-slate-50 sm:p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#377CF3]">{BLOG_CATEGORIES[cat]}</p>
      <h3 className="mt-2 font-display text-base font-semibold leading-snug text-[#101936]">
        <Link href={href} className="hover:text-[#377CF3] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#377CF3]">
          {article.title}
        </Link>
      </h3>
      <Link
        href={href}
        className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-semibold text-[#377CF3] underline underline-offset-2 hover:no-underline"
      >
        Lire l&apos;article
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </article>
  );
}

function BlogGridCard({ article }: { article: BlogArticle }) {
  const href = getBlogArticleCanonicalPath(article);
  const pub = new Date(article.date);
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-50 transition-shadow hover:shadow-md">
      <Link href={href} className="block">
        <BlogCardCover article={article} sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw" className="aspect-[16/10] w-full" />
      </Link>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <time dateTime={article.date} className="text-xs text-slate-500">
          {pub.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
        </time>
        <h3 className="mt-2 font-display text-base font-semibold leading-snug text-[#101936]">
          <Link href={href} className="hover:text-[#377CF3] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#377CF3]">
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
  const featuredSlugs = new Set(featured.map((a) => a.slug));
  const secondarySpotlight = [...getAllArticles()]
    .filter((a) => !featuredSlugs.has(a.slug))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 2);

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
            <ol className="flex flex-wrap items-center gap-x-1 gap-y-1">
              <li>
                <Link href="/" className="underline decoration-slate-300 underline-offset-2 hover:text-[#377CF3]">
                  Accueil
                </Link>
              </li>
              <li className="text-slate-400" aria-hidden>
                /
              </li>
              <li className="font-medium text-[#101936]" aria-current="page">
                Blog
              </li>
            </ol>
          </nav>
        </div>

        <div className="mx-auto grid max-w-[80rem] items-center gap-10 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-12">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#377CF3]">Blog</p>
            <h1 id="blog-hero-title" className="ofc-type-hero mt-3 text-balance text-[#101936]">
              Blog IA BTP
            </h1>
            <p className="ofc-type-lead mt-4 text-balance text-slate-600">
              Guides pratiques, tutoriels et retours d&apos;expérience pour les entreprises du BTP.
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
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={HERO_IMAGE}
                alt={HERO_IMAGE_ALT}
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
                  <div
                    key={card.titre}
                    className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5 shadow-sm"
                  >
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
              const Icon = CATEGORY_ICONS[id];
              const href = blogCategoryListingHref(id, 1);
              return (
                <Link
                  key={id}
                  href={href}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-[#377CF3]/40 hover:bg-[#F8FAFC]"
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
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { icon: HardHat, label: 'Cas réels du BTP' },
                  { icon: Layers, label: 'Outils et modèles prêts à l’emploi' },
                  { icon: MessageSquare, label: 'Retours d’expérience' },
                  { icon: Shield, label: 'Conformité et bonnes pratiques' },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border border-white/15 bg-white/5 p-4 text-center sm:text-left">
                    <item.icon className="mx-auto h-7 w-7 text-white sm:mx-0" aria-hidden />
                    <p className="mt-3 text-sm font-semibold text-white">{item.label}</p>
                  </div>
                ))}
              </div>
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
                alt=""
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
      </div>
    </div>
  );
}
