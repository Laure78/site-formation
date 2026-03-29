-- Plus de niveau « avancé » sur le catalogue : appels d'offres = intermédiaire
UPDATE public.courses
SET level = 'intermediaire', updated_at = now()
WHERE slug = 'ia-appels-offre-btp' AND level = 'avance';
