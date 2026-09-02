import Link from 'next/link';
import {
  BookOpen,
  Calendar,
  Coins,
  FileText,
  GraduationCap,
  Sparkles,
  Target,
  User,
} from 'lucide-react';
import { CTA_RDV_HREF, CTA_RDV_LABEL } from '@/components/CtaRdv';
import { LINKS } from '@/lib/internal-links';
import { RevealShell, RevealGroupShell } from '@/components/motion/RevealShell';
import { OFC_CARD } from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';

const cards = [
  {
    href: '#offre-formations',
    title: 'Voir le catalogue',
    desc: 'IA BTP Qualiopi — devis, chantier, appels d\u2019offres',
    Icon: GraduationCap,
  },
  {
    href: LINKS.financement,
    title: 'Financement Constructys',
    desc: 'Plafonds 2026, dossier eGestion — selon éligibilité',
    Icon: Coins,
  },
  {
    href: LINKS.casUsageIaMetierBtp,
    title: 'Cas d\u2019usage par métier',
    desc: 'Conducteur, chargé d\u2019affaires, dirigeant — exemples concrets',
    Icon: Target,
  },
  {
    href: '#guide-conducteur-travaux',
    title: 'Guide conducteur de travaux (PDF gratuit)',
    desc: '6 skills Claude : DCE, PPSPS, CR, DOE — prompts inclus',
    Icon: FileText,
  },
  {
    href: LINKS.blog,
    title: 'Blog IA BTP',
    desc: 'Guides ChatGPT, Claude, devis, mémoires techniques',
    Icon: BookOpen,
  },
  {
    href: LINKS.claudeAiBtp,
    title: 'Claude AI BTP',
    desc: 'Chat, Cowork, Code, Chrome — guide complet',
    Icon: Sparkles,
  },
  {
    href: LINKS.aPropos,
    title: 'À propos',
    desc: 'Parcours, Qualiopi et références partenaires BTP',
    Icon: User,
  },
  {
    href: CTA_RDV_HREF,
    title: CTA_RDV_LABEL,
    desc: 'Devis personnalisé après échange de 30 minutes',
    Icon: Calendar,
  },
] as const;

const cardClass = `${OFC_CARD} group flex h-full flex-col p-6`;

/**
 * Hub d’accès aux sections clés — signal de hiérarchie pour la SERP / sitelinks.
 */
export function HomePrincipalSections() {
  return (
    <section
      aria-labelledby="sections-principales"
      className={OFC_SEC.whiteMesh}
    >
      <div className="mx-auto max-w-6xl">
        <RevealShell className="text-center">
          <h2
            id="sections-principales"
            className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl"
          >
            Tout pour former vos équipes à l&apos;IA
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-600 md:text-base">
            Formations, financement, articles et contact — accès direct.
          </p>
        </RevealShell>
        <RevealGroupShell className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3" staggerMs={55}>
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
        </RevealGroupShell>
      </div>
    </section>
  );
}
