-- BTP-06 : Architecte augmenté Claude / DPGF — niveau intermédiaire (catalogue + LMS)
update public.courses
set
  level = 'intermediaire',
  updated_at = now()
where slug = 'ia-architecture-claude-dpgf';
