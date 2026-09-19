import {
  CalendarDays,
  CheckSquare,
  FolderOpen,
  StickyNote,
  Star,
  LayoutDashboard,
} from 'lucide-react';
import { LINKS } from '@/lib/internal-links';
import { MonEspaceSearchBar } from '@/components/mon-espace/MonEspaceSearchBar';
import {
  MonEspaceEmptyHint,
  MonEspacePageHeader,
  MonEspaceSection,
  MonEspaceShortcut,
  MonEspaceStatCard,
} from '@/components/mon-espace/MonEspaceUi';

export function MonEspaceDashboard({ firstName }: { firstName: string }) {
  return (
    <div className="space-y-8">
      <MonEspacePageHeader
        title={`Bonjour ${firstName}`}
        description="Votre espace personnel pour organiser vos tâches, notes et ressources de formation — simplement et clairement."
        icon={LayoutDashboard}
      />

      <MonEspaceSearchBar className="max-w-2xl" />

      <section aria-labelledby="mon-espace-raccourcis">
        <h2 id="mon-espace-raccourcis" className="font-display text-lg font-semibold text-slate-900">
          Raccourcis
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <MonEspaceShortcut
            href={LINKS.monEspaceAgenda}
            label="Agenda"
            description="Voir votre planning de la semaine"
            icon={CalendarDays}
          />
          <MonEspaceShortcut
            href={LINKS.monEspaceTaches}
            label="Mes tâches"
            description="Suivre ce qu’il reste à faire"
            icon={CheckSquare}
          />
          <MonEspaceShortcut
            href={LINKS.monEspaceNotes}
            label="Mes notes"
            description="Retrouver vos notes personnelles"
            icon={StickyNote}
          />
          <MonEspaceShortcut
            href={LINKS.monEspaceRessources}
            label="Mes ressources"
            description="Documents et supports utiles"
            icon={FolderOpen}
          />
          <MonEspaceShortcut
            href={LINKS.monEspaceFavoris}
            label="Mes favoris"
            description="Accès rapide à vos pages préférées"
            icon={Star}
          />
        </div>
      </section>

      <section aria-labelledby="mon-espace-synthese">
        <h2 id="mon-espace-synthese" className="font-display text-lg font-semibold text-slate-900">
          Synthèse
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <MonEspaceStatCard
            label="Tâches"
            value="—"
            hint="Bientôt disponible"
            icon={CheckSquare}
            tone="blue"
          />
          <MonEspaceStatCard
            label="Notes"
            value="—"
            hint="Bientôt disponible"
            icon={StickyNote}
            tone="green"
          />
          <MonEspaceStatCard
            label="Ressources"
            value="—"
            hint="Bientôt disponible"
            icon={FolderOpen}
            tone="amber"
          />
          <MonEspaceStatCard
            label="Favoris"
            value="—"
            hint="Bientôt disponible"
            icon={Star}
            tone="violet"
          />
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <MonEspaceSection
          title="Tâches"
          description="Vos prochaines actions apparaîtront ici."
          actionHref={LINKS.monEspaceTaches}
          actionLabel="Voir Mes tâches"
        >
          <MonEspaceEmptyHint>
            Aucune tâche pour le moment. Cette zone sera alimentée dans la prochaine étape.
          </MonEspaceEmptyHint>
        </MonEspaceSection>

        <MonEspaceSection
          title="Notes"
          description="Vos notes personnelles en un coup d’œil."
          actionHref={LINKS.monEspaceNotes}
          actionLabel="Voir Mes notes"
        >
          <MonEspaceEmptyHint>
            Aucune note pour le moment. L’édition arrivera bientôt.
          </MonEspaceEmptyHint>
        </MonEspaceSection>

        <MonEspaceSection
          title="Ressources"
          description="Documents et liens utiles pour votre parcours."
          actionHref={LINKS.monEspaceRessources}
          actionLabel="Voir Mes ressources"
          className="lg:col-span-2"
        >
          <MonEspaceEmptyHint>
            Aucune ressource enregistrée. Cette section sera enrichie prochainement.
          </MonEspaceEmptyHint>
        </MonEspaceSection>
      </div>
    </div>
  );
}
