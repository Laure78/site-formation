-- LMS : retirer le libellé « replay Zoom » (sessions OFC = présentiel uniquement).
UPDATE public.lessons
SET
  title = 'Synthèse de session',
  content_url = '/formations/ia-pdf-btp-administratif-chantier/08-synthese-session.pdf'
WHERE content_url = '/formations/ia-pdf-btp-administratif-chantier/08-synthese-replay-zoom.pdf'
   OR title = 'Synthèse / replay Zoom';
