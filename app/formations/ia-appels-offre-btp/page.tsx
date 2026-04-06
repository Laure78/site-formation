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
import { FAQ_APPELS_OFFRE } from '@/lib/faq';

const LMS_SLUG = 'ia-appels-offre-btp';
/** Programme officiel — aligné seed SQL supports */
const PDF_HREF = '/formations/ia-appels-offre-btp/Programme_Formation_LSR_AO_BTP_2026.pdf';

export const metadata = createPageMetadata({
  title: "Répondre aux appels d'offre avec l'IA — DCE, mémoires, assistant",
  description:
    "Formation appels d'offre avec l'IA : DCE, mémoires techniques, assistant IA, chiffrage. Journée 7h ou parcours LMS 7h. Chargés d'affaires BTP. Qualiopi, Constructys.",
  path: '/formations/ia-appels-offre-btp',
  keywords: [
    'IA appels d\'offres BTP',
    'mémoire technique BTP IA',
    'analyse CCTP IA',
    'répondre appel d\'offre travaux',
    'ChatGPT appels d\'offres BTP',
    'DCE IA',
    'analyse DCE IA',
    'IA marchés publics BTP',
  ],
});

const courseSchema = getCourseSchema({
  name: "Répondre aux appels d'offre avec l'IA",
  description:
    "Formation opérationnelle : analysez les DCE plus vite, rédigez des mémoires techniques et configurez un assistant IA pour vos réponses marchés. Journée 7 h ou parcours LMS 7 h. 100% finançable OPCO selon éligibilité.",
  path: '/formations/ia-appels-offre-btp',
  providerName: SITE_CONFIG.legalName,
  areaServed: ['France', 'Île-de-France'],
});

const breadcrumbSchema = getBreadcrumbSchema([
  { name: 'Accueil', path: '/' },
  { name: 'Formations', path: '/formations' },
  { name: "Répondre aux appels d'offre avec l'IA", path: '/formations/ia-appels-offre-btp' },
]);

const OUTILS_IA_LINE =
  'ChatGPT, Claude, Perplexity, Mistral, Gemini, NotebookLM — selon modules.';

const MODULES = [
  {
    duree: '30 min',
    outils: 'Contexte marchés publics',
    titre: 'Introduction',
    objectifs: [
      'Cadrer les enjeux des appels d’offres BTP avec l’IA',
      'Présenter le déroulé de la journée et les livrables',
      'Rappeler les règles de confidentialité des données',
    ],
    livrable: 'Feuille de route personnelle pour la journée',
  },
  {
    duree: '2 h',
    outils: 'NotebookLM · DCE / pièces',
    titre: 'Analyse DCE avec NotebookLM',
    objectifs: [
      'Extraire les exigences techniques et les critères de sélection',
      'Synthétiser un DCE volumineux en temps court',
      'Préparer une checklist de réponse',
    ],
    livrable: 'Méthode d’analyse DCE réutilisable + prompts',
  },
  {
    duree: '1 h 30',
    outils: 'IA générative · tableaux',
    titre: 'Décision Go / No Go et rentabilité',
    objectifs: [
      'Évaluer si le dossier vaut l’investissement temps',
      'Analyser la rentabilité et les risques',
      'Prioriser les réponses aux marchés',
    ],
    livrable: 'Grille Go/No Go + synthèse rentabilité',
  },
  {
    duree: '1 h 30',
    outils: 'Rédaction assistée · CCTP',
    titre: 'Rédaction mémoire technique et relecture',
    objectifs: [
      'Structurer un mémoire adapté au projet',
      'Rédiger avec l’IA puis sécuriser la conformité CCTP',
      'Contrôler la cohérence et la relecture finale',
    ],
    livrable: 'Trame de mémoire + prompts de relecture',
  },
  {
    duree: '1 h 30',
    outils: 'Chiffrage · IA',
    titre: 'Aide au chiffrage et contrôle de rentabilité',
    objectifs: [
      'Optimiser le chiffrage avec l’IA comme assistant',
      'Contrôler marges et points sensibles',
      'Préparer la relecture avant remise',
    ],
    livrable: 'Check-list chiffrage et contrôle de marge',
  },
];

export default function FormationIAAppelsOffreBTPPage() {
  const faqSchema = getFAQSchema(FAQ_APPELS_OFFRE);

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
        <span className="text-slate-900">Répondre aux appels d&apos;offre avec l&apos;IA</span>
      </nav>

      <p className="text-sm font-medium uppercase tracking-wide text-[var(--accent)]">
        Présentiel ou distanciel · 7 h ou LMS 7 h · Intermédiaire · BTP-02
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold text-slate-900 md:text-4xl">
        Répondre aux appels d&apos;offre avec l&apos;IA
      </h1>
      <p className="mt-6 text-lg text-slate-600">
        Analysez les DCE plus vite, rédigez des mémoires techniques convaincants et optimisez vos chiffrages
        grâce à l&apos;IA. Formation opérationnelle pour entreprises du bâtiment, chargés d&apos;affaires et
        bureaux d&apos;études — même exigence de clarté que sur une fiche type{' '}
        <Link
          href="/formations/ia-architecture-claude-dpgf"
          className="font-medium text-[var(--accent)] hover:underline"
        >
          programme détaillé par modules
        </Link>
        . Outils : {OUTILS_IA_LINE}
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
              <strong>Public :</strong> chargés d&apos;affaires, bureaux d&apos;études, dirigeants du BTP.
              Aucune compétence technique IA requise — expérience des appels d&apos;offres recommandée.
            </span>
          </li>
          <li className="flex gap-2">
            <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
            <span>
              <strong>Formats :</strong> journée <strong>7 h</strong> (présentiel ou visio, jusqu&apos;à 12
              personnes) ou <strong>parcours LMS 7 h</strong> sur la plateforme — même référence catalogue{' '}
              <strong>BTP-02</strong>.
            </span>
          </li>
          <li className="flex gap-2">
            <FileText className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
            <span>
              <strong>Prérequis :</strong> connaissance du secteur BTP et des dossiers DCE / CCTP. Pour les
              données sensibles : privilégier des environnements professionnels (ex. offres Team) — rappels
              RGPD en session.
            </span>
          </li>
        </ul>
        <p className="mt-4 text-sm text-slate-600">
          Devis et convention :{' '}
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
            'Analyser un DCE et en extraire les exigences opérationnelles rapidement',
            'Structurer un mémoire technique aligné sur le CCTP et les critères',
            'Utiliser l’IA pour le chiffrage et le contrôle de rentabilité',
            'Paramétrer une démarche d’assistant IA pour vos prochains dossiers',
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
          Répartition indicative sur une journée — ajustements possibles selon le groupe.
        </p>
        <div className="mt-8 space-y-8">
          {MODULES.map((m, i) => (
            <div
              key={m.titre}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-lg font-semibold text-slate-900">
                  {i === 0 ? m.titre : `Module ${i} — ${m.titre}`}
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

      <section
        id="parcours-lms"
        className="mt-12 scroll-mt-24 rounded-2xl border border-slate-200 bg-[var(--accent-soft)] p-6"
      >
        <h2 className="font-display text-xl font-bold text-slate-900">
          Parcours LMS 7 h — assistant IA DCE &amp; mémoire technique
        </h2>
        <p className="mt-3 text-sm text-slate-700 leading-relaxed">
          La même formation « répondre aux appels d&apos;offre avec l&apos;IA » est aussi disponible en{' '}
          <strong>parcours en ligne 7 h</strong> sur la plateforme : approfondissement sur la création et le
          paramétrage d&apos;un assistant IA pour analyser les DCE et accélérer vos mémoires techniques.{' '}
          <strong>Qualiopi</strong>, financement <strong>OPCO Constructys</strong> selon éligibilité — même
          référence <strong>BTP-02</strong> que la journée présentielle.
        </p>
        <p className="mt-4">
          <Link
            href={`/cours/${LMS_SLUG}`}
            className="text-sm font-semibold text-[var(--accent)] hover:underline"
          >
            Ouvrir la fiche cours sur la plateforme →
          </Link>
        </p>
      </section>

      <section className="mt-12 rounded-2xl border border-[var(--accent)] bg-[var(--accent-soft)] p-6">
        <h2 className="font-display text-xl font-bold text-slate-900">Conditions &amp; tarification</h2>
        <ul className="mt-4 space-y-2 text-sm text-slate-700">
          <li>
            <strong>Durée :</strong> 7 h (journée) ou 7 h (LMS) · <strong>Tarif :</strong> sur devis selon
            effectif et modalité (intra / inter) · <strong>Financement :</strong> OPCO (Constructys, AKTO,
            etc.) selon éligibilité.
          </li>
          <li>
            <strong>Livrables :</strong> bibliothèque de prompts, trames de mémoires, workflows DCE, repères
            RGPD, accès ressources selon convention.
          </li>
          <li>
            <strong>Évaluation :</strong> mise en situation sur fichiers réels, attestation de fin de
            formation.
          </li>
        </ul>
      </section>

      <FAQSection
        items={FAQ_APPELS_OFFRE}
        title="Questions fréquentes"
        subtitle="Public, durée, livrables."
      />

      <div className="mt-10">
        <AllerPlusLoin
          links={[
            { href: '/formations', label: 'Catalogue formations' },
            { href: `/cours/${LMS_SLUG}`, label: 'Cours sur la plateforme' },
            { href: CALENDLY_BOOKING_URL, label: 'Prendre rendez-vous' },
            { href: '/financement-constructys', label: 'Financement Constructys' },
            { href: '/blog/ia-btp-analyse-dce', label: 'Article : analyser un DCE avec l’IA' },
          ]}
        />
      </div>
    </div>
  );
}
