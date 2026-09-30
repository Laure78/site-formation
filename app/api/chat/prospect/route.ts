/**
 * API CTA — Enregistrer un prospect (RDV, programme, recontact)
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { checkRateLimit, clientIpFromRequest } from '@/lib/rate-limit';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INTENTS = new Set(['rdv', 'programme', 'recontact', 'info']);

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabase non configuré');
  return createClient(url, key);
}

function clip(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null;
  const t = value.trim();
  if (!t) return null;
  return t.slice(0, max);
}

export async function POST(req: NextRequest) {
  try {
    const ip = clientIpFromRequest(req);
    const rlIp = checkRateLimit(`chat-prospect:ip:${ip}`, 8, 15 * 60_000);
    if (!rlIp.ok) {
      return NextResponse.json(
        { error: 'Trop de demandes. Réessayez plus tard.' },
        { status: 429, headers: { 'Retry-After': String(rlIp.retryAfterSec) } }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Corps invalide' }, { status: 400 });
    }

    const intent = clip((body as { intent?: unknown }).intent, 32);
    if (!intent || !INTENTS.has(intent)) {
      return NextResponse.json({ error: 'Intent invalide' }, { status: 400 });
    }

    const emailRaw = clip((body as { email?: unknown }).email, 254);
    const email = emailRaw ? emailRaw.toLowerCase() : null;
    if (email && !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 });
    }
    if (email) {
      const rlEmail = checkRateLimit(`chat-prospect:email:${email}`, 4, 60 * 60_000);
      if (!rlEmail.ok) {
        return NextResponse.json(
          { error: 'Trop de demandes pour cet email.' },
          { status: 429, headers: { 'Retry-After': String(rlEmail.retryAfterSec) } }
        );
      }
    }

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('chat_prospects')
      .insert({
        conversation_id: clip((body as { conversationId?: unknown }).conversationId, 64),
        intent,
        email,
        phone: clip((body as { phone?: unknown }).phone, 40),
        name: clip((body as { name?: unknown }).name, 120),
        secteur: clip((body as { secteur?: unknown }).secteur, 120),
        taille_entreprise: clip((body as { taille_entreprise?: unknown }).taille_entreprise, 80),
        besoin_formation: clip((body as { besoin_formation?: unknown }).besoin_formation, 500),
      })
      .select('id')
      .single();

    if (error) {
      console.error('Prospect insert:', error);
      return NextResponse.json({ error: 'Erreur enregistrement' }, { status: 500 });
    }

    return NextResponse.json({ id: data.id, ok: true });
  } catch (e) {
    console.error('Prospect API:', e);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
