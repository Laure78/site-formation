-- Inscription de laureolivie@yahoo.fr sur TOUTES les formations existantes
-- + consolidation du trigger (futures formations).

create or replace function public.enroll_laure_on_new_course()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid;
begin
  select id into uid
  from auth.users
  where lower(email) = 'laureolivie@yahoo.fr'
  limit 1;

  if uid is not null then
    insert into public.enrollments (user_id, course_id, progress_percent)
    values (uid, new.id, 0)
    on conflict (user_id, course_id) do nothing;
  end if;

  return new;
end;
$$;

drop trigger if exists trg_enroll_laure_on_new_course on public.courses;
create trigger trg_enroll_laure_on_new_course
  after insert on public.courses
  for each row
  execute function public.enroll_laure_on_new_course();

-- Backfill : toutes les formations (publiées ou non)
do $$
declare
  uid uuid;
  inserted_count int := 0;
begin
  select id into uid
  from auth.users
  where lower(email) = 'laureolivie@yahoo.fr'
  limit 1;

  if uid is null then
    raise notice 'Utilisateur laureolivie@yahoo.fr introuvable dans auth.users — backfill ignoré.';
    return;
  end if;

  insert into public.enrollments (user_id, course_id, progress_percent)
  select uid, c.id, 0
  from public.courses c
  on conflict (user_id, course_id) do nothing;

  get diagnostics inserted_count = row_count;
  raise notice 'Inscriptions Laure ajoutées/confirmées (nouvelles lignes : %).', inserted_count;
end $$;
