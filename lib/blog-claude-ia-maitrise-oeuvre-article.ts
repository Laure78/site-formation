/**
 * Fiche listing blog — article custom `/blog/claude-ia-maitrise-oeuvre` (page dédiée).
 */
import type { BlogArticle } from '@/lib/blog';
import { LINKS } from '@/lib/internal-links';

const PATH = LINKS.blogClaudeIaMaitriseOeuvre;

export const BLOG_CLAUDE_IA_MAITRISE_OEUVRE_SLUG = 'claude-ia-maitrise-oeuvre';

export const blogArticleClaudeIaMaitriseOeuvre: BlogArticle = {
  slug: BLOG_CLAUDE_IA_MAITRISE_OEUVRE_SLUG,
  title: "IA et maîtrise d'œuvre : 12 usages concrets de Claude, de la conception à la réception",
  seoTitle: "Claude pour la maîtrise d'œuvre : 12 usages",
  description:
    "CCTP, analyse des offres, visas, CR de chantier, réserves : 12 usages de Claude pour les maîtres d'œuvre, avec prompts et Skills prêts à copier.",
  date: '2026-11-12',
  dateModified: '2026-11-12',
  canonicalPath: PATH,
  readingTime: '9 min',
  coverImage: '/images/blog/ia-maitrise-oeuvre.webp',
  coverAlt: 'Professionnels de maîtrise d’œuvre travaillant sur des pièces de marché avec l’IA.',
  keywords: [
    "IA maîtrise d'œuvre",
    "Claude maître d'œuvre",
    'compte rendu de chantier IA',
    'analyse des offres IA',
  ],
  relatedSlugs: [
    'ia-maitrise-oeuvre-usages',
    'tuto-skill-claude-maitrise-oeuvre',
    'chatgpt-ou-claude-maitrise-oeuvre',
    'tuto-depouillement-offres-ia',
    'ia-visa-documents-execution',
  ],
  enBref: [
    "Claude, l'IA d'Anthropic, peut préparer une grande partie de l'écrit d'une mission de maîtrise d'œuvre : CCTP, analyse des offres, pré-analyse des visas, comptes rendus de chantier, listes de réserves et contrôle des DOE. Bien configuré avec un Projet par opération et des Skills, il travaille à partir des pièces du marché et des gabarits de l'agence. Le maître d'œuvre reste responsable : il relit, corrige et signe chaque document.",
  ],
  faq: [
    {
      question: "L'IA peut-elle rédiger un CCTP à la place du maître d'œuvre ?",
      answer:
        "Non. Claude peut produire un premier jet à partir de vos CCTP types et des pièces du projet, mais les choix techniques et la validation finale restent ceux du maître d'œuvre.",
    },
    {
      question: "Claude ou ChatGPT : lequel choisir en maîtrise d'œuvre ?",
      answer:
        "Les deux sont utiles. Claude est particulièrement adapté au travail sur des pièces longues (CCTP, DCE) et à l'organisation en Projets et Skills ; c'est l'outil sur lequel repose cet article.",
    },
    {
      question: 'Faut-il un abonnement payant ?',
      answer:
        'Pour les Projets, les Skills et les connecteurs, oui : ces fonctionnalités sont réservées aux offres payantes de Claude. Les versions gratuites suffisent pour découvrir les usages de base.',
    },
    {
      question: 'Mes données de chantier sont-elles en sécurité ?',
      answer:
        "Cela dépend de l'offre et des paramètres choisis. Privilégiez une offre professionnelle, vérifiez les réglages de confidentialité et respectez les clauses de vos contrats ; anonymisez en cas de doute.",
    },
    {
      question: "Existe-t-il une formation IA dédiée aux maîtres d'œuvre ?",
      answer:
        "Oui. La formation « L'IA au service des maîtres d'œuvre » dure 4 heures, en présentiel en Île-de-France, en inter à Paris 12e ou dans vos locaux.",
    },
    {
      question: 'Comment financer cette formation ?',
      answer:
        "Prise en charge OPCO/Constructys selon éligibilité, sans subrogation : l'entreprise règle la formation puis se fait rembourser par son OPCO. Non éligible au CPF.",
    },
  ],
  sections: [],
};
