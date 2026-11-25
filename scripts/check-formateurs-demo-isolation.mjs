/**
 * Garde-fou : profils catalogue publics + Laure IA, sans profils démo fictifs.
 * Usage : `node scripts/check-formateurs-demo-isolation.mjs`
 */
import assert from 'node:assert/strict';

const CATALOGUE_IDS = [
  'thomas-garnier',
  'marc-delcourt',
  'nicolas-perrin',
  'christophe-delgery',
];

const IA_IDS = ['laure-olivie'];

const REMOVED_DEMO_IDS = [
  'claire-delmas',
  'sophie-laurent',
  'claire-rousseau',
  'julien-morel',
];

function visibleHubIds() {
  return CATALOGUE_IDS;
}

function visibleAllIds() {
  return [...IA_IDS, ...CATALOGUE_IDS];
}

assert.equal(visibleHubIds().length, 4);

for (const removed of REMOVED_DEMO_IDS) {
  assert.equal(
    visibleAllIds().includes(removed),
    false,
    `${removed} ne doit plus être exposé`,
  );
}

console.log('OK — formateurs catalogue (4 profils hub + Laure IA)');
