import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { MessagesClient } from './MessagesClient';

export const metadata = {
  title: 'Messages',
  description: 'Messagerie entre apprenants et formateurs',
};

export default async function MessagesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/auth/connexion');

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  const isStaff = (profile as { role?: string } | null)?.role === 'admin' || (profile as { role?: string } | null)?.role === 'formateur';

  const { data: courses } = await supabase
    .from('courses')
    .select('id, title, slug, creator_id')
    .eq('published', true);

  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('course_id')
    .eq('user_id', user.id);

  const enrolledIds = new Set((enrollments ?? []).map((e) => e.course_id));
  const accessibleCourses = (courses ?? []).filter(
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
