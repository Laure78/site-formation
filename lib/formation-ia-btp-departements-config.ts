/**
 * Pages locales « formation IA pour le BTP » par département d’Île-de-France (+77).
 * Contenus longs (SEO) — maillage : LINKS dans le composant.
 */
import type { FormationIaBtpDeptLandingConfig } from '@/components/formation-ia-btp/FormationIaBtpDepartementLanding';
import type { FAQItem } from '@/lib/faq';
import { buildDeptMetaDescription } from '@/lib/meta-description';
import { buildIdfDeptPageTitle } from '@/lib/seo-geo-keywords';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import {
  deptDe,
  deptLocatif,
  deptWithArticle,
  deptWithArticleCapitalized,
  getDeptGrammar,
  type DeptGrammar,
} from '@/lib/formation-ia-btp-dept-grammar';
import { DEPARTEMENT_PAGE_PATHS, TEMOIGNAGES_REGION_IDF } from '@/lib/departement-pages';

/** Titre + citations région — même jeu que `TemoignagesRegion` (pas de localisation inventée). */
const TEMOIGNAGES_REGION_BLOCK = {
  temoignagesTitle: 'Témoignages de professionnels en Île-de-France',
  temoignages: TEMOIGNAGES_REGION_IDF.map((t) => ({ text: t.text, attribution: t.attribution })),
} as const;

const OFC = 'OFC Création d\'Entreprise';

function capitalizeLocatif(grammar: DeptGrammar): string {
  const loc = deptLocatif(grammar);
  return loc.charAt(0).toUpperCase() + loc.slice(1);
}

function faqGeoBase(grammar: DeptGrammar, code: string, villes: string): FAQItem[] {
  const d = `${grammar.nom} (${code})`;
  const locatif = deptLocatif(grammar);
  const sujet = deptWithArticleCapitalized(grammar);
  return [
    {
      q: `Intervenez-vous dans tout le département ${d} ?`,
      a: `Oui. Intra dans vos locaux ou sur site ${locatif}, selon calendrier. Siège à Guyancourt (78) — déplacements vers ${villes} courants. Zones éloignées : journée bloquée ou demi-journées.`,
    },
    {
      q: 'Quelle est la différence entre session inter et intra pour mon équipe ?',
      a: `Inter : groupe à date fixée en IDF. Intra : réservé à votre entreprise, 4 h sur vos devis, CCTP et courriers — souvent préféré des PME du ${code}.`,
    },
    {
      q: 'Les formations ont-elles lieu en présentiel dans le département ?',
      a: "Présentiel uniquement · Île-de-France uniquement — intra dans vos locaux ou inter en salle. Exercices sur vos documents réels (devis, CCTP, courriers).",
    },
    {
      q: 'Y a-t-il des frais de déplacement facturés pour une session dans mon département ?',
      a: `Échange téléphonique 30 min gratuit pour cadrer. Intra IDF : déplacement et repas précisés au devis — tout validé avant convention.`,
    },
    {
      q: 'Le financement Constructys s’applique-t-il aux entreprises du département ?',
      a: `Règles Constructys nationales — éligibilité OPCO, plafonds pédagogiques. ${sujet} ne change pas le barème ; programme Qualiopi aligné sur le guide financement du site.`,
    },
    {
      q: 'Combien de temps à l’avance réserver une date ?',
      a: `Agendas intra souvent pleins 3 à 6 semaines à l'avance en IDF. Date urgente ? Indiquez-le sur Calendly : ${buildSiteCalendlyCtaUrl('faq-dept-calendly-urgence')}.`,
    },
    {
      q: 'Puis-je combiner deux thèmes (ex. devis + appels d’offres) sur une journée ?',
      a: "Chaque référence (NIV-01, NIV-02) = 4 h. Deux demi-journées sur deux thèmes possibles la même semaine — selon disponibilités.",
    },
  ];
}

const CAS_USAGE_FORMATION_BTP: string[] = [
  'Structurer devis et relances à partir de notes terrain — chiffrage définitif en interne.',
  'Accélérer CR et synthèses hebdo chantier — relecture avant envoi.',
  'Brouillons mémoires techniques et réponses marchés — questions MOE listées depuis le CCTP.',
  'Courriers récurrents (fournisseurs, ST) au ton homogène.',
  'Tableaux de suivi reformulés à partir de vos données — sans données perso non anonymisées.',
];

const DEPLACEMENT_GUYANCOURT = `Siège ${OFC} à Guyancourt (78) : déplacement inclus au devis pour intra IDF. Créneaux souvent calés sous 3 à 6 semaines. Guyancourt est à ~30 min des principaux bassins franciliens.`;

function ffbCasClient(deptCode: string): string {
  const idf = `Interventions FFB Île-de-France et retours terrain franciliens — exemples adaptés à votre secteur.`;
  const idfEst = `Échanges FFB IDF Est (77) : exemples PME, marchés publics locaux.`;
  const grandParis = `Échanges FFB Grand Paris : PME, grands marchés, rénovation urbaine.`;
  if (deptCode === '77') return idfEst;
  if (deptCode === '92' || deptCode === '93' || deptCode === '94') return grandParis;
  return idf;
}

/** Yvelines (78) — contenu détaillé (pilote SEO). */
export const FORMATION_IA_BTP_YVELINES_78: FormationIaBtpDeptLandingConfig = {
  path: '/formation-ia-btp-yvelines-78',
  h1: 'Formation IA pour le BTP dans les Yvelines (78) — Versailles et agglomération',
  metaTitle: buildIdfDeptPageTitle('Yvelines', '78'),
  metaDescription: buildDeptMetaDescription('Yvelines', '78', 'Versailles, SQY, Guyancourt'),
  keywords: [
    'formation IA appliquée au bâtiment Yvelines',
    'formation ChatGPT 78',
    'Qualiopi Yvelines',
    'Constructys formation IA',
    'formation IA Versailles',
    'formation IA Guyancourt',
  ],
  departementNom: 'Yvelines',
  nom: 'Yvelines',
  article: 'les',
  prepositionLocative: 'dans les',
  deptCode: '78',
  badgeLine: 'Yvelines (78) · Présentiel en Île-de-France · Qualiopi',
  cities: [
    'Versailles',
    'Saint-Quentin-en-Yvelines',
    'Mantes-la-Jolie',
    'Poissy',
    'Guyancourt',
    'Saint-Germain-en-Laye',
  ],
  courseName: 'Formation IA pour le BTP Yvelines (78) — Qualiopi, financement possible selon éligibilité',
  courseDescription: `${OFC} : formation IA et ChatGPT pour entreprises du BTP dans les Yvelines (78). Sessions 4 h, exclusivement en présentiel, devis et chantier. Certification Qualiopi, financement possible selon éligibilité. Guyancourt, Versailles, Mantes, SQY.`,
  serviceName: `Accompagnement formation IA pour les pros du BTP — département des Yvelines (78)`,
  serviceDescription: `Prestation de formation professionnelle en intelligence artificielle appliquée au bâtiment et aux travaux publics pour les entreprises implantées dans le département des Yvelines (78) : interventions intra-entreprise, calendrier Île-de-France, organisme certifié Qualiopi.`,
  areaServedCourse: [
    'Yvelines',
    'Versailles',
    'Guyancourt',
    'Saint-Germain-en-Laye',
    'Mantes-la-Jolie',
    'Île-de-France',
    'France',
  ],
  areaServedService: ['Yvelines', 'Île-de-France', 'France'],
  problemTitle: 'Pourquoi le BTP des Yvelines (78) manque de temps — pas d’outils',
  problemBody: [
    `Yvelines denses (Versailles, SQY, Mantes) et périurbaines (Rambouillet) : délais serrés, concurrence sur les offres, admin qui s'accumule entre chantier et bureau.`,
    `L'efficacité se joue aussi sur les documents — devis, CR, CCTP, mémoires. Sans méthode, copier-coller et modèles Word vieillissants coûtent des heures chaque semaine.`,
    `L'IA accélère mise en forme et structuration — si vous savez quoi demander et quoi ne jamais soumettre tel quel. Sans formation Qualiopi : risque d'automatisation naïve et de fuite de données.`,
    `Les dirigeants du 78 veulent un gain mesurable sur l'admin, pas une transformation de trois ans. Objectif ${OFC} : 4 h terrain, livrables utilisables dès le lendemain.`,
  ],
  solutionTitle: 'Formation IA BTP 4 h, Qualiopi, centrée sur vos documents',
  solutionBody: [
    `Format standard 4 h, présentiel intra ou inter IDF. Alternance démo, exercice guidé, pratique sur vos devis, courriers et CR. Siège Guyancourt : logistique simple pour Versailles, Poissy, Mantes.`,
    `Financement Constructys possible selon éligibilité — plafonds nationaux, pièces pédagogiques cohérentes Qualiopi fournies pour le dossier OPCO.`,
    `Montée progressive : courriers et relances d'abord, puis DCE et mémoires quand l'équipe maîtrise la relecture humaine.`,
    `Directions multi-chantiers : volet standardisation des consignes — mêmes prompts CR, mêmes grilles de relecture.`,
  ],
  villesTitle: 'Villes et bassins des Yvelines couverts (liste indicative)',
  villesIntro: `Intra chez vous ou sur site. Villes et bassins fréquents dans le 78 — liste non exhaustive. Échange 30 min pour confirmer faisabilité.`,
  villesFooter: [
    `Versailles, SQY, Vélizy : exemples adaptés tertiaire, rénovation, réseaux ou gros œuvre — pas de one size fits all.`,
    `Entreprises actives aussi à Paris ou en petite couronne : voir la fiche formation IA Paris du catalogue.`,
  ],
  programmeTitle: 'Contenu des 4 heures (aperçu)',
  programmeBody: [
    `Consignes claires pour un premier jet exploitable (devis, mail, CR) — itération et relecture humaine systématique.`,
    `Bibliothèque de prompts réutilisables, vocabulaire CCTP et bordereaux.`,
    `Limites : données perso, clauses confidentielles — comportements selon outil grand public ou espace pro.`,
    `Feuille de route semaine suivante : tâches prioritaires et documents pilotes pour tester sans disperser l'équipe.`,
  ],
  temoignagesTitle: TEMOIGNAGES_REGION_BLOCK.temoignagesTitle,
  temoignages: [...TEMOIGNAGES_REGION_BLOCK.temoignages],
  financeTitle: 'Financement et Qualiopi : ce qui s’applique aux entreprises du 78',
  financeBody: [
    `Constructys : prise en charge possible selon éligibilité et plafonds nationaux. Qualiopi facilite la cohérence des pièces attendues.`,
    `Barèmes et étapes : guide financement sur le site (TVA intra/inter centralisée). Questions de faisabilité avant signature du devis.`,
    `Yvelines comme ailleurs : cadre certifié + vos documents + mise en œuvre progressive = adoption sécurisée.`,
  ],
  tissuBtpLocal: [
    `Yvelines : PME bâtiment, second œuvre et TP — Versailles, SQY, corridor Mantes, périphérie Poissy. Marchés exigeants, documentation lourde (mémoires, CR, AO).`,
    `Sessions ${OFC} : exercices devis, CCTP, courriers — ChatGPT et Claude AI, cadre Qualiopi, relecture humaine et confidentialité.`,
  ],
  casUsageStandard: CAS_USAGE_FORMATION_BTP,
  deplacementGuyancourt: DEPLACEMENT_GUYANCOURT,
  casClientFfb: ffbCasClient('78'),
  faq: faqGeoBase(
    getDeptGrammar('78'),
    '78',
    'Versailles, Guyancourt, Mantes-la-Jolie, Saint-Germain-en-Laye, Rambouillet',
  ),
};

function buildDeptConfig(opts: {
  path: string;
  deptCode: string;
  departementNom: string;
  chefLieuAgglo: string;
  triVillesMeta: string;
  keywords: string[];
  badgeLine: string;
  cities: string[];
  chefLieu: string;
  perimetre: string;
  axes: string;
  temoignageZone: string;
  tissuBtpLocal: string[];
}): FormationIaBtpDeptLandingConfig {
  const { deptCode, departementNom } = opts;
  const grammar = getDeptGrammar(deptCode, departementNom);
  const d = `${grammar.nom} (${deptCode})`;
  const locatif = deptLocatif(grammar);
  const de = deptDe(grammar);
  const avecArticle = deptWithArticle(grammar);
  const locatifCap = capitalizeLocatif(grammar);
  const h1 = `Formation IA appliquée au bâtiment ${locatif} (${deptCode}) — ${opts.chefLieuAgglo} et agglomération`;
  const metaTitle = buildIdfDeptPageTitle(grammar.nom, deptCode);
  const metaDescription = buildDeptMetaDescription(grammar.nom, deptCode, opts.triVillesMeta);
  const courseName = `Formation IA pour les pros du BTP ${d} — Qualiopi, financement possible selon éligibilité`;
  return {
    path: opts.path,
    h1,
    metaTitle,
    metaDescription,
    keywords: opts.keywords,
    departementNom: grammar.nom,
    nom: grammar.nom,
    article: grammar.article,
    prepositionLocative: grammar.prepositionLocative,
    deptCode,
    badgeLine: opts.badgeLine,
    cities: opts.cities,
    courseName,
    courseDescription: `${OFC} : formation IA et ChatGPT pour le BTP ${locatif} (${deptCode}). Sessions 4 h, exclusivement en présentiel en Île-de-France. Qualiopi, financement possible selon éligibilité. ${opts.perimetre}`,
    serviceName: `Accompagnement formation IA appliquée au bâtiment — département ${d}`,
    serviceDescription: `Formation professionnelle en intelligence artificielle appliquée au bâtiment et aux travaux publics pour les entreprises ${de} (${deptCode}) : intra-entreprise, calendrier Île-de-France, organisme certifié Qualiopi.`,
    areaServedCourse: [grammar.nom, opts.chefLieu, 'Île-de-France', 'France'],
    areaServedService: [grammar.nom, 'Île-de-France', 'France'],
    problemTitle: `BTP ${deptCode} : productivité attendue, temps admin réel`,
    problemBody: [
      `${locatifCap} (${deptCode}), entreprises bâtiment, second œuvre et TP : chantiers exigeants, délais courts autour de ${opts.chefLieu} et axes ${opts.axes}. Relances, CR et dossiers AO s'accumulent.`,
      `Plus le carnet est chargé, moins il reste de temps pour formaliser offres et échanges. L'IA réduit ce décalage — avec prompts CCTP, relecture obligatoire et règles sur données sensibles.`,
      `Support et conducteurs manquent de méthode partagée. Une intra ${opts.temoignageZone} aligne réflexes, prompts et garde-fous.`,
      `Financement Constructys : règles nationales au ${deptCode} — programme clair, objectifs mesurables, convention conforme Qualiopi.`,
    ],
    solutionTitle: `Formation IA BTP ${deptCode} : 4 h, résultats opérationnels`,
    solutionBody: [
      `${OFC} pour ${avecArticle} (${deptCode}) : 4 h, vos documents réels, zéro jargon startup. Devis, mails, synthèses, brouillons mémoires — itérations guidées.`,
      `Siège Guyancourt (78) : déplacements IDF réalistes ${opts.temoignageZone}. Présentiel intra ou inter uniquement.`,
      `Catalogue NIV-01 (bases), NIV-02 (appels d'offres), NIV-03 (conduite de travaux), NIV-04 (Maîtriser Claude AI) et NIV-05 (maîtres d'œuvre). Programmes PDF sur chaque fiche.`,
      `Repartez avec modèles réutilisables et feuille de route 15 jours — quoi tester, quoi mesurer, comment partager en équipe.`,
    ],
    villesTitle: `Villes et bassins d'emploi ${de} (${deptCode}) (indicatif)`,
    villesIntro: `Intra dans vos locaux ou sur site. Villes représentatives ${de} (${deptCode}) — liste non exhaustive. Court échange pour confirmer logistique.`,
    villesFooter: [
      `Enjeux locaux : ${opts.perimetre}. Exemples d'atelier adaptés à votre mix public/privé.`,
      `Vue régionale : page formation IA Île-de-France et catalogue des formations.`,
    ],
    programmeTitle: 'Programme type — 4 h',
    programmeBody: [
      `Usages IA BTP : ce qui s'automatise, ce qui ne s'automatise pas — relecture humaine.`,
      `Ateliers sur vos documents : courriers, CR, extraits CCTP — garde-fous confidentialité.`,
      `Mini-bibliothèque de prompts métier, vocabulaire de vos lots.`,
      `Plan d'action 15 jours : priorités, indicateurs simples, partage interne des prompts.`,
    ],
    temoignagesTitle: TEMOIGNAGES_REGION_BLOCK.temoignagesTitle,
    temoignages: [...TEMOIGNAGES_REGION_BLOCK.temoignages],
    financeTitle: `Financement Constructys et Qualiopi — entreprises du ${deptCode}`,
    financeBody: [
      `Constructys : prise en charge possible selon règles en vigueur. Qualiopi ${OFC} — programme, objectifs, durée, public.`,
      `Plafonds nationaux — votre OPCO ou RH confirme le montant. Devis et convention clairs avant engagement.`,
      `Guide financement sur le site : liens utiles et TVA intra/inter.`,
    ],
    tissuBtpLocal: opts.tissuBtpLocal,
    casUsageStandard: CAS_USAGE_FORMATION_BTP,
    deplacementGuyancourt: DEPLACEMENT_GUYANCOURT,
    casClientFfb: ffbCasClient(deptCode),
    faq: faqGeoBase(grammar, deptCode, opts.cities.slice(0, 4).join(', ')),
  };
}

/** FAQ Seine-et-Marne (77) — nuance étendue ouest / est du département. */
function faqSeineEtMarne77(): FAQItem[] {
  const base = faqGeoBase(getDeptGrammar('77'), '77', 'Melun, Meaux, Marne-la-Vallée, Chelles');
  return base.map((item, index) => {
    if (index === 0) {
      return {
        ...item,
        a: `Oui. Intra dans vos locaux ou sur site en Seine-et-Marne (77), selon calendrier. Siège à Guyancourt (78) : l'ouest du 77 (Marne-la-Vallée, Sénart, Melun, Meaux) est en général accessible sous 30 à 45 min ; l'est du département (Provins, Coulommiers, Fontainebleau, Nemours) mobilise plutôt une journée bloquée ou des demi-journées.`,
      };
    }
    if (index === 6) {
      return {
        ...item,
        a: 'Chaque référence catalogue (NIV-01 à NIV-05) = 4 h. Deux demi-journées sur deux thèmes possibles la même semaine — selon disponibilités.',
      };
    }
    return item;
  });
}

const DEPLACEMENT_GUYANCOURT_77 = `Siège ${OFC} à Guyancourt (78) : déplacement inclus au devis pour intra IDF, créneaux souvent calés sous 3 à 6 semaines. L'ouest du 77 (Marne-la-Vallée, Sénart, Melun) : logistique courante ; l'est (Provins, Coulommiers, Fontainebleau) : journée dédiée ou demi-journées à cadrer ensemble.`;

/** Seine-et-Marne (77) — contenu localisé (SEO Marne-la-Vallée, Melun, Meaux). */
export const FORMATION_IA_BTP_SEINE_ET_MARNE_77: FormationIaBtpDeptLandingConfig = {
  path: '/formation-ia-btp-seine-et-marne-77',
  h1: 'Formation IA appliquée au bâtiment en Seine-et-Marne (77) — Melun, Meaux et Marne-la-Vallée',
  metaTitle: buildIdfDeptPageTitle('Seine-et-Marne', '77'),
  metaDescription: buildDeptMetaDescription('Seine-et-Marne', '77', 'Melun, Meaux'),
  keywords: [
    'formation IA appliquée au bâtiment 77',
    'formation ChatGPT Seine-et-Marne',
    'Qualiopi 77',
    'formation IA Meaux',
    'formation IA Melun',
    'formation IA Marne-la-Vallée',
  ],
  departementNom: 'Seine-et-Marne',
  nom: 'Seine-et-Marne',
  article: 'la',
  prepositionLocative: 'en',
  deptCode: '77',
  badgeLine: 'Seine-et-Marne (77) · Présentiel en Île-de-France · Qualiopi',
  cities: [
    'Melun',
    'Meaux',
    'Chelles',
    'Pontault-Combault',
    'Champs-sur-Marne (Cité Descartes — ville durable / génie urbain)',
    'Savigny-le-Temple (Sénart)',
    'Bussy-Saint-Georges (Marne-la-Vallée)',
  ],
  courseName:
    'Formation IA pour le BTP Seine-et-Marne (77) — Qualiopi, financement possible selon éligibilité',
  courseDescription: `${OFC} : formation IA et ChatGPT pour entreprises du BTP en Seine-et-Marne (77). Sessions 4 h, exclusivement en présentiel en Île-de-France. Melun, Meaux, Marne-la-Vallée, Sénart. Qualiopi, financement possible selon éligibilité.`,
  serviceName: 'Accompagnement formation IA appliquée au bâtiment — département Seine-et-Marne (77)',
  serviceDescription:
    'Formation professionnelle en intelligence artificielle appliquée au bâtiment et aux travaux publics pour les entreprises de la Seine-et-Marne (77) : intra-entreprise, calendrier Île-de-France, organisme certifié Qualiopi.',
  areaServedCourse: [
    'Seine-et-Marne',
    'Melun',
    'Meaux',
    'Marne-la-Vallée',
    'Île-de-France',
    'France',
  ],
  areaServedService: ['Seine-et-Marne', 'Île-de-France', 'France'],
  problemTitle: 'BTP 77 : productivité attendue, temps admin réel',
  problemBody: [
    `Entreprises bâtiment, second œuvre et TP du 77 : forte activité autour de Marne-la-Vallée / Val d'Europe (tertiaire, logements, équipements), de la ville nouvelle de Sénart (logistique, zones d'activités) et des bassins de Melun Val de Seine et du Pays de Meaux. Axes A4, A5, A6, Francilienne (N104), RER A / D / E. Relances, CR et dossiers d'appels d'offres s'accumulent.`,
    `Plus le carnet est chargé, moins il reste de temps pour formaliser offres et échanges. L'IA réduit ce décalage — avec prompts CCTP, relecture obligatoire et règles sur données sensibles.`,
    `Support et conducteurs manquent de méthode partagée. Une intra en Seine-et-Marne aligne réflexes, prompts et garde-fous pour les équipes support et les conducteurs de travaux.`,
    `Financement Constructys : règles nationales — programme clair, objectifs mesurables, convention conforme Qualiopi.`,
  ],
  solutionTitle: 'Formation IA BTP 77 : 4 h, résultats opérationnels',
  solutionBody: [
    `${OFC} pour la Seine-et-Marne : 4 h, vos documents réels, zéro jargon startup. Devis, mails, synthèses, brouillons de mémoires — itérations guidées.`,
    `Siège Guyancourt (78) : déplacements réalistes vers l'ouest du 77 (Marne-la-Vallée, Sénart, Melun) ; pour l'est (Provins, Coulommiers, Fontainebleau), journée bloquée ou demi-journées. Présentiel intra ou inter uniquement.`,
    `Catalogue NIV-01 (bases), NIV-02 (appels d'offres), NIV-03 (conduite de travaux). Programmes PDF sur chaque fiche.`,
    `Repartez avec modèles réutilisables et feuille de route 15 jours — quoi tester, quoi mesurer, comment partager en équipe.`,
  ],
  villesTitle: "Villes et bassins d'emploi de la Seine-et-Marne (77) (indicatif)",
  villesIntro:
    'Intra dans vos locaux ou sur site. Villes et bassins fréquents dans le 77 — liste non exhaustive. Échange 30 min pour confirmer faisabilité et logistique.',
  villesFooter: [
    `Enjeux locaux : pôle de Marne-la-Vallée / Val d'Europe, logistique de Sénart, rénovation énergétique, logements collectifs, marchés publics des intercommunalités (Melun Val de Seine, Marne et Gondoire, Paris-Vallée de la Marne, Grand Paris Sud). Ateliers adaptés à votre mix public / privé.`,
    `Vue régionale : page formation IA Île-de-France et catalogue des formations.`,
  ],
  programmeTitle: 'Programme type — 4 h',
  programmeBody: [
    `Usages IA BTP : ce qui s'automatise, ce qui ne s'automatise pas — relecture humaine systématique.`,
    `Ateliers sur vos documents : courriers, CR, extraits CCTP — garde-fous confidentialité.`,
    `Mini-bibliothèque de prompts métier, vocabulaire de vos lots.`,
    `Plan d'action 15 jours : priorités, indicateurs simples, partage interne des prompts.`,
  ],
  temoignagesTitle: TEMOIGNAGES_REGION_BLOCK.temoignagesTitle,
  temoignages: [...TEMOIGNAGES_REGION_BLOCK.temoignages],
  financeTitle: 'Financement Constructys et Qualiopi — entreprises du 77',
  financeBody: [
    `Constructys : prise en charge possible selon règles en vigueur. Qualiopi ${OFC} — programme, objectifs, durée, public.`,
    `Plafonds nationaux — votre OPCO ou RH confirme le montant. Devis et convention clairs avant engagement.`,
    `Guide financement sur le site : liens utiles et TVA intra/inter.`,
  ],
  tissuBtpLocal: [
    `Seine-et-Marne : le plus vaste département francilien, à deux visages — ouest urbain dense (Marne-la-Vallée, Sénart, Melun, Meaux) et est plus rural (Provins, Coulommiers, Nemours, Fontainebleau). Neuf, rénovation, logements collectifs, logistique et marchés publics intercommunaux.`,
    `Sessions ${OFC} : 4 h Qualiopi, ChatGPT / Claude AI — validation humaine systématique, présentiel uniquement en Île-de-France.`,
  ],
  casUsageStandard: CAS_USAGE_FORMATION_BTP,
  deplacementGuyancourt: DEPLACEMENT_GUYANCOURT_77,
  casClientFfb:
    'Échanges FFB Grand Paris / FFB Seine-et-Marne — PME, marchés publics intercommunaux, rénovation.',
  faq: faqSeineEtMarne77(),
};

/** Essonne (91) */
export const FORMATION_IA_BTP_ESSONNE_91 = buildDeptConfig({
  path: '/formation-ia-btp-essonne-91',
  deptCode: '91',
  departementNom: 'Essonne',
  chefLieuAgglo: 'Évry-Courcouronnes',
  triVillesMeta: 'Évry-Courcouronnes, Massy et Palaiseau',
  keywords: [
    'formation IA pour le BTP 91',
    'formation ChatGPT Essonne',
    'Qualiopi 91',
    'formation IA Massy',
    'formation IA Évry',
  ],
  badgeLine: 'Essonne (91) · Île-de-France · Qualiopi',
  cities: ['Évry-Courcouronnes', 'Massy', 'Palaiseau', 'Corbeil-Essonnes', 'Yerres', 'Draveil', 'Savigny-sur-Orge'],
  chefLieu: 'Évry-Courcouronnes',
  perimetre:
    'Silicon Valley française, pôles universitaires, tissu de PME industrielles et de sous-traitance BTP',
  axes: 'A6, Francilienne sud, liaison Massy–Évry',
  temoignageZone: 'en Essonne',
  tissuBtpLocal: [
    `Essonne : Massy, Palaiseau, Évry, Corbeil — ingénierie, PME bâtiment, rénovation et neuf.`,
    `Formations ${OFC} sur vos documents — ChatGPT/Claude AI, Qualiopi, relecture humaine.`,
  ],
});

/** Hauts-de-Seine (92) */
export const FORMATION_IA_BTP_HAUTS_DE_SEINE_92 = buildDeptConfig({
  path: '/formation-ia-btp-hauts-de-seine-92',
  deptCode: '92',
  departementNom: 'Hauts-de-Seine',
  chefLieuAgglo: 'Nanterre',
  triVillesMeta: 'Nanterre, Boulogne-Billancourt et Issy-les-Moulineaux',
  keywords: [
    'formation IA pour les pros du BTP 92',
    'formation ChatGPT Hauts-de-Seine',
    'Qualiopi 92',
    'formation IA Nanterre',
    'formation IA Boulogne',
  ],
  badgeLine: 'Hauts-de-Seine (92) · Île-de-France · Qualiopi',
  cities: [
    'Nanterre',
    'Boulogne-Billancourt',
    'Issy-les-Moulineaux',
    'Courbevoie',
    'Levallois-Perret',
    'Colombes',
    'Asnières-sur-Seine',
  ],
  chefLieu: 'Nanterre',
  perimetre:
    'tissu dense de PME du bâtiment, proximité La Défense et Paris, forte demande sur mémoires techniques et délais courts',
  axes: 'A86, A15, boulevard périphérique ouest',
  temoignageZone: 'dans les Hauts-de-Seine',
  tissuBtpLocal: [
    `Hauts-de-Seine : La Défense, Nanterre, Boulogne — grands marchés tertiaires, rénovation, PME de proximité.`,
    `Sessions ${OFC} : 4 h, vos modèles, ChatGPT/Claude AI — Qualiopi et confidentialité.`,
  ],
});

/** Seine-Saint-Denis (93) */
export const FORMATION_IA_BTP_SEINE_SAINT_DENIS_93 = buildDeptConfig({
  path: '/formation-ia-btp-seine-saint-denis-93',
  deptCode: '93',
  departementNom: 'Seine-Saint-Denis',
  chefLieuAgglo: 'Bobigny',
  triVillesMeta: 'Bobigny, Saint-Denis et Montreuil',
  keywords: [
    'formation IA appliquée au bâtiment 93',
    'formation ChatGPT Seine-Saint-Denis',
    'Qualiopi 93',
    'formation IA Saint-Denis',
    'formation IA Montreuil',
  ],
  badgeLine: 'Seine-Saint-Denis (93) · Île-de-France · Qualiopi',
  cities: ['Bobigny', 'Saint-Denis', 'Montreuil', 'Aubervilliers', 'Pantin', 'Drancy', 'Noisy-le-Grand'],
  chefLieu: 'Bobigny',
  perimetre:
    'Grand Paris, nombreux marchés publics de collectivités, entreprises de travaux et second œuvre très présentes',
  axes: 'A1, A3, Francilienne nord-est',
  temoignageZone: 'en Seine-Saint-Denis',
  tissuBtpLocal: [
    `Seine-Saint-Denis : Grand Paris, marchés publics, rénovation — gros œuvre, réseaux, second œuvre.`,
    `Formations ${OFC} : brouillons IA, validation métier systématique — cadre Qualiopi.`,
  ],
});

/** Val-de-Marne (94) */
export const FORMATION_IA_BTP_VAL_DE_MARNE_94 = buildDeptConfig({
  path: '/formation-ia-btp-val-de-marne-94',
  deptCode: '94',
  departementNom: 'Val-de-Marne',
  chefLieuAgglo: 'Créteil',
  triVillesMeta: 'Créteil, Vincennes et Vitry-sur-Seine',
  keywords: [
    'formation IA pour le BTP 94',
    'formation ChatGPT Val-de-Marne',
    'Qualiopi 94',
    'formation IA Créteil',
    'formation IA Vitry',
  ],
  badgeLine: 'Val-de-Marne (94) · Île-de-France · Qualiopi',
  cities: [
    'Créteil',
    'Vincennes',
    'Vitry-sur-Seine',
    'Fontenay-sous-Bois',
    'Saint-Maur-des-Fossés',
    'Champigny-sur-Marne',
    'Ivry-sur-Seine',
  ],
  chefLieu: 'Créteil',
  perimetre:
    'lisière parisienne, rénovation urbaine, marchés mixtes public-privé, PME et professionnels du BTP très sollicités',
  axes: 'A4, A86, boulevard périphérique sud-est',
  temoignageZone: 'dans le Val-de-Marne',
  tissuBtpLocal: [
    `Val-de-Marne : ceinture parisienne dense — rénovation, neuf, site occupé, marchés publics locaux.`,
    `Sessions ${OFC} : 4 h Qualiopi, ChatGPT/Claude AI — validation humaine systématique.`,
  ],
});

/** Val-d’Oise (95) */
export const FORMATION_IA_BTP_VAL_DOISE_95 = buildDeptConfig({
  path: '/formation-ia-btp-val-doise-95',
  deptCode: '95',
  departementNom: "Val-d'Oise",
  chefLieuAgglo: 'Cergy',
  triVillesMeta: 'Cergy, Pontoise et Argenteuil',
  keywords: [
    "formation IA pour les pros du BTP 95",
    "formation ChatGPT Val-d'Oise",
    'Qualiopi 95',
    'formation IA Cergy',
    'formation IA Argenteuil',
  ],
  badgeLine: "Val-d'Oise (95) · Île-de-France · Qualiopi",
  cities: ['Cergy', 'Pontoise', 'Argenteuil', 'Sarcelles', 'Garges-lès-Gonesse', 'Franconville', 'Ermont'],
  chefLieu: 'Cergy-Pontoise',
  perimetre:
    'pôles de Cergy et d’Argenteuil, tissu de PME du bâtiment et de professionnels du BTP, liaison avec le Grand Roissy et le nord francilien',
  axes: 'A15, A115, Francilienne nord',
  temoignageZone: "dans le Val-d'Oise",
  tissuBtpLocal: [
    `Val-d'Oise : Cergy, Argenteuil, Roissy — PME bâtiment, tertiaire, logements et équipements.`,
    `Formations ${OFC} : mise en forme accélérée, Qualiopi, déplacements depuis Guyancourt maîtrisés.`,
  ],
});

/** URLs des 8 landings SEO « formation IA BTP » par département (sitemap, contrôle maillage). */
export const FORMATION_IA_BTP_DEPT_LANDING_PATHS = [
  ...DEPARTEMENT_PAGE_PATHS,
] as const;
