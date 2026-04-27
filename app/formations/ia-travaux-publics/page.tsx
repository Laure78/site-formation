import Link from 'next/link';
import { FooterTelOrMailLink, PublicPhoneCta } from '@/components/PublicPhoneCta';
import { RdvLink } from '@/components/RdvLink';
import {
  Check,
  Mail,
  Clock,
  MapPin,
  Users,
  FileText,
  Award,
  DollarSign,
  FolderOpen,
  Bot,
  Map,
  Monitor,
  ClipboardList,
  Laptop,
  Sparkles,
  UserCircle,
} from 'lucide-react';
import { ProgrammeAccordionTP } from '@/components/formations/ProgrammeAccordionTP';
import { FAQSection } from '@/components/landing/FAQSection';
import { JsonLd } from '@/components/JsonLd';
import { CourseSchema } from '@/components/seo/CourseSchema';
import {
  createPageMetadata,
  getFAQSchema,
  SITE_CONFIG,
} from '@/lib/seo';
import { FAQ_TRAVAUX_PUBLICS } from '@/lib/faq';
import {
  SESSION_DUREE_LIBELLE,
  TARIF_FORFAIT_DEBUTANT_HT,
  MODALITE_FORMATIONS_PRESENTIEL,
  COMPTES_IA_GRATUITS_NIVEAU_DEBUTANT,
  LIBELLE_EFFECTIF_GROUPE,
  LIBELLE_EFFECTIF_GROUPE_COURT,
} from '@/lib/tarifs-sessions';
import { PHOTOS } from '@/lib/photos';
import {
  FormationCourseHero,
  FormationHeroPhoto,
} from '@/components/formations/FormationCourseHero';

const MAIL_PROGRAMME_TP =
  `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent('Demande de programme — IA Travaux publics (BTP-04)')}`;
const MAIL_RAPPEL_TP =
  `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent('Être rappelé — formation IA Travaux publics')}`;

export const metadata = createPageMetadata({
  title: "L'IA au service des Travaux Publics : DCE, AO, chantier & industrialisation",
  description:
    `Formation IA travaux publics et BTP : appels d'offre, DCE, mémoire technique terrain, documents chantier. Session ${SESSION_DUREE_LIBELLE}. Forfait ${TARIF_FORFAIT_DEBUTANT_HT} € HT/part. (débutant). Qualiopi, OPCO.`,
  path: '/formations/ia-travaux-publics',
  keywords: [
    'formation IA travaux publics',
    'IA TP',
    'formation IA appels d offres TP',
    'appel d\'offre BTP',
    'rédaction mémoire technique',
    'DCE travaux publics IA',
    'conducteur travaux IA',
    'rapport chantier IA',
    'ChatGPT travaux publics',
    'formation IA infrastructures',
  ],
  image: {
    url: PHOTOS.btpFormationChantierEquipe2026.src,
    width: PHOTOS.btpFormationChantierEquipe2026.width,
    height: PHOTOS.btpFormationChantierEquipe2026.height,
    alt: PHOTOS.btpFormationChantierEquipe2026.alt,
  },
});

const faqSchema = getFAQSchema(FAQ_TRAVAUX_PUBLICS);

const POINTS_MARQUANTS = [
  `Session unique ${SESSION_DUREE_LIBELLE} — contenus TP : consultations / DCE, documents opérationnels, industrialisation (templates + assistants).`,
  `Forfait ${TARIF_FORFAIT_DEBUTANT_HT} € HT par participant (niveau débutant).`,
  `${LIBELLE_EFFECTIF_GROUPE}.`,
  'Présentiel en Île-de-France (inter ou sur devis) ou intra dans vos locaux.',
  '« Boîte à prompts TP » : CR de chantier, situations, relances, trames AO — focus validation humaine.',
];

const OBJECTIFS_FORMATION = [
  'Répondre aux appels d’offres : comprendre comment l’IA générative transforme les métiers des Travaux Publics (études / prépa, conduite de travaux, QSE, achats, administratif, relation MOA / MOE).',
  'Accélérer la réponse aux consultations (marchés publics et privés) : lecture DCE, questions, trames, synthèses et check-lists.',
  'Gagner du temps sur les documents de chantier : comptes rendus, rapports, courriers, relances, situations, DOE / DIUO selon contexte.',
  'Structurer le pilotage : planning, avancement, risques, actions, reporting et capitalisation REX.',
  'Industrialiser l’usage : templates TP, assistants par rôle (conduite, BE, QSE) et protocole de validation « anti-erreurs ».',
  'Maîtriser les bonnes pratiques : confidentialité, traçabilité, conformité et contrôle humain.',
];

const PROFIL_APPRENANTS = [
  'Conducteurs de travaux, chefs de chantier, chefs d’équipe',
  'Bureaux d’études / méthodes / préparation de chantier',
  'QSE / prévention / qualité',
  'Assistants travaux / administratif / facturation',
  'Acheteurs / approvisionneurs / exploitation',
  'Dirigeants et managers d’entreprises de Travaux Publics',
];

const MOYENS_PEDAGOGIQUES = [
  `Formation animée par une formatrice experte en IA appliquée au BTP et aux TP — ${MODALITE_FORMATIONS_PRESENTIEL}`,
  'Exercices guidés, cas concrets et templates réutilisables (prompts, trames, check-lists).',
  'Atelier mise en situation sur vos documents (anonymisés si nécessaire) et vos scénarios TP.',
  'Supports et ressources selon la convention.',
];

const MOYENS_TECHNIQUES = [
  'En présentiel : salle équipée, connexion internet, poste par apprenant si possible.',
  COMPTES_IA_GRATUITS_NIVEAU_DEBUTANT,
  'Utiliser des données non sensibles ou anonymisées ; définir en amont un protocole de validation interne.',
];

const MODALITES_EVALUATION = [
  'Questionnaire de positionnement en amont.',
  'Évaluation continue via cas pratiques : livrables (trames AO, CR, check-lists, reporting, procédures).',
  'Questionnaire de fin de formation + plan d’actions « 30 jours » pour le déploiement en équipe.',
  'Questionnaire de satisfaction et attestation de formation.',
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
    secondary: 'Sessions inter en salle en Île-de-France ; intra dans vos locaux (France)',
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
    primary: 'Encadrement, méthodes, QSE, support',
    secondary: 'Voir encadré « Profil des apprenants » ci-dessous',
  },
  {
    icon: FileText,
    title: 'Pré-requis',
    primary: 'Aucune compétence technique',
    secondary: COMPTES_IA_GRATUITS_NIVEAU_DEBUTANT,
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
    title: 'Pack templates & prompts TP',
    desc: 'Trames prêtes à l’emploi (AO, CR, reporting, REX) alignées sur la session 4 h.',
  },
  {
    icon: Bot,
    title: 'Assistants IA par rôle',
    desc: 'Schémas de configuration (conduite, méthodes/BE, QSE) et règles de validation humaine.',
  },
  {
    icon: Map,
    title: 'Charte et plan de déploiement',
    desc: 'Cadre d’usage, checklist anti-erreurs et pistes pour un déploiement sur 30 jours.',
  },
  {
    icon: Monitor,
    title: 'Ressources de suivi',
    desc: 'Supports de formation et ressources téléchargeables selon modalités convenues avec l’organisme.',
  },
];

export default function FormationIATravauxPublicsPage() {
  return (
    <div>
      <CourseSchema
        name="L'IA au service des Travaux Publics (BTP-04)"
        description={`Formation IA travaux publics et BTP : appels d'offre, DCE, mémoire technique terrain, documents chantier.`}
        url="https://laureolivie.fr/formations/ia-travaux-publics"
        duration="PT4H"
        price={100}
        level="Beginner"
      />
      <JsonLd id="schema-faq" schema={faqSchema} />

      <FormationCourseHero
        refLine="Réf. catalogue BTP-04 · Débutant"
        title={
          <>
            <span className="text-[var(--accent)]">L&apos;IA au service des Travaux Publics</span>
            {' '}
            : DCE, AO, chantier &amp; industrialisation
          </>
        }
        subtitle="Consultations, documents de chantier et industrialisation de l&apos;usage"
        badges={[
          'OPCO / plan de développement des compétences',
          'Accessible débutant',
          'Cas terrain TP',
        ]}
        summaryIcon={Sparkles}
        summaryItems={POINTS_MARQUANTS}
        image={
          <FormationHeroPhoto
            src={PHOTOS.btpFormationChantierEquipe2026.src}
            alt={PHOTOS.btpFormationChantierEquipe2026.alt}
            width={PHOTOS.btpFormationChantierEquipe2026.width}
            height={PHOTOS.btpFormationChantierEquipe2026.height}
            priority
          />
        }
        ctas={
          <>
            <RdvLink className="rounded-xl bg-[var(--accent)] px-6 py-3.5 text-center font-semibold text-white hover:bg-blue-600">
              Prendre rendez-vous
            </RdvLink>
            <a
              href={MAIL_PROGRAMME_TP}
              className="rounded-xl border-2 border-slate-200 px-6 py-3.5 text-center font-semibold text-slate-800 hover:border-[var(--accent)]"
            >
              Demander le programme
            </a>
            <a
              href={MAIL_RAPPEL_TP}
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
              href="/formation-ia-travaux-publics"
              className="font-medium text-slate-600 hover:text-[var(--accent)] hover:underline"
            >
              Vue d&apos;ensemble formation TP
            </Link>
            <FooterTelOrMailLink className="font-medium text-slate-600 hover:text-[var(--accent)] hover:underline" />
          </>
        }
      >
        <p>
          Session de <strong>{SESSION_DUREE_LIBELLE}</strong> pour cadrer l&apos;IA générative sur les enjeux
          TP : <strong>appels d&apos;offres et DCE</strong>, documents de chantier et reporting, puis{' '}
          <strong>templates et assistants</strong> et charte d&apos;usage avec validation « anti-erreurs ».{' '}
          <strong>Forfait {TARIF_FORFAIT_DEBUTANT_HT} € HT par participant</strong> (niveau débutant).
          Financement possible via <strong>l&apos;OPCO Constructys</strong> selon éligibilité (formation
          certifiée Qualiopi).
        </p>
        <p className="mt-4 text-sm text-slate-600">
          <Link
            href="/formation-ia-travaux-publics"
            className="font-medium text-[var(--accent)] underline-offset-2 hover:underline"
          >
            Formation IA travaux publics
          </Link>{' '}
          — vue d&apos;ensemble (routes, VRD, génie civil, financement) sur une page dédiée.
        </p>
      </FormationCourseHero>

      {/* Objectifs */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">Objectifs</h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            À l&apos;issue du parcours, vous êtes en mesure de :
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

      {/* Profil des apprenants */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">Profil des apprenants</h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PROFIL_APPRENANTS.map((line) => (
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

      {/* Programme détaillé */}
      <section id="programme" className="scroll-mt-24 border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">
            Programme détaillé de la formation
          </h2>
          <p className="mt-3 text-slate-600">
            <strong>{SESSION_DUREE_LIBELLE}</strong> — progression condensée : consultations et
            DCE, documents de chantier / reporting / QSE, puis industrialisation (templates,
            assistants, charte).
          </p>
          <ProgrammeAccordionTP />
        </div>
      </section>

      {/* Modalités pratiques */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">Modalités pratiques</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MODALITES.map((mod) => (
              <div
                key={mod.title}
                className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50/50 p-6"
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
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
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
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-2 text-[var(--accent)]">
            <ClipboardList size={24} strokeWidth={1.5} aria-hidden />
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              Modalités d&apos;évaluation
            </h2>
          </div>
          <ul className="mt-8 space-y-3 text-slate-700">
            {MODALITES_EVALUATION.map((line) => (
              <li key={line} className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" strokeWidth={2} />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Livrables & Ressources */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">Livrables & ressources</h2>
          <p className="mt-3 text-slate-600">
            Ce que vous repartez pour capitaliser après la session — angle livrables et déploiement en
            entreprise.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {LIVRABLES.map((item) => (
              <div
                key={item.title}
                className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
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
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <FAQSection
            items={FAQ_TRAVAUX_PUBLICS}
            title="Questions fréquentes — L'IA au service des Travaux Publics"
          />
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-[var(--accent)] px-4 py-16 text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold">
            Prêt à intégrer l&apos;IA dans vos Travaux Publics ?
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Contactez-nous pour organiser cette formation dans votre entreprise TP.
          </p>
          <p className="mt-2 text-blue-100">
            Financement OPCO selon éligibilité. Session {SESSION_DUREE_LIBELLE} — forfait{' '}
            {TARIF_FORFAIT_DEBUTANT_HT} € HT / participant (niveau débutant).
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <PublicPhoneCta className="flex items-center gap-2 rounded-xl border-2 border-white/60 bg-white px-8 py-4 font-semibold text-[var(--accent)] hover:bg-blue-50" />
            <RdvLink className="flex items-center gap-2 rounded-xl border-2 border-white bg-transparent px-8 py-4 font-semibold text-white hover:bg-white/10">
              <Mail size={20} strokeWidth={1.5} />
              Prendre RDV
            </RdvLink>
          </div>
        </div>
      </section>
    </div>
  );
}
