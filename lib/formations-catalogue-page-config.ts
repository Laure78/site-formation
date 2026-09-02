/**
 * Page catalogue `/formations` — données UX (source formations + tarifs existants).
 */
import {
  getFormationsCatalogue,
  type FormationCatalogueEntry,
} from '@/lib/formations-catalogue-display';
import { getCatalogueFormationsCount, isFormationCataloguePublished } from '@/lib/formation-catalogue-visibility';
import { formatVolumeProsFormesBtp, formatNoteSatisfactionSur5 } from '@/lib/data/indicateurs-resultats';
import { PERIMETRE_FORMATIONS_COURT } from '@/lib/tarifs-sessions';

/** Cinq parcours cœur du catalogue (spec UX). */
export const CATALOGUE_PAGE_CORE_REFS = [
  'NIV-01',
  'NIV-02',
  'NIV-03',
  'NIV-04',
  'NIV-05',
] as const;

export type CatalogueBesoinId =
  | 'debuter'
  | 'appels-offres'
  | 'conduite-travaux'
  | 'maitrise-oeuvre'
  | 'deploiement-ia';

export type CatalogueBesoinOption = {
  id: CatalogueBesoinId;
  label: string;
  description: string;
  targetRef: (typeof CATALOGUE_PAGE_CORE_REFS)[number];
};

export const CATALOGUE_BESOIN_OPTIONS: readonly CatalogueBesoinOption[] = [
  {
    id: 'debuter',
    label: 'Je découvre l’IA',
    description: 'Fondamentaux IA BTP — devis, emails, documents',
    targetRef: 'NIV-01',
  },
  {
    id: 'appels-offres',
    label: 'Je réponds aux appels d’offres',
    description: 'DCE, chiffrage, mémoire technique',
    targetRef: 'NIV-02',
  },
  {
    id: 'conduite-travaux',
    label: 'Je pilote des chantiers',
    description: 'CR, PPSPS, réserves, DOE',
    targetRef: 'NIV-03',
  },
  {
    id: 'maitrise-oeuvre',
    label: 'Je travaille en maîtrise d’œuvre',
    description: 'DCE, CR, OS, réception',
    targetRef: 'NIV-05',
  },
  {
    id: 'deploiement-ia',
    label: 'Je veux industrialiser l’IA',
    description: 'Claude, assistants et workflows en entreprise',
    targetRef: 'NIV-04',
  },
];

/** Options sélecteur — masque les besoins dont la fiche n'est pas publiée. */
export function getCatalogueBesoinOptions(at: Date = new Date()): readonly CatalogueBesoinOption[] {
  return CATALOGUE_BESOIN_OPTIONS.filter((opt) =>
    isFormationCataloguePublished(opt.targetRef, at),
  );
}

export const CATALOGUE_METHODE_ETAPES = [
  {
    n: '1',
    titre: 'Identification du besoin',
    texte: 'Nous identifions les usages prioritaires de votre équipe.',
  },
  {
    n: '2',
    titre: 'Travail sur vos documents',
    texte: 'Les exercices s’appuient sur vos documents et situations métier.',
  },
  {
    n: '3',
    titre: 'Formation opérationnelle',
    texte: 'Les participants pratiquent directement pendant la session.',
  },
  {
    n: '4',
    titre: 'Réutilisation en entreprise',
    texte: 'Ils repartent avec des méthodes directement applicables.',
  },
] as const;

/** Parcours cœur publiés (NIV-01 à NIV-05). */
export function getCataloguePageCoreFormations(
  at: Date = new Date(),
): FormationCatalogueEntry[] {
  const published = new Set(
    getFormationsCatalogue(at).map((f) => f.ref),
  );
  return CATALOGUE_PAGE_CORE_REFS.filter((ref) => published.has(ref)).map((ref) => {
    const entry = getFormationsCatalogue(at).find((f) => f.ref === ref);
    if (!entry) throw new Error(`Formation catalogue ${ref} introuvable`);
    return entry;
  });
}

export function getCataloguePageHeroReassurance(at: Date = new Date()): string {
  const count = getCataloguePageCoreFormations(at).length;
  return `${count} parcours · Organisme certifié Qualiopi · ${PERIMETRE_FORMATIONS_COURT}`;
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
  return `${formatVolumeProsFormesBtp()} professionnels formés · ${formatNoteSatisfactionSur5()} de satisfaction · Qualiopi`;
}

/** Parcours applications métier — bandeau secondaire si NIV-06 publié. */
export function showParcoursApplicationsMetierBandeau(at: Date = new Date()): boolean {
  return isFormationCataloguePublished('NIV-06', at);
}

export function getCataloguePageMetaDescriptionShort(at: Date = new Date()): string {
  const count = getCatalogueFormationsCount(at);
  return `Formations IA pour les pros du BTP : fondamentaux, appels d'offres, chantier, maîtrise d'œuvre et usages avancés. ${count} parcours Qualiopi — présentiel IDF.`;
}
