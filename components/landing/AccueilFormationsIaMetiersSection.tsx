import Link from 'next/link';
import { Building2, FileSearch, HardHat, MapPin, MessageSquare } from 'lucide-react';
import { LINKS } from '@/lib/internal-links';
import { OFC_CARD } from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';
import { RevealShell, RevealGroupShell } from '@/components/motion/RevealShell';

const CLUSTER_BLOCKS = [
  {
    href: LINKS.formationChatgptBtp,
    title: 'ChatGPT pour le BTP',
    desc: 'Devis, comptes rendus, administratif, analyse documentaire et communication.',
    Icon: MessageSquare,
  },
  {
    href: LINKS.formationIaConducteurDeTravaux,
    title: 'IA pour les conducteurs de travaux',
    desc: 'Chantier, documents, suivi, réunions, réserves et DOE.',
    Icon: HardHat,
  },
  {
    href: LINKS.formationIaAppelsOffresBtp,
    title: 'IA et appels d\'offres',
    desc: 'DCE, RC, CCTP, CCAP, conformité et mémoire technique.',
    Icon: FileSearch,
  },
  {
    href: LINKS.formationClaudeBtp,
    title: 'Claude AI pour le BTP',
    desc: 'Analyse documentaire, DCE, documents longs et assistants métier.',
    Icon: Building2,
  },
  {
    href: LINKS.formationIaEntrepriseBatimentParis,
    title: 'Formation IA en entreprise à Paris et en Île-de-France',
    desc: 'Formation intra adaptée aux équipes et aux processus de l\'entreprise.',
    Icon: MapPin,
  },
] as const;

/**
 * Section accueil — cluster SEO « formations IA adaptées aux métiers du BTP ».
 */
export function AccueilFormationsIaMetiersSection() {
  return (
    <section
      id="formations-ia-metiers-btp"
      aria-labelledby="formations-ia-metiers-btp-heading"
      className={OFC_SEC.white}
    >
      <div className="mx-auto max-w-7xl">
        <RevealShell className="text-center">
          <h2
            id="formations-ia-metiers-btp-heading"
            className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl"
          >
            Des formations IA adaptées aux métiers du BTP
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Par outil, par métier ou par zone — accès direct aux pages dédiées.{' '}
            <Link href={LINKS.formationIaBtpPillar} className="font-semibold text-[var(--accent)] hover:underline">
              Voir la formation IA pour le BTP
            </Link>
            .
          </p>
        </RevealShell>
        <RevealGroupShell
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          staggerMs={50}
        >
          {CLUSTER_BLOCKS.map(({ href, title, desc, Icon }) => (
            <Link key={href} href={href} className={`${OFC_CARD} group flex h-full flex-col p-6`}>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-slate-900 group-hover:text-[var(--accent)]">
                {title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{desc}</p>
            </Link>
          ))}
        </RevealGroupShell>
      </div>
    </section>
  );
}
