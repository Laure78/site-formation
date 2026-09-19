/**
 * Applique les migrations Organisation (048 → 053) sur Supabase.
 *
 * Usage :
 *   DATABASE_URL="postgresql://..." node scripts/apply-organisation-migrations.mjs
 *   SUPABASE_DB_PASSWORD="..." node scripts/apply-organisation-migrations.mjs
 */
import { readFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const { Client } = pg;

const MIGRATIONS = [
  '048_mon_espace_admin.sql',
  '049_workspace_events.sql',
  '050_workspace_events_categories.sql',
  '051_organisation_suivi_administratif.sql',
  '052_workspace_resources.sql',
  '053_workspace_mes_listes.sql',
];

const EXPECTED_TABLES = [
  'workspace_columns',
  'workspace_tasks',
  'workspace_notes',
  'workspace_favorites',
  'workspace_events',
  'admin_checklist_definitions',
  'course_checklist_entries',
  'workspace_resources',
  'workspace_list_categories',
  'workspace_lists',
  'workspace_list_items',
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
      'Manque DATABASE_URL ou SUPABASE_DB_PASSWORD (+ NEXT_PUBLIC_SUPABASE_URL).'
    );
    process.exit(1);
  }

  const migrationsDir = resolve('supabase/migrations');
  const client = new Client({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();
  try {
    for (const file of MIGRATIONS) {
      const sqlPath = join(migrationsDir, file);
      const sql = readFileSync(sqlPath, 'utf8');
      process.stdout.write(`→ ${file} … `);
      await client.query(sql);
      console.log('OK');
    }

    const check = await client.query(
      `
      select table_name
      from information_schema.tables
      where table_schema = 'public'
        and table_name = any($1::text[])
      order by table_name
    `,
      [EXPECTED_TABLES]
    );

    const found = check.rows.map((r) => r.table_name);
    const missing = EXPECTED_TABLES.filter((t) => !found.includes(t));

    console.log('Tables présentes :', found.join(', ') || '(aucune)');
    if (missing.length) {
      console.error('Tables manquantes :', missing.join(', '));
      process.exit(1);
    }
    console.log('Toutes les rubriques Organisation sont prêtes.');
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error('Échec migration :', err.message);
  process.exit(1);
});
