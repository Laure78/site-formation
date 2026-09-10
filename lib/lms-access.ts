import type { SupabaseClient } from '@supabase/supabase-js';
import { isAdmin, type UserRole } from '@/lib/auth';

/** Accès pédagogique à un cours : inscription ou staff (admin/formateur). */
export async function userHasCourseAccess(
  supabase: SupabaseClient,
  userId: string,
  courseId: string
): Promise<boolean> {
  const { data: enrollment } = await supabase
    .from('enrollments')
    .select('id')
    .eq('user_id', userId)
    .eq('course_id', courseId)
    .maybeSingle();

  if (enrollment) return true;

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .maybeSingle();

  const role = profile?.role as UserRole | undefined;
  return !!role && isAdmin(role);
}

/** Accès via une leçon (résout le course_id). */
export async function userHasLessonAccess(
  supabase: SupabaseClient,
  userId: string,
  lessonId: string
): Promise<boolean> {
  const { data: lesson } = await supabase
    .from('lessons')
    .select('module_id')
    .eq('id', lessonId)
    .maybeSingle();
  if (!lesson) return false;

  const { data: mod } = await supabase
    .from('modules')
    .select('course_id')
    .eq('id', lesson.module_id)
    .maybeSingle();
  if (!mod) return false;

  return userHasCourseAccess(supabase, userId, mod.course_id);
}
