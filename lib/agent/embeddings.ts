/**
 * Embeddings OpenAI — Indexation pour RAG
 */

import OpenAI from 'openai';

function getOpenAI() {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error('OPENAI_API_KEY manquant');
  return new OpenAI({ apiKey: key });
}

const MODEL = 'text-embedding-3-small';
const DIMENSIONS = 1536;

export async function embedText(text: string): Promise<number[]> {
  const res = await getOpenAI().embeddings.create({
    model: MODEL,
    input: text.slice(0, 8000),
    dimensions: DIMENSIONS,
  });
  return res.data[0].embedding;
}

export async function embedTexts(texts: string[]): Promise<number[][]> {
  if (texts.length === 0) return [];
  const res = await getOpenAI().embeddings.create({
    model: MODEL,
    input: texts,
    dimensions: DIMENSIONS,
  });
  return res.data.sort((a, b) => a.index - b.index).map((d) => d.embedding);
}
