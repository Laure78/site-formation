import Link from 'next/link';
import { ArrowRight, CalendarClock, CircleDollarSign, ClipboardCheck, Scale } from 'lucide-react';
import { FINANCEMENT_BAREMES_NOTE } from '@/lib/financement-constructys-page-config';
import {
  FC_CARD,
  FC_ICON_SQUARE,
  FC_SECTION,
  FC_SUBTITLE,
  FC_TITLE,
} from '@/lib/financement-constructys-ui';

const ESSENTIEL = [
  {
    titre: 'Vérifier l’éligibilité',
    texte:
      'Entreprise du BTP à jour de ses contributions, rattachement Constructys et dossier validé par l’OPCO.',
    href: '#baremes-constructys',
    icon: ClipboardCheck,
  },
  {
    titre: 'Anticiper le dépôt',
    texte:
      'Dossier complet dans eGestion au moins 15 jours calendaires avant le début de la formation.',
    href: '#etapes-financement',
    icon: CalendarClock,
  },
  {
    titre: 'Connaître les plafonds',
    texte: 'Barèmes 2026 : 24 € ou 19 € HT/h/stagiaire selon l’effectif (Bâtiment, sous validation Constructys).',
    href: '#baremes-constructys',
    icon: Scale,
  },
  {
    titre: 'Prévoir le reste à charge',
    texte:
      'Participation partielle possible : le solde reste à la charge de l’entreprise après accord.',
    href: '#estimation-financement',
    icon: CircleDollarSign,
  },
] as const;

export function FinancementEssentielSection() {
  return (
    <section id="essentiel-financement" aria-labelledby="essentiel-title" className={FC_SECTION}>
      <h2 id="essentiel-title" className={FC_TITLE}>
        L’essentiel à retenir
      </h2>
      <p className={FC_SUBTITLE}>
        Quatre réflexes avant de lancer une demande de prise en charge auprès de Constructys.
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ESSENTIEL.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.titre} className="min-w-0">
              <Link
                href={item.href}
                className={`${FC_CARD} group flex h-full min-h-[11.5rem] flex-col gap-3 no-underline`}
              >
                <span className={FC_ICON_SQUARE}>
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className="font-display text-[0.9375rem] font-bold text-[#081943] md:text-base">
                  {item.titre}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-[#64748B]">{item.texte}</p>
                <span
                  className="inline-flex h-9 w-9 items-center justify-center self-end rounded-full bg-[#377CF3] text-white transition-transform duration-200 motion-safe:group-hover:translate-x-0.5"
                  aria-hidden
                >
                  <ArrowRight className="h-4 w-4" />
                </span>
                <span className="sr-only">Aller à la section {item.titre}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <p className="mt-5 text-center text-xs italic text-[#94A3B8] md:text-sm">
        {FINANCEMENT_BAREMES_NOTE}
      </p>
    </section>
  );
}
