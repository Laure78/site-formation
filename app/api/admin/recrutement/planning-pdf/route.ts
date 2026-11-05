import { NextResponse } from 'next/server';
import { requireAdminAccess } from '@/lib/admin-access';
import { resolvePlanningDate } from '@/lib/recruitment/interview-slots';
import { listCandidatsForPlanningDate } from '@/lib/recruitment/queries';
import { buildPlanningPdf } from '@/lib/recruitment/pdf/planning-document';

export async function GET(request: Request) {
  const access = await requireAdminAccess();
  if (!access.ok) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
  }

  const url = new URL(request.url);
  const dateYmd = resolvePlanningDate(url.searchParams.get('date'));
  const variantRaw = url.searchParams.get('variant');
  const variant = variantRaw === 'anonyme' ? 'anonyme' : 'interne';

  const candidats = await listCandidatsForPlanningDate(dateYmd);
  const pdf = await buildPlanningPdf({ dateYmd, variant, candidats });

  const filename =
    variant === 'anonyme'
      ? `planning-candidats-${dateYmd}.pdf`
      : `planning-interne-${dateYmd}.pdf`;

  return new NextResponse(new Uint8Array(pdf), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  });
}
