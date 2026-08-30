import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import {
  FORMATIONS_HUB_PAR_BESOIN,
  FORMATIONS_HUB_PAR_METIER,
  FORMATIONS_HUB_PAR_OUTIL,
  type FormationsHubNavItem,
} from '@/lib/formations-hub-navigation';

const chipLinkClass =
  'inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm font-medium text-[#0F172A] transition duration-200 hover:border-[#377CF3] hover:bg-[#EFF6FF] hover:text-[#377CF3]';

function HubNavGroup({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: readonly FormationsHubNavItem[];
}) {
  return (
    <div>
      <h3 className="font-display text-base font-semibold text-[#0F172A]">{title}</h3>
      <p className="mt-1 text-sm text-[#64748B]">{description}</p>
      <ul className="mt-4 flex flex-wrap gap-3">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className={chipLinkClass}>
              {item.label}
              <ArrowUpRight size={16} strokeWidth={2} className="shrink-0" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Hub SEO `/formations` — silos par métier, besoin et outil (GEO + maillage interne).
 */
export function FormationsHubNavigationSection() {
  return (
    <section
      id="formations-par-metier-besoin"
      className="mt-8 rounded-2xl border border-[#E2E8F0] bg-white p-5 md:p-6"
      aria-labelledby="formations-hub-nav-heading"
    >
      <h2 id="formations-hub-nav-heading" className="font-display text-lg font-semibold text-[#0F172A]">
        Trouver une formation par métier, par besoin ou par outil
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#64748B]">
        Le catalogue Qualiopi regroupe {FORMATIONS_HUB_PAR_METIER.length} métiers types,{' '}
        {FORMATIONS_HUB_PAR_BESOIN.length} cas d&apos;usage opérationnels et les outils IA enseignés en
        session. Choisissez l&apos;entrée qui correspond à votre équipe.
      </p>
      <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <HubNavGroup
          title="Par métier"
          description="Conducteurs de travaux, dirigeants, chargés d'affaires, MOE…"
          items={FORMATIONS_HUB_PAR_METIER}
        />
        <HubNavGroup
          title="Par besoin"
          description="Appels d'offres, DCE, devis, comptes rendus, automatisation…"
          items={FORMATIONS_HUB_PAR_BESOIN}
        />
        <HubNavGroup
          title="Par outil"
          description="ChatGPT et Claude AI — intégrés aux parcours métier, pas en doublon."
          items={FORMATIONS_HUB_PAR_OUTIL}
        />
      </div>
    </section>
  );
}
