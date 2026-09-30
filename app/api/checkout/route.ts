import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getSafeSiteOrigin } from '@/lib/safe-site-origin';
import { checkRateLimit } from '@/lib/rate-limit';

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

  const rl = checkRateLimit(`checkout:${user.id}`, 10, 60_000);
  if (!rl.ok) {
    return NextResponse.json(
      { error: 'Trop de tentatives. Réessayez plus tard.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfterSec) } }
    );
  }

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return NextResponse.json({ error: 'Stripe non configuré' }, { status: 500 });

  const stripe = new Stripe(key);
  const body = await request.json().catch(() => ({}));
  const courseId = typeof body.courseId === 'string' ? body.courseId.trim() : '';
  if (!courseId || !UUID_RE.test(courseId)) {
    return NextResponse.json({ error: 'courseId requis' }, { status: 400 });
  }

  const { data: course } = await supabase
    .from('courses')
    .select('id, title, price, image_url')
    .eq('id', courseId)
    .single();
  if (!course || !course.price || course.price <= 0) {
    return NextResponse.json({ error: 'Cours invalide ou gratuit' }, { status: 400 });
  }

  const { data: existing } = await supabase
    .from('enrollments')
    .select('id')
    .eq('user_id', user.id)
    .eq('course_id', courseId)
    .single();
  if (existing) return NextResponse.json({ error: 'Déjà inscrit' }, { status: 400 });

  // Origine figée (jamais Origin client) — évite open redirect post-paiement.
  const origin = getSafeSiteOrigin();

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: course.title,
            images: course.image_url ? [course.image_url] : undefined,
          },
          unit_amount: Math.round((course.price as number) * 100),
        },
        quantity: 1,
      },
    ],
    customer_email: user.email ?? undefined,
    metadata: { courseId, userId: user.id },
    success_url: `${origin}/achat/succes?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/formations`,
  });

  return NextResponse.json({ url: session.url });
}
