/**
 * JSON-LD @graph unique — page `/formations` uniquement.
 * Modalités : présentiel uniquement (OfflineEventAttendanceMode) en Île-de-France — aligné catalogue.
 */
import { FAQ_FORMATIONS } from '@/lib/faq';
import { FORMATIONS_CATALOG_SCHEMA } from '@/lib/schema-course-formations';
import { SCHEMA_PUBLIC_SITE_URL } from '@/lib/schema-constants';
import { getFAQSchema } from '@/lib/seo';
import { TARIF_SESSION_AVANCE_HT, TARIF_SESSION_DEBUTANT_HT, formatTarifHt } from '@/lib/tarifs-sessions';

const BASE = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
const NIV02_CATALOG = FORMATIONS_CATALOG_SCHEMA.find((e) => e.ref === 'NIV-02')!;
const NIV03_CATALOG = FORMATIONS_CATALOG_SCHEMA.find((e) => e.ref === 'NIV-03')!;
const NIV04_CATALOG = FORMATIONS_CATALOG_SCHEMA.find((e) => e.ref === 'NIV-04')!;
const NIV05_CATALOG = FORMATIONS_CATALOG_SCHEMA.find((e) => e.ref === 'NIV-05')!;
const CATALOGUE_COUNT = FORMATIONS_CATALOG_SCHEMA.length;

export function buildFormationsPageUnifiedGraphJsonLd(): Record<string, unknown> {
  const faqSchema = getFAQSchema(FAQ_FORMATIONS);

  const graph: Record<string, unknown>[] = [
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
        name: `Catalogue formation IA appliquée au bâtiment — ${CATALOGUE_COUNT} formations Qualiopi 4 h`,
        description:
          `Catalogue ${CATALOGUE_COUNT} formations IA pour les pro du BTP de 4 h Qualiopi, financement possible selon éligibilité (Constructys ou OPCO) : niveau 1 (bâtiment & travaux publics) et trois formations niveau 2 (appels d'offres, conduite de travaux, Maîtriser Claude AI) — titres officiels sur chaque fiche.`,
        inLanguage: 'fr-FR',
        isPartOf: { '@id': `${BASE}/#website` },
        about: { '@id': `${BASE}/#organization` },
        breadcrumb: { '@id': `${BASE}/formations#breadcrumb` },
        mainEntity: { '@id': `${BASE}/formations#course-list` },
        primaryImageOfPage: `${BASE}/images/formation-ia-btp-salle-interactive-2026.jpg`,
        datePublished: '2024-01-15',
        dateModified: '2026-04-18',
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['.citation-sentence', 'h1'],
        },
      },
      {
        '@type': 'Service',
        '@id': `${BASE}/formations#service`,
        name: `Formation IA pour le BTP — ${CATALOGUE_COUNT} parcours Qualiopi (présentiel en Île-de-France)`,
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
            'Entreprises du BTP, PME bâtiment, fédérations professionnelles, dirigeants et fonctions support',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Catalogue formations IA appliquées au bâtiment',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@id': `${BASE}/formations/ia-batiment-travaux-publics#course`,
              },
              price: TARIF_SESSION_DEBUTANT_HT,
              priceCurrency: 'EUR',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: TARIF_SESSION_DEBUTANT_HT,
                priceCurrency: 'EUR',
                unitText: 'par session',
                valueAddedTaxIncluded: false,
              },
            },
            {
              '@type': 'Offer',
              itemOffered: { '@id': `${BASE}/formations/ia-appels-offre-btp#course` },
              price: TARIF_SESSION_AVANCE_HT,
              priceCurrency: 'EUR',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: TARIF_SESSION_AVANCE_HT,
                priceCurrency: 'EUR',
                unitText: 'par session',
                valueAddedTaxIncluded: false,
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@id': `${BASE}/formations/ia-conduite-travaux-suivi-chantier#course`,
              },
              price: TARIF_SESSION_AVANCE_HT,
              priceCurrency: 'EUR',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: TARIF_SESSION_AVANCE_HT,
                priceCurrency: 'EUR',
                unitText: 'par session (8 participants max)',
                valueAddedTaxIncluded: false,
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@id': `${BASE}/formations/maitriser-claude-ai-btp#course`,
              },
              price: TARIF_SESSION_AVANCE_HT,
              priceCurrency: 'EUR',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: TARIF_SESSION_AVANCE_HT,
                priceCurrency: 'EUR',
                unitText: 'par session (8 participants max, matin)',
                valueAddedTaxIncluded: false,
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@id': `${BASE}/formations/ia-maitrise-oeuvre#course`,
              },
              price: TARIF_SESSION_AVANCE_HT,
              priceCurrency: 'EUR',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: TARIF_SESSION_AVANCE_HT,
                priceCurrency: 'EUR',
                unitText: 'par session (3 à 8 participants, MOE/MOEX)',
                valueAddedTaxIncluded: false,
              },
            },
          ],
        },
      },
      {
        '@type': 'ItemList',
        '@id': `${BASE}/formations#course-list`,
        name: `Catalogue ${CATALOGUE_COUNT} formations IA pour le BTP`,
        description:
          `${CATALOGUE_COUNT} formations IA pour les pro du BTP de 4 heures, certifiées Qualiopi, financement possible selon éligibilité, exclusivement en présentiel en Île-de-France (inter ou intra).`,
        numberOfItems: CATALOGUE_COUNT,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@type': 'Course',
              '@id': `${BASE}/formations/ia-batiment-travaux-publics#course`,
              name: "L'IA au service des pros du bâtiment et des travaux publics",
              alternateName: 'Formation IA niveau 1 BTP',
              description:
                "Formation niveau 1 — 4 h : IA pour bâtiment et travaux publics, devis, chantier, documents. Qualiopi, Constructys.",
              url: `${BASE}/formations/ia-batiment-travaux-publics`,
              courseCode: 'NIV-01',
              educationalLevel: 'Beginner',
              inLanguage: 'fr-FR',
              teaches: [
                'Usages de l’IA pour équipes bâtiment et travaux publics',
                'Devis, comptes rendus et courriers avec ChatGPT / Claude',
                'Structuration de l’administratif et prompts métier',
                'Bonnes pratiques et validation humaine',
              ],
              occupationalCategory: 'BTP, Bâtiment, Travaux Publics',
              provider: { '@id': `${BASE}/#organization` },
              hasCourseInstance: {
                '@type': 'CourseInstance',
                courseMode: 'https://schema.org/OfflineEventAttendanceMode',
                courseWorkload: 'PT4H',
                location: {
                  '@type': 'Place',
                  name: 'Île-de-France — inter ou intra, en présentiel',
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
                price: TARIF_SESSION_DEBUTANT_HT,
                priceCurrency: 'EUR',
                availability: 'https://schema.org/InStock',
                url: `${BASE}/formations/ia-batiment-travaux-publics`,
                category: 'Formation professionnelle continue',
              },
            },
          },
          {
            '@type': 'ListItem',
            position: 2,
            item: {
              '@type': 'Course',
              '@id': `${BASE}/formations/ia-appels-offre-btp#course`,
              name: "L'IA appliquée aux appels d'offres BTP",
              description: NIV02_CATALOG.description,
              url: `${BASE}/formations/ia-appels-offre-btp`,
              courseCode: 'NIV-02',
              educationalLevel: 'Advanced',
              inLanguage: 'fr-FR',
              teaches: NIV02_CATALOG.teaches,
              occupationalCategory: 'BTP, marchés publics et privés',
              provider: { '@id': `${BASE}/#organization` },
              hasCourseInstance: {
                '@type': 'CourseInstance',
                courseMode: 'https://schema.org/OfflineEventAttendanceMode',
                courseWorkload: 'PT4H',
                location: {
                  '@type': 'Place',
                  name: 'Île-de-France — inter ou intra, en présentiel',
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
                price: TARIF_SESSION_AVANCE_HT,
                priceCurrency: 'EUR',
                availability: 'https://schema.org/InStock',
                url: `${BASE}/formations/ia-appels-offre-btp`,
                category: 'Formation professionnelle continue',
              },
            },
          },
          {
            '@type': 'ListItem',
            position: 3,
            item: {
              '@type': 'Course',
              '@id': `${BASE}/formations/ia-conduite-travaux-suivi-chantier#course`,
              name: NIV03_CATALOG.name,
              description: NIV03_CATALOG.description,
              url: `${BASE}/formations/ia-conduite-travaux-suivi-chantier`,
              courseCode: 'NIV-03',
              educationalLevel: 'Advanced',
              inLanguage: 'fr-FR',
              teaches: NIV03_CATALOG.teaches,
              occupationalCategory: NIV03_CATALOG.occupationalCategory,
              provider: { '@id': `${BASE}/#organization` },
              hasCourseInstance: {
                '@type': 'CourseInstance',
                courseMode: 'https://schema.org/OfflineEventAttendanceMode',
                courseWorkload: 'PT4H',
                location: {
                  '@type': 'Place',
                  name: 'Île-de-France — inter ou intra, en présentiel',
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
                price: TARIF_SESSION_AVANCE_HT,
                priceCurrency: 'EUR',
                availability: 'https://schema.org/InStock',
                url: `${BASE}/formations/ia-conduite-travaux-suivi-chantier`,
                category: 'Formation professionnelle continue — niveau avancé',
              },
            },
          },
          {
            '@type': 'ListItem',
            position: 4,
            item: {
              '@type': 'Course',
              '@id': `${BASE}/formations/maitriser-claude-ai-btp#course`,
              name: NIV04_CATALOG.name,
              description: NIV04_CATALOG.description,
              url: `${BASE}/formations/maitriser-claude-ai-btp`,
              courseCode: 'NIV-04',
              educationalLevel: 'Advanced',
              inLanguage: 'fr-FR',
              teaches: NIV04_CATALOG.teaches,
              occupationalCategory: NIV04_CATALOG.occupationalCategory,
              provider: { '@id': `${BASE}/#organization` },
              hasCourseInstance: {
                '@type': 'CourseInstance',
                courseMode: 'https://schema.org/OfflineEventAttendanceMode',
                courseWorkload: 'PT4H',
                location: {
                  '@type': 'Place',
                  name: 'Île-de-France — inter ou intra, en présentiel (matin 9h–13h)',
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
                price: TARIF_SESSION_AVANCE_HT,
                priceCurrency: 'EUR',
                availability: 'https://schema.org/InStock',
                url: `${BASE}/formations/maitriser-claude-ai-btp`,
                category: 'Formation professionnelle continue — niveau avancé',
              },
            },
          },
          {
            '@type': 'ListItem',
            position: 5,
            item: {
              '@type': 'Course',
              '@id': `${BASE}/formations/ia-maitrise-oeuvre#course`,
              name: NIV05_CATALOG.name,
              description: NIV05_CATALOG.description,
              url: `${BASE}/formations/ia-maitrise-oeuvre`,
              courseCode: 'NIV-05',
              educationalLevel: 'Advanced',
              inLanguage: 'fr-FR',
              teaches: NIV05_CATALOG.teaches,
              occupationalCategory: NIV05_CATALOG.occupationalCategory,
              provider: { '@id': `${BASE}/#organization` },
              hasCourseInstance: {
                '@type': 'CourseInstance',
                courseMode: 'https://schema.org/OfflineEventAttendanceMode',
                courseWorkload: 'PT4H',
                location: {
                  '@type': 'Place',
                  name: 'Île-de-France — inter ou intra, en présentiel',
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
                price: TARIF_SESSION_AVANCE_HT,
                priceCurrency: 'EUR',
                availability: 'https://schema.org/InStock',
                url: `${BASE}/formations/ia-maitrise-oeuvre`,
                category: 'Formation professionnelle continue — maîtrise d\'œuvre',
              },
            },
          },
        ],
      },
      ...(faqSchema
        ? [
            {
              '@type': 'FAQPage',
              '@id': `${BASE}/formations#faq`,
              mainEntity: faqSchema.mainEntity,
            },
          ]
        : []),
      {
        '@type': 'HowTo',
        '@id': `${BASE}/formations#howto-choisir`,
        name: 'Comment choisir sa formation IA pour les pro du BTP',
        description:
          "Méthode en 4 étapes pour choisir la formation IA appliquée au bâtiment adaptée à votre entreprise du bâtiment ou des travaux publics.",
        totalTime: 'PT15M',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Identifier le métier cible',
            text: 'Choisissez le parcours adapté : niveau 1 — L\'IA au service des pros du bâtiment et des travaux publics ; niveau 2 — L\'IA appliquée aux appels d\'offres BTP, L\'IA appliquée à la conduite de travaux, L\'IA au service des maîtres d\'œuvre, ou Maîtriser Claude AI pour le BTP.',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Évaluer le niveau IA des participants',
            text: `Si l'équipe n'a jamais utilisé ChatGPT ou Claude, partez sur une formation débutant (${formatTarifHt(TARIF_SESSION_DEBUTANT_HT)} € HT par session, jusqu'à 12 participants). Si elle utilise déjà l'IA au quotidien et veut professionnaliser ses livrables, choisissez une formation avancée (${formatTarifHt(TARIF_SESSION_AVANCE_HT)} € HT par session).`,
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
    ];

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
