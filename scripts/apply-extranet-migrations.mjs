/**
 * Applique les migrations extranet formateurs (071 + 072 + 073).
 *
 * Usage : npm run db:migrate:extranet
 *
 * Prérequis (.env.local), l’un des deux :
 * - DATABASE_URL ou SUPABASE_DB_PASSWORD (+ NEXT_PUBLIC_SUPABASE_URL)
 * - SUPABASE_ACCESS_TOKEN (+ NEXT_PUBLIC_SUPABASE_URL) — token compte supabase.com
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env.local.save' });

const { Client } = pg;

const MIGRATIONS = [
  '071_extranet_formateurs.sql',
  '072_extranet_formateurs_phase2.sql',
  '073_extranet_training_ops_fk_optional.sql',
  '074_extranet_formateurs_phase3.sql',
];

function projectRefFromUrl(supabaseUrl) {
  const host = new URL(supabaseUrl).hostname;
  return host.split('.')[0];
}

function buildDatabaseUrl() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  if (process.env.SUPABASE_DB_URL) return process.env.SUPABASE_DB_URL;

  const password = process.env.SUPABASE_DB_PASSWORD;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!password || !supabaseUrl) return null;

  const ref = projectRefFromUrl(supabaseUrl);
  return `postgresql://postgres:${encodeURIComponent(password)}@db.${ref}.supabase.co:5432/postgres`;
}

async function runViaPostgres(databaseUrl) {
  const client = new Client({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();
  try {
    for (const file of MIGRATIONS) {
      const sql = readFileSync(resolve('supabase/migrations', file), 'utf8');
      console.log(`→ Application ${file}…`);
      await client.query(sql);
      console.log(`  OK ${file}`);
    }
    await printChecks(client);
  } finally {
    await client.end();
  }
}

async function runViaManagementApi(token, projectRef) {
  for (const file of MIGRATIONS) {
    const sql = readFileSync(resolve('supabase/migrations', file), 'utf8');
    console.log(`→ Application ${file} (Management API)…`);
    const res = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/database/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: sql }),
    });
    const text = await res.text();
    if (!res.ok && res.status !== 201 && res.status !== 200) {
      let msg = text;
      try {
        const j = JSON.parse(text);
        msg = j.message ?? j.error ?? text;
      } catch {
        // keep text
      }
      throw new Error(`${file} : HTTP ${res.status} — ${msg}`);
    }
    console.log(`  OK ${file}`);
  }
  console.log('\nMigration API terminée — lancez npm run db:verify:extranet pour contrôler.');
}

async function printChecks(client) {
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
}

async function main() {
  const databaseUrl = buildDatabaseUrl();
  const token = process.env.SUPABASE_ACCESS_TOKEN?.trim();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (databaseUrl) {
    await runViaPostgres(databaseUrl);
    return;
  }

  if (token && supabaseUrl) {
    const ref = projectRefFromUrl(supabaseUrl);
    await runViaManagementApi(token, ref);
    return;
  }

  console.error(`
Impossible d’exécuter la migration : aucun accès base configuré.

Ajoutez UNE de ces options dans .env.local :

1) Mot de passe Postgres (Supabase → Project Settings → Database) :
   SUPABASE_DB_PASSWORD=votre_mot_de_passe

2) Token API compte (https://supabase.com/dashboard/account/tokens, scope database_write) :
   SUPABASE_ACCESS_TOKEN=sbp_...

Puis relancez : npm run db:migrate:extranet
`);
  process.exit(1);
}

main().catch((err) => {
  console.error('Échec migration extranet :', err.message);
  process.exit(1);
});
