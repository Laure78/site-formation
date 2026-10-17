import Link from 'next/link';
import { CalendarDays } from 'lucide-react';
import { TrainingSection } from '@/components/formations/training/TrainingSection';
import { TRAINING_ANCHOR } from '@/lib/training-fiche-nav';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

type Props = {
  formationTitle: string;
};

/**
 * Sessions inter — liste alimentée côté admin / calendrier public quand disponible.
 * Sans session publiée : proposition de contact (pas de date inventée).
 */
export function TrainingSessionsSection({ formationTitle }: Props) {
  const contactHref = `${LINKS.contact}?objet=devis&formation=${encodeURIComponent(formationTitle)}&message=${encodeURIComponent('Demande de dates inter-entreprises')}`;

  return (
    <TrainingSection
      id={TRAINING_ANCHOR.sessions}
      title="Prochaines sessions"
      description="Dates en présentiel en Île-de-France — inscription après confirmation des places."
      tone="white"
      icon={CalendarDays}
    >
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center">
        <p className="text-base text-slate-700">
          Aucune session inter-entreprises n’est publiée pour le moment sur cette fiche.
        </p>
        <p className="mt-2 text-sm text-slate-600">
          Demandez les prochaines dates ou une session intra-entreprise pour votre équipe.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link href={contactHref} className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 px-5 py-2.5 text-sm`}>
            Demander des dates
          </Link>
          <Link href={LINKS.prendreRdv} className="text-sm font-semibold text-[#377CF3] hover:underline">
            Échanger sur mon besoin
          </Link>
        </div>
      </div>
    </TrainingSection>
  );
}
