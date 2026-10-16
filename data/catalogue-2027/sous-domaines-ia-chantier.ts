/**
 * Sous-domaines transversaux « chantier × IA » — catalogue 2027.
 * Modules référencés par code (pas de duplication de titres / tarifs).
 */
import type { DomaineId, MetierId, ModuleCode } from './types';
import { QSE_SOURCES_OFFICIELLES } from '@/lib/formation-ia-qse-prevention-btp-landing';

export type SousDomaineIaChantierId =
  | 'organisation-chantier-ia'
  | 'securite-prevention-chantier-ia';

export type NiveauMaitriseIa = {
  niveau: 1 | 2 | 3;
  libelle: string;
  objectifObservable: string;
  exercice: string;
  livrable: string;
  controleAcquis: string;
};

export type SourceOfficiellePrevention = {
  label: string;
  href: string;
};

export type SousDomaineIaChantier = {
  id: SousDomaineIaChantierId;
  /** Ancre HTML sur /formations */
  slug: string;
  titre: string;
  beneficeMetier: string;
  presentation: string;
  domainePrincipalId: DomaineId;
  domaineTransversalId: DomaineId;
  /** Modules catalogue — identifiants stables */
  moduleCodes: readonly ModuleCode[];
  publics: readonly string[];
  sujets: readonly string[];
  livrablesPedagogiques: readonly string[];
  niveauxMaitrise: readonly NiveauMaitriseIa[];
  /** Recherche catalogue */
  motsCleRecherche: readonly string[];
  sourcesOfficielles?: readonly SourceOfficiellePrevention[];
  avertissementIa?: string;
  /** Intégration pédagogique par parcours (sans ajout de module). */
  integrationParcours: Partial<
    Record<
      MetierId,
      readonly string[]
    >
  >;
};

const CONTROLE_STANDARD =
  'Informations exactes, données manquantes repérées, cohérence métier et validation humaine avant usage ou diffusion.';

const NIVEAUX_ORGANISATION: readonly NiveauMaitriseIa[] = [
  {
    niveau: 1,
    libelle: 'Niveau 1 — préparer une checklist, une consigne et une synthèse',
    objectifObservable:
      'Produire une checklist de démarrage ou une synthèse courte à partir d’un document métier contrôlé.',
    exercice: 'Extraire les contraintes d’un extrait de CCTP pédagogique et lister les actions avant démarrage.',
    livrable: 'Checklist de préparation.',
    controleAcquis: CONTROLE_STANDARD,
  },
  {
    niveau: 2,
    libelle: 'Niveau 2 — exploiter plusieurs documents et produire des tableaux opérationnels',
    objectifObservable:
      'Construire un planning prévisionnel ou un tableau ressources / approvisionnements à vérifier.',
    exercice:
      'Structurer les phases, dépendances et moyens à partir de durées renseignées ; comparer deux scénarios face à un retard.',
    livrable: 'Planning prévisionnel et tableau des ressources à vérifier.',
    controleAcquis: CONTROLE_STANDARD,
  },
  {
    niveau: 3,
    libelle: 'Niveau 3 — créer un assistant métier réutilisable et organiser sa validation',
    objectifObservable:
      'Configurer un assistant IA de préparation / suivi de chantier avec sources validées et règles de contrôle.',
    exercice:
      'Définir périmètre, documents sources et grille de relecture pour un assistant de suivi de chantier.',
    livrable: 'Assistant documentaire + protocole de validation interne.',
    controleAcquis: CONTROLE_STANDARD,
  },
];

const NIVEAUX_PREVENTION: readonly NiveauMaitriseIa[] = [
  {
    niveau: 1,
    libelle: 'Niveau 1 — préparer une checklist, une consigne et une synthèse',
    objectifObservable:
      'Structurer des observations de terrain et produire une trame d’accueil sécurité ou un rappel EPI.',
    exercice: 'Reformuler des consignes validées pour un quart d’heure sécurité pédagogique.',
    livrable: 'Trame d’accueil sécurité ou support de quart d’heure sécurité.',
    controleAcquis: CONTROLE_STANDARD,
  },
  {
    niveau: 2,
    libelle: 'Niveau 2 — exploiter plusieurs documents et produire des tableaux opérationnels',
    objectifObservable:
      'Organiser les informations utiles à la préparation d’un PPSPS (selon le contexte) et produire une checklist de points à vérifier.',
    exercice:
      'Compléter une trame d’analyse des risques à partir d’informations chantier vérifiées — sans promesse de conformité.',
    livrable: 'Checklist de points à vérifier + tableau d’actions de prévention.',
    controleAcquis: CONTROLE_STANDARD,
  },
  {
    niveau: 3,
    libelle: 'Niveau 3 — créer un assistant métier réutilisable et organiser sa validation',
    objectifObservable:
      'Créer un assistant documentaire s’appuyant sur consignes et sources validées, avec contrôle humain systématique.',
    exercice:
      'Paramétrer un assistant Claude ou ChatGPT sur procédures internes validées (accueil, EPI, signalement).',
    livrable: 'Assistant documentaire + protocole de validation.',
    controleAcquis: CONTROLE_STANDARD,
  },
];

export const SOUS_DOMAINES_IA_CHANTIER: readonly SousDomaineIaChantier[] = [
  {
    id: 'organisation-chantier-ia',
    slug: 'organisation-chantier-ia',
    titre: 'Organisation de chantier avec l’IA',
    beneficeMetier:
      'Préparer les chantiers, structurer les plannings et suivre les actions sur vos documents — avec ChatGPT et Claude, sous contrôle métier.',
    presentation:
      'Utilisez ChatGPT et Claude pour préparer vos chantiers, structurer les plannings, organiser les ressources et suivre les actions. Travaillez sur vos documents métier et contrôlez les résultats avant leur utilisation.',
    domainePrincipalId: 'travaux',
    domaineTransversalId: 'numerique-ia',
    moduleCodes: ['TRA-01', 'TRA-02', 'TRA-04', 'NUM-07'],
    publics: [
      'Conducteurs de travaux et aides-conducteurs',
      'Chefs de chantier',
      'Chefs d’équipe (consignes et répartition)',
      'Référents IA (cas assistants métier)',
    ],
    sujets: [
      'Extraire les contraintes d’organisation d’un CCTP et des documents de chantier',
      'Préparer une liste des actions avant démarrage',
      'Structurer les phases de travaux et leurs dépendances',
      'Préparer un planning à partir de durées et de moyens renseignés',
      'Répartir les tâches, les équipes et les besoins matériels',
      'Organiser les approvisionnements et les livraisons',
      'Préparer les informations nécessaires à un plan d’installation de chantier',
      'Transformer un compte rendu en tableau d’actions',
      'Comparer des scénarios face à un retard ou à un aléa',
      'Créer un assistant IA de préparation et de suivi de chantier',
    ],
    livrablesPedagogiques: [
      'Checklist de préparation',
      'Planning prévisionnel à vérifier',
      'Tableau des ressources et approvisionnements',
      'Plan d’actions avec responsables et échéances',
    ],
    niveauxMaitrise: NIVEAUX_ORGANISATION,
    motsCleRecherche: [
      'organisation chantier',
      'planning',
      'CCTP',
      'passation',
      'approvisionnement',
      'compte rendu',
      'tableau d’actions',
    ],
    sourcesOfficielles: [
      {
        label: 'INRS — Préparation et organisation d’un chantier BTP',
        href: 'https://www.inrs.fr/metiers/btp/preparation-organisation-chantier.html',
      },
      {
        label: 'INRS — Bâtiment et travaux publics (anticipation et coordination)',
        href: 'https://www.inrs.fr/metiers/btp.html',
      },
    ],
    avertissementIa:
      'L’IA aide à structurer et synthétiser des documents ; elle ne remplace pas la visite de chantier, les validations techniques ni les décisions d’organisation.',
    integrationParcours: {
      'conducteur-travaux': [
        'Préparation et organisation du chantier avec l’IA (TRA-01, NUM-07)',
        'Planification et coordination avec l’IA (TRA-02)',
        'Préparation documentaire de la prévention (complément TQP-01 en module ciblé)',
        'Suivi des actions et actualisation (TRA-04, NUM-07)',
      ],
      'chef-chantier': [
        'Organisation quotidienne et planning (TRA-02)',
        'Comptes rendus et tableaux d’actions (TRA-04)',
        'Anticipation des besoins et des livraisons (TRA-01 / TRA-02)',
      ],
      'chef-equipe': [
        'Répartition des tâches et consignes (MAN-01)',
        'Rappels de prévention (TQP-01)',
      ],
      dirigeant: [
        'Cas d’usage organisation de chantier intégrés au pilotage IA (DIR-05 — règles d’usage et validation)',
      ],
      'referent-ia': [
        'Cas pratique : assistant de préparation et de suivi de chantier (NUM-07, TRA-01 / TRA-02)',
      ],
    },
  },
  {
    id: 'securite-prevention-chantier-ia',
    slug: 'securite-prevention-chantier-ia',
    titre: 'Sécurité et prévention de chantier avec l’IA',
    beneficeMetier:
      'Préparer supports de prévention, trames et tableaux d’actions à partir d’informations vérifiées — sans promesse de conformité automatique.',
    presentation:
      'Utilisez ChatGPT et Claude pour préparer vos supports de prévention, structurer les informations de sécurité et faciliter leur transmission aux équipes. Les productions sont vérifiées et adaptées aux conditions réelles du chantier par les personnes compétentes.',
    domainePrincipalId: 'technique-qualite-prevention',
    domaineTransversalId: 'numerique-ia',
    moduleCodes: ['TQP-01', 'MAN-01', 'NUM-07'],
    publics: [
      'Chefs de chantier et chefs d’équipe',
      'Conducteurs de travaux',
      'Référents sécurité / QSE contribuant aux documents',
      'Référents IA (assistants documentaires)',
    ],
    sujets: [
      'Structurer les observations de terrain et les points de vigilance',
      'Préparer des trames d’analyse des risques à compléter',
      'Organiser les informations utiles à la préparation d’un PPSPS, selon le contexte',
      'Préparer un accueil sécurité',
      'Rédiger des supports de quart d’heure sécurité',
      'Reformuler des consignes pour faciliter leur compréhension',
      'Préparer des rappels sur les EPI et les protections collectives',
      'Structurer le signalement d’une situation dangereuse',
      'Transformer des observations en tableau d’actions de prévention',
      'Créer un assistant documentaire utilisant des consignes et sources validées',
    ],
    livrablesPedagogiques: [
      'Trame d’accueil sécurité',
      'Support de quart d’heure sécurité',
      'Checklist de points à vérifier',
      'Tableau de suivi des actions de prévention',
    ],
    niveauxMaitrise: NIVEAUX_PREVENTION,
    motsCleRecherche: [
      'sécurité',
      'prévention',
      'PPSPS',
      'accueil sécurité',
      'EPI',
      'quart d’heure sécurité',
      'risques',
    ],
    sourcesOfficielles: [
      ...QSE_SOURCES_OFFICIELLES,
      {
        label: 'INRS — Coordination SPS (PGCSPS, PPSPS, outils)',
        href: 'https://www.inrs.fr/metiers/btp/coordination-sps.html',
      },
      {
        label: 'INRS — Outils de la coordination SPS',
        href: 'https://www.inrs.fr/metiers/btp/coordination-sps/outils.html',
      },
      {
        label: 'OPPBTP — Organisme professionnel de prévention du BTP',
        href: 'https://www.oppbtp.fr/',
      },
    ],
    avertissementIa:
      'Aide documentaire uniquement : pas de conformité automatique, pas d’habilitation sécurité, pas de validation réglementaire par l’IA. Une analyse de photo par IA n’est pas un diagnostic exhaustif des risques.',
    integrationParcours: {
      'conducteur-travaux': [
        'Préparation documentaire de la prévention (module TQP-01 en ciblage ou parcours chef de chantier)',
        'Suivi des actions de prévention (NUM-07 — tableaux d’actions)',
      ],
      'chef-chantier': [
        'Préparation des accueils et animations sécurité (TQP-01)',
        'Remontée des observations et suivi des actions (TQP-01, TRA-04)',
      ],
      'chef-equipe': [
        'Préparation des consignes et rappels de prévention (MAN-01, TQP-01)',
        'Transmission des informations au chef de chantier',
      ],
      dirigeant: [
        'Définir les règles d’usage IA sur documents de prévention (DIR-05)',
      ],
      'referent-ia': [
        'Cas pratique : assistant documentaire prévention avec sources validées (TQP-01, NUM-07, NUM-03)',
      ],
    },
  },
];

export function getSousDomaineIaChantierById(
  id: SousDomaineIaChantierId,
): SousDomaineIaChantier | undefined {
  return SOUS_DOMAINES_IA_CHANTIER.find((s) => s.id === id);
}

export function getSousDomainesForModule(code: ModuleCode): SousDomaineIaChantier[] {
  return SOUS_DOMAINES_IA_CHANTIER.filter((s) => s.moduleCodes.includes(code));
}

export function getThematiquesForParcoursMetier(
  metierId: MetierId,
): SousDomaineIaChantier[] {
  return SOUS_DOMAINES_IA_CHANTIER.filter(
    (s) => (s.integrationParcours[metierId]?.length ?? 0) > 0,
  );
}

export function moduleMatchesThematique(
  code: ModuleCode,
  thematiqueId: SousDomaineIaChantierId | 'all',
): boolean {
  if (thematiqueId === 'all') return true;
  const t = getSousDomaineIaChantierById(thematiqueId);
  return t?.moduleCodes.includes(code) ?? false;
}
