/**
 * Miniatures guides / tutos — visuels carte hub `/ressources`.
 * Fichiers : `public/images/ressources/miniatures/*.jpg`
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
    alt: '50 prompts BTP prêts à copier-coller — ressource gratuite formation IA BTP',
    width: 1200,
    height: 675,
  },
  guideClaude: {
    src: `${BASE}/miniature-guide-claude-btp.jpg`,
    alt: 'Guide complet Claude pour l’administratif chantier BTP — Projets, Skills, MCP',
    width: 1200,
    height: 675,
  },
  guideChargeAffaires: {
    src: `${BASE}/miniature-guide-charge-affaires.jpg`,
    alt: 'Guide du chargé d’affaires BTP augmenté par l’IA — Claude Skills',
    width: 1200,
    height: 675,
  },
  guideChefChantier: {
    src: `${BASE}/miniature-guide-chef-chantier.jpg`,
    alt: 'Guide des chefs de chantier — skills Claude terrain BTP',
    width: 1200,
    height: 675,
  },
  guideDirigeant: {
    src: `${BASE}/miniature-guide-dirigeant-btp.jpg`,
    alt: 'Guide des dirigeants du BTP — pilotage IA pour PME bâtiment',
    width: 1200,
    height: 675,
  },
  guideRh: {
    src: `${BASE}/miniature-guide-rh-btp.jpg`,
    alt: 'Guide des RH du BTP — recrutement et admin RH augmentés par l’IA',
    width: 1200,
    height: 675,
  },
  guideAssistantsTravaux: {
    src: `${BASE}/miniature-guide-assistants-travaux.jpg`,
    alt: 'Guide des Assistants Travaux — missions marché augmentées par l’IA',
    width: 1200,
    height: 675,
  },
  nfP03001: {
    src: `${BASE}/miniature-nf-p-03-001.jpg`,
    alt: 'Infographie NF P 03-001 — cadre administratif marchés privés de travaux',
    width: 1200,
    height: 675,
  },
  tutoAnalyseCcap: {
    src: `${BASE}/miniature-tuto-analyse-ccap.jpg`,
    alt: 'Analyse express du CCAP — skill Claude pour appels d’offres BTP',
    width: 1200,
    height: 675,
  },
  memoireReclamation: {
    src: `${BASE}/miniature-memoire-reclamation.jpg`,
    alt: 'Mémoire de réclamation BTP — récupérer ce que le marché vous doit',
    width: 1200,
    height: 675,
  },
  tutoDiuo: {
    src: `${BASE}/miniature-tuto-diuo.jpg`,
    alt: 'Prépa DIUO — pièces que le coordonnateur SPS réclame, skill Claude',
    width: 1200,
    height: 675,
  },
  tutoPpsps: {
    src: `${BASE}/miniature-tuto-ppsps.jpg`,
    alt: 'Tuto skill Claude PPSPS — plan particulier sécurité chantier BTP',
    width: 1200,
    height: 675,
  },
} as const satisfies Record<string, RessourceMiniature>;
