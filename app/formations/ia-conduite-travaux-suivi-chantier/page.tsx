import { notFound } from 'next/navigation';
import Link from 'next/link';
import { LINKS } from '@/lib/internal-links';
import { isFormationCataloguePublished } from '@/lib/formation-catalogue-visibility';
import { FooterTelOrMailLink } from '@/components/PublicPhoneCta';
import { Calendar, Users, Check, Download } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { ContextualLinksSection } from '@/components/layout/ContextualLinksSection';
import { FormationCatalogueIndicateur1Suite } from '@/components/formations/FormationCatalogueIndicateur1Suite';
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

  formatTarifHt,
  libelleTarifSessionForfaitaire,
} from '@/lib/tarifs-sessions';
import { PREREQUIS_NIV03 } from '@/lib/infos-pratiques-catalogue';
import { getFormationCatalogueVisuel } from '@/lib/formations-catalogue-display';
import {
  FormationCourseHero,
} from '@/components/formations/FormationCourseHero';
import { buildCatalogueCourseConduiteTravauxNiv03JsonLd } from '@/lib/schema-catalogue-course-jsonld';
import { formatNoteSatisfactionSur5 , formatNoteSatisfactionAffichageComplet } from '@/lib/data/indicateurs-resultats'
import { getStatsFreshnessLabel, siteStats } from '@/lib/constants';

const PDF_HREF = LINKS.pdfProgrammeConduiteTravauxNiv03;
const PDF_DOWNLOAD_NAME = 'Programme_IA_Conduite_Travaux_OFC.pdf';

const CLAUDE_PRO_RECOMMANDE_NIV03 =
  'Un compte Claude Pro est recommandé par participant (environ 18 € HT/mois, à souscrire par l\'entreprise si besoin) — non inclus dans le forfait.';

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
    meta: '60 min · Bibliothèque & skills CCTP, DPGF, DTU',
    objectifs: [
      'Prise en main de la bibliothèque de skills — activer l\'option « Exécution de code » et accéder à la bibliothèque BTP mise à disposition',
      'Le principe : utiliser un skill, l\'adapter à votre charte, en créer un nouveau (un skill = une « Compétence » dans Claude)',
      'Skill « Analyse CCTP, DPGF & conformité DTU » — extraire ouvrages, contraintes, points d\'arrêt et exigences techniques ; générer une trame de DPGF ; identifier les DTU applicables',
      'Préparer et lancer le chantier : plan d\'installation, DICT, fiches techniques et agréments matériaux (MOE / BET)',
      'Ordre de service de démarrage, constat d\'état des lieux et trame de planning prévisionnel',
    ],
    livrable:
      'Bibliothèque activée + skills « Analyse CCTP, DPGF & DTU », « DICT », « Fiches techniques », « OS de démarrage » et « Planning »',
  },
  {
    heading: 'Module 2 — Sécurité de chantier',
    meta: '35 min · Skills PPSPS, DUERP, SOGED',
    objectifs: [
      'Skill « PPSPS » — générer un PPSPS à structure réglementaire complète, adapté au corps d\'état et au chantier',
      'Skill « Évaluation des risques » — DUERP de chantier, analyse de risques poste par poste, fiches de prévention et consignes de sécurité',
      'Skill « Gestion des déchets (SOGED) » — schéma d\'organisation, tri et traçabilité des déchets de chantier',
    ],
    livrable: 'Skills « PPSPS », « DUERP » et « SOGED » prêts à l\'emploi',
  },
  {
    heading: 'Module 3 — Gestion de chantier',
    meta: '70 min · CR, suivi, approvisionnements, sous-traitants, coûts',
    objectifs: [
      'Réunions & comptes rendus — CR par corps d\'état, observations numérotées, reprise des points non soldés (Levé / En cours / En attente) ; génération à partir de notes ou d\'une dictée transcrite',
      'Suivi, relances & journal de chantier — tableau de suivi, relances entreprises, constat de retard, rapport journalier et reportage photo daté',
      'Approvisionnements & sous-traitants — bons de commande, comparatif fournisseurs ; DC4 (déclaration) et dossier d\'agrément',
      'Quantités & coûts — métré et devis de travaux supplémentaires ou modificatifs ; suivi du déboursé et du budget de chantier',
    ],
    livrable:
      'Skills « CR de chantier », « Suivi & journal », « Approvisionnements », « Sous-traitants (DC4) », « Métré », « Avenants » et « Budget chantier »',
  },
  {
    heading: 'Module 4 — Administratif de suivi de chantier',
    meta: '50 min · Situations, réception, DOE, litiges',
    objectifs: [
      'Skill « Situations de travaux » — situations d\'avancement mensuelles et états d\'acompte',
      'Skill « Réception & réserves » — PV de réception, liste de réserves par lot, suivi et constats de levée',
      'Skills « DOE » & « Assistant juridique » — dossier des ouvrages exécutés, relances et courriers de clôture ; mise en demeure ou mémoire en réclamation (brouillons à valider)',
    ],
    livrable:
      'Skills « Situations », « PV de réserves », « DOE » et « Assistant juridique » — et accès complet à la bibliothèque OFC : 20+ skills classés par phase de chantier',
  },
];

const METHODES_PEDAGOGIQUES = [
  '70 % de pratique : chaque participant utilise, adapte et teste les skills sur son ordinateur, à partir de ses vrais documents de chantier.',
  'Bibliothèque incluse : chaque participant repart avec l\'accès à plus de 20 skills BTP prêts à l\'emploi, classés par phase de chantier.',
  'Fil rouge chronologique : un même chantier de bâtiment sert de support, de l\'analyse du CCTP jusqu\'à la réception des travaux.',
  'Moyens : un ordinateur portable par participant, un accès internet haut débit et un compte Claude (Pro recommandé). Supports de prompts et fiches méthodes remis à chaque participant.',
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
  'Préparer et démarrer un chantier avec l\'IA : analyse du CCTP, génération de la DPGF, DICT, ordre de service, planning',
  'Sécuriser le chantier (PPSPS, DUERP, SOGED) et le piloter au quotidien : CR, suivi, approvisionnements, sous-traitants, métré, avenants, budget',
  'Gérer l\'administratif de suivi jusqu\'à la réception : situations, PV de réserves, DOE, litiges',
];

const courseSchema = buildCatalogueCourseConduiteTravauxNiv03JsonLd();

export const dynamic = 'force-dynamic';

export default function FormationIaConduiteTravauxSuiviChantierPage() {
  if (!isFormationCataloguePublished('NIV-03')) notFound();

  const faqSchema = getFAQSchema(FAQ_CONDUITE_TRAVAUX_NIV03);

  return (
    <div>
      <JsonLd id="schema-course-niv-03" schema={courseSchema} />
      <JsonLd id="schema-faq-niv-03" schema={faqSchema} />

      <FormationCourseHero
        catalogueRef="NIV-03"
        programmePdfAfterHero={false}
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
              download={PDF_DOWNLOAD_NAME}
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
          . {CLAUDE_PRO_RECOMMANDE_NIV03}
        </p>
      </FormationCourseHero>

      <section id="programme" className="scroll-mt-24 border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900">Programme détaillé</h2>
          <p className="mt-2 text-sm text-slate-600">
            Le programme répartit {SESSION_DUREE_LIBELLE} sur 4 modules : installation chantier, sécurité,
            gestion quotidienne et administratif jusqu&apos;à la réception.
          </p>
          <p className="mt-2 text-sm text-slate-600">
            4 modules — phasage chantier (installation → sécurité → gestion → administratif) — total{' '}
            {SESSION_DUREE_LIBELLE}. Travail sur vos documents réels (anonymisés si besoin). Pédagogie{' '}
            <strong>70&nbsp;% pratique / 30&nbsp;% théorie</strong>.
          </p>
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="font-display text-lg font-semibold text-slate-900">Méthodes &amp; moyens pédagogiques</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {METHODES_PEDAGOGIQUES.map((line) => (
                <li key={line} className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
                  {line}
                </li>
              ))}
            </ul>
          </div>
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
        </div>
      </section>

      <FormationCatalogueIndicateur1Suite programmeRef="NIV-03" />

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
                (9h00–13h00 ou 13h30–17h30). intra-entreprise, dans vos locaux, exclusivement en présentiel en Île-de-France. Forfait{' '}
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

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold text-slate-900">Prérequis</h2>
          <p className="mt-4 text-slate-700 leading-relaxed">{PREREQUIS_NIV03}</p>
          <p className="mt-4 text-slate-700 leading-relaxed">
            Documents utiles : CCTP/DPGF récents, modèles de CR et courriers ST anonymisés.
          </p>
        </section>

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

        <section className="mt-12 rounded-2xl border border-[var(--accent)] bg-[var(--accent-soft)] p-6">
          <h2 className="font-display text-xl font-bold text-slate-900">Livrables &amp; tarification</h2>
          <p className="mt-4 text-sm text-slate-700 leading-relaxed">
            Le forfait est de {TARIF_SESSION_LIBELLE}, avec bibliothèque de 20+ skills Claude BTP,
            fiches méthode par module et un rendez-vous visio J+30 inclus.
          </p>
          <p className="mt-4 text-sm text-slate-700 leading-relaxed">
            Satisfaction publiée : {formatNoteSatisfactionAffichageComplet()} — OFC
            ({getStatsFreshnessLabel()}).
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            <li>
              <strong>Durée :</strong> {SESSION_DUREE_LIBELLE} · <strong>Forfait :</strong>{' '}
              {TARIF_SESSION_LIBELLE} · <strong>Effectif :</strong>{' '}
              {LIBELLE_EFFECTIF_GROUPE_NIV03} · <strong>Financement :</strong> possible selon éligibilité
              (Constructys / OPCO).
            </li>
            <li>
              <strong>Supports remis :</strong> accès à la bibliothèque de 20+ skills Claude BTP classés par
              phase de chantier, fiches méthode et supports de prompts par module, certificat de réalisation
              en fin de session.
            </li>
            <li>
              <strong>Évaluation :</strong> auto-positionnement en début de session, mises en situation et
              exercices pratiques sur documents participants, validation formateur en continu, questionnaire
              de satisfaction à chaud en fin de session.
            </li>
          </ul>
        </section>

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
