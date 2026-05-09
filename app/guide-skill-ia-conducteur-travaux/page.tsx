import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, CheckCircle2 } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { SITE_CONFIG, getBreadcrumbSchema } from '@/lib/seo';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { LINKS } from '@/lib/internal-links';

const PATH = '/guide-skill-ia-conducteur-travaux';
const RESOURCE_PATH = '/ressources/guide-conducteur-de-travaux';

export const metadata: Metadata = {
  title: 'Tutoriel Skill IA conducteur de travaux BTP | Laure Olivié',
  description:
    'Tutoriel Skill IA pour conducteurs de travaux : méthode en 7 étapes, cas d’usage chantier, template prêt à copier-coller.',
  alternates: {
    canonical: `${SITE_CONFIG.url}${RESOURCE_PATH}`,
  },
  robots: { index: true, follow: true },
};

const breadcrumbSchema = getBreadcrumbSchema([
  { name: 'Accueil', path: '/' },
  { name: 'Guide Skill IA conducteur de travaux', path: PATH },
]);

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Guide Skill IA conducteur de travaux',
  description:
    'Méthode pratique pour créer un premier skill IA BTP en 30 minutes.',
  inLanguage: 'fr-FR',
  author: {
    '@type': 'Person',
    name: SITE_CONFIG.name,
    url: `${SITE_CONFIG.url}/a-propos`,
  },
  publisher: {
    '@type': 'Organization',
    name: SITE_CONFIG.legalName,
    url: SITE_CONFIG.url,
  },
  mainEntityOfPage: `${SITE_CONFIG.url}${PATH}`,
};

export default function GuideSkillIaConducteurTravauxPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <JsonLd id="schema-guide-skill-breadcrumb" schema={breadcrumbSchema} />
      <JsonLd id="schema-guide-skill-article" schema={articleSchema} />

      <section className="border-b border-slate-200 bg-white px-4 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#377CF3]">Tutoriel terrain BTP</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Guide : créer son 1er Skill IA conducteur de travaux
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-700">
            Cette page résume la méthode opérationnelle. Pour la version complète avec le formulaire et le PDF, accédez à la
            ressource dédiée.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={LINKS.skillIaConducteurTravaux} className="rounded-xl bg-[#377CF3] px-6 py-3 font-semibold text-white hover:bg-blue-700">
              Ouvrir la ressource complète
            </Link>
            <a href={buildSiteCalendlyCtaUrl('guide-skill-ia-conducteur-travaux-contact-rdv-page-calendly')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-[#377CF3] px-6 py-3 font-semibold text-[#377CF3] hover:bg-[#EFF6FF]">
              <Calendar className="h-4 w-4" />
              Réserver un échange
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 md:py-16">
        <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">Résumé en 7 étapes</h2>
        <ul className="mt-8 space-y-3">
          {[
            'Choisir une tâche répétitive chantier.',
            'Définir les informations d’entrée.',
            'Écrire le rôle de l’IA en 2 lignes.',
            'Construire des instructions numérotées.',
            'Imposer un format de sortie.',
            'Tester sur 3 cas réels.',
            'Documenter le déclencheur pour l’équipe.',
          ].map((step) => (
            <li key={step} className="flex gap-2 rounded-xl border border-slate-200 bg-white p-4 text-slate-700">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" />
              {step}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
