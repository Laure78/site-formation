import { Star } from 'lucide-react';
import {
  MonEspaceEmptyHint,
  MonEspacePageHeader,
  MonEspaceSection,
} from '@/components/mon-espace/MonEspaceUi';

export default function MonEspaceFavorisPage() {
  return (
    <div className="space-y-6">
      <MonEspacePageHeader
        title="Mes favoris"
        description="Raccourcis vers vos pages et ressources préférées."
        icon={Star}
      />
      <MonEspaceSection title="Favoris">
        <MonEspaceEmptyHint>
          Aucun favori pour le moment. Vous pourrez en ajouter prochainement.
        </MonEspaceEmptyHint>
      </MonEspaceSection>
    </div>
  );
}
