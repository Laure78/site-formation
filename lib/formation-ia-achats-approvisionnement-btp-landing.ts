/**
 * Landing `/formation-ia-achats-approvisionnement-btp` — achats & approvisionnement chantier.
 * Intention distincte du chiffrage / études de prix (prix de vente) et des devis client.
 * Pas de nouvelle formation catalogue : renvoi NIV-03 (approvisionnements) + pages liées.
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

export const FORMATION_IA_ACHATS_APPROVISIONNEMENT_BTP_PATH =
  '/formation-ia-achats-approvisionnement-btp' as const;

export const ACHATS_SEO = {
  title: 'IA achats BTP : consultation fournisseurs',
  description:
    'Formation IA achats BTP : consultations, comparatifs d’offres et suivi livraisons sous validation. Formation IA pour le BTP. Présentiel IDF, Qualiopi.',
  h1: 'Formation IA pour les achats et l’approvisionnement chantier BTP',
  openGraphTitle: 'IA achats & approvisionnement chantier BTP',
} as const;

export const ACHATS_EN_BREF = [
  'Page métier pour responsables achats, approvisionneurs, chargés d’affaires et dirigeants de PME BTP : structurer consultations fournisseurs, comparatifs d’offres et suivi des livraisons — sans laisser l’IA choisir un fournisseur ni envoyer une commande.',
  'Différence avec le chiffrage : ici on travaille les achats et l’approvisionnement (fournisseurs, délais, transport). Le chiffrage prépare le prix de vente (DPGF, métrés, offre client).',
  'Aucune formation « achats » catalogue séparée : les usages sont travaillés notamment dans NIV-03 (conduite de travaux & suivi — module approvisionnements). Présentiel Île-de-France, Qualiopi, financement OPCO possible selon éligibilité.',
] as const;

export const ACHATS_USE_CASES = [
  {
    title: 'Préparer une consultation fournisseurs',
    body: 'Transformer un besoin chantier validé (quantités, spécifications, délais, lieu) en demande de prix structurée — sans inventer de spécifications techniques absentes du besoin.',
  },
  {
    title: 'Tableau comparable de plusieurs offres',
    body: 'Aligner prix HT, unité, quantité, transport, disponibilité et validité dans un même tableau, avec colonne « document source » pour chaque cellule.',
  },
  {
    title: 'Repérer les informations manquantes',
    body: 'Checklist automatique : quantité, unité, transport, délai, exclusions, conditions de paiement — pour relancer avant arbitrage.',
  },
  {
    title: 'Demandes de clarification et relances',
    body: 'Rédiger des questions factuelles et des relances de délai — ton professionnel, faits sourcés, aucune commande implicite.',
  },
  {
    title: 'Suivi des commandes et livraisons',
    body: 'Tableau de suivi (référence commande, fournisseur, date promise, statut, prochaine action) à partir de vos notes ou e-mails — pas une intégration ERP.',
  },
  {
    title: 'Comparer les versions d’un tarif fournisseur',
    body: 'Repérer hausses, suppressions de lignes et changements d’unités entre deux grilles — validation humaine des prix et caractéristiques avant mise à jour interne.',
  },
] as const;

export const ACHATS_PUBLIC = [
  'Responsables achats et approvisionneurs BTP',
  'Chargés d’affaires impliqués dans les consultations fournisseurs',
  'Dirigeants de PME qui gèrent eux-mêmes les achats chantier',
  'Assistants travaux / administratifs suivant les commandes et livraisons',
] as const;

export const ACHATS_PREREQUIS = [
  'Disposer de besoins chantier ou d’offres fournisseurs (anonymisés si besoin)',
  'Connaître votre circuit de validation des achats (qui décide, qui commande)',
  'Aucun code requis — formuler une demande en français suffit',
] as const;

export const ACHATS_PROGRAMME = [
  {
    title: 'Cadre IA pour les achats chantier',
    body: 'Limites : l’IA structure et compare ; elle ne sélectionne pas le fournisseur, n’engage pas la commande et n’intègre pas votre ERP sans projet dédié documenté.',
  },
  {
    title: 'Consultations et comparatifs traçables',
    body: 'Demandes de prix, tableaux multi-offres avec source par donnée, détection des manques (quantité, unité, transport, délai, exclusions).',
  },
  {
    title: 'Suivi et versions tarifaires',
    body: 'Relances, suivi livraisons, comparaison de grilles fournisseurs — avec validation humaine des prix et caractéristiques avant diffusion interne.',
  },
] as const;

/** Exemple pédagogique fictif — ne pas présenter comme un cas client réel. */
export const ACHATS_EXEMPLE_FICTIF = {
  titre: 'Exemple pédagogique fictif — trois offres granulats / livraison chantier',
  contexte:
    'Besoin validé (fictif) : 120 t de grave 0/31,5, livraison sur chantier IDF, démarrage sous 10 jours. Trois réponses fournisseurs reçues par e-mail (PDF / tableau).',
  livrableIa: `Tableau comparatif (brouillon) :

| Critère | Offre A | Offre B | Offre C | Source |
| Prix HT | 18 €/t | 17,50 €/t | 19 €/t | PDF A p.1 / mail B / grille C v.2026-03 |
| Unité | t | t | t | idem |
| Quantité | 120 t | 120 t | 100 t min. | idem — C : [À CONFIRMER] lot minimum |
| Transport | Inclus rayon 30 km | 220 € forfait | Non inclus | A p.2 / B §frais / C « départ usine » |
| Disponibilité | J+5 | J+8 | J+3 | mails A/B/C |
| Validité offre | 15 jours | 7 jours | 30 jours | pieds de page |
| Points à confirmer | — | Pénalités retard ? | Prix transport + surcoût < 120 t | [À POSER] |

Rappel : l’IA ne désigne pas le fournisseur retenu. Arbitrage humain sur prix, caractéristiques et risques.`,
  controleHumain:
    'Vérifier chaque cellule sur le document source, valider unités et exclusions, puis faire décider la personne habilitée avant toute commande. Aucun envoi de commande par l’IA.',
} as const;

export const PROMPT_CONSULTATION_FOURNISSEURS = `Tu assistes un responsable achats BTP en France.

Besoin chantier VALIDÉ (ne rien inventer) :
[Coller : produit/matériau, quantités, unités, specs, délai, lieu de livraison, contraintes]

Rédige une DEMANDE DE PRIX structurée :
1. Objet et référence interne
2. Détail des postes (quantité, unité, spécifications fournies uniquement)
3. Informations attendues du fournisseur (prix HT, transport, délai, validité, exclusions)
4. Date limite de réponse

Règles : pas de spécification technique absente du besoin ; marquer [À COMPLÉTER] si manque ; ne pas engager de commande.`;

export const PROMPT_COMPARATIF_OFFRES = `Tu structures un COMPARATIF d'offres fournisseurs BTP.

Offre A (texte ou tableau) + nom fichier / date :
[Coller]
Offre B :
[Coller]
Offre C :
[Coller]

Produis un tableau :
critère | offre A | offre B | offre C | document source (fichier + repère)

Critères minimum : prix HT, unité, quantité, frais de transport, disponibilité, validité de l'offre, exclusions, points à confirmer.

Règles :
- Chaque cellule doit citer sa source ; si absent → [NON FOURNI]
- Ne pas calculer de total inventé si données manquantes
- Ne pas recommander un fournisseur gagnant
- Ajouter : « Brouillon sous validation achats — l'IA ne choisit pas le fournisseur. »`;

export const PROMPT_SUIVI_COMMANDES = `À partir de ces notes / e-mails (anonymisés) :
[Coller]

Produis un TABLEAU DE SUIVI :
réf. commande | fournisseur | article | qté | date promise | statut | prochaine action | source

Ne pas inventer de dates ni de quantités. Pas d'envoi de relance automatique — proposer seulement des brouillons de texte si demandé.`;

export const ACHATS_FAQ: readonly FAQItem[] = [
  {
    q: 'Quelle différence avec la formation / page études de prix et chiffrage ?',
    a: `Les <a href="${LINKS.formationIaEtudesPrixChiffrageBtp}">études de prix et le chiffrage</a> préparent le <strong>prix de vente</strong> (DPGF, métrés, offre client). Cette page traite les <strong>achats et l’approvisionnement</strong> : consultations fournisseurs, comparatifs d’offres, suivi des livraisons.`,
  },
  {
    q: 'L’IA peut-elle choisir le fournisseur ou passer commande ?',
    a: 'Non. Elle structure les comparatifs et les brouillons de mails. La sélection du fournisseur, la validation des prix et caractéristiques, puis l’envoi de commande restent humains et traçables.',
  },
  {
    q: 'Faut-il un ERP ou une intégration logicielle ?',
    a: 'Non pour démarrer. On travaille sur e-mails, PDF et tableaux. Aucune intégration ERP n’est annexe ou promise sur cette page.',
  },
  {
    q: 'Comment assurer la traçabilité des données comparées ?',
    a: 'Chaque ligne du tableau porte une colonne « document source » (fichier, page, date). En session, on refuse les cellules sans source ou on les marque [NON FOURNI].',
  },
  {
    q: 'Quelle formation catalogue suivre ?',
    a: 'Il n’existe pas de fiche catalogue « achats » séparée. Les usages approvisionnement figurent notamment dans NIV-03 (conduite de travaux & suivi) — rappelée en bas de page. Compléments : chargé d’affaires et études de prix selon votre rôle.',
  },
  {
    q: 'Financement OPCO / Constructys ?',
    a: 'Financement OPCO possible selon éligibilité (organisme Qualiopi). Le guide Constructys est lié dans le maillage en bas de page.',
  },
] as const;

/**
 * AllerPlusLoin — hors LiensConnexes (chargé d’affaires, chef chantier, NIV-01, guide CA),
 * hors Renvoi NIV-03, hors FAQ (études de prix), hors CTA contact.
 */
export const ACHATS_MAILLAGE = [
  {
    href: LINKS.formationIaBureauEtudesBtp,
    label: 'Formation IA bureau d’études et études de prix',
  },
  {
    href: LINKS.iaDevis,
    label: 'IA pour les devis bâtiment — méthode',
  },
  {
    href: LINKS.formationConducteurTravaux,
    label: 'Formation IA conducteur de travaux BTP',
  },
  {
    href: LINKS.formationIaTravauxPublics,
    label: 'Formation IA travaux publics — consultations TP',
  },
  { href: LINKS.financement, label: 'Financement Constructys formation IA BTP' },
] as const;

export function buildAchatsApprovisionnementBtpCourseJsonLd(): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  const path = FORMATION_IA_ACHATS_APPROVISIONNEMENT_BTP_PATH;

  return {
    ...buildFormationFicheCourseJsonLd({
      name: 'Formation IA pour les achats et l’approvisionnement chantier BTP',
      description: ACHATS_SEO.description,
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
      educationalRole: 'Responsable achats et approvisionnement BTP',
    },
  };
}
