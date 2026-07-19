/** Contenu éditorial — landing /ressources/guide-assistants-travaux-ofc */

import { LINKS } from '@/lib/internal-links';

export const GUIDE_ASSISTANTS_TRAVAUX_PATH = LINKS.guideAssistantsTravauxOfc;
export const GUIDE_ASSISTANTS_TRAVAUX_PDF_PATH = LINKS.pdfGuideAssistantsTravauxOfc;

export const GUIDE_ASSISTANTS_TRAVAUX_H1 =
  'Guide des Assistants Travaux : 12 missions de marché outillées à l’IA' as const;

export type MissionAssistantTag = 'IA' | 'MIXTE' | 'HUMAIN';

export type MissionAssistantTravaux = {
  id: string;
  titre: string;
  hint: string;
  tag: MissionAssistantTag;
};

/** Les 12 missions du guide (fil marché — entreprise exécutante). */
export const MISSIONS_ASSISTANTS_TRAVAUX: MissionAssistantTravaux[] = [
  {
    id: 'prise-en-main',
    titre: 'Prise en main du marché',
    hint: 'Obligations, délais, pénalités — synthèse contractuelle avant démarrage.',
    tag: 'MIXTE',
  },
  {
    id: 'preparation-installation',
    titre: 'Préparation & installation',
    hint: 'PPSPS, PIC, DICT, autorisations — trames et checklists.',
    tag: 'MIXTE',
  },
  {
    id: 'plans-visas',
    titre: "Plans d'exécution & visas",
    hint: 'Indices, visas, diffusions — suivi documentaire.',
    tag: 'MIXTE',
  },
  {
    id: 'admin-sous-traitance',
    titre: 'Admin marché & sous-traitance',
    hint: 'Cautions, DC4, OS, avenants — pièces et relances.',
    tag: 'IA',
  },
  {
    id: 'appros-commandes',
    titre: 'Appros, commandes & locations',
    hint: 'Fournisseurs, budget, livraisons — tableaux et mails.',
    tag: 'IA',
  },
  {
    id: 'securite-qse',
    titre: 'Sécurité & QSE',
    hint: 'Accueils, registres, déchets — traçabilité et synthèse.',
    tag: 'MIXTE',
  },
  {
    id: 'avancement-cr',
    titre: 'Avancement & comptes rendus',
    hint: 'Rapports, pointage, photos — CR structurés à relecture.',
    tag: 'IA',
  },
  {
    id: 'situations-facturation',
    titre: 'Situations & facturation',
    hint: 'Situations, RG, trésorerie — préparation sur vos trames.',
    tag: 'MIXTE',
  },
  {
    id: 'ts-reclamations',
    titre: 'TS, OS & réclamations',
    hint: 'Chiffrage, mémoire, traçabilité — faits sourcés.',
    tag: 'MIXTE',
  },
  {
    id: 'interfaces-lots',
    titre: 'Interfaces inter-lots',
    hint: 'Réservations, coordination — mails et tableaux de suivi.',
    tag: 'MIXTE',
  },
  {
    id: 'autocontrôle-reserves',
    titre: 'Autocontrôle & réserves',
    hint: 'Contrôle, levées, réception — listes et PV assistés.',
    tag: 'MIXTE',
  },
  {
    id: 'doe-dgd',
    titre: 'DOE, DGD & clôture',
    hint: 'DOE, décompte, parfait achèvement — clôture documentaire.',
    tag: 'MIXTE',
  },
] as const;

export const FAQ_GUIDE_ASSISTANTS_TRAVAUX = [
  {
    q: "L'IA peut-elle établir nos situations de travaux ?",
    a: "Le skill prépare la situation sur votre trame (avancement par poste, révision, RG). L'avancement réel est constaté par le chef de chantier ; la validation avant envoi reste humaine — c'est elle qui engage l'entreprise.",
  },
  {
    q: "Est-ce que l'usage de l'IA engage la responsabilité de l'entreprise ?",
    a: "Oui. L'IA n'exonère de rien : responsabilité contractuelle, parfait achèvement, décennale. Mentionnez l'évolution de vos outils à la revue annuelle d'assurance.",
  },
  {
    q: 'Nos données de marché sont-elles confidentielles ?',
    a: "Sur un plan Pro ou supérieur, elles ne servent pas à l'entraînement des modèles. Pour les marchés sensibles ou les données de salariés et de sous-traitants, anonymisez ou passez sur une offre Entreprise.",
  },
  {
    q: "Faut-il créer les 12 skills d'un coup ?",
    a: 'Non. Commencez par votre plus grosse douleur (souvent situations, CR ou commandes), rodez le skill 2 à 3 semaines, puis ajoutez-en un. Quatre ou cinq skills bien rôdés rapportent plus que douze skills moyens.',
  },
  {
    q: 'Ce guide remplace-t-il une formation IA pour le BTP ?',
    a: "Non : c'est un support autonome. Une formation IA pour le BTP certifiée Qualiopi (OFC) accélère la création des skills sur vos vrais documents, en présentiel Île-de-France — financement OPCO possible selon éligibilité.",
  },
] as const;
