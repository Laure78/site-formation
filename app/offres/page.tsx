import Link from 'next/link';
import { Target, Users, TrendingUp } from 'lucide-react';
import { FAQSection } from '@/components/landing/FAQSection';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { createPageMetadata, getFAQSchema } from '@/lib/seo';
import { FAQ_OFFRES } from '@/lib/faq';
import { JsonLd } from '@/components/JsonLd';

export const metadata = createPageMetadata({
  title: 'Nos offres de formation IA pour le BTP',
  description:
    "Formations IA ciblées BTP : parcours personnalisés, suivi et certificats. Présentiel ou ligne. Qualiopi, Constructys. Choisissez l'offre adaptée à vos enjeux.",
  path: '/offres',
  keywords: ['formation IA pour les pro du BTP', 'formation intelligence artificielle bâtiment', 'formation ChatGPT entreprises BTP'],
});

export default function OffresPage() {
  const faqSchema = getFAQSchema(FAQ_OFFRES);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <JsonLd id="schema-faq-page" schema={faqSchema} />
      <div className="text-center">
        <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
          Nos offres
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Des formations adaptées à tes objectifs, qu&apos;ils soient personnels ou professionnels.
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {[
          {
            icon: Target,
            title: 'Formations ciblées',
            desc: 'Chaque parcours répond à un besoin précis. Tu choisis ce qui compte pour toi.',
          },
          {
            icon: Users,
            title: 'Suivi personnalisé',
            desc: 'Retrouve ta progression, tes quiz validés et tes certificats dans l\'espace apprenant.',
          },
          {
            icon: TrendingUp,
            title: 'Évolue à ton rythme',
            desc: 'Vidéos, textes et quiz accessibles 24/7. Apprends quand tu veux.',
          },
        ].map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
              <Icon size={28} strokeWidth={1.5} />
            </div>
            <h2 className="mt-6 font-display text-xl font-semibold text-slate-900">{title}</h2>
            <p className="mt-3 text-slate-600">{desc}</p>
          </div>
        ))}
      </div>

      <FAQSection
        items={FAQ_OFFRES}
        title="Questions fréquentes sur nos offres"
        subtitle="Formats, espace apprenant, adaptation aux dirigeants et équipes BTP : découvrez nos réponses."
      />

      <AllerPlusLoin
        links={[
          { href: '/formations', label: 'Catalogue des formations' },
          { href: '/formation-ia-artisans-btp', label: 'ChatGPT pour entreprises BTP' },
          { href: '/ia-devis-batiment', label: 'IA devis bâtiment' },
          { href: '/blog', label: 'Articles et guides' },
          { href: buildSiteCalendlyCtaUrl('offres-footer-rdv'), label: 'Prendre rendez-vous' },
          { href: '/financement-constructys-formation-ia-btp', label: 'Financement Constructys' },
        ]}
      />
    </div>
  );
}
