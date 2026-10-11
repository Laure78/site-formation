/**
 * Landing `/formation-ia-metallerie-serrurerie-btp` — métallerie & serrurerie bâtiment.
 * Une seule page pour « formation IA métallerie » et « formation IA entreprise de serrurerie ».
 * Distincte de clôturiste (clôtures/portails) et ferrailleur (armatures béton).
 */
import { LINKS } from '@/lib/internal-links';
import {
  SCHEMA_LINKEDIN_PROFILE_URL,
  SCHEMA_ORGANIZATION_OFC,
  SCHEMA_PERSON_LAURE,
  SCHEMA_PUBLIC_SITE_URL,
} from '@/lib/schema-constants';
import { buildFormationFicheCourseJsonLd } from '@/lib/schema-formation-course-jsonld';
import { TARIF_FORFAIT_AVANCE_HT } from '@/lib/tarifs-sessions';
import type { FAQItem } from '@/lib/faq';

export const FORMATION_IA_METALLERIE_SERRURERIE_BTP_PATH =
  '/formation-ia-metallerie-serrurerie-btp' as const;

/** Sources officielles — hauteur garde-corps habitation (ne pas reformuler hors texte). */
export const METALLERIE_SOURCES_OFFICIELLES = [
  {
    label:
      'Service-Public — hauteur réglementaire d’un garde-corps ou d’une barre d’appui (fiche F481, vérifiée le 26/06/2025)',
    href: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F481',
  },
  {
    label:
      'Légifrance — Code de la construction et de l’habitation (article R. 134-59, prévention des risques de chute)',
    href: 'https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006074096',
  },
] as const;

export const METALLERIE_SEO = {
  title: 'IA métallerie : serrurerie et devis',
  description:
    'Formation IA métallerie et serrurerie : devis, CCTP, fournisseurs et suivi pose sous validation métier. Formation IA pour le BTP. Présentiel IDF, Qualiopi.',
  h1: 'Formation IA pour les entreprises de métallerie et de serrurerie',
  openGraphTitle: 'Formation IA métallerie & serrurerie BTP',
} as const;

export const METALLERIE_EN_BREF = [
  'Page unique pour métallerie et serrurerie du bâtiment : structurer demandes clients, désignations de devis, CCTP, consultations fournisseurs et suivi fabrication / pose — avec ChatGPT ou Claude, sous validation métier.',
  'Public : dirigeants, chargés d’affaires, responsables atelier et fonctions support. Présentiel Île-de-France, Qualiopi. Financement OPCO possible selon éligibilité.',
  'Aucune fiche catalogue « métallerie » inventée : les ateliers s’appuient sur les programmes existants (NIV-01 ; usages CCTP / suivi aussi en NIV-02 / NIV-03). L’IA ne calcule pas la résistance ni n’affirme une conformité réglementaire.',
] as const;

export const METALLERIE_USE_CASES = [
  {
    title: 'Structurer une demande client et repérer les manques',
    body: 'Transformer un brief oral ou un mail en fiche besoin : dimensions fournies, finitions, délais, accès chantier — et liste explicite des informations manquantes.',
  },
  {
    title: 'Préparer les désignations d’un devis',
    body: 'Rédiger des postes clairs à partir des seules données validées (type d’ouvrage, quantités, options) — sans inventer de dimensions ni de performances.',
  },
  {
    title: 'Synthétiser les exigences documentaires d’un CCTP',
    body: 'Tableau exigence / source / statut pour portes techniques, garde-corps, serrurerie, métallerie — à croiser avec vos pièces avant chiffrage.',
  },
  {
    title: 'Organiser les consultations fournisseurs',
    body: 'Demandes de prix structurées (profils, quincaillerie, vitrage, traitement) et checklist des infos absentes des offres.',
  },
  {
    title: 'Suivi fabrication, livraison et pose',
    body: 'Tableau d’avancement atelier → livraison → pose à partir de vos notes — sans pilotage ERP inventé.',
  },
  {
    title: 'Comptes rendus, courriers et documents de réception',
    body: 'Structurer CR de pose, courriers client/MOE et listes de réserves à partir des faits fournis — validation avant envoi.',
  },
] as const;

export const METALLERIE_PUBLIC = [
  'Dirigeants d’entreprises de métallerie et de serrurerie',
  'Chargés d’affaires et conducteurs de travaux lots métallerie',
  'Responsables atelier / méthodes',
  'Fonctions support (admin, suivi commandes, dossiers réception)',
] as const;

export const METALLERIE_PREREQUIS = [
  'Disposer de briefs clients, extraits CCTP ou notes chantier (anonymisés si besoin)',
  'Connaître le circuit de validation technique et commerciale de l’entreprise',
  'Aucun code requis',
] as const;

export const METALLERIE_PROGRAMME = [
  {
    title: 'Cadre IA pour métallerie / serrurerie',
    body: 'Ce que l’IA prépare (textes, tableaux, checklists) et ce qu’elle ne fait jamais : calculs de résistance, dimensions réglementaires inventées, conformité automatique.',
  },
  {
    title: 'Devis, CCTP et fournisseurs',
    body: 'Fiches besoin, désignations, synthèses d’exigences, consultations traçables.',
  },
  {
    title: 'Atelier, pose et réception',
    body: 'Suivi fabrication / livraison / pose, CR et documents de réception sous validation humaine.',
  },
] as const;

/** Exemple pédagogique fictif — commande de garde-corps (dimensions fournies uniquement). */
export const METALLERIE_EXEMPLE_FICTIF = {
  titre: 'Exemple pédagogique fictif — préparation documentaire d’une commande de garde-corps',
  contexte:
    'Brief client fictif (habitation, étage) : « Garde-corps balcon linéaire, longueur 4,20 m, hauteur demandée 1,00 m, pinces verre + main courante aluminium, couleur RAL 7016, pose sous 3 semaines. Accès par cage d’escalier uniquement. » Aucune note de calcul fournie.',
  livrableIa: `Fiche préparation commande (brouillon) :

Éléments confirmés (présents dans le brief) :
| Donnée | Valeur | Source |
| Longueur | 4,20 m | Brief client |
| Hauteur demandée par le client | 1,00 m | Brief client |
| Système | Pinces verre + main courante alu | Brief client |
| Finition | RAL 7016 | Brief client |
| Délai souhaité | 3 semaines | Brief client |
| Contrainte d’accès | Cage d’escalier uniquement | Brief client |

Points à vérifier (absents ou hors compétence IA) :
| Point | Statut | Action |
| Conformité hauteur / épaisseur au CCH pour l’ouvrage réel | À vérifier | Contrôle par le professionnel — voir sources officielles (Service-Public F481, CCH R. 134-59) |
| Type et épaisseur du verre | Non fourni | Demander au client / BET |
| Fixations et support (béton, acier, seuils) | Non fourni | Relevé chantier |
| Calculs de résistance / charges | Non fournis | Bureau d’études / logiciel métier — hors IA |
| Plans cotés et niveaux finis | Non fournis | Demander plans |

L’IA ne valide pas la conformité ni la résistance.`,
  controleHumain:
    'Le responsable atelier ou le chargé d’affaires complète les manques, fait valider les choix techniques et s’assure du respect des règles applicables avant fabrication et pose.',
} as const;

export const PROMPT_DEMANDE_CLIENT = `Tu assistes une entreprise de métallerie / serrurerie BTP en France.

Brief client (brut) :
[Coller]

Produis :
1. Fiche besoin structurée (uniquement les faits présents)
2. Liste « informations manquantes » (dimensions, supports, finitions, délais, accès, documents)
3. 5 questions max à poser au client

Interdits : inventer des dimensions, des normes ou une conformité.`;

export const PROMPT_DESIGNATIONS_DEVIS = `À partir des SEULES données validées ci-dessous, rédige des désignations de devis métallerie/serrurerie :

Données validées :
[Coller]

Format : poste | désignation | unité | qté (si fournie) | observations [À COMPLÉTER] si manque

Ne pas inventer de quantités, de performances ni de références produit absentes.`;

export const PROMPT_SUIVI_FAB_POSE = `Notes atelier / livraison / pose (anonymisées) :
[Coller]

Tableau :
réf. affaire | étape (fab / livraison / pose) | statut | prochaine action | source (note/mail)

Ne pas inventer d'avancement. Pas d'envoi automatique de commande ou de CR.`;

export const METALLERIE_FAQ: readonly FAQItem[] = [
  {
    q: 'L’IA peut-elle calculer la résistance d’un garde-corps ou valider sa conformité ?',
    a: 'Non. Elle aide à structurer les documents à partir des données fournies. Les calculs de résistance et la conformité réglementaire relèvent du professionnel compétent et des textes officiels (voir les liens Service-Public et Légifrance sur cette page pour les hauteurs en habitation).',
  },
  {
    q: 'Quelle différence avec la page clôturiste ou ferrailleur ?',
    a: `La <a href="${LINKS.formationIaCloturisteBtp}">page clôturiste</a> traite clôtures et portails ; le <a href="${LINKS.formationIaFerrailleurBtp}">ferrailleur</a> concerne les armatures béton. Ici : métallerie et serrurerie du bâtiment (ouvrages métalliques, portes techniques, garde-corps, etc.) — une seule page pour les deux intitulés SEO.`,
  },
  {
    q: 'Existe-t-il un programme catalogue « formation IA métallerie » dédié ?',
    a: 'Non. OFC ne publie pas de fiche catalogue spécialisée métallerie. Les entreprises s’appuient sur NIV-01 (rappel Qualiopi en bas de page) et, selon les dossiers, sur les usages CCTP / suivi des NIV-02 et NIV-03.',
  },
  {
    q: 'Peut-on coller un CCTP complet dans l’outil ?',
    a: 'Préférez des extraits anonymisés et les règles internes de confidentialité. En session, on travaille sur des dossiers non nominatifs ou masqués.',
  },
  {
    q: 'Financement OPCO / Constructys ?',
    a: 'Financement OPCO possible selon éligibilité (organisme Qualiopi). Le guide Constructys est lié dans le maillage en bas de page.',
  },
] as const;

/**
 * AllerPlusLoin — hors LiensConnexes (chargé d’affaires, menuisier, conducteur, iaDevis),
 * hors Renvoi NIV-01, hors FAQ (clôturiste / ferrailleur), hors CTA.
 */
export const METALLERIE_MAILLAGE = [
  {
    href: LINKS.formationIaBureauEtudesBtp,
    label: 'Formation IA bureau d’études — CCTP et exigences',
  },
  {
    href: LINKS.formationIaAchatsApprovisionnementBtp,
    label: 'Formation IA achats & approvisionnement BTP',
  },
  {
    href: LINKS.iaCompteRenduChantier,
    label: 'Méthode : comptes rendus de chantier avec l’IA',
  },
  {
    href: LINKS.formationAO,
    label: 'NIV-02 — IA appliquée aux appels d’offres BTP',
  },
  { href: LINKS.financement, label: 'Financement Constructys formation IA BTP' },
] as const;

export function buildMetallerieSerrurerieBtpCourseJsonLd(): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  const path = FORMATION_IA_METALLERIE_SERRURERIE_BTP_PATH;

  return {
    ...buildFormationFicheCourseJsonLd({
      name: 'Formation IA pour les entreprises de métallerie et de serrurerie',
      description: METALLERIE_SEO.description,
      path,
      educationalLevel: 'Intermediate',
      organizationId: `${base}/#organization`,
      instructorName: SCHEMA_PERSON_LAURE.name,
    }),
    provider: {
      '@type': 'Organization',
      '@id': `${base}/#organization`,
      name: SCHEMA_ORGANIZATION_OFC.name,
      url: base,
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        name: 'Certification Qualiopi',
        credentialCategory: 'certification',
      },
    },
    instructor: {
      '@type': 'Person',
      name: SCHEMA_PERSON_LAURE.name,
      jobTitle: SCHEMA_PERSON_LAURE.jobTitle,
      url: `${base}/a-propos`,
      sameAs: SCHEMA_LINKEDIN_PROFILE_URL,
    },
    offers: {
      '@type': 'Offer',
      price: String(TARIF_FORFAIT_AVANCE_HT),
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: `${base}${LINKS.prendreRdv}`,
    },
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'Entreprise de métallerie et serrurerie',
    },
  };
}
