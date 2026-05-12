/**
 * Sections « hub » /ressources : liens guides, tutos PDF et articles blog par thème.
 * Toutes les cibles sont des entrées LINKS ou des listings blog (pas de chemins bruts).
 */
import type { BlogCategoryId } from '@/lib/blog';
import { blogCategoryListingHref } from '@/lib/blog-index-urls';
import { LINKS } from '@/lib/internal-links';

export type RessourceThematicLink = { readonly label: string; readonly href: string };

export type RessourceThematicBlock = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly tutos: readonly RessourceThematicLink[];
  readonly guides: readonly RessourceThematicLink[];
  readonly articles: readonly RessourceThematicLink[];
  /** Liste complète articles blog pour cette thématique */
  readonly blogCategory?: BlogCategoryId;
};

export const RESSOURCES_THEMATIC_BLOCKS: readonly RessourceThematicBlock[] = [
  {
    id: 'marches-et-veille',
    title: 'Appels d’offres & veille marchés',
    description:
      'Mémoires techniques, lecture de DCE, veille automatique — tutos gratuits puis pages formations et méthodes blog.',
    tutos: [
      { label: 'Tuto — skill mémoire technique', href: LINKS.tutoMemoireTechnique },
      { label: 'Tuto — analyse de DCE', href: LINKS.tutoAnalyseDce },
      { label: 'Tuto — tri DCE (Claude in Chrome)', href: LINKS.tutoTriDceClaudeChrome },
    ],
    guides: [
      { label: 'Formation catalogue — Niveau 2 (appels d’offre BTP)', href: LINKS.formationAO },
      { label: 'Landing — analyse CCTP / DCE', href: LINKS.formationIaAnalyseCctp },
      { label: 'Fiche formation — IA CCTP & analyse DCE', href: LINKS.formationIaCctpAnalyseDceBtp },
    ],
    articles: [
      { label: 'Méthode — analyser un CCTP avec l’IA', href: LINKS.blogIaAnalyseCctpMethode },
      { label: 'Article pilier — formation IA CCTP & DCE BTP', href: LINKS.blogFormationIaCctpAnalyseDceBtp },
    ],
    blogCategory: 'appels-offres',
  },
  {
    id: 'chantier-livrables',
    title: 'Chantier, réception & livrables',
    description:
      'Comptes rendus, DOE, PV de levée de réserves, constats — contenus téléchargeables et pages métiers associées.',
    tutos: [
      { label: 'Tuto — compte rendu de chantier', href: LINKS.tutoCrChantier },
      { label: 'Tuto — dossier DOE', href: LINKS.tutoDoeDossierOuvragesExecutes },
      { label: 'Tuto — PV levée de réserves', href: LINKS.tutoPvLeveeReserves },
      { label: 'Tuto — constat de retard', href: LINKS.tutoConstatRetard },
    ],
    guides: [
      { label: '10 cas d’usage IA BTP (ressource synthèse)', href: LINKS.casUsage },
      { label: 'Landing — IA conducteur de travaux', href: LINKS.formationConducteurTravaux },
      { label: 'PDF gratuit — pack conducteur de travaux (6 tutos)', href: LINKS.pdfPackConducteurTravauxOfc },
    ],
    articles: [
      { label: 'Guide skill IA — conducteur de travaux (article)', href: LINKS.blogGuideSkillIaConducteurTravaux },
    ],
    blogCategory: 'metiers',
  },
  {
    id: 'qse-conformite',
    title: 'Prévention, santé au travail & conformité',
    description: 'Plans de prévention et DUERP : pas à pas PDF alignés métiers BTP.',
    tutos: [
      { label: 'Tuto — skill PPSPS', href: LINKS.tutoPpsps },
      { label: 'Tuto — DUERP', href: LINKS.tutoDuerp },
    ],
    guides: [{ label: 'Checklist prompts IA BTP (chantier)', href: LINKS.checklist }],
    articles: [],
    blogCategory: 'metiers',
  },
  {
    id: 'productivite-outils',
    title: 'Productivité & outils',
    description: 'Automatisation terrain-bureau (Dispatch), aide-mémoire et cluster Claude IA pour le BTP.',
    tutos: [{ label: 'Tuto — Dispatch BTP (Anthropic)', href: LINKS.tutoDispatchBtp }],
    guides: [
      { label: 'Comparatif et usages — outils IA BTP', href: LINKS.outilsIaBtp },
      { label: 'Lead magnet — pack 3 skills Claude (texte)', href: LINKS.downloadClaudeSkillsBtp },
      { label: 'Formation SEO — Claude AI BTP', href: LINKS.formationClaudeAiBtp },
      { label: 'Formation SEO — Claude AI bâtiment', href: LINKS.formationClaudeAiBatiment },
      { label: 'Formation SEO — Claude AI travaux publics', href: LINKS.formationClaudeAiTravauxPublics },
    ],
    articles: [],
    blogCategory: 'chatgpt',
  },
  {
    id: 'cadre-professionnel',
    title: 'Cadre Qualiopi, diagnostic & stratégie',
    description:
      'Se préparer avant les tutos : page pilier formation IA BTP, diagnostic offert et landing tutoriel Skill IA conducteur.',
    tutos: [],
    guides: [
      { label: 'Page pilier SEO — formation IA BTP', href: LINKS.formationIaBtp },
      { label: 'Diagnostic IA BTP (gratuit)', href: LINKS.diagnostic },
      { label: 'Tutoriel landing — Skill IA conducteur', href: LINKS.guideSkillIaConducteurTravaux },
    ],
    articles: [{ label: 'Guide — formation IA BTP (article long)', href: LINKS.blogFormationIaBtpGuide2026 }],
    blogCategory: 'financement',
  },
];

/** Libellé court pour lien « tous les articles » */
export function ressourcesBlogCategoryCta(category: BlogCategoryId): string {
  const labels: Record<BlogCategoryId, string> = {
    'appels-offres': 'Tous les articles — appels d’offres',
    devis: 'Tous les articles — devis & chiffrage',
    financement: 'Tous les articles — financement & OPCO',
    chatgpt: 'Tous les articles — bonnes pratiques & prompts',
    metiers: 'Tous les articles — IA par métier',
    rh: 'Tous les articles — RH & recrutement',
    productivite: 'Tous les articles — emails & productivité',
  };
  return labels[category];
}

export function ressourcesBlogCategoryHref(category: BlogCategoryId): string {
  return blogCategoryListingHref(category, 1);
}
