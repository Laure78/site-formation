# Audit — pages et documents réglementaires Qualiopi

**Date de l'audit :** 22 août 2026  
**Périmètre :** dépôt `site-formation` (laureolivie.fr) — lecture seule, sans modification du code applicatif.  
**Méthode :** recherche dans `app/`, `components/`, `data/`, `content/`, `public/` (routes, PDF, liens Footer / Header / fiches formation).

---

## 1. Synthèse par document

| Document | Existe ? | URL ou chemin exact | Lien depuis le Footer ? | Date de mise à jour visible ? |
|---|---|---|---|---|
| **Procédure de réclamation / médiation** | **Oui** (page HTML) | Route : `/reclamations` — `app/reclamations/page.tsx` | **Oui** — colonne **Légal** (`NAV_LEGAL`, libellé « Réclamations ») | **Non** — pas de date affichée sur la page ; délais procéduraux : accusé sous 48 h ouvrées, réponse sous 15 jours ouvrés (`lib/qualiopi-info.ts` → `QUALIOPI_RECLAMATIONS`) |
| **Livret d'accueil du stagiaire** | **Non** (document réglementaire OFC) | Aucune route dédiée, aucun PDF `livret*`, `accueil*stagiaire*` dans `public/` | **Non** | — |
| **Règlement intérieur** | **Oui** (page HTML) | Route : `/reglement-interieur` — `app/reglement-interieur/page.tsx` | **Oui** — colonne **Légal** (« Règlement intérieur ») | **Oui** — « Version en vigueur au : **30 janvier 2026** » (pied de page de la page) |
| **Page accessibilité / handicap** | **Oui** (2 pages complémentaires) | `/accessibilite-handicap` — `app/accessibilite-handicap/page.tsx` ; `/annuaire-handicap` — `app/annuaire-handicap/page.tsx` | **Oui** — colonne **Légal** (« Accessibilité & handicap », « Annuaire handicap ») + lien central sous le bloc référente (`ReferentHandicapBlock`) | **Partiel** — annuaire : « Document actualisé le **30 janvier 2026** » ; page accessibilité : **aucune date** affichée |
| **Certificat Qualiopi téléchargeable** | **Oui** (PDF) | Fichier : `public/documents/certificat-qualiopi-ofc.pdf` → URL `/documents/certificat-qualiopi-ofc.pdf` ; page descriptive : `/qualiopi` — `app/qualiopi/page.tsx` | **Oui (indirect)** — lien PDF dans `QualiopiCertificationNotice` (sous la grille footer) ; colonne **Légal** → « Organisme certifié Qualiopi » (`/qualiopi`, qui propose aussi le téléchargement) | **Oui** — validité certificat : **du 16/01/2025 au 15/01/2028**, n° **520911-1** (`QUALIOPI_LEGAL` dans `lib/qualiopi-info.ts`, affiché dans le footer via `QualiopiCertificationNotice`) |

### Précisions importantes

#### Procédure de réclamation
- Contenu complet : objet, mode de saisine (email `laureolivie@yahoo.fr`), chronologie (accusé / instruction / recours), amélioration continue, documents connexes.
- Cross-liens depuis `/reclamations` vers CGV, règlement intérieur, indicateurs de résultats, accessibilité handicap.
- Présent dans le sitemap (`app/sitemap.ts`, priorité 0,45).
- **Pas de PDF** de procédure dans `public/`.
- Le terme « réclamation » apparaît aussi dans du contenu **métier BTP** (mémoire de réclamation marchés publics) — hors périmètre réglementaire OFC :
  - `/blog/memoire-reclamation-btp-ia`
  - `/ressources/tuto-skill-memoire-reclamation-bework` (+ PDF BeWork)

#### Livret d'accueil du stagiaire
- **Absent** en tant que document Qualiopi remis aux stagiaires OFC.
- Contenu **proche mais non équivalent** (ressource marketing / tuto IA pour employeurs RH) :
  - Page : `/ressources/tuto-skill-livret-integration-ofc`
  - PDF : `public/ressources/pdf/tuto-skill-livret-integration-ofc.pdf`
  - Lien interne : `LINKS.tutoSkillLivretIntegrationOfc` dans `lib/internal-links.ts`
- Ce tuto porte sur un « livret d'intégration / accueil RH BTP » (skill Claude), pas sur un livret d'accueil stagiaire OFC.
- Aucun lien Footer, Header ni fiche formation catalogue vers un livret stagiaire.

#### Règlement intérieur
- Page HTML intégrale (15 articles, Code du travail L.6352-*).
- Article 14 : réclamations (email + délais).
- Article 13 : personnes en situation de handicap (référente Laure Olivié).
- **Pas de PDF** `reglement-interieur.pdf` dans `public/`.
- Exclu du sitemap (`SITEMAP_EXCLUDED_LOW_VALUE_PATHS` dans `app/sitemap.ts`) mais indexable via canonical.

#### Accessibilité / handicap
- `/accessibilite-handicap` : processus d'accueil, référente, adaptations possibles, réorientation.
- `/annuaire-handicap` : contacts AGEFIPH, MDPH, Cap emploi — **version web uniquement** (commentaire L.60 : « pas de PDF séparé »).
- Ancien lien vers `public/documents/annuaire-handicap.pdf` signalé comme absent dans `VERIFICATION-FINALE-IND1.md` — le fichier **n'existe toujours pas** dans `public/documents/` (seuls certificat Qualiopi + checklist HTML).
- Bloc référente réutilisé : `components/formation/ReferentHandicapBlock.tsx` (footer compact + fiches formation via `InfosQualiopi`).
- Header (`components/Header.tsx`) : **aucun** lien direct vers ces pages.

#### Certificat Qualiopi
- PDF présent (~154 Ko) : `public/documents/certificat-qualiopi-ofc.pdf`.
- Liens de téléchargement :
  - `components/QualiopiCertificationNotice.tsx` L.39–46 (`download`, href `QUALIOPI_LEGAL.certificatPdfHref`)
  - `app/qualiopi/page.tsx` L.43–49 (bouton CTA)
  - Constante : `LINKS.certificatQualiopi` → `/documents/certificat-qualiopi-ofc.pdf` dans `lib/internal-links.ts`
- Logo Qualiopi : toujours via `<QualiopiBadge />` (jamais seul).

---

## 2. Liens pointant vers `ofc-creation-entreprise.fr`

**Résultat : aucune occurrence dans le code de production** (`app/`, `components/`, `data/`, `content/`, `public/`, `lib/`).

Seules mentions trouvées (documentation interne d'audit, pas de lien cliquable vers l'ancien domaine) :

| Fichier | Ligne(s) | Contexte |
|---|---|---|
| `audit-qualiopi-2026-08.md` | 76, 111 | Note d'audit : « Aucune occurrence dans le dépôt » |
| `docs/recette-qualiopi-2026-08.md` | 193, 230 | Section recette : contrôle Search Console / redirections serveur |

**Liens connexes (pas l'ancien domaine)** — fiche data.gouv entreprise :
- `lib/schema-constants.ts` L.112
- `lib/schema-a-propos-unified-graph.ts` L.87
- `scripts/audit-liens-qualiopi.mjs` L.56  
  → `https://annuaire-entreprises.data.gouv.fr/entreprise/ofc-creation-d-entreprise-ofc-creation-d-entreprise-905244281`

---

## 3. Structure exacte du Footer

**Fichier :** `components/Footer.tsx`  
**Données navigation :** `lib/nav.ts` → exposées via `lib/site.ts` (`SITE.nav.footer`)

### Architecture visuelle (de haut en bas)

1. **Bandeau CTA catalogue** — titre, preuve sociale, lien guide conducteur, bouton « Catalogue »
2. **Grille principale** — `grid gap-8 sm:grid-cols-2 lg:grid-cols-6`
   - **Colonne 1–2 (identité)** — `sm:col-span-2 lg:col-span-2` : logo, tagline, description, contacts (email, tel, URL), adresse légale (SIRET, NDA, mention agrément)
   - **Colonne « Entreprise »** — `NAV_ENTREPRISE` (7 liens)
   - **Colonne « Services »** — `NAV_SERVICES` (catalogue + fiches NIV-01 à NIV-05 + marché public + financement)
   - **Colonne « Ressources »** — `NAV_RESSOURCES` (blog, diagnostic, checklist, lexique BeWork, guide PDF, études de cas, cas d'usage)
   - **Colonne « Légal »** — `NAV_LEGAL` (10 liens — voir ci-dessous)
3. **Bandeaux exploration** — 2 colonnes `FooterExploreStrip` : métiers (`NAV_METIERS`, 12 liens) + IDF (`NAV_IDF`, 9 liens)
4. **Référente handicap** — `ReferentHandicapBlock variant="compact"`
5. **Lien accessibilité** — texte centré vers `/accessibilite-handicap`
6. **Notice Qualiopi** — `QualiopiCertificationNotice` (logo + validité + **lien PDF certificat** + data.gouv + indicateurs)
7. **Barre basse** — copyright, réseaux sociaux

### Contenu colonne « Légal » (`NAV_LEGAL`, `lib/nav.ts` L.72–83)

| # | Label | Href |
|---|---|---|
| 1 | CGV | `/cgv` |
| 2 | Mentions légales | `/mentions-legales` |
| 3 | Confidentialité | `/politique-confidentialite` |
| 4 | Règlement intérieur | `/reglement-interieur` |
| 5 | Accessibilité & handicap | `/accessibilite-handicap` |
| 6 | Annuaire handicap | `/annuaire-handicap` |
| 7 | Indicateurs de résultats | `/indicateurs-resultats` |
| 8 | Organisme certifié Qualiopi | `/qualiopi` |
| 9 | Réclamations | `/reclamations` |
| 10 | llms.txt | `/llms.txt` |

**Où insérer une nouvelle colonne :** la grille `lg:grid-cols-6` alloue 2 colonnes à l'identité + 4 colonnes nav (`Entreprise`, `Services`, `Ressources`, `Légal`). Pour une 5ᵉ colonne thématique (ex. « Qualité / stagiaire »), il faudra :
- ajouter une constante dans `lib/nav.ts` (ex. `NAV_QUALITE`)
- l'exposer dans `lib/site.ts` → `SITE.nav.footer`
- ajuster la grille dans `Footer.tsx` (passer ex. à `lg:grid-cols-7` ou regrouper / réduire une colonne existante)
- respecter la règle « une seule ancre par URL dans le footer » (`lib/nav.ts` L.3).

---

## 4. Fichiers PDF dans `public/` liés à la conformité

### Documents réglementaires / Qualiopi (périmètre audit)

| Chemin | Rôle | Lié depuis le site ? |
|---|---|---|
| `public/documents/certificat-qualiopi-ofc.pdf` | Certificat Qualiopi Certifopac n° 520911-1 | **Oui** — footer, `/qualiopi` |

### Absents (recherchés, non trouvés)

| Document attendu | Statut |
|---|---|
| `reglement-interieur.pdf` | **Absent** |
| `livret-accueil-stagiaire.pdf` / `livret*stagiaire*` | **Absent** |
| `procedure-reclamations.pdf` / `reclamation*.pdf` (OFC) | **Absent** |
| `public/documents/annuaire-handicap.pdf` | **Absent** (page web à la place) |

### Autres fichiers `public/documents/`

| Chemin | Rôle conformité |
|---|---|
| `public/documents/checklist-10-prompts-chatgpt-btp.html` | Lead magnet marketing — **hors** conformité Qualiopi |
| `public/documents/README.md` | Documentation interne (référence certificat) |

### PDF proches du sujet mais hors conformité stagiaire

| Chemin | Note |
|---|---|
| `public/ressources/pdf/tuto-skill-livret-integration-ofc.pdf` | Tuto IA « livret d'intégration RH BTP » — **pas** le livret d'accueil stagiaire OFC |
| `public/ressources/pdf/tuto-skill-memoire-reclamation-bework.pdf` | Tuto BeWork mémoire de réclamation marchés publics — **pas** la procédure réclamation OFC |

### Programmes de formation (Qualiopi indicateur 1 — programmes PDF)

Les fiches catalogue référencent des PDF sous `public/formations/` (ex. `programme-niveau-1-ia-batiment-travaux-publics.pdf`, programmes NIV-02 à NIV-05, etc.) — **29+ PDF pédagogiques**, distincts des 5 documents réglementaires audités.

---

## 5. Composant / pattern pour pages de contenu statique

**Il n'existe pas de composant layout partagé** nommé `LegalLayout`, `PageLayout`, `Prose` ou équivalent dans `components/`.

### Pattern dominant (pages légales / institutionnelles)

Exemplaires : `app/mentions-legales/page.tsx`, `app/cgv/page.tsx`, `app/reglement-interieur/page.tsx`, `app/reclamations/page.tsx`, `app/qualiopi/page.tsx`.

```tsx
import { createPageMetadata } from '@/lib/seo';

export const revalidate = 3600;

export const metadata = createPageMetadata({
  title: '…',
  description: '…',
  path: '/…',
});

export default function MaPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="font-display text-3xl font-bold text-slate-900 md:text-4xl">…</h1>
      <article className="mt-12 space-y-10 text-slate-700">
        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">…</h2>
          …
        </section>
      </article>
    </div>
  );
}
```

### Variante accessibilité handicap

- Fichier : `app/accessibilite-handicap/page.tsx`
- Police locale : `Poppins` via `next/font/google`
- Sous-composant **local** `Section` (non exporté, L.26–45)
- Conteneur : `max-w-4xl`, titres H2 en `#377CF3`

### Composants Qualiopi réutilisables (à composer, pas layout page)

| Composant | Usage |
|---|---|
| `QualiopiCertificationNotice` | Footer, pages qualité |
| `ReferentHandicapBlock` | Footer, `/annuaire-handicap`, fiches formation |
| `MediationCm2cBlock` | `/reclamations`, CGV |
| `InfosQualiopi` / `CatalogueInfosQualiopi` | Fiches formation (9 sections indicateur 1) |

### Recommandation pour homogénéité des nouvelles pages

Reproduire le pattern `createPageMetadata` + conteneur `max-w-4xl` + `font-display` sur H1/H2, ou extraire un futur `LegalPageShell` — **non présent aujourd'hui**.

---

## 6. Génération sitemap et robots

### Sitemap

| Aspect | Détail |
|---|---|
| **Fichier** | `app/sitemap.ts` |
| **Mécanisme** | **Next.js App Router** — export default `sitemap()` retournant `MetadataRoute.Sitemap` → servi à `/sitemap.xml` |
| **next-sitemap** | **Non utilisé** (absent de `package.json`) |
| **Dates `lastModified`** | `lib/sitemap-last-modified.ts` + script build `scripts/generate-sitemap-dates.mjs` (carte git générée au `npm run build`) |
| **Pages réglementaires dans le sitemap** | `/reclamations`, `/accessibilite-handicap`, `/annuaire-handicap`, `/qualiopi`, `/indicateurs-resultats` — **incluses** |
| **Pages réglementaires exclues** | `/mentions-legales`, `/cgv`, `/reglement-interieur`, `/politique-confidentialite` — listées dans `SITEMAP_EXCLUDED_LOW_VALUE_PATHS` (indexables, faible priorité crawl) |

### Robots

| Aspect | Détail |
|---|---|
| **Fichier route** | `app/robots.ts` |
| **Ancien mécanisme** | `app/robots.txt/route.ts` — **supprimé** (migration vers Metadata Route) |
| **Logique** | `lib/robots-txt.ts` → `buildRobotsMetadata()` |
| **Contenu** | Allow `/` pour Googlebot, Bingbot, bots IA (GPTBot, ClaudeBot, Google-Extended, etc.) ; Disallow `/api/`, `/admin/`, `/acces-admin`, `/espace-apprenant/` |
| **Host + Sitemap** | `Host: www.laureolivie.fr` ; `Sitemap: https://www.laureolivie.fr/sitemap.xml` |
| **Statique vs dynamique** | Généré à la demande par Next.js (Metadata Route), règles codées en dur dans `lib/robots-txt.ts` |

---

## 7. Écarts Qualiopi identifiés (actions suggérées)

| Écart | Priorité | Piste |
|---|---|---|
| **Livret d'accueil du stagiaire** absent (page + PDF) | **Haute** | Créer `/livret-accueil-stagiaire` (ou PDF + page) et lier depuis Footer colonne Légal / fiches formation |
| **Procédure réclamations** sans date de version | Moyenne | Ajouter « Version en vigueur au : … » comme sur le RI |
| **Page accessibilité** sans date de version | Moyenne | Aligner sur annuaire handicap (30/01/2026) ou date dédiée |
| **Règlement intérieur** sans PDF téléchargeable | Basse | Optionnel — la page HTML suffit si consultable en ligne ; PDF faciliterait remise aux stagiaires |
| **Annuaire handicap PDF** référencé historiquement | Résolu côté contenu | Version web active ; vérifier que l'audit Qualiopi accepte le format HTML |

---

## 8. Index des fichiers clés

| Rôle | Chemin |
|---|---|
| Footer | `components/Footer.tsx` |
| Nav footer | `lib/nav.ts` |
| Liens internes | `lib/internal-links.ts` |
| Données Qualiopi | `lib/qualiopi-info.ts`, `config/qualiopi.ts` |
| Réclamations | `app/reclamations/page.tsx` |
| Règlement intérieur | `app/reglement-interieur/page.tsx` |
| Accessibilité | `app/accessibilite-handicap/page.tsx` |
| Annuaire handicap | `app/annuaire-handicap/page.tsx` |
| Qualiopi | `app/qualiopi/page.tsx` |
| Certificat PDF | `public/documents/certificat-qualiopi-ofc.pdf` |
| Sitemap | `app/sitemap.ts` |
| Robots | `app/robots.ts`, `lib/robots-txt.ts` |

---

*Rapport généré par audit statique du dépôt — vérifier en production les URLs et téléchargements PDF après déploiement.*
