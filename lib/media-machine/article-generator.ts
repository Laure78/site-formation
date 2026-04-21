/**
 * Générateur d'articles SEO/GEO — Structure complète
 * Cible : 600-800 mots minimum (éviter articles courts 400-500 mots)
 */

import type { BlogArticle } from '../blog';
import type { ContentIdea } from './trends';
import { getArticleTemplate } from './templates';
import { getInternalLinksForArticle, getRandomCTA } from './internal-links';

export interface GeneratedArticle extends BlogArticle {
  slug: string;
  seoTitle: string;
  metaDescription: string;
  internalLinks: { path: string; anchor: string }[];
}

const MAX_META_LENGTH = 158;

/** Génère une méta-description unique selon le type d'article (évite le template générique). */
function generateMetaDescription(idea: ContentIdea, shortAnswer: string): string {
  const title = idea.title;
  const kw = idea.keywords[0] ?? 'IA BTP';

  if (shortAnswer.length <= MAX_META_LENGTH && shortAnswer.includes('IA') && !shortAnswer.startsWith('L\'IA et ChatGPT permettent')) {
    return shortAnswer.slice(0, MAX_META_LENGTH);
  }

  if (title.includes('Comment utiliser ChatGPT pour vos devis')) {
    const metier = title.replace('Comment utiliser ChatGPT pour vos devis ', '').trim();
    return `Devis ${metier} avec ChatGPT : prompts, trames et gain de temps. Guide pratique. Formation 100% finançable Constructys.`.slice(0, MAX_META_LENGTH);
  }
  if (title.includes('IA et ') && title.includes(' : 5 gains de temps')) {
    const metier = title.replace('IA et ', '').replace(' : 5 gains de temps concrets', '').trim();
    return `5 gains de temps : IA et ${metier}. Devis, CR, emails. Formation 4h pratique, finançable Constructys.`.slice(0, MAX_META_LENGTH);
  }
  if (title.includes('Devis en 15 min : le guide')) {
    const metier = title.replace('Devis en 15 min : le guide ', '').trim();
    return `Devis ${metier} en 15 min avec ChatGPT. Prompts, trames, exemples. Formation IA BTP Constructys.`.slice(0, MAX_META_LENGTH);
  }
  if (title.includes("L'IA va-t-elle remplacer les")) {
    const metier = title.replace("L'IA va-t-elle remplacer les ", '').replace(' ?', '').trim();
    return `L'IA remplace-t-elle les ${metier} ? Non : elle assiste le métier. Formation BTP finançable.`.slice(0, MAX_META_LENGTH);
  }
  if (title.includes('Formation IA BTP : ce qu')) {
    return "Formation IA BTP 2026 : financement, programmes, Qualiopi. Tout savoir pour vous former. Constructys 100%.".slice(0, MAX_META_LENGTH);
  }
  if (title.includes('Financement Constructys')) {
    return "Financement Constructys formation IA BTP : étapes, montant, démarches. 100% pris en charge. Guide complet.".slice(0, MAX_META_LENGTH);
  }
  if (title.includes('erreurs à éviter') && title.includes('ChatGPT pour')) {
    return "ChatGPT PME BTP : 5 erreurs à éviter. Données, prompts, confidentialité. Formation bonnes pratiques.".slice(0, MAX_META_LENGTH);
  }
  if (title.includes('Automatiser vos emails clients')) {
    return "Emails clients BTP : automatisez relances et réclamations avec l'IA. Gain de temps garanti. Formation finançable.".slice(0, MAX_META_LENGTH);
  }
  if (title.includes('Appels d\'offres BTP')) {
    return "Appels d'offres BTP : ChatGPT pour analyser DCE et rédiger mémoires. Formation Constructys.".slice(0, MAX_META_LENGTH);
  }
  if (title.includes('Recrutement BTP')) {
    return "Recrutement BTP : utilisez l'IA pour attirer les talents. Offres, annonces, sourcing. Formation RH bâtiment.".slice(0, MAX_META_LENGTH);
  }

  return `${title}. ${kw}. Formation IA BTP finançable Constructys.`.slice(0, MAX_META_LENGTH);
}

export function generateArticle(idea: ContentIdea): GeneratedArticle {
  const template = getArticleTemplate(idea);
  const internalLinks = getInternalLinksForArticle(idea.clusterId);

  const sections: BlogArticle['sections'] = [
    {
      type: 'definition',
      title: 'En bref',
      content: template.shortAnswer,
    },
    {
      type: 'paragraph',
      title: 'Définition',
      content: template.definition,
    },
    {
      type: 'list',
      title: 'Points clés à retenir',
      content: template.keyTakeaways,
    },
    {
      type: 'paragraph',
      title: 'Exemple pratique',
      content: template.practicalExample,
    },
    {
      type: 'list',
      title: 'Guide étape par étape',
      content: template.stepByStep,
    },
  ];

  if (template.faq.length > 0) {
    sections.push({
      type: 'faq',
      title: 'Questions fréquentes',
      content: template.faq.map((f) => `${f.q} — ${f.a}`),
    });
  }

  sections.push({
    type: 'cta',
    content: getRandomCTA(),
  });

  const metaDescription = generateMetaDescription(idea, template.shortAnswer);

  return {
    slug: idea.slug,
    title: idea.title,
    description: metaDescription,
    date: new Date().toISOString().slice(0, 10),
    keywords: idea.keywords,
    sections,
    relatedSlugs: [],
    seoTitle: idea.title,
    metaDescription,
    internalLinks,
  };
}
