import Link from 'next/link';
import { Calendar, CheckCircle2 } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { CourseSchema } from '@/components/seo/CourseSchema';
import { createPageMetadata, getBreadcrumbSchema, getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { LINKS } from '@/lib/internal-links';
import { RelatedLinks } from '@/components/RelatedLinks';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import { OFC_SEC, OFC_SECTION_INNER_WIDE } from '@/lib/ofc-section-classes';

export const revalidate = 3600;
const PATH = '/formation-claude-ai-travaux-publics';

const FAQ_ITEMS = [
  {
    q: 'Cette formation couvre-t-elle les dossiers TP (VRD, génie civil) ?',
    a: 'Oui. Le programme cible les usages travaux publics : CCTP TP, DCE, planning, sous-traitance et mémoire technique.',
  },
  {
    q: 'Claude AI est-il pertinent pour les mémoires techniques TP ?',
    a: 'Oui, pour structurer le premier jet, organiser les arguments et consolider les pièces à vérifier avant dépôt.',
  },
  {
    q: 'Peut-on mixer Claude AI et ChatGPT dans la même formation ?',
    a: 'Oui, les deux outils sont traités dans la session avec une logique de complémentarité selon les tâches.',
  },
] as const;

const OG_CLAUDE_FORMATION = '/images/claude-btp-hero-chantier.png';

export const metadata = createPageMetadata({
  title: 'Claude AI travaux publics 2026 — OFC',
  description:
    'Formation Claude AI travaux publics : CCTP TP, DCE, planning et mémoire technique. Qualiopi, Constructys, sessions inter/intra.',
  path: PATH,
  appendAuthorSuffix: false,
  openGraphType: 'website',
  keywords: ['formation Claude AI travaux publics', 'formation Claude travaux publics', 'formation IA Claude travaux publics'],
  image: {
    url: OG_CLAUDE_FORMATION,
    width: 1200,
    height: 630,
    alt: 'Formation Claude AI travaux publics — marchés et dossiers TP',
  },
});

export default function FormationClaudeAiTravauxPublicsPage() {
  const faqSchema = getFAQSchema(FAQ_ITEMS);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Accueil', path: '/' },
    { name: 'Formation Claude AI travaux publics', path: PATH },
  ]);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <CourseSchema
        name="Formation Claude AI travaux publics"
        description="Formation Claude AI TP pour VRD, terrassement et génie civil : analyse CCTP, planning, gestion sous-traitants et mémoires techniques."
        url={`${SITE_CONFIG.url.replace(/\/$/, '')}${PATH}`}
        duration="PT4H"
        price={100}
        level="Intermediate"
      />
      <JsonLd id="schema-formation-claude-ai-tp-breadcrumb" schema={breadcrumbSchema} />
      {faqSchema ? <JsonLd id="schema-formation-claude-ai-tp-faq" schema={faqSchema} /> : null}

      <section className={OFC_SEC.heroWhite}>
        <div className={OFC_SECTION_INNER_WIDE}>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#377CF3]">Spécial Travaux Publics</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Formation Claude AI travaux publics — TP, génie civil, VRD
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-700">
            Parcours orienté exploitation et appels d’offres TP : analyse CCTP, consolidation planning, coordination
            sous-traitants et rédaction des mémoires techniques avec Claude AI et ChatGPT.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={buildSiteCalendlyCtaUrl('formation-claude-ai-travaux-publics-contact-rdv-page-calendly')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-[#377CF3] px-6 py-3 font-semibold text-white hover:bg-blue-700">
              <Calendar className="h-4 w-4" />
              Réserver une visio
            </a>
            <Link href={LINKS.claudeAiBtp} className="rounded-xl border border-[#377CF3] px-6 py-3 font-semibold text-[#377CF3] hover:bg-[#EFF6FF]">
              Guide Claude AI BTP
            </Link>
          </div>
        </div>
      </section>

      <section className={OFC_SEC.mutedMesh}>
        <div className={OFC_SECTION_INNER_WIDE}>
        <h2 className="font-display text-3xl font-bold text-slate-900">Usages TP couverts en formation</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {[
            ['Analyse CCTP TP', 'Synthétiser les exigences techniques et préparer le plan de réponse.'],
            ['Planning et coordination', 'Structurer les jalons, points durs et suivis opérationnels.'],
            ['Sous-traitance', 'Formaliser les demandes, cadrer les relances et sécuriser la communication.'],
            ['Mémoire technique TP', 'Préparer un premier jet argumenté à valider par l’équipe métier.'],
          ].map(([title, desc]) => (
            <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-slate-600">{desc}</p>
            </article>
          ))}
        </div>
        </div>
      </section>

      <section className={OFC_SEC.white}>
        <div className={OFC_SECTION_INNER_WIDE}>
          <h2 className="font-display text-3xl font-bold text-slate-900">Cadre opérationnel</h2>
          <ul className="mt-6 space-y-3 text-slate-700">
            {[
              'Sessions orientées entreprise TP, avec documents réels.',
              'Méthode adaptée aux sessions inter/intra en présentiel en Île-de-France.',
              'Références partenaires TP et réseaux professionnels.',
            ].map((line) => (
              <li key={line} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" />
                {line}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-slate-600">
            Programme complémentaire :{' '}
            <Link href={LINKS.formationIaBtpNiveau1BatimentTp} className={OFC_LINK}>
              formation IA niveau 1 bâtiment &amp; travaux publics
            </Link>
            .
          </p>
        </div>
      </section>

      <RelatedLinks path={PATH} excludeHrefs={[LINKS.claudeAiBtp]} />
    </main>
  );
}
