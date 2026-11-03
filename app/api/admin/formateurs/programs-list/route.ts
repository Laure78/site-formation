import { NextResponse } from 'next/server';
import { requireAdminAccess } from '@/lib/admin-access';
import { fetchProgramsForAdmin } from '@/lib/extranet-formateurs/queries-phase2';

export async function GET() {
  const access = await requireAdminAccess();
  if (!access.ok) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
  }
  const programs = await fetchProgramsForAdmin();
  return NextResponse.json({ programs });
}
