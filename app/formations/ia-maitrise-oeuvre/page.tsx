import Link from 'next/link';
import Image from 'next/image';
import { Check, Download, Mail, Phone } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { QualiopiLogoInline } from '@/components/QualiopiLogo';
import {
  FormationCourseHero,
} from '@/components/formations/FormationCourseHero';
import { FormationCatalogueIndicateur1Suite } from '@/components/formations/FormationCatalogueIndicateur1Suite';
import { LINKS } from '@/lib/internal-links';
import { PHOTOS } from '@/lib/photos';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';
import { SOCIAL_PROOF, CONTACT } from '@/lib/constants';
import {
  libelleTarifsDualCourt,
  MENTIONS_TVA_REGIMES_COURT,
  TARIF_SESSION_AVANCE_HT,
} from '@/lib/tarifs-sessions';
import {
  getFormationByCode,
  libelleDureeFormation,
  libelleEffectifFormation,
  libellePrixSessionHt,
} from '@/data/formations';
import { PREREQUIS_NIV05 } from '@/lib/infos-pratiques-catalogue';
import { getFormationCatalogueVisuel } from '@/lib/formations-catalogue-display';
import { buildCatalogueCourseMaitriseOeuvreNiv05JsonLd } from '@/lib/schema-catalogue-course-jsonld';
import {
  FINANCEMENT_CONSTRUCTYS_PLAFONDS_COURT,
  FINANCEMENT_FORMULATION_COURTE,
  FINANCEMENT_FORMULATION_PRUDENTE,
  FINANCEMENT_STAT_LABEL,
} from '@/lib/financement-copy';
import { AUTHOR_HEADSHOT_OBJECT_POSITION } from '@/lib/author-headshot';
import { RelatedLinks } from '@/components/RelatedLinks';
import { FormationCatalogueGeoSections } from '@/components/formations/FormationCatalogueGeoSections';
import { getFormationCatalogueSeo } from '@/lib/formation-catalogue-seo';

const CATALOGUE_SEO = getFormationCatalogueSeo('NIV-05');

const FORMATION = getFormationByCode('NIV-05')!;
const PATH = LINKS.formationIaMaitriseOeuvre;
const PDF_HREF = FORMATION.pdfProgramme;
const PDF_DOWNLOAD_NAME = 'programme_OFC_IA_MOE_4h.pdf';
const PHONE_DISPLAY = CONTACT.phoneDisplay;
const PHONE_TEL = CONTACT.phone;

const DUREE_LIBELLE = libelleDureeFormation(FORMATION);
const EFFECTIF_LIBELLE = libelleEffectifFormation(FORMATION);
const PRIX_LIBELLE = libellePrixSessionHt(FORMATION);
const TARIFS_DUAL = libelleTarifsDualCourt(4);

const CATALOGUE_VISUEL = getFormationCatalogueVisuel('NIV-05');

export const metadata = createPageMetadata({
  title: CATALOGUE_SEO.metaTitle,
  titleAbsolute: `${CATALOGUE_SEO.metaTitle} | Laure Olivié`,
  description: CATALOGUE_SEO.metaDescription,
  path: PATH,
  openGraphType: 'website',
  openGraphTitle: 'Formation IA maîtres d\'œuvre MOEX — organisme certifié Qualiopi',
  openGraphDescription:
    `Formation IA & ChatGPT pour la maîtrise d'œuvre d'exécution : analyse DCE, comptes rendus de chantier, OS et courriers, suivi des réserves. 4h, ${FINANCEMENT_FORMULATION_COURTE} Organisme certifié Qualiopi.`,
  alternatesLanguages: { 'fr-FR': `${SITE_CONFIG.url}${PATH}` },
  image: {
    url: CATALOGUE_VISUEL.src,
    width: CATALOGUE_VISUEL.width,
    height: CATALOGUE_VISUEL.height,
    alt: CATALOGUE_VISUEL.alt,
  },
});

const HERO_BADGES = [
  '4 h effectives',
  EFFECTIF_LIBELLE,
  '70 % pratique',
  FINANCEMENT_STAT_LABEL,
];

const HERO_RESUME = [
  `Session ${DUREE_LIBELLE} — maîtrise d'œuvre d'exécution, 5 modules opérationnels avec introduction à Claude.`,
  `Forfait ${PRIX_LIBELLE}. ${MENTIONS_TVA_REGIMES_COURT}`,
  `${EFFECTIF_LIBELLE.charAt(0).toUpperCase() + EFFECTIF_LIBELLE.slice(1)} — intra-entreprise, dans vos locaux, présentiel Île-de-France.`,
  `${FINANCEMENT_FORMULATION_PRUDENTE} ${FINANCEMENT_CONSTRUCTYS_PLAFONDS_COURT} Les abonnements Claude Pro et ChatGPT Plus ne sont pas inclus.`,
];

type ProgrammeModule = {
  heading: string;
  duree: string;
  objectifs: string[];
  livrable: string;
};

const PROGRAMME_MODULES: ProgrammeModule[] = [
  {
    heading: 'Accueil — positionnement',
    duree: '5 min',
    objectifs: [
      'Accueil, émargement, présentation des objectifs et recueil des attentes',
      'Auto-positionnement d\'entrée sur les objectifs visés',
    ],
    livrable: 'Attentes recueillies et cadrage de session posé',
  },
  {
    heading: 'Module 0 — Introduction à Claude, l\'écosystème Anthropic',
    duree: '30 min',
    objectifs: [
      'Claude vs ChatGPT : pour quel usage MOE choisir l\'un ou l\'autre — rigueur, confidentialité par défaut',
      'Tour d\'horizon : Projets, connecteurs (drive, messagerie, agenda), skills, tâches planifiées, Cowork',
      'Limites de contexte — comprendre la capacité d\'une conversation pour ne pas être bloqué',
    ],
    livrable: 'Mémo « Claude pour la maîtrise d\'œuvre » (1 page recto-verso) — quand utiliser Claude ou ChatGPT',
  },
  {
    heading: 'Module 1 — Analyse des offres et conformité avec l\'IA',
    duree: '50 min',
    objectifs: [
      'Lecture rapide CCTP, CCAP, CCAG, bordereaux — points de vigilance et incohérences entre pièces',
      'Import du DCE dans un Projet (via connecteur drive) — base interrogeable',
      'Construction d\'une fiche de synthèse (30 points clés) en moins de 15 minutes sur un DCE réel',
      'Contrôle des extractions par retour aux pièces sources',
    ],
    livrable: 'Fiche-type d\'analyse DCE (30 points) + 10 prompts prêts à l\'emploi',
  },
  {
    heading: 'Module 2 — Comptes rendus de chantier en 10 minutes',
    duree: '50 min',
    objectifs: [
      'Trame MOE : présents / excusés, avancement par corps d\'état, réserves, décisions, prochaines échéances',
      'Dictée vocale sur smartphone → transcription → mise en forme automatique',
      'Photos de chantier : légendes et intégration dans le CR — gestion des versions et historique des réserves',
    ],
    livrable: 'Gabarit CR de chantier MOE + prompt de transcription vocale — gain mesuré : 45 min à 10 min par CR',
  },
  {
    heading: 'Module 3 — Courriers, ordres de service et actes administratifs',
    duree: '50 min',
    objectifs: [
      'Bibliothèque IA d\'actes MOE : OS (démarrage, arrêt, modification, reprise), courriers types, PV, avenants',
      'Production d\'un OS complet en moins de 5 minutes à partir d\'un contexte chantier',
      'Contrôle juridique minimal (références CCAG, délais de notification) — 3 modèles personnalisés réutilisables',
    ],
    livrable: 'Pack de 15 modèles d\'actes administratifs MOE (OS, courriers, avenants) + prompt de rédaction juridique',
  },
  {
    heading: 'Module 4 — Réserves, réception et suivi client',
    duree: '50 min',
    objectifs: [
      'Saisie terrain : photo + dictée → fiche de réserve structurée — suivi automatisé et relances entreprises',
      'Préparation d\'un pré-PV de réception : inventaire, cotation, classement par corps d\'état',
      'Réponses clients et acquéreurs (TMA, désordres), visites cloisons, pré-livraison, livraison — suivi GPA',
    ],
    livrable: 'Modèle de suivi des réserves + tableau GPA + 8 prompts pour réponses clients standardisées',
  },
  {
    heading: 'Clôture — bilan et plan d\'action',
    duree: '5 min',
    objectifs: [
      'Auto-positionnement de sortie et plan d\'action individuel à 30 jours',
      'Questionnaire de satisfaction et remise des attestations',
    ],
    livrable: 'Plan d\'action individuel + attestation individuelle de fin de formation',
  },
];

const courseSchema = buildCatalogueCourseMaitriseOeuvreNiv05JsonLd();

export default function FormationIaMaitriseOeuvrePage() {
  return (
    <div>
      <JsonLd id="schema-course-niv-05" schema={courseSchema} />

      <FormationCourseHero
        catalogueRef="NIV-05"
        programmePdfAfterHero={false}
        refLine={`Intra · inter · présentiel en Île-de-France · ${DUREE_LIBELLE} · ${FORMATION.niveauLabel}`}
        title={CATALOGUE_SEO.h1}
        subtitle={CATALOGUE_SEO.subtitle}
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
          </>
        }
      >
        <p>
          <strong>Formation IA pour la maîtrise d&apos;œuvre d&apos;exécution (MOEX)</strong> : analyse DCE,
          comptes rendus de chantier, ordres de service, courriers et suivi des réserves — avec Claude et ChatGPT,
          en respectant la confidentialité des données chantier. Aucun prérequis IA : abonnements Claude Pro et
          ChatGPT Plus requis sur chaque poste.
        </p>
      </FormationCourseHero>

      <FormationCatalogueGeoSections
        catalogueRef="NIV-05"
        ressourcesGratuites={[
          { href: LINKS.formationIaConducteurTravauxLanding, label: 'Guide IA conducteur de travaux' },
          { href: LINKS.guideRepondreAoBtpOfc2026, label: 'Guide répondre aux AO BTP — 5 étapes' },
        ]}
      />

      <section id="programme" className="scroll-mt-24 border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Programme de la formation IA maîtrise d&apos;œuvre — 5 modules
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            4 heures effectives — 70&nbsp;% pratique / 30&nbsp;% théorie — alternance théorie courte et ateliers
            sur cas réels MOE apportés par les participants (anonymisés si besoin). Chaque module produit un
            livrable réutilisable sur vos chantiers dès le lendemain.
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
                <p className="mt-3 text-xs font-semibold uppercase text-slate-500">Contenu</p>
                <ul className="mt-2 space-y-1 text-sm text-slate-600">
                  {mod.objectifs.map((o) => (
                    <li key={o}>▸ {o}</li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">Livrable :</span> {mod.livrable}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FormationCatalogueIndicateur1Suite programmeRef="NIV-05" />

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
          <p className="mt-4 text-slate-700 leading-relaxed">
            Horaires : demi-journée matin (9h00–13h00) ou après-midi (13h30–17h30) — 4 heures effectives,
            70&nbsp;% pratique sur vos dossiers réels (DCE, CR, OS, réserves).
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold text-slate-900">Prérequis</h2>
          <p className="mt-4 text-slate-700 leading-relaxed">{PREREQUIS_NIV05}</p>
          <p className="mt-4 text-slate-700 leading-relaxed">
            Moyens requis : un poste informatique par participant avec accès internet et abonnements actifs —
            salle équipée d&apos;un vidéoprojecteur, fournie par le client.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold text-slate-900">Objectifs pédagogiques</h2>
          <p className="mt-4 text-slate-700 leading-relaxed">
            À l&apos;issue de la formation, les participants seront capables de :
          </p>
          <ul className="mt-4 space-y-2 text-slate-700">
            {FORMATION.objectifs.map((o) => (
              <li key={o} className="flex gap-2">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
                {o}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12 rounded-2xl border border-[var(--accent)] bg-[var(--accent-soft)] p-6 md:p-8">
          <h2 className="font-display text-xl font-bold text-slate-900">Infos pratiques</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            <li>
              <strong>Durée :</strong> 4 heures effectives (demi-journée — {FORMATION.horaires}).
            </li>
            <li>
              <strong>Public :</strong> {FORMATION.public}.
            </li>
            <li>
              <strong>Modalité :</strong> présentiel intra-entreprise, dans vos locaux. 70&nbsp;% pratique
              / 30&nbsp;% théorie.
            </li>
            <li>
              <strong>Tarif :</strong> {TARIFS_DUAL}. {MENTIONS_TVA_REGIMES_COURT}
            </li>
            <li>
              <strong>Financement :</strong> {FINANCEMENT_FORMULATION_PRUDENTE} {FINANCEMENT_CONSTRUCTYS_PLAFONDS_COURT}
              Les abonnements Claude Pro et ChatGPT Plus ne sont pas inclus dans le tarif.
            </li>
            <li>
              <strong>Supports remis :</strong> mémo « Claude pour la maîtrise d&apos;œuvre », bibliothèque de prompts
              MOE, fiche-type d&apos;analyse DCE, gabarit de CR, pack de modèles d&apos;actes administratifs, modèles
              de suivi des réserves et tableau GPA.
            </li>
            <li>
              <strong>Évaluation :</strong> auto-positionnement entrée/sortie, livrables par module, questionnaire à
              chaud et à froid (J+30).
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
            
              quality={70}
              loading="lazy"/>
            <div className="min-w-0 flex-1">
              <p className="text-lg font-semibold text-slate-900">Laure Olivié</p>
              <p className="mt-1 text-slate-700">
                Experte IA &amp; BTP — formatrice au sein d'un organisme certifié{' '}
                <span className="inline-flex items-center gap-1">
                  Qualiopi
                  <QualiopiLogoInline heightPx={16} />
                </span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Fondatrice d&apos;OFC Création d&apos;Entreprise. Dirigeante d&apos;une entreprise de Travaux Publics dans les Yvelines (ALIA BTP,
                2017-2024). Organisme certifié Qualiopi.
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

        <RelatedLinks path={PATH} className="mt-12 !px-0" tone="transparent" />

        <section
          id="contact"
          className="mt-12 scroll-mt-24 rounded-2xl border border-[var(--accent)] bg-[#377CF3] p-6 text-white md:p-8"
        >
          <h2 className="font-display text-2xl font-bold">Réservez votre session</h2>
          <p className="mt-4 text-white/90">
            Demandez un devis ou planifiez votre session intra-entreprise, dans vos locaux — réponse sous 24 h ouvrées.
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
            Organisme certifié Qualiopi
            <QualiopiLogoInline heightPx={20} alt="" />
          </p>
        </section>
      </div>
    </div>
  );
}
