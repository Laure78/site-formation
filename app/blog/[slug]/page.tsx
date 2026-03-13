import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createPageMetadata, getArticleSchema, getBreadcrumbSchema } from '@/lib/seo';
import { SITE_CONFIG } from '@/lib/seo';
import { getArticle, getAllSlugs, getAllArticles } from '@/lib/blog';
import { CTABlock } from '@/components/CTABlock';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { AuthorBlock } from '@/components/blog/AuthorBlock';
import { Calendar, ArrowLeft, Check } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: 'Article non trouvé' };
  const base = createPageMetadata({
    title: article.title,
    description: article.description,
    path: `/blog/${slug}`,
    keywords: article.keywords,
  });
  return {
    ...base,
    authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
    openGraph: {
      ...base.openGraph,
      type: 'article',
      publishedTime: article.date,
      authors: [SITE_CONFIG.name],
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const allArticles = getAllArticles();
  const related = (article.relatedSlugs ?? [])
    .map((s) => allArticles.find((a) => a.slug === s))
    .filter(Boolean) as typeof allArticles;

  const articleSchema = getArticleSchema({
    headline: article.title,
    description: article.description,
    path: `/blog/${article.slug}`,
    datePublished: article.date,
    authorName: SITE_CONFIG.name,
  });
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Accueil', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: article.title, path: `/blog/${article.slug}` },
  ]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <nav className="mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-[var(--accent)] hover:underline"
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
          Retour aux ressources
        </Link>
      </nav>

      <article>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
          <time dateTime={article.date}>
            {new Date(article.date).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </time>
          <span aria-hidden>·</span>
          <address className="not-italic">
            Par{' '}
            <Link href="/auteur/laure-olivie" className="font-medium text-slate-700 hover:text-[var(--accent)] hover:underline" rel="author">
              {SITE_CONFIG.name}
            </Link>
          </address>
        </div>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          {article.title}
        </h1>
        <p className="mt-4 text-lg text-slate-600">{article.description}</p>

        <div className="mt-12 space-y-10">
          {article.sections.map((section, i) => (
            <section key={i}>
              {section.type === 'definition' && section.title && (
                <div className="rounded-2xl border-2 border-[var(--accent)] bg-[var(--accent-soft)] p-6">
                  <h2 className="font-display text-xl font-bold text-slate-900">
                    {section.title}
                  </h2>
                  <p className="mt-4 text-slate-700">
                    {typeof section.content === 'string' ? section.content : section.content[0]}
                  </p>
                </div>
              )}
              {section.type === 'paragraph' && (
                <>
                  {section.title && (
                    <h2 className="font-display text-xl font-bold text-slate-900">
                      {section.title}
                    </h2>
                  )}
                  <p className="mt-2 text-slate-600 leading-relaxed">
                    {typeof section.content === 'string' ? section.content : section.content[0]}
                  </p>
                </>
              )}
              {section.type === 'list' && (
                <>
                  {section.title && (
                    <h2 className="font-display text-xl font-bold text-slate-900">
                      {section.title}
                    </h2>
                  )}
                  <ul className="mt-4 space-y-3">
                    {(Array.isArray(section.content) ? section.content : [section.content]).map(
                      (item, j) => (
                        <li key={j} className="flex gap-3 text-slate-600">
                          <Check
                            size={20}
                            strokeWidth={1.5}
                            className="mt-0.5 shrink-0 text-[var(--accent)]"
                          />
                          {item}
                        </li>
                      )
                    )}
                  </ul>
                </>
              )}
              {section.type === 'faq' && section.title && (
                <>
                  <h2 className="font-display text-xl font-bold text-slate-900">
                    {section.title}
                  </h2>
                  <div className="mt-6 space-y-6">
                    {(Array.isArray(section.content) ? section.content : [section.content]).map(
                      (item, j) => {
                        const str = String(item);
                        const sep = str.indexOf(' — ');
                        const q = sep >= 0 ? str.slice(0, sep) : str;
                        const a = sep >= 0 ? str.slice(sep + 3) : '';
                        return (
                          <div
                            key={j}
                            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                          >
                            <h3 className="font-semibold text-slate-900">{q}</h3>
                            <p className="mt-2 text-slate-600">{a}</p>
                          </div>
                        );
                      }
                    )}
                  </div>
                </>
              )}
              {section.type === 'cta' && (
                <div className="rounded-2xl bg-[var(--accent)] p-6 text-white">
                  <p className="font-medium">{section.content}</p>
                  <div className="mt-4 flex flex-wrap gap-4">
                    <Link
                      href="/prendre-rdv"
                      className="inline-block rounded-xl bg-white px-6 py-2 font-semibold text-[var(--accent)] hover:bg-blue-50"
                    >
                      Prendre rendez-vous
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
          ))}
        </div>

        <AuthorBlock className="mt-12" />

        {related.length > 0 && (
          <section className="mt-16 border-t border-slate-200 pt-12">
            <h2 className="font-display text-lg font-semibold text-slate-900">
              Articles associés
            </h2>
            <ul className="mt-4 flex flex-wrap gap-4">
              {related.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/blog/${a.slug}`}
                    className="text-[var(--accent)] hover:underline"
                  >
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-12">
          <CTABlock
            variant="compact"
            description="Vous souhaitez découvrir comment l'IA peut faire gagner du temps à votre entreprise du BTP ? Prenez rendez-vous pour échanger sur votre projet."
          />
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/formations" className="text-[var(--accent)] hover:underline">
            Formation IA BTP
          </Link>
          <Link href="/prendre-rdv" className="text-[var(--accent)] hover:underline">
            Prendre rendez-vous
          </Link>
          <Link href="/chatgpt-artisans-btp" className="text-[var(--accent)] hover:underline">
            IA pour artisans et PME bâtiment
          </Link>
          <Link href="/blog" className="text-[var(--accent)] hover:underline">
            Toutes les ressources
          </Link>
        </div>

        <AllerPlusLoin variant="compact" />
      </article>
    </div>
  );
}
