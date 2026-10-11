/**
 * Landing `/formation-ia-menuisier-btp` — entreprises de menuiserie (int. / ext.) et d’agencement.
 * Une page pour les intentions proches ; distincte de la charpente / ossature (`/formation-ia-charpentier-btp`).
 * L’IA prépare et compare des documents ; elle ne valide ni mesures, ni plans de fab, ni performances.
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

export const FORMATION_IA_MENUISIER_BTP_PATH = '/formation-ia-menuisier-btp' as const;

/**
 * Sources officielles — identification des fascicules (pas de prescription technique reproduite).
 * AFNOR Éditions : pages catalogue des NF DTU concernés.
 */
export const MENUISERIE_SOURCES_OFFICIELLES = [
  {
    label:
      'AFNOR Éditions — NF DTU 36.2 P1-1 (menuiserie intérieure et agencement, bois et autres matériaux)',
    href: 'https://www.boutique.afnor.org/fr-fr/norme/nf-dtu-362-p11/travaux-de-batiment-menuiserie-interieure-et-agencement-bois-et-autres-mate/fa205104/453292',
  },
  {
    label:
      'AFNOR Éditions — NF DTU 36.5 P1-1 (mise en œuvre des fenêtres et portes extérieures)',
    href: 'https://www.boutique.afnor.org/fr-fr/norme/nf-dtu-365-p11/travaux-de-batiment-mise-en-oeuvre-des-fenetres-et-portes-exterieures-parti/fa155209/323133',
  },
] as const;

export const MENUISERIE_SEO = {
  title: 'IA menuiserie : intérieur, extérieur, agencement',
  description:
    'Formation IA menuiserie et agencement : devis, relevés, CCTP et suivi pose sous validation métier. Formation IA pour le BTP. Présentiel IDF, Qualiopi.',
  h1: 'Formation IA pour les entreprises de menuiserie et d’agencement',
  openGraphTitle: 'Formation IA menuiserie & agencement BTP',
} as const;

export const MENUISERIE_EN_BREF = [
  'Une page pour les entreprises de menuiserie intérieure, extérieure et d’agencement : ChatGPT et Claude pour structurer devis, relevés, CCTP, choix de finitions, suivi fabrication / pose et réponses AO — sur vos documents, sous validation métier.',
  'Public : dirigeants TPE/PME, chargés d’affaires, métreurs / études de prix, conducteurs de travaux, responsables atelier, assistants admin et commerciaux. Présentiel Île-de-France, Qualiopi.',
  'Progression catalogue : NIV-01 (bases documentaires), NIV-02 (appels d’offres), NIV-03 (conduite & suivi) — sans inventer de programme « menuiserie » isolé. Distinct de la page charpente / ossature. Pas de validation de mesures, plans de fabrication ou performances par l’IA.',
] as const;

export const MENUISERIE_PUBLIC = [
  'Dirigeants de TPE et PME de menuiserie et d’agencement',
  'Chargés d’affaires et commerciaux techniques',
  'Métreurs et techniciens études de prix',
  'Conducteurs de travaux',
  'Responsables atelier / méthodes',
  'Assistants administratifs et commerciaux',
] as const;

/** Section 1 — menuiserie intérieure */
export const MENUISERIE_INTERIEURE = {
  titre: 'Menuiserie intérieure',
  intro:
    'Portes, blocs-portes, placards, escaliers, habillages : l’IA aide à structurer les documents à partir des relevés et choix déjà fournis — jamais à inventer des cotes.',
  cas: [
    {
      title: 'Structurer les désignations d’un devis',
      body: 'Transformer un relevé fourni (pièces, types d’ouvrages, finitions indiquées) en postes de devis clairs — quantités et performances absentes marquées [À COMPLÉTER].',
    },
    {
      title: 'Synthétiser les exigences d’un CCTP',
      body: 'Tableau exigence / source / statut à partir d’extraits fournis — sans conclure à la conformité au fascicule.',
    },
    {
      title: 'Organiser finitions et quincailleries',
      body: 'Liste de choix (fins, ferrures, options) avec statut confirmé / à valider client — uniquement les références présentes dans vos notes.',
    },
    {
      title: 'Questions et validations client',
      body: 'Mail ou fiche de questions ouvertes avant commande atelier — ton professionnel, sans engagement hors devis.',
    },
    {
      title: 'Suivi des modifications, pose et réserves',
      body: 'Journal modification / impact / statut et brouillons de CR de pose à partir des faits fournis.',
    },
  ],
  livrables: [
    'Trame de devis intérieur (désignations)',
    'Tableau d’exigences CCTP',
    'Fiche choix finitions / quincaillerie',
    'Liste de questions client',
    'CR pose et réserves (brouillon)',
  ],
} as const;

/** Section 2 — menuiserie extérieure */
export const MENUISERIE_EXTERIEURE = {
  titre: 'Menuiserie extérieure',
  intro:
    'Fenêtres, portes-fenêtres, portes d’entrée, fermetures : l’enjeu documentaire porte sur le relevé de visite, les offres fournisseurs et les rapports de pose — pas sur le calcul de performances.',
  cas: [
    {
      title: 'Organiser un relevé de visite en fiche exploitable',
      body: 'Passer des notes terrain à une fiche structurée (baies, contraintes d’accès, dépose, points à revérifier) — sans inventer de dimensions absentes.',
    },
    {
      title: 'Comparer offres fournisseurs et fiches techniques',
      body: 'Tableau champs présents / absents / contradictoires entre deux offres ou fiches — jamais inventer Uw, Rw ou classements.',
    },
    {
      title: 'Repérer informations absentes ou contradictoires',
      body: 'Checklist des manques avant commande (cotes, finitions, délais annoncés, exclusions).',
    },
    {
      title: 'Courriers délais et conditions d’intervention',
      body: 'Brouillons de mails factuels à partir de vos dates et contraintes validées — relecture avant envoi.',
    },
    {
      title: 'Rapports de pose et documents de réception',
      body: 'Structurer CR, réserves et listes de pièces à joindre à partir des notes de pose.',
    },
  ],
  livrables: [
    'Fiche relevé de visite',
    'Comparatif offres / fiches (traçable)',
    'Liste d’écarts et manques',
    'Courriers délais / intervention',
    'Rapport de pose et réception (brouillon)',
  ],
} as const;

/** Section 3 — agencement */
export const MENUISERIE_AGENCEMENT = {
  titre: 'Agencement',
  intro:
    'Cuisines, dressings, commerces, bureaux : de brief client au suivi des réserves, l’IA structure le parcours documentaire sans inventer options, prix ou délais.',
  cas: [
    {
      title: 'Transformer un brief en cahier des besoins',
      body: 'Séparer besoins exprimés, hypothèses à confirmer et informations manquantes — uniquement à partir du brief fourni.',
    },
    {
      title: 'Structurer postes de devis et options',
      body: 'Arborescence postes + options (matériaux, équipements) sans inventer de quantités ni de PU.',
    },
    {
      title: 'Suivre choix matériaux, finitions et équipements',
      body: 'Tableau choix / statut / source (client, showroom, mail) pour éviter les oublis avant fabrication.',
    },
    {
      title: 'Préparer un planning à partir des délais validés',
      body: 'Jalons documentaires (commande, fab, livraison, pose) uniquement si les délais sont fournis — sinon [À COMPLÉTER].',
    },
    {
      title: 'Organiser les modifications et leur validation',
      body: 'Journal des demandes avec impact sur devis / atelier et statut de validation.',
    },
    {
      title: 'Comptes rendus et suivi des réserves',
      body: 'CR de pose et listes de réserves factuelles à partir des notes terrain.',
    },
  ],
  livrables: [
    'Cahier des besoins',
    'Trame devis + options',
    'Suivi des choix client',
    'Planning documentaire (si délais fournis)',
    'Journal des modifications',
    'CR et réserves',
  ],
} as const;

export const MENUISERIE_GESTION_COMMUNE = [
  {
    title: 'Consultations et relances fournisseurs',
    body: 'Demandes de prix structurées et relances factuelles — sans inventer de délais ou de stocks.',
  },
  {
    title: 'Synthèse des échanges clients',
    body: 'Résumer mails et notes en points décidés / ouverts / à chiffrer.',
  },
  {
    title: 'Suivi fabrication, livraison et pose',
    body: 'Tableau d’avancement à partir de vos notes atelier et chantier.',
  },
  {
    title: 'Préparation documentaire des réponses AO',
    body: 'Plans de mémoire et listes de pièces à partir du RC / CCTP fournis — atelier NIV-02.',
  },
  {
    title: 'Assistants IA sur modèles validés',
    body: 'Cadre pour des assistants qui réutilisent vos trames d’entreprise (devis, CR, mails) — validation humaine avant envoi.',
  },
] as const;

export const MENUISERIE_EXEMPLE_FICTIF = {
  titre: 'Exemple pédagogique fictif — menuiseries + agencement sur mesure',
  contexte:
    'Entreprise fictive (TPE IDF). Chantier logement : 3 fenêtres à remplacer (notes de visite fournies : baies A/B/C, dépose oui, finition RAL indiquée pour les châssis) + dressing sur mesure chambre (brief client : « 2,40 m de linéaire le long du mur nord, 2 colonnes, portes coulissantes, finition chêne clair — cotes définitives après relevé atelier »). Aucun prix, aucune performance thermique, aucun délai fournisseur fournis.',
  parcours: `Parcours documentaire (brouillon IA) :

1) Notes de visite → fiche de besoins
| Zone | Confirmé | Source | Manquant |
| Fenêtres A/B/C | Dépose oui, RAL châssis indiqué | Notes visite | Cotes définitives, type vitrage, quincaillerie |
| Dressing | Linéaire demandé 2,40 m, 2 colonnes, portes coulissantes, finition chêne clair | Brief client | Cotes atelier, quincaillerie, électricité éventuelle |

2) Trame de devis (désignations seules)
- Lot extérieur : dépose / fourniture / pose fenêtres A/B/C — [cotes et références à confirmer]
- Lot agencement : dressing linéaire — postes structure / façades / quincaillerie / pose — [options à valider]
- Interdit : inventer quantités, PU, délais, Uw

3) Questions à confirmer (exemples)
- Cotes baies et jeu de pose : relevé atelier ?
- Vitrage et performances : fiche fabricant à joindre ?
- Dressing : hauteur sous plafond et obstacles (radiateur, prises) ?
- Délais souhaités client vs délais fournisseurs réels ?

4) Suivi fabrication et pose (quand données fournies)
| Affaire | Étape | Statut | Source |
| Fenêtres | Commande fournisseur | [À COMPLÉTER] | — |
| Dressing | Fab atelier | [À COMPLÉTER] | — |
| Pose | Réserves | [À COMPLÉTER] | — |

Hypothèses (à ne pas traiter comme des faits) : aucune — tout ce qui n’est pas dans les notes reste [À COMPLÉTER].`,
  controleHumain:
    'Le chargé d’affaires ou le responsable atelier valide cotes, références produits, planning et conformité applicable avant commande et fabrication. L’IA ne valide ni mesures ni performances.',
} as const;

export const MENUISERIE_CONFIDENTIALITE = [
  'Anonymisez plans, adresses et noms clients avant collage dans un outil grand public.',
  'Préférez des extraits (relevé partiel, CCTP tronqué) plutôt que le dossier complet.',
  'Toute sortie IA est un brouillon : validation métier avant envoi client, commande ou fabrication.',
  'Les modèles d’entreprise (trames devis, CR) restent sous votre contrôle — l’assistant ne remplace pas la signature professionnelle.',
] as const;

export const MENUISERIE_PREREQUIS = [
  'Disposer de relevés, briefs, extraits CCTP ou notes (anonymisés si besoin)',
  'Connaître le circuit de validation commercial / atelier de l’entreprise',
  'Aucun code requis',
] as const;

export const PROMPT_INTERIEUR_DEVIS = `Tu assistes une entreprise de menuiserie intérieure / agencement en France.

Relevé / données validées :
[Coller — uniquement ce qui est fourni]

Produis :
1. Structure de devis (désignations) — postes intérieur
2. Liste « à confirmer » (cotes, finitions, quincaillerie)
Interdits : inventer dimensions, quantités, prix, performances.`;

export const PROMPT_EXTERIEUR_RELEVE = `Notes de visite menuiserie extérieure :
[Coller]

Fiche structurée :
baie / contrainte accès / dépose / finitions indiquées / manques / questions client ou fournisseur
Ne pas inventer de cotes ni de performances (Uw, Rw, classements).`;

export const PROMPT_AGENCEMENT_BESOINS = `Brief client agencement :
[Coller]

Cahier des besoins :
| Besoin exprimé | Hypothèse (si explicite) | Manquant |
Puis 5 questions max au client.
Pas de prix, pas de délais inventés, pas de cotes inventées.`;

export const MENUISERIE_FAQ: readonly FAQItem[] = [
  {
    q: 'Peut-on travailler sur nos devis et relevés ?',
    a: 'Oui, c’est le cœur de la session : vous apportez des extraits anonymisés (relevés, trames de devis, mails). On structure les livrables sans inventer de cotes ni de prix.',
  },
  {
    q: 'L’IA peut-elle comparer des offres fournisseurs ?',
    a: 'Elle peut aligner les champs présents sur deux offres ou fiches et signaler les absences ou contradictions. Elle n’invente pas de performances et ne tranche pas le choix fournisseur.',
  },
  {
    q: 'Comment protéger les données clients ?',
    a: 'Anonymisation, extraits, règles internes, et relecture avant envoi. Les bonnes pratiques sont rappelées en session ; évitez les plans nominatifs complets dans un outil grand public sans cadre.',
  },
  {
    q: 'La formation convient-elle aux équipes atelier et bureau ?',
    a: 'Oui : chargés d’affaires, études de prix, atelier et assistants peuvent travailler sur les mêmes dossiers avec des rôles de validation différents. Présentiel Île-de-France.',
  },
  {
    q: 'Quels contrôles conserver avant fabrication ou commande ?',
    a: 'Relevé et cotes validés, références produits, finitions confirmées, délais fournisseurs réels, et contrôle par le professionnel compétent. L’IA ne valide ni mesures ni plans de fabrication.',
  },
  {
    q: 'Quelle différence avec la page charpentier ?',
    a: `La <a href="${LINKS.formationIaCharpentierBtp}">page charpentier</a> traite charpente et ossature. Ici : menuiserie intérieure, extérieure et agencement — devis, relevés, suivi pose. Les deux pages se complètent sans mélanger les intentions.`,
  },
  {
    q: 'ChatGPT et Claude — lequel utiliser ?',
    a: `Les deux peuvent servir selon vos habitudes. La formation cadre la méthode (données fournies, confirmé / à vérifier, validation humaine). Voir aussi le <a href="${LINKS.claudeAiBtp}">guide Claude AI BTP</a> et la <a href="${LINKS.iaDevis}">méthode IA devis</a>.`,
  },
  {
    q: 'Financement OPCO / Constructys ?',
    a: 'Financement OPCO possible selon éligibilité (organisme Qualiopi). Le guide Constructys est lié dans le maillage en bas de page.',
  },
] as const;

/**
 * AllerPlusLoin — hors LiensConnexes, hors FAQ (charpentier, claude, iaDevis), hors Renvoi NIV-01, hors CTA.
 */
export const MENUISERIE_MAILLAGE = [
  {
    href: LINKS.formationAO,
    label: 'NIV-02 — IA appliquée aux appels d’offres BTP',
  },
  {
    href: LINKS.formationConducteurTravaux,
    label: 'NIV-03 — Formation IA conducteur de travaux',
  },
  {
    href: LINKS.bibliothequeSkills,
    label: 'Bibliothèque de skills Claude BTP',
  },
  {
    href: LINKS.formationIaMetallerieSerrurerieBtp,
    label: 'Formation IA métallerie & serrurerie',
  },
  { href: LINKS.financement, label: 'Financement Constructys formation IA BTP' },
] as const;

export function buildMenuisierBtpCourseJsonLd(): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  const path = FORMATION_IA_MENUISIER_BTP_PATH;

  return {
    ...buildFormationFicheCourseJsonLd({
      name: 'Formation IA pour les entreprises de menuiserie et d’agencement',
      description: MENUISERIE_SEO.description,
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
      educationalRole: 'Entreprise de menuiserie et d’agencement',
    },
  };
}
