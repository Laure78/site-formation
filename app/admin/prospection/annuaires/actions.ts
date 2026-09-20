'use server';

import { revalidatePath } from 'next/cache';
import { requireOrganisationAdminAccess } from '@/lib/admin-access';
import { createAdminClient } from '@/lib/supabase/admin';
import { extractCompaniesFromDirectoryPdf } from '@/lib/prospection/directory-extract';
import type { DirectoryCompanyRow } from '@/lib/prospection/directories-types';

async function requireAdmin() {
  const access = await requireOrganisationAdminAccess();
  if (!access.ok) {
    return { ok: false as const, error: 'Accès réservé aux administrateurs' };
  }
  return { ok: true as const, userId: access.userId };
}

function revalidateDirectories(directoryId?: string) {
  revalidatePath('/admin/prospection');
  revalidatePath('/admin/prospection/annuaires');
  revalidatePath('/admin/prospection/prospects');
  if (directoryId) {
    revalidatePath(`/admin/prospection/annuaires/${directoryId}`);
    revalidatePath(`/admin/prospection/annuaires/${directoryId}/entreprises`);
  }
}

export async function extractDirectoryCompaniesAction(
  directoryId: string
): Promise<
  | { ok: true; imported: number; pageCount: number }
  | { ok: false; error: string }
> {
  const auth = await requireAdmin();
  if (!auth.ok) return auth;

  const supabase = createAdminClient();
  const { data: dir, error } = await supabase
    .from('prospecting_directories')
    .select('*')
    .eq('id', directoryId)
    .maybeSingle();
  if (error || !dir) return { ok: false, error: error?.message ?? 'Annuaire introuvable' };

  let extracted;
  try {
    extracted = await extractCompaniesFromDirectoryPdf(dir.file_path);
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : 'Échec extraction PDF',
    };
  }

  // Remplace les entreprises non encore converties en prospects
  await supabase
    .from('prospecting_directory_companies')
    .delete()
    .eq('directory_id', directoryId)
    .is('prospect_id', null);

  const { data: existingLinked } = await supabase
    .from('prospecting_directory_companies')
    .select('company_name, email')
    .eq('directory_id', directoryId)
    .not('prospect_id', 'is', null);

  const linkedKeys = new Set(
    (existingLinked ?? []).map(
      (r) =>
        `${(r.company_name as string).toLowerCase()}|${((r.email as string) ?? '').toLowerCase()}`
    )
  );

  const rows = extracted.companies
    .filter((c) => !linkedKeys.has(`${c.company_name.toLowerCase()}|${(c.email ?? '').toLowerCase()}`))
    .map((c) => ({
      directory_id: directoryId,
      company_name: c.company_name,
      address: c.address,
      postal_code: c.postal_code,
      city: c.city,
      departement: c.departement,
      phone: c.phone,
      email: c.email,
      website: c.website,
      manager_name: c.manager_name,
      manager_role: c.manager_role,
      workforce_category: c.workforce_category,
      workforce_min: c.workforce_min,
      workforce_max: c.workforce_max,
      workforce_label: c.workforce_label,
      specialties: c.specialties,
      professional_chamber: c.professional_chamber,
      quality_labels: c.quality_labels,
      qualibat_codes: c.qualibat_codes,
      tags: c.tags,
      source_page: c.source_page,
      source_file: dir.file_name,
      raw_block: c.raw_block,
      extracted_at: new Date().toISOString(),
    }));

  // Insert by chunks
  let imported = 0;
  for (let i = 0; i < rows.length; i += 100) {
    const chunk = rows.slice(i, i + 100);
    const { error: insErr } = await supabase
      .from('prospecting_directory_companies')
      .insert(chunk);
    if (insErr) return { ok: false, error: insErr.message };
    imported += chunk.length;
  }

  const { count } = await supabase
    .from('prospecting_directory_companies')
    .select('id', { count: 'exact', head: true })
    .eq('directory_id', directoryId);

  const { count: withContact } = await supabase
    .from('prospecting_directory_companies')
    .select('id', { count: 'exact', head: true })
    .eq('directory_id', directoryId)
    .or('email.not.is.null,phone.not.is.null,manager_name.not.is.null');

  const { count: prospectsCount } = await supabase
    .from('prospecting_directory_companies')
    .select('id', { count: 'exact', head: true })
    .eq('directory_id', directoryId)
    .not('prospect_id', 'is', null);

  await supabase
    .from('prospecting_directories')
    .update({
      page_count: extracted.pageCount,
      companies_count: count ?? imported,
      contacts_count: withContact ?? 0,
      prospects_count: prospectsCount ?? 0,
      extracted_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', directoryId);

  revalidateDirectories(directoryId);
  return { ok: true, imported, pageCount: extracted.pageCount };
}

async function findCrmDuplicate(
  supabase: ReturnType<typeof createAdminClient>,
  company: DirectoryCompanyRow
): Promise<{ id: string; reason: string } | null> {
  if (company.email) {
    const { data } = await supabase
      .from('prospects')
      .select('id')
      .ilike('email', company.email)
      .limit(1)
      .maybeSingle();
    if (data?.id) return { id: data.id, reason: 'email' };
  }
  if (company.phone) {
    const digits = company.phone.replace(/\D/g, '');
    if (digits.length >= 8) {
      const { data } = await supabase
        .from('prospects')
        .select('id, telephone')
        .not('telephone', 'is', null)
        .limit(50);
      const match = (data ?? []).find(
        (p) => (p.telephone ?? '').replace(/\D/g, '') === digits
      );
      if (match?.id) return { id: match.id, reason: 'téléphone' };
    }
  }
  if (company.company_name) {
    const { data } = await supabase
      .from('prospects')
      .select('id')
      .ilike('entreprise', company.company_name)
      .limit(1)
      .maybeSingle();
    if (data?.id) return { id: data.id, reason: 'entreprise' };
  }
  return null;
}

function companyToProspectPayload(
  company: DirectoryCompanyRow,
  directory: { id: string; name: string },
  userId: string
) {
  const now = new Date().toISOString();
  const prenom = company.manager_name?.split(/\s+/)[0] ?? 'Contact';
  const nom =
    company.manager_name?.split(/\s+/).slice(1).join(' ') ||
    company.company_name;
  const email =
    company.email?.toLowerCase() ||
    `annuaire+${company.id.slice(0, 8)}@import.local`;

  const notes = [
    company.address && company.postal_code && company.city
      ? `Adresse : ${company.address}, ${company.postal_code} ${company.city}`
      : null,
    company.workforce_label
      ? `Effectif : ${company.workforce_label} (cat. ${company.workforce_category})`
      : null,
    company.qualibat_codes?.length
      ? `Qualibat : ${company.qualibat_codes.join(', ')}`
      : null,
    company.source_page ? `Page annuaire : ${company.source_page}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  return {
    prenom,
    nom,
    email,
    telephone: company.phone,
    entreprise: company.company_name,
    fonction: company.manager_role,
    site_web: company.website,
    ville: company.city,
    departement: company.departement,
    region: 'Île-de-France',
    type_structure: 'entreprise_btp',
    taille_entreprise:
      company.workforce_category === '1'
        ? '1-10'
        : company.workforce_category === '2'
          ? '10-50'
          : company.workforce_category === '3' || company.workforce_category === '4'
            ? '50-250'
            : company.workforce_category
              ? '250+'
              : null,
    effectif_approx: company.workforce_label,
    corps_metier: company.specialties?.[0] ?? null,
    besoins_identifies: [],
    source_prospect: directory.name,
    source_metadata: {
      event: directory.name,
      organizer: 'FFB Grand Paris Île-de-France',
      source_page: company.source_page,
      source_file: company.source_file,
    },
    tags: company.tags ?? [],
    notes_crm: notes || null,
    statut: 'a_contacter',
    next_action: 'Envoyer premier email',
    next_action_type: 'envoyer_premier_email',
    source_directory_id: directory.id,
    source_directory_company_id: company.id,
    date_creation: now,
    date_modification: now,
    updated_at: now,
    created_by: userId,
    pipeline_etape: 'nouveaux',
  };
}

export async function analyzeCreateProspectsFromDirectoryAction(
  companyIds: string[]
): Promise<
  | {
      ok: true;
      selected: number;
      news: { id: string; name: string }[];
      duplicates: { id: string; name: string; reason: string; prospectId: string }[];
    }
  | { ok: false; error: string }
> {
  const auth = await requireAdmin();
  if (!auth.ok) return auth;
  if (!companyIds.length) return { ok: false, error: 'Aucune entreprise sélectionnée' };

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('prospecting_directory_companies')
    .select('*')
    .in('id', companyIds);
  if (error) return { ok: false, error: error.message };

  const news: { id: string; name: string }[] = [];
  const duplicates: {
    id: string;
    name: string;
    reason: string;
    prospectId: string;
  }[] = [];

  for (const c of (data ?? []) as DirectoryCompanyRow[]) {
    if (c.prospect_id) {
      duplicates.push({
        id: c.id,
        name: c.company_name,
        reason: 'déjà lié au CRM',
        prospectId: c.prospect_id,
      });
      continue;
    }
    const dup = await findCrmDuplicate(supabase, c);
    if (dup) {
      duplicates.push({
        id: c.id,
        name: c.company_name,
        reason: dup.reason,
        prospectId: dup.id,
      });
    } else {
      news.push({ id: c.id, name: c.company_name });
    }
  }

  return {
    ok: true,
    selected: companyIds.length,
    news,
    duplicates,
  };
}

export async function createProspectsFromDirectoryAction(
  companyIds: string[],
  linkDuplicates = false
): Promise<
  | { ok: true; created: number; linked: number; errors: string[] }
  | { ok: false; error: string }
> {
  const auth = await requireAdmin();
  if (!auth.ok) return auth;

  const supabase = createAdminClient();
  const { data: companies, error } = await supabase
    .from('prospecting_directory_companies')
    .select('*, prospecting_directories(id, name)')
    .in('id', companyIds);
  if (error) return { ok: false, error: error.message };

  let created = 0;
  let linked = 0;
  const errors: string[] = [];

  for (const raw of companies ?? []) {
    const c = raw as DirectoryCompanyRow & {
      prospecting_directories: { id: string; name: string } | null;
    };
    const directory = c.prospecting_directories;
    if (!directory) {
      errors.push(`${c.company_name} : annuaire manquant`);
      continue;
    }

    if (c.prospect_id) {
      linked += 1;
      continue;
    }

    const dup = await findCrmDuplicate(supabase, c);
    if (dup) {
      if (linkDuplicates) {
        await supabase
          .from('prospecting_directory_companies')
          .update({ prospect_id: dup.id, updated_at: new Date().toISOString() })
          .eq('id', c.id);
        linked += 1;
      } else {
        errors.push(`${c.company_name} : doublon (${dup.reason})`);
      }
      continue;
    }

    const payload = companyToProspectPayload(c, directory, auth.userId);
    const { data: prospect, error: insErr } = await supabase
      .from('prospects')
      .insert(payload)
      .select('id')
      .single();
    if (insErr || !prospect) {
      errors.push(`${c.company_name} : ${insErr?.message ?? 'échec'}`);
      continue;
    }

    await supabase.from('prospecting_actions').insert({
      prospect_id: prospect.id,
      action_type: 'import',
      title: 'Prospect ajouté au CRM',
      details: `Importé depuis l’annuaire\nSource : ${directory.name}${
        c.source_page ? `\nPage : ${c.source_page}` : ''
      }`,
      created_by: auth.userId,
    });

    await supabase
      .from('prospecting_directory_companies')
      .update({ prospect_id: prospect.id, updated_at: new Date().toISOString() })
      .eq('id', c.id);

    created += 1;
  }

  // Refresh directory prospects_count
  const dirIds = [
    ...new Set(
      (companies ?? []).map(
        (c) =>
          (c as { directory_id: string }).directory_id
      )
    ),
  ];
  for (const dirId of dirIds) {
    const { count } = await supabase
      .from('prospecting_directory_companies')
      .select('id', { count: 'exact', head: true })
      .eq('directory_id', dirId)
      .not('prospect_id', 'is', null);
    await supabase
      .from('prospecting_directories')
      .update({
        prospects_count: count ?? 0,
        updated_at: new Date().toISOString(),
      })
      .eq('id', dirId);
    revalidateDirectories(dirId);
  }

  return { ok: true, created, linked, errors };
}
