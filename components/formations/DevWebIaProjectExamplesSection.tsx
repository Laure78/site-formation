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
  accent: string;
  preview: ReactNode;
};

function PreviewSiteVitrine() {
  return (
    <div className="space-y-2 p-3" aria-hidden>
      <div className="h-2 w-16 rounded bg-slate-200" />
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2 space-y-1.5">
          <div className="h-2 w-full rounded bg-slate-200" />
          <div className="h-2 w-4/5 rounded bg-slate-100" />
          <div className="mt-2 h-5 w-20 rounded-md bg-[#377CF3]/80" />
        </div>
        <div className="rounded-lg bg-slate-100" />
      </div>
    </div>
  );
}

function PreviewCrm() {
  const rows = [
    { name: 'Atelier Martin', status: 'Nouveau', color: 'bg-[#377CF3]/15 text-[#377CF3]' },
    { name: 'SARL Dupont', status: 'En cours', color: 'bg-amber-100 text-amber-800' },
    { name: 'BTP Lemaire', status: 'Relance', color: 'bg-violet-100 text-violet-800' },
  ];
  return (
    <ul className="space-y-1.5 p-3" aria-hidden>
      {rows.map((row) => (
        <li key={row.name} className="flex items-center justify-between gap-2 rounded-md bg-white px-2 py-1.5 text-[0.65rem]">
          <span className="truncate font-medium text-slate-700">{row.name}</span>
          <span className={cn('shrink-0 rounded-full px-1.5 py-0.5 font-semibold', row.color)}>{row.status}</span>
        </li>
      ))}
    </ul>
  );
}

function PreviewPlanning() {
  return (
    <div className="p-3" aria-hidden>
      <div className="flex items-center justify-between text-[0.65rem] font-semibold text-slate-600">
        <span>Aujourd&apos;hui</span>
        <span className="rounded bg-[#377CF3]/10 px-1.5 py-0.5 text-[#377CF3]">+</span>
      </div>
      <ul className="mt-2 space-y-1.5">
        {[
          { time: '09:00', label: 'Réunion équipe' },
          { time: '10:30', label: 'Intervention client' },
          { time: '14:00', label: 'Chantier — suivi' },
        ].map((slot) => (
          <li key={slot.time} className="flex gap-2 rounded-md border border-slate-100 bg-white px-2 py-1.5 text-[0.65rem]">
            <span className="font-semibold text-[#377CF3]">{slot.time}</span>
            <span className="text-slate-600">{slot.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PreviewDashboard() {
  return (
    <div className="grid grid-cols-3 gap-1.5 p-3" aria-hidden>
      {[
        { label: 'CA mois', value: '24,5 k€', trend: '+12%' },
        { label: 'Devis', value: '8', trend: '+2' },
        { label: 'RDV', value: '14', trend: '+5' },
      ].map((kpi) => (
        <div key={kpi.label} className="rounded-lg border border-slate-100 bg-white p-2 text-center">
          <p className="text-[0.55rem] text-slate-500">{kpi.label}</p>
          <p className="text-[0.7rem] font-bold text-slate-800">{kpi.value}</p>
          <p className="text-[0.55rem] font-semibold text-emerald-600">{kpi.trend}</p>
        </div>
      ))}
    </div>
  );
}

function PreviewEspaceClient() {
  return (
    <div className="space-y-1.5 p-3" aria-hidden>
      <p className="text-[0.65rem] font-semibold text-slate-700">Documents</p>
      {['Contrat_2026.pdf', 'Devis_chantier.pdf', 'Notice_entretien.pdf'].map((file) => (
        <div key={file} className="flex items-center gap-2 rounded-md bg-white px-2 py-1.5 text-[0.65rem] text-slate-600">
          <span className="h-4 w-3 rounded-sm bg-slate-200" />
          <span className="truncate">{file}</span>
        </div>
      ))}
    </div>
  );
}

function PreviewReservation() {
  return (
    <div className="space-y-2 p-3" aria-hidden>
      <div className="flex justify-between gap-1">
        {['14', '15', '16', '17', '18'].map((d) => (
          <span
            key={d}
            className={cn(
              'flex h-7 w-7 items-center justify-center rounded-md text-[0.65rem] font-semibold',
              d === '16' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600',
            )}
          >
            {d}
          </span>
        ))}
      </div>
      <div className="h-7 w-full rounded-lg bg-[#377CF3]/90" />
    </div>
  );
}

const PROJECT_EXAMPLES: ProjectExample[] = [
  {
    id: 'site-vitrine',
    title: 'Site vitrine',
    description: 'Présenter votre activité et recevoir des demandes de contact.',
    starterFeature: 'Premier bloc : page d’accueil avec texte de présentation et formulaire de contact.',
    accent: 'bg-[#377CF3]',
    preview: <PreviewSiteVitrine />,
  },
  {
    id: 'suivi-commercial',
    title: 'Suivi commercial',
    description: 'Retrouver vos prospects, clients et prochaines actions.',
    starterFeature: 'Première liste : fiches prospects avec statut et prochaine relance.',
    accent: 'bg-amber-500',
    preview: <PreviewCrm />,
  },
  {
    id: 'planning-interventions',
    title: 'Planning d’interventions',
    description: 'Organiser les rendez-vous et interventions d’une équipe.',
    starterFeature: 'Premier écran : agenda du jour avec créneaux et libellés d’intervention.',
    accent: 'bg-[#377CF3]',
    preview: <PreviewPlanning />,
  },
  {
    id: 'tableau-de-bord',
    title: 'Tableau de bord',
    description: 'Visualiser quelques indicateurs utiles à votre activité.',
    starterFeature: 'Premiers widgets : 2 ou 3 chiffres clés (CA, devis, interventions).',
    accent: 'bg-violet-500',
    preview: <PreviewDashboard />,
  },
  {
    id: 'espace-client',
    title: 'Espace client',
    description: 'Regrouper informations et documents à partager avec vos clients.',
    starterFeature: 'Première zone : liste de documents ou liens utiles par client.',
    accent: 'bg-emerald-500',
    preview: <PreviewEspaceClient />,
  },
  {
    id: 'reservation-ligne',
    title: 'Réservation en ligne',
    description: 'Permettre à un client de demander un créneau ou une prestation.',
    starterFeature: 'Premier parcours : choix d’une date et envoi d’une demande de créneau.',
    accent: 'bg-emerald-600',
    preview: <PreviewReservation />,
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
          Quel projet pourriez-vous créer ?
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
          Chaque participant avance sur son propre projet pendant la formation. Voici des pistes
          réalistes — vous n&apos;en construirez qu&apos;un, celui qui correspond à votre besoin.
        </p>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECT_EXAMPLES.map((project) => (
            <li key={project.id}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
                <div className="px-6 pt-6">
                  <span className={cn('inline-block h-1 w-10 rounded-full', project.accent)} aria-hidden />
                  <h3 className="mt-4 font-display text-lg font-bold text-slate-900">{project.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{project.description}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-800">
                    <span className="font-semibold text-[#377CF3]">À amorcer en session : </span>
                    {project.starterFeature}
                  </p>
                </div>
                <div className="mt-4 flex-1 rounded-t-xl bg-slate-50/80 mx-4 mb-4 border border-slate-100">
                  {project.preview}
                </div>
              </article>
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-3xl rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm leading-relaxed text-slate-700">
          En 7 heures, vous construisez et testez une première version de votre projet. Sa mise en
          production peut nécessiter des développements, des vérifications et des mesures de sécurité
          supplémentaires.
        </p>
      </div>
    </section>
  );
}
