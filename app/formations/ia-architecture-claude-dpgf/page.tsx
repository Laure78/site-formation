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
import {
  SESSION_DUREE_LIBELLE,
  TARIF_FORFAIT_AVANCE_HT,
  MODALITE_FORMATIONS_PRESENTIEL,
  EXIGENCE_CLAUDE_PRO_NIVEAU_AVANCE,
  LIBELLE_EFFECTIF_GROUPE_COURT,
} from '@/lib/tarifs-sessions';
import { PHOTOS } from '@/lib/photos';
import {
  FormationCourseHero,
  FormationHeroPhoto,
} from '@/components/formations/FormationCourseHero';

const LMS_SLUG = 'ia-architecture-claude-dpgf';
const PDF_HREF =
  '/formations/ia-architecture-claude-dpgf/Programme_Formation_IA_Architecture_Marquis_FINAL.pdf';

export const metadata = createPageMetadata({
  title:
    'Formation IA architecture — Claude AI, DPGF, chantier, documents | Qualiopi',
  description:
    `Formation IA BTP pour cabinets : DPGF, métrés, mémoire technique, CR chantier et documents avec Claude AI. ${SESSION_DUREE_LIBELLE} présentiel. Forfait ${TARIF_FORFAIT_AVANCE_HT} € HT/part. (avancé). Qualiopi.`,
  path: '/formations/ia-architecture-claude-dpgf',
  keywords: [
    'formation IA architecture',
    'formation IA BTP',
    'Claude AI architecte',
    'DPGF IA',
    'rédaction mémoire technique',
    'formation IA cabinet architecture',
    'métrés automatisation',
    'appel d\'offre BTP',
    'Qualiopi architecture',
  ],
  image: {
    url: PHOTOS.formationIABtpArchiClaudePresentielGroupe2026.src,
    width: PHOTOS.formationIABtpArchiClaudePresentielGroupe2026.width,
    height: PHOTOS.formationIABtpArchiClaudePresentielGroupe2026.height,
    alt: PHOTOS.formationIABtpArchiClaudePresentielGroupe2026.alt,
  },
});

const courseSchema = getCourseSchema({
  name: 'Architecte augmenté : Claude AI, DPGF, chantier et documents',
  description:
    'Formation intra-entreprise 4 h en présentiel : Claude AI, Google Drive, Sheets et Docs pour DPGF, métrés, situations de travaux, courriers et actes de marché.',
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

const HERO_RESUME_ARCHI = [
  `Parcours catalogue BTP-06 : Claude AI, DPGF, chantier, documents (Google Workspace).`,
  `Session ${SESSION_DUREE_LIBELLE} — forfait ${TARIF_FORFAIT_AVANCE_HT} € HT/part. (niveau avancé).`,
  `${LIBELLE_EFFECTIF_GROUPE_COURT}.`,
  'Présentiel intra-entreprise — Qualiopi, financement OPCO selon éligibilité.',
];

const FAQ_ARCHI = [
  {
    q: 'Cette formation est-elle la même que sur la plateforme de formation ?',
    a: "Oui : le programme PDF et la structure par modules sont repris sur la fiche du cours sur la plateforme (supports et ressources alignés).",
  },
  {
    q: 'Quel est le tarif et le format ?',
    a: `Forfait ${TARIF_FORFAIT_AVANCE_HT} € HT par participant (niveau avancé) — session de ${SESSION_DUREE_LIBELLE} en présentiel (ex. 9h00–13h00). TVA exonérée (art. 261-4-4° du CGI).`,
  },
  {
    q: 'Quels prérequis ?',
    a: `Public : architectes, chefs de projet, collaborateurs de cabinet. Aucune expérience IA requise. ${EXIGENCE_CLAUDE_PRO_NIVEAU_AVANCE} Souscription sur claude.ai avant la session (ordre de grandeur : env. 18 € HT/mois et personne).`,
  },
];

export default function FormationIAArchitectureClaudePage() {
  const faqSchema = getFAQSchema(FAQ_ARCHI);

  return (
    <div>
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

      <FormationCourseHero
        refLine="Formation intra-entreprise · Présentiel · BTP-06 · Niveau avancé"
        title="Architecte augmenté : automatiser DPGF, chantier et documents avec Claude AI"
        subtitle="Claude AI, Google Drive, Sheets et Docs — cabinets et entreprises du bâtiment"
        badges={['Claude AI', 'DPGF & chantier', 'Qualiopi']}
        summaryItems={HERO_RESUME_ARCHI}
        image={
          <FormationHeroPhoto
            src={PHOTOS.formationIABtpArchiClaudePresentielGroupe2026.src}
            alt={PHOTOS.formationIABtpArchiClaudePresentielGroupe2026.alt}
            width={PHOTOS.formationIABtpArchiClaudePresentielGroupe2026.width}
            height={PHOTOS.formationIABtpArchiClaudePresentielGroupe2026.height}
            priority
          />
        }
        ctas={
          <>
            <RdvLink className="rounded-xl bg-[var(--accent)] px-6 py-3.5 text-center font-semibold text-white hover:bg-blue-600">
              Prendre rendez-vous
            </RdvLink>
            <a
              href={PDF_HREF}
              download
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 px-6 py-3.5 font-semibold text-slate-800 hover:border-[var(--accent)]"
            >
              <Download size={20} strokeWidth={1.5} />
              Télécharger le programme (PDF)
            </a>
            <Link
              href={`/cours/${LMS_SLUG}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[var(--accent)] px-6 py-3.5 font-semibold text-[var(--accent)] hover:bg-[var(--accent-soft)]"
            >
              <ExternalLink size={20} strokeWidth={1.5} />
              Voir sur la plateforme
            </Link>
          </>
        }
        footerLinks={
          <>
            <a href="#programme" className="font-medium text-[var(--accent)] hover:underline">
              Voir le programme détaillé
            </a>
            <Link
              href={`/cours/${LMS_SLUG}`}
              className="font-medium text-slate-600 hover:text-[var(--accent)] hover:underline"
            >
              Fiche cours plateforme
            </Link>
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="font-medium text-slate-600 hover:text-[var(--accent)] hover:underline"
            >
              {SITE_CONFIG.phoneDisplay}
            </a>
          </>
        }
      >
        <p>
          DPGF, métrés, planning GANTT, comptes rendus de chantier, situations de travaux, PV de réception,
          courriers : une demi-journée pour mettre en place Claude AI avec Google Drive, Sheets et Docs sur
          vos flux de travail réels.
        </p>
      </FormationCourseHero>

      <div className="mx-auto max-w-4xl px-4 py-16">
      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
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
              <strong>Horaires :</strong> 9h00 – 13h00 · <strong>Modalité :</strong> présentiel — 30 % apports,
              70 % ateliers sur vos fichiers réels. {MODALITE_FORMATIONS_PRESENTIEL}
            </span>
          </li>
          <li className="flex gap-2">
            <FileText className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
            <span>
              <strong>Prérequis :</strong> {EXIGENCE_CLAUDE_PRO_NIVEAU_AVANCE} À souscrire sur claude.ai avant la
              session. Support pédagogique numérique et bibliothèque de prompts remis en fin de session.
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

      <section id="programme" className="mt-12 scroll-mt-24">
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
            <strong>Durée :</strong> {SESSION_DUREE_LIBELLE} ·{' '}
            <strong>Forfait :</strong> {TARIF_FORFAIT_AVANCE_HT} € HT / participant (niveau avancé) ·{' '}
            <strong>Effectif :</strong> selon convention (intra-entreprise)
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
    </div>
  );
}
