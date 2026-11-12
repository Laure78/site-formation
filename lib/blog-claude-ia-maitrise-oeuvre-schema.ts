import { SCHEMA_PUBLIC_SITE_URL, SCHEMA_LINKEDIN_PROFILE_URL } from '@/lib/schema-constants';
import { SITE, SITE_LINKEDIN_PROFILE_URL } from '@/lib/site-config';
import { LINKS } from '@/lib/internal-links';

const CANONICAL = `${SCHEMA_PUBLIC_SITE_URL}${LINKS.blogClaudeIaMaitriseOeuvre}`;

export const BLOG_CLAUDE_MOE_ARTICLE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline:
    "IA et maîtrise d'œuvre : 12 usages concrets de Claude, de la conception à la réception",
  description:
    "CCTP, analyse des offres, visas, CR de chantier, réserves : 12 usages de Claude pour les maîtres d'œuvre, avec prompts et Skills prêts à copier.",
  datePublished: '2026-11-12',
  dateModified: '2026-11-12',
  inLanguage: 'fr-FR',
  author: {
    '@type': 'Person',
    name: SITE.marque,
    url: `${SCHEMA_PUBLIC_SITE_URL}/a-propos`,
    sameAs: [SITE_LINKEDIN_PROFILE_URL || SCHEMA_LINKEDIN_PROFILE_URL],
  },
  publisher: {
    '@type': 'EducationalOrganization',
    name: SITE.raisonSociale,
    url: SCHEMA_PUBLIC_SITE_URL,
  },
  mainEntityOfPage: CANONICAL,
} as const;

export const BLOG_CLAUDE_MOE_FAQ_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "L'IA peut-elle rédiger un CCTP à la place du maître d'œuvre ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non. Claude peut produire un premier jet à partir de vos CCTP types et des pièces du projet, mais les choix techniques et la validation finale restent ceux du maître d'œuvre.",
      },
    },
    {
      '@type': 'Question',
      name: "Claude ou ChatGPT : lequel choisir en maîtrise d'œuvre ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Les deux sont utiles. Claude est particulièrement adapté au travail sur des pièces longues (CCTP, DCE) et à l'organisation en Projets et Skills.",
      },
    },
    {
      '@type': 'Question',
      name: 'Faut-il un abonnement payant ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pour les Projets, les Skills et les connecteurs, oui : ces fonctionnalités sont réservées aux offres payantes de Claude. Les versions gratuites suffisent pour découvrir les usages de base.',
      },
    },
    {
      '@type': 'Question',
      name: 'Mes données de chantier sont-elles en sécurité ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Cela dépend de l'offre et des paramètres choisis. Privilégiez une offre professionnelle, vérifiez les réglages de confidentialité et respectez les clauses de vos contrats ; anonymisez en cas de doute.",
      },
    },
    {
      '@type': 'Question',
      name: "Existe-t-il une formation IA dédiée aux maîtres d'œuvre ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui. La formation « L'IA au service des maîtres d'œuvre » dure 4 heures, en présentiel en Île-de-France, en inter à Paris 12e ou dans vos locaux.",
      },
    },
    {
      '@type': 'Question',
      name: 'Comment financer cette formation ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Prise en charge OPCO/Constructys selon éligibilité, sans subrogation : l'entreprise règle la formation puis se fait rembourser par son OPCO. Non éligible au CPF.",
      },
    },
  ],
} as const;
