/**
 * Page catalogue `/formations` — données UX (source `data/formations.ts` + tarifs).
 */
import {
  getFormationsCatalogue,
  type FormationCatalogueEntry,
} from '@/lib/formations-catalogue-display';
import {
  formatNoteSatisfactionAffichageComplet,
  formatPeriodeReferenceAffichage,
} from '@/lib/data/indicateurs-resultats';
import { CATALOGUE_ALL_OFFERS, type CatalogueOffer } from '@/lib/formations-catalogue-architecture';
import { FINANCEMENT_FORMULATION_CATALOGUE } from '@/lib/financement-copy';

/** Codes hors offre catalogue publique (remplacés par NIV-10 — création avec l’IA). */
export const CATALOGUE_APP_METIER_REFS = ['NIV-06', 'NIV-07', 'NIV-08'] as const;

/** Libellés courts — alignés sur le menu Formations. */
export const CATALOGUE_MENU_LABELS: Record<string, string> = {
  'NIV-01': "Les bases de l'IA",
  'NIV-02': "IA et appels d'offres",
  'NIV-03': 'IA et conduite de travaux',
  'NIV-04': 'Maîtriser Claude AI',
  'NIV-05': "IA et maîtrise d'œuvre",
  'NIV-09': 'Assistants IA personnalisés',
  'NIV-10': 'Développement web avec l’IA',
};

/** Ordre d’affichage catalogue public (hors apps métier N1–N3). */
export const CATALOGUE_PUBLIC_REFS = [
  'NIV-01',
  'NIV-02',
  'NIV-03',
  'NIV-04',
  'NIV-05',
  'NIV-09',
  'NIV-10',
] as const;

/** Formations catalogue publiques (NIV-01…05 + NIV-09) — sans applications métier. */
export function getCataloguePageCoreFormations(
  at: Date = new Date(),
): FormationCatalogueEntry[] {
  const byRef = new Map(getFormationsCatalogue(at).map((f) => [f.ref, f]));
  return CATALOGUE_PUBLIC_REFS.map((ref) => byRef.get(ref)).filter(
    (f): f is FormationCatalogueEntry => Boolean(f),
  );
}

export type CatalogueBesoinId =
  | 'decouvrir'
  | 'devis-documents'
  | 'appels-offres'
  | 'chantier'
  | 'maitrise-oeuvre'
  | 'deployer'
  | 'assistants';

export type CatalogueBesoinOption = {
  id: CatalogueBesoinId;
  label: string;
  description: string;
  /** Réfs catalogue mises en évidence (OU). */
  targetRefs: readonly string[];
};

export const CATALOGUE_BESOIN_OPTIONS: readonly CatalogueBesoinOption[] = [
  {
    id: 'decouvrir',
    label: 'Découvrir l’IA',
    description: 'Fondamentaux IA BTP — premiers usages sur vos documents',
    targetRefs: ['NIV-01'],
  },
  {
    id: 'devis-documents',
    label: 'Gagner du temps sur les devis et documents',
    description: 'Devis, emails, comptes rendus et production documentaire',
    targetRefs: ['NIV-01'],
  },
  {
    id: 'appels-offres',
    label: 'Répondre aux appels d’offres',
    description: 'DCE, chiffrage, mémoire technique',
    targetRefs: ['NIV-02'],
  },
  {
    id: 'chantier',
    label: 'Piloter les chantiers',
    description: 'CR, PPSPS, réserves, DOE',
    targetRefs: ['NIV-03'],
  },
  {
    id: 'maitrise-oeuvre',
    label: 'Travailler en maîtrise d’œuvre',
    description: 'DCE, CR, OS, réception',
    targetRefs: ['NIV-05'],
  },
  {
    id: 'deployer',
    label: 'Créer ou déployer des outils IA',
    description: 'Assistants, création de site/app avec l’IA, Claude avancé',
    targetRefs: ['NIV-10', 'NIV-09', 'NIV-04'],
  },
  {
    id: 'assistants',
    label: 'Créer des assistants IA métier',
    description: 'GPTs, Gems et projets Claude pour les tâches récurrentes',
    targetRefs: ['NIV-09'],
  },
] as const;

/** Options sélecteur — masque les besoins sans formation publiée. */
export function getCatalogueBesoinOptions(at: Date = new Date()): readonly CatalogueBesoinOption[] {
  const published = new Set(getFormationsCatalogue(at).map((f) => f.ref));
  return CATALOGUE_BESOIN_OPTIONS.filter((opt) =>
    opt.targetRefs.some((ref) => published.has(ref)),
  );
}

export const CATALOGUE_METHODE_ETAPES = [
  {
    n: '1',
    titre: 'Cadrage',
    texte: 'Identification des usages prioritaires de votre équipe.',
  },
  {
    n: '2',
    titre: 'Adaptation',
    texte: 'Exercices sur vos documents et situations métier.',
  },
  {
    n: '3',
    titre: 'Pratique',
    texte: 'Les participants pratiquent directement pendant la session.',
  },
  {
    n: '4',
    titre: 'Réutilisation',
    texte: 'Méthodes et livrables applicables dès le retour en entreprise.',
  },
] as const;

export const CATALOGUE_HERO_REASSURANCE =
  `OFC certifié Qualiopi · Présentiel Île-de-France · Groupe · Intra & inter` as const;

export const CATALOGUE_HERO_SUBTITLE =
  'Choisissez un parcours selon votre niveau et vos usages : devis, appels d’offres, chantier, maîtrise d’œuvre ou déploiement de l’IA.' as const;

export function getCataloguePageHeroReassurance(): string {
  return CATALOGUE_HERO_REASSURANCE;
}

/** Une ligne « pour qui » — extrait du champ public catalogue. */
export function cataloguePublicOneLine(publicLabel: string, maxParts = 3): string {
  const parts = publicLabel
    .split(/[,;]/)
    .map((p) => p.trim())
    .filter(Boolean)
    .slice(0, maxParts);
  return parts.join(' · ');
}

/** Tags cas d’usage — max 4. */
export function catalogueCasUsageTags(entry: FormationCatalogueEntry): readonly string[] {
  return entry.casUsageCourts.slice(0, 4);
}

export function catalogueCardAnchorId(ref: string): string {
  return `formation-card-${ref}`;
}

export function getCataloguePageProofLine(): string {
  return `Satisfaction à chaud : ${formatNoteSatisfactionAffichageComplet()} (${formatPeriodeReferenceAffichage()}). Organisme certifié Qualiopi — actions de formation.`;
}

export function getCataloguePageFinancementLine(): string {
  return FINANCEMENT_FORMULATION_CATALOGUE;
}

/** Parcours applications métier — bandeau si NIV-06 publié. */
export function showParcoursApplicationsMetierBandeau(at: Date = new Date()): boolean {
  return getFormationsCatalogue(at).some((f) => f.ref === 'NIV-06');
}

export function getCatalogueApplicationsMetierFormations(
  at: Date = new Date(),
): FormationCatalogueEntry[] {
  return getFormationsCatalogue(at).filter((f) =>
    f.ref === 'NIV-06' || f.ref === 'NIV-07' || f.ref === 'NIV-08',
  );
}

export function getCatalogueCoreWithoutApplications(
  at: Date = new Date(),
): FormationCatalogueEntry[] {
  return getCataloguePageCoreFormations(at);
}

/** Offres sur demande / sans fiche Qualiopi catalogue. */
export function getCatalogueSurDemandeOffers(): readonly CatalogueOffer[] {
  return CATALOGUE_ALL_OFFERS.filter((o) => o.kind === 'sur-demande');
}

export function getCataloguePageMetaDescriptionShort(at: Date = new Date()): string {
  void at;
  return 'Formation IA pour le BTP : devis, DCE, appels d’offres, conduite de travaux, maîtrise d’œuvre et outils métier.';
}

export const CATALOGUE_PAGE_TITLE = 'Catalogue formations IA BTP | Devis et AO';
