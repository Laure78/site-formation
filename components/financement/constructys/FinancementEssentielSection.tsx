import Link from 'next/link';
import { ArrowRight, CalendarClock, CircleDollarSign, ClipboardCheck, Scale } from 'lucide-react';
import { FINANCEMENT_BAREMES_NOTE } from '@/lib/financement-constructys-page-config';
import { FC_CARD, FC_SECTION, FC_SUBTITLE, FC_TITLE } from '@/lib/financement-constructys-ui';

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
    texte:
      'Barèmes horaires et plafonds journaliers selon l’effectif et la branche (Bâtiment, dispositif PDC).',
    href: '#baremes-constructys',
    icon: Scale,
  },
  {
    titre: 'Prévoir le reste à charge',
    texte:
      'La participation Constructys peut être partielle : le solde reste à la charge de l’entreprise après accord.',
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
            <li key={item.titre}>
              <Link
                href={item.href}
                className={`${FC_CARD} group flex h-full flex-col gap-3 no-underline`}
              >
                <Icon className="h-6 w-6 text-[#377CF3]" strokeWidth={1.75} aria-hidden />
                <h3 className="font-display text-base font-bold text-[#081943]">{item.titre}</h3>
                <p className="flex-1 text-sm leading-relaxed text-ofc-ink-muted">{item.texte}</p>
                <span
                  className="mt-1 inline-flex h-9 w-9 items-center justify-center self-end rounded-full bg-[#377CF3] text-white transition-transform duration-200 motion-safe:group-hover:translate-x-0.5"
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
      <p className="mt-5 text-center text-sm italic text-ofc-ink-subtle">{FINANCEMENT_BAREMES_NOTE}</p>
    </section>
  );
}
