/**
 * API Chat RAG — Support + Commercial
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import { embedText } from '@/lib/agent/embeddings';

function getOpenAI() {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error('OpenAI non configuré');
  return new OpenAI({ apiKey: key });
}
import { SITE_CONFIG } from '@/lib/seo';

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabase non configuré');
  return createClient(url, key);
}

const SYSTEM_PROMPT = `Tu es l'assistant de Laure Olivié, formatrice IA spécialisée BTP (OFC Création d'Entreprise).
Tu réponds aux visiteurs du site laureolivie.fr.

RÈGLES :
- Réponds en français, de manière claire et professionnelle.
- Base tes réponses UNIQUEMENT sur le contexte fourni. Si l'information n'est pas dans le contexte, dis : "Je ne trouve pas cette information sur le site. Souhaitez-vous contacter Laure pour obtenir la réponse ?"
- Cite les sources quand tu donnes une info : indique le lien (ex: "Selon notre page Formation IA BTP...")
- Si le visiteur montre un intérêt pour les formations (questions sur tarifs, financement, durée, contenu), passe en mode commercial : qualifie le besoin, propose la formation adaptée, suggère de prendre rendez-vous ou de recevoir le programme.
- Propose les CTAs : Prendre rendez-vous, Recevoir le programme, Être recontacté.
- Reste chaleureux mais professionnel. S'adresse à des artisans et chefs d'entreprise BTP.`;

function buildContext(chunks: { content: string; source_url: string; source_title: string }[]): string {
  return chunks
    .map((c) => `[Source: ${c.source_title} (${c.source_url})]\n${c.content}`)
    .join('\n\n---\n\n');
}

export async function POST(req: NextRequest) {
  try {
    const { message, conversationId, visitorId, messages: prevMessages } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message requis' }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OpenAI non configuré' }, { status: 500 });
    }

    // 1. Embedding de la question
    const queryEmbedding = await embedText(message);

    // 2. Recherche vectorielle
    const supabase = getSupabase();
    const { data: matches, error: rpcError } = await supabase.rpc('match_knowledge', {
      query_embedding: queryEmbedding,
      match_count: 5,
    });

    if (rpcError) {
      console.error('RPC match_knowledge:', rpcError);
      return NextResponse.json({ error: 'Recherche échouée' }, { status: 500 });
    }

    const context = buildContext(matches || []);
    const contextBlock = context
      ? `\n\nCONTEXTE DU SITE (utilise-le pour répondre) :\n${context}`
      : '';

    // 3. Historique conversation
    let convId = conversationId;
    if (!convId) {
      const { data: newConv } = await supabase
        .from('chat_conversations')
        .insert({ visitor_id: visitorId || null })
        .select('id')
        .single();
      convId = newConv?.id;
    }

    const chatMessages: { role: 'user' | 'assistant' | 'system'; content: string }[] = [
      { role: 'system', content: SYSTEM_PROMPT + contextBlock },
      ...(prevMessages || []).slice(-10),
      { role: 'user', content: message },
    ];

    // 4. Appel LLM
    const completion = await getOpenAI().chat.completions.create({
      model: 'gpt-4o-mini',
      messages: chatMessages,
      temperature: 0.5,
      max_tokens: 800,
    });

    const assistantMessage = completion.choices[0]?.message?.content || "Désolé, je n'ai pas pu répondre.";

    // 5. Sources utilisées pour la réponse (top matches)
    const sources = (matches || [])
      .slice(0, 3)
      .map((m: { source_url: string; source_title: string }) => ({ url: m.source_url, title: m.source_title }));

    // 6. Sauvegarder les messages
    if (convId) {
      await supabase.from('chat_messages').insert([
        { conversation_id: convId, role: 'user', content: message },
        { conversation_id: convId, role: 'assistant', content: assistantMessage, sources: sources.length ? sources : null },
      ]);
    }

    return NextResponse.json({
      message: assistantMessage,
      conversationId: convId,
      sources: sources.length ? sources : undefined,
    });
  } catch (e) {
    console.error('Chat API:', e);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
