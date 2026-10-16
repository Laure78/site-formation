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

const JULIEN_MOREL: FormateurProfile = {
  id: 'julien-morel',
  slug: 'julien-morel',
  prenom: 'Julien',
  nom: 'Morel',
  intitule: 'Ancien conducteur de travaux bâtiment',
  parcours:
    'Issu de la conduite de travaux, Julien accompagne la préparation des opérations et l’organisation des interventions. Son approche repose sur des situations concrètes : passation, coordination et actualisation des plannings.',
  specialites: ['Préparation de chantier', 'Planification des travaux'],
  domaineIds: ['travaux'],
  formationCodes: [],
  moduleCodes: moduleCodes(['TRA-01', 'TRA-02']),
  experiences: [
    {
      periode: '10 ans',
      titre: 'Conducteur de travaux — bâtiment',
      detail: 'Passation, coordination des corps d’état et suivi des délais.',
    },
    {
      titre: 'Préparation d’ouverture de chantiers',
      detail: 'Dossiers de lancement, plannings prévisionnels et points de coordination.',
    },
  ] satisfies readonly FormateurExperienceStep[],
  formationsProfessionnelles: [
    'Formation conduite de travaux (niveau bac + 3)',
    'Habilitations coordination sécurité chantier',
  ],
  portrait: photoPortrait(PHOTOS.formateurJulienMorel),
  status: 'confirmed',
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
};

const CLAIRE_ROUSSEAU: FormateurProfile = {
  id: 'claire-rousseau',
  slug: 'claire-rousseau',
  prenom: 'Claire',
  nom: 'Rousseau',
  intitule: 'Ancienne chargée d’affaires et dirigeante d’entreprise du bâtiment',
  parcours:
    'Issue de la gestion d’affaires et de la direction d’entreprise, Claire intervient sur le recrutement, l’intégration et les bases de la paie du bâtiment. Elle privilégie des méthodes pratiques pour organiser les processus RH et dialoguer avec le prestataire paie.',
  specialites: ['Recrutement BTP', 'Intégration', 'Bases de la paie bâtiment'],
  domaineIds: ['administration'],
  formationCodes: [],
  moduleCodes: moduleCodes(['ADM-03', 'ADM-04']),
  experiences: [
    {
      periode: '14 ans',
      titre: 'Chargée d’affaires puis dirigeante — bâtiment',
      detail: 'Suivi administratif des chantiers, situations de travaux et relation clients.',
    },
    {
      titre: 'Organisation back-office chantier',
      detail: 'Classement des pièces, relances et préparation à la facturation.',
    },
  ] satisfies readonly FormateurExperienceStep[],
  formationsProfessionnelles: [
    'Formation assistante de gestion BTP',
    'Modules facturation et administration des marchés',
  ],
  portrait: photoPortrait(PHOTOS.formateurClaireRousseau),
  status: 'confirmed',
};

const EMILIE_FONTAINE: FormateurProfile = {
  id: 'intervenante-assistance-travaux-btp',
  slug: 'intervenante-assistance-travaux-btp',
  prenom: 'Émilie',
  nom: 'Fontaine',
  intitule: 'Ancienne assistante travaux — assistance et suivi administratif des chantiers',
  parcours:
    'Issue de l’assistance aux conducteurs de travaux, Émilie intervient sur la préparation des dossiers, le suivi documentaire et les échanges bureau–chantier. Ses mises en situation portent sur les tableaux de suivi des pièces, les comptes rendus, les relances et la préparation à la clôture administrative.',
  specialites: [
    'Assistance travaux',
    'Situations et relances',
    'Comptes rendus de chantier',
  ],
  domaineIds: ['administration', 'travaux'],
  formationCodes: [],
  moduleCodes: moduleCodes(['ADM-01', 'ADM-02', 'TRA-04']),
  formationsHubLabel: 'Formations animées',
  experiences: [
    {
      periode: '11 ans',
      titre: 'Assistante travaux — entreprises du bâtiment',
      detail:
        'Dossiers de chantier, pièces sous-traitants, situations de travaux et éléments de facturation.',
    },
    {
      titre: 'Réunions de chantier et clôture administrative',
      detail:
        'Organisation des réunions, comptes rendus, collecte des pièces DOE et relances ciblées.',
    },
  ] satisfies readonly FormateurExperienceStep[],
  formationsProfessionnelles: [
    'Formation assistante de gestion BTP',
    'Modules administratif chantier et facturation',
  ],
  portrait: photoPortrait(PHOTOS.formateurEmilieFontaine),
  status: 'confirmed',
};

const FRANCOIS_BEGUIN: FormateurProfile = {
  id: 'formateur-coordination-sps',
  slug: 'formateur-coordination-sps',
  prenom: 'François',
  nom: 'Béguin',
  intitule:
    'Intervenant en coordination SPS (Sécurité et protection de la santé) et prévention de chantier',
  parcours:
    'Issu de la coordination de la prévention sur chantier, François intervient sur la coactivité, les mesures de prévention et la transmission des consignes. Il s’appuie sur des situations réelles pour repérer les points de vigilance et structurer l’information — les formations catalogue ne constituent pas une habilitation de coordonnateur SPS.',
  specialites: [
    'Coordination de la prévention',
    'Risques et coactivité',
    'Accueil sécurité',
  ],
  domaineIds: ['technique-qualite-prevention'],
  formationCodes: [],
  moduleCodes: moduleCodes(['TQP-01']),
  hubSousDomaines: [
    {
      id: 'securite-prevention-chantier-ia',
      note:
        'Supports et trames de prévention avec l’IA — productions vérifiées sur le terrain, sans promesse de conformité automatique.',
    },
  ],
  formationsHubLabel: 'Formations animées',
  experiences: [
    {
      periode: '13 ans',
      titre: 'Coordination de la prévention — opérations BTP',
      detail:
        'Anticipation des risques, analyse des conditions d’intervention et suivi documentaire des observations.',
    },
    {
      titre: 'Transmission des consignes et accueil sécurité',
      detail:
        'Accompagnement des équipes, quart d’heure sécurité et communication des actions de prévention.',
    },
  ] satisfies readonly FormateurExperienceStep[],
  formationsProfessionnelles: [
    'Formation prévention et coordination des intervenants sur chantier',
    'Modules contribution à la prévention documentaire (hors habilitation coordonnateur SPS)',
  ],
  portrait: photoPortrait(PHOTOS.formateurFrancoisBeguin),
  status: 'confirmed',
};

/** Hub /formateurs — intervenants catalogue parcours métiers 2027. */
export const CATALOGUE_FORMATEURS: readonly FormateurProfile[] = [
  JULIEN_MOREL,
  THOMAS_GARNIER,
  MARC_DELCOURT,
  NICOLAS_PERRIN,
  CLAIRE_ROUSSEAU,
  EMILIE_FONTAINE,
  FRANCOIS_BEGUIN,
];
