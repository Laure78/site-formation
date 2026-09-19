'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { LINKS } from '@/lib/internal-links';
import {
  combineLocalDateAndTime,
} from '@/lib/mon-espace/agenda-dates';
import type { AgendaEventCategory } from '@/lib/mon-espace/agenda-types';
import { AGENDA_CATEGORIES } from '@/lib/mon-espace/agenda-types';

const VALID_CATEGORIES = new Set(AGENDA_CATEGORIES.map((c) => c.id));

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Non authentifié');
  return { supabase, ownerId: user.id };
}

function revalidateAgenda() {
  revalidatePath(LINKS.monEspace);
  revalidatePath(LINKS.monEspaceAgenda);
  revalidatePath(LINKS.monEspaceTaches);
}

function parseCategory(raw: string): AgendaEventCategory {
  if (VALID_CATEGORIES.has(raw as AgendaEventCategory)) {
    return raw as AgendaEventCategory;
  }
  return 'autre';
}

function parseEventForm(formData: FormData) {
  const title = String(formData.get('title') ?? '').trim();
  const dateKey = String(formData.get('date') ?? '').trim();
  const startTime = String(formData.get('start_time') ?? '').trim();
  const endTime = String(formData.get('end_time') ?? '').trim();
  const description = String(formData.get('description') ?? '').trim();
  const category = parseCategory(String(formData.get('category') ?? 'autre'));

  if (!title) throw new Error('Le titre est obligatoire');
  if (!dateKey || !startTime || !endTime) {
    throw new Error('Date et horaires obligatoires');
  }

  const timezoneOffsetMinutes = Number(formData.get('tz_offset') ?? NaN);
  if (!Number.isFinite(timezoneOffsetMinutes)) {
    throw new Error('Fuseau horaire manquant');
  }

  const start_at = combineLocalDateAndTime(dateKey, startTime, timezoneOffsetMinutes);
  const end_at = combineLocalDateAndTime(dateKey, endTime, timezoneOffsetMinutes);
  if (new Date(end_at) <= new Date(start_at)) {
    throw new Error('L’heure de fin doit être après l’heure de début');
  }

  return {
    title,
    start_at,
    end_at,
    description: description || null,
    category,
  };
}

export async function createAgendaEventAction(formData: FormData) {
  const { supabase, ownerId } = await requireUser();
  const payload = parseEventForm(formData);

  const { error } = await supabase.from('workspace_events').insert({
    owner_id: ownerId,
    ...payload,
  });

  if (error) throw new Error(error.message);
  revalidateAgenda();
}

export async function updateAgendaEventAction(formData: FormData) {
  const { supabase, ownerId } = await requireUser();
  const id = String(formData.get('id') ?? '').trim();
  if (!id) throw new Error('Événement introuvable');

  const payload = parseEventForm(formData);

  const { error } = await supabase
    .from('workspace_events')
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq('id', id)
    .eq('owner_id', ownerId);

  if (error) throw new Error(error.message);
  revalidateAgenda();
}

export async function deleteAgendaEventAction(formData: FormData) {
  const { supabase, ownerId } = await requireUser();
  const id = String(formData.get('id') ?? '').trim();
  if (!id) return;

  const { error } = await supabase
    .from('workspace_events')
    .delete()
    .eq('id', id)
    .eq('owner_id', ownerId);

  if (error) throw new Error(error.message);
  revalidateAgenda();
}
