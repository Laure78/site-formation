/**
 * Landing `/formation-ia-appels-offres-btp` — cluster SEO processus AO/DCE.
 */
import { FINANCEMENT_FORMULATION_PRUDENTE } from '@/lib/financement-copy';
import { LINKS } from '@/lib/internal-links';
import type { SeoClusterPageConfig } from '@/lib/seo-cluster-landing-types';

export const FORMATION_IA_APPELS_OFFRES_BTP_PATH = '/formation-ia-appels-offres-btp' as const;

export const FORMATION_IA_APPELS_OFFRES_BTP_CONFIG: SeoClusterPageConfig = {
  path: FORMATION_IA_APPELS_OFFRES_BTP_PATH,
  seo: {
    title: 'Formation IA Appels d\'Offres BTP | DCE & MT',
    titleAbsolute: 'Formation IA Appels d\'Offres BTP | DCE et Mémoire Technique',
    description:
      'Formation IA appels d\'offres BTP : analyse DCE, CCTP, CCAP et mémoire technique. ChatGPT et Claude. Qualiopi, IDF. Visio découverte.',
    openGraphTitle: 'Formation IA Appels d\'Offres BTP | DCE et Mémoire Technique',
    keywords: [
      'formation IA appels d\'offres BTP',
      'IA appel d\'offre bâtiment',
      'ChatGPT appel d\'offre BTP',
      'IA DCE',
      'IA mémoire technique',
      'analyse DCE intelligence artificielle',
    ],
    image: {
      url: '/images/formation-ia-appels-offres-btp.webp',
      width: 1200,
      height: 630,
      alt: 'Formation IA pour répondre aux appels d\'offres BTP — DCE et mémoire technique',
    },
  },
  h1: 'Formation IA pour les Appels d\'Offres BTP',
  subtitle:
    'Méthode structurée pour analyser un DCE, préparer un mémoire technique et sécuriser votre dossier — avec ChatGPT et Claude, sans promesse de substitution à l\'expertise métier.',
  shortAnswer:
    'Formation IA appels d\'offres BTP : import DCE, analyse RC/CCTP/CCAP, grille Go/No Go, mémoire technique et checklist conformité. 4 h présentiel, Qualiopi.',
  introParagraphs: [
    'Répondre à un appel d\'offres BTP demande de lire des centaines de pages, croiser RC, CCTP et CCAP, puis produire un mémoire technique cohérent avec les critères de notation. L\'IA accélère la lecture structurée et la rédaction — pas la décision commerciale ni le chiffrage.',
    'Cette formation présente une méthodologie en douze étapes, de l\'import du DCE à la vérification finale du dossier. ChatGPT et Claude sont utilisés selon les usages : documents longs, Cowork, Projects ou rédaction section par section.',
    'Chaque participant travaille sur un dossier réel ou type. Relecture humaine obligatoire avant tout envoi.',
  ],
  useCasesTitle: 'Méthodologie IA pour répondre aux appels d\'offres BTP',
  useCases: [
    { title: 'Importer et structurer un DCE', body: 'Organisation des pièces, index, priorités de lecture.' },
    { title: 'Analyser le règlement de consultation', body: 'Critères, pondération, délais, pièces exigées.' },
    { title: 'Identifier les critères de notation', body: 'Tableau critères/poids pour orienter le mémoire.' },
    { title: 'Analyser le CCTP', body: 'Exigences techniques, interfaces lots, points de vigilance.' },
    { title: 'Analyser le CCAP', body: 'Clauses contractuelles, pénalités, garanties, risques.' },
    { title: 'Identifier les risques contractuels', body: 'Synthèse des clauses sensibles — validation interne requise.' },
    { title: 'Grille Go / No Go', body: 'Scoring par critère, recommandation argumentée.' },
    { title: 'Checklist de conformité', body: 'Pièces obligatoires, formats, signatures, délais.' },
    { title: 'Préparer le mémoire technique', body: 'Plan section par section aligné sur le RC.' },
    { title: 'Adapter aux critères de notation', body: 'Arguments différenciants par critère pondéré.' },
    { title: 'Vérifier la cohérence du dossier', body: 'Croisement mémoire / DPGF / pièces administratives.' },
    { title: 'Préparer la réponse finale', body: 'Relecture, compléments, archivage pour capitalisation.' },
  ],
  publicTitle: 'Public concerné',
  publicTargets: [
    'Chargés d\'affaires',
    'Conducteurs de travaux impliqués dans les AO',
    'Responsables appels d\'offres',
    'Dirigeants PME BTP',
    'Assistants commerciaux et administratifs AO',
  ],
  faq: [
    {
      q: 'Peut-on analyser un CCTP avec l\'IA ?',
      a: 'Oui, pour extraire et structurer les exigences clés. La validation technique et le chiffrage restent humains.',
    },
    {
      q: 'Comment utiliser l\'IA pour répondre à un appel d\'offres BTP ?',
      a: 'En suivant une méthode : structuration DCE → analyse RC/CCTP/CCAP → Go/No Go → plan mémoire → rédaction assistée → relecture. La formation détaille chaque étape.',
    },
    {
      q: 'Quelle IA utiliser pour analyser un DCE ?',
      a: 'Claude convient aux documents longs et à Cowork. ChatGPT aux synthèses courtes et à la rédaction section par section. Le choix dépend de votre dossier.',
    },
    {
      q: 'L\'IA remplace-t-elle l\'expertise métier ?',
      a: 'Non. Elle accélère la lecture et la structuration. Le chiffrage, la stratégie commerciale et la signature du dossier restent à votre charge.',
    },
    {
      q: 'Financement Constructys possible ?',
      a: `${FINANCEMENT_FORMULATION_PRUDENTE}`,
    },
    {
      q: 'Où voir le programme détaillé ?',
      a: `Fiche catalogue NIV-02 : <a href="${LINKS.formationAO}">Répondre aux appels d'offres avec l'IA</a>.`,
    },
  ],
  courseName: 'Formation IA pour les appels d\'offres BTP',
  courseTeaches: [
    'Analyse DCE, RC, CCTP et CCAP avec l\'IA',
    'Grille Go/No Go et checklist conformité',
    'Rédaction de mémoire technique assistée',
    'Claude Cowork et ChatGPT pour les AO',
    'Capitalisation des dossiers types',
  ],
  primaryCtaLabel: 'Former mon équipe appels d\'offres',
  midCtaTitle: 'Parler de votre process appels d\'offres',
  midCtaSubtitle: '30 minutes pour cadrer vos enjeux : DCE, mémoire technique, délais ou équipe.',
  finalCtaTitle: 'Organiser une formation intra appels d\'offres',
  finalCtaSubtitle: 'Session sur vos DCE et vos trames mémoire — présentiel Île-de-France.',
  campaignSlug: 'formation-ia-appels-offres-btp',
  programmeRef: 'NIV-02',
  catalogueHref: LINKS.formationAO,
  catalogueLabel: 'NIV-02 — Répondre aux appels d\'offres avec l\'IA',
  relatedLinks: [
    { href: LINKS.formationChatgptBtp, label: 'Formation ChatGPT pour le BTP' },
    { href: LINKS.formationClaudeBtp, label: 'Formation Claude pour le bâtiment' },
    { href: LINKS.iaAnalyseDce, label: 'Analyser un DCE avec l\'IA' },
    { href: LINKS.iaMemoireTechnique, label: 'Mémoire technique BTP avec l\'IA' },
    { href: '/formation-ia-btp', label: 'Formation IA pour le BTP — pilier' },
  ],
  methodology: {
    title: 'Les 12 étapes de la méthode appels d\'offres IA',
    steps: [
      { title: 'Importer et structurer le DCE', body: 'Index des pièces et ordre de lecture.' },
      { title: 'Analyser le RC', body: 'Critères, calendrier, modalités de remise.' },
      { title: 'Extraire les critères de notation', body: 'Pondération pour le plan mémoire.' },
      { title: 'Lire le CCTP', body: 'Exigences techniques et interfaces.' },
      { title: 'Lire le CCAP', body: 'Clauses et risques contractuels.' },
      { title: 'Synthèse risques', body: 'Points de vigilance pour la décision.' },
      { title: 'Grille Go / No Go', body: 'Scoring et recommandation.' },
      { title: 'Checklist conformité', body: 'Pièces et formats exigés.' },
      { title: 'Plan mémoire technique', body: 'Structure alignée RC.' },
      { title: 'Rédaction assistée', body: 'Sections et arguments par critère.' },
      { title: 'Cohérence dossier', body: 'Croisement mémoire, chiffrage, annexes.' },
      { title: 'Relecture finale', body: 'Validation humaine avant envoi.' },
    ],
  },
};
