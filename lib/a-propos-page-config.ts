/**
 * Page `/a-propos` — contenu institutionnel (voix « nous », sources vérifiées).
 */
import { PREUVES } from '@/lib/constants';
import { IDF_ZONE_INTERVENTION } from '@/lib/constants';
import { getPillarPageContentUpdatedAt } from '@/lib/content-updated-at';
import { formatAnneesExperienceBTP } from '@/lib/data/indicateurs-resultats';
import { FINANCEMENT_FORMULATION_PRUDENTE } from '@/lib/financement-copy';
import type { FAQItem } from '@/lib/faq';
import { LINKS } from '@/lib/internal-links';
import { LOGO_MONITEUR_FORMATIONS } from '@/lib/client-logos';
import { MENTION_MARQUE_EXPLOITANTE } from '@/lib/marque-identite';
import { OFC_IDENTITE, QUALIOPI_LEGAL } from '@/lib/qualiopi-info';
import { SCHEMA_CONTACT } from '@/lib/schema-constants';
import { MODALITE_FORMATIONS_PRESENTIEL } from '@/lib/tarifs-sessions';
import { getFormateursHubProfiles } from '@/lib/formateurs/get-formateurs';
import { LAURE_OLIVIE_LINKEDIN_LEARNING_COURSES } from '@/lib/laure-olivie-profile';

export const A_PROPOS_PAGE_HERO_EYEBROW = 'Organisme de formation spécialisé BTP' as const;

export const A_PROPOS_PAGE_H1 =
  'Organisme de formation en intelligence artificielle pour le BTP' as const;

export const A_PROPOS_PAGE_HOOK =
  'Des professionnels du BTP qui forment les professionnels du BTP.' as const;

export const A_PROPOS_PAGE_HERO_LEAD = [
  'Nous accompagnons les PME du bâtiment et des travaux publics dans l’intégration concrète de l’intelligence artificielle à leurs activités quotidiennes.',
  'Notre équipe de formateurs associe expérience terrain, expertise métier et intelligence artificielle pour proposer des formations directement applicables en entreprise.',
  'De l’initiation à l’automatisation des processus métier, nous formons vos équipes sur leurs documents et leurs problématiques professionnelles.',
] as const;

/** Bloc GEO « En bref » — visible sous le H1. */
export const A_PROPOS_PAGE_EN_BREF =
  'Laure Olivié est la marque commerciale d’OFC Création d’Entreprise, organisme certifié Qualiopi spécialisé dans la formation en intelligence artificielle appliquée au BTP. Notre équipe accompagne les PME du bâtiment et des travaux publics exclusivement en présentiel en Île-de-France.';

export const A_PROPOS_PAGE_UPDATED_AT = getPillarPageContentUpdatedAt('/a-propos');

export const A_PROPOS_PAGE_META_TITLE =
  'Organisme de formation IA BTP certifié Qualiopi | Laure Olivié' as const;

export const A_PROPOS_PAGE_META_DESCRIPTION =
  'Organisme certifié Qualiopi, Laure Olivié accompagne les PME du BTP avec une équipe de formateurs en intelligence artificielle en Île-de-France.' as const;

export const A_PROPOS_SPECIALISATION_INTRO = [
  'Nous connaissons les contraintes des entreprises du bâtiment et des travaux publics : rentabilité des chantiers, délais, appels d’offres, production documentaire et organisation des équipes.',
  'Nos formations sont conçues pour répondre à ces enjeux.',
] as const;

export const A_PROPOS_SPECIALISATION_CARDS = [
  {
    title: 'Expertise métier BTP',
    text: 'Des intervenants issus ou proches des métiers de la construction.',
  },
  {
    title: 'Intelligence artificielle appliquée',
    text: 'Des usages de ChatGPT, Claude et des outils IA adaptés aux besoins des entreprises.',
  },
  {
    title: 'Pédagogie opérationnelle',
    text: 'Des exercices sur des situations professionnelles et des documents métier.',
  },
  {
    title: 'Utilisation responsable',
    text: 'Confidentialité, maîtrise des limites de l’IA et vérification humaine des productions.',
  },
] as const;

export const A_PROPOS_EQUIPE_INTRO = [
  'Notre équipe réunit des professionnels issus de la direction d’entreprise, de la conduite de travaux, de l’ingénierie, du chiffrage et de l’intelligence artificielle.',
  'Cette complémentarité nous permet de proposer des formations adaptées aux métiers et aux besoins des PME du BTP.',
] as const;

export const A_PROPOS_LAURE_EQUIPE_ROLE = 'Fondatrice et coordinatrice pédagogique' as const;

export const A_PROPOS_HISTOIRE_PARAGRAPHS = [
  'Notre organisme est né de l’expérience professionnelle de sa fondatrice, Laure Olivié, ancienne dirigeante d’une entreprise de travaux publics.',
  `Forte de ${formatAnneesExperienceBTP()} et d’une expérience de chargée de formation au CNFPT (2009-2019), elle a développé une offre spécialisée dans l’intelligence artificielle appliquée à la construction.`,
  'Depuis 2022, cette offre s’est progressivement enrichie pour répondre aux besoins des entreprises.',
  'Aujourd’hui, notre organisme poursuit son développement avec une équipe de formateurs aux expertises complémentaires.',
] as const;

export type AProposDomaineFormationCard = {
  title: string;
  description: string;
  href: string;
};

export const A_PROPOS_DOMAINES_FORMATION: readonly AProposDomaineFormationCard[] = [
  {
    title: 'Devis et chiffrage',
    description: 'Structurer et relire devis, notes de visite et propositions commerciales.',
    href: LINKS.iaDevis,
  },
  {
    title: 'Appels d’offres et DCE',
    description: 'Analyser les pièces de marché et préparer des réponses cohérentes.',
    href: LINKS.formationIaAppelsOffresBtp,
  },
  {
    title: 'Conduite de travaux',
    description: 'Comptes rendus, suivi de chantier et documentation d’exécution.',
    href: LINKS.formationConduiteTravauxSuiviChantier,
  },
  {
    title: 'Direction et gestion d’entreprise',
    description: 'Pilotage, gestion documentaire et usages IA pour les dirigeants et équipes.',
    href: LINKS.formationIaDirigeantPmeBtp,
  },
  {
    title: 'Assistants et agents IA',
    description: 'Assistants réutilisables et agents métier encadrés, avec relecture humaine.',
    href: LINKS.formationAssistantsIaPersonnalisesBtp,
  },
  {
    title: 'Automatisation et applications métier',
    description: 'Premiers scénarios d’automatisation et prototypes testés en atelier.',
    href: LINKS.formationAgentsIaAutonomesBtp,
  },
] as const;

export const A_PROPOS_METHODE_ETAPES = [
  {
    title: 'Identifier les besoins professionnels',
    text: 'Partir d’une tâche concrète : devis, compte rendu, dossier marché ou courrier client.',
  },
  {
    title: 'Travailler sur des documents métier',
    text: 'Exercices sur des exemples adaptés au groupe, avec anonymisation si nécessaire.',
  },
  {
    title: 'Mettre en pratique les outils et méthodes IA',
    text: 'Environ 70 % de pratique sur les programmes concernés — prompts, trames et outils.',
  },
  {
    title: 'Vérifier les résultats et pérenniser les usages',
    text: 'Contrôler chaque production avant envoi, signature ou décision.',
  },
] as const;

export const A_PROPOS_ZONE_TEXTE = [
  'Nous intervenons auprès des PME du bâtiment et des travaux publics à Paris et dans l’ensemble des départements franciliens.',
  MODALITE_FORMATIONS_PRESENTIEL,
] as const;

export const A_PROPOS_MODALITES_LIST = [
  'Formations inter-entreprises.',
  'Formations intra-entreprise dans les locaux de l’entreprise.',
] as const;

export type AProposEngagementItem = {
  label: string;
  detail: string;
  href?: string;
};

export function getAProposFormateursPubliesCount(): number {
  return getFormateursHubProfiles().length;
}

export function getAProposEngagementsItems(): AProposEngagementItem[] {
  return [
    {
      label: 'Certification Qualiopi',
      detail: `Actions de formation — certificat n° ${QUALIOPI_LEGAL.certificatNumero}, validité ${QUALIOPI_LEGAL.certificatValidite}.`,
      href: LINKS.certificatQualiopi,
    },
    {
      label: 'Numéro de déclaration d’activité',
      detail: `${SCHEMA_CONTACT.nda} — Cet enregistrement ne vaut pas agrément de l’État.`,
      href: LINKS.qualiopi,
    },
    {
      label: 'Indicateurs de satisfaction',
      detail: `${PREUVES.satisfaction} · ${PREUVES.repondants} répondants · période ${PREUVES.periode}.`,
      href: LINKS.indicateursResultats,
    },
    {
      label: 'Accessibilité des formations',
      detail: 'Référente handicap et démarche d’accueil — contact sur la page dédiée.',
      href: LINKS.accessibiliteHandicap,
    },
    {
      label: 'Équipe pédagogique',
      detail: `${getAProposFormateursPubliesCount()} formateurs publiés — expertises métier et IA complémentaires.`,
      href: LINKS.formateurs,
    },
    {
      label: 'Financement',
      detail: FINANCEMENT_FORMULATION_PRUDENTE,
      href: LINKS.financement,
    },
  ];
}

/** @deprecated Préférer `getAProposEngagementsItems` — conservé pour imports legacy. */
export function getAProposConfianceItems(): AProposEngagementItem[] {
  return getAProposEngagementsItems();
}

export const A_PROPOS_REFERENCES_LOGOS = [
  {
    id: 'ffb-gp',
    name: 'FFB Grand Paris',
    src: '/images/partenaires/logo-ffb-grand-paris-formation-idf.webp',
    alt: 'Logo FFB Grand Paris — fédération du bâtiment Île-de-France',
    width: 400,
    height: 120,
  },
  {
    id: 'csfe',
    name: 'CSFE',
    src: '/images/partenaires/logo-csfe-partenaire-formation-btp.webp',
    alt: "Logo CSFE — Chambre Syndicale Française de l'Étanchéité",
    width: 360,
    height: 120,
  },
  {
    id: 'cnam',
    name: 'CNAM Entreprise',
    src: '/images/partenaires/logo-cnam-formation-continue-ia-btp.webp',
    alt: 'Logo CNAM Entreprises',
    width: 220,
    height: 72,
  },
  {
    id: 'moniteur-formations',
    name: 'Le Moniteur Formations',
    src: LOGO_MONITEUR_FORMATIONS.src,
    alt: LOGO_MONITEUR_FORMATIONS.alt,
    width: LOGO_MONITEUR_FORMATIONS.width,
    height: LOGO_MONITEUR_FORMATIONS.height,
  },
] as const;

/** Description JSON-LD Person — extrait legacy (fiche fondatrice = source détaillée). */
export function getAProposPagePersonDescription(): string {
  return `Fondatrice et coordinatrice pédagogique — ${MENTION_MARQUE_EXPLOITANTE} Organisme certifié Qualiopi, formation IA BTP en présentiel Île-de-France.`;
}

export const FAQ_A_PROPOS_PAGE: FAQItem[] = [
  {
    q: 'Qu’est-ce que l’organisme de formation Laure Olivié ?',
    a: `Laure Olivié est la marque commerciale d’${OFC_IDENTITE.raisonSociale}, organisme certifié Qualiopi spécialisé dans la formation en intelligence artificielle appliquée au bâtiment et aux travaux publics. <a href="${LINKS.qualiopi}">Certification Qualiopi</a> · <a href="${LINKS.formations}">Catalogue des formations</a>.`,
  },
  {
    q: 'Qui dispense nos formations ?',
    a: `Notre équipe réunit des formateurs aux expertises métier complémentaires. Laure Olivié, fondatrice de l’organisme, assure la coordination pédagogique. <a href="${LINKS.formateurs}">Découvrir notre équipe</a>.`,
  },
  {
    q: 'À quelles entreprises s’adressent nos formations ?',
    a: `Nos formations s’adressent aux PME du bâtiment et des travaux publics, notamment aux dirigeants, conducteurs de travaux, chargés d’affaires et fonctions support — ${IDF_ZONE_INTERVENTION}. <a href="${LINKS.formationIaBtp}">Formation IA pour le BTP</a>.`,
  },
  {
    q: 'Quels sont nos domaines de formation ?',
    a: `Nous proposons des formations consacrées aux usages de l’IA dans les devis, les appels d’offres, la conduite de travaux, la gestion documentaire, les assistants IA et l’automatisation. <a href="${LINKS.formations}">Voir le catalogue</a>.`,
  },
  {
    q: 'Où intervenons-nous ?',
    a: `Nous proposons des formations en présentiel en Île-de-France, en inter-entreprises et en intra-entreprise dans les locaux de l’entreprise. <a href="${LINKS.formationIleDeFrance}">Formation IA BTP en Île-de-France</a>.`,
  },
  {
    q: 'Notre organisme est-il certifié Qualiopi ?',
    a: `Oui. ${OFC_IDENTITE.raisonSociale} est certifié Qualiopi au titre des actions de formation (certificat n° ${QUALIOPI_LEGAL.certificatNumero}). <a href="${LINKS.certificatQualiopi}">Voir le certificat</a>.`,
  },
  {
    q: 'Une prise en charge par Constructys est-elle possible ?',
    a: `${FINANCEMENT_FORMULATION_PRUDENTE} <a href="${LINKS.financement}">Financement Constructys — formation IA BTP</a>.`,
  },
];

export function getFaqAProposPage(): readonly FAQItem[] {
  return FAQ_A_PROPOS_PAGE;
}

/** @deprecated Page refondue — composants legacy non montés. */
export const A_PROPOS_PARCOURS = A_PROPOS_HISTOIRE_PARAGRAPHS.map((text, i) => ({
  period: String(i + 1),
  title: '—',
  text,
}));

/** @deprecated */
export const A_PROPOS_DOCUMENTAIRE = A_PROPOS_DOMAINES_FORMATION.map((d) => ({
  title: d.title,
  text: d.description,
}));

/** @deprecated */
export const A_PROPOS_APPORTS = A_PROPOS_SPECIALISATION_CARDS;

/** @deprecated */
export const A_PROPOS_POSITIONNEMENT = A_PROPOS_EQUIPE_INTRO;

/** @deprecated */
export const A_PROPOS_ORGANISME_INTRO = A_PROPOS_PAGE_EN_BREF;

/** @deprecated */
export const A_PROPOS_PAGE_SUBTITLE = A_PROPOS_PAGE_HOOK;

/** @deprecated Composant LinkedIn legacy */
export const A_PROPOS_LINKEDIN_COURSES = LAURE_OLIVIE_LINKEDIN_LEARNING_COURSES;

/** @deprecated */
export const A_PROPOS_MODALITES_RESUME = `${MODALITE_FORMATIONS_PRESENTIEL} Catalogue sur ${LINKS.formations}.`;