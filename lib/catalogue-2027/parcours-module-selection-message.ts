import type { CatalogueModule } from '@/data/catalogue-2027';
import { libellePrixModuleInter } from '@/lib/catalogue-2027/parcours-affichage';

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

  return [
    typeLine,
    `Parcours métier : ${opts.parcoursTitre}.`,
    '',
    'Modules concernés :',
    ...(lines.length > 0 ? lines : ['• (sélectionnez les modules sur la page ou précisez ici)']),
    '',
    'Modalité souhaitée : inter ou intra — période : 2027 ou ultérieure (à préciser ci-dessous si besoin).',
    'Nombre de participants : (à compléter dans le formulaire).',
  ].join('\n');
}
