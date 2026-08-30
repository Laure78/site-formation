import { Award, Building2, HardHat, Sparkles } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { IDF_ZONE_INTERVENTION } from '@/lib/constants';
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
    text: `Sessions intra-entreprise sur site — ${IDF_ZONE_INTERVENTION} uniquement, pas de distanciel.`,
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
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Des formations IA pensées pour les métiers du BTP
          </h2>
          <p className="mt-4 max-w-3xl text-slate-600 md:text-lg">
            Les formations sont conçues autour de situations professionnelles concrètes : devis, appels
            d&apos;offres, analyse de DCE, comptes rendus de chantier, suivi de travaux, documents
            contractuels, plannings et automatisation des tâches administratives — animées en présentiel
            en Île-de-France.
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
