/**
 * Landing `/formation-ia-genie-climatique-btp` — génie climatique, CVC, chauffagiste entreprise.
 * Une seule page pour les intentions proches (pas de pages séparées clim / CVC / chauffagiste).
 * Distincte de `/formation-ia-plombier-btp` (sanitaire, DTU 60, devis plomberie).
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

export const FORMATION_IA_GENIE_CLIMATIQUE_BTP_PATH =
  '/formation-ia-genie-climatique-btp' as const;

export const GENIE_CLIMATIQUE_SEO = {
  title: 'IA génie climatique : CVC et chauffagiste',
  description:
    'Formation IA génie climatique et CVC : CCTP, fiches techniques, rapports et DOE sous validation métier. Formation IA pour le BTP. Présentiel IDF, Qualiopi.',
  h1: 'Formation IA pour le génie climatique, le CVC et les entreprises chauffagistes',
  openGraphTitle: 'IA génie climatique / CVC — formation documentaire BTP',
} as const;

export const GENIE_CLIMATIQUE_EN_BREF = [
  'Page unique pour les entreprises de génie climatique, CVC et chauffage : ChatGPT et Claude pour structurer CCTP, fiches techniques, rapports d’intervention, DOE et relances clients — sans dimensionnement autonome ni conformité automatique.',
  'Public : dirigeants, chargés d’affaires, techniciens de bureau d’études, responsables maintenance et équipes administratives. Présentiel Île-de-France, Qualiopi.',
  'Pas de programme catalogue « CVC » inventé : les ateliers s’appuient sur les sessions existantes (notamment NIV-01 bâtiment & TP ; usages CCTP/DOE aussi présents en NIV-02 / NIV-03). Pour la plomberie sanitaire et le DTU 60, voir la page plomberie.',
] as const;

export const GENIE_CLIMATIQUE_USE_CASES = [
  {
    title: 'Synthétiser un CCTP et organiser les exigences par équipement',
    body: 'Extraire des exigences (PAC, CTA, chaudière, réseaux, régulation…) à partir d’extraits CCTP fournis — tableau équipement / exigence / source / statut, sans inventer de performances.',
  },
  {
    title: 'Comparer des informations de fiches techniques',
    body: 'Aligner deux fiches fabricant sur les champs présents ; distinguer caractéristiques vérifiées (citées) et données absentes — jamais de compatibilité inventée.',
  },
  {
    title: 'Préparer les questions aux fournisseurs',
    body: 'Liste de clarifications factuelles (unité, plage, options, délai, exclusions) à partir des manques repérés — ton neutre, références aux documents sources.',
  },
  {
    title: 'Structurer les rapports d’intervention',
    body: 'Transformer les notes du technicien en rapport lisible (constats, actions, pièces, suite) — validation du professionnel avant envoi client.',
  },
  {
    title: 'Organiser documents de maintenance et DOE',
    body: 'Sommaire et checklist de pièces (notices, PV, schémas fournis) pour maintenance ou DOE — sans déclarer un DOE « conforme » automatiquement.',
  },
  {
    title: 'Rédiger réponses et relances clients',
    body: 'Mails de suivi, explications de planning ou demandes de documents — à partir de faits fournis, sans promesse technique non validée.',
  },
] as const;

export const GENIE_CLIMATIQUE_PUBLIC = [
  'Dirigeants d’entreprises CVC / génie climatique / chauffage',
  'Chargés d’affaires et conducteurs de travaux lots techniques',
  'Techniciens et projeteurs de bureau d’études fluides',
  'Responsables maintenance et équipes administratives',
] as const;

export const GENIE_CLIMATIQUE_PREREQUIS = [
  'Disposer d’extraits CCTP, fiches techniques ou notes d’intervention (anonymisés si besoin)',
  'Connaître le circuit de validation technique de votre entreprise',
  'Aucun code requis — formuler une demande en français suffit',
] as const;

export const GENIE_CLIMATIQUE_PROGRAMME = [
  {
    title: 'Cadre IA pour le génie climatique',
    body: 'Ce que l’IA structure (textes, tableaux, checklists) et ce qu’elle ne fait jamais : dimensionnement, validation de performance énergétique, prescription ou conformité automatique.',
  },
  {
    title: 'CCTP, fiches techniques et fournisseurs',
    body: 'Synthèses d’exigences par équipement, comparatifs documentaires sourcés, questions de clarification.',
  },
  {
    title: 'Intervention, maintenance, DOE et client',
    body: 'Rapports à partir de notes terrain, organisation documentaire, relances — sous validation du professionnel compétent.',
  },
] as const;

/** Exemple pédagogique fictif — comparaison documentaire de deux équipements. */
export const GENIE_CLIMATIQUE_EXEMPLE_FICTIF = {
  titre: 'Exemple pédagogique fictif — comparaison documentaire de deux PAC air/eau',
  contexte:
    'Lot CVC fictif. Deux fiches techniques fabricant (PDF) pour une pompe à chaleur air/eau destinée à un tertiaire léger. Objectif atelier : comparer ce qui est écrit, pas dimensionner ni choisir l’équipement.',
  livrableIa: `Tableau comparatif (brouillon) :

| Critère | Équipement A | Équipement B | Statut | Source |
| Puissance calorifique nominale | 16 kW | 16 kW | Vérifié (identique) | Fiche A §3 / Fiche B p.2 |
| Plage de fonctionnement extérieur | −15 °C à +35 °C | [NON FOURNI] | Donnée absente côté B | A §4 ; B — |
| Niveau sonore extérieur | 58 dB(A) | 61 dB(A) | Vérifié (différent) | A p.5 / B p.4 |
| Fluide frigorigène | R32 | R32 | Vérifié | A §specs / B §specs |
| Compatibilité ballon ECS | [NON FOURNI] | Mention « kit optionnel » sans référence | À clarifier fournisseur | B p.7 |
| COP / SCOP selon norme citée | SCOP 4,2 (EN 14825 indiquée) | COP 4,0 sans norme | Partiel — ne pas extrapoler | A §perf / B §perf |

Interdit en atelier : inventer une performance, déclarer une conformité RE2020, ou conclure au « meilleur » équipement.`,
  controleHumain:
    'Le technicien BE ou le chargé d’affaires recoupe chaque cellule sur le PDF source, complète les absences auprès du fabricant, et valide toute conclusion technique avant diffusion.',
} as const;

export const PROMPT_CCTP_EQUIPEMENTS = `Tu assistes un bureau d'études / chargé d'affaires CVC en France.

Extrait CCTP (anonymisé) :
[Coller — max 2 500 mots]

Produis un TABLEAU :
équipement ou lot | exigence citée | référence CCTP (article/§) | statut (OK / À CONFIRMER / ABSENT DU TEXTE)

Règles :
- Ne pas inventer d'exigence absente
- Ne pas dimensionner ni proposer de marque
- Marquer [À VÉRIFIER SUR PIÈCE COMPLÈTE] si extrait partiel
- Ajouter : « Brouillon sous validation technique humaine. »`;

export const PROMPT_COMPARE_FICHES = `Compare ces DEUX FICHES TECHNIQUES (textes extraits) pour un même type d'équipement CVC.

Fiche A — fichier / date :
[Coller]
Fiche B — fichier / date :
[Coller]

Tableau :
critère | valeur A | valeur B | statut (vérifié / absent / ambigu) | source (fiche + repère)

Interdits : inventer performances, compatibilités, prescriptions ou conformité réglementaire. Lister ensuite 5 questions max pour les fournisseurs sur les champs [ABSENT] ou [AMBIGU].`;

export const PROMPT_RAPPORT_INTERVENTION = `Tu structures un RAPPORT D'INTERVENTION CVC / génie climatique à partir des notes technicien UNIQUEMENT.

Notes :
[Coller]

Structure :
1. Contexte (site, équipement — si fourni)
2. Constats factuels
3. Actions réalisées (si mentionnées)
4. Suite / points à valider
5. Pièces ou photos à joindre (si indiquées)

Ne pas inventer de diagnostic, de pièce défectueuse ni de mesure de performance. Ajouter : « Sous validation du technicien / responsable avant envoi. »`;

export const GENIE_CLIMATIQUE_FAQ: readonly FAQItem[] = [
  {
    q: 'Quelle différence avec la formation IA plomberie ?',
    a: `La page <a href="${LINKS.formationPlombierBtp}">plomberie sanitaire</a> se centre sur devis sanitaires, évacuations, SAV et DTU 60. Ici : entreprise de génie climatique / CVC / chauffagiste — CCTP par équipement, fiches techniques, maintenance, DOE (pas de landings clim séparées).`,
  },
  {
    q: 'L’IA peut-elle dimensionner une installation ou valider une performance énergétique ?',
    a: 'Non. Elle aide à organiser et comparer des informations documentaires. Dimensionnement, calculs et conformité restent sous outils métier et validation du professionnel compétent.',
  },
  {
    q: 'Existe-t-il un programme catalogue « formation IA CVC » dédié ?',
    a: 'Non : OFC ne publie pas de fiche catalogue spécialisée CVC. Les entreprises s’appuient sur les sessions existantes — notamment NIV-01 (bases documentaires BTP), avec des usages CCTP / DOE aussi couverts en NIV-02 et NIV-03. L’encart Qualiopi en bas de page renvoie à NIV-01.',
  },
  {
    q: 'Que faire des données absentes dans une fiche technique ?',
    a: 'Les marquer [NON FOURNI] ou [À CLARIFIER], préparer des questions fournisseur, et ne jamais combler le vide par une hypothèse présentée comme un fait.',
  },
  {
    q: 'Financement OPCO / Constructys ?',
    a: 'Financement OPCO possible selon éligibilité (organisme Qualiopi). Le guide Constructys est lié dans le maillage en bas de page.',
  },
] as const;

/**
 * AllerPlusLoin — hors LiensConnexes, hors Renvoi NIV-01, hors FAQ (plombier), hors CTA.
 */
export const GENIE_CLIMATIQUE_MAILLAGE = [
  {
    href: LINKS.formationIaBureauEtudesBtp,
    label: 'Formation IA bureau d’études — analyse DCE / CCTP',
  },
  {
    href: LINKS.formationElectricienBtp,
    label: 'Formation IA électricien BTP — lots techniques',
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

export function buildGenieClimatiqueBtpCourseJsonLd(): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  const path = FORMATION_IA_GENIE_CLIMATIQUE_BTP_PATH;

  return {
    ...buildFormationFicheCourseJsonLd({
      name: 'Formation IA pour le génie climatique, le CVC et les entreprises chauffagistes',
      description: GENIE_CLIMATIQUE_SEO.description,
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
      educationalRole: 'Entreprise génie climatique / CVC',
    },
  };
}
