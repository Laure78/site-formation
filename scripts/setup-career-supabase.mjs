/**
 * Vérifie / complète l’infra carrière Supabase (bucket privé).
 * La table `career_applications` doit exister (migration 068) — SQL direct ou db:migrate:career.
 *
 * Usage : node scripts/setup-career-supabase.mjs
 */
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: '.env.local' });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error('NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY requis dans .env.local');
  process.exit(1);
}

const admin = createClient(url, key, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function main() {
  const { error: tableError } = await admin.from('career_applications').select('id').limit(1);
  if (tableError) {
    console.error(
      'Table career_applications absente ou inaccessible :',
      tableError.message,
    );
    console.error(
      '→ Exécutez supabase/migrations/068_career_applications.sql dans le SQL Editor Supabase,\n' +
        '  ou : npm run db:migrate:career (avec DATABASE_URL ou SUPABASE_DB_PASSWORD).',
    );
    process.exit(1);
  }
  console.log('Table career_applications : OK');

  const { data: buckets, error: listErr } = await admin.storage.listBuckets();
  if (listErr) {
    console.error('Liste buckets :', listErr.message);
    process.exit(1);
  }

  const exists = buckets?.some((b) => b.id === 'career-cvs');
  if (!exists) {
    const { error: createErr } = await admin.storage.createBucket('career-cvs', {
      public: false,
      fileSizeLimit: 5 * 1024 * 1024,
      allowedMimeTypes: ['application/pdf'],
    });
    if (createErr) {
      console.error('Création bucket career-cvs :', createErr.message);
      process.exit(1);
    }
    console.log('Bucket career-cvs créé.');
  } else {
    console.log('Bucket career-cvs : OK');
  }

  console.log('Infra carrière prête.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
