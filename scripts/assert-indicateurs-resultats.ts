/**
 * Contrôles bloquants — indicateurs de résultats publics.
 * Usage : `npx tsx scripts/assert-indicateurs-resultats.ts`
 */
import assert from 'node:assert/strict';
import {
  assertIndicateursResultatsCoherents,
  formatDateMiseAJourIndicateurs,
  formatNoteSatisfactionSur5,
  indicateursResultats,
  INDICATEUR_NON_PUBLIE_LIBELLE,
} from '../lib/data/indicateurs-resultats';

assertIndicateursResultatsCoherents();

assert.equal(indicateursResultats.noteSatisfaction, 4.45);
assert.equal(indicateursResultats.nombreRepondants, 20);
assert.equal(formatNoteSatisfactionSur5(), '4,45/5');
assert.equal(formatDateMiseAJourIndicateurs(), '23/08/2026');
assert.equal(indicateursResultats.volumePublieSurPageIndicateurs, false);
assert.equal(indicateursResultats.nonPublies.tauxAbandon.status, 'not_published');
assert.ok(INDICATEUR_NON_PUBLIE_LIBELLE.length > 10);

const publishedStrings = [
  formatNoteSatisfactionSur5(),
  indicateursResultats.periodeReference,
  indicateursResultats.scopeLabel,
  indicateursResultats.sourceLabel,
  ...indicateursResultats.limitations,
];

for (const s of publishedStrings) {
  assert.equal(s.includes('__'), false, `Placeholder « __ » détecté dans : ${s}`);
  assert.equal(/JJ\/MM\/AAAA/.test(s), false, `Placeholder date détecté dans : ${s}`);
}

console.log('assert-indicateurs-resultats : OK');
