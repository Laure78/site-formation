import Link from 'next/link';
import Image from 'next/image';
import { RdvLink } from '@/components/RdvLink';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { ExternalLink } from 'lucide-react';
import { FAQSection } from '@/components/landing/FAQSection';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd } from '@/components/JsonLd';
import {
  breadcrumbItemsFromPaths,
  createPageMetadata,
  getFAQSchema,
  SITE_CONFIG,
} from '@/lib/seo';
import { getCourseJsonLdFromFormationsData } from '@/lib/schema-course-formations';
import { FAQ_FORMATION_IA_APPELS_OFFRES_LANDING } from '@/lib/faq';
import {
  SESSION_DUREE_LIBELLE,
  TARIF_FORFAIT_AVANCE_HT,
  LIBELLE_EFFECTIF_GROUPE_COURT,
} from '@/lib/tarifs-sessions';
import { PHOTOS } from '@/lib/photos';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';

const PATH = '/formation-ia-appels-offres-btp';

export const metadata = createPageMetadata({
  title: "Formation IA Appels d'Offres BTP | DCE & Mémoire Technique | Laure Olivié",
  description:
    `Répondez 5x plus vite aux appels d'offres BTP avec l'IA. Formation Qualiopi finançable Constructys. Analyse DCE, mémoire technique, chiffrage. ${formatProfessionalsTrainedCount()} pros formés.`,
  path: PATH,
  keywords: [
    'formation IA appels offres BTP',
    'mémoire technique IA BTP',
    'analyse DCE IA',
    'formation BTP-02',
    'Constructys formation IA',
    'Qualiopi appels offres',
    'ChatGPT mémoire technique BTP',
  ],
  openGraphType: 'article',
  article: {
    publishedTime: '2026-05-01',
    modifiedTime: '2026-05-01',
    author: 'Laure Olivié',
    section: 'Formations',
  },
  appendAuthorSuffix: false,
  image: {
    url: PHOTOS.formationIaAppelsOffresBtpHero2026.src,
    width: PHOTOS.formationIaAppelsOffresBtpHero2026.width,
    height: PHOTOS.formationIaAppelsOffresBtpHero2026.height,
    alt: PHOTOS.formationIaAppelsOffresBtpHero2026.alt,
  },
});

const baseUrl = SITE_CONFIG.url.replace(/\/$/, '');
const landingUrl = `${baseUrl}${PATH}`;
const courseBase = getCourseJsonLdFromFormationsData('ia-appels-offre-btp');
const courseSchema = courseBase
  ? {
      ...courseBase,
      '@id': `${landingUrl}#course`,
      url: landingUrl,
      sameAs: `${baseUrl}/formations/ia-appels-offre-btp`,
    }
  : null;

const PROMPT_CCTP = `Tu es un conducteur de travaux spécialisé en [votre corps de métier]
dans une PME BTP de [X] salariés en Île-de-France.

Voici le CCTP du lot [numéro et intitulé].

Extrais et structure :
1. Nature et description des ouvrages à réaliser
2. Matériaux imposés (marques, certifications NF/CE)
3. Normes et DTU à respecter (liste exhaustive)
4. Contraintes d'interfaces avec les autres lots
5. Critères de réception et essais demandés
6. Points de vigilance pour le chiffrage (en gras)

Format : liste à puces par catégorie. Une page maximum.`;

const PROMPT_MEMOIRE = `Tu es un rédacteur technique spécialisé en marchés BTP.

Je dois rédiger la section "Moyens humains et organisation"
de mon mémoire technique pour un marché de [intitulé du marché].

Voici mes données réelles :
- Effectifs : [liste avec qualifications]
- Encadrement : [conducteur de travaux, chef de chantier]
- Références similaires : [2 à 3 chantiers avec montants et maître d'ouvrage]
- Certifications : [Qualiopi, qualifications pro, etc.]

Critères de notation du RC sur ce point : [copiez les critères]

Rédige cette section en 300 à 400 mots, ton professionnel et factuel.
Mets en valeur nos points forts par rapport aux critères de notation.`;

const PROMPT_COHERENCE = `Voici deux documents :
1. Un extrait de mon mémoire technique (pages [X] à [Y])
2. Le CCTP du lot correspondant (pages [X] à [Y])

Analyse la cohérence entre les deux :
- Les prestations décrites dans le mémoire correspondent-elles au CCTP ?
- Des exigences du CCTP sont-elles absentes du mémoire ?
- Y a-t-il des contradictions ou des imprécisions ?

Produis une liste des écarts à corriger, du plus critique au moins critique.`;

const SOMMAIRE = [
  { href: '#le-probleme', label: "Pourquoi les appels d'offres BTP font perdre un temps considérable" },
  { href: '#la-solution', label: "Ce que change l'IA pour les équipes qui répondent aux AO" },
  { href: '#methode', label: "La méthode en 5 étapes : de l'analyse DCE à l'offre déposée" },
  { href: '#prompts', label: "3 prompts prêts à l'emploi pour vos appels d'offres" },
  { href: '#resultats', label: 'Gains de temps mesurés — données formations OFC' },
  { href: '#programme', label: 'Programme de la formation BTP-02' },
  { href: '#financement', label: 'Financement Constructys 2026' },
  { href: '#faq', label: "FAQ — Questions des équipes BTP sur l'IA et les AO" },
  { href: '#a-propos', label: 'Qui est Laure Olivié ?' },
  { href: '#rdv', label: 'Réservez votre diagnostic IA gratuit' },
];

export default function FormationIAAppelsOffresBTPPage() {
  const faqSchema = getFAQSchema(FAQ_FORMATION_IA_APPELS_OFFRES_LANDING);

  return (
    <div>
      {courseSchema ? <JsonLd id="schema-course-landing-ao" schema={courseSchema} /> : null}
      <JsonLd id="schema-faq-ao" schema={faqSchema} />

      <Breadcrumb
        items={breadcrumbItemsFromPaths([
          { name: 'Accueil', path: '/' },
          { name: 'Formation IA appels d’offres BTP', path: PATH },
        ])}
      />

      <header className="border-b border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-14 text-white md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-medium uppercase tracking-wide text-[var(--accent)]">
            Laure Olivié · OFC Création d&apos;Entreprise · Qualiopi · Finançable Constructys
          </p>
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight md:text-4xl lg:text-[2.35rem]">
            Formation IA Appels d&apos;Offres BTP — Répondez 5x plus vite aux DCE et mémoires techniques
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            Analyse DCE, CCTP, mémoire technique et cohérence offre : une méthode opérationnelle avec
            l&apos;IA générative — testée avec la FFB Grand Paris, la FFB Île-de-France et la CSFE.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <RdvLink className="inline-flex w-full items-center justify-center rounded-xl bg-[var(--accent)] px-8 py-4 font-semibold text-white hover:bg-blue-600 sm:w-auto">
              Diagnostic IA BTP gratuit — 30 min
            </RdvLink>
            <Link
              href="/formations/ia-appels-offre-btp"
              className="inline-flex w-full items-center justify-center rounded-xl border-2 border-white/70 px-8 py-4 font-semibold text-white hover:bg-white/10 sm:w-auto"
            >
              Fiche formation BTP-02
            </Link>
          </div>
        </div>
      </header>

      <section className="border-b border-slate-200 bg-white px-4 py-10" aria-label="Visuel formation en présentiel">
        <div className="mx-auto max-w-5xl">
          <figure className="overflow-hidden rounded-2xl border border-slate-200 shadow-md">
            <Image
              src={PHOTOS.formationIaAppelsOffresBtpHero2026.src}
              alt={PHOTOS.formationIaAppelsOffresBtpHero2026.alt}
              width={PHOTOS.formationIaAppelsOffresBtpHero2026.width}
              height={PHOTOS.formationIaAppelsOffresBtpHero2026.height}
              className="h-auto w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
            <figcaption className="sr-only">
              Session de formation IA pour le BTP avec Laure Olivié — présentiel, professionnels du
              secteur bâtiment et travaux publics.
            </figcaption>
          </figure>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-12">
        <nav
          aria-label="Sommaire"
          className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8"
        >
          <h2 className="font-display text-lg font-bold text-slate-900">Sommaire</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-700">
            {SOMMAIRE.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-[var(--accent)] hover:underline">
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <section id="le-probleme" className="scroll-mt-24 border-b border-slate-100 py-14">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Pourquoi les appels d&apos;offres BTP font perdre un temps considérable
          </h2>
          <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
            <p>
              Répondre à un appel d&apos;offres BTP est l&apos;une des tâches les plus chronophages
              qu&apos;une PME du bâtiment ou des travaux publics doit assumer. Et pourtant,
              c&apos;est aussi l&apos;une des plus stratégiques : un AO bien répondu, c&apos;est un
              marché gagné.
            </p>
            <p>
              <strong>Les chiffres sont clairs.</strong> Selon les données collectées lors des
              formations OFC avec la FFB Grand Paris et la FFB Île-de-France (78/91/95), une entreprise
              de 10 à 50 salariés consacre en moyenne <strong>3 à 7 jours</strong> à la préparation
              d&apos;une réponse complète à un DCE : analyse du CCTP, élaboration du chiffrage,
              rédaction du mémoire technique, constitution du dossier administratif. Sur cette
              durée, plus de <strong>60 %</strong> est consacré à des tâches rédactionnelles et
              documentaires — des tâches que l&apos;IA peut automatiser.
            </p>
            <p>
              <strong>Trois freins reviennent systématiquement en formation :</strong>
            </p>
            <ul className="list-disc space-y-3 pl-5">
              <li>
                <strong>L&apos;analyse du CCTP est longue et dispersée.</strong> Un CCTP peut
                représenter 80 à 120 pages avec des renvois normatifs (DTU, Eurocodes, NF), des
                exigences d&apos;interfaces entre lots, des clauses de garantie enfouies. Identifier
                ce qui concerne réellement votre lot prend 2 à 4 heures, parfois plus.
              </li>
              <li>
                <strong>Le mémoire technique est rédigé trop vite ou pas assez personnalisé.</strong>{' '}
                La pression des délais pousse souvent à recycler un mémoire existant. Les maîtres
                d&apos;ouvrage le détectent — une offre mal notée sur les critères qualitatifs.
              </li>
              <li>
                <strong>Le chiffrage absorbe toutes les ressources.</strong> Souvent le même
                conducteur de travaux ou chargé d&apos;affaires fait les deux : le mémoire passe au
                second plan, rédigé dans l&apos;urgence.
              </li>
            </ul>
            <p>
              L&apos;IA ne résout pas tout. Mais elle compresse le temps sur les parties
              rédactionnelles et documentaires — libérant de la capacité pour la vérification
              technique et la personnalisation qui font la différence.
            </p>
          </div>
        </section>

        <section id="la-solution" className="scroll-mt-24 border-b border-slate-100 py-14">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Ce que change l&apos;IA pour les équipes qui répondent aux AO
          </h2>
          <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
            <p>
              L&apos;intelligence artificielle générative — ChatGPT, Claude AI, NotebookLM —
              transforme le processus de réponse aux appels d&apos;offres sur quatre plans.
            </p>
            <ul className="list-disc space-y-3 pl-5">
              <li>
                <strong>Analyse documentaire accélérée.</strong> Un CCTP volumineux analysé avec la
                bonne méthode peut passer de 2 à 4 h à 15-20 minutes. L&apos;IA extrait les
                exigences, les normes, les risques et produit une fiche pour le chiffrage.
              </li>
              <li>
                <strong>Mémoire technique structuré depuis votre contenu réel.</strong> L&apos;IA
                structure ce que vous fournissez — références chantiers, certifications, moyens — en
                sections alignées sur les critères du DCE.
              </li>
              <li>
                <strong>Personnalisation par marché.</strong> Adapter un mémoire existant aux
                critères d&apos;un nouveau marché sans tout réécrire : souvent l&apos;écart entre une
                journée de travail et quelques heures.
              </li>
              <li>
                <strong>Vérification des cohérences.</strong> Relire DPGF, BPU et mémoire pour
                détecter incohérences — prestation dans le mémoire mais absente du bordereau, etc.
              </li>
            </ul>
            <blockquote className="mt-8 rounded-xl border-l-4 border-[var(--accent)] bg-slate-50 px-5 py-4 text-slate-800">
              <p className="font-semibold">Réservez votre diagnostic IA BTP gratuit — 30 minutes en visio.</p>
              <a
                href={CALENDLY_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 font-medium text-[var(--accent)] hover:underline"
              >
                Prendre rendez-vous
                <ExternalLink className="h-4 w-4" aria-hidden />
              </a>
            </blockquote>
          </div>
        </section>

        <section id="methode" className="scroll-mt-24 border-b border-slate-100 py-14">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            La méthode en 5 étapes : de l&apos;analyse DCE à l&apos;offre déposée
          </h2>
          <p className="mt-4 text-slate-700 leading-relaxed">
            Méthode enseignée en formation BTP-02 avec la FFB Grand Paris, la FFB Île-de-France et la
            CSFE — pensée pour s&apos;intégrer à votre processus existant.
          </p>
          <ol className="mt-8 space-y-8">
            {[
              {
                t: 'Étape 1 — Analyser le DCE en 20 minutes',
                p:
                  "Chargez le CCTP dans ChatGPT Plus ou Claude Pro. Utilisez le prompt d'extraction structurée (section suivante). Vérifiez et annotez la fiche selon votre terrain.",
              },
              {
                t: 'Étape 2 — Décision GO / NO GO éclairée',
                p:
                  "Avec la synthèse et l'analyse de risque, organisez un GO/NO GO court avec votre équipe. L'IA peut aussi comparer plusieurs AO pour prioriser selon charge et marges.",
              },
              {
                t: 'Étape 3 — Structurer le mémoire technique section par section',
                p:
                  "Partez de votre contenu brut (références, effectifs, matériels, certifications). Utilisez l'IA pour structurer chaque section selon le plan imposé par le RC.",
              },
              {
                t: 'Étape 4 — Vérifier la cohérence DCE / offre',
                p:
                  "Relecture croisée : mémoire cohérent avec le CCTP ? BPU couvrant les prestations du mémoire ? Clauses CCAP impactant le chiffrage ?",
              },
              {
                t: 'Étape 5 — Constituer et déposer le dossier',
                p:
                  "Courriers d'accompagnement, lettrage, actes d'engagement, checklist des pièces selon le RC.",
              },
            ].map((step) => (
              <li key={step.t} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-display text-lg font-semibold text-slate-900">{step.t}</h3>
                <p className="mt-2 text-slate-700">{step.p}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-center text-sm text-slate-600">
            En complément :{' '}
            <Link href="/blog/ia-analyse-cctp-methode" className="font-medium text-[var(--accent)] hover:underline">
              IA pour analyser un CCTP : méthode en 4 étapes
            </Link>
          </p>
        </section>

        <section id="prompts" className="scroll-mt-24 border-b border-slate-100 py-14">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            3 prompts prêts à l&apos;emploi pour vos appels d&apos;offres
          </h2>
          <div className="mt-8 space-y-10">
            <div>
              <h3 className="font-semibold text-slate-900">Prompt 1 — Analyse CCTP structurée</h3>
              <pre className="mt-3 max-h-[min(70vh,28rem)] overflow-auto rounded-xl border border-slate-200 bg-slate-900 p-4 text-left text-sm text-slate-100 whitespace-pre-wrap">
                {PROMPT_CCTP}
              </pre>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">
                Prompt 2 — Rédaction d&apos;une section de mémoire technique
              </h3>
              <pre className="mt-3 max-h-[min(70vh,28rem)] overflow-auto rounded-xl border border-slate-200 bg-slate-900 p-4 text-left text-sm text-slate-100 whitespace-pre-wrap">
                {PROMPT_MEMOIRE}
              </pre>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Prompt 3 — Vérification cohérence mémoire / CCTP</h3>
              <pre className="mt-3 max-h-[min(70vh,28rem)] overflow-auto rounded-xl border border-slate-200 bg-slate-900 p-4 text-left text-sm text-slate-100 whitespace-pre-wrap">
                {PROMPT_COHERENCE}
              </pre>
            </div>
          </div>
        </section>

        <section id="resultats" className="scroll-mt-24 border-b border-slate-100 py-14">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Gains de temps mesurés — données formations OFC
          </h2>
          <p className="mt-4 text-slate-700">
            Données issues des sessions avec des entreprises du BTP (FFB Grand Paris, FFB
            Île-de-France 78/91/95, CSFE). Moyennes observées — résultats variables selon les marchés.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse border border-slate-200 text-left text-sm">
              <caption className="sr-only">Comparatif temps de travail avec et sans IA</caption>
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 p-3 font-semibold">Tâche</th>
                  <th className="border border-slate-200 p-3 font-semibold">Sans IA</th>
                  <th className="border border-slate-200 p-3 font-semibold">Avec IA</th>
                  <th className="border border-slate-200 p-3 font-semibold">Gain</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                {[
                  ['Analyse CCTP (80 pages)', '2 h à 4 h', '15 à 20 min', '−85 %'],
                  ['Extraction normes/DTU applicables', '45 à 60 min', '3 à 5 min', '−90 %'],
                  ['Identification des risques DCE', '1 h à 2 h', '5 à 10 min', '−85 %'],
                  ['Fiche synthèse lot (1 page)', '30 à 60 min', '5 à 10 min', '−80 %'],
                  ['Mémoire technique (12 sections)', '1 à 2 jours', '3 à 4 h', '−75 %'],
                  ['Adaptation mémoire à un nouveau marché', '4 à 6 h', '45 min à 1 h', '−80 %'],
                  ['Vérification cohérence DCE / offre', '1 à 2 h', '15 à 20 min', '−80 %'],
                ].map((row) => (
                  <tr key={row[0]}>
                    <td className="border border-slate-200 p-3">{row[0]}</td>
                    <td className="border border-slate-200 p-3">{row[1]}</td>
                    <td className="border border-slate-200 p-3">{row[2]}</td>
                    <td className="border border-slate-200 p-3 font-medium text-[#377CF3]">{row[3]}</td>
                  </tr>
                ))}
                <tr className="bg-slate-50 font-semibold">
                  <td className="border border-slate-200 p-3">Total réponse complète à un AO</td>
                  <td className="border border-slate-200 p-3">3 à 7 jours</td>
                  <td className="border border-slate-200 p-3">12 à 18 h</td>
                  <td className="border border-slate-200 p-3 text-[#377CF3]">−70 %</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="programme" className="scroll-mt-24 border-b border-slate-100 py-14">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Programme de la formation BTP-02
          </h2>
          <p className="mt-4 text-slate-700">
            <strong>Répondre aux appels d&apos;offres avec l&apos;IA</strong> — Réf. BTP-02 · Niveau
            avancé · {SESSION_DUREE_LIBELLE} · {TARIF_FORFAIT_AVANCE_HT} € HT / participant · 12
            participants max · {LIBELLE_EFFECTIF_GROUPE_COURT}.
          </p>
          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Objectifs pédagogiques
          </h3>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
            <li>Analyser un DCE complet (CCTP, CCAP, RC, BPU) en moins de 30 minutes avec l&apos;IA</li>
            <li>Rédiger et structurer chaque section d&apos;un mémoire technique avec ChatGPT ou Claude AI</li>
            <li>Constituer une bibliothèque de prompts réutilisables par type de marché</li>
            <li>Configurer un assistant IA dédié aux appels d&apos;offres de votre entreprise</li>
            <li>Sécuriser la confidentialité des données dans le processus IA</li>
          </ul>
          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">Contenu détaillé</h3>
          <ul className="mt-4 space-y-6 text-slate-700">
            <li>
              <strong>Bloc 1 — Comprendre le DCE avec l&apos;IA (1 h)</strong> — Chargement et analyse
              CCTP, CCAP, RC. Critères de sélection, risques et opportunités, prompt structuré par lot.
            </li>
            <li>
              <strong>Bloc 2 — Rédiger le mémoire technique (1 h 30)</strong> — Structure type,
              prompts par section, personnalisation aux critères, vérification.
            </li>
            <li>
              <strong>Bloc 3 — Bibliothèque de prompts (45 min)</strong> — Organisation par marché,
              métier, section de mémoire ; export et intégration au processus.
            </li>
            <li>
              <strong>Bloc 4 — Assistant IA dédié AO (45 min)</strong> — GPT personnalisé ou project
              Claude, test sur AO réel, sécurisation des données.
            </li>
          </ul>
          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">Public &amp; format</h3>
          <p className="mt-2 text-slate-700">
            Chefs d&apos;affaires, conducteurs de travaux, dirigeants de PME BTP, métreurs. Prérequis :
            usage basique d&apos;ordinateur et smartphone ; aucune expérience IA requise. Intra (vos
            locaux, Île-de-France ou France), inter (Île-de-France), distanciel possible.
          </p>
          <p className="mt-6">
            <Link
              href="/formations/ia-appels-offre-btp"
              className="font-semibold text-[var(--accent)] hover:underline"
            >
              Voir le programme détaillé et les fiches OPCA →
            </Link>
          </p>
        </section>

        <section id="financement" className="scroll-mt-24 border-b border-slate-100 py-14">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Financement Constructys 2026
          </h2>
          <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
            <p>
              Formation finançable dans le cadre du Plan de Développement des Compétences 2026 via
              Constructys (OPCO BTP et travaux publics).
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Coût pédagogique : <strong>24 € HT / heure / stagiaire</strong> (soit 96 € HT pour 4 h)
              </li>
              <li>
                Sessions intra : plafond <strong>840 € HT / jour / groupe</strong>
              </li>
              <li>
                Salaires en formation : <strong>15 € HT / h / stagiaire</strong> (entreprises &lt; 11
                salariés) ; <strong>10 € HT / h</strong> (11 à 50 salariés, formations qualifiantes)
              </li>
            </ul>
            <p>
              Demande de prise en charge sur eGestion (services.constructys.fr), idéalement{' '}
              <strong>15 jours minimum</strong> avant le début. OFC accompagne la démarche.
            </p>
            <p>
              Autres dispositifs selon profil : FAFCEA, AGEFICE, FSE+ selon éligibilité.
            </p>
            <p>
              <Link
                href="/financement-constructys-formation-ia-btp"
                className="font-semibold text-[var(--accent)] hover:underline"
              >
                Guide complet du financement Constructys →
              </Link>
            </p>
          </div>
        </section>

        <div className="scroll-mt-24 border-b border-slate-100 py-6">
          <FAQSection
            id="faq"
            title="FAQ — Questions des équipes BTP sur l'IA et les appels d'offres"
            subtitle="Mémoire technique, confidentialité, marchés publics, chiffrage."
            items={FAQ_FORMATION_IA_APPELS_OFFRES_LANDING}
          />
        </div>

        <section id="a-propos" className="scroll-mt-24 border-b border-slate-100 py-14">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Qui est Laure Olivié ?
          </h2>
          <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
            <p>
              Formatrice IA et ChatGPT pour le bâtiment et les travaux publics. Basée à Guyancourt
              (Yvelines), elle a dirigé ALIA BTP (travaux publics) de 2017 à 2024 — expérience directe
              des appels d&apos;offres, CCTP et mémoires techniques.
            </p>
            <p>
              Depuis 2022, elle accompagne les professionnels du BTP sur l&apos;IA générative. OFC
              Création d&apos;Entreprise est certifié <strong>Qualiopi</strong> et référencé par la FFB
              Grand Paris.
            </p>
            <p>
              <strong>En chiffres :</strong> +{formatProfessionalsTrainedCount()} professionnels formés · note{' '}
              {SOCIAL_PROOF.AVERAGE_RATING} · partenariats
              FFB Grand Paris, FFB Île-de-France (78/91/95), FFB IDF Est, CSFE, CNAM Île-de-France ·
              instructrice LinkedIn Learning.
            </p>
            <p>
              <Link href="/a-propos" className="font-semibold text-[var(--accent)] hover:underline">
                Voir le parcours complet →
              </Link>
            </p>
          </div>
        </section>

        <section className="scroll-mt-24 border-b border-slate-100 py-14">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Articles liés — ressources pour aller plus loin
          </h2>
          <ul className="mt-6 list-disc space-y-2 pl-5 text-slate-700">
            <li>
              <Link href="/blog/ia-analyse-cctp-methode" className="text-[var(--accent)] hover:underline">
                IA pour analyser un CCTP : méthode en 4 étapes
              </Link>
            </li>
            <li>
              <Link
                href="/blog/memoire-technique-btp-ia-gagner-temps-appels-offres"
                className="text-[var(--accent)] hover:underline"
              >
                Mémoire technique BTP : gagner du temps sur les appels d&apos;offres
              </Link>
            </li>
            <li>
              <Link
                href="/blog/claude-ai-memoire-technique-erreurs-btp"
                className="text-[var(--accent)] hover:underline"
              >
                Claude AI mémoire technique BTP : 5 erreurs à éviter
              </Link>
            </li>
            <li>
              <Link href="/blog/ia-btp-analyse-dce" className="text-[var(--accent)] hover:underline">
                Analyse DCE avec l&apos;IA
              </Link>
            </li>
            <li>
              <Link
                href="/blog/ia-memoire-technique-appel-offres-guide-2026"
                className="text-[var(--accent)] hover:underline"
              >
                IA mémoire technique appel d&apos;offres — guide 2026
              </Link>
            </li>
            <li>
              <Link
                href="/financement-constructys-formation-ia-btp"
                className="text-[var(--accent)] hover:underline"
              >
                Financement Constructys — guide complet
              </Link>
            </li>
            <li>
              <Link href="/blog?categorie=appels-offres" className="text-[var(--accent)] hover:underline">
                Tous les articles appels d&apos;offres
              </Link>
            </li>
          </ul>
        </section>

        <section id="rdv" className="scroll-mt-24 py-14">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Réservez votre diagnostic IA gratuit — 30 minutes
          </h2>
          <p className="mt-4 text-slate-700">
            Point sur votre processus de réponse aux AO, gains de temps possibles avec l&apos;IA,
            orientation vers la formation adaptée. Gratuit, sans engagement, visio ou téléphone.
          </p>
          <p className="mt-6 flex flex-wrap gap-4">
            <RdvLink className="inline-flex rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white hover:bg-blue-600">
              Réserver mon diagnostic IA BTP
            </RdvLink>
            <Link
              href="/formations"
              className="inline-flex items-center rounded-xl border-2 border-slate-200 px-6 py-3 font-semibold text-slate-800 hover:border-[var(--accent)]"
            >
              Catalogue des formations IA BTP
            </Link>
          </p>
          <p className="mt-6 text-sm text-slate-600">
            <Link href="/financement-constructys-formation-ia-btp" className="text-[var(--accent)] hover:underline">
              Financement Constructys
            </Link>
          </p>
        </section>

        <footer className="border-t border-slate-200 pt-10 text-sm text-slate-500">
          <p>
            Laure Olivié — Formatrice IA BTP, OFC Création d&apos;Entreprise · Organisme certifié
            Qualiopi · SIRET 905 244 281 00010 · NDA 11788515078
          </p>
          <p className="mt-1">
            <a href="tel:+33695661818" className="hover:underline">
              06 95 66 18 18
            </a>
            {' · '}
            <a href="mailto:laureolivie@yahoo.fr" className="hover:underline">
              laureolivie@yahoo.fr
            </a>
            {' · '}
            <a href="https://www.laureolivie.fr" className="hover:underline">
              www.laureolivie.fr
            </a>
          </p>
        </footer>

        <AllerPlusLoin
          links={[
            { href: '/formations/ia-appels-offre-btp', label: 'Fiche catalogue BTP-02' },
            { href: '/repondre-appels-offres-ia-btp', label: 'Guide répondre aux AO avec l’IA' },
            { href: '/blog/ia-analyse-cctp-methode', label: 'Article : analyser un CCTP avec l’IA' },
            { href: CALENDLY_BOOKING_URL, label: 'Prendre rendez-vous' },
            { href: '/financement-constructys-formation-ia-btp', label: 'Financement Constructys' },
            { href: '/formations', label: 'Catalogue formations' },
          ]}
        />
      </div>
    </div>
  );
}
