import Link from 'next/link';
import { LINKS } from '@/lib/internal-links';
import { FooterTelOrMailLink } from '@/components/PublicPhoneCta';
import { FileText, Calendar, Users, Check, Download } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { ContextualLinksSection } from '@/components/layout/ContextualLinksSection';
import { FORMATION_CLAUDE_SKILLS_BTP_RELATED } from '@/lib/contextual-internal-links';
import { RdvLink } from '@/components/RdvLink';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { FAQSection } from '@/components/landing/FAQSection';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumb } from '@/components/Breadcrumb';
import AuthorBio from '@/components/AuthorBio';
import { createPageMetadata, getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import { FAQ_CLAUDE_IA_SKILLS_BTP } from '@/lib/faq';
import { GAINS_TEMPS_MENTION_PRUDENCE } from '@/lib/gains-temps-copy';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import {
  SESSION_DUREE_MATIN_NIV04,
  LIBELLE_EFFECTIF_GROUPE_NIV03,
  MODALITE_FORMATIONS_PRESENTIEL,
} from '@/lib/tarifs-sessions';
import {
  FormationCourseHero,
} from '@/components/formations/FormationCourseHero';
import { FormationProgrammePdfDownloadBanner } from '@/components/formations/FormationProgrammePdfDownloadBanner';
import { FormationProgrammePdfViewer } from '@/components/formations/FormationProgrammePdfViewer';
import { buildClaudeIaChatCoworkCodeSkillsBtpJsonLd } from '@/lib/schema-catalogue-course-jsonld';
import { getFormationCatalogueVisuel } from '@/lib/formations-catalogue-display';

const PATH = LINKS.formationClaudeIaBtpFiche;
const PDF_HREF = LINKS.pdfProgrammeFormationClaudeIaBtp;
const CATALOGUE_REF = 'NIV-06';

const HERO_VISUEL = getFormationCatalogueVisuel(CATALOGUE_REF);

const PAGE_META_TITLE = 'Formation IA BTP avec Claude';
const PAGE_META_DESCRIPTION =
  'Installez Claude Chat, Cowork & Code sur vos cas AO et chantier. Formation Qualiopi finançable Constructys, présentiel Île-de-France.';

export const metadata = createPageMetadata({
  title: PAGE_META_TITLE,
  titleAbsolute: `${PAGE_META_TITLE} — Laure Olivié`,
  description: PAGE_META_DESCRIPTION,
  path: PATH,
  openGraphType: 'article',
  article: {
    publishedTime: '2026-06-24',
    modifiedTime: '2026-06-24',
    author: SITE_CONFIG.name,
    section: 'Formation IA pour les pro du BTP',
  },
  image: {
    url: HERO_VISUEL.src,
    width: HERO_VISUEL.width,
    height: HERO_VISUEL.height,
    alt: HERO_VISUEL.alt,
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
    heading: 'Module 1 — Démarrer avec Claude & installer les skills BTP',
    meta: '60 min · Chat, Cowork & Code',
    objectifs: [
      'Claude Chat, Cowork & Code : les 3 environnements et quand les utiliser',
      'Dialoguer avec un PDF (RC, CCTP, CR) ; produire un document avec Cowork',
      'Confidentialité des données de l\'entreprise',
      'Ce qu\'est un skill BTP (savoir-faire automatisé) et comment installer un fichier .skill (Settings → Capabilities → Skills)',
      'Bonnes pratiques & économie de tokens (1 dossier = 1 conversation)',
    ],
    livrable: 'Les skills BTP installés sur les postes + fiche « réflexes tokens »',
  },
  {
    heading: 'Module 2 — Bureau d\'études : skills RC & DCE (appels d\'offres)',
    meta: '60 min · analyse RC · DCE/DQE',
    objectifs: [
      'Skill analyse RC : extraire MO/MOE, type de marché, dates, visite, critères, pièces',
      'Décider GO / NO GO en quelques minutes',
      'Skill analyse DCE/DQE : exigences par famille (béton décoratif, pavage, dallage, pierre…)',
      'Repérer postes oubliés et clauses à risque (CCAP), sécuriser le chiffrage',
    ],
    livrable: 'Fiche RC + fiche DCE générées sur un appel d\'offres réel de l\'entreprise',
  },
  {
    heading: 'Module 3 — Équipe travaux : préparer, suivre, réceptionner',
    meta: '60 min · CCTP · CR · réserves · normes',
    objectifs: [
      'Skill CCTP organisation : phasage, contraintes, points d\'arrêt',
      'Skill CR de chantier : lire le CR du MOE même en photo — actions, délais, photos à prendre',
      'Skill levée des réserves : tableau de suivi, preuves, retenue de garantie',
      'Skill normes/hors-gel : DTU, hors-gel IDF, classes de gel béton (XF)',
    ],
    livrable: 'Synthèse CR + fiche prépa chantier + tableau de réserves + mémo normes',
  },
  {
    heading: 'Module 4 — Direction (skill juridique) + atelier & plan de déploiement',
    meta: '60 min · litiges · déploiement interne',
    objectifs: [
      'Skill assistant juridique : qualifier un litige (marché privé / public), retrouver les références utiles',
      'Rédiger mise en demeure / mémoire en réclamation — l\'IA n\'est pas un avocat',
      'Mini-atelier sur un dossier réel : qui utilise quel skill, quand',
      'Plan d\'action 30 jours + règles d\'économie de tokens',
    ],
    livrable: 'Plan de déploiement IA BTP (qui / quoi / quand) + tuto skills & tokens',
  },
];

const HERO_RESUME = [
  'Formation IA BTP intra 4 h — Claude Chat, Cowork & Code, skills sur-mesure (AO, chantier, juridique).',
  `Session ${SESSION_DUREE_MATIN_NIV04} — présentiel en Île-de-France, 70 % pratique / 30 % théorie.`,
  `${LIBELLE_EFFECTIF_GROUPE_NIV03} — tarif intra sur devis, finançable OPCO Constructys.`,
  `Qualiopi — ${formatProfessionalsTrainedCount()} pros formés, note ${SOCIAL_PROOF.AVERAGE_RATING}.`,
];

const OBJECTIFS_PEDAGOGIQUES = [
  'Utiliser Claude (Chat, Cowork, Code) et installer/lancer des skills sur-mesure adaptés à leur métier BTP',
  'Analyser un appel d\'offres avec les skills RC et DCE/DQE pour décider et sécuriser le chiffrage',
  'Préparer et suivre un chantier avec l\'IA : CCTP organisation, CR de chantier, levée des réserves, normes/hors-gel',
  'Qualifier un litige de marché de travaux et produire les écrits, en sachant quand saisir un avocat',
  'Appliquer des bonnes pratiques pour fiabiliser les résultats et économiser tokens et temps',
];

const SKILLS_LIST = [
  { name: 'Analyse RC', usage: 'IA appel d\'offres BTP — GO / NO GO rapide' },
  { name: 'Analyse DCE/DQE', usage: 'Chiffrage sécurisé, clauses CCAP à risque' },
  { name: 'CCTP organisation', usage: 'IA chantier — phasage, contraintes, points d\'arrêt' },
  { name: 'CR de chantier', usage: 'Synthèse CR MOE, actions et délais' },
  { name: 'Levée des réserves', usage: 'Tableau de suivi, preuves, retenue de garantie' },
  { name: 'Normes / hors-gel', usage: 'DTU, hors-gel IDF, classes de gel béton XF' },
  { name: 'Assistant juridique', usage: 'Litiges marché privé/public — l\'IA n\'est pas un avocat' },
];

const courseSchema = buildClaudeIaChatCoworkCodeSkillsBtpJsonLd();
const faqSchema = getFAQSchema(FAQ_CLAUDE_IA_SKILLS_BTP);

const breadcrumbTrail = (
  <Breadcrumb
    jsonLdId="schema-breadcrumb-formation-claude-ia-btp"
    items={[
      { label: 'Accueil', href: LINKS.home },
      { label: 'Formations', href: LINKS.formations },
      { label: 'Claude IA pour le BTP', href: PATH },
    ]}
  />
);

export default function FormationClaudeIaBtpPage() {
  return (
    <div>
      <JsonLd id="schema-course-claude-ia-btp" schema={courseSchema} />
      <JsonLd id="schema-faq-claude-ia-btp" schema={faqSchema} />

      <FormationCourseHero
        catalogueRef={CATALOGUE_REF}
        breadcrumb={breadcrumbTrail}
        refLine={`Intra-entreprise · présentiel Île-de-France · ${SESSION_DUREE_MATIN_NIV04} · skills sur-mesure`}
        title="Claude IA pour le BTP : Chat, Cowork & Code"
        subtitle="L'IA au service de l'administratif et de la gestion de chantier — skills sur-mesure (AO · chantier · juridique)"
        badges={['Présentiel Île-de-France', 'Skills sur-mesure', 'Qualiopi']}
        summaryItems={HERO_RESUME}
        heroVisual="catalogue"
        ctas={
          <>
            <RdvLink
              campaign="formations-claude-ia-btp-hero"
              className="rounded-lg bg-[var(--accent)] px-6 py-3.5 text-center font-semibold text-white hover:bg-blue-600"
            >
              Réservez votre visio découverte gratuite
            </RdvLink>
            <a
              href={PDF_HREF}
              download
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-slate-200 px-6 py-3.5 font-semibold text-slate-800 hover:border-[var(--accent)]"
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
          <strong>Formation IA BTP</strong> avec <strong>Claude Chat</strong>, <strong>Cowork</strong> et{' '}
          <strong>Claude Code</strong> : déployez des <strong>skills sur-mesure</strong> sur l&apos;administratif,
          les <strong>appels d&apos;offres</strong> (RC, DCE/DQE), la <strong>gestion de chantier</strong> (CCTP, CR,
          réserves) et le juridique marché de travaux — sur vos dossiers réels, avec validation humaine. Public :
          dirigeants PME BTP, conducteurs de travaux, chargés d&apos;affaires, bureaux d&apos;études et fonctions
          support. Complément des parcours{' '}
          <Link href={LINKS.formationAO} className="font-medium text-[var(--accent)] hover:underline">
            formation IA appels d&apos;offres BTP
          </Link>{' '}
          et{' '}
          <Link
            href={LINKS.formationConduiteTravauxSuiviChantier}
            className="font-medium text-[var(--accent)] hover:underline"
          >
            formation IA chantier
          </Link>
          . {MODALITE_FORMATIONS_PRESENTIEL}
        </p>
      </FormationCourseHero>

      <FormationProgrammePdfDownloadBanner
        pdfHref={PDF_HREF}
        catalogueRef={CATALOGUE_REF}
        formationTitle="Claude IA pour le BTP : Chat, Cowork & Code"
      />
      <FormationProgrammePdfViewer
        pdfHref={PDF_HREF}
        catalogueRef={CATALOGUE_REF}
        formationTitle="Claude IA pour le BTP : Chat, Cowork & Code"
      />

      <div className="mx-auto max-w-4xl px-4 py-16">
        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
          <h2 className="font-display text-xl font-bold text-slate-900">Informations pratiques</h2>
          <p className="mt-4 text-slate-700 leading-relaxed">
            Session intra-entreprise en <strong>présentiel — région Île-de-France</strong> (dans vos locaux).
            Date à planifier selon vos disponibilités. Références : FFB Grand Paris, FFB Île-de-France, CSFE, CAPEB,
            CNAM Entreprise, Lefebvre Dalloz.
          </p>
          <ul className="mt-4 space-y-2 text-slate-700">
            <li className="flex gap-2">
              <Users className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>Public :</strong> direction, responsable bureau d&apos;études, géomètre-métreur,
                conducteurs de travaux, chef de chantier, administratif.
              </span>
            </li>
            <li className="flex gap-2">
              <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>Format :</strong> action intra-entreprise — <strong>{SESSION_DUREE_MATIN_NIV04}</strong>{' '}
                (9h00–13h00), 70 % pratique / 30 % théorie. {LIBELLE_EFFECTIF_GROUPE_NIV03}.
              </span>
            </li>
            <li className="flex gap-2">
              <FileText className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>Prérequis :</strong> savoir utiliser un ordinateur, bonne maîtrise du français. Aucun
                prérequis IA. Apporter des dossiers réels (AO, CCTP, CR, PV).
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
          <p className="mt-4 text-slate-700 leading-relaxed">
            À l&apos;issue de cette <strong>formation Claude IA bâtiment</strong>, les participants repartent avec
            les skills installés, des livrables sur leurs dossiers réels et un plan de déploiement à 30 jours.
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

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold text-slate-900">Skills Claude BTP abordés en session</h2>
          <p className="mt-4 text-slate-700 leading-relaxed">
            Les cas d&apos;usage des skills sont adaptés en fonction de vos besoins, de votre métier et de vos
            dossiers réels. Chaque skill est installé sur les postes (Settings → Capabilities → Skills).
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="p-3 text-left font-semibold text-slate-900">Skill</th>
                  <th className="p-3 text-left font-semibold text-slate-900">Usage métier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {SKILLS_LIST.map((skill) => (
                  <tr key={skill.name}>
                    <td className="p-3 font-medium text-slate-800">{skill.name}</td>
                    <td className="p-3 text-slate-600">{skill.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section
          id="rdv"
          className="mt-12 scroll-mt-24 rounded-2xl bg-[#377CF3] px-6 py-10 text-center text-white md:px-10"
        >
          <h2 className="font-display text-2xl font-bold">Réservez votre visio découverte gratuite</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/90 leading-relaxed">
            30 minutes en visio pour cadrer vos besoins (AO, chantier, administratif) et vérifier l&apos;éligibilité
            Constructys — devis sous 24 h.
          </p>
          <RdvLink
            campaign="formations-claude-ia-btp-mid-cta"
            ctaPosition="middle"
            ctaId="mid-rdv"
            className="mt-6 inline-flex rounded-lg bg-white px-8 py-3.5 font-semibold text-[#377CF3] hover:bg-slate-100"
          >
            Réservez votre visio découverte gratuite
          </RdvLink>
        </section>

        <section id="programme" className="mt-12 scroll-mt-24">
          <h2 className="font-display text-2xl font-bold text-slate-900">Programme détaillé</h2>
          <p className="mt-2 text-sm text-slate-600">
            4 modules de 60 minutes — total 4 h le matin — travail sur vos documents réels. Les cas d&apos;usage
            des skills sont adaptés à votre métier. Relecture humaine obligatoire avant tout envoi client ou marché.
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
          <h2 className="font-display text-xl font-bold text-slate-900">Évaluation, attestation &amp; tarification</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            <li>
              <strong>Évaluation :</strong> exercices pratiques sur documents réels, questionnaire de satisfaction
              à chaud, attestation individuelle Qualiopi.
            </li>
            <li>
              <strong>Durée :</strong> {SESSION_DUREE_MATIN_NIV04} · <strong>Effectif :</strong>{' '}
              {LIBELLE_EFFECTIF_GROUPE_NIV03} · <strong>Tarif :</strong> intra sur devis — TVA exonérée art.
              261-4-4° CGI · <strong>Financement :</strong>{' '}
              <Link href={LINKS.financement} className="font-medium text-[var(--accent)] hover:underline">
                OPCO Constructys
              </Link>{' '}
              selon éligibilité.
            </li>
            <li>
              <strong>Accessibilité :</strong> référente handicap —{' '}
              <a href={`mailto:${SITE_CONFIG.email}`} className="font-medium text-[var(--accent)] hover:underline">
                {SITE_CONFIG.email}
              </a>
              .
            </li>
          </ul>
        </section>

        <FAQSection
          items={FAQ_CLAUDE_IA_SKILLS_BTP}
          title="Questions fréquentes — formation Claude IA BTP"
          subtitle="Prérequis, financement OPCO, skills et différences avec ChatGPT."
        />

        <div className="mt-12">
          <AuthorBio schemaScriptId="author-bio-formation-claude-ia-btp" />
        </div>

        <ContextualLinksSection
          title="Pages associées"
          subtitle="formations appels d'offres, chantier, financement OPCO."
          links={FORMATION_CLAUDE_SKILLS_BTP_RELATED}
          tone="muted"
        />

        <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
          <h2 className="font-display text-xl font-bold text-slate-900">Prendre rendez-vous</h2>
          <p className="mt-3 text-slate-600">
            Visio découverte gratuite de 30 min — cadrage de votre session intra en Île-de-France.
          </p>
          <RdvLink
            campaign="formations-claude-ia-btp-footer"
            ctaPosition="footer"
            ctaId="footer-rdv"
            variant="primary"
            className="mt-6 rounded-lg px-8 py-3.5"
          >
            Réservez votre visio découverte gratuite
          </RdvLink>
        </section>

        <div className="mt-10">
          <AllerPlusLoin
            links={[
              { href: LINKS.formations, label: 'Catalogue formations IA BTP' },
              {
                href: buildSiteCalendlyCtaUrl('formations-claude-ia-btp-footer-rdv'),
                label: 'Réservez votre visio découverte gratuite',
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
