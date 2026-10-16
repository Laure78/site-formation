/**
 * 7 parcours métiers — catalogue 2027.
 * Les parcours référencent les codes modules ; contenus non dupliqués.
 */
import { prixParcoursDepuisDurees } from './tarifs';
import { getModuleByCode } from './modules';
import type {
  CatalogueParcours,
  DisponibiliteCommerciale,
  ModuleCode,
  ModuleDureeHeures,
  ParcoursId,
  StatutEditorial,
} from './types';

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
      'Planifier et actualiser les délais',
      'Suivre les coûts et les écarts',
      'Utiliser l’IA dans le suivi documentaire',
      'Préparer la réception',
      'Manager une équipe de chantier',
    ],
    etapes: [
      {
        moduleCode: 'TRA-01',
        competence: 'Préparer un chantier',
        exercice: 'Dossier de passation / ouverture',
        livrable: 'Checklist de préparation',
      },
      {
        moduleCode: 'TRA-02',
        competence: 'Planifier les travaux',
        exercice: 'Planning et actualisation',
        livrable: 'Planning initial',
      },
      {
        moduleCode: 'TRA-03',
        competence: 'Suivre les coûts',
        exercice: 'Analyse d’écarts',
        livrable: 'Tableau de suivi des coûts',
      },
      {
        moduleCode: 'NUM-07',
        competence: 'IA et conduite de travaux',
        exercice: 'Suivi documentaire assisté',
        livrable: 'Méthode IA de suivi',
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
    id: 'chef-de-chantier',
    slug: 'chef-de-chantier',
    metierId: 'chef-chantier',
    titre: 'Chef de chantier',
    benefice: 'Organiser le terrain, encadrer l’équipe et transmettre une information fiable.',
    objectif: 'Organiser le terrain, encadrer l’équipe et transmettre une information fiable.',
    publicCible: 'Chefs de chantier et chefs d’équipe expérimentés.',
    prerequis: 'Expérience d’encadrement terrain.',
    competencesVisees: [
      'Planifier et actualiser les délais',
      'Animer réunions et rédiger les CR',
      'Manager une équipe de chantier',
      'Gérer les tensions',
      'Contribuer à la prévention sur chantier',
    ],
    etapes: [
      {
        moduleCode: 'TRA-02',
        competence: 'Planifier les travaux',
        exercice: 'Planning terrain',
        livrable: 'Méthode d’actualisation des délais',
      },
      {
        moduleCode: 'TRA-04',
        competence: 'Animer réunions et CR',
        exercice: 'Rédaction d’un CR',
        livrable: 'Trame de CR',
      },
      {
        moduleCode: 'MAN-02',
        competence: 'Manager une équipe de chantier',
        exercice: 'Cas d’encadrement',
        livrable: 'Plan de management',
      },
      {
        moduleCode: 'MAN-03',
        competence: 'Gérer les tensions',
        exercice: 'Entretien difficile',
        livrable: 'Grille d’entretien',
      },
      {
        moduleCode: 'TQP-01',
        competence: 'Contribuer à la prévention',
        exercice: 'Accueil sécurité',
        livrable: 'Checklist contribution prévention',
      },
    ],
  },
  {
    id: 'chef-dequipe',
    slug: 'chef-dequipe',
    metierId: 'chef-equipe',
    titre: 'Chef d’équipe',
    benefice: 'Répartir les tâches, donner les consignes et accompagner les collaborateurs.',
    objectif: 'Répartir les tâches, donner les consignes et accompagner les collaborateurs.',
    publicCible: 'Chefs d’équipe et compagnons en évolution.',
    prerequis: 'Expérience terrain et projet d’évolution vers l’encadrement.',
    competencesVisees: [
      'Organiser et transmettre les consignes',
      'Gérer les tensions',
      'Accueillir et intégrer un salarié ou un apprenti',
      'Contribuer à la prévention',
    ],
    etapes: [
      {
        moduleCode: 'MAN-01',
        competence: 'Devenir chef d’équipe',
        exercice: 'Plan de journée et consignes',
        livrable: 'Trame d’organisation d’équipe',
      },
      {
        moduleCode: 'MAN-03',
        competence: 'Gérer les tensions',
        exercice: 'Mise en situation',
        livrable: 'Grille d’entretien',
      },
      {
        moduleCode: 'MAN-04',
        competence: 'Accueillir et intégrer',
        exercice: 'Parcours d’intégration',
        livrable: 'Checklist d’accueil',
      },
      {
        moduleCode: 'TQP-01',
        competence: 'Contribuer à la prévention',
        exercice: 'Accueil sécurité',
        livrable: 'Checklist prévention',
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
      dureeHeures: 35,
      prixInterHt: 1550,
    },
  },
  {
    id: 'referent-ia-btp',
    slug: 'referent-ia-btp',
    metierId: 'referent-ia',
    titre: 'Référent IA BTP',
    benefice: 'Structurer les usages IA, réaliser un outil et préparer le déploiement.',
    objectif: 'Structurer les usages IA, réaliser un outil et préparer le déploiement.',
    publicCible: 'Référents IA, dirigeants et profils métier chargés du déploiement.',
    prerequis: 'NUM-01 ou niveau équivalent.',
    competencesVisees: [
      'IA et appels d’offres',
      'Maîtriser Claude pour le BTP',
      'Créer une application métier (variante 14 h)',
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
        competence: 'Créer une application métier (14 h)',
        exercice: 'Prototype approfondi, tests et documentation',
        livrable: 'Prototype testé documenté',
        dureeHeuresOverride: 14,
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
      dureeHeures: 39,
      prixInterHt: 1670,
    },
  },
] as const;

export type ParcoursComputed = CatalogueParcours & {
  moduleCount: number;
  dureeHeures: number;
  joursFormation: number;
  prixInterHt: number;
  disponibilite: DisponibiliteCommerciale;
  statutEditorial: StatutEditorial;
  modulesCodes: readonly ModuleCode[];
};

function dureeEtape(etape: CatalogueParcours['etapes'][number]): number {
  if (etape.dureeHeuresOverride) return etape.dureeHeuresOverride;
  const mod = getModuleByCode(etape.moduleCode);
  return mod?.dureeHeures ?? 0;
}

export function computeParcours(parcours: CatalogueParcours): ParcoursComputed {
  const modulesForPrix = parcours.etapes.map((e) => ({
    code: e.moduleCode,
    dureeHeures: dureeEtape(e),
  }));
  const dureeHeures = modulesForPrix.reduce((s, m) => s + m.dureeHeures, 0);
  const prixInterHt = prixParcoursDepuisDurees(modulesForPrix);
  const joursEntiers = modulesForPrix
    .filter((m) => m.code !== 'NUM-01')
    .reduce((s, m) => s + m.dureeHeures / 7, 0);
  const hasNum01 = modulesForPrix.some((m) => m.code === 'NUM-01');
  const joursFormation = hasNum01 ? joursEntiers + 0.5 : joursEntiers;

  const modStatuses = parcours.etapes.map((e) => getModuleByCode(e.moduleCode));
  const allDisponibles = modStatuses.every((m) => m?.disponibilite === 'disponible');
  const allValides = modStatuses.every((m) => m?.statutEditorial === 'programme-valide');

  return {
    ...parcours,
    moduleCount: parcours.etapes.length,
    dureeHeures,
    joursFormation: Math.round(joursFormation * 10) / 10,
    prixInterHt,
    disponibilite: allDisponibles ? 'disponible' : 'ouverture-2027',
    statutEditorial: allValides ? 'programme-valide' : 'programme-en-preparation',
    modulesCodes: parcours.etapes.map((e) => e.moduleCode),
  };
}

export function getAllParcoursComputed(): ParcoursComputed[] {
  return PARCOURS_CATALOGUE_2027.map(computeParcours);
}

export function getParcoursById(id: ParcoursId | string): CatalogueParcours | undefined {
  return PARCOURS_CATALOGUE_2027.find((p) => p.id === id);
}

export function getParcoursBySlug(slug: string): CatalogueParcours | undefined {
  return PARCOURS_CATALOGUE_2027.find((p) => p.slug === slug);
}

export function getParcoursByMetier(metierId: string): CatalogueParcours | undefined {
  return PARCOURS_CATALOGUE_2027.find((p) => p.metierId === metierId);
}

export function libelleJoursFormation(jours: number): string {
  if (jours === 0.5) return '4 h';
  if (Number.isInteger(jours)) return `${jours} jour${jours > 1 ? 's' : ''}`;
  const entiers = Math.floor(jours);
  return `${entiers} jour${entiers > 1 ? 's' : ''} + 4 h`;
}

export function assertCatalogueParcoursIntegrity(): {
  ok: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  if (PARCOURS_CATALOGUE_2027.length !== 7) {
    errors.push(`Attendu 7 parcours, trouvé ${PARCOURS_CATALOGUE_2027.length}`);
  }
  const expected: Record<string, { h: number; prix: number; jours: number }> = {
    'dirigeant-pme-btp': { h: 49, prix: 2170, jours: 7 },
    'charge-affaires-btp': { h: 49, prix: 2170, jours: 7 },
    'conducteur-de-travaux': { h: 56, prix: 2480, jours: 8 },
    'chef-de-chantier': { h: 42, prix: 1860, jours: 6 },
    'chef-dequipe': { h: 35, prix: 1550, jours: 5 },
    'assistant-de-gestion-btp': { h: 39, prix: 1670, jours: 5.5 },
    'referent-ia-btp': { h: 35, prix: 1550, jours: 5 },
  };
  for (const p of getAllParcoursComputed()) {
    const exp = expected[p.id];
    if (!exp) {
      errors.push(`Parcours inconnu dans les totaux attendus : ${p.id}`);
      continue;
    }
    if (p.dureeHeures !== exp.h) {
      errors.push(`${p.id}: durée ${p.dureeHeures} h (attendu ${exp.h})`);
    }
    if (p.prixInterHt !== exp.prix) {
      errors.push(`${p.id}: prix ${p.prixInterHt} (attendu ${exp.prix})`);
    }
    if (p.joursFormation !== exp.jours) {
      errors.push(`${p.id}: jours ${p.joursFormation} (attendu ${exp.jours})`);
    }
    // NUM-04 en 14 h dans Référent IA
    if (p.id === 'referent-ia-btp') {
      const num04 = p.etapes.find((e) => e.moduleCode === 'NUM-04');
      if (num04?.dureeHeuresOverride !== 14) {
        errors.push('Référent IA : NUM-04 doit être en variante 14 h');
      }
    }
    for (const e of p.etapes) {
      if (!getModuleByCode(e.moduleCode)) {
        errors.push(`${p.id}: module manquant ${e.moduleCode}`);
      }
    }
  }
  return { ok: errors.length === 0, errors };
}

export type { ModuleDureeHeures };
