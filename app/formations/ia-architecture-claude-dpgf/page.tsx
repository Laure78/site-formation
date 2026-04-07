import Link from 'next/link';
import { FileText, Calendar, Users, Check, Download, ExternalLink } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { RdvLink } from '@/components/RdvLink';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { FAQSection } from '@/components/landing/FAQSection';
import {
  createPageMetadata,
  getCourseSchema,
  getBreadcrumbSchema,
  getFAQSchema,
  SITE_CONFIG,
} from '@/lib/seo';

const LMS_SLUG = 'ia-architecture-claude-dpgf';
const PDF_HREF =
  '/formations/ia-architecture-claude-dpgf/Programme_Formation_IA_Architecture_Marquis_FINAL.pdf';

export const metadata = createPageMetadata({
  title:
    'Formation IA architecture — Claude AI, DPGF, chantier, documents | Qualiopi',
  description:
    'Architectes et cabinets : automatiser DPGF, métrés, planning GANTT, CR de chantier, PV de réception avec Claude AI et Google Workspace. 4 h visio intra. 800 € HT.',
  path: '/formations/ia-architecture-claude-dpgf',
  keywords: [
    'formation IA architecture',
    'Claude AI architecte',
    'DPGF IA',
    'formation IA cabinet architecture',
    'métrés automatisation',
    'Qualiopi architecture',
  ],
});

const courseSchema = getCourseSchema({
  name: 'Architecte augmenté : Claude AI, DPGF, chantier et documents',
  description:
    'Formation intra-entreprise 4 h en visioconférence : Claude AI, Google Drive, Sheets et Docs pour DPGF, métrés, situations de travaux, courriers et actes de marché.',
  path: '/formations/ia-architecture-claude-dpgf',
  providerName: SITE_CONFIG.legalName,
  areaServed: ['France'],
});

const breadcrumbSchema = getBreadcrumbSchema([
  { name: 'Accueil', path: '/' },
  { name: 'Formations', path: '/formations' },
  { name: 'IA architecture — Claude AI & DPGF', path: '/formations/ia-architecture-claude-dpgf' },
]);

const MODULES = [
  {
    duree: '45 min',
    outils: 'Claude AI + Google Drive',
    titre: 'Comprendre l’IA — bases & configuration du cabinet',
    objectifs: [
      'Prendre en main Claude AI et rédiger les premiers prompts',
      'Créer un Projet Claude dédié au cabinet',
      'Activer le connecteur Google Drive',
    ],
    livrable:
      'Projet Claude + connecteur Google Drive + 5 prompts opérationnels',
  },
  {
    duree: '1 h 15',
    outils: 'Claude AI + Google Sheets',
    titre: 'DPGF, métrés, chiffrage & planning GANTT',
    objectifs: [
      'Analyser et compléter une DPGF depuis Google Sheets',
      'Générer des formulations de lots à partir d’un descriptif',
      'Compléter les métrés et vérifier les minutes',
    ],
    livrable: 'Prompts « Analyse DPGF » + « Synthèse GANTT » réutilisables',
  },
  {
    duree: '1 h',
    outils: 'Claude AI + Google Docs',
    titre: 'CR de chantier, situations de travaux & PV de réception',
    objectifs: [
      'Structurer un CR de chantier depuis notes iPad en 10 min',
      'Générer une situation de travaux par lot',
      'Rédiger un PV de réception avec liste des réserves',
    ],
    livrable: 'Prompts « CR iPad » + « PV réception » + situation de travaux',
  },
  {
    duree: '45 min',
    outils: 'Claude AI + Google Drive',
    titre: 'Courriers, actes de marché & organisation pérenne',
    objectifs: [
      'Générer ordres de service, avenants et mises en demeure',
      'Personnaliser le modèle de courrier en-tête avec l’IA',
      'Consolider la bibliothèque de prompts du cabinet',
    ],
    livrable: '10 prompts opérationnels + flux de travail clé en main',
  },
];

const FAQ_ARCHI = [
  {
    q: 'Cette formation est-elle la même que sur la plateforme de formation ?',
    a: "Oui : le programme PDF et la structure par modules sont repris sur la fiche du cours sur la plateforme (supports et ressources alignés).",
  },
  {
    q: 'Quel est le tarif et le format ?',
    a: 'Tarif pédagogique 800 € HT — formation intra-entreprise en visioconférence (Zoom), 4 h, 9h00–13h00, 1 à 10 personnes. TVA exonérée (art. 261-4-4° du CGI).',
  },
  {
    q: 'Quels prérequis ?',
    a: 'Public : architectes, chefs de projet, collaborateurs de cabinet. Aucune expérience IA requise. Abonnement Claude AI Pro (claude.ai, env. 18 € HT/mois/personne) à souscrire avant la session.',
  },
];

export default function FormationIAArchitectureClaudePage() {
  const faqSchema = getFAQSchema(FAQ_ARCHI);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <nav className="mb-6 text-sm text-slate-600">
        <Link href="/" className="text-[var(--accent)] hover:underline">
          Accueil
        </Link>
        {' / '}
        <Link href="/formations" className="text-[var(--accent)] hover:underline">
          Formations
        </Link>
        {' / '}
        <span className="text-slate-900">IA architecture — Claude AI &amp; DPGF</span>
      </nav>

      <p className="text-sm font-medium uppercase tracking-wide text-[var(--accent)]">
        Formation intra-entreprise · Visioconférence · 4 h
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold text-slate-900 md:text-4xl">
        Architecte augmenté : automatiser DPGF, chantier et documents avec Claude AI
      </h1>
      <p className="mt-6 text-lg text-slate-600">
        DPGF, métrés, planning GANTT, comptes rendus de chantier, situations de travaux, PV de réception,
        courriers : une journée demi-journée pour mettre en place Claude AI avec Google Drive, Sheets et
        Docs sur vos vrais flux de travail.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
        <a
          href={PDF_HREF}
          download
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          <Download size={20} strokeWidth={1.5} />
          Télécharger le programme (PDF)
        </a>
        <Link
          href={`/cours/${LMS_SLUG}`}
          className="inline-flex items-center gap-2 rounded-xl border-2 border-[var(--accent)] px-6 py-3 font-semibold text-[var(--accent)] hover:bg-[var(--accent-soft)]"
        >
          <ExternalLink size={20} strokeWidth={1.5} />
          Voir sur la plateforme
        </Link>
        <RdvLink className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-200 px-6 py-3 font-semibold text-slate-800 hover:border-[var(--accent)]">
          Prendre rendez-vous
        </RdvLink>
      </div>

      <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
        <h2 className="font-display text-xl font-bold text-slate-900">Public &amp; modalités</h2>
        <ul className="mt-4 space-y-2 text-slate-700">
          <li className="flex gap-2">
            <Users className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
            <span>
              <strong>Public :</strong> architectes, chefs de projet, collaborateurs en cabinet.
            </span>
          </li>
          <li className="flex gap-2">
            <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
            <span>
              <strong>Horaires :</strong> 9h00 – 13h00 · <strong>Modalité :</strong> Zoom — 30 % apports,
              70 % ateliers sur vos fichiers réels.
            </span>
          </li>
          <li className="flex gap-2">
            <FileText className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
            <span>
              <strong>Prérequis :</strong> abonnement Claude AI Pro à souscrire avant la session. Support
              pédagogique numérique et bibliothèque de prompts remis en fin de session.
            </span>
          </li>
        </ul>
        <p className="mt-4 text-sm text-slate-600">
          Délai d&apos;accès : sous 15 jours ouvrés après signature de la convention. Aménagements possibles
          sur demande —{' '}
          <a href="mailto:laureolivie@yahoo.fr" className="font-medium text-[var(--accent)] hover:underline">
            laureolivie@yahoo.fr
          </a>
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold text-slate-900">Objectifs pédagogiques</h2>
        <ul className="mt-4 space-y-2 text-slate-700">
          {[
            'Analyser et compléter une DPGF ou un métré avec l’IA',
            'Rédiger un CR de chantier depuis des notes iPad',
            'Générer une situation de travaux et un PV de réception',
            'Produire courriers et actes de marché via le connecteur Google Drive',
          ].map((o) => (
            <li key={o} className="flex gap-2">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              {o}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold text-slate-900">Programme détaillé</h2>
        <div className="mt-8 space-y-8">
          {MODULES.map((m, i) => (
            <div
              key={m.titre}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-lg font-semibold text-slate-900">
                  Module {i + 1} — {m.titre}
                </h3>
                <span className="text-sm font-medium text-[var(--accent)]">
                  {m.duree} · {m.outils}
                </span>
              </div>
              <p className="mt-3 text-xs font-semibold uppercase text-slate-500">Objectifs</p>
              <ul className="mt-2 space-y-1 text-sm text-slate-600">
                {m.objectifs.map((o) => (
                  <li key={o}>▸ {o}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-700">
                <span className="font-semibold text-slate-900">Livrable :</span> {m.livrable}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-2xl border border-[var(--accent)] bg-[var(--accent-soft)] p-6">
        <h2 className="font-display text-xl font-bold text-slate-900">Conditions &amp; tarification</h2>
        <ul className="mt-4 space-y-2 text-sm text-slate-700">
          <li>
            <strong>Durée :</strong> 4 h · <strong>Tarif pédagogique :</strong> 800 € HT ·{' '}
            <strong>Effectif :</strong> 1 à 10 personnes (intra-entreprise)
          </li>
          <li>
            <strong>TVA :</strong> exonérée — art. 261-4-4° du CGI
          </li>
          <li>
            <strong>Évaluation :</strong> continue sur fichiers réels, auto-évaluation début/fin,
            questionnaire à chaud, attestation individuelle en fin de session.
          </li>
          <li>
            <strong>Suivi post-formation :</strong> bibliothèque de prompts — questions par email sous 30
            jours — session de perfectionnement possible sur devis.
          </li>
        </ul>
      </section>

      <FAQSection
        items={FAQ_ARCHI}
        title="Questions fréquentes"
        subtitle="Plateforme, tarif, prérequis Claude AI."
      />

      <div className="mt-10">
        <AllerPlusLoin
          links={[
            { href: '/formations', label: 'Catalogue formations' },
            { href: `/cours/${LMS_SLUG}`, label: 'Cours sur la plateforme' },
            { href: CALENDLY_BOOKING_URL, label: 'Prendre rendez-vous' },
            { href: '/financement-constructys-formation-ia-btp', label: 'Financement Constructys' },
          ]}
        />
      </div>
    </div>
  );
}
