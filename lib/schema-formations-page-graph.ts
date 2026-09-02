/**
 * JSON-LD @graph unique — page `/formations` uniquement.
 * Modalités : présentiel uniquement (OfflineEventAttendanceMode) en Île-de-France — aligné catalogue.
 */
import { getFaqFormations } from '@/lib/faq';
import { getPillarPageContentUpdatedAt } from '@/lib/content-updated-at';
import { FORMATIONS_CATALOG_SCHEMA } from '@/lib/schema-course-formations';
import { SCHEMA_PUBLIC_SITE_URL } from '@/lib/schema-constants';
import { getFAQSchema } from '@/lib/seo';
import { getCatalogueFormationsCount } from '@/lib/formations-catalogue-display';
import { isFormationCataloguePublished } from '@/lib/formation-catalogue-visibility';
import {
  FORMATION_COURSE_MODE_ONSITE,
  FORMATION_COURSE_OFFER_CATEGORY,
} from '@/lib/schema-formation-course-jsonld';
import {
  TARIF_SESSION_FORFAIT_HT,
  libelleTarifsDualCourt,
} from '@/lib/tarifs-sessions';
import { FORMATION_NIV01, getFormationByCode, libelleEffectifFormation } from '@/data/formations';

const BASE = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
const NIV02_CATALOG = FORMATIONS_CATALOG_SCHEMA.find((e) => e.ref === 'NIV-02')!;
const NIV03_CATALOG = FORMATIONS_CATALOG_SCHEMA.find((e) => e.ref === 'NIV-03')!;
const NIV04_CATALOG = FORMATIONS_CATALOG_SCHEMA.find((e) => e.ref === 'NIV-04')!;
const NIV05_CATALOG = FORMATIONS_CATALOG_SCHEMA.find((e) => e.ref === 'NIV-05')!;
const NIV06_CATALOG = FORMATIONS_CATALOG_SCHEMA.find((e) => e.ref === 'NIV-06')!;

export function buildFormationsPageUnifiedGraphJsonLd(at: Date = new Date()): Record<string, unknown> {
  const includeNiv03 = isFormationCataloguePublished('NIV-03', at);
  const CATALOGUE_COUNT = getCatalogueFormationsCount(at);
  const niv2Count = CATALOGUE_COUNT - 1;
  const faqSchema = getFAQSchema(getFaqFormations(at));

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
          `Catalogue ${CATALOGUE_COUNT} formations IA pour les pros du BTP de 4 h Qualiopi, financement possible selon éligibilité (Constructys ou OPCO) : niveau 1 (bâtiment & travaux publics) et ${niv2Count} formations niveau 2 (appels d'offres${includeNiv03 ? ", conduite de travaux" : ''}, maîtres d'œuvre, Maîtriser Claude AI) — titres officiels sur chaque fiche.`,
        inLanguage: 'fr-FR',
        isPartOf: { '@id': `${BASE}/#website` },
        about: { '@id': `${BASE}/#organization` },
        breadcrumb: { '@id': `${BASE}/formations#breadcrumb` },
        mainEntity: { '@id': `${BASE}/formations#course-list` },
        primaryImageOfPage: `${BASE}/images/formation-ia-btp-salle-interactive.jpg`,
        datePublished: '2024-01-15',
        dateModified: getPillarPageContentUpdatedAt('/formations'),
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
              price: TARIF_SESSION_FORFAIT_HT,
              priceCurrency: 'EUR',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: TARIF_SESSION_FORFAIT_HT,
                priceCurrency: 'EUR',
                unitText: 'par session',
                valueAddedTaxIncluded: false,
              },
            },
            {
              '@type': 'Offer',
              itemOffered: { '@id': `${BASE}/formations/ia-appels-offre-btp#course` },
              price: TARIF_SESSION_FORFAIT_HT,
              priceCurrency: 'EUR',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: TARIF_SESSION_FORFAIT_HT,
                priceCurrency: 'EUR',
                unitText: 'par session',
                valueAddedTaxIncluded: false,
              },
            },
            ...(includeNiv03
              ? [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@id': `${BASE}/formations/ia-conduite-travaux-suivi-chantier#course`,
                    },
                    price: TARIF_SESSION_FORFAIT_HT,
                    priceCurrency: 'EUR',
                    priceSpecification: {
                      '@type': 'UnitPriceSpecification',
                      price: TARIF_SESSION_FORFAIT_HT,
                      priceCurrency: 'EUR',
                      unitText: 'par session (8 participants max)',
                      valueAddedTaxIncluded: false,
                    },
                  },
                ]
              : []),
            {
              '@type': 'Offer',
              itemOffered: {
                '@id': `${BASE}/formations/maitriser-claude-ai-btp#course`,
              },
              price: TARIF_SESSION_FORFAIT_HT,
              priceCurrency: 'EUR',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: TARIF_SESSION_FORFAIT_HT,
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
              price: TARIF_SESSION_FORFAIT_HT,
              priceCurrency: 'EUR',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: TARIF_SESSION_FORFAIT_HT,
                priceCurrency: 'EUR',
                unitText: 'par session (3 à 8 participants, MOE/MOEX)',
                valueAddedTaxIncluded: false,
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@id': `${BASE}/formations/application-metier-btp-niveau-1#course`,
              },
              price: getFormationByCode('NIV-06')!.prixHT || undefined,
              priceCurrency: 'EUR',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: getFormationByCode('NIV-06')!.prixHT || undefined,
                priceCurrency: 'EUR',
                unitText: 'par session (8 participants max, atelier avancé)',
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
          `${CATALOGUE_COUNT} formations IA pour les pros du BTP de 4 heures, certifiées Qualiopi, financement possible selon éligibilité, exclusivement en présentiel en Île-de-France (intra-entreprise, dans vos locaux).`,
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
                "Formation niveau 1 — 4 h : IA pour le bâtiment, la construction et les travaux publics, devis, chantier, documents. Qualiopi, Constructys.",
              url: `${BASE}/formations/ia-batiment-travaux-publics`,
              courseCode: 'NIV-01',
              educationalLevel: 'Beginner',
              inLanguage: 'fr-FR',
              about: [
                { '@type': 'Thing', name: 'Bâtiment' },
                { '@type': 'Thing', name: 'Construction' },
                { '@type': 'Thing', name: 'Travaux publics' },
              ],
              keywords:
                'formation IA bâtiment, formation IA construction, formation IA BTP, travaux publics, entreprises de construction',
              courseMode: 'Onsite',
              locationCreated: {
                '@type': 'Place',
                name: 'Île-de-France',
                address: {
                  '@type': 'PostalAddress',
                  addressRegion: 'Île-de-France',
                  addressCountry: 'FR',
                },
              },
              teaches: [
                'Usages de l’IA pour équipes bâtiment, construction et travaux publics',
                'Devis, comptes rendus et courriers avec ChatGPT / Claude',
                'Structuration de l’administratif et prompts métier',
                'Bonnes pratiques et validation humaine',
              ],
              occupationalCategory: 'BTP, Bâtiment, Construction, Travaux Publics',
              provider: { '@id': `${BASE}/#organization` },
              hasCourseInstance: {
                '@type': 'CourseInstance',
                courseMode: FORMATION_COURSE_MODE_ONSITE,
                courseWorkload: 'PT4H',
                location: {
                  '@type': 'Place',
                  name: 'Île-de-France',
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
                price: TARIF_SESSION_FORFAIT_HT,
                priceCurrency: 'EUR',
                availability: 'https://schema.org/InStock',
                url: `${BASE}/formations/ia-batiment-travaux-publics`,
                category: FORMATION_COURSE_OFFER_CATEGORY,
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
                courseMode: FORMATION_COURSE_MODE_ONSITE,
                courseWorkload: 'PT4H',
                location: {
                  '@type': 'Place',
                  name: 'Île-de-France',
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
                price: TARIF_SESSION_FORFAIT_HT,
                priceCurrency: 'EUR',
                availability: 'https://schema.org/InStock',
                url: `${BASE}/formations/ia-appels-offre-btp`,
                category: FORMATION_COURSE_OFFER_CATEGORY,
              },
            },
          },
          ...(includeNiv03
            ? [
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
                      courseMode: FORMATION_COURSE_MODE_ONSITE,
                      courseWorkload: 'PT4H',
                      location: {
                        '@type': 'Place',
                        name: 'Île-de-France',
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
                      price: TARIF_SESSION_FORFAIT_HT,
                      priceCurrency: 'EUR',
                      availability: 'https://schema.org/InStock',
                      url: `${BASE}/formations/ia-conduite-travaux-suivi-chantier`,
                      category: FORMATION_COURSE_OFFER_CATEGORY,
                    },
                  },
                },
              ]
            : []),
          {
            '@type': 'ListItem',
            position: includeNiv03 ? 4 : 3,
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
                courseMode: FORMATION_COURSE_MODE_ONSITE,
                courseWorkload: 'PT4H',
                location: {
                  '@type': 'Place',
                  name: 'Île-de-France',
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
                price: getFormationByCode('NIV-04')!.prixHT,
                priceCurrency: 'EUR',
                availability: 'https://schema.org/InStock',
                url: `${BASE}/formations/maitriser-claude-ai-btp`,
                category: FORMATION_COURSE_OFFER_CATEGORY,
              },
            },
          },
          {
            '@type': 'ListItem',
            position: includeNiv03 ? 5 : 4,
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
                courseMode: FORMATION_COURSE_MODE_ONSITE,
                courseWorkload: 'PT4H',
                location: {
                  '@type': 'Place',
                  name: 'Île-de-France',
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
                price: TARIF_SESSION_FORFAIT_HT,
                priceCurrency: 'EUR',
                availability: 'https://schema.org/InStock',
                url: `${BASE}/formations/ia-maitrise-oeuvre`,
                category: FORMATION_COURSE_OFFER_CATEGORY,
              },
            },
          },
          {
            '@type': 'ListItem',
            position: includeNiv03 ? 6 : 5,
            item: {
              '@type': 'Course',
              '@id': `${BASE}/formations/application-metier-btp-niveau-1#course`,
              name: NIV06_CATALOG.name,
              description: NIV06_CATALOG.description,
              url: `${BASE}/formations/application-metier-btp-niveau-1`,
              courseCode: 'NIV-06',
              educationalLevel: 'Advanced',
              inLanguage: 'fr-FR',
              teaches: NIV06_CATALOG.teaches,
              occupationalCategory: NIV06_CATALOG.occupationalCategory,
              provider: { '@id': `${BASE}/#organization` },
              hasCourseInstance: {
                '@type': 'CourseInstance',
                courseMode: FORMATION_COURSE_MODE_ONSITE,
                courseWorkload: 'PT7H',
                location: {
                  '@type': 'Place',
                  name: 'Île-de-France',
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
                price: getFormationByCode('NIV-06')!.prixHT || undefined,
                priceCurrency: 'EUR',
                availability: 'https://schema.org/InStock',
                url: `${BASE}/formations/application-metier-btp-niveau-1`,
                category: FORMATION_COURSE_OFFER_CATEGORY,
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
        name: 'Comment choisir sa formation IA pour les pros du BTP',
        description:
          "Méthode en 4 étapes pour choisir la formation IA appliquée au bâtiment adaptée à votre entreprise du bâtiment ou des travaux publics.",
        totalTime: 'PT15M',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Identifier le métier cible',
            text: includeNiv03
              ? 'Choisissez le parcours adapté : niveau 1 — L\'IA au service des pros du bâtiment et des travaux publics ; niveau 2 — L\'IA appliquée aux appels d\'offres BTP, L\'IA appliquée à la conduite de travaux, L\'IA au service des maîtres d\'œuvre, ou Maîtriser Claude AI pour le BTP.'
              : 'Choisissez le parcours adapté : niveau 1 — L\'IA au service des pros du bâtiment et des travaux publics ; niveau 2 — L\'IA appliquée aux appels d\'offres BTP, L\'IA au service des maîtres d\'œuvre, ou Maîtriser Claude AI pour le BTP.',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Évaluer le niveau IA des participants',
            text: `Si l'équipe n'a jamais utilisé ChatGPT ou Claude, partez sur une formation débutant. Si elle utilise déjà l'IA au quotidien et veut professionnaliser ses livrables, choisissez une formation avancée. ${libelleTarifsDualCourt(4)} (effectifs selon fiche — ex. niveau 1 : ${libelleEffectifFormation(FORMATION_NIV01)}).`,
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Choisir le format intra-entreprise, dans vos locaux',
            text: "Intra-entreprise : la formatrice se déplace dans vos locaux en Île-de-France, jusqu'à 12 participants selon la fiche catalogue.",
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
