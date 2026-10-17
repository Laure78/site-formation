/**
 * Validation Zod des formulaires carrière — sans envoi réseau.
 * Usage : node scripts/assert-career-form-validation.mjs
 */
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const snippet = `
import {
  parseCareerFormPayload,
  consultantCareerSchema,
  spontaneousCareerSchema,
} from './lib/career-form-validation.ts';

const consultantOk = parseCareerFormPayload({
  kind: 'consultant',
  firstName: 'Jean',
  lastName: 'Dupont',
  email: 'test-dev@example.invalid',
  expertiseDomain: 'conduite-travaux',
  mobilityIdf: 'oui',
  presentation: 'Plus de dix ans en conduite de travaux BTP, usage quotidien de Claude et animation de formations internes.',
  sourcePage: 'https://www.laureolivie.fr/devenez-consultant',
  website: '',
});
if (!consultantOk.success) throw new Error('consultantOk: ' + JSON.stringify(consultantOk.fieldErrors));

const consultantKo = consultantCareerSchema.safeParse({
  kind: 'consultant',
  firstName: '',
  lastName: 'X',
  email: 'bad',
  expertiseDomain: 'conduite-travaux',
  mobilityIdf: 'oui',
  presentation: 'trop court',
  sourcePage: '/devenez-consultant',
  website: '',
});
if (consultantKo.success) throw new Error('consultantKo should fail');

const spontaneousOk = parseCareerFormPayload({
  kind: 'spontaneous',
  firstName: 'Marie',
  lastName: 'Martin',
  email: 'test-dev@example.invalid',
  applicationType: 'emploi',
  desiredRole: 'Chargé de formation',
  presentation: 'Parcours administratif et digital dans le BTP, envie de contribuer à un organisme Qualiopi.',
  sourcePage: 'https://www.laureolivie.fr/candidatures-spontanees',
  website: '',
});
if (!spontaneousOk.success) throw new Error('spontaneousOk: ' + JSON.stringify(spontaneousOk.fieldErrors));

console.log('assert-career-form-validation: OK');
`;

const r = spawnSync('npx', ['tsx', '-e', snippet], {
  cwd: root,
  encoding: 'utf8',
  stdio: ['ignore', 'pipe', 'pipe'],
});

if (r.status !== 0) {
  console.error(r.stderr || r.stdout);
  process.exit(1);
}
console.log(r.stdout.trim());
assert.equal(r.status, 0);
