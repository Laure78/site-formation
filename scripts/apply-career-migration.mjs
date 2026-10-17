/**
 * Applique supabase/migrations/068_career_applications.sql
 *
 * Usage :
 *   node scripts/apply-career-migration.mjs
 *
 * Prérequis (.env.local) : DATABASE_URL ou SUPABASE_DB_PASSWORD + NEXT_PUBLIC_SUPABASE_URL
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const { Client } = pg;

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

  const sqlPath = resolve('supabase/migrations/068_career_applications.sql');
  const sql = readFileSync(sqlPath, 'utf8');

  const client = new Client({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();
  try {
    await client.query(sql);
    const check = await client.query(`
      select table_name
      from information_schema.tables
      where table_schema = 'public' and table_name = 'career_applications'
    `);
    const bucket = await client.query(`
      select id, public from storage.buckets where id = 'career-cvs'
    `);
    console.log(
      'Migration carrière OK.',
      'Table:',
      check.rows[0]?.table_name ?? 'absente',
      '| Bucket career-cvs public=',
      bucket.rows[0]?.public ?? 'absent',
    );
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error('Échec migration carrière :', err.message);
  process.exit(1);
});
