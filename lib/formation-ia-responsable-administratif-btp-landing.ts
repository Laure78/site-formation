/**
 * Landing `/formation-ia-responsable-administratif-btp` — métadonnées, cas d’usage, FAQ, prompts.
 * Angle RAF / responsable admin / back-office BTP — distinct de l’assistante administrative.
 * Cadre OFC Qualiopi · présentiel Île-de-France.
 */
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { LINKS } from '@/lib/internal-links';
import {
  SCHEMA_LINKEDIN_PROFILE_URL,
  SCHEMA_ORGANIZATION_OFC,
  SCHEMA_PERSON_LAURE,
  SCHEMA_PUBLIC_SITE_URL,
} from '@/lib/schema-constants';
import { buildFormationFicheCourseJsonLd } from '@/lib/schema-formation-course-jsonld';
import { TARIF_FORFAIT_DEBUTANT_HT } from '@/lib/tarifs-sessions';

export const FORMATION_IA_RESPONSABLE_ADMINISTRATIF_BTP_PATH =
  '/formation-ia-responsable-administratif-btp' as const;

export const FORMATION_IA_RESPONSABLE_ADMINISTRATIF_BTP_SEO = {
  title: 'IA responsable admin BTP : devis & mails',
  description:
    'Formation IA pour le BTP : responsables admin — devis, factures, mails, CR. Présentiel Île-de-France, Qualiopi, Constructys selon éligibilité. Visio découverte.',
  h1: 'Formation IA pour responsables administratifs dans le BTP',
  openGraphTitle: 'Formation IA responsable administratif BTP — devis, factures, mails',
} as const;

export const RAF_BTP_EN_BREF = [
  'Cette formation vous apprend à utiliser ChatGPT, Claude (et, selon votre parc, Mistral ou Copilot) comme assistants pour le bureau : devis, factures, mails, dossiers clients, relances, comptes rendus, Excel et coordination terrain.',
  'L’IA n’écrit pas à votre place sans contrôle : elle accélère la mise en forme et la synthèse — vous validez avant envoi, signature ou archivage.',
  'Sessions en présentiel Île-de-France, organisme Qualiopi ; financement OPCO Constructys possible selon éligibilité.',
] as const;

export const RAF_BTP_USE_CASES = [
  {
    title: 'Mails, relances et courriers',
    body: 'Relances fournisseurs, clients impayés, demandes de pièces, confirmations de rendez-vous : ton professionnel, références chantier et échéances — prêt à relire et envoyer.',
  },
  {
    title: 'Synthèse de documents chantier',
    body: 'Transformer un lot de mails, notes ou pièces jointes en synthèse actionnable pour la direction, le conducteur de travaux ou le client.',
  },
  {
    title: 'Contrôle factures / BL vs devis ou commande',
    body: 'Comparer montants, quantités et références (devis, bon de commande, BL, facture) et lister les écarts à vérifier — sans remplacer votre contrôle comptable.',
  },
  {
    title: 'Comptes rendus de réunion',
    body: 'Structurer décisions, actions, responsables et échéances à partir de notes ou d’une dictée — relecture humaine avant diffusion.',
  },
  {
    title: 'Procédures internes et modes opératoires',
    body: 'Rédiger ou mettre à jour une procédure (accueil dossier, circuit facturation, archivage) à partir de vos pratiques réelles.',
  },
  {
    title: 'Assistant admin interne',
    body: 'Cadre pour un projet ChatGPT / Claude alimenté par vos trames, modèles de mails et règles internes — capitaliser le savoir du service admin.',
  },
  {
    title: 'Excel, tableaux et données',
    body: 'Structurer un suivi (impayés, commandes, notes de frais, dossiers clients) : colonnes, formules indicatives et commentaires — à valider dans votre fichier source.',
  },
] as const;

export const RAF_BTP_PUBLIC = [
  'Responsables administratifs / RAF dans une PME ou ETI du BTP',
  'Responsables de service administratif, comptable ou back-office bâtiment / TP',
  'Secrétaires et assistantes qui pilotent le bureau (au-delà de la saisie seule)',
  'Assistantes de direction ou de gestion en charge de la coordination bureau–chantier',
  'Dirigeants de TPE qui assurent eux-mêmes l’administratif',
] as const;

export const RAF_BTP_PREREQUIS = [
  'Manipuler régulièrement devis, factures, mails ou dossiers clients BTP',
  'Connaître le vocabulaire courant du chantier (lots, BL, avenants, situations)',
  'Savoir utiliser messagerie et tableur au quotidien',
  'Aucun code requis — savoir formuler une demande en français suffit',
] as const;

export const RAF_BTP_PROGRAMME = [
  {
    title: 'IA générative en contexte admin BTP',
    body: 'Limites des modèles, risques d’hallucination, données sensibles (clients, salaires, marges), validation humaine avant tout envoi contractuel ou comptable.',
  },
  {
    title: 'Configurer ChatGPT, Claude et les assistants du bureau',
    body: 'Compte pro, distinction perso / entreprise, prompts réutilisables ; mention de Copilot ou Mistral selon votre environnement — sans dépendance à un outil unique.',
  },
  {
    title: 'Mails, relances et courriers métiers',
    body: 'Trames de relance fournisseur / client, confirmation de livraison, demande de pièce manquante — ton adapté et références chantier.',
  },
  {
    title: 'Documents chantier et synthèses',
    body: 'Extraire l’essentiel d’un dossier (mails, notes, pièces) ; préparer une synthèse pour réunion ou reporting direction.',
  },
  {
    title: 'Devis, factures, BL et contrôles',
    body: 'Structurer un contrôle croisé devis / commande / BL / facture ; lister les écarts et questions à poser au conducteur ou au comptable.',
  },
  {
    title: 'CR, procédures, notes de frais et dossiers clients',
    body: 'Comptes rendus, modes opératoires, classement de dossier client, aide à la rédaction de notes de frais — toujours sous votre responsabilité.',
  },
  {
    title: 'Excel / données et assistant admin interne',
    body: 'Tableaux de suivi, formules indicatives, cadre d’un skill ou projet Claude « référent admin » sur vos modèles d’entreprise.',
  },
] as const;

export const RAF_BTP_OBJECTIFS = [
  'Une méthode claire pour utiliser ChatGPT ou Claude sur les tâches admin BTP',
  'Des prompts adaptés aux mails, relances, CR et contrôles documentaires',
  'Des trames de courriers et de synthèses réutilisables',
  'Une approche pour croiser devis, commandes, BL et factures',
  'Des modèles de procédures et de suivi Excel',
  'Une première réflexion sur un assistant admin interne',
  'Le réflexe de validation humaine avant envoi ou archivage',
] as const;

export const PROMPT_MAILS_RAF = `Tu es responsable administratif d'une PME BTP en Île-de-France.

Rédige 3 mails professionnels (prêts à relire) :

Mail 1 — Relance fournisseur (matériaux retardés) :
Contexte : commande CMD-2026-118 (carrelage chantier Guyancourt), livraison prévue le 10/07, toujours pas reçue le 14/07. Le conducteur de travaux a besoin des palettes pour démarrer le lot.

Mail 2 — Relance client (facture échue) :
Contexte : facture FAC-2026-442 du 15/06, échéance 15/07, montant 8 400 € HT, chantier « rénovation bureaux ». Aucun paiement reçu.

Mail 3 — Demande de pièce au conducteur de travaux :
Contexte : pour clôturer le dossier client, il manque le PV de réception signé et le décompte des heures supplémentaires de la semaine 28.

Pour chaque mail :
- Objet clair avec référence chantier / n° document
- Ton professionnel, factuel, courtois
- Action attendue + échéance
- Signature type « Responsable administratif »

Format : prêt à copier-coller dans la messagerie.`;

export const PROMPT_CONTROLE_FACTURE_RAF = `Tu es responsable administratif BTP. Aide-moi à contrôler cette facture fournisseur.

Données :
- Devis initial DEV-2026-77 : 12 000 € HT (fourniture et pose faux plafond, lot secondaire)
- Bon de commande BC-2026-55 : 12 000 € HT, mêmes postes
- BL reçu : 80 % des plaques livrées (poste A), rails complets (poste B)
- Facture FAC-F-991 : 12 000 € HT (100 % facturé)

Produis :
1. Tableau comparatif devis / commande / BL / facture (montants et % livrés)
2. Liste des écarts et points à vérifier avec le conducteur de travaux
3. Brouillon de mail au fournisseur demandant un avoir ou une facture partielle si le BL confirme un livré partiel
4. Rappel : tu ne valides pas la comptabilité — je contrôle et je décide

Format : clair, puces, prêt à coller dans un dossier de contrôle.`;

export const RAF_BTP_FAQ = [
  {
    q: 'Pourquoi un responsable administratif BTP devrait-il se former à l’IA ?',
    a: 'Pour accélérer mails, relances, synthèses de dossiers, contrôles devis/factures, CR et tableaux de suivi — sans confier la signature ni la responsabilité comptable à un outil.',
  },
  {
    q: 'L’IA va-t-elle remplacer les responsables administratifs ?',
    a: 'Non. L’IA accélère la rédaction et la structuration. Le jugement, le contrôle des pièces, la relation avec les chantiers et la validation restent humains.',
  },
  {
    q: 'Peut-on utiliser ChatGPT ou Claude pour contrôler une facture ou un BL ?',
    a: 'Oui pour croiser les informations que vous fournissez et lister des écarts. Le contrôle final, la saisie comptable et la validation restent à votre charge (et à celle de votre expert-comptable si besoin).',
  },
  {
    q: 'L’IA peut-elle aider sur Excel et les tableaux de suivi ?',
    a: 'Oui pour proposer une structure de colonnes, des formules indicatives ou un plan de suivi (impayés, commandes, notes de frais). Vous vérifiez toujours dans votre fichier source.',
  },
  {
    q: 'ChatGPT, Claude, Copilot ou Mistral : lequel choisir ?',
    a: 'La formation part de ChatGPT et Claude, les plus courants en session. Si votre entreprise utilise déjà Copilot ou Mistral, on transpose les mêmes méthodes de prompts et de validation.',
  },
  {
    q: 'Faut-il déjà connaître l’IA ou savoir coder ?',
    a: 'Non. On part de zéro, sans code. Les exercices portent sur vos documents types (anonymisés si besoin).',
  },
  {
    q: 'La formation est-elle en distanciel ou e-learning ?',
    a: 'Non : sessions en présentiel en Île-de-France / Grand Paris uniquement, conformément au cadre OFC.',
  },
  {
    q: 'Combien dure la session catalogue ?',
    a: '4 heures en présentiel (forfait session catalogue). Le contenu est condensé sur des cas admin BTP concrets — pas un parcours e-learning de plusieurs jours.',
  },
  {
    q: 'La formation est-elle finançable Constructys ?',
    a: 'Financement OPCO Constructys possible selon éligibilité et dossier. OFC Création d’Entreprise est certifiée Qualiopi. Voir la section Financement Constructys de cette page.',
  },
  {
    q: 'Quelle différence avec la formation assistante administrative BTP ?',
    a: 'La page assistante administrative cible surtout courriers et suivi quotidien. Ici l’angle est le pilotage du bureau : contrôles devis/factures, procédures, Excel, dossiers clients et coordination avec le terrain — pour RAF et responsables admin.',
  },
] as const;

export function buildResponsableAdministratifBtpCourseJsonLd(): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  const path = FORMATION_IA_RESPONSABLE_ADMINISTRATIF_BTP_PATH;

  return {
    ...buildFormationFicheCourseJsonLd({
      name: 'Formation IA pour responsables administratifs dans le BTP',
      description: FORMATION_IA_RESPONSABLE_ADMINISTRATIF_BTP_SEO.description,
      path,
      educationalLevel: 'Débutant',
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
      price: String(TARIF_FORFAIT_DEBUTANT_HT),
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: buildSiteCalendlyCtaUrl('formation-ia-responsable-administratif-btp-schema-offer'),
    },
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'Responsable administratif BTP',
    },
  };
}
