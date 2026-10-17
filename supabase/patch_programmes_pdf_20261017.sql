-- Met à jour les URL PDF programme (espace apprenant) — versions 17/10/2026
-- Exécuter sur une BDD déjà seedée (ne modifie pas les migrations historiques).

UPDATE public.lessons
SET content_url = '/formations/pdf/programme_OFC_NIV-01_Bases_IA_BTP_20261017.pdf',
    updated_at = now()
WHERE title = 'Programme officiel NIV-01 (PDF)' AND type = 'pdf';

UPDATE public.lessons
SET content_url = '/formations/ia-appels-offre-btp/programme_OFC_NIV-02_IA_Appels_offres_20261017.pdf',
    updated_at = now()
WHERE type = 'pdf'
  AND title IN (
    'Programme officiel NIV-02 (PDF)',
    'Programme de formation NIV-02 (PDF)'
  );

UPDATE public.lessons
SET content_url = '/formations/ia-conduite-travaux-suivi-chantier/programme_OFC_NIV-03_IA_Conduite_travaux_20261017.pdf',
    updated_at = now()
WHERE title = 'Programme officiel NIV-03 (PDF)' AND type = 'pdf';

UPDATE public.lessons
SET content_url = '/formations/maitriser-claude-ai-btp/programme_OFC_NIV-04_Maitriser_Claude_BTP_20261017.pdf',
    updated_at = now()
WHERE title = 'Programme officiel NIV-04 (PDF)' AND type = 'pdf';

UPDATE public.lessons
SET content_url = '/formations/ia-maitrise-oeuvre/programme_OFC_NIV-05_IA_Maitrise_oeuvre_20261017.pdf',
    updated_at = now()
WHERE title = 'Programme officiel NIV-05 (PDF)' AND type = 'pdf';
