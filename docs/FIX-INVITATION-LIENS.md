# Correction : lien d’invitation apprenant (404 ou « ne fonctionne pas »)

## Cause

La table `invitations` a le **RLS** activé. Seuls les **admin / formateur** pouvaient lire les lignes. Un visiteur **non connecté** qui ouvre `/invitation/[token]` ne voyait donc **aucune ligne** → page **404** ou contenu vide.

## Solution (déjà dans le code)

Une fonction PostgreSQL `get_invitation_by_token(p_token text)` en **SECURITY DEFINER** ne retourne **qu’une** ligne pour le token fourni. La page et l’API utilisent `supabase.rpc('get_invitation_by_token', …)` au lieu d’un `SELECT` direct.

## À faire sur Supabase (obligatoire)

1. Ouvrez **Supabase** → **SQL Editor** → **New query**
2. Copiez tout le contenu de `supabase/migrations/022_invitation_by_token_rpc.sql`
3. Exécutez **Run**

Sans cette étape, la RPC n’existe pas et les liens d’invitation échouent encore.

## Vérification

- Générez une invitation depuis **Admin → Apprenants**
- Ouvrez le lien en **navigation privée** (sans être connecté)
- Vous devez voir le formulaire « Invitation à une formation »
