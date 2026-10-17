'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { requireAdminAccess } from '@/lib/admin-access';

export async function getCareerCvSignedUrlAction(
  storagePath: string,
): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  const access = await requireAdminAccess();
  if (!access.ok) {
    return { ok: false, error: 'Non autorisé.' };
  }

  const path = storagePath.trim();
  if (!path || path.includes('..') || !path.startsWith('applications/')) {
    return { ok: false, error: 'Chemin invalide.' };
  }

  try {
    const admin = createAdminClient();
    const { data, error } = await admin.storage.from('career-cvs').createSignedUrl(path, 300);
    if (error || !data?.signedUrl) {
      console.error('[getCareerCvSignedUrl]', error?.message);
      return { ok: false, error: 'Lien indisponible.' };
    }
    return { ok: true, url: data.signedUrl };
  } catch {
    return { ok: false, error: 'Configuration stockage indisponible.' };
  }
}
