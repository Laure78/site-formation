import { createClient } from '@/lib/supabase/server';
import type { ApprenantFormationCard } from '@/lib/espace-apprenant-formations-display';

export type { ApprenantFormationCard } from '@/lib/espace-apprenant-formations-display';
export {
  formatEnrolledFr,
  formatRelativeFr,
} from '@/lib/espace-apprenant-formations-display';

function unwrapCourse<T>(raw: T | T[] | null | undefined): T | null {
  if (!raw) return null;
  return Array.isArray(raw) ? raw[0] ?? null : raw;
}

/** Formations inscrites de l’apprenant + stats leçons / activité. */
export async function getApprenantFormations(userId: string): Promise<ApprenantFormationCard[]> {
  const supabase = await createClient();

  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('course_id, progress_percent, created_at, courses(id, slug, title, image_url)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (!enrollments?.length) return [];

  const courseIds = enrollments.map((e) => e.course_id);

  const { data: modules } = await supabase
    .from('modules')
    .select('id, course_id')
    .in('course_id', courseIds);

  const moduleIds = (modules ?? []).map((m) => m.id);
  const { data: lessons } =
    moduleIds.length > 0
      ? await supabase.from('lessons').select('id, module_id').in('module_id', moduleIds)
      : { data: [] as { id: string; module_id: string }[] };

  const lessonIdsByCourse = new Map<string, string[]>();
  const moduleToCourse = new Map((modules ?? []).map((m) => [m.id, m.course_id]));
  for (const l of lessons ?? []) {
    const courseId = moduleToCourse.get(l.module_id);
    if (!courseId) continue;
    const arr = lessonIdsByCourse.get(courseId) ?? [];
    arr.push(l.id);
    lessonIdsByCourse.set(courseId, arr);
  }

  const allLessonIds = (lessons ?? []).map((l) => l.id);
  const { data: progress } =
    allLessonIds.length > 0
      ? await supabase
          .from('lesson_progress')
          .select('lesson_id, completed, completed_at')
          .eq('user_id', userId)
          .in('lesson_id', allLessonIds)
      : { data: [] as { lesson_id: string; completed: boolean; completed_at: string | null }[] };

  const completedByLesson = new Map<string, { completed: boolean; at: string | null }>();
  for (const p of progress ?? []) {
    completedByLesson.set(p.lesson_id, { completed: Boolean(p.completed), at: p.completed_at });
  }

  return enrollments.map((e) => {
    const course = unwrapCourse(
      e.courses as
        | { id: string; slug: string; title: string; image_url: string | null }
        | { id: string; slug: string; title: string; image_url: string | null }[]
        | null
    );
    const lessonIds = lessonIdsByCourse.get(e.course_id) ?? [];
    let completedLessons = 0;
    let lastActivityAt: string | null = null;
    for (const lid of lessonIds) {
      const p = completedByLesson.get(lid);
      if (p?.completed) completedLessons += 1;
      if (p?.at && (!lastActivityAt || p.at > lastActivityAt)) lastActivityAt = p.at;
    }

    return {
      courseId: e.course_id,
      slug: course?.slug ?? '',
      title: course?.title ?? 'Formation',
      imageUrl: course?.image_url ?? null,
      enrolledAt: e.created_at,
      progressPercent: e.progress_percent ?? 0,
      lessonCount: lessonIds.length,
      completedLessons,
      lastActivityAt,
    };
  });
}
