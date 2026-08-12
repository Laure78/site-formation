import Link from 'next/link';
import { RdvLink } from '@/components/RdvLink';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
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
import {
  createPageMetadata,
  getFAQSchema,
} from '@/lib/seo';
import { FAQ_FORMATION_IA_TRAVAUX_PUBLICS_LANDING } from '@/lib/faq';
import { JsonLd } from '@/components/JsonLd';
import { LINKS } from '@/lib/internal-links';

export const revalidate = 3600;
export const metadata = createPageMetadata({
  title: 'Formation IA travaux publics — ChatGPT',
  description:
    "Formation IA pour les travaux publics : planification TP, VRD, études de sol, appels d'offres publics, génie civil. Qualiopi, Constructys. RDV gratuit.",
  path: '/formation-ia-travaux-publics',
  keywords: [
    'formation IA travaux publics',
    'IA génie civil',
    'ChatGPT travaux publics',
    'formation IA TP',
    'VRD IA',
    'OPCO travaux publics',
    'Constructys formation IA',
  ],
});

const CAS_USAGE = [
  {
    icon: Route,
    title: 'Planification et pilotage TP',
    text: "Structurer les jalons d'une opération routes ou infrastructures : synthèses de réunions de lancement, relances vers le maître d'ouvrage public, clarification des interfaces entre lots terrassement, enrobés et VRD.",
  },
  {
    icon: Microscope,
    title: 'Études de sol et données techniques',
    text: "Transformer des rapports géotechniques ou des extraits d'études en synthèses exploitables pour l'équipe chantier — sans remplacer l'expert : gagner du temps sur la mise en forme et la diffusion.",
  },
  {
    icon: Cable,
    title: 'Suivi VRD et réseaux',
    text: "Courriers techniques, comptes rendus de récolement, demandes d'information auprès des concessionnaires : modèles de textes adaptés aux contraintes des réseaux secs et humides en zone d'emprise.",
  },
  {
    icon: Gavel,
    title: "Appels d'offres publics",
    text: "Lecture accélérée des DCE, identification des points sensibles (CCTP, clauses administratives), brouillons de mémoires techniques et de questions — dans le respect de vos procédures internes de validation.",
  },
  {
    icon: FileBarChart,
    title: 'Rapports de chantier & génie civil',
    text: "Comptes rendus d'inspection ouvrages d'art, synthèses de levées, reporting d'avancement : des trames qui gardent la trace des décisions et sécurisent la communication avec la MOA et les contrôleurs.",
  },
];

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
          <h1 className="mt-6 font-display text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
            Formation IA &amp; ChatGPT pour les Travaux Publics — Routes, VRD, génie civil
          </h1>
          <p className="mt-6 text-lg text-slate-300 md:text-xl">
            L&apos;intelligence artificielle ne concerne pas seulement le bâtiment : elle entre dans
            les bureaux d&apos;études, les directions travaux et les chantiers{' '}
            <strong className="text-white">routes, infrastructures et réseaux</strong>. Cette
            page présente une <strong className="text-white">formation IA travaux publics</strong>{' '}
            pensée pour le terrain TP — pas pour un catalogue &quot;généraliste&quot; recyclé.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-xl bg-[var(--accent)] px-8 py-4 font-semibold text-white transition-colors hover:bg-blue-600 sm:w-auto"
            >
              Première formation IA dédiée aux travaux publics — demandez un devis
              <ArrowRight className="ml-2 h-5 w-5" strokeWidth={1.5} aria-hidden />
            </Link>
            <RdvLink className="inline-flex w-full items-center justify-center rounded-xl border-2 border-white/70 px-8 py-4 font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto">
              Réserver un échange
            </RdvLink>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
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
              technique et la relation client. C&apos;est exactement le positionnement de Laure
              Olivié : une formatrice avec une connaissance terrain du secteur, qui place la{' '}
              <strong>validation humaine</strong> et la conformité au centre de la démarche.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Cas d&apos;usage IA dans les travaux publics
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-slate-600">
            Cinq exemples concrets — de la planification au reporting — pour une{' '}
            <strong>IA génie civil</strong> et opérationnelle, alignée sur vos livrables.
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

      <section className="border-b border-slate-200 bg-white px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Programme de la formation (vision TP)
          </h2>
          <p className="mt-4 text-slate-600">
            Le parcours catalogue détaillé est présenté sur la fiche{' '}
            <Link
              href={LINKS.formationIaBtpNiveau1BatimentTp}
              className="font-semibold text-[var(--accent)] underline-offset-2 hover:underline"
            >
              NIV-01 — L&apos;IA au service des pros du Bâtiment Travaux Publics
            </Link>{' '}
            (4 h, programme PDF). Voici la logique en six modules, pensée pour une{' '}
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
          <p className="mt-8 text-center">
            <Link
              href={`${LINKS.formationIaBtpNiveau1BatimentTp}#programme`}
              className="inline-flex items-center gap-2 font-semibold text-[var(--accent)] hover:underline"
            >
              Voir le programme détaillé sur la fiche NIV-01
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden />
            </Link>
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 px-4 py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="flex items-center gap-3 font-display text-2xl font-bold text-slate-900 md:text-3xl">
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
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
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
              Format : <strong>présentiel</strong> (sessions inter en Île-de-France ou intra dans vos locaux).
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
                href="/financement-constructys-formation-ia-btp"
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
          <h2 className="font-display text-2xl font-bold md:text-3xl">
            Première formation IA dédiée aux travaux publics — demandez un devis
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Décrivez votre structure (routes, VRD, génie civil, terrassement…) et le nombre de
            participants : je reviens vers vous avec une proposition adaptée et les options de{' '}
            <strong>prise en charge OPCO</strong>.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-[var(--accent)] px-8 py-4 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Demander un devis
            </Link>
            <RdvLink className="inline-flex items-center justify-center rounded-xl border-2 border-white/70 px-8 py-4 font-semibold text-white transition-colors hover:bg-white/10">
              Prendre rendez-vous
            </RdvLink>
          </div>
        </div>
      </section>

      <FAQSection
        items={FAQ_FORMATION_IA_TRAVAUX_PUBLICS_LANDING}
        title="Questions fréquentes — formation IA travaux publics"
        subtitle="Public cible TP, financement, marchés publics et formats — réponses directes."
      />

      <div className="border-t border-slate-200 bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <Link href="/" className="font-medium text-[var(--accent)] hover:underline">
            ← Accueil
          </Link>
          <span className="mx-2 text-slate-400">·</span>
          <Link href="/formations" className="font-medium text-[var(--accent)] hover:underline">
            Catalogue formations
          </Link>
          <div className="mt-8">
            <AllerPlusLoin
              links={[
                { href: LINKS.formationIaBtpNiveau1BatimentTp, label: 'Fiche catalogue NIV-01 (4 h, PDF)' },
                { href: LINKS.financement, label: 'Financement Constructys' },
                { href: LINKS.formationAO, label: "IA appels d'offres BTP (NIV-02)" },
                { href: '/blog', label: 'Blog IA BTP' },
                { href: buildSiteCalendlyCtaUrl('formation-ia-travaux-publics-footer-rdv'), label: 'Prendre rendez-vous' },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
