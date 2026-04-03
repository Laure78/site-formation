-- ============================================================
-- SEED : Répondre aux appels d'offres BTP avec l'IA — supports PDF + bibliothèque de prompts
-- ============================================================
-- Prérequis : cours slug `ia-appels-offre-btp` et ses 5 modules (Introduction + 4 modules)
-- Fichiers statiques : public/formations/ia-appels-offre-btp/*.pdf
-- Google Sheets (bibliothèque de prompts DCE/AO BTP OFC) :
--   https://docs.google.com/spreadsheets/d/15FRq4A_qCpTcYuz3gzR85RrWAhqFn9cd/edit?usp=sharing
-- Exécuter dans Supabase → SQL Editor
-- Effet : supprime les leçons existantes de ce cours uniquement, puis recrée les leçons.
-- ============================================================

DO $$
DECLARE
  cid uuid;
  m0 uuid;
  m1 uuid;
  m2 uuid;
  m3 uuid;
  m4 uuid;
BEGIN
  SELECT id INTO cid FROM courses WHERE slug = 'ia-appels-offre-btp';
  IF cid IS NULL THEN
    RAISE EXCEPTION 'Cours ia-appels-offre-btp introuvable. Exécutez d''abord seed_formations.sql ou créez le cours.';
  END IF;

  SELECT id INTO m0 FROM modules WHERE course_id = cid AND order_index = 0;
  SELECT id INTO m1 FROM modules WHERE course_id = cid AND order_index = 1;
  SELECT id INTO m2 FROM modules WHERE course_id = cid AND order_index = 2;
  SELECT id INTO m3 FROM modules WHERE course_id = cid AND order_index = 3;
  SELECT id INTO m4 FROM modules WHERE course_id = cid AND order_index = 4;

  IF m0 IS NULL OR m1 IS NULL OR m2 IS NULL OR m3 IS NULL OR m4 IS NULL THEN
    RAISE EXCEPTION 'Les 5 modules (order_index 0–4) sont requis pour ia-appels-offre-btp.';
  END IF;

  DELETE FROM lessons WHERE module_id IN (SELECT id FROM modules WHERE course_id = cid);

  -- Introduction : programme, ressource complémentaire, lien bibliothèque de prompts
  INSERT INTO lessons (module_id, title, type, content_url, content_text, order_index, duration_minutes)
  VALUES
    (
      m0,
      'Programme de formation 2026 (PDF)',
      'pdf',
      '/formations/ia-appels-offre-btp/Programme_Formation_LSR_AO_BTP_2026.pdf',
      NULL,
      0,
      15
    ),
    (
      m0,
      'Support complémentaire (PDF)',
      'pdf',
      '/formations/ia-appels-offre-btp/Support_complementaire_AO_BTP.pdf',
      NULL,
      1,
      20
    ),
    (
      m0,
      'Bibliothèque de prompts — analyse DCE / AO BTP (Google Sheets)',
      'texte',
      NULL,
      '<p><strong>Bibliothèque de prompts IA</strong> — analyse DCE BTP (OFC Création d''Entreprise).</p><p>Chaque onglet du fichier propose des prompts prêts à l''emploi pour NotebookLM (avec vos pièces DCE dans le carnet) ou pour Claude en collant des extraits du marché.</p><p><a href="https://docs.google.com/spreadsheets/d/15FRq4A_qCpTcYuz3gzR85RrWAhqFn9cd/edit?usp=sharing" target="_blank" rel="noopener noreferrer">Ouvrir la bibliothèque de prompts (Google Sheets)</a></p>',
      2,
      10
    );

  INSERT INTO lessons (module_id, title, type, content_url, content_text, order_index, duration_minutes)
  VALUES
    (
      m1,
      'Support — MODULE 1 : Analyse DCE avec NotebookLM (PDF)',
      'pdf',
      '/formations/ia-appels-offre-btp/Module1_Analyse_DCE_NotebookLM.pdf',
      NULL,
      0,
      45
    );

  INSERT INTO lessons (module_id, title, type, content_url, content_text, order_index, duration_minutes)
  VALUES
    (
      m2,
      'Support — MODULE 2 : Go / No Go et rentabilité (PDF)',
      'pdf',
      '/formations/ia-appels-offre-btp/Module2_GoNoGo_IA_BTP.pdf',
      NULL,
      0,
      45
    );

  INSERT INTO lessons (module_id, title, type, content_url, content_text, order_index, duration_minutes)
  VALUES
    (
      m3,
      'Support — MODULE 3 : Mémoire technique (PDF)',
      'pdf',
      '/formations/ia-appels-offre-btp/Module3_Memoire_technique.pdf',
      NULL,
      0,
      60
    );

  INSERT INTO lessons (module_id, title, type, content_url, content_text, order_index, duration_minutes)
  VALUES
    (
      m4,
      'Support — MODULE 4 : Chiffrage et rentabilité (PDF)',
      'pdf',
      '/formations/ia-appels-offre-btp/Module4_Chiffrage_IA_BTP.pdf',
      NULL,
      0,
      45
    );
END $$;
