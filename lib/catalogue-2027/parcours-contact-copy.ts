import type { ParcoursId } from '@/data/catalogue-2027';

/** Ancres communes — scroll sous le header fixe. */
export const PARCOURS_MODULES_SECTION_ID = 'modules' as const;
export const PARCOURS_CONTACT_SECTION_ID = 'contact-catalogue' as const;

export type ParcoursContactCopy = {
  participantRoleDefault: string;
  messagePlaceholder: string;
  needExample: string;
};

export const PARCOURS_CONTACT_COPY: Record<ParcoursId, ParcoursContactCopy> = {
  'dirigeant-pme-btp': {
    participantRoleDefault: 'Dirigeant de PME BTP',
    messagePlaceholder:
      'Ex. : 4 dirigeants — modules marge, trésorerie et pilotage IA en 2027, format inter ou intra…',
    needExample:
      'Ex. : 4 dirigeants — pilotage des marges chantier, trésorerie et règles d’usage IA, session à partir de 2027 en Île-de-France.',
  },
  'charge-affaires-btp': {
    participantRoleDefault: 'Chargé d’affaires BTP',
    messagePlaceholder:
      'Ex. : modules devis, analyse DCE et mémoire technique — 6 participants, ouverture 2027…',
    needExample:
      'Ex. : 6 chargés d’affaires — devis, réponse aux appels d’offres et mémoire technique avec l’IA, présentiel IDF.',
  },
  'conducteur-de-travaux': {
    participantRoleDefault: 'Conducteur de travaux',
    messagePlaceholder:
      'Ex. : planning, comptes rendus et suivi de chantier — modules choisis, 8 personnes, 2027…',
    needExample:
      'Ex. : 8 conducteurs — planning, comptes rendus et documents chantier avec l’IA, modules à la carte ou parcours complet.',
  },
  'assistant-de-gestion-btp': {
    participantRoleDefault: 'Assistant de gestion BTP',
    messagePlaceholder:
      'Ex. : administratif, facturation et relances — 5 participants, intra entreprise, calendrier 2027…',
    needExample:
      'Ex. : 5 assistants — facturation, relances et organisation documentaire avec l’IA, format intra à Paris.',
  },
  'referent-ia-btp': {
    participantRoleDefault: 'Référent IA BTP',
    messagePlaceholder:
      'Ex. : déploiement IA, assistants métier et gouvernance — 3 profils, modules NUM et DIR, 2027…',
    needExample:
      'Ex. : 3 référents IA — appels d’offres, applications métier et pilotage des usages Claude/ChatGPT en entreprise.',
  },
  'maitre-oeuvre': {
    participantRoleDefault: 'Maître d’œuvre / MOEX',
    messagePlaceholder:
      'Ex. : parcours MOE complet ou modules NUM-08 + Claude — 5 MOEX, intra IDF, 2027…',
    needExample:
      'Ex. : 5 profils MOE — initiation, maîtrise d’œuvre, Claude et assistants — présentiel Île-de-France.',
  },
  'amo-btp': {
    participantRoleDefault: 'AMO / MOA',
    messagePlaceholder:
      'Ex. : modules AMO et appels d’offres — 4 participants, parcours ou à la carte, 2027…',
    needExample:
      'Ex. : 4 profils AMO — assistance maîtrise d’ouvrage et analyse DCE avec l’IA, format inter Paris.',
  },
};

export const PARCOURS_HUB_CONTACT_COPY: ParcoursContactCopy = {
  participantRoleDefault: 'Professionnel du BTP',
  messagePlaceholder:
    'Indiquez le parcours métier visé, les modules retenus ou un parcours complet, l’effectif et la période (2027 ou ultérieure)…',
  needExample:
    'Ex. : parcours chargé d’affaires — devis ou programme — 6 participants — inter ou intra — ouverture 2027 — Île-de-France.',
};
