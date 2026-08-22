/**
 * Landing `/formation-claude-btp` — cluster SEO outil Claude AI.
 */
import { FINANCEMENT_FORMULATION_PRUDENTE } from '@/lib/financement-copy';
import { LINKS } from '@/lib/internal-links';
import type { SeoClusterPageConfig } from '@/lib/seo-cluster-landing-types';

export const FORMATION_CLAUDE_BTP_PATH = '/formation-claude-btp' as const;

export const FORMATION_CLAUDE_BTP_CONFIG: SeoClusterPageConfig = {
  path: FORMATION_CLAUDE_BTP_PATH,
  seo: {
    title: 'Formation Claude BTP | Claude AI bâtiment',
    titleAbsolute: 'Formation Claude BTP | Claude AI pour le bâtiment',
    description:
      'Formation Claude BTP : analyse PDF, DCE, Projects et mémoire technique. Présentiel IDF, Qualiopi. Programme NIV-04 et visio découverte.',
    openGraphTitle: 'Formation Claude BTP | Claude AI pour le bâtiment',
    keywords: [
      'formation Claude BTP',
      'Claude AI BTP',
      'Claude bâtiment',
      'Claude appels d\'offres',
      'Claude DCE',
      'Claude Projects BTP',
    ],
    image: {
      url: '/images/claude-ai-btp-hero.png',
      width: 1200,
      height: 630,
      alt: 'Formation Claude AI pour les professionnels du BTP — analyse documentaire',
    },
  },
  h1: 'Formation Claude AI pour le BTP',
  subtitle:
    'Analyse documentaire, DCE, documents longs et assistants métier avec Claude Chat, Projects et Cowork — formation pratique en présentiel.',
  shortAnswer:
    'Formation Claude BTP : Chat, Projects, analyse PDF/DCE, mémoire technique et workflows métiers. Session 4 h, Qualiopi, présentiel Île-de-France.',
  introParagraphs: [
    'Claude AI (Anthropic) se distingue par sa capacité à traiter des documents longs : DCE complets, CCTP, CCAP, dossiers techniques. En BTP, c\'est un outil d\'analyse et de synthèse — pas un substitut à l\'expertise métier.',
    'La formation couvre Claude Chat pour les échanges rapides, Projects pour organiser une base documentaire par client ou par marché, et Cowork pour automatiser des workflows (analyse DCE, plan mémoire). Claude Code peut être abordé pour les équipes qui souhaitent des outils internes simples.',
    'Vous repartez avec des configurations réutilisables sur vos propres documents, dans le respect des règles de confidentialité.',
  ],
  useCasesTitle: 'Usages Claude AI pour les entreprises du bâtiment',
  useCases: [
    { title: 'Claude Chat', body: 'Questions métier, reformulation, emails et courriers courts.' },
    { title: 'Projects', body: 'Base documentaire entreprise, instructions personnalisées, capitalisation.' },
    { title: 'Analyse de PDF', body: 'CCTP, CCAP, plans — extraction structurée des exigences.' },
    { title: 'Analyse de DCE', body: 'Synthèse RC, critères, délais, pièces demandées.' },
    { title: 'Synthèse CCTP', body: 'Points de vigilance techniques par lot.' },
    { title: 'Analyse CCAP', body: 'Clauses sensibles, pénalités, garanties.' },
    { title: 'Comparaison de documents', body: 'Versions successives, avenants, écarts CCTP/DPGF.' },
    { title: 'Création de modèles', body: 'Trames mémoire, CR, courriers réutilisables.' },
    { title: 'Mémoire technique', body: 'Plan et rédaction section par section selon critères RC.' },
    { title: 'Documents longs', body: 'Traitement de dossiers multi-centaines de pages par étapes.' },
    { title: 'Base documentaire', body: 'Organisation procédures, références, retours d\'expérience.' },
    { title: 'Conducteurs de travaux', body: 'CR, PPSPS, courriers — prompts métier chantier.' },
    { title: 'Appels d\'offres', body: 'Workflow Cowork analyse DCE → plan mémoire.' },
    { title: 'Claude Code (aperçu)', body: 'Pour équipes avancées : scripts et outils internes simples — selon programme NIV-04.' },
  ],
  publicTitle: 'Public concerné',
  publicTargets: [
    'Chargés d\'affaires et appels d\'offres',
    'Conducteurs de travaux',
    'Bureaux d\'études',
    'Directions travaux',
    'Responsables administratifs',
    'Dirigeants PME BTP',
  ],
  faq: [
    {
      q: 'Claude est-il adapté aux documents BTP ?',
      a: 'Oui pour l\'analyse et la synthèse de documents longs (DCE, CCTP). La validation technique reste humaine.',
    },
    {
      q: 'Quelle différence entre Claude et ChatGPT pour le BTP ?',
      a: 'Claude excelle sur les documents volumineux et Projects. ChatGPT sur les formats courts et la réactivité. La formation oriente selon vos usages.',
    },
    {
      q: 'Cowork et Claude Code sont-ils inclus ?',
      a: 'Le programme NIV-04 couvre Chat, Cowork et une introduction à Claude Code selon le niveau du groupe.',
    },
    {
      q: 'Mes DCE confidentiels peuvent-ils être uploadés ?',
      a: 'Selon votre abonnement et votre politique interne. La formation aborde les règles de confidentialité avant tout dépôt.',
    },
    {
      q: 'Financement OPCO ?',
      a: `${FINANCEMENT_FORMULATION_PRUDENTE}`,
    },
    {
      q: 'Guide complet Claude AI BTP disponible ?',
      a: `Consultez aussi le <a href="${LINKS.claudeAiBtp}">guide Claude AI BTP</a> (interfaces, prompts, cas d'usage).`,
    },
  ],
  courseName: 'Formation Claude AI pour le BTP',
  courseTeaches: [
    'Claude Chat et Projects pour le BTP',
    'Analyse DCE et documents PDF longs',
    'Cowork et skills métiers appels d\'offres',
    'Mémoire technique et synthèse CCTP/CCAP',
    'Organisation base documentaire entreprise',
  ],
  primaryCtaLabel: 'Découvrir la formation Claude pour le BTP',
  midCtaTitle: 'Parler de votre usage Claude BTP',
  midCtaSubtitle: 'DCE, Projects, Cowork ou conducteur de travaux — cadrons vos priorités en 30 minutes.',
  finalCtaTitle: 'Demander le programme NIV-04',
  finalCtaSubtitle: 'Maîtriser Claude AI pour le BTP — session catalogue 4 h.',
  campaignSlug: 'formation-claude-btp',
  programmeRef: 'NIV-04',
  catalogueHref: LINKS.formationMaitriserClaudeAiBtp,
  catalogueLabel: 'NIV-04 — Maîtriser Claude AI pour le BTP',
  relatedLinks: [
    { href: LINKS.claudeAiBtp, label: 'Guide Claude AI BTP — Chat, Cowork, Code' },
    { href: LINKS.formationChatgptBtp, label: 'Formation ChatGPT pour le BTP' },
    { href: LINKS.formationIaAppelsOffresBtp, label: 'Formation IA appels d\'offres BTP' },
    { href: LINKS.formationConducteurTravaux, label: 'IA pour les conducteurs de travaux' },
    { href: '/formation-ia-btp', label: 'Formation IA pour le BTP — pilier' },
  ],
};
