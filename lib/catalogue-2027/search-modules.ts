import {
  MODULES_CATALOGUE_2027,
  SOUS_DOMAINES_IA_CHANTIER,
  type CatalogueModule,
  type DisponibiliteCommerciale,
  type DomaineId,
  type MetierId,
  type ModuleDureeHeures,
  type SousDomaineIaChantierId,
  moduleMatchesThematique,
} from '@/data/catalogue-2027';

export type ModuleSearchFilters = {
  query?: string;
  domaineId?: DomaineId | 'all';
  metierId?: MetierId | 'all';
  disponibilite?: DisponibiliteCommerciale | 'all';
  dureeHeures?: ModuleDureeHeures | 'all';
  thematiqueChantierIa?: SousDomaineIaChantierId | 'all';
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
  organisation: ['organisation chantier', 'organisation', 'installation chantier'],
  securite: ['sécurité', 'securite', 'prévention', 'prevention'],
  ppsps: ['ppsps', 'accueil sécurité', 'accueil securite', 'epi'],
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

  const thematiqueHaystack = SOUS_DOMAINES_IA_CHANTIER.filter((t) =>
    t.moduleCodes.includes(mod.code),
  )
    .flatMap((t) => [t.titre, ...t.motsCleRecherche, ...t.sujets])
    .join(' ');

  const haystack = normalize(
    [
      mod.code,
      mod.titre,
      mod.objectifPrincipal,
      mod.sousDomaine,
      mod.publicCible,
      ...mod.motsCles,
      ...mod.programme,
      thematiqueHaystack,
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
    thematiqueChantierIa = 'all',
  } = filters;

  return MODULES_CATALOGUE_2027.filter((mod) => {
    if (
      thematiqueChantierIa !== 'all' &&
      !moduleMatchesThematique(mod.code, thematiqueChantierIa)
    ) {
      return false;
    }
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
