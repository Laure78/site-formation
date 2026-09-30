import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { checkRateLimit, clientIpFromRequest } from '@/lib/rate-limit';

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 Mo
const ALLOWED_EXT = new Set([
  'jpg',
  'jpeg',
  'png',
  'gif',
  'webp',
  'pdf',
  'doc',
  'docx',
  'txt',
  'csv',
  'mp4',
  'webm',
]);
const ALLOWED_MIME = new Set([
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
  'text/csv',
  'video/mp4',
  'video/webm',
]);
const ALLOWED_FOLDERS = new Set(['uploads', 'cours', 'ressources', 'supports']);

function sanitizeFolder(raw: string): string | null {
  const folder = raw.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '');
  if (!folder || folder.length > 40) return null;
  if (!ALLOWED_FOLDERS.has(folder)) return null;
  return folder;
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  const role = (profile as { role?: string } | null)?.role;
  if (role !== 'admin' && role !== 'formateur') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
  }

  const ip = clientIpFromRequest(request);
  const rl = checkRateLimit(`upload:${user.id}:${ip}`, 30, 60_000);
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
    return NextResponse.json({ error: 'Fichier trop volumineux (max 20 Mo)' }, { status: 400 });
  }

  const folderRaw = typeof formData.get('folder') === 'string' ? (formData.get('folder') as string) : 'uploads';
  const folder = sanitizeFolder(folderRaw);
  if (!folder) {
    return NextResponse.json({ error: 'Dossier non autorisé' }, { status: 400 });
  }

  const ext = (file.name.split('.').pop() || '').toLowerCase();
  if (!ALLOWED_EXT.has(ext)) {
    return NextResponse.json({ error: 'Extension non autorisée' }, { status: 400 });
  }
  const mime = (file.type || '').toLowerCase();
  if (mime && !ALLOWED_MIME.has(mime)) {
    return NextResponse.json({ error: 'Type de fichier non autorisé' }, { status: 400 });
  }

  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const path = `${folder}/${safeName}`;
  const contentType = mime || 'application/octet-stream';

  const buf = await file.arrayBuffer();

  const { data, error } = await supabase.storage
    .from('formations')
    .upload(path, buf, { contentType, upsert: false });

  if (error) {
    console.error('[upload]', error.message);
    return NextResponse.json({ error: 'Échec upload' }, { status: 500 });
  }

  const { data: urlData } = supabase.storage.from('formations').getPublicUrl(data.path);
  return NextResponse.json({ url: urlData.publicUrl });
}
