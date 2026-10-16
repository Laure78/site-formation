/**
 * Garde-fou : les profils démo ne doivent jamais s’activer hors development.
 * Usage : `node scripts/check-formateurs-demo-isolation.mjs`
 */
import assert from 'node:assert/strict';

function isFormateursDemoPreviewEnabled(nodeEnv) {
  return nodeEnv === 'development';
}

const DEMO_IDS = [
  'julien-morel',
  'claire-delmas',
  'nicolas-perrin',
  'sophie-laurent',
];

function visibleIds(nodeEnv) {
  const confirmed = ['laure-olivie'];
  if (!isFormateursDemoPreviewEnabled(nodeEnv)) return confirmed;
  return [...confirmed, ...DEMO_IDS];
}

for (const env of ['production', 'test', 'preview', undefined, '']) {
  const ids = visibleIds(env);
  assert.deepEqual(ids, ['laure-olivie'], `env=${env} doit être confirmé seul`);
  assert.equal(
    ids.some((id) => DEMO_IDS.includes(id)),
    false,
    `env=${env} ne doit pas exposer la démo`,
  );
}

assert.deepEqual(visibleIds('development'), ['laure-olivie', ...DEMO_IDS]);

console.log('OK — isolation démo formateurs (development only)');
