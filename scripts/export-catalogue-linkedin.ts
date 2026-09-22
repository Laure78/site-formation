/**
 * Export du catalogue OFC (formations + ressources) pour l'Agent LinkedIn.
 *
 * Source de vérité : `data/formations.ts` et `lib/ressources-catalog.ts`.
 * Ce script ne duplique aucune donnée : il lit les catalogues du site et
 * écrit un JSON plat consommé par l'agent Claude Code.
 *
 * Usage : npm run linkedin:catalogue
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { FORMATIONS } from '../data/formations';
import { getRessourcesCatalog } from '../lib/ressources-catalog';

const SITE = 'https://www.laureolivie.fr';

const OUT_FILE =
  process.env.LINKEDIN_CATALOGUE_OUT ??
  path.join(process.env.HOME ?? '', 'Documents/OFC/LinkedIn/agent/catalogue-ofc.json');

/** Préfixe le domaine sur les chemins relatifs, laisse les URLs absolues intactes. */
function absolute(url: string): string {
  if (!url) return '';
  return /^https?:\/\//.test(url) ? url : `${SITE}${url.startsWith('/') ? '' : '/'}${url}`;
}

/** Texte concaténé servant au rapprochement sujet de post ↔ offre. */
function motsCles(...parts: (string | readonly string[] | undefined)[]): string {
  return parts
    .flatMap((p) => (Array.isArray(p) ? p : [p]))
    .filter((p): p is string => typeof p === 'string' && p.length > 0)
    .join(' · ');
}

const formations = FORMATIONS.map((f) => ({
  slug: f.slug,
  code: f.code,
  titre: f.titre,
  url: `${SITE}/formations/${f.slug}`,
  promesse: f.promesse,
  accroche: f.accroche,
  gamme: f.gamme,
  theme: f.theme ?? null,
  niveau: f.niveau,
  niveauLabel: f.niveauLabel,
  duree: f.duree,
  public: f.public,
  casUsage: f.casUsage,
  casUsageCourts: [...f.casUsageCourts],
  objectifs: [...f.objectifs],
  motsCles: motsCles(f.titre, f.promesse, f.casUsage, f.casUsageCourts, f.objectifs, f.public),
}));

const ressources = getRessourcesCatalog()
  .filter((r) => r.status !== 'archive')
  .map((r) => ({
    id: r.id,
    titre: r.title,
    url: absolute(r.viewUrl),
    urlTelechargement: r.downloadUrl ? absolute(r.downloadUrl) : null,
    type: r.resourceType,
    format: r.format,
    theme: r.topic,
    besoins: [...r.needs],
    cibles: [...r.audiences],
    casUsage: [...r.useCases],
    description: r.shortDescription,
    gratuit: r.isFree,
    inscriptionRequise: r.requiresRegistration,
    miseEnAvant: r.featured,
    externe: r.external,
    statut: r.status,
    niveauVigilance: r.safetyLevel,
    motsCles: motsCles(r.title, r.shortDescription, r.topic, r.useCases, r.needs, r.audiences),
  }));

const payload = {
  genereLe: new Date().toISOString(),
  source: 'site-formation — data/formations.ts + lib/ressources-catalog.ts',
  site: SITE,
  pageFormations: `${SITE}/formations`,
  pageRessources: `${SITE}/ressources`,
  nbFormations: formations.length,
  nbRessources: ressources.length,
  formations,
  ressources,
};

mkdirSync(path.dirname(OUT_FILE), { recursive: true });
writeFileSync(OUT_FILE, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');

console.log(`✓ Catalogue LinkedIn exporté : ${OUT_FILE}`);
console.log(`  ${formations.length} formations · ${ressources.length} ressources`);
