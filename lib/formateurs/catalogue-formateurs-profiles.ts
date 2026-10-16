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

/** Brouillon hub — identité et association modules à valider avant publication définitive. */
const INTERVENANTE_ASSISTANCE_TRAVAUX: FormateurProfile = {
  id: 'intervenante-assistance-travaux-btp',
  slug: 'intervenante-assistance-travaux-btp',
  prenom: 'Prénom',
  nom: 'à compléter',
  intitule: 'Assistance travaux et suivi administratif des chantiers',
  parcours:
    'Intervention prévue sur l’assistance aux conducteurs de travaux, la gestion documentaire et le suivi des pièces sous-traitants, les réunions de chantier et la clôture administrative (situations, relances, éléments DOE). Approche pédagogique : méthodes concrètes pour organiser les documents, suivre les échéances et faciliter les échanges bureau–chantier.',
  specialites: [
    'Assistance travaux',
    'Suivi administratif chantier',
    'Comptes rendus et réunions',
  ],
  domaineIds: ['administration', 'travaux'],
  formationCodes: [],
  moduleCodes: moduleCodes(['ADM-01', 'ADM-02', 'TRA-04']),
  formationsHubLabel: 'Modules du catalogue (intervenant à confirmer)',
  experiences: [
    {
      titre: 'Parcours professionnel',
      detail:
        'À compléter : années d’expérience, employeurs et missions d’assistance travaux (non publié tant que non validé).',
    },
  ] satisfies readonly FormateurExperienceStep[],
  formationsProfessionnelles: ['Qualifications et certifications — à compléter'],
  portrait: {
    kind: 'initials',
    initials: 'AT',
    label: 'Portrait à venir — assistance travaux BTP',
  },
  profileDraft: true,
  hubOnly: true,
  status: 'confirmed',
};

/** Brouillon hub — pas de qualification coordonnateur SPS tant que non confirmée. */
const FORMATEUR_COORDINATION_SPS: FormateurProfile = {
  id: 'formateur-coordination-sps',
  slug: 'formateur-coordination-sps',
  prenom: 'Prénom',
  nom: 'à compléter',
  intitule:
    'Coordination SPS (Sécurité et protection de la santé) et prévention de chantier',
  parcours:
    'Intervention prévue sur la coordination de la prévention entre intervenants, l’anticipation des risques de coactivité, la préparation des mesures de prévention et la transmission de consignes compréhensibles. Ce profil ne vise pas une habilitation coordonnateur SPS : les modules portent sur la contribution à la prévention et la préparation documentaire, avec validation par les personnes compétentes.',
  specialites: [
    'Coordination de la prévention',
    'Risques et coactivité',
    'Accueil sécurité et consignes',
  ],
  domaineIds: ['technique-qualite-prevention'],
  formationCodes: [],
  moduleCodes: moduleCodes(['TQP-01']),
  hubSousDomaines: [
    {
      id: 'securite-prevention-chantier-ia',
      note:
        'Sous-domaine IA : coanimation avec Laure Olivié — organisation pédagogique à confirmer.',
    },
  ],
  formationsHubLabel: 'Modules du catalogue (intervenant à confirmer)',
  experiences: [
    {
      titre: 'Parcours professionnel',
      detail:
        'À compléter : expérience en coordination SPS ou prévention chantier, employeurs et titres (non publié tant que non validé).',
    },
  ] satisfies readonly FormateurExperienceStep[],
  formationsProfessionnelles: [
    'Titres sécurité / coordination SPS — à compléter et vérifier',
  ],
  portrait: {
    kind: 'initials',
    initials: 'SPS',
    label: 'Portrait à venir — coordination SPS et prévention',
  },
  profileDraft: true,
  hubOnly: true,
  status: 'confirmed',
};

/** Hub /formateurs — intervenants catalogue + fiches brouillon hub-only. */
export const CATALOGUE_FORMATEURS: readonly FormateurProfile[] = [
  JULIEN_MOREL,
  THOMAS_GARNIER,
  MARC_DELCOURT,
  NICOLAS_PERRIN,
  CLAIRE_ROUSSEAU,
  INTERVENANTE_ASSISTANCE_TRAVAUX,
  FORMATEUR_COORDINATION_SPS,
];
