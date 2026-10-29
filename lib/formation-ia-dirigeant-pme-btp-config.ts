/**
 * Landing SEO — formation IA pour les PME du BTP (`/formation-ia-dirigeant-pme-btp`).
 */
import type { Metadata } from 'next';
import type { FAQItem } from '@/lib/faq';
import { formationHref, getFormationByCode } from '@/data/formations';
import { LINKS } from '@/lib/internal-links';
import { createPageMetadata } from '@/lib/seo';

export const FORMATION_IA_PME_BTP_PATH = LINKS.formationIaDirigeantPmeBtp;

export const FORMATION_IA_PME_BTP_H1 = 'Formation IA pour les PME du BTP' as const;

export const FORMATION_IA_PME_BTP_META_TITLE =
  'Formation IA pour les PME du BTP | Laure Olivié' as const;

export const FORMATION_IA_PME_BTP_META_DESCRIPTION =
  'Formez vos équipes à l’IA : devis, CCTP, comptes rendus et appels d’offres. Formations pratiques pour les PME du BTP, en présentiel en Île-de-France.' as const;

export const FORMATION_IA_PME_BTP_INTRO =
  'Vous dirigez une PME du bâtiment ou des travaux publics ? Formez vos équipes à utiliser l’intelligence artificielle sur leurs tâches quotidiennes : préparer un compte rendu de chantier, analyser un CCTP, structurer un devis ou rédiger une relance client. Découvrez des formations en présentiel en Île-de-France, centrées sur les usages métier et la vérification des résultats.' as const;

export const FORMATION_IA_PME_BTP_SHORT_ANSWER =
  'Les formations Laure Olivié (OFC Création d’Entreprise, Qualiopi) aident les PME du bâtiment et des travaux publics à utiliser ChatGPT et Claude sur leurs documents réels — devis, DCE, comptes rendus, courriers — en présentiel en Île-de-France. L’IA accélère la mise en forme ; prix, conformité technique et signatures restent sous votre contrôle.' as const;

export function formationIaPmeBtpMetadata(): Metadata {
  return createPageMetadata({
    title: 'Formation IA pour les PME du BTP',
    titleAbsolute: FORMATION_IA_PME_BTP_META_TITLE,
    description: FORMATION_IA_PME_BTP_META_DESCRIPTION,
    descriptionFinal: true,
    path: FORMATION_IA_PME_BTP_PATH,
    openGraphTitle: FORMATION_IA_PME_BTP_META_TITLE,
    openGraphDescription: FORMATION_IA_PME_BTP_META_DESCRIPTION,
    appendAuthorSuffix: false,
    openGraphType: 'website',
    image: {
      url: '/images/formation-ia-dirigeant-pme-btp.webp',
      width: 1200,
      height: 630,
      alt: 'Formation IA pour les PME du BTP — Laure Olivié, présentiel Île-de-France',
    },
  });
}

function nivHref(code: 'NIV-01' | 'NIV-02' | 'NIV-03' | 'NIV-04' | 'NIV-10'): string {
  const f = getFormationByCode(code);
  return f ? formationHref(f) : LINKS.formations;
}

/** Parcours catalogue — liens vers fiches réelles, sans recopier les programmes. */
export const FORMATION_IA_PME_BTP_PARCOURS = [
  {
    niveau: 'Initiation',
    resume:
      'Premiers usages sur devis, emails et comptes rendus — idéal pour homogénéiser le niveau de l’équipe.',
    href: nivHref('NIV-01'),
    label: getFormationByCode('NIV-01')?.titre ?? 'Les bases de l’IA pour les pros du BTP',
    duree: getFormationByCode('NIV-01')?.duree ?? '4 h',
  },
  {
    niveau: 'Perfectionnement',
    resume:
      'Usages métier approfondis : appels d’offres, conduite de travaux, Claude AI — selon le métier visé.',
    href: LINKS.formations,
    label: 'Catalogue — formations IA par thématique',
    duree: '7 h (sessions métier)',
  },
  {
    niveau: 'Création et déploiement',
    resume:
      'Assistants réutilisables et première application métier BTP — périmètre cadré, tests et relecture humaine.',
    href: nivHref('NIV-10'),
    label: getFormationByCode('NIV-10')?.titre ?? 'Créer des applications métier BTP avec l’IA',
    duree: getFormationByCode('NIV-10')?.duree ?? '14 h',
  },
] as const;

export const FORMATION_IA_PME_BTP_TACHES = [
  {
    title: 'Devis et études de prix',
    body:
      'Structurer les postes à partir d’un descriptif, puis contrôler quantités et prix avant envoi — l’IA ne remplace pas le chiffrage métier.',
    href: LINKS.iaDevis,
    linkLabel: 'Usages IA sur les devis bâtiment',
  },
  {
    title: 'CCTP et DCE',
    body:
      'Extraire les exigences, repérer les passages sensibles et retrouver les sources dans le dossier — validation humaine obligatoire.',
    href: LINKS.formationIaAppelsOffresBtp,
    linkLabel: 'Formation IA appels d’offres BTP',
  },
  {
    title: 'Comptes rendus de chantier',
    body:
      'Organiser notes et photos en décisions, actions, responsables et échéances — brouillon à relire sur le terrain.',
    href: LINKS.formationIaConducteurDeTravaux,
    linkLabel: 'Formation IA conducteur de travaux',
  },
  {
    title: 'Appels d’offres',
    body:
      'Préparer une trame de mémoire technique alignée sur les critères du RC — sans promesse de conformité automatique.',
    href: nivHref('NIV-02'),
    linkLabel: getFormationByCode('NIV-02')?.titre ?? 'IA et appels d’offres BTP',
  },
  {
    title: 'Gestion administrative',
    body:
      'Rédiger courriers, relances clients et emails pro — ton adapté à votre entreprise, relecture avant envoi.',
    href: LINKS.formationIaAssistanteBtp,
    linkLabel: 'Formation IA assistant(e) administratif BTP',
  },
] as const;

export function getFormationIaPmeBtpFaq(): FAQItem[] {
  const niv01 = getFormationByCode('NIV-01');
  const dureeInit = niv01?.duree ?? '4 h';

  return [
    {
      q: 'À qui s’adresse une formation IA pour les PME du BTP ?',
      a: `Dirigeants et directions de PME du bâtiment et des travaux publics, conducteurs de travaux, chargés d’affaires, métreurs, assistant(e)s travaux et administratifs, responsables appels d’offres et fonctions support. Les parcours s’adaptent au métier — voir aussi les <a href="${LINKS.parcoursMetiers}">parcours par métier</a>.`,
    },
    {
      q: 'Faut-il déjà utiliser ChatGPT ou Claude ?',
      a: `Non pour débuter : le niveau 1 (${dureeInit}, fiche <a href="${nivHref('NIV-01')}">${niv01?.titre ?? 'Les bases de l’IA'}</a>) part de zéro prérequis technique. Pour les sessions métier (7 h), une pratique régulière ou le niveau 1 est recommandé — détail sur chaque fiche du <a href="${LINKS.formations}">catalogue</a>.`,
    },
    {
      q: 'Quels documents métier peut-on travailler en formation ?',
      a: 'Devis et descriptifs, DCE (RC, CCTP, CCAP, DPGF), comptes rendus et PV, courriers MOA/MOE, brouillons de mémoire technique, notes de chantier — sur vos exemples anonymisés ou fictifs. Les pièces officielles et les engagements signés restent sous votre responsabilité.',
    },
    {
      q: 'Peut-on former plusieurs collaborateurs d’une même entreprise ?',
      a: `Oui, en <a href="${LINKS.formationIaIntraEntrepriseBtp}">intra-entreprise</a> (dans vos locaux ou un lieu convenu) ou en inter lorsque les dates du catalogue conviennent. Effectifs typiques : 6 à 12 participants selon la session — voir les fiches Qualiopi ou <a href="${LINKS.contact}">nous écrire</a> pour cadrer un groupe.`,
    },
    {
      q: 'Où se déroulrent les formations ?',
      a: `Présentiel uniquement · Île-de-France (75, 77, 78, 91, 92, 93, 94, 95). Intra ou inter-entreprises. Pas de distanciel pour les parcours catalogue — seule la visio découverte de cadrage est à distance. Détail : <a href="${LINKS.formationIleDeFrance}">formation IA BTP en Île-de-France</a>.`,
    },
    {
      q: 'Comment financer la formation pour mon entreprise ?',
      a: `OFC Création d'Entreprise est certifié Qualiopi et enregistré Constructys. Une prise en charge OPCO / Constructys est possible selon votre éligibilité et les barèmes en vigueur — jamais garantie à 100 %. Guide : <a href="${LINKS.financement}">financement formation IA BTP</a>.`,
    },
    {
      q: 'ChatGPT comprend-il les marges et la rentabilité BTP ?',
      a: "Il peut structurer et synthétiser des tableaux à partir des données que vous fournissez. Pour la décision financière, la comptabilité et les prix signés, vos outils métiers et votre expert-comptable restent la référence.",
    },
    {
      q: 'L’IA va-t-elle remplacer les dirigeants ou les équipes terrain ?',
      a: "Non. L’IA accélère la rédaction et la mise en forme ; la vision commerciale, la conduite de travaux, la négociation et la signature des documents restent humaines.",
    },
  ];
}
