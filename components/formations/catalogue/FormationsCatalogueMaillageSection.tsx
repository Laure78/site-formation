import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { LINKS } from '@/lib/internal-links';

const chipClass =
  'inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 transition hover:border-ofc-accent hover:bg-blue-50 hover:text-ofc-accent';

/**
 * Maillage SEO compact — piliers et ressources.
 * Les 6 fiches catalogue sont déjà liées dans « Formations IA disponibles »
 * (pas de doublon d’URL sur la même page).
 */
export function FormationsCatalogueMaillageSection() {
  const links = [
    { href: LINKS.formationIaBtpPillar, label: 'Formation IA pour le BTP — page pilier' },
    { href: LINKS.formationParis, label: 'Formation IA pour le BTP à Paris' },
    { href: LINKS.iaDevis, label: 'IA devis bâtiment' },
    { href: LINKS.iaAnalyseDce, label: 'Analyser un DCE avec l’IA' },
    { href: LINKS.formationConducteurTravaux, label: 'IA conducteur de travaux — page métier' },
    { href: LINKS.parcoursConducteurDeTravaux, label: 'Parcours Conducteur de travaux' },
    { href: LINKS.financement, label: 'Financement Constructys' },
    { href: LINKS.skillsClaudeBtp, label: '5 skills Claude gratuits pour le BTP' },
    { href: LINKS.skillsChatgptBtp, label: 'Skills ChatGPT BTP — tutoriel et 6 modèles' },
    { href: LINKS.ressources, label: 'Ressources IA pour le BTP' },
    { href: LINKS.aPropos, label: 'À propos de Laure Olivié' },
  ] as const;

  return (
    <section className="mt-12 border-t border-slate-200 pt-10" aria-labelledby="catalogue-maillage">
      <h2 id="catalogue-maillage" className="font-display text-lg font-semibold text-ofc-ink">
        Aller plus loin
      </h2>
      <ul className="mt-4 flex flex-wrap gap-2">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className={chipClass}>
              {label}
              <ArrowUpRight size={14} aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
