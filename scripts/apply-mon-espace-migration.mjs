/**
 * Applique supabase/migrations/048_mon_espace_admin.sql
 *
 * Usage :
 *   DATABASE_URL="postgresql://..." node scripts/apply-mon-espace-migration.mjs
 *
 * Ou avec mot de passe DB Supabase :
 *   SUPABASE_DB_PASSWORD="..." node scripts/apply-mon-espace-migration.mjs
 *
 * URL construite depuis NEXT_PUBLIC_SUPABASE_URL (projet xzwx…) si password fourni.
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

  const host = new URL(supabaseUrl).hostname; // xxx.supabase.co
  const ref = host.split('.')[0];
  // Connexion directe (session mode)
  return `postgresql://postgres:${encodeURIComponent(password)}@db.${ref}.supabase.co:5432/postgres`;
}

async function main() {
  const databaseUrl = buildDatabaseUrl();
  if (!databaseUrl) {
    console.error(
      'Manque DATABASE_URL ou SUPABASE_DB_PASSWORD (+ NEXT_PUBLIC_SUPABASE_URL).'
    );
    process.exit(1);
  }

  const sqlPath = resolve(
    process.argv[2] || 'supabase/migrations/049_workspace_events.sql'
  );
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
      where table_schema = 'public'
        and table_name in (
          'workspace_columns',
          'workspace_tasks',
          'workspace_notes',
          'workspace_favorites'
        )
      order by table_name
    `);
    console.log(
      'Migration OK. Tables :',
      check.rows.map((r) => r.table_name).join(', ')
    );
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error('Échec migration :', err.message);
  process.exit(1);
});
