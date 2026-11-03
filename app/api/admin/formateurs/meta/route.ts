import { NextResponse } from 'next/server';
import { requireAdminAccess } from '@/lib/admin-access';
import { fetchAllTrainersForAdmin } from '@/lib/extranet-formateurs/queries';
import { fetchProgramsForAdmin, fetchResourcesForAdmin } from '@/lib/extranet-formateurs/queries-phase2';

/** Méta pour formulaires admin (formateurs, programmes, supports). */
export async function GET() {
  const access = await requireAdminAccess();
  if (!access.ok) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
  }

  const [trainers, programs, resources] = await Promise.all([
    fetchAllTrainersForAdmin(),
    fetchProgramsForAdmin(),
    fetchResourcesForAdmin(),
  ]);

  return NextResponse.json({
    trainers: trainers.map((t) => ({
      id: t.id,
      label: [t.first_name, t.last_name].filter(Boolean).join(' ') || t.email,
    })),
    programs: programs.map((p) => ({ id: p.id, title: p.title })),
    resources: resources.map((r) => ({ id: r.id, title: r.title })),
  });
}
