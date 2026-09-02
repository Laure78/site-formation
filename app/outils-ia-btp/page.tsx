import Link from 'next/link';
import { ArrowRight, BookOpen, Scale, Shield } from 'lucide-react';
import { RdvLink } from '@/components/RdvLink';
import { LINKS } from '@/lib/internal-links';
import { createPageMetadata } from '@/lib/seo';
import { OFC_CARD } from '@/lib/ofc-interaction-classes';

export const revalidate = 3600;
const PATH = '/outils-ia-btp';

export const metadata = createPageMetadata({
  title: 'Outils IA BTP — Claude AI et ChatGPT',
  description:
    'Claude AI (outil principal) et ChatGPT (usages admin) pour les pros du BTP : articles, tutoriels et bonnes pratiques. OFC, Qualiopi.',
  path: PATH,
  keywords: [
    'outils IA BTP Claude ChatGPT',
    'comparatif Claude ChatGPT BTP',
    'Claude AI BTP',
    'ChatGPT PME BTP',
    'formation IA pour le BTP',
  ],
});

const ARTICLES_OUTILS = [
  {
    titre: 'Sélecteur IA par métier BTP (conducteur, chargé d\'affaires, dirigeant)',
    href: LINKS.casUsageIaMetierBtp,
    badge: 'Outil interactif',
    linkLabel: 'Ouvrir l’outil',
  },
  {
    titre: 'ChatGPT vs Claude : lequel choisir quand on est dans le BTP ?',
    href: LINKS.blogComparatifChatgptClaudeGeminiBtp,
    badge: 'Comparatif',
  },
  {
    titre: 'Claude AI pour le BTP : les 5 interfaces expliquées et comment choisir la bonne',
    href: '/blog/claude-ai-btp-5-interfaces-chat-cowork-code',
    badge: 'Claude — Chat, Cowork, Code…',
  },
  {
    titre: 'ChatGPT pour PME BTP : 10 prompts prêts à l’emploi par corps de métier',
    href: '/blog/chatgpt-prompts-artisans-btp',
    badge: 'Prompts',
  },
  {
    titre: 'Comment protéger les données de votre entreprise BTP quand vous utilisez l’IA',
    href: '/blog/confidentialite-donnees-ia-btp',
    badge: 'Confidentialité',
  },
  {
    titre: 'Sécurité données ChatGPT en entreprise BTP : bonnes pratiques',
    href: '/blog/securite-donnees-chatgpt-btp',
    badge: 'ChatGPT & RGPD',
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
    titre: "5 cas d'usage de ChatGPT pour les entreprises du bâtiment",
    href: LINKS.blog5CasUsageChatgptBtp,
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
      <section className="border-b border-slate-200 bg-gradient-to-br from-[var(--accent)] to-blue-800 px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h1 className="font-display text-4xl font-bold text-white md:text-5xl">
            Outils IA pour le BTP : Claude AI et ChatGPT
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-blue-50">
            En formation, <strong className="font-semibold text-white">Claude AI</strong> est l&apos;outil principal
            (niveaux 1 et 2) ; <strong className="font-semibold text-white">ChatGPT</strong> est cité en comparaison et
            pour les usages administratifs (niveau 1). Devis, courriers, mémoires techniques — méthode testée avec
            Organisme certifié Qualiopi. Page dédiée{' '}
            <Link href="/claude-ai-btp" className="font-semibold text-white underline decoration-white/80 hover:no-underline">
              Claude AI BTP
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Comparatif rapide (indicatif)
          </h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            Orientation rapide pour équipes terrain et bureau. Tarifs et fonctions évoluent — vérifiez les pages
            officielles. <strong>Mise à jour : août 2026</strong> (révision trimestrielle).
          </p>

          <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full min-w-[520px] border-collapse text-left text-sm">
              <caption className="sr-only">
                Comparatif indicatif Claude AI et ChatGPT pour usage professionnel BTP
              </caption>
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
                    Critère
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
                    Claude AI (Anthropic) — outil principal
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
                    ChatGPT (OpenAI) — admin &amp; comparaison
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                <tr>
                  <th scope="row" className="px-4 py-3 font-medium text-slate-900">
                    Rôle en formation OFC
                  </th>
                  <td className="px-4 py-3">Niveaux 1 et 2 — documents longs, DCE, mémoire, skills</td>
                  <td className="px-4 py-3">Niveau 1 — emails, relances, trames admin, comparaison</td>
                </tr>
                <tr>
                  <th scope="row" className="px-4 py-3 font-medium text-slate-900">
                    Entrée de gamme
                  </th>
                  <td className="px-4 py-3">Gratuit avec plafonds ; bon pour textes longs</td>
                  <td className="px-4 py-3">Compte gratuit avec limites ; usage courant pour tests</td>
                </tr>
                <tr>
                  <th scope="row" className="px-4 py-3 font-medium text-slate-900">
                    Offre pro (ordre de grandeur)
                  </th>
                  <td className="px-4 py-3">Pro / équipe selon offre Anthropic</td>
                  <td className="px-4 py-3">Abonnement individuel ou équipe (tarif public variable)</td>
                </tr>
                <tr>
                  <th scope="row" className="px-4 py-3 font-medium text-slate-900">
                    Atouts fréquents en BTP
                  </th>
                  <td className="px-4 py-3">Fichiers longs, ton posé, brouillons de mémoires, Cowork &amp; Skills</td>
                  <td className="px-4 py-3">Écosystème large, usage généraliste, rédaction admin rapide</td>
                </tr>
                <tr>
                  <th scope="row" className="px-4 py-3 font-medium text-slate-900">
                    Données &amp; conformité
                  </th>
                  <td className="px-4 py-3" colSpan={2}>
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
            Articles pour passer à l&apos;action : devis, chantier, réponses marchés.
          </p>

          <ul className="mt-10 space-y-4">
            {ARTICLES_OUTILS.map((article) => (
              <li key={article.href}>
                <Link
                  href={article.href}
                  className={`${OFC_CARD} group flex flex-col gap-2 p-6 sm:flex-row sm:items-center sm:justify-between`}
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
                    {'linkLabel' in article ? article.linkLabel : 'Lire l’article'}
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
                  Plafonds OPCO et montage dossier — cadre Qualiopi.
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
                  Guides et cas d&apos;usage pour dirigeants et équipes BTP.
                </p>
              </div>
            </Link>
          </div>

          <p className="mt-10 text-center text-xs text-slate-400">
            <Link
              href={LINKS.verificationDtuBeworkTest}
              className="underline decoration-slate-300 underline-offset-2 hover:text-[var(--accent)]"
            >
              Prototype interne — rapprochement DTU × devis (non référencé)
            </Link>
          </p>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Former vos équipes sur le terrain
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Sessions courtes, ateliers pratiques Qualiopi — financement Constructys selon éligibilité.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <RdvLink className="inline-flex items-center justify-center rounded-xl bg-[var(--accent)] px-8 py-4 font-semibold text-white hover:bg-blue-700" />
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
