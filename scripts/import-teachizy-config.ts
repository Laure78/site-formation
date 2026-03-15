/**
 * Configuration des contenus Teachizy à importer
 * Formation : L'IA au service du BTP
 *
 * Les PDF doivent être placés dans /public/formations/btp/
 * Les chemins sont relatifs à ce dossier (ex: prompting-devis-btp.pdf)
 */

export interface TeachizyLink {
  url: string;
  title?: string;
}

export interface TeachizyModuleConfig {
  /** Titre du module (doit correspondre à celui dans seed_formations.sql) */
  moduleTitle: string;
  /** Fichiers PDF dans /public/formations/btp/ */
  pdfs: string[];
  /** Liens externes (tutoriels, outils IA, docs) */
  links: TeachizyLink[];
}

export const TEACHIZY_IMPORT_CONFIG: TeachizyModuleConfig[] = [
  {
    moduleTitle: 'Devis et chiffrages',
    pdfs: [
      'prompting-devis-btp.pdf',
      'automatisation-devis.pdf',
    ],
    links: [
      { url: 'https://chat.openai.com', title: 'ChatGPT' },
      { url: 'https://perplexity.ai', title: 'Perplexity' },
    ],
  },
  {
    moduleTitle: 'Emails et relation client',
    pdfs: [],
    links: [],
  },
  {
    moduleTitle: 'Comptes rendus et DOE',
    pdfs: [],
    links: [],
  },
  {
    moduleTitle: 'Gestion administrative',
    pdfs: [],
    links: [],
  },
];
