# Extranet formateurs — mise en service (Phase 1)

## Architecture retenue

| Couche | Choix |
|--------|--------|
| Frontend | Next.js App Router — routes `/espace-formateurs/*` (formateur) et `/admin/formateurs/*` (admin) |
| Auth | Supabase Auth existante + liaison e-mail → dossier `extranet_trainers` |
| Données | PostgreSQL Supabase — migration `071_extranet_formateurs.sql` |
| Fichiers | Bucket privé `extranet-formateurs` — URLs signées 5 min (server actions) |
| UI | Shell calqué sur `ApprenantShell` — bleu `#377CF3`, gris `#F4F6F8` |
| Accès admin | `requireAdminAccess()` (réutilise `lib/admin-access.ts`) |
| Accès formateur | `requireExtranetTrainerAccess()` — indépendant du rôle LMS `formateur` |

### Composants / modules réutilisés

- `ConnexionClient` + `loginWithPassword` / callback OAuth (`resolvePostAuthPath` étendu)
- `AdminSidebar`, layout `/admin`
- `createAdminClient` / `createClient` Supabase
- `createPageMetadata`, `LINKS` (`lib/internal-links.ts`)

### Distinction rôles

- **`profiles.role = formateur`** : accès LMS `/admin` (contenus, sessions) — inchangé.
- **Dossier `extranet_trainers`** : extranet indépendants (sous-traitants) — peut coexister avec un compte `apprenant`.

## Variables d'environnement

Identiques au site (déjà requis) :

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (obligatoire pour dépôts fichiers, invitations, lien e-mail)

Optionnel : `ADMIN_ALLOWED_EMAILS` (accès admin organisation).

## Déploiement

1. Appliquer la migration sur l’instance Supabase (staging d’abord) :

   ```bash
   npm run db:migrate:extranet
   # ou supabase db push / SQL Editor (071 puis 072)
   ```

2. Vérifier le bucket **privé** `extranet-formateurs` dans le dashboard Storage.

3. Déployer l’application Next.js (Railway / Vercel).

4. **Premier formateur** : `/admin/formateurs` → « Inviter un formateur » (e-mail).

5. Le formateur crée un compte ou se connecte sur `/espace-formateurs/connexion` avec **le même e-mail** → liaison automatique.

## Tests manuels recommandés (Phase 1)

| Test | Attendu |
|------|---------|
| Formateur A / B | A ne voit pas les documents de B (RLS + chemins storage) |
| Dépôt CV | Statut `pending`, version 1, remplacement → v2 + ancien `superseded` |
| Téléchargement | URL signée, expire ~5 min |
| Admin valide / refuse | Statut + commentaire visible formateur |
| Charte | Acceptation tracée ; nouvelle version admin → re-acceptation |
| Compte sans dossier | Redirection connexion + message |
| NDA « première activité » | Pas de pièce NDA exigée dans la liste |

## Phase 2 (programmes, supports, missions)

Migration : `072_extranet_formateurs_phase2.sql`

| Admin | Formateur |
|-------|-----------|
| `/admin/formateurs/programmes` — créer programme + version courante | `/espace-formateurs/programmes` — liste + fiche |
| `/admin/formateurs/supports` — publier / archiver supports | `/espace-formateurs/supports` — téléchargement si droit |
| `/admin/formateurs/planning` — créer mission | `/espace-formateurs/interventions` — détail, préparation, CR, pièces |
| Fiche formateur — boutons **Attribuer** programme / support | |

Parcours type :

1. Créer un programme (version 1.0 validée).
2. Publier des supports (optionnellement liés au programme).
3. Sur la fiche formateur : attribuer programme(s) et support(s).
4. Planning : créer une mission (formateur + programme + date/lieu/client).
5. Formateur : confirmer la préparation, déposer émargement / évaluation, compte rendu.

Lien optionnel futur : `training_session_id` sur `extranet_missions` (cockpit `/admin/sessions`).

## Phase 3 (à venir)

- Grilles compétences (ind. 21), fiches sous-traitance (ind. 27), exports audit PDF/ZIP.

Ne jamais exécuter de migration destructive en production sans validation explicite.
