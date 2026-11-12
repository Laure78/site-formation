/**
 * JSON-LD — 7 fiches `/formations/parcours/[slug]` (Course, ItemList modules, FAQPage).
 * Usage : `npx tsx scripts/assert-parcours-metiers-jsonld.ts`
 */
import assert from 'node:assert/strict';
import { PARCOURS_CATALOGUE_2027, computeParcours } from '../data/catalogue-2027';
import { parcoursHref } from '../lib/catalogue-2027/parcours-href';
import { getParcoursMetierFaqForPage } from '../lib/catalogue-2027/parcours-metiers-faq-pages';
import { PARCOURS_TARIF_INTER_CALCULE_MENTION } from '../lib/catalogue-2027/parcours-affichage';
import { faqAnswerPlainTextForSchema } from '../lib/faq-plain-text';
import { SCHEMA_PUBLIC_SITE_URL } from '../lib/schema-constants';
import {
  buildParcoursMetierCourseJsonLd,
  buildParcoursMetierFaqPageJsonLd,
  buildParcoursModulesItemListJsonLd,
} from '../lib/schema-parcours-metiers-jsonld';
import {
  assertFormationFicheCourseSchema,
  FORMATION_COURSE_OFFER_CATEGORY,
} from '../lib/schema-formation-course-jsonld';
import { FAQ_SCHEMA_MAX } from '../lib/seo';

const BASE = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');

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

assert.equal(
  PARCOURS_CATALOGUE_2027.length,
  7,
  'Attendu exactement 7 parcours dans PARCOURS_CATALOGUE_2027',
);

for (const raw of PARCOURS_CATALOGUE_2027) {
  const label = `${raw.id} (${raw.slug})`;
  const computed = computeParcours(raw);
  const duration = `PT${computed.dureeHeures}H`;
  const path = parcoursHref(raw.id);
  const pageUrl = `${BASE}${path}`;

  const course = buildParcoursMetierCourseJsonLd(computed);
  assertNoDistanciel(label, course);
  assertFormationFicheCourseSchema(course, label, { timeRequired: duration });

  assert.equal(course.url, pageUrl, `${label}: url Course`);
  assert.match(String(course.name), /Parcours .+ — formation IA BTP/, `${label}: name`);

  const offers = course.offers as Record<string, unknown> | undefined;
  assert.ok(offers, `${label}: offers`);
  assert.equal(offers!['@type'], 'Offer', `${label}: offers.@type`);
  assert.equal(offers!.price, computed.prixInterHt, `${label}: offers.price`);
  assert.equal(offers!.priceCurrency, 'EUR', `${label}: offers.priceCurrency`);
  assert.equal(offers!.category, FORMATION_COURSE_OFFER_CATEGORY, `${label}: offers.category`);
  assert.equal(
    offers!.availability,
    'https://schema.org/PreOrder',
    `${label}: ouverture 2027 → PreOrder`,
  );
  assert.equal(offers!.url, pageUrl, `${label}: offers.url`);

  const priceSpec = offers!.priceSpecification as Record<string, unknown> | undefined;
  assert.ok(priceSpec, `${label}: priceSpecification`);
  assert.equal(
    priceSpec!.description,
    PARCOURS_TARIF_INTER_CALCULE_MENTION,
    `${label}: mention tarif parcours`,
  );

  const modulesList = buildParcoursModulesItemListJsonLd(computed);
  assert.equal(modulesList['@type'], 'ItemList', `${label}: modules @type`);
  assert.equal(modulesList['@id'], `${pageUrl}#modules`, `${label}: modules @id`);
  assert.equal(modulesList.numberOfItems, computed.etapes.length, `${label}: numberOfItems`);
  const elements = modulesList.itemListElement as Array<Record<string, unknown>>;
  assert.equal(elements.length, computed.etapes.length, `${label}: itemListElement length`);
  for (let i = 0; i < elements.length; i += 1) {
    const el = elements[i]!;
    assert.equal(el['@type'], 'ListItem', `${label}: module ${i + 1} @type`);
    assert.equal(el.position, i + 1, `${label}: module ${i + 1} position`);
    assert.ok(typeof el.name === 'string' && el.name.length > 0, `${label}: module ${i + 1} name`);
    assert.ok(
      typeof el.description === 'string' && el.description.length > 0,
      `${label}: module ${i + 1} description`,
    );
  }

  const visibleFaq = getParcoursMetierFaqForPage(raw.id, computed);
  assert.ok(visibleFaq.length >= 3, `${label}: FAQ visible (≥ 3)`);

  const faqSchema = buildParcoursMetierFaqPageJsonLd(raw.id, computed);
  assert.ok(faqSchema, `${label}: FAQPage JSON-LD`);
  assert.equal(faqSchema!['@type'], 'FAQPage', `${label}: FAQ @type`);

  const expectedCount = Math.min(visibleFaq.length, FAQ_SCHEMA_MAX);
  const mainEntity = faqSchema!.mainEntity as Array<{
    name: string;
    acceptedAnswer: { text: string };
  }>;
  assert.equal(mainEntity.length, expectedCount, `${label}: nombre de questions FAQ`);

  for (let i = 0; i < expectedCount; i += 1) {
    assert.equal(mainEntity[i]!.name, visibleFaq[i]!.q.trim(), `${label}: question FAQ ${i + 1}`);
    const expectedAnswer = faqAnswerPlainTextForSchema(visibleFaq[i]!.a).trim();
    assert.equal(
      mainEntity[i]!.acceptedAnswer.text,
      expectedAnswer,
      `${label}: réponse FAQ ${i + 1}`,
    );
  }

  console.log(
    `✓ ${raw.id} — Course ${duration}, ${computed.etapes.length} modules, FAQ ×${expectedCount}`,
  );
}

console.log('\nassert-parcours-metiers-jsonld : OK');
