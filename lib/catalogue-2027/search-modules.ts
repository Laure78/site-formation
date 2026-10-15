import {
  MODULES_CATALOGUE_2027,
  type CatalogueModule,
  type DisponibiliteCommerciale,
  type DomaineId,
  type MetierId,
  type ModuleDureeHeures,
} from '@/data/catalogue-2027';

export type ModuleSearchFilters = {
  query?: string;
  domaineId?: DomaineId | 'all';
  metierId?: MetierId | 'all';
  disponibilite?: DisponibiliteCommerciale | 'all';
  dureeHeures?: ModuleDureeHeures | 'all';
};

const SEARCH_ALIASES: Record<string, string[]> = {
  dce: ['dce', 'appel', 'offre', 'marché'],
  cctp: ['cctp', 'dce'],
  ccap: ['ccap', 'dce'],
  devis: ['devis', 'chiffrage', 'prix'],
  planning: ['planning', 'délai', 'delai'],
  doe: ['doe', 'réception', 'reception'],
  chantier: ['chantier', 'travaux'],
  facturation: ['facturation', 'électronique', 'electronique'],
  management: ['management', 'encadrement', 'équipe', 'equipe'],
  claude: ['claude', 'num-03'],
  ia: ['ia', 'intelligence artificielle', 'chatgpt'],
};

function normalize(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function matchesQuery(mod: CatalogueModule, query: string): boolean {
  const q = normalize(query);
  if (!q) return true;

  const haystack = normalize(
    [
      mod.code,
      mod.titre,
      mod.objectifPrincipal,
      mod.sousDomaine,
      mod.publicCible,
      ...mod.motsCles,
      ...mod.programme,
    ].join(' '),
  );

  if (haystack.includes(q)) return true;

  for (const [alias, terms] of Object.entries(SEARCH_ALIASES)) {
    if (q === alias || q.includes(alias)) {
      if (terms.some((t) => haystack.includes(normalize(t)))) return true;
    }
    if (terms.some((t) => normalize(t) === q) && haystack.includes(alias)) return true;
  }

  return q.split(/\s+/).every((token) => token.length < 2 || haystack.includes(token));
}

export function filterCatalogueModules(filters: ModuleSearchFilters = {}): CatalogueModule[] {
  const {
    query = '',
    domaineId = 'all',
    metierId = 'all',
    disponibilite = 'all',
    dureeHeures = 'all',
  } = filters;

  return MODULES_CATALOGUE_2027.filter((mod) => {
    if (domaineId !== 'all' && mod.domaineId !== domaineId) return false;
    if (metierId !== 'all' && !mod.metiers.includes(metierId)) return false;
    if (disponibilite !== 'all' && mod.disponibilite !== disponibilite) return false;
    if (dureeHeures !== 'all') {
      const variantes = mod.variantesDureeHeures ?? [mod.dureeHeures];
      if (!variantes.includes(dureeHeures) && mod.dureeHeures !== dureeHeures) return false;
    }
    if (!matchesQuery(mod, query)) return false;
    return true;
  });
}

export function libelleDisponibilite(d: DisponibiliteCommerciale): string {
  return d === 'disponible' ? 'Disponible' : 'Ouverture prévue en 2027';
}
