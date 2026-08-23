import type { LucideIcon } from 'lucide-react';
import { Building2, FileText, HardHat, Landmark } from 'lucide-react';
import { LINKS } from '@/lib/internal-links';
import { isFormationCataloguePublished } from '@/lib/formation-catalogue-visibility';

/** Page métier / landing rattachée à une fiche catalogue (méga-menu). */
export type CatalogueFormationNavPage = {
  href: string;
  label: string;
};

/** Liens méga-menu — même ordre que le catalogue /formations (niveau puis réf.). */
export type CatalogueFormationNavLink = {
  href: string;
  label: string;
  /** Sous-titre optionnel sous le titre (désactivé dans le menu : infos tarif/durée sur les fiches). */
  description?: string;
  icon: LucideIcon;
  /** Landings métier associées — une URL unique dans tout le menu. */
  pages?: readonly CatalogueFormationNavPage[];
};

const ALL_CATALOGUE_FORMATIONS_NAV_LINKS: CatalogueFormationNavLink[] = [
  {
    href: LINKS.formationIaBtpNiveau1BatimentTp,
    label: "L'IA au service des pros du bâtiment et des travaux publics",
    icon: Building2,
    pages: [
      { href: LINKS.chatgptArtisans, label: 'TPE & PME du bâtiment' },
      { href: LINKS.formationIaDirigeantBtp, label: 'Dirigeant PME' },
      { href: LINKS.formationElectricienBtp, label: 'Électricien' },
      { href: LINKS.formationPlombierBtp, label: 'Plombier' },
      { href: LINKS.formationIaPeintreBatiment, label: 'Peintre' },
      { href: LINKS.formationIaCouvreurBtp, label: 'Couvreur-zingueur' },
      { href: LINKS.formationIaCharpentierMenuisierBtp, label: 'Charpentier & menuisier' },
      { href: LINKS.formationIaGrosOeuvreBtp, label: 'Gros œuvre' },
    ],
  },
  {
    href: LINKS.formationAO,
    label: "L'IA appliquée aux appels d'offres BTP",
    icon: FileText,
    pages: [
      { href: LINKS.formationChargeAffairesBtp, label: "Chargé d'affaires" },
      { href: LINKS.formationIaMarchePublicTravaux, label: 'Marché public de travaux' },
      { href: LINKS.formationIaEtancheur, label: 'Étancheur' },
    ],
  },
  {
    href: LINKS.formationConduiteTravauxSuiviChantier,
    label: "L'IA appliquée à la conduite de travaux",
    icon: HardHat,
    pages: [
      { href: LINKS.formationConducteurTravaux, label: 'Conducteur de travaux' },
      { href: LINKS.formationIaChefChantierTp, label: 'Chef de chantier TP' },
      { href: LINKS.formationIaAssistanteTravaux, label: 'Assistante travaux' },
      { href: LINKS.formationIaTravauxPublics, label: 'Travaux publics' },
    ],
  },
  {
    href: LINKS.formationMaitriserClaudeAiBtp,
    label: 'Maîtriser Claude AI pour le BTP — Chat, Cowork & Code',
    icon: FileText,
  },
  {
    href: LINKS.formationIaMaitriseOeuvre,
    label: "L'IA au service des maîtres d'œuvre",
    icon: Landmark,
  },
];

export function getCatalogueFormationsNavLinks(
  at: Date = new Date(),
): CatalogueFormationNavLink[] {
  return ALL_CATALOGUE_FORMATIONS_NAV_LINKS.filter((link) => {
    if (link.href === LINKS.formationConduiteTravauxSuiviChantier) {
      return isFormationCataloguePublished('NIV-03', at);
    }
    return true;
  });
}

export const CATALOGUE_FORMATIONS_NAV_LINKS: CatalogueFormationNavLink[] =
  getCatalogueFormationsNavLinks();

export function catalogueFormationNavContainsPath(pathname: string): boolean {
  return getCatalogueFormationsNavLinks().some(
    (l) =>
      pathname === l.href ||
      pathname.startsWith(`${l.href}/`) ||
      (l.pages ?? []).some((p) => pathname === p.href || pathname.startsWith(`${p.href}/`)),
  );
}

export function catalogueFormationNavParentHref(pathname: string): string | null {
  for (const link of getCatalogueFormationsNavLinks()) {
    if (pathname === link.href || pathname.startsWith(`${link.href}/`)) return link.href;
    if ((link.pages ?? []).some((p) => pathname === p.href || pathname.startsWith(`${p.href}/`))) {
      return link.href;
    }
  }
  return null;
}
