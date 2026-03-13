import Link from 'next/link';
import { Check } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { FAQSection } from '@/components/landing/FAQSection';
import { createPageMetadata, getFAQSchema } from '@/lib/seo';
import { FAQ_TARIFS } from '@/lib/faq';

export const metadata = createPageMetadata({
  title: 'Formation IA BTP — Tarifs, financement Constructys',
  description:
    'Formation IA BTP : tarifs et financement Constructys. 100% finançable pour artisans et PME bâtiment. Gagnez du temps sur devis. Qualiopi.',
  path: '/tarifs',
  keywords: ['tarifs formation IA BTP', 'financement Constructys', 'formation Qualiopi', 'formation IA Paris'],
});

const PLANS = [
  {
    name: 'Découverte',
    price: 0,
    desc: 'Accès aux formations gratuites',
    features: ['1 formation gratuite', 'Accès à l\'espace apprenant', 'Suivi de progression'],
    cta: 'Commencer',
    href: '/auth/inscription',
    highlighted: false,
  },
  {
    name: 'Formation à l\'unité',
    price: 49,
    desc: 'Une formation complète',
    features: ['Tous les modules', 'Vidéos + PDF + quiz', 'Certificat de réussite', 'Accès illimité'],
    cta: 'Choisir une formation',
    href: '/formations',
    highlighted: true,
  },
  {
    name: 'Accès complet',
    price: 99,
    desc: 'Toute la plateforme',
    features: ['Toutes les formations', 'Nouveaux contenus inclus', 'Support prioritaire', 'Certificats'],
    cta: 'S\'abonner',
    href: '/auth/inscription',
    highlighted: false,
  },
];

export default function TarifsPage() {
  const faqSchema = getFAQSchema(FAQ_TARIFS);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="text-center">
        <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
          Formation IA BTP : tarifs et financement
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Un prix adapté à chaque besoin. Pas d&apos;engagement caché.
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl border p-8 ${
              plan.highlighted
                ? 'border-[var(--accent)] bg-[var(--accent-soft)] shadow-lg'
                : 'border-slate-200 bg-white'
            }`}
          >
            <h2 className="font-display text-xl font-semibold text-slate-900">{plan.name}</h2>
            <p className="mt-2 text-slate-600">{plan.desc}</p>
            <p className="mt-4">
              <span className="text-4xl font-bold text-slate-900">{plan.price}€</span>
              {plan.price > 0 && <span className="text-slate-500"> / formation</span>}
            </p>
            <ul className="mt-6 space-y-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                  <Check size={18} strokeWidth={1.5} className="shrink-0 text-emerald-600" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href={plan.href}
              className={`mt-8 block w-full rounded-xl py-3 text-center font-semibold transition-colors ${
                plan.highlighted
                  ? 'bg-[var(--accent)] text-white hover:bg-blue-700'
                  : 'border border-slate-300 text-slate-800 hover:bg-slate-50'
              }`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-2xl bg-[var(--accent-soft)] p-8 text-center">
        <h2 className="font-display text-xl font-semibold text-slate-900">
          Découvrir toutes nos formations IA BTP
        </h2>
        <p className="mt-2 text-slate-600">
          Formations sur mesure : devis, appels d&apos;offres, RH, productivité chantier…
        </p>
        <Link
          href="/formations"
          className="mt-6 inline-block rounded-xl bg-[var(--accent)] px-8 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Voir le catalogue formations →
        </Link>
        <Link
          href="/prendre-rdv"
          className="mt-4 ml-4 inline-block rounded-xl border-2 border-[var(--accent)] px-8 py-3 font-semibold text-[var(--accent)] hover:bg-[var(--accent-soft)]"
        >
          Prendre rendez-vous
        </Link>
      </div>

      <FAQSection
        items={FAQ_TARIFS}
        title="Questions fréquentes sur les tarifs et le financement"
        subtitle="Tarifs, prise en charge Constructys, avance de frais : vos questions, nos réponses."
      />

      <AllerPlusLoin
        links={[
          { href: '/formations', label: 'Formation IA BTP' },
          { href: '/chatgpt-artisans-btp', label: 'ChatGPT artisans BTP' },
          { href: '/ia-devis-batiment', label: 'IA devis bâtiment' },
          { href: '/blog', label: 'Articles et guides' },
          { href: '/prendre-rdv', label: 'Prendre rendez-vous' },
        ]}
      />
    </div>
  );
}
