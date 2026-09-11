/**
 * Données page d'accueil — source unique, valeurs issues du code existant (jamais inventées).
 */
import { getFormationByCode } from '@/data/formations';
import { BUSINESS_DELIVERY } from '@/lib/business-delivery';
import { isFormationCataloguePublished } from '@/lib/formation-catalogue-visibility';
import {
  formatNoteSatisfactionSur5,
  formatVolumeProsFormesBtp,
} from '@/lib/data/indicateurs-resultats';
import { LINKS } from '@/lib/internal-links';
import { PARCOURS_APPLICATIONS_METIER } from '@/lib/parcours-applications-metier-btp-content';
import {
  ALT_LOGO_CNAM_ENTREPRISES,
  ALT_LOGO_CSFE,
  ALT_LOGO_FFB_OFFICIEL,
  ALT_LOGO_MONITEUR_FORMATIONS,
  CLIENT_LOGOS_MARQUEE,
  LOGO_MONITEUR_FORMATIONS,
  PARTNER_WEBSITES,
} from '@/lib/client-logos';

const FORMATION_HREF_BY_CODE = {
  'NIV-01': LINKS.formationIaBtpNiveau1BatimentTp,
  'NIV-02': LINKS.formationAO,
  'NIV-03': LINKS.formationConduiteTravauxSuiviChantier,
} as const;

/** Ligne compacte hero — modalités commerciales (filtre immédiat). */
export function getAccueilHeroModalitesLine(): string {
  return BUSINESS_DELIVERY.compact;
}

/** Ligne compacte hero — indicateurs réels (Qualiopi, IDF). */
export function getAccueilHeroReassuranceLine(): string {
  return `${formatVolumeProsFormesBtp()} professionnels formés · ${formatNoteSatisfactionSur5()} de satisfaction · Qualiopi · Île-de-France`;
}

/** Logos partenaires autorisés sur l'accueil (max 6). */
export const ACCUEIL_LOGOS_PARTENAIRES = [
  CLIENT_LOGOS_MARQUEE.find((l) => l.id === 'ffb-grand-paris-idf')!,
  {
    id: 'ffb-idf-accueil',
    name: 'FFB Île-de-France',
    alt: ALT_LOGO_FFB_OFFICIEL,
    src: '/images/partenaires/logo-ffb-partenaire-formation-ia-btp.webp',
    width: 200,
    height: 80,
    href: PARTNER_WEBSITES.ffbIdf,
    linkTitle: 'Site officiel FFB Île-de-France',
  },
  CLIENT_LOGOS_MARQUEE.find((l) => l.id === 'csfe')!,
  {
    id: 'cnam-accueil',
    name: 'CNAM Entreprises',
    alt: ALT_LOGO_CNAM_ENTREPRISES,
    src: '/images/partenaires/logo-cnam-formation-continue-ia-btp.webp',
    width: 220,
    height: 80,
    href: PARTNER_WEBSITES.cnamIdf,
    linkTitle: 'Site officiel CNAM Entreprises Île-de-France',
  },
  {
    id: 'moniteur-accueil',
    name: 'Le Moniteur Formations',
    alt: ALT_LOGO_MONITEUR_FORMATIONS,
    src: LOGO_MONITEUR_FORMATIONS.src,
    width: LOGO_MONITEUR_FORMATIONS.width,
    height: LOGO_MONITEUR_FORMATIONS.height,
    href: PARTNER_WEBSITES.moniteurFormations,
    linkTitle: 'Site officiel Le Moniteur Formations',
  },
] as const;

export type AccueilCarteProbleme = {
  id: string;
  titre: string;
  points: readonly string[];
  href: string;
};

/** Entrée par problème métier — liens vers pages dédiées existantes. */
export function getAccueilCartesProblemesMetier(): readonly AccueilCarteProbleme[] {
  const chantierHref = isFormationCataloguePublished('NIV-03')
    ? LINKS.formationConduiteTravauxSuiviChantier
    : LINKS.iaCompteRenduChantier;

  return [
    {
      id: 'devis',
      titre: 'Devis & chiffrage',
      points: [
        'Préparer les désignations',
        'Structurer les devis',
        'Identifier les oublis',
        'Faciliter le quantitatif et le chiffrage',
      ],
      href: LINKS.iaDevis,
    },
    {
      id: 'chantier',
      titre: 'Chantier',
      points: [
        'Rédiger les comptes rendus',
        'Préparer les PPSPS',
        'Suivre les réserves',
        'Préparer les DOE',
      ],
      href: chantierHref,
    },
    {
      id: 'ao',
      titre: "Appels d'offres",
      points: [
        'Analyser les DCE',
        'Comparer CCTP, CCAP et DPGF',
        'Identifier les contraintes',
        'Préparer les mémoires techniques',
      ],
      href: LINKS.formationAO,
    },
    {
      id: 'admin',
      titre: 'Administratif',
      points: [
        'Rédiger les emails',
        'Préparer les courriers',
        'Relancer les clients',
        'Synthétiser les documents',
      ],
      href: LINKS.formationIaBtpNiveau1BatimentTp,
    },
  ] as const;
}

export type AccueilFormationCarte = {
  code?: string;
  titre: string;
  benefice: string;
  niveau?: string;
  duree: string;
  href: string;
};

/** Quatre formations prioritaires — données catalogue + parcours applications métier. */
export function getAccueilFormationsPrioritaires(): readonly AccueilFormationCarte[] {
  const codes = ['NIV-01', 'NIV-02', 'NIV-03'] as const;
  const cartes: AccueilFormationCarte[] = [];

  for (const code of codes) {
    if (!isFormationCataloguePublished(code)) continue;
    const f = getFormationByCode(code);
    if (!f) continue;
    cartes.push({
      code,
      titre: f.titre,
      benefice: f.promesse,
      niveau: f.niveauLabel,
      duree: f.duree,
      href: FORMATION_HREF_BY_CODE[code],
    });
  }

  cartes.push({
    titre: PARCOURS_APPLICATIONS_METIER.h1,
    benefice: PARCOURS_APPLICATIONS_METIER.promesse,
    niveau: 'Parcours',
    duree: PARCOURS_APPLICATIONS_METIER.parcoursCompletDuree,
    href: LINKS.parcoursApplicationsMetierBtp,
  });

  return cartes.slice(0, 4);
}

export const ACCUEIL_DOCUMENTS_EXEMPLES = [
  'DCE',
  'CCTP',
  'CCAP',
  'DPGF',
  'devis',
  'comptes rendus',
  'PPSPS',
  'DOE',
  'mémoires techniques',
  'emails',
  'procédures internes',
] as const;

export const ACCUEIL_METHODE_ETAPES = [
  { n: '01', titre: 'Vous apportez vos documents.' },
  { n: '02', titre: 'Nous identifions les tâches chronophages.' },
  {
    n: '03',
    titre: 'Nous construisons les méthodes et assistants IA pendant la formation.',
  },
  { n: '04', titre: 'Vos équipes repartent avec des usages directement réutilisables.' },
] as const;

/**
 * Cas d’usage « résultats concrets » — liens uniques sur l’accueil
 * (jamais deux fois la même URL sur la page ; destinations déjà utilisées
 * ailleurs sur l’accueil évitées : formationAO, NIV-01, NIV-03 catalogue, iaDevis…).
 */
export const ACCUEIL_CAS_USAGE_RESULTATS = [
  {
    id: 'dce',
    titre: 'Analyser un DCE',
    phrase: 'Synthétiser RC, CCTP et CCAP pour cadrer votre réponse.',
    tags: ['RC', 'CCTP', 'CCAP'] as const,
    href: LINKS.formationIaAppelsOffresBtp,
    ariaLabel: 'Analyser un DCE — découvrir la formation IA appels d’offres BTP',
  },
  {
    id: 'devis',
    titre: 'Préparer un devis',
    phrase: 'Structurer désignations et libellés à partir de vos modèles.',
    tags: ['Désignations', 'Quantitatif'] as const,
    href: LINKS.formationIaEtudesPrixChiffrageBtp,
    ariaLabel: 'Préparer un devis — découvrir la formation IA devis et chiffrage BTP',
  },
  {
    id: 'cr',
    titre: 'Rédiger un compte rendu de chantier',
    phrase: 'Transformer vos notes terrain en CR clair, prêt à relire.',
    tags: ['Notes terrain → CR'] as const,
    href: LINKS.formationConducteurTravaux,
    ariaLabel:
      'Rédiger un compte rendu de chantier — découvrir la formation IA conducteur de travaux',
  },
  {
    id: 'memoire',
    titre: 'Structurer un mémoire technique',
    phrase: 'Organiser vos arguments et preuves pour l’appel d’offres.',
    tags: ['Exigences', 'Moyens', 'Preuves'] as const,
    /** Page dédiée mémoire (cluster AO) — évite un 2ᵉ lien vers formationAO / landing AO. */
    href: LINKS.iaMemoireTechnique,
    ariaLabel:
      'Structurer un mémoire technique — découvrir la méthode IA mémoire technique BTP',
  },
  {
    id: 'doe',
    titre: 'Préparer un DOE',
    phrase: 'Assembler et structurer les pièces de fin de chantier.',
    tags: ['Pièces', 'Contrôle', 'Classement'] as const,
    /**
     * Tuto DOE dédié (200).
     * La landing `/formation-ia-conducteur-travaux` redirige en 308 vers
     * `/formation-ia-conducteur-de-travaux` (déjà utilisée par la carte CR) ;
     * le catalogue NIV-03 est déjà lié ailleurs sur l’accueil.
     */
    href: LINKS.tutoDoeDossierOuvragesExecutes,
    ariaLabel: 'Préparer un DOE — découvrir le tuto DOE dossier des ouvrages exécutés',
  },
  {
    id: 'emails',
    titre: 'Rédiger emails et courriers',
    phrase: 'Accélérer relances, courriers et échanges clients.',
    tags: ['Rédaction', 'Relance', 'Synthèse'] as const,
    /**
     * Landing ChatGPT BTP (emails / admin) — NIV-01 déjà lié ailleurs sur l’accueil
     * (problèmes métier + formations prioritaires).
     */
    href: LINKS.formationChatgptBtp,
    ariaLabel:
      'Rédiger emails et courriers — découvrir la formation ChatGPT pour le BTP',
  },
] as const;

export const ACCUEIL_RESSOURCES = [
  {
    titre: 'Guide conducteur de travaux',
    phrase: 'PDF gratuit — skills IA pour DCE, PPSPS, CR et DOE.',
    href: LINKS.guideConducteurTravauxIaBtp,
  },
  {
    titre: 'Analyser un DCE avec l’IA',
    phrase: 'Méthode et cas d’usage pour décrypter un dossier de consultation.',
    href: LINKS.iaAnalyseDce,
  },
  {
    titre: 'Compte rendu de chantier avec l’IA',
    phrase: 'Modèle et bonnes pratiques pour vos CR de chantier.',
    href: LINKS.iaCompteRenduChantier,
  },
] as const;
