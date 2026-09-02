import Link from 'next/link';
import { Poppins } from 'next/font/google';
import { CONTACT } from '@/lib/constants';
import { OFC_IDENTITE } from '@/lib/ofc-identite';
import { LINKS } from '@/lib/internal-links';
import {
  getInfosPratiquesForCatalogue,
} from '@/lib/infos-pratiques-catalogue';
import type { InfosPratiquesFormation } from '@/lib/infos-pratiques-types';
import { QUALIOPI_INDICATEUR1_LABELS } from '@/lib/qualiopi-indicateur1-labels';

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
 * Bloc « Informations réglementaires » — Indicateur 1 Qualiopi (11 sections audit + modalité pédagogique).
 * Charte OFC : #377CF3 · #F2F2F2 · Poppins · arrondis 8px.
 */
export function InfosPratiques({ formation, className = '' }: InfosPratiquesProps) {
  const {
    formationTitle,
    programmeRef,
    programmeVersion,
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
    accessibiliteHandicap,
    dateMaj,
  } = formation;

  const labels = QUALIOPI_INDICATEUR1_LABELS;

  return (
    <section
      id="informations-pratiques"
      aria-labelledby="infos-pratiques-heading"
      className={`scroll-mt-28 px-4 py-14 md:py-16 ${className}`.trim()}
    >
      <div
        className={`mx-auto max-w-4xl rounded-lg bg-[#F2F2F2] px-5 py-8 md:px-8 md:py-10 ${poppins.className}`}
      >
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">
            Indicateur 1 Qualiopi — information du public
          </p>
          <h2 id="infos-pratiques-heading" className="mt-2 text-2xl font-bold text-[#377CF3] md:text-3xl">
            Informations réglementaires — {formationTitle}
          </h2>
          <p className="mt-2 text-sm text-slate-500">Référence programme : {programmeRef}</p>
        </header>

        <dl className="mt-6">
          <DlItem term={labels.prerequis}>
            <p>{prerequis}</p>
          </DlItem>

          <DlItem term={labels.objectifs}>
            <ListItems items={objectifs} />
          </DlItem>

          <DlItem term={labels.contenu}>
            <ListItems items={contenu} />
            <p className="mt-3">
              <Link
                href={programmePdfUrl}
                className="font-medium text-[#377CF3] underline-offset-2 hover:underline"
              >
                Télécharger le programme officiel (PDF)
              </Link>
            </p>
          </DlItem>

          <DlItem term={labels.duree}>
            <p>{duree}</p>
          </DlItem>

          <DlItem term={labels.modalitePedagogique}>
            <p>{modalitePedagogique}</p>
          </DlItem>

          <DlItem term={labels.modalitesAcces}>
            <p>{modalitesAcces}</p>
          </DlItem>

          <DlItem term={labels.delaisAcces}>
            <p>{delaiAcces}</p>
          </DlItem>

          <DlItem term={labels.tarif}>
            <p>{tarif}</p>
          </DlItem>

          <DlItem term={labels.contact}>
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

          <DlItem term={labels.methodes}>
            <ListItems items={methodes} />
          </DlItem>

          <DlItem term={labels.evaluation}>
            <ListItems items={modalitesEvaluation} />
          </DlItem>

          <DlItem term={labels.handicap}>
            <div
              className="rounded-lg border border-[#377CF3]/20 bg-white p-4"
              role="note"
              aria-label={labels.handicap}
            >
              <p className="text-slate-800">{accessibiliteHandicap}</p>
              <p className="mt-3">
                <Link
                  href={LINKS.accessibiliteHandicap}
                  className="font-medium text-[#377CF3] underline-offset-2 hover:underline"
                >
                  Accessibilité des formations — parcours d&apos;aménagement
                </Link>
              </p>
            </div>
          </DlItem>
        </dl>

        <p className="mt-6 text-center text-xs text-slate-500">
          Programme mis à jour le {dateMaj} — {programmeVersion}
        </p>

        <p className="mt-4 text-center text-xs leading-relaxed text-slate-600">
          Avant votre inscription : consultez le{' '}
          <Link href={LINKS.livretAccueilStagiaire} className="font-medium text-[#377CF3] hover:underline">
            livret d&apos;accueil
          </Link>
          , le{' '}
          <Link href={LINKS.reglementInterieur} className="font-medium text-[#377CF3] hover:underline">
            règlement intérieur
          </Link>{' '}
          et notre{' '}
          <Link href={LINKS.reclamations} className="font-medium text-[#377CF3] hover:underline">
            procédure de réclamation
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

/** Wrapper catalogue — données dérivées de `getInfosPratiquesForCatalogue`. */
export function CatalogueInfosPratiques({ programmeRef }: { programmeRef: string }) {
  return <InfosPratiques formation={getInfosPratiquesForCatalogue(programmeRef)} />;
}
