/**
 * Validation JSON-LD Schema.org — Course sur les fiches formation.
 * Usage : node scripts/validate-formation-course-jsonld.mjs
 */
import { formationTimeRequiredIso } from '../data/formations.ts';
import { buildCatalogueCourseJsonLdByRef } from '../lib/schema-catalogue-course-jsonld.ts';
import { buildCatalogFormationCoursePageSchema } from '../lib/catalog-formation-course-page-jsonld.ts';
import {
  FORMATIONS_CATALOG_SCHEMA,
  getCourseJsonLdFromFormationsData,
  getDedicatedFormationCoursePageJsonLd,
} from '../lib/schema-course-formations.ts';
import { assertFormationFicheCourseSchema, FORMATION_COURSE_OFFER_CATEGORY } from '../lib/schema-formation-course-jsonld.ts';
import { getCourseSchema } from '../lib/seo.ts';

const CATALOGUE_REFS = [
  'NIV-01',
  'NIV-02',
  'NIV-03',
  'NIV-04',
  'NIV-05',
  'NIV-06',
  'NIV-07',
  'NIV-08',
  'NIV-09',
  'NIV-10',
];

const BLOCKS = [
  ...CATALOGUE_REFS.map((ref) => ({
    name: `catalogue-${ref.toLowerCase()}`,
    schema: buildCatalogueCourseJsonLdByRef(ref),
    ref,
  })),
  {
    name: 'catalog-formation-page',
    schema: buildCatalogFormationCoursePageSchema(FORMATIONS_CATALOG_SCHEMA[0]),
  },
  {
    name: 'formations-data-slug',
    schema: getCourseJsonLdFromFormationsData('ia-batiment-travaux-publics'),
  },
  {
    name: 'dedicated-niv-02',
    schema: getDedicatedFormationCoursePageJsonLd('/formations/ia-appels-offre-btp'),
  },
  {
    name: 'geo-getCourseSchema',
    schema: getCourseSchema({
      name: 'Formation IA BTP — Morangis',
      description: 'Session 4 h en présentiel en Île-de-France.',
      path: '/formations/ia-btp-morangis',
      educationalLevel: 'Professionnel',
    }),
  },
];

function assertOfferRules(name, schema) {
  const offers = schema.offers;
  if (!offers || typeof offers !== 'object') {
    throw new Error(`${name}: offers manquant`);
  }
  if (offers.priceCurrency !== 'EUR') {
    throw new Error(`${name}: priceCurrency EUR requis`);
  }
  if (offers.category !== FORMATION_COURSE_OFFER_CATEGORY) {
    throw new Error(`${name}: category « ${FORMATION_COURSE_OFFER_CATEGORY} » requise`);
  }
  if (name.startsWith('catalogue-niv-')) {
    const surDevis = ['catalogue-niv-06', 'catalogue-niv-07', 'catalogue-niv-08'].includes(name);
    if (!surDevis && offers.price == null) {
      throw new Error(`${name}: price requis`);
    }
  }
}

let ok = true;
for (const block of BLOCKS) {
  const { name, schema } = block;
  try {
    if (!schema) throw new Error('schéma null');
    JSON.stringify(schema);
    if (schema['@context'] !== 'https://schema.org') {
      throw new Error('@context schema.org requis');
    }
    const duration = block.ref ? formationTimeRequiredIso(block.ref) : undefined;
    assertFormationFicheCourseSchema(schema, name, duration ? { timeRequired: duration } : {});
    if (name.startsWith('catalogue-niv-')) {
      assertOfferRules(name, schema);
    }
    console.log(`✓ ${name}`);
  } catch (err) {
    ok = false;
    console.error(`✗ ${name}:`, err.message);
  }
}

if (!ok) process.exit(1);
console.log('\nValidation JSON-LD OK — Course fiches formation (présentiel IDF, durées PT4H/PT7H/PT14H, inter).');
