import Link from 'next/link';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { ContextualLinksSection } from '@/components/layout/ContextualLinksSection';
import { FormationCatalogueIndicateur1Suite } from '@/components/formations/FormationCatalogueIndicateur1Suite';
import { FormationBeworkPasserelle } from '@/components/formations/FormationBeworkPasserelle';
import { FormationCatalogueGeoSections } from '@/components/formations/FormationCatalogueGeoSections';
import {
  TrainingDeliverables,
  TrainingFAQ,
  TrainingFinalCta,
  TrainingHero,
  TrainingObjectives,
  TrainingPractice,
  TrainingProgram,
  TrainingQuickFacts,
} from '@/components/formations/training';
import { JsonLd } from '@/components/JsonLd';
import { RelatedLinks } from '@/components/RelatedLinks';
import { IndicateursResultatsLink } from '@/components/formation/IndicateursResultatsLink';
import { getFormationNiv04Related } from '@/lib/contextual-internal-links';
import { getClusterRelatedHrefs } from '@/lib/maillage-clusters';
import { createPageMetadata, getFAQSchema } from '@/lib/seo';
import { FAQ_MAITRISER_CLAUDE_NIV04 } from '@/lib/faq';
import { GAINS_TEMPS_MENTION_PRUDENCE } from '@/lib/gains-temps-copy';
import { LINKS } from '@/lib/internal-links';
import {
  getFormationByCode,
  libelleDureeFormation,
  libelleEffectifMaxFormation,
  libellePrixSessionHt,
} from '@/data/formations';
import { getFormationCatalogueVisuel } from '@/lib/formations-catalogue-display';
import { buildCatalogueCourseMaitriserClaudeNiv04JsonLd } from '@/lib/schema-catalogue-course-jsonld';
import { getFormationCatalogueSeo } from '@/lib/formation-catalogue-seo';
import { FORMATION_CLAUDE_BTP_CONFIG } from '@/lib/formation-claude-btp-landing';
import {
  trainingCategoryBadge,
  trainingDevisHref,
  trainingMetaLine,
} from '@/lib/training-page-helpers';
import { formatNoteSatisfactionAffichageComplet } from '@/lib/data/indicateurs-resultats';
import { getStatsFreshnessLabel } from '@/lib/constants';

const CATALOGUE_SEO = getFormationCatalogueSeo('NIV-04');
const CLAUDE_LANDING = FORMATION_CLAUDE_BTP_CONFIG;
const FORMATION = getFormationByCode('NIV-04')!;
const PATH = LINKS.formationMaitriserClaudeAiBtp;
const PDF_HREF = FORMATION.pdfProgramme;
const PDF_DOWNLOAD_NAME = 'programme_OFC_Maitriser_Claude_BTP.pdf';
const DUREE_LIBELLE = libelleDureeFormation(FORMATION);
const EFFECTIF_LIBELLE = libelleEffectifMaxFormation(FORMATION);
const PRIX_LIBELLE = libellePrixSessionHt(FORMATION);
const DEVIS_HREF = trainingDevisHref(FORMATION.titre);
const CATALOGUE_VISUEL = getFormationCatalogueVisuel('NIV-04');

export const metadata = createPageMetadata({
  title: CATALOGUE_SEO.metaTitle,
  titleAbsolute: `${CATALOGUE_SEO.metaTitle} | Laure Olivié`,
  description: CATALOGUE_SEO.metaDescription,
  path: PATH,
  keywords: [
    'formation Claude AI BTP',
    'formation Claude BTP',
    'Claude AI BTP',
    'Claude bâtiment',
    'Claude appels d\'offres',
    'Claude DCE',
    'Claude Projects BTP',
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
    heading: 'Accueil — cadrage et positionnement',
    meta: '10 min · émargement · attentes',
    objectifs: [
      'Accueil des participants, émargement et présentation des objectifs de la demi-journée',
      'Recueil des attentes et auto-positionnement d\'entrée sur les objectifs visés',
      'Fil rouge : une PME BTP qui structure son usage de Claude, du premier Projet « chantier » à un environnement complet et fiabilisé',
    ],
    livrable: 'Attentes recueillies et fil rouge de session posé',
  },
  {
    heading: 'Module 1 — Projets et skills : structurer Claude pour l\'entreprise',
    meta: '60 min · Projects · Skills · exécution de code',
    objectifs: [
      'Créer un Projet par affaire, chantier ou client : instructions permanentes et base de connaissances',
      'Centraliser CCTP, CCAP, chartes et modèles dans le Projet pour des réponses contextualisées',
      'Créer, téléverser et organiser une bibliothèque de skills BTP réutilisables',
      'Activer l\'option « Exécution de code », tester et partager les skills',
    ],
    livrable: 'Un Projet « chantier type » structuré + 2 skills BTP opérationnels',
  },
  {
    heading: 'Module 2 — Cowork : déléguer la production documentaire',
    meta: '55 min · tâches agentiques supervisées',
    objectifs: [
      'Lancer une tâche agentique de production documentaire en autonomie supervisée',
      'Produire un livrable complet (CR, mémoire, dossier) à partir de ses propres pièces',
      'Enchaîner skills et outils bureautiques (tableur, présentation) dans une même tâche Cowork',
      'Garder la main : relecture et validation systématiques avant diffusion',
    ],
    livrable: 'Un dossier chantier produit de bout en bout avec Cowork',
  },
  {
    heading: 'Module 3 — Connecteurs : relier Claude à ses outils',
    meta: '55 min · messagerie · drive · agenda',
    objectifs: [
      'Relier Claude à sa messagerie, son drive, son agenda ou un outil de gestion',
      'Cas d\'usage : récupérer un DCE depuis le drive, classer des mails, alimenter un suivi chantier',
      'Périmètre d\'accès, données sensibles, validation humaine et RGPD',
      'Cas des marchés publics : confidentialité des DCE, des offres et des données clients',
    ],
    livrable: 'Un connecteur configuré + un workflow type sécurisé',
  },
  {
    heading: 'Module 4 — Claude Code : automatiser ses tâches',
    meta: '50 min · scripts · lots documentaires',
    objectifs: [
      'Automatiser des tâches répétitives et générer des documents en lot',
      'Créer un petit outil métier guidé (génération de pièces de chantier)',
      'Tester, corriger et sécuriser ses automatisations',
      'Sauvegarder et réutiliser ses scripts et prompts d\'un chantier à l\'autre',
    ],
    livrable: 'Poste de travail Claude opérationnel — Projet « chantier », bibliothèque de skills, connecteur et automatisme Claude Code',
  },
  {
    heading: 'Clôture — bilan, plan d\'action',
    meta: '10 min · auto-positionnement · satisfaction',
    objectifs: [
      'Auto-positionnement de sortie et mesure de la progression sur les objectifs visés',
      'Plan d\'action individuel : 3 actions concrètes à mettre en place à 30 jours',
      'Questions / réponses, questionnaire de satisfaction et remise des attestations',
    ],
    livrable: 'Plan d\'action individuel + attestation individuelle de fin de formation',
  },
];

const PRACTICE_CASES = CLAUDE_LANDING.useCases.map((u) => `${u.title} — ${u.body}`);

const LIVRABLES = [
  'Projet « chantier type » structuré',
  'Dossier produit avec Cowork',
  'Connecteur configuré avec workflow sécurisé',
  'Automatisation Claude Code testée',
  'Plan d’action individuel à 30 jours',
  'Certificat de réalisation',
] as const;

const courseSchema = buildCatalogueCourseMaitriserClaudeNiv04JsonLd();

export default function FormationMaitriserClaudeAiBtpPage() {
  const faqSchema = getFAQSchema(FAQ_MAITRISER_CLAUDE_NIV04);

  return (
    <div>
      <JsonLd id="schema-course-niv-04" schema={courseSchema} />
      <JsonLd id="schema-faq-niv-04" schema={faqSchema} />

      <TrainingHero
        catalogueRef="NIV-04"
        title={CATALOGUE_SEO.h1}
        titleId="formation-claude-h1"
        subtitle={CATALOGUE_SEO.subtitle}
        badges={[
          { label: trainingCategoryBadge('usages-ia-btp'), variant: 'category' },
          { label: FORMATION.niveauLabel, variant: 'level' },
        ]}
        metaLine={trainingMetaLine({
          duree: DUREE_LIBELLE,
          effectif: EFFECTIF_LIBELLE,
        })}
        lead={
          <p>
            Formation avancée Claude AI pour le BTP : Projets, skills, Cowork, connecteurs et Claude
            Code — sur vos cas réels, avec validation humaine. Public : {FORMATION.public.toLowerCase()}.
          </p>
        }
        summaryItems={[
          FORMATION.accroche,
          `Session ${DUREE_LIBELLE} — forfait ${PRIX_LIBELLE} / session.`,
          `${EFFECTIF_LIBELLE.charAt(0).toUpperCase()}${EFFECTIF_LIBELLE.slice(1)}.`,
          '70 % pratique — Qualiopi, financement OPCO possible selon éligibilité.',
        ]}
        primaryCta={{ href: DEVIS_HREF, label: 'Demander un devis' }}
        secondaryCta={{
          href: PDF_HREF,
          label: 'Télécharger le programme',
          download: PDF_DOWNLOAD_NAME,
        }}
        textLink={{ href: '#programme', label: 'Voir le programme →' }}
      />

      <TrainingQuickFacts
        facts={[
          { label: 'Durée', value: DUREE_LIBELLE },
          { label: 'Format', value: 'Présentiel' },
          { label: 'Lieu', value: 'Île-de-France' },
          { label: 'Effectif', value: EFFECTIF_LIBELLE },
          { label: 'Niveau', value: FORMATION.niveauLabel },
          { label: 'Public', value: FORMATION.public },
          { label: 'Tarif', value: `${PRIX_LIBELLE} / session` },
        ]}
      />

      <TrainingObjectives objectives={FORMATION.objectifs} />

      <section className="scroll-mt-24 border-b border-slate-200 bg-white px-4 py-12 md:py-16">
        <div className="mx-auto max-w-[70rem]">
          <h2 className="font-display text-2xl font-bold text-slate-900">Pourquoi Claude AI pour le BTP</h2>
          {CLAUDE_LANDING.introParagraphs.map((p) => (
            <p key={p.slice(0, 48)} className="mt-4 max-w-3xl leading-relaxed text-slate-600">
              {p}
            </p>
          ))}
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-500">{GAINS_TEMPS_MENTION_PRUDENCE}</p>
        </div>
      </section>

      <TrainingPractice
        title={CLAUDE_LANDING.useCasesTitle}
        cases={PRACTICE_CASES}
        description="Usages métier travaillés pendant la session — validation humaine obligatoire."
      />

      <FormationCatalogueGeoSections
        catalogueRef="NIV-04"
        ressourcesGratuites={[
          { href: LINKS.formationIaAppelsOffresBtp, label: 'Formation IA appels d’offres BTP' },
          { href: LINKS.formationChatgptBtp, label: 'Formation ChatGPT pour le BTP' },
        ]}
      />

      <TrainingProgram
        pdfHref={PDF_HREF}
        pdfDownloadName={PDF_DOWNLOAD_NAME}
        description={
          <>
            <p>
              Accueil, 4 modules techniques et clôture sur {FORMATION.duree} le matin : Projets &amp;
              skills, Cowork, connecteurs et Claude Code — fil rouge PME BTP.
            </p>
            <p className="mt-2">
              70&nbsp;% pratique / 30&nbsp;% théorie — travail sur vos cas réels. Relecture humaine
              obligatoire avant tout envoi client ou marché.
            </p>
          </>
        }
      >
        <div className="space-y-5">
          {PROGRAMME_BLOCS.map((bloc, index) => (
            <div
              key={bloc.heading}
              className="rounded-xl border border-slate-200/90 bg-white p-5 md:p-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-lg font-semibold text-slate-900">
                  <span className="mr-2 text-[#377CF3]">{String(index + 1).padStart(2, '0')}</span>
                  {bloc.heading}
                </h3>
                <span className="text-sm font-medium text-[#377CF3]">{bloc.meta}</span>
              </div>
              <ul className="mt-3 space-y-1 text-sm text-slate-600">
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
      </TrainingProgram>

      <TrainingDeliverables items={LIVRABLES} />

      <FormationCatalogueIndicateur1Suite programmeRef="NIV-04" />

      <section className="border-b border-slate-200 bg-white px-4 py-10">
        <div className="mx-auto max-w-[70rem]">
          <p className="text-sm text-slate-600">
            Satisfaction publiée : {formatNoteSatisfactionAffichageComplet()} — OFC (
            {getStatsFreshnessLabel()}).
          </p>
          <IndicateursResultatsLink className="mt-2 text-left" />
        </div>
      </section>

      <TrainingFAQ
        items={FAQ_MAITRISER_CLAUDE_NIV04}
        title="Questions fréquentes — Maîtriser Claude AI"
        subtitle="Public, prérequis, matinée 4 h et financement."
      />

      <TrainingFinalCta devisHref={DEVIS_HREF} />

      <div className="mx-auto max-w-4xl px-4 py-10">
        <RelatedLinks path={LINKS.formationMaitriserClaudeAiBtp} />
        <ContextualLinksSection
          title="Pages associées"
          subtitle="formations niveau 2, guide Claude AI BTP, financement OPCO."
          links={getFormationNiv04Related().filter(
            (l) => !getClusterRelatedHrefs(LINKS.formationMaitriserClaudeAiBtp).includes(l.href),
          )}
          tone="muted"
        />
      </div>

      <FormationBeworkPasserelle />

      <div className="mx-auto max-w-4xl px-4 pb-12">
        <AllerPlusLoin
          links={[
            { href: LINKS.formations, label: 'Catalogue formations' },
            { href: LINKS.prendreRdv, label: 'Échanger sur votre projet' },
            { href: LINKS.financement, label: 'Financement Constructys' },
            { href: LINKS.claudeAiBtp, label: 'Guide Claude AI pour le BTP' },
          ]}
        />
        <p className="mt-6 text-sm text-slate-500">
          Complément des parcours{' '}
          <Link href={LINKS.formationAO} className="font-medium text-[#377CF3] hover:underline">
            formation appels d&apos;offres
          </Link>{' '}
          et{' '}
          <Link
            href={LINKS.formationConduiteTravauxSuiviChantier}
            className="font-medium text-[#377CF3] hover:underline"
          >
            formation conduite de travaux
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
