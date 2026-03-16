# Slides — Formation « Répondre aux Appels d'Offres BTP avec l'IA »

Placez ici vos fichiers PDF (slides) pour la formation appels d'offres.

**Chemin public** : `/formations/appels-offres/nom-du-fichier.pdf`

## Exemples de nommage

- `01-introduction.pdf`
- `02-module-1-analyse-dce-notebooklm.pdf`
- `03-module-2-decision-go-no-go-rentabilite.pdf`
- `04-module-3-memoire-technique-relecture.pdf`
- `05-module-4-chiffrage-controle-rentabilite.pdf`

## Ajouter les slides dans la plateforme

### Option A — Via l'admin (recommandé)

1. Connectez-vous à **Admin** → **Formations**
2. Ouvrez **Répondre aux appels d'offres BTP avec l'IA**
3. Pour chaque module (Introduction, MODULE 1, etc.) :
   - Cliquez sur **Ajouter +**
   - Type : **Slides PDF**
   - **URL du contenu** : `/formations/appels-offres/01-introduction.pdf` (ajustez le nom du fichier)
   - Ou utilisez **Déposer** pour envoyer le fichier vers Supabase Storage

### Option B — Fichiers dans ce dossier

1. Exportez vos slides en PDF (PowerPoint, Google Slides, etc.)
2. Copiez les fichiers dans ce dossier
3. Via l'admin, créez chaque leçon et indiquez l'URL : `/formations/appels-offres/votre-fichier.pdf`

Les fichiers dans `/public/` sont servis statiquement. Exemple :  
`https://laureolivie.fr/formations/appels-offres/introduction.pdf`

---

## Si « Déposer » ne fonctionne pas dans l'admin

Le bouton **Déposer** utilise Supabase Storage. Si l'upload échoue :

1. **Méthode manuelle** : placez vos PDF dans ce dossier (`/public/formations/appels-offres/`), déployez le site, puis dans l'admin collez l'URL : `/formations/appels-offres/votre-fichier.pdf`

2. **Vérifier le bucket Supabase** : Dans Supabase → Storage, créez un bucket nommé `formations` (public) si absent. Exécutez la migration `021_storage_formations_bucket.sql` dans le SQL Editor si disponible.
