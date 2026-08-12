import Link from 'next/link';
import Image from 'next/image';
import { Check, Download, Mail, Phone } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { QualiopiLogoInline } from '@/components/QualiopiLogo';
import {
  FormationCourseHero,
} from '@/components/formations/FormationCourseHero';
import { LINKS } from '@/lib/internal-links';
import { PHOTOS } from '@/lib/photos';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';
import { SOCIAL_PROOF, CONTACT } from '@/lib/constants';
import {
  SESSION_DUREE_LIBELLE,
  TARIF_SESSION_AVANCE_HT,
  formatTarifHt,
} from '@/lib/tarifs-sessions';
import { PrerequisNiveau2 } from '@/components/formation/PrerequisNiveau2';
import { getFormationCatalogueVisuel } from '@/lib/formations-catalogue-display';
import { buildCatalogueCourseMaitriseOeuvreNiv05JsonLd } from '@/lib/schema-catalogue-course-jsonld';
import {
  FINANCEMENT_CONSTRUCTYS_PLAFONDS_COURT,
  FINANCEMENT_FORMULATION_COURTE,
  FINANCEMENT_FORMULATION_PRUDENTE,
  FINANCEMENT_STAT_LABEL,
} from '@/lib/financement-copy';
import { AUTHOR_HEADSHOT_OBJECT_POSITION } from '@/lib/author-headshot';
import { CatalogueInfosQualiopi } from '@/components/formation/InfosQualiopi';
import { RelatedLinks } from '@/components/RelatedLinks';

const PATH = LINKS.formationIaMaitriseOeuvre;
const PDF_HREF = LINKS.pdfProgrammeIaMaitriseOeuvre;
const PHONE_DISPLAY = CONTACT.phoneDisplay;
const PHONE_TEL = CONTACT.phone;

const CATALOGUE_VISUEL = getFormationCatalogueVisuel('NIV-05');

export const metadata = createPageMetadata({
  title: 'Formation IA maîtres d\'œuvre MOEX — Qualiopi',
  titleAbsolute: 'Formation IA maîtres d\'œuvre MOEX — Qualiopi',
  description:
    `Formation IA & ChatGPT pour la maîtrise d'œuvre d'exécution : analyse DCE, comptes rendus de chantier, OS et courriers, suivi des réserves. 4h, ${FINANCEMENT_FORMULATION_COURTE} Certifiée Qualiopi.`,
  path: PATH,
  openGraphType: 'website',
  openGraphTitle: 'Formation IA maîtres d\'œuvre MOEX — Qualiopi',
  openGraphDescription:
    `Formation IA & ChatGPT pour la maîtrise d'œuvre d'exécution : analyse DCE, comptes rendus de chantier, OS et courriers, suivi des réserves. 4h, ${FINANCEMENT_FORMULATION_COURTE} Certifiée Qualiopi.`,
  alternatesLanguages: { 'fr-FR': `${SITE_CONFIG.url}${PATH}` },
  image: {
    url: CATALOGUE_VISUEL.src,
    width: CATALOGUE_VISUEL.width,
    height: CATALOGUE_VISUEL.height,
    alt: CATALOGUE_VISUEL.alt,
  },
});

const HERO_BADGES = [
  '4h de formation',
  '3 à 8 participants',
  FINANCEMENT_STAT_LABEL,
  `${SOCIAL_PROOF.AVERAGE_RATING} satisfaction`,
];

const HERO_RESUME = [
  `Session ${SESSION_DUREE_LIBELLE} — maîtrise d'œuvre d'exécution, 5 modules opérationnels.`,
  `Forfait ${formatTarifHt(TARIF_SESSION_AVANCE_HT)} € HT — TVA exonérée (art. 261-4-4° CGI).`,
  '3 à 8 participants — intra ou inter, présentiel Île-de-France.',
  `${FINANCEMENT_FORMULATION_PRUDENTE} ${FINANCEMENT_CONSTRUCTYS_PLAFONDS_COURT}`,
];

const OBJECTIFS_PEDAGOGIQUES = [
  'Identifier les fonctionnalités clés de Claude (Projets, Connecteurs, Skills, Cowork) et choisir entre Claude et ChatGPT selon le cas d\'usage MOE.',
  'Analyser un dossier d\'appel d\'offres (DCE, CCTP, bordereau) avec l\'IA pour en extraire les points de conformité et les alertes contractuelles.',
  'Rédiger un compte rendu de chantier complet en moins de 10 minutes à partir de notes vocales.',
  'Produire courriers, ordres de service et actes administratifs conformes à partir d\'un modèle IA structuré.',
  'Organiser le suivi des réserves, la préparation de réception et le suivi client avec un assistant IA dédié.',
  'Utiliser ChatGPT et Claude en autonomie, en respectant la confidentialité des données chantier.',
];

type ProgrammeModule = {
  heading: string;
  duree: string;
  livrable: string;
};

const PROGRAMME_MODULES: ProgrammeModule[] = [
  {
    heading: 'Module 0 — Introduction à Claude, l\'écosystème Anthropic',
    duree: '30 min',
    livrable: 'mémo « Claude pour la maîtrise d\'œuvre »',
  },
  {
    heading: 'Module 1 — Analyse des offres et conformité avec l\'IA',
    duree: '50 min',
    livrable: 'fiche-type d\'analyse DCE (30 points) + 10 prompts',
  },
  {
    heading: 'Module 2 — Comptes rendus de chantier en 10 minutes',
    duree: '50 min',
    livrable: 'gabarit CR de chantier MOE + prompt de transcription vocale',
  },
  {
    heading: 'Module 3 — Courriers, ordres de service et actes administratifs',
    duree: '50 min',
    livrable: 'pack de 15 modèles d\'actes administratifs MOE',
  },
  {
    heading: 'Module 4 — Réserves, réception et suivi client',
    duree: '50 min',
    livrable: 'modèle de suivi des réserves + tableau GPA + 8 prompts',
  },
];

const courseSchema = buildCatalogueCourseMaitriseOeuvreNiv05JsonLd();

export default function FormationIaMaitriseOeuvrePage() {
  return (
    <div>
      <JsonLd id="schema-course-niv-05" schema={courseSchema} />

      <FormationCourseHero
        catalogueRef="NIV-05"
        refLine={`Intra · inter · présentiel en Île-de-France · ${SESSION_DUREE_LIBELLE} · Niveau 2`}
        title="L'IA au service des maîtres d'œuvre"
        subtitle="Maîtrise d'œuvre d'exécution — 5 modules opérationnels, en une demi-journée"
        badges={HERO_BADGES}
        summaryItems={HERO_RESUME}
        ctas={
          <>
            <a
              href="#contact"
              className="rounded-xl bg-[var(--accent)] px-6 py-3.5 text-center font-semibold text-white hover:bg-blue-600"
            >
              Demander un devis
            </a>
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
          </>
        }
      >
        <p>
          <strong>Formation IA pour la maîtrise d&apos;œuvre d&apos;exécution (MOEX)</strong> : analyse DCE,
          comptes rendus de chantier, ordres de service, courriers et suivi des réserves — avec Claude et ChatGPT,
          en respectant la confidentialité des données chantier.
        </p>
      </FormationCourseHero>

      <div className="mx-auto max-w-4xl px-4 py-16">
        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
          <h2 className="font-display text-xl font-bold text-slate-900">
            À qui s&apos;adresse cette formation IA pour maîtres d&apos;œuvre ?
          </h2>
          <p className="mt-4 text-slate-700 leading-relaxed">
            Cette formation s&apos;adresse aux <strong>maîtres d&apos;œuvre d&apos;exécution (MOEX)</strong>,
            conducteurs de travaux, OPC, bureaux d&apos;études et assistant(e)s de gestion travaux — sur tous types
            d&apos;opérations : logements, tertiaire, réhabilitation.
          </p>
        </section>

        <PrerequisNiveau2 asSection />

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold text-slate-900">Objectifs pédagogiques</h2>
          <p className="mt-4 text-slate-700 leading-relaxed">
            À l&apos;issue de la formation, les participants seront capables de :
          </p>
          <ul className="mt-4 space-y-2 text-slate-700">
            {OBJECTIFS_PEDAGOGIQUES.map((o) => (
              <li key={o} className="flex gap-2">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
                {o}
              </li>
            ))}
          </ul>
        </section>

        <section id="programme" className="mt-12 scroll-mt-24">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Programme de la formation IA maîtrise d&apos;œuvre — 5 modules
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            {SESSION_DUREE_LIBELLE} effectives — 70&nbsp;% pratique / 30&nbsp;% théorie — travail sur vos documents
            réels (anonymisés si besoin).
          </p>
          <div className="mt-8 space-y-6">
            {PROGRAMME_MODULES.map((mod) => (
              <div
                key={mod.heading}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold text-slate-900">{mod.heading}</h3>
                  <span className="text-sm font-medium text-[var(--accent)]">{mod.duree}</span>
                </div>
                <p className="mt-4 text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">Livrable :</span> {mod.livrable}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-2xl border border-[var(--accent)] bg-[var(--accent-soft)] p-6 md:p-8">
          <h2 className="font-display text-xl font-bold text-slate-900">Infos pratiques</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            <li>
              <strong>Durée :</strong> 4 heures effectives (demi-journée).
            </li>
            <li>
              <strong>Public :</strong> maîtres d&apos;œuvre d&apos;exécution (MOEX), conducteurs de travaux, OPC,
              BET, assistant(e)s de gestion travaux.
            </li>
            <li>
              <PrerequisNiveau2 />
            </li>
            <li>
              <strong>Modalité :</strong> présentiel, en intra-entreprise ou en inter-entreprises. 70&nbsp;% pratique
              / 30&nbsp;% théorie.
            </li>
            <li>
              <strong>Tarif :</strong> {formatTarifHt(TARIF_SESSION_AVANCE_HT)} € HT — TVA exonérée (art.
              261-4-4° CGI).
            </li>
            <li>
              <strong>Financement :</strong> {FINANCEMENT_FORMULATION_PRUDENTE} {FINANCEMENT_CONSTRUCTYS_PLAFONDS_COURT}
            </li>
          </ul>
        </section>

        <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
          <h2 className="font-display text-xl font-bold text-slate-900">Votre formatrice</h2>
          <div className="mt-6 flex flex-col items-start gap-6 sm:flex-row">
            <Image
              src={PHOTOS.siteAvatar.src}
              alt={PHOTOS.siteAvatar.alt}
              width={120}
              height={120}
              className={`h-[120px] w-[120px] shrink-0 rounded-full border-2 border-[#D4E3FC] object-cover ${AUTHOR_HEADSHOT_OBJECT_POSITION} shadow-md`}
              sizes="120px"
            />
            <div className="min-w-0 flex-1">
              <p className="text-lg font-semibold text-slate-900">Laure Olivié</p>
              <p className="mt-1 text-slate-700">
                Experte IA &amp; BTP — formatrice certifiée{' '}
                <span className="inline-flex items-center gap-1">
                  Qualiopi
                  <QualiopiLogoInline heightPx={16} />
                </span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Fondatrice d&apos;OFC Création d&apos;Entreprise. Dirigeante d&apos;une entreprise de Travaux Publics dans les Yvelines (ALIA BTP,
                2017-2024). Plus de {SOCIAL_PROOF.PROFESSIONALS_TRAINED} professionnels formés — note de satisfaction{' '}
                {SOCIAL_PROOF.AVERAGE_RATING}/5.
              </p>
              <Link
                href={LINKS.aPropos}
                className="mt-3 inline-block text-sm font-medium text-[var(--accent)] hover:underline"
              >
                Voir le parcours complet →
              </Link>
            </div>
          </div>
        </section>

        <CatalogueInfosQualiopi programmeRef="NIV-05" />

        <RelatedLinks path={PATH} className="mt-12 !px-0" tone="transparent" />

        <section
          id="contact"
          className="mt-12 scroll-mt-24 rounded-2xl border border-[var(--accent)] bg-[#377CF3] p-6 text-white md:p-8"
        >
          <h2 className="font-display text-2xl font-bold">Réservez votre session</h2>
          <p className="mt-4 text-white/90">
            Demandez un devis ou planifiez votre session intra ou inter — réponse sous 24 h ouvrées.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <a
              href={`mailto:${SITE_CONFIG.email}?subject=Devis%20formation%20IA%20ma%C3%AEtrise%20d%27%C5%93uvre`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-[#377CF3] hover:bg-[#F2F2F2]"
            >
              <Mail size={20} strokeWidth={1.5} aria-hidden />
              {SITE_CONFIG.email}
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/80 px-6 py-3.5 font-semibold text-white hover:bg-white/10"
            >
              <Phone size={20} strokeWidth={1.5} aria-hidden />
              {PHONE_DISPLAY}
            </a>
          </div>
          <p className="mt-6 flex flex-wrap items-center gap-2 text-sm text-white/90">
            Certifié Qualiopi
            <QualiopiLogoInline heightPx={20} alt="" />
          </p>
        </section>
      </div>
    </div>
  );
}
