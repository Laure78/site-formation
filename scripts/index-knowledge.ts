#!/usr/bin/env npx tsx
/**
 * Indexation de la base de connaissance
 * Usage: npm run agent:index
 *
 * Nécessite: OPENAI_API_KEY, SUPABASE_SERVICE_ROLE_KEY, NEXT_PUBLIC_SUPABASE_URL
 */

import { config } from 'dotenv';
config({ path: '.env.local' });

import { createClient } from '@supabase/supabase-js';
import { getAllContentChunks, splitIntoChunks, type ContentChunk } from '../lib/agent/content-sources';
import { embedTexts } from '../lib/agent/embeddings';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY manquant');
    process.exit(1);
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('SUPABASE_SERVICE_ROLE_KEY manquant');
    process.exit(1);
  }

  const chunks = getAllContentChunks();
  const split: ContentChunk[] = [];
  for (const c of chunks) {
    split.push(...splitIntoChunks(c));
  }

  console.log(`Indexation de ${split.length} chunks...`);

  // Vider la table
  await supabase.from('knowledge_chunks').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  const BATCH = 20;
  for (let i = 0; i < split.length; i += BATCH) {
    const batch = split.slice(i, i + BATCH);
    const texts = batch.map((b) => b.content);
    const embeddings = await embedTexts(texts);

    const rows = batch.map((b, j) => ({
      source_url: b.url,
      source_title: b.title,
      content: b.content,
      embedding: embeddings[j],
      metadata: { type: b.type },
    }));

    const { error } = await supabase.from('knowledge_chunks').insert(rows);
    if (error) {
      console.error('Erreur insert:', error);
      throw error;
    }
    console.log(`  ${Math.min(i + BATCH, split.length)}/${split.length}`);
  }

  console.log('✓ Indexation terminée');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
