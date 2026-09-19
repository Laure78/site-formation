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

export type ColumnWithTasks = WorkspaceColumn & {
  tasks: WorkspaceTask[];
};
