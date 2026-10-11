/**
 * Landing `/formation-ia-isolation-btp` — entreprise d’isolation (ITI, ITE, combles…).
 * Intention distincte de carrelage (relevés / devis pose) et plâtrerie (cloisons / interfaces).
 * L’IA n’est pas un outil de validation thermique, acoustique, incendie ou de conformité.
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

export const FORMATION_IA_ISOLATION_BTP_PATH = '/formation-ia-isolation-btp' as const;

/** Cadre documentaire — pas de prescription de performances R / λ. */
export const ISOLATION_SOURCES_OFFICIELLES = [
  {
    label:
      'ADEME — rénovation énergétique des bâtiments tertiaires (cadre et ressources, page consultée pour ce contenu)',
    href: 'https://agirpourlatransition.ademe.fr/entreprises/conseils/transverse/renovation-batiments-tertiaires',
  },
] as const;

export const ISOLATION_SEO = {
  title: 'IA isolation : fiches et dossiers chantier',
  description:
    'Formation IA entreprise d’isolation : fiches produits, exigences et dossiers sous validation métier. Formation IA pour le BTP. Présentiel IDF, Qualiopi.',
  h1: 'Formation IA pour les entreprises d’isolation',
  openGraphTitle: 'Formation IA entreprise d’isolation BTP',
} as const;

export const ISOLATION_EN_BREF = [
  'Page dédiée aux entreprises d’isolation (ITI, ITE, combles, planchers selon vos marchés) : synthétiser des fiches produits fournies, préparer des devis documentaires et constituer des dossiers chantier — avec ChatGPT ou Claude, sous validation métier.',
  'Public : dirigeants, chargés d’affaires et équipes. Présentiel Île-de-France, Qualiopi. Financement OPCO possible selon éligibilité.',
  'Aucune fiche catalogue « isolation » inventée : ateliers sur les programmes existants (NIV-01 ; usages CCTP / dossiers aussi en NIV-02 / NIV-03). L’IA ne valide ni performance thermique, ni acoustique, ni incendie, ni conformité technique.',
] as const;

export const ISOLATION_USE_CASES = [
  {
    title: 'Synthétiser des fiches produits fournies',
    body: 'Tableau comparatif des champs présents sur vos fiches (épaisseur indiquée, usages mentionnés, documents joints) — cellules vides marquées [NON FOURNI], jamais de résistance thermique inventée.',
  },
  {
    title: 'Extraire les exigences documentaires d’un CCTP',
    body: 'Liste exigence / source / statut à partir d’extraits fournis (pièces à remettre, essais, DOE) — sans conclure à l’éligibilité CEE ou à une performance.',
  },
  {
    title: 'Préparer devis et dossiers chantier',
    body: 'Structure de devis (postes) et checklist de pièces dossier (fiches, photos, PV) à partir des seules données validées — contrôle humain avant envoi.',
  },
] as const;

export const ISOLATION_PUBLIC = [
  'Dirigeants d’entreprises d’isolation',
  'Chargés d’affaires et conducteurs de travaux lots isolation',
  'Équipes bureau (devis, dossiers, suivi documentaire)',
] as const;

export const ISOLATION_PREREQUIS = [
  'Disposer de fiches produits, extraits CCTP ou notes chantier (anonymisés si besoin)',
  'Connaître le circuit de validation technique et commerciale de l’entreprise',
  'Aucun code requis',
] as const;

export const ISOLATION_PROGRAMME = [
  {
    title: 'Cadre IA pour l’isolation',
    body: 'Ce que l’IA prépare (tableaux, checklists, brouillons) et ce qu’elle ne fait jamais : valider R / λ, acoustique, incendie ou conformité.',
  },
  {
    title: 'Fiches, CCTP et devis documentaires',
    body: 'Synthèses traçables, exigences documentaires, structures de devis sans performances inventées.',
  },
  {
    title: 'Dossiers chantier',
    body: 'Constitution de listes de pièces et suivis documentaires sous validation humaine.',
  },
] as const;

/** Exemple pédagogique fictif — dossier combles (données fournies uniquement). */
export const ISOLATION_EXEMPLE_FICTIF = {
  titre: 'Exemple pédagogique fictif — préparation documentaire d’un devis combles',
  contexte:
    'Brief client fictif (maison individuelle) : « Isolation combles perdus, surface indiquée 45 m², produit déjà choisi en interne (réf. fictive ISO-A, épaisseur 300 mm sur fiche fabricant fournie). Demande : devis + liste des pièces pour le dossier chantier. » Aucune valeur de résistance thermique ni objectif réglementaire fournis dans le brief.',
  livrableIa: `Brouillon documentaire :

Confirmé (présent dans les pièces) :
| Élément | Valeur | Source |
| Zone | Combles perdus | Brief client |
| Surface indiquée | 45 m² | Brief client |
| Référence produit | ISO-A (fictive) | Choix interne + fiche |
| Épaisseur sur fiche | 300 mm | Fiche fabricant fournie |

À vérifier / hors IA :
| Point | Statut | Action |
| Résistance thermique R | Non calculée par l’IA | Lire uniquement la fiche / certificat fourni |
| Pare-vapeur / étanchéité à l’air | Non précisé | Demander CCTP / méthode entreprise |
| Accès, trappes, points singuliers | Non fournis | Relevé chantier |
| Éligibilité aides / CEE | Non traitée | Professionnel / dossiers officiels |
| Quantités de chutes | Non inventées | Chiffrage métier |

L’IA ne valide aucune performance thermique, acoustique ou incendie.`,
  controleHumain:
    'Le chargé d’affaires ou le responsable technique complète les performances à partir des documents fabricant, vérifie la méthode de pose et la conformité applicable avant devis définitif et pose.',
} as const;

export const PROMPT_FICHES_PRODUITS = `Tu assistes une entreprise d’isolation BTP en France.

Fiches produits (texte) :
[Coller — uniquement les documents fournis]

Produis un tableau :
référence | champs présents (épaisseur, usage mentionné, docs joints…) | champs absents [NON FOURNI]

Interdits : inventer R, λ, classements feu / acoustique, compatibilités ou performances.`;

export const PROMPT_EXIGENCES_CCTP = `Extrait CCTP / CCTP isolation :
[Coller]

Tableau : exigence documentaire | citation courte | page/§ si connu | statut (clair / à clarifier)
Questions max 5 au MOE si ambigu.
Ne pas conclure à une conformité, une performance ou une éligibilité d’aide.`;

export const PROMPT_DEVIS_DOSSIER = `Données validées uniquement :
[Coller — surfaces indiquées, produits choisis, notes]

1. Structure de devis (postes, sans prix ni chutes inventées)
2. Checklist dossier chantier (pièces à joindre : fiches, photos, PV… selon ce qui est demandé)
Marquer [À COMPLÉTER] si manque.
Interdits : performances thermiques / acoustiques / feu inventées.`;

export const ISOLATION_FAQ: readonly FAQItem[] = [
  {
    q: 'L’IA peut-elle valider la performance thermique ou l’éligibilité CEE ?',
    a: 'Non. Elle aide à classer les informations présentes sur vos documents. Performances, classements et dossiers d’aides relèvent des pièces fabricant, des textes applicables et du professionnel compétent.',
  },
  {
    q: 'Quelle différence avec la plâtrerie ou le carrelage ?',
    a: `La <a href="${LINKS.formationIaPlatrerieBtp}">plâtrerie</a> traite cloisons, doublages et interfaces de lots ; le <a href="${LINKS.formationIaCarreleurBtp}">carrelage</a> traite relevés, calepinage fourni, devis et réserves. Ici : fiches produits, exigences documentaires et dossiers d’isolation.`,
  },
  {
    q: 'Existe-t-il un programme catalogue « formation IA isolation » ?',
    a: 'Non. OFC ne publie pas de fiche catalogue spécialisée isolation. Les entreprises s’appuient sur NIV-01 (rappel Qualiopi en bas de page) et, selon les dossiers, sur les usages CCTP / suivi des NIV-02 et NIV-03.',
  },
  {
    q: 'Peut-on coller des avis techniques complets ?',
    a: 'Préférez des extraits anonymisés et vos règles de confidentialité. En session, on travaille sur des dossiers non nominatifs ou masqués.',
  },
  {
    q: 'Financement OPCO / Constructys ?',
    a: 'Financement OPCO possible selon éligibilité (organisme Qualiopi). Le guide Constructys est lié dans le maillage en bas de page.',
  },
] as const;

/**
 * AllerPlusLoin — hors LiensConnexes, hors FAQ (plâtrerie / carrelage), hors Renvoi NIV-01, hors CTA.
 */
export const ISOLATION_MAILLAGE = [
  {
    href: LINKS.formationIaBureauEtudesBtp,
    label: 'Formation IA bureau d’études — CCTP et exigences',
  },
  {
    href: LINKS.formationIaAchatsApprovisionnementBtp,
    label: 'Formation IA achats & approvisionnement BTP',
  },
  {
    href: LINKS.formationIaEtancheur,
    label: 'Formation IA étancheur — enveloppe et interfaces',
  },
  {
    href: LINKS.iaDevis,
    label: 'IA pour les devis bâtiment — méthode',
  },
  { href: LINKS.financement, label: 'Financement Constructys formation IA BTP' },
] as const;

export function buildIsolationBtpCourseJsonLd(): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  const path = FORMATION_IA_ISOLATION_BTP_PATH;

  return {
    ...buildFormationFicheCourseJsonLd({
      name: 'Formation IA pour les entreprises d’isolation',
      description: ISOLATION_SEO.description,
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
      educationalRole: 'Entreprise d’isolation',
    },
  };
}
