import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!key || !webhookSecret) {
    return NextResponse.json({ error: 'Stripe non configuré' }, { status: 500 });
  }

  const stripe = new Stripe(key);

  const body = await request.text();
  const sig = request.headers.get('stripe-signature');
  if (!sig) return NextResponse.json({ error: 'Signature manquante' }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch {
    return NextResponse.json({ error: 'Webhook invalide' }, { status: 400 });
  }

  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const courseId = session.metadata?.courseId;
  const userId = session.metadata?.userId;

  if (!courseId || !userId) {
    return NextResponse.json({ error: 'Metadata manquant' }, { status: 400 });
  }

  // Service role : le webhook n’a pas de session utilisateur ; RLS bloquerait l’insert.
  const supabase = createAdminClient();

  const { error: enrollErr } = await supabase.from('enrollments').upsert(
    {
      user_id: userId,
      course_id: courseId,
      progress_percent: 0,
    },
    { onConflict: 'user_id,course_id', ignoreDuplicates: true }
  );
  if (enrollErr) {
    console.error('[stripe-webhook] enrollment', enrollErr.message);
    return NextResponse.json({ error: 'Erreur inscription' }, { status: 500 });
  }

  if (session.payment_intent && typeof session.payment_intent === 'string') {
    const amount = session.amount_total ?? 0;
    const { error: payErr } = await supabase.from('payments').upsert(
      {
        user_id: userId,
        course_id: courseId,
        stripe_payment_id: session.payment_intent,
        stripe_session_id: session.id,
        amount_cents: amount,
        status: 'succeeded',
      },
      { onConflict: 'stripe_payment_id', ignoreDuplicates: true }
    );
    if (payErr) {
      // Enrollment déjà OK — log seulement (évite échec sur retry Stripe)
      console.error('[stripe-webhook] payment', payErr.message);
    }
  }

  return NextResponse.json({ received: true });
}
