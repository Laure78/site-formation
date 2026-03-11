-- =====================================================
-- QUESTIONNAIRE COMPLÉMENTAIRE APRÈS RÉSERVATION RDV
-- Objectif : qualifier le prospect avant le rendez-vous
-- =====================================================

-- Token unique pour accéder au questionnaire (lien dans merci-rdv)
alter table public.prospects
  add column if not exists questionnaire_token text unique,
  add column if not exists questionnaire_nb_salaries text,
  add column if not exists questionnaire_outils text,
  add column if not exists questionnaire_taches_chronophages text,
  add column if not exists questionnaire_completed_at timestamptz;

create index if not exists idx_prospects_questionnaire_token on public.prospects(questionnaire_token) where questionnaire_token is not null;

-- RPC : mise à jour du questionnaire par un prospect via son token (anon)
create or replace function public.update_prospect_questionnaire(
  p_token text,
  p_nb_salaries text,
  p_outils text,
  p_taches text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count int;
begin
  if p_token is null or trim(p_token) = '' then
    return jsonb_build_object('ok', false, 'error', 'Token manquant');
  end if;
  update public.prospects
  set
    questionnaire_nb_salaries = nullif(trim(p_nb_salaries), ''),
    questionnaire_outils = nullif(trim(p_outils), ''),
    questionnaire_taches_chronophages = nullif(trim(p_taches), ''),
    questionnaire_completed_at = now(),
    date_modification = now()
  where questionnaire_token = p_token;
  get diagnostics v_count = row_count;
  if v_count = 0 then
    return jsonb_build_object('ok', false, 'error', 'Token invalide');
  end if;
  return jsonb_build_object('ok', true);
end;
$$;

grant execute on function public.update_prospect_questionnaire(text, text, text, text) to anon;
grant execute on function public.update_prospect_questionnaire(text, text, text, text) to authenticated;

-- RPC : vérifier si le questionnaire est déjà complété (pour afficher un message)
create or replace function public.get_prospect_questionnaire_status(p_token text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_record record;
begin
  if p_token is null or trim(p_token) = '' then
    return jsonb_build_object('found', false, 'completed', false);
  end if;
  select questionnaire_completed_at, prenom
  into v_record
  from public.prospects
  where questionnaire_token = p_token;
  if not found then
    return jsonb_build_object('found', false, 'completed', false);
  end if;
  return jsonb_build_object(
    'found', true,
    'completed', v_record.questionnaire_completed_at is not null,
    'prenom', v_record.prenom
  );
end;
$$;

grant execute on function public.get_prospect_questionnaire_status(text) to anon;
grant execute on function public.get_prospect_questionnaire_status(text) to authenticated;
