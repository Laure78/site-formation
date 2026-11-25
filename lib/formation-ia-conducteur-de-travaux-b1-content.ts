/**
 * Contenu structuré landing B1 — `/formation-ia-conducteur-de-travaux`.
 */
import { dureeCatalogueParCode } from '@/lib/catalogue-duree-copy';
import { FINANCEMENT_FORMULATION_PRUDENTE } from '@/lib/financement-copy';
import { LINKS } from '@/lib/internal-links';
import {
  libelleTarifParticipantCatalogue,
  TARIF_PARTICIPANT_NIV01_HT,
  TARIF_PARTICIPANT_NIV03_HT,
} from '@/lib/tarifs-catalogue-participant';
import { SITE, SITE_SIEGE_LIEU_COURT, SITE_TARIFS, siteAdresseLigne } from '@/lib/site-config';
import { IDF_ZONE_INTERVENTION } from '@/lib/constants';

export const CONDUCTEUR_LANDING_PAIN_POINTS = [
  {
    title: 'Comptes rendus de chantier',
    body: 'Notes, vocaux et PV à structurer après chaque réunion — souvent le soir ou en fin de journée.',
  },
  {
    title: 'Relances sous-traitants',
    body: 'Courriers, mails et relances planning à rédiger sans perdre le ton ni la traçabilité contractuelle.',
  },
  {
    title: 'Situations de travaux',
    body: 'Synthèses d’avancement, lettres et tableaux à tenir à jour pour le MOE et la direction.',
  },
  {
    title: 'Réserves et réception',
    body: 'Listes de réserves, PV et suivis de levée à formaliser lot par lot.',
  },
  {
    title: 'DOE et clôture',
    body: 'Classement des pièces, pièces manquantes et courriers de livraison avant remise au maître d’ouvrage.',
  },
] as const;

export type ConducteurIaPhaseRow = {
  phase: string;
  tache: string;
  iaPrepare: string;
  vousValidez: string;
};

export const CONDUCTEUR_IA_PHASE_ROWS: readonly ConducteurIaPhaseRow[] = [
  {
    phase: 'Préparer le chantier',
    tache: 'Analyse CCTP / DPGF',
    iaPrepare: 'Synthèse des exigences, points d’arrêt et questions ouvertes.',
    vousValidez: 'Interprétation contractuelle, lots et engagements.',
  },
  {
    phase: 'Préparer le chantier',
    tache: 'PPSPS / DUERP',
    iaPrepare: 'Trame réglementaire adaptée au type de chantier.',
    vousValidez: 'Mesures de prévention et signature SST.',
  },
  {
    phase: 'Préparer le chantier',
    tache: 'Planning de démarrage',
    iaPrepare: 'Brouillon d’ordre du jour, checklist et jalons.',
    vousValidez: 'Dates, ressources et contraintes terrain.',
  },
  {
    phase: 'Piloter l’exécution',
    tache: 'CR de réunion',
    iaPrepare: 'Structure, actions, réserves et diffusion.',
    vousValidez: 'Faits, responsabilités et participants.',
  },
  {
    phase: 'Piloter l’exécution',
    tache: 'Tableau d’actions / relances',
    iaPrepare: 'Liste priorisée et courriers types.',
    vousValidez: 'Décisions, montants et envois effectifs.',
  },
  {
    phase: 'Piloter l’exécution',
    tache: 'Situations de travaux',
    iaPrepare: 'Lettres et tableaux d’avancement.',
    vousValidez: 'Pourcentages, montants et signatures.',
  },
  {
    phase: 'Sécuriser la clôture',
    tache: 'PV de réserves',
    iaPrepare: 'Classement par lot et formulations types.',
    vousValidez: 'Levée sur le terrain et opposabilité.',
  },
  {
    phase: 'Sécuriser la clôture',
    tache: 'DOE',
    iaPrepare: 'Arborescence, pièces manquantes, page de garde.',
    vousValidez: 'Complétude avant remise MOA/MOE.',
  },
];

export const CONDUCTEUR_FORMATION_CHOIX = [
  {
    title: 'Niveau 1 — bases IA',
    duree: dureeCatalogueParCode('NIV-01'),
    tarifLabel: libelleTarifParticipantCatalogue(TARIF_PARTICIPANT_NIV01_HT),
    description: 'Premiers pas : prompts, confidentialité et usages transverses sur devis et courriers.',
    href: LINKS.formationIaBtpNiveau1BatimentTp,
    cta: 'Voir le niveau 1',
  },
  {
    title: 'Suivi de chantier (catalogue)',
    duree: dureeCatalogueParCode('NIV-03'),
    tarifLabel: libelleTarifParticipantCatalogue(TARIF_PARTICIPANT_NIV03_HT),
    description: 'CR, CCTP, PPSPS, réserves et DOE — fiche Qualiopi NIV-03.',
    href: LINKS.formationConduiteTravauxSuiviChantier,
    cta: 'Programme suivi de chantier',
  },
  {
    title: 'Parcours conducteur 2027',
    duree: '6 modules · 24 h',
    tarifLabel: 'Modules à 170 € HT ou parcours complet',
    description: 'Montée en compétences modulaire : préparation, planning, CR, réception.',
    href: LINKS.parcoursConducteurDeTravaux,
    cta: 'Parcours conducteur de travaux',
  },
] as const;

export const CONDUCTEUR_LANDING_MAILLAGE = [
  { href: LINKS.iaCompteRenduChantier, label: 'IA et compte rendu de chantier — méthode terrain' },
  { href: LINKS.guideConducteurTravauxIaBtp, label: 'Guide IA conducteur de travaux (PDF gratuit)' },
  { href: LINKS.iaAnalyseDce, label: 'IA et analyse de DCE bâtiment' },
] as const;

export function conducteurLandingEnBref(): string {
  const niv1 = libelleTarifParticipantCatalogue(SITE_TARIFS.participant4hNiveau1);
  const niv2 = libelleTarifParticipantCatalogue(SITE_TARIFS.participant4hNiveau2);
  return `Formation en présentiel en Île-de-France par ${SITE.marque} (${SITE.raisonSociale}, certifié Qualiopi) : comptes rendus, planning, suivi d’avancement, réception et DOE avec ChatGPT et Claude, sur dossiers anonymisés. Catalogues dès ${niv1} (niveau 1 · ${dureeCatalogueParCode('NIV-01')}) et ${niv2} (session chantier · ${dureeCatalogueParCode('NIV-03')}) ; parcours métier 2027 en modules.`;
}

export const CONDUCTEUR_LANDING_FAQ: readonly { q: string; a: string }[] = [
  {
    q: 'L’IA va-t-elle remplacer le conducteur de travaux ?',
    a: 'Non. L’IA accélère la rédaction et la structuration de documents ; elle ne décide pas à votre place sur le terrain, ne signe pas les engagements et ne se substitue pas au jugement métier ni aux obligations QSE.',
  },
  {
    q: 'Faut-il un bon niveau informatique ?',
    a: 'Savoir utiliser un ordinateur et rédiger en français suffit. Aucun prérequis de programmation. Pour la session chantier (NIV-03), une pratique déjà acquise de l’IA ou le niveau 1 est recommandé.',
  },
  {
    q: 'ChatGPT ou Claude pour le chantier ?',
    a: 'Les deux sont travaillés en formation. Claude convient souvent aux longs CCTP et dossiers ; ChatGPT aux formats courts (mails, CR). Vous choisissez selon le document, avec relecture humaine avant envoi.',
  },
  {
    q: 'Puis-je utiliser l’IA sur des pièces de marché confidentielles ?',
    a: 'Travaillez sur des dossiers anonymisés, vérifiez les paramètres de confidentialité de votre outil et ne diffusez jamais sans validation. Nous détaillons la charte d’usage en session.',
  },
  {
    q: 'Quel financement pour l’entreprise ?',
    a: `Prise en charge OPCO/Constructys selon éligibilité. ${FINANCEMENT_FORMULATION_PRUDENTE} Sans subrogation : l’entreprise règle puis se fait rembourser selon barèmes. Non éligible au CPF. Voir <a href="${LINKS.financement}">financement Constructys</a>.`,
  },
  {
    q: 'Peut-on former toute l’équipe travaux en intra ?',
    a: `Oui. Session intra dans vos locaux en Île-de-France (${IDF_ZONE_INTERVENTION}), contenu adapté à vos trames et process. Inter-entreprises au ${SITE_SIEGE_LIEU_COURT} selon calendrier. Demandez un devis via <a href="${LINKS.contact}">contact</a>.`,
  },
];

export function conducteurLieuFormationParagraph(): string {
  return `Sessions inter-entreprises au ${siteAdresseLigne()} (Paris 12e), ou intra dans vos locaux en Île-de-France : départements ${IDF_ZONE_INTERVENTION}. Présentiel uniquement — pas de formation à distance dans le catalogue IA BTP.`;
}