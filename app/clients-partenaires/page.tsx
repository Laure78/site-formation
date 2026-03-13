import Link from 'next/link';
import { BarChart3, Building2, Shield } from 'lucide-react';
import { createPageMetadata, getFAQSchema } from '@/lib/seo';
import { FAQ_CLIENTS_PARTENAIRES } from '@/lib/faq';
import { FAQSection } from '@/components/landing/FAQSection';

export const metadata = createPageMetadata({
  title: 'Formation IA BTP — FFB, GERESO, Lefebvre Dalloz',
  description: 'Nos formations IA BTP avec FFB, GERESO, Lefebvre Dalloz. Partenariat Constructys. Artisans et PME bâtiment.',
  path: '/clients-partenaires',
});

const faqSchema = getFAQSchema(FAQ_CLIENTS_PARTENAIRES);

export default function ClientsPartenairesPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Header */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-display text-4xl font-bold text-slate-900">
            Nos <span className="text-[var(--accent)]">Clients & Partenaires</span>
          </h1>
          <p className="mt-6 text-slate-600">
            Des collaborations solides avec les acteurs majeurs du BTP et de la
            formation professionnelle
          </p>
        </div>
      </section>

      {/* Ils nous font confiance */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold text-slate-900">
            Ils nous font confiance
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              {
                name: 'FFB',
                subtitle: 'FFB Grand Paris',
                desc: 'Fédération Française du Bâtiment',
              },
              {
                name: 'GERESO',
                subtitle: 'GERESO',
                desc: 'Formation professionnelle continue',
              },
              {
                name: 'Lefebvre Dalloz',
                subtitle: 'Lefebvre Dalloz',
                desc: 'Leader de la formation professionnelle',
              },
            ].map((client) => (
              <div
                key={client.name}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <p className="text-2xl font-bold text-[var(--accent)]">
                  {client.name}
                </p>
                <p className="mt-1 font-medium text-slate-900">{client.subtitle}</p>
                <p className="mt-2 text-sm text-slate-600">{client.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partenariat FFB Grand Paris */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
            <div className="flex gap-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] text-white">
                <Shield size={28} strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-slate-900">
                  Partenariat FFB Grand Paris
                </h2>
                <p className="mt-1 text-sm font-medium text-[var(--accent)]">
                  Organisme de formation référencé
                </p>
                <p className="mt-4 text-slate-600">
                  En tant qu&apos;organisme de formation référencé par la Fédération
                  Française du Bâtiment Grand Paris, nous accompagnons les entreprises
                  du BTP dans leur transformation numérique grâce à
                  l&apos;intelligence artificielle.
                </p>
                <p className="mt-4 text-slate-600">
                  Ce partenariat stratégique nous permet d&apos;offrir des{' '}
                  <Link href="/formations" className="font-medium text-[var(--accent)] hover:underline">formations</Link>
                  {' '}100% adaptées aux réalités du secteur du bâtiment, avec un
                  financement facilité via Constructys pour les adhérents FFB.
                </p>
                <p className="mt-6 font-semibold text-slate-900">
                  Avantages du partenariat
                </p>
                <ul className="mt-2 space-y-1 text-slate-600">
                  {[
                    'Formations certifiantes',
                    'Prise en charge OPCO à 100%',
                    'Supports pédagogiques adaptés au BTP',
                    'Suivi personnalisé post-formation',
                    'Cas pratiques sectoriels',
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-[var(--accent)]">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cas d'usage & Formations réalisées */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold text-slate-900">
            Cas d&apos;usage & Formations réalisées
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {[
              {
                icon: BarChart3,
                title: 'PME du BTP - Île-de-France',
                values: ['12', '5h'],
                labels: ['stagiaires formés', 'gain hebdomadaire'],
              },
              {
                icon: Building2,
                title: "Bureau d'études structure",
                values: ['8', '30%'],
                labels: ['collaborateurs', 'gain de productivité'],
              },
            ].map(({ icon: Icon, ...cas }) => (
              <div
                key={cas.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)] text-white">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">{cas.title}</h3>
                <div className="mt-6 flex gap-8">
                  <div>
                    <p className="text-3xl font-bold text-[var(--accent)]">
                      {cas.values[0]}
                    </p>
                    <p className="text-sm text-slate-600">{cas.labels[0]}</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-[var(--accent)]">
                      {cas.values[1]}
                    </p>
                    <p className="text-sm text-slate-600">{cas.labels[1]}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <FAQSection
            items={FAQ_CLIENTS_PARTENAIRES}
            title="Questions fréquentes — Clients & Partenaires"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-t-3xl bg-[var(--accent)] px-4 py-20">
        <div className="mx-auto max-w-3xl text-center text-white">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Prêt à transformer votre entreprise avec l&apos;IA ?
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Rejoignez les entreprises du BTP qui gagnent déjà 3 à 5 heures par
            semaine grâce à nos formations
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/prendre-rdv"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-slate-900 hover:bg-slate-100"
            >
              Prendre RDV
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 17L17 7M17 7h-10v10"
                />
              </svg>
            </Link>
            <Link
              href="/formations"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white px-8 py-4 font-semibold text-white hover:bg-white/10"
            >
              Catalogue des formations
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
