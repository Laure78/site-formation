/**
 * Admin — envoi d’un email de test (relance satisfaction J+1)
 * sans modifier le statut réel de l’inscription.
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAdminAccess } from '@/lib/admin-access';
import { createClient } from '@/lib/supabase/server';
import { sendSatisfactionJ1Email } from '@/lib/send-satisfaction-j1-email';

export async function POST(req: NextRequest) {
  const access = await requireAdminAccess();
  if (!access.ok) {
    return NextResponse.json(
      { error: access.reason === 'unauthenticated' ? 'Non authentifié' : 'Accès refusé' },
      { status: access.reason === 'unauthenticated' ? 401 : 403 }
    );
  }

  let body: { enrollmentId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'JSON invalide' }, { status: 400 });
  }

  const enrollmentId = body.enrollmentId?.trim();
  if (!enrollmentId) {
    return NextResponse.json({ error: 'enrollmentId requis' }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: enrollment, error } = await supabase
    .from('enrollments')
    .select('id, course_id, courses(title, session_ends_on)')
    .eq('id', enrollmentId)
    .maybeSingle();

  if (error || !enrollment) {
    return NextResponse.json({ error: 'Inscription introuvable' }, { status: 404 });
  }

  const course = Array.isArray(enrollment.courses)
    ? enrollment.courses[0]
    : enrollment.courses;
  const nomFormation = (course as { title?: string } | null)?.title || 'Formation IA BTP';
  const sessionEndsOn = (course as { session_ends_on?: string | null } | null)?.session_ends_on;
  const dateFormation = sessionEndsOn
    ? new Date(`${sessionEndsOn}T12:00:00`).toLocaleDateString('fr-FR', {
        timeZone: 'Europe/Paris',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  const to = access.email;
  const result = await sendSatisfactionJ1Email({
    to,
    prenom: 'Laure',
    nomFormation,
    dateFormation,
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 502 });
  }

  return NextResponse.json({
    ok: true,
    message: `Email de test envoyé à ${to.replace(/(^.).+(@.*$)/, '$1•••$2')}`,
  });
}
