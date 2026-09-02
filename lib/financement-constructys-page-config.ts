/**
 * Page `/financement-constructys-formation-ia-btp` — données UX (barèmes officiels Constructys 2026).
 * Sources : constructys.fr (modalités PDC juin 2026 + dispositif transitoire oct. 2026).
 */
import {
  TARIF_INTRA_4H_HT,
  TARIF_INTER_4H_HT_FROM,
  SESSION_DUREE_LIBELLE,
  parseDureeHeures,
  libelleTarifIntraParSession,
  libelleTarifInterParParticipant,
  MENTIONS_TVA_REGIMES_COURT,
  PERIMETRE_FORMATIONS_COURT,
} from '@/lib/tarifs-sessions';
import { formatPrixHt } from '@/data/formations';
import { EXTERNAL_SITE_URLS } from '@/lib/external-site-urls';

export const FINANCEMENT_PAGE_H1 =
  'Financer votre formation IA BTP avec Constructys en 2026' as const;

export const FINANCEMENT_PAGE_META_TITLE = 'Financement Constructys formation IA BTP 2026 | OFC' as const;

export const FINANCEMENT_PAGE_META_DESCRIPTION =
  'Financement Constructys d’une formation IA BTP en 2026 : plafonds, délai eGestion, reste à charge et changement de paiement dès le 1er octobre.' as const;

/** Sources officielles Constructys — URLs stables. */
export const CONSTRUCTYS_SOURCES = {
  modalites2026: {
    href: 'https://www.constructys.fr/decouvrez-les-modalites-de-participation-financiere-2026/',
    title: 'Modalités de participation financière 2026 — Constructys',
    org: 'Constructys',
  },
  dispositifTransitoireOct2026: {
    href: 'https://www.constructys.fr/reforme-tva-paiement-des-formations-un-dispositif-transitoire-mis-en-place-a-compter-du-1er-octobre/',
    title:
      'Réforme TVA — dispositif transitoire pour le paiement des formations (à compter du 1er octobre 2026)',
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
  plafondHoraireHt: 24,
  plafondGroupeJourHt: 840,
  trancheEffectif: 'moins de 11 salariés',
} as const;

/** Plafond horaire 19 € : entreprises du Bâtiment de 11 salariés et plus (demandes reçues à partir du 1er juin 2026). */
export const CONSTRUCTYS_PLAFOND_PME = {
  label: 'Entreprise de 11 salariés et plus (Bâtiment)',
  plafondHoraireHt: 19,
  plafondGroupeJourHt: 665,
  trancheEffectif: '11 salariés et plus',
} as const;

export const CONSTRUCTYS_DUREE_SESSION_H = parseDureeHeures(SESSION_DUREE_LIBELLE);
export const CONSTRUCTYS_DELAI_DEPOT_JOURS = 15;

export const FINANCEMENT_ESTIMATION_DISCLAIMER =
  'Estimation non contractuelle, sous réserve d’éligibilité et d’accord Constructys.' as const;

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
  const tarif = TARIF_INTRA_4H_HT;

  const cas = [
    { id: 'tpe-6', tranche: CONSTRUCTYS_PLAFOND_TPE.label, ...CONSTRUCTYS_PLAFOND_TPE, participants: 6 },
    { id: 'pme-6', tranche: CONSTRUCTYS_PLAFOND_PME.label, ...CONSTRUCTYS_PLAFOND_PME, participants: 6 },
    { id: 'tpe-12', tranche: CONSTRUCTYS_PLAFOND_TPE.label, ...CONSTRUCTYS_PLAFOND_TPE, participants: 12 },
  ] as const;

  return cas.map((c) => {
    const priseEnChargeHt = calculPriseEnChargeIndicative({
      plafondHoraireHt: c.plafondHoraireHt,
      dureeHeures: duree,
      participants: c.participants,
      plafondGroupeJourHt: c.plafondGroupeJourHt,
      coutPedagogiqueFactureHt: tarif,
    });
    return {
      id: c.id,
      tranche: c.tranche,
      participants: c.participants,
      plafondHoraireHt: c.plafondHoraireHt,
      plafondGroupeJourHt: c.plafondGroupeJourHt,
      priseEnChargeHt,
      tarifFactureHt: tarif,
      resteAChargeHt: Math.max(0, tarif - priseEnChargeHt),
    };
  });
}

export const FINANCEMENT_ETAPES = [
  {
    n: '1',
    titre: 'Vérifier le rattachement Constructys',
    texte:
      'Confirmez que votre entreprise relève du périmètre BTP et que Constructys est bien votre OPCO.',
  },
  {
    n: '2',
    titre: 'Choisir la formation et demander programme + devis',
    texte:
      'Sélectionnez le parcours adapté dans le catalogue OFC et demandez le programme détaillé et le devis.',
  },
  {
    n: '3',
    titre: 'Déposer un dossier complet dans eGestion',
    texte: `Au moins ${CONSTRUCTYS_DELAI_DEPOT_JOURS} jours calendaires avant le début de la formation.`,
  },
  {
    n: '4',
    titre: 'Attendre la décision de prise en charge',
    texte:
      'Ne confirmez pas le financement tant que Constructys n’a pas validé votre demande.',
  },
  {
    n: '5',
    titre: 'Après la formation : justificatifs et circuit de paiement',
    texte:
      'Transmettez les justificatifs attendus et suivez le circuit de paiement ou de remboursement applicable à la date de votre dossier.',
  },
] as const;

export const FINANCEMENT_OFC_FOURNIT = [
  'Programme détaillé',
  'Devis',
  'Convention de formation',
  'Feuilles d’émargement ou justificatifs de présence',
  'Certificat de réalisation',
] as const;

export const FINANCEMENT_ENTREPRISE_REALISE = [
  'Vérification de son OPCO et de son éligibilité',
  'Dépôt du dossier dans eGestion',
  'Échanges avec Constructys',
  'Règlement de la facture lorsque le circuit transitoire l’exige',
  'Demande de remboursement et transmission des justificatifs',
] as const;

export const FINANCEMENT_TARIFS_BLOC = {
  intra: libelleTarifIntraParSession(TARIF_INTRA_4H_HT),
  inter: libelleTarifInterParParticipant(TARIF_INTER_4H_HT_FROM),
  tva: MENTIONS_TVA_REGIMES_COURT,
  perimetre: PERIMETRE_FORMATIONS_COURT,
  duree: `${CONSTRUCTYS_DUREE_SESSION_H} h`,
} as const;

export function formatMontantHt(montant: number): string {
  return `${formatPrixHt(montant)} € HT`;
}
