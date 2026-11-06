import { FileText, HardHat, MapPin } from 'lucide-react';

const ITEMS = [
  {
    id: 'cas',
    titre: 'Cas pratiques BTP',
    texte: 'Mises en situation réelles inspirées de chantiers et de métiers.',
    Icon: HardHat,
  },
  {
    id: 'docs',
    titre: 'Documents métier',
    texte: 'Devis, DCE, rapports et comptes rendus, sur les documents que vous autorisez à utiliser.',
    Icon: FileText,
  },
  {
    id: 'idf',
    titre: 'Présentiel en Île-de-France',
    texte: 'Sessions en petits groupes et accompagnement personnalisé.',
    Icon: MapPin,
  },
] as const;

export function FormationsCatalogueTerrainBar() {
  return (
    <section
      aria-labelledby="terrain-formations-title"
      className="scroll-mt-[calc(var(--site-header-height,4.5rem)+0.5rem)] rounded-2xl bg-[#EFF6FF]/90 px-4 py-10 sm:px-8 md:py-12"
    >
      <h2 id="terrain-formations-title" className="sr-only">
        Des formations conçues pour le terrain
      </h2>
      <p className="font-display text-center text-xl font-bold text-[#101936] md:text-2xl">
        Des formations conçues pour le terrain
      </p>
      <ul className="mt-8 grid list-none gap-8 md:grid-cols-3 md:gap-10">
        {ITEMS.map(({ id, titre, texte, Icon }) => (
          <li key={id} className="flex flex-col items-center text-center md:items-start md:text-left">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#BFDBFE]/80 bg-white text-[#101936] shadow-sm">
              <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
            </span>
            <h3 className="mt-4 font-display text-lg font-bold text-[#101936]">{titre}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{texte}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
