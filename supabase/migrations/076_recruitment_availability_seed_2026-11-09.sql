-- Disponibilités candidat + import jour entretiens 9/11/2026

ALTER TABLE public.recruitment_candidats
  ADD COLUMN IF NOT EXISTS availability_notes text;

COMMENT ON COLUMN public.recruitment_candidats.availability_notes IS
  'Disponibilités 2027, mobilité IDF, contraintes agenda (saisie admin).';

-- Virginie Waechter
INSERT INTO public.recruitment_candidats (
  first_name, last_name, email, phone, city, btp_background, ai_usage, availability_notes,
  source, formations, stage, status, is_example
)
SELECT
  'Virginie', 'Waechter',
  'virginie.waechter@gmail.com', '06 73 14 67 61', 'Aude (à confirmer)',
  'Ingénieure ENGEES, ~24 ans TP/GC : DG PME, dir. op. terrassement (11), DP DEME/NGE (EOLE 75), dir. travaux A61.',
  'Non documenté sur le CV — à qualifier en entretien (ChatGPT/Claude, cas chantier ou AO).',
  'Dernières bases Aude (11) · expérience ponctuelle Paris (EOLE). À confirmer : jours/mois présentiel 75012 en 2027, statut, NDA.',
  'linkedin', ARRAY['niv-03', 'niv-02', 'niv-05']::text[], 1, 'a_confirmer', false
WHERE NOT EXISTS (
  SELECT 1 FROM public.recruitment_candidats WHERE lower(email) = lower('virginie.waechter@gmail.com')
);

UPDATE public.recruitment_candidats SET
  phone = '06 73 14 67 61',
  btp_background = 'Ingénieure ENGEES, ~24 ans TP/GC : DG PME, dir. op. terrassement (11), DP DEME/NGE (EOLE 75), dir. travaux A61.',
  ai_usage = 'Non documenté sur le CV — à qualifier en entretien (ChatGPT/Claude, cas chantier ou AO).',
  availability_notes = 'Dernières bases Aude (11) · expérience ponctuelle Paris (EOLE). À confirmer : jours/mois présentiel 75012 en 2027, statut, NDA.',
  formations = ARRAY['niv-03', 'niv-02', 'niv-05']::text[]
WHERE lower(email) = lower('virginie.waechter@gmail.com') AND is_example = false;

-- Stéphanie Barge
INSERT INTO public.recruitment_candidats (
  first_name, last_name, email, phone, city, legal_status, nda, btp_background, ai_usage, availability_notes,
  source, formations, stage, status, is_example
)
SELECT
  'Stéphanie', 'Barge',
  'stephaniebarge@passion-referencement.fr', '06 21 42 12 61', 'Grasse (06)', 'micro_entreprise', '93061254106',
  'BTP depuis 2000, associée LANDSCAPE TERRASSEMENTS (06). Devis, DCE, factures, CR chantier.',
  'Claude + ChatGPT quotidien (skills devis, DCE, factures). Formations pros depuis 2023, France Num.',
  'Basée PACA (06). Mobilité Paris 12e à chiffrer (jours/mois 2027). Attention annonce « distanciel » : catalogue OFC présentiel IDF.',
  'linkedin', ARRAY['niv-01', 'niv-02', 'niv-04', 'niv-10']::text[], 1, 'a_confirmer', false
WHERE NOT EXISTS (
  SELECT 1 FROM public.recruitment_candidats WHERE lower(email) = lower('stephaniebarge@passion-referencement.fr')
);

UPDATE public.recruitment_candidats SET
  nda = '93061254106',
  btp_background = 'BTP depuis 2000, associée LANDSCAPE TERRASSEMENTS (06). Devis, DCE, factures, CR chantier.',
  ai_usage = 'Claude + ChatGPT quotidien (skills devis, DCE, factures). Formations pros depuis 2023, France Num.',
  availability_notes = 'Basée PACA (06). Mobilité Paris 12e à chiffrer (jours/mois 2027). Attention annonce « distanciel » : catalogue OFC présentiel IDF.',
  formations = ARRAY['niv-01', 'niv-02', 'niv-04', 'niv-10']::text[]
WHERE lower(email) = lower('stephaniebarge@passion-referencement.fr') AND is_example = false;

-- Lucas Benavenuto
INSERT INTO public.recruitment_candidats (
  first_name, last_name, email, phone, city, btp_background, ai_usage, availability_notes,
  source, formations, stage, status, is_example
)
SELECT
  'Lucas Rafael', 'Benavenuto',
  'lrafaelpeytavin@gmail.com', '06 99 57 30 43', 'Île-de-France',
  'Consultant LLMOps (Nexus OS). Pas de parcours BTP sur le CV.',
  'RAG, agents, Azure — hors périmètre courant OFC ; vérifier vulgarisation BTP.',
  'IDF · disponible rapidement (CV).',
  'linkedin', ARRAY[]::text[], 1, 'a_confirmer', false
WHERE NOT EXISTS (
  SELECT 1 FROM public.recruitment_candidats WHERE lower(email) = lower('lrafaelpeytavin@gmail.com')
);

UPDATE public.recruitment_candidats SET
  btp_background = 'Consultant LLMOps (Nexus OS). Pas de parcours BTP sur le CV.',
  ai_usage = 'RAG, agents, Azure — hors périmètre courant OFC ; vérifier vulgarisation BTP.',
  availability_notes = 'IDF · disponible rapidement (CV).'
WHERE lower(email) = lower('lrafaelpeytavin@gmail.com') AND is_example = false;

-- Dmitrii Panov
INSERT INTO public.recruitment_candidats (
  first_name, last_name, email, phone, city, siret, nda, btp_background, ai_usage, availability_notes,
  source, formations, stage, status, is_example
)
SELECT
  'Dmitrii', 'Panov',
  'formpro.contact@gmail.com', '07 71 10 61 61', 'Neuilly-sur-Marne (93)',
  '83483454100015', '11931098393',
  'Formateur prévention BTP (SST, amiante) — accompagnement chantier devis/mémo/PPSPS. Pas d’IA sur CV.',
  'Non mentionné — profil prévention plutôt que formateur IA catalogue.',
  '93 — mobilité Paris 12e à confirmer.',
  'site', ARRAY[]::text[], 1, 'a_confirmer', false
WHERE NOT EXISTS (
  SELECT 1 FROM public.recruitment_candidats WHERE lower(email) = lower('formpro.contact@gmail.com')
);

UPDATE public.recruitment_candidats SET
  siret = '83483454100015',
  nda = '11931098393',
  btp_background = 'Formateur prévention BTP (SST, amiante) — accompagnement chantier devis/mémo/PPSPS. Pas d’IA sur CV.',
  ai_usage = 'Non mentionné — profil prévention plutôt que formateur IA catalogue.',
  availability_notes = '93 — mobilité Paris 12e à confirmer.'
WHERE lower(email) = lower('formpro.contact@gmail.com') AND is_example = false;

-- Louis NDAM
INSERT INTO public.recruitment_candidats (
  first_name, last_name, email, phone, city, btp_background, ai_usage, availability_notes,
  source, formations, stage, status, is_example
)
SELECT
  'Louis', 'NDAM',
  'louis.ndam@hotmail.fr', '06 26 22 48 37', 'Carrières-sous-Poissy (78)',
  'Reporting Grand Paris Express (SGP) — suivi ETP. Ex EDF. MOA/ingénierie, pas entreprise BTP.',
  'IA quotidienne (synthèses, tableaux de bord). Formateur CNFPT — pratique Copilot à aligner sur ChatGPT/Claude OFC.',
  'Présentiel IDF (lettre 28/10/2026). Croiser avec stage CNFPT 25 fév. et 9 mars 2027.',
  'site', ARRAY['niv-01', 'niv-02', 'niv-03']::text[], 1, 'a_confirmer', false
WHERE NOT EXISTS (
  SELECT 1 FROM public.recruitment_candidats WHERE lower(email) = lower('louis.ndam@hotmail.fr')
);

UPDATE public.recruitment_candidats SET
  btp_background = 'Reporting Grand Paris Express (SGP) — suivi ETP. Ex EDF. MOA/ingénierie, pas entreprise BTP.',
  ai_usage = 'IA quotidienne (synthèses, tableaux de bord). Formateur CNFPT — pratique Copilot à aligner sur ChatGPT/Claude OFC.',
  availability_notes = 'Présentiel IDF (lettre 28/10/2026). Croiser avec stage CNFPT 25 fév. et 9 mars 2027.',
  formations = ARRAY['niv-01', 'niv-02', 'niv-03']::text[]
WHERE lower(email) = lower('louis.ndam@hotmail.fr') AND is_example = false;
