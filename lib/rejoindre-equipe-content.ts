/**
 * Contenu éditorial — page /rejoindre-equipe (recrutement formateurs).
 * Partenaires et indicateurs : sources `lib/constants.ts` / règles projet.
 */
import { PREUVES } from '@/lib/constants';

export const REJOINDRE_EQUIPE_INTRO = {
  lead: `Vous connaissez le BTP de l'intérieur. Vous savez ce que représente un DCE à analyser un vendredi soir, un devis à sortir dans l'urgence ou un compte rendu de chantier à rédiger. Aujourd'hui, l'IA change ces métiers, et les entreprises ont besoin de formateurs qui parlent leur langue.`,
  organisme: `Laure Olivié (organisme certifié Qualiopi, OFC Création d'Entreprise) accompagne les fédérations et les entreprises du bâtiment (FFB, CAPEB, CSFE). Satisfaction de ${PREUVES.satisfaction} (${PREUVES.repondants} répondants, ${PREUVES.periode}).`,
  recherche: `Nous recherchons des formateurs et formatrices issus du BTP, artisans en activité ou non, pour animer nos sessions en présentiel en Île-de-France.`,
} as const;

export const REJOINDRE_EQUIPE_VOUS_ETES = [
  `Artisan, en activité ou non, ou ancien·ne conducteur·rice de travaux, chef·fe de chantier, chargé·e d'affaires, économiste ou dirigeant·e de PME du bâtiment`,
  `Utilisateur·rice de ChatGPT, Claude ou d'un autre outil d'IA`,
  `Animé·e par l'envie de transmettre`,
  `Indépendant·e (ou prêt·e à le devenir)`,
] as const;

export const REJOINDRE_EQUIPE_NOUS_OFFRONS = [
  `Un catalogue structuré en 3 niveaux, avec des supports et des prompts BTP clé en main`,
  `Une intégration progressive : observation, puis co-animation, puis animation en autonomie`,
  `Des clients et une organisation déjà en place, pour que vous vous concentriez sur la pédagogie`,
  `Un complément d'activité souple, compatible avec votre entreprise : vous choisissez vos dates`,
  `Des missions régulières auprès d'artisans, de conducteurs de travaux et de dirigeants`,
] as const;

export const REJOINDRE_EQUIPE_BADGES = [
  { label: `${PREUVES.satisfaction} de satisfaction` },
  { label: 'Certifié Qualiopi' },
  { label: 'Présentiel en Île-de-France' },
] as const;

export const REJOINDRE_EQUIPE_CTA = {
  text: `Pour candidater, envoyez votre CV et quelques lignes sur votre parcours BTP à contact@laureolivie.fr, ou appelez le 06 95 66 18 18.`,
  emailSubject: 'Candidature formateur IA BTP',
} as const;
