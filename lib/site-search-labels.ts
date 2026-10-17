export type SiteSearchKind =
  | 'tuto'
  | 'guide'
  | 'formation'
  | 'article'
  | 'page'
  | 'parcours'
  | 'evenement';

export type SiteSearchScope = 'all' | 'ressources';

const KIND_LABEL: Record<SiteSearchKind, string> = {
  tuto: 'Tuto PDF',
  guide: 'Guide',
  formation: 'Formation',
  article: 'Article blog',
  page: 'Page',
  parcours: 'Parcours métier',
  evenement: 'Événement',
};

export function siteSearchKindLabel(kind: SiteSearchKind): string {
  return KIND_LABEL[kind];
}
