import Link from 'next/link';
import { FileText, ArrowRight, Clock, TrendingUp } from 'lucide-react';
import { createPageMetadata } from '@/lib/seo';
import { formatProfessionalsTrainedCount } from '@/lib/constants';

export const metadata = createPageMetadata({
  title: 'Ressources IA BTP : Guides & Articles pratiques',
  description:
    "Guides et ressources IA pour le BTP : cas d'usage, ChatGPT, devis automatisés. Contenus pour dirigeants et équipes du bâtiment. Téléchargez-les.",
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
    <div className="min-h-screen bg-[#F8FAFC]">
      <section className="border-b border-slate-200 bg-white px-4 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#377CF3]">Bibliothèque IA BTP</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Ressources IA BTP
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-700 md:text-xl">
            Guides pratiques, cas d'usage, et articles pour maîtriser l'intelligence artificielle
            dans le bâtiment et les travaux publics.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 text-center shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
              <FileText size={40} className="mx-auto text-[var(--accent)]" strokeWidth={1.5} />
              <p className="mt-4 text-3xl font-bold text-slate-900">
                {ARTICLES.length}
              </p>
              <p className="text-sm text-slate-600">
                {ARTICLES.length === 1 ? 'Guide disponible' : 'Guides disponibles'}
              </p>
            </div>
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 text-center shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
              <Clock size={40} className="mx-auto text-[var(--accent)]" strokeWidth={1.5} />
              <p className="mt-4 text-3xl font-bold text-slate-900">100%</p>
              <p className="text-sm text-slate-600">Cas d'usage réels</p>
            </div>
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 text-center shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
              <TrendingUp size={40} className="mx-auto text-[var(--accent)]" strokeWidth={1.5} />
              <p className="mt-4 text-3xl font-bold text-slate-900">
                +{formatProfessionalsTrainedCount()}
              </p>
              <p className="text-sm text-slate-600">Professionnels formés</p>
            </div>
          </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-4 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">
            Guides & Articles
          </h2>

          <div className="mt-12 space-y-6">
            {ARTICLES.map((article) => (
              <Link
                key={article.href}
                href={article.href}
                className="group flex flex-col gap-6 rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition-all hover:border-[#BFDBFE] hover:shadow-[0_14px_44px_rgba(15,23,42,0.08)] md:flex-row md:items-center"
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

          <div className="mt-12 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-8 text-center">
            <p className="text-slate-600">
              <strong>Nouveaux guides en préparation.</strong> Revenez prochainement pour découvrir plus de ressources sur l'IA dans le BTP.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:py-16">
        <div className="mx-auto max-w-6xl rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] px-6 py-10 text-center md:px-10">
          <h2 className="font-display text-3xl font-bold text-slate-900">
            Vous souhaitez former vos équipes à l'IA ?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Formations courtes et pratiques — financement possible selon éligibilité.
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
