# Créer la formation PITEL sur la plateforme LMS

Formation : **Formation IA : Sensibilisation, Prompt Engineering & Assistants IA Personnalisés**

## 1. Fichiers (déjà dans le dépôt)

Les supports sont dans :

`public/formations/pitel-ia-sensibilisation-prompts-assistants/`

- `PITEL_Formation_IA_Modules1et2.pdf`
- `PITEL_Prompts_ParMetier_v4.xlsx`
- `PITEL_Module3_Assistants_IA.pdf`

Ils sont accessibles sur le site en `/formations/pitel-ia-sensibilisation-prompts-assistants/...` après déploiement.

## 2. Insérer la formation en base

1. Ouvrez **Supabase** → **SQL Editor** → **New query**
2. Copiez tout le contenu de `supabase/seed_pitel_formation_ia.sql`
3. Cliquez sur **Run**

La formation est créée avec **3 modules** et **3 leçons** :

| Module | Leçon | Type |
|--------|--------|------|
| Partie 1 — Modules 1 et 2 | Slides PDF modules 1–2 | PDF (iframe) |
| Partie 2 — Prompts par métier | Téléchargement Excel | Texte + lien |
| Partie 3 — Module 3 | Slides PDF assistants IA | PDF (iframe) |

Slug du cours : `formation-ia-sensibilisation-prompt-engineering-assistants`

## 3. Accès apprenants

- Catalogue : `/cours` (formation publiée `published = true`)
- Visionnage : `/espace-apprenant/cours/formation-ia-sensibilisation-prompt-engineering-assistants` (inscription requise)

Pour inscrire un utilisateur test :

```sql
INSERT INTO enrollments (user_id, course_id, progress_percent)
SELECT 'UUID_UTILISATEUR', id, 0
FROM courses
WHERE slug = 'formation-ia-sensibilisation-prompt-engineering-assistants'
ON CONFLICT DO NOTHING;
```

(Remplacez `UUID_UTILISATEUR` par l’id Auth de l’apprenant.)

## 4. Réexécuter le seed

Le script commence par `DELETE` sur ce `slug`, puis recrée la formation. Les inscriptions (`enrollments`) liées à l’ancien `course_id` sont supprimées en cascade si votre schéma le prévoit — vérifiez les contraintes avant de relancer en production.
