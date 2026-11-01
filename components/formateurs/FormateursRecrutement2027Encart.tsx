import Link from 'next/link';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY } from '@/lib/ofc-interaction-classes';

type Props = {
  className?: string;
};

/** Encart recrutement formateurs BTP — accueil ou hub lorsque l’équipe n’est pas encore affichée. */
export function FormateursRecrutement2027Encart({ className = '' }: Props) {
  return (
    <aside
      className={`rounded-xl border border-[#377CF3]/25 bg-[#F2F8FF] p-5 sm:p-6 ${className}`.trim()}
      aria-labelledby="formateurs-recrutement-2027-encart-title"
    >
      <h3
        id="formateurs-recrutement-2027-encart-title"
        className="font-display text-lg font-bold text-ofc-ink md:text-xl"
      >
        Formateurs issus du BTP — recrutement 2027
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-ofc-ink-muted sm:text-base">
        Nous complétons l’équipe d’intervenants métiers pour les parcours en présentiel en
        Île-de-France. Vous avez une expérience terrain et vous formez déjà sur vos sujets ?
      </p>
      <Link
        href={LINKS.nousRejoindre}
        className={`${OFC_CTA_PRIMARY} mt-5 inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold sm:text-base`}
      >
        Découvrir les missions
      </Link>
    </aside>
  );
}
