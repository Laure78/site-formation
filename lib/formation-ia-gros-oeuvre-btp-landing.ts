/**
 * Landing `/formation-ia-gros-oeuvre-btp` — devis, DCE, suivi chantier (gros œuvre).
 * Présentiel Île-de-France · Qualiopi · OFC Création d'Entreprise.
 */
import type { FAQItem } from '@/lib/faq';
import { IDF_ZONE_INTERVENTION } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';
import { PROOF } from '@/lib/proof';
import { formatNoteSatisfactionAffichageComplet } from '@/lib/data/indicateurs-resultats';

export const FORMATION_IA_GROS_OEUVRE_BTP_PATH = '/formation-ia-gros-oeuvre-btp' as const;

/** Segment title (suffixe `| Laure Olivié` ajouté par buildBrandedTitle). */
export const FORMATION_IA_GROS_OEUVRE_BTP_META_TITLE =
  'Formation IA gros œuvre BTP Île-de-France' as const;

/** 150–160 car., phrase complète, commence par « Formation IA gros œuvre », finit par un CTA. */
export const FORMATION_IA_GROS_OEUVRE_BTP_META_DESCRIPTION =
  'Formation IA gros œuvre : formation IA pour le BTP — devis, DCE et suivi chantier. Présentiel Île-de-France. Prendre rendez-vous.' as const;

export const FORMATION_IA_GROS_OEUVRE_BTP_H1 =
  'Formation IA pour le gros œuvre en Île-de-France — devis, DCE et suivi de chantier' as const;

export const FORMATION_IA_GROS_OEUVRE_CALENDLY_CAMPAIGN = 'gros-oeuvre-page' as const;

const OFC = "OFC Création d'Entreprise";

export const GROS_OEUVRE_KEYWORDS = [
  'formation IA gros œuvre BTP',
  'ChatGPT gros œuvre',
  'formation IA pour le BTP',
  'devis DCE gros œuvre',
  'suivi chantier IA',
  'formation IA Île-de-France',
  'Qualiopi gros œuvre',
  'Constructys BTP',
] as const;

export const GROS_OEUVRE_FAQ: FAQItem[] = [
  {
    q: 'L’IA calcule-t-elle les volumes de béton à ma place ?',
    a: `Non comme validation finale : elle aide à lister les paramètres, postes et contrôles à croiser. Le métré et la conformité restent sous responsabilité de votre équipe et de vos outils.`,
  },
  {
    q: 'ChatGPT peut-il appliquer le DTU 20.1 ou l’Eurocode sans relecture ?',
    a: `Non : fascicules, dosages et ferraillage relèvent de votre qualification. L’IA structure une lecture de CCTP ou un plan de mémoire — la référence normative reste humaine.`,
  },
  {
    q: 'La formation est-elle finançable via Constructys / OPCO ?',
    a: `Oui selon éligibilité et dossier : ${OFC} est certifié Qualiopi. Le financement OPCO Constructys suit les règles en vigueur pour les entreprises du BTP — jamais « garanti » sans analyse.`,
  },
  {
    q: 'Convient-elle aux TPE et PME de gros œuvre en Île-de-France ?',
    a: `Oui : sessions intra-entreprise, dans vos locaux en présentiel uniquement en Île-de-France, sur vos cas anonymisés (devis, DCE, CR, planning).`,
  },
  {
    q: 'Comment protéger les données chantier (plans, DCE, relevés) ?',
    a: `Anonymisez, utilisez des extraits, évitez les plans nominatifs complets dans un outil grand public sans cadre entreprise. La confidentialité fait partie du programme ${OFC}.`,
  },
  {
    q: 'Quelle durée et quelle différence avec la page maçon ?',
    a: `Session catalogue type 4 h en présentiel. Cette page cible le lot gros œuvre (devis, DCE, suivi multi-interfaces) ; la formation IA maçon approfondit le vocabulaire maçonnerie / DTU 20.1 au quotidien atelier.`,
  },
];

export const GROS_OEUVRE_PROMPTS = [
  {
    title: 'Cadrage chantier avant devis gros œuvre',
    body: `Liste les données manquantes avant devis gros œuvre pour [type d’ouvrage — fondations / élévation / dalle / reprises] : géotechnique, reprises, accès, phasage, évacuation des eaux, interfaces lots. Format checklist. Ne pas inventer de quantités : [à valider par le métré].`,
  },
  {
    title: 'Structure de devis sans prix',
    body: `Tu es conducteur de travaux gros œuvre en France. Description : [ouvrage]. Propose UNIQUEMENT les titres de postes et sous-détails (coffrage / béton / ferraillage / reprises / déblais) sans prix. Réserves sur hypothèses. Croiser CCTP lot 2 et DTU 20.1.`,
  },
  {
    title: 'Synthèse CCTP / DCE — lot gros œuvre',
    body: `Voici un extrait anonymisé de CCTP / DCE lot gros œuvre : [COLLEZ L’EXTRAIT]. Extraire exigences de phasage, interfaces avec autres lots, contrôles, documents à fournir. Format tableau. Sous chaque point ambigu : 2–3 questions à poser au maître d’œuvre. Pas de verdict de conformité.`,
  },
  {
    title: 'Courrier de report / aléa planning',
    body: `Motif : [intempéries / retard béton / validation BET]. Impact : [jalons]. Rédige un courrier professionnel au MOE / client : faits, impact planning, nouveau jalons indicatifs, pièces jointes. Ton factuel. Pas d’engagement hors faits fournis.`,
  },
  {
    title: 'Compte rendu de réunion de coordination',
    body: `Notes brutes : […]. Rédige un CR structuré : contexte, décisions, actions, responsables, délais, points ouverts. Vocabulaire gros œuvre (coffrage, coulage, interfaces). Ne pas inventer de décisions absentes des notes.`,
  },
] as const;

/** Liens internes obligatoires — une seule occurrence de chaque URL sur la page. */
export const GROS_OEUVRE_INTERNAL_LINKS = [
  {
    href: LINKS.formations,
    title: 'Catalogue des formations IA BTP',
    description: 'Programmes Qualiopi, tarifs session et modalités présentiel.',
  },
  {
    href: LINKS.formationIleDeFrance,
    title: 'Formation IA BTP Île-de-France',
    description: `Couverture géo ${IDF_ZONE_INTERVENTION} — présentiel uniquement.`,
  },
  {
    href: LINKS.formationIaMaconBtp,
    title: 'Formation IA maçon & maçonnerie',
    description: 'Angle métier maçonnerie, DTU 20.1, métré et coulage.',
  },
  {
    href: LINKS.formationIaCharpentierMenuisierBtp,
    title: 'Formation IA charpentier & menuisier',
    description: 'Structure bois et interfaces après appuis gros œuvre.',
  },
  {
    href: LINKS.formationIaEtancheur,
    title: 'Formation IA étancheur',
    description: 'Étanchéité, relevés et interfaces avec le gros œuvre.',
  },
] as const;

export const GROS_OEUVRE_COURSE = {
  name: 'Formation IA gros œuvre BTP — devis, DCE et suivi de chantier',
  description: `${OFC} : formation IA et ChatGPT pour le gros œuvre — devis, DCE, CCTP lot 2, planning et CR de chantier. Session 4 h, Qualiopi, présentiel Île-de-France, financement possible selon éligibilité. Déjà $· ${formatNoteSatisfactionAffichageComplet()}`,
  teaches: [
    'ChatGPT pour entreprises de gros œuvre',
    'Devis et structure de postes (sans chiffrage définitif)',
    'Lecture assistée de DCE / CCTP lot 2',
    'Suivi de chantier : CR, courriers, planning',
    'Garde-fous DTU 20.1 et relecture humaine',
    'Qualiopi — confidentialité des données chantier',
  ],
} as const;
