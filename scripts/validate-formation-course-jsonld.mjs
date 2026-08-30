/**
 * Validation JSON-LD Schema.org — Course sur les fiches formation.
 * Usage : node scripts/validate-formation-course-jsonld.mjs
 */
import {
  buildCatalogueCourseIaBtpNiv01JsonLd,
  buildCatalogueCourseIaAppelsOffreNiv02JsonLd,
  buildCatalogueCourseConduiteTravauxNiv03JsonLd,
  buildCatalogueCourseMaitriserClaudeNiv04JsonLd,
  buildCatalogueCourseMaitriseOeuvreNiv05JsonLd,
  buildCatalogueCourseCursorBtpNiv06JsonLd,
} from '../lib/schema-catalogue-course-jsonld.ts';
import { buildCatalogFormationCoursePageSchema } from '../lib/catalog-formation-course-page-jsonld.ts';
import {
  FORMATIONS_CATALOG_SCHEMA,
  getCourseJsonLdFromFormationsData,
  getDedicatedFormationCoursePageJsonLd,
} from '../lib/schema-course-formations.ts';
import { assertFormationFicheCourseSchema, FORMATION_COURSE_OFFER_CATEGORY } from '../lib/schema-formation-course-jsonld.ts';
import { getCourseSchema } from '../lib/seo.ts';

const BLOCKS = [
  { name: 'catalogue-niv-01', schema: buildCatalogueCourseIaBtpNiv01JsonLd() },
  { name: 'catalogue-niv-02', schema: buildCatalogueCourseIaAppelsOffreNiv02JsonLd() },
  { name: 'catalogue-niv-03', schema: buildCatalogueCourseConduiteTravauxNiv03JsonLd() },
  { name: 'catalogue-niv-04', schema: buildCatalogueCourseMaitriserClaudeNiv04JsonLd() },
  { name: 'catalogue-niv-05', schema: buildCatalogueCourseMaitriseOeuvreNiv05JsonLd() },
  { name: 'catalogue-niv-06', schema: buildCatalogueCourseCursorBtpNiv06JsonLd() },
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
    if (offers.price == null) {
      throw new Error(`${name}: price requis`);
    }
  }
}

let ok = true;
for (const { name, schema } of BLOCKS) {
  try {
    if (!schema) throw new Error('schéma null');
    JSON.stringify(schema);
    if (schema['@context'] !== 'https://schema.org') {
      throw new Error('@context schema.org requis');
    }
    assertFormationFicheCourseSchema(schema, name);
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
console.log('\nValidation JSON-LD OK — Course fiches formation conformes (présentiel IDF, 4 h, intra/inter).');
