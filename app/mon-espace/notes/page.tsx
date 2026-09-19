import { StickyNote } from 'lucide-react';
import {
  MonEspaceEmptyHint,
  MonEspacePageHeader,
  MonEspaceSection,
} from '@/components/mon-espace/MonEspaceUi';

export default function MonEspaceNotesPage() {
  return (
    <div className="space-y-6">
      <MonEspacePageHeader
        title="Mes notes"
        description="Notes en texte simple, privées à votre compte."
        icon={StickyNote}
      />
      <MonEspaceSection title="Notes">
        <MonEspaceEmptyHint>
          Aucune note pour le moment. L’éditeur texte arrivera dans une prochaine étape.
        </MonEspaceEmptyHint>
      </MonEspaceSection>
    </div>
  );
}
