/**
 * JSON-LD ItemList de cours — page catalogue /formations uniquement
 */
import { SITE_CONFIG } from '@/lib/seo';

export function getSchemaCourses() {
  const base = SITE_CONFIG.url;

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Formations IA BTP — Laure Olivié',
    description:
      'Catalogue des formations IA et ChatGPT pour les professionnels du BTP, finançables Constructys',
    url: `${base}/formations`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'Course',
          name: 'Formation IA BTP — Fondamentaux ChatGPT & Claude AI',
          description:
            'Maîtrisez ChatGPT et Claude AI pour automatiser les tâches chronophages du BTP : devis, emails, comptes rendus de chantier, administratif. Formation pratique sur vos vrais documents.',
          provider: { '@id': `${base}/#ofc` },
          instructor: { '@id': `${base}/#laure-olivie` },
          courseMode: ['onsite', 'blended'],
          duration: 'PT4H',
          inLanguage: 'fr',
          offers: {
            '@type': 'Offer',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            category: 'Formation professionnelle finançable Constructys',
          },
          hasCourseInstance: {
            '@type': 'CourseInstance',
            courseMode: 'onsite',
            courseWorkload: 'PT4H',
            location: {
              '@type': 'Place',
              name: 'Île-de-France et France entière',
            },
          },
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'Course',
          name: "Formation IA Appels d'Offres & DCE BTP",
          description:
            "Utilisez l'IA pour analyser les DCE, rédiger des mémoires techniques percutants et gagner plus d'appels d'offres. Avec NotebookLM, ChatGPT et Claude AI.",
          provider: { '@id': `${base}/#ofc` },
          instructor: { '@id': `${base}/#laure-olivie` },
          courseMode: ['onsite'],
          duration: 'PT4H',
          inLanguage: 'fr',
        },
      },
    ],
  };
}
