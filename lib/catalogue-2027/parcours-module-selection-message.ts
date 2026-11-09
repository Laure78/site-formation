import type { CatalogueModule } from '@/data/catalogue-2027';
import {
  libellePrixModuleInter,
  libellePrixParcoursCompletInter,
} from '@/lib/catalogue-2027/parcours-affichage';
import { prixParcoursDepuisModules } from '@/data/catalogue-2027/tarifs';

export type ParcoursDemandeType = 'complet' | 'modules';

export function buildParcoursDevisMessage(opts: {
  parcoursTitre: string;
  demandeType: ParcoursDemandeType;
  modules: readonly CatalogueModule[];
}): string {
  const typeLine =
    opts.demandeType === 'complet'
      ? 'Type de demande : parcours complet (tous les modules du parcours).'
      : 'Type de demande : modules choisis à la carte.';

  const lines = opts.modules.map(
    (m) => `• ${m.code} — ${m.titre} (${libellePrixModuleInter(m)})`,
  );
  const totalHt = prixParcoursDepuisModules(opts.modules);
  const totalLine =
    opts.modules.length > 0
      ? `Total HT modules sélectionnés : ${libellePrixParcoursCompletInter({ prixInterHt: totalHt })} (somme des tarifs unitaires, sans remise).`
      : null;

  return [
    typeLine,
    `Parcours métier : ${opts.parcoursTitre}.`,
    ...(totalLine ? [totalLine] : []),
    '',
    'Modules concernés :',
    ...(lines.length > 0 ? lines : ['• (sélectionnez les modules sur la page ou précisez ici)']),
    '',
    'Modalité souhaitée : inter ou intra — période : 2027 ou ultérieure (à préciser ci-dessous si besoin).',
    'Nombre de participants : (à compléter dans le formulaire).',
  ].join('\n');
}

export function buildParcoursProgrammeMessage(opts: {
  parcoursTitre: string;
  demandeType: ParcoursDemandeType;
  modules: readonly CatalogueModule[];
}): string {
  const typeLine =
    opts.demandeType === 'complet'
      ? 'Demande : programme du parcours complet (tous les modules).'
      : 'Demande : programme des modules sélectionnés.';

  const lines = opts.modules.map((m) => `• ${m.code} — ${m.titre}`);

  return [
    typeLine,
    `Parcours métier : ${opts.parcoursTitre}.`,
    '',
    'Modules concernés :',
    ...(lines.length > 0 ? lines : ['• (précisez les modules souhaités ou indiquez « parcours complet »)']),
    '',
    'Merci de m’envoyer le programme détaillé (objectifs, durées, tarifs inter) par email après étude de cette demande.',
    'Modalité souhaitée : inter ou intra — période : 2027 ou ultérieure (à préciser dans le formulaire).',
  ].join('\n');
}
