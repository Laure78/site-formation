import { createAdminClient } from '@/lib/supabase/admin';
import { listTemplates } from '@/lib/prospection/queries';
import { TemplatesManager } from '@/components/admin/prospection/TemplatesManager';

export default async function ModelesPage() {
  const supabase = createAdminClient();
  const templates = await listTemplates(supabase);
  return <TemplatesManager templates={templates} />;
}
