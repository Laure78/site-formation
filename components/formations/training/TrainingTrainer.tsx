import Link from 'next/link';
import { ProfilePhoto } from '@/components/landing/ProfilePhoto';
import { TrainingSection } from '@/components/formations/training/TrainingSection';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import { LAURE_OLIVIE_CLIENT_REFERENCES_SHORT } from '@/lib/laure-olivie-profile';
import { formatNoteSatisfactionAffichageComplet } from '@/lib/data/indicateurs-resultats';

type Props = {
  title?: string;
};

/** Présentation courte Laure — secondaire par rapport au contenu formation. */
export function TrainingTrainer({
  title = 'Une formation animée par Laure Olivié',
}: Props) {
  return (
    <TrainingSection id="formatrice" title={title} tone="white">
      <div className="grid items-center gap-8 sm:grid-cols-[minmax(0,9rem)_minmax(0,1fr)] sm:gap-10">
        <div className="mx-auto w-full max-w-[9rem] overflow-hidden rounded-xl ring-1 ring-slate-200/80 sm:mx-0">
          <ProfilePhoto title="Laure Olivié — formatrice IA pour le BTP" />
        </div>
        <div className="min-w-0">
          <p className="text-base leading-relaxed text-slate-700">
            Formatrice IA pour le BTP, ancienne dirigeante d’entreprise de travaux publics.
            Approche opérationnelle : vos documents réels, des méthodes applicables dès le
            lendemain. Satisfaction {formatNoteSatisfactionAffichageComplet()}.
          </p>
          <p className="mt-3 text-sm text-slate-500">
            Références : {LAURE_OLIVIE_CLIENT_REFERENCES_SHORT}.
          </p>
          <p className="mt-4 text-sm">
            <Link href={LINKS.aPropos} className={OFC_LINK}>
              Découvrir le parcours de Laure Olivié
            </Link>
          </p>
        </div>
      </div>
    </TrainingSection>
  );
}
