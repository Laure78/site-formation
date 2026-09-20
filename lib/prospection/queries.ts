import type { SupabaseClient } from '@supabase/supabase-js';
import type { ProspectFilters, ProspectRow, ProspectingActionRow, ProspectingEmailRow, ProspectingTemplateRow } from './types';

const PROSPECT_SELECT = `
  id, prenom, nom, email, telephone, entreprise, fonction,
  linkedin_url, site_web, ville, departement, region, type_structure,
  taille_entreprise, corps_metier, effectif_approx, besoins_identifies,
  formations_interessees, source_prospect, notes_crm, statut,
  dernier_contact_at, prochaine_relance_at, company_id,
  date_creation, date_modification, updated_at
`;

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
  let query = supabase
    .from('prospects')
    .select(PROSPECT_SELECT)
    .order('date_creation', { ascending: false })
    .limit(500);

  if (filters.statut) query = query.eq('statut', filters.statut);
  if (filters.typeStructure) query = query.eq('type_structure', filters.typeStructure);
  if (filters.departement) query = query.eq('departement', filters.departement);

  if (filters.relance === 'aujourdhui') {
    query = query
      .gte('prochaine_relance_at', startOfDay().toISOString())
      .lte('prochaine_relance_at', endOfDay().toISOString());
  } else if (filters.relance === 'retard') {
    query = query
      .not('prochaine_relance_at', 'is', null)
      .lt('prochaine_relance_at', startOfDay().toISOString())
      .not('statut', 'in', '("client","pas_interesse")');
  } else if (filters.relance === 'semaine') {
    query = query
      .gte('prochaine_relance_at', startOfDay().toISOString())
      .lte('prochaine_relance_at', endOfWeek().toISOString());
  } else if (filters.relance === 'plus_tard') {
    query = query.gt('prochaine_relance_at', endOfWeek().toISOString());
  }

  const { data, error } = await query;
  if (error) throw error;

  let rows = (data ?? []) as ProspectRow[];
  const q = filters.q?.trim().toLowerCase();
  if (q) {
    rows = rows.filter((p) => {
      const blob = [
        p.prenom,
        p.nom,
        p.email,
        p.entreprise,
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
    .select('id, statut, prochaine_relance_at, dernier_contact_at');
  if (error) throw error;
  const rows = data ?? [];
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
    opportunites: byStatut('opportunite') + byStatut('proposition_envoyee'),
    clients: byStatut('client'),
    relancesAujourdhui,
    relancesRetard,
  };
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
  return (data ?? []) as ProspectRow[];
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
