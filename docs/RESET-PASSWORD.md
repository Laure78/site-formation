# Réinitialisation du mot de passe (Supabase)

## Symptôme

L’email « Reset Your Password » arrive, mais le lien échoue (`?error=auth` ou « lien invalide »).

Causes fréquentes :

1. **Template Supabase par défaut** (lien PKCE) : le code_verifier n’existe que dans le navigateur où le reset a été demandé — Yahoo / autre appareil = échec.
2. **Scan anti-phishing** (Yahoo, Outlook) qui ouvre le lien une fois avant vous.
3. **Redirect URLs** incompletes dans Supabase.

## Correctifs côté site (déjà en place)

- `redirectTo` → `/auth/reset-password` (échange PKCE côté navigateur)
- Page `/auth/confirm` avec **bouton « Continuer »** (flux `token_hash`, résistant aux scans)

## À faire dans le dashboard Supabase (obligatoire)

1. Ouvrir [Authentication → Email Templates](https://supabase.com/dashboard/project/_/auth/templates) → **Reset password**
2. Remplacer le corps du mail par :

```html
<h2>Réinitialiser votre mot de passe</h2>
<p>Vous avez demandé à réinitialiser le mot de passe de votre compte laureolivie.fr.</p>
<p>
  <a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery&next=/auth/reset-password"
    >Choisir un nouveau mot de passe</a
  >
</p>
<p>Si vous n’êtes pas à l’origine de cette demande, ignorez cet email.</p>
```

3. **Authentication → URL Configuration**
   - **Site URL** : `https://www.laureolivie.fr`
   - **Redirect URLs** (ajouter si manquant) :
     - `https://www.laureolivie.fr/auth/callback`
     - `https://www.laureolivie.fr/auth/confirm`
     - `https://www.laureolivie.fr/auth/reset-password`
     - `http://localhost:3000/auth/callback`
     - `http://localhost:3000/auth/confirm`
     - `http://localhost:3000/auth/reset-password`

4. Enregistrer, puis retester : Connexion → Mot de passe oublié → ouvrir le **nouveau** mail → **Continuer** → nouveau mot de passe.

## Test rapide

1. Même navigateur pour la demande et le clic (idéal Chrome / Safari, pas l’aperçu Yahoo seul).
2. Ne pas réutiliser un ancien mail — chaque lien est à usage unique.
