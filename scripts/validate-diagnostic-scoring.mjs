#!/usr/bin/env node
/**
 * Valide les profils de test du diagnostic IA BTP.
 * Usage : node scripts/validate-diagnostic-scoring.mjs
 */
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

async function main() {
  // Compile TS via tsx if available, else use dynamic import with ts-node
  const { register } = await import('tsx/esm/api').catch(() => null);
  if (register) register();

  const { validateDiagnosticTestProfiles, DIAGNOSTIC_TEST_PROFILES, computeDiagnosticResult } =
    await import('../lib/diagnostic-ia-btp/scoring.ts');

  const { ok, failures } = validateDiagnosticTestProfiles();

  for (const profile of DIAGNOSTIC_TEST_PROFILES) {
    const result = computeDiagnosticResult(profile.answers);
    console.log(`\n${profile.name}`);
    console.log(`  Formation : ${result?.training.title}`);
    console.log(`  Priorités : ${result?.priorities.map((p) => p.title).join(' · ')}`);
    console.log(`  Scores : maturité ${result?.scores.maturity} · gain ${result?.scores.gainPotential}`);
  }

  if (!ok) {
    console.error('\nÉchecs :');
    failures.forEach((f) => console.error(`  - ${f}`));
    process.exit(1);
  }

  console.log('\n✓ Tous les profils de test passent.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
