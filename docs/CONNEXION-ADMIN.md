# Guide : Se connecter à l'espace Admin

Si vous arrivez sur l'**Espace Apprenant** au lieu de l'**Admin** après connexion, c'est que votre compte n'a pas encore le rôle administrateur.

---

## Étape 1 — Créer un compte (si ce n'est pas déjà fait)

1. Allez sur **https://www.laureolivie.fr**
2. Cliquez sur **S'inscrire** (en haut à droite)
3. Remplissez : email (ex. laureolivie@yahoo.fr), mot de passe
4. Validez l'inscription
5. Vous serez redirigé vers l'Espace Apprenant

Par défaut, tout nouveau compte a le rôle **apprenant**. Il faut lui donner le rôle **admin** dans la base de données.

---

## Étape 2 — Donner les droits Admin à votre compte

### A. Ouvrir Supabase

1. Allez sur **https://supabase.com** et connectez-vous
2. Ouvrez votre projet (celui de laureolivie.fr)
3. Dans le menu de gauche, cliquez sur **SQL Editor**
4. Cliquez sur **New query** (Nouvelle requête)

### B. Exécuter ce script SQL

Copiez-collez ce code dans l'éditeur (remplacez l'email par le vôtre si différent) :

```sql
-- Donner les droits admin à laureolivie@yahoo.fr
UPDATE public.profiles
SET role = 'admin', full_name = 'Laure Olivié', updated_at = now()
WHERE id = (SELECT id FROM auth.users WHERE email = 'laureolivie@yahoo.fr' LIMIT 1);
```

5. Cliquez sur **Run** (Exécuter)
6. Vérifiez qu'il n'y a pas d'erreur (un message du type "Success" ou "0 rows affected" peut apparaître)

### C. Si l'utilisateur n'existe pas encore dans la table profiles

Si le script ne trouve pas de profil, exécutez d'abord :

```sql
-- Vérifier les utilisateurs existants
SELECT id, email FROM auth.users;
```

Si votre email apparaît, exécutez ensuite :

```sql
-- Créer le profil s'il manque, puis passer en admin
INSERT INTO public.profiles (id, email, full_name, role, updated_at)
SELECT id, email, 'Laure Olivié', 'admin', now()
FROM auth.users
WHERE email = 'laureolivie@yahoo.fr'
ON CONFLICT (id) DO UPDATE SET role = 'admin', full_name = 'Laure Olivié', updated_at = now();
```

---

## Étape 3 — Se reconnecter

1. **Déconnectez-vous** du site (cliquez sur votre profil → Déconnexion, ou fermez le navigateur)
2. Retournez sur **https://www.laureolivie.fr**
3. Cliquez sur **Connexion**
4. Entrez votre email et mot de passe
5. Cliquez sur **Se connecter**

Vous devriez être redirigé vers **https://www.laureolivie.fr/admin** (tableau de bord admin).

---

## Si ça ne marche toujours pas

1. **Vider le cache du navigateur** ou ouvrir une fenêtre de navigation privée
2. **Vérifier votre rôle** dans Supabase :
   - SQL Editor → New query
   - Exécutez : `SELECT email, role FROM public.profiles p JOIN auth.users u ON p.id = u.id WHERE u.email = 'laureolivie@yahoo.fr';`
   - Le champ `role` doit afficher `admin`
3. **Accéder directement à l'URL admin** après connexion : https://www.laureolivie.fr/admin

Si votre rôle est bien `admin` et que vous êtes redirigé vers l'Espace Apprenant, il peut y avoir un problème de cache de session. Déconnectez-vous complètement, fermez le navigateur, rouvrez et reconnectez-vous.
