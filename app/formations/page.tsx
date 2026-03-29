import Link from 'next/link';
import Image from 'next/image';
import { Clock, Users, Check } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { FAQSection } from '@/components/landing/FAQSection';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { createPageMetadata, getFAQSchema, getCourseListSchema } from '@/lib/seo';
import { FAQ_FORMATIONS } from '@/lib/faq';
import { PHOTOS } from '@/lib/photos';

export const metadata = createPageMetadata({
  title: 'Formations IA BTP & ChatGPT entreprise | Catalogue Qualiopi',
  description:
    "Catalogue formation IA BTP : ChatGPT, devis, appels d'offres, RH, TP. Sessions 4 h à 2 jours. Qualiopi, OPCO Constructys. Choisissez votre parcours.",
  path: '/formations',
  keywords: [
    'formation IA BTP',
    'formation ChatGPT entreprise BTP',
    'catalogue formation IA BTP',
    'formations IA bâtiment',
    'IA devis bâtiment',
    'IA gestion chantier',
    'automatisation tâches administratives BTP',
    'formation IA artisan',
    'IA pour PME bâtiment',
    'formation IA Qualiopi',
    'OPCO Constructys',
    'formation IA PME BTP',
  ],
});

/** Niveaux affichés : débutant et intermédiaire uniquement (pas de niveau avancé). */
const LEVEL_RANK: Record<string, number> = { DÉBUTANT: 0, INTERMÉDIAIRE: 1 };

const FORMATIONS_UNSORTED = [
  {
    ref: 'BTP-01',
    level: 'DÉBUTANT' as const,
    title: "L'IA au service du bâtiment",
    href: '/#programme',
    duree: '4h ou 7h',
    effectif: '12 max',
    objectifs: [
      "Identifier les usages IA utiles dans le BTP",
      "Accélérer la rédaction de devis et messages clients",
      "Structurer l'administratif (CR, relances, modèles)",
      "Repartir avec des trames et prompts prêts à l'emploi",
    ],
  },
  {
    ref: 'BTP-02',
    level: 'INTERMÉDIAIRE' as const,
    title: "Répondre aux appels d'offres BTP avec l'IA",
    href: '/formations/ia-appels-offre-btp',
    duree: '1 jour (7h)',
    effectif: '12 max',
    objectifs: [
      "Analyser un DCE en 30 min au lieu de 3h",
      "Structurer mémoires techniques et chiffrages",
      "Bibliothèque de prompts + templates par métier",
      "Assistant IA personnalisé pour vos projets",
    ],
  },
  {
    ref: 'BTP-03',
    level: 'INTERMÉDIAIRE' as const,
    title: "Formation IA pour la Fonction RH dans le BTP",
    href: '/formations/ia-rh-btp',
    duree: '2 jours (14h)',
    effectif: '12 max',
    objectifs: [
      "Automatiser le recrutement et la sélection",
      "Piloter la GEPP et anticiper les compétences",
      "Créer des tableaux de bord RH opérationnels",
      "Construire un assistant IA RH sur-mesure",
    ],
  },
  {
    ref: 'BTP-04',
    level: 'DÉBUTANT' as const,
    title: "L'IA au service des Travaux Publics",
    href: '/formations/ia-travaux-publics',
    duree: '2 jours (14h)',
    effectif: '12 max',
    objectifs: [
      "Analyser DCE, CCTP et comptes rendus chantier",
      "Rédiger rapports et réponses appels d'offres",
      "Créer votre assistant IA métier TP",
    ],
  },
  {
    ref: 'BTP-05',
    level: 'INTERMÉDIAIRE' as const,
    title: "Sensibilisation à l'IA & Assistants IA personnalisés",
    href: '/formations/sensibilisation-ia-assistants-personnalises',
    duree: '8h (parcours LMS)',
    effectif: 'Selon session',
    objectifs: [
      "Sensibilisation à l'IA et usages terrain (supports PDF)",
      "Banque de prompts par métier (Excel)",
      "Concevoir des assistants IA personnalisés",
      "Parcours sur la plateforme de formation — Qualiopi, OPCO Constructys",
    ],
  },
];

function refNum(ref: string) {
  return parseInt(ref.replace(/\D/g, ''), 10);
}

const FORMATIONS = [...FORMATIONS_UNSORTED].sort((a, b) => {
  const lr = LEVEL_RANK[a.level] - LEVEL_RANK[b.level];
  if (lr !== 0) return lr;
  return refNum(a.ref) - refNum(b.ref);
});

/** Miniatures catalogue — même ratio 4:3 pour toutes les images */
const FORMATIONS_PAGE_PHOTOS = [
  PHOTOS.ouvrierPlan,
  PHOTOS.architecteConcentration,
  PHOTOS.ouvrierConfiant,
  PHOTOS.formationEntreprise,
] as const;

export default function FormationsPage() {
  const faqSchema = getFAQSchema(FAQ_FORMATIONS);
  const courseListSchema = getCourseListSchema(
    FORMATIONS.map((f) => ({
      title: f.title,
      description: f.objectifs.join('. '),
      path: f.href.startsWith('/formations') ? f.href : '/formations',
    }))
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseListSchema) }}
      />
      <div>
        <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
          Formation IA BTP : programmes certifiés et finançables
        </h1>
        <p className="mt-4 max-w-2xl text-slate-600">
          Formations IA finançables pour artisans et PME du bâtiment. Apprenez à{' '}
          <Link href="/chatgpt-artisans-btp" className="text-[var(--accent)] font-medium hover:underline">
            utiliser ChatGPT dans le BTP
          </Link>
          , automatisez devis bâtiment, emails et comptes rendus chantier. De 4h à 14h selon vos objectifs. Méthode 100% pratique.{' '}
          <Link href="/prendre-rdv" className="text-[var(--accent)] font-medium hover:underline">
            Prenez rendez-vous
          </Link>
          {' '}pour un diagnostic personnalisé.
        </p>
        <div className="mt-8">
          <ShortAnswerBlock>
            L&apos;IA permet aux artisans du BTP de gagner 3 à 5 h par semaine sur les devis, emails et comptes rendus. Une formation de 4 h suffit pour être opérationnel.
          </ShortAnswerBlock>
        </div>
      </div>
      
      <div className="mx-auto mt-12 max-w-4xl">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {FORMATIONS_PAGE_PHOTOS.map((photo) => (
            <div
              key={photo.src}
              className="relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 200px"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {FORMATIONS.map((cours) => (
          <Link
            key={cours.ref}
            href={cours.href}
            className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-[var(--accent)] hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <span className="text-sm text-slate-500">RÉF: {cours.ref}</span>
              <span className="rounded-full border border-[var(--accent)] px-3 py-1 text-xs font-medium text-[var(--accent)]">
                {cours.level}
              </span>
            </div>
            <h2 className="mt-3 font-display text-xl font-semibold text-slate-900 group-hover:text-[var(--accent)]">
              {cours.title}
            </h2>
            <div className="mt-4 flex gap-4 rounded-lg bg-slate-50 px-4 py-3">
              <span className="flex items-center gap-2 text-sm text-slate-600">
                <Clock size={16} strokeWidth={1.5} />
                {cours.duree}
              </span>
              <span className="flex items-center gap-2 text-sm text-slate-600">
                <Users size={16} strokeWidth={1.5} />
                {cours.effectif}
              </span>
            </div>
            <p className="mt-4 font-semibold text-slate-900">
              OBJECTIFS PÉDAGOGIQUES
            </p>
            <ul className="mt-2 flex-1 space-y-2">
              {cours.objectifs.map((obj) => (
                <li key={obj} className="flex gap-2 text-sm text-slate-600">
                  <Check size={18} strokeWidth={1.5} className="shrink-0 text-[var(--accent)]" />
                  {obj}
                </li>
              ))}
            </ul>
            <span className="mt-6 block w-full rounded-xl bg-[var(--accent)] py-3 text-center font-semibold text-white transition-colors group-hover:bg-blue-700">
              Voir le programme
            </span>
          </Link>
        ))}
      </div>

      <section className="mt-16 rounded-2xl border-2 border-[var(--accent)] bg-[var(--accent-soft)] p-8">
        <h2 className="font-display text-xl font-bold text-slate-900">
          Vous souhaitez découvrir comment l&apos;IA peut faire gagner du temps à votre entreprise du BTP ?
        </h2>
        <p className="mt-3 text-slate-700">
          Prenez rendez-vous pour échanger sur votre projet et recevoir un devis personnalisé.
        </p>
        <Link
          href="/prendre-rdv"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Prendre rendez-vous pour un diagnostic
        </Link>
      </section>

      <FAQSection
        items={FAQ_FORMATIONS}
        title="Questions fréquentes sur les formations IA BTP"
        subtitle="Vous avez des questions ? Voici les réponses aux interrogations les plus fréquentes."
      />

      <section className="mt-12 border-t border-slate-200 pt-12">
        <h2 className="font-display text-lg font-semibold text-slate-900">
          Par métier et par sujet
        </h2>
        <ul className="mt-4 flex flex-wrap gap-4">
          <li>
            <Link href="/chatgpt-artisans-btp" className="text-[var(--accent)] hover:underline">
              ChatGPT pour artisans BTP
            </Link>
          </li>
          <li>
            <Link href="/ia-devis-batiment" className="text-[var(--accent)] hover:underline">
              IA devis bâtiment
            </Link>
          </li>
          <li>
            <Link href="/ia-conducteur-travaux" className="text-[var(--accent)] hover:underline">
              IA conducteur de travaux
            </Link>
          </li>
          <li>
            <Link href="/blog" className="text-[var(--accent)] hover:underline">
              Articles et guides blog
            </Link>
          </li>
        </ul>
      </section>

      <AllerPlusLoin
        links={[
          { href: '/chatgpt-artisans-btp', label: 'ChatGPT artisans BTP' },
          { href: '/ia-devis-batiment', label: 'IA devis bâtiment' },
          { href: '/ia-conducteur-travaux', label: 'IA conducteur de travaux' },
          { href: '/blog', label: 'Articles et guides' },
          { href: '/prendre-rdv', label: 'Prendre rendez-vous' },
        ]}
      />
    </div>
  );
}
