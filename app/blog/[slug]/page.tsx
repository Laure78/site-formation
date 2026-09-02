import { Fragment } from 'react';
import { CTA_RDV_LABEL } from '@/components/CtaRdv';
import { FAQAnswer } from '@/components/landing/FAQAnswer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { buildBlogArticleOgImageAlt } from '@/lib/image-alt';
import {
  ARTICLE_SECTION_GEO,
  buildTitle,
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
import { LINKS } from '@/lib/internal-links';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { ArticleAuthorBio } from '@/components/blog/ArticleAuthorBio';
import { BlogArticleEnBref } from '@/components/blog/BlogArticleEnBref';
import { BlogArticleSchemas } from '@/components/blog/BlogArticleSchemas';
import { getBlogArticleContentUpdatedAt, formatContentUpdatedLabel } from '@/lib/content-updated-at';
import { Check, ExternalLink } from 'lucide-react';
import { OFC_CARD, OFC_LINK } from '@/lib/ofc-interaction-classes';
import { SommaireAncre } from '@/components/readability/SommaireAncre';
import {
  buildSommaireFromSectionTitles,
  shouldShowSommaireAncre,
  sommaireItemsToAnchorMap,
} from '@/lib/sommaire-ancre';
import { autoLink, createAutoLinkScope } from '@/lib/autoLink';
import {
  filterArticleSectionsForDisplay,
  resolveArticleEnBref,
} from '@/lib/blog-en-bref';

interface Props {
  params: Promise<{ slug: string }>;
}

/** Ancres stables — prioritaires sur le slug auto quand le titre diffère du libellé sommaire. */
const BLOG_SECTION_ANCHOR_OVERRIDES: Record<string, Record<string, string>> = {
  'ia-devis-batiment-chiffrage-automatise': {
    'Le constat': 'le-constat',
    'Les gains mesurés': 'les-gains',
    'Par où commencer ?': 'par-ou-commencer',
    "Prompts devis et chiffrage — prêts à l'emploi": 'prompts-devis',
    'Questions fréquentes': 'faq',
  },
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
  if (!article) return { title: { absolute: buildTitle('Article non trouvé') } };
  const metaTitle = article.seoTitle ?? article.title;
  const authorUrl = `${SITE_CONFIG.url}/a-propos`;
  const category = ARTICLE_SECTION_GEO;
  const ogImageUrl = `${SITE_CONFIG.url}/api/og?title=${encodeURIComponent(metaTitle)}&category=${encodeURIComponent(category)}`;
  const ogImageAlt = buildBlogArticleOgImageAlt(metaTitle);
  const base = createPageMetadata({
    title: metaTitle,
    description: article.description,
    descriptionFinal: true,
    path: `/blog/${slug}`,
    keywords: article.keywords,
    /** Évite le suffixe commun sur og:description — les articles ont déjà une phrase unique optimisée */
    appendAuthorSuffix: false,
    openGraphTitle: metaTitle,
    openGraphDescription: article.description,
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
      alt: ogImageAlt,
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

  const enBrefSentences = resolveArticleEnBref(article);
  const displaySections = filterArticleSectionsForDisplay(article.sections, enBrefSentences);

  const wordCount = estimateWordCountFromArticle(article);
  const midCtaAfterIndex = getBlogCTAMidInsertAfterIndex(displaySections);
  const showMidBlogCTA =
    midCtaAfterIndex !== null && midCtaAfterIndex < displaySections.length - 1;
  const defaultArticleImage = `${SITE_CONFIG.url}/images/og-default-formation-ia-btp.jpg`;
  const articleSchemaImage = article.coverImage
    ? article.coverImage.trim().startsWith('http')
      ? article.coverImage.trim()
      : `${SITE_CONFIG.url}${article.coverImage.trim().startsWith('/') ? article.coverImage.trim() : `/${article.coverImage.trim()}`}`
    : defaultArticleImage;
  const howToSchema = getHowToFromArticle(article);
  const sommaireItems = buildSommaireFromSectionTitles(
    displaySections,
    BLOG_SECTION_ANCHOR_OVERRIDES[slug]
  );
  const showSommaire = shouldShowSommaireAncre(sommaireItems);
  const sectionAnchors = sommaireItemsToAnchorMap(sommaireItems);
  const autoLinkScope = createAutoLinkScope();
  const contentUpdatedAt = getBlogArticleContentUpdatedAt(article.date, article.dateModified);

  return (
    <div className={`mx-auto px-4 py-16 ${showSommaire ? 'max-w-6xl' : 'max-w-3xl'}`}>
      <BlogArticleSchemas
        slug={slug}
        legacyArticle={article}
        howToSchema={howToSchema}
        article={{
          title: article.title,
          headline: article.seoTitle ?? article.title,
          description: article.description,
          slug: article.slug,
          datePublished: article.date,
          dateModified: article.dateModified,
          imageUrl: articleSchemaImage,
          keywords: article.keywords,
          wordCount,
        }}
      />

      <div
        className={
          showSommaire
            ? 'lg:grid lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)] lg:items-start lg:gap-8 xl:gap-10'
            : undefined
        }
      >
        {showSommaire ? (
          <div className="mb-8 lg:mb-0">
            <SommaireAncre
              items={sommaireItems}
              instanceId={`blog-${slug}`}
              heading="Dans cet article"
            />
          </div>
        ) : null}

        <article className={showSommaire ? 'min-w-0 max-w-3xl' : undefined}>
        <p className="text-xs text-slate-400 sm:text-sm">
          <time dateTime={contentUpdatedAt}>{formatContentUpdatedLabel(contentUpdatedAt)}</time>
        </p>
        <div className="mt-2 flex flex-col gap-1 text-sm text-slate-500 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-1">
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
              <Link href="/a-propos" className={`${OFC_LINK} text-slate-700`} rel="author">
                {SITE_CONFIG.name}
              </Link>
            </address>
          </div>
        </div>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          {article.title}
        </h1>
        {enBrefSentences ? <BlogArticleEnBref sentences={enBrefSentences} /> : null}
        <p className="mt-4 text-lg text-slate-600">{article.description}</p>

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
            primaryHref={LINKS.prendreRdv}
            secondaryLabel="Découvrir les formations"
            secondaryHref="/formations"
          />
        </div>

        <div className="mt-12 space-y-10">
          {displaySections.map((section, i) => {
            const contentStr = getContentAsString(section.content);
            const sectionAnchor = section.title ? sectionAnchors[section.title] : undefined;
            const h2Class =
              'scroll-mt-28 font-display text-xl font-bold text-slate-900';
            return (
              <Fragment key={i}>
              <section>
                {section.type === 'definition' && section.title && (
                  <div className="rounded-2xl border-2 border-[var(--accent)] bg-[var(--accent-soft)] p-6">
                    <h2 id={sectionAnchor} className={h2Class}>
                      {section.title}
                    </h2>
                    <p className="mt-4 text-slate-700">{contentStr}</p>
                  </div>
                )}
                {section.type === 'paragraph' && (
                  <>
                    {section.title && (
                      <h2 id={sectionAnchor} className={h2Class}>
                        {section.title}
                      </h2>
                    )}
                    <p className="mt-2 text-slate-600 leading-relaxed">{contentStr}</p>
                  </>
                )}
                {section.type === 'html' && typeof section.content === 'string' && (
                  <>
                    {section.title && (
                      <h2 id={sectionAnchor} className={h2Class}>
                        {section.title}
                      </h2>
                    )}
                    <div
                      className={`article-html text-slate-700 ${section.title ? 'mt-4' : ''}`}
                      dangerouslySetInnerHTML={{
                        __html: autoLink(section.content, autoLinkScope),
                      }}
                    />
                  </>
                )}
              {section.type === 'list' && (
                <>
                  {section.title && (
                    <h2 id={sectionAnchor} className={h2Class}>
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
                    <h2 id={sectionAnchor} className={h2Class}>
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
                  <h2 id={sectionAnchor} className={h2Class}>
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
                            <p className="mt-2 text-slate-600">
                              <FAQAnswer content={autoLink(a, autoLinkScope)} />
                            </p>
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
                    <RdvLink campaign={`blog-article-${slug}-section-cta`} className="inline-block rounded-xl bg-white px-6 py-2 font-semibold text-[var(--accent)] hover:bg-blue-50" />
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

        <ArticleAuthorBio />

        {related.length > 0 && (
          <section className="mt-16 border-t border-slate-200 pt-12">
            <h2 className="font-display text-xl font-semibold text-slate-900">
              Articles associés — à lire aussi
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Continuez à explorer mes ressources sur l&apos;IA pour le BTP.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => (
                <Link
                  key={a.slug}
                  href={`/blog/${a.slug}`}
                  className={`${OFC_CARD} group block p-4`}
                >
                  <span className="font-medium text-slate-900 transition-colors duration-150 group-hover:text-[#377CF3]">
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
            Découvrez mes guides dédiés à l&apos;IA pour le BTP :
          </p>
          <ul className="mt-4 flex flex-wrap gap-4">
            <li>
              <Link
                href={LINKS.chatgptArtisans}
                className={OFC_LINK}
                title="ChatGPT pour entreprises du BTP"
              >
                ChatGPT pour entreprises BTP
              </Link>
            </li>
            <li>
              <Link
                href={LINKS.iaDevis}
                className={OFC_LINK}
                title="Automatiser les devis bâtiment avec l’IA"
              >
                IA devis bâtiment
              </Link>
            </li>
            <li>
              <Link
                href={LINKS.iaCDT}
                className={OFC_LINK}
                title="IA pour conducteurs de travaux et comptes rendus chantier"
              >
                IA conducteur de travaux
              </Link>
            </li>
            <li>
              <Link
                href={LINKS.financement}
                className={OFC_LINK}
                title="Financement OPCO Constructys — formation IA appliquée au bâtiment"
              >
                Financement Constructys
              </Link>
            </li>
            <li>
              <Link
                href={LINKS.diagnostic}
                className={OFC_LINK}
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
            primaryHref={LINKS.prendreRdv}
            primaryCalendlyCampaign={`blog-article-${slug}-cta-block-late`}
            secondaryLabel="Programme « L'IA au service du bâtiment »"
            secondaryHref={LINKS.formationIaBtpNiveau1BatimentTp}
          />
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link href={LINKS.formationIleDeFrance} className={OFC_LINK} title="Formation IA en Île-de-France">
            Formation IA Île-de-France
          </Link>
          <Link href={LINKS.formationParis} className={OFC_LINK} title="Formation IA pour le BTP à Paris">
            Formation IA Paris
          </Link>
          <Link href={LINKS.ressources} className={OFC_LINK} title="Guides et tutos PDF IA BTP">
            Ressources &amp; tutos PDF
          </Link>
          <Link href={LINKS.blog} className={OFC_LINK} title="Tous les articles IA BTP">
            Tous les articles
          </Link>
        </div>

        <AllerPlusLoin
          variant="compact"
          links={[
            { href: LINKS.iaDevis, label: 'IA devis bâtiment' },
            { href: LINKS.iaCDT, label: 'IA conducteur de travaux' },
            { href: LINKS.diagnostic, label: 'Diagnostic IA BTP gratuit' },
            { href: LINKS.prendreRdv, label: CTA_RDV_LABEL },
          ]}
        />
        </article>
      </div>
    </div>
  );
}
