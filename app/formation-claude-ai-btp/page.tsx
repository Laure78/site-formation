import Link from 'next/link';
import { Calendar, CheckCircle2 } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { createPageMetadata, getBreadcrumbSchema, getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { LINKS } from '@/lib/internal-links';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';

const PATH = '/formation-claude-ai-btp';

const FAQ_ITEMS = [
  {
    q: 'Cette formation Claude AI BTP remplace-t-elle ChatGPT ?',
    a: 'Non. En formation, Claude AI et ChatGPT sont traités comme complémentaires. Claude est souvent préféré pour les gros documents (DCE, CCTP), ChatGPT pour certains workflows rapides et intégrations.',
  },
  {
    q: 'Quels profils suivent cette formation ?',
    a: "Dirigeants BTP, conducteurs de travaux, chargés d'affaires et équipes administratives. Le programme est calibré sur les documents réels de l'entreprise.",
  },
  {
    q: 'La formation est-elle finançable ?',
    a: "Oui, via Constructys selon votre dossier. Référence 2026 : 24 € HT/h/stagiaire et plafond 840 € HT/jour/groupe en intra.",
  },
  {
    q: 'Combien de temps faut-il pour être opérationnel ?',
    a: 'Les premiers gains apparaissent dès la session : devis structurés, comptes rendus chantier et trames d’emails prêts à l’emploi.',
  },
  {
    q: 'La formation est-elle disponible en distanciel ?',
    a: "Oui, en présentiel en Île-de-France et en distanciel partout en France, avec la même logique d'application terrain BTP.",
  },
] as const;

const teaches = [
  'Claude AI',
  'Claude Chat',
  'Claude Cowork',
  'Claude Code',
  'Claude Chrome',
  'IA BTP',
  'ChatGPT BTP',
];

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Formation Claude AI BTP',
  description:
    "Formation Claude AI pour le BTP : devis, comptes rendus de chantier, analyse d'appels d'offres et organisation administrative avec ChatGPT et Claude.",
  provider: {
    '@type': 'Organization',
    '@id': `${SITE_CONFIG.url}/#organization`,
    name: "OFC Création d'Entreprise",
    taxID: '905 244 281 00010',
  },
  inLanguage: 'fr-FR',
  url: `${SITE_CONFIG.url}${PATH}`,
  educationalLevel: 'Professionnel',
  courseMode: ['onsite', 'online'],
  teaches,
  keywords: [
    'formation Claude AI BTP',
    'formation Claude AI',
    'formation IA Claude BTP',
    'formation IA Claude AI BTP',
  ],
};

const breadcrumbSchema = getBreadcrumbSchema([
  { name: 'Accueil', path: '/' },
  { name: 'Formation Claude AI BTP', path: PATH },
]);

export const metadata = createPageMetadata({
  title: 'Formation Claude AI BTP 2026 — Qualiopi, Constructys 100%',
  description:
    "Formation Claude AI pour le BTP : devis, CR chantier, appels d'offres. Qualiopi, finançable Constructys, en présentiel IDF ou distanciel.",
  path: PATH,
  appendAuthorSuffix: false,
  keywords: [
    'formation Claude AI BTP',
    'formation Claude AI',
    'formation Claude BTP',
    'formation IA Claude BTP',
  ],
});

export default function FormationClaudeAiBtpPage() {
  const faqSchema = getFAQSchema(FAQ_ITEMS);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <JsonLd id="schema-formation-claude-ai-btp-course" schema={courseSchema} />
      <JsonLd id="schema-formation-claude-ai-btp-breadcrumb" schema={breadcrumbSchema} />
      {faqSchema ? <JsonLd id="schema-formation-claude-ai-btp-faq" schema={faqSchema} /> : null}

      <section className="border-b border-slate-200 bg-white px-4 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#377CF3]">Formation Claude AI</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Formation Claude AI BTP — bâtiment et travaux publics
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-700">
            Formation orientée terrain pour intégrer <strong>Claude AI</strong> et <strong>ChatGPT</strong> dans vos
            workflows BTP : devis, CR chantier, emails, analyse DCE et mémoires techniques.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={CALENDLY_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#377CF3] px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              <Calendar className="h-4 w-4" />
              Visio découverte gratuite
            </a>
            <Link href={LINKS.formations} className="rounded-xl border border-[#377CF3] px-6 py-3 font-semibold text-[#377CF3] hover:bg-[#EFF6FF]">
              Catalogue formations
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h2 className="font-display text-3xl font-bold text-slate-900">Pourquoi une formation Claude AI dédiée au BTP ?</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            'Documents BTP volumineux : CCTP, DCE, pièces administratives.',
            'Vocabulaire métier : chantier, planning, sous-traitance, conformité.',
            'Objectif concret : produire plus vite sans sacrifier le contrôle métier.',
          ].map((text) => (
            <article key={text} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-slate-700">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-4 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">Programme formation Claude AI BTP</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {[
              ['Module 1 — Claude Chat', 'Prompts métier BTP pour devis, emails, synthèses chantier.'],
              ['Module 2 — Claude Cowork', 'Workflows récurrents : CR chantier, veille AO, relances.'],
              ['Module 3 — Claude Code', 'Automatisations simples orientées documents BTP et exports.'],
              ['Module 4 — Claude Chrome', 'Recherche, extraction et reformulation sur sources web métier.'],
            ].map(([title, desc]) => (
              <article key={title} className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6">
                <h3 className="font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-slate-600">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h2 className="font-display text-3xl font-bold text-slate-900">Pour qui ?</h2>
        <ul className="mt-6 grid gap-3 md:grid-cols-2">
          {[
            'Dirigeants BTP',
            'Conducteurs de travaux',
            "Chargés d'affaires",
            'Équipes administratives',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 rounded-xl border border-slate-200 bg-white p-4 text-slate-700">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-slate-200 bg-white px-4 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">Formation Claude AI vs Formation ChatGPT BTP</h2>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-[#377CF3] text-white">
                <tr>
                  <th className="px-4 py-3">Critère</th>
                  <th className="px-4 py-3">Claude AI</th>
                  <th className="px-4 py-3">ChatGPT</th>
                  <th className="px-4 py-3">Position OFC</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="bg-white"><td className="px-4 py-3">Documents longs</td><td className="px-4 py-3">Très performant</td><td className="px-4 py-3">Performant</td><td className="px-4 py-3">Complémentaires</td></tr>
                <tr className="bg-slate-50"><td className="px-4 py-3">Écosystème</td><td className="px-4 py-3">Cowork / Code / Chrome</td><td className="px-4 py-3">Large intégrations</td><td className="px-4 py-3">Choix selon usage</td></tr>
                <tr className="bg-white"><td className="px-4 py-3">Usage BTP</td><td className="px-4 py-3">DCE, CCTP, CR</td><td className="px-4 py-3">Devis, emails, scripts</td><td className="px-4 py-3">Double compétence</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h2 className="font-display text-3xl font-bold text-slate-900">Tarifs + financement Constructys</h2>
        <p className="mt-4 max-w-3xl text-slate-700">
          Prise en charge possible selon dossier : <strong>24€ HT/h/stagiaire</strong> et plafond
          <strong> 840€ HT/jour/groupe</strong> en intra. Formation certifiée Qualiopi, accompagnement dossier inclus.
        </p>
        <p className="mt-3 text-sm text-slate-600">
          +{formatProfessionalsTrainedCount()} professionnels formés · note {SOCIAL_PROOF.AVERAGE_RATING}
        </p>
      </section>

      <section className="border-y border-slate-200 bg-white px-4 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">Voir aussi</h2>
          <ul className="mt-6 flex flex-wrap gap-3 text-sm">
            <li><Link className="rounded-full border border-slate-200 px-4 py-2 hover:border-[#377CF3] hover:text-[#377CF3]" href={LINKS.formationClaudeAiBatiment}>formation Claude AI bâtiment</Link></li>
            <li><Link className="rounded-full border border-slate-200 px-4 py-2 hover:border-[#377CF3] hover:text-[#377CF3]" href={LINKS.formationClaudeAiTravauxPublics}>formation Claude AI travaux publics</Link></li>
            <li><Link className="rounded-full border border-slate-200 px-4 py-2 hover:border-[#377CF3] hover:text-[#377CF3]" href={LINKS.claudeAiBtp}>guide Claude AI BTP</Link></li>
            <li><Link className="rounded-full border border-slate-200 px-4 py-2 hover:border-[#377CF3] hover:text-[#377CF3]" href={LINKS.formations}>catalogue formations</Link></li>
            <li><Link className="rounded-full border border-slate-200 px-4 py-2 hover:border-[#377CF3] hover:text-[#377CF3]" href={LINKS.financement}>financement Constructys</Link></li>
          </ul>
        </div>
      </section>
    </main>
  );
}
