import { BEWORK_APP_PATHS } from '@/lib/external-site-urls';

/** Lexique BTP interactif (app.laureolivie.fr) — source unique pour /ressources et JSON-LD */
export const RESSOURCES_LEXIQUE = {
  url: BEWORK_APP_PATHS.lexique,
  title: 'Lexique & apprentissage BTP',
  heading: 'Lexique BTP gratuit — vocabulaire chantier & marchés publics',
  description:
    'Comprendre le vocabulaire des marchés publics et du chantier : parcours guidés, dictionnaire de 146 termes, flashcards et quiz. Gratuit, sans inscription — ressource pédagogique BeWork signée Laure Olivié (OFC, Qualiopi).',
  schemaName: 'Lexique & apprentissage BTP — BeWork',
  schemaDescription:
    'Lexique BTP interactif : 146 définitions (DCE, CCTP, OS, PPSPS, RE2020…), 9 parcours pédagogiques, flashcards et quiz de révision. Gratuit, accessible sur app.laureolivie.fr.',
  termCount: 146,
  parcoursCount: 9,
  modes: [
    { id: 'parcours', label: 'Parcours guidés', description: 'Marchés publics, DCE, chantier, sécurité, RE2020…' },
    { id: 'dictionnaire', label: 'Dictionnaire', description: '146 termes BTP expliqués en langage simple' },
    { id: 'flashcards', label: 'Flashcards', description: 'Révision active des sigles et définitions' },
    { id: 'quiz', label: 'Quiz', description: 'Tester ses acquis sur le vocabulaire terrain' },
  ],
  parcours: [
    { title: 'Répondre à un marché public', duration: '5 min', steps: 4 },
    { title: 'Décrypter le DCE', duration: '4 min', steps: 3 },
    { title: 'Sur le chantier au quotidien', duration: '5 min', steps: 3 },
    { title: 'Sécurité : l’essentiel', duration: '3 min', steps: 2 },
    { title: 'Comprendre la RE2020', duration: '5 min', steps: 4 },
    { title: 'Suivi & exécution de chantier', duration: '7 min', steps: 6 },
    { title: 'Marché privé promoteur', duration: '5 min', steps: 5 },
    { title: 'Gérer la sous-traitance', duration: '4 min', steps: 4 },
    { title: 'Plateforme et compactage', duration: '3 min', steps: 2 },
  ],
} as const;
