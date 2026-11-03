/**
 * Page `/financement-constructys-formation-ia-btp` — données UX (barèmes officiels Constructys 2026).
 * Sources : constructys.fr (modalités PDC juin 2026 + dispositif transitoire de paiement).
 */
import {
  SESSION_DUREE_LIBELLE,
  parseDureeHeures,
  MENTIONS_TVA_REGIMES_COURT,
  PERIMETRE_FORMATIONS_COURT,
} from '@/lib/tarifs-sessions';
import { formatPrixHt } from '@/data/formations';
import { EXTERNAL_SITE_URLS } from '@/lib/external-site-urls';
import {
  libelleTarifParticipantCatalogue,
  TARIF_PARTICIPANT_NIV01_HT,
  TARIF_PARTICIPANT_NIV02_HT,
} from '@/lib/tarifs-catalogue-participant';

export const FINANCEMENT_PAGE_H1 =
  'Financer votre formation IA BTP avec Constructys' as const;

/** Segment title — suffixe « | Laure Olivié » ajouté par buildTitle (total 57 car.). */
export const FINANCEMENT_PAGE_META_TITLE =
  'Formation IA BTP : financement Constructys' as const;

export const FINANCEMENT_PAGE_META_DESCRIPTION =
  'Financer votre formation IA BTP avec Constructys : conditions, plafonds et démarches pas à pas. Prise en charge selon éligibilité, organisme certifié Qualiopi.' as const;

/** Sources officielles Constructys — URLs stables. */
export const CONSTRUCTYS_SOURCES = {
  conditionsPriseEnCharge2026: {
    href: 'https://www.constructys.fr/conditions-de-prise-en-charge-2/',
    title: 'Conditions de prise en charge 2026 — Constructys',
    org: 'Constructys',
  },
  modalites2026: {
    href: 'https://www.constructys.fr/decouvrez-les-modalites-de-participation-financiere-2026/',
    title: 'Modalités de participation financière 2026 — Constructys',
    org: 'Constructys',
  },
  dispositifTransitoirePaiement: {
    href: 'https://www.constructys.fr/?p=246047',
    title: 'Dispositif transitoire — paiement des formations (Constructys)',
    org: 'Constructys',
  },
  egestion: {
    href: EXTERNAL_SITE_URLS.constructysEgestion,
    title: 'eGestion — dépôt des dossiers Constructys',
    org: 'Constructys',
  },
} as const;

/** Plafonds pédagogiques PDC Bâtiment — barèmes en vigueur sur le site (juin 2026). */
export const CONSTRUCTYS_PLAFOND_TPE = {
  label: 'Entreprise de moins de 11 salariés',
  labelCarte: 'Moins de 11 salariés',
  sousTitreCarte: 'Bâtiment',
  plafondHoraireHt: 24,
  plafondGroupeJourHt: 840,
  trancheEffectif: 'moins de 11 salariés',
} as const;

/** Plafond horaire 19 € : entreprises du Bâtiment de 11 salariés et plus (demandes reçues à partir du 1er juin 2026). */
export const CONSTRUCTYS_PLAFOND_PME = {
  label: 'Entreprise de 11 à moins de 300 salariés (Bâtiment)',
  labelCarte: '11 à moins de 300 salariés',
  sousTitreCarte: 'Bâtiment',
  plafondHoraireHt: 19,
  plafondGroupeJourHt: 665,
  trancheEffectif: '11 salariés et plus',
} as const;

export const CONSTRUCTYS_BAREMES_MENTION =
  'Barèmes 2026 — selon effectif, branche, dispositif, plafonds et validation Constructys.' as const;

export const CONSTRUCTYS_DUREE_SESSION_H = parseDureeHeures(SESSION_DUREE_LIBELLE);
export const CONSTRUCTYS_DELAI_DEPOT_JOURS = 15;

export const FINANCEMENT_ESTIMATION_DISCLAIMER =
  'Exemple indicatif non contractuel — seul l’accord Constructys confirme le montant.' as const;

/** Exemple maquette — intra 4 h, 6 participants, coût pédagogique facturé OFC. */
export const FINANCEMENT_ESTIMATION_INTRA_4H = {
  dureeHeures: 4,
  participants: 6,
  coutPedagogiqueFactureHt: 1860,
} as const;

export const FINANCEMENT_BAREMES_NOTE =
  'Les barèmes peuvent évoluer. Seul l’accord de prise en charge de Constructys confirme le montant.' as const;

/** Prise en charge indicative = min(horaire × durée × stagiaires, plafond groupe/jour, coût pédagogique facturé). */
export function calculPriseEnChargeIndicative(params: {
  plafondHoraireHt: number;
  dureeHeures: number;
  participants: number;
  plafondGroupeJourHt: number;
  coutPedagogiqueFactureHt: number;
}): number {
  const horaire =
    params.plafondHoraireHt * params.dureeHeures * params.participants;
  return Math.min(
    horaire,
    params.plafondGroupeJourHt,
    params.coutPedagogiqueFactureHt,
  );
}

export type FinancementEstimationExemple = {
  id: string;
  tranche: string;
  participants: number;
  plafondHoraireHt: number;
  plafondGroupeJourHt: number;
  priseEnChargeHt: number;
  tarifFactureHt: number;
  resteAChargeHt: number;
};

export function getFinancementEstimationExemples(): FinancementEstimationExemple[] {
  const duree = CONSTRUCTYS_DUREE_SESSION_H;
  /** Tarif métier 7 h × participants = coût pédagogique facturé. */
  const tarifParParticipant = TARIF_PARTICIPANT_NIV02_HT;

  const cas = [
    { id: 'tpe-6', tranche: CONSTRUCTYS_PLAFOND_TPE.label, ...CONSTRUCTYS_PLAFOND_TPE, participants: 6 },
    { id: 'pme-6', tranche: CONSTRUCTYS_PLAFOND_PME.label, ...CONSTRUCTYS_PLAFOND_PME, participants: 6 },
    { id: 'tpe-12', tranche: CONSTRUCTYS_PLAFOND_TPE.label, ...CONSTRUCTYS_PLAFOND_TPE, participants: 12 },
  ] as const;

  return cas.map((c) => {
    const tarifFactureHt = tarifParParticipant * c.participants;
    const priseEnChargeHt = calculPriseEnChargeIndicative({
      plafondHoraireHt: c.plafondHoraireHt,
      dureeHeures: duree,
      participants: c.participants,
      plafondGroupeJourHt: c.plafondGroupeJourHt,
      coutPedagogiqueFactureHt: tarifFactureHt,
    });
    return {
      id: c.id,
      tranche: c.tranche,
      participants: c.participants,
      plafondHoraireHt: c.plafondHoraireHt,
      plafondGroupeJourHt: c.plafondGroupeJourHt,
      priseEnChargeHt,
      tarifFactureHt,
      resteAChargeHt: Math.max(0, tarifFactureHt - priseEnChargeHt),
    };
  });
}

/** Deux cas comparatifs — intra 4 h (affichage page financement). */
export function getFinancementEstimationExemplesIntra4h(): FinancementEstimationExemple[] {
  const { dureeHeures, participants, coutPedagogiqueFactureHt } = FINANCEMENT_ESTIMATION_INTRA_4H;
  const cas = [
    { id: 'tpe-4h', tranche: CONSTRUCTYS_PLAFOND_TPE.labelCarte, ...CONSTRUCTYS_PLAFOND_TPE },
    { id: 'pme-4h', tranche: CONSTRUCTYS_PLAFOND_PME.labelCarte, ...CONSTRUCTYS_PLAFOND_PME },
  ] as const;

  return cas.map((c) => {
    const priseEnChargeHt = calculPriseEnChargeIndicative({
      plafondHoraireHt: c.plafondHoraireHt,
      dureeHeures,
      participants,
      plafondGroupeJourHt: c.plafondGroupeJourHt,
      coutPedagogiqueFactureHt,
    });
    return {
      id: c.id,
      tranche: c.tranche,
      participants,
      plafondHoraireHt: c.plafondHoraireHt,
      plafondGroupeJourHt: c.plafondGroupeJourHt,
      priseEnChargeHt,
      tarifFactureHt: coutPedagogiqueFactureHt,
      resteAChargeHt: Math.max(0, coutPedagogiqueFactureHt - priseEnChargeHt),
    };
  });
}

export const FINANCEMENT_ETAPES = [
  {
    n: '1',
    titre: 'Vérifier son OPCO',
    texte:
      'Confirmer que Constructys est votre OPCO et que l’entreprise relève du périmètre visé par la demande.',
  },
  {
    n: '2',
    titre: 'Choisir la formation',
    texte: 'Sélectionner le parcours adapté dans le catalogue Laure Olivié (OFC).',
  },
  {
    n: '3',
    titre: 'Obtenir programme et devis',
    texte:
      'Demander le programme détaillé et le devis nécessaires au dossier eGestion.',
  },
  {
    n: '4',
    titre: 'Déposer dans eGestion',
    texte: `Dossier complet au moins ${CONSTRUCTYS_DELAI_DEPOT_JOURS} jours calendaires avant le début de la formation.`,
  },
  {
    n: '5',
    titre: 'Recevoir l’accord',
    texte:
      'Attendre la décision Constructys, puis suivre justificatifs et remboursement selon les modalités applicables à la date du dossier.',
  },
] as const;

export const FINANCEMENT_OFC_FOURNIT = [
  'Devis détaillé',
  'Programme de formation',
  'Convention de formation',
  'Justificatifs d’assiduité et certificat de réalisation selon le dossier',
] as const;

export const FINANCEMENT_ENTREPRISE_REALISE = [
  'Vérification de son OPCO et de son éligibilité',
  'Dépôt du dossier dans eGestion',
  'Suivi de l’accord de prise en charge',
  'Règlement de la facture lorsque le circuit l’exige',
  'Demande de remboursement auprès de Constructys avec les justificatifs',
] as const;

export const FINANCEMENT_TARIFS_BLOC = {
  bases: libelleTarifParticipantCatalogue(TARIF_PARTICIPANT_NIV01_HT),
  metier: libelleTarifParticipantCatalogue(TARIF_PARTICIPANT_NIV02_HT),
  /** @deprecated Alias — sessions métier 7 h. */
  intra: libelleTarifParticipantCatalogue(TARIF_PARTICIPANT_NIV02_HT),
  /** @deprecated Alias — bases. */
  inter: libelleTarifParticipantCatalogue(TARIF_PARTICIPANT_NIV01_HT),
  tva: MENTIONS_TVA_REGIMES_COURT,
  perimetre: PERIMETRE_FORMATIONS_COURT,
  duree: `${CONSTRUCTYS_DUREE_SESSION_H} h`,
} as const;

export function formatMontantHt(montant: number): string {
  return `${formatPrixHt(montant)} € HT`;
}
