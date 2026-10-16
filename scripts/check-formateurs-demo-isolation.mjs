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
  'intervenante-assistance-travaux-btp',
  'formateur-coordination-sps',
];

const HUB_ONLY_IDS = [
  'intervenante-assistance-travaux-btp',
  'formateur-coordination-sps',
];

const IA_IDS = ['laure-olivie'];

const REMOVED_DEMO_IDS = ['claire-delmas', 'sophie-laurent'];

function visibleHubIds() {
  return CATALOGUE_IDS;
}

function visibleAllIds() {
  return [...IA_IDS, ...CATALOGUE_IDS];
}

assert.equal(visibleHubIds().length, 7);
assert.equal(
  visibleHubIds().filter((id) => HUB_ONLY_IDS.includes(id)).length,
  HUB_ONLY_IDS.length,
  'fiches brouillon hub-only présentes',
);
assert.equal(
  visibleAllIds().filter((id) => HUB_ONLY_IDS.includes(id)).length,
  HUB_ONLY_IDS.length,
  'brouillons visibles sur le hub avec Laure',
);

for (const removed of REMOVED_DEMO_IDS) {
  assert.equal(
    visibleAllIds().includes(removed),
    false,
    `${removed} ne doit plus être exposé`,
  );
}

console.log('OK — formateurs catalogue (7 profils hub + Laure IA, 2 brouillons hub-only)');
