import { LINKS } from '@/lib/internal-links';
import {
  LayoutDashboard,
  CalendarDays,
  CheckSquare,
  StickyNote,
  FolderOpen,
  Star,
  type LucideIcon,
} from 'lucide-react';

export type MonEspaceNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
};

export const MON_ESPACE_NAV: MonEspaceNavItem[] = [
  { href: LINKS.monEspace, label: 'Tableau de bord', icon: LayoutDashboard, exact: true },
  { href: LINKS.monEspaceAgenda, label: 'Agenda', icon: CalendarDays },
  { href: LINKS.monEspaceTaches, label: 'Mes tâches', icon: CheckSquare },
  { href: LINKS.monEspaceNotes, label: 'Mes notes', icon: StickyNote },
  { href: LINKS.monEspaceRessources, label: 'Mes ressources', icon: FolderOpen },
  { href: LINKS.monEspaceFavoris, label: 'Mes favoris', icon: Star },
];

export function isMonEspaceNavActive(pathname: string, item: MonEspaceNavItem): boolean {
  if (item.exact) return pathname === item.href;
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}
