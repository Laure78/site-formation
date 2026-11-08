/** Données brutes des 5 parcours — sans dépendance modules (évite cycles d’import). */
import type { CatalogueParcours } from './types';

export const PARCOURS_CATALOGUE_2027: readonly CatalogueParcours[] = [
  {
    id: 'dirigeant-pme-btp',
    slug: 'dirigeant-pme-btp',
    metierId: 'dirigeant',
    titre: 'Dirigeant de PME BTP',
    benefice: 'Piloter prix, marges, trésorerie et équipes, puis définir les usages IA prioritaires.',
    objectif:
      'Piloter les prix, les marges, la trésorerie et les équipes, puis définir les usages IA prioritaires.',
    publicCible: 'Dirigeants, associés, futurs repreneurs.',
    prerequis: 'Responsabilité de direction ou projet de reprise d’entreprise BTP.',
    competencesVisees: [
      'Calculer et fixer ses prix',
      'Piloter les marges chantier par chantier',
      'Organiser la trésorerie',
      'Préparer négociations et relances',
      'Manager une équipe de chantier',
      'Piloter l’IA : organisation de chantier et prévention documentaire comme cas d’usage (règles et validation)',
      'Préparer règles d’usage et plan de déploiement IA',
    ],
    etapes: [
      {
        moduleCode: 'DIR-01',
        competence: 'Calculer ses prix de revient et fixer ses prix de vente',
        exercice:
          'Calcul de prix de revient + contrôle assisté par IA (tableur) avec validation humaine des montants',
        livrable: 'Grille prix de revient / prix de vente + grille de contrôle',
      },
      {
        moduleCode: 'DIR-02',
        competence: 'Piloter ses marges chantier par chantier',
        exercice:
          'Analyse de marge fil rouge + synthèse de pilotage assistée (écarts, hypothèses, actions)',
        livrable: 'Tableau de pilotage des marges + note d’aide à la décision',
      },
      {
        moduleCode: 'DIR-03',
        competence: 'Organiser sa trésorerie et anticiper ses besoins',
        exercice:
          'Prévisionnel de trésorerie + modèles de relance assistés (grille avant envoi)',
        livrable: 'Outil de suivi + checklist + modèles de courrier',
      },
      {
        moduleCode: 'COM-02',
        competence: 'Préparer ses négociations et organiser ses relances',
        exercice: 'Plan de relance et simulation',
        livrable: 'Grille de préparation à la négociation',
      },
      {
        moduleCode: 'MAN-02',
        competence: 'Manager une équipe de chantier',
        exercice: 'Cas de management d’équipe',
        livrable: 'Plan de management d’équipe',
      },
      {
        moduleCode: 'DIR-05',
        competence: 'Piloter l’IA : règles d’usage et plan de déploiement',
        exercice:
          'Cartographie usages / données autorisées + règles d’usage et feuille de route 90 jours',
        livrable: 'Plan de déploiement IA + matrice de confidentialité',
      },
    ],
  },
  {
    id: 'charge-affaires-btp',
    slug: 'charge-affaires-btp',
    metierId: 'charge-affaires',
    titre: 'Chargé d’affaires BTP',
    benefice: 'Structurer le chiffrage, la réponse commerciale et le suivi de l’affaire.',
    objectif: 'Structurer le chiffrage, la réponse commerciale et le suivi de l’affaire.',
    publicCible: 'Chargés d’affaires, économistes et commerciaux.',
    prerequis: 'Pratique du chiffrage ou de la réponse aux consultations.',
    competencesVisees: [
      'Construire des devis clairs et rentables',
      'Négocier et relancer',
      'Répondre aux marchés publics',
      'Rédiger un mémoire technique',
      'Suivre avenants et réclamations',
      'Piloter les marges par chantier',
    ],
    etapes: [
      {
        moduleCode: 'COM-01',
        competence: 'Construire des devis clairs et rentables',
        exercice: 'Restructuration d’un devis',
        livrable: 'Trame de devis rentable',
      },
      {
        moduleCode: 'COM-02',
        competence: 'Préparer négociations et relances',
        exercice: 'Plan de relance',
        livrable: 'Grille de négociation',
      },
      {
        moduleCode: 'COM-03',
        competence: 'Répondre aux marchés publics',
        exercice: 'Analyse DCE',
        livrable: 'Checklist candidature',
      },
      {
        moduleCode: 'COM-04',
        competence: 'Rédiger un mémoire technique',
        exercice: 'Section de mémoire technique',
        livrable: 'Plan et section rédigée',
      },
      {
        moduleCode: 'COM-05',
        competence: 'Suivre avenants, TS et réclamations',
        exercice: 'Dossier d’avenant',
        livrable: 'Trame de suivi avenants',
      },
      {
        moduleCode: 'DIR-02',
        competence: 'Piloter les marges chantier',
        exercice: 'Analyse de marge',
        livrable: 'Tableau de marges',
      },
    ],
  },
  {
    id: 'conducteur-de-travaux',
    slug: 'conducteur-de-travaux',
    metierId: 'conducteur-travaux',
    titre: 'Conducteur de travaux',
    benefice: 'Préparer, suivre et coordonner une opération jusqu’à la réception.',
    objectif: 'Préparer, suivre et coordonner une opération jusqu’à la réception.',
    publicCible: 'Conducteurs, aides-conducteurs et chefs de chantier en évolution.',
    prerequis: 'Expérience chantier ou accompagnement d’un conducteur.',
    competencesVisees: [
      'Préparer un chantier de la passation à l’ouverture',
      'Organiser la préparation de chantier avec l’IA (documents, checklist, planning)',
      'Planifier et actualiser les délais avec l’IA',
      'Suivre les coûts et les écarts',
      'Utiliser l’IA dans le suivi documentaire et les tableaux d’actions',
      'Contribuer à la préparation documentaire de la prévention',
      'Préparer la réception',
      'Manager une équipe de chantier',
    ],
    etapes: [
      {
        moduleCode: 'TRA-01',
        competence: 'Préparer et organiser un chantier (passation → ouverture)',
        exercice: 'Dossier de passation / ouverture + checklist IA contrôlée',
        livrable: 'Checklist de préparation et ressources à vérifier',
      },
      {
        moduleCode: 'TRA-02',
        competence: 'Planifier les travaux et coordonner avec l’IA',
        exercice: 'Planning, scénarios d’actualisation face à un aléa',
        livrable: 'Planning prévisionnel et plan d’actions',
      },
      {
        moduleCode: 'TRA-03',
        competence: 'Suivre les coûts',
        exercice: 'Analyse d’écarts',
        livrable: 'Tableau de suivi des coûts',
      },
      {
        moduleCode: 'NUM-07',
        competence: 'IA : suivi documentaire, organisation et actions',
        exercice: 'CCTP → CR → tableau d’actions ; assistant métier cadré',
        livrable: 'Méthode IA de suivi + plan d’actions',
      },
      {
        moduleCode: 'TRA-05',
        competence: 'Préparer la réception',
        exercice: 'Plan de réception',
        livrable: 'Checklist réception / DOE',
      },
      {
        moduleCode: 'MAN-02',
        competence: 'Manager une équipe de chantier',
        exercice: 'Cas de management',
        livrable: 'Plan de management',
      },
    ],
  },
  {
    id: 'assistant-de-gestion-btp',
    slug: 'assistant-de-gestion-btp',
    metierId: 'assistant-gestion',
    titre: 'Assistant de gestion BTP',
    benefice: 'Organiser l’administratif, la facturation et les outils de gestion.',
    objectif: 'Organiser l’administratif, la facturation et les outils de gestion.',
    publicCible: 'Assistants, secrétaires techniques et gestionnaires.',
    prerequis: 'Pratique de l’administratif BTP ou projet d’évolution vers ces missions.',
    competencesVisees: [
      'Bases de l’IA pour les documents professionnels',
      'Gérer l’administratif chantier',
      'Préparer la facturation électronique',
      'Calculer les prix de revient',
      'Organiser recrutement et intégration',
      'Utiliser Excel pour le suivi',
    ],
    etapes: [
      {
        moduleCode: 'NUM-01',
        competence: 'Les bases de l’IA',
        exercice: 'Cas documents BTP',
        livrable: 'Méthode de formulation',
      },
      {
        moduleCode: 'ADM-01',
        competence: 'Administratif chantier',
        exercice: 'Dossier d’affaire',
        livrable: 'Trame situations / pièces',
      },
      {
        moduleCode: 'ADM-02',
        competence: 'Facturation électronique',
        exercice: 'Cartographie du circuit',
        livrable: 'Plan de préparation',
      },
      {
        moduleCode: 'DIR-01',
        competence: 'Prix de revient',
        exercice: 'Calcul de prix',
        livrable: 'Grille de prix',
      },
      {
        moduleCode: 'ADM-03',
        competence: 'Recrutement et intégration',
        exercice: 'Annonce + trame d’entretien',
        livrable: 'Kit recrutement',
      },
      {
        moduleCode: 'NUM-05',
        competence: 'Excel suivi et gestion',
        exercice: 'Classeur de suivi',
        livrable: 'Modèle Excel',
      },
    ],
    varianteOptionnelle: {
      label: 'Après positionnement, retrait possible de NUM-01',
      modulesRetires: ['NUM-01'],
    },
  },
  {
    id: 'referent-ia-btp',
    slug: 'referent-ia-btp',
    metierId: 'referent-ia',
    titre: 'Référent IA BTP',
    benefice:
      'Structurer les usages de l’IA, créer un outil métier et préparer son déploiement.',
    objectif:
      'Structurer les usages de l’IA, créer un outil métier et préparer son déploiement.',
    publicCible: 'Référents IA, dirigeants et profils métier chargés du déploiement.',
    prerequis: 'NUM-01 ou niveau équivalent.',
    competencesVisees: [
      'IA et appels d’offres',
      'Maîtriser Claude pour le BTP',
      'Créer une application métier (variante 14 h)',
      'Cas pratiques : assistants organisation de chantier et prévention documentaire',
      'Préparer règles d’usage et plan de déploiement',
    ],
    mentionDisponibilite:
      'Modules IA disponibles dès maintenant. Parcours complet prévu en 2027.',
    etapes: [
      {
        moduleCode: 'NUM-02',
        competence: 'IA et appels d’offres',
        exercice: 'Dossier DCE fil rouge',
        livrable: 'Méthode IA AO',
      },
      {
        moduleCode: 'NUM-03',
        competence: 'Maîtriser Claude AI',
        exercice: 'Project et skill métier',
        livrable: 'Bibliothèque de trames Claude',
      },
      {
        moduleCode: 'NUM-04',
        competence: 'Créer une application métier (niveau 3 · 14 h)',
        exercice: 'Prototype approfondi, tests et documentation',
        livrable: 'Prototype testé documenté',
      },
      {
        moduleCode: 'DIR-05',
        competence: 'Piloter l’IA dans l’entreprise',
        exercice: 'Règles d’usage et plan',
        livrable: 'Plan de déploiement',
      },
    ],
    initiationComplementaire: {
      label: 'Initiation complémentaire éventuelle (NUM-01)',
      moduleAjoute: 'NUM-01',
    },
  },
] as const;
