import { NextResponse } from 'next/server';
import { requireAdminAccess } from '@/lib/admin-access';
import { buildTrainerAuditJson, buildTrainerAuditZip } from '@/lib/extranet-formateurs/build-audit-export';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ trainerId: string }> }
) {
  const access = await requireAdminAccess();
  if (!access.ok) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
  }

  const { trainerId } = await params;
  const { searchParams } = new URL(request.url);
  const format = searchParams.get('format') ?? 'json';

  const admin = createAdminClient();
  const { data: trainer } = await admin.from('extranet_trainers').select('id, email').eq('id', trainerId).maybeSingle();
  if (!trainer) {
    return NextResponse.json({ error: 'Formateur introuvable' }, { status: 404 });
  }

  await admin.from('extranet_audit_export_log').insert({
    trainer_id: trainerId,
    exported_by: access.userId,
    export_format: format === 'zip' ? 'zip' : 'json',
    scope: 'trainer_dossier',
    details: { email: trainer.email },
  });

  const slug = trainer.email?.split('@')[0] ?? trainerId.slice(0, 8);

  if (format === 'zip') {
    const zip = await buildTrainerAuditZip(trainerId);
    return new NextResponse(zip, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="audit-formateur-${slug}.zip"`,
      },
    });
  }

  const json = await buildTrainerAuditJson(trainerId);
  return NextResponse.json(json, {
    headers: {
      'Content-Disposition': `attachment; filename="audit-formateur-${slug}.json"`,
    },
  });
}
