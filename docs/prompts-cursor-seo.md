# Prompts Cursor — SEO & GEO laureolivie.fr

Checklist opérationnelle dérivée de l’audit du 16 octobre 2026.  
**Règles projet** : `.cursorrules` · sources uniques `data/formations.ts`, `lib/internal-links.ts`, `lib/schema-constants.ts`, `public/llms.txt`.

---

## Lot 1 — Prod & cache (ops)

```
Purge cache Cloudflare complète, rebuild Railway/Vercel, puis vérifier en navigation privée :
- /formation-ia-paris, /formation-ia-electricien-btp, /prendre-rdv
Attendu : contact@laureolivie.fr, theme-color #377CF3, CTA « Réservez votre visio découverte gratuite », pas de lien Teachizy « Connexion ».
```

---

## Lot 2 — Redirections 301 (`next.config.ts`, `lib/gsc-redirects-2026.ts`)

```
Vérifier que ces URLs ne renvoient jamais 200 :
/prendre-rendez-vous → /prendre-rdv
/formation-ia → /formation-ia-btp
/formation-ia-artisans-btp → /formation-ia-dirigeant-pme-btp
/formation-ia-conducteur-de-travaux-btp → /formation-ia-conducteur-de-travaux
/formation-ia-dirigeant-btp → /formation-ia-dirigeant-pme-btp
Slugs /formation-ia/* noindex → page métier équivalente (formationIaHubConsolidationRedirects)
Après ajout : npm run build && curl -I https://www.laureolivie.fr/prendre-rendez-vous
```

---

## Lot 3 — Sitemap (`app/sitemap.ts`, `lib/sitemap-last-modified.ts`)

```
- SITEMAP_CORE_STATIC_PATHS branché (formateurs, parcours-metiers, intra)
- Aucune URL listée qui redirige (ex. blog artisans → PME)
- lastmod = date contenu réelle (pas date de build)
- Ajouter toute nouvelle landing indexable dans sitemap-public-routes ou getAdditionalMarketingRoutes
Script : npm run build && curl -s https://www.laureolivie.fr/sitemap.xml | rg "prendre-rendez-vous|formation-ia-artisans" (doit être vide)
```

---

## Lot 4 — llms.txt & faits GEO (`public/llms.txt`)

```
Après toute modif catalogue / contact / RDV :
- 10 parcours NIV-01…NIV-10 ; seule NIV-01 = 4 h ; reste 7 h ; NIV-10 = 7 h ou 14 h
- contact@laureolivie.fr · /prendre-rdv (jamais yahoo, jamais /prendre-rendez-vous)
- Durées/tarifs lus depuis data/formations.ts + lib/tarifs-catalogue-participant.ts
- Mettre à jour la date en pied de fichier
```

---

## Lot 5 — Durées & nombre de formations (source unique)

```
Ne jamais coder en dur « 4 h » hors NIV-01.
Utiliser : data/formations.ts (champ duree), CATALOGUE_FORMATIONS_TOTAL, CATALOGUE_DUREE_*.
Corriger les reliquats : lib/schema-catalogue-course-jsonld.ts, lib/formation-catalogue-geo-extended.ts,
lib/blog-default-faq-schema.ts, composants ProgrammeAccordion* si titre « 4 h » sur NIV-02+.
grep -r "4 h" lib components app --include="*.tsx" --include="*.ts" | vérifier contexte NIV-01 uniquement
```

---

## Lot 6 — Métadonnées (title ≤ 60 car. suffixe | Laure Olivié, meta 120–160 car.)

```
Prompt page métier :
« Audite title, meta description, H1 de [URL]. Title ≤ 60 car. avec suffixe | Laure Olivié une seule fois.
Meta avec « formation IA pour le BTP » ou variante pilier. H1 = mot-clé + IDF si landing géo.
CTA = libellé CTA_RDV_LABEL uniquement. »

Script suggéré : scripts/audit-meta-lengths.mjs (à créer) sur app/**/page.tsx exports metadata.
```

---

## Lot 7 — JSON-LD (`lib/schema*.ts`, validate:schema)

```
Pour chaque nouvelle page formation :
- Course courseMode onsite · FAQPage si FAQ · BreadcrumbList
- Durée Course alignée data/formations.ts (4 h = NIV-01 seulement)
npm run validate:schema
Rich Results Test Google sur 3 URLs piliers après déploiement.
```

---

## Lot 8 — Maillage & 404

```
grep href= dans lib/maillage-clusters.ts et landings métier → chaque /blog/* doit exister (getArticle).
Lien électricien : /blog/ia-et-electricien-5-gains-de-temps-concrets (content/generated).
Max 1 lien même URL par page · ≥ 3 liens internes piliers sur landings SEO.
```

---

## Lot 9 — E-E-A-T & témoignages

```
Ne publier que des avis traçables (source lib/data/avis.ts ou /avis-clients).
Retirer chiffres non sourcés (« 12 h/semaine » → « d’après les participants » ou source).
Tableau pilier : « Gains observés en session (indicatifs) ».
Pas de cumul personnes formées · pas « 100 % finançable ».
```

---

## Lot 10 — LinkedIn & email

```
Libellé public : LINKEDIN_FOLLOWERS_LABEL (« plus de 14 000 abonnés ») — pas de chiffres précis variables dans le HTML.
grep -r yahoo teachizy 1e293b dans app components lib (hors scripts/)
```

---

## Lot 11 — Cannibalisation (contrôle manuel)

| Intention | Canonique |
|---|---|
| Pilier IA BTP | /formation-ia-btp |
| IDF | /formation-ia-btp-ile-de-france |
| Paris | /formation-ia-paris |
| Dirigeant | /formation-ia-dirigeant-pme-btp |
| Conducteur | /formation-ia-conducteur-de-travaux |
| Appels d’offres | /formation-ia-appels-offres-btp |

---

## Lot 12 — Contenu éditorial (3 mois)

```
Prioriser articles audit : AI Act, électricien 5 gains, DPGF/DQE, ordre de service, DC4, retenue garantie,
inter vs intra, prix 2026, Copilot, IA souveraine, DIUO/DOE, recrutement.
Chaque article : En bref, FAQ ≥ 3, 2–3 CTA /prendre-rdv, dateModified visible.
```

---

## Commandes utiles

```bash
npm run lint
npm run validate:schema
npm run audit:qualiopi-liens
npm run build
```
