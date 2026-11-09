/**
 * Applique les migrations recrutement (075 → 076 → 077).
 *
 * Usage :
 *   npm run db:migrate:recruitment
 *   node --env-file=.env.local scripts/apply-recruitment-migration.mjs
 *
 * Prérequis (.env.local), l’un des deux :
 * - DATABASE_URL ou SUPABASE_DB_PASSWORD (+ NEXT_PUBLIC_SUPABASE_URL)
 * - SUPABASE_ACCESS_TOKEN (+ NEXT_PUBLIC_SUPABASE_URL)
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env.local.save' });

const MIGRATIONS = [
  '075_recruitment_candidats.sql',
  '076_recruitment_availability_seed_2026-11-09.sql',
  '077_recruitment_candidat_profile_fields.sql',
];

const extraArg = process.argv[2];
const files = extraArg?.endsWith('.sql') ? [extraArg] : MIGRATIONS;

function projectRefFromUrl(supabaseUrl) {
  return new URL(supabaseUrl).hostname.split('.')[0];
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
  const client = new pg.Client({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  try {
    for (const file of files) {
      const sql = readFileSync(resolve('supabase/migrations', file), 'utf8');
      console.log(`→ ${file}…`);
      await client.query(sql);
      console.log(`  OK ${file}`);
    }
    await verify(client);
  } finally {
    await client.end();
  }
}

async function runViaManagementApi(token, projectRef) {
  for (const file of files) {
    const sql = readFileSync(resolve('supabase/migrations', file), 'utf8');
    console.log(`→ ${file} (Management API)…`);
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
        // keep
      }
      throw new Error(`${file} : HTTP ${res.status} — ${msg}`);
    }
    console.log(`  OK ${file}`);
  }
  console.log('\nMigration API terminée — contrôle via Supabase ou relance verify ci-dessous.');
}

async function verify(client) {
  const { rows } = await client.query(`
    SELECT column_name FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'recruitment_candidats'
      AND column_name IN ('current_role', 'triage_status', 'nda_status')
    ORDER BY column_name
  `);
  const profils = await client.query(`
    SELECT first_name, last_name, email, triage_status, nda_status, current_role
    FROM public.recruitment_candidats
    WHERE lower(email) IN (
      'formpro.contact@gmail.com',
      'lrafaelpeytavin@gmail.com',
      'louis.ndam@hotmail.fr'
    )
  `);
  console.log('\nColonnes profil :', rows.map((r) => r.column_name).join(', ') || '—');
  console.log('Profils Dimitri / Lucas / Louis :', profils.rows.length);
  for (const r of profils.rows) {
    console.log(`  · ${r.first_name} ${r.last_name} — ${r.triage_status} — ${r.current_role?.slice(0, 40) ?? ''}`);
  }
}

async function verifyViaRest() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return;
  const { createClient } = await import('@supabase/supabase-js');
  const admin = createClient(url, key, { auth: { persistSession: false } });
  const { data, error } = await admin
    .from('recruitment_candidats')
    .select('first_name, last_name, email, triage_status, nda_status, current_role')
    .in('email', ['formpro.contact@gmail.com', 'lrafaelpeytavin@gmail.com', 'louis.ndam@hotmail.fr']);
  if (error) {
    console.log('\nVérif REST :', error.message);
    return;
  }
  console.log('\nVérif REST OK —', data?.length ?? 0, 'profils');
  for (const r of data ?? []) {
    console.log(`  · ${r.first_name} ${r.last_name} — ${r.triage_status}`);
  }
}

async function main() {
  const databaseUrl = buildDatabaseUrl();
  const token = process.env.SUPABASE_ACCESS_TOKEN?.trim();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (databaseUrl) {
    await runViaPostgres(databaseUrl);
    await verifyViaRest();
    return;
  }

  if (token && supabaseUrl) {
    await runViaManagementApi(token, projectRefFromUrl(supabaseUrl));
    await verifyViaRest();
    return;
  }

  console.error(`
Impossible d’exécuter la migration : aucun accès base configuré.

Ajoutez dans .env.local :
  SUPABASE_DB_PASSWORD=…   (Supabase → Project Settings → Database)
ou
  SUPABASE_ACCESS_TOKEN=sbp_…   (https://supabase.com/dashboard/account/tokens)

Puis : npm run db:migrate:recruitment
`);
  process.exit(1);
}

main().catch((err) => {
  console.error('❌', err.message ?? err);
  process.exit(1);
});
