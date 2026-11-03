/**
 * Applique les migrations extranet formateurs (071 + 072).
 *
 * Usage : node scripts/apply-extranet-migrations.mjs
 *
 * Prérequis (.env.local) : DATABASE_URL ou SUPABASE_DB_PASSWORD + NEXT_PUBLIC_SUPABASE_URL
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const { Client } = pg;

const MIGRATIONS = [
  '071_extranet_formateurs.sql',
  '072_extranet_formateurs_phase2.sql',
];

function buildDatabaseUrl() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  if (process.env.SUPABASE_DB_URL) return process.env.SUPABASE_DB_URL;

  const password = process.env.SUPABASE_DB_PASSWORD;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!password || !supabaseUrl) return null;

  const host = new URL(supabaseUrl).hostname;
  const ref = host.split('.')[0];
  return `postgresql://postgres:${encodeURIComponent(password)}@db.${ref}.supabase.co:5432/postgres`;
}

async function main() {
  const databaseUrl = buildDatabaseUrl();
  if (!databaseUrl) {
    console.error(
      'Manque DATABASE_URL, SUPABASE_DB_URL ou SUPABASE_DB_PASSWORD (+ NEXT_PUBLIC_SUPABASE_URL).',
    );
    process.exit(1);
  }

  const client = new Client({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();
  try {
    for (const file of MIGRATIONS) {
      const sqlPath = resolve('supabase/migrations', file);
      const sql = readFileSync(sqlPath, 'utf8');
      console.log(`→ Application ${file}…`);
      await client.query(sql);
      console.log(`  OK ${file}`);
    }

    const tables = await client.query(`
      select table_name
      from information_schema.tables
      where table_schema = 'public'
        and table_name in (
          'extranet_trainers',
          'extranet_missions',
          'extranet_programs'
        )
      order by table_name
    `);
    const bucket = await client.query(`
      select id, public from storage.buckets where id = 'extranet-formateurs'
    `);
    const charter = await client.query(`
      select version_label from public.extranet_charter_versions where is_current = true limit 1
    `);

    console.log('\nExtranet formateurs — vérification :');
    console.log('  Tables :', tables.rows.map((r) => r.table_name).join(', ') || 'aucune');
    console.log(
      '  Bucket extranet-formateurs :',
      bucket.rows[0] ? `id=${bucket.rows[0].id} public=${bucket.rows[0].public}` : 'absent',
    );
    console.log('  Charte courante :', charter.rows[0]?.version_label ?? '—');
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error('Échec migration extranet :', err.message);
  process.exit(1);
});
