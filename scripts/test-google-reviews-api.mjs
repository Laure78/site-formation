#!/usr/bin/env node
/**
 * Diagnostic avis Google — Places API (New + legacy).
 * Usage : node --env-file=.env.local scripts/test-google-reviews-api.mjs
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

function loadEnvLocal() {
  const path = resolve(process.cwd(), '.env.local');
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const eq = t.indexOf('=');
    if (eq === -1) continue;
    const key = t.slice(0, eq).trim();
    let val = t.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnvLocal();

const placeId = process.env.GOOGLE_PLACE_ID?.trim();
const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();

if (!placeId || !apiKey) {
  console.error('❌ GOOGLE_PLACE_ID et GOOGLE_PLACES_API_KEY requis (.env.local ou env).');
  process.exit(1);
}

async function testNew() {
  const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
    headers: {
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'displayName,rating,userRatingCount,reviews,googleMapsUri',
      'Accept-Language': 'fr',
    },
  });
  const data = await res.json();
  if (data.error) {
    console.log('Places API (New) :', data.error.status, '—', data.error.message);
    return false;
  }
  console.log('✅ Places API (New) OK —', data.displayName?.text, data.rating, '/', data.userRatingCount, 'avis');
  return true;
}

async function testLegacy() {
  const url = new URL('https://maps.googleapis.com/maps/api/place/details/json');
  url.searchParams.set('place_id', placeId);
  url.searchParams.set('fields', 'name,rating,user_ratings_total,reviews,url');
  url.searchParams.set('language', 'fr');
  url.searchParams.set('key', apiKey);
  const res = await fetch(url);
  const data = await res.json();
  if (data.status !== 'OK') {
    console.log('Places API (legacy) :', data.status, '—', data.error_message ?? '');
    return false;
  }
  console.log(
    '✅ Places API (legacy) OK —',
    data.result?.name,
    data.result?.rating,
    '/',
    data.result?.user_ratings_total,
    'avis',
  );
  return true;
}

console.log('Place ID :', placeId);
console.log('---');
const okNew = await testNew();
const okLegacy = await testLegacy();
if (!okNew && !okLegacy) {
  console.log('\n📋 À faire dans Google Cloud Console (projet lié à la clé API) :');
  console.log('   1. Activer « Places API (New) »');
  console.log('   2. Facturation activée sur le projet');
  console.log('   3. Restrictions de clé : autoriser Places API (New) ou aucune restriction API');
  process.exit(1);
}
