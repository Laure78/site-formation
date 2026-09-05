/**
 * Options du formulaire RDV progressif — source unique UI + emails.
 * Pas de « artisan » dans les libellés visibles.
 */

export const RDV_FONCTIONS = [
  { value: 'direction', label: 'Direction' },
  { value: 'conducteur', label: 'Conducteur / conductrice de travaux' },
  { value: 'charge-affaires', label: "Chargé(e) d'affaires" },
  { value: 'bureau-etudes', label: "Bureau d'études" },
  { value: 'appels-offres', label: "Appels d'offres" },
  { value: 'administratif', label: 'Administratif' },
  { value: 'rh-formation', label: 'RH / Formation' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'dirigeant-tpe', label: 'Dirigeant TPE' },
  { value: 'autre', label: 'Autre' },
] as const;

export const RDV_BESOINS = [
  { value: 'devis-chiffrage', label: 'Devis et chiffrage' },
  { value: 'metres', label: 'Métrés' },
  { value: 'conduite-chantier', label: 'Conduite de chantier' },
  { value: 'cr-chantier', label: 'Comptes rendus de chantier' },
  { value: 'appels-offres-dce', label: "Appels d'offres / DCE" },
  { value: 'memoire-technique', label: 'Mémoire technique' },
  { value: 'administratif', label: 'Administratif' },
  { value: 'rh', label: 'RH' },
  { value: 'commercial', label: 'Commercial / Prospection' },
  { value: 'communication', label: 'Communication' },
  { value: 'automatisation', label: 'Automatisation' },
  { value: 'outils-sur-mesure', label: 'Créer des outils IA sur mesure' },
  { value: 'former-equipes', label: 'Former mes équipes' },
  { value: 'autre', label: 'Autre' },
] as const;

export const RDV_TAILLES = [
  { value: 'independant', label: 'Indépendant' },
  { value: '1-10', label: '1 à 10' },
  { value: '11-49', label: '11 à 49' },
  { value: '50-299', label: '50 à 299' },
  { value: '300+', label: '300 et +' },
] as const;

export const RDV_PERSONNES = [
  { value: '1', label: '1 personne' },
  { value: '2-5', label: '2 à 5' },
  { value: '6-10', label: '6 à 10' },
  { value: '11-20', label: '11 à 20' },
  { value: '20+', label: 'Plus de 20' },
  { value: 'nsp', label: 'Je ne sais pas encore' },
] as const;

export const RDV_NIVEAUX_IA = [
  { value: 'pas_encore', label: 'Pas encore' },
  { value: 'un_peu', label: 'Un peu' },
  { value: 'regulierement', label: 'Régulièrement' },
  { value: 'avancee', label: 'Déjà avancée' },
] as const;

export const RDV_ECHEANCES = [
  { value: 'asap', label: 'Dès que possible' },
  { value: 'mois', label: 'Dans le mois' },
  { value: '3mois', label: 'Dans les 3 mois' },
  { value: 'plus-tard', label: 'Plus tard' },
  { value: 'echanger', label: "Je souhaite d'abord échanger" },
] as const;

/** Une seule question conditionnelle — priorité AO / DCE. */
export const RDV_PRIORITE_AO = [
  { value: 'analyser-dce', label: 'Analyser les DCE' },
  { value: 'go-nogo', label: 'Go / No Go' },
  { value: 'chiffrage', label: 'Chiffrage' },
  { value: 'memoire', label: 'Mémoire technique' },
  { value: 'controle', label: 'Contrôle du dossier' },
  { value: 'tout', label: 'Tout le processus' },
] as const;

export type RdvFonction = (typeof RDV_FONCTIONS)[number]['value'];
export type RdvBesoin = (typeof RDV_BESOINS)[number]['value'];
export type RdvTaille = (typeof RDV_TAILLES)[number]['value'];
export type RdvPersonnes = (typeof RDV_PERSONNES)[number]['value'];
export type RdvNiveauIa = (typeof RDV_NIVEAUX_IA)[number]['value'];
export type RdvEcheance = (typeof RDV_ECHEANCES)[number]['value'];
export type RdvPrioriteAo = (typeof RDV_PRIORITE_AO)[number]['value'];

export function labelFor<T extends string>(
  options: readonly { value: T; label: string }[],
  value: string | undefined | null,
): string {
  if (!value) return '—';
  return options.find((o) => o.value === value)?.label ?? value;
}

export function labelsForBesoins(values: readonly string[] | undefined | null): string[] {
  if (!values?.length) return [];
  return values.map((v) => labelFor(RDV_BESOINS, v));
}
