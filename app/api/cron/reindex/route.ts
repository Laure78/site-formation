/**
 * Cron : réindexation base de connaissance
 * Appelé par Vercel Cron ou manuellement (avec CRON_SECRET)
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getAllContentChunks, splitIntoChunks, type ContentChunk } from '@/lib/agent/content-sources';
import { embedTexts } from '@/lib/agent/embeddings';

export const maxDuration = 120;

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const secret = process.env.CRON_SECRET;
  if (secret && authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!process.env.OPENAI_API_KEY || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'Config manquante' }, { status: 500 });
  }

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const chunks = getAllContentChunks();
    const split: ContentChunk[] = [];
    for (const c of chunks) split.push(...splitIntoChunks(c));

    await supabase.from('knowledge_chunks').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    const BATCH = 20;
    for (let i = 0; i < split.length; i += BATCH) {
      const batch = split.slice(i, i + BATCH);
      const embeddings = await embedTexts(batch.map((b) => b.content));
      const rows = batch.map((b, j) => ({
        source_url: b.url,
        source_title: b.title,
        content: b.content,
        embedding: embeddings[j],
        metadata: { type: b.type },
      }));
      await supabase.from('knowledge_chunks').insert(rows);
    }

    return NextResponse.json({ ok: true, chunks: split.length });
  } catch (e) {
    console.error('Reindex:', e);
    return NextResponse.json({ error: 'Erreur' }, { status: 500 });
  }
}
