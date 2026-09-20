-- Annuaires de sourcing (distincts des prospects CRM)
CREATE TABLE IF NOT EXISTS public.prospecting_directories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  organism text,
  year int,
  category text,
  sector text,
  geo_zone text,
  directory_type text DEFAULT 'Annuaire professionnel',
  file_path text NOT NULL,
  file_name text NOT NULL,
  status text NOT NULL DEFAULT 'actif',
  tags text[] DEFAULT '{}',
  description text,
  page_count int,
  companies_count int NOT NULL DEFAULT 0,
  contacts_count int NOT NULL DEFAULT 0,
  prospects_count int NOT NULL DEFAULT 0,
  extracted_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS public.prospecting_directory_companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  directory_id uuid NOT NULL REFERENCES public.prospecting_directories(id) ON DELETE CASCADE,
  company_name text NOT NULL,
  address text,
  postal_code text,
  city text,
  departement text,
  phone text,
  email text,
  website text,
  manager_name text,
  manager_role text,
  workforce_category text,
  workforce_min int,
  workforce_max int,
  workforce_label text,
  specialties text[] DEFAULT '{}',
  professional_chamber text,
  quality_labels text[] DEFAULT '{}',
  qualibat_codes text[] DEFAULT '{}',
  tags text[] DEFAULT '{}',
  source_page int,
  source_file text,
  raw_block text,
  prospect_id uuid REFERENCES public.prospects(id) ON DELETE SET NULL,
  extracted_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_dir_companies_directory
  ON public.prospecting_directory_companies(directory_id);
CREATE INDEX IF NOT EXISTS idx_dir_companies_dept
  ON public.prospecting_directory_companies(departement);
CREATE INDEX IF NOT EXISTS idx_dir_companies_email
  ON public.prospecting_directory_companies(lower(email));
CREATE INDEX IF NOT EXISTS idx_dir_companies_name
  ON public.prospecting_directory_companies(lower(company_name));
CREATE INDEX IF NOT EXISTS idx_dir_companies_prospect
  ON public.prospecting_directory_companies(prospect_id);

ALTER TABLE public.prospects
  ADD COLUMN IF NOT EXISTS source_directory_id uuid REFERENCES public.prospecting_directories(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS source_directory_company_id uuid REFERENCES public.prospecting_directory_companies(id) ON DELETE SET NULL;

ALTER TABLE public.prospecting_directories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prospecting_directory_companies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "prospecting_directories_staff" ON public.prospecting_directories;
CREATE POLICY "prospecting_directories_staff" ON public.prospecting_directories
  FOR ALL USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

DROP POLICY IF EXISTS "prospecting_directory_companies_staff" ON public.prospecting_directory_companies;
CREATE POLICY "prospecting_directory_companies_staff" ON public.prospecting_directory_companies
  FOR ALL USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

-- Seed fiche annuaire FFB 2025 (fichier local public)
INSERT INTO public.prospecting_directories (
  name, organism, year, category, sector, geo_zone, directory_type,
  file_path, file_name, status, tags, description, page_count
)
SELECT
  'Annuaire 2025 – Pôle Construction Paris Île-de-France',
  'FFB Grand Paris Île-de-France · Pôle Construction Paris Île-de-France',
  2025,
  'FFB',
  'BTP',
  'Paris / Île-de-France',
  'Annuaire professionnel',
  '/documents/annuaires/2025-sec-annuaire.pdf',
  '2025-sec-annuaire.pdf',
  'actif',
  ARRAY[
    'FFB','BTP','Île-de-France','entreprises','construction','maçonnerie',
    'gros œuvre','carrelage','plâtrerie','isolation','ravalement','entreprise générale'
  ],
  'Annuaire professionnel 2025 du Pôle Construction Paris Île-de-France regroupant les entreprises adhérentes des chambres syndicales du gros œuvre, de la construction, du plâtre et de l''isolation, du ravalement et du carrelage.',
  196
WHERE NOT EXISTS (
  SELECT 1 FROM public.prospecting_directories
  WHERE file_name = '2025-sec-annuaire.pdf'
);
