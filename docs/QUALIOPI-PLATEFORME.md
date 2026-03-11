# Plateforme de formation — Conformité Qualiopi

Documentation des fonctionnalités Qualiopi implémentées sur la plateforme site-formation.

## Récapitulatif

La plateforme intègre les éléments nécessaires pour produire les preuves pédagogiques demandées lors d'un audit Qualiopi.

---

## 1. Espace administrateur

### Menu (AdminSidebar)

- **Dashboard** — Apprenants, actifs (30j), formations, inscriptions, taux complétion moyen, temps moyen, revenus, graphique par formation
- **Formations** — CRUD des formations, modules, leçons
- **Apprenants** — Liste, invitation, lien vers profil
- **Progression** — Suivi pédagogique (%, leçons complétées, dernière activité)
- **Qualiopi / Qualité** — Statistiques et export des preuves
- **Media Machine** — Gestion des médias
- **Agent Chat** — Config agent IA

### Pages admin

| Page | Fonction |
|------|----------|
| `/admin` | Dashboard avec stats |
| `/admin/apprenants` | Liste (nom, email, formation, progression, dernière connexion, statut) + invitation + import CSV |
| `/admin/apprenants/[id]` | Profil détaillé (progression, quiz, satisfaction, bouton réinitialiser progression) |
| `/admin/progression` | Tableau suivi pédagogique |
| `/admin/qualite` | Export CSV Qualiopi |

---

## 2. Base de données Qualiopi (migration 011)

### Tables créées

| Table | Rôle |
|-------|------|
| `session_logs` | Traçabilité des connexions (date, durée, IP, modules consultés) |
| `satisfaction_surveys` | Évaluations de fin de formation (note globale, contenu, utilité, commentaire) |
| `attendance_sheets` | Feuilles d'émargement (sessions, dates) |
| `attendance_signatures` | Signatures numériques des apprenants |
| `invitations` | Liens d'invitation (token, expiration) |

### Appliquer la migration

```bash
supabase db push
# ou exécuter supabase/migrations/011_qualiopi.sql manuellement
```

---

## 3. Traçabilité des connexions

- **Composant** : `SessionLogger` (appel API `/api/session-log`)
- **Déclenchement** : Chargement de l'espace apprenant et des pages cours
- **Stockage** : `session_logs` (user_id, started_at, ip_address, user_agent, modules_consulted)

---

## 4. Évaluations de satisfaction

- **Composant** : `SatisfactionSurvey`
- **Affichage** : Automatique à 100 % de complétion d'une formation
- **Champs** : Note globale (1–5), qualité contenu, utilité professionnelle, commentaire
- **API** : `POST /api/satisfaction`

---

## 5. Attestations de formation

- **Page** : `/espace-apprenant/attestation/[courseId]`
- **Conditions** : Formation terminée (100 %)
- **Contenu** : Nom apprenant, formation, durée, date
- **Export** : Bouton « Imprimer / Enregistrer en PDF » (print du navigateur)

**À faire** : Renseigner `duration_hours` dans les formations (table `courses`) pour les attestations.

---

## 6. Feuilles d'émargement

- **Tables** : `attendance_sheets`, `attendance_signatures`
- **Export** : Via page Qualiopi → « Feuilles d'émargement » (CSV)
- **UI** : Création de sessions et signatures à développer si besoin

---

## 7. Système d'invitation

### Admin

- Formulaire sur `/admin/apprenants` : email + formation → génère un lien
- **Import CSV** : colonnes email, prenom, nom → crée des invitations en masse
- Lien valide 7 jours
- Copier le lien et l'envoyer par email à l'apprenant

### Apprenant

- **Nouveau** : `/invitation/[token]` → créer compte → inscription auto à la formation
- **Déjà inscrit** : Connexion puis visite du lien → inscription à la formation

---

## 8. Export des preuves Qualiopi

Page `/admin/qualite` :

| Export | Contenu |
|--------|---------|
| Taux de complétion | Apprenant, email, formation, %, date inscription |
| Évaluations satisfaction | Notes, commentaires |
| Feuilles d'émargement | Apprenant, session, date de signature |

Format : CSV (ouvrable dans Excel).

---

## 9. Prochaines étapes possibles

1. **Émargement** : Interface admin pour créer des sessions + page apprenant pour signer
2. **Email automatique** : Envoyer l'email d'invitation via Resend/SendGrid
3. **PDF natif** : Génération d'attestations en PDF (ex. jsPDF) sans passer par l’impression navigateur
4. **Durée formations** : Compléter `duration_hours` sur les cours existants
