import type { SupabaseClient } from '@supabase/supabase-js';
import { CONTACT } from '@/lib/constants';
import { typesForGroup } from './constants';
import type { ProspectFilters, ProspectRow, ProspectingActionRow, ProspectingEmailRow, ProspectingTemplateRow } from './types';

const PROSPECT_SELECT = `
  id, prenom, nom, email, telephone, entreprise, fonction,
  linkedin_url, site_web, ville, departement, region, type_structure,
  taille_entreprise, corps_metier, effectif_approx, besoins_identifies,
  formations_interessees, source_prospect, source_metadata, tags,
  prospect_type, department_name, relance_motif, notes_crm, statut,
  dernier_contact_at, prochaine_relance_at, company_id,
  next_action, next_action_type, next_action_at,
  source_directory_id, source_directory_company_id,
  date_creation, date_modification, updated_at
`;

/** Emails internes — exclus du CRM (tests RDV, compte admin). */
const EXCLUDED_CRM_EMAILS = new Set([
  CONTACT.email.toLowerCase(),
  'laureolivie@yahoo.fr',
]);

function isExcludedCrmProspect(email: string | null | undefined): boolean {
  return Boolean(email && EXCLUDED_CRM_EMAILS.has(email.trim().toLowerCase()));
}

function withoutExcludedCrmProspects<T extends { email?: string | null }>(rows: T[]): T[] {
  return rows.filter((r) => !isExcludedCrmProspect(r.email));
}

function startOfDay(d = new Date()) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function endOfDay(d = new Date()) {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x;
}

function endOfWeek(d = new Date()) {
  const x = startOfDay(d);
  const day = x.getDay();
  const diff = day === 0 ? 0 : 7 - day;
  x.setDate(x.getDate() + diff);
  x.setHours(23, 59, 59, 999);
  return x;
}

export async function listProspects(
  supabase: SupabaseClient,
  filters: ProspectFilters = {}
): Promise<ProspectRow[]> {
  const pageSize = filters.pageSize ?? 50;
  const page = Math.max(1, filters.page ?? 1);
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from('prospects')
    .select(PROSPECT_SELECT)
    .order('next_action_at', { ascending: true, nullsFirst: false })
    .order('date_creation', { ascending: false })
    .range(from, to);

  if (filters.statut) query = query.eq('statut', filters.statut);
  if (filters.typeStructure) query = query.eq('type_structure', filters.typeStructure);
  if (filters.departement) query = query.eq('departement', filters.departement);

  const groupTypes = typesForGroup(filters.typeGroup);
  if (groupTypes) query = query.in('type_structure', groupTypes);

  if (filters.sansContact) {
    query = query.is('dernier_contact_at', null);
  }

  if (filters.relance === 'aujourdhui') {
    query = query
      .gte('prochaine_relance_at', startOfDay().toISOString())
      .lte('prochaine_relance_at', endOfDay().toISOString());
  } else if (filters.relance === 'retard') {
    query = query
      .not('prochaine_relance_at', 'is', null)
      .lt('prochaine_relance_at', startOfDay().toISOString())
      .not('statut', 'in', '("client","pas_interesse")');
  } else if (filters.relance === 'demain') {
    const d0 = startOfDay();
    d0.setDate(d0.getDate() + 1);
    const d1 = endOfDay(d0);
    query = query
      .gte('prochaine_relance_at', d0.toISOString())
      .lte('prochaine_relance_at', d1.toISOString());
  } else if (filters.relance === 'semaine') {
    query = query
      .gte('prochaine_relance_at', startOfDay().toISOString())
      .lte('prochaine_relance_at', endOfWeek().toISOString());
  } else if (filters.relance === 'plus_tard') {
    query = query.gt('prochaine_relance_at', endOfWeek().toISOString());
  }

  const { data, error } = await query;
  if (error) throw error;

  let rows = withoutExcludedCrmProspects((data ?? []) as ProspectRow[]);

  if (filters.sansAction) {
    rows = rows.filter(
      (p) =>
        !p.next_action?.trim() &&
        !p.prochaine_relance_at &&
        p.statut !== 'client' &&
        p.statut !== 'pas_interesse'
    );
  }

  const q = filters.q?.trim().toLowerCase();
  if (q) {
    rows = rows.filter((p) => {
      const blob = [
        p.prenom,
        p.nom,
        p.email,
        p.entreprise,
        p.fonction,
        p.ville,
        p.departement,
        p.telephone,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return blob.includes(q);
    });
  }
  return rows;
}

export async function getProspect(
  supabase: SupabaseClient,
  id: string
): Promise<ProspectRow | null> {
  const { data, error } = await supabase
    .from('prospects')
    .select(PROSPECT_SELECT)
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data as ProspectRow | null;
}

export async function listProspectEmails(
  supabase: SupabaseClient,
  prospectId: string
): Promise<ProspectingEmailRow[]> {
  const { data, error } = await supabase
    .from('prospecting_emails')
    .select('*')
    .eq('prospect_id', prospectId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as ProspectingEmailRow[];
}

export async function listProspectActions(
  supabase: SupabaseClient,
  prospectId: string
): Promise<ProspectingActionRow[]> {
  const { data, error } = await supabase
    .from('prospecting_actions')
    .select('*')
    .eq('prospect_id', prospectId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as ProspectingActionRow[];
}

export async function listTemplates(
  supabase: SupabaseClient
): Promise<ProspectingTemplateRow[]> {
  const { data, error } = await supabase
    .from('prospecting_templates')
    .select('*')
    .order('name');
  if (error) throw error;
  return (data ?? []) as ProspectingTemplateRow[];
}

export async function getDashboardStats(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from('prospects')
    .select(
      'id, email, statut, prochaine_relance_at, dernier_contact_at, next_action, next_action_at'
    );
  if (error) throw error;
  const rows = withoutExcludedCrmProspects(data ?? []);
  const byStatut = (s: string) => rows.filter((r) => r.statut === s).length;
  const todayStart = startOfDay().toISOString();
  const todayEnd = endOfDay().toISOString();
  const relancesAujourdhui = rows.filter(
    (r) =>
      r.prochaine_relance_at &&
      r.prochaine_relance_at >= todayStart &&
      r.prochaine_relance_at <= todayEnd
  ).length;
  const relancesRetard = rows.filter(
    (r) =>
      r.prochaine_relance_at &&
      r.prochaine_relance_at < todayStart &&
      r.statut !== 'client' &&
      r.statut !== 'pas_interesse'
  ).length;

  return {
    total: rows.length,
    aContacter: byStatut('a_contacter'),
    emailEnvoye: byStatut('email_envoye'),
    aRelancer: byStatut('a_relancer') + byStatut('relance'),
    reponses: byStatut('reponse_recue'),
    rdv: byStatut('rdv_prevu'),
    propositions: byStatut('proposition_envoyee'),
    opportunites: byStatut('opportunite'),
    clients: byStatut('client'),
    relancesAujourdhui,
    relancesRetard,
    relancesAFaire: relancesAujourdhui + relancesRetard,
    rdvAVenir: byStatut('rdv_prevu'),
    sansAction: rows.filter(
      (r) =>
        !r.next_action &&
        !r.prochaine_relance_at &&
        r.statut !== 'client' &&
        r.statut !== 'pas_interesse'
    ).length,
  };
}

export type NextActionItem = ProspectRow & {
  actionLabel: string;
  actionKind: 'relance' | 'premier_contact' | 'reponse' | 'rdv';
};

/** Actions prioritaires pour le tableau de bord. */
export async function listProchainesActions(
  supabase: SupabaseClient,
  limit = 12
): Promise<NextActionItem[]> {
  const prospects = await listProspects(supabase, {});
  const todayStart = startOfDay();
  const todayEnd = endOfDay();
  const items: NextActionItem[] = [];

  for (const p of prospects) {
    if (p.statut === 'client' || p.statut === 'pas_interesse') continue;

    const relanceAt = p.prochaine_relance_at
      ? new Date(p.prochaine_relance_at)
      : null;
    const isRelanceDue =
      relanceAt &&
      relanceAt <= todayEnd &&
      p.statut !== 'client';

    if (isRelanceDue) {
      const isToday =
        relanceAt >= todayStart && relanceAt <= todayEnd;
      items.push({
        ...p,
        actionKind: 'relance',
        actionLabel: isToday
          ? 'Relance aujourd’hui'
          : relanceAt < todayStart
            ? 'Relance en retard'
            : 'Relance',
      });
      continue;
    }

    if (p.statut === 'reponse_recue') {
      items.push({
        ...p,
        actionKind: 'reponse',
        actionLabel: 'Réponse à traiter',
      });
      continue;
    }

    if (p.statut === 'rdv_prevu') {
      items.push({
        ...p,
        actionKind: 'rdv',
        actionLabel: 'RDV à préparer',
      });
      continue;
    }

    if (p.statut === 'a_contacter') {
      items.push({
        ...p,
        actionKind: 'premier_contact',
        actionLabel: 'Premier contact',
      });
    }
  }

  const priority: Record<NextActionItem['actionKind'], number> = {
    relance: 0,
    reponse: 1,
    rdv: 2,
    premier_contact: 3,
  };

  items.sort((a, b) => {
    const pa = priority[a.actionKind] - priority[b.actionKind];
    if (pa !== 0) return pa;
    const da = a.prochaine_relance_at
      ? new Date(a.prochaine_relance_at).getTime()
      : Number.MAX_SAFE_INTEGER;
    const db = b.prochaine_relance_at
      ? new Date(b.prochaine_relance_at).getTime()
      : Number.MAX_SAFE_INTEGER;
    return da - db;
  });

  return items.slice(0, limit);
}

export async function listRelances(
  supabase: SupabaseClient
): Promise<ProspectRow[]> {
  const { data, error } = await supabase
    .from('prospects')
    .select(PROSPECT_SELECT)
    .not('prochaine_relance_at', 'is', null)
    .not('statut', 'in', '("client","pas_interesse")')
    .order('prochaine_relance_at', { ascending: true })
    .limit(200);
  if (error) throw error;
  return withoutExcludedCrmProspects((data ?? []) as ProspectRow[]);
}

export async function listRecentEmails(supabase: SupabaseClient, limit = 40) {
  const { data, error } = await supabase
    .from('prospecting_emails')
    .select(
      'id, prospect_id, subject, email_type, status, sent_at, created_at, prospects(prenom, nom, entreprise)'
    )
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}

export async function listCompaniesDistinct(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from('prospects')
    .select('entreprise, type_structure, departement, ville, taille_entreprise')
    .not('entreprise', 'is', null)
    .order('entreprise')
    .limit(500);
  if (error) throw error;
  const map = new Map<
    string,
    {
      name: string;
      type_structure: string | null;
      departement: string | null;
      ville: string | null;
      taille: string | null;
      count: number;
    }
  >();
  for (const row of data ?? []) {
    const name = (row.entreprise as string)?.trim();
    if (!name) continue;
    const key = name.toLowerCase();
    const prev = map.get(key);
    if (prev) {
      prev.count += 1;
    } else {
      map.set(key, {
        name,
        type_structure: row.type_structure,
        departement: row.departement,
        ville: row.ville,
        taille: row.taille_entreprise,
        count: 1,
      });
    }
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name, 'fr'));
}
