import Link from 'next/link';
import { LINKS } from '@/lib/internal-links';
import { FooterTelOrMailLink } from '@/components/PublicPhoneCta';
import { Calendar, Users, Check, Download } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { ContextualLinksSection } from '@/components/layout/ContextualLinksSection';
import { CatalogueInfosPratiques } from '@/components/InfosPratiques';
import { FORMATION_NIV04_RELATED } from '@/lib/contextual-internal-links';
import { RdvLink } from '@/components/RdvLink';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { FAQSection } from '@/components/landing/FAQSection';
import { JsonLd } from '@/components/JsonLd';
import { RelatedLinks } from '@/components/RelatedLinks';
import { getClusterRelatedHrefs } from '@/lib/maillage-clusters';
import {
  createPageMetadata,
  getFAQSchema,
  SITE_CONFIG,
} from '@/lib/seo';
import { FAQ_MAITRISER_CLAUDE_NIV04 } from '@/lib/faq';
import { GAINS_TEMPS_MENTION_PRUDENCE } from '@/lib/gains-temps-copy';
import {
  MODALITE_FORMATIONS_PRESENTIEL,
  formatTarifHt,
} from '@/lib/tarifs-sessions';
import {
  getFormationByCode,
  libelleDureeFormation,
  libelleEffectifFormation,
  libellePrixSessionHt,
} from '@/data/formations';
import { PrerequisNiveau2 } from '@/components/formation/PrerequisNiveau2';
import { getFormationCatalogueVisuel } from '@/lib/formations-catalogue-display';
import {
  FormationCourseHero,
} from '@/components/formations/FormationCourseHero';
import { buildCatalogueCourseMaitriserClaudeNiv04JsonLd } from '@/lib/schema-catalogue-course-jsonld';
import { formatPersonnesFormeesCount, getStatsFreshnessLabel, siteStats } from '@/lib/constants';

const FORMATION = getFormationByCode('NIV-04')!;
const PATH = LINKS.formationMaitriserClaudeAiBtp;
const PDF_HREF = FORMATION.pdfProgramme;
const DUREE_LIBELLE = libelleDureeFormation(FORMATION);
const EFFECTIF_LIBELLE = libelleEffectifFormation(FORMATION);
const PRIX_LIBELLE = libellePrixSessionHt(FORMATION);

const PAGE_META_DESCRIPTION =
  `Formation avancée Claude pour le BTP (${DUREE_LIBELLE}). Projets, Skills, Cowork, connecteurs, Claude Code. ${PRIX_LIBELLE}. Qualiopi.`;

const CATALOGUE_VISUEL = getFormationCatalogueVisuel('NIV-04');

export const metadata = createPageMetadata({
  title: 'Maîtriser Claude AI BTP — 4 h · organisme certifié Qualiopi',
  titleAbsolute: 'Maîtriser Claude AI BTP — 4 h · organisme certifié Qualiopi',
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
    'formation IA avancée — organisme certifié Qualiopi',
  ],
  image: {
    url: CATALOGUE_VISUEL.src,
    width: CATALOGUE_VISUEL.width,
    height: CATALOGUE_VISUEL.height,
    alt: CATALOGUE_VISUEL.alt,
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

/** Cas d'usage session — skills métier AO / chantier / juridique. */
const CAS_USAGE_SESSION = [
  {
    titre: "Skills appels d'offres",
    items: [
      'Analyse RC : extraire MO/MOE, type de marché, dates, visite, critères, pièces — décider GO / NO GO',
      'Analyse DCE/DQE : exigences par famille, postes oubliés, clauses à risque (CCAP)',
      'Sécurisation du chiffrage — validation humaine avant réponse marché',
    ],
  },
  {
    titre: 'Skills chantier',
    items: [
      'CCTP organisation : phasage, contraintes, points d\'arrêt',
      'CR de chantier : synthèse des actions, délais et photos à prendre (y compris à partir d\'une photo de CR MOE)',
      'Levée des réserves : tableau de suivi, preuves, retenue de garantie',
      'Normes / hors-gel : DTU, hors-gel IDF, classes de gel béton (XF)',
    ],
  },
  {
    titre: 'Skills juridiques — marché de travaux',
    items: [
      'Qualifier un litige (marché privé / public) et retrouver les références utiles',
      'Produire des brouillons d\'écrits (mise en demeure, mémoire en réclamation)',
      'L\'IA n\'est pas un avocat — validation par un professionnel du droit obligatoire avant envoi',
    ],
  },
] as const;

const HERO_RESUME = [
  FORMATION.accroche,
  `Session ${DUREE_LIBELLE} — forfait ${PRIX_LIBELLE} / session.`,
  EFFECTIF_LIBELLE.charAt(0).toUpperCase() + EFFECTIF_LIBELLE.slice(1) + '.',
  'Qualiopi — financement possible selon éligibilité (Constructys / OPCO).',
];

const courseSchema = buildCatalogueCourseMaitriserClaudeNiv04JsonLd();

export default function FormationMaitriserClaudeAiBtpPage() {
  const faqSchema = getFAQSchema(FAQ_MAITRISER_CLAUDE_NIV04);

  return (
    <div>
      <JsonLd id="schema-course-niv-04" schema={courseSchema} />
      <JsonLd id="schema-faq-niv-04" schema={faqSchema} />

      <FormationCourseHero
        catalogueRef="NIV-04"
        refLine={`Intra · inter · présentiel en Île-de-France · ${DUREE_LIBELLE} · ${FORMATION.niveauLabel}`}
        title={FORMATION.titre}
        subtitle={FORMATION.accroche}
        badges={['Projets & Skills', 'Cowork · Connecteurs', 'Organisme Qualiopi']}
        summaryItems={HERO_RESUME}
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
          <strong>Claude Code</strong> — sur vos cas réels, avec validation humaine systématique. Public :{' '}
          {FORMATION.public.toLowerCase()}. Complément des parcours{' '}
          <Link href={LINKS.formationAO} className="font-medium text-[var(--accent)] hover:underline">
            formation appels d&apos;offres
          </Link>{' '}
          et{' '}
          <Link
            href={LINKS.formationConduiteTravauxSuiviChantier}
            className="font-medium text-[var(--accent)] hover:underline"
          >
            formation conduite de travaux
          </Link>
          . {MODALITE_FORMATIONS_PRESENTIEL}
        </p>
      </FormationCourseHero>

      <div className="mx-auto max-w-4xl px-4 py-16">
        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
          <h2 className="font-display text-xl font-bold text-slate-900">Public &amp; modalités</h2>
          <p className="mt-4 text-slate-700 leading-relaxed">
            Cette formation s&apos;adresse aux référents IA, dirigeants et conducteurs de travaux qui utilisent déjà
            Claude Pro et veulent industrialiser l&apos;outil en entreprise BTP.
          </p>
          <p className="mt-4 text-slate-700 leading-relaxed">
            En 2026, la session se tient uniquement le matin ({DUREE_LIBELLE}) pour
            enchaîner Projets, Cowork, connecteurs et Claude Code sans coupure.
          </p>
          <ul className="mt-4 space-y-2 text-slate-700">
            <li className="flex gap-2">
              <Users className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>Public :</strong> {FORMATION.public}.
              </span>
            </li>
            <li className="flex gap-2">
              <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>Format :</strong> session unique <strong>{DUREE_LIBELLE}</strong> — matin
                uniquement. Intra ou inter, exclusivement en présentiel en Île-de-France. Forfait{' '}
                <strong>{PRIX_LIBELLE} par session</strong> — {EFFECTIF_LIBELLE}.
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

        <PrerequisNiveau2
          asSection
          extras={[
            'Option « Exécution de code » activée.',
            'Documents utiles : chartes internes, modèles CR/mémoires, exemples de dossiers anonymisés (AO, CCTP, CR, PV).',
          ]}
        />

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold text-slate-900">Objectifs pédagogiques</h2>
          <p className="mt-4 text-slate-700 leading-relaxed">
            À l&apos;issue de cette formation, l&apos;entreprise dispose de Projets structurés, de Skills réutilisables
            (AO, chantier, administratif), de connecteurs outils et d&apos;une première automatisation Claude Code
            validée en interne.
          </p>
          <p className="mt-4 text-slate-700 leading-relaxed">
            En 2026, le forfait catalogue est de {PRIX_LIBELLE} par session
            ({FORMATION.effectifMax} participants max).
          </p>
          <ul className="mt-4 space-y-2 text-slate-700">
            {FORMATION.objectifs.map((o) => (
              <li key={o} className="flex gap-2">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
                {o}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-slate-500">{GAINS_TEMPS_MENTION_PRUDENCE}</p>
        </section>

        <section className="mt-12" aria-labelledby="cas-usage-session-heading">
          <h2 id="cas-usage-session-heading" className="font-display text-2xl font-bold text-slate-900">
            Cas d&apos;usage travaillés en session
          </h2>
          <p className="mt-4 text-slate-700 leading-relaxed">
            Au-delà de l&apos;industrialisation (Projets, Cowork, connecteurs, Claude Code), la session installe et
            pratique des <strong>skills métier</strong> adaptés à vos dossiers réels — appels d&apos;offres, chantier
            et juridique marché de travaux.
          </p>
          <div className="mt-8 space-y-6">
            {CAS_USAGE_SESSION.map((bloc) => (
              <div
                key={bloc.titre}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="font-display text-lg font-semibold text-slate-900">{bloc.titre}</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {bloc.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="programme" className="mt-12 scroll-mt-24">
          <h2 className="font-display text-2xl font-bold text-slate-900">Programme détaillé</h2>
          <p className="mt-2 text-sm text-slate-600">
            Le programme enchaîne 4 modules techniques sur {FORMATION.duree} le matin : Projets &amp; Skills, Cowork,
            connecteurs Gmail/Drive et Claude Code.
          </p>
          <p className="mt-2 text-sm text-slate-600">
            En 2026, moins de 10&nbsp;% des entreprises BTP utilisent déjà l&apos;IA en production (Observatoire
            des métiers du BTP, 621 répondants) — cette formation vise l&apos;industrialisation, pas la découverte.
          </p>
          <p className="mt-2 text-sm text-slate-600">
            4 modules — total {DUREE_LIBELLE} — travail sur vos cas réels (documents anonymisés si besoin). Relecture
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
          <p className="mt-4 text-sm text-slate-700 leading-relaxed">
            Les livrables comprennent un Project entreprise configuré, des workflows Cowork, une checklist
            connecteurs/sécurité et un script ou automatisation Claude Code testé.
          </p>
          <p className="mt-4 text-sm text-slate-700 leading-relaxed">
            En {new Date().getFullYear()}, OFC affiche une indicateurs publiés sur la page dédiée sur plus de {formatPersonnesFormeesCount()} professionnels formés
            ({getStatsFreshnessLabel()}).
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            <li>
              <strong>Durée :</strong> {DUREE_LIBELLE} · <strong>Forfait :</strong>{' '}
              {PRIX_LIBELLE} / session · <strong>Effectif :</strong>{' '}
              {EFFECTIF_LIBELLE} · <strong>Financement :</strong> possible selon éligibilité
              (Constructys / OPCO).
            </li>
            <li>
              <strong>Supports remis :</strong> trames Projets/Skills, workflows Cowork, checklist connecteurs &
              sécurité, exemples Claude Code, certificat de réalisation en fin de session.
            </li>
            <li>
              <strong>Évaluation :</strong> exercices sur vos cas réels, validation formateur en continu,
              questionnaire de satisfaction à chaud.
            </li>
          </ul>
        </section>

        <CatalogueInfosPratiques programmeRef="NIV-04" />

        <FAQSection
          items={FAQ_MAITRISER_CLAUDE_NIV04}
          title="Questions fréquentes — Maîtriser Claude AI"
          subtitle="Public, prérequis, matinée 4 h et financement."
        />

        <RelatedLinks path={LINKS.formationMaitriserClaudeAiBtp} />

      <ContextualLinksSection
          title="Pages associées"
          subtitle="formations niveau 2, guide Claude AI BTP, financement OPCO."
          links={FORMATION_NIV04_RELATED.filter((l) => !getClusterRelatedHrefs(LINKS.formationMaitriserClaudeAiBtp).includes(l.href))}
          tone="muted"
        />

        <div className="mt-10 flex flex-wrap gap-4">
          <RdvLink
            campaign="formations-maitriser-claude-ai-btp-footer"
            ctaPosition="footer"
            ctaId="footer-rdv"
            variant="primary"
            className="rounded-xl px-6 py-3.5"
          >
            Prendre rendez-vous — visio gratuite 30 min
          </RdvLink>
        </div>

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
