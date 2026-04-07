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
import { FAQ_RH_BTP } from '@/lib/faq';

const LMS_SLUG = 'ia-rh-btp';
/** À déposer dans public/formations/ia-rh-btp/ si besoin */
const PDF_HREF = '/formations/ia-rh-btp/Programme_Formation_IA_RH_BTP.pdf';

export const metadata = createPageMetadata({
  title: 'Formation IA RH BTP : Recrutement & GEPP efficaces',
  description:
    "IA pour la fonction RH dans le BTP : recrutement, GEPP, tableaux de bord. Deux jours, Qualiopi. DRH et responsables RH : financez via Constructys sans attendre.",
  path: '/formations/ia-rh-btp',
  keywords: [
    'formation IA RH BTP',
    'recrutement BTP IA',
    'GEPP BTP intelligence artificielle',
    'DRH BTP formation IA',
    'ChatGPT recrutement BTP',
    'IA ressources humaines BTP',
    'automatisation RH BTP',
  ],
});

const courseSchema = getCourseSchema({
  name: 'Formation IA pour la Fonction RH dans le BTP',
  description:
    'Formation opérationnelle 2 jours : automatiser le recrutement, optimiser la GEPP, créer des tableaux de bord RH et votre assistant IA. 100% finançable OPCO selon éligibilité.',
  path: '/formations/ia-rh-btp',
  providerName: SITE_CONFIG.legalName,
  areaServed: ['France', 'Île-de-France'],
});

const breadcrumbSchema = getBreadcrumbSchema([
  { name: 'Accueil', path: '/' },
  { name: 'Formations', path: '/formations' },
  { name: 'Formation IA pour la fonction RH BTP', path: '/formations/ia-rh-btp' },
]);

const MODULES = [
  {
    duree: '2 h',
    outils: 'Éthique · RGPD · panorama outils',
    titre: 'Comprendre l’IA et ses applications RH dans le BTP',
    objectifs: [
      'Cadre de vigilance : éthique, RGPD, confidentialité des données RH',
      'Risques : biais, hallucinations, discrimination en recrutement',
      'Panorama des outils : ChatGPT, Mistral AI, Gemini, Perplexity',
      'Cas pratique : besoins IA du service RH',
    ],
    livrable: 'Matrice de vigilance + premiers cas d’usage',
  },
  {
    duree: '2 h',
    outils: 'Prompt engineering',
    titre: 'Maîtrise du prompt engineering RH',
    objectifs: [
      'Structure d’un prompt RH : contexte, rôle, tâche, format',
      'Bibliothèque de prompts BTP (entretiens, e-mails, bilans)',
      'Exercice : génération de contenus RH professionnels',
    ],
    livrable: 'Bibliothèque de prompts personnalisés (brouillon)',
  },
  {
    duree: '3 h',
    outils: 'Formation · contenus pédagogiques',
    titre: 'IA au service de la formation dans le BTP',
    objectifs: [
      'Créer contenus pédagogiques et quiz',
      'Plans de formation par métier (maçon, conducteur de travaux, etc.)',
      'Cas pratique : module sécurité chantier avec l’IA',
    ],
    livrable: 'Ébauche de module pédagogique',
  },
  {
    duree: '2 h 30',
    outils: 'GEPP · entretiens',
    titre: 'GEPP et anticiper les compétences BTP',
    objectifs: [
      'Cartographier compétences actuelles et futures',
      'Identifier écarts par métier',
      'Simulation de parcours et entretiens professionnels',
    ],
    livrable: 'Trame GEPP + synthèse entretiens',
  },
  {
    duree: '2 h',
    outils: 'Données · indicateurs',
    titre: 'Construire ses KPI RH avec l’IA',
    objectifs: [
      'Données RH exploitables (SIRH, enquêtes, entretiens de sortie)',
      'Tableaux de bord : recrutement, absentéisme, formation, climat',
      'Cas pratique : tableau de bord BTP',
    ],
    livrable: 'Modèle de tableau de bord RH',
  },
  {
    duree: '2 h 30',
    outils: 'GPTs · plan d’action',
    titre: 'Création d’un assistant IA RH et plan d’action',
    objectifs: [
      'Configurer des GPTs pour recrutement, manager, formation',
      'Assistants : pré-sélection, newsletter, présentations',
      'Formaliser un plan d’action IA RH pour chaque participant',
    ],
    livrable: 'Plan d’action IA RH + configuration assistants',
  },
];

export default function FormationIARHBTPPage() {
  const faqSchema = getFAQSchema(FAQ_RH_BTP);

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
        <span className="text-slate-900">Formation IA — fonction RH BTP</span>
      </nav>

      <p className="text-sm font-medium uppercase tracking-wide text-[var(--accent)]">
        Présentiel ou distanciel · 2 jours (14 h) · Intermédiaire · BTP-03
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold text-slate-900 md:text-4xl">
        Formation IA pour la fonction RH dans le BTP
      </h1>
      <p className="mt-6 text-lg text-slate-600">
        Automatisez le recrutement, optimisez la GEPP, générez des tableaux de bord RH et créez votre
        assistant IA personnalisé. Formation opérationnelle pour DRH, chargés de recrutement et
        responsables RH du secteur BTP — présentation alignée sur la fiche{' '}
        <Link
          href="/formations/ia-architecture-claude-dpgf"
          className="font-medium text-[var(--accent)] hover:underline"
        >
          type « programme détaillé + modalités »
        </Link>
        .
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
              <strong>Public :</strong> DRH, chargés de recrutement, responsables RH et assistants RH du BTP.
            </span>
          </li>
          <li className="flex gap-2">
            <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
            <span>
              <strong>Durée :</strong> 2 jours (<strong>14 h</strong>) · <strong>Format :</strong> présentiel
              ou visio, dans vos locaux ou à distance — groupe selon devis.
            </span>
          </li>
          <li className="flex gap-2">
            <FileText className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
            <span>
              <strong>Prérequis :</strong> aucune compétence technique IA.{' '}
              <strong>ChatGPT Teams</strong> recommandé pour la confidentialité des données RH.
            </span>
          </li>
        </ul>
        <p className="mt-4 text-sm text-slate-600">
          Contact :{' '}
          <a href="mailto:laureolivie@yahoo.fr" className="font-medium text-[var(--accent)] hover:underline">
            laureolivie@yahoo.fr
          </a>{' '}
          ·{' '}
          <a href="tel:+33695661818" className="font-medium text-[var(--accent)] hover:underline">
            06 95 66 18 18
          </a>
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold text-slate-900">Objectifs pédagogiques</h2>
        <ul className="mt-4 space-y-2 text-slate-700">
          {[
            'Automatiser le recrutement et la sélection de candidats',
            'Piloter la GEPP et anticiper les compétences',
            'Créer des tableaux de bord RH opérationnels',
            'Construire un assistant IA RH sur mesure',
            'Maîtriser les risques éthiques et RGPD',
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
        <p className="mt-2 text-sm text-slate-600">
          Jour 1 — usages RH &amp; formation · Jour 2 — GEPP, données &amp; assistants IA.
        </p>
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
            <strong>Durée :</strong> 14 h sur 2 jours · <strong>Tarif :</strong> sur devis (intra / inter) ·{' '}
            <strong>Financement :</strong> OPCO (Constructys, AKTO, etc.) selon éligibilité.
          </li>
          <li>
            <strong>Livrables :</strong> bibliothèque de prompts RH BTP, modèles de GPTs, repères sécurité et
            RGPD, ressources selon convention.
          </li>
          <li>
            <strong>Évaluation :</strong> cas pratiques, attestation de fin de formation Qualiopi.
          </li>
        </ul>
      </section>

      <FAQSection
        items={FAQ_RH_BTP}
        title="Questions fréquentes"
        subtitle="Public, durée, données RH."
      />

      <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
        <h2 className="font-display text-xl font-bold text-slate-900">
          Complément LinkedIn Learning — recrutement dans le BTP
        </h2>
        <p className="mt-3 text-sm text-slate-700 leading-relaxed">
          Le parcours présentiel s&apos;appuie sur les mêmes enjeux que le cours en ligne{' '}
          <a
            href="https://fr.linkedin.com/learning/l-ia-pour-les-artisans-et-tpe-recruter-sa-main-d-oeuvre-efficacement"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[var(--accent)] hover:underline"
          >
            L&apos;IA pour les artisans et TPE : Recruter sa main-d&apos;œuvre efficacement
          </a>{' '}
          (annonces, tri de CV, pré-qualification). Visionnez les leçons sur LinkedIn Learning.
        </p>
      </section>

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
