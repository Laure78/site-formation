import Link from 'next/link';
import { LINKS } from '@/lib/internal-links';
import { FooterTelOrMailLink } from '@/components/PublicPhoneCta';
import { FileText, Calendar, Users, Check, Download, ExternalLink } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { RdvLink } from '@/components/RdvLink';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { FAQSection } from '@/components/landing/FAQSection';
import { JsonLd } from '@/components/JsonLd';
import { CatalogFormationCourseScript } from '@/components/seo/CatalogFormationCourseScript';
import { Breadcrumb } from '@/components/Breadcrumb';
import { getFormationCatalogEntryByPath } from '@/lib/catalog-formation-course-page-jsonld';
import {
  createPageMetadata,
  getFAQSchema,
  SITE_CONFIG,
  siteHasPublicPhone,
} from '@/lib/seo';
import { FAQ_APPELS_OFFRE } from '@/lib/faq';
import { GAINS_TEMPS_MENTION_PRUDENCE } from '@/lib/gains-temps-copy';
import {
  SESSION_DUREE_LIBELLE,
  TARIF_FORFAIT_AVANCE_HT,
  EXIGENCE_CLAUDE_PRO_NIVEAU_AVANCE,
  LIBELLE_EFFECTIF_GROUPE_COURT,
} from '@/lib/tarifs-sessions';
import { PHOTOS } from '@/lib/photos';
import {
  FormationCourseHero,
  FormationHeroPhoto,
} from '@/components/formations/FormationCourseHero';

const LMS_SLUG = 'ia-appels-offre-btp';
/** Programme affiché — aligné sur le support PDF AO BTP 2026 (NotebookLM, Claude AI, ChatGPT). */
const PDF_HREF = LINKS.pdfProgrammeFormationAoBtpDetail2026;
/** Lead magnet — 8 pages, impression navigateur → PDF */
const KIT_7_PROMPTS_HREF = '/formations/ia-appels-offre-btp/Kit_IA_AO_BTP_7_prompts.html';

const PAGE_META_DESCRIPTION = `Répondre aux appels d'offres BTP avec l'IA : analyse DCE (NotebookLM), Go / No Go, mémoire technique et contrôle de chiffrage (Claude AI). Session ${SESSION_DUREE_LIBELLE}, forfait ${TARIF_FORFAIT_AVANCE_HT} € HT/session (niveau avancé). Qualiopi, Constructys.`;

const CATALOG_ENTRY_BTP02 = getFormationCatalogEntryByPath('/formations/ia-appels-offre-btp')!;

export const metadata = createPageMetadata({
  title: "IA appel d'offres BTP — DCE, CCTP, mémoire technique | Formation",
  description: PAGE_META_DESCRIPTION,
  path: '/formations/ia-appels-offre-btp',
  keywords: [
    'IA appel d\'offres BTP DCE CCTP',
    'IA mémoire technique appel d\'offres',
    'mémoire technique BTP IA',
    'rédaction mémoire technique',
    'analyse CCTP IA',
    'répondre appel d\'offre travaux',
    'ChatGPT appels d\'offres BTP',
    'DCE IA',
    'analyse DCE IA',
    'IA marchés publics BTP',
    'formation IA PME bâtiment',
  ],
  image: {
    url: PHOTOS.btpFormationChantierPlans2026.src,
    width: PHOTOS.btpFormationChantierPlans2026.width,
    height: PHOTOS.btpFormationChantierPlans2026.height,
    alt: PHOTOS.btpFormationChantierPlans2026.alt,
  },
});

const OUTILS_IA_LINE =
  'NotebookLM pour l’analyse de DCE ; Claude AI pour Go / No Go, mémoire technique et chiffrage ; ChatGPT possible selon contexte — prolongements Perplexity, Mistral ou Gemini selon besoins.';

type ProgrammeBloc = {
  heading: string;
  meta: string;
  objectifs: string[];
  livrable: string;
  exercice?: string;
};

const PROGRAMME_BLOCS: ProgrammeBloc[] = [
  {
    heading: 'Introduction — Tour de table & cadrage',
    meta: '15 min · Accueil',
    objectifs: [
      'Accueillir les participants et recueillir les attentes',
      'Faire le point sur les pratiques IA actuelles et les objectifs de la session',
      'Présenter le déroulé de la demi-journée, les exercices et les livrables',
    ],
    livrable: 'Cadrage commun — attentes et feuille de route de travail',
    exercice:
      'Tour de table rapide : usages actuels de l’IA, priorités métiers et exemples de dossiers en cours.',
  },
  {
    heading: 'Module 1 — Analyse DCE avec NotebookLM',
    meta: '60 min · NotebookLM · DCE / pièces',
    objectifs: [
      'Présenter NotebookLM : fonctionnement, intérêt pour l’analyse documentaire BTP, comparaison avec un usage « ChatGPT classique »',
      'Importer un DCE réel et interroger le dossier (CCTP, DPGF, règlement de consultation)',
      'Extraire délais, critères de sélection et points de vigilance pour préparer la réponse',
    ],
    livrable: 'Fiche d’analyse DCE générée avec l’IA — réutilisable sur vos prochains dossiers',
    exercice:
      'Les participants analysent un DCE avec NotebookLM et sortent une synthèse opérationnelle (délais, critères, alertes).',
  },
  {
    heading: 'Module 2 — Décision Go / No Go et rentabilité',
    meta: '45 min · Claude AI',
    objectifs: [
      'Construire une grille de décision Go / No Go avec l’IA : critères, pondération des risques, faisabilité',
      'Utiliser des prompts pour estimer les coûts, identifier les risques financiers et calibrer les marges avant d’engager la réponse',
    ],
    livrable: 'Trame Go / No Go et prompts de chiffrage adaptés à votre métier BTP',
    exercice:
      'Application de la méthode Go / No Go sur un appel d’offres réel ou typique de votre secteur.',
  },
  {
    heading: 'Module 3 — Rédaction de mémoire technique & relecture',
    meta: '60 min · Claude AI · CCTP',
    objectifs: [
      'Structurer un mémoire technique aligné sur les attentes des acheteurs publics et privés (plan type, erreurs à éviter, niveau de détail)',
      'Rédiger avec l’IA section par section : entreprise, moyens humains et matériels, méthodologie, QSE, références chantiers',
      'Relire et renforcer cohérence, ton professionnel et arguments différenciants',
    ],
    livrable: 'Bibliothèque de prompts pour la rédaction complète de mémoires techniques BTP',
    exercice:
      'Rédaction d’une section de mémoire technique à partir d’éléments réels fournis par les participants.',
  },
  {
    heading: 'Module 4 — Chiffrage & contrôle de rentabilité',
    meta: '45 min · Claude AI · tableaux',
    objectifs: [
      'Utiliser l’IA avec vos tableaux de chiffrage : contrôle poste par poste, détection d’incohérences',
      'Mettre en œuvre des prompts de vérification pour sécuriser l’offre financière avant dépôt',
    ],
    livrable: 'Checklist de contrôle de rentabilité assistée par IA',
    exercice:
      'Contrôle d’un chiffrage existant avec assistance IA — repérer les postes sous-estimés ou oubliés.',
  },
  {
    heading: 'Clôture — Bilan, Q&R et remise des ressources',
    meta: '15 min · Synthèse',
    objectifs: [
      'Synthétiser les acquis et les prochaines étapes sur vos dossiers',
      'Répondre aux dernières questions et préciser les bonnes pratiques de confidentialité',
      'Rappeler l’accès aux supports sur la plateforme OFC selon votre convention',
    ],
    livrable: 'Feuille de route personnelle — prolongements et accès ressources',
  },
];

const HERO_RESUME_AO = [
  `Parcours catalogue NIV-02 : DCE (NotebookLM), Go / No Go, mémoire technique, contrôle de chiffrage.`,
  `Session ${SESSION_DUREE_LIBELLE} — forfait ${TARIF_FORFAIT_AVANCE_HT} € HT/session (niveau avancé).`,
  `${LIBELLE_EFFECTIF_GROUPE_COURT}.`,
  'Qualiopi, financement OPCO Constructys selon éligibilité.',
];

export default function FormationIAAppelsOffreBTPPage() {
  const faqSchema = getFAQSchema(FAQ_APPELS_OFFRE);

  return (
    <div>
      <JsonLd id="schema-faq" schema={faqSchema} />

      <FormationCourseHero
        breadcrumb={
          <Breadcrumb
            jsonLdId="schema-breadcrumb-formation-ia-appels-offre-btp"
            items={[
              { label: 'Accueil', href: '/' },
              { label: 'Formations', href: '/formations' },
              {
                label: "L'IA au service des appels d'offre BTP",
                href: '/formations/ia-appels-offre-btp',
              },
            ]}
          />
        }
        refLine={`Intra · inter · présentiel ou distanciel · ${SESSION_DUREE_LIBELLE} · Niveau 2 · NIV-02`}
        title="L'IA au service des appels d'offre BTP"
        subtitle="DCE (NotebookLM), mémoire technique, Go/No Go et chiffrage (Claude AI) — niveau avancé"
        badges={['NotebookLM & DCE', 'Mémoire technique IA', 'Qualiopi']}
        summaryItems={HERO_RESUME_AO}
        image={
          <FormationHeroPhoto
            src={PHOTOS.btpFormationChantierPlans2026.src}
            alt={PHOTOS.btpFormationChantierPlans2026.alt}
            width={PHOTOS.btpFormationChantierPlans2026.width}
            height={PHOTOS.btpFormationChantierPlans2026.height}
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
            <FooterTelOrMailLink className="font-medium text-slate-600 hover:text-[var(--accent)] hover:underline" />
          </>
        }
      >
        <p>
          <strong>IA appel d&apos;offres BTP</strong> : analyse de DCE et pièces avec{' '}
          <strong>NotebookLM</strong>, décision <strong>Go / No Go</strong>, brouillons de{' '}
          <strong>mémoire technique</strong> et <strong>contrôle de chiffrage</strong> avec Claude AI.
          Formation opérationnelle pour artisans, TPE, PME, dirigeants, conducteurs de travaux, chargés d&apos;affaires,
          équipes administratives et bureaux d&apos;études — sur le même niveau d&apos;exigence qu&apos;une{' '}
          <Link
            href={LINKS.formationClaudeAiBtp}
            className="font-medium text-[var(--accent)] hover:underline"
          >
            formation Claude AI dédiée au BTP
          </Link>
          . Outils : {OUTILS_IA_LINE}
        </p>
      </FormationCourseHero>

      <div className="mx-auto max-w-4xl px-4 py-16">
      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
        <h2 className="font-display text-xl font-bold text-slate-900">Public &amp; modalités</h2>
        <ul className="mt-4 space-y-2 text-slate-700">
          <li className="flex gap-2">
            <Users className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
            <span>
              <strong>Public :</strong> artisans, TPE, PME, dirigeants, conducteurs de travaux, chargés d&apos;affaires,
              équipes administratives et bureaux d&apos;études du BTP. Session calibrée pour des profils qui répondent déjà ou
              préparent des dossiers d&apos;appels d&apos;offres.
            </span>
          </li>
          <li className="flex gap-2">
            <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
            <span>
              <strong>Format :</strong> session unique <strong>{SESSION_DUREE_LIBELLE}</strong> en intra ou inter,
              en présentiel ou en distanciel. Forfait <strong>{TARIF_FORFAIT_AVANCE_HT} € HT par session</strong> (niveau
              avancé, {LIBELLE_EFFECTIF_GROUPE_COURT}). Ressources complémentaires sur la plateforme selon convention — réf.{' '}
              <strong>NIV-02</strong>.
            </span>
          </li>
          <li className="flex gap-2">
            <FileText className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
            <span>
              <strong>Prérequis :</strong> connaissance du secteur BTP et des dossiers type DCE / CCTP ;
              <strong> pratique régulière</strong> de ChatGPT ou Claude. Pour les données sensibles :
              privilégier des environnements professionnels (offres Team / entreprise) — rappels RGPD en
              session. {EXIGENCE_CLAUDE_PRO_NIVEAU_AVANCE}
            </span>
          </li>
        </ul>
        <p className="mt-4 text-sm text-slate-600">
          Devis et convention :{' '}
          <a href="mailto:laureolivie@yahoo.fr" className="font-medium text-[var(--accent)] hover:underline">
            laureolivie@yahoo.fr
          </a>
          {siteHasPublicPhone() ? (
            <>
              {' · '}
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="font-medium text-[var(--accent)] hover:underline"
              >
                {SITE_CONFIG.phoneDisplay}
              </a>
            </>
          ) : null}
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold text-slate-900">Objectifs pédagogiques</h2>
        <ul className="mt-4 space-y-2 text-slate-700">
          {[
            'Analyser un DCE complet avec des outils d’IA générative (dont NotebookLM)',
            'Décider d’aller ou non sur un dossier (Go / No Go) et estimer la rentabilité avec l’IA',
            'Rédiger et améliorer un mémoire technique structuré grâce à Claude AI',
            'Contrôler un chiffrage et sécuriser la rentabilité de l’offre avant dépôt',
            'Gagner du temps sur l’ensemble du processus de réponse aux appels d’offres',
          ].map((o) => (
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
          Répartition indicative (total {SESSION_DUREE_LIBELLE}) : introduction et clôture incluses —
          ajustements possibles selon le groupe.
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
              <p className="mt-3 text-xs font-semibold uppercase text-slate-500">Objectifs</p>
              <ul className="mt-2 space-y-1 text-sm text-slate-600">
                {bloc.objectifs.map((o) => (
                  <li key={o}>▸ {o}</li>
                ))}
              </ul>
              {bloc.exercice ? (
                <p className="mt-3 text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">Exercice pratique.</span> {bloc.exercice}
                </p>
              ) : null}
              <p className="mt-4 text-sm text-slate-700">
                <span className="font-semibold text-slate-900">Livrable :</span> {bloc.livrable}
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
          Ressources sur la plateforme — assistant IA DCE &amp; mémoire technique
        </h2>
        <p className="mt-3 text-sm text-slate-700 leading-relaxed">
          Des contenus et approfondissements peuvent compléter la session sur la plateforme (accès selon
          convention). <strong>Qualiopi</strong>, financement <strong>OPCO Constructys</strong> selon
          éligibilité — référence <strong>NIV-02</strong>.
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
            <strong>Durée :</strong> {SESSION_DUREE_LIBELLE} · <strong>Forfait :</strong>{' '}
            {TARIF_FORFAIT_AVANCE_HT} € HT / session (niveau avancé) · <strong>Financement :</strong> OPCO
            (Constructys, etc.) selon éligibilité.
          </li>
          <li>
            <strong>Supports remis :</strong> guide pratique « Répondre aux AO BTP avec l&apos;IA »,
            bibliothèque de prompts BTP (AO, mémoire technique, chiffrage), fiches outils NotebookLM /
            ChatGPT / Claude AI — accès plateforme OFC selon convention.
          </li>
          <li>
            <strong>Évaluation :</strong> mise en situation continue via les exercices de chaque module,
            questionnaire de satisfaction en fin de session, attestation individuelle de formation.
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
            { href: '/formation-ia-appels-offres-btp', label: 'Répondre aux AO BTP avec l’IA (guide)' },
            { href: '/formations', label: 'Catalogue formations' },
            { href: `/cours/${LMS_SLUG}`, label: 'Cours sur la plateforme' },
            { href: buildSiteCalendlyCtaUrl('formations-ia-appels-offre-btp-footer-rdv'), label: 'Prendre rendez-vous' },
            { href: '/financement-constructys-formation-ia-btp', label: 'Financement Constructys' },
            { href: '/blog/analyse-dce-notebooklm-claude-btp', label: 'Article : analyser un DCE avec l’IA' },
          ]}
        />
      </div>
      </div>

      <CatalogFormationCourseScript entry={CATALOG_ENTRY_BTP02} pageDescription={PAGE_META_DESCRIPTION} />
    </div>
  );
}
