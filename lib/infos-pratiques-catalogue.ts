/**
 * Données « Informations pratiques » — 5 parcours catalogue (Indicateur 1 Qualiopi).
 * Source : `data/formations.ts`, `config/qualiopi.ts`, programmes des fiches catalogue.
 */

import { getFormationByCode, type FormationCode } from '@/data/formations';
import {
  QUALIOPI_DELAI_ACCES_EXACT,
  QUALIOPI_FICHE_META,
  QUALIOPI_MODALITES_ACCES_EXACT,
} from '@/config/qualiopi';
import {
  QUALIOPI_EVALUATION_STANDARD,
  QUALIOPI_METHODES_STANDARD,
} from '@/lib/qualiopi-info';
import { getFormationCatalogueByRef } from '@/lib/formations-catalogue-display';
import type { InfosPratiquesFormation } from '@/lib/infos-pratiques-types';
import { libelleTarifsCatalogueComplets, PREREQUIS_NIVEAU_2 } from '@/lib/tarifs-sessions';

/** Modalité pédagogique fixe — toutes les actions catalogue OFC. */
export const MODALITE_PEDAGOGIQUE_CATALOGUE =
  'Présentiel — Île-de-France uniquement (intra ou inter)' as const;

/** Encart accessibilité handicap — texte réglementaire affiché dans le composant. */
export const INFOS_PRATIQUES_HANDICAP_ENCART =
  "Nos formations sont accessibles aux personnes en situation de handicap. Laure Olivié, référente handicap, étudie avec vous les adaptations nécessaires (matériel, rythme, supports, accès aux locaux) avant l'entrée en formation. Contact : 06 95 66 18 18 — contact@laureolivie.fr";

/** Grandes parties du programme — titres modules (fiches catalogue). */
export const PROGRAMME_CONTENU_CATALOGUE: Record<FormationCode, readonly string[]> = {
  'NIV-01': [
    "Module 1 — Devis et chiffrage avec l'IA",
    'Module 2 — Emails et relation client',
    'Module 3 — Comptes rendus, DOE et documentation chantier',
    'Module 4 — Gestion administrative et automatisation',
  ],
  'NIV-02': [
    'Module 1 — Paramétrage de Claude AI Pro & Cowork',
    'Module 2 — Analyse express de DCE avec Cowork',
    'Module 3 — Rédiger son mémoire technique avec Cowork',
  ],
  'NIV-03': [
    'Module 1 — Installation & démarrage de chantier',
    'Module 2 — Sécurité de chantier',
    'Module 3 — Gestion de chantier',
    'Module 4 — Administratif de suivi de chantier',
  ],
  'NIV-04': [
    "Module 1 — Projets & Skills : structurer Claude pour l'entreprise",
    'Module 2 — Cowork : déléguer la production documentaire',
    'Module 3 — Connecteurs : relier Claude à ses outils',
    'Module 4 — Claude Code : automatiser ses tâches',
  ],
  'NIV-05': [
    "Module 0 — Introduction à Claude, l'écosystème Anthropic",
    "Module 1 — Analyse des offres et conformité avec l'IA",
    'Module 2 — Comptes rendus de chantier en 10 minutes',
    'Module 3 — Courriers, ordres de service et actes administratifs',
    'Module 4 — Réserves, réception et suivi client',
  ],
};

const PREREQUIS_NIV01 =
  'Aucune compétence technique en IA requise. Ordinateur portable et connexion internet. Niveau 1 : un compte gratuit Claude AI ou ChatGPT suffit.';

function stripLabelPrefix(text: string, prefix: RegExp): string {
  return text.replace(prefix, '').trim();
}

/** Évite les termes interdits sur le bloc Informations pratiques (Qualiopi Ind. 1). */
function sanitizeInfosPratiquesText(text: string): string {
  return text
    .replace(/\ben ligne\b/gi, 'sur le site')
    .replace(/\bà distance\b/gi, 'sur site')
    .replace(/\bdistanciel\b/gi, 'présentiel')
    .replace(/\be-learning\b/gi, 'présentiel')
    .replace(/\bMon Compte Formation\b/gi, 'financement professionnel')
    .replace(/\bCPF\b/gi, 'financement professionnel');
}

function libelleDureeInfosPratiques(f: NonNullable<ReturnType<typeof getFormationByCode>>): string {
  let label = f.duree.replace(/\b4 h\b/, '4 heures').replace(/\b(\d+) h\b/, '$1 heures');
  if (f.horaires) {
    const horaires = f.horaires
      .replace(/^matin\s*/i, '')
      .replace(/^\(/, '')
      .replace(/\)$/, '')
      .trim();
    label = label.replace(/\s*matin\s*(\([^)]*\))?/i, '').trim();
    return `${label} (${horaires})`;
  }
  // TODO(NIV-01|02|03|05) : compléter les créneaux horaires dans data/formations.ts (ex. 9h00 – 13h00)
  return label;
}

function prerequisPourRef(ref: FormationCode): string {
  if (ref === 'NIV-01') return PREREQUIS_NIV01;
  return PREREQUIS_NIVEAU_2.join(' ');
}

function tarifPourRef(ref: FormationCode): string {
  const entry = getFormationCatalogueByRef(ref);
  if (!entry) {
    throw new Error(`[getInfosPratiquesForCatalogue] Référence inconnue : ${ref}`);
  }
  return libelleTarifsCatalogueComplets(entry.prixHT, entry.effectif.toLowerCase());
}

export function getInfosPratiquesForCatalogue(ref: string): InfosPratiquesFormation {
  const formation = getFormationByCode(ref);
  const entry = getFormationCatalogueByRef(ref);
  if (!formation || !entry) {
    throw new Error(`[getInfosPratiquesForCatalogue] Référence catalogue inconnue : ${ref}`);
  }
  const code = formation.code as FormationCode;
  const contenu = PROGRAMME_CONTENU_CATALOGUE[code];
  if (!contenu?.length) {
    throw new Error(`[getInfosPratiquesForCatalogue] Contenu programme manquant pour ${ref}`);
  }

  return {
    prerequis: prerequisPourRef(code),
    objectifs: [...entry.objectifs],
    contenu: [...contenu],
    programmePdfUrl: formation.pdfProgramme,
    duree: libelleDureeInfosPratiques(formation),
    modalitesAcces: sanitizeInfosPratiquesText(
      stripLabelPrefix(QUALIOPI_MODALITES_ACCES_EXACT, /^Modalités d'accès\s*:\s*/i)
    ),
    delaiAcces: sanitizeInfosPratiquesText(
      stripLabelPrefix(QUALIOPI_DELAI_ACCES_EXACT, /^Délai d'accès\s*:\s*/i)
    ),
    tarif: tarifPourRef(code),
    methodes: [...QUALIOPI_METHODES_STANDARD],
    modalitesEvaluation: [...QUALIOPI_EVALUATION_STANDARD],
    modalitePedagogique: MODALITE_PEDAGOGIQUE_CATALOGUE,
    accessibiliteHandicap: INFOS_PRATIQUES_HANDICAP_ENCART,
    dateMaj: QUALIOPI_FICHE_META.updatedAt,
  };
}
