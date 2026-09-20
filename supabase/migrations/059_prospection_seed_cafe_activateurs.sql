-- Seed contacts Café Activateurs France Num – CCI Versailles – 10/06/2025
-- Idempotent : ne recrée pas un prospect si l'email existe déjà.

-- Colonne métier utilisée par le CRM (présente dans 045, absente sur certains environnements)
ALTER TABLE public.prospects
  ADD COLUMN IF NOT EXISTS fonction text;

INSERT INTO public.prospecting_companies (name, type_structure, region, notes)
SELECT 'France Num', 'france_num', 'Île-de-France',
  'Réseau national d’accompagnement à la transformation numérique (Activateurs).'
WHERE NOT EXISTS (
  SELECT 1 FROM public.prospecting_companies WHERE lower(name) = lower('France Num')
);

INSERT INTO public.prospecting_companies (name, type_structure, region, notes)
SELECT 'CCI Paris Île-de-France', 'cci', 'Île-de-France', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.prospecting_companies WHERE lower(name) = lower('CCI Paris Île-de-France')
);

INSERT INTO public.prospecting_companies (name, type_structure, departement, region, notes)
SELECT 'CCI Versailles-Yvelines', 'cci', '78', 'Île-de-France', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.prospecting_companies WHERE lower(name) = lower('CCI Versailles-Yvelines')
);

-- Tony Grego
INSERT INTO public.prospects (
  prenom, nom, email, entreprise, fonction,
  type_structure, region, source_prospect, statut, notes_crm,
  company_id, pipeline_etape, date_creation, date_modification, updated_at
)
SELECT
  'Tony', 'Grego', 'tony.grego@finances.gouv.fr', 'France Num',
  'Responsable des activateurs et accompagnement à la transformation numérique',
  'france_num', 'Île-de-France',
  'Café Activateurs France Num – CCI Versailles – 10/06/2025',
  'a_contacter',
  'Catégorie : France Num. Rencontré au Café Activateurs (CCI Versailles, 10/06/2025).',
  c.id, 'nouveaux', now(), now(), now()
FROM public.prospecting_companies c
WHERE lower(c.name) = lower('France Num')
  AND NOT EXISTS (
    SELECT 1 FROM public.prospects p WHERE lower(p.email) = lower('tony.grego@finances.gouv.fr')
  );

-- Régine Sultan
INSERT INTO public.prospects (
  prenom, nom, email, entreprise, fonction,
  type_structure, region, source_prospect, statut, notes_crm,
  company_id, pipeline_etape, date_creation, date_modification, updated_at
)
SELECT
  'Régine', 'Sultan', 'regine.sultan@finances.gouv.fr', 'France Num',
  'Responsable des partenariats et de l’animation du réseau France Num',
  'france_num', 'Île-de-France',
  'Café Activateurs France Num – CCI Versailles – 10/06/2025',
  'a_contacter',
  'Catégorie : France Num. Rencontrée au Café Activateurs (CCI Versailles, 10/06/2025).',
  c.id, 'nouveaux', now(), now(), now()
FROM public.prospecting_companies c
WHERE lower(c.name) = lower('France Num')
  AND NOT EXISTS (
    SELECT 1 FROM public.prospects p WHERE lower(p.email) = lower('regine.sultan@finances.gouv.fr')
  );

-- Thierry Stahl (email nettoyé : zero-width space retiré)
INSERT INTO public.prospects (
  prenom, nom, email, entreprise, fonction,
  type_structure, region, source_prospect, statut, notes_crm,
  company_id, pipeline_etape, date_creation, date_modification, updated_at
)
SELECT
  'Thierry', 'Stahl', 'tstahl@cci-paris-idf.fr', 'CCI Paris Île-de-France',
  'Expert digital – conseil et développement de la jeune entreprise',
  'cci', 'Île-de-France',
  'Café Activateurs France Num – CCI Versailles – 10/06/2025',
  'a_contacter',
  'Catégorie : CCI. Rencontré au Café Activateurs (CCI Versailles, 10/06/2025).',
  c.id, 'nouveaux', now(), now(), now()
FROM public.prospecting_companies c
WHERE lower(c.name) = lower('CCI Paris Île-de-France')
  AND NOT EXISTS (
    SELECT 1 FROM public.prospects p WHERE lower(p.email) = lower('tstahl@cci-paris-idf.fr')
  );

-- Marc-Antoine Pagot
INSERT INTO public.prospects (
  prenom, nom, email, entreprise, fonction,
  type_structure, departement, region, source_prospect, statut, notes_crm,
  company_id, pipeline_etape, date_creation, date_modification, updated_at
)
SELECT
  'Marc-Antoine', 'Pagot', 'mapagot@cci-paris-idf.fr', 'CCI Versailles-Yvelines',
  'Conseiller numérique',
  'cci', '78', 'Île-de-France',
  'Café Activateurs France Num – CCI Versailles – 10/06/2025',
  'a_contacter',
  'Catégorie : CCI. Département Yvelines (78). Rencontré au Café Activateurs (CCI Versailles, 10/06/2025).',
  c.id, 'nouveaux', now(), now(), now()
FROM public.prospecting_companies c
WHERE lower(c.name) = lower('CCI Versailles-Yvelines')
  AND NOT EXISTS (
    SELECT 1 FROM public.prospects p WHERE lower(p.email) = lower('mapagot@cci-paris-idf.fr')
  );

-- Timeline : rencontre d’origine (une seule fois par prospect)
INSERT INTO public.prospecting_actions (prospect_id, action_type, title, details, completed_at, created_at)
SELECT
  p.id,
  'rencontre',
  'Café Activateurs France Num – CCI Versailles',
  'Source initiale de la fiche. Emails, réponses, notes et relances à rattacher ensuite à ce contact.',
  '2025-06-10T10:00:00+02'::timestamptz,
  '2025-06-10T10:00:00+02'::timestamptz
FROM public.prospects p
WHERE lower(p.email) IN (
  lower('tony.grego@finances.gouv.fr'),
  lower('regine.sultan@finances.gouv.fr'),
  lower('tstahl@cci-paris-idf.fr'),
  lower('mapagot@cci-paris-idf.fr')
)
AND NOT EXISTS (
  SELECT 1 FROM public.prospecting_actions a
  WHERE a.prospect_id = p.id
    AND a.action_type = 'rencontre'
    AND a.title = 'Café Activateurs France Num – CCI Versailles'
);

INSERT INTO public.prospecting_actions (prospect_id, action_type, title, details, created_at)
SELECT
  p.id,
  'creation',
  'Prospect ajouté au CRM',
  'Fiche créée pour centraliser emails, réponses, notes et relances.',
  now()
FROM public.prospects p
WHERE lower(p.email) IN (
  lower('tony.grego@finances.gouv.fr'),
  lower('regine.sultan@finances.gouv.fr'),
  lower('tstahl@cci-paris-idf.fr'),
  lower('mapagot@cci-paris-idf.fr')
)
AND NOT EXISTS (
  SELECT 1 FROM public.prospecting_actions a
  WHERE a.prospect_id = p.id AND a.action_type = 'creation'
);
