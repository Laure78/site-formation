/**
 * Intervenants catalogue parcours métiers 2027 — profils publics confirmés.
 * Biographies et codes module : source unique pour la page /formateurs.
 */
import type { ModuleCode } from '@/data/catalogue-2027';
import type { FormateurExperienceStep, FormateurPortrait, FormateurProfile } from '@/lib/formateurs/types';
import { PHOTOS } from '@/lib/photos';

function moduleCodes(codes: ModuleCode[]): readonly ModuleCode[] {
  return codes;
}

function photoPortrait(
  photo: {
    src: string;
    alt: string;
    width: number;
    height: number;
    objectPosition?: string;
  },
): FormateurPortrait {
  return {
    kind: 'photo',
    src: photo.src,
    alt: photo.alt,
    width: photo.width,
    height: photo.height,
    objectPosition: photo.objectPosition,
  };
}

const MANUEL_GOMEZ: FormateurProfile = {
  id: 'manuel-gomez',
  slug: 'manuel-gomez',
  prenom: 'Manuel',
  nom: 'Gomez',
  intitule: 'Dirigeant d’entreprise de travaux publics et ancien conducteur de travaux chez Eiffage',
  parcours:
    'Dirigeant d’entreprise de travaux publics et ancien conducteur de travaux chez Eiffage.',
  specialites: [],
  domaineIds: ['travaux'],
  formationCodes: [],
  hubOnly: true,
  profilePage: false,
  portrait: {
    kind: 'initials',
    initials: 'MG',
    label: 'Manuel Gomez – Formateur BTP',
  },
  status: 'confirmed',
  publie: true,
};

const THOMAS_GARNIER: FormateurProfile = {
  id: 'thomas-garnier',
  slug: 'thomas-garnier',
  prenom: 'Thomas',
  nom: 'Garnier',
  intitule: 'Ancien chargé d’affaires BTP',
  parcours:
    'Issu de la gestion d’affaires, Thomas intervient sur la préparation des offres et la structuration des réponses commerciales. Il privilégie des exercices fondés sur les devis et les dossiers de consultation.',
  specialites: ['Devis et chiffrage', 'Mémoires techniques', 'Offres commerciales'],
  domaineIds: ['commercial'],
  formationCodes: [],
  moduleCodes: moduleCodes(['COM-01', 'COM-04']),
  experiences: [
    {
      periode: '12 ans',
      titre: 'Chargé d’affaires — entreprises du bâtiment',
      detail: 'Analyse DCE, chiffrage, rédaction de mémoires techniques et suivi client.',
    },
    {
      titre: 'Réponses aux appels d’offres',
      detail: 'Structuration des dossiers commerciaux et contrôle des pièces obligatoires.',
    },
  ] satisfies readonly FormateurExperienceStep[],
  formationsProfessionnelles: [
    'Formation chargé d’affaires BTP',
    'Modules marchés publics et analyse de DCE',
  ],
  portrait: photoPortrait(PHOTOS.formateurThomasGarnier),
  status: 'confirmed',
  publie: true,
};

const MARC_DELCOURT: FormateurProfile = {
  id: 'marc-delcourt',
  slug: 'marc-delcourt',
  prenom: 'Marc',
  nom: 'Delcourt',
  intitule: 'Ancien dirigeant d’entreprise de travaux publics',
  parcours:
    'Issu de la direction d’entreprise, Marc intervient sur les décisions de gestion quotidiennes. Il propose une approche concrète du calcul des prix et de l’anticipation des besoins de trésorerie.',
  specialites: ['Gestion de PME', 'Prix de revient', 'Trésorerie'],
  domaineIds: ['direction'],
  formationCodes: [],
  moduleCodes: moduleCodes(['DIR-01', 'DIR-03']),
  experiences: [
    {
      periode: '15 ans',
      titre: 'Dirigeant — entreprise de travaux publics',
      detail: 'Pilotage commercial, organisation des équipes et suivi financier.',
    },
    {
      titre: 'Pilotage des marges et de la trésorerie',
      detail: 'Arbitrages de prix, plan de trésorerie et relations avec les financeurs.',
    },
  ] satisfies readonly FormateurExperienceStep[],
  formationsProfessionnelles: [
    'Formation à la direction d’entreprise BTP',
    'Modules gestion financière et pilotage PME',
  ],
  portrait: photoPortrait(PHOTOS.formateurMarcDelcourt),
  status: 'confirmed',
  publie: true,
};

const NICOLAS_PERRIN: FormateurProfile = {
  id: 'nicolas-perrin',
  slug: 'nicolas-perrin',
  prenom: 'Nicolas',
  nom: 'Perrin',
  intitule: 'Ancien conducteur de travaux',
  parcours:
    'Issu de l’encadrement de chantier, Nicolas intervient sur l’organisation du travail et la communication avec les équipes. Ses mises en situation portent sur les consignes, la répartition des tâches et le suivi quotidien.',
  specialites: ['Encadrement de chantier', 'Organisation des équipes', 'Transmission des consignes'],
  domaineIds: ['management'],
  formationCodes: [],
  moduleCodes: moduleCodes(['MAN-01', 'MAN-02']),
  experiences: [
    {
      periode: '11 ans',
      titre: 'Conducteur de travaux et chef de chantier',
      detail: 'Animation d’équipes, briefings quotidiens et suivi de la production.',
    },
    {
      titre: 'Montée en compétences des chefs d’équipe',
      detail: 'Répartition des tâches, consignes de sécurité et points d’avancement.',
    },
  ] satisfies readonly FormateurExperienceStep[],
  formationsProfessionnelles: [
    'Formation encadrement chantier',
    'Modules management d’équipes terrain BTP',
  ],
  portrait: photoPortrait(PHOTOS.formateurNicolasPerrin),
  status: 'confirmed',
  publie: true,
};

const CHRISTOPHE_DELGERY: FormateurProfile = {
  id: 'christophe-delgery',
  slug: 'christophe-delgery',
  prenom: 'Christophe',
  nom: 'Delgery',
  intitule: 'Ingénieur BTP — logistique, conformité et intelligence artificielle',
  parcours:
    'Ingénieur (Centrale Méditerranée) et titulaire d’un master supply chain et systèmes d’information, il aide les professionnels du BTP à intégrer l’intelligence artificielle de façon concrète et fiable sur le terrain. Coach certifié (RNCP), formé à l’automatisation et à l’IA (Académie Millenium / Theyo), créateur de contenus assistés par IA et concepteur de sites web via l’IA, il partage des méthodes pragmatiques et vérifiables pour gagner en efficacité sur les dossiers BTP (appels d’offres, conformité, CCTP, suivi de chantier). Il intervient sur l’ensemble des formations IA BTP du catalogue publié en présentiel en Île-de-France.',
  specialites: [
    'Appels d’offres et conformité fournisseurs',
    'Intégration de l’IA sur le terrain BTP',
    'CCTP et suivi de chantier',
    'Logistique et supply chain chantier',
    'Automatisation et méthodes vérifiables',
  ],
  domaineIds: ['numerique-ia', 'commercial', 'travaux'],
  formationCodes: [],
  formationsHubLabel: 'Formations IA BTP qu’il anime',
  animatesAllPublished: true,
  experiences: [
    {
      titre: 'Manager logistique — Vinci Construction et Bouygues Bâtiment',
      detail:
        'Équipes jusqu’à 80 personnes, budgets jusqu’à 25 M€ au sein de grands projets.',
    },
    {
      titre: 'Product manager et référent appels d’offres complexes — Logisur (Groupe Louange)',
      detail: 'Accompagnement de l’écosystème BTP sur les dossiers commerciaux complexes.',
    },
    {
      titre: 'Conformité fournisseurs — Attestation Légale (Once For All)',
      detail: 'Référent sur la conformité et le contrôle des pièces fournisseurs.',
    },
    {
      titre: 'Solutions sécurité, hypervision et automatisation — Neoaxess',
      detail: 'Product management sur des solutions de sécurité et d’automatisation.',
    },
  ] satisfies readonly FormateurExperienceStep[],
  formationsProfessionnelles: [
    'Ingénieur — Centrale Méditerranée',
    'Master supply chain et systèmes d’information',
    'Coach certifié (RNCP)',
    'Automatisation et IA — Académie Millenium / Theyo',
  ],
  modalite: 'Formations en présentiel en Île-de-France.',
  portrait: photoPortrait(PHOTOS.formateurChristopheDelgery),
  status: 'confirmed',
  publie: true,
};

/**
 * Hub /formateurs — intervenants catalogue parcours métiers 2027.
 * `publie: false` ou `affichageHub: 'a-confirmer'` masque un profil sur /formateurs en production.
 */
export const CATALOGUE_FORMATEURS: readonly FormateurProfile[] = [
  MANUEL_GOMEZ,
  THOMAS_GARNIER,
  MARC_DELCOURT,
  NICOLAS_PERRIN,
  CHRISTOPHE_DELGERY,
];
