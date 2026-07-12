# Seed LMS — 6 formations catalogue

Crée / met à jour les **6 parcours officiels** du site (`/formations`) dans la plateforme admin (`/admin/formations`).

## Formations

| Réf. | Slug LMS | Programme PDF |
|------|----------|---------------|
| NIV-01 | `ia-batiment-travaux-publics` | `/formations/pdf/programme-niveau-1-ia-batiment-travaux-publics.pdf` |
| NIV-02 | `ia-appels-offre-btp` | `/formations/ia-appels-offre-btp/Programme_IA_AO_DCE_MT_ClaudePro_OFC.pdf` |
| NIV-03 | `ia-conduite-travaux-suivi-chantier` | `/formations/ia-conduite-travaux-suivi-chantier/Programme_IA_Conduite_Travaux_OFC.pdf` |
| NIV-04 | `maitriser-claude-ai-btp` | `/formations/maitriser-claude-ai-btp/Programme_Maitriser_Claude_BTP_OFC.pdf` |
| NIV-05 | `ia-maitrise-oeuvre` | `/formations/ia-maitrise-oeuvre/programme_OFC_IA_MOE_4h.pdf` |
| NIV-06 | `formation-claude-ia-btp` | `/formations/formation-claude-ia-btp/programme_OFC_IA_BTP_4h.pdf` |

Chaque cours contient : métadonnées Qualiopi (objectifs, prérequis, programme) · module « Programme & ressources » avec PDF · modules pédagogiques · leçons texte (+ PDF supports NIV-02).

## Exécution

1. **Supabase** → **SQL Editor** → New query  
2. Coller `supabase/seed_catalogue_formations_lms.sql`  
3. **Run**  
4. Vérifier : https://www.laureolivie.fr/admin/formations  

Le script est **idempotent** (upsert par slug, recrée modules/leçons).

## Notes

- L’ancien slug `ia-au-service-du-btp` est **dépublié** au profit de `ia-batiment-travaux-publics`.
- Les PDF doivent être déployés en prod (dossier `public/formations/…`) pour s’ouvrir dans l’espace apprenant.
- Formation client PDF BTP séparée : `seed_pdf_btp_claude_skills.sql` (slug `pdf-btp-claude-skills`).
