-- Lien Google Meet pour RDV visio — stocké pour renvoi si nécessaire
alter table public.appointments add column if not exists meet_link text;

comment on column public.appointments.meet_link is 'Lien Google Meet (visio) — envoyé au client par email';
