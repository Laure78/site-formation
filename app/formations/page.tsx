import Link from 'next/link';
import { Clock, Users, Check } from 'lucide-react';

const FORMATIONS = [
  {
    ref: 'BTP-01',
    level: 'DÉBUTANT',
    title: "L'IA au service du BTP",
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
    level: 'AVANCÉ',
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
    level: 'INTERMÉDIAIRE',
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
    level: 'DÉBUTANT',
    title: 'IA & Travaux Publics',
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
    level: 'DÉBUTANT',
    title: 'Formation IA BTP à Paris',
    href: '/formations/ia-btp-paris',
    duree: '4h',
    effectif: '12 max',
    objectifs: [
      "Devis en 15 min avec ChatGPT",
      "Emails et relances clients automatisés",
      "Paris + 8 départements Île-de-France",
      "100% finançable OPCO",
    ],
  },
  {
    ref: 'BTP-06',
    level: 'INTERMÉDIAIRE',
    title: 'Formation IA BTP : Productivité chantier',
    href: '/formations/ia-productivite-chantier',
    duree: '4h à 1 jour',
    effectif: '12 max',
    objectifs: [
      "Devis et descriptifs en quelques secondes",
      "Emails et relances clients automatisés",
      "3 formats : Atelier, Micro-learning, Coaching",
      "0 € à avancer — Financement OPCO",
    ],
  },
  {
    ref: 'BTP-07',
    level: 'DÉBUTANT',
    title: 'IA pour PME du BTP',
    href: '/formations/ia-pme-btp',
    duree: '4h à 7h',
    effectif: '12 max',
    objectifs: [
      "Devis et chiffrages optimisés",
      "Emails et administratif simplifié",
      "Productivité sans embaucher",
    ],
  },
];

export default function FormationsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div>
        <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
          Catalogue des formations IA BTP
        </h1>
        <p className="mt-4 max-w-2xl text-slate-600">
          Formations certifiées Qualiopi, 100% finançables par Constructys. De 4h
          à 14h selon vos objectifs. Méthode 100% pratique.
        </p>
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
              Prendre rendez-vous
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
