import Link from 'next/link';
import {
  getGeneratedArticles,
  getDailySummary,
} from '@/lib/media-machine/storage';
import { BLOG_ARTICLES } from '@/lib/blog';
import {
  FileText,
  TrendingUp,
  Link2,
  Hash,
  BarChart3,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export default async function MediaDashboardPage() {
  const generated = getGeneratedArticles();
  const summary = getDailySummary();
  const allKeywords = new Set<string>();
  generated.forEach((a) => a.keywords.forEach((k) => allKeywords.add(k)));
  BLOG_ARTICLES.forEach((a) => a.keywords.forEach((k) => allKeywords.add(k)));

  const stats = [
    {
      label: 'Articles publiés (blog)',
      value: BLOG_ARTICLES.length,
      icon: FileText,
      color: 'bg-emerald-100 text-emerald-700',
    },
    {
      label: 'Articles générés (en attente)',
      value: generated.length,
      icon: Sparkles,
      color: 'bg-amber-100 text-amber-700',
    },
    {
      label: 'Mots-clés ciblés',
      value: allKeywords.size,
      icon: Hash,
      color: 'bg-blue-100 text-blue-700',
    },
    {
      label: 'Potentiel SEO (articles total)',
      value: BLOG_ARTICLES.length + generated.length,
      icon: BarChart3,
      color: 'bg-violet-100 text-violet-700',
    },
  ];

  return (
    <div className="p-4 md:p-8">
      <h1 className="font-display text-2xl font-bold text-slate-900">
        Article de blog automatisé
      </h1>
      <p className="mt-1 text-slate-600">
        Suivi des articles, mots-clés et maillage interne
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}
            >
              <Icon size={24} strokeWidth={1.5} />
            </div>
            <p className="mt-4 text-2xl font-bold text-slate-900">{value}</p>
            <p className="text-sm text-slate-600">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-display flex items-center gap-2 text-lg font-semibold text-slate-900">
            <FileText size={20} strokeWidth={1.5} />
            Articles générés (en attente)
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Lancez <code className="rounded bg-slate-100 px-1">npm run media:generate</code> pour en créer
          </p>
          <div className="mt-4 max-h-64 space-y-2 overflow-y-auto">
            {generated.length === 0 ? (
              <p className="text-sm text-slate-500">Aucun article généré</p>
            ) : (
              generated.map((a) => (
                <div
                  key={a.slug}
                  className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2"
                >
                  <span className="font-medium text-slate-900">{a.title}</span>
                  <span className="text-xs text-slate-500">{a.slug}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-display flex items-center gap-2 text-lg font-semibold text-slate-900">
            <TrendingUp size={20} strokeWidth={1.5} />
            Dernière génération
          </h2>
          {summary ? (
            <div className="mt-4 space-y-2">
              <p className="text-sm text-slate-600">
                {summary.date} — {summary.articles.length} articles, {summary.linkedinCount} posts LinkedIn
              </p>
              <ul className="text-sm text-slate-700">
                {summary.articles.slice(0, 5).map((a) => (
                  <li key={a.slug}>• {a.title}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-500">Aucune génération récente</p>
          )}
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-display flex items-center gap-2 text-lg font-semibold text-slate-900">
          <Link2 size={20} strokeWidth={1.5} />
          Maillage interne
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Les articles générés incluent des ancres vers : /formations, /formation-ia-artisans-btp, /ia-devis-batiment, /prendre-rdv
        </p>
        {generated.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {Array.from(
              new Set(
                generated.flatMap((a) =>
                  (a.internalLinks ?? []).map((l) => `${l.path} — ${l.anchor}`)
                )
              )
            ).map((link) => (
              <span
                key={link}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700"
              >
                {link}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 font-medium text-slate-700 hover:bg-slate-50"
        >
          <ExternalLink size={18} strokeWidth={1.5} />
          Voir le blog
        </Link>
      </div>
    </div>
  );
}
