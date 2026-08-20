import Link from 'next/link';
import { FooterTelOrMailLink, InlinePublicPhoneLink } from '@/components/PublicPhoneCta';
import { RdvLink } from '@/components/RdvLink';
import {
  Check,
  Phone,
  Mail,
  Clock,
  MapPin,
  Users,
  FileText,
  Award,
  DollarSign,
  FolderOpen,
  Bot,
  ClipboardList,
  Laptop,
  Monitor,
  ArrowRight,
  Sparkles,
  UserCircle,
  Download,
} from 'lucide-react';
import { ProgrammeAccordionBatiment } from '@/components/formations/ProgrammeAccordionBatiment';
import { FAQSection } from '@/components/landing/FAQSection';
import { JsonLd } from '@/components/JsonLd';
import {
  createPageMetadata,
  getFAQSchema,
  SITE_CONFIG,
  siteHasPublicPhone,
} from '@/lib/seo';
import { FAQ_BATIMENT } from '@/lib/faq';
import {
  FormationCourseHero,
} from '@/components/formations/FormationCourseHero';
import {
  SESSION_DUREE_LIBELLE,
  TARIF_FORFAIT_DEBUTANT_HT,
  MODALITE_FORMATIONS_PRESENTIEL,
  COMPTES_IA_GRATUITS_NIVEAU_DEBUTANT,
  LIBELLE_EFFECTIF_GROUPE,
  LIBELLE_EFFECTIF_GROUPE_COURT,

  formatTarifHt,
  libelleTarifSessionForfaitaire,
} from '@/lib/tarifs-sessions';
import { GAINS_TEMPS_MENTION_PRUDENCE } from '@/lib/gains-temps-copy';
import { QUALIOPI_CERTIFICAT_REALISATION } from '@/config/qualiopi';
import { getFormationCatalogueVisuel } from '@/lib/formations-catalogue-display';
import { LINKS } from '@/lib/internal-links';
import { ContextualLinksSection } from '@/components/layout/ContextualLinksSection';
import { CatalogueInfosPratiques } from '@/components/InfosPratiques';
import { RelatedLinks } from '@/components/RelatedLinks';
import { getClusterRelatedHrefs } from '@/lib/maillage-clusters';
import { FORMATION_NIV01_RELATED } from '@/lib/contextual-internal-links';
import { buildCatalogueCourseIaBtpNiv01JsonLd } from '@/lib/schema-catalogue-course-jsonld';
import { formatPersonnesFormeesCount, getStatsFreshnessLabel, siteStats } from '@/lib/constants';

/** Title ≤ 60 car. — catalogue niveau 1 bâtiment & TP */
const SEO_TITLE =
  'Formation IA bâtiment & travaux publics (niveau 1)';

/** Meta description — formation IA pour les pros du BTP (150–160 car., finale). */
const SEO_DESCRIPTION =
  "L'IA au service du bâtiment & TP : devis, emails et CR chantier en 4 h, présentiel IDF. Qualiopi, Constructys selon éligibilité. Programme PDF et RDV.";

const MAIL_PROGRAMME =
  `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent('Demande de programme — formation IA niveau 1 bâtiment & TP')}`;
const MAIL_RAPPEL =
  `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent('Être rappelé — formation IA niveau 1 bâtiment & TP')}`;

const CATALOGUE_VISUEL = getFormationCatalogueVisuel('NIV-01');

export const metadata = createPageMetadata({
  title: SEO_TITLE,
  description: SEO_DESCRIPTION,
  descriptionFinal: true,
  path: '/formations/ia-batiment-travaux-publics',
  keywords: [
    'formation IA bâtiment',
    'formation IA pour les pros du BTP',
    'IA BTP',
    'rédaction mémoire technique',
    'appel d\'offre BTP',
    'formation intelligence artificielle construction',
    'IA pour équipes BTP',
    'IA chantier',
    'automatisation devis BTP',
    'IA appels d\'offres',
    'formation IA appliquée au bâtiment Paris',
    'formation IA bâtiment Île-de-France',
    'ChatGPT BTP',
    'Qualiopi',
    'OPCO Constructys',
  ],
  image: {
    url: CATALOGUE_VISUEL.src,
    width: CATALOGUE_VISUEL.width,
    height: CATALOGUE_VISUEL.height,
    alt: CATALOGUE_VISUEL.alt,
  },
});

const faqSchema = getFAQSchema(FAQ_BATIMENT);
const courseSchema = buildCatalogueCourseIaBtpNiv01JsonLd();

const TARIF_SESSION_LIBELLE = libelleTarifSessionForfaitaire(TARIF_FORFAIT_DEBUTANT_HT);

const POINTS_MARQUANTS = [
  'Parcours catalogue niveau 1 : bâtiment et travaux publics — devis, chantier, administratif.',
  `Session unique ${SESSION_DUREE_LIBELLE} — forfait ${TARIF_SESSION_LIBELLE} (niveau débutant).`,
  `${LIBELLE_EFFECTIF_GROUPE}.`,
  'Qualiopi, financement OPCO Constructys selon éligibilité.',
];

const OBJECTIFS_FORMATION = [
  'Identifier les usages de l’IA générative utiles dans le bâtiment et les travaux publics (sans prérequis technique).',
  'Accélérer devis, propositions, comptes rendus chantier et messages clients.',
  'Structurer l’administratif : relances, modèles et check-lists.',
  'Repartir avec des trames et prompts adaptés à votre métier (BTP / TP).',
];

const MOYENS_PEDAGOGIQUES = [
  `Formation animée par une formatrice experte en IA appliquée au BTP — ${MODALITE_FORMATIONS_PRESENTIEL}`,
  'Exercices guidés et cas concrets sur des situations types bâtiment et travaux publics.',
  'Atelier sur vos documents réels (anonymisés ou fictifs si besoin).',
  'Supports pédagogiques et ressources téléchargeables selon la convention.',
];

const MOYENS_TECHNIQUES = [
  'En présentiel : salle équipée, connexion internet, poste par apprenant si possible.',
  `${COMPTES_IA_GRATUITS_NIVEAU_DEBUTANT} Rappels RGPD et confidentialité des données en session.`,
];

const MODALITES_EVALUATION = [
  'Mise en situation et exercices pratiques tout au long de la formation.',
  'Questionnaire de satisfaction en fin de session.',
  QUALIOPI_CERTIFICAT_REALISATION,
];

const MODALITES = [
  {
    icon: Clock,
    title: 'Durée',
    primary: SESSION_DUREE_LIBELLE,
    secondary: `Forfait ${TARIF_SESSION_LIBELLE} (niveau débutant)`,
  },
  {
    icon: MapPin,
    title: 'Format',
    primary: 'Intra · inter · présentiel en Île-de-France',
    secondary: 'Sessions inter en Île-de-France, intra dans vos locaux — en présentiel',
  },
  {
    icon: UserCircle,
    title: 'Effectif',
    primary: LIBELLE_EFFECTIF_GROUPE_COURT,
    secondary: 'Par session forfaitaire',
  },
  {
    icon: Users,
    title: 'Public cible',
    primary: 'Entreprises du bâtiment, travaux publics et BTP',
    secondary: 'TPE & PME du bâtiment, dirigeants, conducteurs de travaux, chargés d’affaires et équipes administratives',
  },
  {
    icon: FileText,
    title: 'Pré-requis',
    primary: 'Aucune compétence technique en IA',
    secondary: 'Ordinateur et connexion internet — ' + COMPTES_IA_GRATUITS_NIVEAU_DEBUTANT,
  },
  {
    icon: Award,
    title: 'Certification',
    primary: 'OFC Qualiopi',
    secondary: 'Certificat de réalisation',
  },
  {
    icon: DollarSign,
    title: 'Tarif & financement',
    primary: `${TARIF_SESSION_LIBELLE} (débutant)`,
    secondary: 'Financement OPCO selon éligibilité — Constructys, AKTO, OPCO EP',
  },
];

const LIVRABLES = [
  {
    icon: FolderOpen,
    title: 'Trames et prompts',
    desc: 'Modèles de devis, emails, relances et courriers adaptés au vocabulaire BTP.',
  },
  {
    icon: Bot,
    title: 'Bibliothèque de prompts',
    desc: 'Prompts réutilisables par type de tâche (devis, CR, administratif).',
  },
  {
    icon: ClipboardList,
    title: 'Check-lists et méthode',
    desc: 'Repères pour relecture humaine, conformité et gain de temps mesurable.',
  },
  {
    icon: Monitor,
    title: 'Ressources de suivi',
    desc: 'Supports de formation et ressources selon modalités convenues avec l’organisme.',
  },
];

const CAS_USAGE_BATIMENT = [
  {
    titre: 'Répondre à un appel d’offres avec l’IA',
    texte:
      'Structurer une lecture de DCE, lister les points sensibles et produire un premier plan de réponse — toujours validé par votre expertise. Pour les dossiers complexes, la formation dédiée « appels d’offre » complète ce socle.',
    lien: { href: '/formations/ia-appels-offre-btp', label: 'Formation appels d’offres BTP' },
  },
  {
    titre: 'Générer ou fiabiliser un devis',
    texte:
      'Partir d’un historique ou d’un métré pour accélérer la proposition commerciale, tout en gardant la main sur les prix et les hypothèses : l’automatisation devis BTP s’apprend avec des garde-fous.',
  },
  {
    titre: 'Répondre à un client ou relancer un chantier',
    texte:
      'Emails clairs, ton professionnel, relances sans friction : l’IA aide à formuler vite, vous gardez le relationnel et la signature.',
  },
];

const AVANT_APRES = [
  {
    label: 'Avant',
    items: [
      'Devis et courriers refaits « depuis zéro » à chaque fois',
      'Comptes rendus de réunion ou de chantier longs à rédiger',
      'Charge mentale sur l’administratif et la prospection',
    ],
  },
  {
    label: 'Après',
    items: [
      'Trames et prompts réutilisables sur vos cas récurrents',
      'Structuration systématique : vous gagnez du temps sans baisser la qualité',
      'Équipe plus autonome sur les tâches répétitives, avec relecture humaine cadrée',
    ],
  },
];

const PUBLIC_CIBLE = [
  'TPE & PME du bâtiment et des travaux publics',
  'Dirigeants et responsables d’entreprises du bâtiment',
  'Conducteurs de travaux et chargés d’affaires',
  'Encadrement de chantier, chefs d’équipe, techniciens',
  'Assistantes et assistants administratifs, gestionnaires',
  'Commerciaux et relation client',
];

export default function FormationIAuServiceDuBatimentPage() {
  return (
    <div>
      <JsonLd id="schema-course-niv-01" schema={courseSchema} />
      <JsonLd id="schema-faq" schema={faqSchema} />

      <FormationCourseHero
        catalogueRef="NIV-01"
        refLine="Niveau 1 · Débutant"
        title="L'IA au service des pros du bâtiment et des travaux publics"
        subtitle="Niveau 1 — devis, chantier, administratif et documents (bâtiment & travaux publics)"
        badges={[
          'OPCO / plan de développement des compétences',
          'Accessible débutant',
          'Cas terrain',
        ]}
        summaryItems={POINTS_MARQUANTS}
        ctas={
          <>
            <RdvLink
              campaign="formations-ia-batiment-travaux-publics-hero"
              ctaPosition="hero"
              ctaId="hero"
              className="rounded-xl bg-[var(--accent)] px-6 py-3.5 text-center font-semibold text-white hover:bg-blue-600"
            >
              Prendre rendez-vous
            </RdvLink>
            <a
              href={LINKS.pdfProgrammeIaBtpNiveau1BatimentTp}
              download
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 px-6 py-3.5 text-center font-semibold text-slate-800 hover:border-[var(--accent)]"
            >
              <Download size={20} strokeWidth={1.5} aria-hidden />
              Télécharger le programme (PDF)
            </a>
            <a
              href={MAIL_RAPPEL}
              className="rounded-xl border-2 border-[var(--accent)] px-6 py-3.5 text-center font-semibold text-slate-900 hover:bg-[var(--accent-soft)]"
            >
              Être rappelé
            </a>
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
              Voir sur la plateforme
            </Link>
            <FooterTelOrMailLink className="font-medium text-slate-600 hover:text-[var(--accent)] hover:underline" />
          </>
        }
      >
        <p>
          Formation pratique en <strong>{SESSION_DUREE_LIBELLE}</strong> pour intégrer l&apos;IA dans votre
          quotidien : <strong>devis, DCE, CCTP, appels d&apos;offres, mémoires techniques, comptes rendus de chantier, relances clients et documents administratifs</strong>, avec des trames et prompts
          prêts à l&apos;emploi. Approche accessible, <strong>aucun jargon inutile</strong> — des cas réels
          issus du terrain BTP.{' '}
          <strong>Forfait {TARIF_SESSION_LIBELLE}</strong> (niveau débutant).
          Financement possible via <strong>l&apos;OPCO Constructys</strong> selon éligibilité (formation
          organisme certifié Qualiopi).
        </p>
      </FormationCourseHero>

      {/* Contenu SEO long */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Formation IA pour le BTP : une méthode pensée pour le terrain
          </h2>
          <p className="mt-4 text-slate-700 leading-relaxed">
            La formation niveau 1 est une session de {SESSION_DUREE_LIBELLE} en présentiel qui cible devis,
            comptes rendus et administratif du bâtiment et des travaux publics, sans prérequis informatique.
          </p>
          <p className="mt-4 text-slate-700 leading-relaxed">
            En 2026, moins de 10&nbsp;% des entreprises du BTP utilisent déjà l&apos;IA, selon
            l&apos;Observatoire des métiers du BTP (621 professionnels interrogés, cabinet Plein Sens) — alors
            que 36&nbsp;% des dirigeants se disent prêts à l&apos;adopter.
          </p>
          <p className="mt-4 text-slate-700 leading-relaxed">
            Dans une entreprise du bâtiment, le temps se joue sur trois tables : le chantier, le client et
            l&apos;administratif. La <strong>formation IA pour les pros du BTP</strong> que je propose ne vise pas à
            transformer vos équipes en experts informatiques : il s&apos;agit de{' '}
            <strong>gagner des heures chaque semaine</strong> sur des tâches répétitives — devis, relances,
            courriers, synthèses — tout en gardant la main sur le fond technique et la relation de
            confiance avec vos clients.
          </p>
          <p className="mt-4 text-slate-700 leading-relaxed">
            L&apos;intelligence artificielle sert ici de <strong>levier de productivité</strong> : vous
            apprenez à formuler des demandes claires, à structurer vos documents et à réutiliser des
            modèles adaptés au vocabulaire des corps d&apos;état. Les exemples viennent du quotidien des
            professionnels du BTP et des PME : petits travaux, rénovation, lots techniques, suivi de chantier,
            coordination avec la maîtrise d&apos;ouvrage ou les sous-traitants.
          </p>

          <h3 className="mt-10 font-display text-xl font-bold text-slate-900">
            IA pour équipes BTP : concret et sans promesse irréaliste
          </h3>
          <p className="mt-3 text-slate-700 leading-relaxed">
            L&apos;<strong>IA pour équipes BTP</strong> commence par des usages simples : préparer
            un email client, reformuler un compte rendu, classer des idées avant une réunion de chantier.
            Vous découvrez comment éviter les pièges (données sensibles, chiffres non vérifiés) et instaurer
            une <strong>relecture humaine</strong> systématique. C&apos;est une progression courte, en
            présentiel, avec des exercices sur des situations proches des vôtres.
          </p>

          <h3 className="mt-8 font-display text-xl font-bold text-slate-900">
            IA chantier : comptes rendus, suivi et communication
          </h3>
          <p className="mt-3 text-slate-700 leading-relaxed">
            L&apos;<strong>IA chantier</strong> prend tout son sens sur la documentation : résumer une
            visite, préparer un mail après une réunion de coordination, garder une trace claire des
            décisions pour votre équipe terrain et vos interlocuteurs. Le gain n&apos;est pas « magique » :
            il vient de la <strong>structuration</strong> : moins de temps passé à partir d&apos;une page
            blanche, plus de temps pour arbitrer, sécuriser le planning et la relation client.
          </p>

          <h3 className="mt-8 font-display text-xl font-bold text-slate-900">
            Automatisation devis BTP : aller plus vite sans se tromper de prix
          </h3>
          <p className="mt-3 text-slate-700 leading-relaxed">
            L&apos;<strong>automatisation devis BTP</strong> ne remplace pas votre expertise métier : elle
            accélère la mise en forme, la reformulation et la comparaison de variantes à partir de vos
            données et de vos hypothèses. En session, je travaille la méthode : quoi confier à l&apos;IA,
            quoi vérifier systématiquement (quantités, taux, périmètre), comment capitaliser des trames
            pour les chantiers similaires. L&apos;objectif est un{' '}
            <strong>gain de temps mesurable</strong> sur les propositions commerciales.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">{GAINS_TEMPS_MENTION_PRUDENCE}</p>

          <h3 className="mt-8 font-display text-xl font-bold text-slate-900">
            IA et appels d&apos;offres : structurer avant d&apos;approfondir
          </h3>
          <p className="mt-3 text-slate-700 leading-relaxed">
            Pour l&apos;<strong>IA appels d&apos;offres</strong>, cette formation pose les bases : lecture
            aidée des pièces, plan de réponse, formulations professionnelles. Les dossiers publics complexes
            méritent souvent un accompagnement spécifique : c&apos;est le rôle de mon module avancé dédié
            aux marchés, en complément de ce socle « bâtiment » généraliste.
          </p>

          <h2 className="mt-12 font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Formation intelligence artificielle construction : objectifs et pédagogie
          </h2>
          <p className="mt-4 text-slate-700 leading-relaxed">
            En une demi-journée, les stagiaires repartent avec des trames réutilisables et une feuille de route
            pour déployer l&apos;IA en entreprise avec relecture humaine obligatoire.
          </p>
          <p className="mt-4 text-slate-700 leading-relaxed">
            En {new Date().getFullYear()}, OFC Création d&apos;Entreprise affiche une note de satisfaction de {siteStats.noteMoyenneAffichee} sur plus de{' '}
            {formatPersonnesFormeesCount()} professionnels formés ({getStatsFreshnessLabel()}).
          </p>
          <p className="mt-4 text-slate-700 leading-relaxed">
            Cette <strong>formation intelligence artificielle construction</strong> s&apos;adresse aux
            professionnels qui veulent <strong>des résultats rapidement</strong> : une session unique de{' '}
            {SESSION_DUREE_LIBELLE}, 100 % pratique, animée par une formatrice spécialisée dans le secteur
            BTP. Vous repartez avec des supports réutilisables, une feuille de route claire et des repères
            pour former progressivement vos collaborateurs aux bonnes habitudes (confidentialité, validation
            des contenus générés, traçabilité).
          </p>
          <p className="mt-4 text-slate-700 leading-relaxed">
            Les <strong>conducteurs de travaux</strong> y trouvent des réponses pour fluidifier le lien avec
            le bureau d&apos;études, les corps de métier et le client final. Les{' '}
            <strong>équipes administratives</strong> y gagnent en autonomie sur les relances, les courriers
            types et la préparation de dossiers. Les <strong>dirigeants</strong> y voient un levier simple
            pour réduire la charge mentale collective — sans projet SI lourd, car l&apos;accent est mis sur
            les usages immédiats et sur la capitalisation de trames internes.
          </p>
          <p className="mt-4 text-slate-700 leading-relaxed">
            Enfin, cette approche s&apos;inscrit dans une logique de <strong>responsabilité</strong> : l&apos;IA
            assiste, elle ne remplace ni le métier ni la signature des engagements pris envers vos clients.
            C&apos;est cette ligne de conduite — testée sur le terrain avec des entreprises du réseau
            professionnel du bâtiment — qui permet d&apos;obtenir des gains durables plutôt qu&apos;un
            effet « gadget » après la formation.
          </p>
        </div>
      </section>

      {/* Cas d'usage */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-2 text-[var(--accent)]">
            <Sparkles size={26} strokeWidth={1.5} aria-hidden />
            <h2 className="font-display text-3xl font-bold text-slate-900">
              Cas d&apos;usage concrets dans le bâtiment
            </h2>
          </div>
          <p className="mt-3 max-w-3xl text-slate-600">
            Les trois cas les plus travaillés en atelier niveau 1 sont les appels d&apos;offres légers,
            l&apos;accélération des devis et les emails clients — toujours validés par le professionnel.
          </p>
          <p className="mt-3 max-w-3xl text-slate-600">
            Exemples fréquents travaillés en atelier — toujours avec validation humaine et respect du cadre
            RGPD.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {CAS_USAGE_BATIMENT.map((bloc) => (
              <div
                key={bloc.titre}
                className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50/80 p-6 shadow-sm"
              >
                <h3 className="font-display text-lg font-bold text-slate-900">{bloc.titre}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-700">{bloc.texte}</p>
                {bloc.lien ? (
                  <Link
                    href={bloc.lien.href}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)] hover:underline"
                  >
                    {bloc.lien.label}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avant / Après */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">Avant / Après la formation</h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Après {SESSION_DUREE_LIBELLE} de pratique, les participants structurent leurs documents récurrents au
            lieu de repartir d&apos;une page blanche à chaque chantier.
          </p>
          <p className="mt-3 max-w-2xl text-slate-600">
            Ce que changent concrètement quatre heures de mise en pratique — au-delà du simple « test » des
            outils.
          </p>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {AVANT_APRES.map((col) => (
              <div
                key={col.label}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
                  {col.label}
                </p>
                <ul className="mt-4 space-y-3 text-slate-700">
                  {col.items.map((line) => (
                    <li key={line} className="flex gap-2">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" strokeWidth={2} />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* À qui s'adresse */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">
            À qui s&apos;adresse cette formation ?
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Cette formation s&apos;adresse aux TPE, PME et équipes terrain du BTP (professionnels du BTP,
            conducteurs de travaux, assistants) — pas aux profils développeurs.
          </p>
          <p className="mt-3 max-w-2xl text-slate-600">
            TPE, PME et équipes du second œuvre ou du gros œuvre : la session est conçue pour des profils
            métiers, pas pour des développeurs.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PUBLIC_CIBLE.map((line) => (
              <li
                key={line}
                className="flex gap-2 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm text-slate-800"
              >
                <Users className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" strokeWidth={2} />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SEO local */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-2 text-[var(--accent)]">
            <MapPin size={26} strokeWidth={1.5} aria-hidden />
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              Formation IA appliquée au bâtiment Paris, Yvelines et Île-de-France
            </h2>
          </div>
          <p className="mt-4 text-slate-700 leading-relaxed">
            Les sessions niveau 1 se déroulent en présentiel en Île-de-France (intra ou inter), avec financement
            OPCO Constructys possible selon éligibilité.
          </p>
          <p className="mt-4 text-slate-700 leading-relaxed">
            En 2026, une session niveau 1 reste calibrée sur {SESSION_DUREE_LIBELLE} pour un forfait de{' '}
            {TARIF_SESSION_LIBELLE} (niveau débutant, max {LIBELLE_EFFECTIF_GROUPE_COURT.toLowerCase()}).
          </p>
          <p className="mt-4 text-slate-700 leading-relaxed">
            J&apos;organise des sessions <strong>formation IA pour le BTP Paris</strong> et en{' '}
            <strong>formation IA bâtiment Île-de-France</strong> : présentiel en salle ou{' '}
            <strong>intra-entreprise</strong> dans vos locaux selon vos contraintes. Interventions possibles
            notamment en <strong>Yvelines</strong>, <strong>Essonne</strong>,{' '}
            <strong>Seine-et-Marne</strong>, <strong>Val-d&apos;Oise</strong>,{' '}
            <strong>Hauts-de-Seine</strong>, <strong>Seine-Saint-Denis</strong> et{' '}
            <strong>Val-de-Marne</strong> — ainsi qu&apos;à Paris et en petite couronne. Pour le détail des
            formats et des créneaux :{' '}
            <Link href={LINKS.formationParis} className="font-semibold text-[var(--accent)] hover:underline">
              formation IA bâtiment Paris
            </Link>
            ,{' '}
            <Link
              href="/formation-ia-btp-ile-de-france"
              className="font-semibold text-[var(--accent)] hover:underline"
            >
              formation IA Île-de-France
            </Link>
            , ou contact direct pour un devis intra.
          </p>
          <p className="mt-4 text-slate-700 leading-relaxed">
            Le siège de l&apos;organisme est situé à {SITE_CONFIG.geo.city} ({SITE_CONFIG.geo.département}).
            Le financement des actions de formation passe le plus souvent par votre{' '}
            <strong>OPCO</strong> (notamment <strong>Constructys</strong> pour le périmètre BTP) dans le cadre
            du plan de développement des compétences — dossier et convention sur demande. Pour les
            dispositifs publics complémentaires (aides aux TPE/PME, accompagnements régionaux), les
            éligibilités varient : je peux vous orienter selon votre situation.
          </p>
          <p className="mt-6">
            <Link
              href={LINKS.financement}
              className="inline-flex items-center gap-2 font-semibold text-[var(--accent)] hover:underline"
            >
              Guide financement Constructys — formation IA pour les pros du BTP
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </p>
        </div>
      </section>

      {/* Déroulé */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">Déroulé de la formation</h2>
          <p className="mt-4 text-slate-700 leading-relaxed">
            Le déroulé alterne 4 modules thématiques (devis, emails, CR chantier, administratif) en démonstrations
            courtes et ateliers guidés sur {SESSION_DUREE_LIBELLE}.
          </p>
          <p className="mt-4 text-slate-700 leading-relaxed">
            La session de <strong>{SESSION_DUREE_LIBELLE}</strong> alterne démonstrations courtes et ateliers
            guidés. Quatre modules couvrent le chiffrage et les devis, la relation client par email, les
            comptes rendus et la documentation de chantier, puis l&apos;administratif et la capitalisation
            (trames, bibliothèque de prompts). La pédagogie est volontairement <strong>terrain</strong> :
            vous manipulez les outils sur des cas types du bâtiment, avec possibilité d&apos;anonymiser vos
            propres documents.
          </p>
          <p className="mt-4">
            <a
              href="#programme"
              className="inline-flex items-center gap-2 font-semibold text-[var(--accent)] hover:underline"
            >
              Consulter le programme détaillé (modules et contenus)
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </p>
        </div>
      </section>

      {/* Objectifs */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">Objectifs pédagogiques</h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            À l&apos;issue de la session, le stagiaire sait identifier des usages IA utiles, accélérer devis et
            CR et capitaliser des prompts métier.
          </p>
          <p className="mt-3 max-w-2xl text-slate-600">
            À l&apos;issue de la formation, vous êtes en mesure de :
          </p>
          <ul className="mt-8 space-y-4">
            {OBJECTIFS_FORMATION.map((obj) => (
              <li
                key={obj}
                className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 text-slate-700 shadow-sm"
              >
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={2} />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Programme détaillé */}
      <section id="programme" className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">
            Programme détaillé de la formation
          </h2>
          <p className="mt-3 text-slate-600">
            Le programme détaillé niveau 1 répartit {SESSION_DUREE_LIBELLE} sur quatre blocs : chiffrage, relation
            client, documentation chantier et gestion administrative.
          </p>
          <p className="mt-3 text-slate-600">
            <strong>{SESSION_DUREE_LIBELLE}</strong> — quatre modules condensés : devis et chiffrage,
            emails et relation client, comptes rendus et documentation chantier, gestion administrative.
            Ateliers pratiques sur vos cas.
          </p>
          <ProgrammeAccordionBatiment />
        </div>
      </section>

      {/* Modalités pratiques */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">Modalités pratiques</h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            La session niveau 1 dure {SESSION_DUREE_LIBELLE}, coûte {TARIF_SESSION_LIBELLE} (
            {LIBELLE_EFFECTIF_GROUPE_COURT.toLowerCase()}, niveau débutant) et se tient en intra ou inter en
            Île-de-France.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MODALITES.map((mod) => (
              <div
                key={mod.title}
                className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                  <mod.icon size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{mod.title}</h3>
                  <p className="mt-1 font-medium text-slate-800">{mod.primary}</p>
                  <p className="mt-1 text-sm text-slate-600">{mod.secondary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Moyens pédagogiques & techniques */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-2 text-[var(--accent)]">
                <Laptop size={22} strokeWidth={1.5} aria-hidden />
                <h2 className="font-display text-xl font-bold text-slate-900">
                  Moyens pédagogiques
                </h2>
              </div>
              <p className="mt-4 text-slate-700 leading-relaxed">
                La pédagogie repose sur des exercices guidés et des cas concrets bâtiment/TP animés par une
                formatrice spécialisée BTP, en présentiel uniquement.
              </p>
              <ul className="mt-6 space-y-3 text-slate-700">
                {MOYENS_PEDAGOGIQUES.map((line) => (
                  <li key={line} className="flex gap-2">
                    <span className="text-[var(--accent)]">•</span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-2 text-[var(--accent)]">
                <Monitor size={22} strokeWidth={1.5} aria-hidden />
                <h2 className="font-display text-xl font-bold text-slate-900">
                  Moyens techniques
                </h2>
              </div>
              <p className="mt-4 text-slate-700 leading-relaxed">
                Chaque stagiaire utilise son ordinateur avec connexion internet ; des comptes IA gratuits suffisent
                pour le niveau débutant.
              </p>
              <ul className="mt-6 space-y-3 text-slate-700">
                {MOYENS_TECHNIQUES.map((line) => (
                  <li key={line} className="flex gap-2">
                    <span className="text-[var(--accent)]">•</span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Modalités d'évaluation */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-2 text-[var(--accent)]">
            <ClipboardList size={24} strokeWidth={1.5} aria-hidden />
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              Modalités d&apos;évaluation
            </h2>
          </div>
          <p className="mt-4 text-slate-700 leading-relaxed">
            L&apos;évaluation combine mise en situation continue, questionnaire de satisfaction et certificat de
            réalisation en fin de session.
          </p>
          <ul className="mt-8 space-y-3 text-slate-700">
            {MODALITES_EVALUATION.map((line) => (
              <li key={line} className="flex gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" strokeWidth={2} />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Livrables & Ressources */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">Livrables & ressources</h2>
          <p className="mt-3 text-slate-600">
            Les livrables niveau 1 comprennent trames de devis, bibliothèque de prompts et check-lists de relecture
            exploitables dès le lendemain.
          </p>
          <p className="mt-3 text-slate-600">
            Ce que vous repartez pour capitaliser après la formation — angle pratique et déploiement
            en entreprise.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {LIVRABLES.map((item) => (
              <div
                key={item.title}
                className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                  <item.icon size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <FAQSection
            items={FAQ_BATIMENT}
            title="Questions fréquentes — formation IA niveau 1 bâtiment & TP"
          />
        </div>
      </section>

      <RelatedLinks path={LINKS.formationIaBtpNiveau1BatimentTp} />

      {/* Maillage interne — pages associées */}
      <ContextualLinksSection
        title="Pages associées"
        subtitle="Poursuivre votre parcours : niveau 2 appels d'offres, métier conducteur de travaux, financement et guides."
        links={FORMATION_NIV01_RELATED.filter((l) => !getClusterRelatedHrefs(LINKS.formationIaBtpNiveau1BatimentTp).includes(l.href))}
        tone="muted"
      />

      <CatalogueInfosPratiques programmeRef="NIV-01" />

      {/* CTA final */}
      <section className="bg-[var(--accent)] px-4 py-16 text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold">
            Prêt à gagner du temps sur vos devis et votre administratif ?
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Un rendez-vous découverte de 30 min permet de vérifier l&apos;éligibilité OPCO et caler une session
            la formation niveau 1 dans votre planning.
          </p>
          <p className="mt-4 text-lg text-blue-100">
            Contactez-moi pour organiser cette formation dans votre entreprise du bâtiment.
          </p>
          <p className="mt-2 text-blue-100">
            Financement OPCO selon éligibilité. Session {SESSION_DUREE_LIBELLE} — forfait{' '}
            {TARIF_SESSION_LIBELLE} (niveau débutant).
          </p>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            <RdvLink
              campaign="formations-ia-batiment-travaux-publics-footer"
              ctaPosition="footer"
              ctaId="footer-rdv"
              className="flex items-center justify-center gap-2 rounded-xl border-2 border-white bg-white px-6 py-4 font-semibold text-[var(--accent)] hover:bg-blue-50"
            >
              <Mail size={20} strokeWidth={1.5} />
              Prendre rendez-vous
            </RdvLink>
            <a
              href={MAIL_PROGRAMME}
              className="flex items-center justify-center gap-2 rounded-xl border-2 border-white/80 bg-transparent px-6 py-4 font-semibold text-white hover:bg-white/10"
            >
              <FileText size={20} strokeWidth={1.5} />
              Demander le programme
            </a>
            <a
              href={MAIL_RAPPEL}
              className="flex items-center justify-center gap-2 rounded-xl border-2 border-white/80 bg-transparent px-6 py-4 font-semibold text-white hover:bg-white/10"
            >
              <Phone size={20} strokeWidth={1.5} />
              Être rappelé
            </a>
          </div>
          <p className="mt-6 text-sm text-blue-100">
            {siteHasPublicPhone() ? (
              <InlinePublicPhoneLink className="underline hover:text-white" />
            ) : (
              <a href={`mailto:${SITE_CONFIG.email}`} className="underline hover:text-white">
                {SITE_CONFIG.email}
              </a>
            )}
          </p>
        </div>
      </section>

    </div>
  );
}
