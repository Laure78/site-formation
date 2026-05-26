import Link from 'next/link';
import { Poppins } from 'next/font/google';
import { Calendar, Check, ChevronRight } from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd } from '@/components/JsonLd';
import { RdvLink } from '@/components/RdvLink';
import { FAQSection } from '@/components/landing/FAQSection';
import {
  breadcrumbItemsFromPaths,
  createPageMetadata,
  getBreadcrumbSchema,
  SITE_CONFIG,
} from '@/lib/seo';
import type { FAQItem } from '@/lib/faq';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';
import {
  SCHEMA_ORGANIZATION_OFC,
  SCHEMA_PERSON_LAURE,
  SCHEMA_PUBLIC_SITE_URL,
} from '@/lib/schema-constants';
import { faqAnswerPlainTextForSchema } from '@/lib/faq-plain-text';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const PATH = '/formation-ia-analyse-cctp';

export const metadata = createPageMetadata({
  title: 'Formation IA : Analyser un CCTP avec ChatGPT — Entreprises BTP',
  description:
    "Analysez vos CCTP en 20 minutes avec l'IA. Formation concrète pour chargés d'affaires et dirigeants BTP. Qualiopi · Finançable Constructys · Formatrice ex-conductrice de travaux.",
  path: PATH,
  keywords: [
    'formation IA analyse CCTP',
    'formation IA DCE BTP',
    'analyser un CCTP avec ChatGPT',
    "formation IA appel d'offres BTP",
    'formation IA mémoire technique BTP',
    'ChatGPT CCTP',
    'DCE BTP',
    'Qualiopi',
    'Constructys',
  ],
  appendAuthorSuffix: false,
  openGraphType: 'article',
  article: {
    publishedTime: '2026-04-16',
    modifiedTime: '2026-04-16',
    author: SITE_CONFIG.name,
    section: 'Formation IA pour les pro du BTP',
  },
});

const FAQ_ITEMS: FAQItem[] = [
  {
    q: 'Peut-on analyser un CCTP avec ChatGPT ?',
    a: "Oui, à condition de savoir structurer les prompts et de connaître les risques (hallucinations sur les DTU, normes citées à tort). La formation de Laure Olivié enseigne exactement cette méthode, avec des prompts testés sur de vrais DCE BTP.",
  },
  {
    q: 'Cette formation est-elle différente de celles pour architectes ?',
    a: "Oui. La formation de Laure Olivié s'adresse aux entreprises BTP qui répondent aux appels d'offres — pas aux maîtres d'œuvre qui les rédigent. L'angle est : comment lire vite un CCTP, identifier les risques pour son lot, et préparer un mémoire technique percutant.",
  },
  {
    q: 'Cette formation est-elle financement possible selon éligibilité (Constructys) ?',
    a: "Oui. OFC Création d'Entreprise est certifié Qualiopi et référencé Constructys. Le plafond pédagogique 2026 est de 24 € HT/h/participant pour les entreprises du Bâtiment.",
  },
  {
    q: 'Faut-il avoir ChatGPT Plus pour suivre cette formation ?',
    a: "ChatGPT Plus (20 $/mois) est recommandé pour accéder à l'upload de PDF et aux fonctionnalités avancées nécessaires à l'analyse des CCTP. La formation peut aussi être réalisée avec Claude Pro (18 €/mois).",
  },
];

const baseUrl = SITE_CONFIG.url.replace(/\/$/, '');
const pageUrl = `${baseUrl}${PATH}`;

const schemaGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Course',
      '@id': `${pageUrl}#course`,
      url: pageUrl,
      name: 'Formation IA : Analyser un CCTP avec ChatGPT pour les entreprises BTP',
      description:
        "Formation pratique pour analyser un CCTP, identifier les risques et préparer un mémoire technique avec l'IA. Destinée aux chargés d'affaires, métreurs et dirigeants PME BTP.",
      provider: {
        '@type': 'Organization',
        name: SCHEMA_ORGANIZATION_OFC.name,
        sameAs: SCHEMA_PUBLIC_SITE_URL,
      },
      instructor: {
        '@type': 'Person',
        name: SCHEMA_PERSON_LAURE.name,
        jobTitle: 'Formatrice IA pour le BTP',
        description:
          "Ancienne dirigeante d'entreprise de travaux publics (ALIA BTP), conductrice de travaux. Formatrice IA certifiée Qualiopi.",
      },
      educationalCredentialAwarded: 'Certificat de réalisation Qualiopi',
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'onsite',
        courseWorkload: 'PT4H',
        offers: {
          '@type': 'Offer',
          price: '800',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
        },
      },
      about: ['CCTP', 'DCE', "Appel d'offres BTP", 'Mémoire technique', 'ChatGPT BTP', 'IA BTP'],
      inLanguage: 'fr-FR',
      educationalLevel: 'Professionnel',
    },
    {
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: FAQ_ITEMS.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faqAnswerPlainTextForSchema(item.a),
        },
      })),
    },
  ],
};

const breadcrumbLd = getBreadcrumbSchema([
  { name: 'Accueil', path: '/' },
  { name: 'Formation IA analyse CCTP', path: PATH },
]);

const METHODE_ETAPES = [
  {
    titre: 'Étape 1 — Préparer le DCE pour l’IA',
    texte: `Avant de coller un extrait de CCTP dans ChatGPT, il faut cadrer l’intention de lecture : numéro de lot, périmètre exact (corps d’état, sous-traitance), niveau de risque habituel sur ce type de marché (maître d’ouvrage public ou privé, cadre de décomposition attendu, délai de remise des offres). Cette phase évite les réponses « génériques » : on fixe la grille (sécurité, délais, matériaux imposés, interfaces avec les notices techniques) et les livrables attendus en sortie (synthèse, liste de questions, trame de mémoire).`,
    prompt: `Tu es un assistant spécialisé marchés BTP. Je vais te fournir des extraits du CCTP du lot [X]. Avant toute analyse, confirme que tu as bien compris : périmètre du lot, niveau de détail attendu, et le format de sortie souhaité (liste à puces, tableau, ou synthèse exécutive). Ne commence pas l’analyse tant que ces trois points ne sont pas validés.`,
  },
  {
    titre: 'Étape 2 — Découper et ingérer les pièces (CCTP, CCAP, RC)',
    texte: `Les DCE volumineux imposent souvent un découpage : sections du CCTP par chapitre, pièces jointes (plans, notices), et renvois vers le CCAP pour les obligations administratives. L’objectif n’est pas de « tout lire » d’un bloc, mais d’aligner les pièces entre elles : où le RC renvoie au CCTP, où le BPU croise une exigence technique. Sur ChatGPT Plus ou Claude Pro, l’upload PDF aide ; sinon, on travaille par segments numérotés en conservant la trace des pages pour la relecture humaine.`,
    prompt: `Voici l’extrait du CCTP (pages [A] à [B]) pour le lot [X]. Résume en 5 points les exigences techniques majeures, puis signale toute clause qui semble atypique par rapport à un CCTP courant du même corps d’état. Indique explicitement les passages où une vérification humaine sur DTU / normes est indispensable.`,
  },
  {
    titre: 'Étape 3 — Première passe : synthèse exécutive et risques lot',
    texte: `Une première passe vise une synthèse opérationnelle pour le dirigeant ou le chargé d’affaires : peut-on répondre dans les délais, y a-t-il des prescriptions matérielles bloquantes, faut-il visiter le site avant d’engager des moyens ? On demande à l’IA de classer les risques (technique, contractuel, planning) sans interprétation définitive : elle propose, le métier tranche. Cette étape nourrit la décision « go / no go » avant d’investir des heures sur le mémoire technique.`,
    prompt: `À partir des extraits déjà fournis du CCTP lot [X], dresse une matrice « risque / impact / action proposée ». Sépare clairement ce qui relève d’une vérification documentaire (citations de normes) de ce qui relève d’une visite de site ou d’un retour terrain. Termine par 5 questions précises à poser au maître d’ouvrage ou à l’AMO lors de la visite.`,
  },
  {
    titre: 'Étape 4 — Croisement RC, critères d’attribution et mémoire technique',
    texte: `Le mémoire technique ne doit pas être décoratif : il répond aux critères annoncés dans le RC et démontre la compréhension du CCTP. L’IA aide à aligner les sous-parties du mémoire sur les exigences du lot, à reformuler des paragraphes à partir de vos références chantier (anonymisées si besoin), et à préparer des encadrés « méthode », « moyens humains », « planning ». La relecture finale reste humaine : cohérence des chiffres, faisabilité, conformité aux sous-traitants annoncés.`,
    prompt: `Voici les critères d’attribution (copier-coller depuis le RC) et ma liste de références chantier (anonymisées). Propose un plan de mémoire technique en 8 à 10 sections avec, pour chaque section, 3 bullet points « preuves » à rédiger à partir de nos données. Signale tout écart entre une exigence du CCTP et une réponse possible de notre lot.`,
  },
  {
    titre: 'Étape 5 — Relecture anti-hallucination et boucle de validation',
    texte: `Les modèles de langage peuvent inventer des références ou mal citer un DTU : la dernière étape impose une check-list : chaque norme citée est-elle retrouvée dans le texte source ? Chaque délai ou montant provient-il d’une pièce officielle ? Qui signe la version PDF envoyée sur la plateforme marchés ? La formation ancre ces réflexes dans l’équipe pour que l’IA reste un accélérateur, jamais un substitut à la responsabilité du soumissionnaire ou du sous-traitant.`,
    prompt: `Revois la synthèse suivante [coller le texte généré] et marque chaque affirmation factuelle (norme, délai, quantité) par [À VÉRIFIER] si elle n’est pas explicitement présente dans les extraits CCTP fournis. Ne corrige pas les chiffres : signale seulement les zones à contrôler avant envoi au maître d’ouvrage.`,
  },
];

export default function FormationIaAnalyseCctpPage() {
  return (
    <div className={`min-h-screen bg-white text-slate-900 ${poppins.className}`}>
      <JsonLd id="schema-analyse-cctp-graph" schema={schemaGraph} />
      <JsonLd id="schema-analyse-cctp-breadcrumb" schema={breadcrumbLd} />

      <div className="mx-auto max-w-4xl px-4 pt-8">
        <Breadcrumb
          items={breadcrumbItemsFromPaths([
            { name: 'Accueil', path: '/' },
            { name: 'Formation IA analyse CCTP', path: PATH },
          ])}
          showVisual
          className="mb-8"
        />
      </div>

      {/* Hero */}
      <section className="border-b border-slate-200 bg-[#F2F2F2] px-4 pb-14 pt-4">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#377CF3]">
            Formation IA DCE BTP · Mémoire technique · Appels d&apos;offres
          </p>
          <h1 className="font-display mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 md:text-4xl">
            Formation IA : Analyser un CCTP avec ChatGPT
            <span className="mt-2 block text-2xl font-semibold text-slate-800 md:text-3xl">
              — La méthode terrain pour les entreprises BTP
            </span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-700">
            Vous passez des heures à lire des dossiers de consultation ? Avec l&apos;IA, un chargé d&apos;affaires
            analyse un CCTP complet, identifie les risques de son lot et prépare sa réponse en moins de 30 minutes.
            Voici comment.
          </p>

          <ul className="mt-8 flex flex-wrap gap-3 text-sm font-medium text-slate-700">
            <li className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2">
              <Check className="h-4 w-4 shrink-0 text-[#377CF3]" aria-hidden />
              Formatrice ex-conductrice de travaux
            </li>
            <li className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2">
              <Check className="h-4 w-4 shrink-0 text-[#377CF3]" aria-hidden />
              {formatProfessionalsTrainedCount()} professionnels BTP formés
            </li>
            <li className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2">
              <Check className="h-4 w-4 shrink-0 text-[#377CF3]" aria-hidden />
              Qualiopi · Finançable Constructys
            </li>
            <li className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2">
              <Check className="h-4 w-4 shrink-0 text-[#377CF3]" aria-hidden />
              Note {SOCIAL_PROOF.AVERAGE_RATING}
            </li>
          </ul>

          <div id="rdv" className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <RdvLink className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#377CF3] px-8 py-4 text-center text-base font-semibold text-white shadow-sm transition hover:bg-[#2d6ae0]">
              <Calendar className="h-5 w-5" aria-hidden />
              Réservez votre visio découverte gratuite
              <ChevronRight className="h-5 w-5" aria-hidden />
            </RdvLink>
            <Link
              href={LINKS.blogIaAnalyseCctpMethode}
              className="text-center text-base font-semibold text-[#377CF3] underline-offset-4 hover:underline sm:text-left"
            >
              Télécharger les 5 prompts ChatGPT pour analyser un CCTP
            </Link>
          </div>
        </div>
      </section>

      {/* Sommaire */}
      <nav
        aria-label="Sommaire"
        className="border-b border-slate-200 bg-white px-4 py-10"
      >
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-lg font-bold text-slate-900">Sommaire</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-700 marker:font-semibold marker:text-[#377CF3]">
            <li>
              <a href="#probleme" className="text-[#377CF3] hover:underline">
                Le problème : combien de temps perdez-vous sur un DCE ?
              </a>
            </li>
            <li>
              <a href="#ia-cctp" className="text-[#377CF3] hover:underline">
                Ce que l&apos;IA peut faire (et ne peut pas faire) sur un CCTP
              </a>
            </li>
            <li>
              <a href="#methode" className="text-[#377CF3] hover:underline">
                La méthode pas à pas : analyser un CCTP avec ChatGPT
              </a>
            </li>
            <li>
              <a href="#risques" className="text-[#377CF3] hover:underline">
                Les pièges à éviter (hallucinations, DTU erronés…)
              </a>
            </li>
            <li>
              <a href="#programme" className="text-[#377CF3] hover:underline">
                Contenu de la formation
              </a>
            </li>
            <li>
              <a href="#resultats" className="text-[#377CF3] hover:underline">
                Résultats concrets chez nos clients BTP
              </a>
            </li>
            <li>
              <a href="#financement" className="text-[#377CF3] hover:underline">
                Financement Constructys
              </a>
            </li>
            <li>
              <a href="#faq" className="text-[#377CF3] hover:underline">
                FAQ
              </a>
            </li>
            <li>
              <a href="#rdv" className="text-[#377CF3] hover:underline">
                Réserver une visio découverte
              </a>
            </li>
          </ol>
        </div>
      </nav>

      {/* Problème */}
      <section id="probleme" className="scroll-mt-24 border-b border-slate-200 bg-white px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Combien de temps passez-vous sur un DCE avant de décider d&apos;y répondre ?
          </h2>
          <div className="mt-8 space-y-6 text-slate-700 leading-relaxed">
            <p>
              Un dossier de consultation peut aligner plusieurs milliers de pages : CCTP par lot, DPGF, CCAP, RC,
              bordereaux de prix, plans, notices techniques, annexes administratives. Le chargé d&apos;affaires ou le
              dirigeant PME doit souvent ingérer ce volume en parallèle du chantier en cours : il survole le règlement
              de la consultation, repère le délai de remise des offres, puis plonge dans le CCTP pour comprendre si le
              marché est jouable pour son équipe — sans encore savoir s&apos;il mobilisera les sous-traitants
              nécessaires. Cette phase d&apos;exploration est coûteuse : elle mobilise des profils rares (technique +
              chiffrage) et retarde la réponse sur d&apos;autres dossiers en cours.
            </p>
            <p>
              La difficulté n&apos;est pas seulement la lecture : c&apos;est la détection rapide des clauses à risque
              pour son lot — prescriptions matérielles atypiques, interfaces entre corps d&apos;état, exigences de
              garanties ou de méthodes d&apos;exécution qui bouleversent le cadre de décomposition habituel. Sur les
              marchés publics comme privés, une phrase enfouie au milieu d&apos;une notice peut conditionner une visite
              de site obligatoire, un planning incompressible ou une contrainte de marque imposée. Tant que ces points
              ne sont pas cadrés, le métreur et le conducteur de travaux hésitent à engager la machine « mémoire
              technique », car le coût de la non-conformité est asymétrique : une offre disqualifiée fait perdre des
              dizaines d&apos;heures pour zéro retour.
            </p>
            <p>
              Beaucoup d&apos;entreprises BTP avouent passer une demi-journée — parfois une journée — avant de trancher
              « on répond / on ne répond pas », alors que le signal utile se concentre sur quelques sections du CCTP et
              sur le croisement RC / CCAP. Ce temps d&apos;incertitude pèse sur le chiffrage, sur la mobilisation des
              sous-traitants et sur la relation avec le maître d&apos;ouvrage lorsque des demandes de précision doivent
              être formulées vite. L&apos;enjeu de la formation « analyser un CCTP avec ChatGPT » est précisément là :
              accélérer la structuration du dossier, clarifier les questions à poser avant engagement, et sécuriser la
              suite (mémoire technique, planning, relecture) sans sacrifier le jugement métier.
            </p>
          </div>
          <figure className="mt-10 border-l-4 border-[#377CF3] bg-slate-50 py-4 pl-6 pr-4">
            <blockquote className="text-lg font-medium italic leading-relaxed text-slate-800">
              &laquo; Un CCTP de 80 pages pour un lot peinture. Je passais une demi-journée à le lire, parfois pour
              finalement ne pas répondre. &raquo;
            </blockquote>
            <figcaption className="mt-3 text-sm text-slate-600">
              — Participant, formation FFB Grand Paris
            </figcaption>
          </figure>
        </div>
      </section>

      {/* IA / CCTP */}
      <section id="ia-cctp" className="scroll-mt-24 border-b border-slate-200 bg-[#F2F2F2] px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Ce que l&apos;IA peut (vraiment) faire sur un CCTP — et ce qu&apos;elle ne sait pas faire
          </h2>
          <div className="mt-8 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full min-w-[520px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-3 font-semibold text-slate-900">✅ L&apos;IA excelle pour…</th>
                  <th className="px-4 py-3 font-semibold text-slate-900">⚠️ L&apos;IA ne remplace pas…</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="px-4 py-3">Résumer un CCTP de 100 pages en 5 points clés</td>
                  <td className="px-4 py-3">Votre jugement technique sur la faisabilité</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Identifier les clauses inhabituelles ou restrictives</td>
                  <td className="px-4 py-3">La vérification des normes DTU (risque d&apos;hallucination)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Lister les exigences par lot (matériaux, délais, garanties)</td>
                  <td className="px-4 py-3">La visite de site et l&apos;évaluation terrain</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Comparer deux DCE sur des critères spécifiques</td>
                  <td className="px-4 py-3">La négociation avec le maître d&apos;ouvrage</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Préparer les questions à poser lors de la visite</td>
                  <td className="px-4 py-3">La signature et la responsabilité contractuelle</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Générer une trame de mémoire technique</td>
                  <td className="px-4 py-3">La rédaction finale avec vos vraies références chantier</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-950"
            role="note"
          >
            <p className="font-semibold">⚠️ Risque critique</p>
            <p className="mt-2 leading-relaxed">
              Les IA comme ChatGPT peuvent inventer des références DTU ou citer des normes qui n&apos;existent pas. La
              formation enseigne comment détecter et corriger ces erreurs avant qu&apos;elles ne coûtent cher.
            </p>
          </div>
          <div className="mt-8">
            <Link
              href={LINKS.formationAO}
              className="inline-flex items-center justify-center rounded-xl bg-[#377CF3] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2d6ae0]"
            >
              Voir le programme complet de la formation
              <ChevronRight className="ml-2 h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* Méthode */}
      <section id="methode" className="scroll-mt-24 border-b border-slate-200 bg-white px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Méthode : analyser un CCTP avec ChatGPT en 5 étapes
          </h2>
          <ol className="mt-10 space-y-12">
            {METHODE_ETAPES.map((etape, i) => (
              <li key={etape.titre}>
                <h3 className="font-display text-xl font-bold text-slate-900">
                  {i + 1}. {etape.titre}
                </h3>
                <p className="mt-4 leading-relaxed text-slate-700">{etape.texte}</p>
                <p className="mt-3 text-sm font-semibold text-slate-800">Exemple de prompt</p>
                <pre className="mt-2 overflow-x-auto rounded-lg border border-slate-200 bg-slate-100 p-4 text-xs leading-relaxed text-slate-800 md:text-sm">
                  {etape.prompt}
                </pre>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Risques */}
      <section id="risques" className="scroll-mt-24 border-b border-slate-200 bg-[#F2F2F2] px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Les pièges à éviter (hallucinations, DTU erronés, fuites de données)
          </h2>
          <ul className="mt-6 list-disc space-y-3 pl-6 text-slate-700 leading-relaxed">
            <li>
              Ne jamais coller un DCE complet confidentiel dans un outil grand public sans cadre : préférer segments
              anonymisés, comptes entreprise, ou traitement local selon vos règles internes.
            </li>
            <li>
              Vérifier systématiquement les citations de normes : croiser avec les notices du dossier et la base
              légale ; une phrase « plausible » peut être fausse.
            </li>
            <li>
              Garder la trace des versions : ce qui est issu d&apos;une proposition IA doit être identifiable dans la
              chaîne de validation signée par l&apos;entreprise ou le sous-traitant.
            </li>
          </ul>
        </div>
      </section>

      {/* Programme */}
      <section id="programme" className="scroll-mt-24 border-b border-slate-200 bg-white px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">Contenu de la formation</h2>
          <p className="mt-4 text-slate-700 leading-relaxed">
            La pratique « analyser un CCTP avec ChatGPT » s&apos;inscrit dans le module{' '}
            <strong>Répondre aux appels d&apos;offres avec l&apos;IA (BTP-02)</strong> : 4 h, exercices sur vos
            extraits de DCE, prompts réutilisables, mémoire technique et relecture humaine. Découvrez la fiche
            catalogue complète via le lien ci-dessous.
          </p>
          <ul className="mt-6 list-disc space-y-2 pl-6 text-slate-700">
            <li>Cadre DCE : CCTP, CCAP, RC, critères d&apos;attribution</li>
            <li>Prompts par type de pièce et par lot</li>
            <li>Trame de mémoire technique alignée RC / CCTP</li>
            <li>Contrôle anti-hallucination et feuille de route 15 jours</li>
          </ul>
          <p className="mt-8 text-slate-600">
            Fiche catalogue complète : utilisez le bouton « Voir le programme complet de la formation » dans la section
            précédente (référence BTP-02).
          </p>
        </div>
      </section>

      {/* Résultats */}
      <section id="resultats" className="scroll-mt-24 border-b border-slate-200 bg-[#F2F2F2] px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Résultats concrets chez nos clients BTP
          </h2>
          <ul className="mt-8 space-y-6">
            <li className="rounded-xl border border-slate-200 bg-white p-5 text-slate-700 shadow-sm">
              <strong className="text-slate-900">DCE 120 pages — lot second œuvre</strong>
              <p className="mt-2">
                Synthèse des risques et liste de questions visite en une demi-journée au lieu de deux jours
                d&apos;exploration dispersée.
              </p>
            </li>
            <li className="rounded-xl border border-slate-200 bg-white p-5 text-slate-700 shadow-sm">
              <strong className="text-slate-900">Mémoire technique public</strong>
              <p className="mt-2">
                Trame structurée alignée sur les critères du RC ; gain sur la reprise entre chiffrage et rédaction
                technique.
              </p>
            </li>
            <li className="rounded-xl border border-slate-200 bg-white p-5 text-slate-700 shadow-sm">
              <strong className="text-slate-900">PME multi-lots</strong>
              <p className="mt-2">
                Bibliothèque de prompts partagée entre chargés d&apos;affaires : homogénéisation des comptes rendus de
                lecture DCE.
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* Financement */}
      <section id="financement" className="scroll-mt-24 border-b border-slate-200 bg-white px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">Financement Constructys</h2>
          <p className="mt-4 text-slate-700 leading-relaxed">
            OFC Création d&apos;Entreprise est certifié Qualiopi et référencé auprès de l&apos;OPCO Constructys. Les
            plafonds pédagogiques et les règles de prise en charge dépendent de votre taille d&apos;entreprise et de
            votre plan de développement des compétences — le guide détaillé et les montants à jour sont centralisés sur
            la page financement.
          </p>
          <Link
            href={LINKS.financement}
            className="mt-6 inline-flex rounded-xl bg-[#377CF3] px-6 py-3 text-sm font-semibold text-white hover:bg-[#2d6ae0]"
          >
            Guide financement Constructys — formation IA appliquée au bâtiment
          </Link>
        </div>
      </section>

      {/* Maillage */}
      <section className="border-b border-slate-200 bg-[#F2F2F2] px-4 py-12">
        <div className="mx-auto max-w-4xl text-sm text-slate-600">
          <p>
            Pour aller plus loin :{' '}
            <Link href={LINKS.formations} className="font-medium text-[#377CF3] hover:underline">
              catalogue des formations
            </Link>
            ,{' '}
            <Link href={LINKS.aPropos} className="font-medium text-[#377CF3] hover:underline">
              à propos de Laure Olivié
            </Link>
            , page pilier{' '}
            <Link href={LINKS.formationIaBtp} className="font-medium text-[#377CF3] hover:underline">
              formation IA pour le BTP
            </Link>
            . Les prompts détaillés sont accessibles via le lien « Télécharger les 5 prompts… » en tête de page.
          </p>
        </div>
      </section>

      <FAQSection
        id="faq"
        items={FAQ_ITEMS}
        title="FAQ — formation IA analyse CCTP et DCE BTP"
        subtitle="ChatGPT, mémoire technique, Constructys, outils."
      />

      <section className="bg-[#377CF3] px-4 py-14 text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold md:text-3xl">Réserver une visio découverte</h2>
          <p className="mt-4 text-blue-100">
            30 minutes pour vérifier l&apos;adéquation avec vos DCE et vos lots — sans engagement.
          </p>
          <Link
            href="#rdv"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-[#377CF3] hover:bg-blue-50"
          >
            <Calendar className="h-5 w-5" aria-hidden />
            Remonter au bouton Calendly
          </Link>
        </div>
      </section>
    </div>
  );
}
