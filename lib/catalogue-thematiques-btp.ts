/**
 * Rubriques thématiques du catalogue `/formations` — une formation Qualiopi = une rubrique principale.
 * Landings complémentaires : même rubrique, jamais dupliquées dans la liste principale Qualiopi.
 */
import type { FormationCatalogueCode } from '@/lib/formation-catalogue-visibility';
import type { MetierId } from '@/data/catalogue-2027';
import { LINKS } from '@/lib/internal-links';

export type CatalogueThematiqueId =
  | 'debuter-outils'
  | 'devis-ao'
  | 'chantier-moe'
  | 'admin-commercial'
  | 'assistants-ia'
  | 'outils-gestion';

export type CatalogueThematiqueRubrique = {
  id: CatalogueThematiqueId;
  /** Titre H2 catalogue */
  title: string;
  description: string;
};

export const CATALOGUE_THEMATIQUES: readonly CatalogueThematiqueRubrique[] = [
  {
    id: 'debuter-outils',
    title: 'Débuter et maîtriser les outils IA',
    description:
      'Premiers pas avec ChatGPT et Claude, puis montée en puissance sur l’écosystème Claude.',
  },
  {
    id: 'devis-ao',
    title: 'Devis, chiffrage et appels d’offres',
    description:
      'DCE, chiffrage, mémoire technique et contrôle des devis — validation métier obligatoire.',
  },
  {
    id: 'chantier-moe',
    title: 'Organisation et suivi de chantier',
    description:
      'Conduite de travaux, maîtrise d’œuvre et prévention — documents structurés et relus avant usage.',
  },
  {
    id: 'admin-commercial',
    title: 'Administration et communication',
    description:
      'Administratif BTP, relances et développement commercial — gains de temps, pas de promesse de conformité automatique.',
  },
  {
    id: 'assistants-ia',
    title: 'Assistants IA BTP',
    description:
      'Créer des assistants métier avec ChatGPT et Claude — skills, modèles entreprise et déploiement en équipe.',
  },
  {
    id: 'outils-gestion',
    title: 'Outils de gestion sur mesure',
    description:
      'Prototypes et applications métier avec l’IA — périmètre défini, contrôle humain sur les outputs.',
  },
] as const;

/** Rubrique principale — programmes catalogue (NIV-XX). */
export const FORMATION_THEMATIQUE_PRINCIPALE: Record<
  FormationCatalogueCode,
  CatalogueThematiqueId
> = {
  'NIV-01': 'debuter-outils',
  'NIV-02': 'devis-ao',
  'NIV-03': 'chantier-moe',
  'NIV-04': 'assistants-ia',
  'NIV-05': 'chantier-moe',
  'NIV-06': 'outils-gestion',
  'NIV-07': 'outils-gestion',
  'NIV-08': 'outils-gestion',
  'NIV-09': 'assistants-ia',
  'NIV-10': 'outils-gestion',
};

/** Entrées complémentaires (landing / sur mesure) — hors doublon Qualiopi. */
export type CatalogueComplementaryEntry = {
  id: string;
  title: string;
  promesse: string;
  href: string;
  thematique: CatalogueThematiqueId;
  dureeLabel: string;
  disponibiliteLabel: string;
  metiers: readonly MetierId[];
};

export const CATALOGUE_COMPLEMENTARY_ENTRIES: readonly CatalogueComplementaryEntry[] = [
  {
    id: 'etudes-prix-chiffrage',
    title: 'IA pour les études de prix et le chiffrage BTP',
    promesse:
      'Analyser CCTP et DPGF, repérer les incohérences et structurer une étude de prix — l’IA assiste, le métreur valide.',
    href: LINKS.formationIaEtudesPrixChiffrageBtp,
    thematique: 'devis-ao',
    dureeLabel: 'Sur mesure',
    disponibiliteLabel: 'Programme sur mesure — nous contacter',
    metiers: ['charge-affaires', 'dirigeant'],
  },
  {
    id: 'qse-prevention',
    title: 'IA pour la sécurité et la prévention BTP',
    promesse:
      'Structurer PPSPS, fiches prévention et actions — la validation reste sous la responsabilité du professionnel.',
    href: LINKS.formationIaQsePreventionBtp,
    thematique: 'chantier-moe',
    dureeLabel: 'Sur mesure',
    disponibiliteLabel: 'Programme sur mesure — nous contacter',
    metiers: ['conducteur-travaux', 'chef-chantier', 'dirigeant'],
  },
  {
    id: 'admin-assistant',
    title: 'IA pour l’administratif et l’assistance travaux',
    promesse:
      'Emails, courriers, relances, synthèses et suivi de dossiers — sur vos documents réels.',
    href: LINKS.formationIaAssistanteBtp,
    thematique: 'admin-commercial',
    dureeLabel: 'Sur mesure',
    disponibiliteLabel: 'Programme sur mesure — nous contacter',
    metiers: ['assistant-gestion', 'dirigeant'],
  },
  {
    id: 'commercial-charge-affaires',
    title: 'IA pour les chargés d’affaires et le développement commercial BTP',
    promesse:
      'Qualifier un prospect, préparer une proposition et suivre un portefeuille — complément des parcours appels d’offres.',
    href: LINKS.formationChargeAffairesBtp,
    thematique: 'admin-commercial',
    dureeLabel: 'Sur mesure',
    disponibiliteLabel: 'Programme sur mesure — nous contacter',
    metiers: ['charge-affaires', 'dirigeant'],
  },
] as const;

/** Métiers associés — filtre catalogue (plusieurs métiers possibles). */
export const FORMATION_METIERS: Record<FormationCatalogueCode, readonly MetierId[]> = {
  'NIV-01': ['dirigeant', 'charge-affaires', 'conducteur-travaux', 'chef-chantier', 'assistant-gestion'],
  'NIV-02': ['charge-affaires', 'dirigeant', 'conducteur-travaux'],
  'NIV-03': ['conducteur-travaux', 'chef-chantier', 'charge-affaires'],
  'NIV-04': ['dirigeant', 'referent-ia', 'charge-affaires', 'conducteur-travaux', 'assistant-gestion'],
  'NIV-05': ['conducteur-travaux', 'charge-affaires', 'assistant-gestion'],
  'NIV-06': ['dirigeant', 'conducteur-travaux', 'charge-affaires', 'referent-ia'],
  'NIV-07': ['dirigeant', 'conducteur-travaux', 'referent-ia'],
  'NIV-08': ['dirigeant', 'referent-ia', 'conducteur-travaux'],
  'NIV-09': ['assistant-gestion', 'dirigeant', 'referent-ia'],
  'NIV-10': ['dirigeant', 'conducteur-travaux', 'charge-affaires', 'assistant-gestion'],
};

export const CATALOGUE_PREREQUIS_NIVEAU_NOTE =
  'Vous pouvez accéder directement à une formation si vous disposez des prérequis indiqués sur la fiche programme.';

export function getThematiqueById(id: CatalogueThematiqueId): CatalogueThematiqueRubrique {
  const found = CATALOGUE_THEMATIQUES.find((t) => t.id === id);
  if (!found) throw new Error(`Thématique inconnue : ${id}`);
  return found;
}

export const CATALOGUE_THEMATIQUE_IDS = CATALOGUE_THEMATIQUES.map((t) => t.id);

/** Propositions éditoriales non publiées comme fiches Qualiopi — documentation interne / restitution. */
export const CATALOGUE_PROPOSITIONS_NON_PUBLIEES = [
  {
    title: 'Gagner du temps dans la gestion administrative BTP avec l’IA',
    note: 'Couvert en partie par NIV-01 et landings administratif — pas de nouvelle fiche sans programme PDF.',
  },
] as const;
