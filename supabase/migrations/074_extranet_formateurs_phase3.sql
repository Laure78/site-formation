-- ============================================================
-- Extranet formateurs — Phase 3 : Qualiopi (21, 27, 30–32)
-- ============================================================

-- Ind. 21 — évaluations des compétences (≠ CV seul)
CREATE TABLE IF NOT EXISTS public.extranet_competency_evaluations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trainer_id uuid NOT NULL REFERENCES public.extranet_trainers(id) ON DELETE CASCADE,
  evaluation_type text NOT NULL CHECK (evaluation_type IN ('initial', 'observation', 'reevaluation')),
  scores jsonb NOT NULL DEFAULT '{}'::jsonb,
  evidence_summary text,
  development_plan text,
  evaluator_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  evaluated_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_extranet_comp_eval_trainer ON public.extranet_competency_evaluations(trainer_id);

-- Ind. 27 — fiche contrôle sous-traitance (validation humaine)
CREATE TABLE IF NOT EXISTS public.extranet_subcontractor_controls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trainer_id uuid NOT NULL REFERENCES public.extranet_trainers(id) ON DELETE CASCADE,
  version int NOT NULL DEFAULT 1,
  authorized_scope text,
  admin_situation_ok boolean,
  competencies_ok boolean,
  contract_ok boolean,
  quality_obligations_ok boolean,
  procedures_ok boolean,
  evaluations_reviewed boolean,
  difficulties_notes text,
  corrective_actions text,
  validation_status text NOT NULL DEFAULT 'draft'
    CHECK (validation_status IN ('draft', 'validated', 'needs_action')),
  validated_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  validated_at timestamptz,
  admin_notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (trainer_id, version)
);

CREATE INDEX IF NOT EXISTS idx_extranet_subcontract_trainer ON public.extranet_subcontractor_controls(trainer_id);

-- Ind. 30 — retours post-session (lié mission)
CREATE TABLE IF NOT EXISTS public.extranet_mission_feedbacks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mission_id uuid NOT NULL REFERENCES public.extranet_missions(id) ON DELETE CASCADE,
  trainer_id uuid NOT NULL REFERENCES public.extranet_trainers(id) ON DELETE CASCADE,
  difficulties text,
  adaptations text,
  improvement_proposals text,
  incident_report text,
  submitted_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (mission_id)
);

CREATE INDEX IF NOT EXISTS idx_extranet_mission_fb_trainer ON public.extranet_mission_feedbacks(trainer_id);

-- Ind. 31–32 — plans d'action qualité
CREATE TABLE IF NOT EXISTS public.extranet_quality_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trainer_id uuid REFERENCES public.extranet_trainers(id) ON DELETE SET NULL,
  mission_id uuid REFERENCES public.extranet_missions(id) ON DELETE SET NULL,
  qualiopi_indicator text NOT NULL,
  title text NOT NULL,
  description text,
  responsible_name text,
  responsible_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  due_date date,
  status text NOT NULL DEFAULT 'open'
    CHECK (status IN ('open', 'in_progress', 'closed')),
  closed_at timestamptz,
  closure_notes text,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_extranet_quality_actions_trainer ON public.extranet_quality_actions(trainer_id);
CREATE INDEX IF NOT EXISTS idx_extranet_quality_actions_status ON public.extranet_quality_actions(status);

-- Journal exports audit (pas de preuves fictives)
CREATE TABLE IF NOT EXISTS public.extranet_audit_export_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trainer_id uuid REFERENCES public.extranet_trainers(id) ON DELETE SET NULL,
  exported_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  export_format text NOT NULL CHECK (export_format IN ('json', 'zip', 'pdf')),
  scope text NOT NULL,
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE public.extranet_competency_evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.extranet_subcontractor_controls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.extranet_mission_feedbacks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.extranet_quality_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.extranet_audit_export_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Extranet comp eval: staff" ON public.extranet_competency_evaluations
  FOR ALL USING (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()))
  WITH CHECK (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()));

CREATE POLICY "Extranet comp eval: trainer read" ON public.extranet_competency_evaluations
  FOR SELECT USING (trainer_id = public.extranet_trainer_id(auth.uid()));

CREATE POLICY "Extranet subcontract: staff" ON public.extranet_subcontractor_controls
  FOR ALL USING (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()))
  WITH CHECK (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()));

CREATE POLICY "Extranet subcontract: trainer read validated" ON public.extranet_subcontractor_controls
  FOR SELECT USING (
    trainer_id = public.extranet_trainer_id(auth.uid())
    AND validation_status = 'validated'
  );

CREATE POLICY "Extranet mission fb: staff" ON public.extranet_mission_feedbacks
  FOR ALL USING (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()))
  WITH CHECK (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()));

CREATE POLICY "Extranet mission fb: trainer own" ON public.extranet_mission_feedbacks
  FOR SELECT USING (trainer_id = public.extranet_trainer_id(auth.uid()));

CREATE POLICY "Extranet mission fb: trainer insert" ON public.extranet_mission_feedbacks
  FOR INSERT WITH CHECK (trainer_id = public.extranet_trainer_id(auth.uid()));

CREATE POLICY "Extranet mission fb: trainer update own" ON public.extranet_mission_feedbacks
  FOR UPDATE USING (trainer_id = public.extranet_trainer_id(auth.uid()))
  WITH CHECK (trainer_id = public.extranet_trainer_id(auth.uid()));

CREATE POLICY "Extranet quality actions: staff" ON public.extranet_quality_actions
  FOR ALL USING (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()))
  WITH CHECK (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()));

CREATE POLICY "Extranet quality actions: trainer read own" ON public.extranet_quality_actions
  FOR SELECT USING (trainer_id = public.extranet_trainer_id(auth.uid()));

CREATE POLICY "Extranet audit export log: staff" ON public.extranet_audit_export_log
  FOR ALL USING (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()))
  WITH CHECK (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()));

CREATE OR REPLACE FUNCTION public.extranet_quality_actions_set_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_extranet_quality_actions_updated ON public.extranet_quality_actions;
CREATE TRIGGER trg_extranet_quality_actions_updated
  BEFORE UPDATE ON public.extranet_quality_actions
  FOR EACH ROW EXECUTE FUNCTION public.extranet_quality_actions_set_updated_at();
