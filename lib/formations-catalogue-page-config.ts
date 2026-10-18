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
  'NIV-01': "Les bases de l'IA (NUM-01)",
  'NIV-02': "IA et appels d'offres (NUM-02)",
  'NIV-03': 'IA et conduite de travaux (NUM-07)',
  'NIV-04': 'Maîtriser Claude AI (NUM-03)',
  'NIV-05': "IA et maîtrise d'œuvre (NUM-08)",
  'NIV-10': 'Créer des applications métier BTP avec l’IA (NUM-04)',
};

/** Ordre d’affichage catalogue public (hors apps métier N1–N3). */
export const CATALOGUE_PUBLIC_REFS = [
  'NIV-01',
  'NIV-02',
  'NIV-03',
  'NIV-04',
  'NIV-05',
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

export const CATALOGUE_HERO_REASSURANCE =
  `OFC certifié Qualiopi · Présentiel Île-de-France · Groupe · Intra & inter` as const;

export const CATALOGUE_HERO_SUBTITLE =
  'Par niveau et par usage : devis, appels d’offres, chantier, MOE ou déploiement IA.' as const;

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

/** Title catalogue — parcours métiers 2027. */
export const CATALOGUE_PAGE_TITLE = 'Formations et parcours métiers BTP | Laure Olivié';

export function getCataloguePageMetaDescriptionShort(at: Date = new Date()): string {
  void at;
  return 'Parcours métiers BTP et formation IA pour le BTP en Île-de-France : direction, commercial, travaux et management. Présentiel en IDF, devis sur demande.';
}