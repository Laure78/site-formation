import { Download, FileSpreadsheet, FolderSearch, HardHat } from 'lucide-react';
import Link from 'next/link';
import type { CataloguePainPoint } from '@/lib/catalogue-formation-page-content';
import { OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { LINKS } from '@/lib/internal-links';

type Props = {
  formationTitle: string;
  pdfHref?: string;
  painPoints: readonly CataloguePainPoint[];
  painPointsTitle?: string;
};

const ICONS = [FileSpreadsheet, FolderSearch, HardHat] as const;

function buildCards(painPoints: readonly CataloguePainPoint[]) {
  const p0 = painPoints[0];
  const p1 = painPoints[1];
  const p2 = painPoints[2];
  const p3 = painPoints[3];
  const cards: { titre: string; texte: string; icon: (typeof ICONS)[number] }[] = [];
  if (p0) {
    cards.push({ titre: p0.title, texte: p0.texte, icon: ICONS[0] });
  }
  if (p1) {
    cards.push({ titre: p1.title, texte: p1.texte, icon: ICONS[1] });
  }
  if (p2 && p3) {
    cards.push({
      titre: 'Chantier, OS et réception',
      texte: `${p2.texte} ${p3.texte}`,
      icon: ICONS[2],
    });
  } else if (p2) {
    cards.push({ titre: p2.title, texte: p2.texte, icon: ICONS[2] });
  }
  return cards;
}

export function Niv05MaquetteMetierCards({
  formationTitle,
  pdfHref,
  painPoints,
  painPointsTitle,
}: Props) {
  const cards = buildCards(painPoints);

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
      <section aria-labelledby="niv05-metiers-title">
        <h2 id="niv05-metiers-title" className="ofc-type-h2 text-center text-[#101936] md:text-left">
          {painPointsTitle ?? 'De la conception à la réception — l’IA au service de la MOE'}
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {cards.map((card) => (
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
        aria-labelledby="niv05-format-court-title"
        className="flex flex-col gap-5 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-6 md:flex-row md:items-center md:justify-between md:gap-8"
      >
        <div className="flex min-w-0 gap-4 md:max-w-[58%]">
          <HardHat className="mt-0.5 h-8 w-8 shrink-0 text-[#1D4ED8]" aria-hidden />
          <div>
            <h2 id="niv05-format-court-title" className="font-display text-lg font-semibold text-[#101936]">
              Cinq modules, 70 % de pratique sur vos dossiers MOE
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              Ateliers sur CCTP, DCE, DPGF, comptes rendus, OS et réserves — anonymisés si besoin. L&apos;IA prépare
              et structure ; vous validez métrés, conformité et engagements.
            </p>
          </div>
        </div>
        {programmeCta}
      </section>
    </div>
  );
}
