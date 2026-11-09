-- Fiche recrutement enrichie (métier, NDA structuré, dispo, suivi vivier)

ALTER TABLE public.recruitment_candidats
  ADD COLUMN IF NOT EXISTS current_role text,
  ADD COLUMN IF NOT EXISTS nda_status text,
  ADD COLUMN IF NOT EXISTS ai_tools text,
  ADD COLUMN IF NOT EXISTS ai_competencies text,
  ADD COLUMN IF NOT EXISTS pedagogy_experience text,
  ADD COLUMN IF NOT EXISTS notice_period text,
  ADD COLUMN IF NOT EXISTS availability_summary text,
  ADD COLUMN IF NOT EXISTS triage_status text,
  ADD COLUMN IF NOT EXISTS btp_experience_status text,
  ADD COLUMN IF NOT EXISTS strengths text,
  ADD COLUMN IF NOT EXISTS to_verify text,
  ADD COLUMN IF NOT EXISTS admin_notes text;

ALTER TABLE public.recruitment_candidats DROP CONSTRAINT IF EXISTS recruitment_candidats_nda_status_check;
ALTER TABLE public.recruitment_candidats
  ADD CONSTRAINT recruitment_candidats_nda_status_check
  CHECK (
    nda_status IS NULL OR nda_status IN ('oui', 'non', 'en_cours', 'non_renseigne', 'oui_a_verifier')
  );

ALTER TABLE public.recruitment_candidats DROP CONSTRAINT IF EXISTS recruitment_candidats_triage_status_check;
ALTER TABLE public.recruitment_candidats
  ADD CONSTRAINT recruitment_candidats_triage_status_check
  CHECK (triage_status IS NULL OR triage_status IN ('identifie', 'a_evaluer'));

ALTER TABLE public.recruitment_candidats DROP CONSTRAINT IF EXISTS recruitment_candidats_btp_experience_status_check;
ALTER TABLE public.recruitment_candidats
  ADD CONSTRAINT recruitment_candidats_btp_experience_status_check
  CHECK (
    btp_experience_status IS NULL
    OR btp_experience_status IN ('confirmee', 'a_confirmer', 'absente', 'partielle')
  );

COMMENT ON COLUMN public.recruitment_candidats.nda IS 'Numéro NDA si connu (facultatif).';
COMMENT ON COLUMN public.recruitment_candidats.nda_status IS 'Statut administratif NDA (distinct du numéro).';

-- Dimitri — aligné sur formpro.contact@gmail.com (même personne que Dmitrii Panov, fusion identifiée)
UPDATE public.recruitment_candidats SET
  first_name = 'Dimitri',
  current_role = 'Chef d''entreprise dans le bâtiment',
  btp_background = 'Expertise opérationnelle et expérience terrain BTP. Connaissance des métiers du bâtiment, expérience de direction.',
  btp_experience_status = 'confirmee',
  ai_competencies = 'Non renseignées',
  ai_tools = NULL,
  ai_usage = 'Outils IA non renseignés à ce stade.',
  pedagogy_experience = NULL,
  nda_status = 'oui_a_verifier',
  nda = NULL,
  availability_summary = 'Rapide',
  availability_notes = 'Disponibilité rapide — préavis à préciser avec le candidat.',
  notice_period = 'À préciser',
  triage_status = 'identifie',
  strengths = 'Connaissance des métiers du bâtiment, expérience de direction et expertise terrain',
  to_verify = 'Spécialités métier, outils IA maîtrisés, expérience pédagogique, zone d''intervention',
  admin_notes = 'Formateur identifié — vivier OFC 2027.',
  siret = NULL,
  updated_at = now()
WHERE lower(email) = lower('formpro.contact@gmail.com') AND is_example = false;

-- Lucas — aligné sur lrafaelpeytavin@gmail.com
UPDATE public.recruitment_candidats SET
  first_name = 'Lucas',
  current_role = 'Développement d''outils IA (Codex, GitHub)',
  btp_background = 'Expérience professionnelle BTP non confirmée — ne pas présenter comme profil BTP expérimenté sans vérification.',
  btp_experience_status = 'a_confirmer',
  ai_competencies = 'Développement technique, création d''outils IA',
  ai_tools = 'Codex, GitHub',
  ai_usage = 'Réalisations : projets développés et hébergés sur GitHub.',
  pedagogy_experience = NULL,
  nda_status = 'non',
  nda = NULL,
  availability_summary = 'Rapide',
  availability_notes = 'Île-de-France — disponibilité rapide. Préavis à préciser.',
  notice_period = 'À préciser',
  triage_status = 'a_evaluer',
  strengths = 'Développement technique, création d''outils IA',
  to_verify = 'Expérience professionnelle BTP, expérience pédagogique, zone d''intervention',
  admin_notes = 'Profil à évaluer — priorité : adéquation pédagogie BTP présentiel IDF.',
  updated_at = now()
WHERE lower(email) = lower('lrafaelpeytavin@gmail.com') AND is_example = false;

-- Louis — aligné sur louis.ndam@hotmail.fr
UPDATE public.recruitment_candidats SET
  current_role = 'Formateur intervenant au CNFPT',
  btp_background = 'Lien MOA / grands travaux (reporting) — expérience entreprise BTP à confirmer en entretien.',
  btp_experience_status = 'a_confirmer',
  ai_competencies = 'Maîtrise de plusieurs solutions IA ; tableaux de bord assistés par l''IA',
  ai_tools = 'Claude, Microsoft Copilot Business, ChatGPT',
  ai_usage = 'Développement de tableaux de bord assistés par l''IA. Pédagogie CNFPT — aligner les démos sur ChatGPT et Claude en session OFC.',
  pedagogy_experience = 'Expérience d''animation en formation (CNFPT)',
  nda_status = 'en_cours',
  nda = NULL,
  availability_summary = '1 à 2 jours / semaine',
  availability_notes = 'Présentiel IDF envisageable 1 à 2 jours. Préavis minimum 1 mois.',
  notice_period = '1 mois minimum',
  triage_status = 'identifie',
  strengths = 'Expérience de formation, maîtrise de plusieurs solutions IA, création de tableaux de bord',
  to_verify = 'Expérience BTP terrain, périodicité de disponibilité, spécialités pédagogiques, zone d''intervention, validation NDA',
  admin_notes = 'Formateur identifié — statut NDA en cours d''instruction, ne pas afficher comme NDA actif.',
  updated_at = now()
WHERE lower(email) = lower('louis.ndam@hotmail.fr') AND is_example = false;
