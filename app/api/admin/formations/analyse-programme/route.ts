import { NextRequest, NextResponse } from 'next/server';
import { requireAdminAccess, adminAccessDeniedMessage } from '@/lib/admin-access';
import { checkRateLimit, clientIpFromRequest } from '@/lib/rate-limit';
import {
  ANALYSE_PROGRAMME_MESSAGES,
  type AnalyseProgrammeErrorCode,
} from '@/lib/lms/analyse-programme-schema';
import { extractProgrammeText } from '@/lib/lms/extract-programme-text';
import { analyseProgrammeAvecIa } from '@/lib/lms/analyse-programme-ia';

export const runtime = 'nodejs';
export const maxDuration = 60;

function errorResponse(code: AnalyseProgrammeErrorCode, status: number, detail?: string) {
  return NextResponse.json(
    {
      ok: false,
      code,
      error: detail || ANALYSE_PROGRAMME_MESSAGES[code],
    },
    { status }
  );
}

/**
 * POST /api/admin/formations/analyse-programme
 * FormData : file (PDF ou DOCX)
 * Analyse côté serveur (extraction + OpenAI) — jamais de clé API côté client.
 */
export async function POST(request: NextRequest) {
  const ip = clientIpFromRequest(request);
  const rl = checkRateLimit(`admin-analyse-programme:${ip}`, 12, 60_000);
  if (!rl.ok) {
    return errorResponse('trop_de_requetes', 429);
  }

  const access = await requireAdminAccess();
  if (!access.ok) {
    const status = access.reason === 'unauthenticated' ? 401 : 403;
    return NextResponse.json({ error: adminAccessDeniedMessage(access.reason) }, { status });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return errorResponse('fichier_vide', 400);
  }

  const file = formData.get('file');
  if (!(file instanceof File)) {
    return errorResponse('format_incompatible', 400);
  }

  const extracted = await extractProgrammeText(file);
  if (!extracted.ok) {
    return errorResponse(
      extracted.code,
      extracted.code === 'format_incompatible' ? 415 : 422,
      extracted.message
    );
  }

  const analysed = await analyseProgrammeAvecIa(extracted.text);
  if (!analysed.ok) {
    const status =
      analysed.code === 'openai_non_configure'
        ? 503
        : analysed.code === 'structure_ambigue'
          ? 422
          : 502;
    return errorResponse(analysed.code, status);
  }

  return NextResponse.json({
    ok: true,
    format: extracted.format,
    pageCount: extracted.pageCount ?? null,
    fileName: file.name,
    result: analysed.data,
  });
}
