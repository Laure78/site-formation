-- Enrichissement CRM prospection : métadonnées source JSON + tags + type + motif relance
ALTER TABLE public.prospects
  ADD COLUMN IF NOT EXISTS source_metadata jsonb,
  ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS prospect_type text,
  ADD COLUMN IF NOT EXISTS department_name text,
  ADD COLUMN IF NOT EXISTS relance_motif text;

COMMENT ON COLUMN public.prospects.source_metadata IS
  'Métadonnées d’import JSON (event, organizer, location, dates…)';
