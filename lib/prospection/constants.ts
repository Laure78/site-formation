/** Constantes module Prospection CRM (admin). */

export const PROSPECTION_STATUTS = [
  { value: 'a_contacter', label: 'À contacter', tone: 'slate' },
  { value: 'email_envoye', label: 'Email envoyé', tone: 'sky' },
  { value: 'a_relancer', label: 'À relancer', tone: 'amber' },
  { value: 'relance', label: 'Relancé', tone: 'amber' },
  { value: 'reponse_recue', label: 'Réponse reçue', tone: 'violet' },
  { value: 'rdv_prevu', label: 'Rendez-vous prévu', tone: 'blue' },
  { value: 'opportunite', label: 'Opportunité', tone: 'indigo' },
  { value: 'proposition_envoyee', label: 'Proposition envoyée', tone: 'indigo' },
  { value: 'client', label: 'Client', tone: 'emerald' },
  { value: 'pas_interesse', label: 'Pas intéressé', tone: 'rose' },
  { value: 'a_recontacter', label: 'À recontacter plus tard', tone: 'slate' },
] as const;

export type ProspectionStatut = (typeof PROSPECTION_STATUTS)[number]['value'];

export const TYPE_STRUCTURES = [
  { value: 'entreprise_btp', label: 'Entreprise BTP' },
  { value: 'pme_btp', label: 'PME BTP' },
  { value: 'eti_btp', label: 'ETI BTP' },
  { value: 'grand_groupe_btp', label: 'Grand groupe BTP' },
  { value: 'ffb', label: 'FFB' },
  { value: 'federation', label: 'Fédération professionnelle' },
  { value: 'cci', label: 'CCI' },
  { value: 'cma', label: 'CMA' },
  { value: 'organisme_formation', label: 'Organisme de formation' },
  { value: 'autre', label: 'Autre' },
] as const;

export type TypeStructure = (typeof TYPE_STRUCTURES)[number]['value'];

export const DEPARTEMENTS_IDF = [
  { value: '75', label: 'Paris (75)' },
  { value: '77', label: 'Seine-et-Marne (77)' },
  { value: '78', label: 'Yvelines (78)' },
  { value: '91', label: 'Essonne (91)' },
  { value: '92', label: 'Hauts-de-Seine (92)' },
  { value: '93', label: 'Seine-Saint-Denis (93)' },
  { value: '94', label: 'Val-de-Marne (94)' },
  { value: '95', label: "Val-d'Oise (95)" },
] as const;

export const BESOINS_PROSPECTION = [
  'IA pour les conducteurs de travaux',
  'Appels d’offres BTP',
  'Analyse DCE',
  'Mémoire technique',
  'Devis et chiffrage',
  'Comptes rendus de chantier',
  'PPSPS',
  'Claude AI',
  'ChatGPT',
  'Création d’outils métier avec l’IA',
  'Automatisation',
  'Plateforme IA métier',
] as const;

export const EMAIL_TYPES = [
  { value: 'premier_contact', label: 'Premier contact' },
  { value: 'relance_1', label: 'Relance 1' },
  { value: 'relance_2', label: 'Relance 2' },
  { value: 'relance_apres_echange', label: 'Relance après échange' },
  { value: 'proposition_rdv', label: 'Proposition de rendez-vous' },
  { value: 'apres_linkedin', label: 'Après connexion LinkedIn' },
  { value: 'apres_rencontre', label: 'Après rencontre' },
  { value: 'proposition_formation', label: 'Proposition de formation' },
  { value: 'suivi', label: 'Suivi' },
  { value: 'reprise_contact', label: 'Reprise de contact' },
  { value: 'autre', label: 'Autre' },
] as const;

export type EmailType = (typeof EMAIL_TYPES)[number]['value'];

export const TAILLES_ENTREPRISE = [
  { value: '1-10', label: '1–10 salariés' },
  { value: '10-50', label: '10–50 salariés' },
  { value: '20-100', label: '20–100 salariés' },
  { value: '50-250', label: '50–250 salariés' },
  { value: '250+', label: '250+ salariés' },
] as const;

export function statutLabel(value: string | null | undefined): string {
  return PROSPECTION_STATUTS.find((s) => s.value === value)?.label ?? value ?? '—';
}

export function typeStructureLabel(value: string | null | undefined): string {
  return TYPE_STRUCTURES.find((t) => t.value === value)?.label ?? value ?? '—';
}

export function statutBadgeClass(value: string | null | undefined): string {
  const tone = PROSPECTION_STATUTS.find((s) => s.value === value)?.tone ?? 'slate';
  const map: Record<string, string> = {
    slate: 'bg-slate-100 text-slate-700',
    sky: 'bg-sky-50 text-sky-800',
    amber: 'bg-amber-50 text-amber-900',
    violet: 'bg-violet-50 text-violet-800',
    blue: 'bg-blue-50 text-blue-800',
    indigo: 'bg-indigo-50 text-indigo-800',
    emerald: 'bg-emerald-50 text-emerald-800',
    rose: 'bg-rose-50 text-rose-800',
  };
  return map[tone] ?? map.slate!;
}
