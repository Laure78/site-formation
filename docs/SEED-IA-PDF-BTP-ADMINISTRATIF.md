# Formation LMS — PDF-BTP : administratif & gestion de chantier

Intra **PDF-BTP** (Longjumeau) — **8 h** en 2 sessions (1er & 22 juin 2026).

## Supports

`public/formations/ia-pdf-btp-administratif-chantier/` (8 PDF)

## Remettre les supports en ligne (prod)

Deux causes fréquentes si la page cours est vide ou sans PDF :

1. **Modules / leçons absents en base** → exécuter la migration SQL
2. **Fichiers PDF non déployés** → merger `nettoyage-blog` vers `main` (commit `59ff199`+)

### Étape A — SQL (immédiat)

Supabase → SQL Editor → coller puis Run :

- `supabase/migrations/034_course_ia_pdf_btp_administratif_chantier.sql`  
  ou `supabase/seed_ia_pdf_btp_administratif_chantier.sql`

### Étape B — Déployer les PDF

Les PDF doivent être sur Railway (`main`). Vérifier :

`https://www.laureolivie.fr/formations/ia-pdf-btp-administratif-chantier/01-programme-formation.pdf`

### Étape C — Seed admin (après déploiement)

Connectée en admin :  
`https://www.laureolivie.fr/api/dev/seed-ia-pdf-btp`

Slug : `ia-pdf-btp-administratif-chantier`  
Cours : `/espace-apprenant/cours/ia-pdf-btp-administratif-chantier`

> Distinct de `pdf-btp-claude-skills` (session Claude seule).
