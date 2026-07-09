/**
 * Validation JSON-LD Schema.org — Course sur les fiches formation.
 * Usage : node scripts/validate-formation-course-jsonld.mjs
 */
import { buildCatalogueCourseIaBtpNiv01JsonLd } from '../lib/schema-catalogue-course-jsonld.ts';
import { buildCatalogueCourseMaitriseOeuvreNiv05JsonLd } from '../lib/schema-catalogue-course-jsonld.ts';
import { buildCatalogFormationCoursePageSchema } from '../lib/catalog-formation-course-page-jsonld.ts';
import {
  FORMATIONS_CATALOG_SCHEMA,
  getCourseJsonLdFromFormationsData,
  getDedicatedFormationCoursePageJsonLd,
} from '../lib/schema-course-formations.ts';
import { assertFormationFicheCourseSchema } from '../lib/schema-formation-course-jsonld.ts';
import { getCourseSchema } from '../lib/seo.ts';

const BLOCKS = [
  { name: 'catalogue-niv-01', schema: buildCatalogueCourseIaBtpNiv01JsonLd() },
  { name: 'catalogue-niv-05', schema: buildCatalogueCourseMaitriseOeuvreNiv05JsonLd() },
  {
    name: 'catalog-formation-page',
    schema: buildCatalogFormationCoursePageSchema(FORMATIONS_CATALOG_SCHEMA[0]),
  },
  {
    name: 'formations-data-slug',
    schema: getCourseJsonLdFromFormationsData('ia-batiment-travaux-publics'),
  },
  {
    name: 'dedicated-cctp',
    schema: getDedicatedFormationCoursePageJsonLd('/formations/formation-ia-cctp-analyse-dce-btp'),
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

let ok = true;
for (const { name, schema } of BLOCKS) {
  try {
    if (!schema) throw new Error('schéma null');
    JSON.stringify(schema);
    if (schema['@context'] !== 'https://schema.org') {
      throw new Error('@context schema.org requis');
    }
    assertFormationFicheCourseSchema(schema, name);
    console.log(`✓ ${name}`);
  } catch (err) {
    ok = false;
    console.error(`✗ ${name}:`, err.message);
  }
}

if (!ok) process.exit(1);
console.log('\nValidation JSON-LD OK — Course fiches formation conformes (présentiel IDF, 4 h, intra/inter).');
