import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getProfile, isAdmin } from '@/lib/auth';
import { enrollUserByEmail } from '@/lib/lms-auto-enroll';

const SLUG = 'ia-pdf-btp-administratif-chantier';
const BASE = '/formations/ia-pdf-btp-administratif-chantier';

type LessonInput = {
  title: string;
  type: 'pdf' | 'texte' | 'lien';
  content_url?: string | null;
  content_text?: string | null;
  order_index: number;
  duration_minutes: number;
};

/**
 * Seed parcours PDF-BTP 8 h (2 sessions).
 * Admin uniquement. En prod : recrée modules/leçons sans supprimer le cours
 * (conserve les inscriptions). En local : remplace entièrement le cours.
 */
export async function GET(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const login = new URL('/auth/connexion', request.url);
    login.searchParams.set('next', '/api/dev/seed-ia-pdf-btp');
    return NextResponse.redirect(login);
  }

  const profile = await getProfile(user.id);
  if (!profile || !isAdmin(profile.role)) {
    return NextResponse.json({ error: 'Réservé aux administrateurs.' }, { status: 403 });
  }

  const isDev = process.env.NODE_ENV === 'development';
  let courseId: string | null = null;

  if (isDev) {
    await supabase.from('courses').delete().eq('slug', SLUG);
  } else {
    const { data: existing } = await supabase
      .from('courses')
      .select('id')
      .eq('slug', SLUG)
      .maybeSingle();
    courseId = existing?.id ?? null;
    if (courseId) {
      const { data: mods } = await supabase.from('modules').select('id').eq('course_id', courseId);
      const modIds = (mods ?? []).map((m) => m.id);
      if (modIds.length > 0) {
        await supabase.from('lessons').delete().in('module_id', modIds);
        await supabase.from('modules').delete().eq('course_id', courseId);
      }
    }
  }

  const coursePayload = {
    slug: SLUG,
    title: "L'IA au service de l'administratif et de la gestion de chantier — PDF-BTP",
    description:
      'Formation intra-entreprise sur mesure pour PDF-BTP (Longjumeau) : 8 h en 2 sessions. Session 1 : fondamentaux IA, administratif de chantier, exercices. Session 2 : Claude AI, skills PDF BTP, assistant personnalisé. Qualiopi — financement OPCO Constructys possible selon éligibilité.',
    objectifs:
      'Utiliser Claude AI et ChatGPT pour le BTP · Rédiger devis, plannings, courriers et CR · Produire PV de réception et documents de clôture · Prompts avancés par métier · Créer un assistant IA PDF-BTP · Plan d’action individuel',
    prerequis:
      'Aucun prérequis technique. Ordinateur portable + internet. Apporter des dossiers réels (devis, CR, courriers).',
    programme:
      'Session 1 (4 h) — M1 Fondamentaux · M2 Administratif · M3 Exercices. Session 2 (4 h) — Claude & skills · Assistant · Bilan. PDF-BTP Longjumeau · 7 participants.',
    price: 1200,
    published: true,
    duration_hours: 8,
    level: 'débutant',
    category: 'formation-ia-btp',
    creator_id: user.id,
  };

  let course: { id: string } | null = null;
  let courseErr: { message: string } | null = null;

  if (courseId) {
    const { data, error } = await supabase
      .from('courses')
      .update({
        title: coursePayload.title,
        description: coursePayload.description,
        objectifs: coursePayload.objectifs,
        prerequis: coursePayload.prerequis,
        programme: coursePayload.programme,
        price: 1200,
        published: true,
        duration_hours: 8,
        level: 'débutant',
        category: 'formation-ia-btp',
        updated_at: new Date().toISOString(),
      })
      .eq('id', courseId)
      .select('id')
      .single();
    course = data;
    courseErr = error;
  } else {
    const { data, error } = await supabase
      .from('courses')
      .insert(coursePayload)
      .select('id')
      .single();
    course = data;
    courseErr = error;
  }

  if (courseErr || !course) {
    return NextResponse.json(
      { error: 'Création cours impossible', detail: courseErr?.message },
      { status: 500 },
    );
  }

  const modulesSpec = [
    { title: 'Programme de formation (8 h)', order_index: 0 },
    { title: 'Module 1 — Fondamentaux de l’IA générative', order_index: 1 },
    { title: 'Module 2 — Administratif de chantier automatisé', order_index: 2 },
    { title: 'Module 3 — Exercices pratiques & bilan session 1', order_index: 3 },
    { title: 'Module 4 — Prompts avancés par profil métier', order_index: 4 },
    { title: 'Module 5 — Créer votre assistant IA PDF-BTP', order_index: 5 },
    { title: 'Module 6 — Bilan, plan d’action & attestations', order_index: 6 },
    { title: 'Session 2 — Claude AI & skills PDF BTP', order_index: 7 },
  ] as const;

  const moduleIds: string[] = [];
  for (const m of modulesSpec) {
    const { data, error } = await supabase
      .from('modules')
      .insert({ course_id: course.id, title: m.title, order_index: m.order_index })
      .select('id')
      .single();
    if (error || !data) {
      return NextResponse.json(
        { error: `Module « ${m.title} »`, detail: error?.message },
        { status: 500 },
      );
    }
    moduleIds.push(data.id);
  }

  const [m0, m1, m2, m3, m4, m5, m6, m7] = moduleIds;

  const lessons: { moduleId: string; lesson: LessonInput }[] = [
    {
      moduleId: m0,
      lesson: {
        title: 'Programme officiel — administratif & gestion de chantier (PDF-BTP)',
        type: 'pdf',
        content_url: `${BASE}/01-programme-formation.pdf`,
        order_index: 0,
        duration_minutes: 10,
      },
    },
    {
      moduleId: m1,
      lesson: {
        title: 'Support Module 1 — Fondamentaux de l’IA générative',
        type: 'pdf',
        content_url: `${BASE}/02-module-1-fondamentaux-ia.pdf`,
        order_index: 0,
        duration_minutes: 45,
      },
    },
    {
      moduleId: m2,
      lesson: {
        title: 'Support Module 2 — Administratif de chantier automatisé',
        type: 'pdf',
        content_url: `${BASE}/03-module-2-administratif-chantier.pdf`,
        order_index: 0,
        duration_minutes: 120,
      },
    },
    {
      moduleId: m3,
      lesson: {
        title: 'Support Module 3 — Exercices pratiques & bilan session 1',
        type: 'pdf',
        content_url: `${BASE}/04-module-3-exercices-pratiques.pdf`,
        order_index: 0,
        duration_minutes: 75,
      },
    },
    {
      moduleId: m4,
      lesson: {
        title: 'Objectifs Module 4 — Prompts avancés par métier',
        type: 'texte',
        content_text:
          '<p><strong>1 h 30</strong> — Prompts avancés par profil (conducteur, chef de chantier, BE, géomètre, direction, assistante).</p><p><em>Pas de PDF dédié dans le pack — à compléter en admin si besoin.</em></p>',
        order_index: 0,
        duration_minutes: 90,
      },
    },
    {
      moduleId: m5,
      lesson: {
        title: 'Support Module 5 — Créer un assistant IA personnalisé',
        type: 'pdf',
        content_url: `${BASE}/05-module-5-assistant-ia-personnalise.pdf`,
        order_index: 0,
        duration_minutes: 90,
      },
    },
    {
      moduleId: m6,
      lesson: {
        title: 'Objectifs Module 6 — Bilan & plan d’action',
        type: 'texte',
        content_text:
          '<p><strong>1 h</strong> — Quiz, plan d’action 30 jours, attestations et satisfaction à chaud.</p>',
        order_index: 0,
        duration_minutes: 60,
      },
    },
    {
      moduleId: m7,
      lesson: {
        title: 'Programme Session 2 — Claude AI & skills PDF BTP',
        type: 'pdf',
        content_url: `${BASE}/06-programme-session-2-claude.pdf`,
        order_index: 0,
        duration_minutes: 10,
      },
    },
    {
      moduleId: m7,
      lesson: {
        title: 'Support de formation — Claude IA pour le BTP (Chat, Cowork & Code)',
        type: 'pdf',
        content_url: `${BASE}/07-support-claude-ia-btp.pdf`,
        order_index: 1,
        duration_minutes: 180,
      },
    },
    {
      moduleId: m7,
      lesson: {
        title: 'Synthèse / replay Zoom',
        type: 'pdf',
        content_url: `${BASE}/08-synthese-replay-zoom.pdf`,
        order_index: 2,
        duration_minutes: 20,
      },
    },
  ];

  for (const { moduleId, lesson } of lessons) {
    const { error } = await supabase.from('lessons').insert({
      module_id: moduleId,
      title: lesson.title,
      type: lesson.type,
      content_url: lesson.content_url ?? null,
      content_text: lesson.content_text ?? null,
      order_index: lesson.order_index,
      duration_minutes: lesson.duration_minutes,
    });
    if (error) {
      return NextResponse.json(
        { error: `Leçon « ${lesson.title} »`, detail: error.message },
        { status: 500 },
      );
    }
  }

  await enrollUserByEmail(supabase, course.id);
  await supabase.from('enrollments').upsert(
    { user_id: user.id, course_id: course.id, progress_percent: 0 },
    { onConflict: 'user_id,course_id' },
  );

  return NextResponse.redirect(new URL(`/admin/formations/${course.id}`, request.url));
}
