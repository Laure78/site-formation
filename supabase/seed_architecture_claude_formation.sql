-- ============================================================
-- SEED : Architecte augmenté — Claude AI, DPGF, chantier (Marquis / architecture)
-- ============================================================
-- Prérequis : migrations LMS (courses, modules, lessons)
-- Fichier statique : public/formations/ia-architecture-claude-dpgf/Programme_Formation_IA_Architecture_Marquis_FINAL.pdf
-- Exécuter dans Supabase → SQL Editor → Run
-- Niveau autorisé (constraint courses_level_check) : 'débutant' | 'intermediaire' | 'avance'
-- ============================================================

DELETE FROM courses WHERE slug = 'ia-architecture-claude-dpgf';

DO $$
DECLARE
  cid uuid;
  m0 uuid;
  m1 uuid;
  m2 uuid;
  m3 uuid;
  m4 uuid;
BEGIN
  INSERT INTO courses (
    slug,
    title,
    description,
    objectifs,
    prerequis,
    programme,
    price,
    published,
    duration_hours,
    level,
    category
  )
  VALUES (
    'ia-architecture-claude-dpgf',
    'Architecte augmenté : Claude AI, DPGF, chantier et documents',
    'Formation intra 4 h (visio) : Claude AI avec Google Drive, Sheets et Docs pour DPGF, métrés, GANTT, CR de chantier, situations de travaux, PV de réception et courriers.',
    'Analyser et compléter une DPGF ou un métré avec l''IA · Rédiger un CR depuis des notes iPad · Générer situations de travaux et PV de réception · Produire courriers et actes de marché',
    'Public : architectes, chefs de projet, collaborateurs en cabinet. Abonnement Claude AI Pro (claude.ai) à souscrire avant la session. Aucune expérience IA requise.',
    'Module 1 — Bases & configuration (45 min). Module 2 — DPGF, métrés, GANTT (1h15). Module 3 — CR, situations, PV (1h). Module 4 — Courriers & pérennisation (45 min).',
    800,
    true,
    4,
    'intermediaire',
    'Architecture'
  )
  RETURNING id INTO cid;

  INSERT INTO modules (course_id, title, order_index)
  VALUES (cid, 'Programme officiel (PDF)', 0)
  RETURNING id INTO m0;

  INSERT INTO modules (course_id, title, order_index)
  VALUES (cid, 'Module 1 — Comprendre l''IA & configuration du cabinet (45 min)', 1)
  RETURNING id INTO m1;

  INSERT INTO modules (course_id, title, order_index)
  VALUES (cid, 'Module 2 — DPGF, métrés, chiffrage & planning GANTT (1h15)', 2)
  RETURNING id INTO m2;

  INSERT INTO modules (course_id, title, order_index)
  VALUES (cid, 'Module 3 — CR de chantier, situations de travaux & PV (1h)', 3)
  RETURNING id INTO m3;

  INSERT INTO modules (course_id, title, order_index)
  VALUES (cid, 'Module 4 — Courriers, actes de marché & organisation (45 min)', 4)
  RETURNING id INTO m4;

  INSERT INTO lessons (module_id, title, type, content_url, content_text, order_index, duration_minutes)
  VALUES (
    m0,
    'Télécharger le programme de formation complet',
    'pdf',
    '/formations/ia-architecture-claude-dpgf/Programme_Formation_IA_Architecture_Marquis_FINAL.pdf',
    NULL,
    0,
    15
  );

  INSERT INTO lessons (module_id, title, type, content_url, content_text, order_index, duration_minutes)
  VALUES (
    m1,
    'Rappels — objectifs du module 1',
    'texte',
    NULL,
    '<p><strong>Outils :</strong> Claude AI + Google Drive.</p><ul><li>Prendre en main Claude AI et rédiger les premiers prompts</li><li>Créer un Projet Claude dédié au cabinet</li><li>Activer le connecteur Google Drive</li></ul><p><strong>Livrable :</strong> Projet Claude + connecteur + 5 prompts opérationnels.</p>',
    0,
    45
  );

  INSERT INTO lessons (module_id, title, type, content_url, content_text, order_index, duration_minutes)
  VALUES (
    m2,
    'Rappels — objectifs du module 2',
    'texte',
    NULL,
    '<p><strong>Outils :</strong> Claude AI + Google Sheets.</p><ul><li>Analyser et compléter une DPGF depuis Google Sheets</li><li>Générer des formulations de lots à partir d''un descriptif</li><li>Compléter les métrés et vérifier les minutes</li></ul><p><strong>Livrable :</strong> prompts « Analyse DPGF » + « Synthèse GANTT » réutilisables.</p>',
    0,
    75
  );

  INSERT INTO lessons (module_id, title, type, content_url, content_text, order_index, duration_minutes)
  VALUES (
    m3,
    'Rappels — objectifs du module 3',
    'texte',
    NULL,
    '<p><strong>Outils :</strong> Claude AI + Google Docs.</p><ul><li>Structurer un CR de chantier depuis notes iPad en 10 min</li><li>Générer une situation de travaux par lot</li><li>Rédiger un PV de réception avec liste des réserves</li></ul><p><strong>Livrable :</strong> prompts « CR iPad », « PV réception », situation de travaux.</p>',
    0,
    60
  );

  INSERT INTO lessons (module_id, title, type, content_url, content_text, order_index, duration_minutes)
  VALUES (
    m4,
    'Rappels — objectifs du module 4',
    'texte',
    NULL,
    '<p><strong>Outils :</strong> Claude AI + Google Drive.</p><ul><li>Générer ordres de service, avenants et mises en demeure</li><li>Personnaliser le modèle de courrier en-tête avec l''IA</li><li>Consolider la bibliothèque de prompts du cabinet</li></ul><p><strong>Livrable :</strong> 10 prompts opérationnels + flux de travail clé en main.</p>',
    0,
    45
  );
END $$;
