import Link from 'next/link';
import { LINKS } from '@/lib/internal-links';
import { FooterTelOrMailLink } from '@/components/PublicPhoneCta';
import { FileText, Calendar, Users, Check, Download, ExternalLink } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { ContextualLinksSection } from '@/components/layout/ContextualLinksSection';
import { FORMATION_NIV02_RELATED } from '@/lib/contextual-internal-links';
import { FORMATION_AO_CLUSTER_ARTICLES } from '@/lib/ao-dce-cluster-links';
import { RdvLink } from '@/components/RdvLink';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { FAQSection } from '@/components/landing/FAQSection';
import { JsonLd } from '@/components/JsonLd';
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
} from '@/lib/tarifs-sessions';
import { getFormationCatalogueVisuel } from '@/lib/formations-catalogue-display';
import {
  FormationCourseHero,
} from '@/components/formations/FormationCourseHero';
import { buildCatalogueCourseIaAppelsOffreNiv02JsonLd } from '@/lib/schema-catalogue-course-jsonld';

const PDF_HREF = LINKS.pdfProgrammeFormationAoBtpDetail2026;
const KIT_7_PROMPTS_HREF = '/formations/ia-appels-offre-btp/Kit_IA_AO_BTP_7_prompts.html';

const PAGE_META_DESCRIPTION =
  "Formation IA pour le BTP — appels d'offres : DCE, mémoire technique, Cowork & Skills. 4 h, Qualiopi, Constructys.";

const CATALOGUE_VISUEL = getFormationCatalogueVisuel('NIV-02');

export const metadata = createPageMetadata({
  title: "IA appels d'offres BTP — DCE, mémoire technique, Cowork",
  description: PAGE_META_DESCRIPTION,
  path: '/formations/ia-appels-offre-btp',
  keywords: [
    'IA appel d\'offres BTP DCE CCTP',
    'IA mémoire technique appel d\'offres',
    'mémoire technique BTP IA',
    'rédaction mémoire technique',
    'analyse CCTP IA',
    'répondre appel d\'offre travaux',
    'Claude AI appels d\'offres BTP',
    'Claude Cowork DCE',
    'DCE IA',
    'analyse DCE IA',
    'IA marchés publics BTP',
    'formation IA PME bâtiment',
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
    heading: 'Module 1 — Paramétrage de Claude AI Pro & Cowork',
    meta: '60 min · Cowork · Projects · Skill Creator',
    objectifs: [
      'Créer son compte Claude Pro — interface, Projects, choix du modèle (Sonnet / Opus / Haiku)',
      'Organiser ses Projects par client ou type d\'AO, rédiger ses instructions personnalisées (System Prompt)',
      'Uploader sa base documentaire entreprise (MT types, références, procédures QSE)',
      'Installer Cowork — comprendre la logique des skills (déclenchement, instructions, livrables)',
      'Créer un premier skill personnalisé alimenté par ses données entreprise',
      'Programmer un workflow complet : analyse DCE → plan MT → rédaction section par section',
    ],
    livrable: 'Compte Claude Pro configuré + Project dédié AO + Cowork installé + premier skill créé',
    exercice:
      'Configuration en direct du Project AO et création du premier skill sur les données du participant.',
  },
  {
    heading: 'Module 2 — Analyse express de DCE avec Cowork',
    meta: '1 h 15 · Skill « Analyse DCE »',
    objectifs: [
      'Méthodologie d\'analyse : 3 niveaux de lecture, priorisation des pièces, 15 infos critiques à extraire',
      'Upload du DCE complet dans Cowork → extraction automatique (critères, clauses, pénalités, délais)',
      'Décortiquer le CCAP (risques financiers) et synthétiser le CCTP (normes, matériaux, moyens)',
      'Adapter le skill à son métier (étanchéité, gros œuvre, VRD…) + veille AO automatique',
    ],
    livrable: 'Fiche synthèse DCE automatisée + skill d\'analyse DCE personnalisé',
    exercice:
      'Atelier pratique — skill « Analyse DCE » : fiche synthèse + tableau des 15 infos critiques + verdict Go / No Go sur un AO concret du participant.',
  },
  {
    heading: 'Module 3 — Rédiger son mémoire technique avec Cowork',
    meta: '1 h 30 · Skill « Mémoire Technique »',
    objectifs: [
      'Construire le plan de MT optimal adapté aux critères et pondérations du DCE — comparer 3 plans alternatifs',
      'Rédiger les sections stratégiques : présentation entreprise, méthodologie, moyens et engagements QSE',
      'Générer un MT Word complet (planning Gantt, organigramme, tableaux de moyens) via Cowork',
      'Contrôler et humaniser les sorties IA : anti-hallucination et relecture experte',
      'Créer son skill MT aux couleurs de l\'entreprise + skill productivité (CR chantier, emails, devis)',
    ],
    livrable: 'MT Word généré par Cowork + skills MT et productivité personnalisés + 15 prompts AO BTP',
    exercice:
      'Rédaction assistée et ajustement des skills en temps réel sur un AO concret du participant.',
  },
];

const HERO_RESUME_AO = [
  `Parcours catalogue : assistants IA DCE & mémoire technique — Claude AI Pro, Cowork & Skills.`,
  `Session ${SESSION_DUREE_LIBELLE} — 75 % pratique — forfait ${formatTarifHt(TARIF_FORFAIT_AVANCE_HT)} € net de TVA / session (niveau avancé).`,
  `${LIBELLE_EFFECTIF_GROUPE_NIV02}.`,
  'Qualiopi, 100 % finançable OPCO Constructys selon éligibilité.',
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
        refLine={`Intra · inter · présentiel en Île-de-France · ${SESSION_DUREE_LIBELLE} · Niveau 2`}
        title="L'IA appliquée aux appels d'offres BTP"
        subtitle="Créer ses assistants IA pour DCE et mémoire technique — Claude AI Pro, Cowork & Skills"
        badges={['Claude Pro & Cowork', 'Skills DCE / MT', 'Qualiopi']}
        summaryItems={HERO_RESUME_AO}
        ctas={
          <>
            <RdvLink
              campaign="formations-ia-appels-offre-btp-hero"
              ctaPosition="hero"
              ctaId="hero"
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
          <strong>Formation IA appliquée aux appels d&apos;offres BTP</strong> : paramétrer{' '}
          <strong>Claude AI Pro</strong>, installer <strong>Cowork</strong> et créer des{' '}
          <strong>skills</strong> pour analyser les <strong>DCE</strong>, structurer et rédiger des{' '}
          <strong>mémoires techniques</strong> alignés sur les critères du marché. Parcours opérationnel pour
          responsables d&apos;affaires, chargés d&apos;études, conducteurs de travaux, dirigeants et bureaux
          d&apos;études — complément idéal après le{' '}
          <Link
            href={LINKS.formationIaBtpNiveau1BatimentTp}
            className="font-medium text-[var(--accent)] hover:underline"
          >
            niveau 1
          </Link>{' '}
          ou une{' '}
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
              <strong>Public :</strong> dirigeants, responsables d&apos;affaires, chargés d&apos;études, conducteurs de
              travaux, directeurs techniques TPE/PME BTP, bureaux d&apos;études. Session calibrée pour des profils qui
              répondent déjà ou préparent des dossiers d&apos;appels d&apos;offres.
            </span>
          </li>
          <li className="flex gap-2">
            <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
            <span>
              <strong>Format :</strong> action de formation — session unique <strong>{SESSION_DUREE_LIBELLE}</strong>{' '}
              (75 % pratique / 25 % théorie) en demi-journée : 9h00–13h00 ou 13h30–17h30 (à convenir). Intra ou inter,
              exclusivement en présentiel en Île-de-France. Forfait{' '}
              <strong>{formatTarifHt(TARIF_FORFAIT_AVANCE_HT)} € net de TVA par session</strong> (niveau avancé,{' '}
              {LIBELLE_EFFECTIF_GROUPE_NIV02}). Inscription jusqu&apos;à 7 jours avant la session.
            </span>
          </li>
          <li className="flex gap-2">
            <FileText className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
            <span>
              <strong>Prérequis :</strong> abonnement Claude Pro (20 €/mois) et Cowork installé sur le poste. Documents
              à préparer : DCE complet récent (RC + CCAP + CCTP) et 2 à 3 mémoires techniques de votre entreprise.
              Avoir suivi la session niveau 1 « L&apos;IA au service des professionnels du BTP » ou maîtriser les bases
              d&apos;une IA générative.
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
        <h2 className="font-display text-2xl font-bold text-slate-900">Objectifs pédagogiques</h2>
        <p className="mt-4 text-slate-700 leading-relaxed">
          L&apos;objectif est de créer des skills Cowork réutilisables pour analyser un DCE et rédiger un mémoire
          technique aligné sur les critères pondérés du marché.
        </p>
        <p className="mt-4 text-slate-700 leading-relaxed">
          En 2026, le forfait catalogue est de {formatTarifHt(TARIF_FORFAIT_AVANCE_HT)}&nbsp;€ HT par
          session de {SESSION_DUREE_LIBELLE}, finançable OPCO Constructys selon éligibilité (donnée interne OFC).
        </p>
        <ul className="mt-4 space-y-2 text-slate-700">
          {[
            'Paramétrer Claude AI Pro (Projects, instructions personnalisées) pour l\'adapter à son métier et à ses appels d\'offres',
            'Analyser un DCE complet via Cowork en extrayant les 15 informations critiques (critères de jugement, clauses éliminatoires, pénalités, délais)',
            'Structurer un plan de mémoire technique adapté aux pondérations spécifiques du DCE avec l\'assistance de Claude',
            'Rédiger les 5 sections clés d\'un mémoire technique (présentation, méthodologie, moyens, sécurité, environnement) en utilisant les skills Cowork dédiés',
            'Créer et configurer ses propres skills Cowork spécialisés DCE/MT, alimentés par ses données d\'entreprise et réutilisables pour tous ses futurs appels d\'offres',
          ].map((o) => (
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
          La pédagogie est quasi exclusivement pratique : chaque module active un skill Cowork sur le DCE réel du
          participant.
        </p>
        <p className="mt-4 text-slate-700 leading-relaxed">
          En 2026, la session exige un abonnement Claude Pro (20&nbsp;€/mois) et Cowork installé sur le poste du
          stagiaire (prérequis niveau 2).
        </p>
        <ul className="mt-4 space-y-2 text-slate-700">
          {[
            '75 % pratique / 25 % théorie — travail sur DCE et mémoires techniques réels des participants',
            'Chaque module s\'appuie sur un skill Cowork dédié, utilisé en direct pendant la formation',
            'Exercices guidés en temps réel avec partage d\'écran',
            'Création de skills IA opérationnels pendant la formation',
            'Accompagnement personnalisé et support numérique illimité',
          ].map((m) => (
            <li key={m} className="flex gap-2">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              {m}
            </li>
          ))}
        </ul>
      </section>

      <section id="programme" className="mt-12 scroll-mt-24">
        <h2 className="font-display text-2xl font-bold text-slate-900">Programme détaillé</h2>
        <p className="mt-2 text-sm text-slate-600">
          Le programme comporte 3 modules sur {SESSION_DUREE_LIBELLE} : paramétrage Claude, analyse DCE et
          rédaction de mémoire technique.
        </p>
        <p className="mt-2 text-sm text-slate-600">
          3 modules — total {SESSION_DUREE_LIBELLE} — 75 % pratique sur DCE et mémoires techniques réels des
          participants. Chaque module s&apos;appuie sur un skill Cowork dédié.
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
          Ressources sur la plateforme — assistants IA DCE &amp; mémoire technique
        </h2>
        <p className="mt-3 text-sm text-slate-700 leading-relaxed">
          La plateforme OFC peut compléter la session avec des ressources selon convention ; la formation reste
          certifiée Qualiopi, formation catalogue.
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
          Le forfait est de {formatTarifHt(TARIF_FORFAIT_AVANCE_HT)}&nbsp;€ HT par session avec Cowork
          configuré, 30 prompts AO et 3 modèles Word de mémoire technique.
        </p>
        <ul className="mt-4 space-y-2 text-sm text-slate-700">
          <li>
            <strong>Durée :</strong> {SESSION_DUREE_LIBELLE} · <strong>Forfait :</strong>{' '}
            {formatTarifHt(TARIF_FORFAIT_AVANCE_HT)} € net de TVA / session (niveau avancé) · <strong>Financement :</strong> 100 %
            finançable OPCO Constructys selon éligibilité · <strong>Inscription :</strong> jusqu&apos;à 7 jours avant la
            session.
          </li>
          <li>
            <strong>Supports remis :</strong> support de formation sur la plateforme OFC, compte Claude Pro configuré
            avec Project dédié AO, Cowork installé avec skills opérationnels, bibliothèque de 30 prompts spécialisés
            DCE/mémoire technique, template Word structure MT (3 modèles), skills Cowork personnalisés (analyse DCE,
            mémoire technique, veille AO, productivité).
          </li>
          <li>
            <strong>Évaluation :</strong> exercices pratiques et validation par le formateur en continu,
            questionnaire de satisfaction à chaud et à froid (J+30), attestation de formation remise à l&apos;issue
            de la session.
          </li>
        </ul>
      </section>

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
        links={FORMATION_NIV02_RELATED}
        tone="muted"
      />

      <div className="mt-10 flex flex-wrap gap-4">
        <RdvLink
          campaign="formations-ia-appels-offre-btp-footer"
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
            { href: LINKS.formationPlateforme, label: 'Cours sur la plateforme' },
            { href: buildSiteCalendlyCtaUrl('formations-ia-appels-offre-btp-footer-rdv'), label: 'Prendre rendez-vous' },
            { href: LINKS.financement, label: 'Financement Constructys' },
          ]}
        />
      </div>
      </div>

    </div>
  );
}
