import Link from 'next/link';
import { RdvLink } from '@/components/RdvLink';
import {
  Sparkles,
  Route,
  Microscope,
  Cable,
  Gavel,
  FileBarChart,
  Building2,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import { FAQSection } from '@/components/landing/FAQSection';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { RenvoiFicheCatalogue } from '@/components/qualiopi/RenvoiFicheCatalogue';
import { LiensConnexes } from '@/components/LiensConnexes';
import {
  createPageMetadata,
  getFAQSchema,
} from '@/lib/seo';
import { FAQ_FORMATION_IA_TRAVAUX_PUBLICS_LANDING } from '@/lib/faq';
import { JsonLd } from '@/components/JsonLd';
import { LINKS } from '@/lib/internal-links';

export const revalidate = 3600;
export const metadata = createPageMetadata({
  title: 'IA travaux publics : VRD et terrassement',
  description:
    'Formation IA travaux publics : préparation chantier, VRD, situations et DOE. Contrôle métier, présentiel IDF, Qualiopi, financement OPCO selon éligibilité.',
  descriptionFinal: true,
  path: LINKS.formationIaTravauxPublics,
  keywords: [
    'formation IA travaux publics',
    'IA génie civil',
    'ChatGPT travaux publics',
    'formation IA TP',
    'VRD IA',
    'terrassement IA',
    'OPCO travaux publics',
    'Constructys formation IA',
  ],
});

const CAS_USAGE = [
  {
    icon: Route,
    title: 'Préparation de chantier TP / VRD',
    text: "Check-lists démarrage, phasage, interfaces lots (terrassement, réseaux, enrobés), ordre du jour de réunion de lancement et tableau d'actions — à partir de vos notes et extraits CCTP.",
  },
  {
    icon: Gavel,
    title: 'Consultations fournisseurs',
    text: "Structurer demandes de prix, comparatifs de réponses et relances : postes, délais, hypothèses — sans inventer de tarifs ni se substituer à votre politique d'achats.",
  },
  {
    icon: FileBarChart,
    title: 'Rapports, suivi des actions et situations',
    text: "Comptes rendus, reporting d'avancement, brouillons de situations de travaux à partir des quantités que vous fournissez — validation financière et contractuelle humaine obligatoire.",
  },
  {
    icon: Cable,
    title: 'Suivi VRD, réseaux et DOE',
    text: "Courriers concessionnaires, notes de récolement, structure de DOE / DIUO : trames et listes de pièces — jamais une conformité automatique aux exigences du marché.",
  },
  {
    icon: Microscope,
    title: "Marchés publics et lecture de DCE",
    text: "Synthèses d'exigences, points sensibles CCTP/CCAP, questions de clarification et esquisse de mémoire technique — sous vos procédures internes de validation.",
  },
];

/** Exemple pédagogique fictif — ne pas présenter comme un cas client réel. */
const EXEMPLE_FICTIF_TP = {
  titre: 'Exemple pédagogique fictif — opération VRD voirie / réseaux',
  contexte:
    'PME TP fictive répond à une consultation pour réfection de voirie et réseaux secs. Le CCTP impose un phasage par zones et un DOE avec plans de récolement. L’équipe dispose de notes de visite et d’un extrait de DPGF.',
  livrableIa:
    'Check-list de préparation chantier, tableau actions (responsables / échéances), trame de situation mensuelle et sommaire DOE à compléter.',
  controleHumain:
    'Vérifier chaque exigence sur les pièces sources, les quantités et les prix ; aucune conformité DOE ni calcul de situation n’est « validée » par l’IA seule.',
};

const MODULES = [
  {
    title: 'Fondamentaux & cadre TP',
    desc: "Cartographie des usages de l'IA générative dans les TP : limites, confidentialité, validation humaine. Vocabulaire métier (VRD, terrassement, enrobés, ouvrages d'art).",
  },
  {
    title: 'Planification, interfaces et acteurs',
    desc: "Organisation de projet : qui produit quoi entre direction travaux, méthodes et exploitation. Prompts pour cadrer les échanges avec le maître d'ouvrage public et coordonner les corps de métier.",
  },
  {
    title: "Données d'études et sols",
    desc: "Structuration de synthèses à partir d'études de sol et de pièces techniques — pour préparer le terrain sans survendre l'outil.",
  },
  {
    title: 'VRD, réseaux et exploitation chantier',
    desc: "Modèles de courriers et de suivis adaptés aux aléas de réseaux, aux coordinations et aux exigences de traçabilité sur le terrain.",
  },
  {
    title: "Marchés publics & réponses aux consultations",
    desc: "Chaîne de travail : cadrage DCE, questions, esquisse de mémoire technique — alignée sur vos validations internes avant envoi.",
  },
  {
    title: 'Industrialisation & capitalisation',
    desc: "Templates TP, bibliothèque de prompts, charte d'usage et bonnes pratiques pour que l'équipe garde le même niveau de qualité après la formation.",
  },
];

export default function FormationIATravauxPublicsLandingPage() {
  const faqSchema = getFAQSchema(FAQ_FORMATION_IA_TRAVAUX_PUBLICS_LANDING);

  return (
    <div>
      <JsonLd id="schema-faq-page" schema={faqSchema} />

      <section className="border-b border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-16 text-white md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-[var(--accent)]">
            <Sparkles size={18} strokeWidth={1.5} aria-hidden />
            Formation IA travaux publics · Laure Olivié
          </p>
          <h1 className="mt-6 font-display text-2xl font-bold leading-tight md:text-2xl lg:text-2xl">
            Formation IA travaux publics — terrassement, VRD et génie civil
          </h1>
          <p className="mt-6 text-lg text-slate-300 md:text-xl">
            L&apos;intelligence artificielle entre dans les bureaux d&apos;études, les directions
            travaux et les chantiers{' '}
            <strong className="text-white">routes, terrassement, VRD et réseaux</strong>. Cette page
            présente une <strong className="text-white">formation IA travaux publics</strong>{' '}
            orientée préparation, consultations, reporting et DOE — avec contrôle métier obligatoire.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#contact-tp"
              className="inline-flex w-full items-center justify-center rounded-xl bg-[var(--accent)] px-8 py-4 font-semibold text-white transition-colors hover:bg-blue-600 sm:w-auto"
            >
              Contacter OFC — devis formation IA TP
              <ArrowRight className="ml-2 h-5 w-5" strokeWidth={1.5} aria-hidden />
            </a>
            <RdvLink className="inline-flex w-full items-center justify-center rounded-xl border-2 border-white/70 px-8 py-4 font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto" />
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-2xl">
            L&apos;IA arrive dans les TP — pas seulement dans le bâtiment
          </h2>
          <div className="mt-6 space-y-4 text-slate-700">
            <p>
              Pendant longtemps, les exemples d&apos;IA appliquée au secteur ont été centrés sur le
              gros œuvre, les lots techniques bâtiment ou la rédaction de devis &quot;classiques&quot;.
              Or les <strong>travaux publics</strong> ont leurs propres cycles : marchés publics
              exigeants, phases d&apos;études longues, interfaces avec les collectivités,{' '}
              <strong>VRD</strong> et <strong>terrassement</strong>, couches d&apos;
              <strong>enrobés</strong>, <strong>ouvrages d&apos;art</strong>, contraintes de
              trafic et sécurité. Une <strong>formation IA TP</strong> sérieuse doit parler ce
              langage — celui des conducteurs de travaux, des méthodes et des chargés d&apos;affaires
              qui répondent à un <strong>maître d&apos;ouvrage public</strong>.
            </p>
            <p>
              Avec <strong>ChatGPT travaux publics</strong> (ou d&apos;autres assistants du même
              type), l&apos;enjeu n&apos;est pas de &quot;faire écrire l&apos;IA à votre place&quot;
              sans contrôle : il s&apos;agit de structurer l&apos;information, d&apos;accélérer les
              premières versions de documents répétitifs et de libérer du temps pour la décision
              technique et la relation client. Les sessions sont dispensées par{' '}
              <Link href={LINKS.aPropos} className="font-medium text-[#377CF3] hover:underline">
                OFC Création d&apos;Entreprise, organisme de formation IA BTP
              </Link>{' '}
              — Laure Olivié, formatrice avec expérience terrain TP, place la{' '}
              <strong>validation humaine</strong> au centre de la démarche.
            </p>
            <p>
              En formation, les équipes TP travaillent notamment sur : repérage des exigences d&apos;un{' '}
              <strong>CCTP VRD</strong>, structuration d&apos;un mémoire technique, synthèse
              documentaire de chantier et organisation des actions et points de suivi — sur pièces
              autorisées ou anonymisées, jamais présentées comme des réalisations clients.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-display text-2xl font-bold text-slate-900 md:text-2xl">
            Cas d&apos;usage IA dans les travaux publics
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-slate-600">
            Cinq exemples concrets — préparation, consultations, situations, DOE — pour une{' '}
            <strong>IA génie civil</strong> opérationnelle, sous validation humaine.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CAS_USAGE.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <item.icon
                  className="h-10 w-10 text-[var(--accent)]"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <h3 className="mt-4 font-display text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-amber-50/80 px-4 py-14">
        <div className="mx-auto max-w-3xl rounded-2xl border border-amber-200 bg-white p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">
            Exemple pédagogique fictif
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold text-slate-900 md:text-2xl">
            {EXEMPLE_FICTIF_TP.titre}
          </h2>
          <p className="mt-4 leading-relaxed text-slate-700">{EXEMPLE_FICTIF_TP.contexte}</p>
          <p className="mt-3 leading-relaxed text-slate-700">
            <strong className="text-slate-900">Livrable assisté par l&apos;IA :</strong>{' '}
            {EXEMPLE_FICTIF_TP.livrableIa}
          </p>
          <p className="mt-3 leading-relaxed text-slate-700">
            <strong className="text-slate-900">Contrôle humain obligatoire :</strong>{' '}
            {EXEMPLE_FICTIF_TP.controleHumain}
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-2xl">
            Programme de la formation (vision TP)
          </h2>
          <p className="mt-4 text-slate-600">
            Le parcours catalogue détaillé (NIV-01 — 4 h, programme PDF) est rappelé en bas de page
            via l&apos;encart Qualiopi. Voici la logique en six modules, pensée pour une{' '}
            <strong>formation IA TP</strong> exigeante.
          </p>
          <ol className="mt-10 space-y-6">
            {MODULES.map((mod, i) => (
              <li
                key={mod.title}
                className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-6"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-slate-900">{mod.title}</h3>
                  <p className="mt-2 text-slate-700">{mod.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 px-4 py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="flex items-center gap-3 font-display text-2xl font-bold text-slate-900 md:text-2xl">
            <Building2 className="h-8 w-8 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
            Différence avec le bâtiment : pourquoi les TP ont des besoins spécifiques
          </h2>
          <div className="mt-6 space-y-4 text-slate-700">
            <p>
              Dans le <strong>bâtiment</strong>, on pense souvent lots, corps d&apos;état,
              planning de coordination en phase travaux. Dans les <strong>travaux publics</strong>,
              on ajoute la dimension <strong>linéaire</strong> des chaussées, les interfaces avec
              les réseaux, les arrêtés de circulation, la reprise d&apos;exploitation, et souvent des
              procédures de <strong>marchés publics</strong> plus systématiques pour les gros
              projets. Les documents types (comptes rendus, synthèses, mémoires) ne sont pas les
              mêmes ; les délais de réponse non plus.
            </p>
            <p>
              Une formation qui mélange tout sous l&apos;étiquette &quot;BTP&quot; risque de laisser
              votre équipe sur le bord de la route — au sens propre. Ici, le contenu et les ateliers
              sont orientés <strong>génie civil</strong>, <strong>routes</strong> et{' '}
              <strong>infrastructures</strong>, avec des cas qui parlent aux équipes TP. C&apos;est
              ce qui permet de viser une visibilité forte sur la requête{' '}
              <strong>formation IA travaux publics</strong> : une offre claire, peu saturée, face à
              des parcours longs ou très chers ailleurs.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-2xl">
            Modalités &amp; financement (Constructys, OPCO TP)
          </h2>
          <div className="mt-6 space-y-4 text-slate-700">
            <p>
              La formation est délivrée par <strong>OFC Création d&apos;Entreprise</strong>, organisme{' '}
              <strong>certifié Qualiopi</strong> — critère déterminant pour une prise en charge
              OPCO. Pour les entreprises du secteur BTP et des travaux publics, le financement passe
              en général par l&apos;<strong>OPCO Constructys</strong> (périmètre BTP / TP / négoce
              de matériaux), dans le cadre du plan de développement des compétences. Les modalités
              exactes (plafonds, délais de dépôt sur la plateforme eGestion) évoluent : je vous
              indiquons les repères à jour sur votre <strong>devis personnalisé</strong>.
            </p>
            <p>
              Format : <strong>présentiel</strong> intra (dans vos locaux) ou inter en Île-de-France.
              L&apos;objectif est que les participants repartent avec des modèles réutilisables sur leurs vrais
              dossiers — anonymisés si nécessaire.
            </p>
          </div>
          <ul className="mt-8 space-y-3">
            <li className="flex gap-3 text-slate-700">
              <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" strokeWidth={1.5} />
              Qualiopi — financement OPCO dans les règles du dispositif
            </li>
            <li className="flex gap-3 text-slate-700">
              <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" strokeWidth={1.5} />
              Inter / intra possible selon vos effectifs et vos chantiers
            </li>
            <li className="flex gap-3 text-slate-700">
              <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" strokeWidth={1.5} />
              <Link
                href={LINKS.financement}
                className="text-[var(--accent)] underline-offset-2 hover:underline"
              >
                Guide financement Constructys — modalités et délais
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-16 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold md:text-2xl">
            Contacter OFC pour une formation IA travaux publics
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Décrivez votre structure (routes, VRD, génie civil, terrassement…) et le nombre de
            participants : proposition adaptée et options de{' '}
            <strong>prise en charge OPCO selon éligibilité</strong>.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#contact-tp"
              className="inline-flex items-center justify-center rounded-xl bg-[var(--accent)] px-8 py-4 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Demander un devis
            </a>
            <RdvLink className="inline-flex items-center justify-center rounded-xl border-2 border-white/70 px-8 py-4 font-semibold text-white transition-colors hover:bg-white/10" />
          </div>
        </div>
      </section>

      <section
        id="contact-tp"
        className="scroll-mt-24 border-b border-slate-200 bg-white px-4 py-10"
      >
        <div className="mx-auto flex max-w-3xl flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-slate-700">
            Écrivez à OFC ou réservez une visio découverte — sans engagement.
          </p>
          <Link
            href={LINKS.contact}
            className="inline-flex items-center justify-center rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Formulaire de contact
          </Link>
        </div>
      </section>

      <FAQSection
        items={FAQ_FORMATION_IA_TRAVAUX_PUBLICS_LANDING}
        title="Questions fréquentes — formation IA travaux publics"
        subtitle="Public cible TP, financement, marchés publics et formats — réponses directes."
      />

      <div className="border-t border-slate-200 bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <Link href={LINKS.home} className="font-medium text-[var(--accent)] hover:underline">
            ← Accueil
          </Link>
          <span className="mx-2 text-slate-400">·</span>
          <Link href={LINKS.formations} className="font-medium text-[var(--accent)] hover:underline">
            Catalogue formations
          </Link>
          <div className="mt-8">
            <LiensConnexes
              currentPath={LINKS.formationIaTravauxPublics}
              excludeHrefs={[
                LINKS.formations,
                LINKS.formationIaBtpNiveau1BatimentTp,
                LINKS.financement,
                LINKS.contact,
              ]}
            />
            <AllerPlusLoin
              links={[
                { href: LINKS.formationIaChefChantierTp, label: 'Formation IA chef de chantier TP' },
                { href: LINKS.formationConducteurTravaux, label: 'Formation IA conducteur de travaux' },
                { href: LINKS.formationAO, label: "IA appels d'offres BTP (NIV-02)" },
                { href: LINKS.formationIaBureauEtudesBtp, label: "Formation IA bureau d'études BTP" },
                {
                  href: LINKS.formationIaAchatsApprovisionnementBtp,
                  label: 'Formation IA achats & approvisionnement BTP',
                },
              ]}
            />
          </div>
        </div>
      </div>

      <RenvoiFicheCatalogue programmeRef="NIV-01" contexte="pour les entreprises de travaux publics" />
    </div>
  );
}
