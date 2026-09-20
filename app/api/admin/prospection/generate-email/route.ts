import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { requireOrganisationAdminAccess } from '@/lib/admin-access';
import { createAdminClient } from '@/lib/supabase/admin';
import { getProspect, listProspectActions, listProspectEmails } from '@/lib/prospection/queries';
import { buildAiPromptContext } from '@/lib/prospection/email-ai';
import { checkRateLimit, clientIpFromRequest } from '@/lib/rate-limit';

export async function POST(request: Request) {
  const ip = clientIpFromRequest(request);
  const rl = checkRateLimit(`prospection-ai:${ip}`, 20, 60_000);
  if (!rl.ok) {
    return NextResponse.json({ error: 'Trop de requêtes.' }, { status: 429 });
  }

  const access = await requireOrganisationAdminAccess();
  if (!access.ok) {
    return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
  }

  let body: {
    prospectId?: string;
    emailType?: string;
    subjectDraft?: string;
    bodyDraft?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'JSON invalide' }, { status: 400 });
  }

  if (!body.prospectId) {
    return NextResponse.json({ error: 'prospectId requis' }, { status: 400 });
  }

  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: 'OpenAI non configuré (OPENAI_API_KEY). Utilisez un modèle manuellement.' },
      { status: 503 }
    );
  }

  const supabase = createAdminClient();
  const prospect = await getProspect(supabase, body.prospectId);
  if (!prospect) {
    return NextResponse.json({ error: 'Prospect introuvable' }, { status: 404 });
  }

  const [emails, actions] = await Promise.all([
    listProspectEmails(supabase, prospect.id),
    listProspectActions(supabase, prospect.id),
  ]);

  const history = [
    ...emails.slice(0, 5).map(
      (e) =>
        `- Email (${e.email_type}) ${e.sent_at ?? e.created_at} : ${e.subject}`
    ),
    ...actions.slice(0, 8).map((a) => `- ${a.created_at} : ${a.title}`),
  ].join('\n');

  const system = buildAiPromptContext(prospect, history);
  const userMsg = [
    body.emailType ? `Type de message demandé : ${body.emailType}` : '',
    body.subjectDraft ? `Objet brouillon (à améliorer, pas inventer) :\n${body.subjectDraft}` : '',
    body.bodyDraft ? `Corps brouillon (à adapter) :\n${body.bodyDraft}` : '',
    !body.subjectDraft && !body.bodyDraft
      ? 'Rédige un premier contact à partir du profil uniquement.'
      : '',
  ]
    .filter(Boolean)
    .join('\n\n');

  try {
    const openai = new OpenAI({ apiKey: key });
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_PROSPECTION_MODEL || 'gpt-4o-mini',
      temperature: 0.4,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: userMsg },
      ],
    });

    const raw = completion.choices[0]?.message?.content ?? '{}';
    const parsed = JSON.parse(raw) as { subject?: string; body?: string };
    if (!parsed.subject || !parsed.body) {
      return NextResponse.json({ error: 'Réponse IA invalide' }, { status: 502 });
    }

    return NextResponse.json({
      subject: String(parsed.subject).trim(),
      body: String(parsed.body).trim(),
    });
  } catch (err) {
    console.error('[prospection generate-email]', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Erreur IA' },
      { status: 500 }
    );
  }
}
