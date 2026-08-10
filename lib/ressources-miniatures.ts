/**
 * Miniatures guides / tutos — visuels carte hub `/ressources`.
 * Fichiers : `public/images/ressources/miniatures/*.jpg`
 * Alts : description factuelle + 1 mot-clé contextuel, ≤ 125 car. (SEO/GEO).
 */
export type RessourceMiniature = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const BASE = '/images/ressources/miniatures';

export const RESSOURCES_MINIATURES = {
  prompts50: {
    src: `${BASE}/miniature-50-prompts-btp.jpg`,
    alt: 'Professionnel BTP au bureau avec classeur prompts — ChatGPT BTP, 50 prompts métier gratuits',
    width: 1200,
    height: 900,
  },
  guideRepondreAo: {
    src: `${BASE}/miniature-guide-repondre-ao-btp.jpg`,
    alt: 'Répondre à un appel d’offres dans le BTP — guide méthode AO, prompts et mémoire technique',
    width: 1200,
    height: 900,
  },
  guideClaude: {
    src: `${BASE}/miniature-guide-claude-btp.jpg`,
    alt: 'Guide Claude BTP Projets Skills MCP pour administratif chantier — formation IA appliquée au bâtiment',
    width: 959,
    height: 1200,
  },
  guideChargeAffaires: {
    src: `${BASE}/miniature-guide-charge-affaires.jpg`,
    alt: 'Chargé d’affaires BTP devant écran et plans — guide IA DCE mémoire technique ChatGPT BTP',
    width: 1200,
    height: 675,
  },
  guideChefChantier: {
    src: `${BASE}/miniature-guide-chef-chantier.jpg`,
    alt: 'Chef de chantier casque blanc bras croisés — guide IA terrain skills Claude formation BTP',
    width: 1200,
    height: 675,
  },
  guideDirigeant: {
    src: `${BASE}/miniature-guide-dirigeant-btp.jpg`,
    alt: 'Dirigeant BTP en costume au bureau vue chantier — guide IA pilotage PME Île-de-France',
    width: 1200,
    height: 675,
  },
  guideRh: {
    src: `${BASE}/miniature-guide-rh-btp.jpg`,
    alt: 'Responsable RH BTP au téléphone et laptop — guide IA recrutement formation pros du BTP',
    width: 1200,
    height: 675,
  },
  guideAssistantsTravaux: {
    src: `${BASE}/miniature-guide-assistants-travaux.jpg`,
    alt: 'Laure Olivié, Le Guide des Assistants Travaux — Claude Skills formation IA BTP',
    width: 1024,
    height: 576,
  },
  nfP03001: {
    src: `${BASE}/miniature-nf-p-03-001.jpg`,
    alt: 'Schéma NF P 03-001 marchés privés de travaux — cadre admin BTP formation IA chantier',
    width: 959,
    height: 1200,
  },
  tutoAnalyseCcap: {
    src: `${BASE}/miniature-tuto-analyse-ccap.jpg`,
    alt: 'Professionnelle BTP, titre Analyse Express du CCAP — appels d’offres formation IA pour le BTP',
    width: 1200,
    height: 675,
  },
  memoireReclamation: {
    src: `${BASE}/miniature-memoire-reclamation.jpg`,
    alt: 'Professionnelle BTP, mémoire de réclamation marché — ChatGPT BTP créances et délais',
    width: 1200,
    height: 675,
  },
  tutoDiuo: {
    src: `${BASE}/miniature-tuto-diuo.jpg`,
    alt: 'Professionnelle BTP, prépa DIUO pour le SPS — pièces lot chantier formation IA pour le BTP',
    width: 1200,
    height: 675,
  },
  tutoPpsps: {
    src: `${BASE}/miniature-tuto-ppsps.jpg`,
    alt: 'Formatrice casque et gilet sur chantier — tuto skill Claude PPSPS formation IA Île-de-France',
    width: 1200,
    height: 675,
  },
  tutoLivretIntegration: {
    src: `${BASE}/miniature-tuto-livret-integration.jpg`,
    alt: 'Laure Olivié, livret d’accueil du nouvel arrivant — skill Claude intégration BTP',
    width: 1024,
    height: 576,
  },
} as const satisfies Record<string, RessourceMiniature>;
