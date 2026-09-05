/**
 * Payload qualification RDV + mapping colonnes legacy prospects.
 */

import type {
  RdvBesoin,
  RdvEcheance,
  RdvFonction,
  RdvNiveauIa,
  RdvPersonnes,
  RdvPrioriteAo,
  RdvTaille,
} from '@/lib/rdv-form-options';
import { RDV_PRIORITE_AO, labelFor } from '@/lib/rdv-form-options';

export type RdvQualificationPayload = {
  prenom: string;
  nom: string;
  email: string;
  telephone?: string;
  entreprise: string;
  fonction?: RdvFonction | string;
  besoins: RdvBesoin[] | string[];
  priorite_ao?: RdvPrioriteAo | string;
  taille_entreprise?: RdvTaille | string;
  personnes_concernees?: RdvPersonnes | string;
  niveau_ia?: RdvNiveauIa | string;
  echeance?: RdvEcheance | string;
  probleme?: string;
  type_rdv?: 'telephone' | 'visio';
  /** Anti-bot honeypot (doit rester vide). */
  website?: string;
  source_page?: string;
  utm?: string;
  referer?: string;
  formation_consultee?: string;
  form_started_at?: string;
};

export type CreateRdvBookingInput = RdvQualificationPayload & {
  start_at: string;
  end_at: string;
};

/** Colonnes legacy encore présentes — valeurs compatibles si CHECK non migrés. */
export function mapLegacyProspectColumns(q: RdvQualificationPayload) {
  const tailleMap: Record<string, string> = {
    independant: '1-10',
    '1-10': '1-10',
    '11-49': '10-50',
    '50-299': '50-250',
    '300+': '250+',
  };
  const niveauMap: Record<string, string> = {
    pas_encore: 'jamais',
    un_peu: 'teste',
    regulierement: 'oui_regulier',
    avancee: 'oui_regulier',
  };
  const objectifFromBesoin = (b: string): string => {
    if (b === 'administratif' || b === 'cr-chantier') return 'temps_admin';
    if (b === 'automatisation' || b === 'outils-sur-mesure') return 'automatisation';
    if (b === 'communication') return 'marketing';
    if (b === 'rh') return 'recrutement';
    if (b === 'commercial') return 'prospection';
    return 'autre';
  };

  return {
    secteur: 'btp',
    taille_entreprise_legacy: q.taille_entreprise
      ? tailleMap[q.taille_entreprise] ?? '1-10'
      : null,
    niveau_ia_legacy: q.niveau_ia ? niveauMap[q.niveau_ia] ?? 'jamais' : null,
    objectif_legacy: q.besoins?.[0] ? objectifFromBesoin(q.besoins[0]) : 'autre',
  };
}

export function computeRdvLeadScore(q: RdvQualificationPayload): number {
  let score = 20; // BTP implicite
  const taille = q.taille_entreprise;
  if (taille === '11-49') score += 15;
  if (taille === '50-299') score += 20;
  if (taille === '300+') score += 15;
  if (q.niveau_ia === 'regulierement' || q.niveau_ia === 'avancee') score += 10;
  if (q.niveau_ia === 'un_peu') score += 5;
  if (q.besoins?.includes('former-equipes')) score += 10;
  if (q.echeance === 'asap' || q.echeance === 'mois') score += 10;
  if ((q.besoins?.length ?? 0) >= 3) score += 5;
  return Math.min(100, score);
}

export function buildProjetSummary(q: RdvQualificationPayload): string {
  const parts: string[] = [];
  if (q.probleme?.trim()) parts.push(q.probleme.trim());
  if (q.priorite_ao) {
    parts.push(`Priorité AO/DCE : ${labelFor(RDV_PRIORITE_AO, q.priorite_ao)}`);
  }
  return parts.join('\n\n') || '';
}
