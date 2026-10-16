import type { ProgrammeFormationBloc } from '@/components/formations/catalogue/ProgrammeFormationBlocs';

export const NIV03_PROGRAMME_BLOCS: readonly ProgrammeFormationBloc[] = [
  {
    heading: 'Module 1 — Installation & démarrage de chantier',
    meta: '60 min · Bibliothèque & skills CCTP, DPGF, DTU',
    objective:
      'Préparer le démarrage d’un chantier en extrayant les exigences des pièces avec des skills Claude, puis contrôler dans les sources.',
    objectifs: [
      'Prise en main de la bibliothèque de skills — activer l’option « Exécution de code » et accéder à la bibliothèque BTP mise à disposition',
      'Le principe : utiliser un skill, l’adapter à votre charte, en créer un nouveau (un skill = une « Compétence » dans Claude)',
      'Skill « Analyse CCTP, DPGF & conformité DTU » — extraire ouvrages, contraintes, points d’arrêt et exigences techniques ; générer une trame de DPGF ; identifier les DTU applicables',
      'Cycle : cadrer → déposer les pièces anonymisées → analyser → produire la synthèse → vérifier 5 points dans les PDF d’origine',
      'Préparer et lancer le chantier : plan d’installation, DICT, fiches techniques et agréments matériaux (MOE / BET)',
      'Ordre de service de démarrage, constat d’état des lieux et trame de planning prévisionnel',
    ],
    livrable:
      'Synthèse démarrage + skills « Analyse CCTP, DPGF & DTU », « DICT », « Fiches techniques », « OS de démarrage » et « Planning »',
    controlesHumains:
      'Conformité DTU et pièces marché : retour aux sources — l’IA ne valide pas la conformité.',
    critereEvaluation:
      'Extractions sourcées ; points d’arrêt listés ; écarts marqués comme hypothèses si non confirmés.',
  },
  {
    heading: 'Module 2 — Sécurité de chantier',
    meta: '35 min · Skills PPSPS, DUERP, SOGED',
    objectifs: [
      'Skill « PPSPS » — générer un PPSPS à structure réglementaire complète, adapté au corps d’état et au chantier',
      'Skill « Évaluation des risques » — DUERP de chantier, analyse de risques poste par poste, fiches de prévention et consignes de sécurité',
      'Skill « Gestion des déchets (SOGED) » — schéma d’organisation, tri et traçabilité des déchets de chantier',
    ],
    livrable: 'Skills « PPSPS », « DUERP » et « SOGED » prêts à l’emploi',
  },
  {
    heading: 'Module 3 — Gestion de chantier',
    meta: '70 min · CR, suivi, approvisionnements, sous-traitants, coûts',
    objective:
      'Structurer CR et tableau d’actions, comparer l’avancement au planning, préparer la réunion de chantier.',
    objectifs: [
      'Réunions & comptes rendus — CR par corps d’état, observations numérotées, reprise des points non soldés (Levé / En cours / En attente) ; génération à partir de notes ou d’une dictée transcrite',
      'Exercice : produire CR + tableau (décision, action, responsable, échéance) puis corriger les ambiguïtés',
      'Comparer l’avancement déclaré au planning fourni (analyse tabulaire ChatGPT en démo / pratique selon accès) — préparer l’ordre du jour',
      'Suivi, relances & journal de chantier — tableau de suivi, relances entreprises, constat de retard, rapport journalier',
      'Approvisionnements & sous-traitants — bons de commande, comparatif fournisseurs ; DC4 et dossier d’agrément',
      'Quantités & coûts — métré et devis de travaux supplémentaires ; suivi du déboursé — montants validés par le professionnel',
    ],
    livrable:
      'CR + tableau des actions + skills « Suivi & journal », « Approvisionnements », « Sous-traitants (DC4) », « Métré », « Avenants » et « Budget chantier »',
    controlesHumains:
      'Décisions, destinataires et montants validés avant diffusion ; constats terrain prioritaires sur la synthèse IA.',
    critereEvaluation:
      'Actions traçables ; écarts d’avancement sourcés ; aucune décision inventée.',
  },
  {
    heading: 'Module 4 — Administratif de suivi de chantier',
    meta: '50 min · Situations, réception, DOE, litiges',
    objectifs: [
      'Skill « Situations de travaux » — situations d’avancement mensuelles et états d’acompte',
      'Skill « Réception & réserves » — PV de réception, liste de réserves par lot, suivi et constats de levée',
      'Skills « DOE » & « Assistant juridique » — dossier des ouvrages exécutés, relances et courriers de clôture ; mise en demeure ou mémoire en réclamation (brouillons à valider)',
    ],
    livrable:
      'Skills « Situations », « PV de réserves », « DOE » et « Assistant juridique » — et accès complet à la bibliothèque OFC : 20+ skills classés par phase de chantier',
  },
];

export const NIV03_PEDAGOGICAL_METHODS = [
  '70 % de pratique : chaque participant utilise, adapte et teste les skills sur son ordinateur, à partir de ses vrais documents de chantier.',
  'Bibliothèque incluse : chaque participant repart avec l’accès à plus de 20 skills BTP prêts à l’emploi, classés par phase de chantier.',
  'Fil rouge chronologique : un même chantier de bâtiment sert de support, de l’analyse du CCTP jusqu’à la réception des travaux.',
  'Moyens : un ordinateur portable par participant, un accès internet haut débit et un compte Claude (Pro recommandé). Supports de prompts et fiches méthodes remis à chaque participant.',
] as const;
