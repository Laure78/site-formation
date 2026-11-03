/**
 * Vérifie tables / bucket extranet (service role — sans mot de passe DB).
 * Usage : node scripts/verify-extranet-supabase.mjs
 */
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: '.env.local' });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error('NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY requis.');
  process.exit(1);
}

const admin = createClient(url, key, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const TABLES = [
  'extranet_trainers',
  'extranet_programs',
  'extranet_missions',
  'extranet_trainer_resources',
  'extranet_competency_evaluations',
  'extranet_subcontractor_controls',
  'extranet_quality_actions',
];

async function main() {
  let ok = true;
  for (const table of TABLES) {
    const { error } = await admin.from(table).select('id').limit(1);
    if (error) {
      console.log(`✗ ${table} : ${error.message}`);
      ok = false;
    } else {
      console.log(`✓ ${table}`);
    }
  }

  const { data: buckets } = await admin.storage.listBuckets();
  const bucket = buckets?.find((b) => b.id === 'extranet-formateurs');
  if (bucket) {
    console.log(`✓ bucket extranet-formateurs (public=${bucket.public})`);
  } else {
    console.log('✗ bucket extranet-formateurs absent');
    ok = false;
  }

  if (!ok) {
    console.log('\n→ Appliquer les migrations : npm run db:migrate:extranet');
    console.log('  (ajoutez SUPABASE_DB_PASSWORD dans .env.local — Supabase → Project Settings → Database)');
    console.log('  ou collez supabase/migrations/071 puis 072 dans le SQL Editor Supabase.');
    process.exit(1);
  }
  console.log('\nExtranet Supabase : prêt.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
