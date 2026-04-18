import { readFile } from 'fs/promises';
import { join } from 'path';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@/lib/supabase/server';
import { SITE_CONFIG } from '@/lib/seo';
import { SKILL_IA_LEAD_MAGNET } from '@/lib/lead-magnet-skill-ia';

export const runtime = 'nodejs';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ROLES = new Set([
  'conducteur-travaux',
  'directeur-exploitation',
  'chef-entreprise',
  'autre',
]);

type Body = {
  firstName?: string;
  email?: string;
  company?: string;
  role?: string;
  consentRgpd?: boolean;
};

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ success: false, error: 'Corps JSON invalide.' }, { status: 400 });
  }

  const firstName = (body.firstName ?? '').trim();
  const email = (body.email ?? '').trim().toLowerCase();
  const company = (body.company ?? '').trim() || null;
  const role = (body.role ?? '').trim();
  const consentRgpd = body.consentRgpd === true;

  if (!firstName) {
    return NextResponse.json({ success: false, error: 'Le prénom est obligatoire.' }, { status: 400 });
  }
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ success: false, error: 'Adresse e-mail invalide.' }, { status: 400 });
  }
  if (!role || !ROLES.has(role)) {
    return NextResponse.json({ success: false, error: 'Fonction invalide.' }, { status: 400 });
  }
  if (!consentRgpd) {
    return NextResponse.json(
      { success: false, error: 'Vous devez accepter l’envoi du guide et des contenus associés.' },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const { error: errInsert } = await supabase.from('leads_lead_magnet').insert({
    first_name: firstName,
    email,
    company,
    role,
    tag: SKILL_IA_LEAD_MAGNET.tag,
    consent_rgpd: true,
  });

  if (errInsert) {
    return NextResponse.json(
      { success: false, error: 'Enregistrement impossible pour le moment. Réessayez plus tard.' },
      { status: 500 }
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.laureolivie.fr';
  const pdfDiskPath = join(
    process.cwd(),
    'public',
    SKILL_IA_LEAD_MAGNET.pdfPublicPath.replace(/^\//, '')
  );

  let pdfBuffer: Buffer;
  try {
    pdfBuffer = await readFile(pdfDiskPath);
  } catch {
    return NextResponse.json(
      { success: false, error: 'Fichier guide introuvable sur le serveur.' },
      { status: 500 }
    );
  }

  const downloadUrl = `${baseUrl}${SKILL_IA_LEAD_MAGNET.pdfPublicPath}`;
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const resend = new Resend(resendKey);
    const { error: errEmail } = await resend.emails.send({
      from: 'Laure Olivié <noreply@laureolivie.fr>',
      replyTo: SITE_CONFIG.email,
      to: email,
      subject: 'Votre guide — Créez votre 1er Skill IA (conducteur de travaux BTP)',
      html: `
        <p>Bonjour ${firstName.split(/\s+/)[0]},</p>
        <p>Merci pour votre inscription. Voici votre guide <strong>Créez votre 1er Skill IA</strong> en pièce jointe (PDF).</p>
        <p>Vous y trouverez : l’anatomie d’un skill en 4 briques, un tutoriel en 7 étapes (30 min), 5 cas d’usage BTP et un template de paramétrage à copier-coller.</p>
        <p><a href="${downloadUrl}" style="display:inline-block;background:#377CF3;color:#fff;padding:12px 20px;border-radius:10px;text-decoration:none;font-weight:600;">Télécharger le PDF</a></p>
        <p>Une question ? Répondez à ce message.</p>
        <p>À très vite,<br/>Laure Olivié<br/>OFC Création d’Entreprise — Qualiopi · Constructys</p>
      `,
      attachments: [
        {
          filename: SKILL_IA_LEAD_MAGNET.fileName,
          content: pdfBuffer,
        },
      ],
    });
    if (errEmail) {
      // Lead déjà en base : l’utilisateur peut télécharger depuis /merci
    }
  }

  return NextResponse.json({
    success: true,
    redirectUrl: `${baseUrl}${SKILL_IA_LEAD_MAGNET.merciPath}`,
  });
}
