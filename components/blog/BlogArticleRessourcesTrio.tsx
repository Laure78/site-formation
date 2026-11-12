import Link from 'next/link';
import { ArrowRight, FileText, HardHat, Users } from 'lucide-react';
import { LINKS } from '@/lib/internal-links';
import { OFC_CARD, OFC_LINK } from '@/lib/ofc-interaction-classes';

const CARDS = [
  {
    href: LINKS.guideAssistantsTravauxOfc,
    title: 'Guide des assistants travaux',
    description: 'Missions bureau, échanges de coordination et administration des marchés.',
    icon: HardHat,
  },
  {
    href: LINKS.tutoCrChantier,
    title: 'Tutoriel compte rendu de chantier',
    description: 'Créer un skill pour structurer vos CR à partir de vos notes.',
    icon: FileText,
  },
  {
    href: LINKS.guideDirigeantBtpOfc,
    title: 'Guide du dirigeant BTP',
    description: 'Tableau de bord de direction et synthèse multi-chantiers.',
    icon: Users,
  },
] as const;

export function BlogArticleRessourcesTrio() {
  return (
    <section className="my-10" aria-labelledby="ressources-aller-plus-loin">
      <h2 id="ressources-aller-plus-loin" className="font-display text-2xl font-bold text-slate-900">
        Vos ressources pour aller plus loin
      </h2>
      <ul className="mt-6 grid gap-4 md:grid-cols-3">
        {CARDS.map(({ href, title, description, icon: Icon }) => (
          <li key={href}>
            <article className={`${OFC_CARD} flex h-full flex-col p-5`}>
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#377CF3]/10 text-[#377CF3]">
                <Icon size={20} strokeWidth={1.5} aria-hidden />
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{description}</p>
              <Link href={href} className={`mt-4 inline-flex items-center gap-1.5 text-sm font-semibold ${OFC_LINK}`}>
                Consulter la ressource
                <ArrowRight size={16} aria-hidden />
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
