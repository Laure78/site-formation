import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createAdminClient } from '@/lib/supabase/admin';
import { requireExtranetTrainerAccess } from '@/lib/extranet-formateurs/access';
import { fetchMissionById } from '@/lib/extranet-formateurs/queries-phase2';
import { MissionDetailClient } from '@/components/espace-formateurs/MissionDetailClient';
import type { ExtranetMissionDocumentRow } from '@/lib/extranet-formateurs/phase2-types';
import { LINKS } from '@/lib/internal-links';

export default async function EspaceFormateurMissionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const access = await requireExtranetTrainerAccess();
  if (!access.ok) return null;

  const { id } = await params;
  const mission = await fetchMissionById(id);
  if (!mission || mission.trainer_id !== access.trainer.id) notFound();

  const admin = createAdminClient();
  const { data: docs } = await admin
    .from('extranet_mission_documents')
    .select('*')
    .eq('mission_id', id)
    .order('uploaded_at', { ascending: false });

  return (
    <div className="space-y-4">
      <Link href={LINKS.espaceFormateursInterventions} className="text-sm font-medium text-[#377CF3] hover:underline">
        ← Mes interventions
      </Link>
      <MissionDetailClient mission={mission} documents={(docs ?? []) as ExtranetMissionDocumentRow[]} />
    </div>
  );
}
