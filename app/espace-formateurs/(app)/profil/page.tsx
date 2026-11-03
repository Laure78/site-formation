import { requireExtranetTrainerAccess } from '@/lib/extranet-formateurs/access';
import { ProfilForm } from '@/components/espace-formateurs/ProfilForm';

export default async function EspaceFormateursProfilPage() {
  const access = await requireExtranetTrainerAccess();
  if (!access.ok) return null;
  return <ProfilForm trainer={access.trainer} />;
}
