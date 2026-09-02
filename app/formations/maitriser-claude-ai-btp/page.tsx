import Link from 'next/link';
import { CTA_RDV_LABEL } from '@/components/CtaRdv';
import { LINKS } from '@/lib/internal-links';
import { FooterTelOrMailLink } from '@/components/PublicPhoneCta';
import { Calendar, Users, Check, Download } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { ContextualLinksSection } from '@/components/layout/ContextualLinksSection';
import { FormationCatalogueIndicateur1Suite } from '@/components/formations/FormationCatalogueIndicateur1Suite';
import { getFormationNiv04Related } from '@/lib/contextual-internal-links';
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
} from '@/lib/tarifs-sessions';
import {
  getFormationByCode,
  libelleDureeFormation,
  libelleEffectifMaxFormation,
  libellePrixSessionHt,
} from '@/data/formations';
import { PREREQUIS_NIV04 } from '@/lib/infos-pratiques-catalogue';
import { getFormationCatalogueVisuel } from '@/lib/formations-catalogue-display';
import {
  FormationCourseHero,
} from '@/components/formations/FormationCourseHero';
import { buildCatalogueCourseMaitriserClaudeNiv04JsonLd } from '@/lib/schema-catalogue-course-jsonld';
import { getStatsFreshnessLabel } from '@/lib/constants';
import { formatNoteSatisfactionSur5 , formatNoteSatisfactionAffichageComplet } from '@/lib/data/indicateurs-resultats'
import { IndicateursResultatsLink } from '@/components/formation/IndicateursResultatsLink';
import { FormationCatalogueGeoSections } from '@/components/formations/FormationCatalogueGeoSections';
import { getFormationCatalogueSeo } from '@/lib/formation-catalogue-seo';

const CATALOGUE_SEO = getFormationCatalogueSeo('NIV-04');

const FORMATION = getFormationByCode('NIV-04')!;
const PATH = LINKS.formationMaitriserClaudeAiBtp;
const PDF_HREF = FORMATION.pdfProgramme;
const PDF_DOWNLOAD_NAME = 'programme_OFC_Maitriser_Claude_BTP.pdf';
const DUREE_LIBELLE = libelleDureeFormation(FORMATION);
const EFFECTIF_LIBELLE = libelleEffectifMaxFormation(FORMATION);
const PRIX_LIBELLE = libellePrixSessionHt(FORMATION);

const PAGE_META_DESCRIPTION = CATALOGUE_SEO.metaDescription;

const CATALOGUE_VISUEL = getFormationCatalogueVisuel('NIV-04');

export const metadata = createPageMetadata({
  title: CATALOGUE_SEO.metaTitle,
  titleAbsolute: `${CATALOGUE_SEO.metaTitle} | Laure Olivié`,
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

const HERO_RESUME = [
  FORMATION.accroche,
  `Session ${DUREE_LIBELLE} — forfait ${PRIX_LIBELLE} / session.`,
  EFFECTIF_LIBELLE.charAt(0).toUpperCase() + EFFECTIF_LIBELLE.slice(1) + '.',
  '70 % pratique / 30 % théorie — Qualiopi, financement possible selon éligibilité (Constructys / OPCO).',
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
        programmePdfAfterHero={false}
        refLine={`Intra · inter · présentiel en Île-de-France · ${DUREE_LIBELLE} · ${FORMATION.niveauLabel}`}
        title={CATALOGUE_SEO.h1}
        subtitle={CATALOGUE_SEO.subtitle}
        badges={['Projets & Skills', 'Cowork · Connecteurs', 'Organisme Qualiopi']}
        summaryItems={HERO_RESUME}
        ctas={
          <>
            <RdvLink
              campaign="formations-maitriser-claude-ai-btp-hero"
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
          <strong>skills</strong>), déléguer la production documentaire via <strong>Cowork</strong>, relier{' '}
          <strong>messagerie</strong>, <strong>drive</strong> et <strong>agenda</strong>, et automatiser avec{' '}
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

      <FormationCatalogueGeoSections
        catalogueRef="NIV-04"
        ressourcesGratuites={[
          { href: LINKS.claudeAiBtp, label: 'Guide Claude AI pour le BTP' },
          { href: LINKS.formationClaudeBtp, label: 'Formation Claude pour le bâtiment' },
        ]}
      />

      <section id="programme" className="scroll-mt-24 border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900">Programme détaillé</h2>
          <p className="mt-2 text-sm text-slate-600">
            Le programme enchaîne accueil, 4 modules techniques et clôture sur {FORMATION.duree} le matin :
            Projets &amp; skills, Cowork, connecteurs et Claude Code — fil rouge PME BTP.
          </p>
          <p className="mt-2 text-sm text-slate-600">
            En 2026, moins de 10&nbsp;% des entreprises BTP utilisent déjà l&apos;IA en production (Observatoire
            des métiers du BTP, 621 répondants) — cette formation vise l&apos;industrialisation, pas la découverte.
          </p>
          <p className="mt-2 text-sm text-slate-600">
            70&nbsp;% pratique / 30&nbsp;% théorie — travail sur vos cas réels (documents anonymisés si besoin).
            Relecture humaine obligatoire avant tout envoi client ou marché.
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
        </div>
      </section>

      <FormationCatalogueIndicateur1Suite programmeRef="NIV-04" />

      <div className="mx-auto max-w-4xl px-4 py-16">
        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
          <h2 className="font-display text-xl font-bold text-slate-900">Public &amp; modalités</h2>
          <p className="mt-4 text-slate-700 leading-relaxed">
            Cette formation s&apos;adresse aux référents IA, dirigeants, responsables digitaux, chargés
            d&apos;affaires et conducteurs de travaux qui utilisent déjà Claude Pro et veulent industrialiser
            l&apos;outil en entreprise BTP.
          </p>
          <p className="mt-4 text-slate-700 leading-relaxed">
            En 2026, la session se tient uniquement le matin ({DUREE_LIBELLE}) pour
            enchaîner accueil, 4 modules techniques et clôture sans coupure — 70&nbsp;% de pratique sur vos
            documents réels.
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
                uniquement. intra-entreprise, dans vos locaux, exclusivement en présentiel en Île-de-France. Forfait{' '}
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

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold text-slate-900">Prérequis</h2>
          <p className="mt-4 text-slate-700 leading-relaxed">{PREREQUIS_NIV04}</p>
          <p className="mt-4 text-slate-700 leading-relaxed">
            Moyens requis : ordinateur portable par participant, compte Claude Pro actif, option « Exécution de
            code » activée, connexion internet haut débit — salle équipée d&apos;un vidéoprojecteur.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold text-slate-900">Objectifs pédagogiques</h2>
          <p className="mt-4 text-slate-700 leading-relaxed">
            À l&apos;issue de cette formation, les participants disposent d&apos;un environnement Claude
            opérationnel : Projets structurés, bibliothèque de skills réutilisables, connecteurs outils et
            première automatisation Claude Code validée en interne — avec les garde-fous de validation humaine
            posés.
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

        <section className="mt-12 rounded-2xl border border-[var(--accent)] bg-[var(--accent-soft)] p-6">
          <h2 className="font-display text-xl font-bold text-slate-900">Livrables &amp; tarification</h2>
          <p className="mt-4 text-sm text-slate-700 leading-relaxed">
            Les livrables comprennent un Projet « chantier type » structuré, un dossier produit avec Cowork,
            un connecteur configuré avec workflow sécurisé, une automatisation Claude Code testée et un plan
            d&apos;action individuel à 30 jours.
          </p>
          <p className="mt-4 text-sm text-slate-700 leading-relaxed">
            Satisfaction publiée : {formatNoteSatisfactionAffichageComplet()} — OFC
            ({getStatsFreshnessLabel()}).
          </p>
          <IndicateursResultatsLink className="mt-2 text-left" />
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            <li>
              <strong>Durée :</strong> {DUREE_LIBELLE} · <strong>Forfait :</strong>{' '}
              {PRIX_LIBELLE} / session · <strong>Effectif :</strong>{' '}
              {EFFECTIF_LIBELLE} · <strong>Financement :</strong> possible selon éligibilité
              (Constructys / OPCO).
            </li>
            <li>
              <strong>Supports remis :</strong> support de prompts et fiches méthodes, Projets, skills,
              connecteurs et automatisations créés en séance — certificat de réalisation en fin de session.
            </li>
            <li>
              <strong>Évaluation :</strong> auto-positionnement entrée/sortie, mises en situation sur vos cas
              réels, validation formateur en continu, questionnaire de satisfaction à chaud et à froid (J+30).
            </li>
          </ul>
        </section>

        <FAQSection
          items={FAQ_MAITRISER_CLAUDE_NIV04}
          title="Questions fréquentes — Maîtriser Claude AI"
          subtitle="Public, prérequis, matinée 4 h et financement."
        />

        <RelatedLinks path={LINKS.formationMaitriserClaudeAiBtp} />

      <ContextualLinksSection
          title="Pages associées"
          subtitle="formations niveau 2, guide Claude AI BTP, financement OPCO."
          links={getFormationNiv04Related().filter((l) => !getClusterRelatedHrefs(LINKS.formationMaitriserClaudeAiBtp).includes(l.href))}
          tone="muted"
        />

        <div className="mt-10 flex flex-wrap gap-4">
          <RdvLink
            campaign="formations-maitriser-claude-ai-btp-footer"
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
                href: LINKS.prendreRdv, label: CTA_RDV_LABEL,
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
