import Link from 'next/link';
import { Check, Calendar, ArrowRight } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { FAQSection } from '@/components/landing/FAQSection';
import { createPageMetadata, getBreadcrumbSchema } from '@/lib/seo';
import { FAQ_IA_BTP_PARIS } from '@/lib/faq';

export const metadata = createPageMetadata({
  title: 'Formation IA BTP Paris 2026 — Devis, ChatGPT, 100 % Constructys',
  description:
    'Formation IA BTP Paris 2026 : programmes, dates, tarifs. ChatGPT pour devis et emails. 100 % finançable OPCO Constructys. Île-de-France. Qualiopi.',
  path: '/formation-ia-btp-paris-2026',
  keywords: [
    'formation IA BTP Paris 2026',
    'formation IA bâtiment Île-de-France 2026',
    'ChatGPT BTP Paris',
    'formation Constructys Paris',
    'OPCO Constructys formation IA',
  ],
});

const breadcrumbSchema = getBreadcrumbSchema([
  { name: 'Accueil', path: '/' },
  { name: 'Formations', path: '/formations' },
  { name: 'Formation IA BTP Paris 2026', path: '/formation-ia-btp-paris-2026' },
]);

export default function FormationIABTPParis2026Page() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Hero */}
      <section className="border-b border-slate-200 bg-white px-4 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
            Pillar page · Paris & Île-de-France · 2026
          </div>
          <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
            Formation IA BTP Paris 2026
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-600">
            Tout ce qu&apos;il faut savoir pour suivre une formation à l&apos;intelligence
            artificielle dans le bâtiment à Paris et en Île-de-France en 2026.
            Programmes, financement Constructys, zones d&apos;intervention.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/formations/ia-btp-paris"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-8 py-4 font-semibold text-white hover:bg-blue-600"
            >
              Voir la formation Paris
              <ArrowRight size={20} strokeWidth={1.5} />
            </Link>
            <Link
              href="/prendre-rdv"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-[var(--accent)] px-8 py-4 font-semibold text-slate-900 hover:bg-[var(--accent-soft)]"
            >
              <Calendar size={20} strokeWidth={1.5} />
              Prendre rendez-vous
            </Link>
          </div>
        </div>
      </section>

      {/* Contenu pillar — liens vers pages commerciales */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Vos formations IA BTP à Paris en 2026
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Sessions à Paris (75) et dans toute l&apos;Île-de-France. 4h ou 7h pratiques,
            100 % finançables par l&apos;OPCO Constructys.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/formations/ia-btp-paris"
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors hover:border-[var(--accent)] hover:shadow-md"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)] text-white">
                75
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-slate-900">
                Formation IA BTP Paris
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Paris intramuros et agglomération. Tous arrondissements.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)]">
                Découvrir →
              </span>
            </Link>
            <Link
              href="/formations/ia-btp-ile-de-france"
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors hover:border-[var(--accent)] hover:shadow-md"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)] text-white">
                IDF
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-slate-900">
                Formation IA BTP Île-de-France
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                8 départements : 92, 93, 94, 77, 78, 91, 95.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)]">
                Découvrir →
              </span>
            </Link>
            <Link
              href="/formations"
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors hover:border-[var(--accent)] hover:shadow-md"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)] text-white">
                <Check size={20} strokeWidth={1.5} />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-slate-900">
                Catalogue complet
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Appels d&apos;offres, RH, Travaux Publics, productivité chantier.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)]">
                Voir le catalogue →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Financement 2026 */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Financement Constructys 100 % en 2026
          </h2>
          <p className="mt-3 text-slate-600">
            Les formations IA BTP à Paris sont éligibles au financement Constructys.
            Entreprises de moins de 50 salariés : prise en charge possible à 100 %.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/financement-constructys"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent-soft)] px-6 py-3 font-medium text-[var(--accent)] hover:bg-blue-100"
            >
              Modalités Constructys 2026 →
            </Link>
            <Link
              href="/financement-constructys-100-ia-btp"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-6 py-3 font-medium text-slate-700 hover:bg-slate-200"
            >
              Guide financement IA BTP →
            </Link>
            <Link
              href="/tarifs"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-6 py-3 font-medium text-slate-700 hover:bg-slate-200"
            >
              Tarifs formations →
            </Link>
          </div>
        </div>
      </section>

      {/* Métiers et cas d&apos;usage */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Comprendre l&apos;IA pour votre métier BTP
          </h2>
          <p className="mt-3 text-slate-600">
            Devis, appels d&apos;offres, emails, comptes rendus : découvrez les guides
            par métier et par cas d&apos;usage.
          </p>
          <ul className="mt-8 flex flex-wrap gap-4">
            <li>
              <Link href="/chatgpt-artisans-btp" className="font-medium text-[var(--accent)] hover:underline">
                ChatGPT artisans BTP
              </Link>
            </li>
            <li>
              <Link href="/ia-devis-batiment" className="font-medium text-[var(--accent)] hover:underline">
                IA devis bâtiment
              </Link>
            </li>
            <li>
              <Link href="/ia-conducteur-travaux" className="font-medium text-[var(--accent)] hover:underline">
                IA conducteur de travaux
              </Link>
            </li>
            <li>
              <Link href="/diagnostic-ia-btp" className="font-medium text-[var(--accent)] hover:underline">
                Diagnostic IA BTP gratuit
              </Link>
            </li>
            <li>
              <Link href="/blog" className="font-medium text-[var(--accent)] hover:underline">
                Articles et guides
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <FAQSection
            items={FAQ_IA_BTP_PARIS}
            title="Questions fréquentes — Formation IA BTP Paris 2026"
          />
        </div>
      </section>

      {/* CTA + maillage */}
      <section className="border-b border-slate-200 bg-[var(--accent)] px-4 py-16 text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold">
            Prêt à former votre équipe à l&apos;IA ?
          </h2>
          <p className="mt-4 text-blue-100">
            Réservez un créneau ou demandez un devis personnalisé.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/prendre-rdv"
              className="flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-[var(--accent)] hover:bg-blue-50"
            >
              <Calendar size={20} strokeWidth={1.5} />
              Prendre rendez-vous
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 rounded-xl border-2 border-white/60 px-8 py-4 font-semibold text-white hover:bg-white/10"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      <div className="border-t border-slate-200 bg-slate-50 px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <AllerPlusLoin
            links={[
              { href: '/formations/ia-btp-paris', label: 'Formation IA BTP Paris' },
              { href: '/formations/ia-btp-ile-de-france', label: 'Formation Île-de-France' },
              { href: '/formations', label: 'Catalogue formations' },
              { href: '/financement-constructys', label: 'Financement Constructys' },
              { href: '/financement-constructys-100-ia-btp', label: 'Guide financement 100 % IA BTP' },
              { href: '/prendre-rdv', label: 'Prendre rendez-vous' },
              { href: '/diagnostic-ia-btp', label: 'Diagnostic gratuit' },
              { href: '/blog', label: 'Articles et guides' },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
