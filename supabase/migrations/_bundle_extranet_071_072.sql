-- Bundle extranet 071–074

-- === 071_extranet_formateurs.sql ===
-- ============================================================
-- Extranet formateurs indépendants (Qualiopi — dossiers, charte, traçabilité)
-- Phase 1 : profils, documents, charte, invitations, journalisation
-- ============================================================

-- --- Helpers d'accès (SECURITY DEFINER, pas de récursion RLS) ---

CREATE OR REPLACE FUNCTION public.is_org_admin(uid uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = uid AND p.role = 'admin'
  );
$$;

REVOKE ALL ON FUNCTION public.is_org_admin(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_org_admin(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_org_admin(uuid) TO service_role;

-- --- Profil extranet ---

CREATE TABLE IF NOT EXISTS public.extranet_trainers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE REFERENCES auth.users(id) ON DELETE SET NULL,
  email public.citext NOT NULL,
  first_name text,
  last_name text,
  phone text,
  specialty text,
  siret text,
  siren text,
  company_name text,
  nda_number text,
  nda_status text NOT NULL DEFAULT 'to_review'
    CHECK (nda_status IN (
      'verified',
      'submitted_pending',
      'first_activity_pending',
      'to_review'
    )),
  first_contract_at date,
  nda_declaration_deadline date,
  status text NOT NULL DEFAULT 'invited'
    CHECK (status IN ('invited', 'onboarding', 'active', 'suspended', 'archived')),
  -- Pièces conditionnelles (admin)
  requires_urssaf_vigilance boolean NOT NULL DEFAULT false,
  requires_rc_pro boolean NOT NULL DEFAULT true,
  requires_qualiopi_certificate boolean NOT NULL DEFAULT false,
  requires_pedagogy_proof boolean NOT NULL DEFAULT false,
  -- Profil métier (indicateur 21 — saisie formateur)
  btp_experience_years int,
  btp_experience_summary text,
  ia_tools_summary text,
  pedagogy_summary text,
  admin_validation_status text NOT NULL DEFAULT 'pending'
    CHECK (admin_validation_status IN ('pending', 'in_review', 'approved', 'blocked')),
  admin_notes text,
  invited_at timestamptz NOT NULL DEFAULT now(),
  activated_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (email)
);

CREATE INDEX IF NOT EXISTS idx_extranet_trainers_user ON public.extranet_trainers(user_id);
CREATE INDEX IF NOT EXISTS idx_extranet_trainers_status ON public.extranet_trainers(status);
CREATE INDEX IF NOT EXISTS idx_extranet_trainers_email ON public.extranet_trainers(email);

-- Helpers (après création de extranet_trainers — Postgres valide les relations à CREATE FUNCTION)
CREATE OR REPLACE FUNCTION public.is_extranet_trainer(uid uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.extranet_trainers t
    WHERE t.user_id = uid
      AND t.status IN ('invited', 'onboarding', 'active')
  );
$$;

REVOKE ALL ON FUNCTION public.is_extranet_trainer(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_extranet_trainer(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_extranet_trainer(uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.extranet_trainer_id(uid uuid)
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT t.id FROM public.extranet_trainers t
  WHERE t.user_id = uid
    AND t.status IN ('invited', 'onboarding', 'active')
  LIMIT 1;
$$;

REVOKE ALL ON FUNCTION public.extranet_trainer_id(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.extranet_trainer_id(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.extranet_trainer_id(uuid) TO service_role;

-- --- Types de documents ---

CREATE TABLE IF NOT EXISTS public.extranet_trainer_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trainer_id uuid NOT NULL REFERENCES public.extranet_trainers(id) ON DELETE CASCADE,
  doc_type text NOT NULL CHECK (doc_type IN (
    'cv',
    'siret_proof',
    'btp_experience',
    'diploma_or_cert',
    'ia_competencies',
    'pedagogy_proof',
    'nda_proof',
    'subcontract_contract',
    'urssaf_vigilance',
    'rc_pro',
    'qualiopi_certificate',
    'other'
  )),
  storage_path text NOT NULL,
  original_filename text NOT NULL,
  mime_type text,
  file_size_bytes bigint,
  version int NOT NULL DEFAULT 1,
  expires_at date,
  status text NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'rejected', 'expired', 'superseded')),
  admin_comment text,
  reviewed_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewed_at timestamptz,
  uploaded_at timestamptz NOT NULL DEFAULT now(),
  superseded_by uuid REFERENCES public.extranet_trainer_documents(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_extranet_docs_trainer ON public.extranet_trainer_documents(trainer_id);
CREATE INDEX IF NOT EXISTS idx_extranet_docs_type ON public.extranet_trainer_documents(trainer_id, doc_type);
CREATE INDEX IF NOT EXISTS idx_extranet_docs_status ON public.extranet_trainer_documents(status);

CREATE TABLE IF NOT EXISTS public.extranet_document_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid NOT NULL REFERENCES public.extranet_trainer_documents(id) ON DELETE CASCADE,
  trainer_id uuid NOT NULL REFERENCES public.extranet_trainers(id) ON DELETE CASCADE,
  event_type text NOT NULL CHECK (event_type IN (
    'uploaded', 'replaced', 'approved', 'rejected', 'expired', 'comment_updated'
  )),
  actor_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_extranet_doc_events_doc ON public.extranet_document_events(document_id);

-- --- Charte versionnée ---

CREATE TABLE IF NOT EXISTS public.extranet_charter_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  version_label text NOT NULL,
  title text NOT NULL DEFAULT 'Charte du formateur',
  content_md text NOT NULL,
  pdf_storage_path text,
  published_at timestamptz NOT NULL DEFAULT now(),
  is_current boolean NOT NULL DEFAULT false,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_extranet_charter_one_current
  ON public.extranet_charter_versions (is_current)
  WHERE is_current = true;

CREATE TABLE IF NOT EXISTS public.extranet_charter_acceptances (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trainer_id uuid NOT NULL REFERENCES public.extranet_trainers(id) ON DELETE CASCADE,
  charter_version_id uuid NOT NULL REFERENCES public.extranet_charter_versions(id) ON DELETE RESTRICT,
  accepted_at timestamptz NOT NULL DEFAULT now(),
  ip_hint text,
  user_agent text,
  UNIQUE (trainer_id, charter_version_id)
);

CREATE INDEX IF NOT EXISTS idx_extranet_charter_accept_trainer
  ON public.extranet_charter_acceptances(trainer_id);

-- --- Journal RGPD / audit ---

CREATE TABLE IF NOT EXISTS public.extranet_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trainer_id uuid REFERENCES public.extranet_trainers(id) ON DELETE SET NULL,
  actor_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  action text NOT NULL,
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_extranet_audit_trainer ON public.extranet_audit_log(trainer_id);
CREATE INDEX IF NOT EXISTS idx_extranet_audit_created ON public.extranet_audit_log(created_at DESC);

-- --- Invitations (lien compte auth ↔ dossier extranet) ---

CREATE TABLE IF NOT EXISTS public.extranet_trainer_invitations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trainer_id uuid NOT NULL REFERENCES public.extranet_trainers(id) ON DELETE CASCADE,
  email public.citext NOT NULL,
  token_hash text NOT NULL,
  expires_at timestamptz NOT NULL,
  accepted_at timestamptz,
  revoked_at timestamptz,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_extranet_invite_trainer ON public.extranet_trainer_invitations(trainer_id);
CREATE INDEX IF NOT EXISTS idx_extranet_invite_hash ON public.extranet_trainer_invitations(token_hash);

-- --- RLS ---

ALTER TABLE public.extranet_trainers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.extranet_trainer_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.extranet_document_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.extranet_charter_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.extranet_charter_acceptances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.extranet_audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.extranet_trainer_invitations ENABLE ROW LEVEL SECURITY;

-- Trainers : lecture / mise à jour profil limitée
DROP POLICY IF EXISTS "Extranet trainers: select own or admin" ON public.extranet_trainers;
CREATE POLICY "Extranet trainers: select own or admin" ON public.extranet_trainers
  FOR SELECT USING (
    public.is_org_admin(auth.uid())
    OR public.is_staff(auth.uid())
    OR user_id = auth.uid()
  );

DROP POLICY IF EXISTS "Extranet trainers: update own profile fields" ON public.extranet_trainers;
CREATE POLICY "Extranet trainers: update own profile fields" ON public.extranet_trainers
  FOR UPDATE USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Extranet trainers: admin manage" ON public.extranet_trainers;
CREATE POLICY "Extranet trainers: admin manage" ON public.extranet_trainers
  FOR ALL USING (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()))
  WITH CHECK (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()));

-- Documents
DROP POLICY IF EXISTS "Extranet docs: trainer read own" ON public.extranet_trainer_documents;
CREATE POLICY "Extranet docs: trainer read own" ON public.extranet_trainer_documents
  FOR SELECT USING (
    public.is_org_admin(auth.uid())
    OR public.is_staff(auth.uid())
    OR trainer_id = public.extranet_trainer_id(auth.uid())
  );

DROP POLICY IF EXISTS "Extranet docs: trainer insert own" ON public.extranet_trainer_documents;
CREATE POLICY "Extranet docs: trainer insert own" ON public.extranet_trainer_documents
  FOR INSERT WITH CHECK (
    trainer_id = public.extranet_trainer_id(auth.uid())
  );

DROP POLICY IF EXISTS "Extranet docs: admin update" ON public.extranet_trainer_documents;
CREATE POLICY "Extranet docs: admin update" ON public.extranet_trainer_documents
  FOR UPDATE USING (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()));

DROP POLICY IF EXISTS "Extranet docs: admin delete" ON public.extranet_trainer_documents;
CREATE POLICY "Extranet docs: admin delete" ON public.extranet_trainer_documents
  FOR DELETE USING (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()));

-- Events : lecture staff + own trainer ; insert via triggers / service
DROP POLICY IF EXISTS "Extranet doc events: read" ON public.extranet_document_events;
CREATE POLICY "Extranet doc events: read" ON public.extranet_document_events
  FOR SELECT USING (
    public.is_org_admin(auth.uid())
    OR public.is_staff(auth.uid())
    OR trainer_id = public.extranet_trainer_id(auth.uid())
  );

DROP POLICY IF EXISTS "Extranet doc events: insert staff or trainer" ON public.extranet_document_events;
CREATE POLICY "Extranet doc events: insert staff or trainer" ON public.extranet_document_events
  FOR INSERT WITH CHECK (
    public.is_org_admin(auth.uid())
    OR public.is_staff(auth.uid())
    OR trainer_id = public.extranet_trainer_id(auth.uid())
  );

-- Charte : lecture formateurs actifs + staff
DROP POLICY IF EXISTS "Extranet charter: read" ON public.extranet_charter_versions;
CREATE POLICY "Extranet charter: read" ON public.extranet_charter_versions
  FOR SELECT USING (
    public.is_org_admin(auth.uid())
    OR public.is_staff(auth.uid())
    OR public.is_extranet_trainer(auth.uid())
  );

DROP POLICY IF EXISTS "Extranet charter: admin write" ON public.extranet_charter_versions;
CREATE POLICY "Extranet charter: admin write" ON public.extranet_charter_versions
  FOR ALL USING (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()))
  WITH CHECK (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()));

-- Acceptations charte
DROP POLICY IF EXISTS "Extranet charter accept: read" ON public.extranet_charter_acceptances;
CREATE POLICY "Extranet charter accept: read" ON public.extranet_charter_acceptances
  FOR SELECT USING (
    public.is_org_admin(auth.uid())
    OR public.is_staff(auth.uid())
    OR trainer_id = public.extranet_trainer_id(auth.uid())
  );

DROP POLICY IF EXISTS "Extranet charter accept: insert own" ON public.extranet_charter_acceptances;
CREATE POLICY "Extranet charter accept: insert own" ON public.extranet_charter_acceptances
  FOR INSERT WITH CHECK (
    trainer_id = public.extranet_trainer_id(auth.uid())
  );

-- Audit : staff only (+ trainer read own)
DROP POLICY IF EXISTS "Extranet audit: staff" ON public.extranet_audit_log;
CREATE POLICY "Extranet audit: staff" ON public.extranet_audit_log
  FOR SELECT USING (
    public.is_org_admin(auth.uid())
    OR public.is_staff(auth.uid())
    OR trainer_id = public.extranet_trainer_id(auth.uid())
  );

DROP POLICY IF EXISTS "Extranet audit: insert staff" ON public.extranet_audit_log;
CREATE POLICY "Extranet audit: insert staff" ON public.extranet_audit_log
  FOR INSERT WITH CHECK (
    public.is_org_admin(auth.uid())
    OR public.is_staff(auth.uid())
    OR actor_id = auth.uid()
  );

-- Invitations : admin only
DROP POLICY IF EXISTS "Extranet invites: admin" ON public.extranet_trainer_invitations;
CREATE POLICY "Extranet invites: admin" ON public.extranet_trainer_invitations
  FOR ALL USING (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()))
  WITH CHECK (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()));

-- --- Stockage privé ---

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'extranet-formateurs',
  'extranet-formateurs',
  false,
  15728640,
  ARRAY[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png',
    'image/webp'
  ]::text[]
)
ON CONFLICT (id) DO UPDATE SET
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Lecture : chemins propres au formateur ou staff
DROP POLICY IF EXISTS "Extranet storage: select" ON storage.objects;
-- Ne pas drop policies globales — policies ciblées bucket
DROP POLICY IF EXISTS "Extranet storage: select own or staff" ON storage.objects;
CREATE POLICY "Extranet storage: select own or staff" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'extranet-formateurs'
    AND (
      public.is_org_admin(auth.uid())
      OR public.is_staff(auth.uid())
      OR (storage.foldername(name))[1] = public.extranet_trainer_id(auth.uid())::text
    )
  );

DROP POLICY IF EXISTS "Extranet storage: insert own" ON storage.objects;
CREATE POLICY "Extranet storage: insert own" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'extranet-formateurs'
    AND (storage.foldername(name))[1] = public.extranet_trainer_id(auth.uid())::text
  );

-- --- Charte initiale (v1) ---

INSERT INTO public.extranet_charter_versions (
  version_label,
  title,
  content_md,
  is_current
)
SELECT
  '2026-11-v1',
  'Charte du formateur Laure Olivié',
  E'# Charte du formateur\n\nEn intervenant pour **Laure Olivié** (OFC Création d''Entreprise), vous vous engagez à :\n\n1. **Respecter le programme** validé et la version de référence communiquée.\n2. **Préparer la session** (supports, scénario, timing) et confirmer votre disponibilité.\n3. **Adapter la pédagogie** aux professionnels du BTP (vocabulaire métier, exemples terrain).\n4. **Vérifier les contenus produits avec l''IA** (exactitude, confidentialité, pas de diffusion de données sensibles).\n5. **Protéger les données** des clients et des stagiaires (RGPD, confidentialité).\n6. **Tenir compte de l''accessibilité** et des adaptations pédagogiques raisonnables.\n7. **Respecter les horaires** convenus et signaler tout imprévu sans délai.\n8. **Évaluer les acquis** selon les modalités du programme.\n9. **Remonter les incidents** (sécurité, réclamation, dysfonctionnement).\n10. **Traiter les réclamations** avec l''équipe OFC selon la procédure interne.\n11. **Contribuer à l''amélioration continue** (retours de session, propositions).\n\nCette acceptation atteste votre engagement ; elle ne constitue pas une signature électronique qualifiée au sens eIDAS. Le contrat de sous-traitance fait l''objet d''une signature distincte.',
  true
WHERE NOT EXISTS (
  SELECT 1 FROM public.extranet_charter_versions WHERE version_label = '2026-11-v1'
);

-- Trigger updated_at
CREATE OR REPLACE FUNCTION public.extranet_trainers_set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_extranet_trainers_updated ON public.extranet_trainers;
CREATE TRIGGER trg_extranet_trainers_updated
  BEFORE UPDATE ON public.extranet_trainers
  FOR EACH ROW EXECUTE FUNCTION public.extranet_trainers_set_updated_at();

-- === 072_extranet_formateurs_phase2.sql ===
-- ============================================================
-- Extranet formateurs — Phase 2 : programmes, supports, missions
-- Ressources formateurs ≠ ressources apprenants (indicateur Qualiopi 19)
-- ============================================================

-- --- Programmes pédagogiques formateurs ---

CREATE TABLE IF NOT EXISTS public.extranet_programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  catalogue_code text,
  -- Lien optionnel cockpit /admin/sessions (063_training_ops) — pas de FK si non déployé
  training_program_id uuid,
  is_archived boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_extranet_programs_catalogue ON public.extranet_programs(catalogue_code);

CREATE TABLE IF NOT EXISTS public.extranet_program_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id uuid NOT NULL REFERENCES public.extranet_programs(id) ON DELETE CASCADE,
  version_label text NOT NULL,
  objectives_md text NOT NULL DEFAULT '',
  audience text NOT NULL DEFAULT '',
  prerequisites text NOT NULL DEFAULT '',
  duration_hours numeric(6,2),
  schedule_md text NOT NULL DEFAULT '',
  methods_md text NOT NULL DEFAULT '',
  evaluation_md text NOT NULL DEFAULT '',
  adaptations_md text NOT NULL DEFAULT '',
  is_current boolean NOT NULL DEFAULT false,
  published_at timestamptz NOT NULL DEFAULT now(),
  published_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (program_id, version_label)
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_extranet_program_one_current
  ON public.extranet_program_versions (program_id)
  WHERE is_current = true;

-- --- Supports formateurs (bibliothèque) ---

CREATE TABLE IF NOT EXISTS public.extranet_trainer_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id uuid REFERENCES public.extranet_programs(id) ON DELETE SET NULL,
  title text NOT NULL,
  resource_type text NOT NULL CHECK (resource_type IN (
    'presentation',
    'guide',
    'exercise',
    'prompt',
    'metier_document',
    'case_study',
    'evaluation_grid',
    'correction',
    'other'
  )),
  description text,
  storage_path text NOT NULL,
  original_filename text NOT NULL,
  mime_type text,
  file_size_bytes bigint,
  version_label text NOT NULL DEFAULT '1.0',
  is_archived boolean NOT NULL DEFAULT false,
  uploaded_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_extranet_resources_program ON public.extranet_trainer_resources(program_id);

-- --- Droits d'accès individuels ---

CREATE TABLE IF NOT EXISTS public.extranet_trainer_program_grants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trainer_id uuid NOT NULL REFERENCES public.extranet_trainers(id) ON DELETE CASCADE,
  program_id uuid NOT NULL REFERENCES public.extranet_programs(id) ON DELETE CASCADE,
  granted_at timestamptz NOT NULL DEFAULT now(),
  granted_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  UNIQUE (trainer_id, program_id)
);

CREATE TABLE IF NOT EXISTS public.extranet_trainer_resource_grants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trainer_id uuid NOT NULL REFERENCES public.extranet_trainers(id) ON DELETE CASCADE,
  resource_id uuid NOT NULL REFERENCES public.extranet_trainer_resources(id) ON DELETE CASCADE,
  granted_at timestamptz NOT NULL DEFAULT now(),
  granted_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  UNIQUE (trainer_id, resource_id)
);

-- --- Missions / interventions ---

CREATE TABLE IF NOT EXISTS public.extranet_missions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trainer_id uuid NOT NULL REFERENCES public.extranet_trainers(id) ON DELETE CASCADE,
  program_version_id uuid NOT NULL REFERENCES public.extranet_program_versions(id) ON DELETE RESTRICT,
  training_session_id uuid,
  title text NOT NULL,
  status text NOT NULL DEFAULT 'assigned'
    CHECK (status IN (
      'draft',
      'assigned',
      'confirmed',
      'in_progress',
      'completed',
      'cancelled'
    )),
  modality text NOT NULL DEFAULT 'presentiel'
    CHECK (modality IN ('presentiel', 'distanciel', 'hybride')),
  starts_on date NOT NULL,
  ends_on date,
  schedule_text text,
  duration_hours numeric(6,2),
  location_name text,
  location_address text,
  location_city text,
  client_company_name text,
  pedagogical_brief text,
  administrative_brief text,
  preparation_confirmed_at timestamptz,
  mission_order_storage_path text,
  trainer_report text,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_extranet_missions_trainer ON public.extranet_missions(trainer_id);
CREATE INDEX IF NOT EXISTS idx_extranet_missions_starts ON public.extranet_missions(starts_on);

CREATE TABLE IF NOT EXISTS public.extranet_mission_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mission_id uuid NOT NULL REFERENCES public.extranet_missions(id) ON DELETE CASCADE,
  trainer_id uuid NOT NULL REFERENCES public.extranet_trainers(id) ON DELETE CASCADE,
  doc_kind text NOT NULL CHECK (doc_kind IN (
    'attendance_sheet',
    'learning_assessment',
    'trainer_report_file',
    'mission_order',
    'other'
  )),
  storage_path text NOT NULL,
  original_filename text NOT NULL,
  mime_type text,
  uploaded_at timestamptz NOT NULL DEFAULT now(),
  uploaded_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_extranet_mission_docs_mission ON public.extranet_mission_documents(mission_id);

-- --- RLS ---

ALTER TABLE public.extranet_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.extranet_program_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.extranet_trainer_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.extranet_trainer_program_grants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.extranet_trainer_resource_grants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.extranet_missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.extranet_mission_documents ENABLE ROW LEVEL SECURITY;

-- Programmes : staff ou formateur avec grant
CREATE POLICY "Extranet programs: staff all" ON public.extranet_programs
  FOR ALL USING (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()))
  WITH CHECK (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()));

CREATE POLICY "Extranet programs: trainer read granted" ON public.extranet_programs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.extranet_trainer_program_grants g
      WHERE g.program_id = extranet_programs.id
        AND g.trainer_id = public.extranet_trainer_id(auth.uid())
    )
  );

CREATE POLICY "Extranet program versions: staff all" ON public.extranet_program_versions
  FOR ALL USING (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()))
  WITH CHECK (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()));

CREATE POLICY "Extranet program versions: trainer read granted" ON public.extranet_program_versions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.extranet_trainer_program_grants g
      WHERE g.program_id = extranet_program_versions.program_id
        AND g.trainer_id = public.extranet_trainer_id(auth.uid())
    )
  );

-- Ressources
CREATE POLICY "Extranet resources: staff all" ON public.extranet_trainer_resources
  FOR ALL USING (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()))
  WITH CHECK (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()));

CREATE POLICY "Extranet resources: trainer read granted" ON public.extranet_trainer_resources
  FOR SELECT USING (
    is_archived = false
    AND EXISTS (
      SELECT 1 FROM public.extranet_trainer_resource_grants g
      WHERE g.resource_id = extranet_trainer_resources.id
        AND g.trainer_id = public.extranet_trainer_id(auth.uid())
    )
  );

-- Grants : staff manage ; trainer read own
CREATE POLICY "Extranet program grants: staff" ON public.extranet_trainer_program_grants
  FOR ALL USING (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()))
  WITH CHECK (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()));

CREATE POLICY "Extranet program grants: trainer read own" ON public.extranet_trainer_program_grants
  FOR SELECT USING (trainer_id = public.extranet_trainer_id(auth.uid()));

CREATE POLICY "Extranet resource grants: staff" ON public.extranet_trainer_resource_grants
  FOR ALL USING (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()))
  WITH CHECK (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()));

CREATE POLICY "Extranet resource grants: trainer read own" ON public.extranet_trainer_resource_grants
  FOR SELECT USING (trainer_id = public.extranet_trainer_id(auth.uid()));

-- Missions
CREATE POLICY "Extranet missions: staff all" ON public.extranet_missions
  FOR ALL USING (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()))
  WITH CHECK (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()));

CREATE POLICY "Extranet missions: trainer read own" ON public.extranet_missions
  FOR SELECT USING (trainer_id = public.extranet_trainer_id(auth.uid()));

CREATE POLICY "Extranet missions: trainer update prep" ON public.extranet_missions
  FOR UPDATE USING (trainer_id = public.extranet_trainer_id(auth.uid()))
  WITH CHECK (trainer_id = public.extranet_trainer_id(auth.uid()));

CREATE POLICY "Extranet mission docs: staff all" ON public.extranet_mission_documents
  FOR ALL USING (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()))
  WITH CHECK (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()));

CREATE POLICY "Extranet mission docs: trainer own" ON public.extranet_mission_documents
  FOR SELECT USING (trainer_id = public.extranet_trainer_id(auth.uid()));

CREATE POLICY "Extranet mission docs: trainer insert own" ON public.extranet_mission_documents
  FOR INSERT WITH CHECK (trainer_id = public.extranet_trainer_id(auth.uid()));

-- Storage : supports et missions (chemins resources/ et missions/)
DROP POLICY IF EXISTS "Extranet storage: staff write resources" ON storage.objects;
CREATE POLICY "Extranet storage: staff write resources" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'extranet-formateurs'
    AND (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()))
    AND (
      (storage.foldername(name))[1] = 'resources'
      OR (storage.foldername(name))[1] = 'mission-orders'
    )
  );

DROP POLICY IF EXISTS "Extranet storage: trainer mission upload" ON storage.objects;
CREATE POLICY "Extranet storage: trainer mission upload" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'extranet-formateurs'
    AND (storage.foldername(name))[1] = public.extranet_trainer_id(auth.uid())::text
    AND (storage.foldername(name))[2] = 'missions'
  );

-- Étendre lecture storage pour resources/ si grant (via signed URL service role en pratique)
DROP POLICY IF EXISTS "Extranet storage: read resources staff" ON storage.objects;
CREATE POLICY "Extranet storage: read resources staff" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'extranet-formateurs'
    AND (
      public.is_org_admin(auth.uid())
      OR public.is_staff(auth.uid())
      OR (storage.foldername(name))[1] = public.extranet_trainer_id(auth.uid())::text
    )
  );

CREATE OR REPLACE FUNCTION public.extranet_missions_set_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_extranet_missions_updated ON public.extranet_missions;
CREATE TRIGGER trg_extranet_missions_updated
  BEFORE UPDATE ON public.extranet_missions
  FOR EACH ROW EXECUTE FUNCTION public.extranet_missions_set_updated_at();

-- === 073_extranet_training_ops_fk_optional.sql ===
-- FK optionnelles vers le cockpit formation (063) — uniquement si les tables existent déjà

DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'training_programs'
  ) AND NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'extranet_programs_training_program_id_fkey'
  ) THEN
    ALTER TABLE public.extranet_programs
      ADD CONSTRAINT extranet_programs_training_program_id_fkey
      FOREIGN KEY (training_program_id) REFERENCES public.training_programs(id) ON DELETE SET NULL;
  END IF;
END $$;

DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'training_sessions'
  ) AND NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'extranet_missions_training_session_id_fkey'
  ) THEN
    ALTER TABLE public.extranet_missions
      ADD CONSTRAINT extranet_missions_training_session_id_fkey
      FOREIGN KEY (training_session_id) REFERENCES public.training_sessions(id) ON DELETE SET NULL;
  END IF;
END $$;

-- === 074_extranet_formateurs_phase3.sql ===
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
