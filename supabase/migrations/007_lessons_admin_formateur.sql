-- =====================================================
-- Fix RLS lessons : permettre aux admin/formateur de gérer
-- les leçons (les cours seedés n'ont pas de creator_id)
-- =====================================================

-- Ajouter une policy pour admin et formateur (en plus de la policy "Creators")
create policy "Lessons: admin et formateur gèrent tout" on public.lessons
  for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('admin', 'formateur')
    )
  );
