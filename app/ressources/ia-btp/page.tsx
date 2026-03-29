import Link from 'next/link';
import { FileText, ArrowRight, Clock, TrendingUp } from 'lucide-react';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Ressources IA BTP : Guides & Articles pratiques',
  description:
    "Guides et ressources IA BTP : cas d'usage, ChatGPT, devis automatisés. Contenus pour dirigeants et artisans. Téléchargez les repères et avancez sereinement.",
  path: '/ressources/ia-btp',
  keywords: [
    'ressources IA BTP',
    'guides IA bâtiment',
    'articles IA construction',
    'documentation IA BTP',
    'blog IA BTP',
  ],
});

const ARTICLES = [
  {
    titre: 'IA dans le BTP : 10 cas d\'usage concrets (2026)',
    description: 'Découvrez 10 applications pratiques et rentables de l\'IA dans les entreprises du bâtiment. Exemples réels, gains de temps mesurés, ROI immédiat.',
    href: '/ressources/ia-btp/10-cas-usage-concrets',
    lecture: '12 min',
    date: '17 mars 2026',
    badge: 'Guide complet',
  },
];

export default function RessourcesIABTPPage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-slate-200 bg-gradient-to-br from-[var(--accent)] to-blue-800 px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h1 className="font-display text-4xl font-bold text-white md:text-5xl">
            Ressources IA BTP
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-blue-50">
            Guides pratiques, cas d'usage, et articles pour maîtriser l'intelligence artificielle 
            dans le bâtiment, l'artisanat et les travaux publics.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-slate-200 bg-white px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
              <FileText size={40} className="mx-auto text-[var(--accent)]" strokeWidth={1.5} />
              <p className="mt-4 text-3xl font-bold text-slate-900">
                {ARTICLES.length}
              </p>
              <p className="text-sm text-slate-600">
                {ARTICLES.length === 1 ? 'Guide disponible' : 'Guides disponibles'}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
              <Clock size={40} className="mx-auto text-[var(--accent)]" strokeWidth={1.5} />
              <p className="mt-4 text-3xl font-bold text-slate-900">100%</p>
              <p className="text-sm text-slate-600">Cas d'usage réels</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
              <TrendingUp size={40} className="mx-auto text-[var(--accent)]" strokeWidth={1.5} />
              <p className="mt-4 text-3xl font-bold text-slate-900">+1500</p>
              <p className="text-sm text-slate-600">Professionnels formés</p>
            </div>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">
            Guides & Articles
          </h2>

          <div className="mt-12 space-y-6">
            {ARTICLES.map((article) => (
              <Link
                key={article.href}
                href={article.href}
                className="group flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:border-[var(--accent)] hover:shadow-md md:flex-row md:items-center"
              >
                <div className="flex-1">
                  {article.badge && (
                    <span className="inline-block rounded-full bg-[var(--accent-soft)] px-4 py-1 text-sm font-medium text-[var(--accent)]">
                      {article.badge}
                    </span>
                  )}
                  <h3 className="mt-3 text-2xl font-bold text-slate-900 group-hover:text-[var(--accent)]">
                    {article.titre}
                  </h3>
                  <p className="mt-3 text-slate-600">{article.description}</p>
                  <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>Lecture : {article.lecture}</span>
                  </div>
                </div>
                <div className="flex shrink-0 items-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[var(--accent)] text-[var(--accent)] transition-colors group-hover:bg-[var(--accent)] group-hover:text-white">
                    <ArrowRight size={24} />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <p className="text-slate-600">
              <strong>Nouveaux guides en préparation.</strong> Revenez prochainement pour découvrir plus de ressources sur l'IA dans le BTP.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-3xl font-bold text-slate-900">
            Vous souhaitez former vos équipes à l'IA ?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Formations courtes et pratiques, 100% finançables par l'OPCO Constructys.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/formations"
              className="rounded-xl bg-[var(--accent)] px-8 py-4 font-semibold text-white hover:bg-blue-700"
            >
              Voir les formations
            </Link>
            <Link
              href="/diagnostic-ia-btp"
              className="rounded-xl border-2 border-[var(--accent)] px-8 py-4 font-semibold text-[var(--accent)] hover:bg-[var(--accent-soft)]"
            >
              Diagnostic gratuit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
