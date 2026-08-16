import { createClient } from '@/lib/supabase/server';
import { FORMATIONS_CATALOGUE } from '@/lib/formations-catalogue-display';
import { formatTarifHt } from '@/lib/tarifs-sessions';
import { FormationsAdminList, type AdminFormationCard } from './FormationsAdminList';

export default async function AdminFormationsPage() {
  const supabase = await createClient();

  const { data: courses } = await supabase
    .from('courses')
    .select('id, slug, title, image_url, price, published, created_at, updated_at')
    .order('created_at', { ascending: false });

  const courseIds = (courses ?? []).map((c) => c.id);

  const [modulesRes, enrollmentsRes] = await Promise.all([
    courseIds.length
      ? supabase.from('modules').select('id, course_id').in('course_id', courseIds)
      : Promise.resolve({ data: [] as { id: string; course_id: string }[] }),
    courseIds.length
      ? supabase.from('enrollments').select('course_id').in('course_id', courseIds)
      : Promise.resolve({ data: [] as { course_id: string }[] }),
  ]);

  const modules = modulesRes.data ?? [];
  const moduleIds = modules.map((m) => m.id);
  const { data: lessons } =
    moduleIds.length > 0
      ? await supabase.from('lessons').select('id, module_id').in('module_id', moduleIds)
      : { data: [] as { id: string; module_id: string }[] };

  const lessonsByModule = new Map<string, number>();
  for (const l of lessons ?? []) {
    lessonsByModule.set(l.module_id, (lessonsByModule.get(l.module_id) ?? 0) + 1);
  }

  const lessonsByCourse = new Map<string, number>();
  for (const m of modules) {
    const n = lessonsByModule.get(m.id) ?? 0;
    lessonsByCourse.set(m.course_id, (lessonsByCourse.get(m.course_id) ?? 0) + n);
  }

  const learnersByCourse = new Map<string, number>();
  for (const e of enrollmentsRes.data ?? []) {
    learnersByCourse.set(e.course_id, (learnersByCourse.get(e.course_id) ?? 0) + 1);
  }

  const lmsSlugs = new Set((courses ?? []).map((c) => c.slug));
  const missingCatalogue = FORMATIONS_CATALOGUE.filter((e) => !lmsSlugs.has(e.slug));

  const formations: AdminFormationCard[] = (courses ?? []).map((c) => {
    const cat = FORMATIONS_CATALOGUE.find((e) => e.slug === c.slug);
    const price = c.price != null ? Number(c.price) : 0;
    return {
      id: c.id,
      slug: c.slug,
      title: c.title,
      imageUrl: c.image_url,
      priceLabel:
        price > 0 ? `${formatTarifHt(price)} € HT` : 'Gratuite',
      published: Boolean(c.published),
      createdAt: c.created_at,
      updatedAt: c.updated_at || c.created_at,
      lessonCount: lessonsByCourse.get(c.id) ?? 0,
      learnerCount: learnersByCourse.get(c.id) ?? 0,
      catalogueRef: cat?.ref ?? null,
    };
  });

  return (
    <FormationsAdminList
      formations={formations}
      catalogueTotal={FORMATIONS_CATALOGUE.length}
      missingCount={missingCatalogue.length}
      missingLabels={missingCatalogue.map((e) => e.ref).join(', ')}
    />
  );
}
