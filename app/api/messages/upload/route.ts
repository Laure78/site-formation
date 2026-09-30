import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { checkRateLimit, clientIpFromRequest } from '@/lib/rate-limit';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 Mo
const ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
  'text/csv',
]);
const ALLOWED_EXT = new Set(['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf', 'doc', 'docx', 'txt', 'csv']);

/**
 * POST /api/messages/upload
 * Upload une pièce jointe pour un message
 * FormData: file
 * Returns: { url }
 */
export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

  const ip = clientIpFromRequest(request);
  const rl = checkRateLimit(`messages-upload:${user.id}:${ip}`, 20, 60_000);
  if (!rl.ok) {
    return NextResponse.json(
      { error: 'Trop d’uploads. Réessayez plus tard.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfterSec) } }
    );
  }

  const formData = await request.formData();
  const file = formData.get('file');
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: 'Fichier absent' }, { status: 400 });
  }
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: 'Fichier trop volumineux (max 10 Mo)' }, { status: 400 });
  }
  const mime = (file.type || '').toLowerCase();
  if (!mime || !ALLOWED_TYPES.has(mime)) {
    return NextResponse.json({ error: 'Type de fichier non autorisé' }, { status: 400 });
  }
  const ext = (file.name.split('.').pop() || '').toLowerCase();
  if (!ALLOWED_EXT.has(ext)) {
    return NextResponse.json({ error: 'Extension non autorisée' }, { status: 400 });
  }

  const safeName = `messages/${user.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const safeDisplayName = file.name.replace(/[^\w.\- ()[\]]+/g, '_').slice(0, 120) || `fichier.${ext}`;

  const buf = await file.arrayBuffer();
  const { data, error } = await supabase.storage
    .from('formations')
    .upload(safeName, buf, { contentType: mime, upsert: false });

  if (error) {
    console.error('[messages/upload]', error.message);
    return NextResponse.json({ error: 'Échec upload' }, { status: 500 });
  }

  const { data: urlData } = supabase.storage.from('formations').getPublicUrl(data.path);
  return NextResponse.json({ url: urlData.publicUrl, fileName: safeDisplayName });
}
