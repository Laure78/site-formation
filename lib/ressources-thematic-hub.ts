/**
 * Sections « hub » /ressources : liens guides, tutos PDF et articles blog par thème.
 * Toutes les cibles sont des entrées LINKS ou des listings blog (pas de chemins bruts).
 */
import type { BlogCategoryId } from '@/lib/blog';
import { blogCategoryListingHref } from '@/lib/blog-index-urls';
import { LINKS } from '@/lib/internal-links';
import { BEWORK_APP_PATHS } from '@/lib/external-site-urls';
import { RESSOURCES_HUB_PILIERS } from '@/lib/maillage-ressources';

export type RessourceThematicLink = { readonly label: string; readonly href: string };

export type RessourceThematicBlock = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  /** Lien montant vers le pilier formation du thème. */
  readonly pilier: RessourceThematicLink;
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
      'Priorité marchés publics et privés : DCE, CCAP, mémoire technique et veille — tutos gratuits, fiche catalogue NIV-02 et méthodes blog pour PME BTP en Île-de-France.',
    pilier: RESSOURCES_HUB_PILIERS['marches-et-veille'],
    tutos: [
      { label: 'Lexique BTP — parcours « Décrypter le DCE »', href: BEWORK_APP_PATHS.lexique },
      { label: 'Tuto PDF — skill Analyse CCAP', href: LINKS.pdfTutoSkillAnalyseCcap },
      { label: 'Tuto — skill mémoire technique', href: LINKS.tutoMemoireTechnique },
      { label: 'Tuto — skill mémoire de réclamation', href: LINKS.tutoSkillMemoireReclamationBework },
      { label: 'Tuto — analyse de DCE', href: LINKS.tutoAnalyseDce },
      { label: 'Tuto — tri DCE (Claude in Chrome)', href: LINKS.tutoTriDceClaudeChrome },
    ],
    guides: [
      {
        label: 'Répondre AO BTP — méthode en 5 étapes (PDF 2026)',
        href: LINKS.guideRepondreAoBtpOfc2026,
      },
      {
        label: 'Guide chargé d’affaires BTP × IA — 12 cas Claude (PDF)',
        href: LINKS.guideChargeAffairesOfc,
      },
      { label: 'Bibliothèque skills — analyse DCE, mémoire, conformité (.skill / .md)', href: LINKS.bibliothequeSkills },
      { label: 'Fiche formation — IA appels d’offres BTP (NIV-02)', href: LINKS.formationAO },
    ],
    articles: [
      { label: 'Guide — répondre aux AO BTP avec l’IA (5 étapes)', href: LINKS.blogIaMemoireTechniqueAppelOffresGuide2026 },
      { label: 'Mémoire de réclamation BTP — délais et méthode IA', href: LINKS.blogMemoireReclamationBtpIa },
      { label: 'Méthode — analyser un CCAP avec l’IA', href: LINKS.blogIaAnalyseCcap },
      { label: 'Méthode — analyser un CCTP avec l’IA', href: LINKS.blogIaAnalyseCctpMethode },
      { label: 'Article pilier — formation IA CCTP & DCE BTP', href: LINKS.blogFormationIaCctpAnalyseDceBtp },
    ],
    blogCategory: 'appels-offres',
  },
  {
    id: 'chantier-livrables',
    title: 'Chantier, réception & livrables',
    description:
      'Comptes rendus, DOE, DIUO (pièces SPS), PV de levée de réserves, constats — contenus téléchargeables et pages métiers associées.',
    pilier: RESSOURCES_HUB_PILIERS['chantier-livrables'],
    tutos: [
      { label: 'Lexique BTP — parcours « Sur le chantier au quotidien »', href: BEWORK_APP_PATHS.lexique },
      { label: 'Tuto — compte rendu de chantier', href: LINKS.tutoCrChantier },
      { label: 'Tuto — dossier DOE', href: LINKS.tutoDoeDossierOuvragesExecutes },
      { label: 'Tuto — pièces DIUO pour le SPS', href: LINKS.tutoSkillDiuoOfc },
      { label: 'Tuto — PV levée de réserves', href: LINKS.tutoPvLeveeReserves },
      { label: 'Tuto — constat de retard', href: LINKS.tutoConstatRetard },
    ],
    guides: [
      { label: 'Guide du chef de chantier — 6 skills Claude (PDF)', href: LINKS.guideChefDeChantierOfc },
      { label: 'Bibliothèque prompts IA BTP par métier (Excel)', href: LINKS.bibliothequePromptsBtpParMetier },
      { label: 'Guide — Assistants Travaux (12 missions marché)', href: LINKS.guideAssistantsTravauxOfc },
      { label: 'Guide — 6 outils IA pour conducteur de travaux', href: LINKS.guideConducteurTravauxIaBtp },
      { label: "Guide Maître d'Œuvre × IA (12 missions)", href: LINKS.guideMaitriseOeuvreIa },
      { label: 'Bibliothèque skills — CR, DOE, réserves (.skill / .md)', href: LINKS.bibliothequeSkills },
      { label: '10 cas d’usage IA BTP (ressource synthèse)', href: LINKS.casUsage },
      { label: 'PDF gratuit — guide conducteur de travaux (6 tutos)', href: LINKS.pdfPackConducteurTravauxOfc },
    ],
    articles: [
      { label: 'Mémoire de réclamation BTP — délais et méthode IA', href: LINKS.blogMemoireReclamationBtpIa },
      { label: 'Guide skill IA — conducteur de travaux (article)', href: LINKS.blogGuideSkillIaConducteurTravaux },
    ],
    blogCategory: 'metiers',
  },
  {
    id: 'qse-conformite',
    title: 'Prévention, santé au travail & conformité',
    description: 'Plans de prévention et DUERP : pas à pas PDF alignés métiers BTP.',
    pilier: RESSOURCES_HUB_PILIERS['qse-conformite'],
    tutos: [
      { label: 'Tuto — skill PPSPS', href: LINKS.tutoPpsps },
      { label: 'Tuto — DUERP', href: LINKS.tutoDuerp },
      {
        label: "Tuto — skill livret d'intégration",
        href: LINKS.tutoSkillLivretIntegrationOfc,
      },
    ],
    guides: [
      { label: 'Guide RH BTP × IA (PDF)', href: LINKS.guideRhBtpIaOfc },
      { label: 'Checklist prompts IA BTP (chantier)', href: LINKS.checklist },
    ],
    articles: [],
    blogCategory: 'metiers',
  },
  {
    id: 'productivite-outils',
    title: 'Productivité & outils',
    description: 'Automatisation terrain-bureau (Dispatch), aide-mémoire et cluster Claude IA pour le BTP.',
    pilier: RESSOURCES_HUB_PILIERS['productivite-outils'],
    tutos: [{ label: 'Tuto — Dispatch BTP (Anthropic)', href: LINKS.tutoDispatchBtp }],
    guides: [
      { label: 'Guide Claude BTP — Projets, Skills, MCP (PDF)', href: LINKS.guideClaudeBtpOfc },
      { label: 'Bibliothèque skills Claude BTP — 21 téléchargements', href: LINKS.bibliothequeSkills },
      { label: 'Comparatif et usages — outils IA BTP', href: LINKS.outilsIaBtp },
      { label: 'Lead magnet — pack 3 skills Claude (texte)', href: LINKS.downloadClaudeSkillsBtp },
      { label: 'Formation — Maîtriser Claude AI pour le BTP', href: LINKS.formationMaitriserClaudeAiBtp },
    ],
    articles: [
      {
        label: 'Blog — cours gratuits Anthropic Academy (Claude AI, CDT & PME BTP)',
        href: LINKS.blogCoursGratuitsClaudeAiPmeBtp,
      },
    ],
    blogCategory: 'chatgpt',
  },
  {
    id: 'cadre-professionnel',
    title: 'Cadre Qualiopi, diagnostic & stratégie',
    description:
      'Se préparer avant les tutos : catalogue formations IA BTP, diagnostic offert et landing tutoriel Skill IA conducteur.',
    pilier: RESSOURCES_HUB_PILIERS['cadre-professionnel'],
    tutos: [],
    guides: [
      { label: 'Guide du dirigeant BTP — 6 leviers + 24 prompts (PDF)', href: LINKS.guideDirigeantBtpOfc },
      { label: 'Guide RH du BTP × IA — 18 cas d’usage (PDF)', href: LINKS.guideRhBtpIaOfc },
      { label: 'Catalogue des formations IA pour le BTP', href: LINKS.formations },
      { label: 'Diagnostic IA BTP (gratuit)', href: LINKS.diagnostic },
      { label: 'Tutoriel landing — Skill IA conducteur', href: LINKS.guideSkillIaConducteurTravaux },
    ],
    articles: [{ label: 'Guide — formation IA pour le BTP (article long)', href: LINKS.blogFormationIaBtpGuide2026 }],
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
