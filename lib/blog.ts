/**
 * Blog / Ressources — Articles SEO pour formation IA BTP
 * Fusionne les articles statiques + générés (content/generated/)
 */

import { readdirSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

export interface BlogArticle {
  slug: string;
  title: string;
  description: string;
  date: string;
  keywords: string[];
  sections: {
    type: 'paragraph' | 'definition' | 'list' | 'faq' | 'cta';
    content: string | string[];
    title?: string;
  }[];
  relatedSlugs?: string[];
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: 'financer-formation-ia-btp-constructys',
    title: 'Comment financer sa formation IA BTP avec Constructys',
    description:
      'Guide complet : financement Constructys à 100% pour votre formation IA BTP. Plan de développement des compétences, OPCO, démarches.',
    date: '2026-03-10',
    keywords: ['financement Constructys', 'formation IA BTP', 'OPCO', 'Plan développement compétences'],
    sections: [
      {
        type: 'definition',
        title: 'En bref',
        content:
          "Constructys est l'OPCO (Opérateur de Compétences) dédié au secteur de la construction. Il finance les formations des salariés et dirigeants du BTP dans le cadre du Plan de Développement des Compétences. Pour une formation IA BTP certifiée Qualiopi, la prise en charge peut atteindre 100% du coût pédagogique.",
      },
      {
        type: 'paragraph',
        content:
          "En 2026, les entreprises du BTP de moins de 50 salariés peuvent faire financer intégralement leur formation à l'intelligence artificielle par Constructys. Laure Olivié propose des formations IA certifiées Qualiopi, éligibles à ce dispositif.",
      },
      {
        type: 'paragraph',
        title: 'Quelles formations sont éligibles ?',
        content:
          "Toutes les formations IA pour le BTP de Laure Olivié sont certifiées Qualiopi et éligibles au financement Constructys : « L'IA au service du BTP », formation appels d'offres, IA pour la fonction RH, IA & Travaux Publics. Le coût pédagogique est pris en charge à hauteur de 24€ HT/heure/stagiaire.",
      },
      {
        type: 'list',
        title: 'Les étapes pour faire financer votre formation',
        content: [
          "Identifier votre OPCO : pour le BTP, c'est généralement Constructys.",
          "Contacter Laure Olivié pour un devis personnalisé avec le code formation.",
          "Transmettre le devis à votre OPCO ou à votre service formation.",
          "Obtenir l'accord de prise en charge avant le démarrage de la formation.",
          "Suivre la formation. L'OPCO règle directement l'organisme.",
        ],
      },
      {
        type: 'faq',
        title: 'Questions fréquentes',
        content: [
          "Quelle est la différence entre Constructys et les autres OPCO ? — Constructys est spécifiquement dédié à la construction. Si votre entreprise est du BTP, vous dépendez très probablement de Constructys.",
          "Faut-il avancer les frais ? — Non. Avec une convention de formation signée avant le démarrage, l'OPCO peut régler directement l'organisme. Pour les TPE, des dispositifs existent pour limiter l'avance de trésorerie.",
          "Combien de formations puis-je financer par an ? — Il n'y a pas de limite fixe. Tout dépend de votre Plan de Développement des Compétences et du budget alloué par Constructys à votre entreprise.",
        ],
      },
      {
        type: 'cta',
        content: 'Demandez un devis personnalisé pour votre formation IA BTP. 100% finançable Constructys.',
      },
    ],
    relatedSlugs: ['5-cas-usage-chatgpt-artisans-btp', 'ia-devis-gain-temps-pme-btp'],
  },
  {
    slug: '5-cas-usage-chatgpt-artisans-btp',
    title: '5 cas d\'usage de ChatGPT pour les artisans du bâtiment',
    description:
      'Découvrez 5 usages concrets de ChatGPT pour les artisans BTP : devis, emails, CR chantier, relances, descriptifs techniques.',
    date: '2026-03-10',
    keywords: ['ChatGPT artisans', 'IA BTP', 'ChatGPT bâtiment', 'artisan intelligence artificielle'],
    sections: [
      {
        type: 'definition',
        title: 'En bref',
        content:
          "ChatGPT permet aux artisans du BTP (plombiers, électriciens, maçons, carreleurs, peintres) de rédiger plus vite leurs devis, emails clients, comptes rendus et descriptifs techniques. Sans compétence informatique : vous décrivez ce que vous voulez, l'IA génère le texte.",
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
        type: 'paragraph',
        title: 'Un exemple concret',
        content:
          "Vous êtes plombier et devez envoyer un devis pour une salle de bain. Vous donnez à ChatGPT : « Rédige un devis pour une rénovation complète de salle de bain : 12 m², carrelage mural et sol, WC, lavabo, douche à l'italienne. Inclus fournitures et main d'œuvre, TVA 10%, validité 30 jours. » L'IA génère une structure professionnelle. Vous ajustez les prix selon vos marges. Temps économisé : environ 1h30 par devis.",
      },
      {
        type: 'faq',
        title: 'Questions fréquentes',
        content: [
          "Faut-il une formation pour utiliser ChatGPT ? — Pour des usages basiques, non. Pour les devis et documents techniques, une formation courte (4h) permet d'éviter les erreurs et d'obtenir des trames réutilisables.",
          "Mes données sont-elles sécurisées ? — Ne collez jamais de données clients réelles dans ChatGPT public. Utilisez ChatGPT Team ou Enterprise pour les données sensibles. La formation IA BTP vous apprend les bonnes pratiques.",
          "Combien de temps je gagne ? — En moyenne 3 à 5 heures par semaine sur les devis, emails et comptes rendus. Les artisans formés rapportent un ROI positif dès la première semaine.",
        ],
      },
      {
        type: 'cta',
        content: 'Formation ChatGPT pour artisans BTP — 4h pratiques, 100% finançable Constructys.',
      },
    ],
    relatedSlugs: ['financer-formation-ia-btp-constructys', 'ia-devis-gain-temps-pme-btp'],
  },
  {
    slug: 'ia-devis-gain-temps-pme-btp',
    title: 'IA et devis : gain de temps réel pour les PME BTP',
    description:
      "Comment l'IA divise par 10 le temps de rédaction des devis bâtiment. Témoignages et chiffres concrets.",
    date: '2026-03-10',
    keywords: ['IA devis BTP', 'gain de temps devis', 'devis bâtiment IA', 'productivité BTP'],
    sections: [
      {
        type: 'definition',
        title: 'En bref',
        content:
          "L'IA pour les devis bâtiment permet de passer de 2h à 4h de rédaction à environ 15-20 minutes. Vous fournissez un brief (type de chantier, prestations, quantités), l'IA structure le document. Vous conservez la maîtrise des prix et des marges.",
      },
      {
        type: 'paragraph',
        title: 'Le constat',
        content:
          "Les PME du BTP perdent un temps considérable sur les devis. Un devis détaillé pour une rénovation, un chiffrage VRD ou un descriptif second œuvre peut prendre plusieurs heures. L'IA (ChatGPT, outils similaires) ne remplace pas le métreur ou le chargé d'affaires : elle accélère la mise en forme et la rédaction des parties répétitives.",
      },
      {
        type: 'paragraph',
        title: 'Les gains mesurés',
        content:
          "Les entreprises formées par Laure Olivié rapportent en moyenne : temps de devis divisé par 10, possibilité de proposer plusieurs variantes (avec/sans option) sans tout recopier, descriptifs plus professionnels et homogènes. Le gain est d'autant plus important que les devis se ressemblent (même structure, mêmes postes).",
      },
      {
        type: 'paragraph',
        title: 'Par où commencer ?',
        content:
          "Une formation de 4h suffit pour maîtriser les bons prompts et les trames adaptées à votre métier. Vous apprenez à décrire votre chantier de façon efficace pour que l'IA produise un devis pertinent. Aucun code, aucun logiciel complexe. Travail sur vos vrais documents.",
      },
      {
        type: 'faq',
        title: 'Questions fréquentes',
        content: [
          "L'IA remplace-t-elle le métreur ? — Non. L'IA assiste la rédaction. Les prix, quantités et choix techniques restent sous votre responsabilité.",
          "Quels types de devis ? — Tous les corps de métier : gros œuvre, second œuvre, VRD. L'IA adapte le vocabulaire et la structure.",
          "La formation est-elle finançable ? — Oui. 100% finançable par l'OPCO Constructys pour les entreprises du BTP.",
        ],
      },
      {
        type: 'cta',
        content: 'Formation IA devis et chiffrage BTP — Module dédié dans « L\'IA au service du BTP ».',
      },
    ],
    relatedSlugs: ['5-cas-usage-chatgpt-artisans-btp', 'financer-formation-ia-btp-constructys'],
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
      };
    });
  } catch {
    return [];
  }
}

/** Tous les articles : statiques + générés (publiés automatiquement) */
export function getAllArticles(): BlogArticle[] {
  const generated = loadGeneratedArticles();
  const staticSlugs = new Set(BLOG_ARTICLES.map((a) => a.slug));
  const generatedFiltered = generated.filter((a) => !staticSlugs.has(a.slug));
  return [...BLOG_ARTICLES, ...generatedFiltered];
}

export function getArticle(slug: string): BlogArticle | undefined {
  return getAllArticles().find((a) => a.slug === slug);
}

export function getAllSlugs(): string[] {
  return getAllArticles().map((a) => a.slug);
}
