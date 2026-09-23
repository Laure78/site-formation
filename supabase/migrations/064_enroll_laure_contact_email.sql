-- Inscription LMS auto : priorité contact@laureolivie.fr (email public), repli yahoo historique.

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
  where lower(email) = 'contact@laureolivie.fr'
  limit 1;

  if uid is null then
    select id into uid
    from auth.users
    where lower(email) = 'laureolivie@yahoo.fr'
    limit 1;
  end if;

  if uid is not null then
    insert into public.enrollments (user_id, course_id, progress_percent)
    values (uid, new.id, 0)
    on conflict (user_id, course_id) do nothing;
  end if;

  return new;
end;
$$;
