/**
 * JSON-LD @graph unique — page `/formations` uniquement.
 * Présentiel uniquement (OnsiteEventAttendanceMode) — pas de distanciel / online dans les schémas.
 */
import { SCHEMA_PUBLIC_SITE_URL } from '@/lib/schema-constants';

const BASE = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');

export function buildFormationsPageUnifiedGraphJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${BASE}/formations#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Accueil',
            item: BASE,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Catalogue formations',
            item: `${BASE}/formations`,
          },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': `${BASE}/formations#webpage`,
        url: `${BASE}/formations`,
        name: 'Catalogue formation IA BTP — 6 formations Qualiopi 4 h',
        description:
          "Catalogue 6 formations IA BTP de 4 h finançables Constructys : bâtiment, travaux publics, appels d'offres, RH, architecture, sensibilisation aux assistants IA.",
        inLanguage: 'fr-FR',
        isPartOf: { '@id': `${BASE}/#website` },
        about: { '@id': `${BASE}/#organization` },
        breadcrumb: { '@id': `${BASE}/formations#breadcrumb` },
        mainEntity: { '@id': `${BASE}/formations#course-list` },
        primaryImageOfPage: `${BASE}/images/formation-ia-btp-salle-interactive-2026.jpg`,
        datePublished: '2024-01-15',
        dateModified: '2026-04-17',
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['.citation-sentence', 'h1'],
        },
      },
      {
        '@type': 'Service',
        '@id': `${BASE}/formations#service`,
        name: 'Formation IA BTP en présentiel — 6 programmes Qualiopi',
        serviceType: 'Formation professionnelle continue',
        provider: { '@id': `${BASE}/#organization` },
        areaServed: [
          { '@type': 'State', name: 'Île-de-France' },
          { '@type': 'City', name: 'Paris' },
          { '@type': 'AdministrativeArea', name: 'Yvelines (78)' },
          { '@type': 'AdministrativeArea', name: 'Hauts-de-Seine (92)' },
          { '@type': 'AdministrativeArea', name: 'Seine-Saint-Denis (93)' },
          { '@type': 'AdministrativeArea', name: 'Val-de-Marne (94)' },
          { '@type': 'AdministrativeArea', name: "Val-d'Oise (95)" },
          { '@type': 'AdministrativeArea', name: 'Essonne (91)' },
          { '@type': 'AdministrativeArea', name: 'Seine-et-Marne (77)' },
        ],
        audience: {
          '@type': 'BusinessAudience',
          audienceType:
            'Entreprises du BTP, PME bâtiment, fédérations professionnelles, cabinets d\'architecture, dirigeants et fonctions support',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Catalogue formations IA BTP',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@id': `${BASE}/formations/ia-au-service-du-batiment#course`,
              },
              price: 100,
              priceCurrency: 'EUR',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: 100,
                priceCurrency: 'EUR',
                unitText: 'par participant',
                valueAddedTaxIncluded: false,
              },
            },
            {
              '@type': 'Offer',
              itemOffered: { '@id': `${BASE}/formations/ia-travaux-publics#course` },
              price: 100,
              priceCurrency: 'EUR',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: 100,
                priceCurrency: 'EUR',
                unitText: 'par participant',
                valueAddedTaxIncluded: false,
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@id': `${BASE}/formations/sensibilisation-ia-assistants-personnalises#course`,
              },
              price: 100,
              priceCurrency: 'EUR',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: 100,
                priceCurrency: 'EUR',
                unitText: 'par participant',
                valueAddedTaxIncluded: false,
              },
            },
            {
              '@type': 'Offer',
              itemOffered: { '@id': `${BASE}/formations/ia-appels-offre-btp#course` },
              price: 175,
              priceCurrency: 'EUR',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: 175,
                priceCurrency: 'EUR',
                unitText: 'par participant',
                valueAddedTaxIncluded: false,
              },
            },
            {
              '@type': 'Offer',
              itemOffered: { '@id': `${BASE}/formations/ia-rh-btp#course` },
              price: 175,
              priceCurrency: 'EUR',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: 175,
                priceCurrency: 'EUR',
                unitText: 'par participant',
                valueAddedTaxIncluded: false,
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@id': `${BASE}/formations/ia-architecture-claude-dpgf#course`,
              },
              price: 175,
              priceCurrency: 'EUR',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: 175,
                priceCurrency: 'EUR',
                unitText: 'par participant',
                valueAddedTaxIncluded: false,
              },
            },
          ],
        },
      },
      {
        '@type': 'ItemList',
        '@id': `${BASE}/formations#course-list`,
        name: 'Catalogue 6 formations IA BTP',
        description:
          '6 formations IA BTP de 4 heures, certifiées Qualiopi, finançables Constructys, en inter en Île-de-France ou intra dans les locaux du client.',
        numberOfItems: 6,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@type': 'Course',
              '@id': `${BASE}/formations/ia-au-service-du-batiment#course`,
              name: "L'IA au service du bâtiment",
              alternateName: 'Formation ChatGPT pour le bâtiment',
              description:
                "Formation pratique de 4 heures pour PME et entreprises du bâtiment : automatiser devis, comptes rendus de chantier, emails et administratif avec ChatGPT et l'IA. Finançable Constructys.",
              url: `${BASE}/formations/ia-au-service-du-batiment`,
              courseCode: 'BTP-01',
              educationalLevel: 'Beginner',
              inLanguage: 'fr-FR',
              teaches: [
                'Identifier les usages IA utiles dans le BTP',
                'Accélérer la rédaction de devis et messages clients',
                "Structurer l'administratif : CR, relances, modèles",
                "Repartir avec des trames et prompts prêts à l'emploi",
              ],
              occupationalCategory: 'BTP, Bâtiment',
              provider: { '@id': `${BASE}/#organization` },
              hasCourseInstance: {
                '@type': 'CourseInstance',
                courseMode: 'https://schema.org/OnsiteEventAttendanceMode',
                courseWorkload: 'PT4H',
                location: {
                  '@type': 'Place',
                  name: 'Île-de-France — inter ou intra dans les locaux du client',
                  address: {
                    '@type': 'PostalAddress',
                    addressRegion: 'Île-de-France',
                    addressCountry: 'FR',
                  },
                },
                instructor: { '@id': `${BASE}/#laure-olivie` },
              },
              offers: {
                '@type': 'Offer',
                price: 100,
                priceCurrency: 'EUR',
                availability: 'https://schema.org/InStock',
                url: `${BASE}/formations/ia-au-service-du-batiment`,
                category: 'Formation professionnelle continue',
              },
            },
          },
          {
            '@type': 'ListItem',
            position: 2,
            item: {
              '@type': 'Course',
              '@id': `${BASE}/formations/ia-travaux-publics#course`,
              name: "L'IA au service des Travaux Publics",
              description:
                'Formation 4 h pour les équipes TP : consultations, documents de chantier, reporting, templates et assistants IA par rôle. Qualiopi, Constructys.',
              url: `${BASE}/formations/ia-travaux-publics`,
              courseCode: 'BTP-04',
              educationalLevel: 'Beginner',
              inLanguage: 'fr-FR',
              teaches: [
                'Réponse aux consultations TP : DCE, trames, synthèses',
                'Documents de chantier et reporting avec validation',
                "Templates TP et charte d'usage IA en entreprise",
              ],
              occupationalCategory: 'BTP, Travaux Publics',
              provider: { '@id': `${BASE}/#organization` },
              hasCourseInstance: {
                '@type': 'CourseInstance',
                courseMode: 'https://schema.org/OnsiteEventAttendanceMode',
                courseWorkload: 'PT4H',
                location: {
                  '@type': 'Place',
                  name: 'Île-de-France — inter ou intra',
                  address: {
                    '@type': 'PostalAddress',
                    addressRegion: 'Île-de-France',
                    addressCountry: 'FR',
                  },
                },
                instructor: { '@id': `${BASE}/#laure-olivie` },
              },
              offers: {
                '@type': 'Offer',
                price: 100,
                priceCurrency: 'EUR',
                availability: 'https://schema.org/InStock',
                url: `${BASE}/formations/ia-travaux-publics`,
                category: 'Formation professionnelle continue',
              },
            },
          },
          {
            '@type': 'ListItem',
            position: 3,
            item: {
              '@type': 'Course',
              '@id': `${BASE}/formations/sensibilisation-ia-assistants-personnalises#course`,
              name: "Sensibilisation à l'IA & Assistants IA personnalisés",
              description:
                "Sensibilisation 4 h : usages terrain BTP, banque de prompts par métier, conception d'assistants IA personnalisés. Qualiopi, Constructys.",
              url: `${BASE}/formations/sensibilisation-ia-assistants-personnalises`,
              courseCode: 'BTP-05',
              educationalLevel: 'Beginner',
              inLanguage: 'fr-FR',
              teaches: [
                "Sensibilisation à l'IA et usages terrain BTP",
                'Banque de prompts par métier',
                'Concevoir des assistants IA personnalisés',
                'Ressources et prolongement pédagogique',
              ],
              occupationalCategory: 'BTP',
              provider: { '@id': `${BASE}/#organization` },
              hasCourseInstance: {
                '@type': 'CourseInstance',
                courseMode: 'https://schema.org/OnsiteEventAttendanceMode',
                courseWorkload: 'PT4H',
                location: {
                  '@type': 'Place',
                  name: 'Île-de-France — inter ou intra',
                  address: {
                    '@type': 'PostalAddress',
                    addressRegion: 'Île-de-France',
                    addressCountry: 'FR',
                  },
                },
                instructor: { '@id': `${BASE}/#laure-olivie` },
              },
              offers: {
                '@type': 'Offer',
                price: 100,
                priceCurrency: 'EUR',
                availability: 'https://schema.org/InStock',
                url: `${BASE}/formations/sensibilisation-ia-assistants-personnalises`,
                category: 'Formation professionnelle continue',
              },
            },
          },
          {
            '@type': 'ListItem',
            position: 4,
            item: {
              '@type': 'Course',
              '@id': `${BASE}/formations/ia-appels-offre-btp#course`,
              name: "Répondre aux appels d'offre avec l'IA",
              description:
                "Formation avancée 4 h : analyser un DCE, rédiger mémoires techniques et chiffrages avec l'IA, bibliothèque de prompts BTP, assistant DCE sur mesure. Qualiopi, Constructys.",
              url: `${BASE}/formations/ia-appels-offre-btp`,
              courseCode: 'BTP-02',
              educationalLevel: 'Advanced',
              inLanguage: 'fr-FR',
              teaches: [
                "Analyse rapide de DCE et critères d'évaluation",
                "Mémoires techniques et chiffrages avec méthode et IA",
                'Templates et prompts par métier pour marchés BTP',
                "Assistant IA DCE / mémoire adapté à l'entreprise",
                'Sécurisation du process : confidentialité, relecture humaine',
              ],
              occupationalCategory: 'BTP, marchés publics et privés',
              provider: { '@id': `${BASE}/#organization` },
              hasCourseInstance: {
                '@type': 'CourseInstance',
                courseMode: 'https://schema.org/OnsiteEventAttendanceMode',
                courseWorkload: 'PT4H',
                location: {
                  '@type': 'Place',
                  name: 'Île-de-France — inter ou intra',
                  address: {
                    '@type': 'PostalAddress',
                    addressRegion: 'Île-de-France',
                    addressCountry: 'FR',
                  },
                },
                instructor: { '@id': `${BASE}/#laure-olivie` },
              },
              offers: {
                '@type': 'Offer',
                price: 175,
                priceCurrency: 'EUR',
                availability: 'https://schema.org/InStock',
                url: `${BASE}/formations/ia-appels-offre-btp`,
                category: 'Formation professionnelle continue',
              },
            },
          },
          {
            '@type': 'ListItem',
            position: 5,
            item: {
              '@type': 'Course',
              '@id': `${BASE}/formations/ia-rh-btp#course`,
              name: 'Formation IA pour la Fonction RH dans le BTP',
              description:
                'Session 4 h pour les RH du BTP : recrutement, GEPP, tableaux de bord et assistant IA RH sur mesure. Qualiopi, Constructys.',
              url: `${BASE}/formations/ia-rh-btp`,
              courseCode: 'BTP-03',
              educationalLevel: 'Advanced',
              inLanguage: 'fr-FR',
              teaches: [
                'Automatiser le recrutement et la sélection',
                'Piloter la GEPP et anticiper les compétences',
                'Tableaux de bord RH opérationnels',
                'Assistant IA RH sur mesure',
              ],
              occupationalCategory: 'BTP, fonction RH',
              provider: { '@id': `${BASE}/#organization` },
              hasCourseInstance: {
                '@type': 'CourseInstance',
                courseMode: 'https://schema.org/OnsiteEventAttendanceMode',
                courseWorkload: 'PT4H',
                location: {
                  '@type': 'Place',
                  name: 'Île-de-France — inter ou intra',
                  address: {
                    '@type': 'PostalAddress',
                    addressRegion: 'Île-de-France',
                    addressCountry: 'FR',
                  },
                },
                instructor: { '@id': `${BASE}/#laure-olivie` },
              },
              offers: {
                '@type': 'Offer',
                price: 175,
                priceCurrency: 'EUR',
                availability: 'https://schema.org/InStock',
                url: `${BASE}/formations/ia-rh-btp`,
                category: 'Formation professionnelle continue',
              },
            },
          },
          {
            '@type': 'ListItem',
            position: 6,
            item: {
              '@type': 'Course',
              '@id': `${BASE}/formations/ia-architecture-claude-dpgf#course`,
              name: 'Architecte augmenté : Claude AI, DPGF, chantier et documents',
              description:
                'Formation avancée 4 h pour cabinets d\'architecture et MOE : DPGF, métrés, planning, CR de chantier, courriers et actes de marché avec Claude AI et Google Workspace.',
              url: `${BASE}/formations/ia-architecture-claude-dpgf`,
              courseCode: 'BTP-06',
              educationalLevel: 'Advanced',
              inLanguage: 'fr-FR',
              teaches: [
                'DPGF, métrés et planning Gantt avec Claude AI',
                'Comptes rendus de chantier et PV de réception',
                'Courriers et actes de marché via Google Drive',
                "Bibliothèque de prompts pour le cabinet d'architecture",
              ],
              occupationalCategory: 'Architecture, MOE, BTP',
              provider: { '@id': `${BASE}/#organization` },
              hasCourseInstance: {
                '@type': 'CourseInstance',
                courseMode: 'https://schema.org/OnsiteEventAttendanceMode',
                courseWorkload: 'PT4H',
                location: {
                  '@type': 'Place',
                  name: 'Île-de-France — inter ou intra',
                  address: {
                    '@type': 'PostalAddress',
                    addressRegion: 'Île-de-France',
                    addressCountry: 'FR',
                  },
                },
                instructor: { '@id': `${BASE}/#laure-olivie` },
              },
              offers: {
                '@type': 'Offer',
                price: 175,
                priceCurrency: 'EUR',
                availability: 'https://schema.org/InStock',
                url: `${BASE}/formations/ia-architecture-claude-dpgf`,
                category: 'Formation professionnelle continue',
              },
            },
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${BASE}/formations#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Quelles formations IA BTP sont proposées au catalogue ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Le catalogue OFC propose 6 formations IA BTP de 4 heures, toutes certifiées Qualiopi : (1) L'IA au service du bâtiment (BTP-01, débutant, 100 € HT/pers), (2) Répondre aux appels d'offre avec l'IA (BTP-02, avancé, 175 € HT/pers), (3) Formation IA pour la fonction RH dans le BTP (BTP-03, avancé, 175 € HT/pers), (4) L'IA au service des Travaux Publics (BTP-04, débutant, 100 € HT/pers), (5) Sensibilisation à l'IA et assistants IA personnalisés (BTP-05, débutant, 100 € HT/pers), (6) Architecte augmenté avec Claude AI, DPGF, chantier et documents (BTP-06, avancé, 175 € HT/pers). En présentiel, inter en Île-de-France ou intra dans les locaux du client. Toutes finançables Constructys.",
            },
          },
          {
            '@type': 'Question',
            name: 'Comment choisir la bonne formation IA BTP pour mon entreprise ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Le choix dépend de votre fonction et de votre niveau. Si vos équipes débutent avec l'IA, partez sur BTP-01 (bâtiment) ou BTP-04 (TP). Si vous voulez gagner sur la production de mémoires techniques et chiffrages, BTP-02 (appels d'offre, avancé). Pour vos équipes RH, BTP-03. Pour un cabinet d'architecture ou MOE, BTP-06. Pour découvrir le potentiel de l'IA et créer vos premiers assistants, BTP-05. Un diagnostic gratuit de 30 minutes en visio permet de cibler le programme adapté à votre contexte.",
            },
          },
          {
            '@type': 'Question',
            name: 'Combien coûte une formation IA BTP du catalogue ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Deux tarifs : 100 € HT par participant pour les formations de niveau débutant (BTP-01 bâtiment, BTP-04 travaux publics, BTP-05 sensibilisation), et 175 € HT par participant pour les formations de niveau avancé (BTP-02 appels d'offre, BTP-03 RH, BTP-06 architecture). Toutes les formations durent 4 heures, en groupe de 12 participants maximum. Toutes éligibles au financement Constructys (plafond pédagogique 24 € HT/h/stagiaire pour les entreprises BTP cotisantes).",
            },
          },
          {
            '@type': 'Question',
            name: 'Les formations IA BTP sont-elles certifiées Qualiopi ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Oui. OFC Création d'Entreprise est certifié Qualiopi (action de formation), certification valable jusqu'en janvier 2028. Numéro de déclaration d'activité : 11788515078. Toutes les formations du catalogue sont éligibles au financement OPCO Constructys pour les entreprises du BTP, dans les conditions du Plan de Développement des Compétences Bâtiment 2026.",
            },
          },
          {
            '@type': 'Question',
            name: 'Les formations sont-elles disponibles en inter ou en intra ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Les deux. En inter, les sessions ont lieu en Île-de-France (Paris, Versailles, Nanterre, Créteil, Cergy-Pontoise, Melun, Saint-Denis, départements 75 à 95). En intra, la formatrice se déplace dans vos locaux en Île-de-France pour une session dédiée à votre entreprise. Le format reste identique : 4 heures, 12 participants maximum, supports et ressources pédagogiques inclus.",
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': `${BASE}/formations#howto-choisir`,
        name: 'Comment choisir sa formation IA BTP',
        description:
          "Méthode en 4 étapes pour choisir la formation IA BTP adaptée à votre entreprise du bâtiment ou des travaux publics.",
        totalTime: 'PT15M',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Identifier le métier cible',
            text: 'Précisez la fonction des participants : opérationnel chantier (BTP-01 ou BTP-04), bureau d\'études et appels d\'offre (BTP-02), ressources humaines (BTP-03), architecte ou MOE (BTP-06), ou découverte généraliste (BTP-05).',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Évaluer le niveau IA des participants',
            text: "Si l'équipe n'a jamais utilisé ChatGPT ou Claude, partez sur une formation débutant (100 € HT/pers). Si elle utilise déjà l'IA au quotidien et veut professionnaliser ses livrables, choisissez une formation avancée (175 € HT/pers).",
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Choisir le format inter ou intra',
            text: "Inter : 1 à 3 participants par entreprise, vous rejoignez une session ouverte en Île-de-France. Intra : à partir de 6 participants d'une même entreprise, la formatrice se déplace dans vos locaux.",
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Vérifier le financement Constructys',
            text: "Si votre entreprise cotise à Constructys, déposez votre demande de prise en charge au minimum 15 jours avant la formation via l'eGestion. Plafond pédagogique : 24 € HT/h/stagiaire.",
          },
        ],
      },
    ],
  };
}
