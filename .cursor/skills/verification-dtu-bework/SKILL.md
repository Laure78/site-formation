---
name: verification-dtu-bework
description: >-
  Guide l’outil prototype laureolivie.fr « Vérification DTU × devis » (parcours BeWork) : rapport de
  rapprochement ligne de devis ↔ DTU probable, alertes de complétude typées (MANQUE_*,
  DTU_CONCURRENT, HORS_DTU…), proposition de libellés rectifiés + mémo explicatif, sans jamais reproduire
  le texte officiel des DTU ; export Word avec logo blueprint `public/images/bework-logo-blueprint.png`,
  en-tête / pied BeWork, encadré légal AFNOR/CSTB et charte Bleu #1D4ED8.
disable-model-invocation: true
---

# Vérification DTU × Devis (prototype site + export BeWork)

## Emplacement dans le dépôt

- Page noindex : route `LINKS.verificationDtuBeworkTest` → `app/outils/verification-dtu-bework/page.tsx`
- UI client : `components/dtu-verification/VerificationDtuBeworkTool.tsx`
- Moteur : `lib/dtu-verification/analyze.ts`, `match-dtu.ts`, `alertes.ts`, `extract-lines.ts`, `rectification.ts`, `memo-explicatif.ts`
- Base projet (non exhaustive, reformulations maison) : `lib/dtu-verification/base-dtu.json`
- Logo rapport (fichier image) : `public/images/bework-logo-blueprint.png`
- Export Word serveur : `app/api/verification-dtu-bework/docx/route.ts` (en-tête image + tagline pluriel, tableau analyse, tableau devis rectifié, mémo, pied de page officiel ; couleurs #1D4ED8 / #DBEAFE)
- Export devis rectifié sans serveur : `lib/dtu-verification/export-devis-rectifie.ts` (.txt, .csv avec BOM pour Excel, copie libellés depuis l’UI « Obtenir le devis rectifié »)

## Règles juridiques (non négociables)

Les DTU sont des documents normatifs payants, diffusés par AFNOR et le CSTB. **Ne pas** reproduire de phrases officielles, **ne pas** citer d’articles entre guillemets, **ne pas** donner de chiffrages normatifs précis non vérifiés. Toujours orienter vers les boutiques officielles et préciser : **« Article exact à confirmer dans le document officiel ».**

Pour le périmètre détaillé, déclencheurs et workflow complet (matching, tableau, codes d’alerte, charte rapport, conventions de livrables `.docx` / présentations), se reporter aux consignes métier du partenaire **BeWork** et au cahier interne équivalent ; tout enrichissement de `base-dtu.json` doit rester en **rédaction propriétaire** (resume_maison, mots-clés).

## Déploiements futurs

- Dépôt devis côté **bework.fr** puis retour devis corrigé : brancher un backend sur le même format `RapportDtuPayload` (`lib/dtu-verification/types.ts`) incluant désormais `memo_paragraphs` et pour chaque ligne `ligne_devis_rectifiee` / `rectifications_appliquees`.
- PDF : convertir le `.docx` côté serveur (LibreOffice headless ou service document) — non inclus dans ce prototype.
