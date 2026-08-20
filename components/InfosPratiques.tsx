import Link from 'next/link';
import { Poppins } from 'next/font/google';
import { CONTACT } from '@/lib/constants';
import { OFC_IDENTITE } from '@/lib/ofc-identite';
import { LINKS } from '@/lib/internal-links';
import {
  getInfosPratiquesForCatalogue,
  INFOS_PRATIQUES_HANDICAP_ENCART,
} from '@/lib/infos-pratiques-catalogue';
import type { InfosPratiquesFormation } from '@/lib/infos-pratiques-types';

export type { InfosPratiquesFormation } from '@/lib/infos-pratiques-types';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

type InfosPratiquesProps = {
  formation: InfosPratiquesFormation;
  className?: string;
};

type DlItemProps = {
  term: string;
  children: React.ReactNode;
};

function DlItem({ term, children }: DlItemProps) {
  return (
    <div className="border-b border-slate-200/80 py-4 last:border-b-0">
      <dt className="text-sm font-semibold text-[#377CF3]">{term}</dt>
      <dd className="mt-2 text-sm leading-relaxed text-slate-800">{children}</dd>
    </div>
  );
}

function ListItems({ items }: { items: readonly string[] }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

/**
 * Bloc « Informations pratiques » — Indicateur 1 Qualiopi (12 items, sémantique `<dl>`).
 * Charte OFC : #377CF3 · #F2F2F2 · Poppins · arrondis 8px.
 */
export function InfosPratiques({ formation, className = '' }: InfosPratiquesProps) {
  const {
    prerequis,
    objectifs,
    contenu,
    programmePdfUrl,
    duree,
    modalitesAcces,
    delaiAcces,
    tarif,
    methodes,
    modalitesEvaluation,
    modalitePedagogique,
    dateMaj,
  } = formation;

  return (
    <section
      id="informations-pratiques"
      aria-labelledby="infos-pratiques-heading"
      className={`scroll-mt-28 px-4 py-14 md:py-16 ${className}`.trim()}
    >
      <div
        className={`mx-auto max-w-4xl rounded-lg bg-[#F2F2F2] px-5 py-8 md:px-8 md:py-10 ${poppins.className}`}
      >
        <h2 id="infos-pratiques-heading" className="text-2xl font-bold text-[#377CF3] md:text-3xl">
          Informations pratiques
        </h2>

        <dl className="mt-6">
          <DlItem term="Prérequis">
            <p>{prerequis}</p>
          </DlItem>

          <DlItem term="Objectifs">
            <ListItems items={objectifs} />
          </DlItem>

          <DlItem term="Contenu">
            <ListItems items={contenu} />
            <p className="mt-3">
              <Link
                href={programmePdfUrl}
                className="font-medium text-[#377CF3] underline-offset-2 hover:underline"
              >
                Télécharger le programme détaillé (PDF)
              </Link>
            </p>
          </DlItem>

          <DlItem term="Durée">
            <p>{duree}</p>
          </DlItem>

          <DlItem term="Modalité">
            <p>{modalitePedagogique}</p>
          </DlItem>

          <DlItem term="Modalités d'accès">
            <p>{modalitesAcces}</p>
          </DlItem>

          <DlItem term="Délais d'accès">
            <p>{delaiAcces}</p>
          </DlItem>

          <DlItem term="Tarif">
            <p>{tarif}</p>
          </DlItem>

          <DlItem term="Méthodes mobilisées">
            <ListItems items={methodes} />
          </DlItem>

          <DlItem term="Modalités d'évaluation">
            <ListItems items={modalitesEvaluation} />
          </DlItem>

          <DlItem term="Accessibilité handicap">
            <div
              className="rounded-lg border border-[#377CF3]/20 bg-white p-4"
              role="note"
              aria-label="Accessibilité handicap"
            >
              <p className="text-slate-800">{INFOS_PRATIQUES_HANDICAP_ENCART}</p>
              <p className="mt-3">
                <Link
                  href={LINKS.accessibiliteHandicap}
                  className="font-medium text-[#377CF3] underline-offset-2 hover:underline"
                >
                  Accessibilité handicap — page dédiée et contact référente
                </Link>
              </p>
            </div>
          </DlItem>

          <DlItem term="Contact">
            <p>
              <a
                href={`mailto:${CONTACT.email}`}
                className="font-medium text-[#377CF3] underline-offset-2 hover:underline"
              >
                {CONTACT.email}
              </a>
              {' · '}
              <a
                href={`tel:${CONTACT.phone}`}
                className="font-medium text-[#377CF3] underline-offset-2 hover:underline"
              >
                {CONTACT.phoneDisplay}
              </a>
              {' · '}
              {OFC_IDENTITE.raisonSociale}, {CONTACT.address}.
            </p>
          </DlItem>
        </dl>

        <p className="mt-6 text-center text-xs text-slate-500">
          Programme mis à jour le {dateMaj}
        </p>
      </div>
    </section>
  );
}

/** Wrapper catalogue — données dérivées de `getInfosPratiquesForCatalogue`. */
export function CatalogueInfosPratiques({ programmeRef }: { programmeRef: string }) {
  return <InfosPratiques formation={getInfosPratiquesForCatalogue(programmeRef)} />;
}
