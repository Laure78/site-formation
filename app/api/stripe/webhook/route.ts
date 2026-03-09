import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!key || !webhookSecret) return NextResponse.json({ error: 'Stripe non configuré' }, { status: 500 });

  const stripe = new Stripe(key);

  const body = await request.text();
  const sig = request.headers.get('stripe-signature');
  if (!sig) return NextResponse.json({ error: 'Signature manquante' }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
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

  const supabase = await createClient();

  await supabase.from('enrollments').insert({
    user_id: userId,
    course_id: courseId,
    progress_percent: 0,
  });

  if (session.payment_intent && typeof session.payment_intent === 'string') {
    const amount = session.amount_total ?? 0;
    await supabase.from('payments').insert({
      user_id: userId,
      course_id: courseId,
      stripe_payment_id: session.payment_intent,
      stripe_session_id: session.id,
      amount_cents: amount,
      status: 'succeeded',
    });
  }

  return NextResponse.json({ received: true });
}
