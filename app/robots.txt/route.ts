import { NextResponse } from 'next/server';
import { buildRobotsTxt } from '@/lib/robots-txt-content';

export async function GET() {
  return new NextResponse(buildRobotsTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
