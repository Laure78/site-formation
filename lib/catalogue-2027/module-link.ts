import { getModuleByCode, type ModuleCode } from '@/data/catalogue-2027';
import { LINKS } from '@/lib/internal-links';

/** Lien fiche programme si le module est rattaché à une formation catalogue, sinon ancre modules. */
export function moduleCatalogueHref(code: string): string {
  const mod = getModuleByCode(code as ModuleCode);
  if (mod?.href) return mod.href;
  return `${LINKS.formations}#catalogue-modules`;
}

export function moduleHasProgrammePage(code: string): boolean {
  const mod = getModuleByCode(code as ModuleCode);
  return Boolean(mod?.href);
}
