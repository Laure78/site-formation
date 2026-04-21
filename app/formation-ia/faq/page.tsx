import { FAQAnswer } from '@/components/landing/FAQAnswer';
import Link from 'next/link';
import { createPageMetadata, getFAQSchema } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { FAQ_IA_BTP_METIERS_CHANTIER_SEO } from '@/lib/faq';

const FAQ_ITEMS_LONG_TAIL = [
  {
    q: 'Comment utiliser ChatGPT et Claude AI quand on est professionnel du bâtiment ?',
    a: "On commence par des usages à faible risque : structurer un mail, reformuler un compte rendu, préparer un plan de réponse. ChatGPT est très efficace pour itérer vite sur des formats courts ; Claude AI est souvent plus confortable sur des pièces longues (CCTP, extraits de règlement). En formation, vous apprenez des trames de prompts, l'anonymisation des données et la relecture systématique avant envoi.",
  },
  {
    q: 'Quelle formation IA pour un étancheur à Paris ?',
    a: "Une session IA BTP orientée second œuvre / enveloppe : modèles pour courriers, synthèses techniques, préparation de réponses et relecture de dossiers. Les outils enseignés sont ChatGPT et Claude AI. Le financement peut passer par votre OPCO (souvent Constructys pour le BTP) selon éligibilité — organisme certifié Qualiopi.",
  },
  {
    q: 'Formation ChatGPT pour électricien financée par Constructys ?',
    a: "Si votre entreprise est couverte par Constructys et que votre plan de développement des compétences le permet, une formation professionnelle peut être prise en charge selon les règles en vigueur. Vérifiez auprès de votre OPCO et conservez les objectifs pédagogiques clairs (délais, compétences). Nous vous guidons sur la page financement et au besoin en prise de contact.",
  },
  {
    q: 'Claude AI peut-il aider à rédiger un mémoire technique BTP ?',
    a: "Oui, comme assistant : il aide à structurer, reformuler et comparer des variantes à partir de vos entrées (exigences, contraintes, moyens). La validation technique, les prix et les engagements restent votre responsabilité. L'intérêt est de gagner du temps sur la mise en forme et la clarté — pas de 'copier-coller' sans relecture.",
  },
  {
    q: 'Formation intelligence artificielle pour entreprise générale à Versailles ?',
    a: "Pour une entreprise générale / TCE, l'IA sert surtout à la consolidation multi-lots : synthèses, planning narratif, courriers de coordination. Interventions possibles en Île-de-France ; la page ville 'Versailles' et la page métier 'entreprise générale' détaillent des exemples. ChatGPT et Claude AI sont tous deux travaillés en atelier.",
  },
  {
    q: "Comment l'IA aide un plombier à faire ses devis plus vite ?",
    a: "En transformant un brief (prestations, quantités, contraintes d'accès) en structure de devis, puis en aidant à rédiger les libellés et variantes. L'IA accélère la mise en forme ; vous gardez la main sur les unités, les prix et les hypothèses. Nous insistons sur la relecture et la traçabilité interne.",
  },
  {
    q: 'Formation IA BTP éligible OPCO Constructys en Île-de-France ?',
    a: "Souvent oui pour les publics et entreprises relevant du périmètre BTP/TP, mais l'éligibilité dépend de votre situation (OPCO, taille, dispositif). Le plus fiable est de vérifier auprès de Constructys et de votre référent formation. Côté organisme : Qualiopi et une proposition pédagogique claire facilitent le montage.",
  },
  {
    q: 'Quelle différence entre ChatGPT et Claude AI pour le BTP ?',
    a: "ChatGPT excelle quand il faut itérer vite sur des formats courts (emails, listes, reformulations). Claude AI est souvent préférable pour analyser ou résumer des textes plus longs, comparer des variantes et produire des plans détaillés. En pratique, beaucoup d'équipes utilisent les deux : nous montrons comment choisir selon le cas.",
  },
  {
    q: 'Formation IA pour couvreur à Cergy-Pontoise ?',
    a: "Oui : la page locale 'Cergy-Pontoise' décrit l'approche IDF (déplacements, exemples) et renvoie vers les pages métiers comme couverture / zinguerie. Les ateliers incluent ChatGPT et Claude AI pour devis, descriptifs et courriers.",
  },
  {
    q: 'Comment un maçon utilise Claude AI sur ses chantiers ?',
    a: "Exemples : synthèse d'un extrait de CCTP, préparation d'un compte rendu de réunion, relecture d'un courrier avant envoi, plan de méthode à partir de contraintes listées. L'outil aide à structurer ; le chef de chantier valide les points techniques et la conformité.",
  },
  {
    q: 'Formation ChatGPT carreleur Saint-Quentin-en-Yvelines ?',
    a: "La page ville 'Saint-Quentin-en-Yvelines' relie l'approche locale aux ateliers métiers (carrelage / faïence) : descriptifs de pose, métrés narratifs, réponses aux demandes de précision. Financement selon éligibilité OPCO ; outils : ChatGPT et Claude AI.",
  },
  {
    q: "L'IA peut-elle aider à répondre aux appels d'offres BTP ?",
    a: "Oui, en support : découpage des exigences, plan de mémoire, reformulation, check-list de relecture. Pour les réponses complexes, combinez avec vos procédures internes et, si besoin, des formations spécialisées AO/DCE. L'IA ne remplace pas l'expertise chiffrage / technique.",
  },
] as const;

const FAQ_ITEMS = [...FAQ_IA_BTP_METIERS_CHANTIER_SEO, ...FAQ_ITEMS_LONG_TAIL];

export const metadata = createPageMetadata({
  title: 'FAQ formation IA BTP — ChatGPT, Claude AI, Constructys',
  description:
    'Réponses aux questions longue traîne : ChatGPT et Claude AI pour le BTP, financement Constructys, IA pour AO et devis. Qualiopi. OFC Laure Olivié, Île-de-France.',
  path: '/formation-ia/faq',
  keywords: [
    'FAQ formation IA BTP',
    'ChatGPT PME bâtiment',
    'Claude AI BTP',
    'Constructys formation',
    'Qualiopi',
    'formation IA Paris',
    'mémoire technique IA',
  ],
});

export default function FormationIaFaqPage() {
  const faqSchema = getFAQSchema([...FAQ_ITEMS]);
  return (
    <div className="bg-white">
      <JsonLd id="schema-faq-page" schema={faqSchema} />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          FAQ — formation IA BTP (ChatGPT & Claude AI)
        </h1>
        <p className="mt-4 text-lg text-slate-700">
          Questions fréquentes (longue traîne) sur les usages en entreprise, le financement et la
          différence entre outils. Organisme : OFC Création d&apos;Entreprise — Laure Olivié, certifié
          Qualiopi.
        </p>
        <ul className="mt-10 space-y-8">
          {FAQ_ITEMS.map((item) => (
            <li key={item.q} className="border-b border-slate-200 pb-8">
              <h2 className="font-display text-lg font-semibold text-slate-900">{item.q}</h2>
              <p className="mt-3 text-slate-700 leading-relaxed"><FAQAnswer content={item.a} /></p>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-slate-600">
          <Link href="/formation-ia" className="text-[#377CF3] hover:underline">
            Hub formation IA BTP
          </Link>
          {' · '}
          <Link href="/financement-constructys-formation-ia-btp" className="text-[#377CF3] hover:underline">
            Financement Constructys
          </Link>
          {' · '}
          <Link href="/contact" className="text-[#377CF3] hover:underline">
            Contact
          </Link>
        </p>
      </div>
    </div>
  );
}
