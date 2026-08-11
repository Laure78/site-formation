# Formation LMS — PDF-BTP : administratif & gestion de chantier

Intra **PDF-BTP** (Longjumeau) — **8 h** en 2 sessions (1er & 22 juin 2026).

## Supports

`public/formations/ia-pdf-btp-administratif-chantier/`

| Fichier | Contenu |
|---------|---------|
| `01-programme-formation.pdf` | Programme 8 h (sessions 1 & 2) |
| `02-module-1-fondamentaux-ia.pdf` | Module 1 |
| `03-module-2-administratif-chantier.pdf` | Module 2 |
| `04-module-3-exercices-pratiques.pdf` | Module 3 |
| `05-module-5-assistant-ia-personnalise.pdf` | Module 5 |
| `06-programme-session-2-claude.pdf` | Programme session 2 (Claude / skills) |
| `07-support-claude-ia-btp.pdf` | Support Claude IA BTP |
| `08-synthese-replay-zoom.pdf` | Synthèse / replay Zoom |

## Créer en base

### Option A — un clic (local, admin connectée)

http://localhost:3000/api/dev/seed-ia-pdf-btp

### Option B — SQL Supabase

1. SQL Editor → coller `supabase/seed_ia_pdf_btp_administratif_chantier.sql`  
2. Run

Slug : `ia-pdf-btp-administratif-chantier`  
Cours : `/espace-apprenant/cours/ia-pdf-btp-administratif-chantier`

## Structure LMS

| Module | Supports |
|--------|----------|
| Programme | PDF programme 8 h |
| M1 Fondamentaux | PDF |
| M2 Administratif chantier | PDF |
| M3 Exercices session 1 | PDF |
| M4 Prompts avancés par métier | Texte (pas de PDF dans le pack) |
| M5 Assistant IA personnalisé | PDF |
| M6 Bilan & plan d’action | Texte |
| Session 2 — Claude & skills | Programme S2 + support Claude + replay |

> Distinct de `pdf-btp-claude-skills` (ancienne session Claude seule) : ce cours regroupe **tout le parcours 8 h**.
