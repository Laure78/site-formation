# Connexion « Continuer avec Google » — Configuration

---

## Problème

Le bouton « Continuer avec Google » ne fonctionne pas. Cela signifie que Google OAuth n’est pas (ou pas correctement) configuré.

---

## Étape 1 : Google Cloud Console

1. Allez sur **https://console.cloud.google.com**
2. Créez un projet ou choisissez-en un existant
3. **APIs & Services** → **Credentials**
4. **Create Credentials** → **OAuth client ID**
5. Si demandé : configurer l’**OAuth consent screen** (mode Test suffit au début)
6. Type : **Web application**
7. Nom : `site-formation` ou `laureolivie.fr`
8. **Authorized JavaScript origins** :
   - `https://www.laureolivie.fr`
   - `https://laureolivie.fr`
   - `http://localhost:3000` (pour tester en local)
9. **Authorized redirect URIs** :
   - `https://xzwxtocaqffzwuylxvzl.supabase.co/auth/v1/callback`
   - (Remplacez par l’URL de votre projet Supabase si différent)
10. **Create** → Copiez le **Client ID** et le **Client Secret**

---

## Étape 2 : Supabase Dashboard

1. Allez sur **https://supabase.com/dashboard**
2. Sélectionnez le projet **site-formation**
3. **Authentication** → **Providers** → **Google**
4. Activez **Google**
5. Collez le **Client ID** et le **Client Secret** de l’étape 1
6. **Save**

---

## Étape 3 : Redirect URL dans Supabase

1. Supabase → **Authentication** → **URL Configuration**
2. **Site URL** : `https://www.laureolivie.fr` (ou votre URL de production)
3. **Redirect URLs** : ajoutez :
   - `https://www.laureolivie.fr/auth/callback`
   - `https://laureolivie.fr/auth/callback`
   - `http://localhost:3000/auth/callback`

---

## Étape 4 : Vérifier

Après configuration, testez :

1. Ouvrez la page de connexion
2. Cliquez sur « Continuer avec Google »
3. Vous devez être redirigé vers Google puis vers l’espace apprenant

---

## En cas d’erreur après redirection

Si vous revenez sur `/auth/connexion?error=auth` :

- Vérifiez que l’URL de redirection dans Google Cloud correspond exactement à celle de Supabase
- Vérifiez que le Client ID et le Secret dans Supabase sont corrects
- Consultez les logs Supabase : **Authentication** → **Logs**
