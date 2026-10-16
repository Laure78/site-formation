import { FormateursGrid } from '@/components/formateurs/FormateursGrid';
import { Section } from '@/components/ui/Section';
import type { DomaineId, MetierId } from '@/data/catalogue-2027';
import { DOMAINES_CATALOGUE_2027 } from '@/data/catalogue-2027';
import {
  getFormateursForDomaine,
  getFormateursForMetier,
} from '@/lib/formateurs';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK, OFC_TYPE_H3 } from '@/lib/ofc-interaction-classes';
import Link from 'next/link';

type DomaineProps = {
  domaineId: DomaineId;
  /** Titre de section — défaut « Les formateurs de ce domaine ». */
  title?: string;
};

type MetierProps = {
  metierId: MetierId;
  title?: string;
};

/**
 * Section « Les formateurs de ce domaine ».
 * Masquée s’il n’y a aucun profil visible (confirmé en public ; + démo en local).
 */
export function FormateursDomaineSection({ domaineId, title }: DomaineProps) {
  const formateurs = getFormateursForDomaine(domaineId);
  if (formateurs.length === 0) return null;

  const domaine = DOMAINES_CATALOGUE_2027.find((d) => d.id === domaineId);
  const heading = title ?? 'Les formateurs de ce domaine';

  return (
    <Section
      tone="muted"
      className="scroll-mt-28"
      aria-labelledby={`formateurs-domaine-${domaineId}`}
    >
      <h2
        id={`formateurs-domaine-${domaineId}`}
        className={OFC_TYPE_H3}
      >
        {heading}
      </h2>
      {domaine ? (
        <p className="mt-2 max-w-2xl text-sm text-ofc-ink-muted md:text-base">
          {domaine.titre} — intervenants associés à ce domaine du catalogue.
        </p>
      ) : null}
      <FormateursGrid
        formateurs={formateurs}
        showFormations={false}
      />
      <p className="mt-8 text-sm">
        <Link href={LINKS.formateurs} className={OFC_LINK}>
          Voir tous les formateurs
        </Link>
      </p>
    </Section>
  );
}

/** Variante parcours métier — résout les domaines via le métier. */
export function FormateursMetierSection({ metierId, title }: MetierProps) {
  const formateurs = getFormateursForMetier(metierId);
  if (formateurs.length === 0) return null;

  return (
    <section
      className="mt-14 scroll-mt-28 border-t border-ofc-border pt-12"
      aria-labelledby={`formateurs-metier-${metierId}`}
    >
      <h2
        id={`formateurs-metier-${metierId}`}
        className={OFC_TYPE_H3}
      >
        {title ?? 'Les formateurs de ce domaine'}
      </h2>
      <p className="mt-2 max-w-2xl text-base text-ofc-ink-muted">
        Intervenants associés aux domaines du parcours.
      </p>
      <FormateursGrid formateurs={formateurs} showFormations={false} />
      <p className="mt-6 text-sm">
        <Link href={LINKS.formateurs} className={OFC_LINK}>
          Voir tous les formateurs
        </Link>
      </p>
    </section>
  );
}
