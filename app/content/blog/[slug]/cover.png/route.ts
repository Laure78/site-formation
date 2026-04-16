import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const filePath = join(process.cwd(), 'content', 'blog', slug, 'cover.png');

  try {
    const buf = await readFile(filePath);
    return new Response(buf, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return new Response('Not found', { status: 404 });
  }
}

