-- Ajout prénom et nom sur les profils
alter table public.profiles
  add column if not exists first_name text,
  add column if not exists last_name text;

-- Remplir depuis full_name existant (format "Prénom Nom")
update public.profiles
set
  first_name = case
    when full_name is not null and full_name != '' then split_part(trim(full_name), ' ', 1)
    else null
  end,
  last_name = case
    when full_name is not null and full_name != '' and position(' ' in trim(full_name)) > 0
    then nullif(trim(substring(trim(full_name) from position(' ' in trim(full_name)) + 1)), '')
    else null
  end
where first_name is null and full_name is not null and full_name != '';

-- Adapter handle_new_user : first_name, last_name depuis metadata (Google) ou full_name
create or replace function public.handle_new_user()
returns trigger as $$
declare
  fname text;
  lname text;
  ffull text;
begin
  ffull := coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', '');
  fname := coalesce(new.raw_user_meta_data->>'first_name', new.raw_user_meta_data->>'given_name', split_part(trim(ffull), ' ', 1));
  lname := coalesce(new.raw_user_meta_data->>'last_name', new.raw_user_meta_data->>'family_name',
    case when position(' ' in trim(ffull)) > 0 then nullif(trim(substring(trim(ffull) from position(' ' in trim(ffull)) + 1)), '') else null end);
  insert into public.profiles (id, email, full_name, first_name, last_name)
  values (new.id, new.email, nullif(trim(ffull), ''), nullif(trim(fname), ''), nullif(trim(lname), ''));
  return new;
end;
$$ language plpgsql security definer;
