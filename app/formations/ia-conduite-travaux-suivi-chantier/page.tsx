import Link from 'next/link';
import { LINKS } from '@/lib/internal-links';
import { FooterTelOrMailLink } from '@/components/PublicPhoneCta';
import { Calendar, Users, Check, Download } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { ContextualLinksSection } from '@/components/layout/ContextualLinksSection';
import { CatalogueInfosPratiques } from '@/components/InfosPratiques';
import { FORMATION_NIV03_RELATED } from '@/lib/contextual-internal-links';
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
import { FAQ_CONDUITE_TRAVAUX_NIV03 } from '@/lib/faq';
import { GAINS_TEMPS_MENTION_PRUDENCE } from '@/lib/gains-temps-copy';
import {
  SESSION_DUREE_LIBELLE,
  TARIF_FORFAIT_AVANCE_HT,
  LIBELLE_EFFECTIF_GROUPE_NIV03,
  EXIGENCE_CLAUDE_PRO_NIVEAU_AVANCE,

  formatTarifHt,
  libelleTarifSessionForfaitaire,
} from '@/lib/tarifs-sessions';
import { PrerequisNiveau2 } from '@/components/formation/PrerequisNiveau2';
import { getFormationCatalogueVisuel } from '@/lib/formations-catalogue-display';
import {
  FormationCourseHero,
} from '@/components/formations/FormationCourseHero';
import { buildCatalogueCourseConduiteTravauxNiv03JsonLd } from '@/lib/schema-catalogue-course-jsonld';
import { formatPersonnesFormeesCount, getStatsFreshnessLabel, siteStats } from '@/lib/constants';

const PDF_HREF = LINKS.pdfProgrammeConduiteTravauxNiv03;

const PAGE_META_DESCRIPTION =
  'IA conduite de travaux & suivi chantier : CCTP, PPSPS, CR et réception en 4 h, présentiel IDF. Qualiopi, Constructys selon éligibilité. Programme PDF et RDV.';

const CATALOGUE_VISUEL = getFormationCatalogueVisuel('NIV-03');

export const metadata = createPageMetadata({
  title: 'IA conduite travaux BTP — Claude',
  description: PAGE_META_DESCRIPTION,
  descriptionFinal: true,
  path: LINKS.formationConduiteTravauxSuiviChantier,
  keywords: [
    'formation IA conducteur de travaux',
    'IA conduite de travaux BTP',
    'skills Claude chantier',
    'analyse CCTP IA',
    'DPGF IA BTP',
    'PPSPS IA',
    'compte rendu chantier IA',
    'DOE IA BTP',
    'formation IA suivi chantier',
    'Claude AI conducteur travaux',
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
    heading: 'Module 1 — Installation & démarrage de chantier',
    meta: '60 min · Skills Analyse CCTP & DPGF',
    objectifs: [
      'Prise en main de la bibliothèque de skills Claude mise à disposition (20+ skills BTP)',
      'Skill Analyse CCTP, DPGF & conformité DTU — extraction des exigences et points de vigilance',
      'Préparation au démarrage : plan d\'installation, DICT, fiches techniques et agréments matériaux',
      'Ordre de service de démarrage, constat d\'état des lieux, planning indicatif',
    ],
    livrable: 'Fiche synthèse CCTP/DPGF + brouillon OS et planning à valider en interne',
  },
  {
    heading: 'Module 2 — Sécurité de chantier',
    meta: '35 min · PPSPS, DUERP, SOGED',
    objectifs: [
      'Structurer un PPSPS à partir de vos contraintes chantier réelles',
      'Cadrer un DUERP et un SOGED avec l\'IA — relecture QSE obligatoire',
      'Lister les interfaces et responsabilités avant diffusion',
    ],
    livrable: 'Structures PPSPS / DUERP / SOGED prêtes à compléter et signer',
  },
  {
    heading: 'Module 3 — Gestion de chantier',
    meta: '70 min · CR, approvisionnements, sous-traitants, coûts',
    objectifs: [
      'Réunions & comptes rendus — synthèses et relances',
      'Suivi, journal de chantier et approvisionnements (bons de commande, comparatif fournisseurs)',
      'Sous-traitants : DC4, agréments, courriers de coordination',
      'Quantités & coûts : métré assisté, avenants, suivi déboursé et budget',
    ],
    livrable: 'Modèles CR, courriers ST et tableaux de suivi réutilisables',
  },
  {
    heading: 'Module 4 — Administratif de suivi de chantier',
    meta: '50 min · Situations, réception, DOE, litiges',
    objectifs: [
      'Situations de travaux et pièces de facturation — structuration des écrits',
      'Réception & réserves — PV de réserves et courriers MOE/MOA',
      'DOE — plan de constitution du dossier des ouvrages exécutés',
      'Assistant juridique : mise en demeure, mémoire en réclamation (brouillons à valider)',
    ],
    livrable: 'Trames situations, PV réserves, check-list DOE et courriers types',
  },
];

const TARIF_SESSION_LIBELLE = libelleTarifSessionForfaitaire(TARIF_FORFAIT_AVANCE_HT);

const HERO_RESUME = [
  `Parcours catalogue : conduite de travaux & suivi chantier — bibliothèque de 20+ skills Claude.`,
  `Session ${SESSION_DUREE_LIBELLE} — forfait ${TARIF_SESSION_LIBELLE}.`,
  `${LIBELLE_EFFECTIF_GROUPE_NIV03}.`,
  'Qualiopi — financement possible selon éligibilité (Constructys / OPCO).',
];

const OBJECTIFS_PEDAGOGIQUES = [
  'Comprendre le fonctionnement des skills Claude et accéder à la bibliothèque de skills BTP mise à disposition',
  'Préparer et démarrer un chantier avec l\'IA : analyse du CCTP, génération de la DPGF, conformité DTU, DICT, ordre de service, planning',
  'Sécuriser le chantier (PPSPS, DUERP, SOGED) et le piloter au quotidien : CR, suivi, approvisionnements, sous-traitants, métré, avenants, budget',
  'Gérer l\'administratif de suivi jusqu\'à la réception : situations, PV de réserves, DOE, litiges',
];

const courseSchema = buildCatalogueCourseConduiteTravauxNiv03JsonLd();

export default function FormationIaConduiteTravauxSuiviChantierPage() {
  const faqSchema = getFAQSchema(FAQ_CONDUITE_TRAVAUX_NIV03);

  return (
    <div>
      <JsonLd id="schema-course-niv-03" schema={courseSchema} />
      <JsonLd id="schema-faq-niv-03" schema={faqSchema} />

      <FormationCourseHero
        catalogueRef="NIV-03"
        refLine={`Intra · inter · présentiel en Île-de-France · ${SESSION_DUREE_LIBELLE} · Niveau 2`}
        title="L'IA appliquée à la conduite de travaux"
        subtitle="Pilotez vos chantiers avec l'IA — de l'analyse du CCTP à la réception des travaux"
        badges={['Skills Claude BTP', 'Suivi chantier', 'Organisme Qualiopi']}
        summaryItems={HERO_RESUME}
        ctas={
          <>
            <RdvLink
              campaign="formations-ia-conduite-travaux-suivi-chantier-hero"
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
          <strong>Formation IA appliquée à la conduite de travaux</strong> : accéder à une{' '}
          <strong>bibliothèque de 20+ skills Claude</strong> dédiés au BTP pour structurer l&apos;analyse{' '}
          <strong>CCTP</strong> et <strong>DPGF</strong>, les documents <strong>PPSPS</strong>, les{' '}
          <strong>comptes rendus</strong>, le suivi <strong>sous-traitants</strong> (DC4), les{' '}
          <strong>PV de réserves</strong> et le <strong>DOE</strong> — avec relecture humaine avant envoi.
          Public : conducteurs de travaux, chefs de chantier, responsables travaux et assistant(e)s travaux.
          Complément naturel du{' '}
          <Link
            href={LINKS.formationIaBtpNiveau1BatimentTp}
            className="font-medium text-[var(--accent)] hover:underline"
          >
            niveau 1
          </Link>{' '}
          ou du parcours{' '}
          <Link
            href={LINKS.formationConducteurTravaux}
            className="font-medium text-[var(--accent)] hover:underline"
          >
            conducteur de travaux
          </Link>
          . {EXIGENCE_CLAUDE_PRO_NIVEAU_AVANCE}
        </p>
      </FormationCourseHero>

      <div className="mx-auto max-w-4xl px-4 py-16">
        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
          <h2 className="font-display text-xl font-bold text-slate-900">Public &amp; modalités</h2>
          <p className="mt-4 text-slate-700 leading-relaxed">
            Cette formation s&apos;adresse aux conducteurs de travaux, chefs de chantier et assistants travaux qui
            pilotent déjà plusieurs lots — session de {SESSION_DUREE_LIBELLE} en présentiel Île-de-France.
          </p>
          <p className="mt-4 text-slate-700 leading-relaxed">
            En 2026, 43,5&nbsp;% des professionnels du BTP n&apos;ont jamais essayé ChatGPT (Observatoire des
            métiers du BTP, cabinet Plein Sens) — cette formation suppose des bases IA ou le parcours niveau 1.
          </p>
          <ul className="mt-4 space-y-2 text-slate-700">
            <li className="flex gap-2">
              <Users className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>Public :</strong> conducteurs de travaux — et fonctions associées : chefs de chantier,
                responsables travaux, assistant(e)s travaux. Session calibrée pour des profils qui pilotent déjà
                plusieurs lots ou chantiers en parallèle.
              </span>
            </li>
            <li className="flex gap-2">
              <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>Format :</strong> session unique <strong>{SESSION_DUREE_LIBELLE}</strong> en demi-journée
                (9h00–13h00 ou 13h30–17h30). Intra ou inter, exclusivement en présentiel en Île-de-France. Forfait{' '}
                <strong>{TARIF_SESSION_LIBELLE}</strong> — {LIBELLE_EFFECTIF_GROUPE_NIV03}.
              </span>
            </li>
            <li className="flex gap-2">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>Suivi inclus :</strong> un rendez-vous visio J+30 pour ancrer les skills en conditions réelles.
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
            'Documents utiles : CCTP/DPGF récents, modèles de CR et courriers ST anonymisés.',
          ]}
        />

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold text-slate-900">Objectifs pédagogiques</h2>
          <p className="mt-4 text-slate-700 leading-relaxed">
            À l&apos;issue de la session, le conducteur de travaux sait exploiter des skills Claude pour le
            CCTP, la sécurité chantier, le suivi quotidien et la réception des travaux.
          </p>
          <p className="mt-4 text-slate-700 leading-relaxed">
            En 2026, la bibliothèque de skills donne accès à plus de 20 skills Claude dédiés au pilotage chantier
            (donnée interne programme OFC, avril 2026).
          </p>
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
            Le programme répartit {SESSION_DUREE_LIBELLE} sur 4 modules : installation chantier, sécurité,
            gestion quotidienne et administratif jusqu&apos;à la réception.
          </p>
          <p className="mt-2 text-sm text-slate-600">
            4 modules — phasage chantier (installation → sécurité → gestion → administratif) — total{' '}
            {SESSION_DUREE_LIBELLE}. Travail sur vos documents réels (anonymisés si besoin).
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
            Le forfait est de {TARIF_SESSION_LIBELLE}, avec
            bibliothèque de skills, trames CR/PPSPS/DOE et un rendez-vous visio J+30 inclus.
          </p>
          <p className="mt-4 text-sm text-slate-700 leading-relaxed">
            En {new Date().getFullYear()}, OFC affiche une indicateurs publiés sur la page dédiée sur plus de {formatPersonnesFormeesCount()} professionnels formés
            ({getStatsFreshnessLabel()}).
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            <li>
              <strong>Durée :</strong> {SESSION_DUREE_LIBELLE} · <strong>Forfait :</strong>{' '}
              <strong>Forfait :</strong> {TARIF_SESSION_LIBELLE} · <strong>Effectif :</strong>{' '}
              {LIBELLE_EFFECTIF_GROUPE_NIV03} · <strong>Financement :</strong> possible selon éligibilité
              (Constructys / OPCO).
            </li>
            <li>
              <strong>Supports remis :</strong> accès à la bibliothèque de 20+ skills Claude BTP, trames CR / PPSPS /
              courriers ST / PV réserves / DOE, fiches méthode par module, certificat de réalisation en fin de session.
            </li>
            <li>
              <strong>Évaluation :</strong> exercices pratiques sur documents participants, validation formateur en
              continu, questionnaire de satisfaction à chaud et à froid (J+30).
            </li>
          </ul>
        </section>

        <CatalogueInfosPratiques programmeRef="NIV-03" />

        <FAQSection
          items={FAQ_CONDUITE_TRAVAUX_NIV03}
          title="Questions fréquentes — conduite de travaux"
          subtitle="Public, prérequis, skills Claude et financement."
        />

        <RelatedLinks path={LINKS.formationConduiteTravauxSuiviChantier} />

      <ContextualLinksSection
          title="Pages associées"
          subtitle="niveau 1 — productivité, fiche conducteur de travaux, financement OPCO."
          links={FORMATION_NIV03_RELATED.filter((l) => !getClusterRelatedHrefs(LINKS.formationConduiteTravauxSuiviChantier).includes(l.href))}
          tone="muted"
        />

        <div className="mt-10 flex flex-wrap gap-4">
          <RdvLink
            campaign="formations-ia-conduite-travaux-footer"
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
              { href: buildSiteCalendlyCtaUrl('formations-ia-conduite-travaux-footer-rdv'), label: 'Prendre rendez-vous' },
              { href: LINKS.financement, label: 'Financement Constructys' },
              { href: LINKS.formationConducteurTravaux, label: 'Formation IA conducteur de travaux' },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
