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
