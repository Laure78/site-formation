export type WorkspaceColumnSection = 'months' | 'week' | 'custom';

export type WorkspaceHeaderTone =
  | 'blue'
  | 'yellow'
  | 'green'
  | 'gray'
  | 'rose'
  | 'violet';

export type WorkspaceColumn = {
  id: string;
  owner_id: string;
  title: string;
  section: WorkspaceColumnSection;
  header_tone: WorkspaceHeaderTone;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type WorkspaceTask = {
  id: string;
  owner_id: string;
  column_id: string | null;
  title: string;
  done: boolean;
  emphasis: boolean;
  due_date: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type WorkspaceNote = {
  id: string;
  owner_id: string;
  title: string;
  body: string;
  pinned: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type WorkspaceFavorite = {
  id: string;
  owner_id: string;
  label: string;
  href: string;
  sort_order: number;
  created_at: string;
};

export type WorkspaceResourceKind =
  | 'url'
  | 'document'
  | 'prompt'
  | 'outil'
  | 'procedure'
  | 'modele'
  | 'ressource_formation';

export type WorkspaceResourceCategory =
  | 'formation'
  | 'qualiopi'
  | 'prospection'
  | 'administratif'
  | 'ia'
  | 'communication'
  | 'site'
  | 'autre';

export type WorkspaceResource = {
  id: string;
  owner_id: string;
  title: string;
  description: string;
  kind: WorkspaceResourceKind;
  category: WorkspaceResourceCategory;
  link: string | null;
  is_favorite: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export const RESOURCE_KINDS: { id: WorkspaceResourceKind; label: string }[] = [
  { id: 'url', label: 'URL' },
  { id: 'document', label: 'Document' },
  { id: 'prompt', label: 'Prompt' },
  { id: 'outil', label: 'Outil' },
  { id: 'procedure', label: 'Procédure' },
  { id: 'modele', label: 'Modèle' },
  { id: 'ressource_formation', label: 'Ressource formation' },
];

export const RESOURCE_CATEGORIES: {
  id: WorkspaceResourceCategory;
  label: string;
}[] = [
  { id: 'formation', label: 'Formation' },
  { id: 'qualiopi', label: 'Qualiopi' },
  { id: 'prospection', label: 'Prospection' },
  { id: 'administratif', label: 'Administratif' },
  { id: 'ia', label: 'IA' },
  { id: 'communication', label: 'Communication' },
  { id: 'site', label: 'Site' },
  { id: 'autre', label: 'Autre' },
];

export type ColumnWithTasks = WorkspaceColumn & {
  tasks: WorkspaceTask[];
};
