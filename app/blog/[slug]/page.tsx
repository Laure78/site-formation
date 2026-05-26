import { Fragment } from 'react';
import { FAQAnswer } from '@/components/landing/FAQAnswer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import {
  ARTICLE_SECTION_GEO,
  createPageMetadata,
  getHowToFromArticle,
  SITE_CONFIG,
} from '@/lib/seo';
import {
  estimateWordCountFromArticle,
  getArticle,
  getAllSlugs,
  getBlogCTAMidInsertAfterIndex,
  getCommercialLinksForArticle,
  getRelatedArticlesForDisplay,
  type ArticlePrompt,
} from '@/lib/blog';
import { BlogMdxArticle } from '@/components/blog/BlogMdxArticle';
import {
  buildMdxBlogMetadata,
  getMdxFrontmatter,
  hasMdxBlogFile,
  mergeBlogSlugsForStaticParams,
} from '@/lib/blog-mdx';
import { BlogCTA } from '@/components/BlogCTA';
import { CTABlock } from '@/components/CTABlock';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { RdvLink } from '@/components/RdvLink';
import { CALENDLY_BOOKING_URL, buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import AuthorBio from '@/components/AuthorBio';
import { ArticleJsonLd } from '@/components/blog/ArticleJsonLd';
import { BlogArticleFaqJsonLd } from '@/components/blog/BlogArticleFaqJsonLd';
import { Check, ExternalLink } from 'lucide-react';
import { LINKS } from '@/lib/internal-links';
import TableOfContents from '@/components/TableOfContents';

interface Props {
  params: Promise<{ slug: string }>;
}

const IA_DEVIS_TOC_ITEMS = [
  { label: 'Le constat', anchor: 'le-constat' },
  { label: 'Les gains mesurés', anchor: 'les-gains' },
  { label: 'Par où commencer ?', anchor: 'par-ou-commencer' },
  { label: "Prompts devis prêts à l'emploi", anchor: 'prompts-devis' },
  { label: 'Questions fréquentes', anchor: 'faq' },
] as const;

const IA_DEVIS_SECTION_ANCHORS: Record<string, string> = {
  'Le constat': 'le-constat',
  'Les gains mesurés': 'les-gains',
  'Par où commencer ?': 'par-ou-commencer',
  "Prompts devis et chiffrage — prêts à l'emploi": 'prompts-devis',
  'Questions fréquentes': 'faq',
};

/** Extrait le contenu texte pour l'affichage — gère string | string[] | ArticlePrompt[] */
function getContentAsString(
  content: string | string[] | ArticlePrompt[]
): string {
  if (typeof content === 'string') return content;
  if (!Array.isArray(content) || content.length === 0) return '';
  const first = content[0];
  return typeof first === 'string' ? first : '';
}

/** Vérifie si l'élément est un ArticlePrompt (objet avec titre/prompt) */
function isArticlePrompt(item: unknown): item is ArticlePrompt {
  return (
    typeof item === 'object' &&
    item !== null &&
    'titre' in item &&
    'prompt' in item &&
    typeof (item as ArticlePrompt).titre === 'string' &&
    typeof (item as ArticlePrompt).prompt === 'string'
  );
}

/** Extrait uniquement les chaînes d'un contenu (exclut ArticlePrompt) */
function getStringItems(
  content: string | string[] | ArticlePrompt[]
): string[] {
  if (typeof content === 'string') return [content];
  if (!Array.isArray(content)) return [];
  return content.filter((x): x is string => typeof x === 'string');
}

/** Extrait les prompts d'un contenu (uniquement pour sections type 'prompts') */
function getPromptsFromContent(
  content: string | string[] | ArticlePrompt[]
): ArticlePrompt[] {
  if (!Array.isArray(content)) return [];
  return content.filter(isArticlePrompt);
}

export async function generateStaticParams() {
  return mergeBlogSlugsForStaticParams(getAllSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const mdxMeta = buildMdxBlogMetadata(slug);
  if (mdxMeta) {
    const authorUrl = `${SITE_CONFIG.url}/a-propos`;
    const fm = getMdxFrontmatter(slug);
    return {
      ...mdxMeta,
      authors: [{ name: SITE_CONFIG.name, url: authorUrl }],
      openGraph: {
        ...mdxMeta.openGraph,
        tags: fm?.keywords,
      },
    };
  }
  const article = getArticle(slug);
  if (!article) return { title: 'Article non trouvé' };
  const metaTitle = article.seoTitle ?? article.title;
  const authorUrl = `${SITE_CONFIG.url}/a-propos`;
  const category = ARTICLE_SECTION_GEO;
  const ogImageUrl = `${SITE_CONFIG.url}/api/og?title=${encodeURIComponent(metaTitle)}&category=${encodeURIComponent(category)}`;
  const base = createPageMetadata({
    title: metaTitle,
    description: article.description,
    path: `/blog/${slug}`,
    keywords: article.keywords,
    /** Évite le suffixe commun sur og:description — les articles ont déjà une phrase unique optimisée */
    appendAuthorSuffix: false,
    openGraphType: 'article',
    article: {
      publishedTime: article.date,
      modifiedTime: article.dateModified ?? article.date,
      author: SITE_CONFIG.name,
      section: ARTICLE_SECTION_GEO,
    },
    image: {
      url: ogImageUrl,
      width: 1200,
      height: 630,
      alt: metaTitle,
    },
  });
  return {
    ...base,
    authors: [{ name: SITE_CONFIG.name, url: authorUrl }],
    openGraph: {
      ...base.openGraph,
      tags: article.keywords,
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  if (hasMdxBlogFile(slug)) {
    return <BlogMdxArticle slug={slug} />;
  }
  const article = getArticle(slug);
  if (!article) notFound();

  const related = getRelatedArticlesForDisplay(slug, 6);

  const wordCount = estimateWordCountFromArticle(article);
  const midCtaAfterIndex = getBlogCTAMidInsertAfterIndex(article.sections);
  const showMidBlogCTA =
    midCtaAfterIndex !== null && midCtaAfterIndex < article.sections.length - 1;
  const defaultArticleImage = `${SITE_CONFIG.url}/images/og-default.jpg`;
  const articleSchemaImage = article.coverImage
    ? article.coverImage.trim().startsWith('http')
      ? article.coverImage.trim()
      : `${SITE_CONFIG.url}${article.coverImage.trim().startsWith('/') ? article.coverImage.trim() : `/${article.coverImage.trim()}`}`
    : defaultArticleImage;
  const howToSchema = getHowToFromArticle(article);
  const showToc = slug === 'ia-devis-gain-temps-pme-btp';

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <ArticleJsonLd
        title={article.title}
        headline={article.seoTitle ?? article.title}
        description={article.description}
        slug={article.slug}
        datePublished={article.date}
        dateModified={article.dateModified}
        imageUrl={articleSchemaImage}
        keywords={article.keywords}
        wordCount={wordCount}
      />
      <BlogArticleFaqJsonLd article={article} />
      {howToSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      )}

      <article>
        <div className="flex flex-col gap-1 text-sm text-slate-500 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-1">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>
              Publié le{' '}
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
            </span>
            <span aria-hidden className="hidden sm:inline">
              ·
            </span>
            <address className="not-italic">
              Par{' '}
              <Link href="/a-propos" className="font-medium text-slate-700 hover:text-[var(--accent)] hover:underline" rel="author">
                {SITE_CONFIG.name}
              </Link>
            </address>
          </div>
          <p className="text-xs text-slate-400 sm:text-sm">
            Dernière mise à jour :{' '}
            <time dateTime={article.dateModified ?? article.date}>
              {new Date(article.dateModified ?? article.date).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
          </p>
        </div>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          {article.title}
        </h1>
        <p className="mt-4 text-lg text-slate-600">{article.description}</p>

        {showToc && <TableOfContents items={[...IA_DEVIS_TOC_ITEMS]} />}

        {/* Bloc liens commerciaux contextuels — au moins 2-3 pages commerciales par article */}
        <section className="mt-8 rounded-2xl border border-[var(--accent)] bg-[var(--accent-soft)] p-6">
          <h2 className="font-display text-lg font-semibold text-slate-900">
            À découvrir
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Pages commerciales en lien avec cet article :
          </p>
          <ul className="mt-4 flex flex-wrap gap-3">
            {getCommercialLinksForArticle(slug).map(({ href, label }) => (
              <li key={href + label}>
                {href.startsWith('http') ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-xl bg-white px-4 py-2 text-sm font-medium text-[var(--accent)] shadow-sm transition-colors hover:bg-blue-50"
                  >
                    {label}
                  </a>
                ) : (
                  <Link
                    href={href}
                    className="inline-flex items-center rounded-xl bg-white px-4 py-2 text-sm font-medium text-[var(--accent)] shadow-sm transition-colors hover:bg-blue-50"
                  >
                    {label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* CTA prise de rendez-vous — visible dès le début de l'article */}
        <div className="mt-8">
          <CTABlock
            variant="compact"
            title="Prêt à vous former à l'IA ?"
            description="Réservez un échange de 30 minutes gratuit pour découvrir comment l'IA peut faire gagner du temps à votre entreprise du BTP."
            primaryLabel="Prendre rendez-vous"
            primaryHref={CALENDLY_BOOKING_URL}
            primaryCalendlyCampaign={`blog-article-${slug}-cta-block-early`}
            secondaryLabel="Découvrir les formations"
            secondaryHref="/formations"
          />
        </div>

        <div className="mt-12 space-y-10">
          {article.sections.map((section, i) => {
            const contentStr = getContentAsString(section.content);
            const sectionAnchor =
              showToc && section.title ? IA_DEVIS_SECTION_ANCHORS[section.title] : undefined;
            return (
              <Fragment key={i}>
              <section>
                {section.type === 'definition' && section.title && (
                  <div className="rounded-2xl border-2 border-[var(--accent)] bg-[var(--accent-soft)] p-6">
                    <h2 id={sectionAnchor} className="font-display text-xl font-bold text-slate-900">
                      {section.title}
                    </h2>
                    <p className="mt-4 text-slate-700">{contentStr}</p>
                  </div>
                )}
                {section.type === 'paragraph' && (
                  <>
                    {section.title && (
                      <h2 id={sectionAnchor} className="font-display text-xl font-bold text-slate-900">
                        {section.title}
                      </h2>
                    )}
                    <p className="mt-2 text-slate-600 leading-relaxed">{contentStr}</p>
                  </>
                )}
                {section.type === 'html' && typeof section.content === 'string' && (
                  <>
                    {section.title && (
                      <h2 id={sectionAnchor} className="font-display text-xl font-bold text-slate-900">
                        {section.title}
                      </h2>
                    )}
                    <div
                      className={`article-html text-slate-700 ${section.title ? 'mt-4' : ''}`}
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                  </>
                )}
              {section.type === 'list' && (
                <>
                  {section.title && (
                    <h2 id={sectionAnchor} className="font-display text-xl font-bold text-slate-900">
                      {section.title}
                    </h2>
                  )}
                  <ul className="mt-4 space-y-3">
                    {getStringItems(section.content).map((item, j) => (
                        <li key={j} className="flex gap-3 text-slate-600">
                          <Check
                            size={20}
                            strokeWidth={1.5}
                            className="mt-0.5 shrink-0 text-[var(--accent)]"
                          />
                          {item}
                        </li>
                      ))}
                  </ul>
                </>
              )}
              {section.type === 'prompts' && getPromptsFromContent(section.content).length > 0 && (
                <>
                  {section.title && (
                    <h2 id={sectionAnchor} className="font-display text-xl font-bold text-slate-900">
                      {section.title}
                    </h2>
                  )}
                  <div className="mt-6 space-y-6">
                    {getPromptsFromContent(section.content).map((p, j) => (
                      <div
                        key={j}
                        className="rounded-xl border-l-4 border-[var(--accent)] bg-slate-50 p-5"
                      >
                        <h3 className="font-semibold text-slate-900">{p.titre}</h3>
                        <blockquote className="mt-3 border-0 pl-0 font-mono text-sm italic text-slate-700">
                          {p.prompt}
                        </blockquote>
                        {p.usage && (
                          <p className="mt-2 text-sm text-slate-500">{p.usage}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
              {section.type === 'faq' && section.title && (
                <>
                  <h2 id={sectionAnchor} className="font-display text-xl font-bold text-slate-900">
                    {section.title}
                  </h2>
                  <div className="mt-6 space-y-6">
                    {getStringItems(section.content).map((item, j) => {
                        const sep = item.indexOf(' — ');
                        const q = sep >= 0 ? item.slice(0, sep) : item;
                        const a = sep >= 0 ? item.slice(sep + 3) : '';
                        return (
                          <div
                            key={j}
                            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                          >
                            <h3 className="font-semibold text-slate-900">{q}</h3>
                            <p className="mt-2 text-slate-600"><FAQAnswer content={a} /></p>
                          </div>
                        );
                      })}
                  </div>
                </>
              )}
              {section.type === 'cta' && (
                <div className="rounded-2xl bg-[var(--accent)] p-6 text-white">
                  <p className="font-medium">{getContentAsString(section.content)}</p>
                  <div className="mt-4 flex flex-wrap gap-4">
                    {'ctaCommunauteHref' in section && section.ctaCommunauteHref && (
                      <ExternalLinkAnchor
                        href={section.ctaCommunauteHref}
                        title="Rejoindre le groupe Facebook"
                        className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-2 font-semibold text-[var(--accent)] hover:bg-blue-50"
                      >
                        <ExternalLink size={16} strokeWidth={1.5} />
                        Rejoindre la communauté
                      </ExternalLinkAnchor>
                    )}
                    <RdvLink campaign={`blog-article-${slug}-section-cta`} className="inline-block rounded-xl bg-white px-6 py-2 font-semibold text-[var(--accent)] hover:bg-blue-50">
                      Prendre rendez-vous
                    </RdvLink>
                    <Link
                      href="/formations"
                      className="inline-block rounded-xl border-2 border-white/60 px-6 py-2 font-semibold text-white hover:bg-white/10"
                    >
                      Catalogue formations
                    </Link>
                    <Link
                      href="/formation-ia-artisans-btp"
                      className="inline-block rounded-xl border-2 border-white/60 px-6 py-2 font-semibold text-white hover:bg-white/10"
                    >
                      ChatGPT pour entreprises BTP
                    </Link>
                    <Link
                      href="/ia-devis-batiment"
                      className="inline-block rounded-xl border-2 border-white/60 px-6 py-2 font-semibold text-white hover:bg-white/10"
                    >
                      IA devis bâtiment
                    </Link>
                    <Link
                      href="/financement-constructys-formation-ia-btp"
                      className="inline-block rounded-xl border-2 border-white/60 px-6 py-2 font-semibold text-white hover:bg-white/10"
                    >
                      Tarifs et financement
                    </Link>
                    {'formationHref' in section && section.formationHref && (
                      <Link
                        href={section.formationHref}
                        className="inline-block rounded-xl border-2 border-white/60 px-6 py-2 font-semibold text-white hover:bg-white/10"
                      >
                        Découvrir la formation
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </section>
            {showMidBlogCTA && midCtaAfterIndex === i ? (
              <BlogCTA articleSlug={slug} idSuffix="mid" className="mt-10 scroll-mt-8" />
            ) : null}
          </Fragment>
          );
        })}
        </div>

        <BlogCTA articleSlug={slug} className="mt-12" />

        <AuthorBio />

        {related.length > 0 && (
          <section className="mt-16 border-t border-slate-200 pt-12">
            <h2 className="font-display text-xl font-semibold text-slate-900">
              Articles associés — à lire aussi
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Continuez à explorer nos ressources sur l&apos;IA pour le BTP.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => (
                <Link
                  key={a.slug}
                  href={`/blog/${a.slug}`}
                  className="group block rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md hover:border-[var(--accent)]"
                >
                  <span className="font-medium text-slate-900 group-hover:text-[var(--accent)]">
                    {a.title}
                  </span>
                  {a.description && (
                    <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                      {a.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="font-display text-lg font-semibold text-slate-900">
            Guides pratiques
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Découvrez nos guides dédiés à l&apos;IA pour le BTP :
          </p>
          <ul className="mt-4 flex flex-wrap gap-4">
            <li>
              <Link
                href={LINKS.chatgptArtisans}
                className="text-[var(--accent)] font-medium hover:underline"
                title="ChatGPT pour entreprises du BTP"
              >
                ChatGPT pour entreprises BTP
              </Link>
            </li>
            <li>
              <Link
                href={LINKS.iaDevis}
                className="text-[var(--accent)] font-medium hover:underline"
                title="Automatiser les devis bâtiment avec l’IA"
              >
                IA devis bâtiment
              </Link>
            </li>
            <li>
              <Link
                href={LINKS.iaCDT}
                className="text-[var(--accent)] font-medium hover:underline"
                title="IA pour conducteurs de travaux et comptes rendus chantier"
              >
                IA conducteur de travaux
              </Link>
            </li>
            <li>
              <Link
                href={LINKS.financement}
                className="text-[var(--accent)] font-medium hover:underline"
                title="Financement OPCO Constructys — formation IA appliquée au bâtiment"
              >
                Financement Constructys
              </Link>
            </li>
            <li>
              <Link
                href={LINKS.diagnostic}
                className="text-[var(--accent)] font-medium hover:underline"
                title="Diagnostic gratuit sur votre usage de l’IA BTP"
              >
                Diagnostic IA BTP gratuit
              </Link>
            </li>
          </ul>
        </section>

        <div className="mt-12">
          <CTABlock
            variant="compact"
            title="Passez à l'action"
            description="Vous souhaitez découvrir comment l'IA peut faire gagner du temps à votre entreprise du BTP ? Prenez rendez-vous pour échanger sur votre projet — 30 minutes gratuites."
            primaryLabel="Prendre rendez-vous"
            primaryHref={CALENDLY_BOOKING_URL}
            primaryCalendlyCampaign={`blog-article-${slug}-cta-block-late`}
            secondaryLabel="Programme « L'IA au service du bâtiment »"
            secondaryHref={LINKS.formationIaBtpNiveau1BatimentTp}
          />
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link href={LINKS.chatgptArtisans} className="text-[var(--accent)] hover:underline" title="ChatGPT pour entreprises BTP">
            ChatGPT pour entreprises BTP
          </Link>
          <Link href={LINKS.formationParis} className="text-[var(--accent)] hover:underline" title="Formation IA pour le BTP à Paris et Île-de-France">
            Formation IA pour les pro du BTP Paris
          </Link>
          <RdvLink campaign={`blog-article-${slug}-footer-maillage`} className="text-[var(--accent)] hover:underline">
            Prendre rendez-vous
          </RdvLink>
          <Link href={LINKS.financement} className="text-[var(--accent)] hover:underline" title="Financement OPCO Constructys">
            Financement Constructys
          </Link>
          <Link href={LINKS.blog} className="text-[var(--accent)] hover:underline" title="Articles et guides IA BTP">
            Tous les articles
          </Link>
        </div>

        <AllerPlusLoin
          variant="compact"
          links={[
            { href: LINKS.iaDevis, label: 'IA devis bâtiment' },
            { href: LINKS.iaCDT, label: 'IA conducteur de travaux' },
            { href: LINKS.diagnostic, label: 'Diagnostic IA BTP gratuit' },
            { href: buildSiteCalendlyCtaUrl(`blog-article-${slug}-aller-plus-loin`), label: 'Prendre rendez-vous' },
          ]}
        />
      </article>
    </div>
  );
}
