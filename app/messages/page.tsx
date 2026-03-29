import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { MessagesClient } from './MessagesClient';

export const metadata = {
  title: 'Messages',
  description:
    "Échangez en messagerie avec votre formateur sur les modules IA BTP. Questions de parcours et ressources. Espace connecté réservé aux apprenants inscrits.",
};

export default async function MessagesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/auth/connexion');

  let profile: { role?: string } | null = null;
  let courses: { id: string; title: string; slug: string; creator_id: string | null }[] = [];
  let enrollments: { course_id: string }[] = [];

  try {
    const profileRes = await supabase.from('profiles').select('role').eq('id', user.id).single();
    profile = profileRes.data as { role?: string } | null;

    const coursesRes = await supabase
      .from('courses')
      .select('id, title, slug, creator_id')
      .eq('published', true);
    courses = (coursesRes.data ?? []) as typeof courses;

    const enrollRes = await supabase
      .from('enrollments')
      .select('course_id')
      .eq('user_id', user.id);
    enrollments = (enrollRes.data ?? []) as typeof enrollments;
  } catch (e) {
    console.error('Messages page data error:', e);
  }

  const isStaff = profile?.role === 'admin' || profile?.role === 'formateur';
  const enrolledIds = new Set(enrollments.map((e) => e.course_id));
  const accessibleCourses = courses.filter(
    (c) => isStaff || enrolledIds.has(c.id) || c.creator_id === user.id
  );

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <MessagesClient
        userId={user.id}
        courses={accessibleCourses}
        isStaff={!!isStaff}
      />
    </div>
  );
}
