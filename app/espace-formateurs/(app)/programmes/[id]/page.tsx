import { notFound } from 'next/navigation';
import Link from 'next/link';
import { requireExtranetTrainerAccess } from '@/lib/extranet-formateurs/access';
import { fetchProgramById, fetchProgramsForTrainer } from '@/lib/extranet-formateurs/queries-phase2';
import { ProgramDetailView } from '@/components/espace-formateurs/ProgramDetailView';
import { LINKS } from '@/lib/internal-links';

export default async function EspaceFormateurProgrammeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const access = await requireExtranetTrainerAccess();
  if (!access.ok) return null;

  const { id } = await params;
  const granted = await fetchProgramsForTrainer(access.trainer.id);
  if (!granted.some((p) => p.id === id)) notFound();

  const program = await fetchProgramById(id);
  if (!program) notFound();

  return (
    <div className="space-y-4">
      <Link href={LINKS.espaceFormateursProgrammes} className="text-sm font-medium text-[#377CF3] hover:underline">
        ← Programmes
      </Link>
      <ProgramDetailView program={program} />
    </div>
  );
}
