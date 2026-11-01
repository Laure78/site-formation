/**
 * Fiches catalogue NIV-01…NIV-10 — Course + FAQPage JSON-LD.
 * Usage : `npx tsx scripts/assert-catalogue-formation-page-jsonld.ts`
 */
import assert from 'node:assert/strict';
import { formationTimeRequiredIso, type FormationCode } from '../data/formations';
import {
  FAQ_APPELS_OFFRE,
  FAQ_ASSISTANTS_IA_NIV09,
  FAQ_BATIMENT,
  FAQ_CONDUITE_TRAVAUX_NIV03,
  FAQ_MAITRISER_CLAUDE_NIV04,
} from '../lib/faq';
import { DEV_WEB_IA_FAQ } from '../lib/formation-developpement-web-ia-content';
import {
  buildCatalogueFormationCoursePageJsonLd,
  buildCatalogueFormationFaqPageJsonLd,
  getCatalogueFormationVisibleFaq,
} from '../lib/catalogue-formation-page-jsonld';
import { faqAnswerPlainTextForSchema } from '../lib/faq-plain-text';
import {
  assertFormationFicheCourseSchema,
  FORMATION_COURSE_OFFER_CATEGORY,
} from '../lib/schema-formation-course-jsonld';
import { getApplicationMetierNiveauByRef } from '../lib/parcours-applications-metier-btp-content';

const CATALOGUE_FICHES: Array<{
  ref: FormationCode;
  metierFaq?: readonly { q: string; a: string }[];
}> = [
  { ref: 'NIV-01', metierFaq: FAQ_BATIMENT },
  { ref: 'NIV-02', metierFaq: FAQ_APPELS_OFFRE },
  { ref: 'NIV-03', metierFaq: FAQ_CONDUITE_TRAVAUX_NIV03 },
  { ref: 'NIV-04', metierFaq: FAQ_MAITRISER_CLAUDE_NIV04 },
  { ref: 'NIV-05' },
  { ref: 'NIV-06', metierFaq: getApplicationMetierNiveauByRef('NIV-06').faq },
  { ref: 'NIV-07', metierFaq: getApplicationMetierNiveauByRef('NIV-07').faq },
  { ref: 'NIV-08', metierFaq: getApplicationMetierNiveauByRef('NIV-08').faq },
  { ref: 'NIV-09', metierFaq: FAQ_ASSISTANTS_IA_NIV09 },
  { ref: 'NIV-10', metierFaq: DEV_WEB_IA_FAQ },
];

function assertNoDistanciel(label: string, payload: unknown): void {
  const s = JSON.stringify(payload);
  const forbidden = [
    /distanciel/i,
    /\be-learning\b/i,
    /\bà distance\b/i,
    /courseMode":"online"/i,
    /"courseMode"\s*:\s*"Online"/,
  ];
  for (const re of forbidden) {
    assert.equal(re.test(s), false, `${label}: mention distancielle interdite (${re})`);
  }
}

for (const { ref, metierFaq = [] } of CATALOGUE_FICHES) {
  const label = ref;
  const duration = formationTimeRequiredIso(ref);
  const course = buildCatalogueFormationCoursePageJsonLd(ref);
  assertNoDistanciel(label, course);
  assertFormationFicheCourseSchema(course, label, { timeRequired: duration });

  const offers = course.offers as Record<string, unknown> | undefined;
  if (offers && offers.price != null && ref !== 'NIV-06' && ref !== 'NIV-07' && ref !== 'NIV-08') {
    assert.ok(typeof offers.price === 'number' || typeof offers.price === 'string', `${label}: offers.price`);
  }
  assert.equal(offers?.category, FORMATION_COURSE_OFFER_CATEGORY, `${label}: offers.category`);

  const visibleFaq = getCatalogueFormationVisibleFaq(ref, metierFaq);
  assert.ok(visibleFaq.length >= 5, `${label}: FAQ visible (noyau) attendue`);

  const faqSchema = buildCatalogueFormationFaqPageJsonLd(ref, metierFaq);
  assert.ok(faqSchema, `${label}: FAQPage JSON-LD`);
  assert.equal(faqSchema!['@type'], 'FAQPage', `${label}: @type FAQPage`);

  const mainEntity = faqSchema!.mainEntity as Array<{ name: string; acceptedAnswer: { text: string } }>;
  assert.equal(mainEntity.length, visibleFaq.length, `${label}: nombre de questions FAQ = page`);

  for (let i = 0; i < visibleFaq.length; i += 1) {
    assert.equal(mainEntity[i]!.name, visibleFaq[i]!.q, `${label}: question FAQ ${i + 1}`);
    const expected = faqAnswerPlainTextForSchema(visibleFaq[i]!.a);
    assert.equal(mainEntity[i]!.acceptedAnswer.text, expected, `${label}: réponse FAQ ${i + 1}`);
  }

  console.log(`✓ ${label} — Course ${duration}, FAQ ×${visibleFaq.length}`);
}

console.log('\nassert-catalogue-formation-page-jsonld : OK');
