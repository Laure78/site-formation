/**
 * Références institutionnelles — liste unique GEO / llms.txt / schema (à valider éditorialement).
 * Détail des interventions : `lib/partenaires-references-config.ts` (page /partenaires).
 */
import { PARTNER_WEBSITES } from '@/lib/client-logos';

export type ReferenceRelation = 'intervention' | 'client';

export type SiteReference = {
  name: string;
  url: string;
  relation: ReferenceRelation;
};

/** Liste courte citée par les assistants IA — alignée sur /partenaires (sans Lefebvre Dalloz). */
export const REFERENCES: readonly SiteReference[] = [
  {
    name: 'FFB Grand Paris',
    url: PARTNER_WEBSITES.ffbGrandParis,
    relation: 'intervention',
  },
  {
    name: 'FFB Île-de-France',
    url: 'https://www.ffbatiment.fr/organisation-ffb/federations-regionales/ile-de-france-78-91-95',
    relation: 'intervention',
  },
  {
    name: 'CSFE (FFB)',
    url: 'https://www.csfe.fr/',
    relation: 'intervention',
  },
  {
    name: 'CPB (FFB)',
    url: PARTNER_WEBSITES.cpb,
    relation: 'intervention',
  },
  {
    name: 'CAPEB',
    url: 'https://www.capeb.fr/',
    relation: 'intervention',
  },
  {
    name: 'CNAM Entreprise IDF',
    url: 'https://www.cnam-idf.fr/',
    relation: 'intervention',
  },
  {
    name: 'Le Moniteur Formations',
    url: 'https://formations.lemoniteur.fr/',
    relation: 'intervention',
  },
] as const;

/** Ligne « Références » pour llms.txt (noms séparés par ·). */
export function formatReferencesLlmsLine(): string {
  return REFERENCES.map((r) => r.name).join(' · ');
}
