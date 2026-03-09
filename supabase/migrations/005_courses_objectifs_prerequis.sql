-- Objectifs, prérequis, programme sur les formations
alter table public.courses
  add column if not exists objectifs text,
  add column if not exists prerequis text,
  add column if not exists programme text;

-- Bucket pour uploads (slides, vidéos) — exécuter dans Supabase si besoin
-- insert into storage.buckets (id, name, public) values ('formations', 'formations', true)
-- on conflict (id) do nothing;
