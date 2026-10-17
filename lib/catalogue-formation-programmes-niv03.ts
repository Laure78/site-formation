import type { ProgrammeFormationBloc } from '@/components/formations/catalogue/ProgrammeFormationBlocs';

/** Programme NIV-03 — source programmes-ofc-2026-10-17.json */
export const NIV03_PROGRAMME_BLOCS: readonly ProgrammeFormationBloc[] = [
  {
    heading: 'ACCUEIL — Accueil, cadrage et positionnement',
    meta: '15 min',
    objectifs: [
      'Ouverture de session',
      'Émargement, présentation des objectifs et du déroulé',
      'Recueil des attentes et auto-positionnement d’entrée sur les objectifs visés',
      'Présentation du chantier fil rouge : un chantier de bâtiment, du CCTP à la réception',
    ],
    livrable: 'Attentes recueillies et fil rouge de la session posé',
  },
  {
    heading: 'MODULE 1 — Installation et démarrage de chantier',
    meta: '1 h 40',
    objectifs: [
      'Bibliothèque de skills',
      'Activer l’option « Exécution de code » et accéder à la bibliothèque BTP',
      'Utiliser un skill, l’adapter à sa charte, en créer un nouveau',
      'Analyse CCTP, DPGF et DTU',
      'Ouvrages, contraintes, points d’arrêt et DTU applicables',
      'Vérification de 5 points dans les PDF d’origine',
      'Lancer le chantier',
      'Plan d’installation, DICT, fiches techniques et agréments matériaux',
      'OS de démarrage, constat d’état des lieux, trame de planning prévisionnel',
    ],
    livrable: 'Synthèse de démarrage + skills « Analyse CCTP/DPGF », « DICT », « OS » et « Planning »',
  },
  {
    heading: 'MODULE 2 — Sécurité de chantier',
    meta: '1 h',
    objectifs: [
      'PPSPS',
      'Structure réglementaire complète adaptée au corps d’état et au chantier',
      'Évaluation des risques et déchets',
      'DUERP de chantier, fiches de prévention et consignes',
      'SOGED : organisation, tri et traçabilité des déchets',
      'Contrôle',
      'Relecture et validation par le responsable sécurité avant signature — l’IA ne garantit pas la conformité',
    ],
    livrable: 'Skills « PPSPS », « DUERP » et « SOGED » prêts à l’emploi',
  },
  {
    heading: 'MODULE 3 — Gestion de chantier au quotidien',
    meta: '2 h',
    objectifs: [
      'Réunions et comptes rendus',
      'CR par corps d’état, observations numérotées, points non soldés (levé / en cours / en attente)',
      'Génération à partir de notes ou d’une dictée transcrite',
      'Suivi et pilotage',
      'Tableau d’actions : décision, action, responsable, échéance',
      'Avancement déclaré comparé au planning, ordre du jour de réunion, journal de chantier',
      'Approvisionnements, sous-traitants et coûts',
      'Bons de commande, comparatif fournisseurs, DC4 et dossier d’agrément',
      'Métré et devis de travaux supplémentaires — montants validés par le professionnel',
    ],
    livrable: 'CR de chantier + tableau des actions + ordre du jour de réunion',
  },
  {
    heading: 'MODULE 4 — Administratif jusqu’à la réception',
    meta: '1 h 50',
    objectifs: [
      'Situations de travaux',
      'Situations d’avancement mensuelles et états d’acompte',
      'Réception et réserves',
      'PV de réception, liste des réserves par lot',
      'Suivi et constats de levée des réserves',
      'DOE et courriers',
      'Constitution du DOE, relances et courriers de clôture',
      'Brouillons de mise en demeure ou de réclamation, à faire valider',
    ],
    livrable: 'Skills « Situations », « PV de réserves », « DOE » et « Assistant juridique » + accès à la bibliothèque de 20+ skills BTP',
  },
  {
    heading: 'CLÔTURE — Bilan, plan d’action et évaluation',
    meta: '15 min',
    objectifs: [
      'Clôture de session',
      'Prise de rendez-vous du point de suivi en visio à J+30',
      'Auto-positionnement de sortie et mesure de la progression sur les objectifs',
      'Plan d’action individuel : 3 actions concrètes à mettre en place à 30 jours',
      'Questionnaire de satisfaction à chaud et remise des attestations',
    ],
    livrable: 'Plan d’action individuel à 30 jours + attestation individuelle de fin de formation',
  },
];

export const NIV03_PEDAGOGICAL_METHODS = [
  '70 % pratique / 30 % théorie',
  'Présentiel en Île-de-France uniquement — outils enseignés : Claude et ChatGPT.',
  'Un ordinateur portable par participant, connexion internet. Compte Claude Pro recommandé (environ 18 € HT/mois, à la charge de l’entreprise, non inclus). Documents de chantier anonymisés : CCTP, DPGF, CR, modèles de courriers',
] as const;
