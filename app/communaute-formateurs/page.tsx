import Link from 'next/link';
import { Users, BookOpen, Zap, ExternalLink } from 'lucide-react';
import { createPageMetadata } from '@/lib/seo';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { RdvLink } from '@/components/RdvLink';

const FACEBOOK_GROUP_URL = 'https://www.facebook.com/groups/prospectionfacile/';

export const metadata = createPageMetadata({
  title: 'Communauté formateurs — Trouver vos premiers clients',
  description:
    "Rejoignez une communauté de formateurs qui partagent prospection et développement d'activité. Plus de 4200 membres. Échangez pour trouver vos premiers clients.",
  path: '/communaute-formateurs',
  keywords: [
    'trouver clients formateur',
    'communauté formateurs',
    'formateurs indépendants',
    'prospection formateurs',
    'développer activité formation',
  ],
});

export default function CommunauteFormateursPage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-display text-3xl font-bold text-slate-900 md:text-4xl">
            Communauté de formateurs — Trouver vos premiers clients
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Une communauté active de plus de 4 200 formateurs et consultants qui
            partagent leurs retours, bonnes pratiques et astuces pour vivre à
            100% de leur activité.
          </p>
        </div>
      </section>

      {/* Bloc 4 200+ formateurs + CTA */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-[var(--accent-soft)] to-white px-4 py-16">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border-2 border-[var(--accent)] bg-white p-8 shadow-lg md:p-12">
            <div className="flex items-center justify-center gap-3 text-[var(--accent)]">
              <Users size={40} strokeWidth={1.5} />
              <span className="font-display text-4xl font-bold text-slate-900">
                4 200+
              </span>
            </div>
            <h2 className="mt-4 text-center font-display text-xl font-bold text-slate-900">
              Rejoignez des formateurs qui partagent leurs retours et bonnes pratiques
            </h2>
            <p className="mt-4 text-center text-slate-600">
              Missions, astuces de prospection, mutualisation d&apos;expériences :
              la communauté échange au quotidien pour développer votre activité.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href={FACEBOOK_GROUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#1877F2] px-8 py-4 font-semibold text-white shadow-lg transition-all hover:bg-[#0d65d9] hover:shadow-xl"
              >
                <ExternalLink size={20} strokeWidth={1.5} />
                Rejoindre le groupe Facebook
              </a>
              <RdvLink className="inline-flex items-center gap-2 rounded-xl border-2 border-[var(--accent)] px-8 py-4 font-semibold text-[var(--accent)] hover:bg-[var(--accent-soft)]">
                Prendre rendez-vous
              </RdvLink>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Laure Olivié */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-center text-2xl font-bold text-slate-900">
            Mon expertise au service de votre développement
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent)] text-white">
                <BookOpen size={28} strokeWidth={1.5} />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-slate-900">
                Formation IA pour le BTP
              </h3>
              <p className="mt-3 text-slate-600">
                Formatrice spécialisée en intelligence artificielle pour le BTP.
                Devis, chiffrages, emails, comptes rendus chantier : je forme les
                TPE et PME du BTP à gagner 3 à 5h par semaine avec ChatGPT et l&apos;IA.
                Qualiopi · Financement possible selon éligibilité.
              </p>
              <Link
                href="/formations"
                className="mt-4 inline-block font-medium text-[var(--accent)] hover:underline"
              >
                Voir le catalogue →
              </Link>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent)] text-white">
                <Zap size={28} strokeWidth={1.5} />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-slate-900">
                Accompagnement formateurs
              </h3>
              <p className="mt-3 text-slate-600">
                En tant que formatrice indépendante, je partage avec la communauté
                mes méthodes pour trouver vos premiers clients, structurer votre
                offre et développer votre activité. Masterclass, échanges et
                mutualisation d&apos;expériences au sein du groupe.
              </p>
              <a
                href={FACEBOOK_GROUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 font-medium text-[var(--accent)] hover:underline"
              >
                Rejoindre la communauté →
                <ExternalLink size={16} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi rejoindre */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-center text-2xl font-bold text-slate-900">
            Pourquoi rejoindre la communauté ?
          </h2>
          <ul className="mt-10 space-y-4 text-slate-700">
            {[
              'Échanger avec des formateurs et consultants en activité',
              'Trouver des pistes pour vos premiers clients',
              'Partager vos bonnes pratiques et astuces de prospection',
              'Découvrir des missions et opportunités de formation',
              'Bénéficier de retours d\'expérience terrain',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-white">
                  {i + 1}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Liens internes — ancres naturelles SEO */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-center text-xl font-bold text-slate-900">
            À découvrir
          </h2>
          <p className="mt-2 text-center text-slate-600">
            Formations et services en lien avec votre développement professionnel
          </p>
          <ul className="mt-6 flex flex-wrap justify-center gap-4">
            <li>
              <Link href="/formations" className="rounded-xl bg-white px-4 py-2.5 font-medium text-[var(--accent)] shadow-sm transition-colors hover:bg-[var(--accent-soft)]">
                Formation IA pour les pro du BTP
              </Link>
            </li>
            <li>
              <RdvLink className="rounded-xl bg-white px-4 py-2.5 font-medium text-[var(--accent)] shadow-sm transition-colors hover:bg-[var(--accent-soft)]">
                Prendre rendez-vous
              </RdvLink>
            </li>
            <li>
              <Link href="/formations/ia-btp-paris" className="rounded-xl bg-white px-4 py-2.5 font-medium text-[var(--accent)] shadow-sm transition-colors hover:bg-[var(--accent-soft)]" title="Formation IA appliquée au bâtiment Paris et Île-de-France">
                Formation IA pour le BTP Paris
              </Link>
            </li>
            <li>
              <Link href="/financement-constructys-formation-ia-btp" className="rounded-xl bg-white px-4 py-2.5 font-medium text-[var(--accent)] shadow-sm transition-colors hover:bg-[var(--accent-soft)]" title="Financement OPCO Constructys">
                Financement Constructys
              </Link>
            </li>
            <li>
              <Link href="/blog" className="rounded-xl bg-white px-4 py-2.5 font-medium text-[var(--accent)] shadow-sm transition-colors hover:bg-[var(--accent-soft)]">
                Articles et guides
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* Aller plus loin */}
      <div className="mx-auto max-w-2xl px-4 py-16">
        <AllerPlusLoin
          variant="compact"
          links={[
            { href: '/formation-ia-artisans-btp', label: 'ChatGPT pour entreprises BTP' },
            { href: '/diagnostic-ia-btp', label: 'Diagnostic IA BTP gratuit' },
            { href: '/checklist-ia-btp', label: 'Checklist prompts ChatGPT BTP' },
          ]}
        />
      </div>
    </div>
  );
}
