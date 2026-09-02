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

/** Toutes les formations catalogue publiées (NIV-01 … NIV-08 selon dates). */
export function getCataloguePageCoreFormations(
  at: Date = new Date(),
): FormationCatalogueEntry[] {
  return getFormationsCatalogue(at);
}

export type CatalogueBesoinId =
  | 'decouvrir'
  | 'devis-documents'
  | 'appels-offres'
  | 'chantier'
  | 'maitrise-oeuvre'
  | 'deployer';

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
    description: 'Claude avancé et applications métier',
    targetRefs: ['NIV-04', 'NIV-06', 'NIV-07', 'NIV-08'],
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
  `OFC certifié Qualiopi · Formations en entreprise · Île-de-France` as const;

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
  return getFormationsCatalogue(at).filter(
    (f) => f.ref !== 'NIV-06' && f.ref !== 'NIV-07' && f.ref !== 'NIV-08',
  );
}

/** Offres sur demande / sans fiche Qualiopi catalogue. */
export function getCatalogueSurDemandeOffers(): readonly CatalogueOffer[] {
  return CATALOGUE_ALL_OFFERS.filter((o) => o.kind === 'sur-demande');
}

export function getCataloguePageMetaDescriptionShort(at: Date = new Date()): string {
  void at;
  return 'Formation IA pour le BTP : devis, DCE, appels d’offres, conduite de travaux, maîtrise d’œuvre et outils métier.';
}

export const CATALOGUE_PAGE_TITLE = 'Formations IA BTP | Devis, chantier et appels d’offres';
