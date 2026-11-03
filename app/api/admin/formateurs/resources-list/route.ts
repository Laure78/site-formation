import { NextResponse } from 'next/server';
import { requireAdminAccess } from '@/lib/admin-access';
import { fetchResourcesForAdmin } from '@/lib/extranet-formateurs/queries-phase2';

export async function GET() {
  const access = await requireAdminAccess();
  if (!access.ok) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
  }
  const resources = await fetchResourcesForAdmin();
  return NextResponse.json({ resources });
}
