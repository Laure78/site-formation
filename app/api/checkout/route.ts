import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return NextResponse.json({ error: 'Stripe non configuré' }, { status: 500 });

  const stripe = new Stripe(key);
  const { courseId } = await request.json();
  if (!courseId) return NextResponse.json({ error: 'courseId requis' }, { status: 400 });

  const { data: course } = await supabase.from('courses').select('id, title, price, image_url').eq('id', courseId).single();
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

  const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'eur',
        product_data: {
          name: course.title,
          images: course.image_url ? [course.image_url] : undefined,
        },
        unit_amount: Math.round((course.price as number) * 100),
      },
      quantity: 1,
    }],
    customer_email: user.email ?? undefined,
    metadata: { courseId, userId: user.id },
    success_url: `${origin}/achat/succes?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/formations`,
  });

  return NextResponse.json({ url: session.url });
}
