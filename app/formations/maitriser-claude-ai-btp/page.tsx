import Link from 'next/link';
import { LINKS } from '@/lib/internal-links';
import { FooterTelOrMailLink } from '@/components/PublicPhoneCta';
import { FileText, Calendar, Users, Check, Download } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { ContextualLinksSection } from '@/components/layout/ContextualLinksSection';
import { FORMATION_NIV04_RELATED } from '@/lib/contextual-internal-links';
import { LaunchPriceBadge } from '@/components/formations/LaunchPriceBadge';
import { RdvLink } from '@/components/RdvLink';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { FAQSection } from '@/components/landing/FAQSection';
import { JsonLd } from '@/components/JsonLd';
import {
  createPageMetadata,
  getFAQSchema,
  SITE_CONFIG,
} from '@/lib/seo';
import { FAQ_MAITRISER_CLAUDE_NIV04 } from '@/lib/faq';
import { GAINS_TEMPS_MENTION_PRUDENCE } from '@/lib/gains-temps-copy';
import {
  SESSION_DUREE_MATIN_NIV04,
  TARIF_FORFAIT_AVANCE_HT,
  LIBELLE_EFFECTIF_GROUPE_NIV03,
  MODALITE_FORMATIONS_PRESENTIEL,

  formatTarifHt,
} from '@/lib/tarifs-sessions';
import { PHOTOS } from '@/lib/photos';
import {
  FormationCourseHero,
  FormationHeroPhoto,
} from '@/components/formations/FormationCourseHero';
import { buildCatalogueCourseMaitriserClaudeNiv04JsonLd } from '@/lib/schema-catalogue-course-jsonld';

const PATH = LINKS.formationMaitriserClaudeAiBtp;
const PDF_HREF = LINKS.pdfProgrammeMaitriserClaudeBtpNiv04;

const PAGE_META_DESCRIPTION =
  'Formation avancée Claude pour le BTP (4 h, matin). Projets, Skills, Cowork, connecteurs, Claude Code. 1 200 € HT, prix de lancement. Qualiopi.';

export const metadata = createPageMetadata({
  title: 'Maîtriser Claude AI pour le BTP (NIV-04) — Formation avancée 4 h Qualiopi',
  titleAbsolute:
    'Maîtriser Claude AI pour le BTP (NIV-04) — Formation avancée 4 h Qualiopi | Laure Olivié',
  description: PAGE_META_DESCRIPTION,
  path: PATH,
  keywords: [
    'formation Claude AI BTP',
    'Maîtriser Claude entreprise BTP',
    'Claude Code BTP',
    'Cowork Skills Claude',
    'connecteurs Claude Gmail Drive',
    'Projets Claude BTP',
    'industrialiser IA BTP',
    'formation IA avancée Qualiopi',
  ],
  image: {
    url: PHOTOS.formationIABtpVisioBureau2026.src,
    width: PHOTOS.formationIABtpVisioBureau2026.width,
    height: PHOTOS.formationIABtpVisioBureau2026.height,
    alt: 'Formation Maîtriser Claude AI pour le BTP — poste de travail, session Qualiopi Laure Olivié',
  },
});

type ProgrammeBloc = {
  heading: string;
  meta: string;
  objectifs: string[];
  livrable: string;
};

const PROGRAMME_BLOCS: ProgrammeBloc[] = [
  {
    heading: 'Module 1 — Projets & Skills : structurer Claude pour l\'entreprise',
    meta: '60 min · Projects · Skills · exécution de code',
    objectifs: [
      'Projets Claude : instructions permanentes + base de connaissances (CCTP, CCAP, chartes, modèles)',
      'Skills / Compétences : créer, téléverser, organiser une bibliothèque métier',
      'Activer et tester l\'option « Exécution de code » pour les skills avancés',
    ],
    livrable: 'Project entreprise configuré + 2 skills métier prêts à l\'emploi',
  },
  {
    heading: 'Module 2 — Cowork : déléguer la production documentaire',
    meta: '55 min · tâches agentiques supervisées',
    objectifs: [
      'Comprendre les tâches agentiques supervisées (Cowork)',
      'Produire un livrable complet : CR, mémoire ou dossier à partir de vos fichiers',
      'Enchaîner Cowork + Skills + exports Excel / PowerPoint — relecture et validation humaine',
    ],
    livrable: 'Livrable documentaire complet validé + workflow Cowork réutilisable',
  },
  {
    heading: 'Module 3 — Connecteurs : relier Claude à ses outils',
    meta: '55 min · Gmail · Drive · agenda',
    objectifs: [
      'Connecter Gmail, Drive et agenda à Claude',
      'Cas d\'usage BTP : récupérer un DCE, classer des mails, alimenter un suivi chantier',
      'Sécurité & confidentialité : RGPD, marchés publics, données clients — règles de validation',
    ],
    livrable: 'Connecteurs paramétrés + checklist sécurité entreprise',
  },
  {
    heading: 'Module 4 — Claude Code : automatiser ses tâches',
    meta: '50 min · scripts · lots documentaires',
    objectifs: [
      'Automatiser des tâches répétitives (renommage, classement, extraction)',
      'Générer des documents en lot à partir de modèles',
      'Créer un petit outil métier et capitaliser scripts / prompts',
    ],
    livrable: 'Script ou automatisation testée + guide de reprise en interne',
  },
];

const HERO_RESUME = [
  `Parcours catalogue NIV-04 : industrialiser Claude en entreprise BTP — Projets, Skills, Cowork, connecteurs, Claude Code.`,
  `Session ${SESSION_DUREE_MATIN_NIV04} — forfait ${formatTarifHt(TARIF_FORFAIT_AVANCE_HT)} € net de TVA / session — prix de lancement.`,
  `${LIBELLE_EFFECTIF_GROUPE_NIV03}.`,
  'Qualiopi — financement possible selon éligibilité (Constructys / OPCO).',
];

const OBJECTIFS_PEDAGOGIQUES = [
  'Structurer l\'usage de Claude dans l\'entreprise avec les Projets et une bibliothèque de Skills',
  'Déléguer la production documentaire à Cowork (CR, mémoires, dossiers) en autonomie supervisée',
  'Connecter Claude à ses outils (Gmail, Drive, agenda) via les connecteurs, en sécurisant les données',
  'Automatiser des tâches répétitives et générer des documents en lot avec Claude Code',
  'Fiabiliser, sécuriser et réutiliser ses skills, connecteurs et automatisations Claude',
];

const courseSchema = buildCatalogueCourseMaitriserClaudeNiv04JsonLd();

export default function FormationMaitriserClaudeAiBtpPage() {
  const faqSchema = getFAQSchema(FAQ_MAITRISER_CLAUDE_NIV04);

  return (
    <div>
      <JsonLd id="schema-course-niv-04" schema={courseSchema} />
      <JsonLd id="schema-faq-niv-04" schema={faqSchema} />

      <FormationCourseHero
        refLine={`Intra · inter · présentiel en Île-de-France · ${SESSION_DUREE_MATIN_NIV04} · Niveau avancé · NIV-04`}
        title="Maîtriser Claude AI pour le BTP"
        subtitle="Industrialisez Claude dans votre entreprise — Projets, Skills, Cowork, connecteurs et Claude Code"
        badges={['Projets & Skills', 'Cowork · Connecteurs', 'Qualiopi']}
        summaryItems={HERO_RESUME}
        image={
          <FormationHeroPhoto
            src={PHOTOS.formationIABtpVisioBureau2026.src}
            alt="Formation Maîtriser Claude AI pour le BTP — session présentiel Qualiopi, poste de travail entreprise bâtiment"
            width={PHOTOS.formationIABtpVisioBureau2026.width}
            height={PHOTOS.formationIABtpVisioBureau2026.height}
            priority
          />
        }
        ctas={
          <>
            <RdvLink
              campaign="formations-maitriser-claude-ai-btp-hero"
              className="rounded-xl bg-[var(--accent)] px-6 py-3.5 text-center font-semibold text-white hover:bg-blue-600"
            >
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
          </>
        }
        footerLinks={
          <>
            <a href="#programme" className="font-medium text-[var(--accent)] hover:underline">
              Voir le programme détaillé
            </a>
            <Link
              href={LINKS.formations}
              className="font-medium text-slate-600 hover:text-[var(--accent)] hover:underline"
            >
              Retour au catalogue
            </Link>
            <FooterTelOrMailLink className="font-medium text-slate-600 hover:text-[var(--accent)] hover:underline" />
          </>
        }
      >
        <p>
          <strong>Formation avancée Claude AI pour le BTP</strong> : structurer l&apos;usage de{' '}
          <strong>Claude Pro</strong> en entreprise (<strong>Projets</strong>, bibliothèque de{' '}
          <strong>Skills</strong>), déléguer la production documentaire via <strong>Cowork</strong>, relier{' '}
          <strong>Gmail</strong>, <strong>Drive</strong> et l&apos;agenda, et automatiser avec{' '}
          <strong>Claude Code</strong> — sur vos cas réels, avec validation humaine systématique. Public : référents
          IA, dirigeants, responsables digitaux, chargés d&apos;affaires et conducteurs de travaux. Complément des
          parcours{' '}
          <Link href={LINKS.formationAO} className="font-medium text-[var(--accent)] hover:underline">
            NIV-02 appels d&apos;offres
          </Link>{' '}
          et{' '}
          <Link
            href={LINKS.formationConduiteTravauxSuiviChantier}
            className="font-medium text-[var(--accent)] hover:underline"
          >
            NIV-03 conduite de travaux
          </Link>
          . {MODALITE_FORMATIONS_PRESENTIEL}
        </p>
      </FormationCourseHero>

      <div className="mx-auto max-w-4xl px-4 py-16">
        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
          <h2 className="font-display text-xl font-bold text-slate-900">Public &amp; modalités</h2>
          <ul className="mt-4 space-y-2 text-slate-700">
            <li className="flex gap-2">
              <Users className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>Public :</strong> référents IA, dirigeants, responsables digitaux, chargés d&apos;affaires et
                conducteurs de travaux souhaitant industrialiser l&apos;usage de Claude dans l&apos;entreprise BTP.
              </span>
            </li>
            <li className="flex gap-2">
              <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>Format :</strong> session unique <strong>{SESSION_DUREE_MATIN_NIV04}</strong> — matin
                uniquement. Intra ou inter, exclusivement en présentiel en Île-de-France. Forfait{' '}
                <strong>{formatTarifHt(TARIF_FORFAIT_AVANCE_HT)} € net de TVA par session</strong>{' '}
                <LaunchPriceBadge className="ml-1 align-middle" /> — {LIBELLE_EFFECTIF_GROUPE_NIV03}. Réf.{' '}
                <strong>NIV-04</strong>.
              </span>
            </li>
            <li className="flex gap-2">
              <FileText className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>Prérequis :</strong> abonnement Claude Pro et utilisation régulière de Claude. Option «
                Exécution de code » activée. Documents utiles : chartes internes, modèles CR/mémoires, exemples de
                dossiers anonymisés.
              </span>
            </li>
          </ul>
          <p className="mt-4 text-sm text-slate-600">
            Devis et convention :{' '}
            <a href={`mailto:${SITE_CONFIG.email}`} className="font-medium text-[var(--accent)] hover:underline">
              {SITE_CONFIG.email}
            </a>
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold text-slate-900">Objectifs pédagogiques</h2>
          <ul className="mt-4 space-y-2 text-slate-700">
            {OBJECTIFS_PEDAGOGIQUES.map((o) => (
              <li key={o} className="flex gap-2">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
                {o}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-slate-500">{GAINS_TEMPS_MENTION_PRUDENCE}</p>
        </section>

        <section id="programme" className="mt-12 scroll-mt-24">
          <h2 className="font-display text-2xl font-bold text-slate-900">Programme détaillé</h2>
          <p className="mt-2 text-sm text-slate-600">
            4 modules — total 4 h le matin — travail sur vos cas réels (documents anonymisés si besoin). Relecture
            humaine obligatoire avant tout envoi client ou marché.
          </p>
          <div className="mt-8 space-y-8">
            {PROGRAMME_BLOCS.map((bloc) => (
              <div
                key={bloc.heading}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold text-slate-900">{bloc.heading}</h3>
                  <span className="text-sm font-medium text-[var(--accent)]">{bloc.meta}</span>
                </div>
                <p className="mt-3 text-xs font-semibold uppercase text-slate-500">Contenu</p>
                <ul className="mt-2 space-y-1 text-sm text-slate-600">
                  {bloc.objectifs.map((o) => (
                    <li key={o}>▸ {o}</li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">Livrable :</span> {bloc.livrable}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-2xl border border-[var(--accent)] bg-[var(--accent-soft)] p-6">
          <h2 className="font-display text-xl font-bold text-slate-900">Livrables &amp; tarification</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            <li>
              <strong>Durée :</strong> {SESSION_DUREE_MATIN_NIV04} · <strong>Forfait :</strong>{' '}
              {formatTarifHt(TARIF_FORFAIT_AVANCE_HT)} € net de TVA / session{' '}
              <LaunchPriceBadge className="ml-1 align-middle" /> · <strong>Effectif :</strong>{' '}
              {LIBELLE_EFFECTIF_GROUPE_NIV03} · <strong>Financement :</strong> possible selon éligibilité
              (Constructys / OPCO).
            </li>
            <li>
              <strong>Supports remis :</strong> trames Projets/Skills, workflows Cowork, checklist connecteurs &
              sécurité, exemples Claude Code, attestation Qualiopi en fin de session.
            </li>
            <li>
              <strong>Évaluation :</strong> exercices sur vos cas réels, validation formateur en continu,
              questionnaire de satisfaction à chaud.
            </li>
          </ul>
        </section>

        <FAQSection
          items={FAQ_MAITRISER_CLAUDE_NIV04}
          title="Questions fréquentes — Maîtriser Claude AI"
          subtitle="Public, prérequis, matinée 4 h et financement."
        />

        <ContextualLinksSection
          title="Pages associées"
          subtitle="NIV-02, NIV-03, guide Claude AI BTP, financement OPCO."
          links={FORMATION_NIV04_RELATED}
          tone="muted"
        />

        <div className="mt-10">
          <AllerPlusLoin
            links={[
              { href: LINKS.formations, label: 'Catalogue formations' },
              {
                href: buildSiteCalendlyCtaUrl('formations-maitriser-claude-footer-rdv'),
                label: 'Prendre rendez-vous',
              },
              { href: LINKS.financement, label: 'Financement Constructys' },
              { href: LINKS.claudeAiBtp, label: 'Guide Claude AI BTP' },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
