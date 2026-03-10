/**
 * API CTA — Enregistrer un prospect (RDV, programme, recontact)
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabase non configuré');
  return createClient(url, key);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      conversationId,
      intent,
      email,
      phone,
      name,
      secteur,
      taille_entreprise,
      besoin_formation,
    } = body;

    if (!intent || !['rdv', 'programme', 'recontact', 'info'].includes(intent)) {
      return NextResponse.json({ error: 'Intent invalide' }, { status: 400 });
    }

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('chat_prospects')
      .insert({
        conversation_id: conversationId || null,
        intent,
        email: email || null,
        phone: phone || null,
        name: name || null,
        secteur: secteur || null,
        taille_entreprise: taille_entreprise || null,
        besoin_formation: besoin_formation || null,
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
