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

const LMS_SLUG = 'formation-ia-sensibilisation-prompt-engineering-assistants';
/** Supports statiques — voir public/formations/pitel-ia-sensibilisation-prompts-assistants/README.md */
const PDF_HREF =
  '/formations/pitel-ia-sensibilisation-prompts-assistants/PITEL_Formation_IA_Modules1et2.pdf';

export const metadata = createPageMetadata({
  title: "Sensibilisation à l'IA & assistants personnalisés — Formation LMS BTP",
  description:
    "Parcours LMS sensibilisation IA, prompts par métier et assistants personnalisés. Huit heures, niveau débutant. Qualiopi, Constructys. Accédez au cours.",
  path: '/formations/sensibilisation-ia-assistants-personnalises',
  keywords: [
    'sensibilisation IA BTP',
    'formation assistants IA personnalisés',
    'prompts par métier BTP',
    'formation IA en ligne',
    'Constructys',
  ],
});

const courseSchema = getCourseSchema({
  name: "Sensibilisation à l'IA & Assistants IA personnalisés",
  description:
    "Parcours LMS en trois volets : sensibilisation à l'IA, ressource prompts par métier, assistants IA personnalisés. 100% finançable Constructys.",
  path: '/formations/sensibilisation-ia-assistants-personnalises',
  providerName: SITE_CONFIG.legalName,
  areaServed: ['France'],
});

const breadcrumbSchema = getBreadcrumbSchema([
  { name: 'Accueil', path: '/' },
  { name: 'Formations', path: '/formations' },
  {
    name: "Sensibilisation à l'IA & assistants IA",
    path: '/formations/sensibilisation-ia-assistants-personnalises',
  },
]);

const MODULES = [
  {
    duree: '2 h 30',
    outils: 'Supports PDF · plateforme LMS',
    titre: 'Sensibilisation à l’IA générative',
    objectifs: [
      'Comprendre l’IA générative et ses usages terrain dans le BTP',
      'Parcourir les modules 1 et 2 avec les supports fournis',
      'Identifier des cas d’usage prioritaires pour votre entreprise',
    ],
    livrable: 'Supports PDF + validation des acquis sur la plateforme',
  },
  {
    duree: '2 h 30',
    outils: 'Ressource Excel · prompts par métier',
    titre: 'Prompts par métier',
    objectifs: [
      'Utiliser la banque de prompts adaptés à votre corps de métier',
      'Personnaliser des modèles pour devis, relances et suivi administratif',
      'Construire votre propre bibliothèque de prompts réutilisables',
    ],
    livrable: 'Fichier Excel prompts par métier (version mise à jour)',
  },
  {
    duree: '3 h',
    outils: 'Plateforme LMS · assistants IA',
    titre: 'Assistants IA personnalisés',
    objectifs: [
      'Concevoir le périmètre d’un assistant IA aligné sur vos process',
      'Paramétrer et tester un assistant sur des cas réels',
      'Préparer un plan de déploiement simple en entreprise',
    ],
    livrable: 'Assistant IA paramétré + trame de mise en œuvre',
  },
];

const FAQ_SENSIB = [
  {
    q: 'Cette formation est-elle la même que sur la plateforme de formation ?',
    a: "Oui. Le titre affiché sur le LMS est « Formation IA : Sensibilisation à l'IA & Assistants IA Personnalisés ». Vous accédez au parcours complet depuis la page du cours une fois inscrit.",
  },
  {
    q: 'Combien de temps dure le parcours ?',
    a: 'Environ 8 heures au total (durée indicative), en autonomie sur la plateforme, avec PDF et ressource Excel.',
  },
  {
    q: 'Est-ce finançable par mon OPCO ?',
    a: "Oui, les entreprises du BTP peuvent mobiliser l'OPCO Constructys selon les règles en vigueur. Contactez-nous pour un devis et une convention adaptés.",
  },
];

export default function SensibilisationIAAssistantsPage() {
  const faqSchema = getFAQSchema(FAQ_SENSIB);

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
        <span className="text-slate-900">Sensibilisation à l&apos;IA &amp; assistants IA</span>
      </nav>

      <p className="text-sm font-medium uppercase tracking-wide text-[var(--accent)]">
        Parcours LMS · 8 h (indicatif) · Débutant · BTP-05
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold text-slate-900 md:text-4xl">
        Sensibilisation à l&apos;IA &amp; Assistants IA personnalisés
      </h1>
      <p className="mt-6 text-lg text-slate-600">
        Parcours en ligne sur la plateforme de formation : sensibilisation à l&apos;IA, prompts par métier
        (Excel), puis conception d&apos;assistants IA sur mesure. Pensé pour les professionnels du BTP qui
        veulent des contenus opérationnels, pas de la théorie creuse — sur la même logique que{' '}
        <Link
          href="/formations/ia-au-service-du-batiment"
          className="font-medium text-[var(--accent)] hover:underline"
        >
          L&apos;IA au service du bâtiment
        </Link>{' '}
        (parcours présentiel 4 h / 7 h), mais ici en autonomie sur le LMS.
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
              <strong>Public :</strong> dirigeants, conducteurs de travaux, administratifs, encadrement
              chantier — toute équipe du BTP qui veut monter en compétence sur l&apos;IA.
            </span>
          </li>
          <li className="flex gap-2">
            <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
            <span>
              <strong>Format :</strong> 100 % en ligne sur la plateforme — rythme libre, durée indicative{' '}
              <strong>8 h</strong>. Niveau <strong>débutant</strong>.
            </span>
          </li>
          <li className="flex gap-2">
            <FileText className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
            <span>
              <strong>Livrables :</strong> supports PDF modules 1 et 2, banque de prompts Excel, supports du
              module 3 (assistants) — fichiers listés dans le dossier public{' '}
              <code className="rounded bg-white px-1 text-xs">formations/pitel-ia-sensibilisation-prompts-assistants</code>.
            </span>
          </li>
        </ul>
        <p className="mt-4 text-sm text-slate-600">
          Convention et accès plateforme : sous réserve de signature. Questions :{' '}
          <a href="mailto:laureolivie@yahoo.fr" className="font-medium text-[var(--accent)] hover:underline">
            laureolivie@yahoo.fr
          </a>
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold text-slate-900">Objectifs pédagogiques</h2>
        <ul className="mt-4 space-y-2 text-slate-700">
          {[
            'Comprendre l’IA générative et ses usages utiles dans le BTP',
            'Exploiter une banque de prompts par métier (Excel)',
            'Concevoir et paramétrer des assistants IA adaptés à vos process',
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
            <strong>Durée :</strong> 8 h (indicatif) · <strong>Réf. catalogue :</strong> BTP-05 ·{' '}
            <strong>Certification :</strong> Qualiopi — financement possible <strong>OPCO Constructys</strong>{' '}
            selon éligibilité.
          </li>
          <li>
            <strong>Évaluation :</strong> quiz et activités sur la plateforme, attestation en fin de parcours
            selon modalités OF.
          </li>
          <li>
            <strong>Support :</strong> questions par email sous 30 jours ouvrés après la fin du parcours pour
            les points pédagogiques.
          </li>
        </ul>
      </section>

      <FAQSection
        items={FAQ_SENSIB}
        title="Questions fréquentes"
        subtitle="Plateforme LMS, durée et financement."
      />

      <div className="mt-10">
        <AllerPlusLoin
          links={[
            { href: '/formations', label: 'Catalogue formations' },
            { href: `/cours/${LMS_SLUG}`, label: 'Cours sur la plateforme' },
            { href: CALENDLY_BOOKING_URL, label: 'Prendre rendez-vous' },
            { href: '/financement-constructys', label: 'Financement Constructys' },
          ]}
        />
      </div>
    </div>
  );
}
