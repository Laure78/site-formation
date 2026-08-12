import { FAQAnswer } from '@/components/landing/FAQAnswer';
import Link from 'next/link';
import { Check, FileText, Calculator, Clock, ArrowRight, Calendar } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { RdvLink } from '@/components/RdvLink';
import { CALENDLY_BOOKING_URL, buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { createPageMetadata, getFAQSchema } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { DEVIS_GAIN_TEMPS_LIBELLE } from '@/lib/gains-temps-copy';
import { LINKS } from '@/lib/internal-links';
import { formatTarifHt, TARIF_SESSION_FORFAIT_HT } from '@/lib/tarifs-sessions';

export const revalidate = 3600;
export const metadata = createPageMetadata({
  title: 'Formation IA Devis BTP — Auto Devis Bâtiment',
  description:
    'Formation IA pour automatiser vos devis BTP avec ChatGPT. Méthode, prompts, templates. Premier devis structuré en moins d\'une heure. Finançable Constructys.',
  path: '/ia-devis-batiment',
  appendAuthorSuffix: false,
  keywords: [
    'IA devis automatique bâtiment',
    'IA devis bâtiment',
    'ChatGPT devis BTP',
    'IA pour devis BTP',
    'ChatGPT devis construction',
    'automatiser devis bâtiment',
    'devis IA BTP',
    'financement formation IA OPCO Constructys',
  ],
});

const DEFINITION = {
  titre: "Qu'est-ce que l'IA devis automatique bâtiment ?",
  court: "L'IA devis automatique bâtiment désigne l'utilisation de ChatGPT et outils similaires pour générer, structurer et accélérer la rédaction de devis et chiffrages dans le secteur du BTP : descriptifs techniques, quantités, prix, conditions générales.",
  long: "Un devis bâtiment complet comprend généralement : un descriptif détaillé des prestations, les quantités et unités, les prix unitaires et totaux HT/TTC, les conditions de validité et de paiement. L'intelligence artificielle peut produire ces éléments à partir d'un brief succinct : type de chantier, corps de métier, superficie, options. Vous conservez la maîtrise des prix et des marges ; l'IA vous fait gagner le temps de rédaction et de mise en forme.",
};

const BENEFICES = [
  {
    icon: Clock,
    titre: 'Gain de temps',
    desc: `${DEVIS_GAIN_TEMPS_LIBELLE} L'IA structure le document ; vous ajustez les montants et les conditions.`,
  },
  {
    icon: Calculator,
    titre: 'Cohérence et variantes',
    desc: "Générez facilement des variantes (avec/sans option, différents matériaux) pour proposer plusieurs options au client sans tout recopier.",
  },
  {
    icon: FileText,
    titre: 'Professionnalisme',
    desc: "Descriptifs techniques clairs, formulations professionnelles, mise en page structurée. L'IA vous aide à renvoyer une image soignée.",
  },
];

/** Prompts ChatGPT — devis BTP par métier (section SEO « ChatGPT devis BTP » / « IA devis bâtiment ») */
const PROMPTS_PAR_METIER = [
  {
    label: 'Électricien',
    prompt:
      "Rédige un devis professionnel pour une entreprise d'électricité du bâtiment. Chantier : mise aux normes d'un tableau électrique et ajout de 8 circuits (éclairage, prises 16A, prises dédiées four). Précise un tableau avec 3 colonnes : désignation des fournitures (avec références types si génériques), main d'œuvre par poste, sous-totaux HT. Mentionne déplacement, diagnostic, mise en conformité NF C 15-100. TVA à 10 % pour la rénovation sur logement de plus de 2 ans. Ajoute validité du devis 30 jours, délais d'exécution indicatifs, conditions de paiement 30 % à la commande / solde à la réception. Ton : professionnel BTP, vocabulaire métier.",
    resultat:
      'Un devis structuré avec postes séparés fournitures / pose, ligne pour le tableau et les protections, mention des essais et réception, totaux HT et TTC avec TVA 10 %.',
    temps: '1 h 30',
  },
  {
    label: 'Plombier-chauffagiste',
    prompt:
      "Rédige un devis détaillé pour une rénovation complète de salle de bain (environ 8 m²) : dépose ancien carrelage et sanitaires, alimentations eau chaude / froide, évacuations, pose WC suspendu, meuble vasque, douche à l'italienne avec receveur à carreler, robinetterie entrée de gamme milieu de gamme. Inclus : fournitures listées par poste (à préciser « fournis par l'entreprise » ou « fournis par le client »), main d'œuvre par lot, délais, reprise des étanchéités et tests d'étanchéité. TVA 10 % rénovation. Validité 30 jours. Style : devis BTP clair, sans prix inventés — laisse des champs [PU HT] à compléter.",
    resultat:
      'Un devis multi-lots (dépose, réseaux, étanchéité, pose sanitaires, finitions) avec quantités indicatives et lignes à compléter pour le chiffrage réel.',
    temps: '2 h',
  },
  {
    label: 'Maçon',
    prompt:
      "Élabore un devis pour travaux de maçonnerie : fondations superficielles longrines pour extension 20 m², dalle isolée 10 cm avec treillis, élévation murs en parpaings creux de 20 cm avec chaînage et linteaux, ouvertures baies et portes. Détaille les unités (m³ béton, m² maçonnerie, tonnes ciment si pertinent), la main d'œuvre par phase, les sous-traitances éventuelles (étude géotechnique en hors-devis si besoin). Mentionne délais météo, reprises de liaison avec l'existant. TVA selon contexte neuf / rénovation (précise à compléter). Format : tableau par lot technique.",
    resultat:
      'Un chiffrage découpé par phases gros œuvre, avec vocabulaire CCTP-friendly (fondations, dalle, élévation) prêt à être complété par vos unitaires chantier.',
    temps: '1 h 45',
  },
  {
    label: 'Carreleur',
    prompt:
      "Rédige un devis pour pose de carrelage sol et mural en rénovation : 28 m² sol + 22 m² murs, format 60×60 cm, colle C2 selon DTU, joints cimentaires compatibles, découpe et chutes incluses. Précise : préparation des supports, primaire d'accrochage si nécessaire, pose collée, joints (largeur 2 mm), nettoyage. Tableau fournitures (colle, croisillons, joints) / main d'œuvre. TVA 10 % si rénovation logement éligible. Ajoute conditions de réception et garanties habituelles. Laisse les prix unitaires en [à compléter].",
    resultat:
      'Un devis aligné DTU 52.1 avec postes compréhensibles pour le client et lignes techniques pour votre bureau de prix.',
    temps: '1 h 15',
  },
  {
    label: 'Peintre',
    prompt:
      "Produis un devis pour travaux de peinture intérieure : préparation des supports (rebouchage léger, ponçage, lessivage), application d'un enduit de lissage sur zones irrégulières, puis deux couches de peinture acrylique sur murs et plafonds — surface totale environ 120 m² décomposée par pièce. Liste les produits par type (sous-couche, finition), le temps estimé par pièce, protections sol et mobilier. Précise finitions plinthes et raccords. TVA 10 % si rénovation. Format professionnel avec lignes [PU] à compléter.",
    resultat:
      'Un devis par pièce ou par surface avec phases préparation / finition, adapté aux réponses clients exigeants sur les produits.',
    temps: '1 h 20',
  },
  {
    label: 'Charpentier',
    prompt:
      "Rédige un devis pour réfection de charpente traditionnelle : dépose partielle de couverture, remplacement chevrons endommagés, liteaux, écran sous-toiture, voligeage si nécessaire — surface de toiture environ 90 m², pente 45 %. Inclus : calage sécurité chantier, évacuation gravats, liaison avec couvreur si sous-traitance (à mentionner). Détaille bois section / essences en [à préciser selon étude], quincaillerie, traitement fongicide si besoin. Ajoute délais, garanties décennale à rappeler côté coordination corps d'état. TVA selon opération. Ton : charpentier BTP.",
    resultat:
      'Un devis structuré bois / couverture avec lots techniques et rappels de coordination, prêt pour ajout de votre étude et prix fournisseurs bois.',
    temps: '1 h 45',
  },
] as const;

const CHECKLIST_DEVIS_IA = [
  'Prix unitaires corrects : chaque PU et chaque quantité reflètent votre métreur / votre bordereau — pas les valeurs « plausibles » suggérées par l’IA.',
  'TVA : taux et assiette adaptés au chantier (10 %, 20 %, exonération) et libellés conformes à votre situation.',
  'Délais de paiement : acomptes, échéancier et pénalités de retard cohérents avec votre politique et le cadre légal.',
  'Validité du devis : date limite d’acceptation explicite (souvent 30 jours) pour sécuriser votre prix.',
  'Nom du client : raison sociale ou identité, adresse de facturation et du chantier si différente.',
  'Coordonnées complètes : téléphone, email, SIRET, assurance décennale / RC pro selon activité.',
  'Signature : mentions « Bon pour accord », date et paraphes prévus pour client et entreprise.',
  'CGV : renvoi à vos conditions générales jointes ou résumé des clauses essentielles (réception, garanties, litiges).',
];

const ERREURS_IA_DEVIS = [
  {
    titre: 'Oublier les marges et la structure de coûts',
    desc: "L'IA propose des lignes et des formulations ; elle ne connaît pas votre coefficient, vos frais fixes ni la concurrence locale. Si vous recopiez des montants « plausibles » sans les recalculer, vous perdez de la marge ou vous sous-évaluez la main d'œuvre.",
  },
  {
    titre: 'Ne pas adapter le vocabulaire au métier et au client',
    desc: "Un devis trop générique fait moins professionnel qu'un texte qui cite les bons matériaux, normes et unités (m², ml, forfait). Ajustez toujours le ton : particulier, syndic, marché public.",
  },
  {
    titre: 'Envoyer sans relecture humaine',
    desc: "Fautes, incohérences entre les postes, oublis de prestations incluses dans votre visite : l'IA ne remplace pas le passage sur chantier. Une relecture systématique évite les engagements hasardeux.",
  },
  {
    titre: 'Coller des données sensibles dans ChatGPT « public »',
    desc: "Plans détaillés, données clients, prix négociés fournisseurs : à traiter avec des outils adaptés (comptes entreprise, anonymisation) ou saisie manuelle des éléments confidentiels après génération du squelette.",
  },
  {
    titre: 'Utiliser un prompt trop vague',
    desc: "« Fais un devis pour un chantier » produit un texte médiocre. Précisez métier, surfaces, contexte neuf/rénovation, contraintes normatives et format attendu : c'est ce qui distingue un prompt utile pour un ChatGPT devis BTP d'un brouillon inutilisable.",
  },
];

const FAQ_IA_DEVIS_BATIMENT = [
  {
    q: "L'IA peut-elle rédiger un devis BTP à ma place ?",
    a: "Oui, en brouillon structuré — jamais en chiffrage définitif sans vous. ChatGPT et outils équivalents accélèrent la mise en forme (descriptifs, postes, TVA, conditions) à partir de votre brief métier ; vous restez seul juge des quantités, des prix unitaires et de la signature. C'est le cœur du module devis de la <a href=\"/formations/ia-batiment-travaux-publics\">formation NIV-01 — L'IA au service du Bâtiment Travaux Publics</a> : prompts par corps de métier, relecture et garde-fous confidentialité.",
  },
  {
    q: "Combien de temps peut-on gagner sur un devis avec l'IA ?",
    a: "En pratique, un premier devis structuré en moins d'une heure, contre une demi-journée en routine — selon la complexité du chantier et la qualité du prompt. L'IA structure ; vous relisez et ajustez les PU. Le <a href=\"/blog/ia-devis-batiment-chiffrage-automatise\">guide chiffrage automatisé IA devis bâtiment</a> reprend des exemples par métier (électricité, plomberie, maçonnerie).",
  },
  {
    q: "Faut-il une formation pour utiliser l'IA sur les devis ?",
    a: "Non pour un essai ponctuel ; oui pour l'ancrer en équipe sans erreurs coûteuses. Une session de 4 h suffit à maîtriser prompts, trames par métier, checklist TVA et règles de confidentialité — sans prérequis technique ni code. En intra comme en inter, l'objectif est de repartir avec des modèles réutilisables sur vos vrais documents, pas une démo générique déconnectée du terrain.",
  },
  {
    q: "La formation IA devis est-elle finançable par l'OPCO ?",
    a: "Oui, selon éligibilité et dossier monté dans les délais. Les sessions certifiées Qualiopi (module devis inclus) peuvent être prises en charge par Constructys ou votre OPCO BTP, dans la limite des plafonds horaires et du délai eGestion (15 jours calendaires avant la session). Le <a href=\"/financement-constructys-formation-ia-btp\">guide financement Constructys formation IA BTP</a> détaille les pièces, les plafonds 2026 et les erreurs qui font rejeter un dossier.",
  },
] as const;

export default function IADevisBatimentPage() {
  const faqSchema = getFAQSchema([...FAQ_IA_DEVIS_BATIMENT]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <JsonLd id="schema-faq-page" schema={faqSchema} />
      <nav className="mb-8 text-sm text-slate-600">
        <Link href="/" className="text-[var(--accent)] hover:underline">
          Accueil
        </Link>
        {' / '}
        <span className="text-slate-900">IA pour devis bâtiment</span>
      </nav>

      <article>
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          IA devis BTP : <span className="text-[var(--accent)]">automatiser devis bâtiment</span>
        </h1>
        <p className="mt-6 text-xl text-slate-600">
          L&apos;IA devis BTP permet d&apos;{' '}
          <Link href={LINKS.formationParis} className="text-[var(--accent)] font-medium hover:underline">
            automatiser devis bâtiment
          </Link>
          {' '}et structurer un premier devis en moins d&apos;une heure (vs demi-journée selon complexité). Descriptifs techniques, chiffrages, variantes : documents plus homogènes d&apos;un chantier à l&apos;autre. Découvrez notre{' '}
          <Link href="/formations" className="text-[var(--accent)] font-medium hover:underline">
            formation IA pour le BTP
          </Link>
          {' '}financement possible selon éligibilité.
        </p>

        <div className="mt-8">
          <ShortAnswerBlock>
            L&apos;IA aide les entreprises du BTP à libérer du temps sur les devis, emails et comptes rendus. Une formation de 4 h suffit pour être opérationnel. Les gains varient selon l&apos;organisation et le niveau de pratique.
          </ShortAnswerBlock>
        </div>

        {/* Bloc GEO : Réponse courte */}
        <section className="mt-12 rounded-2xl border-2 border-[var(--accent)] bg-[var(--accent-soft)] p-6 md:p-8">
          <h2 className="font-display text-xl font-bold text-slate-900">
            En bref : IA devis automatique bâtiment
          </h2>
          <p className="mt-4 text-slate-700">{DEFINITION.court}</p>
        </section>

        {/* Définition */}
        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            {DEFINITION.titre}
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">{DEFINITION.long}</p>
        </section>

        {/* Bénéfices */}
        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Pourquoi utiliser l&apos;IA pour vos devis BTP ?
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {BENEFICES.map(({ icon: Icon, titre, desc }) => (
              <div
                key={titre}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">{titre}</h3>
                <p className="mt-2 text-sm text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Exemple */}
        <section className="mt-16 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Exemple : devis carrelage avec l&apos;IA
          </h2>
          <p className="mt-4 text-slate-600">
            Vous êtes carreleur. Vous indiquez à ChatGPT : « Devis pour 35 m² de
            carrelage sol et mural, salle de bain, format 60x60, colle et joint
            fournis. Main d&apos;œuvre + fournitures. TVA 10 %. » L&apos;IA génère
            un descriptif structuré avec postes (décapage, préparation,
            pose, joints), quantités, prix unitaires et total. Vous vérifiez et
            ajustez selon vos tarifs réels. Pour apprendre à{' '}
            <Link href={LINKS.formationParis} className="text-[var(--accent)] font-medium hover:underline">
              utiliser ChatGPT dans le BTP
            </Link>
            , notre formation pratique vous donne les trames prêtes à l&apos;emploi.
          </p>
          <p className="mt-6 text-slate-600 leading-relaxed">
            Sur les moteurs comme Google, les requêtes{' '}
            <strong className="text-slate-800">ChatGPT devis BTP</strong> et{' '}
            <strong className="text-slate-800">IA devis bâtiment</strong> regroupent des professionnels du BTP,
            chefs d&apos;entreprise et conducteurs de travaux qui cherchent un gain de temps concret :
            moins de blanc sur la page, des postes mieux structurés, des variantes pour négocier avec le
            client. L&apos;objectif n&apos;est pas de &laquo; générer un prix &raquo; sans contrôle, mais
            d&apos;obtenir un <strong className="text-slate-800">squelette professionnel</strong> (titres,
            lots, unités, mentions TVA et délais) que vous complétez avec votre grille tarifaire et votre
            visite technique. Les sections qui suivent détaillent des prompts par métier, une checklist
            de relecture, les erreurs fréquentes — puis le déroulé d&apos;une formation en 4 h pour
            ancrer ces réflexes dans votre équipe.
          </p>
        </section>

        {/* Prompts par métier — SEO ChatGPT devis BTP / IA devis bâtiment */}
        <section className="mt-20">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Prompts ChatGPT prêts à l&apos;emploi par corps de métier
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Pour ranker sur des recherches comme{' '}
            <strong className="text-slate-800">ChatGPT devis BTP</strong> ou{' '}
            <strong className="text-slate-800">IA devis bâtiment</strong>, le critère décisif est la
            qualité du brief : un prompt détaillé produit un brouillon de devis exploitable, que vous
            complétez avec vos prix et votre marge. Ci-dessous, six exemples de prompts complets à
            copier-coller dans ChatGPT (ou un outil équivalent), puis à adapter après relecture.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Chaque bloc suit le même principe : l&apos;IA structure le document et le vocabulaire
            métier ; vous restez seul juge des montants, des délais et de la conformité réglementaire.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            <strong className="text-slate-800">Méthode.</strong> Copiez le prompt dans une nouvelle
            conversation, complétez les éléments entre crochets si j&apos;en ai laissés, puis imposez
            le format souhaité : tableau pour séparer fournitures et main d&apos;œuvre, TVA à 10 % pour
            une rénovation éligible, mentions de validité et de paiement. Relisez systématiquement : une
            bonne pratique pour le <strong className="text-slate-800">devis intelligent bâtiment</strong>{' '}
            consiste à enregistrer vos prompts validés comme modèles internes (texte, Notion ou fiche
            Excel) afin d&apos;harmoniser les réponses de votre bureau des prix. Pour les marchés
            sensibles ou les données personnelles, préférez un environnement professionnel (compte
            entreprise, anonymisation des noms) plutôt que le collage brut de dossiers complets dans un
            outil grand public.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Les six métiers ci-dessous couvrent une large part des demandes en second œuvre et en
            structure : <strong className="text-slate-800">électricien</strong> (tableau explicite
            fournitures / main d&apos;œuvre / TVA 10 %),{' '}
            <strong className="text-slate-800">plombier-chauffagiste</strong> (salle de bain rénovée),
            <strong className="text-slate-800"> maçon</strong> (fondations, dalles, élévation),{' '}
            <strong className="text-slate-800">carreleur</strong> (60×60, colle C2, joints),{' '}
            <strong className="text-slate-800">peintre</strong> (préparation, deux couches),{' '}
            <strong className="text-slate-800">charpentier</strong> (traditionnelle, chevrons,
            coordination couverture). Adaptez les surfaces, les marques et les contraintes chantier à votre
            réalité — le prompt est une base, pas une offre figée.
          </p>
          <div className="mt-10 space-y-12">
            {PROMPTS_PAR_METIER.map((bloc) => (
              <div
                key={bloc.label}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
              >
                <h3 className="font-display text-xl font-semibold text-slate-900">{bloc.label}</h3>
                <div className="mt-4 space-y-3 text-slate-700">
                  <p>
                    <strong className="text-slate-900">Prompt :</strong>{' '}
                    <span className="leading-relaxed">{bloc.prompt}</span>
                  </p>
                  <p>
                    <strong className="text-slate-900">Résultat attendu :</strong>{' '}
                    {bloc.resultat}
                  </p>
                  <p>
                    <strong className="text-slate-900">Temps économisé :</strong>{' '}
                    environ {bloc.temps} par rapport à une rédaction « à blanc » sans trame.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Checklist avant envoi */}
        <section className="mt-20 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Checklist avant d&apos;envoyer un devis généré par l&apos;IA
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            L&apos;<strong className="text-slate-800">IA devis bâtiment</strong> accélère la mise en
            forme ; en revanche, la responsabilité du document signé reste entièrement la vôtre.
            Avant d&apos;envoyer un devis issu d&apos;un modèle généré (y compris avec{' '}
            <strong className="text-slate-800">ChatGPT pour devis BTP</strong>), cochez mentalement
            ces huit points — ils évitent la majorité des litiges et des impasses commerciales.
          </p>
          <ul className="mt-8 space-y-4">
            {CHECKLIST_DEVIS_IA.map((point, i) => (
              <li key={i} className="flex gap-3 text-slate-700">
                <Check
                  className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-slate-600 leading-relaxed">
            Une relecture méthodique — idéalement par la personne qui signe ou par un second lecteur —
            évite les oublis de mentions obligatoires, les incohérences entre quantités et libellés, ou
            les taux de TVA appliqués à tort. Gardez une trace de la version envoyée (PDF horodaté ou
            numéro de devis) pour tout suivi en cas de contestation ou d&apos;avenant. Selon votre
            assurance décennale ou votre logiciel de gestion, vous pouvez compléter cette grille par des
            contrôles supplémentaires : plans, fiches techniques produits, planning d&apos;intervention.
          </p>
        </section>

        {/* Encadré CTA Calendly — milieu de page */}
        <section
          className="mt-20 rounded-2xl border-2 border-[var(--accent)] bg-[var(--accent-soft)] p-6 md:p-8"
          aria-labelledby="ia-devis-cta-milieu-title"
        >
          <h2
            id="ia-devis-cta-milieu-title"
            className="font-display text-xl font-bold text-slate-900 md:text-2xl"
          >
            Vos devis BTP prennent trop de temps à rédiger ?
          </h2>
          <p className="mt-3 text-slate-700 leading-relaxed">
            Visio découverte gratuite (30 min) : on passe en revue vos cas réels (prompts, trames,
            financement OPCO) et on voit si la{' '}
            <Link
              href={LINKS.formationIaBtpNiveau1BatimentTp}
              className="font-medium text-[var(--accent)] hover:underline"
            >
              formation NIV-01
            </Link>{' '}
            correspond à votre équipe.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <RdvLink
              campaign="ia-devis"
              ctaPosition="middle"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-8 py-4 text-center font-semibold text-white shadow-md hover:bg-blue-600"
            >
              <Calendar size={20} strokeWidth={1.5} aria-hidden />
              Réserver un créneau Calendly
            </RdvLink>
            <Link
              href={LINKS.formationIaBtpNiveau1BatimentTp}
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[var(--accent)] bg-white px-6 py-4 text-center font-semibold text-[var(--accent)] hover:bg-white/90"
            >
              Voir la fiche NIV-01
              <ArrowRight size={18} strokeWidth={1.5} aria-hidden />
            </Link>
          </div>
        </section>

        {/* Erreurs fréquentes */}
        <section className="mt-20">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Erreurs fréquentes quand on utilise l&apos;IA pour ses devis BTP
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Sur le terrain, les entreprises qui réussissent avec l&apos;IA sur les devis sont celles
            qui traitent l&apos;outil comme un <strong className="text-slate-800">assistant de
            rédaction</strong>, pas comme un chiffreur automatique. Voici cinq écueils observés lors
            des formations IA devis BTP, et comment les éviter pour sécuriser vos{' '}
            <strong className="text-slate-800">devis intelligents bâtiment</strong>.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Beaucoup de professionnels du BTP découvrent l&apos;<strong className="text-slate-800">IA devis
            bâtiment</strong> par essai-erreur : le premier jet semble convaincant, puis un détail
            (marge, norme, confidentialité) crée un problème en phase d&apos;exécution ou de relation
            client. Anticiper ces erreurs permet de traiter l&apos;IA comme un{' '}
            <strong className="text-slate-800">assistant de structuration</strong>, pas comme une
            source de vérité sur les prix ou les obligations légales. En intra-entreprise, formalisez
            une charte d&apos;usage : qui valide le devis, quelles données ne doivent jamais être
            collées dans un prompt public, comment archiver les versions finales.
          </p>
          <div className="mt-10 space-y-6">
            {ERREURS_IA_DEVIS.map((e) => (
              <div
                key={e.titre}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="font-semibold text-slate-900">{e.titre}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-slate-600 leading-relaxed">
            En résumé : un usage responsable du <strong className="text-slate-800">ChatGPT devis BTP</strong>{' '}
            combine prompts précis, validation humaine systématique et protection des données sensibles.
            Cette triple barrière préserve votre crédibilité auprès des clients et limite les écarts entre
            le texte généré et la réalité chantier — ce qui est précisément l&apos;objectif d&apos;une
            démarche d&apos;<strong className="text-slate-800">IA devis bâtiment</strong> professionnelle.
          </p>
        </section>

        {/* Formation 4 h — CTA Calendly */}
        <section className="mt-20 rounded-2xl border-2 border-[var(--accent)] bg-[var(--accent-soft)] p-6 md:p-10">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Formation IA devis BTP — ce que vous apprenez en 4 heures
          </h2>
          <p className="mt-4 text-slate-700 leading-relaxed">
            La session <strong className="text-slate-900">« L&apos;IA au service du bâtiment »</strong>{' '}
            inclut un module concret sur les devis et le chiffrage : construction de prompts par corps
            de métier, relecture des brouillons, bonnes pratiques de confidentialité, et reprise de vos
            propres modèles (Excel, PDF, texte). Vous repartez avec des trames réutilisables pour le{' '}
            <strong className="text-slate-900">ChatGPT devis BTP</strong> au quotidien — sans remplacer
            votre expertise, en renforçant votre{' '}
            <strong className="text-slate-900">IA devis bâtiment</strong> maîtrisée.
          </p>
          <p className="mt-4 text-slate-700 leading-relaxed">
            Le programme alterne démonstrations et ateliers : vous repartez avec des modèles de prompts
            adaptés au BTP, une grille de contrôle avant signature, et des réponses à des cas réels
            (petites rénovations, extensions, lots techniques). L&apos;objectif est de réduire le temps
            passé sur la mise en forme tout en gardant la maîtrise des montants et des engagements
            contractuels — pilier d&apos;une approche sérieuse de l&apos;IA en entreprise du bâtiment.
          </p>
          <ul className="mt-6 list-inside list-disc space-y-2 text-slate-700">
            <li>Atelier sur vos cas réels : devis types, variantes, relances après envoi.</li>
            <li>Rappels TVA, mentions légales et structure de document professionnelle.</li>
            <li>Certification Qualiopi — financement OPCO Constructys selon éligibilité et dossier.</li>
          </ul>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <RdvLink
              campaign="ia-devis"
              ctaPosition="inline"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-8 py-4 text-center text-base font-semibold text-white shadow-md hover:bg-blue-600"
            >
              Réserver un appel découverte (Calendly)
            </RdvLink>
            <Link
              href={LINKS.formationIaBtpNiveau1BatimentTp}
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[var(--accent)] bg-white px-8 py-4 text-center font-semibold text-[var(--accent)] hover:bg-white/90"
            >
              Voir le programme NIV-01 (PDF sur la fiche)
            </Link>
            <Link
              href="/financement-constructys-formation-ia-btp"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-4 text-center font-medium text-slate-800 hover:border-[var(--accent)]"
            >
              Financement Constructys
            </Link>
          </div>
          <p className="mt-6 text-sm text-slate-600">
            Lien direct agenda :{' '}
            <a
              href={buildSiteCalendlyCtaUrl('ia-devis')}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--accent)] hover:underline"
            >
              {CALENDLY_BOOKING_URL}
            </a>
          </p>
        </section>

        {/* FAQ — IA et devis bâtiment */}
        <section className="mt-20" aria-labelledby="faq-ia-devis-batiment-title">
          <h2 id="faq-ia-devis-batiment-title" className="font-display text-2xl font-bold text-slate-900">
            IA et devis bâtiment : questions fréquentes
          </h2>
          <div className="mt-8 space-y-6">
            {FAQ_IA_DEVIS_BATIMENT.map(({ q, a }) => (
              <div
                key={q}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="font-semibold text-slate-900">{q}</h3>
                <p className="mt-2 text-slate-600"><FAQAnswer content={a} /></p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 rounded-2xl bg-[var(--accent)] p-8 text-white">
          <h2 className="font-display text-2xl font-bold">
            Formation IA devis et chiffrage BTP — session 4 h
          </h2>
          <p className="mt-4 text-blue-100">
            Module dédié dans la formation « L&apos;IA au service du bâtiment » : session 4 h de pratique sur
            vos vrais devis. Forfait unique {formatTarifHt(TARIF_SESSION_FORFAIT_HT)}&nbsp;€&nbsp;HT — financement
            possible selon éligibilité.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href={LINKS.formationParis}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[var(--accent)] hover:bg-blue-50"
            >
              Voir le programme
              <ArrowRight size={20} strokeWidth={1.5} />
            </Link>
            <RdvLink
              campaign="ia-devis"
              ctaPosition="footer"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10"
            >
              Prendre rendez-vous
            </RdvLink>
          </div>
        </section>

        {/* CTA RDV */}
        <section className="mt-12 rounded-2xl border-2 border-[var(--accent)] bg-[var(--accent-soft)] p-6">
          <p className="text-slate-800">
            Vous souhaitez découvrir comment l&apos;IA peut faire gagner du temps à votre entreprise du BTP ?{' '}
            <RdvLink campaign="ia-devis" ctaPosition="footer" className="font-semibold text-[var(--accent)] hover:underline">
              Prenez rendez-vous pour échanger sur votre projet.
            </RdvLink>
          </p>
        </section>

        {/* Liens + Aller plus loin */}
        <section className="mt-16 border-t border-slate-200 pt-12">
          <h2 className="font-display text-lg font-semibold text-slate-900">
            IA devis bâtiment : ressources complémentaires
          </h2>
          <ul className="mt-4 flex flex-wrap gap-4">
            <li>
              <Link href="/formation-ia-artisans-btp" className="text-[var(--accent)] hover:underline">
                ChatGPT pour entreprises BTP
              </Link>
            </li>
            <li>
              <Link href={LINKS.formationConducteurTravaux} className="text-[var(--accent)] hover:underline">
                IA conducteur de travaux
              </Link>
            </li>
            <li>
              <Link href="/formations" className="text-[var(--accent)] hover:underline">
                Formation IA pour les pros du BTP
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-[var(--accent)] hover:underline">
                Articles et guides blog
              </Link>
            </li>
            <li>
              <RdvLink campaign="ia-devis" className="text-[var(--accent)] hover:underline">
                Prendre rendez-vous
              </RdvLink>
            </li>
          </ul>
        </section>

        <AllerPlusLoin
          links={[
            { href: '/formations', label: 'Formation IA Constructys' },
            { href: '/formation-ia-artisans-btp', label: 'ChatGPT pour entreprises BTP' },
            { href: LINKS.formationConducteurTravaux, label: 'IA conducteur de travaux' },
            { href: '/blog', label: 'Articles et guides' },
            { href: buildSiteCalendlyCtaUrl('ia-devis'), label: 'Prendre rendez-vous' },
          ]}
        />
      </article>
    </div>
  );
}
