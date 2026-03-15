-- Type de RDV : téléphone ou visio Google Meet
alter table public.appointments add column if not exists type_rdv text default 'visio' check (type_rdv in ('telephone', 'visio'));
alter table public.appointments add column if not exists google_event_id text;

comment on column public.appointments.type_rdv is 'telephone = appel, visio = Google Meet';
comment on column public.appointments.google_event_id is 'ID événement Google Calendar (pour annulation ou sync)';
