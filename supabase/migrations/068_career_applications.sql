-- Candidatures emploi / consultant — pages Carrière (CV privés, accès admin)

create table if not exists public.career_applications (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('consultant', 'spontaneous')),
  application_type text,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  expertise_domain text,
  desired_role text,
  presentation text not null,
  mobility_idf text,
  formation_slugs text,
  availability text,
  linkedin_or_portfolio text,
  cv_storage_path text,
  cv_original_name text,
  source_page text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_career_applications_email on public.career_applications(email);
create index if not exists idx_career_applications_created on public.career_applications(created_at desc);
create index if not exists idx_career_applications_kind on public.career_applications(kind);

alter table public.career_applications enable row level security;

create policy "Career: insert anonyme" on public.career_applications for insert with check (true);
create policy "Career: select admin" on public.career_applications for select using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

-- Bucket privé — upload via service role (server action uniquement)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'career-cvs',
  'career-cvs',
  false,
  5242880,
  array['application/pdf']::text[]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;
