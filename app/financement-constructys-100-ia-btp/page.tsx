import Link from 'next/link';
import { Check, Calendar, Download, FileText } from 'lucide-react';
import { createPageMetadata, getBreadcrumbSchema } from '@/lib/seo';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';

export const metadata = createPageMetadata({
  title: 'Financement Constructys 100% IA BTP — Guide complet 2026',
  description:
    "Guide financement Constructys 2026 pour formation IA BTP : modalités, eGestion, plafonds. Artisans et PME. Téléchargez les repères et lancez votre dossier.",
  path: '/financement-constructys-100-ia-btp',
  keywords: [
    'financement Constructys 100% IA BTP',
    'formation IA BTP Constructys',
    'OPCO BTP 2026',
    'prise en charge formation IA bâtiment',
    'eGestion Constructys',
  ],
});

const breadcrumbSchema = getBreadcrumbSchema([
  { name: 'Accueil', path: '/' },
  { name: 'Financement', path: '/financement-constructys' },
  { name: 'Financement Constructys 100% IA BTP', path: '/financement-constructys-100-ia-btp' },
]);

export default function FinancementConstructys100IABTPPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Hero */}
      <section className="border-b border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-16 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm">
            Modalités 2026 · eGestion
          </div>
          <h1 className="mt-6 font-display text-3xl font-bold md:text-4xl lg:text-5xl">
            Financement Constructys 100% IA BTP
          </h1>
          <p className="mt-6 text-lg text-slate-300">
            Guide complet pour financer à 100% votre formation intelligence artificielle bâtiment via l&apos;OPCO Constructys en 2026.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/financement-constructys"
              className="rounded-xl bg-[var(--accent)] px-8 py-4 font-semibold text-white hover:bg-blue-600"
            >
              Modalités détaillées
            </Link>
            <Link
              href="/prendre-rdv"
              className="rounded-xl border-2 border-white/60 px-8 py-4 font-semibold text-white hover:bg-white/10"
            >
              Se faire accompagner
            </Link>
          </div>
        </div>
      </section>

      {/* En bref */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            En bref
          </h2>
          <ul className="mt-6 space-y-3">
            {[
              'Constructys = OPCO dédié au BTP (bâtiment, négoce, travaux publics)',
              'Formations IA BTP certifiées Qualiopi = éligibles',
              '100% possible pour entreprises de moins de 50 salariés',
              'Plafond pédagogique : 24 € HT / heure / stagiaire',
              'Dossier eGestion à envoyer 15 jours avant le démarrage',
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <Check size={20} className="shrink-0 text-[var(--accent)]" />
                <span className="text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Formations éligibles */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Formations IA BTP éligibles
          </h2>
          <p className="mt-3 text-slate-600">
            Toutes les formations Laure Olivié sont certifiées Qualiopi et éligibles au financement Constructys.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Link
              href="/formations"
              className="rounded-xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md"
            >
              <h3 className="font-semibold text-[var(--accent)]">L&apos;IA au service du bâtiment</h3>
              <p className="mt-1 text-sm text-slate-600">4h ou 7h · Devis, emails, CR</p>
            </Link>
            <Link
              href="/formations/ia-appels-offre-btp"
              className="rounded-xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md"
            >
              <h3 className="font-semibold text-[var(--accent)]">Appels d&apos;offres et IA</h3>
              <p className="mt-1 text-sm text-slate-600">7h · DCE, mémoires techniques</p>
            </Link>
            <Link
              href="/formations/ia-rh-btp"
              className="rounded-xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md"
            >
              <h3 className="font-semibold text-[var(--accent)]">IA fonction RH</h3>
              <p className="mt-1 text-sm text-slate-600">14h · Recrutement, formation</p>
            </Link>
            <Link
              href="/formations/ia-travaux-publics"
              className="rounded-xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md"
            >
              <h3 className="font-semibold text-[var(--accent)]">L&apos;IA au service de travaux publics</h3>
              <p className="mt-1 text-sm text-slate-600">14h · Métiers TP</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Documents et démarches */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Documents et démarches
          </h2>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/documents/conditions-constructys-2026.pdf"
              download
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-4 font-semibold text-white hover:bg-blue-700"
            >
              <Download size={20} />
              Conditions Constructys 2026
            </a>
            <Link
              href="/prendre-rdv"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-300 px-6 py-4 font-semibold text-slate-800 hover:bg-slate-50"
            >
              <FileText size={20} />
              Accompagnement montage dossier
            </Link>
          </div>
          <p className="mt-4 text-sm text-slate-600">
            Devis, convention, programme détaillé : nous vous fournissons les documents nécessaires pour votre demande eGestion.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-slate-200 bg-[var(--accent)] px-4 py-16 text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold">
            Demander un devis formation IA BTP
          </h2>
          <p className="mt-4 text-blue-100">
            Devis personnalisé sous 24h. Accompagnement financement Constructys.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/prendre-rdv"
              className="flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-[var(--accent)] hover:bg-blue-50"
            >
              <Calendar size={20} strokeWidth={1.5} />
              Prendre rendez-vous
            </Link>
            <Link
              href="/formations"
              className="rounded-xl border-2 border-white/60 px-8 py-4 font-semibold text-white hover:bg-white/10"
            >
              Catalogue formations
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <AllerPlusLoin
            links={[
              { href: '/financement-constructys', label: 'Modalités Constructys' },
              { href: '/formations', label: 'Catalogue formations IA BTP' },
              { href: '/tarifs', label: 'Tarifs et financement' },
              { href: '/formation-ia-btp-paris-2026', label: 'Formation IA BTP Paris 2026' },
              { href: '/chatgpt-artisans-btp', label: 'ChatGPT artisans BTP' },
              { href: '/ia-devis-batiment', label: 'IA devis bâtiment' },
              { href: '/prendre-rdv', label: 'Prendre rendez-vous' },
              { href: '/blog', label: 'Articles sur le financement' },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
