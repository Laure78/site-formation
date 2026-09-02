import Link from 'next/link';
import { CTA_RDV_LABEL } from '@/components/CtaRdv';
import { LINKS } from '@/lib/internal-links';
import { FooterTelOrMailLink } from '@/components/PublicPhoneCta';
import { FileText, Calendar, Users, Check, Download, ExternalLink } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { ContextualLinksSection } from '@/components/layout/ContextualLinksSection';
import { FormationCatalogueIndicateur1Suite } from '@/components/formations/FormationCatalogueIndicateur1Suite';
import { FORMATION_NIV02_RELATED } from '@/lib/contextual-internal-links';
import { FORMATION_AO_CLUSTER_ARTICLES } from '@/lib/ao-dce-cluster-links';
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
import { FAQ_APPELS_OFFRE } from '@/lib/faq';
import { GAINS_TEMPS_MENTION_PRUDENCE } from '@/lib/gains-temps-copy';
import {
  SESSION_DUREE_LIBELLE,
  TARIF_FORFAIT_AVANCE_HT,
  LIBELLE_EFFECTIF_GROUPE_NIV02,

  formatTarifHt,
  libelleTarifsDualCourt,
} from '@/lib/tarifs-sessions';
import { FORMATION_NIV02 } from '@/data/formations';
import { PREREQUIS_NIV02 } from '@/lib/infos-pratiques-catalogue';
import { getFormationCatalogueVisuel } from '@/lib/formations-catalogue-display';
import {
  FormationCourseHero,
} from '@/components/formations/FormationCourseHero';
import { buildCatalogueCourseIaAppelsOffreNiv02JsonLd } from '@/lib/schema-catalogue-course-jsonld';
import { getStatsFreshnessLabel } from '@/lib/constants';
import { formatNoteSatisfactionAffichageComplet } from '@/lib/data/indicateurs-resultats';
import { IndicateursResultatsLink } from '@/components/formation/IndicateursResultatsLink';
import { FormationIaAppelsOffresOperationalSections } from '@/components/formations/FormationIaAppelsOffresOperationalSections';
import { getFormationCatalogueSeo } from '@/lib/formation-catalogue-seo';
import {
  AO_FORMATION_CAS_PRATIQUE_QUOTE,
  AO_FORMATION_PROMESSE,
  AO_LIVRABLES_FORMATION,
  AO_PRUDENCE_FORMULATION,
} from '@/lib/formation-ia-appels-offres-btp-operational-content';
import { FormationCatalogueGeoSections } from '@/components/formations/FormationCatalogueGeoSections';

const PDF_HREF = LINKS.pdfProgrammeFormationAoBtpDetail2026;
const PDF_DOWNLOAD_NAME = 'programme_OFC_Niveau2_IA_AO_ClaudePro.pdf';
const KIT_7_PROMPTS_HREF = '/formations/ia-appels-offre-btp/Kit_IA_AO_BTP_7_prompts.html';

const CATALOGUE_SEO = getFormationCatalogueSeo('NIV-02');

const PAGE_META_DESCRIPTION = CATALOGUE_SEO.metaDescription;

const CATALOGUE_VISUEL = getFormationCatalogueVisuel('NIV-02');

export const metadata = createPageMetadata({
  title: CATALOGUE_SEO.metaTitle,
  description: PAGE_META_DESCRIPTION,
  descriptionFinal: true,
  path: '/formations/ia-appels-offre-btp',
  keywords: [
    'formation IA appels d\'offres BTP',
    'formation ChatGPT appels d\'offres BTP',
    'analyse DCE avec IA',
    'analyser un CCTP avec ChatGPT',
    'IA chiffrage BTP',
    'IA devis bâtiment',
    'IA mémoire technique',
    'ChatGPT mémoire technique BTP',
    'formation IA chiffrage bâtiment',
    'assistant IA appels d\'offres',
    'intelligence artificielle appels d\'offres BTP',
    'Claude AI appels d\'offres BTP',
    'Claude Cowork DCE',
    'IA marchés publics BTP',
  ],
  image: {
    url: CATALOGUE_VISUEL.src,
    width: CATALOGUE_VISUEL.width,
    height: CATALOGUE_VISUEL.height,
    alt: CATALOGUE_VISUEL.alt,
  },
});

const OUTILS_IA_LINE =
  'Claude AI Pro (Anthropic) — Cowork & Skills : analyse de DCE, rédaction de mémoires techniques, assistants réutilisables sur vos fichiers locaux.';

type ProgrammeBloc = {
  heading: string;
  meta: string;
  objectifs: string[];
  livrable: string;
  exercice?: string;
};

const PROGRAMME_BLOCS: ProgrammeBloc[] = [
  {
    heading: 'Accueil — cadrage et positionnement',
    meta: '15 min',
    objectifs: [
      'Accueil des participants, émargement et présentation des objectifs de la demi-journée',
      'Auto-positionnement d\'entrée sur les objectifs visés',
      'Tour de table : pratiques actuelles de réponse aux AO et dossiers apportés par chacun',
    ],
    livrable: '',
  },
  {
    heading: 'Module 1 — Paramétrage de Claude AI Pro et de Cowork',
    meta: '60 min · Cowork · Projects · Skill Creator',
    objectifs: [
      'Créer son compte Claude Pro — interface, Projects, choix du modèle',
      'Organiser ses Projects par client ou par type d\'AO, rédiger ses instructions personnalisées',
      'Uploader sa base documentaire entreprise (mémoires techniques types, références, procédures QSE)',
      'Confidentialité : ce qui peut être déposé dans l\'outil et ce qui doit rester en dehors',
      'Installer Cowork — comprendre la logique des skills (déclenchement, instructions, livrables)',
      'Créer un premier skill personnalisé alimenté par ses données entreprise',
      'Programmer un workflow complet : analyse DCE → plan de mémoire technique → rédaction section par section',
    ],
    livrable: 'Compte Claude Pro configuré + Project dédié AO + Cowork installé + premier skill créé',
    exercice:
      'Configuration en direct du Project AO et création du premier skill sur les données du participant.',
  },
  {
    heading: 'Module 2 — Analyse DCE, chiffrage assisté et contrôle des pièces',
    meta: '1 h 15 · Skills « Analyse DCE » & « Préparation chiffrage »',
    objectifs: [
      'Méthodologie d\'analyse : trois niveaux de lecture, priorisation des pièces, 15 informations critiques à extraire',
      'Import et organisation du DCE complet : RC, CCTP, CCAP, DPGF, BPU, plans et annexes',
      'Upload du DCE dans Cowork → synthèse structurée du marché (critères, clauses, pénalités, délais)',
      'Extraire les prestations du lot entreprise — explicites et implicites à vérifier (ex. menuiserie, étanchéité, VRD)',
      'Décortiquer le CCAP (risques financiers) et synthétiser le CCTP (normes, matériaux, performances, interfaces lots)',
      'Comparer CCTP, DPGF, CCAP et RC — repérer incohérences, informations manquantes et points à clarifier auprès de la MOE',
      'Construire une checklist de chiffrage et comparer les prestations détectées avec un ancien devis de l\'entreprise',
      'Identifier les postes potentiellement oubliés — aide au contrôle, validation métier obligatoire',
      'Produire une fiche de synthèse, le tableau des 15 informations critiques et un verdict Go / No Go',
      'Contrôler les extractions obtenues par retour aux pièces sources',
      'Adapter le skill à son métier et tester en temps réel sur un AO concret apporté par le participant',
    ],
    livrable:
      'Fiche de synthèse DCE + checklist chiffrage + tableau comparaison CCTP/DPGF + skills d\'analyse DCE et préparation chiffrage',
    exercice:
      'Atelier pratique — analyse DCE et préparation chiffrage sur un AO concret et un ancien devis du participant.',
  },
  {
    heading: 'Module 3 — Devis, mémoire technique et assistants IA réutilisables',
    meta: '1 h 30 · Skills « Mémoire technique », « Désignations devis » & « Contrôle avant dépôt »',
    objectifs: [
      'Générer ou améliorer les désignations d\'ouvrages professionnelles à partir des prestations identifiées',
      'Structurer le devis — organisation des postes (IA devis bâtiment en aide, pas en substitut du chiffrage)',
      'Analyser les critères de notation du RC et bâtir le plan de mémoire technique adapté aux pondérations',
      'Rédiger les sections stratégiques : présentation entreprise, méthodologie d\'exécution, moyens humains et matériels, engagements QSE',
      'Générer un mémoire technique Word complet (planning, organigramme, tableaux de moyens) via Cowork',
      'Contrôler et humaniser les sorties de l\'IA : anti-hallucination et relecture experte',
      'Configurer les 8 assistants IA réutilisables : analyse DCE, CCTP, contrôle DPGF, chiffrage, devis, mémoire technique, contrôle avant dépôt',
      'Effectuer un contrôle final de cohérence de l\'offre (mémoire, chiffrage, pièces administratives)',
      'Créer son skill mémoire technique aux couleurs de l\'entreprise + skill productivité (CR chantier, emails)',
      'Tester et ajuster ses skills en temps réel sur un AO concret',
    ],
    livrable:
      'Mémoire technique Word + 8 assistants IA configurés + trames DCE/chiffrage/MT + bibliothèque de prompts AO BTP',
    exercice:
      'Rédaction assistée, structuration devis et configuration des assistants en temps réel sur un AO concret du participant.',
  },
  {
    heading: 'Bilan, plan d\'action et clôture',
    meta: '15 min',
    objectifs: [
      'Auto-positionnement de sortie et mesure de la progression sur les objectifs visés',
      'Plan d\'action individuel : 3 actions concrètes à mettre en place à 30 jours',
      'Questions / réponses, questionnaire de satisfaction et remise des attestations',
    ],
    livrable:
      'Plan d\'action individuel + attestation individuelle de fin de formation remise à chaque participant',
  },
];

const TARIFS_DUAL = libelleTarifsDualCourt(4);

const HERO_RESUME_AO = [
  `Parcours catalogue : DCE réel, devis réel, chiffrage assisté, mémoire technique — Claude AI Pro, Cowork & 8 assistants IA.`,
  `Session ${SESSION_DUREE_LIBELLE} — 75 % pratique — ${TARIFS_DUAL} (niveau avancé).`,
  `${LIBELLE_EFFECTIF_GROUPE_NIV02}.`,
  'Qualiopi. Financement possible selon éligibilité (OPCO Constructys).',
];

const courseSchema = buildCatalogueCourseIaAppelsOffreNiv02JsonLd();

export default function FormationIAAppelsOffreBTPPage() {
  const faqSchema = getFAQSchema(FAQ_APPELS_OFFRE);

  return (
    <div>
      <JsonLd id="schema-course-niv-02" schema={courseSchema} />
      <JsonLd id="schema-faq" schema={faqSchema} />

      <FormationCourseHero
        catalogueRef="NIV-02"
        programmePdfAfterHero={false}
        refLine={`Intra-entreprise · présentiel · ${SESSION_DUREE_LIBELLE} · Appels d'offres · ${LIBELLE_EFFECTIF_GROUPE_NIV02}`}
        title={CATALOGUE_SEO.h1}
        subtitle={CATALOGUE_SEO.subtitle}
        badges={['DCE & chiffrage assisté', '8 assistants IA', 'Organisme Qualiopi']}
        summaryItems={HERO_RESUME_AO}
        ctas={
          <>
            <RdvLink
              campaign="formations-ia-appels-offre-btp-hero"
              ctaPosition="hero"
              ctaId="hero"
              className="rounded-xl bg-[var(--accent)] px-6 py-3.5 text-center font-semibold text-white hover:bg-blue-600"
             />
            <a
              href={PDF_HREF}
              download={PDF_DOWNLOAD_NAME}
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 px-6 py-3.5 font-semibold text-slate-800 hover:border-[var(--accent)]"
            >
              <Download size={20} strokeWidth={1.5} />
              Télécharger le programme (PDF)
            </a>
            <a
              href={KIT_7_PROMPTS_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[var(--accent)] bg-[var(--accent-soft)] px-6 py-3.5 font-semibold text-[var(--accent)] hover:bg-blue-100"
            >
              <FileText size={20} strokeWidth={1.5} />
              Kit 7 prompts AO
            </a>
            <Link
              href={LINKS.formationPlateforme}
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
              href={LINKS.formationPlateforme}
              className="font-medium text-slate-600 hover:text-[var(--accent)] hover:underline"
            >
              Fiche cours plateforme
            </Link>
            <FooterTelOrMailLink className="font-medium text-slate-600 hover:text-[var(--accent)] hover:underline" />
          </>
        }
      >
        <p>
          <strong>Formation IA appliquée aux appels d&apos;offres BTP</strong> : analyser un{' '}
          <strong>DCE complet</strong> (RC, CCTP, CCAP, DPGF, BPU), préparer le{' '}
          <strong>chiffrage assisté</strong>, structurer et rédiger des <strong>mémoires techniques</strong>, et
          configurer <strong>8 assistants IA réutilisables</strong> avec Claude AI Pro et Cowork.{' '}
          {AO_FORMATION_CAS_PRATIQUE_QUOTE} Parcours opérationnel pour responsables d&apos;affaires, chargés
          d&apos;études, conducteurs de travaux, dirigeants et artisans du second œuvre — complément idéal après
          le{' '}
          <Link
            href={LINKS.formationIaBtpNiveau1BatimentTp}
            className="font-medium text-[var(--accent)] hover:underline"
          >
            niveau 1
          </Link>{' '}
          ou une{' '}
          <Link
            href={LINKS.formationMaitriserClaudeAiBtp}
            className="font-medium text-[var(--accent)] hover:underline"
          >
            formation Claude AI dédiée au BTP
          </Link>
          . Outils : {OUTILS_IA_LINE}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-slate-600">{AO_PRUDENCE_FORMULATION}</p>
      </FormationCourseHero>

      <FormationCatalogueGeoSections
        catalogueRef="NIV-02"
        ressourcesGratuites={[
          { href: LINKS.guideRepondreAoBtpOfc2026, label: 'Guide répondre aux AO BTP (PDF)' },
          { href: LINKS.tutoAnalyseDce, label: 'Tutoriel analyser un DCE avec l\'IA' },
        ]}
        etudeDeCasHref={LINKS.etudesCas}
        etudeDeCasLabel="Études de cas FFB & CSFE — formation IA BTP en réseau"
      />

      <section id="programme" className="scroll-mt-24 border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-4xl">
        <h2 className="font-display text-2xl font-bold text-slate-900">Programme détaillé</h2>
        <p className="mt-2 text-sm text-slate-600">
          Accueil (15 min), 3 modules et clôture (15 min) — total {SESSION_DUREE_LIBELLE} — 75 % pratique sur DCE,
          devis et mémoires techniques réels des participants. Workflow reproductible en 20 étapes et 8 assistants IA
          configurés en session.
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
              {bloc.exercice ? (
                <p className="mt-3 text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">Atelier pratique.</span> {bloc.exercice}
                </p>
              ) : null}
              {bloc.livrable ? (
                <p className="mt-4 text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">Livrable :</span> {bloc.livrable}
                </p>
              ) : null}
            </div>
          ))}
        </div>
        </div>
      </section>

      <FormationCatalogueIndicateur1Suite programmeRef="NIV-02" />

      <div className="mx-auto max-w-4xl px-4">
        <FormationIaAppelsOffresOperationalSections />
      </div>

      <div className="mx-auto max-w-4xl px-4 py-16">
      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
        <h2 className="font-display text-xl font-bold text-slate-900">Public &amp; modalités</h2>
        <p className="mt-4 text-slate-700 leading-relaxed">
          Cette formation s&apos;adresse aux professionnels qui répondent déjà aux appels d&apos;offres et dure{' '}
          {SESSION_DUREE_LIBELLE} (75&nbsp;% pratique) avec Claude Pro et Cowork obligatoires.
        </p>
        <p className="mt-4 text-slate-700 leading-relaxed">
          En 2026, seulement 3&nbsp;% des entreprises BTP déclarent un déploiement effectif de l&apos;IA, contre
          36&nbsp;% de dirigeants prêts à l&apos;adopter (Observatoire des métiers du BTP, cabinet Plein Sens).
        </p>
        <ul className="mt-4 space-y-2 text-slate-700">
          <li className="flex gap-2">
            <Users className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
            <span>
              <strong>Public :</strong> {FORMATION_NIV02.public}. Session calibrée pour des profils qui
              répondent déjà ou préparent des dossiers d&apos;appels d&apos;offres.
            </span>
          </li>
          <li className="flex gap-2">
            <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
            <span>
              <strong>Format :</strong> action de formation — session unique <strong>{SESSION_DUREE_LIBELLE}</strong>{' '}
              (75 % pratique / 25 % théorie) en demi-journée : {FORMATION_NIV02.horaires}. Intra-entreprise en
              présentiel — locaux du client en Île-de-France (75, 77, 78, 91, 92, 93, 94, 95). Forfait{' '}
              <strong>{TARIFS_DUAL}</strong> (niveau avancé, {LIBELLE_EFFECTIF_GROUPE_NIV02}).
              Inscription jusqu&apos;à 15 jours calendaires avant le démarrage.
            </span>
          </li>
        </ul>
        <p className="mt-4 text-sm text-slate-600">
          Devis et convention :{' '}
          <a href="mailto:laureolivie@yahoo.fr" className="font-medium text-[var(--accent)] hover:underline">
            laureolivie@yahoo.fr
          </a>
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold text-slate-900">Prérequis</h2>
        <p className="mt-4 text-slate-700 leading-relaxed">{PREREQUIS_NIV02}</p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold text-slate-900">Objectifs pédagogiques</h2>
        <p className="mt-4 text-slate-700 leading-relaxed">
          {AO_FORMATION_PROMESSE} L&apos;objectif est de créer des skills Cowork réutilisables pour analyser un DCE,
          préparer le chiffrage, structurer un devis et rédiger un mémoire technique aligné sur les critères
          pondérés du marché.
        </p>
        <p className="mt-4 text-slate-700 leading-relaxed">
          En 2026, les tarifs catalogue sont : {TARIFS_DUAL},{' '}
          finançable OPCO Constructys selon éligibilité (donnée interne OFC).
        </p>
        <ul className="mt-4 space-y-2 text-slate-700">
          {FORMATION_NIV02.objectifs.map((o) => (
            <li key={o} className="flex gap-2">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              {o}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-slate-500">{GAINS_TEMPS_MENTION_PRUDENCE}</p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold text-slate-900">Méthodes pédagogiques</h2>
        <p className="mt-4 text-slate-700 leading-relaxed">
          La pédagogie est quasi exclusivement pratique : chaque module active des skills Cowork sur le DCE réel et
          l&apos;ancien devis du participant — analyse DCE avec IA, préparation chiffrage, désignations de devis et
          mémoire technique.
        </p>
        <p className="mt-4 text-slate-700 leading-relaxed">
          En 2026, la session exige un abonnement Claude Pro (environ 18&nbsp;€ HT/mois, à la charge de
          l&apos;entreprise) et Cowork installé sur le poste du stagiaire (prérequis niveau 2).
        </p>
        <ul className="mt-4 space-y-2 text-slate-700">
          {[
            '75 % pratique / 25 % théorie — travail sur DCE, devis et mémoires techniques réels des participants',
            'Workflow 20 étapes : de l\'import DCE au contrôle final, avec 8 assistants IA configurés en session',
            'Apports méthodologiques courts, démonstrations en direct, exercices guidés en temps réel avec partage d\'écran',
            'Création de skills IA opérationnels pendant la séance, ateliers sur cas réels et restitutions croisées',
            'Salle équipée mise à disposition par le client, vidéoprojecteur, connexion internet haut débit',
          ].map((m) => (
            <li key={m} className="flex gap-2">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              {m}
            </li>
          ))}
        </ul>
      </section>

      <section
        id="parcours-lms"
        className="mt-12 scroll-mt-24 rounded-2xl border border-slate-200 bg-[var(--accent-soft)] p-6"
      >
        <h2 className="font-display text-xl font-bold text-slate-900">
          Ressources sur la plateforme — assistants IA DCE &amp; mémoire technique
        </h2>
        <p className="mt-3 text-sm text-slate-700 leading-relaxed">
          La plateforme OFC peut compléter la session avec des ressources selon convention ; la formation reste
          dispensée par un organisme certifié Qualiopi — formation catalogue.
        </p>
        <p className="mt-3 text-sm text-slate-700 leading-relaxed">
          Des contenus et approfondissements peuvent compléter la session sur la plateforme (accès selon
          convention). <strong>Qualiopi</strong>, financement <strong>OPCO Constructys</strong> selon
          éligibilité — formation catalogue.
        </p>
        <p className="mt-4">
          <Link
            href={LINKS.formationPlateforme}
            className="text-sm font-semibold text-[var(--accent)] hover:underline"
          >
            Ouvrir la fiche cours sur la plateforme →
          </Link>
        </p>
      </section>

      <section className="mt-12 rounded-2xl border border-[var(--accent)] bg-[var(--accent-soft)] p-6">
        <h2 className="font-display text-xl font-bold text-slate-900">Livrables &amp; tarification</h2>
        <p className="mt-4 text-sm text-slate-700 leading-relaxed">
          Tarifs : {TARIFS_DUAL} avec Cowork configuré, trames DCE/chiffrage/MT, bibliothèque de
          prompts AO BTP et 8 assistants IA opérationnels.
        </p>
        <p className="mt-4 text-sm text-slate-700 leading-relaxed">
          Satisfaction publiée : {formatNoteSatisfactionAffichageComplet()} — OFC ({getStatsFreshnessLabel()}).
        </p>
        <IndicateursResultatsLink className="mt-2 text-left" />
        <ul className="mt-4 space-y-2 text-sm text-slate-700">
          <li>
            <strong>Durée :</strong> {SESSION_DUREE_LIBELLE} · Tarifs : {TARIFS_DUAL}{' '}
            (niveau avancé, {LIBELLE_EFFECTIF_GROUPE_NIV02}) · <strong>Financement :</strong>{' '}
            prise en charge possible par les OPCO (Constructys, OPCO 2i, Akto…) selon éligibilité — plafonnée par
            l&apos;OPCO, reste à charge possible · <strong>Inscription :</strong> jusqu&apos;à 15 jours calendaires
            avant le démarrage.
          </li>
          <li>
            <strong>Supports remis :</strong> support de formation numérique, compte Claude Pro configuré avec Project
            dédié AO, Cowork installé avec 8 assistants IA opérationnels,{' '}
            {AO_LIVRABLES_FORMATION.slice(0, 5).join(', ').toLowerCase()} et{' '}
            {AO_LIVRABLES_FORMATION.length - 5} autres trames et prompts (voir section livrables).
          </li>
          <li>
            <strong>Évaluation :</strong> questionnaire de positionnement amont, auto-positionnement entrée/sortie,
            évaluation continue sur exercices pratiques, questionnaire de satisfaction à chaud et à froid (J+30),
            certificat de réalisation et attestation individuelle de fin de formation.
          </li>
        </ul>
      </section>

      <RelatedLinks path={LINKS.formationAO} />

      <ContextualLinksSection
        title="Pour aller plus loin"
        subtitle="Guides pratiques DCE, CCTP, NotebookLM et chiffrage BPU — angles complémentaires à la session formation."
        links={FORMATION_AO_CLUSTER_ARTICLES}
        tone="white"
      />

      <FAQSection
        items={FAQ_APPELS_OFFRE}
        title="Questions fréquentes"
        subtitle="Public, durée, livrables."
      />

      <ContextualLinksSection
        title="Pages associées"
        subtitle="niveau 1 — productivité, guides DCE/CCTP et financement OPCO."
        links={FORMATION_NIV02_RELATED.filter((l) => !getClusterRelatedHrefs(LINKS.formationAO).includes(l.href))}
        tone="muted"
      />

      <div className="mt-10 flex flex-wrap gap-4">
        <RdvLink
          campaign="formations-ia-appels-offre-btp-footer"
          ctaPosition="footer"
          ctaId="footer-rdv"
          variant="primary"
          className="rounded-xl px-6 py-3.5"
         />
      </div>

      <div className="mt-10">
        <AllerPlusLoin
          links={[
            { href: LINKS.formations, label: 'Catalogue formations' },
            {
              href: LINKS.guideRepondreAoBtpOfc2026,
              label: 'Guide gratuit — répondre AO BTP (5 étapes)',
            },
            { href: LINKS.formationPlateforme, label: 'Cours sur la plateforme' },
            { href: LINKS.prendreRdv, label: CTA_RDV_LABEL },
            { href: LINKS.financement, label: 'Financement Constructys' },
          ]}
        />
      </div>
      </div>

    </div>
  );
}
