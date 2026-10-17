# Seed LMS — 5 formations catalogue

Crée / met à jour les **5 parcours officiels** du site (`/formations`) dans la plateforme admin (`/admin/formations`).

## Formations

| Réf. | Slug LMS | Programme PDF |
|------|----------|---------------|
| NIV-01 | `ia-batiment-travaux-publics` | `/formations/pdf/programme_OFC_NIV-01_Bases_IA_BTP_20261017.pdf` |
| NIV-02 | `ia-appels-offre-btp` | `/formations/ia-appels-offre-btp/programme_OFC_NIV-02_IA_Appels_offres_20261017.pdf` |
| NIV-03 | `ia-conduite-travaux-suivi-chantier` | `/formations/ia-conduite-travaux-suivi-chantier/programme_OFC_NIV-03_IA_Conduite_travaux_20261017.pdf` |
| NIV-04 | `maitriser-claude-ai-btp` | `/formations/maitriser-claude-ai-btp/programme_OFC_NIV-04_Maitriser_Claude_BTP_20261017.pdf` |
| NIV-05 | `ia-maitrise-oeuvre` | `/formations/ia-maitrise-oeuvre/programme_OFC_NIV-05_IA_Maitrise_oeuvre_20261017.pdf` |

Chaque cours contient : métadonnées Qualiopi (objectifs, prérequis, programme) · module « Programme & ressources » avec PDF · modules pédagogiques · leçons texte (+ PDF supports NIV-02).

## Exécution

### Option A — Admin (recommandé)

1. Connectez-vous en admin  
2. Allez sur **/admin/formations**  
3. Cliquez **Sync catalogue /formations → LMS**

Ou ouvrez : `/api/admin/sync-catalogue-lms` (GET, admin connectée).

Cela crée / met à jour les **6** cours sans écraser les modules déjà enrichis.

### Option B — SQL (modules pédagogiques complets)

1. **Supabase** → **SQL Editor** → New query  
2. Coller `supabase/seed_catalogue_formations_lms.sql`  
3. **Run**  

Le script SQL recrée aussi les modules/leçons détaillés (idempotent).


## Notes

- L’ancien slug `ia-au-service-du-btp` est **dépublié** au profit de `ia-batiment-travaux-publics`.
- Les PDF doivent être déployés en prod (dossier `public/formations/…`) pour s’ouvrir dans l’espace apprenant.
- BDD déjà en prod avec anciennes URL : migration `069_programme_pdf_urls_20261017.sql` ou script manuel `supabase/patch_programmes_pdf_20261017.sql`.
- Formation client PDF BTP séparée : `seed_pdf_btp_claude_skills.sql` (slug `pdf-btp-claude-skills`).
