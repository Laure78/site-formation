# Correction : impossible de déposer des documents dans l'admin

Si le bouton **Déposer** ne fonctionne pas lors de l'ajout d'une leçon PDF, suivez ces étapes.

## Cause probable

Le bucket Supabase **formations** n'existe pas ou n'a pas les bonnes permissions.

## Solution rapide — Méthode manuelle (sans upload)

**Aucune configuration supplémentaire requise.**

1. Placez vos PDF dans le dossier :
   ```
   /public/formations/appels-offres/
   ```
2. Dans l'admin, créez chaque leçon (type **Slides PDF**) et collez l'URL :
   ```
   /formations/appels-offres/votre-fichier.pdf
   ```
3. Exemple : pour `introduction.pdf` → URL : `/formations/appels-offres/introduction.pdf`

Les fichiers dans `/public/` sont accessibles directement. Pas besoin de Supabase Storage.

---

## Solution complète — Activer l'upload Supabase

Pour que le bouton **Déposer** fonctionne, exécutez ce SQL dans **Supabase** → **SQL Editor** → **New query** :

```sql
-- Créer le bucket formations (public pour accès aux PDF)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'formations',
  'formations',
  true,
  52428800,  -- 50 Mo max par fichier
  ARRAY['application/pdf', 'video/mp4', 'video/webm', 'image/png', 'image/jpeg']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Autoriser les admins et formateurs à uploader
CREATE POLICY "Admin et formateurs peuvent uploader"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'formations' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role IN ('admin', 'formateur')
  )
);

-- Autoriser la lecture publique des fichiers (bucket public)
CREATE POLICY "Lecture publique formations"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'formations');
```

1. Copiez tout le script
2. Collez dans l'éditeur SQL Supabase
3. Cliquez sur **Run**
4. Vérifiez qu'il n'y a pas d'erreur (si la policy existe déjà, vous pouvez ignorer l'erreur "already exists" et supprimer les lignes CREATE POLICY correspondantes)

---

## Vérifications

- **Connexion** : vous devez être connecté en tant qu'admin ou formateur
- **Format** : le bouton accepte uniquement les PDF
- **Taille** : si le fichier dépasse 50 Mo, utilisez la méthode manuelle (dossier public)
