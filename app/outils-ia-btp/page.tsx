import Link from 'next/link';
import { ArrowRight, BookOpen, Scale, Shield } from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { RdvLink } from '@/components/RdvLink';
import {
  breadcrumbItemsFromPaths,
  createPageMetadata,
  getBreadcrumbSchema,
} from '@/lib/seo';

const PATH = '/outils-ia-btp';

export const metadata = createPageMetadata({
  title: 'Outils IA BTP : ChatGPT, Claude, Gemini — comparatif & ressources',
  description:
    'Page pilier : comparatif ChatGPT, Claude et Gemini pour artisans et PME du BTP. Articles, tutoriels et bonnes pratiques. OFC Création d’Entreprise, Qualiopi.',
  path: PATH,
  keywords: [
    'outils IA BTP ChatGPT Claude Gemini',
    'comparatif ChatGPT Claude Gemini',
    'IA générative bâtiment',
    'ChatGPT artisans BTP',
    'Claude AI BTP',
    'Gemini Google Workspace BTP',
  ],
});

const breadcrumbJson = getBreadcrumbSchema([
  { name: 'Accueil', path: '/' },
  { name: 'Outils IA BTP', path: PATH },
]);

const ARTICLES_OUTILS = [
  {
    titre: 'ChatGPT, Claude, Gemini : le guide complet pour démarrer avec l’IA dans le BTP',
    href: '/blog/outils-ia-btp-chatgpt-claude-gemini',
    badge: 'Comparatif & tutoriel',
  },
  {
    titre: 'Claude AI pour le BTP : les 5 interfaces expliquées et comment choisir la bonne',
    href: '/blog/claude-ai-btp-5-interfaces-chat-cowork-code',
    badge: 'Claude — Chat, Cowork, Code…',
  },
  {
    titre: 'ChatGPT pour artisans BTP : 10 prompts prêts à l’emploi par corps de métier',
    href: '/blog/chatgpt-prompts-artisans-btp',
    badge: 'Prompts',
  },
  {
    titre: 'Comment protéger les données de votre entreprise BTP quand vous utilisez l’IA',
    href: '/blog/confidentialite-donnees-ia-btp',
    badge: 'Confidentialité',
  },
  {
    titre: 'ChatGPT pour le BTP : guide complet',
    href: '/blog/chatgpt-btp-guide-complet',
    badge: 'Guide',
  },
  {
    titre: 'Claude AI pour mémoire technique BTP : les 5 erreurs à ne pas commettre',
    href: '/blog/claude-ai-memoire-technique-erreurs-btp',
    badge: 'Appels d’offres',
  },
  {
    titre: '5 cas d’usage de ChatGPT pour les entreprises du bâtiment',
    href: '/blog/5-cas-usage-chatgpt-artisans-btp',
    badge: 'Cas d’usage',
  },
  {
    titre: 'IA pour conducteur de travaux : usages et limites',
    href: '/blog/ia-conducteur-travaux-chatgpt',
    badge: 'Chantier',
  },
] as const;

export default function OutilsIABTPPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />

      <div className="mx-auto max-w-5xl px-4 pt-8">
        <Breadcrumb
          items={breadcrumbItemsFromPaths([
            { name: 'Accueil', path: '/' },
            { name: 'Outils IA BTP', path: PATH },
          ])}
          showVisual
        />
      </div>

      <section className="border-b border-slate-200 bg-gradient-to-br from-[var(--accent)] to-blue-800 px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h1 className="font-display text-4xl font-bold text-white md:text-5xl">
            Outils IA pour le BTP : ChatGPT, Claude, Gemini
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-blue-50">
            Cette page regroupe les ressources pratiques pour choisir et utiliser les assistants IA les plus
            courants dans le bâtiment et les travaux publics : devis, courriers, mémoires techniques, analyse de
            documents. Méthode testée avec plus de 1&nbsp;592 professionnels formés (OFC Création d’Entreprise,
            certification Qualiopi). Pour une vue dédiée à{' '}
            <Link href="/claude-ai-btp" className="font-semibold text-white underline decoration-white/80 hover:no-underline">
              Claude AI (Anthropic) dans le BTP
            </Link>
            , consultez la page pilier associée.
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Comparatif rapide (indicatif)
          </h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            Tarifs et fonctionnalités évoluent souvent : vérifiez toujours les pages officielles des éditeurs avant
            de vous engager. Ce tableau sert d’orientation pour les équipes terrain et le support.{' '}
            <strong>Dernière mise à jour : avril 2026</strong> — révision prévue en juillet 2026 (trimestriel).
          </p>

          <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <caption className="sr-only">
                Comparatif indicatif ChatGPT, Claude et Gemini pour usage professionnel BTP
              </caption>
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
                    Critère
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
                    ChatGPT (OpenAI)
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
                    Claude (Anthropic)
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
                    Gemini (Google)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                <tr>
                  <th scope="row" className="px-4 py-3 font-medium text-slate-900">
                    Entrée de gamme
                  </th>
                  <td className="px-4 py-3">Compte gratuit avec limites ; usage courant pour tests</td>
                  <td className="px-4 py-3">Gratuit avec plafonds ; bon pour textes longs</td>
                  <td className="px-4 py-3">Gratuit ; lié au compte Google</td>
                </tr>
                <tr>
                  <th scope="row" className="px-4 py-3 font-medium text-slate-900">
                    Offre pro (ordre de grandeur)
                  </th>
                  <td className="px-4 py-3">Abonnement individuel ou équipe (tarif public variable)</td>
                  <td className="px-4 py-3">Pro / équipe selon offre Anthropic</td>
                  <td className="px-4 py-3">Google AI Pro / Workspace selon formule</td>
                </tr>
                <tr>
                  <th scope="row" className="px-4 py-3 font-medium text-slate-900">
                    Atouts fréquents en BTP
                  </th>
                  <td className="px-4 py-3">Écosystème large, plugins / intégrations, usage généraliste</td>
                  <td className="px-4 py-3">Fichiers longs, ton posé, brouillons de mémoires</td>
                  <td className="px-4 py-3">Lien natif avec Gmail, Drive, Docs si écosystème Google</td>
                </tr>
                <tr>
                  <th scope="row" className="px-4 py-3 font-medium text-slate-900">
                    Données &amp; conformité
                  </th>
                  <td className="px-4 py-3" colSpan={3}>
                    Paramètres compte, offres entreprise et DPA à valider selon votre politique interne. Voir l’article{' '}
                    <Link
                      href="/blog/confidentialite-donnees-ia-btp"
                      className="font-medium text-[var(--accent)] underline hover:no-underline"
                    >
                      confidentialité et données en BTP
                    </Link>
                    .
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center gap-3">
            <BookOpen className="text-[var(--accent)]" size={28} strokeWidth={1.5} aria-hidden />
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              Articles et tutoriels
            </h2>
          </div>
          <p className="mt-4 max-w-3xl text-slate-600">
            Maillage interne vers les contenus les plus utiles pour passer à l’action sur le terrain (devis, chantier,
            réponses marchés).
          </p>

          <ul className="mt-10 space-y-4">
            {ARTICLES_OUTILS.map((article) => (
              <li key={article.href}>
                <Link
                  href={article.href}
                  className="group flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-[var(--accent)] hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <span className="inline-block rounded-full bg-[var(--accent-soft)] px-3 py-0.5 text-xs font-medium text-[var(--accent)]">
                      {article.badge}
                    </span>
                    <p className="mt-2 text-lg font-semibold text-slate-900 group-hover:text-[var(--accent)]">
                      {article.titre}
                    </p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-[var(--accent)]">
                    Lire l’article
                    <ArrowRight size={18} strokeWidth={2} aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Link
              href="/blog/financer-formation-ia-btp-constructys"
              className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors hover:border-[var(--accent)]"
            >
              <Scale className="shrink-0 text-[var(--accent)]" size={28} strokeWidth={1.5} aria-hidden />
              <div>
                <p className="font-semibold text-slate-900">Financer une formation IA (Constructys)</p>
                <p className="mt-1 text-sm text-slate-600">
                  Modalités OPCO et plafonds pour monter en compétence sur les outils avec un cadre Qualiopi.
                </p>
              </div>
            </Link>
            <Link
              href="/ressources/ia-btp"
              className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors hover:border-[var(--accent)]"
            >
              <Shield className="shrink-0 text-[var(--accent)]" size={28} strokeWidth={1.5} aria-hidden />
              <div>
                <p className="font-semibold text-slate-900">Autres ressources IA BTP</p>
                <p className="mt-1 text-sm text-slate-600">
                  Guides complémentaires et cas d’usage pour dirigeants et équipes du bâtiment.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Besoin d’un cadre terrain avec vos équipes ?
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Formations courtes, ateliers pratiques, certification Qualiopi — financement possible via l’OPCO
            Constructys selon éligibilité.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <RdvLink className="inline-flex items-center justify-center rounded-xl bg-[var(--accent)] px-8 py-4 font-semibold text-white hover:bg-blue-700">
              Prendre un rendez-vous découverte
            </RdvLink>
            <Link
              href="/formations"
              className="inline-flex items-center justify-center rounded-xl border-2 border-[var(--accent)] px-8 py-4 font-semibold text-[var(--accent)] hover:bg-[var(--accent-soft)]"
            >
              Voir les formations
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
