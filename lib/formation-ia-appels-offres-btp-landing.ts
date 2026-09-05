/**
 * Landing `/formation-ia-appels-offres-btp` — cluster SEO processus AO/DCE.
 */
import { FINANCEMENT_FORMULATION_PRUDENTE } from '@/lib/financement-copy';
import {
  AO_FORMATION_CAS_PRATIQUE_QUOTE,
  AO_FORMATION_PERSONNALISATION,
  AO_FORMATION_PROMESSE,
} from '@/lib/formation-ia-appels-offres-btp-operational-content';
import { LINKS } from '@/lib/internal-links';
import type { SeoClusterPageConfig } from '@/lib/seo-cluster-landing-types';

export const FORMATION_IA_APPELS_OFFRES_BTP_PATH = '/formation-ia-appels-offres-btp' as const;

export const FORMATION_IA_APPELS_OFFRES_BTP_CONFIG: SeoClusterPageConfig = {
  path: FORMATION_IA_APPELS_OFFRES_BTP_PATH,
  seo: {
    title: 'Formation IA Appels d\'Offres BTP | DCE & MT',
    titleAbsolute: 'Formation IA Appels d\'Offres BTP | DCE et Mémoire Technique',
    description:
      'Formation IA appels d\'offres BTP : analyse DCE, CCTP, DPGF, chiffrage assisté et mémoire technique. ChatGPT et Claude. Qualiopi, IDF.',
    openGraphTitle: 'Formation IA Appels d\'Offres BTP | DCE et Mémoire Technique',
    keywords: [
      'formation IA appels d\'offres BTP',
      'formation ChatGPT appels d\'offres BTP',
      'analyse DCE avec IA',
      'analyser un CCTP avec ChatGPT',
      'IA chiffrage BTP',
      'IA devis bâtiment',
      'IA mémoire technique',
      'ChatGPT mémoire technique BTP',
      'formation IA chiffrage bâtiment',
      'assistant IA appels d\'offres',
      'intelligence artificielle appels d\'offres BTP',
      'IA DCE',
      'IA appel d\'offre bâtiment',
    ],
    image: {
      url: '/images/formation-ia-appels-offres-btp.webp',
      width: 1200,
      height: 630,
      alt: 'Formation IA pour répondre aux appels d\'offres BTP — DCE, chiffrage et mémoire technique',
    },
  },
  h1: 'Formation IA pour les Appels d\'Offres BTP',
  subtitle:
    'Analyse DCE, préparation du chiffrage, mémoire technique et assistants IA réutilisables — sur vos DCE et devis réels, avec ChatGPT et Claude.',
  shortAnswer:
    'Formation IA appels d\'offres BTP : DCE complet (RC, CCTP, CCAP, DPGF, BPU), chiffrage assisté, mémoire technique, 8 assistants IA. 4 h présentiel, Qualiopi.',
  introParagraphs: [
    'Répondre à un appel d\'offres BTP demande de lire des centaines de pages, croiser RC, CCTP, CCAP et DPGF, préparer le chiffrage et produire un mémoire technique cohérent. L\'intelligence artificielle appels d\'offres BTP facilite l\'analyse et la structuration — pas la décision commerciale ni la validation finale du prix.',
    `Ce n'est pas une formation théorique : ${AO_FORMATION_CAS_PRATIQUE_QUOTE} ${AO_FORMATION_PERSONNALISATION}`,
    AO_FORMATION_PROMESSE,
  ],
  useCasesTitle: 'Usages IA sur vos dossiers d\'appels d\'offres',
  useCases: [
    { title: 'Analyser un DCE complet', body: 'RC, CCTP, CCAP, DPGF, BPU, plans et annexes — synthèse structurée à valider.' },
    { title: 'Identifier les prestations demandées', body: 'Extraction du lot entreprise — prestations explicites et points implicites à vérifier.' },
    { title: 'Extraire contraintes techniques et contractuelles', body: 'Normes, interfaces lots, clauses CCAP, délais, pénalités — aide à la lecture.' },
    { title: 'Comparer CCTP, DPGF, CCAP et RC', body: 'Repérage des incohérences et informations manquantes entre pièces.' },
    { title: 'Préparer le chiffrage', body: 'Checklist de postes, quantitatifs lorsque les documents le permettent — validation métier obligatoire.' },
    { title: 'Contrôler un devis', body: 'Comparaison devis / DCE — postes potentiellement oubliés à vérifier.' },
    { title: 'Désignations et structuration de devis', body: 'IA devis bâtiment : formulations professionnelles à partir des prestations identifiées.' },
    { title: 'Mémoire technique', body: 'Plan aligné critères RC, rédaction assistée — ChatGPT mémoire technique BTP et Claude.' },
    { title: 'Checklist avant dépôt', body: 'Contrôle des pièces obligatoires et points de conformité — sans promesse d\'absence d\'erreur.' },
    { title: 'Assistants IA réutilisables', body: '8 workflows configurés pendant la formation pour les prochains dossiers.' },
  ],
  publicTitle: 'Public concerné',
  publicTargets: [
    'Chargés d\'affaires',
    'Conducteurs de travaux impliqués dans les AO',
    'Responsables appels d\'offres',
    'Dirigeants PME BTP',
    'TPE/PME et entreprises de second œuvre (menuiserie, étanchéité, etc.)',
    'Assistants commerciaux et administratifs AO',
  ],
  specialSection: {
    id: 'terrain-ao',
    title: 'Formation sur vos documents — pas sur des cas fictifs',
    paragraphs: [
      'En session intra, chaque participant peut importer un DCE en cours et un ancien devis de l\'entreprise. La méthode s\'adapte à votre lot, vos ouvrages et votre façon de chiffrer — que vous répondiez en gros œuvre, menuiserie, étanchéité ou VRD.',
      'L\'IA assiste l\'analyse et facilite le contrôle : elle ne garantit pas l\'exhaustivité du chiffrage, l\'exactitude des quantités, l\'interprétation juridique définitive d\'un CCAP ni la conformité totale de l\'offre. Toute extraction est à valider par le professionnel avant remise.',
    ],
  },
  faq: [
    {
      q: 'Peut-on analyser un CCTP avec l\'IA ?',
      a: 'Oui, pour extraire et structurer les exigences clés — analyser un CCTP avec ChatGPT ou Claude facilite la première lecture. La validation technique, le chiffrage et le prix final restent humains.',
    },
    {
      q: 'L\'IA peut-elle chiffrer un marché à ma place ?',
      a: 'Non. Elle aide à identifier les postes à chiffrer, à préparer une checklist et à comparer un devis avec le DCE. L\'exhaustivité du chiffrage et l\'exactitude des quantités restent à valider par votre équipe.',
    },
    {
      q: 'Comment utiliser l\'IA pour répondre à un appel d\'offres BTP ?',
      a: 'En suivant un workflow reproductible : organisation DCE → synthèse marché → extraction prestations → contrôle CCTP/DPGF → checklist chiffrage → mémoire technique → contrôle final. La formation détaille 20 étapes et 8 assistants réutilisables.',
    },
    {
      q: 'Quelle IA utiliser pour analyser un DCE ?',
      a: 'Claude convient aux documents longs et à Cowork. ChatGPT aux synthèses courtes et à la rédaction section par section. Le choix dépend de votre dossier — les deux sont présentés en formation IA appels d\'offres BTP.',
    },
    {
      q: 'L\'IA remplace-t-elle l\'expertise métier ?',
      a: 'Non. Elle accélère la lecture, la structuration et la rédaction. Le chiffrage, la stratégie commerciale, l\'interprétation contractuelle et la signature du dossier restent à votre charge.',
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
    'Analyse DCE complet avec l\'IA (RC, CCTP, CCAP, DPGF, BPU)',
    'Préparation chiffrage assistée et contrôle devis',
    'Mémoire technique aligné critères RC',
    '8 assistants IA réutilisables',
    'Workflow 20 étapes appels d\'offres BTP',
  ],
  primaryCtaLabel: 'Former mon équipe appels d\'offres',
  midCtaTitle: 'Parler de votre process appels d\'offres',
  midCtaSubtitle: '30 minutes pour cadrer vos enjeux : DCE, chiffrage, mémoire technique ou assistants IA.',
  finalCtaTitle: 'Organiser une formation intra appels d\'offres',
  finalCtaSubtitle: 'Session sur vos DCE, devis et trames mémoire — présentiel Île-de-France.',
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
};
