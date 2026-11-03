import { NextResponse } from 'next/server';
import { requireAdminAccess } from '@/lib/admin-access';
import { fetchCurrentCharter } from '@/lib/extranet-formateurs/queries';

export async function GET() {
  const access = await requireAdminAccess();
  if (!access.ok) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
  }
  const charter = await fetchCurrentCharter();
  if (!charter) {
    return NextResponse.json({});
  }
  return NextResponse.json({
    content_md: charter.content_md,
    version_label: charter.version_label,
  });
}
