import Link from 'next/link';
import Image from 'next/image';
import { Clock, Users, Check, Euro } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { RdvLink } from '@/components/RdvLink';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { FAQSection } from '@/components/landing/FAQSection';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { createPageMetadata, getFAQSchema, getCourseListSchema } from '@/lib/seo';
import { FAQ_FORMATIONS } from '@/lib/faq';
import { PHOTOS } from '@/lib/photos';
import { libelleTarifParticipant, SESSION_DUREE_LIBELLE, ENCART_TARIFS_COMMERCIAUX } from '@/lib/tarifs-sessions';

export const metadata = createPageMetadata({
  title: 'Formations IA BTP & ChatGPT entreprise | Catalogue Qualiopi',
  description:
    "Catalogue formation IA BTP : sessions 4 h, forfait 100 € ou 175 € HT/participant selon niveau. Qualiopi, OPCO Constructys.",
  path: '/formations',
  keywords: [
    'formation IA BTP',
    'formation ChatGPT entreprise BTP',
    'catalogue formation IA BTP',
    'formations IA bâtiment',
    'IA devis bâtiment',
    'IA gestion chantier',
    'automatisation tâches administratives BTP',
    'formation IA TPE PME BTP',
    'IA pour PME bâtiment',
    'formation IA Qualiopi',
    'OPCO Constructys',
    'formation IA PME BTP',
  ],
});

/** Tri catalogue : dé puis avancé. */
const LEVEL_RANK: Record<string, number> = { DÉBUTANT: 0, AVANCÉ: 1 };

const FORMATIONS_UNSORTED = [
  {
    ref: 'BTP-01',
    level: 'DÉBUTANT' as const,
    title: "L'IA au service du bâtiment",
    href: '/formations/ia-au-service-du-batiment',
    duree: SESSION_DUREE_LIBELLE,
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
    level: 'AVANCÉ' as const,
    title: "Répondre aux appels d'offre avec l'IA",
    href: '/formations/ia-appels-offre-btp',
    duree: SESSION_DUREE_LIBELLE,
    effectif: '12 max',
    objectifs: [
      "Analyser un DCE rapidement et structurer les critères d'évaluation",
      "Rédiger mémoires techniques et chiffrages avec méthode et assistant IA",
      "Bibliothèque de prompts et templates par métier pour les marchés BTP",
      "Créer et paramétrer un assistant IA DCE / mémoire adapté à votre entreprise",
      "Sécuriser le process : confidentialité, relecture humaine — Qualiopi, OPCO Constructys",
    ],
  },
  {
    ref: 'BTP-03',
    level: 'AVANCÉ' as const,
    title: "Formation IA pour la Fonction RH dans le BTP",
    href: '/formations/ia-rh-btp',
    duree: SESSION_DUREE_LIBELLE,
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
    duree: SESSION_DUREE_LIBELLE,
    effectif: '12 max',
    objectifs: [
      "Réponse aux consultations : DCE, trames, synthèses et check-lists",
      "Documents de chantier et reporting avec protocole de validation",
      "Templates TP, assistants par rôle et charte d'usage IA en entreprise",
    ],
  },
  {
    ref: 'BTP-05',
    level: 'DÉBUTANT' as const,
    title: "Sensibilisation à l'IA & Assistants IA personnalisés",
    href: '/formations/sensibilisation-ia-assistants-personnalises',
    duree: SESSION_DUREE_LIBELLE,
    effectif: '12 max',
    objectifs: [
      "Sensibilisation à l'IA et usages terrain (supports PDF)",
      "Banque de prompts par métier (Excel)",
      "Concevoir des assistants IA personnalisés",
      "Ressources plateforme en prolongement — Qualiopi, OPCO Constructys",
    ],
  },
  {
    ref: 'BTP-06',
    level: 'AVANCÉ' as const,
    title: 'Architecte augmenté : Claude AI, DPGF, chantier et documents',
    href: '/formations/ia-architecture-claude-dpgf',
    duree: SESSION_DUREE_LIBELLE,
    effectif: '12 max',
    objectifs: [
      'DPGF, métrés et planning GANTT avec Claude AI et Google Sheets',
      'CR de chantier, situations de travaux, PV de réception (Google Docs)',
      'Courriers et actes de marché via connecteur Google Drive',
      'Bibliothèque de prompts et flux opérationnels pour le cabinet',
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
          Formations IA finançables pour les dirigeants et équipes du bâtiment et des travaux publics. Apprenez à{' '}
          <Link href="/formation-ia-artisans-btp" className="text-[var(--accent)] font-medium hover:underline">
            utiliser ChatGPT dans le BTP
          </Link>
          , automatisez devis bâtiment, emails et comptes rendus chantier. {ENCART_TARIFS_COMMERCIAUX} Méthode 100&nbsp;% pratique.{' '}
          <RdvLink className="text-[var(--accent)] font-medium hover:underline">
            Prenez rendez-vous
          </RdvLink>
          {' '}pour un diagnostic personnalisé.
        </p>
        <div className="mt-8">
          <ShortAnswerBlock>
            L&apos;IA permet aux entreprises du BTP de gagner 3 à 5 h par semaine sur les devis, emails et comptes rendus. Une formation de 4 h suffit pour être opérationnel.
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
            <div className="mt-4 flex flex-wrap gap-3 rounded-lg bg-slate-50 px-4 py-3">
              <span className="flex items-center gap-2 text-sm text-slate-600">
                <Clock size={16} strokeWidth={1.5} />
                {cours.duree}
              </span>
              <span className="flex items-center gap-2 text-sm text-slate-600">
                <Users size={16} strokeWidth={1.5} />
                {cours.effectif}
              </span>
              <span className="flex w-full items-center gap-2 text-sm font-semibold text-slate-800 sm:w-auto">
                <Euro size={16} strokeWidth={1.75} className="text-[var(--accent)]" aria-hidden />
                {libelleTarifParticipant(cours.level)}
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
        <RdvLink className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white hover:bg-blue-700">
          Prendre rendez-vous pour un diagnostic
        </RdvLink>
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
            <Link href="/formation-ia-artisans-btp" className="text-[var(--accent)] hover:underline">
              ChatGPT pour entreprises BTP
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
          { href: '/formation-ia-artisans-btp', label: 'ChatGPT pour entreprises BTP' },
          { href: '/ia-devis-batiment', label: 'IA devis bâtiment' },
          { href: '/ia-conducteur-travaux', label: 'IA conducteur de travaux' },
          { href: '/blog', label: 'Articles et guides' },
          { href: CALENDLY_BOOKING_URL, label: 'Prendre rendez-vous' },
        ]}
      />
    </div>
  );
}
