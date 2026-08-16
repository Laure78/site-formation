-- LMS : session FFB artisans — présentiel Île-de-France uniquement (plus de « distanciel »).
UPDATE public.courses
SET
  programme = replace(programme, 'Présentiel ou distanciel', 'Présentiel Île-de-France'),
  updated_at = now()
WHERE slug = 'ia-artisans-batiment-ffb'
  AND programme LIKE '%Présentiel ou distanciel%';
