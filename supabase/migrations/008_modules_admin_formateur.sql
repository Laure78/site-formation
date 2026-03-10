-- =====================================================
-- Fix RLS modules : permettre aux admin/formateur de gérer
-- les modules (comme pour les lessons)
-- =====================================================

drop policy if exists "Modules: admin et formateur gèrent tout" on public.modules;
create policy "Modules: admin et formateur gèrent tout" on public.modules
  for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('admin', 'formateur')
    )
  );
