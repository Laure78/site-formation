import { FAQAnswer } from '@/components/landing/FAQAnswer';
import { JsonLd } from '@/components/JsonLd';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { RdvLink } from '@/components/RdvLink';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import {
  createPageMetadata,
  getCourseSchema,
  getFAQSchema,
  SITE_CONFIG,
} from '@/lib/seo';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { PublicPhoneCta } from '@/components/PublicPhoneCta';
import { FORMATIONS_CATALOG_SCHEMA } from '@/lib/schema-course-formations';
import { EFFECTIF_GROUPE_MAX, TARIF_FORFAIT_DEBUTANT_HT } from '@/lib/tarifs-sessions';

const PATH = '/formation-ia-conducteur-travaux';

const BTP01 = FORMATIONS_CATALOG_SCHEMA.find((e) => e.ref === 'BTP-01')!;
const BTP04 = FORMATIONS_CATALOG_SCHEMA.find((e) => e.ref === 'BTP-04')!;

const SEO_TITLE = 'Formation IA Conducteur de Travaux BTP | CR, CCTP, Emails | Laure Olivié';

export const metadata = createPageMetadata({
  title: SEO_TITLE,
  description:
    'Formation IA pour conducteurs de travaux BTP. CR chantier, analyse CCTP, emails MOA, situations de travaux. Qualiopi, finançable Constructys. 1 592 pros formés.',
  path: PATH,
  keywords: [
    'formation IA conducteur de travaux',
    'ChatGPT conducteur de travaux',
    'intelligence artificielle chantier',
    'automatiser CR chantier',
    'formation Qualiopi BTP',
    'Constructys formation conducteur travaux',
    'IA CCTP BTP',
  ],
  openGraphType: 'article',
  appendAuthorSuffix: false,
  article: {
    publishedTime: '2026-05-19',
    modifiedTime: '2026-05-19',
    author: 'Laure Olivié',
    section: 'Formation IA BTP',
  },
  image: {
    url: '/images/btp-conducteur-plans.png',
    width: 1200,
    height: 630,
    alt: 'Formation IA pour conducteurs de travaux BTP — plans de chantier et productivité',
  },
});

const PROMPT_CR = `Tu es conducteur de travaux sur un chantier de [type de chantier].

Voici mes notes brutes de la réunion du [date] :
[Collez vos notes — même désordonnées, même en abrégé]

Rédige un CR de chantier structuré avec :
1. Participants (liste à compléter)
2. Avancement par lot
3. Points bloquants et actions décidées (responsable + délai)
4. Réserves et non-conformités soulevées
5. Date de la prochaine réunion

Ton professionnel. Format standard de CR de chantier.`;

const PROMPT_EMAIL = `Tu es conducteur de travaux pour [nom de l'entreprise],
marché [intitulé], maître d'ouvrage [nom].

Je dois signaler au maître d'œuvre :
[Décrivez l'aléa en 3 lignes : nature, date, impact planning]

Ce que je demande : [action attendue du MOE]

Rédige cet email en 150 à 200 mots.
Commence par les faits. Ton professionnel et factuel.
Inclus une demande de confirmation de lecture.`;

const PROMPT_CCTP = `Voici le CCTP du lot [numéro - intitulé].

Je cherche uniquement :
1. Les exigences de réception pour ce lot
   (contrôles, essais, documents à fournir)
2. Les interfaces avec le lot [numéro]
   (qui fait quoi à la jonction)
3. Les clauses de pénalités applicables

Réponse directe par question, vocabulaire technique BTP.
Maximum une demi-page.`;

const FAQ_ITEMS = [
  {
    q: "L'IA peut-elle être utilisée depuis le chantier sur smartphone ?",
    a: "Oui. ChatGPT et Claude ont des applications iOS et Android. Le cas d'usage le plus courant après formation : dicter ses notes de réunion dans l'application pendant le trajet de retour et envoyer le CR avant d'arriver au bureau.",
  },
  {
    q: 'Les CR et emails générés par l\'IA sont-ils valides contractuellement ?',
    a: "Ils ont la même valeur qu'un document rédigé par vous ou par une secrétaire — à condition que vous les ayez relus et signés. La validation humaine reste indispensable.",
  },
  {
    q: 'Peut-on former plusieurs CDT de la même entreprise en même temps ?',
    a: "Oui. Les sessions intra permettent de former jusqu'à 12 participants simultanément. C'est l'option la plus économique et la plus efficace : tout le monde parle le même langage IA après la formation.",
  },
  {
    q: 'Faut-il avoir déjà utilisé ChatGPT ou Claude ?',
    a: "Non. La formation part de zéro. En 30 minutes, les participants comprennent le principe et commencent à travailler sur leurs propres documents.",
  },
  {
    q: "L'IA comprend-elle le vocabulaire technique du BTP (DTU, OS, DGD, etc.) ?",
    a: "Oui. ChatGPT et Claude connaissent le vocabulaire BTP. La clé est de fournir à l'IA le contexte de votre métier dans le prompt — ce que la formation enseigne à faire systématiquement.",
  },
  {
    q: 'Combien de temps pour être opérationnel après la formation ?',
    a: "Dès le lendemain. Les participants repartent avec leurs prompts personnalisés et un guide d'utilisation. La plupart génèrent leur premier CR de chantier avec l'IA dans la semaine suivant la formation.",
  },
];

const SOMMAIRE = [
  { href: '#le-probleme', label: 'Le conducteur de travaux perd 40 % de son temps en administratif' },
  { href: '#la-solution', label: "Ce que l'IA automatise concrètement pour un CDT" },
  { href: '#usages', label: 'Les 8 usages terrain les plus impactants' },
  { href: '#prompts', label: "3 prompts prêts à l'emploi" },
  { href: '#resultats', label: 'Gains de temps mesurés' },
  { href: '#programme', label: 'Programme des formations BTP-01 et BTP-04' },
  { href: '#financement', label: 'Financement Constructys 2026' },
  { href: '#faq', label: 'FAQ conducteurs de travaux' },
  { href: '#a-propos', label: 'Qui est Laure Olivié ?' },
  { href: '#rdv', label: 'Réservez votre diagnostic IA gratuit' },
];

function getConducteurTravauxCourseJsonLd() {
  const teaches = [...new Set([...BTP01.teaches, ...BTP04.teaches])];
  const base = getCourseSchema({
    name: 'Formation IA pour conducteurs de travaux BTP — BTP-01 & BTP-04',
    description: `${BTP01.description} ${BTP04.description} Public : conducteurs de travaux, chefs de chantier, chargés d'affaires.`,
    path: PATH,
    providerName: SITE_CONFIG.legalName,
    teaches,
    courseCode: 'BTP-01',
    educationalLevel: 'Beginner',
    timeRequired: 'PT4H',
    areaServed: ['France', 'Île-de-France'],
  });
  return {
    ...base,
    offers: {
      '@type': 'Offer',
      price: TARIF_FORFAIT_DEBUTANT_HT,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: `${SITE_CONFIG.url}${PATH}`,
      category: 'Formation professionnelle',
    },
  };
}

export default function FormationIaConducteurTravauxPage() {
  const faqSchema = getFAQSchema(FAQ_ITEMS);
  const courseJsonLd = getConducteurTravauxCourseJsonLd();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <JsonLd data={courseJsonLd} id="jsonld-course-cdt-btp01-btp04" />
      <JsonLd data={faqSchema} id="jsonld-faq-conducteur-travaux" />

      <nav className="mb-8 text-sm text-slate-600">
        <Link href="/" className="text-[#377CF3] hover:underline">
          Accueil
        </Link>
        {' / '}
        <Link href="/formations" className="text-[#377CF3] hover:underline">
          Formations
        </Link>
        {' / '}
        <span className="text-slate-900">Formation IA conducteur de travaux</span>
      </nav>

      <article>
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Formation IA pour Conducteur de Travaux BTP —{' '}
          <span className="text-[#377CF3]">Gagnez 5 heures par semaine</span>
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Laure Olivié · OFC Création d&apos;Entreprise · Qualiopi · Finançable Constructys
        </p>

        <div className="mt-8">
          <ShortAnswerBlock>
            Huit usages terrain (CR, CCTP, emails MOA, situations de travaux, etc.) avec prompts
            calibrés BTP. Formation certifiée <strong>Qualiopi</strong>, éligible{' '}
            <strong>OPCO Constructys</strong> selon votre dossier —{' '}
            <strong>+1 592 professionnels</strong> formés.
          </ShortAnswerBlock>
        </div>

        <nav
          aria-label="Sommaire"
          className="mt-10 rounded-2xl border border-slate-200 bg-[#F2F2F2] p-6"
        >
          <h2 className="font-display text-lg font-bold text-slate-900">Sommaire</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-700">
            {SOMMAIRE.map(({ href, label }) => (
              <li key={href}>
                <a href={href} className="text-[#377CF3] underline hover:no-underline">
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <section id="le-probleme" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Le conducteur de travaux perd 40 % de son temps en administratif
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Le conducteur de travaux est le pivot opérationnel du chantier. Il coordonne les corps
            d&apos;état, manage les équipes, répond au maître d&apos;ouvrage, suit le budget, gère les
            approvisionnements — et produit chaque semaine une quantité considérable de documents que
            personne d&apos;autre ne peut faire à sa place.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Selon les données recueillies lors des formations OFC avec la{' '}
            <strong>FFB Grand Paris</strong> et la <strong>FFB Île-de-France</strong>, un CDT consacre{' '}
            <strong>35 à 40 % de son temps à des tâches administratives</strong> : rédaction de comptes
            rendus, envoi d&apos;emails, mise à jour de tableaux de suivi, préparation de réunions,
            réponse aux réclamations. Sur une semaine de 45 heures, c&apos;est 16 à 18 heures passées
            derrière un écran plutôt que sur le terrain.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Ces tâches sont indispensables. Mais leur rédaction et leur mise en forme sont massivement
            automatisables par l&apos;IA — sans sacrifier la qualité ni la précision contractuelle.
          </p>
          <p className="mt-6 font-semibold text-slate-900">
            Les 3 tâches chronophages qui reviennent le plus souvent en formation :
          </p>
          <ul className="mt-4 space-y-4 text-slate-700">
            <li className="flex gap-3">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} />
              <span>
                <strong>Le compte rendu de chantier.</strong> Un CR hebdomadaire prend 1 h 30 à 2 heures
                à rédiger proprement. Sur 48 semaines, c&apos;est 72 à 96 heures par an consacrées
                uniquement aux CR. Avec l&apos;IA, ce temps tombe à 15 à 20 minutes par CR — soit 48 à 64
                heures récupérées chaque année.
              </span>
            </li>
            <li className="flex gap-3">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} />
              <span>
                <strong>L&apos;analyse du CCTP sur un point précis.</strong> Retrouver la clause sur les
                interfaces entre lots, les exigences de réception, ou les pénalités applicables dans un
                CCTP de 80 pages prend 45 minutes sans IA. Avec l&apos;IA, c&apos;est 3 à 5 minutes.
              </span>
            </li>
            <li className="flex gap-3">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} />
              <span>
                <strong>Les emails délicats au MOA ou MOE.</strong> Les emails de signalement, de
                contestation d&apos;ordre de service ou de demande de prolongation de délai doivent être
                précis, factuels, et ne pas créer de responsabilités non voulues. L&apos;IA réduit ce temps
                à 3 à 5 minutes par email.
              </span>
            </li>
          </ul>
        </section>

        <section id="la-solution" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Ce que l&apos;IA automatise concrètement pour un CDT
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            L&apos;intelligence artificielle — ChatGPT, Claude AI — transforme le quotidien du
            conducteur de travaux sur tous les documents qu&apos;il produit seul, à partir
            d&apos;informations qu&apos;il possède déjà.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            <strong>Ce que l&apos;IA fait :</strong> elle transforme vos notes brutes en CR structuré, vos
            données de chantier en email professionnel, vos informations de chiffrage en lettre de
            situation de travaux, vos constatations terrain en fiche de non-conformité. Elle lit un CCTP
            de 80 pages et en extrait les clauses qui vous concernent en 3 minutes.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            <strong>Ce que l&apos;IA ne fait pas :</strong> elle ne va pas sur le chantier. Elle
            n&apos;observe pas les malfaçons, ne sent pas les risques de dérapage de délai, ne gère pas le
            conflit avec un sous-traitant. Tous les jugements terrain, toutes les décisions techniques,
            toutes les relations humaines restent les vôtres.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            <strong>La règle des 3 minutes :</strong> pour chacun des usages ci-dessous, le temps de
            relecture et de correction du document produit par l&apos;IA est de 3 à 5 minutes. Ce
            n&apos;est pas parce que l&apos;IA fait des erreurs — c&apos;est parce que votre validation
            reste indispensable sur tout document contractuel. Cette relecture est intégrée dans les gains
            de temps mesurés.
          </p>
          <blockquote className="mt-8 rounded-xl border-l-4 border-[#377CF3] bg-slate-50 p-6 text-slate-700">
            <p className="font-medium text-slate-900">
              Réservez votre diagnostic IA BTP gratuit — 30 minutes en visio.
            </p>
            <a
              href={CALENDLY_BOOKING_URL}
              className="mt-2 inline-block font-semibold text-[#377CF3] underline hover:no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Prendre rendez-vous →
            </a>
          </blockquote>
        </section>

        <section id="usages" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Les 8 usages terrain les plus impactants
          </h2>
          <ol className="mt-6 list-decimal space-y-4 pl-5 text-slate-700 leading-relaxed">
            <li>
              <strong>Compte rendu de réunion de chantier</strong> — Dictez vos notes brutes, obtenez un
              CR structuré avec points d&apos;action et responsables. Gain : 1 h 30 → 15 min.
            </li>
            <li>
              <strong>Analyse ciblée du CCTP</strong> — Trouvez en 5 minutes la clause sur les interfaces,
              les pénalités ou les exigences de réception, sans lire le document entier.
            </li>
            <li>
              <strong>Email au MOA ou MOE</strong> — Rédigez en 3 minutes un email factuel et précis pour
              signaler un aléa, contester un OS, ou demander une prolongation de délai.
            </li>
            <li>
              <strong>Situation de travaux</strong> — Structurez la lettre d&apos;accompagnement mensuelle en
              5 minutes à partir de vos données d&apos;avancement.
            </li>
            <li>
              <strong>Réponse à une réclamation</strong> — Répondez à un client ou sous-traitant de façon
              professionnelle, factuellement solide, sans créer de responsabilité indue.
            </li>
            <li>
              <strong>Note de synthèse pour la direction</strong> — Produisez en 10 minutes une note
              d&apos;avancement claire (budget, planning, risques) pour un comité de pilotage ou un client.
            </li>
            <li>
              <strong>Fiche de non-conformité</strong> — Passez de notes vocales à une FNC formelle
              transmissible au sous-traitant en 5 minutes.
            </li>
            <li>
              <strong>Analyse GO/NO GO d&apos;appel d&apos;offres</strong> — Obtenez en 10 minutes une
              analyse documentée pour décider si un DCE mérite d&apos;être traité.
            </li>
          </ol>
          <p className="mt-6">
            <Link
              href="/blog/ia-conducteur-travaux-usages"
              className="font-semibold text-[#377CF3] underline hover:no-underline"
            >
              Voir l&apos;article complet avec les prompts détaillés →
            </Link>
          </p>
        </section>

        <section id="prompts" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">3 prompts prêts à l&apos;emploi</h2>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Prompt 1 — Compte rendu de chantier depuis notes brutes
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm leading-relaxed text-slate-800">
            {PROMPT_CR}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Prompt 2 — Email MOA/MOE pour signalement d&apos;un aléa
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm leading-relaxed text-slate-800">
            {PROMPT_EMAIL}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Prompt 3 — Extraction ciblée dans le CCTP
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm leading-relaxed text-slate-800">
            {PROMPT_CCTP}
          </pre>
        </section>

        <section id="resultats" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Gains de temps mesurés — données formations OFC
          </h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse border border-slate-200 text-left text-sm">
              <caption className="sr-only">Gains de temps IA pour conducteur de travaux</caption>
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 p-3 font-semibold">Usage</th>
                  <th className="border border-slate-200 p-3 font-semibold">Sans IA</th>
                  <th className="border border-slate-200 p-3 font-semibold">Avec IA</th>
                  <th className="border border-slate-200 p-3 font-semibold">Gain</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                {[
                  ['CR de réunion chantier', '1 h 30 à 2 h', '15 à 20 min', '−85 %'],
                  ['Analyse ciblée CCTP', '45 à 60 min', '5 min', '−90 %'],
                  ['Email MOA/MOE délicat', '20 à 30 min', '3 à 5 min', '−85 %'],
                  ['Situation de travaux', '30 à 45 min', '5 min', '−85 %'],
                  ['Réponse à une réclamation', '30 à 60 min', '5 à 10 min', '−85 %'],
                  ['Note de synthèse direction', '1 h', '10 à 15 min', '−85 %'],
                  ['Fiche de non-conformité', '20 à 30 min', '5 min', '−80 %'],
                  ['Analyse GO/NO GO AO', '1 h 30', '10 min', '−90 %'],
                ].map(([u, sans, avec, gain]) => (
                  <tr key={u as string}>
                    <td className="border border-slate-200 p-3">{u}</td>
                    <td className="border border-slate-200 p-3">{sans}</td>
                    <td className="border border-slate-200 p-3">{avec}</td>
                    <td className="border border-slate-200 p-3 font-medium text-[#377CF3]">{gain}</td>
                  </tr>
                ))}
                <tr className="bg-slate-50 font-semibold">
                  <td className="border border-slate-200 p-3" colSpan={1}>
                    Gain semaine type (5 usages)
                  </td>
                  <td className="border border-slate-200 p-3">5 à 7 h</td>
                  <td className="border border-slate-200 p-3">45 à 60 min</td>
                  <td className="border border-slate-200 p-3 text-[#377CF3]">−85 %</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="programme" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Programmes des formations BTP-01 et BTP-04
          </h2>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Formation BTP-01 — L&apos;IA au service du bâtiment
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            Référence : BTP-01 · Débutant · 4 h · {TARIF_FORFAIT_DEBUTANT_HT} € HT/participant ·{' '}
            {EFFECTIF_GROUPE_MAX} participants max
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Conçue pour les conducteurs de travaux, chefs de chantier et assistantes administratives BTP.
            Couvre les 8 usages terrain décrits sur cette page, travaillés sur vos documents réels.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            <strong>Objectifs :</strong> produire un CR de chantier en 15 min, rédiger un email MOA
            professionnel en 3 min, analyser une clause CCTP en 5 min, créer une bibliothèque de prompts
            réutilisables.
          </p>

          <h3 className="mt-10 font-display text-xl font-semibold text-slate-900">
            Formation BTP-04 — L&apos;IA au service des Travaux Publics
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            Référence : BTP-04 · Débutant · 4 h · {TARIF_FORFAIT_DEBUTANT_HT} € HT/participant ·{' '}
            {EFFECTIF_GROUPE_MAX} participants max
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Spécialisée pour les conducteurs de travaux TP : DCE, rapports d&apos;avancement, situations de
            travaux, comptes rendus chantier TP (terrassement, réseaux, VRD).
          </p>

          <p className="mt-6 font-medium text-slate-900">Les deux formations sont disponibles :</p>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
            <li>
              En <strong>intra</strong> dans vos locaux (Île-de-France ou partout en France)
            </li>
            <li>
              En <strong>inter</strong> en Île-de-France (Paris, Versailles, Nanterre, Créteil)
            </li>
            <li>
              En <strong>distanciel</strong> (visio)
            </li>
          </ul>
          <p className="mt-6">
            <a
              href="https://www.laureolivie.fr/formations"
              className="font-semibold text-[#377CF3] underline hover:no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Voir les programmes détaillés →
            </a>
          </p>
        </section>

        <section id="financement" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Financement Constructys 2026</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse border border-slate-200 text-left text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 p-3 font-semibold">Entreprise</th>
                  <th className="border border-slate-200 p-3 font-semibold">Coût pédagogique</th>
                  <th className="border border-slate-200 p-3 font-semibold">Salaires</th>
                  <th className="border border-slate-200 p-3 font-semibold">Max intra/jour</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr>
                  <td className="border border-slate-200 p-3">&lt; 11 salariés</td>
                  <td className="border border-slate-200 p-3">24 € HT/h/stagiaire</td>
                  <td className="border border-slate-200 p-3">15 € HT/h/stagiaire</td>
                  <td className="border border-slate-200 p-3">840 € HT/groupe</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 p-3">11 à 50 salariés</td>
                  <td className="border border-slate-200 p-3">24 € HT/h/stagiaire</td>
                  <td className="border border-slate-200 p-3">10 € HT/h/stagiaire</td>
                  <td className="border border-slate-200 p-3">840 € HT/groupe</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-slate-600 leading-relaxed">
            <strong>Condition :</strong> demande déposée sur eGestion (services.constructys.fr) au minimum
            15 jours avant la formation. OFC accompagne chaque client dans la constitution du dossier.
          </p>
          <p className="mt-4">
            <Link
              href="/financement-constructys-formation-ia-btp"
              className="font-semibold text-[#377CF3] underline hover:no-underline"
            >
              Guide complet du financement Constructys
            </Link>
            {' · '}
            <Link
              href="/blog/dossier-constructys-2026-etapes"
              className="font-semibold text-[#377CF3] underline hover:no-underline"
            >
              Monter son dossier en 20 min
            </Link>
          </p>
        </section>

        <section id="faq" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">FAQ — conducteurs de travaux et IA</h2>
          <dl className="mt-8 space-y-8">
            {FAQ_ITEMS.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold text-slate-900">{item.q}</dt>
                <dd className="mt-2 text-slate-600">
                  <FAQAnswer content={item.a} />
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="a-propos" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Qui est Laure Olivié ?</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Laure Olivié est formatrice IA et ChatGPT pour les entreprises du bâtiment et des travaux
            publics. Elle a dirigé ALIA BTP, entreprise de travaux publics basée à Guyancourt, de 2017 à 2024
            — 7 ans en tant que dirigeante de terrain, avec des chantiers, des CDT, des CR et des CCTP au
            quotidien.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Ce parcours lui donne une crédibilité unique pour former les conducteurs de travaux : elle
            connaît leur métier de l&apos;intérieur. Ses formations ne sont pas conçues par une consultante
            IA qui a lu des articles sur le BTP — elles sont conçues par quelqu&apos;un qui a vécu les mêmes
            contraintes.
          </p>
          <p className="mt-4 text-sm font-medium text-slate-800">
            +1 592 professionnels formés · Note 4,85/5 · Certifiée Qualiopi · LinkedIn Learning · FFB Grand
            Paris · FFB Île-de-France · CSFE · CNAM IDF
          </p>
          <p className="mt-4">
            <Link href="/a-propos" className="font-semibold text-[#377CF3] underline hover:no-underline">
              Voir le parcours complet →
            </Link>
          </p>
        </section>

        <section className="mt-14 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="font-display text-xl font-bold text-slate-900">Articles liés</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
            <li>
              <Link href="/blog/ia-conducteur-travaux-usages" className="text-[#377CF3] underline">
                IA pour conducteur de travaux : 8 usages terrain (prompts inclus)
              </Link>
            </li>
            <li>
              <Link href="/blog/ia-analyse-cctp-methode" className="text-[#377CF3] underline">
                IA pour analyser un CCTP : méthode en 4 étapes
              </Link>
            </li>
            <li>
              <Link href="/blog/5-cas-usage-chatgpt-artisans-btp" className="text-[#377CF3] underline">
                Compte rendu de chantier et IA : automatiser vos CR pour gagner 5h/semaine
              </Link>
            </li>
            <li>
              <Link href="/blog/dossier-constructys-2026-etapes" className="text-[#377CF3] underline">
                Constructys 2026 : monter son dossier en 20 min
              </Link>
            </li>
          </ul>
        </section>

        <section id="rdv" className="scroll-mt-24 mt-14 rounded-2xl border border-[#377CF3]/30 bg-[#F2F2F2] p-8">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Réservez votre diagnostic IA gratuit
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            30 minutes en visio pour identifier les 3 usages qui vous feront gagner le plus de temps cette
            semaine. Gratuit, sans engagement.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <RdvLink className="inline-flex items-center rounded-lg bg-[#377CF3] px-5 py-3 font-semibold text-white hover:bg-[#2d63c9]">
              Réserver mon diagnostic IA BTP
            </RdvLink>
            <PublicPhoneCta className="inline-flex items-center rounded-lg border border-slate-300 px-5 py-3 font-medium text-slate-800 hover:bg-slate-50" />
          </div>
          <p className="mt-6 text-sm text-slate-600">
            <a
              href="https://www.laureolivie.fr/formations"
              className="text-[#377CF3] underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Catalogue des formations IA BTP
            </a>
            {' · '}
            <Link href="/financement-constructys-formation-ia-btp" className="text-[#377CF3] underline">
              Financement Constructys
            </Link>
          </p>
        </section>

        <footer className="mt-14 border-t border-slate-200 pt-8 text-sm text-slate-500">
          <p>Laure Olivié — Formatrice IA BTP, OFC Création d&apos;Entreprise</p>
          <p>Certifiée Qualiopi · SIRET 905 244 281 00010 · NDA 11788515078</p>
          <p>
            06 95 66 18 18 · laureolivie@yahoo.fr ·{' '}
            <a href="https://www.laureolivie.fr" className="underline">
              www.laureolivie.fr
            </a>
          </p>
        </footer>
      </article>
    </div>
  );
}
