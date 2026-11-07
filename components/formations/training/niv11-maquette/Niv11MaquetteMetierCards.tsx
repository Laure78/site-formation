import { Download, FolderSearch, Layers, UsersRound } from 'lucide-react';
import Link from 'next/link';
import { OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { LINKS } from '@/lib/internal-links';

type Props = {
  formationTitle: string;
  pdfHref?: string;
};

const CARDS = [
  {
    icon: FolderSearch,
    titre: 'Analyser les consultations',
    texte:
      'Recouper les pièces du DCE, identifier les incohérences et préparer une grille d’analyse.',
  },
  {
    icon: Layers,
    titre: 'Comparer les offres',
    texte:
      'Structurer les éléments techniques et financiers et préparer un rapport d’analyse sourcé.',
  },
  {
    icon: UsersRound,
    titre: 'Piloter les intervenants',
    texte:
      'Suivre les livrables MOE, les avis CT et CSPS, rédiger les comptes rendus et notes d’alerte.',
  },
] as const;

/** Trois cartes métiers AMO sous le hero. */
export function Niv11MaquetteMetierCards({ formationTitle, pdfHref }: Props) {
  const programmeCta = pdfHref ? (
    <a
      href={pdfHref}
      download
      className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 shrink-0 items-center justify-center gap-2 px-5 py-3`}
    >
      <Download className="h-4 w-4 shrink-0" aria-hidden />
      Recevoir le programme
    </a>
  ) : (
    <Link
      href={`${LINKS.contact}?objet=devis&formation=${encodeURIComponent(formationTitle)}`}
      className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 shrink-0 items-center justify-center gap-2 px-5 py-3`}
    >
      <Download className="h-4 w-4 shrink-0" aria-hidden />
      Recevoir le programme
    </Link>
  );

  return (
    <div className="mx-auto max-w-[80rem] space-y-10 px-4 sm:px-6 lg:px-8">
      <section aria-labelledby="niv11-metiers-title">
        <h2 id="niv11-metiers-title" className="ofc-type-h2 text-center text-[#101936] md:text-left">
          Une formation concrète pour structurer vos missions AMO avec l&apos;IA
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {CARDS.map((card) => (
            <div
              key={card.titre}
              className="rounded-2xl border border-slate-200 border-b-[3px] border-b-[#377CF3] bg-[#F8FAFC] p-6 shadow-sm ring-1 ring-slate-50"
            >
              <span className="inline-flex rounded-xl bg-[#EFF6FF] p-2.5">
                <card.icon className="h-6 w-6 text-[#377CF3]" aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-[#101936]">{card.titre}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.texte}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="niv11-format-court-title"
        className="flex flex-col gap-5 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-6 md:flex-row md:items-center md:justify-between md:gap-8"
      >
        <div className="flex min-w-0 gap-4 md:max-w-[58%]">
          <Layers className="mt-0.5 h-8 w-8 shrink-0 text-[#1D4ED8]" aria-hidden />
          <div>
            <h2 id="niv11-format-court-title" className="font-display text-lg font-semibold text-[#101936]">
              Un format court, ancré dans vos consultations et opérations
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              Ateliers sur vos dossiers réels (anonymisés si besoin) — l&apos;IA prépare et structure, vous
              contrôlez et validez avant toute décision au maître d&apos;ouvrage.
            </p>
          </div>
        </div>
        {programmeCta}
      </section>
    </div>
  );
}
