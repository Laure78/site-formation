import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Calculator,
  FileText,
  Mail,
  MessageSquare,
  Share2,
} from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { RdvLink } from '@/components/RdvLink';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { createPageMetadata, getFAQSchema } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'ChatGPT artisan électricien BTP — formation IA électricien | Laure Olivié',
  description:
    'Formation IA et ChatGPT pour artisans électriciens : devis, appels d’offres, emails, fiches techniques. Qualiopi, finançable Constructys. Laure Olivié — +1 500 pros BTP formés, 4,85/5.',
  path: '/formation-chatgpt-artisan-electricien',
  keywords: [
    'ChatGPT artisan électricien BTP',
    'formation IA électricien',
    'ChatGPT devis électricité',
    'IA artisan électricien',
    'électricien bâtiment IA',
    'NF C 15-100 devis',
    'formation Qualiopi électricien',
    'OPCO Constructys électricien',
  ],
});

const CAS_USAGE = [
  {
    icon: Calculator,
    titre: 'Devis électricité et chiffrage',
    desc: "Vous décrivez le chantier : tableau, circuits, nombre de points lumineux, tirage de câbles, mise aux normes NF C 15-100. ChatGPT vous aide à structurer le descriptif, les postes et les conditions — vous fixez les prix et la marge.",
  },
  {
    icon: FileText,
    titre: 'Réponse à un appel d’offres',
    desc: "À partir du CCTP et des contraintes du dossier, vous obtenez un premier jet de mémoire technique ou de planning d’exécution à retravailler avec votre équipe. Utile quand le délai est serré.",
  },
  {
    icon: Mail,
    titre: 'Emails clients et relances',
    desc: "Confirmation de rendez-vous, relance de devis, réponse après visite technique : le ton reste pro, le message est clair. Vous gagnez du temps sur la formulation.",
  },
  {
    icon: BookOpen,
    titre: 'Fiches techniques et comptes rendus',
    desc: "Synthèse d’une intervention (remplacement tableau, passage en triphasé, diagnostic), liste de contrôle avant réception : des textes exploitables pour le dossier chantier ou le client.",
  },
  {
    icon: Share2,
    titre: 'Posts réseaux sociaux',
    desc: "Présenter une réalisation (rénovation tableau, éclairage LED, bornes de recharge) sans y passer la soirée : idées de légendes et de structure, vous gardez la photo et le ton de votre entreprise.",
  },
];

const COMPETENCES = [
  'Rédiger des prompts efficaces pour le métier d’électricien (devis, mails, synthèses) sans coller de données sensibles.',
  'Structurer un devis ou une réponse technique à partir de vos infos terrain (quantités, normes, contraintes accès).',
  'Reconnaître les limites de l’outil : relecture, validation des chiffres et conformité — vous restez responsable du document.',
  'Mettre en place une petite routine (modèles, consignes internes) pour que toute l’équipe gagne en régularité.',
  'Choisir les bons usages selon votre outil (version gratuite, Team, etc.) et les règles de confidentialité.',
];

const PROMPTS = [
  {
    titre: 'Ébauche de devis après visite',
    text: `Tu es un assistant pour une entreprise d’électricité bâtiment en France. À partir des éléments suivants : [type de local, surface, tableau existant ou neuf, nombre de circuits, points d’éclairage, préconisation mise aux normes NF C 15-100], rédige un devis type avec des postes séparés (fournitures / main-d’œuvre), mentions légales habituelles, validité 30 jours. Ne invente pas de prix : laisse des champs [PU à compléter].`,
  },
  {
    titre: 'Email client après intervention',
    text: `Rédige un email professionnel en français pour un client particulier : résumé de l’intervention électrique du [date], travaux réalisés [liste], points de vigilance [si applicable], facture à suivre. Ton cordial, phrases courtes.`,
  },
  {
    titre: 'Synthèse « mémoire technique » express',
    text: `À partir du descriptif suivant d’un lot électricité dans un marché public : [coller extraits CCTP / périmètre], propose un plan de mémoire technique en 5 parties avec sous-points et questions à clarifier avec le MOE avant envoi.`,
  },
];

const FAQ_ITEMS = [
  {
    q: 'La formation remplace-t-elle le savoir-faire d’un électricien qualifié ?',
    a: "Non. ChatGPT aide à la rédaction et à la structuration ; le dimensionnement, les choix de matériel et la conformité restent à votre expertise et à votre obligation de résultat. L’outil gagne du temps sur le papier, pas sur le geste métier.",
  },
  {
    q: 'Puis-je financer cette formation avec l’OPCO Constructys ?',
    a: "Oui, les formations proposées par OFC Création d’Entreprise dans le cadre du catalogue Constructys peuvent être prises en charge selon les règles de votre branche et la taille de l’entreprise. Demandez un devis pour monter le dossier avec votre OPCO.",
  },
  {
    q: 'Faut-il déjà utiliser ChatGPT au quotidien ?',
    a: "Non. La session part des bases : compte, consignes de sécurité des données, premiers prompts adaptés au métier d’électricien. Les personnes à l’aise avec le mail et un tableur suivent sans difficulté.",
  },
  {
    q: 'C’est plutôt présentiel ou à distance ?',
    a: "Les deux existent selon les sessions : visioconférence interactive ou présentiel en entreprise / inter-entreprises. Le programme reste orienté pratique, avec des exercices sur vos cas réels (sans données nominatives dans l’outil public).",
  },
];

export default function FormationChatGPTArtisanElectricienPage() {
  const faqSchema = getFAQSchema(FAQ_ITEMS);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <nav className="mb-8 text-sm text-slate-600">
        <Link href="/" className="text-[var(--accent)] hover:underline">
          Accueil
        </Link>
        {' / '}
        <Link href="/formations" className="text-[var(--accent)] hover:underline">
          Formations
        </Link>
        {' / '}
        <span className="text-slate-900">ChatGPT artisan électricien BTP</span>
      </nav>

      <article>
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          <span className="text-[var(--accent)]">ChatGPT artisan électricien BTP</span> : gagner du temps sur le
          papier
        </h1>
        <p className="mt-6 text-xl text-slate-600">
          Entre les devis, les relances et les dossiers techniques, la semaine file vite — sans compter les chantiers.
          Une <strong>formation IA électricien</strong> centrée sur ChatGPT vous permet de traiter plus vite les tâches
          rédactionnelles, tout en gardant la main sur les prix et la conformité (tableau, câblage,{' '}
          <abbr title="Norme française — installations électriques basse tension">NF C 15-100</abbr>
          ). C’est l’objet de cette page : montrer ce que l’on peut faire concrètement avec l’IA quand on est{' '}
          <strong>artisan électricien</strong> ou <strong>TPE d’électricité bâtiment</strong>.
        </p>

        <div className="mt-8">
          <ShortAnswerBlock>
            ChatGPT aide l’électricien à structurer devis, mails et synthèses techniques à partir de vos consignes ;
            il ne remplace ni le chiffrage réel ni la validation normative. Formation pratique, finançable Constructys,
            animée par Laure Olivié (Qualiopi).
          </ShortAnswerBlock>
        </div>

        <p className="mt-8 text-slate-600 leading-relaxed">
          Laure Olivié, formatrice pour <strong>OFC Création d’Entreprise</strong>, accompagne les professionnels du
          BTP depuis le terrain : plus de <strong>1 500 professionnels</strong> formés, satisfaction moyenne{' '}
          <strong>4,85/5</strong>. Les contenus s’adressent aux dirigeants et aux équipes qui en ont assez de passer deux
          heures sur un mail alors que le tableau attend sur le chantier. L’enjeu n’est pas le gadget, c’est le{' '}
          <strong>ChatGPT devis électricité</strong> et l’<strong>IA artisan électricien</strong> au service du
          quotidien.
        </p>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Pourquoi utiliser ChatGPT quand on est électricien ?
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Sur le terrain, vous savez déjà lire un schéma, repérer une dérivation ou expliquer une mise aux normes. Là
            où ça coince souvent, c’est le retour au bureau : transformer une prise de notes en devis clair, répondre à
            un marché public sans y passer la nuit, ou relancer un client sans sonner « robot ». ChatGPT ne fait pas le
            métier à votre place : il accélère la mise en forme et la structuration quand vous lui donnez le bon
            contexte — type de chantier, contraintes d’accès, niveau de finition attendu.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Sur une installation neuve comme sur une mise aux normes en rénovation, le raisonnement reste le vôtre : sections
            de câbles, protections, équipotentiel, passages dans les cloisons. Ce qui varie, c’est le volume de papier à
            sortir derrière. Un prompt utile mentionne le cadre (copropriété, délai de coupure imposé, accès au local
            technique) pour éviter les réponses trop génériques. En formation, on s’appuie sur des situations réelles —
            anonymisées — afin que l’outil devienne un prolongement de votre bureau, pas une usine à phrases vides.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CAS_USAGE.map(({ icon: Icon, titre, desc }) => (
              <div
                key={titre}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">{titre}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold text-slate-900">Ce que vous apprendrez</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            La session ne vise pas à vous transformer en « prompt engineer », mais à ce que vous repartiez avec des
            réflexes utilisables lundi matin. Voici les compétences typiquement travaillées :
          </p>
          <ul className="mt-6 space-y-3">
            {COMPETENCES.map((item) => (
              <li key={item} className="flex gap-3 text-slate-700">
                <MessageSquare
                  className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
          <h2 className="font-display text-2xl font-bold text-slate-900">La formation en pratique</h2>
          <ul className="mt-6 space-y-4 text-slate-700">
            <li>
              <strong className="text-slate-900">Durée :</strong> en général une demi-journée à une journée selon le
              module retenu (ex. intégration dans « L&apos;IA au service du bâtiment » ou parcours équivalent). Les temps
              sont majoritairement pratiques.
            </li>
            <li>
              <strong className="text-slate-900">Format :</strong> visioconférence ou présentiel, inter-entreprises ou
              en intra pour votre équipe — idéal pour aligner secrétaire et chefs d&apos;équipe sur les mêmes consignes.
            </li>
            <li>
              <strong className="text-slate-900">Prérequis :</strong> utiliser couramment un ordinateur ou une tablette,
              envoyer des mails, ouvrir un PDF. Aucun code à écrire. Savoir décrire un chantier avec vos mots suffit pour
              commencer.
            </li>
            <li>
              <strong className="text-slate-900">Certification & financement :</strong> organisme certifié{' '}
              <strong>Qualiopi</strong> ; possibilité de financement via{' '}
              <Link href="/financement-constructys-formation-ia-btp" className="text-[var(--accent)] font-medium hover:underline">
                l&apos;OPCO Constructys
              </Link>{' '}
              pour les entreprises éligibles du secteur BTP.
            </li>
          </ul>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            3 prompts ChatGPT prêts à adapter (électricité bâtiment)
          </h2>
          <p className="mt-4 text-slate-600">
            Copiez le bloc, remplacez ce qui est entre crochets par vos infos réelles — et relisez toujours le résultat
            avant envoi au client ou au maître d&apos;ouvrage.
          </p>
          <div className="mt-8 space-y-8">
            {PROMPTS.map(({ titre, text }) => (
              <div key={titre} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-slate-900">{titre}</h3>
                <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
                  {text}
                </pre>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-8 text-center">
          <h2 className="font-display text-xl font-bold text-slate-900">Témoignage</h2>
          <p className="mt-4 text-slate-600 italic">
            [Espace réservé à un retour d&apos;expérience d&apos;artisan électricien ou de dirigeant TPE — citation et
            entreprise à venir.]
          </p>
        </section>

        <section className="mt-16 rounded-2xl bg-[var(--accent)] p-8 text-white md:p-10">
          <h2 className="font-display text-2xl font-bold">Demander un devis formation</h2>
          <p className="mt-4 text-blue-100 leading-relaxed">
            Indiquez le nombre de participants, le format souhaité et vos contraintes de dates : nous vous répondons avec
            une proposition adaptée aux <strong>artisans électriciens</strong> et aux équipes en{' '}
            <strong>électricité bâtiment</strong>. Formation certifiée Qualiopi —{' '}
            <strong>100 % finançable Constructys</strong> pour les entreprises éligibles via l&apos;OPCO du secteur.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[var(--accent)] hover:bg-blue-50"
            >
              Demander un devis formation
              <ArrowRight size={20} strokeWidth={1.5} />
            </Link>
            <RdvLink className="inline-flex items-center gap-2 rounded-xl border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10">
              Prendre rendez-vous
            </RdvLink>
          </div>
          <p className="mt-6 text-sm text-blue-100">
            Pour le détail des programmes :{' '}
            <Link href="/formations/ia-btp-paris" className="underline hover:text-white">
              formation IA BTP (Paris & France)
            </Link>
            {' · '}
            <Link href="/formation-ia-artisans-btp" className="underline hover:text-white">
              ChatGPT pour entreprises BTP
            </Link>
            .
          </p>
        </section>

        <section className="mt-20">
          <h2 className="font-display text-2xl font-bold text-slate-900">Questions fréquentes</h2>
          <div className="mt-8 space-y-6">
            {FAQ_ITEMS.map(({ q, a }) => (
              <div
                key={q}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="font-semibold text-slate-900">{q}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        <AllerPlusLoin
          links={[
            { href: '/formations', label: 'Catalogue formations IA BTP' },
            { href: '/formation-ia-artisans-btp', label: 'ChatGPT pour entreprises BTP' },
            { href: '/ia-devis-batiment', label: 'IA devis bâtiment' },
            { href: '/financement-constructys-formation-ia-btp', label: 'Financement Constructys' },
            { href: CALENDLY_BOOKING_URL, label: 'Prendre rendez-vous' },
          ]}
        />
      </article>
    </div>
  );
}
