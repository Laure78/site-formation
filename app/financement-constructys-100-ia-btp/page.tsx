import Link from 'next/link';
import { RdvLink } from '@/components/RdvLink';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { Check, Calendar, Download, FileText } from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { breadcrumbItemsFromPaths, createPageMetadata } from '@/lib/seo';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { LINKS } from '@/lib/internal-links';

export const metadata = createPageMetadata({
  title: 'Financement Constructys IA BTP — Guide complet 2026',
  description:
    "Guide financement Constructys 2026 pour formation IA pour le BTP : modalités, eGestion, plafonds. TPE et PME du bâtiment et des travaux publics. Téléchargez les repères et lancez votre dossier.",
  path: '/financement-constructys-100-ia-btp',
  keywords: [
    'financement Constructys formation IA pour les pro du BTP',
    'formation IA appliquée au bâtiment Constructys',
    'OPCO BTP 2026',
    'prise en charge formation IA bâtiment',
    'eGestion Constructys',
  ],
});

export default function FinancementConstructys100IABTPPage() {
  return (
    <div>
      <Breadcrumb
        items={breadcrumbItemsFromPaths([
          { name: 'Accueil', path: '/' },
          { name: 'Financement', path: '/financement-constructys-formation-ia-btp' },
          { name: 'Financement Constructys formation IA pour le BTP', path: '/financement-constructys-100-ia-btp' },
        ])}
      />
      {/* Hero */}
      <section className="border-b border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-16 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm">
            Modalités 2026 · eGestion
          </div>
          <h1 className="mt-6 font-display text-3xl font-bold md:text-4xl lg:text-5xl">
            Financement Constructys formation IA pour les pro du BTP
          </h1>
          <p className="mt-6 text-lg text-slate-300">
            Guide pour mobiliser un financement Constructys ou OPCO pour votre formation IA bâtiment en 2026, selon éligibilité et conditions en vigueur.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/financement-constructys-formation-ia-btp"
              className="rounded-xl bg-[var(--accent)] px-8 py-4 font-semibold text-white hover:bg-blue-600"
            >
              Modalités détaillées
            </Link>
            <RdvLink className="rounded-xl border-2 border-white/60 px-8 py-4 font-semibold text-white hover:bg-white/10">
              Se faire accompagner
            </RdvLink>
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
              'Formations IA pour le BTP certifiées Qualiopi = éligibles',
              'Financement possible selon éligibilité (Constructys, OPCO)',
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
            Formations IA pour les pro du BTP éligibles
          </h2>
          <p className="mt-3 text-slate-600">
            Toutes les formations Laure Olivié sont certifiées Qualiopi et éligibles au financement Constructys.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Link
              href={LINKS.formationIaBtpNiveau1BatimentTp}
              className="rounded-xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md"
            >
              <h3 className="font-semibold text-[var(--accent)]">
                Niveau 1 — Bâtiment &amp; travaux publics
              </h3>
              <p className="mt-1 text-sm text-slate-600">4 h · Programme PDF</p>
            </Link>
            <Link
              href={LINKS.formationAO}
              className="rounded-xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md"
            >
              <h3 className="font-semibold text-[var(--accent)]">Niveau 2 — Appels d&apos;offre BTP</h3>
              <p className="mt-1 text-sm text-slate-600">4 h · DCE, mémoires techniques · Programme PDF</p>
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
            <RdvLink className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-300 px-6 py-4 font-semibold text-slate-800 hover:bg-slate-50">
              <FileText size={20} />
              Accompagnement montage dossier
            </RdvLink>
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
            Demander un devis formation IA appliquée au bâtiment
          </h2>
          <p className="mt-4 text-blue-100">
            Devis personnalisé sous 24h. Accompagnement financement Constructys.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <RdvLink className="flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-[var(--accent)] hover:bg-blue-50">
              <Calendar size={20} strokeWidth={1.5} />
              Prendre rendez-vous
            </RdvLink>
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
              { href: '/financement-constructys-formation-ia-btp', label: 'Guide financement Constructys' },
              { href: '/formations', label: 'Catalogue des formations IA appliquées au bâtiment' },
              { href: '/formations/ia-btp-paris', label: 'Formation IA pour le BTP Paris' },
              { href: '/formation-ia-artisans-btp', label: 'ChatGPT pour entreprises BTP' },
              { href: '/ia-devis-batiment', label: 'IA devis bâtiment' },
              { href: buildSiteCalendlyCtaUrl('financement-constructys-100-ia-btp-footer-rdv'), label: 'Prendre rendez-vous' },
              { href: '/blog', label: 'Articles sur le financement' },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
