/**
 * Assertions titres SEO — séparateurs orphelins (` · |`, ` | |`).
 * Usage : `npx tsx scripts/assert-branded-titles.ts`
 *
 * Ne dépend pas du graphe Next/blog (évite les imports lourds) :
 * teste le helper `utils/metadata.ts` + les chaînes cibles /blog.
 */
import assert from 'node:assert/strict';
import {
  assertBrandedTitleClean,
  buildTitle,
  joinTitleSegments,
  BRAND_TITLE_SUFFIX,
  SEO_TITLE_MAX_LENGTH,
} from '../utils/metadata';

function expectThrows(fn: () => void, label: string): void {
  let threw = false;
  const prev = process.env.NODE_ENV;
  process.env.NODE_ENV = 'development';
  try {
    fn();
  } catch {
    threw = true;
  } finally {
    process.env.NODE_ENV = prev;
  }
  assert.equal(threw, true, label);
}

// 1. joinTitleSegments filtre les vides avant « · »
assert.equal(
  joinTitleSegments('Blog IA BTP', '', undefined, null, 'page 2'),
  'Blog IA BTP · page 2',
);
assert.equal(joinTitleSegments('', null, undefined), '');
assert.equal(joinTitleSegments('Seul'), 'Seul');

// 2. Truncature d’un titre long avec « · » : plus de « · | »
const orphanRisk = buildTitle(
  "Blog Formation IA pour les pros du BTP · Guides & cas d'usage",
);
assert.doesNotMatch(orphanRisk, / ·\s*\|/, `orphelin · | dans « ${orphanRisk} »`);
assert.doesNotMatch(orphanRisk, /\|\s*\|/, `orphelin | | dans « ${orphanRisk} »`);
assert.ok(orphanRisk.endsWith(BRAND_TITLE_SUFFIX));
assert.ok(
  orphanRisk.length <= SEO_TITLE_MAX_LENGTH,
  `title trop long (${orphanRisk.length}) : « ${orphanRisk} »`,
);

// 3. assertBrandedTitleClean échoue en dev sur formes orphelines
expectThrows(
  () =>
    assertBrandedTitleClean(
      'Blog Formation IA pour les pros du BTP · | Laure Olivié',
    ),
  'doit échouer sur « · | »',
);
expectThrows(
  () => assertBrandedTitleClean('Titre | | Laure Olivié'),
  'doit échouer sur « | | »',
);

// 4. Cible /blog (alignée sur lib/blog-metadata.ts)
const BLOG_SEGMENT = "Blog IA pour le BTP — guides et cas d'usage";
const BLOG_TITLE = buildTitle(BLOG_SEGMENT);
assert.equal(BLOG_TITLE, "Blog IA pour le BTP — guides et cas d'usage | Laure Olivié");
assert.ok(BLOG_TITLE.length <= SEO_TITLE_MAX_LENGTH);

const BLOG_DESC =
  "Articles IA pour le BTP : devis, CCTP/DCE, appels d'offres, ChatGPT, Constructys. 34 guides pratiques par Laure Olivié, Qualiopi, présentiel Île-de-France.";
assert.equal(BLOG_DESC.length, 155);

// 5. Pagination / catégorie — mêmes helpers
const page2 = buildTitle(joinTitleSegments('Blog IA BTP', 'page 2'));
assertBrandedTitleClean(page2, '/blog/page/2');
assert.doesNotMatch(page2, / ·\s*\|/);

const cat = buildTitle(joinTitleSegments('Articles IA BTP', 'Métiers'));
assertBrandedTitleClean(cat, '/blog/categorie/metiers');
assert.doesNotMatch(cat, / ·\s*\|/);

const catPage = buildTitle(
  joinTitleSegments('Blog IA BTP', 'Métiers', 'p.2'),
);
assertBrandedTitleClean(catPage, '/blog/categorie/metiers/2');

console.log('OK — assert-branded-titles');
