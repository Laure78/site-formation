/**
 * Cluster SEO appels d'offres — pilier transactionnel + articles informationnels.
 * @see docs/seo/netlinking-audit-2026-04-10.md
 */
import { LINKS } from '@/lib/internal-links';
import type { ContextualLinkCard } from '@/lib/contextual-internal-links';

/** Page pilier NIV-02 — cible transactionnelle (formation catalogue). */
export const AO_DCE_PILAR = LINKS.formationAO;

/** Articles satellites — angles informationnels distincts. */
export const AO_DCE_CLUSTER_BLOG = {
  guideAo5Etapes: LINKS.blogIaMemoireTechniqueAppelOffresGuide2026,
  guideDce: LINKS.blogFormationIaCctpAnalyseDceBtp,
  methodeCcap: LINKS.blogIaAnalyseCcap,
  memoireReclamation: LINKS.blogMemoireReclamationBtpIa,
  methode20: LINKS.blogAnalyserCctpMethode20Min,
  notebooklm: LINKS.blogAnalyseDceNotebooklm,
  chiffrageBpu: LINKS.blogChiffrageCctpBpu,
} as const;

/** Maillage descendant — section « Pour aller plus loin » sur la page pilier. */
export const FORMATION_AO_CLUSTER_ARTICLES: ContextualLinkCard[] = [
  {
    href: AO_DCE_CLUSTER_BLOG.guideAo5Etapes,
    title: 'Répondre aux AO BTP avec l’IA — guide en 5 étapes',
    description: 'DCE, Go/No Go, DPGF, mémoire technique : méthode complète testée FFB & CSFE.',
  },
  {
    href: AO_DCE_CLUSTER_BLOG.methodeCcap,
    title: 'Analyser un CCAP avec l’IA',
    description: 'Pénalités, retenue de garantie, dérogations CCAG — fiche Go / No Go en 15 min.',
  },
  {
    href: AO_DCE_CLUSTER_BLOG.memoireReclamation,
    title: 'Mémoire de réclamation BTP',
    description: 'Délai 30 jours, contenu recevable et méthode IA pour récupérer vos créances.',
  },
  {
    href: AO_DCE_CLUSTER_BLOG.methode20,
    title: 'Méthode CCTP en 20 minutes',
    description: 'Cinq étapes, prompts prêts à l’emploi et croisement BPU.',
  },
  {
    href: AO_DCE_CLUSTER_BLOG.notebooklm,
    title: 'Analyse DCE avec NotebookLM et Claude',
    description: 'Critères, CCAP et synthèse sur PDF volumineux.',
  },
  {
    href: AO_DCE_CLUSTER_BLOG.chiffrageBpu,
    title: 'Chiffrage CCTP → BPU avec l’IA',
    description: 'Extraction ouvrages, ratios et contrôle de cohérence prix.',
  },
];

type ClusterMaillageOptions = {
  lateralHref: string;
  lateralTitle: string;
  lateralDescription: string;
};

/** Bloc HTML — lien montant pilier + lien latéral cluster (articles blog). */
export function clusterMaillageHtmlSection({
  lateralHref,
  lateralTitle,
  lateralDescription,
}: ClusterMaillageOptions): string {
  return `<section class="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700">
<p><strong>Aller plus loin en formation :</strong> pour ancrer DCE, mémoire technique et méthode en session certifiée Qualiopi, voir la <a href="${AO_DCE_PILAR}" class="font-medium text-[var(--accent)] underline hover:no-underline">formation IA appels d'offres BTP</a> (NIV-02, financement possible selon éligibilité Constructys).</p>
<p class="mt-3"><strong>À lire aussi :</strong> <a href="${lateralHref}" class="font-medium text-[var(--accent)] underline hover:no-underline">${lateralTitle}</a> — ${lateralDescription}.</p>
</section>`;
}
