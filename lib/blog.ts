/**
 * Blog / Ressources — Articles SEO pour formation IA pour le BTP
 * Fusionne les articles statiques + générés (content/generated/)
 */

import { readdirSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { INTERNAL_LINKS, getAnchor } from '@/lib/seo-links';
import { LINKS } from '@/lib/internal-links';
import {
  estimateWordCountFromPlainText,
  extractFaqPairsFromArticleSections,
  FAQ_SCHEMA_MIN,
} from '@/lib/seo';
import { blogArticlesClaudeBtp2026 } from '@/lib/blog-claude-btp-2026-articles';
import { blogArticlesLsrAoModules } from '@/lib/blog-lsr-ao-modules-articles';
import { blogArticleFormationIaCctpAnalyseDceBtp } from '@/lib/blog-formation-ia-cctp-pillar';
import { blogArticleIaDevisBatimentChiffrageAutomatise } from '@/lib/blog-ia-devis-batiment-chiffrage-automatise';
import { formatPersonnesFormeesCount } from '@/lib/constants';
import {
  AO_DCE_CLUSTER_BLOG,
  clusterMaillageHtmlSection,
} from '@/lib/ao-dce-cluster-links';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import { formatTarifHt, TARIF_SESSION_FORFAIT_HT } from '@/lib/tarifs-sessions';
import {
  getAllMdxBlogSlugs,
  getMdxFrontmatter,
  mdxFrontmatterToBlogArticle,
} from '@/lib/blog-mdx';
import {
  filterPublishableBlogArticles,
  isBlogListingExcludedSlug,
} from '@/lib/blog-publishable-filters';
import {
  blogConsolidationRedirectsJuly2026,
  gscRedirects2026April,
} from '@/lib/gsc-redirects-2026';

/** Prompt optimisé pour affichage dans les articles ressources */
export interface ArticlePrompt {
  titre: string;
  prompt: string;
  usage?: string;
}

export interface BlogArticle {
  slug: string;
  title: string;
  /** Si défini, utilisé pour la balise title / Open Graph (le H1 reste `title`) */
  seoTitle?: string;
  /** Meta description manuelle — phrase complète (HTML, og:description, twitter:description). */
  description: string;
  date: string;
  /** Si défini, utilisé pour dateModified (schema + meta) — sinon = date de publication */
  dateModified?: string;
  keywords: string[];
  sections: {
    type: 'paragraph' | 'definition' | 'list' | 'faq' | 'cta' | 'prompts' | 'html';
    content: string | string[] | ArticlePrompt[];
    title?: string;
    formationHref?: string;
    /** Lien externe vers la communauté formateurs (groupe Facebook) */
    ctaCommunauteHref?: string;
  }[];
  relatedSlugs?: string[];
  /**
   * FAQ structurée (équivalent frontmatter MDX `faq:`) — prioritaire sur l’extraction
   * des sections `type: 'faq'` pour le JSON-LD FAQPage.
   */
  faq?: { question: string; answer: string }[];
  /** Image de couverture pour le schéma Article (URL absolue ou chemin commençant par /) */
  coverImage?: string;
  /** Affichage carte blog (ex. « 8 min ») — articles MDX avec `sections` vides */
  readingTime?: string;
}

/** Titre de section (H2) typique d’un bloc FAQ pour détection HTML. */
export function isFaqSectionHeading(title: string | undefined): boolean {
  if (!title?.trim()) return false;
  const t = title.toLowerCase();
  return /\bfaq\b/.test(t) || t.includes('questions fréquentes');
}

/** Extrait les paires Q/R depuis un fragment HTML (H3 + premier &lt;p&gt; suivant chaque H3). */
export function extractFaqPairsFromHtmlSection(html: string): { q: string; a: string }[] {
  const pairs: { q: string; a: string }[] = [];
  const strip = (s: string) =>
    s
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  const parts = html.split(/<h3\b[^>]*>/i);
  for (let i = 1; i < parts.length; i++) {
    const chunk = parts[i];
    const endH3 = chunk.search(/<\/h3>/i);
    if (endH3 < 0) continue;
    const q = strip(chunk.slice(0, endH3));
    const after = chunk.slice(endH3 + 5);
    const pMatch = /<p\b[^>]*>([\s\S]*?)<\/p>/i.exec(after);
    const a = pMatch ? strip(pMatch[1]) : '';
    if (q && a) pairs.push({ q, a });
  }
  return pairs;
}

/**
 * Paires Q/R pour le schéma FAQPage : `article.faq`, sections `type: 'faq'`
 * (lignes « Q — R »), et sections `type: 'html'` dont le titre contient FAQ / Questions fréquentes
 * avec H3 + paragraphes dans le HTML.
 */
export function extractFaqPairsForFaqPageJsonLd(article: BlogArticle): { q: string; a: string }[] {
  const pairs: { q: string; a: string }[] = [];

  if (article.faq && article.faq.length > 0) {
    for (const { question, answer } of article.faq) {
      const q = question.trim();
      const a = answer.trim();
      if (q && a) pairs.push({ q, a });
    }
    if (pairs.length >= FAQ_SCHEMA_MIN) return pairs;
  }

  for (const section of article.sections) {
    if (section.type === 'faq') {
      pairs.push(...extractFaqPairsFromArticleSections([section]));
    }
    if (
      section.type === 'html' &&
      typeof section.content === 'string' &&
      section.title &&
      isFaqSectionHeading(section.title)
    ) {
      pairs.push(...extractFaqPairsFromHtmlSection(section.content));
    }
  }

  return pairs;
}

/** Alias — même logique que extractFaqPairsForFaqPageJsonLd. */
export function getBlogArticleFaqPairs(article: BlogArticle): { q: string; a: string }[] {
  return extractFaqPairsForFaqPageJsonLd(article);
}

/** Estimation du nombre de mots pour schema Article JSON-LD (GEO) */
export function estimateWordCountFromArticle(article: BlogArticle): number {
  const parts: string[] = [article.title, article.description];
  for (const s of article.sections) {
    const c = s.content;
    if (typeof c === 'string') parts.push(c);
    else if (Array.isArray(c)) {
      for (const item of c) {
        if (typeof item === 'string') parts.push(item);
        else if (
          item &&
          typeof item === 'object' &&
          'titre' in item &&
          'prompt' in item
        ) {
          parts.push(item.titre, item.prompt);
        }
      }
    }
  }
  return estimateWordCountFromPlainText(parts.join(' '));
}

/** Une section d’article qui affiche un titre en H2 (hors bloc CTA). */
export function sectionRendersBlogH2(
  section: BlogArticle['sections'][number]
): boolean {
  if (!section.title?.trim()) return false;
  if (section.type === 'cta') return false;
  return true;
}

/** Estimation du nombre de mots pour une section (titre + contenu). */
export function estimateWordCountForSection(
  section: BlogArticle['sections'][number]
): number {
  const parts: string[] = [];
  if (section.title) parts.push(section.title);
  const c = section.content;
  if (typeof c === 'string') parts.push(c);
  else if (Array.isArray(c)) {
    for (const item of c) {
      if (typeof item === 'string') parts.push(item);
      else if (
        item &&
        typeof item === 'object' &&
        'titre' in item &&
        'prompt' in item
      ) {
        const p = item as ArticlePrompt;
        parts.push(p.titre, p.prompt);
        if (p.usage) parts.push(p.usage);
      }
    }
  }
  return estimateWordCountFromPlainText(parts.join(' '));
}

/**
 * Index de section après lequel insérer le CTA blog « milieu » :
 * après le premier H2 une fois ~450+ mots cumulés depuis le début du corps,
 * sinon après la section du premier H2 si l’article est court.
 */
export function getBlogCTAMidInsertAfterIndex(
  sections: BlogArticle['sections']
): number | null {
  if (sections.length === 0) return null;
  const MIN_WORDS = 400;
  let cum = 0;
  let firstH2 = -1;
  for (let i = 0; i < sections.length; i++) {
    cum += estimateWordCountForSection(sections[i]);
    if (sectionRendersBlogH2(sections[i]) && firstH2 < 0) {
      firstH2 = i;
    }
    if (firstH2 >= 0 && cum >= MIN_WORDS) {
      return i;
    }
  }
  if (firstH2 >= 0) {
    return firstH2;
  }
  return null;
}

export const BLOG_ARTICLES: BlogArticle[] = [
  blogArticleIaDevisBatimentChiffrageAutomatise,
  blogArticleFormationIaCctpAnalyseDceBtp,
  ...blogArticlesClaudeBtp2026,
  ...blogArticlesLsrAoModules,
  // Avril 2026 — Brief chiffré adoption IA BTP (Plein Sens, Orisha, marchés)
  {
    slug: 'adoption-ia-btp-2026-chiffres-freins-leviers',
    seoTitle: 'Adoption IA BTP : chiffres, freins, leviers',
    title: 'Adoption de l\'IA dans le BTP en 2026 : chiffres clés, freins et leviers',
    description:
      'Moins de 10 % des PME BTP utilisent l’IA ; 621 répondants 2026 : freins, usages, leviers formation. Qualiopi, Constructys. Diagnostic gratuit 30 min.',
    date: '2026-04-06',
    keywords: [
      'IA BTP',
      'adoption intelligence artificielle bâtiment',
      'entreprises BTP IA',
      'Observatoire métiers BTP',
      'formation IA pour les pros du BTP',
      'ChatGPT entreprises BTP',
      'marché IA construction',
      'France TPE PME BTP',
    ],
    sections: [
      {
        type: 'definition',
        title: 'En bref',
        content:
          'En 2026, l\'intelligence artificielle reste marginale dans les entreprises du bâtiment et des travaux publics : moins de 10 % des structures l\'utilisent déjà, alors que plus d\'un tiers des dirigeants se disent prêts à adopter. Cet article synthétise les chiffres d\'études récentes (Observatoire des métiers du BTP — 621 répondants, cabinet Plein Sens), le dynamisme du marché européen de l\'IA en construction, les usages qui rapportent le plus, les freins à lever — et les leviers alignés avec une formation courte, pratique et éligible à une prise en charge par OPCO Constructys, selon éligibilité.',
      },
      {
        type: 'paragraph',
        title: 'Les chiffres clés de l\'adoption de l\'IA dans le BTP en France',
        content:
          'L\'étude « Observatoire des métiers du BTP » (2026), menée auprès de 621 professionnels du secteur en France par le cabinet Plein Sens, dresse un état des lieux clair. Côté terrain : moins de 10 % des entreprises BTP utilisent l\'IA aujourd\'hui ; seulement 3 % déclarent un déploiement effectif et 5 % un déploiement en cours. Pourtant la demande existe : 36 % des dirigeants se disent prêts à adopter. Le fossé se comprend : 43,5 % n\'ont jamais essayé ChatGPT et 16 % ne savent pas ce qu\'est l\'IA. Une étude Orisha Construction / InfoPro Digital (2025) souligne en parallèle une progression de +15 points en un an sur l\'intention d\'adoption. Autre lecture : 40 % des dirigeants « n\'y pensent pas du tout », tandis que 70 % utilisent déjà ou envisagent l\'IA — ce qui montre une polarisation entre curieux et distants.',
      },
      {
        type: 'paragraph',
        title: 'Contexte France et marché de l\'IA dans la construction en Europe',
        content:
          'À l\'échelle nationale, tous secteurs confondus, le taux d\'adoption de l\'IA en France s\'établit à environ 10 % (contre 6 % en 2023), en dessous de la moyenne européenne (13 %). Les TPE et PME utilisent l\'IA générative à hauteur d\'environ 31 %, dont 8 % de façon régulière (sources Bpifrance Le Lab, Baromètre France Num 2025). Le marché français de l\'IA croît d\'environ +28,9 % par an ; l\'objectif de 20 milliards d\'euros pour 2030 est souvent cité dans les projections sectorielles. Pour le bâtiment en Europe, les analystes (MarketDataForecast, etc.) estiment le marché de l\'IA appliquée à la construction à environ 1,52 milliard USD en 2025, 1,80 milliard USD en 2026, avec une projection vers 11,38 milliards USD en 2034 — soit un CAGR d\'environ +25,9 % entre 2026 et 2034. L\'Europe représenterait environ 31,2 % du marché mondial en 2025.',
      },
      {
        type: 'list',
        title: 'Taille d\'entreprise : qui adopte, qui résiste ?',
        content: [
          'Micro-entreprises (moins de 10 salariés) : moins de 30 % d\'intention d\'adoption. Frein principal : méconnaissance de l\'IA et des outils accessibles.',
          'PME (10 à 49 salariés) : environ 50 % d\'intention. Souvent déjà convaincues, elles cherchent des formations concrètes et un retour sur investissement lisible.',
          'ETI et grandes entreprises (plus de 50 salariés) : plus de 50 % d\'intention. Déploiements en cours, ROI mesuré sur des pilotes.',
        ],
      },
      {
        type: 'list',
        title: 'Cinq usages déjà observés sur le terrain (2026)',
        content: [
          'Comptes rendus de réunion ou de chantier par dictée vocale : gain typique de l\'ordre de 45 minutes à 5 minutes (environ −89 % du temps) — outils : ChatGPT, Claude.',
          'Analyse de DCE et rédaction de mémoire technique : passage de quelques jours à une vingtaine de minutes sur les premiers jets — Claude, Copilot.',
          'Génération de devis assistée (commande vocale ou texte) : exemples documentés autour de 45 secondes pour un premier jet — solutions IA métiers BTP.',
          'Emails, courriers et relances clients : −20 à 30 % du temps administratif — ChatGPT, Claude.',
          'Comparaison de pièces contractuelles (jusqu\'à plusieurs centaines de pages) : quelques heures au lieu de plusieurs jours grâce aux modèles à contexte étendu (ex. Claude, fenêtres 1M tokens).',
        ],
      },
      {
        type: 'paragraph',
        title: 'Pourquoi ça bloque encore ? Cinq freins majeurs',
        content:
          'L\'Observatoire des métiers du BTP identifie des obstacles récurrents. Premièrement, la méconnaissance : le mot « IA » reste abstrait ou réservé aux grandes entreprises tech. Deuxièmement, une résistance culturelle : le secteur valorise le savoir-faire manuel et la transmission ; l\'idée qu\'un algorithme « aide » à la décision peut heurter des habitudes. Troisièmement, la qualité des données : les informations sont souvent éparpillées, peu structurées — l\'IA ne produit de bonnes sorties qu\'avec des entrées fiables. Quatrièmement, le coût et le ROI : selon des benchmarks internationaux, une très large part des expérimentations ne passe pas en production ; pour une TPE, justifier l\'investissement reste difficile. Cinquièmement, l\'âge des dirigeants : une partie des patrons proches de la retraite hésite à investir dans une technologie dont le retour complet se jouera sur le long terme.',
      },
      {
        type: 'list',
        title: 'Cinq leviers recommandés par l\'Observatoire (et ce qu\'ils impliquent pour vous)',
        content: [
          'Développer la culture numérique : former d\'abord dirigeants et encadrants, avec des cas d\'usage BTP concrets — pas du jargon.',
          'Fiabiliser la donnée : structurer les données internes et les logiciels métiers avant d\'industrialiser l\'IA.',
          'Sécuriser les usages : confidentialité, vérification des réponses, limites de l\'IA générative — thématiques centrales dans une formation sérieuse.',
          'Structurer l\'offre de formation : privilégier des formats courts (par exemple une demi-journée, 4 h), ancrés dans les métiers, éligibles au financement via Constructys pour les entreprises du BTP concernées.',
          'Renforcer la coordination sectorielle : fédérations, organismes de formation, OPCO — pour éviter la dispersion des messages et des ressources.',
        ],
      },
      {
        type: 'html',
        title: 'Ce que ces chiffres changent pour votre formation (ou votre décision de vous former)',
        content: `<p class="text-slate-600 leading-relaxed">Le constat est le même sur le terrain que dans les enquêtes : le potentiel est immense, mais l'adoption est surtout freinée par la méconnaissance — pas par le manque d'intérêt. Les entreprises qui montent en compétence sur une IA appliquée au BTP (devis, mémoires, DCE, comptes rendus, relances) prennent de l'avance sur une majorité de concurrents qui n'ont pas encore franchi le pas. Pour passer des chiffres à l'action, le <a href="${LINKS.formations}" class="text-[var(--accent)] font-medium underline">catalogue des formations IA pour le BTP</a> et mon <a href="${LINKS.blogFormationIaBtpGuide2026}" class="text-[var(--accent)] font-medium underline">guide formation IA appliquée au bâtiment 2026</a> cadrent le parcours. Le premier usage spontané reste souvent la dictée vocale pour les comptes rendus de chantier : c'est exactement le type de geste que l'on peut verrouiller dès les premiers modules d'une formation courte, certifiée Qualiopi et éligible au financement OPCO Constructys dans les conditions en vigueur (plafonds, délais de dossier).</p>`,
      },
      {
        type: 'faq',
        title: 'Questions fréquentes',
        content: [
          'Les chiffres de cet article sont-ils fiables ? — Ils sont issus d\'études citées en fin d\'article (Observatoire des métiers du BTP 2026, Orisha, sources marché européen). Les pourcentages sont des ordres de grandeur ; les résultats varient selon la taille d\'entreprise et le métier.',
          'Pourquoi si peu d\'entreprises BTP utilisent l\'IA si les dirigeants sont « prêts » ? — Le passage de l\'intention à la pratique quotidienne demande du temps, méthode et souvent une formation. Sans accompagnement, l\'outil reste expérimental.',
          'Quel est le premier levier pour une PME du bâtiment ? — Commencer par un cas d\'usage à forte valeur (souvent compte rendu ou devis), puis standardiser. Les formations courtes sur documents réels accélèrent ce passage.',
          'La formation IA appliquée au bâtiment est-elle finançable ? — Les formations certifiées Qualiopi proposées par OFC Création d\'Entreprise peuvent être financées par OPCO Constructys selon les règles applicables à votre entreprise (effectif, plan de développement des compétences, délais de dossier).',
          'L\'IA va-t-elle remplacer les métiers du BTP ? — Non dans les usages réalistes : l\'IA assiste l\'écriture, la synthèse et la préparation ; la validation humaine, la responsabilité technique et la relation client restent centrales.',
        ],
      },
      {
        type: 'paragraph',
        title: 'Sources et références',
        content:
          'Observatoire des métiers du BTP — étude sur la perception et l\'intégration de l\'IA (2026), 621 professionnels, cabinet Plein Sens · Orisha Construction / InfoPro Digital (2025) · FNTP — travaux sur la perception de l\'IA dans le BTP · Bpifrance Le Lab — adoption de l\'IA générative en TPE-PME · Baromètre France Num 2025 · MarketDataForecast — Artificial Intelligence in Construction (Europe) · FrenchWeb, analyses sectorielles BTP 2025-2026 — ainsi que synthèses sectorielles (Graneet, HEXABIM, batiweb, etc.). Les projections de marché sont des estimations ; elles évoluent avec les données publiées.',
      },
      {
        type: 'cta',
        content:
          'Vous voulez passer de l\'intention à la pratique ? Découvrez les formations IA pour les pros du BTP (Qualiopi, financement Constructys selon éligibilité) animées par Laure Olivié — cas réels : devis, DCE, mémoires, chantier.',
        formationHref: '/formations',
      },
    ],
    relatedSlugs: [
      'formation-ia-btp-guide-complet-2026',
      'financer-formation-ia-btp-constructys',
      'chatgpt-devis-btp-methode-2026',
    ],
  },

  // Avril 2026 — ChatGPT devis bâtiment en 20 minutes (méthode terrain)
  {
    slug: 'devis-btp-chatgpt-20-minutes',
    seoTitle: 'Devis BTP : méthode 20 min, prix maîtrisés',
    title:
      'ChatGPT devis bâtiment : comment je fais tenir un devis en 20 minutes (sans brûler mes prix)',
    description:
      'Premier jet de devis en ~20 min : données propres, prompt, relecture des PU, variantes. Formation IA Qualiopi, Constructys. Diagnostic gratuit.',
    date: '2026-04-07',
    keywords: [
      'ChatGPT devis bâtiment',
      'devis BTP IA',
      'automatiser devis BTP',
      'ChatGPT devis chiffrage',
      'prompt devis BTP',
      'IA devis bâtiment',
      'formation IA pour les pros du BTP',
    ],
    sections: [
      {
        type: 'definition',
        title: 'En bref',
        content:
          'Je forme des professionnels du BTP et des dirigeants du bâtiment depuis des années : ce qui revient le plus souvent, c’est le temps perdu sur les devis. Avec une bonne préparation et un prompt clair, ChatGPT peut vous livrer une base de devis exploitable en une vingtaine de minutes — pas à la place de votre cerveau, mais pour vous éviter la page blanche et la mise en forme. Ce guide reprend exactement ce que je fais valider en formation : préparer ses données, coller le bon modèle, relire les prix à la main, puis adapter selon le type de chantier. Les montants restent votre responsabilité : l’outil propose une structure, vous validez chaque chiffre.',
      },
      {
        type: 'paragraph',
        title: 'Le vrai problème : ce n’est pas le chantier, c’est le papier',
        content:
          'Sur le terrain, vous savez ce que vous allez faire : déposer les câbles, passer les sous-couches, monter les cloisons. Le client, lui, veut un papier qui rassure : un devis détaillé, lisible, avec des lots clairs et des totaux cohérents. Dans les TPE que j’accompagne, on voit souvent 3 à 5 heures par semaine absorbées par la rédaction et la mise au propre des devis — parfois plus quand il y a plusieurs variantes ou un marché un peu technique. Souvent, le blocage n’est même pas le calcul : c’est de reformuler proprement ce que vous avez déjà en tête, de répéter les mêmes mentions légales, d’aligner les libellés pour que le client comprenne ce qu’il paie. La solution que je propose n’est pas magique : c’est ChatGPT utilisé comme assistant de rédaction pour un devis BTP IA, avec une règle d’or que je répète en salle : on automatise le devis BTP pour gagner du temps sur la forme, jamais pour laisser un robot décider du chiffrage à votre place. Quand la méthode est propre, le premier jet sort en environ vingt minutes ; le reste, c’est votre relecture et votre grille tarifaire. C’est exactement l’objectif d’un bon usage de l’outil : moins de fatigue administrative, plus de disponibilité pour les chantiers et les clients.',
      },
      {
        type: 'paragraph',
        title: 'Étape 1 — Préparer vos données (sans ça, ChatGPT invente)',
        content:
          'Avant d’ouvrir ChatGPT, je vous demande de rassembler le strict nécessaire — comme avant un vrai chiffrage. Côté entreprise : raison sociale, coordonnées, numéro SIRET, mentions d’assurance (décennale, RC pro) si vous les mettez en pied de devis. Côté chantier : type de travaux (neuf, rénovation, extension), localisation au moins par commune, contraintes (accès, délais, horaires bruyants), périmètre précis des prestations. Côté argent : votre grille de prix unitaires ou, à défaut, des ordres de grandeur que vous acceptez d’utiliser provisoirement — mais en les étiquetant comme « à valider ». Les conditions commerciales : acompte, délai de validité du devis, modalités de paiement, taux de TVA prévu (10 % ou 20 % selon le cas rénovation / neuf — en cas de doute, notez-le et vérifiez avec votre comptable). Si vous donnez ça à ChatGPT, vous limitez les « prix fantaisistes » ; si vous donnez un vague « refaire la salle de bain », vous obtiendrez un texte joli mais pas ancré dans votre réalité économique.',
      },
      {
        type: 'paragraph',
        title: 'Étape 2 — Le prompt magique (celui que je fais copier en formation)',
        content:
          'Voici le modèle que je donne tel quel aux équipes : vous le copiez, vous remplacez ce qui est entre crochets par vos infos réelles, et vous lisez la sortie comme un brouillon de chantier — pas comme une vérité comptable. L’objectif est un devis lot par lot, avec séparation claire fournitures et main-d’œuvre quand c’est pertinent, TVA explicitée, et mentions légales de base. Si un prix ne figure pas dans votre grille, le modèle doit laisser « à compléter » plutôt que broder un chiffre crédible au hasard.',
      },
      {
        type: 'prompts',
        title: 'Le prompt à coller dans ChatGPT (devis complet, lots, TVA)',
        content: [
          {
            titre: 'Modèle — Devis BTP structuré (lots, fournitures, main d’œuvre, TVA)',
            prompt:
              "Tu es un assistant de rédaction pour une entreprise du bâtiment en France. Rédige un DEVIS professionnel à partir des éléments suivants, sans inventer de normes techniques ni de prix si je ne les fournis pas.\n\nIDENTITÉ ENTREPRISE : [nom, adresse, téléphone, email, SIRET, assurances décennale et RC pro si connues].\n\nCHANTIER : [adresse ou commune], type [neuf / rénovation / extension], délai souhaité [X semaines], contraintes [accès, stationnement, horaires].\n\nPÉRIMÈTRE : [décrire corps d'état par corps d'état : ex. dépose, préparation des supports, fourniture et pose, finitions].\n\nGRILLE DE PRIX (HT) : [coller PU ou table : désignation / unité / PU HT ; ou écrire « PU à saisir » pour chaque ligne si non fourni].\n\nTVA : indiquer pour chaque poste si tu appliques 10 % ou 20 % et pourquoi (travaux sur logement de plus de 2 ans, etc.) ; si tu n'es pas certain, écris « TVA à confirmer selon situation fiscale du chantier ».\n\nSTRUCTURE DU DOCUMENT :\n1) Objet et rappel du périmètre\n2) Détail par LOT avec sous-titres clairs : pour chaque ligne — désignation, quantité, unité, PU HT, total HT\n3) Distinction fournitures / main-d'œuvre lorsque pertinent\n4) Sous-total HT, détail TVA par taux, Total TTC\n5) Conditions : validité du devis [30 jours], acompte [%], solde, délais de paiement\n6) Mentions légales habituelles (décennale, RC Pro) — sans inventer de numéros de police\n\nSTYLE : français professionnel, vocabulaire BTP correct, phrases courtes. Si une information manque pour chiffrer, écris « À compléter par l'entreprise » au lieu d'estimer un montant.",
            usage:
              'Remplacez tout ce qui est entre crochets. Relisez chaque PU et total : ChatGPT ne connaît pas votre marge ni votre saison.',
          },
        ],
      },
      {
        type: 'paragraph',
        title: 'Étape 3 — Personnaliser et vérifier (indispensable sur les prix)',
        content:
          'Le texte généré est une base, pas une offre prête à signer. Je passe toujours en revue les mêmes points avec les stagiaires : d’abord les prix unitaires et les quantités — ChatGPT devis chiffrage peut arrondir ou aligner sur des moyennes trouvées sur internet, ce qui n’a rien à voir avec votre fournisseur local ou votre productivité réelle. Ensuite la TVA : une erreur ici coûte cher au client comme à vous. Puis le descriptif technique : les intitulés de lots doivent coller à ce que vous facturez vraiment (pas de prestation « en trop » qui vous engage). J’ajoute ensuite votre mise en page habituelle : logo, pied de page, numérotation, références aux CGV. Si vous utilisez un logiciel de devis, copiez les lots utiles plutôt que d’envoyer brut le PDF ChatGPT — l’important est de gagner du temps sur la rédaction, pas de créer un second flux bancal. C’est exactement cet enchaînement relecture humaine + outil métier que je valide en formation IA appliquée au bâtiment : l’IA accélère, vous tranchez.',
      },
      {
        type: 'paragraph',
        title: 'Étape 4 — Les variantes : rapide vs détaillé, rénovation vs neuf',
        content:
          'Pas besoin du même niveau de détail pour chaque prospect. Pour un petit entretien ou une réparation ciblée, je demande un « devis rapide » : peu de lots, phrases courtes, focus sur déplacement, MO, fourniture principale — le but est d’envoyer vite pour débloquer le planning. Pour une rénovation lourde ou une extension, on passe en « devis détaillé » : lots découpés (dépose, reprise d’étanchéité, isolation, finitions), parce que le client compare souvent plusieurs entreprises et que la transparence du poste rassure. Neuf et rénovation ne se traitent pas pareil : en rénovation, j’insiste dans le prompt sur l’imprévu (prises en sous-œuvre, état des supports) pour que le devis dise clairement ce qui est mesuré sur place — ça évite les disputes à l’avancement. Pour le neuf, la structuration par phase ou par corps d’état est souvent plus lisible pour le maître d’ouvrage. Vous pouvez dupliquer le prompt magique et ajouter une ligne « mode : devis synthétique » ou « mode : mémoire technique léger » selon le cas.',
      },
      {
        type: 'prompts',
        title: '3 prompts prêts à l’emploi (peinture, électricité, maçonnerie)',
        content: [
          {
            titre: 'Devis peinture — pièces et surfaces données',
            prompt:
              "Tu es peintre en bâtiment en France. Rédige un devis pour [nombre] pièces, surface totale environ [X] m² de murs et [Y] m² de plafonds. Préparation : lessivage, rebouchages légers, ponçage. Finitions : [mat / satin / acrylique], [nombre] couches. Fourniture des peintures : [oui/non]. Déplacement [zone]. Utilise ma grille PU HT suivante : [coller]. Précise TVA 10 % si travaux sur logement de plus de 2 ans, sinon justifie. Total HT, TVA, TTC. Conditions : validité 30 jours, acompte 30 %.",
            usage: 'Adaptez surfaces, type de pièces (humides ou non) et gamme peinture.',
          },
          {
            titre: 'Devis électricité — tableau et circuits',
            prompt:
              "Tu es électricien qualifié (France). Rédige un devis pour : [rénovation partielle / mise aux normes / extension] — logement [surface] m². Travaux : [ex. remplacement tableau X rangées, circuits éclairage et prises, prises dédiées, mise à la terre]. Fourniture matériel : [marque ou « selon catalogue »]. Main-d'œuvre détaillée par lot. Utilise les PU HT suivants ou laisse « à compléter » : [grille]. Mentionne attestation Consuel si applicable sans inventer de numéro. TVA, totaux, délai d'exécution, validité de l'offre.",
            usage: 'Complétez avec le nombre de points, tableau existant ou neuf, contraintes génie civil.',
          },
          {
            titre: 'Devis maçonnerie — ouvrages et volumes',
            prompt:
              "Tu es maçon en France. Rédige un devis pour [murs / dalle / extension] — [dimensions ou m² / m³]. Béton et armatures : [préciser si fournis]. Fourniture [sable, ciment, parpaings : oui/non]. Main-d'œuvre par étape : fondations, élévation, reprises. Intègre les PU HT : [grille ou à compléter]. Précise délais, conditions météo si travaux extérieurs, TVA 10 % ou 20 % selon contexte. Totaux et acompte.",
            usage: 'Pour les gros œuvres, joindre toujours une visite technique avant engagement ferme.',
          },
        ],
      },
      {
        type: 'list',
        title: 'Erreurs à éviter (les trois pièges que je vois encore trop souvent)',
        content: [
          'Prix fantaisistes — croire le premier total affiché sans passer sur votre grille : ChatGPT est fort en phrases, pas en comptabilité de chantier.',
          'Oublier frais annexes — déplacement, bennes, échafaudage, protections : si vous ne les indiquez pas dans le prompt, ils ne seront pas dans le devis.',
          'Zéro relecture — envoyer tel quel au client : vous engage votre nom ; une ligne de TVA ou un lot mal libellé suffit à créer un conflit.',
        ],
      },
      {
        type: 'html',
        title: 'Pour conclure',
        content: `<p class="text-slate-600 leading-relaxed">Automatiser un devis BTP avec ChatGPT, ce n'est pas tricher : c'est arrêter de partir de zéro à chaque fois. La méthode qui tient la route, je la répète en formation : données propres, prompt magique, relecture des prix, adaptation au type de chantier. Si vous maîtrisez ça, le gain de temps devient réel sans vous exposer sur le fond. La landing <a href="${LINKS.iaDevis}" class="text-[var(--accent)] font-medium underline">IA devis bâtiment</a> et la <a href="${LINKS.blogChatgptDevisBtpMethode2026}" class="text-[var(--accent)] font-medium underline">méthode ChatGPT devis BTP pas à pas</a> prolongent cet exemple. Je préfère toujours qu'on travaille sur vos propres exemples (anonymisés) : un devis type de votre métier, une rénovation récurrente, un petit entretien — comme ça, personne ne repart avec un modèle « scolaire » qui ne colle pas à votre entreprise. Et si vous voulez que ce soit votre équipe qui gagne ce réflexe — avec des cas concrets du bâtiment et des consignes pour ne pas coller d'informations sensibles dans l'outil — c'est tout le sens de ma formation IA pour le BTP chez OFC Création d'Entreprise, certifiée Qualiopi et éligible à une prise en charge par OPCO Constructys, selon éligibilité, dans les conditions habituelles des entreprises du secteur.</p>`,
      },
      {
        type: 'cta',
        content:
          `Vous voulez maîtriser ces techniques ? Découvrez ma formation IA pour les pros du BTP financement possible selon éligibilité — sessions de 4 h en pratique, prompts et relecture des devis inclus. +${formatProfessionalsTrainedCount()} professionnels formés, note ${SOCIAL_PROOF.AVERAGE_RATING}.`,
        formationHref: '/formations',
      },
    ],
    relatedSlugs: ['chatgpt-devis-btp-methode-2026', 'financer-formation-ia-btp-constructys', 'formation-ia-btp-guide-complet-2026'],
  },

  // Avril 2026 — Comparatif ChatGPT / Claude / Gemini pour le BTP
  {
    slug: 'comparatif-chatgpt-claude-gemini-btp',
    title: 'ChatGPT vs Claude vs Gemini : lequel choisir quand on est dans le BTP ?',
    seoTitle: 'ChatGPT, Claude, Gemini BTP : lequel ouvrir ?',
    description:
      'Quel outil pour devis, mails ou AO : repères terrain sans tout tester au hasard. Sessions Qualiopi ; réseaux FFB, CSFE. Diagnostic gratuit 30 min.',
    date: '2026-04-08',
    dateModified: '2026-04-12',
    keywords: [
      'comparatif ChatGPT Claude Gemini BTP',
      'ChatGPT vs Claude BTP',
      'Gemini ou ChatGPT bâtiment',
      'IA PME BTP',
      'Claude mémoire technique',
      'ChatGPT devis BTP',
    ],
    sections: [
      {
        type: 'definition',
        title: 'En bref',
        content:
          'Ce comparatif ChatGPT Claude Gemini BTP part de la pratique : ce que j’observe en formation avec des professionnels du BTP, des conducteurs de travaux et des dirigeants de TPE du bâtiment. Aucun outil ne « gagne » sur tout : chacun a des forces selon que vous rédigez un devis, un courrier tendu, un mémoire technique ou un post LinkedIn. L’objectif est de vous éviter de jongler au hasard entre trois abonnements sans critères.',
      },
      {
        type: 'html',
        title: 'Claude sur laureolivie.fr',
        content:
          `<p class="text-slate-600">Pour le guide pratique (interfaces, prompts) : <a href="${LINKS.claudeAiBtp}" class="text-[var(--accent)] font-medium underline">page pilier Claude AI BTP</a>. Les formations restent multi-outils : ChatGPT et Claude AI se complètent. Pour le programme Qualiopi Claude : <a href="${LINKS.formationMaitriserClaudeAiBtp}" class="text-[var(--accent)] font-medium underline">Maîtriser Claude AI pour le BTP</a>. Sur le devis en conditions réelles, voir aussi mon article sur le <a href="${LINKS.blogDevisBtpChatgpt20Minutes}" class="text-[var(--accent)] font-medium underline">devis ChatGPT BTP en 20 minutes</a>.</p>`,
      },
      {
        type: 'paragraph',
        title: 'Mes stagiaires me posent toujours la même question',
        content:
          'Dès qu’on ouvre le sujet des assistants d’écriture, quelqu’un lève la main : « Alors, c’est lequel le meilleur ? » Je réponds presque toujours la même chose : le meilleur, c’est celui que vous allez vraiment utiliser deux fois par jour, avec une méthode — pas celui qui a la meilleure réputation sur internet. J’utilise ChatGPT, Claude et Gemini au quotidien avec les groupes : pas en mode démo stérile, mais sur des extraits de devis, des brouillons de mails et des morceaux de DCE anonymisés. Ce qui change le résultat, ce n’est pas seulement le logo en haut de la page, c’est la consigne, la relecture humaine et le type de document. Ce que je vous propose ici, c’est un avis terrain, pas un tableau marketing : des tendances que je vois revenir, lesquelles tiennent aussi à l’évolution des modèles (donc à prendre avec le recul du mois en cours). Je n’ai aucun intérêt à vous vendre un « vainqueur » : mon boulot, c’est que vous gagniez du temps sans prendre de risques sur les données sensibles, et que vous sachiez quand passer d’un outil à l’autre.',
      },
      {
        type: 'html',
        title: 'Tableau comparatif synthétique (vue d’ensemble)',
        content:
          '<p class="text-slate-600">Lecture rapide : « Très bon » = je le sors souvent pour ce cas ; « Bon » = ça fait le job avec un bon prompt ; « Correct » = utilisable mais pas mon premier réflexe pour cette tâche.</p>' +
          '<div class="mt-4 overflow-x-auto">' +
          '<table>' +
          '<caption>Comparatif ChatGPT, Claude et Gemini pour le BTP (avis formatrice)</caption>' +
          '<thead><tr><th scope="col">Critère</th><th scope="col">ChatGPT</th><th scope="col">Claude</th><th scope="col">Gemini</th></tr></thead>' +
          '<tbody>' +
          '<tr><th scope="row">Devis / chiffrage</th><td>Très bon — réactif, bon pour structurer lots et TVA si vous fournissez votre grille.</td><td>Très bon — souvent très propre sur les longues listes de postes.</td><td>Bon — pratique si vous êtes déjà tout le jour dans Google Workspace.</td></tr>' +
          '<tr><th scope="row">Rédaction courriers / emails</th><td>Très bon — ton professionnel, variantes courtes.</td><td>Très bon — style posé, moins « punchy » parfois.</td><td>Bon à très bon — s’intègre bien à Gmail / Docs.</td></tr>' +
          '<tr><th scope="row">Appels d’offres (mémoire, CCTP)</th><td>Bon — fenêtre de contexte large en version payante.</td><td>Très bon — confort sur les pièces longues et les relectures.</td><td>Bon — utile pour croiser avec Drive sans copier-coller partout.</td></tr>' +
          '<tr><th scope="row">Simplicité du quotidien</th><td>Très bon — interface familière, grosse communauté, tutos partout.</td><td>Bon — un cran de moins « grand public », mais clair.</td><td>Très bon pour les équipes déjà chez Google.</td></tr>' +
          '</tbody></table></div>',
      },
      {
        type: 'paragraph',
        title: 'Pour les devis et chiffrages : lequel je tends à ouvrir en premier',
        content:
          'Pour un devis ou un chiffrage, j’alterne le plus souvent entre ChatGPT et Claude. ChatGPT, les équipes le connaissent déjà : peu de friction pour coller un brief chantier et demander un découpage en lots avec fournitures / main-d’œuvre. Sur les chantiers « classiques » (rénovation, second œuvre), le résultat est souvent prêt à être repris dans votre logiciel métier après une passe sur les prix. Quand la liste de postes devient longue ou qu’il faut garder la cohérence sur plusieurs pages, Claude me donne fréquemment une mise en forme très lisible — les titres de lots restent stables, moins de mélange entre les lignes. Gemini brille moins sur le « pur » devis quand l’équipe n’est pas déjà dans l’écosystème Google, mais si votre devis vit dans une Sheet partagée, le fait de rester dans le même univers peut faire gagner du temps administratif. À titre personnel, je ne laisse jamais un modèle « inventer » une grille tarifaire : soit vous collez vos PU, soit vous demandez explicitement des champs vides à compléter — sinon vous retrouvez des montants plausibles mais faux. Exemple de prompt que je fais tester en salle (à adapter avec vos chiffres réels) : « Professionnel du BTP [métier], région [X]. Chantier : [description courte]. Produis un devis en tableau avec colonnes désignation, quantité, unité, PU HT, total HT ; sépare fournitures et MO ; ajoute une ligne TVA 10 % ou 20 % selon le cas annoncé ; ne invente pas de prix si je ne les donne pas — laisse « à compléter ». » Ensuite, on vérifie chaque montant à la main : toujours.',
      },
      {
        type: 'paragraph',
        title: 'Pour les emails et courriers : ton, fermeté, relances',
        content:
          'Sur les mails clients, relances ou courriers un peu délicats (retard de paiement, réserve sur travaux, demande de complément d’information), je trouve ChatGPT très efficace pour produire trois tons : sec, neutre, plus chaleureux — vous choisissez ce qui colle à votre entreprise. Claude a souvent un style un peu plus « posé » ; certaines personnes préfèrent pour les textes où il ne faut pas paraître agressif. Gemini est particulièrement pratique si le brouillon part directement depuis Gmail : moins d’allers-retours entre onglets. Exemple testé avec des stagiaires : « Rédige un email professionnel en français : nous sommes une entreprise du BTP, nous relançons un devis envoyé le [date], travaux prévus [période], ton ferme mais courtois, 120 mots max, objet inclus. » Les trois outils sortent quelque chose d’utilisable ; la différence, c’est souvent le dernier pourcent de « naturel » — d’où l’intérêt de relire en voix haute.',
      },
      {
        type: 'paragraph',
        title: 'Pour les appels d’offres : mémoire technique, CCTP, synthèses',
        content:
          'Là où les dossiers deviennent lourds, la discussion change. Quand on doit résumer des centaines de pages de DCE ou garder le fil entre plusieurs pièces, Claude est souvent celui que je recommande pour une première lecture assistée : les réponses restent généralement bien structurées quand on lui demande un plan, des risques, des points à clarifier avec le maître d’ouvrage. ChatGPT en version payante tient aussi largement le coup grâce à une fenêtre de contexte élevée — je l’utilise beaucoup pour des plans de mémoire en sections (sécurité, méthodologie, moyens humains et matériels). Gemini prend tout son sens si les documents sont déjà dans Google Drive : on réduit les copier-coller hasardeux, ce qui aide à garder une trace propre côté entreprise — à condition que votre organisation accepte ce flux. Prompt type que je donne : « Voici un extrait anonymisé de CCTP. Liste les exigences techniques contraignantes, les interfaces avec d’autres lots, et les points flous à poser en clarification — tableau avec colonne « citation / référence » si le texte le permet. » Puis on croise avec la relecture humaine : l’IA ne remplace pas la visite de chantier ni le visa du responsable.',
      },
      {
        type: 'paragraph',
        title: 'Pour les réseaux sociaux : LinkedIn, Facebook, photos de chantier',
        content:
          'Pour des posts réseaux — chantier terminé, recrutement, sécurité au travail — ChatGPT est souvent le plus rapide pour une accroche courte et des variantes (trois longueurs, trois angles). Claude peut aider si vous voulez un texte un peu plus « narration » sur un projet complexe. Gemini peut proposer des formulations adaptées à une communauté locale ou lier à un événement saisonnier si vous lui donnez le contexte. Exemple : « Photo : rénovation de toiture. Entreprise [spécialité]. Ton authentique, pas marketing. 2 hashtags max. 90 mots. » Je le répète en formation : on ne publie pas une photo de chantier sans accord ; et on ne copie-colle pas d’infos confidentielles dans un outil public.',
      },
      {
        type: 'paragraph',
        title: 'Mon verdict de formatrice BTP',
        content:
          'Si vous devez n’en choisir qu’un pour démarrer : commencez par ChatGPT — la courbe d’apprentissage est souvent la plus douce pour une équipe mixte (bureau et terrain). Ensuite, ajoutez Claude lorsque vous traitez régulièrement des documents longs ou des mémoires où la structure compte autant que le fond. Gardez Gemini dans la boucle si votre entreprise vit déjà dans Gmail, Drive et Calendar : l’intégration fait partie du gain de temps, pas seulement le modèle. Je ne crois pas au « gagnant unique » : je crois au trio testé sur vos vrais cas, avec des règles internes sur les données personnelles et les dossiers sensibles. Honnêtement, les écarts entre modèles se réduisent vite ; ce qui reste stable, c’est votre méthode et votre relecture. Côté abonnements, il n’y a pas de règle unique : certains restent sur des offres gratuites pour démarrer, d’autres passent sur des abonnements payants quand le volume de documents augmente — l’important est de savoir ce que vous payez (confidentialité, historique, accès équipe) et de l’aligner avec votre politique interne.',
      },
      {
        type: 'paragraph',
        title: 'En conclusion',
        content:
          'Ce comparatif ChatGPT Claude Gemini BTP ne remplace pas un essai sur votre bureau : les outils évoluent, et ce qui compte est ce que vous validez devant un client ou dans un marché public. En formation Qualiopi, j’enseigne Claude AI (outil principal) et ChatGPT (usages administratifs) sur vos documents réels — devis, modèles de mails, extraits de pièces — pour que chacun reparte avec une feuille de route claire, sans promesse miracle. Si vous voulez qu’on verrouille ça ensemble avec votre métier (bâtiment, travaux publics, sous-traitance), c’est précisément le programme que je porte chez OFC Création d’Entreprise, avec certification Qualiopi et financement possible via l’OPCO Constructys selon les règles en vigueur.',
      },
      {
        type: 'cta',
        content:
          'En formation Qualiopi, Claude AI est l’outil principal enseigné ; ChatGPT sert aux usages administratifs et à la comparaison — sur vos devis, courriers et appels d\'offres. Financement possible selon éligibilité.',
        formationHref: '/formations',
      },
    ],
    relatedSlugs: [
      'devis-btp-chatgpt-20-minutes',
      'chatgpt-devis-btp-methode-2026',
      'formation-ia-btp-guide-complet-2026',
    ],
  },

  // Avril 2026 — IA mémoire technique & appels d'offres BTP (Module 5)
  {
    slug: 'ia-memoire-technique-appel-offres-guide-2026',
    title: 'Comment rédiger un mémoire technique BTP avec l\'IA — Guide complet 2026',
    seoTitle: 'Mémoire technique AO : méthode IA et plan BTP',
    description:
      'DCE, plan calé sur le RC, sections rédigées avec prompts métier ; la validation reste humaine. Formation AO Qualiopi ; Constructys. Voir la méthode.',
    date: '2026-04-09',
    keywords: [
      'IA mémoire technique appel d\'offres',
      'mémoire technique BTP IA',
      'rédiger mémoire technique ChatGPT',
      'appel d\'offres BTP intelligence artificielle',
      'DCE CCTP mémoire technique',
      'critères d\'attribution BTP',
    ],
    sections: [
      {
        type: 'html',
        title: 'En bref',
        content:
          '<div class="rounded-2xl border-2 border-[var(--accent)] bg-[var(--accent-soft)] p-6"><p class="text-slate-700 leading-relaxed">Ce guide sur l&apos;IA mémoire technique appel d&apos;offres s&apos;adresse aux dirigeants et chargés d&apos;affaires des PME du bâtiment et des travaux publics qui répondent à des marchés publics ou privés : comment utiliser ChatGPT ou un assistant IA pour accélérer l&apos;analyse du DCE et la rédaction du mémoire, sans jamais déléguer la responsabilité du fond. Je m&apos;appuie sur le Module 5 de ma formation « Répondre aux appels d&apos;offres avec l&apos;IA » : analyse DCE, plan aligné sur la note technique, sections clés, relecture. Les pièces officielles (RC, CCTP, DPGF) restent votre référence ; l&apos;IA structure et reformule à partir de ce que vous lui fournissez. Pour les parcours multi-outils, voir aussi comment <a href="/formations/maitriser-claude-ai-btp" class="text-[var(--accent)] font-medium underline">se former à Claude AI dans les travaux publics</a> en complément de ChatGPT — la landing résume programme et financement.</p></div>',
      },
      {
        type: 'paragraph',
        title: 'Pourquoi le mémoire technique mérite autant d\'attention',
        content:
          'Sur la plupart des marchés de travaux, la note technique représente souvent 40 à 60 % de la notation globale — parfois plus selon les pondérations du règlement de consultation. Pourtant, dans les PME que je forme, je vois encore trop souvent le mémoire rédigé à la dernière minute, avec des passages génériques qui ne répondent pas précisément aux critères d\'attribution. Ce n\'est pas un manque de compétence métier : c\'est un manque de temps et de méthode. Entre le chiffrage, le planning chantier et le courrier du jour, le dossier d\'offre passe au second plan — alors que c\'est pourtant lui qui doit démontrer que vous avez compris le CCTP et que vous savez organiser les moyens. L\'intelligence artificielle ne remplace pas votre expertise : elle vous aide à structurer plus vite, à ne rien oublier dans le RC, et à aligner chaque paragraphe sur les sous-critères de la note technique. Le bon réflexe, c\'est de traiter le mémoire comme un chantier : avec un planning, des jalons et une relecture finale par quelqu\'un qui connaît le marché.',
      },
      {
        type: 'paragraph',
        title: 'Ce que l\'IA peut faire (et ne peut pas faire) dans un mémoire technique',
        content:
          'Ce qu\'elle peut faire : synthétiser des extraits du DCE pour en sortir une grille de critères et de délais ; proposer un plan de mémoire cohérent avec les rubriques demandées dans le RC ; rédiger des brouillons de sections à partir de vos données (effectifs, matériel, références de chantiers) ; reformuler pour gagner en clarté ; générer des listes de points de vigilance (interfaces entre lots, contraintes de phasage). Ce qu\'elle ne peut pas faire à votre place : signer une méthode qu\'elle n\'a pas vue sur le terrain ; garantir une faisabilité prix sans votre DPGF ; inventer des références ou des effectifs crédibles ; interpréter seule une clause ambiguë du CCAP — il faut alors une relecture humaine, voire une question au maître d\'ouvrage. Autre point sensible : ne collez pas des données personnelles, des prix confidentiels ou des pièces entières dans un outil public sans cadre d\'entreprise. En formation, je fais travailler les équipes sur des extraits anonymisés et sur des consignes de confidentialité claires.',
      },
      {
        type: 'paragraph',
        title: 'Étape 1 — Analyser le DCE avec l\'IA',
        content:
          'Avant d\'écrire une ligne du mémoire, il faut savoir ce que le pouvoir adjudicateur attend vraiment. Je commence toujours par le règlement de la consultation (RC) : critères d\'attribution, pondération, sous-critères, pièces à produire, format de remise. Ensuite le CCTP pour votre lot : exigences techniques, délais, interfaces, normes. L\'IA sert à transformer ces dizaines de pages en fiche de travail : exigences classées par thème, points qui alimentent directement les sections du mémoire, et liste des « mots attendus » issus du lexique du marché. Si vous lui donnez des extraits ciblés plutôt que le PDF entier, vous gardez le contrôle et vous réduisez le bruit.',
      },
      {
        type: 'prompts',
        title: 'Prompt — Synthèse DCE pour préparer le mémoire (RC + extraits CCTP)',
        content: [
          {
            titre: 'Extraction critères, exigences et délais',
            prompt:
              "Tu es un assistant pour une entreprise du BTP en France. À partir des extraits suivants du règlement de consultation et du CCTP (collés ci-dessous), produis :\n1) Un tableau des critères d'attribution et sous-critères avec leur pondération si elle figure au texte.\n2) La liste des exigences techniques obligatoires pour le lot [PRÉCISER LE LOT] avec référence d'article ou de paragraphe si présente dans les extraits.\n3) Les délais d'exécution ou phasage imposés.\n4) Les pièces à fournir explicitement mentionnées pour la note technique.\n5) Les points flous ou contradictoires à clarifier avec le MOA/MOE.\nNe invente pas d'information absente des extraits. Texte des extraits :\n\n[COLLER EXTRAITS ANONYMISÉS]",
            usage:
              'Collez uniquement les parties utiles du DCE. Vérifiez chaque pondération sur le document officiel.',
          },
        ],
      },
      {
        type: 'paragraph',
        title: 'Étape 2 — Structurer le plan du mémoire',
        content:
          'Le plan doit refléter la grille de notation : si le RC impose une trame ou des intitulés, respectez-les à la lettre. Sinon, alignez vos titres sur les sous-critères (souvent : compréhension du besoin, méthodologie, moyens humains et matériels, planning, QSE, références). L\'IA peut proposer une arborescence avec sous-parties et indication de ce que chaque section doit démontrer par rapport au CCTP. Je demande systématiquement une colonne « lien avec critère / sous-critère » pour éviter les développements hors sujet. N\'oubliez pas les annexes listées au RC (certificats, organisationnel QSE, fiches matériel) : le plan du mémoire n\'est pas seulement du texte, c\'est aussi la liste des preuves que vous allez joindre.',
      },
      {
        type: 'prompts',
        title: 'Prompt — Plan de mémoire aligné sur les critères d\'attribution',
        content: [
          {
            titre: 'Trame détaillée + lien avec la note technique',
            prompt:
              "Voici les critères et sous-critères d'attribution (copiés du RC) :\n[COLLER]\n\nVoici le périmètre du lot et les contraintes principales du CCTP :\n[COLLER]\n\nPropose un plan de mémoire technique en niveaux (I, II, III) avec pour chaque section : objectif, contenu attendu, et renvoi au(x) sous-critère(s) concerné(s). Ajoute une ligne « pièces / illustrations recommandées » par section. Langage : français professionnel BTP. Ne pas dépasser la structure demandée par le RC si une trame imposée existe.",
            usage: 'Adaptez le niveau de détail à la note maximale du mémoire.',
          },
        ],
      },
      {
        type: 'paragraph',
        title: 'Étape 3 — Rédiger les sections clés du mémoire',
        content:
          'Une fois le plan validé, je fais rédiger les blocs un par un — jamais le mémoire entier en un seul jet sans relecture intermédiaire. La présentation de l\'entreprise doit coller aux attentes du marché (effectifs, savoir-faire, références pertinentes par nature et ampleur). La méthodologie d\'exécution doit montrer que vous avez compris les interfaces et le phasage. Le planning prévisionnel doit être cohérent avec les délais du CCTP et votre organisation interne. Les moyens humains et matériels doivent être vérifiables : pas d\'effectifs « au doigt mouillé ». La démarche QSE doit reprendre vos process réels (planification des contrôles, gestion des déchets, coordination sécurité). Pour chaque rubrique, je fournis à l\'IA des données brutes (chiffres, listes, noms de matériel) et je lui demande une mise en forme argumentative, pas l\'inverse.',
      },
      {
        type: 'prompts',
        title: 'Prompts par section (à alimenter avec vos données réelles)',
        content: [
          {
            titre: 'Présentation de l\'entreprise',
            prompt:
              "Rédige la section « Présentation de l'entreprise » d'un mémoire technique pour un marché de travaux en France. Données à intégrer (véritables uniquement) : raison sociale, forme juridique, année de création, effectif moyen annuel, compétences clés, zone géographique d'intervention, références de chantiers [LISTE AVEC ANNÉES ET MONTANTS / NATURE]. Ton : professionnel, factuel, sans marketing creux. 400 à 600 mots. Terminer par une phrase liant l'expérience au besoin du marché décrit ici : [RÉSUMÉ BESOIN CCTP EN 3 PHRASES].",
            usage: 'Vérifiez chaque référence et chiffre avant envoi.',
          },
          {
            titre: 'Méthodologie d\'exécution',
            prompt:
              "Rédige la section « Méthodologie d'exécution des travaux » pour le lot [LOT]. Contraintes CCTP à respecter : [COLLER POINTS CLÉS]. Décris : phasage, interfaces avec autres lots, gestion des accès, gestion des nuisances, contrôles qualité sur ouvrages clés. Indique les risques identifiés et les mesures associées. Ne pas inventer de procédures internes : si une info manque, insère [à compléter par l'entreprise]. 500 à 800 mots, style technique BTP.",
            usage: 'Alignez sur le phasage réellement envisageable.',
          },
          {
            titre: 'Planning prévisionnel',
            prompt:
              "À partir des durées et jalons suivants (à valider par l'entreprise) : [LISTE TÂCHES + DURÉES], produis un planning sous forme de tableau : tâche, durée, dépendances, jalon, semaine cible. Ajoute un paragraphe sur les marges et le chemin critique. Mentionne les contraintes de calendrier imposées par le CCTP : [COLLER]. Si les dates sont indicatives, précise-le clairement.",
            usage: 'Exportez ensuite vers votre outil planning habituel.',
          },
          {
            titre: 'Moyens humains et matériels',
            prompt:
              "Rédige la section « Moyens humains et matériels ». Effectifs : [NOMBRE + PROFILS]. Matériel principal : [LISTE]. Moyens de levage / équipements spécifiques : [LISTE]. Précise ce qui est déjà en possession de l'entreprise vs location prévue. Ne pas gonfler les quantités : si une ressource n'est pas assurée, écris « à confirmer ». Conclure sur la capacité à tenir le délai global du marché.",
            usage: 'Cohérence obligatoire avec le planning et le prix.',
          },
          {
            titre: 'Démarche QSE (Qualité, Sécurité, Environnement)',
            prompt:
              "Rédige la section QSE : politique qualité et sécurité applicable au chantier, coordination SPS (selon rôle attendu), gestion des déchets, mesures environnementales (nuisances, protection des sols, etc.). Références aux certifications ou documents d'entreprise : [PRÉCISER ISO, PPSPS, modes opératoires — sans inventer de numéros]. Intègre les exigences du CCTP suivantes : [COLLER EXIGENCES QSE]. Ton factuel, conforme aux usages BTP.",
            usage: 'Recoupez avec votre coordinateur QSE ou votre modèle interne.',
          },
        ],
      },
      {
        type: 'paragraph',
        title: 'Étape 4 — Personnaliser et vérifier',
        content:
          'Un mémoire « IA » se reconnaît quand les phrases sont fluides mais un peu trop générales, ou quand deux sections se contredisent sur les effectifs. La relecture humaine est obligatoire : faites-la faire par quelqu\'un qui n\'a pas écrit le brouillon — idéalement le conducteur de travaux ou le dirigeant. Vérifiez la cohérence avec votre offre de prix : méthode, durées, moyens. Contrôlez que chaque critère de la note technique est couvert au moins une fois, de façon explicite. Préparez les pièces justificatives citées : une référence de chantier doit être traçable ; un plan d\'installation doit exister. Enfin, adaptez le style au pouvoir adjudicateur : un marché hospitalier n\'a pas les mêmes attentes qu\'un lot de voirie. Le Module 5 de la formation insiste sur cette étape : l\'IA accélère le brouillon, l\'entreprise valide le pli.',
      },
      {
        type: 'paragraph',
        title: 'Note technique, DPGF et critères : faire tenir l\'ensemble',
        content:
          'Dans beaucoup de marchés, la note technique n\'est qu\'une partie du dossier : le prix et le détail quantitatif (DPGF ou bordereau de prix) portent le reste de la notation ou des sous-critères liés au « rapport qualité / prix ». Ce que je vérifie systématiquement avec les PME en formation, c\'est l\'alignement : les durées annoncées dans le mémoire doivent être compatibles avec votre planning chiffré ; les moyens matériels listés doivent être cohérents avec les postes de location ou d\'amortissement ; les quantités ou périmètres évoqués dans la méthode ne doivent pas contredire votre quantitatif. Un écart visible entre le discours technique et les chiffres du DPGF est l\'un des signaux les plus négatifs pour un jury. L\'IA peut vous aider à produire un tableau de cohérence « critère → extrait mémoire → renvoi DPGF » si vous lui fournissez les bons éléments — sans jamais les substituer à votre contrôle interne. Pensez aussi aux critères d\'exclusion : un mémoire brillant ne compense pas une pièce administrative manquante ou une erreur de forme de dépôt.',
      },
      {
        type: 'html',
        title: 'Kit IA appels d\'offres BTP (PDF gratuit)',
        content:
          '<p class="text-slate-600">Pour aller plus loin avec des fiches méthode et des rappels sur l\'analyse du DCE et la rédaction du mémoire, <strong>téléchargez notre kit IA appels d\'offres BTP (PDF gratuit)</strong> : support complémentaire à la formation.</p>' +
          '<ul class="mt-4 list-disc pl-6 text-slate-600">' +
          '<li><a href="/formations/ia-appels-offre-btp/Kit_IA_AO_BTP_7_prompts.html">Kit IA appels d\'offres BTP — 7 prompts (HTML, imprimer en PDF)</a></li>' +
          '<li><a href="/formations/ia-appels-offre-btp/Support_complementaire_AO_BTP.pdf">Support complémentaire AO BTP (PDF)</a></li>' +
          '<li><a href="/formations/ia-appels-offre-btp/Programme_IA_AO_DCE_MT_ClaudePro_OFC.pdf">Programme détaillé NIV-02 — Claude Pro, Cowork &amp; Skills (PDF)</a></li>' +
          '<li><a href="/formations/ia-appels-offre-btp">Page formation « L\'IA appliquée aux appels d\'offres BTP »</a> — parcours NIV-02 (3 modules sur 4 h), financement possible selon éligibilité</li>' +
          '</ul>',
      },
      {
        type: 'prompts',
        title: '5 prompts prêts à l\'emploi pour votre mémoire technique (versions complètes)',
        content: [
          {
            titre: '1 — Cartographie « critère → contenu du mémoire »',
            prompt:
              "À partir du RC et de la grille de notation ci-dessous (copier-coller), crée une table : pour chaque sous-critère, indique quelles sections du mémoire doivent y répondre, quelles pièces justificatives suggérer, et un exemple de phrase de conclusion par section. Signale les trous si un sous-critère n'est couvert par aucune section prévue.\n\n[COLLER RC / GRILLE]",
            usage: 'Gardez cette table comme checklist avant envoi.',
          },
          {
            titre: '2 — Synthèse risques & interfaces (CCTP)',
            prompt:
              "À partir des extraits CCTP suivants concernant le lot [LOT], liste les risques techniques, interfaces avec autres corps d'état, et contraintes de réception. Pour chaque point, propose une réponse courte « comment nous traitons ce point dans l'exécution » en 2 phrases maximum. Ne pas inventer de solutions : si l'info manque, écris « à traiter après visite ».\n\n[COLLER EXTRAITS]",
            usage: 'Alimente la méthodologie et la QSE.',
          },
          {
            titre: '3 — Paragraphe « valeur technique » lié au prix',
            prompt:
              "Rédige un paragraphe (150 à 200 mots) expliquant la cohérence entre l'offre de prix et la méthode proposée : organisation, optimisation des durées, choix de matériaux ou techniques sans divulguer de secrets industriels. Données : [RÉSUMÉ OFFRE TECHNIQUE] + [POINTS CLÉS CHIFFRAGE SANS MONTANTS CONFIDENTIELS SI BESOIN]. Évite le jargon vide ; reste factuel.",
            usage: 'Souvent utile quand le RC demande une articulation prix / technique.',
          },
          {
            titre: '4 — Checklist relecture avant dépôt',
            prompt:
              "Génère une checklist de relecture pour un dossier d'offre BTP : cohérence mémoire / DPGF, présence des attestations, orthographe des références, respect du format de remise, signatures, mentions RGPD si données personnelles, version PDF conforme. Adapte à la liste de pièces suivante : [COLLER LISTE DU RC].",
            usage: 'À imprimer ou cocher en équipe.',
          },
          {
            titre: '5 — Lettre de pli / note de synthèse pour le jury',
            prompt:
              "Rédige une note de synthèse d'une page maximum pour accompagner le mémoire : rappel du besoin compris, trois arguments différenciants de l'entreprise, engagement sur délais et QSE, sans répéter tout le mémoire. Contexte marché : [2 PHRASES]. Points forts à mettre en avant : [LISTE VALIDÉE PAR L'ENTREPRISE].",
            usage: 'Utile quand une courte note est autorisée ou recommandée.',
          },
        ],
      },
      {
        type: 'list',
        title: 'Erreurs fatales à éviter',
        content: [
          'Copier-coller un mémoire d\'un autre marché sans l\'aligner sur le CCTP et les critères du RC — le jury le détecte vite, et vous perdez la note sur la compréhension du besoin.',
          'Laisser l\'IA inventer des effectifs, références ou certifications : une incohérence avec le DC4 ou les attestations élimine la confiance et peut engager votre responsabilité.',
          'Oublier de répondre explicitement à un sous-critère de la note technique — même un bon discours général ne remplace pas la trace d\'un critère non traité.',
        ],
      },
      {
        type: 'paragraph',
        title: 'Dernier mot',
        content:
          'Rédiger un mémoire technique BTP avec l\'IA, ce n\'est pas court-circuiter le métier : c\'est libérer du temps sur la mise en forme et la structuration pour concentrer votre intelligence sur le fond — risques, moyens, cohérence avec le prix. En formation, j\'anime le Module 5 précisément sur cette chaîne : DCE, plan, rédaction, relecture, avec des prompts testés en salle et des consignes de confidentialité. Si vous voulez monter en puissance sur les appels d\'offres avec votre équipe, l\'offre « Répondre aux appels d\'offres avec l\'IA » est certifiée Qualiopi et peut être financée par l\'OPCO Constructys dans le cadre habituel du plan de développement des compétences — je vous accompagne pour cadrer le besoin et le nombre de participants.',
      },
      {
        type: 'cta',
        content:
          'Formez votre équipe à l\'IA pour les appels d\'offres et les mémoires techniques — en présentiel, sur vos DCE anonymisés. Formation certifiée Qualiopi, financement possible selon éligibilité.',
        formationHref: '/formations/ia-appels-offre-btp',
      },
    ],
    relatedSlugs: [
      'comparatif-chatgpt-claude-gemini-btp',
      'chatgpt-devis-btp-methode-2026',
      'financer-formation-ia-btp-constructys',
    ],
  },

  // Avril 2026 — Mémoire technique BTP & IA (angle gain de temps / conversion)
  {
    slug: 'memoire-technique-btp-ia-gagner-temps-appels-offres',
    title:
      'Mémoire technique BTP avec l’IA : gagnez vos appels d’offres en 2x moins de temps',
    seoTitle:
      'Mémoire technique BTP : IA et dossiers AO',
    description:
      'Aligner mémoire et critères du RC : DCE, plan, brouillon IA, passes terrain, relecture équipe. Qualiopi, Constructys. Diagnostic gratuit 30 min.',
    date: '2026-04-10',
    keywords: [
      'mémoire technique BTP IA',
      'mémoire technique appel d’offres',
      'ChatGPT mémoire technique BTP',
      'réponse marché public BTP',
      'DCE CCTP mémoire technique',
      'gain de temps appels d’offres BTP',
      'formation IA appels d’offres Île-de-France',
      'intelligence artificielle BTP marchés publics',
    ],
    sections: [
      {
        type: 'definition',
        title: 'En bref',
        content:
          'Cet article s’adresse aux dirigeants, conducteurs de travaux et chargés d’affaires qui répondent à des marchés dans le bâtiment et les travaux publics : comment utiliser l’IA (ChatGPT, Claude ou équivalent) pour accélérer la préparation du mémoire technique sans sacrifier la personnalisation. Vous y trouverez une méthode en cinq étapes, un exemple de prompt, une checklist avant envoi — et des liens vers la formation « Répondre aux appels d’offres avec l’IA » (certifiée Qualiopi, financement possible selon éligibilité (OPCO Constructys) selon éligibilité). L’IA est un assistant de structuration et de rédaction : la validation métier et la cohérence avec votre prix restent votre responsabilité.',
      },
      {
        type: 'paragraph',
        title: 'Le problème : des heures sur le mémoire… pour un pli parfois éliminé',
        content:
          'Il y a encore des équipes qui passent trois à huit heures (parfois plus) sur un mémoire technique, alors que le chiffrage ou le planning chantier mobilise déjà toute l’énergie. Dans le BTP, ce document est chronophage, répétitif d’un marché à l’autre — et pourtant stratégique : c’est lui qui doit prouver que vous avez compris le besoin et que vous savez organiser les moyens. Aujourd’hui, des entreprises utilisent l’IA pour rédiger plus vite, structurer mieux et aligner chaque paragraphe sur les critères du règlement. Mais mal utilisée, l’IA produit du générique : les acheteurs publics repèrent vite les phrases toutes faites, les réponses floues et l’absence de détails terrain — et vous perdez des points sur la note technique. L’enjeu : gagner du temps sur la forme pour garder du temps sur le fond et la relecture.',
      },
      {
        type: 'paragraph',
        title: 'Pourquoi le mémoire technique est décisif dans un appel d’offres BTP',
        content:
          'Le mémoire technique n’est pas une pièce administrative de plus : c’est l’endroit où vous valorisez votre savoir-faire, rassurez le maître d’ouvrage et vous différenciez des concurrents. Sur beaucoup de marchés de travaux, la note technique représente souvent 40 à 60 % de la notation globale — parfois davantage selon les pondérations du règlement de consultation. Pourtant, dans les PME que j’accompagne, je vois encore des dossiers recopiés d’anciens marchés, des réponses à côté du CCTP ou des développements trop vagues sur les moyens humains. Résultat : des marchés perdus non pas par manque de compétence métier, mais par manque de clarté et d’alignement avec les critères. Le bon réflexe : traiter le mémoire comme une production industrielle — avec une méthode, des jalons et une relecture croisée.',
      },
      {
        type: 'paragraph',
        title: 'Utiliser l’IA pour le mémoire : gain de temps et efficacité',
        content:
          'Avec un outil comme ChatGPT ou Claude, vous pouvez analyser un DCE, structurer le plan du mémoire, générer des brouillons de sections à partir de vos données (effectifs, matériel, références) et améliorer la clarté de la formulation. Sur le terrain, lorsque la méthode est en place, je vois souvent des temps de rédaction qui passent de plusieurs heures à une session de travail nettement plus courte — le temps exact dépend de la complexité du lot et de la qualité des infos que vous injectez dans l’outil. Ce n’est pas magique : l’IA est un assistant, pas un remplaçant. Elle ne remplace ni la visite de chantier ni le visa du responsable sur la cohérence avec le DPGF et votre organisation réelle.',
      },
      {
        type: 'paragraph',
        title: 'Pourquoi beaucoup de mémoires « IA » ratent la note',
        content:
          'L’erreur la plus fréquente : copier-coller une réponse générée sans adaptation au CCTP. Le contenu devient générique, imprécis ou hors sujet par rapport aux exigences du lot. Les acheteurs publics et les bureaux de contrôle sont habitués à lire des dossiers : ils détectent vite les formulations standardisées, les réponses qui pourraient s’appliquer à n’importe quel marché et l’absence de personnalisation (contraintes d’accès, interfaces entre lots, phasage réel). Là, la perte de points est directe. La règle que je donne en formation : tout ce qui sort du modèle doit être vérifié, complété par les détails réels du terrain et recoupé avec votre offre de prix.',
      },
      {
        type: 'list',
        title: 'Méthode en 5 étapes pour rédiger un mémoire technique avec l’IA',
        content: [
          'Analyser le DCE — Lire le règlement de consultation (critères, pondération), le CCTP du lot et les pièces annexes : identifier ce qui alimente vraiment la note technique.',
          'Structurer le mémoire — Faire produire un plan à l’IA aligné sur les sous-critères ou la trame imposée ; chaque section doit « répondre » à une exigence du RC.',
          'Générer un premier contenu — Utiliser des prompts précis avec votre activité, vos moyens humains et matériels, vos références réelles (sans inventer de données).',
          'Personnaliser — Ajouter les détails chantier, contraintes d’exécution, organisation terrain, interfaces : c’est là que se joue la différence.',
          'Optimiser et relire — Vérifier clarté, cohérence avec le chiffrage et le planning, puis faire relire par quelqu’un qui n’a pas écrit le brouillon.',
        ],
      },
      {
        type: 'prompts',
        title: 'Exemple de prompt prêt à l’emploi (à adapter)',
        content: [
          {
            titre: 'Brouillon de mémoire technique contextualisé',
            prompt:
              'Tu es un conducteur de travaux expérimenté en France. Rédige un premier jet de mémoire technique pour un chantier de [type de projet : neuf, rénovation, VRD, second œuvre, etc.].\n\nPrends en compte :\n- moyens humains (effectifs, compétences)\n- organisation chantier (phasage, interfaces)\n- gestion des délais\n- sécurité et environnement\n- contraintes spécifiques du client suivantes : [À REMPLIR]\n\nStyle : professionnel, factuel, sans marketing creux. Indique les zones où des données précises doivent être complétées par l’entreprise.\n\nNe pas inventer de références ni de chiffres.',
            usage:
              'Remplacez les crochets par vos informations réelles. Relisez et supprimez toute phrase qui ne correspond pas à votre entreprise.',
          },
        ],
      },
      {
        type: 'paragraph',
        title: 'Cas concret (terrain)',
        content:
          'Une PME du bâtiment accompagnée sur la méthode IA : avant, environ cinq heures par mémoire, avec des réponses peu homogènes entre les chargés d’affaires. Après mise en place d’une trame (analyse DCE, plan aligné sur les critères, prompts standardisés) et d’une relecture obligatoire, le temps de rédaction d’un premier dossier complet est descendu à environ une heure pour le brouillon structuré — puis une passe humaine pour le verrouillage. Les dossiers partent plus souvent, avec une meilleure clarté, et l’équipe répond à plus de consultations dans le même temps calendaire. Les résultats commerciaux varient selon les marchés ; la constante est la qualité de préparation et la traçabilité des engagements.',
      },
      {
        type: 'list',
        title: 'Checklist mémoire technique BTP avant envoi',
        content: [
          'CCTP et RC analysés : chaque critère de la note technique est couvert explicitement.',
          'Réponse adaptée au projet : pas de copier-coller d’un autre marché sans mise à jour.',
          'Moyens humains détaillés et cohérents avec le planning et le prix.',
          'Organisation claire : phasage, interfaces, QSE alignés sur vos process réels.',
          'Planning cohérent avec les délais du CCTP et votre DPGF.',
          'Éléments différenciants présents : références pertinentes, méthodes, moyens spécifiques.',
        ],
      },
      {
        type: 'paragraph',
        title: 'Pour qui est faite cette méthode ?',
        content:
          'Professionnels du BTP, PME du BTP, conducteurs de travaux, responsables appels d’offres ou direction technique : si vous répondez régulièrement à des marchés publics ou privés, structurer la rédaction avec l’IA est un levier fort — à condition d’imposer une discipline interne (données, confidentialité, relecture). En Île-de-France, les sessions inter se déroulent en présentiel ; l’intra est possible dans vos locaux. Pour le détail des lieux et modalités, voir la page « Formation IA pour le BTP en Île-de-France ».',
      },
      {
        type: 'html',
        title: 'Aller plus loin',
        content:
          '<p class="text-slate-600">Pour approfondir avec un guide pas à pas (prompts DCE, plan aligné sur la grille de notation, pièces jointes) :</p>' +
          '<ul class="mt-4 list-disc pl-6 text-slate-600">' +
          '<li><a href="/blog/ia-memoire-technique-appel-offres-guide-2026">IA mémoire technique appel d’offres — guide complet 2026</a></li>' +
          '<li><a href="/formations/ia-appels-offre-btp">Formation « Répondre aux appels d’offres avec l’IA »</a> (Qualiopi, OPCO Constructys)</li>' +
          '<li><a href="/formation-ia-btp-ile-de-france">Formation IA pour les pros du BTP en Île-de-France</a> — sessions inter et intra</li>' +
          '</ul>',
      },
      {
        type: 'faq',
        title: 'FAQ — Mémoire technique BTP et IA',
        content: [
          'Peut-on utiliser l’IA pour un appel d’offres ? — Oui, dans un cadre de vérification humaine : le contenu doit être personnalisé, exact et cohérent avec les pièces contractuelles. Ne transmettez pas de données sensibles dans des outils non validés par votre entreprise.',
          'Quel outil utiliser ? — ChatGPT et Claude sont parmi les plus accessibles pour structurer et rédiger ; le bon outil est celui que votre équipe maîtrise et que votre politique données autorise.',
          'L’IA remplace-t-elle un conducteur de travaux ? — Non. Elle fait gagner du temps sur la structuration et le premier jet ; l’expertise terrain, le jugement sur les risques et la signature du dossier restent humains.',
          'Combien de temps peut-on gagner ? — Cela dépend de la complexité du marché et de votre méthode ; en organisation, on peut souvent réduire fortement le temps de premier jet, le gain réel se mesurant sur la qualité de la relecture et le nombre de dossiers traités.',
        ],
      },
      {
        type: 'cta',
        content:
          'Vous voulez gagner du temps sur vos mémoires techniques et répondre à plus d’appels d’offres avec une méthode opérationnelle ? Réservez un échange ou demandez une formation adaptée à votre entreprise — présentiel, cas réels, prompts prêts à l’emploi. Certifié Qualiopi, financement possible selon éligibilité.',
        formationHref: '/formations/ia-appels-offre-btp',
      },
    ],
    relatedSlugs: [
      'ia-memoire-technique-appel-offres-guide-2026',
      'formation-ia-btp-guide-complet-2026',
      'comparatif-chatgpt-claude-gemini-btp',
    ],
  },

  // Article GEO #1 : Guide complet formation IA pour les pros du BTP 2026
  {
    slug: 'formation-ia-btp-guide-complet-2026',
    seoTitle: 'Formation IA bâtiment : guide pratique Qualiopi',
    title: 'Formation IA appliquée au bâtiment : guide complet 2026',
    description:
      `${formatProfessionalsTrainedCount()} pros formés, note ${SOCIAL_PROOF.AVERAGE_RATING}. Formation IA pour le BTP Qualiopi ; financement Constructys si éligible. Gagnez 3 à 5 h par semaine sur l’administratif.`,
    date: '2026-03-17',
    keywords: [
      'formation IA pour les pros du BTP',
      'formation intelligence artificielle BTP',
      'formation ChatGPT BTP',
      'formation IA TPE PME BTP',
      'Laure Olivié',
      'Qualiopi',
      'Constructys',
      'formation IA bâtiment 2026',
    ],
    sections: [
      {
        type: 'definition',
        title: 'En bref',
        content:
          `La formation IA appliquée au bâtiment proposée par Laure Olivié (OFC Création d'Entreprise) permet aux dirigeants de TPE et PME du bâtiment et des travaux publics, ainsi qu'aux conducteurs de travaux et équipes support, d'intégrer ChatGPT et l'IA dans leurs tâches quotidiennes. ${formatProfessionalsTrainedCount()} professionnels formés, note ${SOCIAL_PROOF.AVERAGE_RATING}. Certifiée Qualiopi, financement possible selon éligibilité (Constructys, OPCO). Basée à Guyancourt (78), sessions présentiel uniquement · Île-de-France uniquement.`,
      },
      {
        type: 'paragraph',
        title: 'Qui est Laure Olivié ?',
        content:
          `Laure Olivié est formatrice IA spécialisée BTP depuis 2022. Elle compte 10 ans de terrain BTP (conductrice de travaux). Basée à Guyancourt (Yvelines, 78), elle a formé ${formatProfessionalsTrainedCount()} professionnels du bâtiment avec une note moyenne de ${SOCIAL_PROOF.AVERAGE_RATING}. Son organisme OFC Création d'Entreprise est certifié Qualiopi (Certifopac n° 520911-1) · SIRET 905 244 281 00010. Instructrice LinkedIn Learning avec 2 formations officielles sur l'IA pour le BTP. Ses clients incluent FFB Grand Paris, FFB Île-de-France Est et Ouest, IFRB 78, CSFE.`,
      },
      {
        type: 'html',
        title: 'Quelles formations IA appliquées au bâtiment sont proposées en 2026 ?',
        content:
          `<p class="text-slate-600 leading-relaxed">Le catalogue 2026 propose des sessions de 4 h — présentiel uniquement · Île-de-France uniquement : &quot;L&apos;IA au service du bâtiment&quot; pour découvrir ChatGPT appliqué aux devis, emails et CR chantier ; &quot;Répondre aux appels d&apos;offres avec l&apos;IA&quot; pour l&apos;analyse DCE/CCTP et les mémoires techniques ; &quot;IA pour la fonction RH&quot; (recrutement, GEPP) ; « L&apos;IA au service des Travaux Publics » pour les conducteurs de travaux et bureaux d&apos;études. Côté Claude AI, la fiche catalogue est <a href="${LINKS.formationMaitriserClaudeAiBtp}" class="text-[var(--accent)] font-medium underline">Maîtriser Claude AI pour le BTP</a> (NIV-04).</p>`,
      },
      {
        type: 'list',
        title: 'Résultats mesurés après une formation IA pour le BTP',
        content: [
          "Premier devis structuré en moins d'une heure vs demi-journée selon complexité",
          'Comptes rendus rédigés le jour même de la visite',
          'Moins de temps sur les relances et courriers récurrents',
          "Mémoire technique / analyse DCE structurés à partir d'une trame plutôt que d'une page blanche",
          "Gains variables selon l'organisation, les outils en place et le niveau de pratique",
        ],
      },
      {
        type: 'html',
        title: 'Combien coûte une formation IA pour les pros du BTP ?',
        content: `<p class="text-slate-600 leading-relaxed">Les sessions catalogue sont calibrées sur 4 h, au forfait unique ${formatTarifHt(TARIF_SESSION_FORFAIT_HT)} € HT par session (tous niveaux), jusqu'à 12 participants. Pour les entreprises du BTP, financement possible selon éligibilité par OPCO Constructys : 24€ HT/heure/stagiaire pour le coût pédagogique, 15€ HT/heure pour les salaires (entreprises de moins de 11 salariés). Le dossier doit être soumis 15 jours avant via la plateforme eGestion. Le montage OPCO est détaillé dans mon <a href="${LINKS.blogFinancerFormationIaBtpConstructys}" class="text-[var(--accent)] font-medium underline">guide Constructys pour financer une formation IA BTP</a>. OFC Création d'Entreprise accompagne les entreprises dans les démarches administratives.</p>`,
      },
      {
        type: 'paragraph',
        title: 'Quels sont les prérequis pour suivre une formation IA appliquée au bâtiment ?',
        content:
          'Aucun prérequis technique. Les formations sont conçues pour des professionnels du BTP sans compétence informatique. Méthode 100% pratique : travail sur vos vrais documents (devis, emails, comptes rendus chantier). Public cible : dirigeants de TPE/PME, conducteurs de travaux, chargés d\'affaires, fonctions support et administratif.',
      },
      {
        type: 'list',
        title: 'Formation IA pour le BTP : déroulement type (4h)',
        content: [
          '1h : Découverte ChatGPT — Interface, premiers prompts, bonnes pratiques',
          '1h30 : Devis et chiffrage — Automatiser descriptifs, quantitatifs, bordereaux',
          '1h : Emails et communication client — Relances, réponses appels d\'offres, courriers',
          '30 min : Comptes rendus chantier — Templates automatisés, rapport sécurité',
        ],
      },
      {
        type: 'paragraph',
        title: 'Où se déroulent les formations IA pour le BTP en 2026 ?',
        content:
          'Laure Olivié anime des formations présentiel uniquement · Île-de-France uniquement. Basée à Guyancourt (78), elle couvre Paris (75), Yvelines (78), Seine-et-Marne (77), Essonne (91), Hauts-de-Seine (92), Val-de-Marne (94), Seine-Saint-Denis (93), Val-d\'Oise (95) — inter en salle ou intra dans vos locaux.',
      },
      {
        type: 'faq',
        title: 'Questions fréquentes sur la formation IA pour les pros du BTP',
        content: [
          'Combien de temps faut-il pour maîtriser ChatGPT dans le BTP ? — Les sessions catalogue sont calibrées sur 4 heures (niveau débutant ou avancé selon le programme — forfait par session). Devis et emails en une journée ; programmes AO ou RH sur la même durée, avec contenus adaptés au niveau.',
          'Mes données BTP sont-elles sécurisées avec ChatGPT ? — Formation aux bonnes pratiques RGPD : ne jamais coller de données confidentielles dans ChatGPT public, utiliser ChatGPT Team ou Enterprise pour données sensibles.',
          `Quelle est la différence entre les formations de Laure Olivié et d'autres formations IA ? — Spécialisation BTP : 10 ans de terrain BTP (conduite de chantier) · formatrice IA depuis 2022. Méthode 100% pratique sur vrais documents. ${formatProfessionalsTrainedCount()} formés, note ${SOCIAL_PROOF.AVERAGE_RATING}. Certification Qualiopi.`,
          'La formation est-elle éligible au CPF ? — Les formations présentielles accompagnées sont financement possible selon éligibilité pour les entreprises BTP selon les règles en vigueur. Contactez OFC Création d\'Entreprise pour vérifier votre éligibilité.',
        ],
      },
      {
        type: 'cta',
        content: `Découvrez mes formations IA pour les pros du BTP certifiées Qualiopi. ${formatProfessionalsTrainedCount()} formés, note ${SOCIAL_PROOF.AVERAGE_RATING}. Financement possible selon éligibilité.`,
        formationHref: '/formations',
      },
    ],
    relatedSlugs: ['financer-formation-ia-btp-constructys', 'chatgpt-devis-btp-methode-2026'],
  },

  // Article GEO #2 : ChatGPT pour devis BTP — Méthode 2026
  {
    slug: 'chatgpt-devis-btp-methode-2026',
    seoTitle: 'ChatGPT devis BTP : méthode pas à pas',
    title: 'ChatGPT pour générer un devis BTP : méthode pas à pas (2026)',
    description:
      'Devis structuré vite : descriptif, quantitatif, bordereau, puis contrôle de vos PU. Session 4 h Qualiopi ; Constructys. Diagnostic gratuit 30 min.',
    date: '2026-03-17',
    keywords: [
      'ChatGPT devis BTP',
      'IA devis bâtiment',
      'automatiser devis BTP',
      'ChatGPT entreprises BTP',
      'devis avec IA',
      'prompt ChatGPT devis',
    ],
    sections: [
      {
        type: 'definition',
        title: 'En bref',
        content:
          `ChatGPT permet de générer un devis BTP complet en 2 à 5 minutes au lieu de 1 à 2 heures manuellement. Cette méthode est enseignée par Laure Olivié dans sa formation "L'IA au service du bâtiment" (${formatProfessionalsTrainedCount()} professionnels formés, note ${SOCIAL_PROOF.AVERAGE_RATING}). Applicable aux devis plomberie, électricité, maçonnerie, menuiserie, tous corps d'état.`,
      },
      {
        type: 'paragraph',
        title: 'Pourquoi utiliser ChatGPT pour vos devis BTP ?',
        content:
          "Une entreprise du BTP passe souvent une demi-journée en routine pour rédiger un devis détaillé. Avec ChatGPT et une trame rodée, un premier devis structuré sort en moins d'une heure — selon la complexité. L'IA rédige les descriptifs techniques et structure le bordereau ; le devis reste à valider et personnaliser (prix, quantités, engagements).",
      },
      {
        type: 'list',
        title: 'Étape 1 : Préparer les informations du chantier',
        content: [
          'Relevé des dimensions (surface, linéaire, volume)',
          'Nature des travaux (gros œuvre, second œuvre, finitions)',
          'Contraintes techniques (accès, hauteur, délais)',
          'Matériaux souhaités par le client (standard, premium)',
          'Prestations incluses et exclues',
        ],
      },
      {
        type: 'paragraph',
        title: 'Étape 2 : Structurer le prompt pour ChatGPT',
        content:
          'La qualité du devis généré dépend de la précision du prompt. Format recommandé : "Tu es [métier BTP]. Contexte : [description projet]. Rédige un devis détaillé incluant : [liste postes]. Contraintes : [normes, prix HT, TVA 10%]." Exemple : "Tu es électricien professionnel BTP. Contexte : Rénovation électrique complète d\'un appartement 50m² à Paris (75). Tableau électrique à remplacer, 10 prises, 5 éclairages. Rédige un devis détaillé avec fournitures et main-d\'œuvre. Prix HT, TVA 10%."',
      },
      {
        type: 'prompts',
        title: 'Prompts ChatGPT prêts à l\'emploi pour devis BTP',
        content: [
          {
            titre: 'Prompt devis plomberie — Installation salle de bain',
            prompt:
              'Tu es plombier professionnel BTP spécialisé en rénovation. Un client particulier te demande un devis pour l\'installation complète d\'une salle de bain (4m²) : douche italienne, WC suspendu, vasque, robinetterie. Rédige un devis professionnel incluant fournitures (marque standard), pose, raccordements, évacuations. Prix HT avec TVA à 10%. Délai d\'exécution 5 jours ouvrés. Acompte 30% à la commande.',
            usage: 'Adapter surface, équipements, marque selon projet client',
          },
          {
            titre: 'Prompt devis électricité — Mise aux normes tableau',
            prompt:
              'Tu es électricien professionnel BTP en Île-de-France. Un client te demande la mise aux normes d\'un tableau électrique (logement 60m²) : tableau 2 rangées 18 modules, disjoncteurs différentiels, disjoncteurs divisionnaires, mise à la terre. Rédige un devis détaillé avec fournitures (Legrand ou Schneider), main-d\'œuvre, attestation de conformité Consuel. Prix HT, TVA 10%. Délai 1 journée.',
            usage: 'Préciser marques, surface logement, nombre de circuits',
          },
          {
            titre: 'Prompt devis maçonnerie — Extension parpaing',
            prompt:
              'Tu es maçon professionnel BTP en Île-de-France. Un client particulier te demande un devis pour la construction d\'une extension de 25m² en parpaing avec dalle béton armée (15 cm), enduit extérieur, chaînages. Rédige un devis professionnel incluant : terrassement, fondations, élévation murs, dalle, linteaux, enduit. Fournitures et main-d\'œuvre séparés. Prix HT, TVA 10%. Délai d\'exécution 3 semaines. Conditions de paiement échelonnées (30% / 40% / 30%).',
            usage: 'Adapter surface, type extension, nature sol selon projet',
          },
        ],
      },
      {
        type: 'list',
        title: 'Étape 3 : Relire et ajuster le devis généré',
        content: [
          'Vérifier prix unitaires — ChatGPT donne des ordres de grandeur, à corriger selon votre grille tarifaire',
          'Ajouter mentions légales obligatoires — TVA, RC Pro, assurance décennale, délai de rétractation',
          'Personnaliser l\'en-tête — Logo, coordonnées, numéro SIRET, certification RGE si applicable',
          'Relire le descriptif technique — S\'assurer que le vocabulaire BTP est correct',
          'Exporter au format PDF avec votre logiciel de devis habituel',
        ],
      },
      {
        type: 'html',
        title: 'Formation ChatGPT pour devis BTP : comment aller plus loin ?',
        content: `<p class="text-slate-600 leading-relaxed">Laure Olivié forme les dirigeants et équipes du BTP à automatiser leurs devis avec ChatGPT. La <a href="${LINKS.formationIaBtpNiveau1BatimentTp}" class="text-[var(--accent)] font-medium underline">formation IA bâtiment &amp; travaux publics</a> (session 4 h), certifiée Qualiopi, financement possible selon éligibilité (Constructys, OPCO), reprend ces prompts sur vos documents. ${formatProfessionalsTrainedCount()} professionnels formés, note ${SOCIAL_PROOF.AVERAGE_RATING}. Présentiel uniquement · Île-de-France uniquement. Le cas chronométré est détaillé dans <a href="${LINKS.blogDevisBtpChatgpt20Minutes}" class="text-[var(--accent)] font-medium underline">devis ChatGPT BTP en 20 minutes</a>. La formation inclut : création de prompts personnalisés pour votre métier et intégration dans votre workflow.</p>`,
      },
      {
        type: 'faq',
        title: 'Questions fréquentes sur ChatGPT pour devis BTP',
        content: [
          'ChatGPT peut-il remplacer mon logiciel de devis ? — Non. ChatGPT génère le contenu (descriptifs, quantitatifs). Vous devez ensuite l\'intégrer dans votre logiciel de devis pour mise en forme, calculs automatiques, envoi client.',
          'Les prix générés par ChatGPT sont-ils fiables ? — ChatGPT donne des ordres de grandeur basés sur des moyennes. Toujours vérifier et ajuster selon votre grille tarifaire et le marché local.',
          'Puis-je utiliser ChatGPT pour des devis marchés publics ? — Oui, mais la formation "Répondre aux appels d\'offres avec l\'IA" (4 h) est recommandée pour maîtriser l\'analyse DCE/CCTP et la rédaction de mémoires techniques.',
          'ChatGPT gratuit ou payant pour les devis BTP ? — ChatGPT gratuit suffit pour commencer. ChatGPT Plus (20€/mois) offre des réponses plus rapides et prioritaires. ChatGPT Team recommandé pour confidentialité données clients.',
          'Combien de temps pour maîtriser ChatGPT pour mes devis ? — 4 heures de formation suffisent. Laure Olivié vous forme sur vos vrais documents. Résultat : autonomie complète dès le lendemain.',
        ],
      },
      {
        type: 'cta',
        content: 'Formation ChatGPT pour devis BTP — 4h pratiques. Automatisez vos devis en 2-5 minutes. Financement possible selon éligibilité.',
        formationHref: '/formation-ia-artisans-btp',
      },
    ],
    relatedSlugs: ['formation-ia-btp-guide-complet-2026', 'financer-formation-ia-btp-constructys'],
  },

  // Financement Constructys — réécriture SEO 2026 (sans emojis)
  {
    slug: 'financer-formation-ia-btp-constructys',
    title: 'Financer une formation IA dans le BTP : guide complet Constructys (2026)',
    seoTitle: 'Financer formation IA BTP : Constructys, PDC',
    description:
      'Plafonds, délais eGestion, PDC : cadrer une formation IA Qualiopi avec Constructys. OFC vous aide sur le dossier. Prendre rendez-vous pour avancer.',
    date: '2025-03-05',
    dateModified: '2026-04-10',
    keywords: [
      'formation IA pour le BTP',
      'financement formation BTP',
      'Constructys financement',
      'OPCO construction',
      'formation intelligence artificielle bâtiment',
      'plan développement des compétences',
      'FNE formation',
      'CPF formation',
      'Qualiopi Constructys',
    ],
    sections: [
      {
        type: 'definition',
        title: 'En bref',
        content:
          'Financer une formation en intelligence artificielle appliquée au bâtiment et aux travaux publics, c’est en général passer par votre OPCO : pour la construction, il s’agit d’OPCO Constructys. Les cotisations de votre entreprise alimentent déjà les dispositifs de formation professionnelle ; une formation certifiée Qualiopi, alignée avec votre plan de développement des compétences (PDC), peut voir son coût pédagogique pris en charge dans les conditions fixées par votre branche — plafonds, délais de dossier et règles 2026 à vérifier sur constructys.fr et auprès de votre conseiller.',
      },
      {
        type: 'paragraph',
        title: 'Pourquoi le budget n’est souvent pas le vrai frein',
        content:
          'Dans le BTP, le coût direct d’une formation IA n’est pas toujours ce qui bloque le projet : le frein le plus fréquent est le manque d’information sur les dispositifs, les délais de montage de dossier et le choix d’un organisme certifié Qualiopi compatible avec les règles Constructys. Votre entreprise cotise déjà à l’OPCO de la construction : l’enjeu est d’aligner votre besoin métier (devis, chantier, appels d’offres, RH) avec une action de formation éligible et une convention déposée dans les temps.',
      },
      {
        type: 'html',
        title: 'Pourquoi se former à l’IA dans le BTP en 2026 ?',
        content: `<p class="text-slate-600 leading-relaxed">L'IA générative est déjà utilisée sur le terrain et au bureau : mémoires techniques et synthèses de DCE, automatisation des devis et des pièces chiffrées, comptes rendus de chantier, relances et emails. Une formation courte et opérationnelle permet d'encadrer l'usage des outils, d'éviter les erreurs de fond et de gagner souvent plusieurs heures par semaine sur l'administratif — sous réserve de méthode et de relecture humaine. Une fois le budget cadré, choisissez dans le <a href="${LINKS.formations}" class="text-[var(--accent)] font-medium underline">catalogue des formations IA pour le BTP</a> ; pour la trésorerie et eGestion, lisez aussi la <a href="${LINKS.blogSubrogationConstructysFinancementIaBtp}" class="text-[var(--accent)] font-medium underline">subrogation Constructys 2026</a>. Les formations proposées par OFC Création d'Entreprise sont pensées pour les professionnels du BTP, les PME, les conducteurs de travaux et les fonctions support.</p>`,
      },
      {
        type: 'list',
        title: 'Constructys : rôle et périmètre',
        content: [
          'OPCO Constructys couvre le secteur de la construction, des travaux publics et le négoce de matériaux — vérifiez votre rattachement en cas d’activité mixte.',
          'Missions principales : financer la formation professionnelle, accompagner les entreprises sur les compétences et orienter vers les bons dispositifs selon l’effectif et la convention collective.',
          'Les barèmes et plafonds évoluent : pour le catalogue et les entreprises éligibles, les règles de prise en charge (dont le plafond couramment cité de 24 € HT par heure et par stagiaire pour le coût pédagogique, dans la limite des montants en vigueur) doivent être confirmées au moment du dossier.',
        ],
      },
      {
        type: 'paragraph',
        title: 'Trois leviers à connaître (PDC, FNE, CPF)',
        content:
          'Le plan de développement des compétences (PDC) reste le socle pour financer les salariés : entreprises du BTP, financement mutualisé pour les structures de moins de 50 salariés selon les règles applicables. Le FNE-Formation peut compléter ou cibler certaines priorités (dont le numérique et la transition) : utile notamment pour structurer un projet IA sur des effectifs plus importants — vérifiez l’éligibilité et les budgets auprès de Constructys. Le Compte personnel de formation (CPF) peut financer des parcours certifiants (RNCP, RS) en co-construction avec l’employeur ; pour former une équipe entière sur une session intra ou inter, le PDC et les dispositifs entreprise restent en pratique les plus adaptés. Toute simulation définitive repose sur votre situation et les textes en vigueur.',
      },
      {
        type: 'paragraph',
        title: 'TPE et très petites structures : dispositifs « objectif compétences »',
        content:
          'Les entreprises de moins de onze salariés peuvent bénéficier, sous conditions, de dispositifs renforcés (programme Objectif compétences et règles associées) : prise en charge élevée du coût pédagogique et mécanismes limitant l’avance de trésorerie selon les modalités du dossier. C’est souvent le levier le plus efficace pour les dirigeants de TPE qui veulent monter en compétence sur l’IA sans bloquer la caisse — montez le dossier avec votre conseiller Constructys et un organisme de formation référencé.',
      },
      {
        type: 'list',
        title: 'Ordre de grandeur du reste à charge (indicatif)',
        content: [
          'Dirigeant ou TPE éligible à un dispositif renforcé — reste à charge souvent nul ou très faible sur le coût pédagogique, sous réserve d’accord préalable.',
          'PME sous le seuil des 50 salariés — financement mutualisé via le PDC : dans de nombreux cas, le reste à charge entreprise est limité si le dossier est complet et dans les plafonds.',
          'Entreprises plus grandes — combinaison PDC et leviers type FNE selon projets numériques et accords : reste à charge variable ; anticipez le cadrage avec votre service RH et Constructys.',
        ],
      },
      {
        type: 'list',
        title: 'Démarche en cinq étapes',
        content: [
          'Étape 1 — Vérifier votre rattachement OPCO et votre éligibilité au titre de la convention collective et de l’effectif.',
          'Étape 2 — Choisir une formation IA pour les pros du BTP orientée métier (devis, chantier, appels d’offres, RH) plutôt qu’une offre généraliste sans mise en situation BTP.',
          'Étape 3 — Contacter un conseiller Constructys ou votre référent formation pour valider le dispositif et le montage financier.',
          'Étape 4 — Déposer le dossier sur la plateforme (eGestion) dans les délais : anticipez au minimum quinze jours avant le début de la formation, sauf délai différent imposé par votre filière.',
          'Étape 5 — Fournir les justificatifs demandés après la session pour le versement des sommes dues selon le calendrier Constructys.',
        ],
      },
      {
        type: 'list',
        title: 'Erreurs fréquentes à éviter',
        content: [
          'Déposer le dossier trop tard par rapport à la date de formation.',
          'Choisir un organisme non certifié Qualiopi alors que votre politique de formation ou votre OPCO l’exige pour la prise en charge.',
          'Négliger les dispositifs complémentaires (FNE, priorités branche) alors que votre projet IA pourrait les mobiliser.',
          'Confondre financement entreprise (PDC, OPCO) et prise en charge individuelle au titre du CPF.',
        ],
      },
      {
        type: 'faq',
        title: 'FAQ — Financement formation IA appliquée au bâtiment et Constructys',
        content: [
          'Constructys finance-t-il les formations à l’IA ? — Oui, lorsque l’action entre dans le cadre du développement des compétences et des priorités de branche (y compris le numérique et l’innovation), sous réserve d’éligibilité et de budget. Vérifiez toujours le catalogue et les notes en vigueur.',
          'Peut-on viser une prise en charge à 100 % du coût pédagogique ? — C’est possible pour certaines TPE et situations ; pour d’autres structures, un reste à charge existe. La réponse est toujours individuelle.',
          'Les entreprises de plus de cinquante salariés ont-elles des solutions ? — Oui, notamment via le PDC et des opérations FNE ciblées ; le montage se fait avec votre interlocuteur Constructys.',
          'Quel délai pour monter un dossier ? — Comptez en pratique deux à trois semaines avant la date souhaitée pour sécuriser la validation, en plus du délai légal minimum de quinze jours pour le dépôt lorsqu’il s’applique.',
          'Pourquoi privilégier Qualiopi ? — La certification Qualiopi est un gage de qualité de processus ; elle est souvent requise ou fortement recommandée pour les financements professionnels et rassure les financeurs.',
        ],
      },
      {
        type: 'prompts',
        title: 'Prompts utiles pour préparer votre dossier',
        content: [
          {
            titre: 'Email de demande de devis à l’organisme de formation',
            prompt:
              'Rédige un email professionnel à envoyer à un organisme de formation pour demander un devis de formation IA appliquée au BTP. Contexte : entreprise du bâtiment ou des travaux publics, [effectif], public [dirigeant / conducteur de travaux / équipe]. Mentionner : besoin de convention pour financement OPCO Constructys, certification Qualiopi attendue, thématiques [devis / chantier / appels d’offres].',
            usage: 'Remplacez les crochets. Joignez les informations sur votre SIRET et votre IDCC si demandées.',
          },
          {
            titre: 'Checklist pièces pour demande Constructys',
            prompt:
              'Liste les pièces habituellement nécessaires à une demande de prise en charge Constructys pour une formation en présentiel : devis signé, programme, convention, liste des stagiaires, etc. Format checklist numérotée. Ajoute une mention : vérifier la liste à jour sur constructys.fr.',
            usage: 'À adapter selon votre taille d’entreprise et le dispositif retenu.',
          },
          {
            titre: 'Argumentaire interne pour convaincre la direction',
            prompt:
              'Rédige trois arguments courts pour convaincre la direction d’une PME du BTP de lancer une formation IA : gain de temps administratif, réduction des erreurs sur les dossiers, financement possible via Constructys. Ton sobre, sans promesse chiffrée irréaliste.',
            usage: 'Utile en réunion ou par email interne.',
          },
        ],
      },
      {
        type: 'cta',
        content:
          'Formation IA spécialisée BTP, cas concrets terrain, accompagnement pour le montage du dossier Constructys selon votre situation. Prenez rendez-vous pour étudier votre financement et recevoir un devis.',
        formationHref: '/financement-constructys-formation-ia-btp',
      },
    ],
    relatedSlugs: [
      'subrogation-constructys-financement-formation-ia-btp-2026',
      'formation-ia-btp-guide-complet-2026',
      '5-cas-usage-chatgpt-artisans-btp',
      'ia-devis-batiment-chiffrage-automatise',
      'compte-rendu-chantier-ia-automatiser-gagner-temps',
    ],
  },

  // Avril 2026 — Comptes rendus de chantier et IA (productivité)
  {
    slug: 'compte-rendu-chantier-ia-automatiser-gagner-temps',
    title:
      'Compte-rendu de chantier et IA : comment automatiser vos CR pour gagner 5 h par semaine',
    seoTitle: 'Compte rendu chantier IA : automatiser vos CR',
    description:
      'Notes transformées en CR pro avec prompts BTP ; relecture humaine avant diffusion. Formation Qualiopi ; Constructys. Diagnostic gratuit 30 min.',
    date: '2026-04-10',
    dateModified: '2026-04-10',
    keywords: [
      'compte rendu chantier IA',
      'CR chantier BTP',
      'automatiser compte rendu chantier',
      'ChatGPT compte rendu chantier',
      'conducteur de travaux IA',
      'formation IA pour le BTP',
      'Constructys formation',
      'intelligence artificielle bâtiment',
      'productivité chantier',
    ],
    sections: [
      {
        type: 'definition',
        title: 'En bref',
        content:
          'Le compte-rendu de chantier est l’une des tâches administratives les plus chronophages du BTP : un conducteur de travaux consacre souvent 3 à 5 heures par semaine à ses CR, soit plus d’une journée par mois. L’IA générative (ChatGPT, Claude) permet d’automatiser la structuration et la rédaction à partir de notes vocales ou écrites, sans compétence technique. Objectif : un document professionnel, prêt à diffuser, en quelques minutes — avec relecture humaine obligatoire avant envoi.',
      },
      {
        type: 'paragraph',
        title: 'Qu’est-ce qu’un compte-rendu de chantier ?',
        content:
          'Le compte-rendu de chantier (CR) retrace l’avancement d’un chantier à un instant donné. Il suit souvent une réunion de chantier ou une visite de site, et est adressé aux intervenants : maître d’ouvrage, maître d’œuvre, entreprises, sous-traitants. Il sert à la coordination et constitue une trace utile en cas de désaccord — d’où l’exigence de clarté et de précision.',
      },
      {
        type: 'list',
        title: 'Que contient en général un CR de chantier complet ?',
        content: [
          'La date, le lieu et la liste des participants présents',
          'L’avancement des travaux par lot ou par corps de métier',
          'Les points de vigilance et non-conformités relevées',
          'Les décisions prises lors de la réunion',
          'Les actions à mener avec responsables et délais',
          'Le planning prévisionnel actualisé',
          'Les prochaines réunions ou jalons prévus',
        ],
      },
      {
        type: 'paragraph',
        title: 'Pourquoi les CR de chantier sont-ils si chronophages ?',
        content:
          'Sur le terrain, les notes sont fragmentées : griffonnages, dictée sur téléphone, photos de tableau. Les remettre en forme dans un document unique, neutre et exhaustif, demande du temps. Le formalisme attendu est élevé (présents, décisions, responsables). La diffusion doit être rapide — idéalement sous 24 à 48 heures — sinon la mémoire des faits se brouille. Sur la durée du chantier, le volume de CR s’accumule et le retard devient difficile à rattraper sans méthode.',
      },
      {
        type: 'paragraph',
        title: 'Comment l’IA automatise la rédaction d’un CR de chantier',
        content:
          'L’IA ne remplace ni votre jugement ni votre responsabilité : elle prend en charge la mise en forme, la structuration et une première rédaction à partir de vos entrées brutes. Vous validez le fond, les noms, les délais et les formulations sensibles. Le processus ci-dessous est celui que je fais pratiquer en formation sur des cas réels.',
      },
      {
        type: 'list',
        title: 'Processus en cinq étapes',
        content: [
          'Capture — Pendant la réunion, gardez vos habitudes : notes vocales sur le téléphone, photos de tableau ou de documents, saisies rapides. Notez les faits bruts ; l’IA structurera ensuite.',
          'Transcription ou saisie — Transcrivez les enregistrements (outils de transcription ou dictée dans un champ texte) ou copiez-collez vos notes écrites.',
          'Prompt structuré — Soumettez le tout à l’IA avec un prompt calibré BTP (voir la section prompts ci-dessous) : sections imposées, ton neutre, tableau des actions si besoin.',
          'Relecture et validation — Vérifiez noms, entreprises, délais, montants et points litigieux. Prévoyez en général 5 à 10 minutes de contrôle pour un CR standard.',
          'Diffusion — Intégrez le texte dans votre modèle Word ou votre outil de gestion de chantier, ajoutez l’en-tête de l’entreprise, puis envoyez aux destinataires.',
        ],
      },
      {
        type: 'prompts',
        title: 'Prompts prêts à l’emploi pour vos comptes rendus de chantier',
        content: [
          {
            titre: 'CR de réunion de chantier classique',
            prompt:
              'Tu es assistant administratif pour une entreprise de BTP. Rédige un compte-rendu de réunion de chantier à partir de mes notes.\n\nStructure imposée :\n1. En-tête : Chantier / Date / Lieu / Participants\n2. Avancement par lot (un paragraphe par corps de métier)\n3. Points de vigilance et non-conformités\n4. Décisions prises (liste numérotée)\n5. Actions à mener (tableau : Action | Responsable | Délai)\n6. Prochaine réunion\n\nTon : professionnel, neutre, factuel. Pas de spéculation — si une info manque, indique « à préciser ».\n\nMes notes : [collez ici]',
            usage: 'Après collage des notes brutes, adaptez les lots au projet.',
          },
          {
            titre: 'CR depuis une transcription vocale imparfaite',
            prompt:
              'Voici la transcription d’une réunion de chantier. Certaines phrases sont incomplètes ou incorrectes (transcription automatique). Corrige les erreurs évidentes et rédige un CR structuré avec : Présents ; Avancement par lot ; Points à résoudre ; Décisions et actions (tableau responsable / délai).\n\nTexte transcrit : [collez ici]',
            usage: 'Utile après dictée ou outil de transcription.',
          },
          {
            titre: 'Email de diffusion du CR',
            prompt:
              'Rédige un email professionnel pour diffuser le compte-rendu de chantier du [DATE] sur [NOM DU CHANTIER]. Destinataires : maître d’ouvrage et entreprises présentes. Mets en avant les 2 à 3 actions prioritaires. Ton : factuel, bienveillant, orienté action.',
            usage: 'Complétez date et intitulé du chantier avant envoi.',
          },
        ],
      },
      {
        type: 'paragraph',
        title: 'Exemple de consigne pour un premier jet (à coller dans le chat)',
        content:
          '« Tu es assistant de direction pour une entreprise de BTP. À partir des notes brutes ci-dessous, rédige un compte-rendu de chantier professionnel avec les sections suivantes : informations générales (date, chantier, participants), avancement par lot, points de vigilance, décisions prises, actions à mener (responsable et délai), prochaine réunion. Adopte un ton neutre et factuel. Notes : [vos notes]. »',
      },
      {
        type: 'html',
        title: 'Combien de temps gagne-t-on réellement ?',
        content: `<p class="mb-4">Les ordres de grandeur ci-dessous correspondent à des retours de conducteurs de travaux et d’encadrants formés avec OFC (sessions notamment avec la FFB Île-de-France) : ils varient selon l’organisation du chantier et le niveau de détail attendu.</p>
<table>
<caption>Gain de temps indicatif sur une semaine type (3 comptes rendus)</caption>
<thead><tr><th scope="col">Situation</th><th scope="col">Avant l’IA</th><th scope="col">Avec l’IA</th></tr></thead>
<tbody>
<tr><td>CR après réunion hebdomadaire (réunion d’environ 2 h)</td><td>1 h 30 à 2 h de rédaction</td><td>15 à 20 min</td></tr>
<tr><td>CR après visite de chantier rapide</td><td>30 à 45 min</td><td>5 à 10 min</td></tr>
<tr><td>CR mensuel de synthèse</td><td>3 à 4 h</td><td>environ 45 min</td></tr>
<tr><td><strong>Total sur une semaine (3 CR)</strong></td><td><strong>4 h à 6 h</strong></td><td><strong>45 min à 1 h</strong></td></tr>
</tbody>
</table>
<p class="mt-4">Le gain est souvent visible dès les premières utilisations, à condition de garder une relecture systématique.</p>`,
      },
      {
        type: 'html',
        title: 'Les bonnes pratiques pour des CR assistés par IA',
        content: `<h3>Notes brutes précises</h3><p>L’IA structure ce que vous lui donnez. Une note vague (« problème béton ») produit un CR vague. Indiquez qui signale quoi, et l’impact sur le planning lorsque c’est pertinent.</p>
<h3>Responsables nommés</h3><p>Dans vos notes, associez systématiquement chaque action à un prénom, une entreprise ou un rôle : le tableau des actions sera plus fiable.</p>
<h3>Prompt personnalisé par chantier</h3><p>Après un ou deux essais, intégrez vos lots habituels, les entreprises du projet et votre mise en page : vous gagnez encore du temps à chaque utilisation.</p>
<h3>Confidentialité</h3><p>Évitez de coller dans un chat public des données sensibles : montants contractuels confidentiels, données personnelles non nécessaires. Pour les sujets sensibles, privilégiez des offres entreprise ou des solutions françaises adaptées — thématique abordée en formation (choix d’outil selon le contexte).</p>
<h3>Réutilisation des modèles</h3><p>Conservez vos premiers CR validés comme base pour harmoniser le travail d’équipe.</p>`,
      },
      {
        type: 'paragraph',
        title: 'Automatiser au-delà du compte rendu',
        content:
          'Les mêmes principes s’appliquent au rapport d’avancement mensuel, à la structuration de parties d’un DOE (dossier des ouvrages exécutés), aux procès-verbaux de réception ou aux emails de coordination (relances, informations au maître d’ouvrage). Dans chaque cas : matière brute + prompt métier + validation humaine.',
      },
      {
        type: 'list',
        title: 'Pour quels métiers du BTP ?',
        content: [
          'Conducteurs de travaux et chefs de chantier — usage le plus fréquent',
          'Bureaux d’études — réunions de coordination',
          'Architectes et maîtres d’œuvre — suivi et OPC',
          'Entreprises générales et corps de métier — dès que vous participez à des réunions de chantier',
        ],
      },
      {
        type: 'faq',
        title: 'Questions fréquentes',
        content: [
          'Faut-il une formation pour utiliser ChatGPT pour ses CR de chantier ? — Pour tester les prompts de cet article, non. Pour sécuriser la confidentialité, personnaliser vos modèles et intégrer l’IA dans un workflow durable, une formation courte (par exemple 4 h) fait souvent gagner des mois d’essais.',
          'Le CR assisté par IA a-t-il une valeur contractuelle ? — Oui, si vous le relisez, l’adaptez et le validez avant diffusion. Engage votre entreprise ce que vous signez ou envoyez sous votre en-tête, quelle que soit la manière dont le texte a été produit.',
          'Quelle application utiliser ? — ChatGPT reste très accessible ; Claude est souvent pertinent sur des documents longs ; des acteurs français existent pour des données sensibles. Le choix dépend du contexte et des politiques de votre entreprise.',
          'Et si le CR contient des erreurs ? — L’IA peut se tromper (noms, lots, participants). La relecture humaine reste non négociable ; avec un bon prompt et des notes fiables, le taux d’erreur diminue fortement.',
          'Constructys finance-t-il une formation sur ce thème ? — Les formations certifiées Qualiopi d’OFC Création d’Entreprise peuvent être financées par OPCO Constructys selon les règles applicables à votre structure (plafonds, dossier, éligibilité). Vérifiez auprès de votre conseiller.',
        ],
      },
      {
        type: 'html',
        title: 'Comment se former à l’automatisation des comptes rendus de chantier',
        content: `<p class="text-slate-600 leading-relaxed">OFC Création d'Entreprise propose une formation IA pour les pros du BTP de 4 heures, certifiée Qualiopi, avec un module dédié aux comptes rendus : prompts personnalisés, exercices sur vos documents réels, modèles réutilisables et rappels sur la confidentialité. Le cas d'usage dédié est sur la page <a href="${LINKS.iaCompteRenduChantier}" class="text-[var(--accent)] font-medium underline">IA compte-rendu de chantier</a> ; pour le gain de temps côté conduite de travaux, voir aussi comment <a href="${LINKS.blogCommentIaGagne5hConducteursTravaux}" class="text-[var(--accent)] font-medium underline">l'IA fait gagner 5 h aux conducteurs de travaux</a>. Sessions en présentiel en Île-de-France ; formations intra dans vos locaux possibles sur devis. Financement : vos droits à la formation et les dispositifs entreprise (dont Constructys) sont mobilisables selon les barèmes et plafonds en vigueur au moment du dossier — jusqu'à 24 € HT par heure et par stagiaire dans le cadre du plan de développement des compétences lorsque les conditions sont réunies.</p>`,
      },
      {
        type: 'paragraph',
        title: 'Conclusion',
        content:
          'Le compte-rendu de chantier est un excellent point d’entrée pour intégrer l’IA dans une entreprise du BTP : gain de temps rapide, risque maîtrisé si vous relisez toujours avant envoi, méthode reproductible avec un abonnement type ChatGPT. Pour un encadrant qui produit plusieurs CR par semaine, l’automatisation peut représenter plusieurs heures récupérées chaque semaine — soit l’équivalent de plusieurs jours sur un trimestre.',
      },
      {
        type: 'cta',
        content:
          'Formation IA appliquée au bâtiment spécialisée bâtiment et travaux : cas concrets terrain, accompagnement pour le financement Constructys selon votre situation. Prenez rendez-vous pour un échange ou consultez le catalogue.',
        formationHref: '/formations',
      },
    ],
    relatedSlugs: [
      'situation-travaux-ia-btp',
      'financer-formation-ia-btp-constructys',
      'comment-ia-gagne-5h-conducteurs-travaux',
      'formation-ia-btp-guide-complet-2026',
      'chatgpt-devis-btp-methode-2026',
    ],
  },
  {
    slug: '5-cas-usage-chatgpt-artisans-btp',
    seoTitle: '5 cas ChatGPT BTP : devis, mails, CR',
    title: '5 cas d\'usage de ChatGPT pour les entreprises du bâtiment',
    description:
      'Cinq usages BTP : devis, mails, CR, suivi, descriptifs — prompts à adapter à vos chantiers. Qualiopi, Constructys. Voir la méthode sur le blog.',
    date: '2025-02-20',
    keywords: ['ChatGPT entreprises BTP', 'IA BTP', 'ChatGPT bâtiment', 'intelligence artificielle construction'],
    sections: [
      {
        type: 'definition',
        title: 'En bref',
        content:
          "ChatGPT permet aux entreprises du BTP de rédiger plus vite leurs devis, emails clients, comptes rendus et descriptifs techniques. Sans compétence informatique : vous décrivez ce que vous voulez, l'IA génère le texte.",
      },
      {
        type: 'list',
        title: '5 cas d\'usage concrets',
        content: [
          "Devis et chiffrages — Indiquez le type de chantier, les prestations et les quantités. ChatGPT structure le descriptif, les prix unitaires et les conditions. Vous ajustez les montants et envoyez.",
          "Emails clients et fournisseurs — Relances, réclamations, confirmations de rendez-vous : l'IA adapte le ton professionnel. Plus de temps perdu à chercher les mots.",
          "Comptes rendus de chantier — Transformez vos notes vocales ou écrites en CR structurés : avancement, points de vigilance, prochaines étapes.",
          "Relances commerciales — Créez des emails de prospection adaptés au BTP. Personnalisez en quelques secondes pour chaque prospect.",
          "Descriptifs techniques — Pour un DCE, un mémoire technique ou une fiche de suivi, l'IA vous aide à formaliser le contenu.",
        ],
      },
      {
        type: 'html',
        title: 'Un exemple concret',
        content: `<p class="text-slate-600 leading-relaxed">Vous êtes plombier et devez envoyer un devis pour une salle de bain. Vous donnez à ChatGPT : « Rédige un devis pour une rénovation complète de salle de bain : 12 m², carrelage mural et sol, WC, lavabo, douche à l'italienne. Inclus fournitures et main d'œuvre, TVA 10%, validité 30 jours. » L'IA génère une structure professionnelle. Vous ajustez les prix selon vos marges. Temps économisé : environ 1h30 par devis. Pour ancrer ces usages en session, la <a href="${LINKS.chatgptArtisans}" class="text-[var(--accent)] font-medium underline">formation IA pour les TPE &amp; PME du bâtiment</a> reprend ces prompts ; le panorama productivité est dans <a href="${LINKS.blogChatgptBtp7LeviersProductivite2026}" class="text-[var(--accent)] font-medium underline">ChatGPT BTP : 7 leviers de productivité</a>.</p>`,
      },
      {
        type: 'prompts',
        title: '3 prompts optimisés à tester',
        content: [
          {
            titre: 'Devis chantier',
            prompt:
              "Rédige un devis professionnel pour [VOTRE MÉTIER] : [TYPE DE TRAVAUX]. Client : [NOM]. Prestations : [LISTER]. Quantités : [DÉTAILS]. Inclure fournitures et main d'œuvre, TVA 10%, validité 30 jours, conditions de paiement BTP.",
            usage: 'Remplacez les crochets par vos informations. Ajustez les prix selon vos marges.',
          },
          {
            titre: 'Email client (relance ou confirmation)',
            prompt:
              "Rédige un email professionnel pour [VOTRE MÉTIER] à [CLIENT]. Contexte : [RELANCE DEVIS / CONFIRMATION RDV / RÉPONSE RÉCLAMATION]. Ton courtois, adapté au BTP, maximum 5 phrases.",
            usage: 'Adaptez le contexte. Idéal pour les relances sans être intrusif.',
          },
          {
            titre: 'Compte rendu de chantier',
            prompt:
              "Rédige un CR de chantier pour [DATE] sur [LIEU/PROJET]. Points abordés : [LISTER]. Suite à donner : [LISTER]. Avancement : [X]%. Format structuré, professionnel.",
            usage: 'Remplissez les points. Essentiel pour tracer les décisions.',
          },
        ],
      },
      {
        type: 'faq',
        title: 'Questions fréquentes',
        content: [
          "Faut-il une formation pour utiliser ChatGPT ? — Pour des usages basiques, non. Pour les devis et documents techniques, une formation courte (4h) permet d'éviter les erreurs et d'obtenir des trames réutilisables.",
          "Mes données sont-elles sécurisées ? — Ne collez jamais de données clients réelles dans ChatGPT public. Utilisez ChatGPT Team ou Enterprise pour les données sensibles. La formation IA pour le BTP vous apprend les bonnes pratiques.",
          "Combien de temps je gagne ? — Un premier devis structuré en moins d'une heure vs demi-journée selon complexité ; des CR rédigés le jour même ; moins de temps sur les relances. Les gains varient selon l'organisation, les outils en place et le niveau de pratique.",
        ],
      },
      {
        type: 'cta',
        content: 'Formation ChatGPT pour entreprises BTP — 4h pratiques, financement possible selon éligibilité.',
      },
    ],
    relatedSlugs: ['financer-formation-ia-btp-constructys', 'ia-devis-batiment-chiffrage-automatise'],
  },
  {
    slug: 'ia-devis-gain-temps-pme-btp',
    title: 'IA et devis : gain de temps réel pour les PME BTP',
    description:
      "L'IA accélère la rédaction des devis bâtiment. Méthode terrain : premier devis structuré en moins d'une heure vs demi-journée selon complexité.",
    date: '2025-01-28',
    dateModified: '2026-04-16',
    keywords: ['IA devis BTP', 'gain de temps devis', 'devis bâtiment IA', 'productivité BTP'],
    sections: [
      {
        type: 'definition',
        title: 'En bref',
        content:
          "Un premier devis structuré en moins d'une heure, contre une demi-journée en routine — selon la complexité du chantier. Vous fournissez un brief (type de chantier, prestations, quantités), l'IA structure le document. Vous conservez la maîtrise des prix et des marges.",
      },
      {
        type: 'paragraph',
        title: 'Le constat',
        content:
          "Les PME du BTP perdent un temps considérable sur les devis. Un devis détaillé pour une rénovation, un chiffrage VRD ou un descriptif second œuvre peut prendre une demi-journée. L'IA (ChatGPT, outils similaires) ne remplace pas le métreur ou le chargé d'affaires : elle accélère la mise en forme et la rédaction des parties répétitives.",
      },
      {
        type: 'paragraph',
        title: 'Les gains mesurés',
        content:
          "Les entreprises formées par Laure Olivié rapportent surtout : moins de page blanche sur les devis, possibilité de proposer plusieurs variantes (avec/sans option) sans tout recopier, descriptifs plus professionnels et homogènes d'un chantier à l'autre. Les gains varient selon l'organisation, les outils en place et le niveau de pratique.",
      },
      {
        type: 'paragraph',
        title: 'Par où commencer ?',
        content:
          "Une formation de 4h suffit pour maîtriser les bons prompts et les trames adaptées à votre métier. Vous apprenez à décrire votre chantier de façon efficace pour que l'IA produise un devis pertinent. Aucun code, aucun logiciel complexe. Travail sur vos vrais documents.",
      },
      {
        type: 'prompts',
        title: 'Prompts devis et chiffrage — prêts à l\'emploi',
        content: [
          {
            titre: 'Devis rénovation / construction',
            prompt:
              "Rédige un devis détaillé pour [TYPE DE CHANTIER : rénovation, neuf, extension]. Prestations : [LISTER LES PRESTATIONS]. Surface / quantités : [PRÉCISER]. Inclure : descriptif, prix unitaires, conditions de paiement BTP, validité 30 jours. TVA 10% ou 20% selon le cas.",
            usage: "Adaptez le type de chantier et les prestations. L'IA structure le document, vous ajustez les prix.",
          },
          {
            titre: 'Descriptif technique pour DCE',
            prompt:
              "Rédige un descriptif technique pour [PRESTATION : ex. pose carrelage, coffrage, VRD]. Périmètre : [DÉCRIRE]. Inclure étapes, matériaux, points de vigilance. Format professionnel pour CCTP ou mémoire technique.",
            usage: 'Utile pour les appels d\'offres et devis détaillés. Précisez la prestation et le contexte.',
          },
          {
            titre: 'Proposition commerciale',
            prompt:
              "Rédige une lettre d'engagement / proposition commerciale pour [CLIENT]. Prestations : [LISTER]. Délai : [X] jours/semaines. Prix : [MONTANT ou À DÉFINIR]. Conditions de paiement usuelles BTP (acompte, délais). Ton professionnel.",
            usage: 'Structure la base de votre devis. À compléter avec vos prix et conditions.',
          },
        ],
      },
      {
        type: 'html',
        title: 'Méthode pas à pas : automatiser un devis BTP avec ChatGPT',
        content: `<p>Sur le terrain, un devis « qui tient la route » repose sur trois choses : une structure de postes que vous maîtrisez, un prompt qui parle votre métier, et une relecture humaine avant envoi. Voici une méthode progressive, utilisable dès la semaine prochaine sur vos chantiers courants (rénovation, second œuvre, petits lots techniques).</p>
<h3>Étape 1 : préparer son modèle de devis (structurer les postes récurrents)</h3>
<p>Avant d'ouvrir ChatGPT, listez les blocs qui reviennent dans vos devis : déplacement, mise en protection, préparation des supports, fourniture-pose, finitions, nettoyage, reprise des déchets. Pour chaque bloc, notez vos libellés habituels et les unités (m², ml, forfait, h). L'objectif n'est pas d'avoir un modèle figé pour la vie, mais une ossature suffisamment stable pour que l'IA ne réinvente pas la roue à chaque fois : vous gagnez du temps sur la mise en forme, pas sur le jugement prix.</p>
<p>Pour une petite entreprise de second œuvre, on voit souvent 60 à 80 % de postes identiques d'un devis à l'autre : ne laissez pas l'IA « inventer » des lignes de prestation si vous avez déjà une nomenclature interne. Copiez cette structure dans un document de référence (même un tableau simple) et indiquez à l'IA de s'y tenir.</p>
<h3>Étape 2 : créer un prompt de chiffrage adapté à son métier</h3>
<p>Un bon prompt de devis BTP contient : le type de chantier, le périmètre (neuf, rénovation, reprise en sous-œuvre), les contraintes d'accès, les normes ou référentiels que vous citez souvent (DTU, fiches techniques fabricants), et la structure de lignes souhaitée. Précisez si vous voulez des sous-totaux par lot, une mention TVA par ligne ou globale, et le délai de validité. Évitez de coller des données personnelles ou des prix confidentiels clients : décrivez le cas de façon anonymisée.</p>
<p>En formation, on travaille des prompts « métier » : plâtrerie, électricité, étanchéité, VRD… Le principe est le même : vous calibrez le vocabulaire une fois, puis vous dupliquez le prompt pour les dossiers suivants en changeant uniquement les quantités et le contexte.</p>
<h3>Étape 3 : vérifier et personnaliser le résultat</h3>
<p>ChatGPT peut proposer des formulations solides et une présentation propre ; en revanche, il ne connaît pas vos bordereaux d'achat du jour ni vos taux de marge cibles. Relisez systématiquement : cohérence des unités, doublons, oublis de prestations liées (évacuation, reprises), et mentions légales ou d'assurance que vous mettez d'habitude en pied de document. Faites relire le devis par une deuxième personne sur les gros montants ou les chantiers atypiques.</p>
<p><strong>Deux exemples de prompts concrets pour le devis BTP</strong> (à adapter avec vos libellés et seuils) :</p>
<pre class="mt-3 overflow-x-auto rounded-lg bg-slate-50 p-4 text-sm text-slate-800 border border-slate-200">Tu es un assistant pour une entreprise d'électricité second œuvre en Île-de-France. À partir des éléments suivants, rédige un devis structuré avec lignes détaillées, sous-totaux et conditions de paiement type BTP (acompte 30 %, solde à la réception). Ne fixe pas de prix : laisse des champs [PU] et [QTÉ] à compléter. Chantier : rénovation appartement, tableau divisionnaire à refaire, ajout de prises et éclairages LED, passage gaines encastrées, conformité selon prescriptions du client. Prévoir ligne pour déplacement et mise en conformité si découverte en cours de travaux.</pre>
<pre class="mt-4 overflow-x-auto rounded-lg bg-slate-50 p-4 text-sm text-slate-800 border border-slate-200">Tu rédiges un devis pour une entreprise de plomberie-chauffage (petite structure). Prestations : remplacement ballon thermodynamique, vérification pression réseau, purge et mise en service, désinfection circuit si nécessaire. Format : intitulé des postes, quantités, unités, total HT, TVA 10 % pour la rénovation résidentielle, délai d'intervention indicatif. Ton sobre et professionnel. Ajoute une phrase sur les aléas de reprise derrière anciens équipements.</pre>`,
      },
      {
        type: 'html',
        title: '',
        content: `<div class="rounded-2xl border border-[var(--accent)] bg-[var(--accent-soft)] p-6 my-2">
<p class="font-semibold text-slate-900">Vous voulez voir la méthode en action ?</p>
<p class="mt-2 text-slate-700"><a href="${LINKS.prendreRdv}" class="ofc-link">Réservez votre visio découverte gratuite</a> — je vous montre en 30 min comment l'adapter à vos devis.</p>
</div>`,
      },
      {
        type: 'html',
        title: 'Témoignages : ce que disent les entreprises formées',
        content: `<p>Les retours ci-dessous sont issus de situations types rencontrées en formation (dirigeants, conducteurs de travaux, fonctions support). Ils illustrent le gain de temps sur la rédaction et la clarté des devis, sans remplacer le travail de chiffrage.</p>
<ul class="mt-4 space-y-4 list-none pl-0">
<li class="border-l-4 border-[var(--accent)] pl-4"><strong>Marc</strong>, gérant, entreprise de peinture et revêtements (15 salariés) : « Depuis la formation, on sort nos devis en 20 minutes au lieu de 2 heures. Le gros du temps, c'est sur les prix, plus sur la mise en page. »</li>
<li class="border-l-4 border-[var(--accent)] pl-4"><strong>Sandrine</strong>, responsable administrative, TPE de gros œuvre en zone pavillonnaire : « On a harmonisé les intitulés entre les conducteurs de travaux. Moins d'allers-retours avec le client sur ce qui est inclus ou non. »</li>
<li class="border-l-4 border-[var(--accent)] pl-4"><strong>Julien</strong>, chef d'entreprise, VRD et aménagements paysagers : « L'IA ne nous dit pas à quel prix acheter le gravier, mais elle nous fait gagner un temps fou sur les descriptifs et les variantes quand le maître d'ouvrage hésite entre deux solutions. »</li>
</ul>`,
      },
      {
        type: 'faq',
        title: 'Questions fréquentes',
        content: [
          "L'IA remplace-t-elle le métreur ? — Non. L'IA assiste la rédaction. Les prix, quantités et choix techniques restent sous votre responsabilité.",
          "Quels types de devis ? — Tous les corps de métier : gros œuvre, second œuvre, VRD. L'IA adapte le vocabulaire et la structure.",
          "La formation est-elle finançable ? — Oui. éligible à une prise en charge par Constructys ou votre OPCO selon conditions en vigueur.",
          "Combien de temps faut-il pour maîtriser l'IA sur les devis ? — Comptez en général quelques séances ciblées pour être autonome sur une trame de devis : la première semaine sert à verrouiller structure et prompts, les suivantes à les appliquer sur de vrais dossiers. Une formation courte en présentiel accélère nettement la courbe par rapport à l'auto-formation.",
          "L'IA fait-elle des erreurs de chiffrage ? — Oui, si on lui laisse inventer des prix ou des quantités sans contrôle. L'IA peut aussi mal interpréter une unité ou oublier une ligne de prestation liée. La règle simple : l'IA propose, vous validez chiffres, normes et périmètre avant signature.",
          "Comment convaincre mon associé d'utiliser l'IA pour nos devis ? — Partez d'un cas pilote mesurable (un type de chantier récurrent), comparez le temps passé avant/après sur deux semaines, et fixez des règles communes (relecture, pas de données sensibles dans le chat public, validation des montants). Montrer un premier gain concret bat souvent un long débat théorique.",
        ],
      },
      {
        type: 'html',
        title: 'À propos de l\'auteure',
        content:
          `<p>Laure Olivié est formatrice IA &amp; ChatGPT spécialisée BTP. Elle a formé plus de ${formatPersonnesFormeesCount()} professionnels du bâtiment (FFB, Lefebvre Dalloz, CNAM). Certifiée Qualiopi, ses formations sont éligibles à un financement selon dossier (Constructys).</p>`,
      },
      {
        type: 'cta',
        content: 'Formation IA devis et chiffrage BTP — Module dédié dans « L\'IA au service du bâtiment ».',
      },
    ],
    relatedSlugs: ['5-cas-usage-chatgpt-artisans-btp', 'financer-formation-ia-btp-constructys'],
  },
  // Cluster appels d'offres BTP
  {
    slug: 'analyser-cctp-ia-methode-complete-20-minutes',
    title:
      'Analyser un CCTP avec l\'IA : la méthode complète pour décortiquer un cahier des charges en 20 minutes',
    seoTitle: 'Analyse CCTP avec IA : méthode en 20 minutes',
    description:
      'Cinq étapes pour lire un CCTP dense : PDF, prompts, normes, risques, croisement BPU. Formation AO Qualiopi ; Constructys. Voir la méthode.',
    date: '2026-04-10',
    dateModified: '2026-04-10',
    keywords: [
      'analyse CCTP IA',
      'CCTP appel d\'offres BTP',
      'ChatGPT CCTP',
      'analyse DCE BTP',
      'cahier des charges BTP',
      'mémoire technique CCTP',
      'formation IA pour les pros du BTP',
      'Constructys formation',
      'intelligence artificielle marchés publics',
      'DTU NF CCTP',
    ],
    sections: [
      {
        type: 'definition',
        title: 'En bref',
        content:
          'Un CCTP de plusieurs dizaines de pages se lit souvent en 2 à 4 heures à la main. Avec une IA générative et des prompts calibrés pour le BTP, vous pouvez obtenir en moins de 20 minutes une synthèse structurée, l’extraction des clauses critiques et une liste de risques — à compléter par votre relecture métier. Cette méthode en cinq étapes est issue des formations animées avec la FFB Île-de-France, la FFB Grand Paris et la CSFE ; elle est reproductible dès le premier essai, sans compétence informatique particulière.',
      },
      {
        type: 'paragraph',
        title: 'Qu’est-ce qu’un CCTP et pourquoi son analyse est si critique ?',
        content:
          'Le CCTP (cahier des clauses techniques particulières) est le document central de nombreux appels d’offres BTP. Il décrit les exigences techniques du maître d’ouvrage : matériaux, normes (NF, DTU, Eurocodes), niveaux de qualité, conditions d’exécution par lot. C’est sur cette base que vous chiffrez et rédigez votre mémoire technique : une exigence manquée peut faire basculer la marge ou l’admissibilité de votre offre.',
      },
      {
        type: 'paragraph',
        title: 'La réalité du terrain',
        content:
          'Un CCTP courant compte souvent entre 30 et 150 pages. Sur les marchés publics volumineux, le DCE complet (CCTP, CCAP, règlement de consultation, plans, annexes) dépasse fréquemment 400 à 500 pages. Beaucoup de chargés d’affaires et de conducteurs de travaux lisent le CCTP de façon linéaire : efficace pour se faire une culture du projet, moins pour repérer vite les points qui impactent chiffrage et risques.',
      },
      {
        type: 'list',
        title: 'Trois erreurs qui coûtent cher',
        content: [
          'Oublier une exigence technique — une norme ou un DTU cité loin dans le document, absent du mémoire et du chiffrage : travaux supplémentaires non prévus, marge grignotée.',
          'Sous-estimer une clause de pénalité — pénalités de retard ou de non-conformité dans le CCAP ou pièces jointes : surprise en fin de chantier si l’analyse n’a pas croisé les pièces.',
          'Manquer une incohérence entre pièces — matériau au CCTP absent du bordereau, quantités contradictoires : litige ou avenant défavorable.',
        ],
      },
      {
        type: 'paragraph',
        title: 'Ce que l’IA change concrètement dans l’analyse d’un CCTP',
        content:
          'L’usage pertinent de l’IA n’est pas de « déléguer » la décision : c’est un travail collaboratif. L’IA trie, structure et extrait des informations dans un volume important en quelques minutes ; vous concentrez votre expertise sur les points à arbitrer, à chiffrer et à sécuriser contractuellement.',
      },
      {
        type: 'list',
        title: 'Ce que l’IA sait faire sur un CCTP (avec un PDF exploitable)',
        content: [
          'Produire une synthèse thématique du CCTP ou d’extraits pertinents',
          'Extraire normes, certifications et références (NF, DTU, RE2020, labels)',
          'Aider à repérer des clauses à risque : pénalités, résiliation, obligations inhabituelles',
          'Soutenir un recoupement entre CCTP et autres pièces du DCE chargées dans le même fil',
          'Générer une checklist d’exigences pour alimenter mémoire technique et revue interne',
        ],
      },
      {
        type: 'paragraph',
        title: 'Ce que l’IA ne remplace pas',
        content:
          'Elle ne valide pas vos prix ni vos marges, ne connaît pas vos contraintes internes et n’engage pas votre entreprise. Vous restez responsable de chaque engagement dans l’offre et de la cohérence avec votre retour d’expérience terrain.',
      },
      {
        type: 'list',
        title: 'La méthode en cinq étapes',
        content: [
          'Étape 1 — Charger le CCTP (et si besoin le CCAP, le RC, le BPU) dans l’outil : privilégier un PDF texte ; si le document est un scan image, passer par un OCR avant analyse. Ne pas charger de données sensibles dans un chat grand public : privilégier des offres entreprise ou des solutions adaptées au niveau de confidentialité.',
          'Étape 2 — Demander une synthèse structurée (objet, lots, matériaux, normes, délais, contraintes d’exécution, points inhabituels) : voir les prompts ci-dessous.',
          'Étape 3 — Extraire les exigences du lot qui vous concerne avec références, niveau d’obligation et impact chiffrage estimatif.',
          'Étape 4 — Lancer une analyse des risques (pénalités, exigences lourdes, travaux implicites, contradictions entre pièces) et des questions à poser au maître d’ouvrage.',
          'Étape 5 — Croiser CCTP et bordereau de prix pour repérer postes non chiffrés, quantités douteuses ou prestations implicites.',
        ],
      },
      {
        type: 'paragraph',
        title: 'Étape 1 : charger les pièces et sécuriser la confidentialité',
        content:
          'Téléversez le CCTP en PDF dans l’outil. Si le DCE comprend plusieurs pièces, les regrouper dans une même conversation aide les recoupements — sous réserve des limites techniques du modèle (taille de fichier, nombre de documents). Vérifiez que le PDF est recherchable : sur un scan image, utilisez un OCR (logiciel bureautique, outil en ligne selon votre politique de sécurité, solutions françaises selon le contexte). Pour les données sensibles, évitez le simple ChatGPT grand public : orientez-vous vers des offres Team / entreprise ou des acteurs avec politique adaptée ; c’est un des volets travaillé en formation.',
      },
      {
        type: 'paragraph',
        title: 'Étape 2 à 5 : prompts prêts à l’emploi',
        content:
          'Les blocs suivants reprennent les consignes détaillées pour la synthèse, l’analyse par lot, les risques et le croisement avec le bordereau. Copiez-les, adaptez le numéro de lot et rechargez vos pièces si nécessaire.',
      },
      {
        type: 'prompts',
        title: 'Prompts pour analyser un CCTP avec l’IA',
        content: [
          {
            titre: 'Synthèse structurée du CCTP',
            prompt:
              'Analyse ce CCTP et produis une synthèse structurée avec :\n1. L’objet du marché et les lots concernés\n2. Les matériaux et procédés imposés\n3. Les normes et certifications exigées (NF, DTU, Eurocodes, labels)\n4. Les délais, phasage et contraintes d’intervention\n5. Les conditions particulières d’exécution (accès, nuisances, co-activité)\n6. Les points que tu considères inhabituels ou contraignants\n\nTon : technique et factuel. Si une information est absente du document, indique-le explicitement.',
            usage: 'Vue d’ensemble avant d’approfondir un lot précis.',
          },
          {
            titre: 'Exigences techniques par lot (tableau)',
            prompt:
              'Pour le lot [numéro et intitulé du lot], liste toutes les exigences techniques avec pour chacune :\n- La référence exacte dans le document (page et article si disponible)\n- La norme ou le DTU associé si mentionné\n- Le niveau de conformité : obligation absolue ou recommandation\n- L’impact estimé sur le chiffrage : faible / moyen / fort\n\nFormat : tableau à quatre colonnes.',
            usage: 'Remplacez le lot par le vôtre ; vérifiez les références page à la main.',
          },
          {
            titre: 'Risques et points de vigilance',
            prompt:
              'Analyse ce CCTP sous l’angle des risques pour une entreprise soumissionnaire. Identifie et classe par niveau de risque (élevé / moyen / faible) :\n1. Les clauses de pénalité (retard, non-conformité, sous-traitance)\n2. Les exigences inhabituelles ou difficiles à tenir (techniques, délais, certifications)\n3. Les postes susceptibles de générer des travaux supplémentaires non prévus\n4. Les contradictions entre le CCTP et les autres pièces du DCE\n5. Les obligations implicites non chiffrées dans le bordereau\n\nPour chaque risque identifié, propose une question à poser au maître d’ouvrage lors de la visite de site ou via une demande de précision formelle.',
            usage: 'À croiser avec votre jugement métier et le CCAP.',
          },
          {
            titre: 'Croisement CCTP et bordereau de prix',
            prompt:
              'Compare les exigences techniques du CCTP avec les lignes du bordereau de prix (BPU ou DQE) fourni dans cette conversation.\nIdentifie :\n1. Les postes du CCTP qui ne correspondent à aucune ligne du bordereau\n2. Les quantités qui semblent incohérentes entre les deux documents\n3. Les prestations implicites décrites dans le CCTP mais non chiffrées\n4. Les matériaux spécifiés dans le CCTP absents du bordereau\n\nFormat : liste structurée avec références aux pages sources.',
            usage: 'Chargez le BPU dans le même fil lorsque l’outil le permet.',
          },
          {
            titre: 'Comparer deux versions d’un CCTP (DCE modificatif)',
            prompt:
              'Voici deux versions du CCTP [version initiale et addendum].\nCompare-les et liste uniquement les modifications apportées dans la version 2 : nouvelles exigences, suppressions, modifications de quantités ou de normes.\nFormat : tableau avec colonnes « Avant » / « Après » / « Impact chiffrage ».',
            usage: 'Joignez les deux fichiers ou textes complets.',
          },
          {
            titre: 'Questions pour visite de site ou demande de précision',
            prompt:
              'À partir de ce CCTP, génère la liste des questions à poser lors de la visite de site ou à envoyer au maître d’ouvrage avant remise de l’offre.\nClasse les questions par thème : technique, planning, co-activité, accès chantier, sous-traitance.\nFormule chaque question de manière formelle, prête à être intégrée dans une demande de précision officielle.',
            usage: 'Relisez avant envoi ; adaptez au contexte local.',
          },
          {
            titre: 'Plan de mémoire technique à partir du CCTP',
            prompt:
              'À partir des exigences de ce CCTP, génère le plan du mémoire technique pour le lot [X] avec pour chaque section :\n- Le titre de la section\n- Les points à aborder obligatoirement (issus du CCTP)\n- Les arguments différenciants à valoriser (selon les critères de sélection du règlement de consultation)',
            usage: 'Indiquez le lot et les critères issus du RC.',
          },
        ],
      },
      {
        type: 'html',
        title: 'Gains de temps mesurés sur le terrain (indicatifs)',
        content: `<p class="mb-4">Ordres de grandeur issus des retours de participants aux formations IA appliquées au bâtiment (FFB Île-de-France, FFB Grand Paris, CSFE). Les durées varient selon la complexité du lot et la qualité du PDF.</p>
<table>
<caption>Temps d’analyse CCTP / DCE — avant / après IA (à titre indicatif)</caption>
<thead><tr><th scope="col">Tâche</th><th scope="col">Sans IA</th><th scope="col">Avec IA</th><th scope="col">Gain</th></tr></thead>
<tbody>
<tr><td>Lecture / synthèse d’un CCTP d’environ 80 pages</td><td>2 à 4 h</td><td>15 à 20 min</td><td>environ −85 %</td></tr>
<tr><td>Extraction des normes et DTU</td><td>45 à 60 min</td><td>3 à 5 min</td><td>environ −90 %</td></tr>
<tr><td>Identification des risques</td><td>1 à 2 h</td><td>5 à 10 min</td><td>environ −85 %</td></tr>
<tr><td>Vérification croisée CCTP / BPU</td><td>1 à 2 h</td><td>10 à 15 min</td><td>environ −80 %</td></tr>
<tr><td><strong>Analyse complète d’un DCE (ordre de grandeur)</strong></td><td><strong>5 à 9 h</strong></td><td><strong>30 à 50 min</strong></td><td><strong>environ −85 % en moyenne</strong></td></tr>
</tbody>
</table>
<p class="mt-4">Ces gains supposent des prompts adaptés au BTP et une validation humaine systématique.</p>`,
      },
      {
        type: 'paragraph',
        title: 'Quelle IA choisir pour analyser un CCTP ?',
        content:
          'ChatGPT Plus ou Team lit souvent bien les PDF et convient pour démarrer. Claude est en pratique très utile sur des textes longs et des formulations denses. Mistral et d’autres acteurs français peuvent être pertinents lorsque l’enjeu de souveraineté ou de confidentialité est fort. NotebookLM (Google) peut aider à interroger un corpus de documents en phase de réponse. Le bon outil dépend de vos contraintes : taille des fichiers, nombre de pièces, politique de données — thème abordé en formation.',
      },
      {
        type: 'paragraph',
        title: 'Au-delà de l’analyse : workflow de réponse aux appels d’offres',
        content:
          'Une fois le CCTP structuré, les mêmes principes servent la rédaction du mémoire technique, la préparation du chiffrage (repérage des postes à risque), la checklist des pièces administratives et les demandes de précision au maître d’ouvrage. Les modules « appels d’offres » des formations OFC couvrent ces enchaînements sur documents réels.',
      },
      {
        type: 'faq',
        title: 'Questions fréquentes',
        content: [
          'Quelle IA utiliser pour analyser un CCTP ? — ChatGPT Plus et Claude sont souvent les plus simples pour démarrer avec des PDF volumineux. Pour des données sensibles, orientez-vous vers des offres adaptées (entreprise, hébergement européen). La formation aide à trancher selon votre contexte.',
          'Peut-on s’appuyer sur ChatGPT gratuit ? — Possible pour des essais courts, avec limites : chargement de PDF, fenêtre de contexte, politique de confidentialité. Pour un usage professionnel régulier sur des DCE, une offre payante ou entreprise est en général plus adaptée.',
          'L’IA remplace-t-elle le chargé d’affaires ? — Non. Elle accélère la lecture et l’extraction ; le métier reste indispensable sur la faisabilité, le prix, la stratégie de réponse et la relation avec le maître d’ouvrage.',
          'Combien de temps pour analyser un CCTP avec l’IA ? — Avec la méthode en cinq étapes et des PDF exploitables, comptez souvent 20 à 50 minutes pour un CCTP d’environ 80 pages selon la complexité, plus votre temps de relecture.',
          'La formation IA appliquée au bâtiment est-elle financement possible selon éligibilité (Constructys) ? — Les actions certifiées Qualiopi d’OFC Création d’Entreprise peuvent être financées dans le cadre du plan de développement des compétences selon les règles Constructys et votre situation (plafonds, dont le plafond couramment cité de 24 € HT par heure et par stagiaire pour le coût pédagogique — à confirmer au moment du dossier). Les très petites entreprises disposent aussi de règles spécifiques sur la prise en charge des frais de salaires (par exemple 15 € HT par heure et par stagiaire dans les cas prévus par la branche).',
          'Comment monter un dossier Constructys ? — Le dossier se dépose sur eGestion ; un délai minimum de quinze jours avant le début de l’action est habituellement requis. Je vous guide sur le programme et les pièces — prenez rendez-vous pour un premier échange.',
        ],
      },
      {
        type: 'paragraph',
        title: 'Se former à l’analyse de CCTP avec l’IA',
        content:
          `OFC Création d'Entreprise propose une formation IA pour le BTP de 4 heures, certifiée Qualiopi, avec un module appels d'offres et analyse de DCE : méthode en cinq étapes sur vos documents, prompts personnalisés selon votre corps de métier, confidentialité et choix d'outil. Sessions en présentiel en Île-de-France ; formations intra dans vos locaux sur devis. Partenaires et références : FFB Grand Paris, FFB Île-de-France (78, 91, 95), FFB Île-de-France Est, CSFE, CNAM Entreprise. Plus de ${formatProfessionalsTrainedCount()} professionnels formés, note ${SOCIAL_PROOF.AVERAGE_RATING}.`,
      },
      {
        type: 'html',
        title: 'Cluster appels d’offres',
        content: clusterMaillageHtmlSection({
          lateralHref: AO_DCE_CLUSTER_BLOG.notebooklm,
          lateralTitle: 'Analyse DCE avec NotebookLM et Claude',
          lateralDescription: 'critères, CCAP et synthèse sur PDF volumineux',
        }),
      },
      {
        type: 'cta',
        content:
          'Formation IA appels d’offres BTP : analyser un DCE, mémoire technique, méthode terrain. Financement selon éligibilité Constructys — échange gratuit pour cadrer votre besoin.',
        formationHref: LINKS.formationAO,
      },
    ],
    relatedSlugs: [
      'formation-ia-cctp-analyse-dce-btp',
      'analyser-ccap-ia-btp',
      'analyse-dce-notebooklm-claude-btp',
      'chiffrage-cctp-bpu-appels-offres-btp',
      'financer-formation-ia-btp-constructys',
    ],
  },
  {
    slug: 'memoire-technique-btp-exemple',
    seoTitle: 'Mémoire technique BTP : structure et exemples',
    title: 'Exemple de mémoire technique BTP : structure et bonnes pratiques',
    description:
      'Structure type de mémoire : entreprise, méthode, moyens ; première passe IA puis validation terrain. Qualiopi, Constructys. Diagnostic gratuit 30 min.',
    date: '2025-03-16',
    keywords: ['mémoire technique BTP', 'exemple mémoire technique', 'réponse appel d\'offre BTP', 'structure mémoire technique'],
    sections: [
      {
        type: 'definition',
        title: 'En bref',
        content: 'Le mémoire technique présente votre méthodologie, vos moyens et vos références pour réaliser le projet. Il est souvent le critère le plus pondéré. Une structure claire et des arguments adaptés au cahier des charges font la différence. L\'IA peut générer un plan et assister la rédaction.',
      },
      {
        type: 'list',
        title: 'Structure d\'un mémoire technique',
        content: [
          "Présentation de l'entreprise et références",
          "Compréhension du projet et méthodologie",
          "Moyens humains et matériels",
          "Planification et organisation",
          "Engagements et points de vigilance",
        ],
      },
      {
        type: 'paragraph',
        title: 'Critères évalués',
        content: "Le jury note la clarté, l'adéquation à l'appel d'offres, la cohérence des arguments. Chaque rubrique doit répondre explicitement aux critères du règlement. Adaptez le vocabulaire au maître d'ouvrage.",
      },
      {
        type: 'html',
        title: 'Erreurs fréquentes',
        content: `<p class="text-slate-600 leading-relaxed">Mémoire trop générique, oubli de critères, texte illisible ou trop long. Les PME manquent souvent de temps pour soigner la rédaction. L'IA permet de produire des premières versions à personnaliser. La méthode produit est sur <a href="${LINKS.iaMemoireTechnique}" class="text-[var(--accent)] font-medium underline">IA mémoire technique BTP</a> ; en amont du mémoire, <a href="${LINKS.blogAnalyserCctpMethode20Min}" class="text-[var(--accent)] font-medium underline">analyser un CCTP en 20 minutes</a> structure mieux votre argumentaire.</p>`,
      },
      {
        type: 'prompts',
        title: 'Prompts pour rédiger un mémoire technique avec l\'IA',
        content: [
          {
            titre: 'Plan de mémoire technique',
            prompt:
              "Propose un plan de mémoire technique pour un appel d'offres [TYPE DE PROJET : VRD, second œuvre, réhabilitation...]. Critères à respecter : [LISTER LES CRITÈRES DU RÈGLEMENT]. Structure : présentation entreprise, méthodologie, moyens, planification, engagements.",
            usage: 'Adaptez au type de chantier. Base pour structurer votre rédaction.',
          },
          {
            titre: 'Rédaction section méthodologie',
            prompt:
              "Rédige la section « Méthodologie » d'un mémoire technique pour [VOTRE LOT]. Contexte : [BRIEF DU PROJET]. Inclure : phases de travail, points de vigilance, adaptation au CCTP. Ton professionnel, 3-4 paragraphes.",
            usage: "Fournissez vos éléments. L'IA structure et reformule.",
          },
          {
            titre: 'Valorisation des références',
            prompt:
              "Reformule ces références chantiers en format professionnel pour un mémoire technique : [VOS RÉFÉRENCES]. Mettre en avant les chantiers similaires, les volumes, les maîtres d'ouvrage. Format bullet points ou paragraphes courts.",
            usage: 'Transformez vos notes en argumentaire convaincant.',
          },
        ],
      },
      {
        type: 'cta',
        content: 'Formation IA pour rédiger vos mémoires techniques plus vite. Qualiopi · Constructys.',
      },
    ],
    relatedSlugs: [
      'analyser-cctp-ia-methode-complete-20-minutes',
      'repondre-appel-offre-travaux',
      'analyse-dce-notebooklm-claude-btp',
    ],
  },
  {
    slug: 'repondre-appel-offre-travaux',
    seoTitle: 'Répondre à un AO travaux : guide PME BTP',
    title: 'Comment répondre à un appel d\'offre travaux : guide pour les PME du BTP',
    description:
      'Éligibilité, DCE, critères, dossier, relecture : checklist avant dépôt ; l’IA accélère l’analyse si cadrée. Qualiopi, Constructys. Voir la méthode.',
    date: '2025-03-16',
    keywords: ['répondre appel d\'offre travaux', 'appel d\'offre BTP', 'DCE BTP', 'constitution dossier AO'],
    sections: [
      {
        type: 'definition',
        title: 'En bref',
        content: "Répondre à un appel d'offre travaux implique d'analyser le DCE, constituer le dossier (formulaires, pièces, mémoire technique) et respecter les délais. Une méthodologie structurée et l'IA peuvent diviser par 5 le temps d'analyse.",
      },
      {
        type: 'list',
        title: 'Les étapes de réponse',
        content: [
          "Vérifier l'éligibilité (lots, critères d'exclusion)",
          "Analyser le DCE et le CCTP pour votre lot",
          "Identifier les critères de sélection et leur pondération",
          "Constituer le dossier (formulaires, attestations, mémoire)",
          "Relire et vérifier avant dépôt",
        ],
      },
      {
        type: 'paragraph',
        title: 'Analyse du DCE',
        content: "Le DCE contient le règlement, le CCTP, les pièces écrites, les plans. Priorisez les sections qui concernent votre lot. L'IA peut synthétiser les exigences en quelques minutes à partir d'extraits.",
      },
      {
        type: 'html',
        title: 'Rôle du mémoire technique',
        content: `<p class="text-slate-600 leading-relaxed">Le mémoire technique est souvent le critère le plus important. Il valorise votre expertise et démontre votre capacité à réaliser le projet. Soignez la structure et l'argumentaire. Pour une session structurée, voir la <a href="${LINKS.formationAO}" class="text-[var(--accent)] font-medium underline">formation IA appels d'offres BTP</a> ; la méthode complète est dans le <a href="${LINKS.blogIaMemoireTechniqueAppelOffresGuide2026}" class="text-[var(--accent)] font-medium underline">guide mémoire technique BTP avec l'IA</a>.</p>`,
      },
      {
        type: 'prompts',
        title: 'Prompts pour répondre à un appel d\'offre travaux',
        content: [
          {
            titre: 'Checklist éligibilité',
            prompt:
              "À partir de ce règlement de consultation, liste : 1) les critères d'exclusion (ce qui élimine automatiquement) ; 2) les pièces obligatoires à fournir ; 3) les délais clés (dépôt, ouverture). Format checklist exploitable.",
            usage: "Collez l'extrait pertinent. Évitez les dossiers incomplets.",
          },
          {
            titre: 'Synthèse multi-sections DCE',
            prompt:
              "J'ai extrait les sections suivantes de mon DCE : [COLLER EXTRAITS]. Synthétise en une fiche unique : exigences techniques, critères de sélection pondérés, délais, points de vigilance pour mon lot [VOTRE LOT]. Priorise les éléments à traiter en premier.",
            usage: 'Consolidez votre analyse. Gain de temps sur les DCE longs.',
          },
          {
            titre: 'Structure dossier de candidature',
            prompt:
              "Propose un plan de constitution du dossier pour cet appel d'offres. Lot concerné : [VOTRE LOT]. Inclure : formulaire, pièces administratives, mémoire technique, annexes. Checklist avec statut (à faire / fait) et ordre recommandé.",
            usage: "Pour ne rien oublier avant la date limite.",
          },
        ],
      },
      {
        type: 'cta',
        content: 'Formation IA appels d\'offres BTP — 4 h opérationnelles. financement possible selon éligibilité.',
      },
    ],
    relatedSlugs: [
      'analyser-cctp-ia-methode-complete-20-minutes',
      'memoire-technique-btp-exemple',
      'analyse-dce-notebooklm-claude-btp',
    ],
  },
];

function loadGeneratedArticles(): BlogArticle[] {
  const dir = join(process.cwd(), 'content', 'generated');
  if (!existsSync(dir)) return [];
  try {
    const files = readdirSync(dir).filter(
      (f) => f.startsWith('article-') && f.endsWith('.json')
    );
    return files.map((f) => {
      const raw = readFileSync(join(dir, f), 'utf-8');
      const a = JSON.parse(raw) as BlogArticle & { internalLinks?: unknown };
      return {
        slug: a.slug,
        title: a.title,
        description: a.description,
        date: a.date,
        keywords: a.keywords ?? [],
        sections: a.sections ?? [],
        relatedSlugs: a.relatedSlugs ?? [],
        ...(a.seoTitle ? { seoTitle: a.seoTitle } : {}),
        ...(a.dateModified ? { dateModified: a.dateModified } : {}),
        ...(a.faq?.length ? { faq: a.faq } : {}),
        ...(a.coverImage ? { coverImage: a.coverImage } : {}),
      };
    });
  } catch {
    return [];
  }
}

/** Catégories du blog — tri et filtrage */
export const BLOG_CATEGORIES = {
  devis: 'Devis & chiffrage',
  'appels-offres': 'Appels d\'offres',
  financement: 'Financement OPCO',
  chatgpt: 'ChatGPT & bonnes pratiques',
  metiers: 'IA par métier',
  rh: 'RH & recrutement',
  productivite: 'Productivité & emails',
} as const;

export type BlogCategoryId = keyof typeof BLOG_CATEGORIES;

/** Liens commerciaux contextuels — 4–5 pages par article, ancres SEO variées */
export function getCommercialLinksForArticle(slug: string): { href: string; label: string }[] {
  const cat = getArticleCategory(slug);
  const links: { href: string; label: string }[] = [];
  // Base : formations + RDV sur tous les articles
  links.push({ href: INTERNAL_LINKS.formations.path, label: getAnchor('formations') });
  links.push({ href: INTERNAL_LINKS.prendreRdv.path, label: getAnchor('prendreRdv') });
  if (slug === 'formation-ia-cctp-analyse-dce-btp') {
    links.splice(2, 0, {
      href: LINKS.formationAO,
      label: getAnchor('appelsOffres', 0),
    });
  }
  switch (cat) {
    case 'financement':
      links.push({
        href: INTERNAL_LINKS.financementConstructys.path,
        label: getAnchor('financementConstructys'),
      });
      break;
    case 'devis':
      links.push(
        { href: INTERNAL_LINKS.iaDevis.path, label: getAnchor('iaDevis') },
        { href: INTERNAL_LINKS.diagnostic.path, label: getAnchor('diagnostic') },
      );
      break;
    case 'appels-offres':
      links.push(
        { href: INTERNAL_LINKS.appelsOffres.path, label: getAnchor('appelsOffres') },
        { href: INTERNAL_LINKS.iaConducteur.path, label: getAnchor('iaConducteur') },
      );
      break;
    case 'rh':
      links.push(
        { href: LINKS.formations, label: 'catalogue formations IA pour le BTP' },
        { href: INTERNAL_LINKS.diagnostic.path, label: getAnchor('diagnostic') },
      );
      break;
    case 'productivite':
      links.push(
        { href: INTERNAL_LINKS.iaDevis.path, label: getAnchor('iaDevis', 1) },
        { href: INTERNAL_LINKS.chatgptArtisans.path, label: getAnchor('chatgptArtisans') },
        { href: INTERNAL_LINKS.checklist.path, label: getAnchor('checklist') },
      );
      break;
    case 'metiers':
      links.push(
        { href: LINKS.formationConducteurTravaux, label: 'formation IA conducteur de travaux BTP' },
        { href: INTERNAL_LINKS.chatgptArtisans.path, label: getAnchor('chatgptArtisans') },
        { href: INTERNAL_LINKS.iaDevis.path, label: getAnchor('iaDevis') },
      );
      break;
    default:
      links.push(
        { href: INTERNAL_LINKS.chatgptArtisans.path, label: getAnchor('chatgptArtisans') },
        { href: INTERNAL_LINKS.diagnostic.path, label: getAnchor('diagnostic') },
      );
  }
  const seen = new Set<string>();
  return links.filter((link) => {
    if (seen.has(link.href)) return false;
    seen.add(link.href);
    return true;
  });
}

/** Détermine la catégorie d'un article à partir du slug */
export function getArticleCategory(slug: string): BlogCategoryId {
  const s = slug.toLowerCase();
  if (s.includes('cours-gratuits-claude')) return 'chatgpt';
  if (s.includes('appels-d-offres') || s.includes('appels-offres') || s.includes('cctp') || s.includes('ccap') || s.includes('memoire-reclamation') || s.includes('reclamation-btp') || s.includes('memoire-technique') || s.includes('repondre-appel') || s.includes('analyse-dce')) return 'appels-offres';
  if (s.includes('financement') || s.includes('financer-formation') || s.includes('formation-ia-btp-ce-qu-il') || s.includes('intra-btp-constructys') || s.includes('dossier-constructys')) return 'financement';
  if (s.includes('recrutement')) return 'rh';
  if (s.includes('conducteur-travaux-usages')) return 'metiers';
  if (s.includes('conducteurs-travaux') || s.includes('comment-ia-gagne-5h-conducteurs')) return 'metiers';
  if (s.includes('conducteur-travaux')) return 'appels-offres';
  if (s.includes('formation-ia-artisans-batiment-programme')) return 'metiers';
  if (s.includes('7-cas-usage-ia-btp') || s.includes('5-assistants-ia-btp')) return 'metiers';
  if (s.includes('guide-claude-ia-btp') || s.includes('mcp-claude-model')) return 'metiers';
  if (s.includes('prompts-linkedin-btp')) return 'productivite';
  if (s.includes('adoption-ia-btp') || s.includes('ia-btp-2026')) return 'metiers';
  if (s.includes('garage-automobile') || s.includes('garage-auto')) return 'metiers';
  if (s.includes('gagner-temps-devis') || s.includes('devis-ia')) return 'devis';
  if (s.includes('avis-google') || s.includes('organisation-chantier') || s.includes('planning-chantier')) return 'productivite';
  if (s.includes('compte-rendu') || s.includes('cr-chantier') || s.includes('doe') || s.includes('pv-reception')) return 'productivite';
  if (s.includes('emails') || s.includes('automatiser-vos') || s.includes('emails-clients')) return 'productivite';
  if (s.includes('devis') || s.includes('ia-devis')) return 'devis';
  if (s.includes('peintre') || s.includes('peinture')) return 'metiers';
  if (s.includes('ia-et-') || s.includes('remplacer-les')) return 'metiers';
  if (s.includes('confidentialite-donnees') || s.includes('securite-donnees-chatgpt')) return 'chatgpt';
  return 'chatgpt'; // défaut : ChatGPT & bonnes pratiques
}

/** Articles liés pour maillage interne — relatedSlugs en priorité, complété par même catégorie */
export function getRelatedArticlesForDisplay(slug: string, limit = 6, extraRelatedSlugs?: string[]): BlogArticle[] {
  const all = getAllArticles();
  const current = all.find((a) => a.slug === slug);
  const cat = getArticleCategory(slug);
  const used = new Set<string>([slug]);
  const result: BlogArticle[] = [];
  const seenPriority = new Set<string>();
  const prioritySlugs = [...(extraRelatedSlugs ?? []), ...(current?.relatedSlugs ?? [])];
  for (const s of prioritySlugs) {
    if (seenPriority.has(s)) continue;
    seenPriority.add(s);
    const resolved = resolvePublishableRelatedSlug(s);
    if (isBlogListingExcludedSlug(resolved)) continue;
    const a = all.find((x) => x.slug === resolved);
    if (a && !used.has(a.slug)) {
      result.push(a);
      used.add(a.slug);
    }
  }
  // Compléter avec articles de la même catégorie
  const sameCategory = all.filter((a) => getArticleCategory(a.slug) === cat && !used.has(a.slug));
  for (const a of sameCategory) {
    if (result.length >= limit) break;
    result.push(a);
    used.add(a.slug);
  }
  // Si encore de la place : autres catégories proches
  const otherCategory = getArticleCategory(slug) === 'devis' ? 'chatgpt' : 'devis';
  if (result.length < limit) {
    const others = all.filter(
      (a) => getArticleCategory(a.slug) === otherCategory && !used.has(a.slug)
    );
    for (const a of others) {
      if (result.length >= limit) break;
      result.push(a);
      used.add(a.slug);
    }
  }
  return result.slice(0, limit);
}

/**
 * Slugs affichés en tête de /blog (« À la une »), dans l’ordre.
 * Retirer un slug de cette liste le remet uniquement dans les blocs par catégorie.
 */
export const BLOG_FEATURED_SLUGS: string[] = [
  'ia-memoire-technique-appel-offres-guide-2026',
];

/** Articles mis en avant (résolus depuis le catalogue ; slug inconnu ignoré) */
export function getFeaturedBlogArticles(): BlogArticle[] {
  const bySlug = new Map(getAllArticles().map((a) => [a.slug, a]));
  return BLOG_FEATURED_SLUGS.map((s) => bySlug.get(s)).filter(
    (a): a is BlogArticle => a !== undefined
  );
}

/** Exclut les slugs donnés (évite doublon avec la zone « À la une ») */
export function excludeArticlesBySlug(
  articles: BlogArticle[],
  slugs: Set<string>
): BlogArticle[] {
  return articles.filter((a) => !slugs.has(a.slug));
}

/** Articles groupés par catégorie */
export function getArticlesByCategory(): Record<BlogCategoryId, BlogArticle[]> {
  const articles = getAllArticles();
  const grouped = Object.fromEntries(
    (Object.keys(BLOG_CATEGORIES) as BlogCategoryId[]).map((id) => [id, [] as BlogArticle[]])
  ) as Record<BlogCategoryId, BlogArticle[]>;
  for (const a of articles) {
    const cat = getArticleCategory(a.slug);
    grouped[cat].push(a);
  }
  return grouped;
}

/** Fusionne les entrées MDX (`content/blog/*.mdx`) : remplace ou ajoute par slug. */
function mergeMdxIntoArticles(articles: BlogArticle[]): BlogArticle[] {
  const map = new Map(articles.map((a) => [a.slug, a]));
  for (const slug of getAllMdxBlogSlugs()) {
    const fm = getMdxFrontmatter(slug);
    if (!fm) continue;
    map.set(slug, mdxFrontmatterToBlogArticle(fm));
  }
  return [...map.values()].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** Résout un slug « lié » vers le pilier publiable (redirections blog connues). */
function resolvePublishableRelatedSlug(slug: string): string {
  const map = getBlogRelatedSlugRedirectMap();
  let current = slug;
  const visited = new Set<string>();
  while (map.has(current) && !visited.has(current)) {
    visited.add(current);
    current = map.get(current)!;
  }
  return current;
}

let blogRelatedSlugRedirectMap: Map<string, string> | null = null;

function getBlogRelatedSlugRedirectMap(): Map<string, string> {
  if (blogRelatedSlugRedirectMap) return blogRelatedSlugRedirectMap;
  blogRelatedSlugRedirectMap = new Map();
  const add = (source: string, destination: string) => {
    if (!source.startsWith('/blog/') || !destination.startsWith('/blog/')) return;
    blogRelatedSlugRedirectMap!.set(
      source.slice('/blog/'.length),
      destination.slice('/blog/'.length)
    );
  };
  for (const r of gscRedirects2026April()) add(r.source, r.destination);
  for (const r of blogConsolidationRedirectsJuly2026()) add(r.source, r.destination);
  return blogRelatedSlugRedirectMap;
}

export { BLOG_CONSOLIDATED_REDIRECTED_SLUGS } from '@/lib/blog-publishable-filters';

/** Tous les articles publiables : statiques + générés + MDX, filtrés (sans doublons suffixe ni slugs redirigés). */
export function getAllArticles(): BlogArticle[] {
  const generated = loadGeneratedArticles();
  const staticSlugs = new Set(BLOG_ARTICLES.map((a) => a.slug));
  const generatedFiltered = generated.filter((a) => !staticSlugs.has(a.slug));
  const merged = mergeMdxIntoArticles([...BLOG_ARTICLES, ...generatedFiltered]);
  return filterPublishableBlogArticles(merged);
}

export function getArticle(slug: string): BlogArticle | undefined {
  return getAllArticles().find((a) => a.slug === slug);
}

export function getAllSlugs(): string[] {
  return getAllArticles().map((a) => a.slug);
}
