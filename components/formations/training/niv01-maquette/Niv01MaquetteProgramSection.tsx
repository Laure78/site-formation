import Image from 'next/image';
import Link from 'next/link';
import { Check, Download } from 'lucide-react';
import { TrainingProgramAccordion } from '@/components/formations/training/TrainingProgramAccordion';
import type { CatalogueProgramLink, CatalogueProgramModule } from '@/lib/catalogue-formation-page-content';
import { NIV01_MAQUETTE_PROGRAMME } from '@/lib/formation-niv01-maquette-assets';
import { OFC_SECTION_INNER } from '@/lib/ofc-section-classes';
import { OFC_CTA_SECONDARY, OFC_LINK } from '@/lib/ofc-interaction-classes';
import { TRAINING_ANCHOR } from '@/lib/training-fiche-nav';

const ICON_STROKE = 2.25;

const ENCART_ITEMS = [
  'Travaillez sur vos propres documents anonymisés',
  'Prompts réutilisables',
  'Contrôle humain obligatoire',
] as const;

type Props = {
  modules: readonly CatalogueProgramModule[];
  programLinks?: readonly CatalogueProgramLink[];
  pdfHref?: string;
  title?: string;
};

/** Programme — accordéons + visuel chantier et encart pédagogique. */
export function Niv01MaquetteProgramSection({
  modules,
  programLinks,
  pdfHref,
  title = 'Programme de la formation',
}: Props) {
  const photo = NIV01_MAQUETTE_PROGRAMME;

  return (
    <section
      id={TRAINING_ANCHOR.programme}
      className="scroll-mt-[calc(var(--site-header-height)+1rem)] border-b border-[#DAE3F0] bg-[#F8FAFC] px-4 py-10 md:py-12"
      aria-labelledby="niv01-programme-title"
    >
      <div className={`${OFC_SECTION_INNER} formation-niv01-maquette__inner`}>
        <h2
          id="niv01-programme-title"
          className="font-display text-2xl font-extrabold tracking-tight text-[#101936] md:text-[1.75rem]"
        >
          {title}
        </h2>
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-start xl:grid-cols-[minmax(0,1.15fr)_minmax(0,24rem)]">
          <div className="min-w-0">
            <TrainingProgramAccordion modules={modules} defaultOpenFirst />
            {programLinks && programLinks.length > 0 ? (
              <div className="mt-6 space-y-2 text-base text-ofc-ink-muted">
                {programLinks.map((link) => (
                  <p key={link.href}>
                    {link.prefix}{' '}
                    <Link href={link.href} className={OFC_LINK}>
                      {link.label}
                    </Link>
                    .
                  </p>
                ))}
              </div>
            ) : null}
            {pdfHref ? (
              <p className="mt-6">
                <a
                  href={pdfHref}
                  download
                  className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center gap-2 px-6 py-3`}
                >
                  <Download className="h-4 w-4 shrink-0" aria-hidden />
                  Télécharger le programme PDF
                </a>
              </p>
            ) : null}
          </div>
          <aside className="space-y-4 lg:sticky lg:top-[calc(var(--site-header-height)+0.75rem)]">
            <div className="overflow-hidden rounded-2xl ring-1 ring-[#DAE3F0]">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(max-width: 1023px) 100vw, 24rem"
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="rounded-2xl border border-[#DAE3F0] bg-white p-5 shadow-sm">
              <ul className="space-y-3 text-sm leading-relaxed text-[#101936]">
                {ENCART_ITEMS.map((line) => (
                  <li key={line} className="flex gap-2.5">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#377CF3]"
                      strokeWidth={ICON_STROKE}
                      aria-hidden
                    />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
