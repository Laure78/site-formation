-- ============================================================
-- Formation LMS — Claude IA pour le BTP : Chat, Cowork & Code
-- Client / contexte : PDF BTP (aménagement public, AO & chantier)
-- Slug : pdf-btp-claude-skills
-- Support : /formations/pdf-btp-claude-skills/Support_Claude_IA_PDF_BTP_Chat_Cowork_Code.pdf
-- Session : intra 4 h — 22 juin 2026
-- ============================================================
-- Exécuter dans Supabase → SQL Editor → Run
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
  SELECT id INTO cid FROM public.courses WHERE slug = 'pdf-btp-claude-skills';

  IF cid IS NULL THEN
    INSERT INTO public.courses (
      slug, title, description, objectifs, prerequis, programme,
      price, published, duration_hours, level, category
    )
    VALUES (
      'pdf-btp-claude-skills',
      'Claude IA pour le BTP : Chat, Cowork & Code — PDF BTP',
      'Session intra 4 h (9h-13h) pour PDF BTP : installer Claude (Chat, Cowork, Code, Design, Chrome, M365), activer 6 skills PDF BTP (DCE/DQE, CCTP organisation, CR chantier, levée des réserves, normes/hors-gel, juridique), fiabiliser les résultats et économiser les tokens. Support de formation + cas pratiques AO et chantier.',
      'Utiliser Claude (chat, app, extensions) pour le bureau d''études et le chantier · Installer l''application Claude, les connecteurs et les 6 skills PDF BTP · Lancer les skills DCE/DQE, CCTP organisation, CR de chantier, levée des réserves, normes & hors-gel, juridique · Comprendre Claude Code, Claude Design et l''extension Chrome · Fiabiliser les résultats et économiser les tokens',
      'Compte Claude Pro (≈ 18 € HT/mois) · Ordinateur avec droits d''installation (app bureau recommandée) · Connexion internet · Pièces DCE anonymisées pour les ateliers (RC, CCAP, CCTP, DQE) · Un CR de chantier et/ou un PV de réserves pour le module travaux',
      'Module 1 — Démarrer & installer (Claude, connecteurs, 6 skills, tokens) · Module 2 — Bureau d''études (skill DCE/DQE, Go/No Go) · Module 3 — Équipe travaux (CCTP orga, CR, réserves, normes) · Module 4 — Direction (assistant juridique)',
      0,
      true,
      4,
      'intermediaire',
      'BTP'
    )
    RETURNING id INTO cid;
  ELSE
    UPDATE public.courses SET
      title = 'Claude IA pour le BTP : Chat, Cowork & Code — PDF BTP',
      description = 'Session intra 4 h (9h-13h) pour PDF BTP : installer Claude (Chat, Cowork, Code, Design, Chrome, M365), activer 6 skills PDF BTP (DCE/DQE, CCTP organisation, CR chantier, levée des réserves, normes/hors-gel, juridique), fiabiliser les résultats et économiser les tokens. Support de formation + cas pratiques AO et chantier.',
      objectifs = 'Utiliser Claude (chat, app, extensions) pour le bureau d''études et le chantier · Installer l''application Claude, les connecteurs et les 6 skills PDF BTP · Lancer les skills DCE/DQE, CCTP organisation, CR de chantier, levée des réserves, normes & hors-gel, juridique · Comprendre Claude Code, Claude Design et l''extension Chrome · Fiabiliser les résultats et économiser les tokens',
      prerequis = 'Compte Claude Pro (≈ 18 € HT/mois) · Ordinateur avec droits d''installation (app bureau recommandée) · Connexion internet · Pièces DCE anonymisées pour les ateliers (RC, CCAP, CCTP, DQE) · Un CR de chantier et/ou un PV de réserves pour le module travaux',
      programme = 'Module 1 — Démarrer & installer (Claude, connecteurs, 6 skills, tokens) · Module 2 — Bureau d''études (skill DCE/DQE, Go/No Go) · Module 3 — Équipe travaux (CCTP orga, CR, réserves, normes) · Module 4 — Direction (assistant juridique)',
      duration_hours = 4,
      level = 'intermediaire',
      category = 'BTP',
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
  VALUES (cid, 'Module 1 — Démarrer avec Claude & les skills', 1)
  RETURNING id INTO m1;

  INSERT INTO public.modules (course_id, title, order_index)
  VALUES (cid, 'Module 2 — Bureau d''études — analyser un AO', 2)
  RETURNING id INTO m2;

  INSERT INTO public.modules (course_id, title, order_index)
  VALUES (cid, 'Module 3 — Équipe travaux — préparer, suivre, réceptionner', 3)
  RETURNING id INTO m3;

  INSERT INTO public.modules (course_id, title, order_index)
  VALUES (cid, 'Module 4 — Direction — assistant juridique', 4)
  RETURNING id INTO m4;

  -- Module 0
  INSERT INTO public.lessons (module_id, title, type, content_url, content_text, order_index, duration_minutes)
  VALUES
    (
      m0,
      'Support de formation — Claude IA PDF BTP (PDF)',
      'pdf',
      '/formations/pdf-btp-claude-skills/Support_Claude_IA_PDF_BTP_Chat_Cowork_Code.pdf',
      NULL,
      0,
      20
    ),
    (
      m0,
      'Objectifs de la matinée & programme (4 modules)',
      'texte',
      NULL,
      '<p><strong>Session intra PDF BTP</strong> — appels d''offres &amp; gestion de chantier — 4 h (9h-13h).</p><h3>Objectifs</h3><ol><li>Utiliser Claude (chat, app, extensions) pour le bureau d''études et le chantier</li><li>Installer l''application Claude, les connecteurs et les <strong>6 skills PDF BTP</strong></li><li>Lancer les skills : DCE/DQE · CCTP organisation · CR de chantier · levée des réserves · normes &amp; hors-gel · juridique</li><li>Comprendre Claude Code, Claude Design et l''extension Chrome</li><li>Fiabiliser les résultats et économiser les tokens</li></ol><h3>Programme</h3><ul><li><strong>Module 1</strong> — Démarrer &amp; installer</li><li><strong>Module 2</strong> — Bureau d''études (skill DCE/DQE)</li><li><strong>Module 3</strong> — Équipe travaux (CCTP, CR, réserves, normes)</li><li><strong>Module 4</strong> — Direction (assistant juridique)</li></ul><p>Formatrice : Laure Olivié — OFC Création d''Entreprise (Qualiopi).</p>',
      1,
      10
    ),
    (
      m0,
      'Les 6 skills PDF BTP à activer',
      'texte',
      NULL,
      '<p>Skills à installer une fois (Avatar → Personnaliser → Compétences) :</p><ul><li><code>pdfbtp-analyse-dce</code> — Analyse DCE/DQE (RC → CCAP → CCTP → DQE, Go/No Go)</li><li><code>pdfbtp-cctp-organisation</code> — Phasage, points d''arrêt, moyens</li><li><code>pdfbtp-cr-chantier</code> — CR MOE (PDF ou photo), actions &amp; photos</li><li><code>pdfbtp-levee-reserves</code> — Tableau de suivi + courrier de levée</li><li><code>pdfbtp-normes-construction</code> — DTU, hors-gel IDF, classes XF</li><li><code>pdfbtp-assistant-juridique</code> — Litige, mise en demeure, mémoire en réclamation</li></ul><p><strong>Rappel :</strong> Claude est un copilote — relecture humaine obligatoire avant tout envoi client ou marché.</p>',
      2,
      10
    );

  -- Module 1
  INSERT INTO public.lessons (module_id, title, type, content_url, content_text, order_index, duration_minutes)
  VALUES
    (
      m1,
      'Environnement Claude : Chat, Cowork, Code, Design, Chrome, M365',
      'texte',
      NULL,
      '<p><strong>Claude Pro</strong> (claude.ai) — Projects par AO, upload PDF jusqu''à 30 Mo, fenêtre ~200 000 tokens, skills personnalisés, confidentialité Pro (pas d''entraînement par défaut).</p><h3>Trois environnements</h3><ul><li><strong>Chat</strong> — dialoguer, résumer CCTP/RC, reformuler un courrier MOA</li><li><strong>Cowork</strong> — lire et produire Word/Excel/PDF depuis un dossier local, lancer les skills</li><li><strong>Code</strong> — traitements en lot (photos, dossiers AO, documents en série)</li></ul><h3>Extensions &amp; connecteurs</h3><ul><li>App bureau / mobile (claude.com/download)</li><li>Claude Design (visuels, fiches chantier)</li><li>Extension Chrome (pré-remplir DC1/DC2, profils acheteurs)</li><li>Connecteurs : Google Drive, Gmail, Microsoft 365, Agenda, Slack</li></ul><p><strong>Livrable :</strong> compte Pro + app installée + connecteurs utiles activés.</p>',
      0,
      35
    ),
    (
      m1,
      'Tokens : comprendre et économiser jusqu''à 80 %',
      'texte',
      NULL,
      '<p>1 token ≈ 4 caractères · 1 page A4 ≈ 500 tokens · 1 CCTP 30 p. ≈ 15 000 · 1 DCE complet ≈ 80 000 · limite Pro ≈ 200 000 tokens.</p><h3>5 leviers</h3><ol><li>Uploader le <strong>PDF</strong> plutôt que coller le texte</li><li>Utiliser un <strong>Project</strong> (upload une fois)</li><li>Demande <strong>ciblée</strong> (ex. « 5 clauses risquées, tableau »)</li><li><strong>1 sujet = 1 conversation</strong></li><li>Imposer un <strong>format</strong> de sortie</li></ol><h3>Précautions</h3><ul><li>Pas de données nominatives / RIB / NDA</li><li>Toujours vérifier chiffres, DTU, références juridiques</li><li>Vous validez — Claude propose</li></ul>',
      1,
      20
    ),
    (
      m1,
      'Mode opératoire — préparer un AO dans Claude',
      'texte',
      NULL,
      '<ol><li><strong>Télécharger le DCE</strong> (RC, CCAP, CCTP, DQE/DPGF, plans, AE) dans un dossier <code>AO-[Chantier]-[Date]</code></li><li><strong>Charger dans Claude</strong> : Project dédié ou accès dossier via Cowork / Google Drive</li><li><strong>Activer les skills</strong> pdfbtp-analyse-dce, pdfbtp-cctp-organisation, pdfbtp-normes-construction (une seule fois)</li></ol><p>Astuce : 1 projet / 1 dossier = 1 appel d''offres.</p>',
      2,
      15
    );

  -- Module 2
  INSERT INTO public.lessons (module_id, title, type, content_url, content_text, order_index, duration_minutes)
  VALUES
    (
      m2,
      'Skill analyse DCE / DQE — méthode Go / No Go',
      'texte',
      NULL,
      '<p>Le skill lit RC → CCAP → CCTP → DQE :</p><ol><li>Critères &amp; go/no-go (RC)</li><li>Exigences béton décoratif / pavage</li><li>Postes oubliés (DICT, déblais, échantillons…)</li><li>Clauses à risque (CCAP)</li><li>Recoupement DQE ↔ CCTP</li></ol><p><em>Une exigence CCTP absente du DQE = marge qui part. Repérez-la avant de remettre.</em></p>',
      0,
      30
    ),
    (
      m2,
      'Cas pratique — fiche Go / No Go sur un AO',
      'texte',
      NULL,
      '<p><strong>À charger :</strong> RC + CCAP + CCTP + DQE (ex. aménagement public — béton désactivé + pavage pierre).</p><p><strong>Skill :</strong> <code>pdfbtp-analyse-dce</code></p><blockquote>« Analyse ce DCE : critères et pondérations du RC, clauses à risque du CCAP, exigences béton décoratif et pavage du CCTP, et postes du DQE oubliés par rapport au CCTP. Sors une fiche Go / No Go. »</blockquote><p>Variante express : « Décrypte ce DCE et donne-moi le Go / No Go. »</p><p><strong>Objectif :</strong> fiche exploitable + décision en moins de 20 minutes.</p>',
      1,
      30
    );

  -- Module 3
  INSERT INTO public.lessons (module_id, title, type, content_url, content_text, order_index, duration_minutes)
  VALUES
    (
      m3,
      'Skills chantier — CCTP, CR, réserves, normes',
      'texte',
      NULL,
      '<ul><li><strong>CCTP organisation</strong> — phasage, contraintes de site, points d''arrêt, moyens</li><li><strong>CR de chantier</strong> — filtrer PDF BTP, actions, délais, photos à prendre</li><li><strong>Levée des réserves</strong> — tableau de suivi + preuves + retenue de garantie</li><li><strong>Normes &amp; hors-gel</strong> — DTU, hors-gel IDF (~0,50 m à confirmer), classes XF</li></ul>',
      0,
      25
    ),
    (
      m3,
      'Cas pratiques — 4 prompts chantier',
      'texte',
      NULL,
      '<p><code>pdfbtp-cctp-organisation</code> + CCTP :<br/>« Analyse ce CCTP pour préparer le chantier : phasage, contraintes de site, points d''arrêt et moyens à mobiliser. »</p><p><code>pdfbtp-cr-chantier</code> + CR (PDF ou photo) :<br/>« Analyse ce compte rendu : ce qui concerne PDF BTP, les actions, les délais et les photos à prendre. »</p><p><code>pdfbtp-levee-reserves</code> + PV :<br/>« Construis le tableau de suivi des réserves et rédige le courrier de demande de constat de levée. »</p><p><code>pdfbtp-normes-construction</code> :<br/>« Quelle profondeur hors-gel pour du mobilier urbain en IDF, et quelle classe XF pour un béton désactivé extérieur ? »</p>',
      1,
      35
    );

  -- Module 4
  INSERT INTO public.lessons (module_id, title, type, content_url, content_text, order_index, duration_minutes)
  VALUES
    (
      m4,
      'Skill assistant juridique — méthode',
      'texte',
      NULL,
      '<ul><li>Qualifier le litige (privé / public)</li><li>Préserver les droits (délais, preuves, réserves)</li><li>Références construction / commande publique</li><li>Rédiger : mise en demeure, mémoire en réclamation (art. 50 CCAG)</li><li>Amiable d''abord — l''IA prépare, un professionnel valide</li></ul>',
      0,
      20
    ),
    (
      m4,
      'Cas pratique — contestation de DGD (marché public)',
      'texte',
      NULL,
      '<p><strong>Contexte :</strong> le maître d''ouvrage conteste votre décompte général (DGD).</p><p><strong>Skill :</strong> <code>pdfbtp-assistant-juridique</code></p><blockquote>« Le maître d''ouvrage conteste notre DGD sur un marché public d''aménagement. Qualifie le litige, donne les références utiles, et rédige une mise en demeure + l''ossature d''un mémoire en réclamation. »</blockquote><p><strong>Rappel :</strong> aucun écrit ne part sans relecture humaine.</p><h3>Bilan de session</h3><ul><li>✓ Installer et lancer les 6 skills PDF BTP</li><li>✓ Analyser un AO (DCE/DQE)</li><li>✓ Préparer / suivre / réceptionner un chantier</li><li>✓ Qualifier un litige et économiser les tokens</li></ul>',
      1,
      25
    );
END $$;
