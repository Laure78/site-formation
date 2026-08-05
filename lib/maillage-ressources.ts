/**
 * Maillage interne du cluster /ressources.
 * Source unique des liens montant / latéraux / blog pour tutos et guides.
 *
 * Pages orphelines (hors 1 clic hub guides/tutos/thématique) : aucune à ce jour
 * après ajout de guide-maitrise-oeuvre-ia dans le hub thématique.
 */
import { LINKS } from '@/lib/internal-links';

export type MaillageLink = {
  readonly href: string;
  readonly label: string;
};

export type MaillageRessourceConfig = {
  readonly pilier: MaillageLink;
  /** Pages sœurs du même thème (1–2 affichées ; self filtré). */
  readonly soeurs: readonly MaillageLink[];
  /** Articles blog (thème Appels d’offres uniquement — 1 max affiché). */
  readonly blog?: readonly MaillageLink[];
};

const RETOUR_RESSOURCES: MaillageLink = {
  href: LINKS.ressources,
  label: 'Toutes les ressources IA BTP gratuites',
};

/** Thème Appels d’offres & marchés */
const PILIER_AO: MaillageLink = {
  href: LINKS.formationAO,
  label: 'Formation IA pour répondre aux appels d’offres BTP',
};

/** Thème Chantier / Prévention — même pilier CDT */
const PILIER_CDT: MaillageLink = {
  href: LINKS.formationConducteurTravaux,
  label: 'Formation IA pour conducteurs de travaux BTP',
};

/** Thème Productivité & outils */
const PILIER_CLAUDE: MaillageLink = {
  href: LINKS.formationClaudeAiBtp,
  label: 'Formation Claude AI appliquée au BTP',
};

const TUTO_MEMOIRE: MaillageLink = {
  href: LINKS.tutoMemoireTechnique,
  label: 'Tuto PDF — skill mémoire technique AO',
};
const TUTO_ANALYSE_DCE: MaillageLink = {
  href: LINKS.tutoAnalyseDce,
  label: 'Tuto PDF — analyser un DCE avec l’IA',
};
const TUTO_TRI_DCE: MaillageLink = {
  href: LINKS.tutoTriDceClaudeChrome,
  label: 'Tuto PDF — trier un DCE avec Claude in Chrome',
};
const TUTO_MEMOIRE_RECLAMATION: MaillageLink = {
  href: LINKS.tutoSkillMemoireReclamationBework,
  label: 'Tuto — skill mémoire de réclamation',
};
const TUTO_CR: MaillageLink = {
  href: LINKS.tutoCrChantier,
  label: 'Tuto PDF — compte rendu de chantier',
};
const TUTO_DOE: MaillageLink = {
  href: LINKS.tutoDoeDossierOuvragesExecutes,
  label: 'Tuto PDF — constituer un DOE',
};
const TUTO_DIUO: MaillageLink = {
  href: LINKS.tutoSkillDiuoOfc,
  label: 'Tuto — pièces DIUO pour le SPS',
};
const TUTO_PV: MaillageLink = {
  href: LINKS.tutoPvLeveeReserves,
  label: 'Tuto PDF — PV de levée de réserves',
};
const TUTO_CONSTAT: MaillageLink = {
  href: LINKS.tutoConstatRetard,
  label: 'Tuto PDF — constater un retard de chantier',
};
const TUTO_PPSPS: MaillageLink = {
  href: LINKS.tutoPpsps,
  label: 'Tuto PDF — rédiger un PPSPS avec l’IA',
};
const TUTO_DUERP: MaillageLink = {
  href: LINKS.tutoDuerp,
  label: 'Tuto PDF — mettre à jour le DUERP',
};
const TUTO_DISPATCH: MaillageLink = {
  href: LINKS.tutoDispatchBtp,
  label: 'Tuto PDF — Dispatch BTP (terrain → bureau)',
};

/**
 * Config par chemin canonique (`/ressources/...`).
 * Commentaire routes absentes : aucune sœur de la carte utilisateur manquante
 * (tous les tutos listés existent via app/ressources/[slug]).
 */
export const MAILLAGE_RESSOURCES_BY_PATH: Readonly<Record<string, MaillageRessourceConfig>> = {
  [LINKS.tutoMemoireTechnique]: {
    pilier: PILIER_AO,
    soeurs: [TUTO_ANALYSE_DCE, TUTO_MEMOIRE_RECLAMATION],
    blog: [
      {
        href: LINKS.blogIaMemoireTechniqueAppelOffresGuide2026,
        label: 'Article — répondre aux AO BTP avec l’IA (guide 2026)',
      },
    ],
  },
  [LINKS.tutoAnalyseDce]: {
    pilier: PILIER_AO,
    soeurs: [TUTO_MEMOIRE, TUTO_TRI_DCE],
    blog: [
      {
        href: LINKS.blogIaAnalyseCctpMethode,
        label: 'Article — analyser un CCTP avec l’IA en 20 minutes',
      },
    ],
  },
  [LINKS.tutoTriDceClaudeChrome]: {
    pilier: PILIER_AO,
    soeurs: [TUTO_ANALYSE_DCE, TUTO_MEMOIRE_RECLAMATION],
    blog: [
      {
        href: LINKS.blogIaAnalyseCcap,
        label: 'Article — analyser un CCAP avec l’IA',
      },
    ],
  },
  [LINKS.tutoSkillMemoireReclamationBework]: {
    pilier: PILIER_AO,
    soeurs: [TUTO_MEMOIRE, TUTO_ANALYSE_DCE],
    blog: [
      {
        href: LINKS.blogMemoireReclamationBtpIa,
        label: 'Article — mémoire de réclamation BTP (délais et méthode IA)',
      },
    ],
  },
  [LINKS.tutoCrChantier]: {
    pilier: PILIER_CDT,
    soeurs: [TUTO_DOE, TUTO_PV],
  },
  [LINKS.tutoDoeDossierOuvragesExecutes]: {
    pilier: PILIER_CDT,
    soeurs: [TUTO_DIUO, TUTO_PV],
  },
  [LINKS.tutoSkillDiuoOfc]: {
    pilier: PILIER_CDT,
    soeurs: [TUTO_DOE, TUTO_PPSPS],
  },
  [LINKS.tutoPvLeveeReserves]: {
    pilier: PILIER_CDT,
    soeurs: [TUTO_DOE, TUTO_CONSTAT],
  },
  [LINKS.tutoConstatRetard]: {
    pilier: PILIER_CDT,
    soeurs: [TUTO_CR, TUTO_PV],
  },
  [LINKS.tutoPpsps]: {
    pilier: {
      href: LINKS.formationConducteurTravaux,
      label: 'Formation IA chantier : PPSPS et conduite de travaux',
    },
    soeurs: [TUTO_DIUO, TUTO_DUERP],
  },
  [LINKS.tutoDuerp]: {
    pilier: {
      href: LINKS.formationConducteurTravaux,
      label: 'Formation IA pour la prévention et le suivi chantier BTP',
    },
    soeurs: [TUTO_PPSPS, TUTO_CR],
  },
  [LINKS.tutoDispatchBtp]: {
    pilier: PILIER_CLAUDE,
    soeurs: [
      {
        href: LINKS.guideClaudeBtpOfc,
        label: 'Guide Claude BTP — Projets, Skills et MCP',
      },
      {
        href: LINKS.bibliothequeSkills,
        label: 'Bibliothèque de skills Claude pour le BTP',
      },
    ],
  },
  [LINKS.guideDirigeantBtpOfc]: {
    pilier: {
      href: LINKS.formationIaDirigeantBtp,
      label: 'Formation IA pour dirigeants de PME BTP',
    },
    soeurs: [
      {
        href: LINKS.guideRhBtpIaOfc,
        label: 'Guide RH du BTP × IA — 18 cas d’usage',
      },
      {
        href: LINKS.guideClaudeBtpOfc,
        label: 'Guide pratique Claude pour le BTP',
      },
    ],
  },
  [LINKS.guideRhBtpIaOfc]: {
    pilier: {
      href: LINKS.formationIaResponsableAdministratifBtp,
      label: 'Formation IA responsable administratif BTP',
    },
    soeurs: [
      {
        href: LINKS.guideDirigeantBtpOfc,
        label: 'Guide du dirigeant BTP — 6 leviers IA',
      },
      {
        href: LINKS.guideAssistantsTravauxOfc,
        label: 'Guide des Assistants Travaux — 12 missions',
      },
    ],
  },
  [LINKS.guideChargeAffairesOfc]: {
    pilier: {
      href: LINKS.formationChargeAffairesBtp,
      label: 'Formation IA chargé d’affaires BTP — présentiel IDF',
    },
    soeurs: [
      {
        href: LINKS.guideRepondreAoBtpOfc2026,
        label: 'Répondre AO BTP — méthode en 5 étapes (PDF 2026)',
      },
      {
        href: LINKS.tutoMemoireTechnique,
        label: 'Tuto — skill mémoire technique',
      },
      {
        href: LINKS.tutoAnalyseDce,
        label: 'Tuto — analyse de DCE',
      },
    ],
  },
  [LINKS.guideRepondreAoBtpOfc2026]: {
    pilier: {
      href: LINKS.formationAO,
      label: 'Formation IA appels d’offres BTP — présentiel IDF',
    },
    soeurs: [
      {
        href: LINKS.guideChargeAffairesOfc,
        label: 'Guide chargé d’affaires — 12 cas Claude',
      },
      {
        href: LINKS.tutoAnalyseDce,
        label: 'Tuto — analyse de DCE',
      },
      {
        href: LINKS.tutoMemoireTechnique,
        label: 'Tuto — skill mémoire technique',
      },
    ],
  },
  [LINKS.guideChefDeChantierOfc]: {
    pilier: {
      href: LINKS.formationIaChefChantierTp,
      label: 'Formation IA chef de chantier TP — présentiel IDF',
    },
    soeurs: [
      {
        href: LINKS.guideConducteurTravauxIaBtp,
        label: 'Guide conducteur de travaux — 6 tutos Claude',
      },
      TUTO_CR,
    ],
  },
  [LINKS.guideConducteurTravauxIaBtp]: {
    pilier: {
      href: LINKS.formationConducteurTravaux,
      label: 'Formation IA conducteur de travaux — présentiel IDF',
    },
    soeurs: [
      {
        href: LINKS.guideChefDeChantierOfc,
        label: 'Guide du chef de chantier — 6 skills Claude',
      },
      {
        href: LINKS.guideChargeAffairesOfc,
        label: 'Guide chargé d’affaires — 12 cas Claude',
      },
      TUTO_CR,
    ],
  },
  [LINKS.guideAssistantsTravauxOfc]: {
    pilier: {
      href: LINKS.formationIaAssistanteBtp,
      label: 'Formation IA pour assistantes administratives BTP',
    },
    soeurs: [
      {
        href: LINKS.guideConducteurTravauxIaBtp,
        label: 'Guide conducteur de travaux — 6 tutos Claude',
      },
      {
        href: LINKS.bibliothequePromptsBtpParMetier,
        label: 'Prompts IA BTP par métier (Excel)',
      },
    ],
  },
  [LINKS.guideMaitriseOeuvreIa]: {
    pilier: {
      href: LINKS.formationIaMarchePublicTravaux,
      label: 'Formation IA marchés publics de travaux',
    },
    soeurs: [
      {
        href: LINKS.bibliothequeSkills,
        label: 'Skills Claude — DCE, mémoire, conformité',
      },
      TUTO_MEMOIRE,
    ],
  },
  [LINKS.guideClaudeBtpOfc]: {
    pilier: {
      href: LINKS.formationClaudeAiBtp,
      label: 'Formation Claude AI pour les pros du BTP',
    },
    soeurs: [
      {
        href: LINKS.bibliothequeSkills,
        label: 'Télécharger les skills Claude BTP',
      },
      {
        href: LINKS.guideDirigeantBtpOfc,
        label: 'Guide du dirigeant BTP — 6 leviers',
      },
    ],
  },
  [LINKS.bibliothequePromptsBtpParMetier]: {
    pilier: {
      href: LINKS.formations,
      label: 'Catalogue des formations IA pour le BTP',
    },
    soeurs: [
      {
        href: LINKS.guideDirigeantBtpOfc,
        label: 'Guide du dirigeant BTP (PDF)',
      },
      {
        href: LINKS.guideConducteurTravauxIaBtp,
        label: 'Guide conducteur de travaux (PDF)',
      },
    ],
  },
  [LINKS.bibliothequeSkills]: {
    pilier: {
      href: LINKS.formationAO,
      label: 'Formation catalogue — IA appels d’offres BTP',
    },
    soeurs: [TUTO_ANALYSE_DCE, TUTO_MEMOIRE],
    blog: [
      {
        href: LINKS.blogMemoireReclamationBtpIa,
        label: 'Article — mémoire de réclamation BTP et IA',
      },
    ],
  },
};

export const MAILLAGE_RETOUR_RESSOURCES = RETOUR_RESSOURCES;

export function getMaillageRessourceConfig(path: string): MaillageRessourceConfig | null {
  const normalized = path.replace(/\/$/, '') || '/';
  return MAILLAGE_RESSOURCES_BY_PATH[normalized] ?? null;
}

/** Piliers affichés en tête des rubriques du hub /ressources. */
export const RESSOURCES_HUB_PILIERS: Readonly<
  Record<string, MaillageLink>
> = {
  'marches-et-veille': {
    href: LINKS.formationAO,
    label: 'Découvrir la formation IA appels d’offres BTP',
  },
  'chantier-livrables': {
    href: LINKS.formationConducteurTravaux,
    label: 'Voir la formation IA conducteur de travaux',
  },
  'qse-conformite': {
    href: LINKS.formationConducteurTravaux,
    label: 'Formation IA prévention et conduite de chantier',
  },
  'productivite-outils': {
    href: LINKS.formationClaudeAiBtp,
    label: 'Découvrir la formation Claude AI pour le BTP',
  },
  'cadre-professionnel': {
    href: LINKS.formationIaDirigeantBtp,
    label: 'Formation IA pour dirigeants de PME BTP',
  },
};
