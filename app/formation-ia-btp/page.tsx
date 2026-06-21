import Link from 'next/link';
import { OfcPromoVideoEmbed } from '@/components/media/OfcPromoVideoEmbed';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd } from '@/components/JsonLd';
import { RdvLink } from '@/components/RdvLink';
import { FAQSection } from '@/components/landing/FAQSection';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { InlinePublicPhoneLink } from '@/components/PublicPhoneCta';
import { LINKS } from '@/lib/internal-links';
import {
  breadcrumbItemsFromPaths,
  createPageMetadata,
  getBreadcrumbSchema,
  getCourseSchema,
  getFAQSchema,
  SITE_CONFIG,
  siteHasPublicPhone,
} from '@/lib/seo';
import { FAQ_FORMATION_IA_BTP_PILLAR } from '@/lib/formation-ia-btp-pillar-faq';
import { PHOTOS } from '@/lib/photos';
import { SCHEMA_STATS } from '@/lib/schema-constants';
import { SOCIAL_PROOF } from '@/lib/constants';
import { Reveal, RevealGroup } from '@/components/motion/Reveal';
export const revalidate = 3600;
const PATH = '/formation-ia-btp';

const ogImage = PHOTOS.formationIaBtpOgPortrait2026;

const personnesFormeesAffiche = `${Number(SCHEMA_STATS.personnesFormees).toLocaleString('fr-FR')}+`;

export const metadata = createPageMetadata({
  title: 'Formation IA appliquée au bâtiment Île-de-France — ChatGPT 2026',
  description:
    'Formation IA pour le BTP en Île-de-France : ChatGPT pour devis, AO, chantier. 1 592 pros formés. Qualiopi. Visio découverte gratuite.',
  path: PATH,
  appendAuthorSuffix: false,
  openGraphTitle: 'Formation IA pour les pro du BTP Île-de-France — ChatGPT 2026',
  openGraphDescription:
    'Formation IA appliquée au bâtiment en Île-de-France : ChatGPT pour devis, AO, chantier. 1 592 pros formés. Qualiopi. Visio découverte gratuite.',
  image: {
    url: ogImage.src,
    width: ogImage.width,
    height: ogImage.height,
    alt: ogImage.alt,
  },
  keywords: [
    'formation IA pour le BTP',
    'formation ChatGPT BTP',
    'formation intelligence artificielle bâtiment',
    'Qualiopi',
    'OPCO Constructys',
    'Île-de-France',
    'Grand Paris',
    'Laure Olivié',
  ],
});

const courseName =
  'Formation IA pour les pro du BTP — ChatGPT pour le Bâtiment en Île-de-France';

const courseBase = getCourseSchema({
  name: courseName,
  description:
    "Formation pratique à l'IA et ChatGPT pour les professionnels du BTP : devis, appels d'offres, gestion de chantier, communication. Certifiée Qualiopi. Financement possible selon éligibilité.",
  path: PATH,
  providerName: SITE_CONFIG.legalName,
  areaServed: ['Île-de-France', 'Grand Paris', 'Yvelines', 'Paris', 'France'],
  teaches: [
    'Utilisation de ChatGPT pour les devis BTP',
    "IA pour les appels d'offres et mémoires techniques",
    'Automatisation des comptes rendus de chantier',
    "Rédaction professionnelle avec l'IA pour le BTP",
    'Prompts adaptés aux métiers du bâtiment',
  ],
});

const courseJsonLd = {
  ...courseBase,
  educationalCredentialAwarded: 'Attestation de formation certifiée Qualiopi',
  hasCourseInstance: {
    '@type': 'CourseInstance',
    name: courseName,
    courseMode: ['https://schema.org/OnSite'],
    location: {
      '@type': 'Place',
      name: 'Île-de-France (Paris, 78, 91, 92, 93, 94, 95)',
    },
    offers: {
      '@type': 'Offer',
      category: 'Formation professionnelle continue — financement possible selon éligibilité',
      priceCurrency: 'EUR',
    },
  },
  audience: {
    '@type': 'Audience',
    audienceType:
      "Professionnels du BTP — conducteurs de travaux, chefs d'entreprise, chargés d'affaires, fonctions support",
  },
  instructor: {
    '@type': 'Person',
    '@id': `${SITE_CONFIG.url}/#person`,
    name: SITE_CONFIG.name,
    jobTitle: 'Formatrice IA & ChatGPT spécialisée BTP',
    url: `${SITE_CONFIG.url}/a-propos/`,
  },
};

const faqJsonLd = getFAQSchema(FAQ_FORMATION_IA_BTP_PILLAR);

const breadcrumbJsonLd = getBreadcrumbSchema([
  { name: 'Accueil', path: '/' },
  { name: 'Formation IA appliquée au bâtiment', path: PATH },
]);

function CtaVisio({ className }: { className?: string }) {
  return (
    <RdvLink
      className={
        className ??
        'inline-flex items-center justify-center rounded-lg bg-[var(--accent)] px-6 py-3.5 text-center font-semibold text-white shadow-sm hover:bg-blue-700'
      }
    >
      Je réserve ma visio gratuite
    </RdvLink>
  );
}

function BlocCtaHaut() {
  return (
    <div className="not-prose rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
      <p className="font-display text-lg font-bold text-slate-900">
        Votre formation IA pour le BTP, financement possible selon éligibilité.
      </p>
      <p className="mt-2 text-slate-700">
        Réservez votre visio découverte gratuite — 30 min pour savoir si la formation vous convient.
      </p>
      <div className="mt-4">
        <CtaVisio />
      </div>
    </div>
  );
}

function BlocCtaMilieu() {
  return (
    <div className="not-prose rounded-2xl border-2 border-[var(--accent)] bg-white p-6 shadow-md">
      <p className="font-display text-lg font-bold text-slate-900">Pas sûr(e) d&apos;être éligible Constructys ?</p>
      <p className="mt-2 text-slate-700">
        En 30 minutes de visio, je vérifie votre situation et vous explique exactement ce que Constructys prend en
        charge pour votre entreprise.
      </p>
      <div className="mt-4">
        <CtaVisio />
      </div>
    </div>
  );
}

export default function FormationIaBtpPillarPage() {
  return (
    <div className="bg-white">
      <JsonLd id="schema-formation-ia-btp-course" schema={courseJsonLd} />
      <JsonLd id="schema-formation-ia-btp-faq" schema={faqJsonLd} />
      <JsonLd id="schema-formation-ia-btp-breadcrumb" schema={breadcrumbJsonLd} />

      <Breadcrumb
        items={breadcrumbItemsFromPaths([
          { name: 'Accueil', path: '/' },
          { name: 'Formation IA pour les pro du BTP', path: PATH },
        ])}
        showVisual
        className="mx-auto max-w-4xl px-4 pt-8"
      />

      <header className="border-b border-slate-200 bg-gradient-to-br from-slate-50 to-white px-4 py-14 md:py-20">
        <div className="mx-auto grid max-w-6xl items-start gap-10 md:grid-cols-[1fr_minmax(0,420px)]">
          <div className="text-center md:text-left">
            <p className="text-sm font-medium uppercase tracking-wide text-[var(--accent)]">
              OFC Création d&apos;Entreprise · Qualiopi · Constructys
            </p>
            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-[2.75rem] lg:leading-tight">
              Formation IA appliquée au bâtiment — ChatGPT pour le Bâtiment en Île-de-France
            </h1>
            <p className="mt-4 text-base font-semibold text-slate-800">
              {Number(SCHEMA_STATS.personnesFormees).toLocaleString('fr-FR')} · {SOCIAL_PROOF.AVERAGE_RATING} · Qualiopi
            </p>
            <div className="mx-auto mt-8 max-w-2xl space-y-6 text-left md:mx-0">
              <BlocCtaHaut />
            </div>
            <nav aria-label="Sommaire de la page" className="not-prose mx-auto mt-10 max-w-2xl rounded-xl border border-slate-200 bg-white p-5 text-left text-sm md:mx-0">
              <p className="font-semibold text-slate-900">Sommaire</p>
              <ul className="mt-3 list-inside list-disc space-y-1.5 text-[var(--accent)] marker:text-[var(--accent)]">
                <li>
                  <a href="#probleme" className="text-slate-700 underline-offset-2 hover:underline">
                    Pourquoi les PME du bâtiment perdent du temps sur l&apos;administratif
                  </a>
                </li>
                <li>
                  <a href="#programme" className="text-slate-700 underline-offset-2 hover:underline">
                    Ce que vous allez maîtriser
                  </a>
                </li>
                <li>
                  <a href="#public" className="text-slate-700 underline-offset-2 hover:underline">
                    Pour qui est cette formation ?
                  </a>
                </li>
                <li>
                  <a href="#financement" className="text-slate-700 underline-offset-2 hover:underline">
                    Le financement Constructys expliqué
                  </a>
                </li>
                <li>
                  <a href="#temoignages" className="text-slate-700 underline-offset-2 hover:underline">
                    Ce que disent les participants
                  </a>
                </li>
                <li>
                  <a href="#a-propos" className="text-slate-700 underline-offset-2 hover:underline">
                    Qui est Laure Olivié ?
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-slate-700 underline-offset-2 hover:underline">
                    Questions fréquentes
                  </a>
                </li>
                <li>
                  <a href="#rdv" className="text-slate-700 underline-offset-2 hover:underline">
                    Réservez votre visio découverte
                  </a>
                </li>
              </ul>
            </nav>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row md:justify-start">
              <Link
                href={LINKS.formations}
                className="inline-flex items-center justify-center rounded-lg border-2 border-slate-200 px-6 py-3.5 font-semibold text-slate-800 hover:border-[var(--accent)]"
              >
                Voir le catalogue des formations
              </Link>
            </div>
          </div>
          <div className="mx-auto w-full max-w-md shrink-0 md:max-w-none">
            <OfcPromoVideoEmbed variant="heroColumn" />
          </div>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-4 py-14 prose prose-slate max-w-none prose-headings:font-display prose-a:text-[var(--accent)]">
        <section id="probleme" className="not-prose scroll-mt-24">
          <Reveal as="div" className="space-y-5 text-base leading-relaxed text-slate-700">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Pourquoi les PME du bâtiment perdent du temps sur l&apos;administratif
          </h2>
          <p>
            Un conducteur de travaux passe en moyenne <strong>12 heures par semaine</strong> sur des tâches
            administratives répétitives : comptes rendus de chantier, relances clients, préparation de devis, lecture
            de CCTP pour répondre à des appels d&apos;offres. Un chargé d&apos;affaires dans une PME du bâtiment en
            Île-de-France peut consacrer jusqu&apos;à deux jours entiers à rédiger un mémoire technique — pour un seul
            marché.
          </p>
          <p>
            Ces heures ne sont pas des heures improductives. Ce sont des heures que vous n&apos;avez pas passées sur le
            terrain, à développer votre activité, à former vos équipes ou simplement à avoir une vie en dehors du
            chantier.
          </p>
          <p>
            L&apos;intelligence artificielle — et ChatGPT en particulier — change la donne pour les professionnels du
            BTP. Pas en remplaçant votre expertise technique, votre connaissance du terrain ou vos relations clients.
            Mais en prenant en charge les tâches répétitives à faible valeur ajoutée : la mise en forme des comptes
            rendus, la rédaction d&apos;emails professionnels, la structure d&apos;un mémoire technique, la génération
            d&apos;un devis type.
          </p>
          <p>
            Le problème, c&apos;est que la plupart des formations IA disponibles sur le marché sont conçues pour des
            équipes marketing ou des développeurs. Elles ne parlent pas de DPGF, de lot TCE, de sous-traitants, de plans
            d&apos;exécution ni de délais Constructys. <strong>Elles ne sont pas faites pour vous.</strong>
          </p>
          <p>C&apos;est exactement pour ça que cette formation existe.</p>
          </Reveal>
        </section>

        <section id="programme" className="not-prose mt-16 scroll-mt-24">
          <Reveal>
          <h2 className="font-display text-2xl font-bold text-slate-900">Ce que vous allez maîtriser</h2>
          <p className="mt-4 text-slate-700 leading-relaxed">
            La formation IA pour les pro du BTP est une <strong>formation pratique, en petits groupes</strong>, conçue exclusivement
            pour les professionnels du bâtiment et des travaux publics. 70 % du temps est consacré à des exercices sur
            vos documents réels — vos devis, vos emails, vos appels d&apos;offres.
          </p>
          </Reveal>

          <RevealGroup className="mt-10 space-y-10" staggerMs={45}>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6">
              <h3 className="font-display text-lg font-semibold text-slate-900">
                Module 1 — Comprendre l&apos;IA sans jargon technique
              </h3>
              <p className="mt-2 text-slate-700">
                Vous apprenez comment fonctionne ChatGPT, Claude et Gemini en 20 minutes. Pas de cours théorique inutile
                : vous partez directement sur des cas concrets. À la fin de ce module, vous utilisez l&apos;IA pour
                rédiger votre premier document BTP.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6">
              <h3 className="font-display text-lg font-semibold text-slate-900">
                Module 2 — IA &amp; Devis : chiffrer plus vite, sans erreurs
              </h3>
              <p className="mt-2 text-slate-700">
                Vous créez un template de devis intelligent adapté à votre corps de métier. En 20 minutes, ChatGPT
                génère un devis structuré (description des prestations, quantités, conditions de paiement) que vous
                ajustez et signez. Gain estimé : 2 heures par devis.
              </p>
              <blockquote className="mt-4 border-l-4 border-[var(--accent)] pl-4 text-sm text-slate-600">
                <strong className="text-slate-800">Prompts inclus</strong> : devis gros œuvre, devis second œuvre,
                devis TP, relance impayée, email de confirmation de chantier.
              </blockquote>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6">
              <h3 className="font-display text-lg font-semibold text-slate-900">
                Module 3 — IA &amp; Appels d&apos;offres : répondre en moins de temps
              </h3>
              <p className="mt-2 text-slate-700">
                Vous apprenez à utiliser l&apos;IA pour lire un CCTP de 80 pages en 10 minutes (extraction des exigences
                clés, identification des clauses à risque), structurer votre mémoire technique, et rédiger les parties
                communes (présentation entreprise, QSE, moyens humains). Gain estimé : 4 à 6 heures par appel
                d&apos;offres.
              </p>
              <blockquote className="mt-4 border-l-4 border-[var(--accent)] pl-4 text-sm text-slate-600">
                <strong className="text-slate-800">Prompts inclus</strong> : analyse CCTP, structuration mémoire
                technique, rédaction moyens humains, planning Gantt automatisé.
              </blockquote>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6">
              <h3 className="font-display text-lg font-semibold text-slate-900">Module 4 — IA &amp; Gestion de chantier</h3>
              <p className="mt-2 text-slate-700">
                Comptes rendus de chantier en 10 minutes à partir de vos notes vocales ou écrites. Emails de réserve
                au sous-traitant. Convocations de réunion de chantier. Synthèse d&apos;avancement pour le maître
                d&apos;ouvrage. L&apos;IA formate, vous validez.
              </p>
              <blockquote className="mt-4 border-l-4 border-[var(--accent)] pl-4 text-sm text-slate-600">
                <strong className="text-slate-800">Prompts inclus</strong> : CR de chantier, email réserves, lettre de
                mise en demeure, rapport d&apos;avancement, convocation réunion.
              </blockquote>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6">
              <h3 className="font-display text-lg font-semibold text-slate-900">
                Module 5 — IA &amp; Communication professionnelle
              </h3>
              <p className="mt-2 text-slate-700">
                Vos posts LinkedIn, votre fiche Google Maps, vos réponses aux avis clients, vos emails de prospection —
                rédigés en 3 minutes avec l&apos;IA, dans votre style et votre vocabulaire. Un module particulièrement
                apprécié des dirigeants de PME BTP en Île-de-France qui veulent développer leur visibilité sans y
                consacrer des heures.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6">
              <h3 className="font-display text-lg font-semibold text-slate-900">
                Module 6 (optionnel intra) — Cas d&apos;usage spécifiques à votre activité
              </h3>
              <p className="mt-2 text-slate-700">
                Pour les formations intra entreprise : nous travaillons sur <strong>vos documents réels</strong>. DPGF,
                CCTP de vos marchés en cours, emails types de votre activité. La formation sort adaptée à votre métier
                précis.
              </p>
            </div>
          </RevealGroup>

          <Reveal>
          <h3 className="not-prose mt-12 font-display text-xl font-bold text-slate-900">Résultats mesurés après la formation</h3>
          <div className="not-prose mt-4 overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-full border-collapse text-left text-sm text-slate-700">
              <thead className="bg-slate-100 font-semibold text-slate-900">
                <tr>
                  <th className="border border-slate-200 px-3 py-2">Tâche</th>
                  <th className="border border-slate-200 px-3 py-2">Avant la formation</th>
                  <th className="border border-slate-200 px-3 py-2">Après la formation</th>
                  <th className="border border-slate-200 px-3 py-2">Gain</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-200 px-3 py-2">Rédaction d&apos;un devis</td>
                  <td className="border border-slate-200 px-3 py-2">2 à 3 heures</td>
                  <td className="border border-slate-200 px-3 py-2">20 à 30 minutes</td>
                  <td className="border border-slate-200 px-3 py-2">~2h30</td>
                </tr>
                <tr className="bg-slate-50/80">
                  <td className="border border-slate-200 px-3 py-2">Compte rendu de chantier</td>
                  <td className="border border-slate-200 px-3 py-2">45 minutes</td>
                  <td className="border border-slate-200 px-3 py-2">10 minutes</td>
                  <td className="border border-slate-200 px-3 py-2">~35 min</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-3 py-2">Réponse à un appel d&apos;offres</td>
                  <td className="border border-slate-200 px-3 py-2">2 à 3 jours</td>
                  <td className="border border-slate-200 px-3 py-2">1 jour</td>
                  <td className="border border-slate-200 px-3 py-2">~1 journée</td>
                </tr>
                <tr className="bg-slate-50/80">
                  <td className="border border-slate-200 px-3 py-2">Email client difficile</td>
                  <td className="border border-slate-200 px-3 py-2">20 minutes</td>
                  <td className="border border-slate-200 px-3 py-2">3 minutes</td>
                  <td className="border border-slate-200 px-3 py-2">~17 min</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-3 py-2">Analyse d&apos;un CCTP (80 pages)</td>
                  <td className="border border-slate-200 px-3 py-2">3 heures</td>
                  <td className="border border-slate-200 px-3 py-2">20 minutes</td>
                  <td className="border border-slate-200 px-3 py-2">~2h40</td>
                </tr>
                <tr className="bg-slate-100 font-semibold text-slate-900">
                  <td className="border border-slate-200 px-3 py-2" colSpan={3}>
                    Total hebdomadaire estimé
                  </td>
                  <td className="border border-slate-200 px-3 py-2">3 à 5h/semaine</td>
                </tr>
              </tbody>
            </table>
          </div>
          </Reveal>
        </section>

        <section id="public" className="not-prose mt-16 scroll-mt-24">
          <Reveal as="div" className="space-y-4 text-slate-700">
          <h2 className="font-display text-2xl font-bold text-slate-900">Pour qui est cette formation ?</h2>
          <p>
            Cette formation est conçue pour les professionnels du BTP{' '}
            <strong>sans compétences informatiques particulières</strong>. Savoir utiliser un smartphone et naviguer sur
            internet suffit. Voici les profils qui en bénéficient le plus :
          </p>
          <p>
            <strong>Conducteurs de travaux</strong> — pour automatiser les CR de chantier, les emails de réserve et les
            rapports d&apos;avancement. Vous dictez, l&apos;IA rédige.
          </p>
          <p>
            <strong>Chefs d&apos;entreprise et dirigeants de PME BTP</strong> — pour gagner du temps sur les devis, les
            AO, la communication et la prospection. En Île-de-France, où les marchés sont nombreux et la concurrence
            forte, répondre plus vite et mieux que les autres fait la différence.
          </p>
          <p>
            <strong>Chargés d&apos;affaires et métreurs</strong> — pour analyser les DCE plus rapidement, structurer les
            mémoires techniques et automatiser les relances commerciales.
          </p>
          <p>
            <strong>Fonctions support BTP</strong> — assistantes et assistants administratifs, comptables et secrétaires
            de direction dans les PME du bâtiment. L&apos;IA devient un assistant qui rédige, formate et relance à votre
            place.
          </p>
          <p>
            <strong>Ce n&apos;est pas fait pour vous si</strong> vous cherchez une formation théorique sur l&apos;IA en
            général, ou si vous êtes développeur ou data scientist. Cette formation est 100 % terrain, 100 % BTP.
          </p>
          </Reveal>
        </section>

        <section id="financement" className="not-prose mt-16 scroll-mt-24">
          <Reveal as="div" className="space-y-4 text-slate-700">
          <h2 className="font-display text-2xl font-bold text-slate-900">Financement Constructys — selon éligibilité</h2>
          <p>
            La formation IA appliquée au bâtiment est <strong>certifiée Qualiopi</strong> et éligible à une prise en charge par
            Constructys ou votre OPCO, selon votre statut, votre branche professionnelle et les conditions en
            vigueur.
          </p>
          <p>
            <strong>Barèmes indicatifs Constructys</strong> (Plan de Développement des Compétences) — à
            confirmer sur votre dossier :
          </p>
          <ul className="list-inside list-disc space-y-1">
            <li>
              Plafond pédagogique : <strong>24 € HT/heure/participant</strong>
            </li>
            <li>
              Exemple indicatif : prise en charge pédagogique plafonnée selon effectif et durée de session
            </li>
            <li>Modalités de facturation : selon convention et dossier OPCO accepté</li>
          </ul>
          <p className="font-semibold text-slate-900">Comment ça marche :</p>
          <ol className="list-inside list-decimal space-y-1">
            <li>Vous contactez Laure pour définir la formation adaptée à votre équipe</li>
            <li>OFC prépare le dossier de prise en charge Constructys</li>
            <li>Vous soumettez le dossier au moins 15 jours avant la formation</li>
            <li>La formation se déroule — Constructys règle directement OFC</li>
            <li>Vous n&apos;avez rien à avancer</li>
          </ol>
          <p>
            <strong>Pour les entreprises de plus de 50 salariés</strong>, le FNE-Formation peut couvrir jusqu&apos;à 100
            % des coûts pour les formations de transformation digitale (minimum 14 heures).
          </p>
          <p className="rounded-lg border border-amber-200 bg-amber-50/80 p-4 text-sm">
            <strong>TVA</strong> : exonérée pour les formations intra (article 261-4-4° du CGI). TVA non applicable pour
            les sessions inter (article 293B du CGI).
          </p>
          <p>
            <Link href={LINKS.financement} className="font-semibold text-[var(--accent)] hover:underline">
              Guide détaillé : financement Constructys formation IA pour le BTP
            </Link>
          </p>
          <div className="pt-6">
            <BlocCtaMilieu />
          </div>
          </Reveal>
        </section>

        <section id="temoignages" className="not-prose mt-16 scroll-mt-24">
          <Reveal>
          <h2 className="font-display text-2xl font-bold text-slate-900">Ce que disent les participants</h2>
          </Reveal>
          <RevealGroup className="mt-8 space-y-6" staggerMs={45}>
            <blockquote className="rounded-2xl border-l-4 border-[var(--accent)] bg-slate-50 p-6 text-slate-800">
              <p className="italic">
                « J&apos;ai utilisé ChatGPT pour analyser un CCTP de 95 pages lors de notre session avec la FFB. En 15
                minutes, j&apos;avais les points clés et les clauses à risque. Avant, j&apos;aurais passé une
                demi-journée là-dessus. »
              </p>
              <footer className="mt-3 text-sm font-semibold text-slate-600">
                — Marc T., conducteur de travaux, PME BTP Île-de-France
              </footer>
            </blockquote>
            <blockquote className="rounded-2xl border-l-4 border-[var(--accent)] bg-slate-50 p-6 text-slate-800">
              <p className="italic">
                « La partie sur les mémoires techniques a tout changé pour nous. On répond à 2 fois plus d&apos;AO
                qu&apos;avant avec la même équipe. Le financement Constructys s&apos;est fait sans aucune complication. »
              </p>
              <footer className="mt-3 text-sm font-semibold text-slate-600">
                — Sophie R., chargée d&apos;affaires, entreprise de second œuvre 78
              </footer>
            </blockquote>
            <blockquote className="rounded-2xl border-l-4 border-[var(--accent)] bg-slate-50 p-6 text-slate-800">
              <p className="italic">
                « Je ne suis pas du tout à l&apos;aise avec l&apos;informatique. Laure m&apos;a montré que ChatGPT,
                c&apos;est juste écrire en français normal. En une journée, j&apos;avais mes 3 premiers devis rédigés
                avec l&apos;IA. »
              </p>
              <footer className="mt-3 text-sm font-semibold text-slate-600">
                — Éric B., gérant, PME maçonnerie Grand Paris
              </footer>
            </blockquote>
            <blockquote className="rounded-2xl border-l-4 border-[var(--accent)] bg-slate-50 p-6 text-slate-800">
              <p className="italic">
                « Formation très concrète, vocabulaire BTP, aucun jargon tech. Les équipes sont reparties avec des
                prompts directement utilisables le lendemain matin sur les chantiers. »
              </p>
              <footer className="mt-3 text-sm font-semibold text-slate-600">— Directeur formation, FFB Île-de-France</footer>
            </blockquote>
          </RevealGroup>
          <Reveal className="not-prose mt-10 rounded-2xl border border-slate-200 bg-white p-6 text-slate-700">
            <p className="font-display font-semibold text-slate-900">Nos chiffres</p>
            <ul className="mt-3 list-inside list-disc space-y-1">
              <li>
                <strong>{SOCIAL_PROOF.AVERAGE_RATING}</strong> — note de satisfaction moyenne
              </li>
              <li>
                <strong>{personnesFormeesAffiche}</strong> professionnels du BTP formés
              </li>
              <li>
                Clients : FFB Grand Paris, FFB Île-de-France, CSFE, CAPEB, CNAM Entreprise, Lefebvre Dalloz
              </li>
            </ul>
          </Reveal>
        </section>

        <section id="a-propos" className="not-prose mt-16 scroll-mt-24">
          <Reveal as="div" className="space-y-4 text-slate-700">
          <h2 className="font-display text-2xl font-bold text-slate-900">Qui est Laure Olivié ?</h2>
          <p>
            Laure Olivié est <strong>formatrice IA et ChatGPT pour le BTP</strong> et fondatrice d&apos;OFC Création
            d&apos;Entreprise (certifié Qualiopi, SIRET 905 244 281 00010). Elle porte une conviction
            : l&apos;intelligence artificielle peut transformer le quotidien des PME du bâtiment — à condition d&apos;être
            enseignée avec le bon vocabulaire, les bons exemples et les bons cas d&apos;usage.
          </p>
          <p>
            Depuis 2021, elle forme les équipes des fédérations professionnelles (FFB, CAPEB), des grandes institutions
            (CNAM, Lefebvre Dalloz) et des PME BTP d&apos;Île-de-France à l&apos;utilisation concrète de ChatGPT, Claude
            et Gemini.
          </p>
          <p>
            <strong>Sa méthode :</strong> 70 % de pratique sur vos documents réels. Zéro théorie inutile. Des prompts
            adaptés à votre métier que vous utilisez dès le lendemain.
          </p>
          <p>
            <strong>Basée à Guyancourt (78)</strong>, elle intervient sur toute l&apos;Île-de-France (Paris, 78, 91, 92,
            93, 94, 95) en intra entreprise, et organise des sessions inter à Paris et en proche banlieue.
          </p>
          <p className="flex flex-wrap gap-x-3 gap-y-1">
            <Link href={LINKS.aPropos} className="font-semibold text-[var(--accent)] hover:underline">
              En savoir plus sur Laure Olivié et OFC
            </Link>
            <span className="text-slate-400" aria-hidden>
              |
            </span>
            <Link href={LINKS.formationIaBtpNiveau1BatimentTp} className="font-semibold text-[var(--accent)] hover:underline">
              Fiche catalogue : L&apos;IA au service du bâtiment (programme détaillé)
            </Link>
          </p>
          </Reveal>
        </section>

        <section id="rdv" className="not-prose mt-16 scroll-mt-24">
          <Reveal as="div" className="space-y-4 text-center text-slate-700">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Prochaine étape — visio découverte gratuite (30 min)
          </h2>
          <p className="mx-auto max-w-2xl text-left md:text-center">
            Vous avez lu jusqu&apos;ici — c&apos;est que le sujet vous intéresse. La meilleure façon d&apos;avancer est
            de prendre <strong>30 minutes de visio gratuite</strong> avec Laure.
          </p>
          <p className="mx-auto max-w-2xl text-left md:text-center">Lors de cet appel, vous obtenez :</p>
          <ul className="mx-auto max-w-xl list-inside list-disc space-y-1 text-left">
            <li>Une analyse de votre situation (taille d&apos;entreprise, métier, besoins prioritaires)</li>
            <li>La confirmation de votre éligibilité Constructys</li>
            <li>La proposition de format de formation adaptée à votre équipe</li>
            <li>Les premières réponses à vos questions</li>
          </ul>
          <p className="mx-auto max-w-2xl text-left md:text-center">
            Aucune vente forcée. Si la formation ne vous convient pas, Laure vous le dira directement.
          </p>
          <div className="flex justify-center pt-2">
            <CtaVisio className="inline-flex items-center justify-center rounded-lg bg-[var(--accent)] px-8 py-4 text-center text-lg font-semibold text-white shadow-sm hover:bg-blue-700" />
          </div>
          <p className="pt-6 text-left md:text-center">
            Ou contactez Laure directement :<br />
            <a href={`mailto:${SITE_CONFIG.email}`} className="font-semibold text-[var(--accent)] hover:underline">
              {SITE_CONFIG.email}
            </a>
            {siteHasPublicPhone() ? (
              <>
                <br />
                <InlinePublicPhoneLink className="font-semibold text-[var(--accent)] hover:underline" />
              </>
            ) : null}
          </p>
          </Reveal>
        </section>

        <section className="not-prose mt-16 border-t border-slate-200 pt-12">
          <h2 className="font-display text-2xl font-bold text-slate-900">Liens vers nos formations spécialisées</h2>
          <ul className="mt-4 list-inside list-disc space-y-2 text-[var(--accent)] marker:text-[var(--accent)]">
            <li>
              <Link href={LINKS.formationConducteurTravaux} className="text-slate-700 hover:underline">
                Formation IA pour conducteurs de travaux
              </Link>
            </li>
            <li>
              <Link href={LINKS.formationElectricienBtp} className="text-slate-700 hover:underline">
                Formation IA pour l&apos;électricien
              </Link>
            </li>
            <li>
              <Link href={LINKS.formationPlombierBtp} className="text-slate-700 hover:underline">
                Formation IA pour la plomberie-chauffagerie
              </Link>
            </li>
            <li>
              <Link href={LINKS.iaDevis} className="text-slate-700 hover:underline">
                IA &amp; Devis bâtiment — automatiser son chiffrage
              </Link>
            </li>
            <li>
              <Link href={LINKS.formationAO} className="text-slate-700 hover:underline">
                IA &amp; Appels d&apos;offres BTP — mémoire technique
              </Link>
            </li>
            <li>
              <Link href={LINKS.blog} className="text-slate-700 hover:underline">
                Blog — tous nos articles sur l&apos;IA dans le BTP
              </Link>
            </li>
          </ul>
        </section>

        <p className="not-prose mt-12 text-center text-xs text-slate-500">
          OFC Création d&apos;Entreprise · SIRET 905 244 281 00010 · NDA 11788515078 · 6 rue Henri Dunant, 78280
          Guyancourt · {SITE_CONFIG.email}
          {siteHasPublicPhone() ? (
            <>
              {' '}
              · <InlinePublicPhoneLink className="text-[var(--accent)] hover:underline" />
            </>
          ) : null}{' '}
          · {SITE_CONFIG.url.replace(/^https?:\/\//, '')}
        </p>
      </article>

      <div className="mx-auto max-w-3xl px-4 pb-8">
        <FAQSection items={FAQ_FORMATION_IA_BTP_PILLAR} title="Questions fréquentes — formation IA pour les pro du BTP" />
      </div>

      <div className="border-t border-slate-200 bg-slate-50 px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <AllerPlusLoin
            links={[
              { href: LINKS.blogFormationIaBtpGuide2026, label: 'Guide blog : formation IA appliquée au bâtiment 2026' },
              { href: LINKS.formationParis, label: 'Formation IA pour le BTP Paris' },
              { href: LINKS.formationYvelines, label: 'Formation IA pour les pro du BTP Yvelines (78)' },
              { href: LINKS.diagnostic, label: 'Diagnostic IA BTP gratuit' },
              { href: LINKS.checklist, label: 'Checklist IA BTP' },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
