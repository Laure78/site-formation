import type { ReactNode } from 'react';
import {
  FORMATION_CATALOGUE_H2,
  FORMATION_CATALOGUE_INNER_MAX_6XL,
  FORMATION_CATALOGUE_SECTION_MUTED,
} from '@/lib/formation-catalogue-layout-classes';
import { OFC_EYEBROW } from '@/lib/ofc-interaction-classes';
import { cn } from '@/lib/cn';

type ProjectExample = {
  id: string;
  title: string;
  description: string;
  starterFeature: string;
  gain: string;
  preview: ReactNode;
};

function PreviewDashboard() {
  return (
    <div className="grid grid-cols-2 gap-1.5 p-3" aria-hidden>
      {[
        { label: 'Carnet', value: '1,2 M€' },
        { label: 'Devis en attente', value: '14' },
        { label: 'CA signé (mois)', value: '186 k€' },
        { label: 'Chantiers', value: '9' },
      ].map((kpi) => (
        <div key={kpi.label} className="rounded-lg border border-slate-100 bg-white p-2 text-center">
          <p className="text-[0.55rem] text-slate-500">{kpi.label}</p>
          <p className="text-[0.7rem] font-bold text-slate-800">{kpi.value}</p>
        </div>
      ))}
    </div>
  );
}

function PreviewDevis() {
  const rows = [
    { name: 'Devis 26-014', status: 'Envoyé', color: 'bg-[#377CF3]/15 text-[#377CF3]' },
    { name: 'Devis 26-011', status: 'Relancé', color: 'bg-slate-200 text-slate-700' },
    { name: 'Devis 26-008', status: 'Signé', color: 'bg-emerald-100 text-emerald-800' },
  ];
  return (
    <ul className="space-y-1.5 p-3" aria-hidden>
      {rows.map((row) => (
        <li
          key={row.name}
          className="flex items-center justify-between gap-2 rounded-md bg-white px-2 py-1.5 text-[0.65rem]"
        >
          <span className="truncate font-medium text-slate-700">{row.name}</span>
          <span className={cn('shrink-0 rounded-full px-1.5 py-0.5 font-semibold', row.color)}>
            {row.status}
          </span>
        </li>
      ))}
    </ul>
  );
}

function PreviewRentabilite() {
  return (
    <div className="space-y-2 p-3" aria-hidden>
      <div className="flex justify-between text-[0.65rem] text-slate-600">
        <span>Budget</span>
        <span className="font-semibold">42 000 €</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-200">
        <div className="h-full w-[72%] rounded-full bg-[#377CF3]" />
      </div>
      <div className="flex justify-between text-[0.65rem] text-slate-600">
        <span>Réalisé</span>
        <span className="font-semibold text-slate-800">Écart −8 %</span>
      </div>
    </div>
  );
}

function PreviewPlanning() {
  return (
    <div className="p-3" aria-hidden>
      <div className="grid grid-cols-4 gap-1 text-center text-[0.55rem] font-semibold text-slate-500">
        {['Lun', 'Mar', 'Mer', 'Jeu'].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="mt-1.5 grid grid-cols-4 gap-1">
        {['Ch. A', 'Ch. B', 'Ch. A', 'Ch. C'].map((label, i) => (
          <div
            key={`${label}-${i}`}
            className="rounded bg-[#377CF3]/15 px-1 py-2 text-[0.55rem] font-medium text-[#377CF3]"
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewRemontee() {
  return (
    <div className="mx-auto w-[72%] space-y-1.5 rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm" aria-hidden>
      <div className="h-1.5 w-10 rounded bg-slate-200" />
      <div className="h-5 rounded border border-slate-100 bg-slate-50" />
      <div className="h-5 rounded border border-slate-100 bg-slate-50" />
      <div className="h-8 rounded-md bg-[#377CF3]/90" />
    </div>
  );
}

function PreviewSousTraitants() {
  const rows = [
    { name: 'ST Martin', tone: 'bg-emerald-500' },
    { name: 'ST Dupont', tone: 'bg-amber-500' },
    { name: 'ST Leroy', tone: 'bg-red-500' },
  ];
  return (
    <ul className="space-y-1.5 p-3" aria-hidden>
      {rows.map((row) => (
        <li
          key={row.name}
          className="flex items-center justify-between gap-2 rounded-md bg-white px-2 py-1.5 text-[0.65rem]"
        >
          <span className="font-medium text-slate-700">{row.name}</span>
          <span className={cn('h-2.5 w-2.5 rounded-full', row.tone)} />
        </li>
      ))}
    </ul>
  );
}

function PreviewEcheances() {
  return (
    <div className="space-y-1.5 p-3" aria-hidden>
      {[
        { when: '30 j', label: 'CACES — 2 compagnons' },
        { when: '60 j', label: 'Contrôle VEH-03' },
        { when: '90 j', label: 'Habilitation électrique' },
      ].map((item) => (
        <div
          key={item.label}
          className="flex items-center gap-2 rounded-md bg-white px-2 py-1.5 text-[0.65rem]"
        >
          <span className="rounded bg-[#377CF3]/15 px-1.5 py-0.5 font-semibold text-[#377CF3]">
            {item.when}
          </span>
          <span className="text-slate-600">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

function PreviewAo() {
  const cols = ['À étudier', 'Go', 'Remis'];
  return (
    <div className="grid grid-cols-3 gap-1 p-3" aria-hidden>
      {cols.map((col) => (
        <div key={col} className="rounded-md bg-white p-1.5">
          <p className="text-[0.55rem] font-semibold text-slate-500">{col}</p>
          <div className="mt-1 h-6 rounded bg-[#377CF3]/15" />
        </div>
      ))}
    </div>
  );
}

function PreviewCalculateur() {
  return (
    <div className="space-y-2 p-3" aria-hidden>
      <div className="h-5 rounded border border-slate-100 bg-white px-2 text-[0.6rem] leading-5 text-slate-500">
        Surface : 120 m²
      </div>
      <div className="rounded-lg bg-[#377CF3]/10 px-2 py-2 text-center text-[0.7rem] font-bold text-[#377CF3]">
        Estimation : 18 600 € HT
      </div>
    </div>
  );
}

function PreviewReserves() {
  const rows = [
    { name: 'Réserve lot 3', status: 'En cours' },
    { name: 'Réserve lot 7', status: 'Levée' },
  ];
  return (
    <ul className="space-y-1.5 p-3" aria-hidden>
      {rows.map((row) => (
        <li
          key={row.name}
          className="flex items-center justify-between gap-2 rounded-md bg-white px-2 py-1.5 text-[0.65rem]"
        >
          <span className="font-medium text-slate-700">{row.name}</span>
          <span className="text-slate-500">{row.status}</span>
        </li>
      ))}
    </ul>
  );
}

const PROJECT_EXAMPLES: ProjectExample[] = [
  {
    id: 'tableau-de-bord-dirigeant',
    title: 'Tableau de bord dirigeant',
    description: 'Pas de vision consolidée de l’activité.',
    starterFeature:
      '4 indicateurs : CA signé du mois, carnet de commandes, devis en attente, chantiers en cours.',
    gain: 'Une vue du mois en un coup d’œil, sans ouvrir cinq fichiers.',
    preview: <PreviewDashboard />,
  },
  {
    id: 'suivi-devis-relances',
    title: 'Suivi des devis et relances',
    description: 'Devis envoyés jamais relancés, taux de transformation inconnu.',
    starterFeature:
      'Liste des devis avec statut (envoyé / relancé / signé / perdu), date de relance, montant.',
    gain: 'Moins de devis oubliés, plus de relances au bon moment.',
    preview: <PreviewDevis />,
  },
  {
    id: 'rentabilite-chantier',
    title: 'Rentabilité chantier',
    description: 'On découvre la marge à la fin du chantier.',
    starterFeature: 'Fiche chantier : budget heures et achats vs réalisé, écart en %.',
    gain: 'Voir un écart de marge pendant le chantier, pas après.',
    preview: <PreviewRentabilite />,
  },
  {
    id: 'planning-equipes-vehicules',
    title: 'Planning équipes et véhicules',
    description: 'Qui est où demain ? Plusieurs appels chaque soir.',
    starterFeature: 'Vue semaine : chantiers × chefs d’équipe × véhicules.',
    gain: 'Moins d’appels le soir pour savoir qui part où.',
    preview: <PreviewPlanning />,
  },
  {
    id: 'remontee-terrain',
    title: 'Remontée terrain chef d’équipe',
    description: 'Les infos chantier arrivent par SMS, photos perdues.',
    starterFeature: 'Formulaire mobile : chantier, avancement, incident, besoin matériel.',
    gain: 'Des infos structurées dès le terrain, sans WhatsApp éparpillé.',
    preview: <PreviewRemontee />,
  },
  {
    id: 'dossier-sous-traitants',
    title: 'Dossier sous-traitants (obligation de vigilance)',
    description: 'Attestations URSSAF, Kbis, décennale périmées sans alerte.',
    starterFeature:
      'Liste sous-traitants avec dates d’expiration des documents et alerte « à renouveler ».',
    gain: 'Moins de documents périmés découverts trop tard.',
    preview: <PreviewSousTraitants />,
  },
  {
    id: 'echeances-salaries-materiel',
    title: 'Échéances salariés et matériel',
    description: 'CACES, habilitations, contrôles périodiques, entretien véhicules oubliés.',
    starterFeature:
      'Tableau des échéances à 30/60/90 jours (dates uniquement, aucune donnée de santé).',
    gain: 'Anticiper les échéances critiques sans tableur oublié.',
    preview: <PreviewEcheances />,
  },
  {
    id: 'pipeline-appels-offres',
    title: 'Pipeline appels d’offres',
    description: 'AO repérés trop tard, pas de critères pour décider.',
    starterFeature: 'Liste des AO avec date limite, montant, grille go / no-go.',
    gain: 'Décider plus tôt quoi poursuivre ou laisser.',
    preview: <PreviewAo />,
  },
  {
    id: 'calculateur-metier',
    title: 'Calculateur métier',
    description: 'Estimations rapides refaites à la main en rendez-vous client.',
    starterFeature:
      'Calcul de quantités/prix au m² selon votre bordereau (ex. pavage, dallage, enduit).',
    gain: 'Une estimation cohérente pendant le rendez-vous.',
    preview: <PreviewCalculateur />,
  },
  {
    id: 'suivi-reserves-gpa',
    title: 'Suivi des réserves et de la GPA',
    description: 'Réserves et demandes SAV dispersées, délais non tenus.',
    starterFeature:
      'Liste des réserves par chantier : lot, description, responsable, date de levée.',
    gain: 'Moins de SAV qui traînent faute de suivi.',
    preview: <PreviewReserves />,
  },
];

export function DevWebIaProjectExamplesSection() {
  return (
    <section
      id="projets-exemples"
      className={`${FORMATION_CATALOGUE_SECTION_MUTED} scroll-mt-24`}
      aria-labelledby="projets-exemples-title"
    >
      <div className={FORMATION_CATALOGUE_INNER_MAX_6XL}>
        <p className={OFC_EYEBROW}>Exemples concrets</p>
        <h2 id="projets-exemples-title" className={`${FORMATION_CATALOGUE_H2} mt-3`}>
          10 outils que des dirigeants BTP peuvent amorcer en une journée
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
          Vous n&apos;en construisez qu&apos;un pendant la session : celui qui vous fait perdre le
          plus de temps aujourd&apos;hui.
        </p>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECT_EXAMPLES.map((project) => (
            <li key={project.id}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
                <div className="px-6 pt-6">
                  <span className="inline-block h-1 w-10 rounded-full bg-[#377CF3]" aria-hidden />
                  <h3 className="mt-4 font-display text-lg font-bold text-slate-900">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{project.description}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-800">
                    <span className="font-semibold text-[#377CF3]">À amorcer en session : </span>
                    {project.starterFeature}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                    <span className="font-semibold text-slate-900">Gain attendu : </span>
                    {project.gain}
                  </p>
                </div>
                <div className="mx-4 mb-4 mt-4 flex-1 rounded-t-xl border border-slate-100 bg-slate-50/80">
                  {project.preview}
                </div>
              </article>
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-3xl rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm leading-relaxed text-slate-700">
          En 7 heures, vous construisez et testez une première version. Son utilisation par toute
          l&apos;équipe peut nécessiter des vérifications, des tests et des mesures de sécurité
          supplémentaires.
        </p>
      </div>
    </section>
  );
}
