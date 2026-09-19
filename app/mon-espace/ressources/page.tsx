import { FolderOpen } from 'lucide-react';
import {
  MonEspaceEmptyHint,
  MonEspacePageHeader,
  MonEspaceSection,
} from '@/components/mon-espace/MonEspaceUi';

export default function MonEspaceRessourcesPage() {
  return (
    <div className="space-y-6">
      <MonEspacePageHeader
        title="Mes ressources"
        description="Documents et liens utiles pour votre formation."
        icon={FolderOpen}
      />
      <MonEspaceSection title="Ressources">
        <MonEspaceEmptyHint>
          Aucune ressource enregistrée. Les fichiers arriveront dans une étape ultérieure.
        </MonEspaceEmptyHint>
      </MonEspaceSection>
    </div>
  );
}
