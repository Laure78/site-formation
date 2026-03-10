import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  await supabase.auth.signOut();
  const url = request.nextUrl.clone();
  url.pathname = '/';
  return NextResponse.redirect(url, { status: 302 });
}

/** GET fallback pour lien direct (ex. signet déconnexion) */
export async function GET(request: NextRequest) {
  return POST(request);
}
