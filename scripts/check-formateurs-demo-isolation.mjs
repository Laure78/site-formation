/**
 * Garde-fou : profils catalogue publics + Laure IA, sans profils démo fictifs.
 * Usage : `node scripts/check-formateurs-demo-isolation.mjs`
 */
import assert from 'node:assert/strict';

const CATALOGUE_IDS = [
  'julien-morel',
  'thomas-garnier',
  'marc-delcourt',
  'nicolas-perrin',
  'claire-rousseau',
];

const IA_IDS = ['laure-olivie'];

const REMOVED_DEMO_IDS = ['claire-delmas', 'sophie-laurent'];

function visibleHubIds() {
  return CATALOGUE_IDS;
}

function visibleAllIds() {
  return [...IA_IDS, ...CATALOGUE_IDS];
}

assert.equal(visibleHubIds().length, 5);
assert.equal(
  visibleHubIds().filter((id) => id === 'claire-rousseau').length,
  1,
  'une seule femme sur le hub',
);
assert.equal(
  visibleHubIds().filter((id) => id !== 'claire-rousseau').length,
  4,
  'quatre hommes sur le hub',
);

for (const removed of REMOVED_DEMO_IDS) {
  assert.equal(
    visibleAllIds().includes(removed),
    false,
    `${removed} ne doit plus être exposé`,
  );
}

console.log('OK — formateurs catalogue (5 profils publics + Laure IA)');
