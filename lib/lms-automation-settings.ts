import { createAdminClient } from '@/lib/supabase/admin';

export type LmsAutomationSettings = {
  id: number;
  invitation_auto_enabled: boolean;
  satisfaction_j1_enabled: boolean;
  updated_at: string;
};

const DEFAULTS: LmsAutomationSettings = {
  id: 1,
  invitation_auto_enabled: true,
  satisfaction_j1_enabled: true,
  updated_at: new Date().toISOString(),
};

export async function getLmsAutomationSettings(): Promise<LmsAutomationSettings> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('lms_automation_settings')
    .select('id, invitation_auto_enabled, satisfaction_j1_enabled, updated_at')
    .eq('id', 1)
    .maybeSingle();
  if (error) {
    console.error('[getLmsAutomationSettings]', error.message);
    return DEFAULTS;
  }
  if (!data) return DEFAULTS;
  return data as LmsAutomationSettings;
}

export async function saveLmsAutomationSettings(input: {
  invitationAutoEnabled: boolean;
  satisfactionJ1Enabled: boolean;
  updatedBy: string;
}): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase.from('lms_automation_settings').upsert(
    {
      id: 1,
      invitation_auto_enabled: input.invitationAutoEnabled,
      satisfaction_j1_enabled: input.satisfactionJ1Enabled,
      updated_at: new Date().toISOString(),
      updated_by: input.updatedBy,
    },
    { onConflict: 'id' },
  );
  if (error) throw new Error(error.message);
}
