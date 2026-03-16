-- Bucket Storage "formations" pour les slides PDF et vidéos
-- Permet aux admin/formateur d'uploader via l'admin plateforme

-- Créer le bucket si absent
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'formations',
  'formations',
  true,
  52428800,  -- 50 MB
  array['application/pdf', 'video/mp4', 'video/webm', 'video/ogg', 'image/png', 'image/jpeg', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Politique : les admin et formateur peuvent uploader
create policy "Admin et formateur peuvent uploader"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'formations'
  and auth.uid() in (select id from public.profiles where role in ('admin', 'formateur'))
);

-- Politique : lecture publique (bucket public)
create policy "Lecture publique des formations"
on storage.objects for select
to public
using (bucket_id = 'formations');

-- Politique : admin/formateur peuvent mettre à jour leurs uploads
create policy "Admin et formateur peuvent modifier"
on storage.objects for update
to authenticated
using (
  bucket_id = 'formations'
  and auth.uid() in (select id from public.profiles where role in ('admin', 'formateur'))
);

-- Politique : admin/formateur peuvent supprimer
create policy "Admin et formateur peuvent supprimer"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'formations'
  and auth.uid() in (select id from public.profiles where role in ('admin', 'formateur'))
);
