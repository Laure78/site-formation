import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

/** Fallback GEO : sert le même contenu que public/llms.txt (texte brut UTF-8) */
export async function GET() {
  const filePath = join(process.cwd(), 'public', 'llms.txt');
  const content = readFileSync(filePath, 'utf-8');
  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
