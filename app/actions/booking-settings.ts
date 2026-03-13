'use server';

import { createClient } from '@/lib/supabase/server';
import { isAdmin } from '@/lib/auth';

export type BookingSettings = {
  booking_window_days: number;
  blocked_dates: string[]; // ISO date strings YYYY-MM-DD
};

export async function getBookingSettings(): Promise<BookingSettings> {
  const supabase = await createClient();
  const { data: settings } = await supabase
    .from('booking_settings')
    .select('booking_window_days')
    .single();

  const todayStr = new Date().toISOString().slice(0, 10);
  const { data: blocked } = await supabase
    .from('blocked_dates')
    .select('date_blocked')
    .gte('date_blocked', todayStr);

  const days = settings?.booking_window_days ?? 45;
  const dates = (blocked ?? []).map((r) => String(r.date_blocked).slice(0, 10));

  return { booking_window_days: days, blocked_dates: dates };
}

/** Pour l'admin : toutes les dates bloquées (y compris passées) */
export async function getAllBlockedDates(): Promise<string[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('blocked_dates')
    .select('date_blocked')
    .order('date_blocked', { ascending: false });
  return (data ?? []).map((r) => String(r.date_blocked).slice(0, 10));
}

export async function addBlockedDateRangeAction(
  startIso: string,
  endIso: string
): Promise<{ ok: boolean; error?: string }> {
  const start = startIso.trim().slice(0, 10);
  const end = endIso.trim().slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(start) || !/^\d{4}-\d{2}-\d{2}$/.test(end))
    return { ok: false, error: 'Date invalide.' };
  const startD = new Date(start);
  const endD = new Date(end);
  if (startD > endD) return { ok: false, error: 'La date de fin doit être après la date de début.' };

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'Non authentifié.' };
  const profile = await import('@/lib/auth').then((m) => m.getProfile(user.id));
  if (!profile || !isAdmin(profile.role)) return { ok: false, error: 'Accès refusé.' };

  const toInsert: { date_blocked: string }[] = [];
  const d = new Date(startD);
  while (d <= endD) {
    toInsert.push({ date_blocked: d.toISOString().slice(0, 10) });
    d.setDate(d.getDate() + 1);
  }
  for (const row of toInsert) {
    const { error: err } = await supabase.from('blocked_dates').insert(row);
    if (err && err.code !== '23505') return { ok: false, error: err.message }; // 23505 = duplicate
  }
  return { ok: true };
}

export async function removeBlockedDateRangeAction(
  startIso: string,
  endIso: string
): Promise<{ ok: boolean; error?: string }> {
  const start = startIso.trim().slice(0, 10);
  const end = endIso.trim().slice(0, 10);
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'Non authentifié.' };
  const profile = await import('@/lib/auth').then((m) => m.getProfile(user.id));
  if (!profile || !isAdmin(profile.role)) return { ok: false, error: 'Accès refusé.' };

  const { error } = await supabase
    .from('blocked_dates')
    .delete()
    .gte('date_blocked', start)
    .lte('date_blocked', end);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function updateBookingWindowAction(days: number): Promise<{ ok: boolean; error?: string }> {
  if (days < 7 || days > 90) return { ok: false, error: 'La fenêtre doit être entre 7 et 90 jours.' };
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'Non authentifié.' };
  const profile = await import('@/lib/auth').then((m) => m.getProfile(user.id));
  if (!profile || !isAdmin(profile.role)) return { ok: false, error: 'Accès refusé.' };

  const { error } = await supabase
    .from('booking_settings')
    .update({ booking_window_days: days, updated_at: new Date().toISOString() })
    .eq('id', 'default');
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function addBlockedDateAction(dateIso: string): Promise<{ ok: boolean; error?: string }> {
  const d = dateIso.trim().slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) return { ok: false, error: 'Date invalide.' };
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'Non authentifié.' };
  const profile = await import('@/lib/auth').then((m) => m.getProfile(user.id));
  if (!profile || !isAdmin(profile.role)) return { ok: false, error: 'Accès refusé.' };

  const { error } = await supabase.from('blocked_dates').insert({ date_blocked: d });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function removeBlockedDateAction(dateIso: string): Promise<{ ok: boolean; error?: string }> {
  const d = dateIso.trim().slice(0, 10);
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'Non authentifié.' };
  const profile = await import('@/lib/auth').then((m) => m.getProfile(user.id));
  if (!profile || !isAdmin(profile.role)) return { ok: false, error: 'Accès refusé.' };

  const { error } = await supabase.from('blocked_dates').delete().eq('date_blocked', d);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

/** Vérifie si un créneau (start_at ISO) est dans la fenêtre autorisée */
export async function isSlotWithinBookingWindow(startAtIso: string): Promise<boolean> {
  const settings = await getBookingSettings();
  const start = new Date(startAtIso);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + settings.booking_window_days);
  maxDate.setHours(0, 0, 0, 0);

  const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
  const todayStart = today.getTime();
  const maxDay = maxDate.getTime();

  if (startDay < todayStart) return false;
  if (startDay > maxDay) return false;

  const dateStr = start.toISOString().slice(0, 10);
  if (settings.blocked_dates.includes(dateStr)) return false;
  return true;
}
