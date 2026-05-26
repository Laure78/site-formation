-- ============================================================
-- NIV-02 — Programme 2026 : Claude AI Pro, Cowork & Skills
-- Cours LMS slug : ia-appels-offre-btp
-- ============================================================
-- Met à jour métadonnées, modules (Programme + 3 modules) et leçons.
-- PDF : /formations/ia-appels-offre-btp/Programme_IA_AO_DCE_MT_ClaudePro_OFC.pdf
-- ============================================================

DO $$
DECLARE
  cid uuid;
  m0 uuid;
  m1 uuid;
  m2 uuid;
  m3 uuid;
BEGIN
  SELECT id INTO cid FROM public.courses WHERE slug = 'ia-appels-offre-btp';

  IF cid IS NULL THEN
    INSERT INTO public.courses (
      slug, title, description, objectifs, prerequis, programme,
      price, published, duration_hours, level, category
    )
    VALUES (
      'ia-appels-offre-btp',
      'NIVEAU 2 — L''IA appliquée aux AO : créer ses Assistants IA pour DCE et Mémoire Technique',
      'Parcours catalogue NIV-02 (4 h, 75 % pratique) : paramétrer Claude AI Pro, installer Cowork et créer des skills pour analyser les DCE, structurer et rédiger des mémoires techniques. Outil exclusif : Claude AI Pro (Anthropic) — Cowork & Skills.',
      'Paramétrer Claude AI Pro (Projects, instructions) pour ses appels d''offres · Analyser un DCE via Cowork — 15 informations critiques · Structurer et rédiger un mémoire technique avec skills Cowork · Créer des skills DCE/MT personnalisés réutilisables · Évaluer et personnaliser les contenus générés',
      'Prérequis techniques : abonnement Claude Pro (20 €/mois), Cowork installé, DCE complet récent (RC + CCAP + CCTP) et 2 à 3 mémoires techniques. Prérequis pédagogiques : niveau 1 ou bases IA générative ; au moins 3 mémoires techniques ou expérience AO.',
      'Module 1 — Paramétrage Claude AI Pro & Cowork (60 min) · Module 2 — Analyse express de DCE avec Cowork (1 h 15) · Module 3 — Rédiger son mémoire technique avec Cowork (1 h 30)',
      0,
      true,
      4,
      'intermediaire',
      'BTP'
    )
    RETURNING id INTO cid;
  ELSE
    UPDATE public.courses SET
      title = 'NIVEAU 2 — L''IA appliquée aux AO : créer ses Assistants IA pour DCE et Mémoire Technique',
      description = 'Parcours catalogue NIV-02 (4 h, 75 % pratique) : paramétrer Claude AI Pro, installer Cowork et créer des skills pour analyser les DCE, structurer et rédiger des mémoires techniques. Outil exclusif : Claude AI Pro (Anthropic) — Cowork & Skills.',
      objectifs = 'Paramétrer Claude AI Pro (Projects, instructions) pour ses appels d''offres · Analyser un DCE via Cowork — 15 informations critiques · Structurer et rédiger un mémoire technique avec skills Cowork · Créer des skills DCE/MT personnalisés réutilisables · Évaluer et personnaliser les contenus générés',
      prerequis = 'Prérequis techniques : abonnement Claude Pro (20 €/mois), Cowork installé, DCE complet récent (RC + CCAP + CCTP) et 2 à 3 mémoires techniques. Prérequis pédagogiques : niveau 1 ou bases IA générative ; au moins 3 mémoires techniques ou expérience AO.',
      programme = 'Module 1 — Paramétrage Claude AI Pro & Cowork (60 min) · Module 2 — Analyse express de DCE avec Cowork (1 h 15) · Module 3 — Rédiger son mémoire technique avec Cowork (1 h 30)',
      duration_hours = 4,
      level = 'intermediaire',
      published = true,
      updated_at = now()
    WHERE id = cid;
  END IF;

  DELETE FROM public.lessons WHERE module_id IN (SELECT id FROM public.modules WHERE course_id = cid);
  DELETE FROM public.modules WHERE course_id = cid;

  INSERT INTO public.modules (course_id, title, order_index)
  VALUES (cid, 'Programme & ressources', 0)
  RETURNING id INTO m0;

  INSERT INTO public.modules (course_id, title, order_index)
  VALUES (cid, 'Module 1 — Paramétrage Claude AI Pro & Cowork', 1)
  RETURNING id INTO m1;

  INSERT INTO public.modules (course_id, title, order_index)
  VALUES (cid, 'Module 2 — Analyse express de DCE avec Cowork', 2)
  RETURNING id INTO m2;

  INSERT INTO public.modules (course_id, title, order_index)
  VALUES (cid, 'Module 3 — Rédiger son mémoire technique avec Cowork', 3)
  RETURNING id INTO m3;

  -- Module 0 : programme et ressources
  INSERT INTO public.lessons (module_id, title, type, content_url, content_text, order_index, duration_minutes)
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
      '<p><strong>Bibliothèque de prompts IA</strong> — analyse DCE et mémoire technique BTP (OFC Création d''Entreprise).</p><p>Prompts prêts à l''emploi pour <strong>Claude AI Pro</strong> et <strong>Cowork</strong> (skills DCE / MT) — à adapter avec vos pièces de marché.</p><p><a href="https://docs.google.com/spreadsheets/d/15FRq4A_qCpTcYuz3gzR85RrWAhqFn9cd/edit?usp=sharing" target="_blank" rel="noopener noreferrer">Ouvrir la bibliothèque de prompts (Google Sheets)</a></p>',
      3,
      10
    );

  -- Module 1
  INSERT INTO public.lessons (module_id, title, type, content_url, content_text, order_index, duration_minutes)
  VALUES (
    m1,
    'Paramétrage Claude Pro, Projects et premier skill Cowork',
    'texte',
    NULL,
    '<p><strong>Durée en session : 60 min</strong> — Cowork · Projects · Skill Creator</p><h3>Contenu</h3><ul><li>Créer son compte Claude Pro — interface, Projects, choix du modèle (Sonnet / Opus / Haiku)</li><li>Organiser ses Projects par client ou type d''AO, rédiger ses instructions personnalisées (System Prompt)</li><li>Uploader sa base documentaire entreprise (MT types, références, procédures QSE)</li><li>Installer Cowork — logique des skills (déclenchement, instructions, livrables)</li><li>Créer un premier skill personnalisé alimenté par ses données entreprise</li><li>Workflow : analyse DCE → plan MT → rédaction section par section</li></ul><p><strong>Livrable :</strong> compte Claude Pro configuré + Project dédié AO + Cowork installé + premier skill créé.</p>',
    0,
    60
  );

  -- Module 2
  INSERT INTO public.lessons (module_id, title, type, content_url, content_text, order_index, duration_minutes)
  VALUES (
    m2,
    'Skill « Analyse DCE » — 15 infos critiques et verdict Go / No Go',
    'texte',
    NULL,
    '<p><strong>Durée en session : 1 h 15</strong> — Skill « Analyse DCE »</p><h3>Contenu</h3><ul><li>Méthodologie d''analyse : 3 niveaux de lecture, priorisation des pièces, 15 infos critiques à extraire</li><li>Upload du DCE complet dans Cowork → extraction (critères, clauses, pénalités, délais)</li><li>Décortiquer le CCAP (risques financiers) et synthétiser le CCTP (normes, matériaux, moyens)</li><li>Adapter le skill à son métier (étanchéité, gros œuvre, VRD…) + veille AO</li></ul><p><strong>Atelier :</strong> fiche synthèse + tableau des 15 infos critiques + verdict Go / No Go sur un AO concret.</p><p><strong>Livrable :</strong> fiche synthèse DCE automatisée + skill d''analyse DCE personnalisé.</p>',
    0,
    75
  );

  -- Module 3
  INSERT INTO public.lessons (module_id, title, type, content_url, content_text, order_index, duration_minutes)
  VALUES (
    m3,
    'Skill « Mémoire Technique » — MT Word et skills productivité',
    'texte',
    NULL,
    '<p><strong>Durée en session : 1 h 30</strong> — Skill « Mémoire Technique »</p><h3>Contenu</h3><ul><li>Construire le plan de MT optimal adapté aux critères et pondérations du DCE — comparer 3 plans alternatifs</li><li>Rédiger : présentation entreprise, méthodologie d''exécution, moyens et engagements QSE</li><li>Générer un MT Word complet (planning Gantt, organigramme, tableaux de moyens) via Cowork</li><li>Contrôler et humaniser les sorties IA : anti-hallucination et relecture experte</li><li>Skill MT aux couleurs de l''entreprise + skill productivité (CR chantier, emails, devis)</li></ul><p><strong>Livrable :</strong> MT Word généré par Cowork + skills MT et productivité personnalisés + 15 prompts AO BTP.</p><p><strong>Rappel :</strong> validation humaine obligatoire — ne jamais déposer un mémoire sans relecture experte.</p>',
    0,
    90
  );
END $$;

-- Cours legacy redirigé vers ia-appels-offre-btp (next.config) — dépublication
UPDATE public.courses
SET published = false, updated_at = now()
WHERE slug = 'ia-niveau2-assistant-ao-dce-memoire';
