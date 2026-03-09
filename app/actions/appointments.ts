'use server';

import { createClient } from '@/lib/supabase/server';

export type CreateAppointmentInput = {
  start_at: string;
  end_at: string;
  client_name: string;
  client_email: string;
  client_phone?: string;
  client_message?: string;
};

export async function createAppointment(data: CreateAppointmentInput) {
  const supabase = await createClient();
  const { data: row, error } = await supabase.from('appointments').insert({
    start_at: data.start_at,
    end_at: data.end_at,
    client_name: data.client_name,
    client_email: data.client_email,
    client_phone: data.client_phone || null,
    client_message: data.client_message || null,
  }).select('id').single();

  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true, id: row.id };
}

export async function getBusySlots(startDate: string, endDate: string) {
  const supabase = await createClient();
  const start = `${startDate}T00:00:00.000Z`;
  const end = `${endDate}T23:59:59.999Z`;
  const { data, error } = await supabase
    .from('appointments')
    .select('start_at')
    .gte('start_at', start)
    .lte('start_at', end)
    .in('status', ['demande', 'confirme']);

  if (error) return [];
  return (data ?? []).map((r) => r.start_at);
}
