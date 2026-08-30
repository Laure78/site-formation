/**
 * Contenu pédagogique — formation Cursor BTP (NIV-06).
 * Source : programme OFC « Créer ses outils métier BTP avec Cursor ».
 */
import { LINKS } from '@/lib/internal-links';

export const CURSOR_FORMATION_H1 = 'Créer ses outils métier BTP avec Cursor';

export const CURSOR_FORMATION_SUBTITLE =
  'Comprendre le développement web et construire vos applications internes avec l’IA — atelier avancé sur vos besoins réels.';

export const CURSOR_FORMATION_PROMESSE =
  'Passez de vos tableaux Excel et processus manuels à un premier outil métier BTP construit avec l’IA — sans promettre de devenir développeur professionnel en une demi-journée.';

export const CURSOR_PRUDENCE_FORMULATION =
  'Cursor aide à cadrer, générer et itérer sur un outil interne. La validation métier, la sécurité des données et les choix d’architecture restent sous votre responsabilité — un développeur ou un DSI peut être nécessaire selon la criticité du projet.';

export const CURSOR_CAS_USAGE_AVANTAGE = [
  'Suivi des situations de travaux',
  'Comptes rendus de chantier',
  'Suivi documentaire chantier (DICT, PPSPS, attestations)',
  'Comparaison d’offres fournisseurs ou sous-traitants',
  'Suivi des réserves',
  'Bibliothèque de mémoire technique',
] as const;

export const CURSOR_LIVRABLES = [
  'Environnement Cursor configuré',
  'Règles de projet métier BTP',
  'Méthode de cadrage avant développement',
  'Premier outil métier fonctionnel',
  'Checklist de contrôle avant mise en service',
  'Lexique du développement web (accessible aux non-développeurs)',
] as const;

export const CURSOR_METHODE_PEDAGOGIQUE =
  '70 % pratique / 30 % théorie — manipulations sur le poste du participant, de préférence avec des données professionnelles anonymisées.';

export const CURSOR_PROGRAMME_MODULES = [
  {
    heading: 'Module 1 — Comprendre le développement web sans être développeur',
    meta: '45 min',
    points: [
      'Interface, front, back, base de données, serveur, hébergement, HTTPS, API, Git — exemples BTP',
      'Assistants conversationnels vs générateurs d’applications vs éditeurs agentiques (Cursor, Claude Code)',
      'Distinguer tâche IA, automatisation, application métier et besoin nécessitant un logiciel existant',
    ],
  },
  {
    heading: 'Module 2 — Configurer et piloter Cursor',
    meta: '60 min',
    points: [
      'Installation, interface, explorateur, terminal et agent',
      'Fournir du contexte : fichiers, dossiers, documentation, captures, règles métier',
      'Ask, Agent, Plan — logique Besoin → questions → plan → validation → développement',
      'Règles entreprise : vocabulaire BTP, dates, unités, montants HT, interdictions',
      'Confidentialité : données chantier, clients, salariés, secrets et clés API',
    ],
  },
  {
    heading: 'Module 3 — Atelier : construire son premier outil métier BTP',
    meta: '75 min',
    points: [
      'Sélection d’un cas d’usage réel (situations, CR, tableau documentaire, mémoire technique…)',
      'Cadrage : utilisateur, problème, entrées, résultat, contraintes, critère de réussite',
      'Plan Cursor → relecture → construction progressive → tests → corrections',
    ],
  },
  {
    heading: 'Module 4 — Tester, publier et sécuriser',
    meta: '60 min',
    points: [
      'Git, GitHub, dépôt privé, commits et retour arrière — notions essentielles',
      'Hébergement, URL, HTTPS, déploiement d’un outil simple',
      'Contrôles : erreurs, imports, calculs, exports, mobile',
      'Limites : quand faire intervenir développeur, DSI ou spécialiste cybersécurité',
    ],
  },
] as const;

export const CURSOR_FORMATION_CHOICE = [
  {
    title: 'Créer ses assistants IA métier',
    description:
      'Vous voulez un assistant spécialisé qui analyse vos documents et applique vos instructions.',
    href: LINKS.prendreRdv,
  },
  {
    title: 'Automatiser les workflows BTP',
    description: 'Vous voulez faire communiquer plusieurs outils et supprimer des tâches répétitives.',
    href: LINKS.prendreRdv,
  },
  {
    title: 'Créer ses outils métier avec Cursor',
    description: 'Vous voulez construire votre propre application interne adaptée à vos méthodes.',
    href: LINKS.formationCursorBtp,
    current: true,
  },
  {
    title: 'Maîtriser Claude pour le BTP',
    description: 'Vous souhaitez exploiter l’écosystème Claude (Projects, Cowork, Skills).',
    href: LINKS.formationMaitriserClaudeAiBtp,
  },
  {
    title: 'Déployer l’IA dans votre PME',
    description: 'Vous souhaitez définir une stratégie IA à l’échelle de l’entreprise.',
    href: LINKS.formationPmeBtp,
  },
] as const;

export const CURSOR_MAILLAGE = [
  { label: 'Découvrir l’IA générative dans le BTP', href: LINKS.formationIaBtpNiveau1BatimentTp },
  { label: 'Automatiser les workflows du BTP', href: LINKS.prendreRdv },
  { label: 'Créer ses assistants IA métier', href: LINKS.prendreRdv },
  { label: 'Déployer l’IA dans une PME du BTP', href: LINKS.formationPmeBtp },
  { label: 'Former un référent IA BTP', href: LINKS.prendreRdv },
] as const;

export const CURSOR_FAQ = [
  {
    q: 'Faut-il savoir coder pour suivre cette formation ?',
    a: 'Non. Vous devez en revanche avoir déjà utilisé un assistant IA et savoir rédiger une consigne structurée, ou avoir suivi une formation d’initiation IA BTP. L’objectif est de piloter Cursor, pas de devenir développeur en 4 h.',
  },
  {
    q: 'Cursor remplace-t-il un développeur ?',
    a: 'Non. Cursor aide à construire un premier outil simple. Pour des projets critiques, multi-utilisateurs ou soumis à des exigences fortes de sécurité, l’intervention d’un développeur ou d’un DSI reste nécessaire.',
  },
  {
    q: 'Quelle différence avec la formation Claude AI BTP ?',
    a: 'La formation Claude exploite l’écosystème Claude (Projects, Cowork, Skills). Cursor sert à concevoir et faire évoluer une application métier interne avec un éditeur agentique.',
  },
  {
    q: 'Peut-on travailler sur nos propres données ?',
    a: 'Oui, de préférence anonymisées. Prévoyez un jeu de données professionnelles et les droits d’installation (Cursor, GitHub) sur votre poste.',
  },
] as const;
