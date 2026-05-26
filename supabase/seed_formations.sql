-- ============================================================
-- SEED : Créer toutes les formations avec objectifs, prérequis,
-- programme et modules dans la plateforme LMS
-- ============================================================
-- Exécuter dans Supabase > SQL Editor
-- Prérequis : migration 005 appliquée (colonnes objectifs, prerequis, programme)
-- ============================================================

-- Supprimer les formations existantes avec ces slugs (pour réexécuter proprement)
DELETE FROM modules WHERE course_id IN (SELECT id FROM courses WHERE slug IN (
  'ia-au-service-du-btp',
  'ia-appels-offre-btp',
  'ia-rh-btp',
  'ia-travaux-publics'
));
DELETE FROM courses WHERE slug IN (
  'ia-au-service-du-btp',
  'ia-appels-offre-btp',
  'ia-rh-btp',
  'ia-travaux-publics'
);

-- Fonction pour insérer une formation avec ses modules
DO $$
DECLARE
  cid uuid;
  mid uuid;
BEGIN
  -- 1. L'IA au service du bâtiment
  INSERT INTO courses (slug, title, description, objectifs, prerequis, programme, price, published, duration_hours, level)
  VALUES (
    'ia-au-service-du-btp',
    'L''IA au service du bâtiment',
    'Formation pratique pour identifier les usages IA utiles dans le BTP, accélérer la rédaction de devis et messages clients, structurer l''administratif (CR, relances, modèles) et repartir avec des trames et prompts prêts à l''emploi.',
    'Identifier les usages IA utiles dans le BTP · Accélérer la rédaction de devis et messages clients · Structurer l''administratif (CR, relances, modèles) · Repartir avec des trames et prompts prêts à l''emploi',
    'Aucune compétence technique requise. Ordinateur avec connexion internet. Abonnement ChatGPT recommandé.',
    'Module 1 : Devis et chiffrages — Générez vos devis en 15 min. Module 2 : Emails et relation client — Rédigez vos emails professionnels, modèles de relances. Module 3 : Comptes rendus et DOE — CR de chantier, rapports d''avancement. Module 4 : Gestion des emails et relation client — Réclamations clients, fournisseurs.',
    0,
    true,
    4,
    'débutant'
  ) RETURNING id INTO cid;

  INSERT INTO modules (course_id, title, order_index) VALUES (cid, 'Devis et chiffrages', 0) RETURNING id INTO mid;
  INSERT INTO modules (course_id, title, order_index) VALUES (cid, 'Emails et relation client', 1);
  INSERT INTO modules (course_id, title, order_index) VALUES (cid, 'Comptes rendus et DOE', 2);
  INSERT INTO modules (course_id, title, order_index) VALUES (cid, 'Gestion administrative', 3);

  -- 2. NIV-02 — L'IA appliquée aux AO (Claude Pro, Cowork & Skills)
  INSERT INTO courses (slug, title, description, objectifs, prerequis, programme, price, published, duration_hours, level)
  VALUES (
    'ia-appels-offre-btp',
    'NIVEAU 2 — L''IA appliquée aux AO : créer ses Assistants IA pour DCE et Mémoire Technique',
    'Parcours catalogue NIV-02 (4 h, 75 % pratique) : paramétrer Claude AI Pro, installer Cowork et créer des skills pour analyser les DCE et rédiger des mémoires techniques. Pour responsables d''affaires, chargés d''études et bureaux d''études BTP.',
    'Paramétrer Claude AI Pro (Projects, instructions) · Analyser un DCE via Cowork — 15 infos critiques · Structurer et rédiger un mémoire technique · Créer des skills DCE/MT personnalisés · Évaluer les contenus générés',
    'Claude Pro + Cowork installé. DCE récent et 2-3 mémoires techniques à préparer. Niveau 1 ou bases IA ; expérience AO recommandée.',
    'Module 1 — Paramétrage Claude AI Pro & Cowork (60 min) · Module 2 — Analyse express de DCE avec Cowork (1 h 15) · Module 3 — Rédiger son mémoire technique avec Cowork (1 h 30)',
    0,
    true,
    4,
    'intermediaire'
  ) RETURNING id INTO cid;

  INSERT INTO modules (course_id, title, order_index) VALUES (cid, 'Programme & ressources', 0);
  INSERT INTO modules (course_id, title, order_index) VALUES (cid, 'Module 1 — Paramétrage Claude AI Pro & Cowork', 1);
  INSERT INTO modules (course_id, title, order_index) VALUES (cid, 'Module 2 — Analyse express de DCE avec Cowork', 2);
  INSERT INTO modules (course_id, title, order_index) VALUES (cid, 'Module 3 — Rédiger son mémoire technique avec Cowork', 3);

  -- 3. Formation IA pour la Fonction RH dans le BTP
  INSERT INTO courses (slug, title, description, objectifs, prerequis, programme, price, published, duration_hours, level)
  VALUES (
    'ia-rh-btp',
    'Formation IA pour la Fonction RH dans le BTP',
    'Transformez votre fonction RH avec l''IA. Automatisez le recrutement, optimisez la GEPP, générez vos tableaux de bord RH et créez votre assistant IA personnalisé. Pour DRH et chargés de recrutement BTP.',
    'Automatiser le recrutement et la sélection · Piloter la GEPP et anticiper les compétences · Créer des tableaux de bord RH opérationnels · Construire un assistant IA RH sur-mesure',
    'Aucune compétence technique. Abonnement Claude Pro requis pour le niveau avancé.',
    'Section 1 : IA & Cartographie des usages RH — Module 1 : Comprendre l''IA et applications RH · Module 2 : Maîtrise du Prompt Engineering RH · Module 3 : IA au service de la Formation. Section 2 : GEPP, Données & Assistant IA — Module 4 : GEPP & Anticiper les compétences · Module 5 : Construire ses KPI RH · Module 6 : Création d''un assistant IA RH.',
    0,
    true,
    14,
    'intermediaire'
  ) RETURNING id INTO cid;

  INSERT INTO modules (course_id, title, order_index) VALUES (cid, 'IA & Cartographie des usages RH', 0);
  INSERT INTO modules (course_id, title, order_index) VALUES (cid, 'Maîtrise du Prompt Engineering RH', 1);
  INSERT INTO modules (course_id, title, order_index) VALUES (cid, 'IA au service de la Formation', 2);
  INSERT INTO modules (course_id, title, order_index) VALUES (cid, 'GEPP & Anticiper les compétences', 3);
  INSERT INTO modules (course_id, title, order_index) VALUES (cid, 'Construire ses KPI RH avec l''IA', 4);
  INSERT INTO modules (course_id, title, order_index) VALUES (cid, 'Création d''un assistant IA RH', 5);

  -- 4. L'IA au service des Travaux Publics
  INSERT INTO courses (slug, title, description, objectifs, prerequis, programme, price, published, duration_hours, level)
  VALUES (
    'ia-travaux-publics',
    'L''IA au service des Travaux Publics',
    'Formation immersive en 2 jours : maîtriser l''IA pour les Travaux Publics, analyser DCE/CCTP, rédiger rapports chantier et créer votre assistant IA métier. Pour dirigeants et conducteurs de travaux TP.',
    'Analyser DCE, CCTP et comptes rendus chantier · Rédiger rapports et réponses appels d''offres · Créer votre assistant IA métier TP',
    'Aucune compétence technique. Comptes gratuits IA possibles (Claude, ChatGPT, Gemini).',
    'Section 1 : IA & TP — Module 1 : Introduction à l''IA dans les TP · Module 2 : Analyse automatisée de documents techniques · Module 3 : Rédaction assistée et prompt engineering. Section 2 : Assistant IA — Module 4 : Comprendre et concevoir un assistant IA · Module 5 : Créer et configurer votre assistant · Module 6 : Atelier final et plan d''action.',
    0,
    true,
    14,
    'débutant'
  ) RETURNING id INTO cid;

  INSERT INTO modules (course_id, title, order_index) VALUES (cid, 'Introduction à l''IA dans les Travaux Publics', 0);
  INSERT INTO modules (course_id, title, order_index) VALUES (cid, 'Analyse automatisée de documents techniques', 1);
  INSERT INTO modules (course_id, title, order_index) VALUES (cid, 'Rédaction assistée et prompt engineering', 2);
  INSERT INTO modules (course_id, title, order_index) VALUES (cid, 'Comprendre et concevoir un assistant IA', 3);
  INSERT INTO modules (course_id, title, order_index) VALUES (cid, 'Créer et configurer votre assistant IA', 4);
  INSERT INTO modules (course_id, title, order_index) VALUES (cid, 'Atelier final et plan d''action IA TP', 5);

END $$;
