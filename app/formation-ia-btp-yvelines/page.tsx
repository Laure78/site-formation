import Link from 'next/link';
import { RdvLink } from '@/components/RdvLink';
import { CALENDLY_BOOKING_URL, buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { Calendar, Check, MapPin } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { FAQSection } from '@/components/landing/FAQSection';
import { Breadcrumb } from '@/components/Breadcrumb';
import {
  breadcrumbItemsFromPaths,
  createPageMetadata,
  getBreadcrumbSchema,
  getCourseSchema,
  getFAQSchema,
  SITE_CONFIG,
} from '@/lib/seo';
import { FAQ_FORMATION_IA_BTP_YVELINES_LANDING } from '@/lib/faq';
import { LINKS } from '@/lib/internal-links';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import { JsonLd } from '@/components/JsonLd';

const PATH = '/formation-ia-btp-yvelines';

const VILLES_YVELINES = [
  'Versailles',
  'Guyancourt',
  'Saint-Quentin-en-Yvelines',
  'Poissy',
  'Mantes-la-Jolie',
  'Rambouillet',
  'Sartrouville',
  'Vélizy-Villacoublay',
  'Les Mureaux',
  'Montigny-le-Bretonneux',
] as const;

export const metadata = createPageMetadata({
  title:
    'Formation IA pour le BTP Yvelines (78) — ChatGPT pour entreprises du bâtiment',
  description:
    'Formation IA pour les pro du BTP en Yvelines : Versailles, Guyancourt, Saint-Quentin-en-Yvelines, Poissy. Qualiopi. Financement possible selon éligibilité. Formatrice basée à Guyancourt (78).',
  path: PATH,
  keywords: [
    'formation IA appliquée au bâtiment Yvelines',
    'formation ChatGPT BTP 78',
    'formation IA Versailles',
    'formation IA Guyancourt',
    'OPCO Constructys Yvelines',
    'Qualiopi formation IA bâtiment 78',
    'Laure Olivié formation IA pour le BTP',
  ],
});

const courseSchema = getCourseSchema({
  name: 'Formation IA pour les pro du BTP Yvelines (78) — ChatGPT pour entreprises du bâtiment',
  description:
    "Formation IA appliquée au bâtiment dans les Yvelines : ChatGPT et outils d'IA générative pour devis, comptes rendus de chantier et appels d'offres. Présentiel dans le 78. Qualiopi, financement Constructys.",
  path: PATH,
  providerName: SITE_CONFIG.legalName,
  areaServed: [
    'Yvelines',
    'Versailles',
    'Guyancourt',
    'Saint-Quentin-en-Yvelines',
    'Poissy',
    'Mantes-la-Jolie',
    'Rambouillet',
    'Île-de-France',
  ],
  timeRequired: 'PT4H',
  teaches: [
    "Rédaction et structuration de devis BTP avec l'IA",
    'Comptes rendus de chantier et courriers professionnels',
    'Lecture de DCE et brouillons de mémoires techniques',
  ],
});

const faqSchema = getFAQSchema(FAQ_FORMATION_IA_BTP_YVELINES_LANDING);

const breadcrumbJson = getBreadcrumbSchema([
  { name: 'Accueil', path: '/' },
  { name: 'Formations', path: '/formations' },
  { name: 'Formation IA pour le BTP Yvelines (78)', path: PATH },
]);

export default function FormationIABTPYvelinesLandingPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <JsonLd id="schema-faq-page" schema={faqSchema} />

      <Breadcrumb
        items={breadcrumbItemsFromPaths([
          { name: 'Accueil', path: '/' },
          { name: 'Formations', path: '/formations' },
          { name: 'Formation IA pour les pro du BTP Yvelines (78)', path: PATH },
        ])}
      />

      <section className="border-b border-slate-200 bg-white px-4 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
            <MapPin size={16} className="text-[var(--accent)]" aria-hidden />
            Yvelines (78) · Présentiel · Qualiopi
          </div>
          <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-[2.35rem] lg:leading-tight">
            Formation IA appliquée au bâtiment Yvelines (78) — votre formatrice basée à Guyancourt
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-slate-600">
            Vous dirigez une TPE ou une PME du bâtiment dans les Yvelines : entreprise générale,
            second œuvre, travaux publics ou bureau d&apos;études. L&apos;intelligence artificielle
            n&apos;est pas réservée aux grandes structures : avec les bons outils (ChatGPT et
            équivalents) et une méthode adaptée au vocabulaire du chantier, vous pouvez{' '}
            <strong className="text-slate-800">gagner des heures chaque semaine</strong> sur les
            devis, les relances et la paperasse, sans sacrifier la relecture humaine ni la qualité
            des réponses aux marchés publics.
          </p>
          <p className="mt-4 max-w-3xl text-slate-600">
            Je suis <strong className="text-slate-800">Laure Olivié</strong>, formatrice certifiée{' '}
            <strong className="text-slate-800">Qualiopi</strong>, spécialisée dans l&apos;IA et
            ChatGPT pour le secteur BTP. OFC Création d&apos;Entreprise est implanté à{' '}
            <strong className="text-slate-800">Guyancourt</strong> : pour les équipes du département
            78, cela signifie une interlocutrice proche, des déplacements maîtrisés et des exemples
            tirés de la réalité des chantiers d&apos;Île-de-France — de Versailles à Mantes, en
            passant par Saint-Quentin-en-Yvelines et les zones d&apos;activité de Vélizy ou des
            Mureaux.
          </p>

          <div
            className="mt-8 rounded-2xl border border-blue-200 bg-[var(--accent-soft)] px-5 py-4 text-slate-800 md:px-6 md:py-5"
            role="note"
          >
            <p className="text-base font-medium leading-relaxed">
              Formatrice basée à Guyancourt (Saint-Quentin-en-Yvelines) — interventions à domicile
              dans tout le 78 sans frais de déplacement.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <RdvLink className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-8 py-4 font-semibold text-white hover:bg-blue-600">
              <Calendar size={20} strokeWidth={1.5} aria-hidden />
              Réservez votre session en Yvelines
            </RdvLink>
            <Link
              href={LINKS.formationYvelines}
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 px-8 py-4 font-semibold text-slate-900 hover:border-[var(--accent)]"
            >
              Page formation détaillée (78)
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Pourquoi les professionnels du BTP et PME du 78 choisissent la formation IA
          </h2>
          <div className="mt-6 space-y-4 text-slate-600 leading-relaxed">
            <p>
              Le département des Yvelines concentre une filière construction dense : professionnels du BTP,
              entreprises de taille intermédiaire, acteurs des travaux publics et second œuvre.
              Beaucoup jonglent entre chantier, appels d&apos;offres et suivi administratif. La
              pression sur les délais et la marge ne diminue pas ; en revanche, les outils
              d&apos;IA générative permettent aujourd&apos;hui de{' '}
              <Link href={LINKS.iaDevis} className="font-medium text-[var(--accent)] hover:underline">
                accélérer la rédaction des devis
              </Link>
              , de structurer des comptes rendus et de préparer des brouillons de mémoires
              techniques — à condition de travailler sur des prompts et des process concrets, pas sur
              de la théorie généraliste.
            </p>
            <p>
              Les entreprises qui me contactent depuis le 78 recherchent souvent la même chose : un
              format <strong className="text-slate-800">court (4 heures)</strong>,{' '}
              <strong className="text-slate-800">100 % orienté terrain</strong>, avec des exercices
              sur leurs propres modèles (courriers, grilles de chiffrage, extraits de CCTP). La
              certification Qualiopi et la possibilité de financement via l&apos;OPCO{' '}
              <Link
                href={LINKS.financement}
                className="font-medium text-[var(--accent)] hover:underline"
              >
                Constructys
              </Link>{' '}
              rassurent les dirigeants : on parle bien d&apos;une action de formation inscrite dans
              le cadre du plan de développement des compétences, avec des règles claires sur les
              plafonds et l&apos;éligibilité.
            </p>
            <p>
              Choisir une formatrice installée à{' '}
              <strong className="text-slate-800">Guyancourt</strong>, c&apos;est aussi limiter
              l&apos;aléa logistique : déplacement dans vos locaux dans tout le 78, créneaux
              discutés avec votre équipe, et une connaissance des enjeux locaux (marchés publics en
              zone urbaine dense, professionnels du BTP en périphérie, entreprises industrielles près des
              vallées). Plus de{' '}
              <strong className="text-slate-800">
                {formatProfessionalsTrainedCount()} professionnels du BTP
              </strong>{' '}
              ont déjà suivi une formation avec cette approche ; la note moyenne affichée est de{' '}
              <strong className="text-slate-800">{SOCIAL_PROOF.AVERAGE_RATING}</strong>.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-16" id="villes-yvelines">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Villes des Yvelines couvertes en présentiel
          </h2>
          <p className="mt-4 max-w-3xl text-slate-600">
            Les sessions se déroulent <strong className="text-slate-800">dans vos locaux</strong> ou
            sur site selon votre organisation, dans l&apos;ensemble du département. Voici des
            villes et bassins d&apos;emploi où j&apos;interviens régulièrement ou ponctuellement —
            la liste n&apos;est pas exhaustive : si votre commune n&apos;y figure pas,{' '}
            <Link href="/contact" className="font-medium text-[var(--accent)] hover:underline">
              écrivez-moi
            </Link>{' '}
            pour cadrer une session intra.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {VILLES_YVELINES.map((ville) => (
              <li
                key={ville}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800"
              >
                <Check
                  className="shrink-0 text-[var(--accent)]"
                  size={20}
                  strokeWidth={1.5}
                  aria-hidden
                />
                {ville}
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-slate-600 leading-relaxed">
            La proximité avec le pôle de{' '}
            <strong className="text-slate-800">Saint-Quentin-en-Yvelines</strong>, les axes vers
            la Défense et Paris, ou encore les bassins industriels du Val de Seine, facilitent la
            planification des sessions : pas besoin de multiplier les allers-retours coûteux pour
            l&apos;entreprise. L&apos;objectif est que vous restiez concentrés sur vos chantiers et
            vos dossiers, tout en montant en compétence sur l&apos;IA là où elle rapporte le plus —
            rédaction, relances, structuration de réponses techniques.
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Ce que vous apprenez en 4 heures — adapté au marché 78
          </h2>
          <div className="mt-6 space-y-4 text-slate-600 leading-relaxed">
            <p>
              Le module standard dure <strong className="text-slate-800">4 heures</strong>. Ce
              n&apos;est pas une conférence sur l&apos;IA : c&apos;est un atelier où l&apos;on
              manipule ChatGPT (ou un outil équivalent selon votre niveau) sur des cas réels —
              devis, mails clients, synthèse de réunion de chantier, premières pistes pour un
              mémoire technique. On respecte le rythme des équipes du BTP : phrases courtes,
              vocabulaire du CCTP et des bordereaux, et rappels sur ce qu&apos;il ne faut pas coller
              dans un chatbot public (données sensibles, clauses confidentielles).
            </p>
            <p>
              Selon votre secteur dans les Yvelines — bâtiment neuf, rénovation, réseaux, gros œuvre
              ou second œuvre — j&apos;ajuste les exemples. Une entreprise près de{' '}
              <strong className="text-slate-800">Versailles</strong> n&apos;a pas les mêmes
              contraintes qu&apos;une TPE près de{' '}
              <strong className="text-slate-800">Mantes-la-Jolie</strong> ou{' '}
              <strong className="text-slate-800">Rambouillet</strong> : taille des dossiers,
              typologie de clientèle, part de marchés publics vs privés. L&apos;objectif reste
              identique : repartir avec des modèles de prompts et une feuille de route pour la
              semaine suivante, pas avec un PowerPoint oublié au fond du cloud.
            </p>
            <p>
              Pour aller plus loin sur le fond métier, la page{' '}
              <Link href={LINKS.chatgptArtisans} className="font-medium text-[var(--accent)] hover:underline">
                ChatGPT pour entreprises BTP
              </Link>{' '}
              résume l&apos;esprit du dispositif ; le programme détaillé du parcours « L&apos;IA au
              service du bâtiment » est présenté sur{' '}
              <Link href={LINKS.formationIaBtpNiveau1BatimentTp} className="font-medium text-[var(--accent)] hover:underline">
                la fiche formation associée
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Financement Constructys pour les entreprises du 78
          </h2>
          <div className="mt-6 space-y-4 text-slate-600 leading-relaxed">
            <p>
              Les entreprises du BTP relevant de l&apos;OPCO Constructys peuvent financer leur plan
              de développement des compétences, sous réserve d&apos;éligibilité et de montage de
              dossier. Les règles nationales s&apos;appliquent au département 78 comme ailleurs :
              plafonds pédagogiques (notamment 24 € HT/h/participant dans les dispositifs concernés),
              critères de taille d&apos;entreprise, et parfois prise en charge des salaires de
              formation pour les très petites structures. Je ne remplace pas votre service RH ou
              votre comptable : en revanche, je fournis les éléments pédagogiques et administratifs
              habituels pour votre demande de prise en charge.
            </p>
            <p>
              Pour une vue d&apos;ensemble à jour (barèmes, étapes, liens utiles), reportez-vous au{' '}
              <Link href={LINKS.financement} className="font-medium text-[var(--accent)] hover:underline">
                guide financement Constructys — formation IA pour le BTP
              </Link>
              . Vous y trouverez aussi les précisions sur la TVA (intra / inter) lorsque vous
              commandez une formation pour votre équipe.
            </p>
            <p>
              Les plafonds pédagogiques Constructys en vigueur pour les dispositifs concernés
              s&apos;appliquent au coût horaire (par exemple 24 € HT/h/participant dans les cadres
              prévus), avec des plafonds journaliers selon le type de session : votre conseiller
              OPCO ou votre référent RH peut confirmer le montant exact pour votre structure. Mon
              rôle est de vous fournir un programme clair, des objectifs pédagogiques mesurables et
              les pièces habituelles pour constituer le dossier — dans le respect des exigences
              Qualiopi.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={LINKS.financement}
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent-soft)] px-6 py-3 font-medium text-[var(--accent)] hover:bg-blue-100"
            >
              Guide Constructys &amp; financement →
            </Link>
            <Link
              href={LINKS.formations}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-6 py-3 font-medium text-slate-700 hover:border-[var(--accent)]"
            >
              Catalogue des formations →
            </Link>
          </div>
        </div>
      </section>

      <FAQSection
        id="faq-yvelines"
        items={FAQ_FORMATION_IA_BTP_YVELINES_LANDING}
        title="FAQ Yvelines"
        subtitle="Réponses courtes sur les modalités dans le département 78."
      />

      <section className="border-b border-slate-200 bg-[var(--accent)] px-4 py-16 text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold">Réserver votre créneau</h2>
          <p className="mt-4 text-blue-100">
            Échange gratuit de 30 minutes pour cadrer votre besoin (intra dans le 78, inter
            Île-de-France, financement). Choisissez un horaire dans l&apos;agenda en ligne.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <RdvLink className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-[var(--accent)] hover:bg-blue-50">
              <Calendar size={20} strokeWidth={1.5} aria-hidden />
              Réservez votre session en Yvelines
            </RdvLink>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/70 px-8 py-4 font-semibold text-white hover:bg-white/10"
            >
              Page contact
            </Link>
          </div>
          <p className="mt-6 text-sm text-blue-100">
            Lien direct Calendly :{' '}
            <a
              href={buildSiteCalendlyCtaUrl('formation-ia-btp-yvelines-contact-rdv-page-calendly')}
              className="underline underline-offset-2 hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              {CALENDLY_BOOKING_URL}
            </a>
          </p>
        </div>
      </section>

      <div className="border-t border-slate-200 bg-slate-50 px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <AllerPlusLoin
            links={[
              { href: LINKS.formationYvelines, label: 'Formation IA pour les pro du BTP Yvelines (78) — fiche détaillée' },
              { href: LINKS.formationSaintQuentinYvelines, label: 'Formation IA appliquée au bâtiment Saint-Quentin-en-Yvelines' },
              { href: LINKS.formationIleDeFrance, label: 'Formation IA pour le BTP Île-de-France' },
              { href: LINKS.formations, label: 'Catalogue formations' },
              { href: LINKS.financement, label: 'Financement Constructys' },
              { href: LINKS.chatgptArtisans, label: 'ChatGPT pour entreprises BTP' },
              { href: '/blog', label: 'Blog IA & BTP' },
              { href: LINKS.aPropos, label: 'À propos de Laure Olivié' },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
