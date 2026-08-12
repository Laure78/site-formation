-- ============================================================
-- Toutes les formations LMS : forfait unique 1 200 € HT
-- TVA non applicable — art. 261-4-4° du CGI
-- ============================================================

UPDATE public.courses
SET price = 1200, updated_at = now()
WHERE true;
