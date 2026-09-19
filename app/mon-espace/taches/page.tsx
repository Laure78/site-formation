import { CheckSquare } from 'lucide-react';
import {
  MonEspaceEmptyHint,
  MonEspacePageHeader,
  MonEspaceSection,
} from '@/components/mon-espace/MonEspaceUi';

export default function MonEspaceTachesPage() {
  return (
    <div className="space-y-6">
      <MonEspacePageHeader
        title="Mes tâches"
        description="Listez et suivez vos actions. Les checklists arriveront bientôt."
        icon={CheckSquare}
      />
      <MonEspaceSection title="À faire">
        <MonEspaceEmptyHint>
          Aucune tâche pour le moment. Cette page accueillera vos listes dans la prochaine version.
        </MonEspaceEmptyHint>
      </MonEspaceSection>
    </div>
  );
}
