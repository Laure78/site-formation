import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.redirect(new URL('/auth/connexion', request.url));

  const { searchParams } = new URL(request.url);
  const courseId = searchParams.get('courseId');
  if (!courseId) return NextResponse.redirect(new URL('/cours', request.url));

  const { data: course } = await supabase.from('courses').select('id, price').eq('id', courseId).single();
  if (!course) return NextResponse.redirect(new URL('/cours', request.url));

  const price = Number(course.price ?? 0);
  if (price > 0) return NextResponse.redirect(new URL('/cours', request.url));

  await supabase.from('enrollments').upsert(
    { user_id: user.id, course_id: courseId, progress_percent: 0 },
    { onConflict: 'user_id,course_id' }
  );

  const { data: c } = await supabase.from('courses').select('slug').eq('id', courseId).single();
  const slug = (c as { slug?: string })?.slug ?? '';
  return NextResponse.redirect(new URL(`/espace-apprenant/cours/${slug}`, request.url));
}
