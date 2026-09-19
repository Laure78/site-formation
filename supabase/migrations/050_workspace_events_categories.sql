-- ============================================================
-- Organisation Agenda — catégories événements élargies
-- Ajoute : facturation, rendez-vous
-- ============================================================

alter table public.workspace_events
  drop constraint if exists workspace_events_category_check;

alter table public.workspace_events
  add constraint workspace_events_category_check
  check (category in (
    'formation',
    'administratif',
    'prospection',
    'facturation',
    'contenu',
    'rendez-vous',
    'personnel',
    'autre'
  ));
