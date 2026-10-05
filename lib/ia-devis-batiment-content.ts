/**
 * Contenu éditorial — page `/ia-devis-batiment`.
 * Formation catalogue liée : NIV-01 (devis, emails, productivité).
 */
import {
  FORMATION_NIV01,
  libelleDureeFormation,
  libelleEffectifFormation,
  libellePrixSessionHt,
} from '@/data/formations';
import { FINANCEMENT_FORMULATION_COURTE } from '@/lib/financement-copy';
import { LINKS } from '@/lib/internal-links';
import { IDF_ZONE_INTERVENTION } from '@/lib/constants';
import { MODALITE_FORMATIONS_PRESENTIEL } from '@/lib/tarifs-sessions';

export const IA_DEVIS_PATH = LINKS.iaDevis;

/**
 * Prérequis NIV-01 — aligné sur `lib/infos-pratiques-catalogue.ts` (PREREQUIS_NIV01).
 * Éviter `getInfosPratiquesForCatalogue` ici : trop lourd pour ce module de contenu.
 */
const PREREQUIS_NIV01_IA_DEVIS =
  'Savoir utiliser un ordinateur et un smartphone. Bonne maîtrise du français écrit et oral. La formation de niveau débutant ne nécessite aucune pratique préalable de l’IA ni abonnement payant : les versions gratuites suffisent. Un compte payant (Claude Pro, ChatGPT Plus) est seulement recommandé pour aller plus loin ensuite — non inclus dans le tarif.';

/** Segment title SEO (suffixe « | Laure Olivié » ajouté par createPageMetadata). */
export const IA_DEVIS_SEO = {
  title: 'IA devis BTP : structurer vos devis avec l’IA',
  description:
    'Apprenez à utiliser l’IA pour structurer vos devis BTP, rédiger vos descriptifs et créer vos variantes. Formation IA pour le BTP, présentiel IDF, Qualiopi.',
  h1: 'Créer et structurer ses devis BTP plus rapidement avec l’IA',
} as const;

export const IA_DEVIS_FORMATION = FORMATION_NIV01;
export const IA_DEVIS_FORMATION_HREF = LINKS.formationIaBtpNiveau1BatimentTp;

export const IA_DEVIS_FORMATION_FACTS = {
  duree: libelleDureeFormation(FORMATION_NIV01),
  modalite: MODALITE_FORMATIONS_PRESENTIEL,
  public: FORMATION_NIV01.public,
  prerequis: PREREQUIS_NIV01_IA_DEVIS,
  tarif: libellePrixSessionHt(FORMATION_NIV01),
  financement: FINANCEMENT_FORMULATION_COURTE,
  lieu: `Présentiel en Île-de-France (${IDF_ZONE_INTERVENTION})`,
  effectif: libelleEffectifFormation(FORMATION_NIV01),
  titre: FORMATION_NIV01.titre,
  promesse: FORMATION_NIV01.promesse,
} as const;

export const IA_DEVIS_HERO_BENEFICES = [
  'Structurer un devis à partir de vos notes chantier',
  'Rédiger des descriptifs techniques plus rapidement',
  'Créer des variantes sans tout recommencer',
] as const;

export const IA_DEVIS_REASSURANCE =
  '4 h de pratique • Cas BTP réels • Présentiel en Île-de-France • Organisme certifié Qualiopi' as const;

export const IA_DEVIS_PREUVES = [
  { label: 'Formation pratique', detail: 'Session courte, ateliers sur documents réels' },
  { label: 'Cas réels BTP', detail: 'Devis, notes chantier, situations métier' },
  { label: 'Qualiopi', detail: 'Organisme certifié — actions de formation' },
  { label: 'Financement', detail: FINANCEMENT_FORMULATION_COURTE },
] as const;

export const IA_DEVIS_PROBLEMES = [
  {
    titre: 'Reprendre les notes prises sur chantier',
    desc: 'Carnet, photos, messages vocaux : tout est à retranscrire avant de chiffrer.',
  },
  {
    titre: 'Détailler les prestations',
    desc: 'Découper le chantier en postes clairs, compréhensibles pour le client.',
  },
  {
    titre: 'Reformuler les descriptifs techniques',
    desc: 'Passer du jargon chantier à un libellé professionnel, sans perdre le sens.',
  },
  {
    titre: 'Préparer plusieurs variantes',
    desc: 'Options matériaux, lots avec/sans, scénarios — souvent recopiés à la main.',
  },
] as const;

export const IA_DEVIS_AVANT = [
  'Notes chantier',
  'Document vierge',
  'Recherche des formulations',
  'Copier-coller d’anciens devis',
  'Création manuelle des variantes',
] as const;

export const IA_DEVIS_AVEC = [
  'Notes structurées',
  'Trame du devis',
  'Descriptifs préparés',
  'Postes organisés',
  'Variantes générées',
] as const;

export const IA_DEVIS_ETAPES = [
  {
    n: '01',
    titre: 'Donner le contexte chantier',
    desc: 'Métier, type de travaux, surfaces, matériaux, contraintes et notes de visite.',
  },
  {
    n: '02',
    titre: 'Faire structurer les prestations',
    desc: 'L’IA organise le devis en postes et sous-postes cohérents.',
  },
  {
    n: '03',
    titre: 'Préparer les descriptifs',
    desc: 'Elle aide à rédiger des descriptions professionnelles et compréhensibles.',
  },
  {
    n: '04',
    titre: 'Vérifier et chiffrer',
    desc: 'L’entreprise renseigne et contrôle les quantités, prix, marges, TVA, délais et conditions.',
  },
] as const;

export const IA_DEVIS_DEMO_NOTES = [
  'Salle de bain 8 m²',
  'Dépose ancienne douche',
  'Création douche à l’italienne',
  'Modification plomberie',
  'Carrelage sol et murs',
  'Meuble vasque',
  'Peinture plafond',
] as const;

export const IA_DEVIS_DEMO_POSTES = [
  'Installation et protection',
  'Dépose et évacuation',
  'Modification des réseaux',
  'Préparation et étanchéité',
  'Carrelage',
  'Installation des sanitaires',
  'Peinture et finitions',
  'Nettoyage et réception',
] as const;

export const IA_DEVIS_PEUT = [
  'Structurer un devis',
  'Rédiger un descriptif',
  'Reformuler des prestations',
  'Créer des variantes',
  'Analyser des notes chantier',
  'Préparer un tableau exploitable',
] as const;

export const IA_DEVIS_NE_DOIT_PAS = [
  'Décider seule d’un prix',
  'Inventer des quantités',
  'Calculer votre marge sans données fiables',
  'Déterminer seule un taux de TVA',
  'Garantir une conformité technique',
  'Remplacer la validation du professionnel',
] as const;

export const IA_DEVIS_FORMATION_HIGHLIGHTS = [
  'Exercices BTP',
  'Utilisation de cas concrets',
  'Modèles réutilisables',
  'Validation humaine systématique',
] as const;

export const IA_DEVIS_LIVRABLES = [
  {
    titre: 'Une méthode pour structurer ses devis avec l’IA',
    desc: 'Un déroulé simple : contexte → trame → descriptifs → contrôle.',
  },
  {
    titre: 'Des prompts adaptés aux usages BTP',
    desc: 'Des formulations par métier, à adapter à vos chantiers.',
  },
  {
    titre: 'Une grille de contrôle avant envoi',
    desc: 'Checklist pour sécuriser prix, quantités, TVA et mentions.',
  },
  {
    titre: 'Des modèles réutilisables dans l’entreprise',
    desc: 'Trames et prompts à partager avec votre équipe.',
  },
] as const;

export const IA_DEVIS_CHECKLIST = [
  'Prestations',
  'Quantités',
  'Prix unitaires',
  'Marges',
  'TVA applicable (selon l’opération)',
  'Coordonnées client',
  'Délais',
  'Conditions de paiement',
  'Documents contractuels',
  'Version finale du devis',
] as const;

export const IA_DEVIS_ERREURS = [
  {
    titre: 'Laisser l’IA inventer les prix',
    desc: 'Les montants « plausibles » ne sont pas vos prix. Seule votre grille tarifaire et votre visite comptent.',
  },
  {
    titre: 'Utiliser un prompt trop vague',
    desc: 'Sans métier, surfaces ni contraintes, vous obtenez un brouillon inutilisable. Précisez le contexte.',
  },
  {
    titre: 'Copier des données sensibles sans précaution',
    desc: 'Anonymisez clients, plans et prix fournisseurs avant de coller un brief dans un outil grand public.',
  },
  {
    titre: 'Envoyer sans relecture',
    desc: 'Une relecture humaine systématique évite les oublis de postes et les engagements hasardeux.',
  },
  {
    titre: 'Utiliser des références techniques sans les vérifier',
    desc: 'Normes, DTU et références produit restent sous votre responsabilité — l’IA peut se tromper.',
  },
] as const;

export const IA_DEVIS_FAQ = [
  {
    q: 'L’IA peut-elle créer un devis BTP ?',
    a: 'Elle peut préparer une trame structurée (postes, descriptifs, mentions à compléter) à partir de vos notes. Le devis signé reste un document professionnel : quantités, prix, TVA et engagements sont validés par vous.',
  },
  {
    q: 'L’IA peut-elle calculer automatiquement les prix ?',
    a: 'Non de façon fiable sans vos données. Elle ne connaît ni vos coûts, ni vos marges, ni la concurrence locale. Utilisez-la pour structurer ; chiffrer reste votre métier.',
  },
  {
    q: 'Peut-on utiliser ses propres devis pendant la formation ?',
    a: 'Oui. La session s’appuie sur des documents et situations métier réels — vos modèles anonymisés, vos notes chantier, vos cas courants — pour repartir avec des prompts et trames réutilisables.',
  },
  {
    q: 'ChatGPT peut-il remplacer un logiciel de devis ?',
    a: 'Non. ChatGPT accélère la rédaction et la structuration. Votre logiciel de devis, votre bordereau et votre validation métier restent le cadre opérationnel pour chiffrer et émettre le document.',
  },
  {
    q: 'La formation nécessite-t-elle de savoir utiliser l’IA ?',
    a: 'Non. Aucun prérequis technique ni code. La session part des bases et vise une méthode concrète sur les devis BTP, avec validation humaine systématique.',
  },
  {
    q: 'La formation peut-elle être financée ?',
    a: `Financement OPCO possible selon éligibilité (organisme certifié Qualiopi). Détails sur la page <a href="${LINKS.financement}">financement Constructys formation IA BTP</a>.`,
  },
] as const;

/** Max 3 cartes — URLs distinctes de la fiche NIV-01 et du catalogue (CTA final). */
export const IA_DEVIS_ALLER_PLUS_LOIN = [
  {
    href: LINKS.formationIaEtudesPrixChiffrageBtp,
    label: 'IA et études de prix',
    desc: 'Métrés, DPGF et contrôles de bordereaux avec l’IA.',
  },
  {
    href: LINKS.formationConducteurTravaux,
    label: 'IA et conduite de chantier',
    desc: 'CR, planning et suivi de chantier assistés par l’IA.',
  },
  {
    href: LINKS.formationAO,
    label: 'IA et appels d’offres',
    desc: 'DCE, mémoire technique et préparation de marché.',
  },
] as const;
