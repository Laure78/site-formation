/**
 * Sources de contenu pour la base de connaissance
 * Agrége blog, formations, pages statiques, sitemap
 */

import { SITE_CONFIG } from '@/lib/seo';
import { BLOG_ARTICLES } from '@/lib/blog';
import { CSFE_NOM_LIBRE } from '@/lib/csfe';

export interface ContentChunk {
  url: string;
  title: string;
  content: string;
  type: 'blog' | 'formation' | 'page' | 'faq';
}

const BASE_URL = SITE_CONFIG.url;

// Formations (données statiques du site)
const FORMATIONS_DATA = [
  { path: '/formations', title: 'Catalogue formations IA BTP', desc: "Formations IA pour le BTP : devis, appels d'offres, RH, travaux publics. Guyancourt, Île-de-France. Qualiopi, 100% finançable Constructys." },
  { path: '/formations/ia-btp-paris', title: 'Formation IA BTP à Paris', desc: '4h pratiques. Devis en 15 min, emails automatisés. Paris + Île-de-France. 100% finançable OPCO.' },
  { path: '/formations/ia-travaux-publics', title: "L'IA au service des Travaux Publics", desc: '2 jours. DCE, CCTP, comptes rendus chantier. Assistant IA métier TP.' },
  { path: '/formations/ia-appels-offre-btp', title: 'Répondre aux appels d\'offre avec l\'IA', desc: 'Journée 7h ou parcours LMS 7h. DCE, mémoires techniques, assistant IA, prompts par métier. Qualiopi, Constructys.' },
  { path: '/formations/ia-rh-btp', title: 'IA pour la fonction RH BTP', desc: '2 jours. Recrutement, GEPP, tableaux de bord RH, assistant IA.' },
  { path: '/formations/ia-pme-btp', title: 'IA pour PME du BTP', desc: 'Formation adaptée aux PME. Démarrage rapide.' },
  {
    path: '/formations/sensibilisation-ia-assistants-personnalises',
    title: "Sensibilisation à l'IA & Assistants IA personnalisés",
    desc: 'Parcours LMS 8h : sensibilisation IA, prompts par métier, assistants sur mesure. Qualiopi, Constructys.',
  },
  {
    path: '/formations/ia-architecture-claude-dpgf',
    title: 'Architecte augmenté — Claude AI, DPGF, chantier et documents',
    desc: "Formation intra 4h visio : cabinets d'architecture, DPGF, métrés, GANTT, CR, PV, courriers. Claude AI + Google Workspace. 800 € HT.",
  },
];

// Pages clés + contenu synthétique
const PAGES_DATA: { path: string; title: string; content: string }[] = [
  { path: '/', title: 'Accueil — Laure Olivié', content: 'Formation IA pour le BTP. Gagnez 3 à 5h par semaine sur devis, chiffrages, emails et CR chantier. 100% finançable OPCO Constructys. Laure Olivié, formatrice IA, 10 ans d\'expérience travaux publics. Basée à Guyancourt (Yvelines), interventions en Île-de-France et partout en France.' },
  { path: '/a-propos', title: 'À propos', content: 'Laure Olivié — Formatrice IA spécialisée BTP. OFC Création d\'Entreprise, certification Qualiopi. Partenaires : FFB, GERESO, CNAM, Lefebvre Dalloz, LinkedIn Learning, Constructys.' },
  {
    path: '/etudes-de-cas/ffb-csfe',
    title: 'Étude de cas FFB & CSFE — Étanchéité',
    content: `Interventions réseau FFB (Grand Paris, Île-de-France Est et Ouest) et ${CSFE_NOM_LIBRE}. Modules : prompts métier, mémoires techniques, CCTP/DCE, comptes rendus chantier, devis et mails. Objectifs : autonomie sur les prompts, RGPD, validation métier. Bénéfices : gain de temps, Constructys, Qualiopi.`,
  },
  { path: '/contact', title: 'Contact', content: `Contact : ${SITE_CONFIG.email} — ${SITE_CONFIG.phoneDisplay}. Laure Olivié, Guyancourt (Yvelines).` },
  { path: '/prendre-rdv', title: 'Prendre rendez-vous', content: 'Réservez un échange d\'environ 30 minutes pour une formation sur-mesure. Planning en ligne via Calendly (appel découverte).' },
  { path: '/financement-constructys', title: 'Financement Constructys', content: 'Tarif journalier 2026 : 1000€ HT. Formations 100% finançables OPCO Constructys. Qualiopi.' },
  { path: '/financement-constructys', title: 'Financement Constructys', content: 'OPCO Constructys finance les formations BTP. Plan de développement des compétences. Prise en charge jusqu\'à 100%. 24€ HT/heure/stagiaire.' },
  { path: '/chatgpt-artisans-btp', title: 'ChatGPT pour entreprises BTP', content: 'Formation ChatGPT pour dirigeants et équipes du bâtiment et des travaux publics. Devis, emails, CR chantier. 4h pratiques.' },
  { path: '/ia-devis-batiment', title: 'IA devis bâtiment', content: 'Automatiser les devis bâtiment avec l\'IA. Gain de temps, trames réutilisables.' },
  { path: '/ia-conducteur-travaux', title: 'IA conducteur de travaux', content: 'L\'IA pour les conducteurs de travaux : CR, planning, DCE.' },
  { path: '/mentions-legales', title: 'Mentions légales', content: 'OFC Création d\'Entreprise, SIRET 905 244 281 00010. Hébergement O2switch.' },
];

/** Extraire le texte d'un article de blog */
function blogToChunks(): ContentChunk[] {
  return BLOG_ARTICLES.flatMap((a) => {
    const parts: string[] = [a.description];
    for (const s of a.sections) {
      if (typeof s.content === 'string') parts.push(s.content);
      else if (Array.isArray(s.content)) {
        const strings = s.content.filter((x): x is string => typeof x === 'string');
        parts.push(...strings);
      }
    }
    const content = [a.title, a.description, ...parts].join('\n\n');
    return [{
      url: `${BASE_URL}/blog/${a.slug}`,
      title: a.title,
      content,
      type: 'blog',
    }];
  });
}

/** Formations → chunks */
function formationsToChunks(): ContentChunk[] {
  return FORMATIONS_DATA.map((f) => ({
    url: `${BASE_URL}${f.path}`,
    title: f.title,
    content: `${f.title}. ${f.desc}`,
    type: 'formation',
  }));
}

/** Pages statiques → chunks */
function pagesToChunks(): ContentChunk[] {
  return PAGES_DATA.map((p) => ({
    url: `${BASE_URL}${p.path}`,
    title: p.title,
    content: p.content,
    type: 'page',
  }));
}

/** FAQ global (extrait des articles) */
function faqToChunks(): ContentChunk[] {
  const faqs: ContentChunk[] = [];
  for (const a of BLOG_ARTICLES) {
    for (const s of a.sections) {
      if (s.type === 'faq' && Array.isArray(s.content)) {
        for (const qa of s.content) {
          const text = String(qa);
          if (text.includes(' — ')) {
            faqs.push({
              url: `${BASE_URL}/blog/${a.slug}`,
              title: `FAQ: ${a.title}`,
              content: text,
              type: 'faq',
            });
          }
        }
      }
    }
  }
  return faqs;
}

/** Toutes les sources agrégées */
export function getAllContentChunks(): ContentChunk[] {
  return [
    ...blogToChunks(),
    ...formationsToChunks(),
    ...pagesToChunks(),
    ...faqToChunks(),
  ];
}

/** Découper un long contenu en chunks ~500 tokens */
export function splitIntoChunks(chunk: ContentChunk, maxChars = 1500): ContentChunk[] {
  const text = chunk.content;
  if (text.length <= maxChars) return [chunk];

  const parts: ContentChunk[] = [];
  let rest = text;
  let offset = 0;
  while (rest.length > 0) {
    const slice = rest.slice(0, maxChars);
    const lastSpace = slice.lastIndexOf(' ');
    const cut = lastSpace > maxChars / 2 ? lastSpace : maxChars;
    const segment = rest.slice(0, cut);
    rest = rest.slice(cut).trim();
    parts.push({
      ...chunk,
      content: segment,
      title: chunk.title + (parts.length > 0 ? ` (suite ${parts.length + 1})` : ''),
    });
  }
  return parts;
}
