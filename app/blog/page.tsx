import Link from 'next/link';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';
import { getAllArticles } from '@/lib/blog';
import { Calendar, ArrowRight } from 'lucide-react';

export const metadata = createPageMetadata({
  title: 'Formation IA BTP — Articles, guides pratiques',
  description:
    'Articles et guides sur la formation IA BTP : ChatGPT artisans, financement Constructys, automatiser devis bâtiment. Qualiopi.',
  path: '/blog',
  keywords: ['blog formation IA BTP', 'ressources IA bâtiment', 'articles ChatGPT BTP'],
});

export default function BlogPage() {
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

      <div className="mt-12 space-y-8">
        {getAllArticles().map((article) => (
          <article
            key={article.slug}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:p-8"
          >
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
        ))}
      </div>
    </div>
  );
}
