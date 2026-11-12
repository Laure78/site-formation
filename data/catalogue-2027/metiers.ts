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
  { id: 'assistant-gestion', label: 'Assistant de gestion', parcoursId: 'assistant-de-gestion-btp' },
  { id: 'referent-ia', label: 'Référent IA', parcoursId: 'referent-ia-btp' },
  { id: 'maitre-oeuvre', label: 'Maître d’œuvre', parcoursId: 'maitre-oeuvre' },
  { id: 'amo-btp', label: 'AMO', parcoursId: 'amo-btp' },
] as const;
