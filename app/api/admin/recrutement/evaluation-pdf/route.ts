import { NextResponse } from 'next/server';
import { requireAdminAccess } from '@/lib/admin-access';
import { buildEvaluationPdf } from '@/lib/recruitment/pdf/evaluation-document';
import { getRecruitmentCandidat, getRecruitmentEvaluation } from '@/lib/recruitment/queries';

export async function GET(request: Request) {
  const access = await requireAdminAccess();
  if (!access.ok) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
  }

  const url = new URL(request.url);
  const candidatId = url.searchParams.get('candidatId')?.trim();
  const stageRaw = url.searchParams.get('stage');
  const stage = stageRaw === '2' ? 2 : 1;

  if (!candidatId) {
    return NextResponse.json({ error: 'candidatId requis' }, { status: 400 });
  }

  const [candidat, evaluation] = await Promise.all([
    getRecruitmentCandidat(candidatId),
    getRecruitmentEvaluation(candidatId, stage),
  ]);

  if (!candidat) {
    return NextResponse.json({ error: 'Candidat introuvable' }, { status: 404 });
  }
  if (!evaluation) {
    return NextResponse.json({ error: 'Grille non enregistrée' }, { status: 404 });
  }

  const pdf = await buildEvaluationPdf({ candidat, evaluation, stage });

  return new NextResponse(new Uint8Array(pdf), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="grille-etape-${stage}-${candidat.last_name}.pdf"`,
      'Cache-Control': 'no-store',
    },
  });
}
