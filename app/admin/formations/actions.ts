'use server';

import { revalidatePath } from 'next/cache';
import { requireAdminAccess } from '@/lib/admin-access';
import { createAdminClient } from '@/lib/supabase/admin';

/**
 * Enregistre l’ordre des formations (liste ordonnée d’ids).
 */
export async function reorderFormationsAction(
  orderedIds: string[]
): Promise<{ ok: true } | { ok: false; error: string }> {
  const access = await requireAdminAccess();
  if (!access.ok) {
    return { ok: false, error: 'Accès refusé' };
  }

  if (!Array.isArray(orderedIds) || orderedIds.length === 0) {
    return { ok: false, error: 'Liste vide' };
  }

  const ids = orderedIds.filter((id) => typeof id === 'string' && id.length > 0);
  if (ids.length !== new Set(ids).size) {
    return { ok: false, error: 'Ids dupliqués' };
  }

  const supabase = createAdminClient();

  const updates = ids.map((id, index) =>
    supabase
      .from('courses')
      .update({
        display_order: index,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
  );

  const results = await Promise.all(updates);
  const firstError = results.find((r) => r.error)?.error;
  if (firstError) {
    return { ok: false, error: firstError.message };
  }

  revalidatePath('/admin/formations');
  return { ok: true };
}
