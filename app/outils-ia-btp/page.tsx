import Link from 'next/link';
import { ArrowRight, BookOpen, Scale, Shield } from 'lucide-react';
import { RdvLink } from '@/components/RdvLink';
import { EnBref } from '@/app/components/EnBref';
import { IaOutilCasMetierCard } from '@/components/outils-ia/IaOutilCasMetierCard';
import { LINKS } from '@/lib/internal-links';
import {
  IA_OUTILS_BTP_CAS_METIER,
  IA_OUTILS_BTP_CATALOGUE,
  IA_OUTILS_FORMATION_OFC_COPY,
} from '@/lib/ia-outils-btp-selection';
import { createPageMetadata } from '@/lib/seo';
import { OFC_CARD, OFC_LINK } from '@/lib/ofc-interaction-classes';

export const revalidate = 3600;
const PATH = '/outils-ia-btp';

export const metadata = createPageMetadata({
  title: 'Outils IA BTP — ChatGPT, Claude et sélection',
  description:
    'Sélection d’outils d’IA pour le BTP : ChatGPT (OpenAI), Claude (Anthropic), usages devis, DCE et chantier. Formations Qualiopi en présentiel Île-de-France.',
  descriptionFinal: true,
  path: PATH,
  keywords: [
    'outils IA BTP',
    'formation ChatGPT BTP',
    'formation Claude BTP',
    'intelligence artificielle entreprises du bâtiment',
    'analyser CCTP avec l’IA',
  ],
});

const EN_BREF =
  'Pour une entreprise du bâtiment ou des travaux publics, ChatGPT (OpenAI) et Claude (Anthropic) aident sur devis, DCE (dont CCTP), mémoires techniques et comptes rendus — avec relecture métier obligatoire. D’autres assistants (Gemini, Copilot, Perplexity, Le Chat de Mistral AI) peuvent compléter une veille ou la bureautique ; ils ne sont pas enseignés au catalogue OFC.';

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
    titre: 'Claude AI pour le BTP : guide interfaces et usages',
    href: LINKS.claudeAiBtp,
    badge: 'Guide Claude',
  },
  {
    titre: 'Sécurité données ChatGPT en entreprise BTP : bonnes pratiques',
    href: LINKS.blogSecuriteDonneesChatgptBtp,
    badge: 'ChatGPT & RGPD',
  },
  {
    titre: "5 cas d'usage de ChatGPT pour les entreprises du bâtiment",
    href: LINKS.blog5CasUsageChatgptBtp,
    badge: 'Cas d’usage',
  },
  {
    titre: 'Comment l’IA fait gagner 5 h aux conducteurs de travaux',
    href: LINKS.blogCommentIaGagne5hConducteursTravaux,
    badge: 'Chantier',
  },
] as const;

export default function OutilsIABTPPage() {
  return (
    <div>
      <section className="border-b border-slate-200 bg-gradient-to-br from-[var(--accent)] to-blue-800 px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h1 className="font-display text-2xl font-bold text-white md:text-2xl">
            Une sélection d&apos;outils d&apos;IA pour les professionnels du BTP
          </h1>
          <EnBref className="mt-6 max-w-3xl border-white/20 bg-white/95">
            <p>{EN_BREF}</p>
          </EnBref>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-blue-50">
            {IA_OUTILS_FORMATION_OFC_COPY}{' '}
            <Link href={LINKS.claudeAiBtp} className="font-semibold text-white underline decoration-white/80 hover:no-underline">
              Guide Claude AI BTP
            </Link>{' '}
            ·{' '}
            <Link href={LINKS.formationChatgptBtp} className="font-semibold text-white underline decoration-white/80 hover:no-underline">
              Formation ChatGPT BTP
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-2xl">
            Outil, éditeur, usage BTP et ressource
          </h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            Tableau indicatif — octobre 2026. Colonne « Formation » : programmes Qualiopi où l&apos;outil est
            pratiqué en session.
          </p>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <caption className="sr-only">
                Sélection d&apos;outils d&apos;IA pour le BTP — éditeur, usage, limites, ressource
              </caption>
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
                    Outil
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
                    Éditeur
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
                    Exemple d&apos;usage BTP
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
                    Conditions ou limites
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
                    Ressource / formation
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                {IA_OUTILS_BTP_CATALOGUE.map((row) => (
                  <tr key={row.id}>
                    <th scope="row" className="px-4 py-3 font-medium text-slate-900">
                      <a href={row.editorDocUrl} className={OFC_LINK} target="_blank" rel="noopener noreferrer">
                        {row.tool}
                      </a>
                    </th>
                    <td className="px-4 py-3">{row.editor}</td>
                    <td className="px-4 py-3">{row.usageBtp}</td>
                    <td className="px-4 py-3">{row.limits}</td>
                    <td className="px-4 py-3">
                      <Link href={row.resourceHref} className={OFC_LINK}>
                        {row.resourceLabel}
                      </Link>
                      {row.taughtInFormation && row.formationHref && row.formationLabel ? (
                        <span className="mt-1 block text-xs text-slate-500">
                          En formation :{' '}
                          <Link href={row.formationHref} className={OFC_LINK}>
                            {row.formationLabel}
                          </Link>
                        </span>
                      ) : (
                        <span className="mt-1 block text-xs text-slate-500">Hors programme catalogue</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-[#F8FAFC] px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-2xl">
            Méthodes par tâche (exemples)
          </h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            Cas pédagogiques — à adapter à vos modèles internes. L&apos;IA prépare ; le professionnel valide.
          </p>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {IA_OUTILS_BTP_CAS_METIER.map((cas) => (
              <IaOutilCasMetierCard key={cas.id} cas={cas} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-2xl">
            Comparatif rapide ChatGPT vs Claude pour le BTP
          </h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            Orientation selon le contexte métier — pas de classement absolu. Tarifs et fonctions évoluent : vérifiez
            les pages officielles. <strong>Mise à jour : octobre 2026</strong> (révision trimestrielle).
          </p>

          <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <caption className="sr-only">
                Comparatif indicatif Claude AI et ChatGPT pour usage professionnel BTP
              </caption>
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
                    Critère
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
                    Claude AI (Anthropic)
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
                    ChatGPT (OpenAI)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                <tr>
                  <th scope="row" className="px-4 py-3 font-medium text-slate-900">
                    Analyse de documents (DCE, CCTP)
                  </th>
                  <td className="px-4 py-3">Souvent à l’aise sur dossiers longs et multi-fichiers</td>
                  <td className="px-4 py-3">Utile sur extraits ; attention aux limites de contexte</td>
                </tr>
                <tr>
                  <th scope="row" className="px-4 py-3 font-medium text-slate-900">
                    Rédaction (CR, emails, trames)
                  </th>
                  <td className="px-4 py-3">Ton posé, reformulation précision</td>
                  <td className="px-4 py-3">Rapide pour admin et dictée mobile</td>
                </tr>
                <tr>
                  <th scope="row" className="px-4 py-3 font-medium text-slate-900">
                    Mémoire technique / AO
                  </th>
                  <td className="px-4 py-3">Brouillons et plans alignés RC — validation métier</td>
                  <td className="px-4 py-3">Possible sur sections courtes — même validation</td>
                </tr>
                <tr>
                  <th scope="row" className="px-4 py-3 font-medium text-slate-900">
                    Intégrations / workflows
                  </th>
                  <td className="px-4 py-3">Projects, Skills, Cowork (selon offre)</td>
                  <td className="px-4 py-3">Écosystème large, apps et assistants</td>
                </tr>
                <tr>
                  <th scope="row" className="px-4 py-3 font-medium text-slate-900">
                    Confidentialité entreprise
                  </th>
                  <td className="px-4 py-3" colSpan={2}>
                    Paramètres compte, offres pro/entreprise et DPA à valider selon votre politique. Voir{' '}
                    <Link href={LINKS.blogSecuriteDonneesChatgptBtp} className={OFC_LINK}>
                      sécurité des données ChatGPT en BTP
                    </Link>
                    . Ne déposez pas un DCE sensible sans cadre adapté.
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="px-4 py-3 font-medium text-slate-900">
                    Rôle en formation OFC
                  </th>
                  <td className="px-4 py-3">Outil principal — niveaux 1 et 2</td>
                  <td className="px-4 py-3">Comparaison et usages admin (niveau 1)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Les productions générées par l&apos;IA doivent être contrôlées avant utilisation. Pour le détail
            méthodologique :{' '}
            <Link href={LINKS.blogComparatifChatgptClaudeGeminiBtp} className={OFC_LINK}>
              comparatif ChatGPT vs Claude vs Gemini pour le BTP
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-[#F2F2F2] px-4 py-12" aria-labelledby="sources-outils">
        <div className="mx-auto max-w-5xl">
          <h2 id="sources-outils" className="font-display text-2xl font-bold text-slate-900">
            Sources
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-base text-slate-600">
            <li>
              <a href="https://www.anthropic.com/claude" className={OFC_LINK} target="_blank" rel="noopener noreferrer">
                Anthropic — Claude
              </a>
            </li>
            <li>
              <a href="https://openai.com/chatgpt" className={OFC_LINK} target="_blank" rel="noopener noreferrer">
                OpenAI — ChatGPT
              </a>
            </li>
            <li>
              <a href="https://gemini.google/" className={OFC_LINK} target="_blank" rel="noopener noreferrer">
                Google — Gemini
              </a>
            </li>
            <li>
              <a
                href="https://www.microsoft.com/fr-fr/copilot"
                className={OFC_LINK} target="_blank" rel="noopener noreferrer"
              >
                Microsoft — Copilot
              </a>
            </li>
            <li>
              <a href="https://www.perplexity.ai/" className={OFC_LINK} target="_blank" rel="noopener noreferrer">
                Perplexity AI
              </a>
            </li>
            <li>
              <a href="https://mistral.ai/" className={OFC_LINK} target="_blank" rel="noopener noreferrer">
                Mistral AI — Le Chat
              </a>
            </li>
            <li>
              <a
                href="https://www.cnil.fr/fr/intelligence-artificielle"
                className={OFC_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                CNIL — Intelligence artificielle
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center gap-3">
            <BookOpen className="text-[var(--accent)]" size={28} strokeWidth={1.5} aria-hidden />
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-2xl">
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
              href={LINKS.blogFinancerFormationIaBtpConstructys}
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
              href={LINKS.ressourcesIaBtp}
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
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-2xl">
            Former vos équipes sur le terrain
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Sessions courtes, ateliers pratiques Qualiopi — financement OPCO possible selon éligibilité.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <RdvLink className="inline-flex items-center justify-center rounded-xl bg-[var(--accent)] px-8 py-4 font-semibold text-white hover:bg-blue-700" />
            <Link
              href={LINKS.formationIaBtp}
              className="inline-flex items-center justify-center rounded-xl border-2 border-[var(--accent)] px-8 py-4 font-semibold text-[var(--accent)] hover:bg-[var(--accent-soft)]"
            >
              Formation IA pour le BTP
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
