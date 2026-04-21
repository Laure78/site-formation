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
} from 'lucide-react';
import { ProgrammeAccordionBatiment } from '@/components/formations/ProgrammeAccordionBatiment';
import { FAQSection } from '@/components/landing/FAQSection';
import { JsonLd } from '@/components/JsonLd';
import { FormationCourseScriptJsonLd } from '@/components/seo/FormationCourseScriptJsonLd';
import {
  createPageMetadata,
  getFAQSchema,
  SITE_CONFIG,
  siteHasPublicPhone,
} from '@/lib/seo';
import { getDedicatedFormationCoursePageJsonLd } from '@/lib/schema-course-formations';
import { FAQ_BATIMENT } from '@/lib/faq';
import {
  FormationCourseHero,
  FormationHeroPhoto,
} from '@/components/formations/FormationCourseHero';
import {
  SESSION_DUREE_LIBELLE,
  TARIF_FORFAIT_DEBUTANT_HT,
  MODALITE_FORMATIONS_PRESENTIEL,
  COMPTES_IA_GRATUITS_NIVEAU_DEBUTANT,
  LIBELLE_EFFECTIF_GROUPE,
  LIBELLE_EFFECTIF_GROUPE_COURT,
} from '@/lib/tarifs-sessions';
import { PHOTOS } from '@/lib/photos';
import Breadcrumbs from '@/components/Breadcrumbs';

const LMS_SLUG = 'ia-au-service-du-btp';

/** Title ≤ 60 car. — requête « formation IA bâtiment » */
const SEO_TITLE =
  'Formation IA bâtiment : gagnez du temps sur chantiers | OFC';

/** Meta description — mots-clés BTP : mémoire technique, appels d'offre, formation IA */
const SEO_DESCRIPTION = `Formation IA BTP et bâtiment ${SESSION_DUREE_LIBELLE} : devis, appels d'offre, mémoire technique, chantier, administratif. Qualiopi, OPCO Constructys. Sans prérequis technique.`;

const MAIL_PROGRAMME =
  `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent('Demande de programme — formation IA bâtiment (BTP-01)')}`;
const MAIL_RAPPEL =
  `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent('Être rappelé — formation IA bâtiment')}`;

export const metadata = createPageMetadata({
  title: SEO_TITLE,
  description: SEO_DESCRIPTION,
  path: '/formations/ia-au-service-du-batiment',
  keywords: [
    'formation IA bâtiment',
    'formation IA BTP',
    'IA BTP',
    'rédaction mémoire technique',
    'appel d\'offre BTP',
    'formation intelligence artificielle construction',
    'IA pour équipes BTP',
    'IA chantier',
    'automatisation devis BTP',
    'IA appels d\'offres',
    'formation IA BTP Paris',
    'formation IA bâtiment Île-de-France',
    'ChatGPT BTP',
    'Qualiopi',
    'OPCO Constructys',
  ],
  image: {
    url: PHOTOS.formationIABtpVisioBureau2026.src,
    width: PHOTOS.formationIABtpVisioBureau2026.width,
    height: PHOTOS.formationIABtpVisioBureau2026.height,
    alt: PHOTOS.formationIABtpVisioBureau2026.alt,
  },
});

const formationCourseGraph = getDedicatedFormationCoursePageJsonLd(
  '/formations/ia-au-service-du-batiment'
);

const faqSchema = getFAQSchema(FAQ_BATIMENT);

const POINTS_MARQUANTS = [
  'Parcours catalogue BTP-01 : devis, emails, comptes rendus et administratif — prompts et trames prêts à l’emploi.',
  `Session unique ${SESSION_DUREE_LIBELLE} — forfait ${TARIF_FORFAIT_DEBUTANT_HT} € HT par participant (niveau débutant).`,
  `${LIBELLE_EFFECTIF_GROUPE}.`,
  'Qualiopi, financement OPCO Constructys selon éligibilité — sessions en présentiel uniquement.',
];

const OBJECTIFS_FORMATION = [
  'Identifier les usages de l’IA générative utiles dans le bâtiment (sans prérequis technique).',
  'Accélérer la rédaction de devis, propositions et messages clients.',
  'Structurer l’administratif : comptes rendus, relances, modèles et check-lists.',
  'Repartir avec des trames, prompts et bonnes pratiques adaptés à votre métier.',
];

const MOYENS_PEDAGOGIQUES = [
  `Formation animée par une formatrice experte en IA appliquée au BTP — ${MODALITE_FORMATIONS_PRESENTIEL}`,
  'Exercices guidés et cas concrets sur des situations types du bâtiment.',
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
  'Attestation de formation délivrée (organisme certifié Qualiopi).',
];

const MODALITES = [
  {
    icon: Clock,
    title: 'Durée',
    primary: SESSION_DUREE_LIBELLE,
    secondary: `Forfait ${TARIF_FORFAIT_DEBUTANT_HT} € HT / participant (niveau débutant)`,
  },
  {
    icon: MapPin,
    title: 'Format',
    primary: 'Présentiel',
    secondary: 'Sessions inter en Île-de-France ou intra dans vos locaux',
  },
  {
    icon: UserCircle,
    title: 'Effectif',
    primary: LIBELLE_EFFECTIF_GROUPE_COURT,
    secondary: 'Par session et par groupe',
  },
  {
    icon: Users,
    title: 'Public cible',
    primary: 'Entreprises du bâtiment et professionnels du BTP',
    secondary: 'Dirigeants, conducteurs de travaux, équipes terrain et administratives',
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
    primary: 'Formation Qualiopi',
    secondary: 'Attestation de fin de formation',
  },
  {
    icon: DollarSign,
    title: 'Tarif & financement',
    primary: `${TARIF_FORFAIT_DEBUTANT_HT} € HT / participant (débutant)`,
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
  'Dirigeants et responsables d’entreprises du bâtiment (TPE / PME)',
  'Conducteurs de travaux et chargés d’affaires',
  'Encadrement de chantier, chefs d’équipe, techniciens',
  'Assistantes et assistants administratifs, gestionnaires',
  'Commerciaux et relation client',
];

export default function FormationIAuServiceDuBatimentPage() {
  return (
    <div>
      <FormationCourseScriptJsonLd schema={formationCourseGraph} />
      <JsonLd id="schema-faq" schema={faqSchema} />

      <FormationCourseHero
        breadcrumb={
          <Breadcrumbs
            items={[
              { label: 'Formations', href: '/formations' },
              { label: 'IA au service du bâtiment' },
            ]}
          />
        }
        refLine="Réf. catalogue BTP-01 · Débutant"
        title="Formation IA bâtiment : gagnez du temps sur vos chantiers"
        subtitle="L&apos;IA au service du bâtiment — devis, administratif et relation client"
        badges={[
          'OPCO / plan de développement des compétences',
          'Accessible débutant',
          'Cas terrain',
        ]}
        summaryItems={POINTS_MARQUANTS}
        image={
          <FormationHeroPhoto
            src={PHOTOS.formationIABtpVisioBureau2026.src}
            alt={PHOTOS.formationIABtpVisioBureau2026.alt}
            width={PHOTOS.formationIABtpVisioBureau2026.width}
            height={PHOTOS.formationIABtpVisioBureau2026.height}
            priority
          />
        }
        ctas={
          <>
            <RdvLink className="rounded-xl bg-[var(--accent)] px-6 py-3.5 text-center font-semibold text-white hover:bg-blue-600">
              Prendre rendez-vous
            </RdvLink>
            <a
              href={MAIL_PROGRAMME}
              className="rounded-xl border-2 border-slate-200 px-6 py-3.5 text-center font-semibold text-slate-800 hover:border-[var(--accent)]"
            >
              Demander le programme
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
              href={`/cours/${LMS_SLUG}`}
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
          quotidien : <strong>devis, emails, comptes rendus et suivi</strong>, avec des trames et prompts
          prêts à l&apos;emploi. Approche accessible, <strong>aucun jargon inutile</strong> — des cas réels
          issus du terrain BTP.{' '}
          <strong>Forfait {TARIF_FORFAIT_DEBUTANT_HT} € HT par participant</strong> (niveau débutant).
          Financement possible via <strong>l&apos;OPCO Constructys</strong> selon éligibilité (formation
          certifiée Qualiopi).
        </p>
      </FormationCourseHero>

      {/* Contenu SEO long */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Formation IA BTP : une méthode pensée pour le terrain
          </h2>
          <p className="mt-4 text-slate-700 leading-relaxed">
            Dans une entreprise du bâtiment, le temps se joue sur trois tables : le chantier, le client et
            l&apos;administratif. La <strong>formation IA BTP</strong> que nous proposons ne vise pas à
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
            données et de vos hypothèses. En session, nous travaillons la méthode : quoi confier à l&apos;IA,
            quoi vérifier systématiquement (quantités, taux, périmètre), comment capitaliser des trames
            pour les chantiers similaires. L&apos;objectif est un{' '}
            <strong>gain de temps mesurable</strong> sur les propositions commerciales.
          </p>

          <h3 className="mt-8 font-display text-xl font-bold text-slate-900">
            IA et appels d&apos;offres : structurer avant d&apos;approfondir
          </h3>
          <p className="mt-3 text-slate-700 leading-relaxed">
            Pour l&apos;<strong>IA appels d&apos;offres</strong>, cette formation pose les bases : lecture
            aidée des pièces, plan de réponse, formulations professionnelles. Les dossiers publics complexes
            méritent souvent un accompagnement spécifique : c&apos;est le rôle de notre module avancé dédié
            aux marchés, en complément de ce socle « bâtiment » généraliste.
          </p>

          <h2 className="mt-12 font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Formation intelligence artificielle construction : objectifs et pédagogie
          </h2>
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
              Formation IA BTP Paris, Yvelines et Île-de-France
            </h2>
          </div>
          <p className="mt-4 text-slate-700 leading-relaxed">
            Nous organisons des sessions <strong>formation IA BTP Paris</strong> et en{' '}
            <strong>formation IA bâtiment Île-de-France</strong> : présentiel en salle ou{' '}
            <strong>intra-entreprise</strong> dans vos locaux selon vos contraintes. Interventions possibles
            notamment en <strong>Yvelines</strong>, <strong>Essonne</strong>,{' '}
            <strong>Seine-et-Marne</strong>, <strong>Val-d&apos;Oise</strong>,{' '}
            <strong>Hauts-de-Seine</strong>, <strong>Seine-Saint-Denis</strong> et{' '}
            <strong>Val-de-Marne</strong> — ainsi qu&apos;à Paris et en petite couronne. Pour le détail des
            formats et des créneaux :{' '}
            <Link href="/formations/ia-btp-paris" className="font-semibold text-[var(--accent)] hover:underline">
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
            éligibilités varient : nous pouvons orienter selon votre situation.
          </p>
          <p className="mt-6">
            <Link
              href="/financement-constructys-formation-ia-btp"
              className="inline-flex items-center gap-2 font-semibold text-[var(--accent)] hover:underline"
            >
              Guide financement Constructys — formation IA BTP
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
            title="Questions fréquentes — formation IA bâtiment (BTP-01)"
          />
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-[var(--accent)] px-4 py-16 text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold">
            Prêt à gagner du temps sur vos devis et votre administratif ?
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Contactez-nous pour organiser cette formation dans votre entreprise du bâtiment.
          </p>
          <p className="mt-2 text-blue-100">
            Financement OPCO selon éligibilité. Session {SESSION_DUREE_LIBELLE} — forfait{' '}
            {TARIF_FORFAIT_DEBUTANT_HT} € HT / participant (niveau débutant).
          </p>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            <RdvLink className="flex items-center justify-center gap-2 rounded-xl border-2 border-white bg-white px-6 py-4 font-semibold text-[var(--accent)] hover:bg-blue-50">
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
