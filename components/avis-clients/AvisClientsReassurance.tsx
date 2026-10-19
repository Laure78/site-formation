import { Award, Building2, HardHat, Sparkles } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import Link from 'next/link';
import { IDF_ZONE_INTERVENTION } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';
import { OFC_BENEFIT_CARD } from '@/lib/ofc-interaction-classes';
import { OFC_SEC, OFC_SECTION_INNER } from '@/lib/ofc-section-classes';

const REASSURANCE_BLOCKS = [
  {
    icon: Sparkles,
    title: 'IA appliquée au BTP',
    text: 'Cas d\u2019usage directement liés aux métiers du bâtiment.',
  },
  {
    icon: HardHat,
    title: 'Approche opérationnelle',
    text: 'Des exercices basés sur des situations professionnelles réelles.',
  },
  {
    icon: Building2,
    title: 'Présentiel en entreprise',
    text: `Sessions intra-entreprise sur site — ${IDF_ZONE_INTERVENTION} uniquement. Catalogue IA BTP : pas de distanciel.`,
  },
  {
    icon: Award,
    title: 'Organisme certifié Qualiopi',
    text: 'Une démarche structurée et orientée qualité.',
  },
] as const;

export function AvisClientsReassurance() {
  return (
    <section className={OFC_SEC.muted}>
      <div className={OFC_SECTION_INNER}>
        <Reveal>
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-2xl">
            Des formations IA pensées pour les métiers du BTP
          </h2>
          <p className="mt-4 max-w-3xl text-slate-600 md:text-lg">
            Les{' '}
            <Link href={LINKS.formations} className="font-medium text-[var(--accent)] hover:underline">
              formations IA BTP
            </Link>{' '}
            couvrent devis, appels d&apos;offres, analyse de DCE, comptes rendus de chantier et
            automatisation administrative — en présentiel en Île-de-France, avec des parcours dédiés{' '}
            <Link
              href={LINKS.formationIaConducteurDeTravaux}
              className="font-medium text-[var(--accent)] hover:underline"
            >
              conducteurs de travaux
            </Link>
            ,{' '}
            <Link
              href={LINKS.formationIaDirigeantPmeBtp}
              className="font-medium text-[var(--accent)] hover:underline"
            >
              dirigeants de PME
            </Link>{' '}
            et{' '}
            <Link href={LINKS.formationIaParis} className="font-medium text-[var(--accent)] hover:underline">
              sessions à Paris
            </Link>
            .
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REASSURANCE_BLOCKS.map(({ icon: Icon, title, text }, index) => (
            <Reveal key={title} delay={index * 60}>
              <div className={`${OFC_BENEFIT_CARD} h-full rounded-2xl border border-slate-200 bg-white p-6`}>
                <div className="ofc-benefit-icon flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent)] text-white shadow-md shadow-blue-500/15">
                  <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-display text-base font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
