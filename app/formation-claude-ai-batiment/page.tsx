import Link from 'next/link';
import { Calendar, CheckCircle2 } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { CourseSchema } from '@/components/seo/CourseSchema';
import { createPageMetadata, getBreadcrumbSchema, getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { LINKS } from '@/lib/internal-links';

const PATH = '/formation-claude-ai-batiment';

const FAQ_ITEMS = [
  {
    q: 'Cette page est-elle différente de la formation Claude AI BTP ?',
    a: 'Oui. Ici le focus est bâtiment : gros œuvre, second œuvre, étanchéité, couverture, charpente et réponses techniques associées.',
  },
  {
    q: 'Peut-on travailler sur nos devis et CCTP réels ?',
    a: 'Oui. La session est conçue autour de vos documents terrain pour produire des livrables réutilisables dès la fin de la formation.',
  },
  {
    q: 'Y a-t-il un volet appels d’offres bâtiment ?',
    a: 'Oui : analyse de pièces, trame mémoire technique, vérification des exigences et formulation des réponses.',
  },
] as const;

const OG_CLAUDE_FORMATION = '/images/claude-btp-hero-chantier-2026.png';

export const metadata = createPageMetadata({
  title: 'Formation Claude AI bâtiment 2026 — devis, CR, appels d\'offres',
  description:
    "Formation Claude AI bâtiment : devis, comptes rendus chantier et réponses AO. Qualiopi, Constructys, sessions inter/intra.",
  path: PATH,
  appendAuthorSuffix: false,
  openGraphType: 'website',
  keywords: ['formation Claude AI bâtiment', 'formation Claude bâtiment', 'formation IA Claude bâtiment'],
  image: {
    url: OG_CLAUDE_FORMATION,
    width: 1200,
    height: 630,
    alt: 'Formation Claude AI bâtiment — terrain et bureau',
  },
});

export default function FormationClaudeAiBatimentPage() {
  const faqSchema = getFAQSchema(FAQ_ITEMS);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Accueil', path: '/' },
    { name: 'Formation Claude AI bâtiment', path: PATH },
  ]);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <CourseSchema
        name="Formation Claude AI bâtiment"
        description="Formation Claude AI bâtiment pour équipes gros œuvre, second œuvre et étanchéité : devis, CR chantier et appels d’offres."
        url="https://laureolivie.fr/formation-claude-ai-batiment"
        duration="PT4H"
        price={100}
        level="Intermediate"
      />
      <JsonLd id="schema-formation-claude-ai-batiment-breadcrumb" schema={breadcrumbSchema} />
      {faqSchema ? <JsonLd id="schema-formation-claude-ai-batiment-faq" schema={faqSchema} /> : null}

      <section className="border-b border-slate-200 bg-white px-4 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#377CF3]">Spécial Bâtiment</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Formation Claude AI bâtiment — gros œuvre, second œuvre, étanchéité
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-700">
            Parcours orienté production chantier et bureau d’études : structurer vos devis, fiabiliser vos comptes rendus,
            accélérer les réponses techniques et mieux exploiter Claude AI sur des dossiers bâtiment.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={buildSiteCalendlyCtaUrl('formation-claude-ai-batiment-contact-rdv-page-calendly')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-[#377CF3] px-6 py-3 font-semibold text-white hover:bg-blue-700">
              <Calendar className="h-4 w-4" />
              Demander un créneau
            </a>
            <Link href={LINKS.claudeAiBtp} className="rounded-xl border border-[#377CF3] px-6 py-3 font-semibold text-[#377CF3] hover:bg-[#EFF6FF]">
              Guide Claude AI BTP
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h2 className="font-display text-3xl font-bold text-slate-900">Cas d’usage bâtiment</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {[
            ['Étanchéité (CSFE)', 'Préparer les éléments de dossier, notes techniques et réponses client avec un cadrage métier.'],
            ['Couverture / charpente', 'Structurer les variantes, clarifier les hypothèses et accélérer la rédaction pro.'],
            ['Gros œuvre', 'Synthétiser les pièces techniques et fiabiliser les CR de suivi d’exécution.'],
            ['Second œuvre', 'Générer des trames opérationnelles pour devis, relances et suivi planning.'],
          ].map(([title, desc]) => (
            <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-slate-600">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-4 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">Références terrain</h2>
          <ul className="mt-6 space-y-3 text-slate-700">
            {[
              'Interventions en réseau FFB Grand Paris.',
              'Cas pratiques en lien avec la CSFE.',
              'Approche opérationnelle pour PME bâtiment et équipes travaux.',
            ].map((line) => (
              <li key={line} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" />
                {line}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-slate-600">
            Voir aussi : <Link href={LINKS.formationClaudeAiBtp} className="text-[#377CF3] hover:underline">formation Claude AI BTP</Link> ·{' '}
            <Link href={LINKS.formationClaudeAiTravauxPublics} className="text-[#377CF3] hover:underline">formation Claude AI travaux publics</Link> ·{' '}
            <Link href={LINKS.financement} className="text-[#377CF3] hover:underline">financement Constructys</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}
