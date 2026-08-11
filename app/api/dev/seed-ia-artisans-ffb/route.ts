import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getProfile, isAdmin } from '@/lib/auth';

const SLUG = 'ia-artisans-batiment-ffb';
const BASE = '/formations/ia-artisans-batiment-ffb';
/** Kit Module 1 — prompts BTP + outils */
const SHEETS_MODULE1_URL =
  'https://docs.google.com/spreadsheets/d/1hWdMYZRBtxiFvm2W77VcCPU2cwZzbEIy0SS91xNLl-w/edit?usp=sharing';
/** Kit Module 2 — devis & chiffrage */
const SHEETS_MODULE2_URL =
  'https://docs.google.com/spreadsheets/d/1cXZhCiYd5ts_JXdCAQET2FdPGErD0nygz2MQeHLjkso/edit?usp=sharing';
/** Kit Module 3 — gestion de chantier */
const SHEETS_MODULE3_URL =
  'https://docs.google.com/spreadsheets/d/1lThW_X3k1YZXSh0Qdmh768zZMxjWmdU3nQdmA5gWVDk/edit?usp=sharing';
/** Kit Module 4 — réseaux sociaux */
const SHEETS_MODULE4_URL =
  'https://docs.google.com/spreadsheets/d/1-PoS9GBl8irjYlbCgSPvvZw__hm8iXzZwGfv1darijU/edit?usp=sharing';

type LessonInput = {
  title: string;
  type: 'pdf' | 'texte' | 'lien';
  content_url?: string | null;
  content_text?: string | null;
  order_index: number;
  duration_minutes: number;
};

async function insertLesson(
  supabase: Awaited<ReturnType<typeof createClient>>,
  moduleId: string,
  lesson: LessonInput,
): Promise<string | null> {
  const payload = {
    module_id: moduleId,
    title: lesson.title,
    type: lesson.type,
    content_url: lesson.content_url ?? null,
    content_text: lesson.content_text ?? null,
    order_index: lesson.order_index,
    duration_minutes: lesson.duration_minutes,
  };

  const { error } = await supabase.from('lessons').insert(payload);
  if (!error) return null;

  // Fallback si la migration 031 (type lien) n'est pas encore appliquée
  if (lesson.type === 'lien') {
    const url = lesson.content_url?.trim();
    const help = lesson.content_text?.trim() || '';
    const html = url
      ? `<p>${help || 'Ouvrez le tableau Excel / Google Sheets.'}</p><p><a href="${url}" target="_blank" rel="noopener noreferrer" style="color:#377CF3;font-weight:600">Ouvrir le tableau</a></p>`
      : `<p>${help || 'Lien Excel / Google Sheets à configurer dans l’admin (type « Lien Excel / Google Sheets » après migration 031).'}</p>`;
    const { error: err2 } = await supabase.from('lessons').insert({
      ...payload,
      type: 'texte',
      content_url: null,
      content_text: html,
    });
    return err2?.message ?? null;
  }

  return error.message;
}

/** Seed local — crée la formation FFB artisans à partir des PDF du dépôt. */
export async function GET(request: Request) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Développement uniquement.' }, { status: 404 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const login = new URL('/auth/connexion', request.url);
    login.searchParams.set('next', '/api/dev/seed-ia-artisans-ffb');
    return NextResponse.redirect(login);
  }

  const profile = await getProfile(user.id);
  if (!profile || !isAdmin(profile.role)) {
    return NextResponse.json({ error: 'Réservé aux administrateurs.' }, { status: 403 });
  }

  // Supprimer l’ancienne version (cascade modules/lessons selon schéma)
  await supabase.from('courses').delete().eq('slug', SLUG);

  const { data: course, error: courseErr } = await supabase
    .from('courses')
    .insert({
      slug: SLUG,
      title: "L'IA au service des artisans du bâtiment",
      description:
        "Session FFB — artisans du bâtiment (tous corps d'état). Formation 4 h : fondamentaux IA, devis & chiffrage, gestion de chantier, visibilité en ligne (CapCut). Qualiopi — financement OPCO possible selon éligibilité.",
      objectifs:
        "Comprendre les apports concrets de l'IA dans les métiers du BTP · Utiliser l'IA pour automatiser et accélérer les tâches administratives · Générer des devis, emails et comptes rendus grâce à l'IA · Créer du contenu efficace pour développer sa visibilité en ligne · Appliquer les bonnes pratiques de confidentialité et de sécurité",
      prerequis:
        'Savoir utiliser un ordinateur et un smartphone (navigation web, traitement de texte). Bonne maîtrise du français écrit et oral. Aucun prérequis IA.',
      programme:
        "Module 1 (60 min) — Fondamentaux · Module 2 (60 min) — Devis & chiffrage · Module 3 (60 min) — Gestion chantier · Module 4 (60 min) — Réseaux + CapCut. Demi-journée 9h–13h · 12 participants max.",
      price: 0,
      published: true,
      duration_hours: 4,
      level: 'débutant',
      category: 'formation-ia-btp',
      creator_id: user.id,
    })
    .select('id')
    .single();

  if (courseErr || !course) {
    return NextResponse.json(
      { error: 'Création cours impossible', detail: courseErr?.message },
      { status: 500 },
    );
  }

  const modulesSpec = [
    { title: 'Programme de formation', order_index: 0 },
    { title: "Module 1 — Les fondamentaux de l'IA dans le BTP", order_index: 1 },
    { title: 'Module 2 — Devis et chiffrage assistés par l’IA', order_index: 2 },
    { title: 'Module 3 — Gestion administrative du chantier', order_index: 3 },
    { title: 'Module 4 — Visibilité en ligne et réseaux sociaux', order_index: 4 },
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

  const [m0, m1, m2, m3, m4] = moduleIds;

  const lessons: { moduleId: string; lesson: LessonInput }[] = [
    {
      moduleId: m0,
      lesson: {
        title: "Programme officiel — L'IA au service des artisans du bâtiment",
        type: 'pdf',
        content_url: `${BASE}/programme-ia-artisans-batiment.pdf`,
        order_index: 0,
        duration_minutes: 5,
      },
    },
    {
      moduleId: m1,
      lesson: {
        title: 'Support Module 1 — Fondamentaux de l’IA générative',
        type: 'pdf',
        content_url: `${BASE}/module-1-fondamentaux-ia-btp.pdf`,
        order_index: 0,
        duration_minutes: 45,
      },
    },
    {
      moduleId: m1,
      lesson: {
        title: 'Kit de prompts « BTP » + liste d’outils (Google Sheets / Excel)',
        type: 'lien',
        content_url: SHEETS_MODULE1_URL,
        content_text:
          'Livrable Module 1 : kit de prompts BTP + liste d’outils IA. Ouvrez le tableau puis Fichier → Créer une copie.',
        order_index: 1,
        duration_minutes: 15,
      },
    },
    {
      moduleId: m2,
      lesson: {
        title: 'Objectifs Module 2 — Devis & chiffrage',
        type: 'texte',
        content_text:
          '<p><strong>60 min</strong> — Générer un devis complet, grille tarifaire (déboursé + frais + marge), rentabilité.</p><ul><li>Structurer un devis par postes</li><li>Libellés clairs et professionnels</li><li>Taux horaire d’entreprise</li><li>Postes sous-évalués</li></ul><p><strong>Livrable :</strong> Kit « Devis &amp; Chiffrage BTP ».</p>',
        order_index: 0,
        duration_minutes: 45,
      },
    },
    {
      moduleId: m2,
      lesson: {
        title: 'Kit de prompts « Devis & Chiffrage BTP » (Google Sheets / Excel)',
        type: 'lien',
        content_url: SHEETS_MODULE2_URL,
        content_text:
          'Kit Devis & Chiffrage — ouvrez le tableau, puis Fichier → Créer une copie.',
        order_index: 1,
        duration_minutes: 15,
      },
    },
    {
      moduleId: m3,
      lesson: {
        title: 'Objectifs Module 3 — CR, DOE, planning',
        type: 'texte',
        content_text:
          '<p><strong>60 min</strong> — Rapport de fin de chantier, DOE, planning.</p><ul><li>Notes → rapport structuré</li><li>Sommaire DOE conforme</li><li>Tâches et jalons</li><li>Replanification après aléa</li></ul><p><strong>Livrable :</strong> Kit « Gestion de chantier ».</p>',
        order_index: 0,
        duration_minutes: 45,
      },
    },
    {
      moduleId: m3,
      lesson: {
        title: 'Kit de prompts « Gestion de chantier » (Google Sheets / Excel)',
        type: 'lien',
        content_url: SHEETS_MODULE3_URL,
        content_text:
          'Kit Gestion de chantier (CR, DOE, planning) — ouvrez le tableau, puis Fichier → Créer une copie.',
        order_index: 1,
        duration_minutes: 15,
      },
    },
    {
      moduleId: m4,
      lesson: {
        title: 'Objectifs Module 4 — Contenu & réseaux sociaux',
        type: 'texte',
        content_text:
          '<p><strong>60 min</strong> — Idées de contenu BTP, calendrier éditorial, posts engageants.</p><ul><li>Chantier → contenu</li><li>Piliers et rythme</li><li>Hook, storytelling, CTA</li><li>Droit à l’image</li></ul>',
        order_index: 0,
        duration_minutes: 30,
      },
    },
    {
      moduleId: m4,
      lesson: {
        title: 'Tuto CapCut — Modèles avant / après chantier',
        type: 'pdf',
        content_url: `${BASE}/tuto-modeles-capcut.pdf`,
        order_index: 1,
        duration_minutes: 20,
      },
    },
    {
      moduleId: m4,
      lesson: {
        title: 'Kit de prompts « Réseaux Sociaux BTP » (Google Sheets / Excel)',
        type: 'lien',
        content_url: SHEETS_MODULE4_URL,
        content_text:
          'Kit Réseaux Sociaux BTP — ouvrez le tableau, puis Fichier → Créer une copie.',
        order_index: 2,
        duration_minutes: 10,
      },
    },
  ];

  for (const { moduleId, lesson } of lessons) {
    const err = await insertLesson(supabase, moduleId, lesson);
    if (err) {
      return NextResponse.json(
        { error: `Leçon « ${lesson.title} »`, detail: err },
        { status: 500 },
      );
    }
  }

  // Inscrire l’admin pour pouvoir prévisualiser
  await supabase.from('enrollments').upsert(
    { user_id: user.id, course_id: course.id, progress_percent: 0 },
    { onConflict: 'user_id,course_id' },
  );

  return NextResponse.redirect(
    new URL(`/admin/formations/${course.id}`, request.url),
  );
}
