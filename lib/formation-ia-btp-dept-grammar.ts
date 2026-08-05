/**
 * Grammaire française des départements IDF — articles & prépositions locatives.
 * Source unique pour landings `/formation-ia-btp-*` (éviter « dans les Seine-Saint-Denis »).
 */

export type DeptArticle = 'le' | 'la' | "l'" | 'les' | null;

/** Forme locative complète à placer avant le nom (« en », « dans les », « à »…). */
export type DeptPrepositionLocative =
  | 'à'
  | 'en'
  | 'dans le'
  | 'dans la'
  | "dans l'"
  | 'dans les';

export type DeptGrammar = {
  /** Nom nu, sans article ni code — ex. « Seine-Saint-Denis » */
  nom: string;
  article: DeptArticle;
  prepositionLocative: DeptPrepositionLocative;
};

/** Valeurs validées (Paris + 7 départements IDF). */
export const DEPT_GRAMMAR_BY_CODE: Readonly<Record<string, DeptGrammar>> = {
  '75': { nom: 'Paris', article: null, prepositionLocative: 'à' },
  '77': { nom: 'Seine-et-Marne', article: 'la', prepositionLocative: 'en' },
  '78': { nom: 'Yvelines', article: 'les', prepositionLocative: 'dans les' },
  '91': { nom: 'Essonne', article: "l'", prepositionLocative: 'en' },
  '92': { nom: 'Hauts-de-Seine', article: 'les', prepositionLocative: 'dans les' },
  '93': { nom: 'Seine-Saint-Denis', article: 'la', prepositionLocative: 'en' },
  '94': { nom: 'Val-de-Marne', article: 'le', prepositionLocative: 'dans le' },
  '95': { nom: "Val-d'Oise", article: 'le', prepositionLocative: 'dans le' },
};

/** « en Seine-Saint-Denis » | « dans les Yvelines » | « à Paris » */
export function deptLocatif(g: DeptGrammar): string {
  return `${g.prepositionLocative} ${g.nom}`;
}

/** « la Seine-Saint-Denis » | « les Yvelines » | « l'Essonne » | « Paris » */
export function deptWithArticle(g: DeptGrammar): string {
  if (!g.article) return g.nom;
  if (g.article === "l'") return `l'${g.nom}`;
  return `${g.article} ${g.nom}`;
}

/** « La Seine-Saint-Denis » | « Les Yvelines » | « L'Essonne » | « Paris » */
export function deptWithArticleCapitalized(g: DeptGrammar): string {
  if (!g.article) return g.nom;
  if (g.article === "l'") return `L'${g.nom}`;
  return `${g.article.charAt(0).toUpperCase()}${g.article.slice(1)} ${g.nom}`;
}

/** « de la Seine-Saint-Denis » | « des Yvelines » | « de l'Essonne » | « du Val-de-Marne » | « de Paris » */
export function deptDe(g: DeptGrammar): string {
  if (!g.article) return `de ${g.nom}`;
  if (g.article === 'le') return `du ${g.nom}`;
  if (g.article === 'la') return `de la ${g.nom}`;
  if (g.article === "l'") return `de l'${g.nom}`;
  return `des ${g.nom}`;
}

export function getDeptGrammar(deptCode: string, fallbackNom?: string): DeptGrammar {
  const known = DEPT_GRAMMAR_BY_CODE[deptCode];
  if (known) return known;
  return {
    nom: fallbackNom ?? deptCode,
    article: null,
    prepositionLocative: 'en',
  };
}
