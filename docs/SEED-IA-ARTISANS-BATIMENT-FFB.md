# Formation LMS — L'IA au service des artisans du bâtiment (FFB)

Session **FFB — artisans du bâtiment (tous corps d'état)** — 4 h.

## 1. Supports (dépôt)

`public/formations/ia-artisans-batiment-ffb/`

| Fichier | Rôle |
|---------|------|
| `programme-ia-artisans-batiment.pdf` | Programme officiel |
| `module-1-fondamentaux-ia-btp.pdf` | Support Module 1 |
| `tuto-modeles-capcut.pdf` | Tuto CapCut (Module 4) |

## 2. Migration type « lien »

Exécuter d’abord (si pas déjà appliquée) :

`supabase/migrations/031_lessons_type_lien.sql`

Dans Supabase → SQL Editor.

Cela autorise le type de leçon **`lien`** (Google Sheets, Excel Online, OneDrive…).

## 3. Seed de la formation

1. Supabase → **SQL Editor** → New query  
2. Coller `supabase/seed_ia_artisans_batiment_ffb.sql`  
3. **Run**

Slug : `ia-artisans-batiment-ffb`  
Visionnage : `/espace-apprenant/cours/ia-artisans-batiment-ffb`

## 4. Liens Excel / Google Sheets

| Module | Tableau |
|--------|---------|
| Module 1 — Fondamentaux | [Sheets](https://docs.google.com/spreadsheets/d/1hWdMYZRBtxiFvm2W77VcCPU2cwZzbEIy0SS91xNLl-w/edit?usp=sharing) |
| Module 2 — Devis & chiffrage | [Sheets](https://docs.google.com/spreadsheets/d/1cXZhCiYd5ts_JXdCAQET2FdPGErD0nygz2MQeHLjkso/edit?usp=sharing) |
| Module 3 — Gestion chantier | [Sheets](https://docs.google.com/spreadsheets/d/1lThW_X3k1YZXSh0Qdmh768zZMxjWmdU3nQdmA5gWVDk/edit?usp=sharing) |
| Module 4 — Réseaux sociaux | [Sheets](https://docs.google.com/spreadsheets/d/1-PoS9GBl8irjYlbCgSPvvZw__hm8iXzZwGfv1darijU/edit?usp=sharing) |

Pour en ajouter : **Admin → Formations → leçon → type « Lien Excel / Google Sheets »**.

## 5. Structure

| Module | Contenu |
|--------|---------|
| Programme | PDF programme |
| Programme | [Google Docs complémentaire](https://docs.google.com/document/d/1NOi7_qq53dIo78zfVoMSGP5emTwy6vPDs2YQszoiSgU/edit?usp=sharing) |
| Module 1 | PDF support + leçon lien (kit prompts BTP) |
| Module 2 | Texte objectifs + leçon lien (kit devis) |
| Module 3 | Texte objectifs + leçon lien (kit chantier) |
| Module 4 | Texte + PDF CapCut + leçon lien (kit réseaux) |
