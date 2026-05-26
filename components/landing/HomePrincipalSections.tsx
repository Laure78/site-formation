import Link from 'next/link';
import {
  BookOpen,
  Calendar,
  Coins,
  GraduationCap,
  Sparkles,
  Target,
  User,
} from 'lucide-react';
import { LINKS } from '@/lib/internal-links';
import { formatProfessionalsTrainedCount } from '@/lib/constants';
import { SOCIAL_PROOF } from '@/lib/constants';

const cards = [
  {
    href: LINKS.formations,
    title: 'Catalogue des formations',
    desc: 'Formations IA pour le BTP certifiées Qualiopi — devis, chantier, appels d’offres',
    Icon: GraduationCap,
  },
  {
    href: LINKS.financement,
    title: 'Financement Constructys',
    desc: 'Financement possible via Constructys ou OPCO — plafonds 2026, dossier eGestion',
    Icon: Coins,
  },
  {
    href: LINKS.casUsageIaMetierBtp,
    title: 'Cas d’usage IA par métier',
    desc: 'Conducteur de travaux, chargé d’affaires, dirigeant PME BTP — exemples et documents',
    Icon: Target,
  },
  {
    href: LINKS.blog,
    title: 'Blog IA BTP',
    desc: 'Guides pratiques — ChatGPT, Claude, devis, mémoires techniques',
    Icon: BookOpen,
  },
  {
    href: LINKS.claudeAiBtp,
    title: 'Formation Claude AI BTP',
    desc: 'Guide complet Claude — Chat, Cowork, Code, Chrome',
    Icon: Sparkles,
  },
  {
    href: LINKS.aPropos,
    title: 'À propos',
    desc: `Laure Olivié — ${formatProfessionalsTrainedCount()} pros formés, note ${SOCIAL_PROOF.AVERAGE_RATING}`,
    Icon: User,
  },
  {
    href: LINKS.prendreRdv,
    title: 'Prendre RDV',
    desc: 'Visio découverte gratuite — devis personnalisé',
    Icon: Calendar,
  },
] as const;

const cardClass =
  'group flex h-full flex-col rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition hover:border-[var(--accent)]/40 hover:shadow-[0_14px_44px_rgba(15,23,42,0.08)]';

/**
 * Hub d’accès aux sections clés — signal de hiérarchie pour la SERP / sitelinks.
 */
export function HomePrincipalSections() {
  return (
    <section
      aria-labelledby="sections-principales"
      className="border-b border-slate-200 bg-white px-4 py-14 md:py-16"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="sections-principales"
          className="text-center font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl"
        >
          Tout ce qu’il vous faut pour former vos équipes à l’IA
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-slate-600 md:text-base">
          Accès direct aux formations, au financement, aux articles et à la prise de rendez-vous.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ href, title, desc, Icon }) => (
            <Link key={href} href={href} className={cardClass}>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-slate-900 group-hover:text-[var(--accent)]">
                {title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{desc}</p>
              <span className="mt-4 text-sm font-semibold text-[var(--accent)]">Accéder →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
