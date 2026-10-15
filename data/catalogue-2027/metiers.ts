import type { MetierId, ParcoursId } from './types';

export type MetierCatalogue = {
  id: MetierId;
  label: string;
  parcoursId: ParcoursId;
};

export const METIERS_CATALOGUE_2027: readonly MetierCatalogue[] = [
  { id: 'dirigeant', label: 'Dirigeant', parcoursId: 'dirigeant-pme-btp' },
  { id: 'charge-affaires', label: 'Chargé d’affaires', parcoursId: 'charge-affaires-btp' },
  { id: 'conducteur-travaux', label: 'Conducteur de travaux', parcoursId: 'conducteur-de-travaux' },
  { id: 'chef-chantier', label: 'Chef de chantier', parcoursId: 'chef-de-chantier' },
  { id: 'chef-equipe', label: 'Chef d’équipe', parcoursId: 'chef-dequipe' },
  { id: 'assistant-gestion', label: 'Assistant de gestion', parcoursId: 'assistant-de-gestion-btp' },
  { id: 'referent-ia', label: 'Référent IA', parcoursId: 'referent-ia-btp' },
] as const;
