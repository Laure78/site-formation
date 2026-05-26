-- ============================================================
-- SEED : Répondre aux appels d'offres BTP — NIV-02 Claude Cowork (2026)
-- ============================================================
-- Prérequis : cours slug `ia-appels-offre-btp` — exécuter d'abord
--   supabase/migrations/028_course_ia_appels_offre_claude_cowork.sql
--   ou supabase/patch_appels_offres_modules.sql
-- Ce fichier recrée uniquement les leçons (modules 0–3 requis).
-- ============================================================

DO $$
DECLARE
  cid uuid;
  m0 uuid;
  m1 uuid;
  m2 uuid;
  m3 uuid;
BEGIN
  SELECT id INTO cid FROM courses WHERE slug = 'ia-appels-offre-btp';
  IF cid IS NULL THEN
    RAISE EXCEPTION 'Cours ia-appels-offre-btp introuvable. Exécutez patch_appels_offres_modules.sql ou migration 028.';
  END IF;

  SELECT id INTO m0 FROM modules WHERE course_id = cid AND order_index = 0;
  SELECT id INTO m1 FROM modules WHERE course_id = cid AND order_index = 1;
  SELECT id INTO m2 FROM modules WHERE course_id = cid AND order_index = 2;
  SELECT id INTO m3 FROM modules WHERE course_id = cid AND order_index = 3;

  IF m0 IS NULL OR m1 IS NULL OR m2 IS NULL OR m3 IS NULL THEN
    RAISE EXCEPTION 'Les 4 modules (order_index 0–3) sont requis. Exécutez migration 028 ou patch_appels_offres_modules.sql.';
  END IF;

  DELETE FROM lessons WHERE module_id IN (SELECT id FROM modules WHERE course_id = cid);

  INSERT INTO lessons (module_id, title, type, content_url, content_text, order_index, duration_minutes)
  VALUES
    (
      m0,
      'Programme de formation NIV-02 (PDF)',
      'pdf',
      '/formations/ia-appels-offre-btp/Programme_IA_AO_DCE_MT_ClaudePro_OFC.pdf',
      NULL,
      0,
      15
    ),
    (
      m0,
      'Prérequis techniques et documents à préparer',
      'texte',
      NULL,
      '<p><strong>Avant la session</strong>, vérifiez :</p><ul><li>Abonnement <strong>Claude Pro</strong> (Anthropic) — 20 €/mois</li><li><strong>Cowork</strong> installé sur le poste de travail</li><li>Un <strong>DCE complet récent</strong> (RC + CCAP + CCTP)</li><li><strong>2 à 3 mémoires techniques</strong> de votre entreprise</li></ul><p>Prérequis pédagogiques : session niveau 1 ou maîtrise des bases d''une IA générative ; avoir rédigé au moins 3 mémoires techniques ou participé à des réponses AO.</p>',
      1,
      10
    ),
    (
      m0,
      'Kit 7 prompts AO BTP (HTML)',
      'texte',
      NULL,
      '<p>Bibliothèque de prompts pour démarrer sur vos dossiers AO.</p><p><a href="/formations/ia-appels-offre-btp/Kit_IA_AO_BTP_7_prompts.html" target="_blank" rel="noopener noreferrer">Ouvrir le kit 7 prompts AO BTP</a> — imprimable en PDF depuis le navigateur.</p>',
      2,
      10
    ),
    (
      m0,
      'Bibliothèque de prompts — analyse DCE / AO BTP (Google Sheets)',
      'texte',
      NULL,
      '<p><strong>Bibliothèque de prompts IA</strong> — analyse DCE et mémoire technique BTP (OFC Création d''Entreprise).</p><p>Prompts prêts à l''emploi pour <strong>Claude AI Pro</strong> et <strong>Cowork</strong> (skills DCE / MT).</p><p><a href="https://docs.google.com/spreadsheets/d/15FRq4A_qCpTcYuz3gzR85RrWAhqFn9cd/edit?usp=sharing" target="_blank" rel="noopener noreferrer">Ouvrir la bibliothèque de prompts (Google Sheets)</a></p>',
      3,
      10
    );

  INSERT INTO lessons (module_id, title, type, content_url, content_text, order_index, duration_minutes)
  VALUES (
    m1,
    'Paramétrage Claude Pro, Projects et premier skill Cowork',
    'texte',
    NULL,
    '<p><strong>Durée en session : 60 min</strong> — Cowork · Projects · Skill Creator</p><h3>Contenu</h3><ul><li>Créer son compte Claude Pro — interface, Projects, choix du modèle (Sonnet / Opus / Haiku)</li><li>Organiser ses Projects par client ou type d''AO, rédiger ses instructions personnalisées (System Prompt)</li><li>Uploader sa base documentaire entreprise (MT types, références, procédures QSE)</li><li>Installer Cowork — logique des skills (déclenchement, instructions, livrables)</li><li>Créer un premier skill personnalisé alimenté par ses données entreprise</li><li>Workflow : analyse DCE → plan MT → rédaction section par section</li></ul><p><strong>Livrable :</strong> compte Claude Pro configuré + Project dédié AO + Cowork installé + premier skill créé.</p>',
    0,
    60
  );

  INSERT INTO lessons (module_id, title, type, content_url, content_text, order_index, duration_minutes)
  VALUES (
    m2,
    'Skill « Analyse DCE » — 15 infos critiques et verdict Go / No Go',
    'texte',
    NULL,
    '<p><strong>Durée en session : 1 h 15</strong> — Skill « Analyse DCE »</p><h3>Contenu</h3><ul><li>Méthodologie d''analyse : 3 niveaux de lecture, priorisation des pièces, 15 infos critiques à extraire</li><li>Upload du DCE complet dans Cowork → extraction (critères, clauses, pénalités, délais)</li><li>Décortiquer le CCAP (risques financiers) et synthétiser le CCTP (normes, matériaux, moyens)</li><li>Adapter le skill à son métier (étanchéité, gros œuvre, VRD…) + veille AO</li></ul><p><strong>Livrable :</strong> fiche synthèse DCE automatisée + skill d''analyse DCE personnalisé.</p>',
    0,
    75
  );

  INSERT INTO lessons (module_id, title, type, content_url, content_text, order_index, duration_minutes)
  VALUES (
    m3,
    'Skill « Mémoire Technique » — MT Word et skills productivité',
    'texte',
    NULL,
    '<p><strong>Durée en session : 1 h 30</strong> — Skill « Mémoire Technique »</p><h3>Contenu</h3><ul><li>Construire le plan de MT optimal adapté aux critères et pondérations du DCE</li><li>Rédiger : présentation entreprise, méthodologie, moyens et engagements QSE</li><li>Générer un MT Word complet via Cowork</li><li>Contrôler et humaniser les sorties IA : anti-hallucination et relecture experte</li><li>Skill MT aux couleurs de l''entreprise + skill productivité</li></ul><p><strong>Livrable :</strong> MT Word + skills MT et productivité personnalisés + 15 prompts AO BTP.</p>',
    0,
    90
  );
END $$;
