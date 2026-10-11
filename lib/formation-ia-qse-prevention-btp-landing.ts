/**
 * Landing `/formation-ia-qse-prevention-btp` — IA pour QSE & prévention documentaire BTP.
 * Intention distincte du blog PPSPS et des landings conducteur / chef de chantier.
 * Pas de nouvelle formation catalogue QSE : renvoi NIV-03 + ressources existantes.
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

export const FORMATION_IA_QSE_PREVENTION_BTP_PATH =
  '/formation-ia-qse-prevention-btp' as const;

/** Sources officielles citées sur la page — à ne pas reformuler hors texte légal. */
export const QSE_SOURCES_OFFICIELLES = [
  {
    label: 'Code du travail — PPSPS (L. 4532-9 et section associée)',
    href: 'https://www.legifrance.gouv.fr/codes/id/LEGISCTA000006189737/',
  },
  {
    label:
      'Ministère du Travail — questions-réponses PPSPS entreprises BTP (PDF, mars 2026)',
    href: 'https://travail-emploi.gouv.fr/sites/travail-emploi/files/2026-03/Obligation-de-rediger-un-plan-particulier-de-securite-et-de-protection-de-la-sante-pour-les-entreprises-du-BTP-QR-Mars-2026.pdf',
  },
] as const;

export const QSE_PREVENTION_SEO = {
  title: 'IA QSE BTP : prévention documentaire',
  description:
    'Formation IA QSE BTP : structurer documents prévention, actions et sensibilisation sous validation. Formation IA pour le BTP. Présentiel IDF, Qualiopi.',
  h1: 'Formation IA pour la QSE et la prévention BTP — aide documentaire',
  openGraphTitle: 'IA QSE & prévention BTP — préparation documentaire',
} as const;

export const QSE_PREVENTION_EN_BREF = [
  'Page métier pour responsables QSE, préventeurs et équipes travaux : utiliser ChatGPT ou Claude pour préparer des documents de prévention à partir d’informations chantier vérifiées — jamais pour remplacer l’évaluation des risques ni la conformité réglementaire.',
  'L’IA accélère la mise en forme (trames, tableaux d’actions, supports d’accueil, synthèses d’incidents). Une personne compétente valide avant diffusion ou signature.',
  'Aucune formation QSE certifiée distincte n’est créée ici : les ateliers s’appuient sur les programmes catalogue existants (notamment NIV-03 — conduite de travaux & suivi chantier) et les ressources PPSPS / DUERP déjà publiées.',
] as const;

export const QSE_PREVENTION_USE_CASES = [
  {
    title: 'Structurer un projet de document à partir d’informations vérifiées',
    body: 'Partir d’une fiche chantier contrôlée (intervenants, phases, co-activités signalées) pour produire une trame de document à compléter — pas un document « prêt à signer ».',
  },
  {
    title: 'Supports d’accueil et de sensibilisation',
    body: 'Transformer vos consignes internes validées en support d’accueil clair (parcours, points de vigilance, contacts). L’IA ne prescrit pas de mesures de sécurité inventées.',
  },
  {
    title: 'Observations terrain → tableau de suivi des actions',
    body: 'Passer d’une liste d’observations à un tableau action / responsable / échéance / statut — pour le suivi QSE, sous relecture du responsable désigné.',
  },
  {
    title: 'Synthèses d’incidents et retours d’expérience',
    body: 'Structurer faits, chronologie et pistes d’amélioration à partir de vos notes — sans diagnostic médical ni conclusion de responsabilité automatique.',
  },
  {
    title: 'Comparer des versions de documents',
    body: 'Repérer ajouts, suppressions et reformulations entre deux versions (PPSPS, mode opératoire, consignes) pour accélérer la relecture humaine.',
  },
  {
    title: 'Assistant documentaire sur procédures validées',
    body: 'Configurer un assistant qui s’appuie uniquement sur vos procédures d’entreprise déjà validées — pas sur des « bonnes pratiques » inventées par le modèle.',
  },
] as const;

export const QSE_PREVENTION_PUBLIC = [
  'Responsables QSE / HSE d’entreprises BTP',
  'Préventeurs et référents sécurité chantier',
  'Conducteurs de travaux et chefs de chantier impliqués dans la documentation prévention',
  'Assistants travaux contribuant aux dossiers PPSPS, plans de prévention et suivis d’actions',
] as const;

export const QSE_PREVENTION_PREREQUIS = [
  'Connaître le déroulé documentaire de votre entreprise (PPSPS, plans de prévention, suivis)',
  'Disposer d’informations chantier vérifiées pour les exercices (anonymisées si besoin)',
  'Aucun code requis — formuler une demande en français suffit',
] as const;

export const QSE_PREVENTION_PROGRAMME = [
  {
    title: 'Cadre IA et prévention',
    body: 'Ce que l’IA peut préparer (structure, reformulation, tableaux) et ce qu’elle ne fait jamais (conformité automatique, évaluation fiable des risques, prescription de mesures).',
  },
  {
    title: 'Documents et supports',
    body: 'Trames à partir de données vérifiées, supports d’accueil, comparaison de versions, assistant branché sur vos procédures internes validées.',
  },
  {
    title: 'Suivi des actions et REX',
    body: 'Transformer observations et incidents en tableaux de suivi et synthèses — avec points de contrôle humains obligatoires avant diffusion.',
  },
] as const;

/** Exemple pédagogique fictif — ne pas présenter comme un cas client réel. */
export const QSE_PREVENTION_EXEMPLE_FICTIF = {
  titre: 'Exemple pédagogique fictif — observations chantier → liste d’actions',
  contexte:
    'Observations fictives notées en fin de matinée sur un chantier de réhabilitation : zone de stockage encombrée près d’un accès engins ; balisage d’une tranchée partiellement déplacé ; nouvel intervenant sans briefing d’accueil formalisé ; rappel verbal sur le port des EPI en zone de découpe.',
  livrableIa: `Tableau de suivi :
| Observation | Action proposée (brouillon) | Responsable | Échéance | Statut |
| Accès engins encombré | Remettre le stockage hors circulation + photo avant/après | Chef de chantier | J | À faire |
| Balisage tranchée incomplet | Reposer balisage selon plan de zone + contrôle | Chef d’équipe | J | À faire |
| Nouvel intervenant | Organiser briefing d’accueil selon procédure entreprise | Référent QSE | J+1 | Planifié |
| Zone découpe | Rappeler consignes EPI affichées (procédure validée) | Chef d’équipe | J | En cours |

Aucune mesure de prévention n’est inventée hors du contexte fourni ; les formulations restent des brouillons.`,
  controleHumain:
    'Le responsable QSE ou le chef d’entreprise vérifie la pertinence des actions, les échéances et la conformité aux procédures internes avant diffusion. L’IA ne valide ni le risque ni la conformité réglementaire.',
} as const;

export const PROMPT_TABLEAU_ACTIONS_QSE = `Tu assistes un responsable QSE BTP en France pour la MISE EN FORME documentaire uniquement.

Observations terrain (fictives ou anonymisées, déjà vérifiées par l'humain) :
[Coller les observations]

Produis un TABLEAU :
observation | action proposée (brouillon) | responsable (fonction) | échéance | statut (À faire / En cours / Fait)

Règles strictes :
- Ne pas inventer d'observation absente du texte
- Ne pas inventer de prescription de sécurité ni de mesure technique non mentionnée
- Si une action n'est pas déductible des notes, écrire [À PRÉCISER PAR LE RESPONSABLE QSE]
- Ajouter en bas : « Brouillon sous validation d'une personne compétente — ne constitue pas une évaluation des risques ni une conformité réglementaire. »`;

export const PROMPT_SUPPORT_ACCUEIL_QSE = `Tu prépares un SUPPORT D'ACCUEIL / SENSIBILISATION à partir UNIQUEMENT des consignes internes validées ci-dessous.

Consignes entreprise (extrait validé) :
[Coller — anonymiser si besoin]
Contexte chantier (faits vérifiés) :
[Coller]

Structure :
1. Accueil et contacts utiles (fonctions, pas de données personnelles inutiles)
2. Points de vigilance repris des consignes fournies
3. Parcours / zones mentionnés
4. Ce qui reste [À COMPLÉTER] si manquant

Interdit : inventer des EPI, des modes opératoires ou des obligations absentes des consignes.`;

export const PROMPT_COMPARE_VERSIONS_QSE = `Compare ces DEUX VERSIONS d'un document prévention (anonymisées) :

Version A :
[Coller]
Version B :
[Coller]

Liste :
1. Ajouts
2. Suppressions
3. Reformulations susceptibles de changer le sens
4. Points à faire valider par le responsable QSE

Ne juge pas la conformité réglementaire. Ne propose pas de nouvelles mesures.`;

export const QSE_PREVENTION_FAQ: readonly FAQItem[] = [
  {
    q: 'L’IA peut-elle garantir la conformité d’un PPSPS ou d’un plan de prévention ?',
    a: 'Non. Elle aide à structurer et reformuler à partir de vos informations. La conformité réglementaire et l’adéquation au chantier restent sous la responsabilité de l’entreprise et des personnes compétentes. Voir les sources officielles citées sur cette page (Légifrance, Ministère du Travail).',
  },
  {
    q: 'Quels documents peut-on exploiter avec l’IA en session ?',
    a: 'Des fiches chantier anonymisées, des extraits de procédures internes validées, des observations déjà relevées, des versions de documents à comparer. Pas de données personnelles inutiles, pas de secrets d’affaires non autorisés.',
  },
  {
    q: 'Comment gérer la confidentialité des données chantier ?',
    a: `Anonymisez les dossiers, limitez les noms et adresses précises, préférez un compte pro avec règles internes. Complément : <a href="${LINKS.blogSecuriteDonneesChatgptBtp}">sécurité des données ChatGPT BTP</a>.`,
  },
  {
    q: 'Quels contrôles humains sont obligatoires avant diffusion ?',
    a: 'Vérifier chaque fait sur le terrain ou les pièces sources, faire valider les mesures et formulations par une personne compétente, ne jamais signer un document généré sans relecture métier et juridique adaptée à votre organisation.',
  },
  {
    q: 'Quelle formation catalogue suivre — y a-t-il une session « QSE » dédiée ?',
    a: 'Non : OFC ne propose pas une formation QSE certifiée séparée. Les usages documentaires prévention (PPSPS, CR, suivi) sont travaillés notamment dans la session catalogue NIV-03 — rappelée en bas de page (encart Qualiopi). Les tutos PPSPS / DUERP et l’article PPSPS &amp; IA sont liés dans le maillage.',
  },
  {
    q: 'Financement OPCO / Constructys ?',
    a: 'Financement OPCO possible selon éligibilité (organisme Qualiopi). Le guide Constructys est accessible depuis le maillage en bas de page.',
  },
] as const;

/**
 * AllerPlusLoin — hors LiensConnexes (chef, assistante travaux, NIV-01, article PPSPS),
 * hors RenvoiFicheCatalogue (NIV-03), hors FAQ (sécurité données), hors CTA contact.
 */
export const QSE_PREVENTION_MAILLAGE = [
  { href: LINKS.tutoPpsps, label: 'Tuto gratuit — skill PPSPS avec Claude' },
  { href: LINKS.tutoDuerp, label: 'Tuto gratuit — skill DUERP avec Claude' },
  { href: LINKS.formationConducteurTravaux, label: 'Formation IA conducteur de travaux BTP' },
  { href: LINKS.iaCompteRenduChantier, label: 'Méthode : comptes rendus de chantier avec l’IA' },
  { href: LINKS.financement, label: 'Financement Constructys formation IA BTP' },
] as const;

export function buildQsePreventionBtpCourseJsonLd(): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  const path = FORMATION_IA_QSE_PREVENTION_BTP_PATH;

  return {
    ...buildFormationFicheCourseJsonLd({
      name: 'Formation IA pour la QSE et la prévention BTP — aide documentaire',
      description: QSE_PREVENTION_SEO.description,
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
      educationalRole: 'Responsable QSE et prévention BTP',
    },
  };
}
