/**
 * Rapport audit — harmonisation référentiel modules parcours métiers.
 * Usage : npx tsx scripts/rapport-referentiel-modules-parcours.ts
 */
import {
  ARBITRAGES_PEDAGOGIQUES_NIVEAU,
  getAllParcoursComputed,
  getParcoursIdsPourModule,
  LEGACY_DUREE_HEURES_AVANT,
  legacyPrixInterParcoursHt,
  MODULES_CATALOGUE_2027,
  NIVEAU_LIBELLE,
} from '../data/catalogue-2027';

const parcoursModules = new Map<string, string[]>();
for (const p of getAllParcoursComputed()) {
  for (const code of p.modulesCodes) {
    const list = parcoursModules.get(code) ?? [];
    if (!list.includes(p.id)) list.push(p.id);
    parcoursModules.set(code, list);
  }
}

console.log('# Référentiel modules parcours métiers — audit harmonisation\n');
console.log('## Grille après harmonisation\n');
console.log('| Niveau | Durée | Prix HT / participant |');
console.log('| --- | --- | --- |');
console.log('| 1 · Débutant | 4 h | 120 € |');
console.log('| 2 · Avancé | 4 h | 170 € |');
console.log('| 3 · Approfondi | 14 h | 620 € |');
console.log('\n## Parcours — totaux calculés (somme modules)\n');
console.log('| Parcours | Modules | Durée | Prix HT (contrôle interne) |');
console.log('| --- | --- | --- | --- |');
for (const p of getAllParcoursComputed()) {
  console.log(`| ${p.id} | ${p.moduleCount} | ${p.dureeHeures} h | ${p.prixInterHt} € |`);
}

console.log('\n## Modules — avant / après\n');
console.log(
  '| Code | Parcours | Avant (h · €) | Après niveau | Après (h · €) | Fiche catalogue |',
);
console.log('| --- | --- | --- | --- | --- | --- |');
for (const m of MODULES_CATALOGUE_2027) {
  const avantH = LEGACY_DUREE_HEURES_AVANT[m.code];
  const avantP = legacyPrixInterParcoursHt(avantH);
  const parcours = getParcoursIdsPourModule(m.code).join(', ') || '—';
  const fiche = m.href ? 'oui' : '—';
  console.log(
    `| ${m.code} | ${parcours} | ${avantH} h · ${avantP} € | ${NIVEAU_LIBELLE[m.niveau]} | ${m.dureeHeures} h · ${m.prixInterHt} € | ${fiche} |`,
  );
}

console.log('\n## Modules partagés entre plusieurs parcours\n');
for (const m of MODULES_CATALOGUE_2027) {
  const ids = getParcoursIdsPourModule(m.code);
  if (ids.length > 1) {
    console.log(`- **${m.code}** : ${ids.join(', ')}`);
  }
}

console.log('\n## Arbitrages pédagogiques documentés\n');
for (const a of ARBITRAGES_PEDAGOGIQUES_NIVEAU) {
  console.log(`- **${a.code}** — ${a.note}`);
}

const autresArbitrage = MODULES_CATALOGUE_2027.filter(
  (m) =>
    LEGACY_DUREE_HEURES_AVANT[m.code] >= 14 &&
    m.niveau !== 3 &&
    !ARBITRAGES_PEDAGOGIQUES_NIVEAU.some((x) => x.code === m.code),
).map((m) => m.code);

if (autresArbitrage.length > 0) {
  console.log('\n## Arbitrages à valider (ex-14 h non listés ci-dessus)\n');
  for (const code of autresArbitrage) {
    console.log(`- **${code}** — reclassé niveau 2 (4 h) ; condensé programme à valider.`);
  }
}

console.log('\n## Modules hors des 5 parcours (référentiel complet 35)\n');
const hors = MODULES_CATALOGUE_2027.filter((m) => getParcoursIdsPourModule(m.code).length === 0);
console.log(hors.map((m) => m.code).join(', ') || 'aucun');
