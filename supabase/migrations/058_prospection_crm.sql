-- ============================================================
-- Prospection CRM V1 — étend prospects + emails / actions / modèles
-- Ne casse pas le flux RDV (insert anonyme prospects inchangé)
-- ============================================================

-- Entreprises (optionnel, lié au prospect)
CREATE TABLE IF NOT EXISTS public.prospecting_companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  website text,
  type_structure text,
  taille text,
  corps_metier text,
  effectif_approx text,
  departement text,
  ville text,
  region text DEFAULT 'Île-de-France',
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_prospecting_companies_name_lower
  ON public.prospecting_companies (lower(name));

-- Colonnes CRM sur prospects (coexistent avec qualification RDV)
ALTER TABLE public.prospects
  ADD COLUMN IF NOT EXISTS linkedin_url text,
  ADD COLUMN IF NOT EXISTS site_web text,
  ADD COLUMN IF NOT EXISTS ville text,
  ADD COLUMN IF NOT EXISTS departement text,
  ADD COLUMN IF NOT EXISTS region text DEFAULT 'Île-de-France',
  ADD COLUMN IF NOT EXISTS type_structure text,
  ADD COLUMN IF NOT EXISTS corps_metier text,
  ADD COLUMN IF NOT EXISTS effectif_approx text,
  ADD COLUMN IF NOT EXISTS besoins_identifies text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS formations_interessees text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS source_prospect text,
  ADD COLUMN IF NOT EXISTS notes_crm text,
  ADD COLUMN IF NOT EXISTS statut text DEFAULT 'a_contacter',
  ADD COLUMN IF NOT EXISTS dernier_contact_at timestamptz,
  ADD COLUMN IF NOT EXISTS prochaine_relance_at timestamptz,
  ADD COLUMN IF NOT EXISTS company_id uuid REFERENCES public.prospecting_companies(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

-- Backfill statut depuis pipeline_etape si vide
UPDATE public.prospects
SET statut = CASE pipeline_etape
  WHEN 'nouveaux' THEN 'a_contacter'
  WHEN 'rdv_programme' THEN 'rdv_prevu'
  WHEN 'proposition_envoyee' THEN 'proposition_envoyee'
  WHEN 'negociation' THEN 'opportunite'
  WHEN 'client_gagne' THEN 'client'
  WHEN 'client_perdu' THEN 'pas_interesse'
  ELSE coalesce(statut, 'a_contacter')
END
WHERE statut IS NULL OR statut = 'a_contacter';

CREATE INDEX IF NOT EXISTS idx_prospects_statut ON public.prospects(statut);
CREATE INDEX IF NOT EXISTS idx_prospects_departement ON public.prospects(departement);
CREATE INDEX IF NOT EXISTS idx_prospects_prochaine_relance ON public.prospects(prochaine_relance_at);
CREATE INDEX IF NOT EXISTS idx_prospects_type_structure ON public.prospects(type_structure);

-- Historique emails de prospection
CREATE TABLE IF NOT EXISTS public.prospecting_emails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prospect_id uuid NOT NULL REFERENCES public.prospects(id) ON DELETE CASCADE,
  subject text NOT NULL,
  body text NOT NULL,
  email_type text NOT NULL DEFAULT 'autre',
  status text NOT NULL DEFAULT 'brouillon',
  campaign_id uuid,
  sent_at timestamptz,
  response_text text,
  response_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_prospecting_emails_prospect
  ON public.prospecting_emails(prospect_id, created_at DESC);

-- Timeline / actions
CREATE TABLE IF NOT EXISTS public.prospecting_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prospect_id uuid NOT NULL REFERENCES public.prospects(id) ON DELETE CASCADE,
  action_type text NOT NULL,
  title text NOT NULL,
  details text,
  due_at timestamptz,
  completed_at timestamptz,
  email_id uuid REFERENCES public.prospecting_emails(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_prospecting_actions_prospect
  ON public.prospecting_actions(prospect_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_prospecting_actions_due
  ON public.prospecting_actions(due_at)
  WHERE completed_at IS NULL;

-- Modèles d'emails
CREATE TABLE IF NOT EXISTS public.prospecting_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  target_type text,
  email_type text NOT NULL DEFAULT 'premier_contact',
  subject_template text NOT NULL,
  body_template text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Campagnes (structure V1, UI légère)
CREATE TABLE IF NOT EXISTS public.prospecting_campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  target_summary text,
  template_id uuid REFERENCES public.prospecting_templates(id) ON DELETE SET NULL,
  launched_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS public.prospecting_campaign_contacts (
  campaign_id uuid NOT NULL REFERENCES public.prospecting_campaigns(id) ON DELETE CASCADE,
  prospect_id uuid NOT NULL REFERENCES public.prospects(id) ON DELETE CASCADE,
  added_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (campaign_id, prospect_id)
);

ALTER TABLE public.prospecting_emails
  DROP CONSTRAINT IF EXISTS prospecting_emails_campaign_id_fkey;
ALTER TABLE public.prospecting_emails
  ADD CONSTRAINT prospecting_emails_campaign_id_fkey
  FOREIGN KEY (campaign_id) REFERENCES public.prospecting_campaigns(id) ON DELETE SET NULL;

-- RLS
ALTER TABLE public.prospecting_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prospecting_emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prospecting_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prospecting_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prospecting_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prospecting_campaign_contacts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "prospecting_companies_staff" ON public.prospecting_companies;
CREATE POLICY "prospecting_companies_staff" ON public.prospecting_companies
  FOR ALL USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

DROP POLICY IF EXISTS "prospecting_emails_staff" ON public.prospecting_emails;
CREATE POLICY "prospecting_emails_staff" ON public.prospecting_emails
  FOR ALL USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

DROP POLICY IF EXISTS "prospecting_actions_staff" ON public.prospecting_actions;
CREATE POLICY "prospecting_actions_staff" ON public.prospecting_actions
  FOR ALL USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

DROP POLICY IF EXISTS "prospecting_templates_staff" ON public.prospecting_templates;
CREATE POLICY "prospecting_templates_staff" ON public.prospecting_templates
  FOR ALL USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

DROP POLICY IF EXISTS "prospecting_campaigns_staff" ON public.prospecting_campaigns;
CREATE POLICY "prospecting_campaigns_staff" ON public.prospecting_campaigns
  FOR ALL USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

DROP POLICY IF EXISTS "prospecting_campaign_contacts_staff" ON public.prospecting_campaign_contacts;
CREATE POLICY "prospecting_campaign_contacts_staff" ON public.prospecting_campaign_contacts
  FOR ALL USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

-- Delete prospects : staff seulement
DROP POLICY IF EXISTS "Prospects: delete staff" ON public.prospects;
CREATE POLICY "Prospects: delete staff" ON public.prospects
  FOR DELETE USING (public.is_staff(auth.uid()));

-- Seed modèles de base (idempotent par nom)
INSERT INTO public.prospecting_templates (name, target_type, email_type, subject_template, body_template)
SELECT * FROM (VALUES
  (
    'Entreprise BTP — Direction',
    'entreprise_btp',
    'premier_contact',
    '{{prenom}}, 30 min pour gagner du temps sur devis et CR chantier ?',
    E'Bonjour {{prenom}},\n\nSur le terrain BTP, devis, comptes rendus et DCE prennent souvent trop de temps.\n\nJ’accompagne des entreprises comme {{entreprise}} à utiliser ChatGPT / Claude sur ces tâches concrètes — sans jargon, en présentiel ou en visio.\n\nSeriez-vous disponible pour un échange de 20–30 minutes cette semaine ou la suivante ?\n\nBien à vous,\nLaure Olivié\nOFC Création d''Entreprise — formation IA pour le BTP'
  ),
  (
    'Entreprise BTP — Responsable formation',
    'entreprise_btp',
    'premier_contact',
    'Formation IA BTP pour vos équipes — {{entreprise}}',
    E'Bonjour {{prenom}},\n\nVous pilotez peut-être déjà des parcours Qualiopi côté {{entreprise}}.\n\nJe propose des sessions IA / ChatGPT orientées métier BTP (devis, AO, chantier) — finançables OPCO selon éligibilité.\n\nSouhaitez-vous que je vous envoie un programme type adapté à votre public ?\n\nCordialement,\nLaure Olivié'
  ),
  (
    'FFB — Adhérents & ateliers',
    'ffb',
    'premier_contact',
    'Ateliers IA pour vos adhérents artisans / PME BTP',
    E'Bonjour {{prenom}},\n\nLes adhérents FFB me demandent souvent des usages concrets de l’IA : devis, mémoire technique, administratif.\n\nJe propose des ateliers pratiques (pas de théorie IA générique) pour artisans et PME du bâtiment.\n\nPouvons-nous en parler 20 minutes pour voir ce qui serait utile à votre section ?\n\nBien cordialement,\nLaure Olivié'
  ),
  (
    'CCI — Transformation numérique TPE/PME',
    'cci',
    'premier_contact',
    'Ateliers IA productivité pour TPE/PME — {{entreprise}}',
    E'Bonjour {{prenom}},\n\nDans le cadre de vos actions transformation numérique, je propose des ateliers IA concrets pour TPE/PME (productivité, administratif, usages pro).\n\nMon ancrage est le BTP, avec une méthode transposable.\n\nAuriez-vous un créneau pour en discuter ?\n\nCordialement,\nLaure Olivié'
  ),
  (
    'CMA — Artisans & gain de temps',
    'cma',
    'premier_contact',
    'IA simple pour artisans : devis, admin, communication',
    E'Bonjour {{prenom}},\n\nLes artisans ont peu de temps : devis, mails, papier.\n\nJe forme à des usages IA simples et pratiques (pas de jargon), adaptés aux petites structures.\n\nPouvez-vous m’indiquer si un atelier ou une session collective intéresserait vos ressortissants ?\n\nBien à vous,\nLaure Olivié'
  ),
  (
    'Relance J+5',
    NULL,
    'relance_1',
    'Relance — {{entreprise}}',
    E'Bonjour {{prenom}},\n\nJe me permets un court suivi suite à mon message sur la formation IA appliquée au BTP.\n\nSi le sujet n’est pas prioritaire, dites-le-moi simplement.\nSinon, je peux vous proposer un créneau cette semaine.\n\nCordialement,\nLaure Olivié'
  ),
  (
    'Relance J+10',
    NULL,
    'relance_2',
    'Toujours d’actualité côté {{entreprise}} ?',
    E'Bonjour {{prenom}},\n\nDernier message de ma part : si une session IA métier (devis, chantier, AO) peut aider {{entreprise}}, je reste disponible pour un échange court.\n\nSinon, je ne relancerai pas davantage.\n\nBien à vous,\nLaure Olivié'
  ),
  (
    'Reprise de contact',
    NULL,
    'reprise_contact',
    'Reprise de contact — formation IA BTP',
    E'Bonjour {{prenom}},\n\nNous avions échangé il y a quelque temps au sujet de la formation IA pour le BTP.\n\nLe besoin a-t-il évolué côté {{entreprise}} ?\n\nJe peux reprendre là où nous en étions, sans repartir de zéro.\n\nCordialement,\nLaure Olivié'
  )
) AS v(name, target_type, email_type, subject_template, body_template)
WHERE NOT EXISTS (
  SELECT 1 FROM public.prospecting_templates t WHERE t.name = v.name
);
