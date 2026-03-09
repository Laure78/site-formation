import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  const role = (profile as { role?: string } | null)?.role;
  if (role !== 'admin' && role !== 'formateur') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
  }

  const formData = await request.formData();
  const file = formData.get('file') as File | null;
  const folder = (formData.get('folder') as string) || 'uploads';

  if (!file || file.size === 0) return NextResponse.json({ error: 'Fichier absent' }, { status: 400 });

  const ext = file.name.split('.').pop()?.toLowerCase() || 'bin';
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const path = `${folder}/${safeName}`;

  const buf = await file.arrayBuffer();

  const { data, error } = await supabase.storage
    .from('formations')
    .upload(path, buf, { contentType: file.type, upsert: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: urlData } = supabase.storage.from('formations').getPublicUrl(data.path);
  return NextResponse.json({ url: urlData.publicUrl });
}
