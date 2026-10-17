import Link from 'next/link';
import { FormateurPortraitView } from '@/components/formateurs/FormateurPortrait';
import { TrainingSection } from '@/components/formations/training/TrainingSection';
import {
  getFormateursForFormationCode,
  type FormateurProfile,
} from '@/lib/formateurs';
import { TRAINING_ANCHOR } from '@/lib/training-fiche-nav';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

type Props = {
  /** Code catalogue NIV-* de la fiche. */
  formationCode: string;
  title?: string;
};

function IntervenantRow({ formateur }: { formateur: FormateurProfile }) {
  const fullName = `${formateur.prenom} ${formateur.nom}`;
  return (
    <div className="grid items-start gap-6 sm:grid-cols-[minmax(0,6.5rem)_minmax(0,1fr)] sm:gap-8">
      <div className="mx-auto sm:mx-0">
        <FormateurPortraitView portrait={formateur.portrait} size="md" />
      </div>
      <div className="min-w-0">
        <p className="font-display text-base font-bold text-ofc-ink md:text-lg">{fullName}</p>
        <p className="mt-1 text-sm font-medium text-ofc-accent">{formateur.intitule}</p>
        <p className="mt-3 text-base leading-relaxed text-ofc-ink-muted text-pretty">
          {formateur.parcours}
        </p>
        <p className="mt-4 text-sm">
          <Link
            href={
              formateur.profileHref ?? `${LINKS.formateurs}#${formateur.slug}`
            }
            className={OFC_LINK}
          >
            Voir le profil formateur
          </Link>
        </p>
      </div>
    </div>
  );
}

/**
 * Bloc intervenant(s) sur fiche formation.
 * Public : confirmés uniquement. Masqué si aucun profil visible.
 */
export function FormateurIntervenantBlock({
  formationCode,
  title = 'Votre formateur',
}: Props) {
  const formateurs = getFormateursForFormationCode(formationCode);
  if (formateurs.length === 0) return null;

  const heading =
    formateurs.length > 1 ? 'Intervenants' : title;

  return (
    <TrainingSection id={TRAINING_ANCHOR.formateurs} title={heading} tone="white">
      <ul className="space-y-10">
        {formateurs.map((f) => (
          <li key={f.id}>
            <IntervenantRow formateur={f} />
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm">
        <Link href={LINKS.formateurs} className={OFC_LINK}>
          Nos formateurs
        </Link>
      </p>
    </TrainingSection>
  );
}
