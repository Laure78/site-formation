import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { RdvLink } from '@/components/RdvLink';
import { LINKS } from '@/lib/internal-links';
import type { DeptLocalSeoContent } from '@/lib/formation-ia-btp-dept-local-content';
import { getFAQSchema } from '@/lib/seo';
import { OFC_SEC } from '@/lib/ofc-section-classes';

type Props = {
  content: DeptLocalSeoContent;
  /** Si false, le parent fusionne le schéma FAQ (pages avec FAQ longue existante). */
  emitFaqSchema?: boolean;
};

/**
 * Bloc SEO local unique par département — rendu serveur (SSR), 250–400 mots + FAQ géo.
 */
export function FormationDeptLocalSeoBlock({ content, emitFaqSchema = true }: Props) {
  const calendlyCampaign = `dept-${content.deptCode}`;
  const faqSchema = getFAQSchema(content.faq);

  return (
    <>
      {emitFaqSchema ? (
        <JsonLd id={`schema-dept-local-faq-${content.deptCode}`} schema={faqSchema} />
      ) : null}

      <section
        id={`contenu-local-${content.deptCode}`}
        className={`${OFC_SEC.muted} scroll-mt-24 border-y border-slate-200`}
        aria-labelledby={`titre-local-${content.deptCode}`}
      >
        <div className="mx-auto max-w-4xl px-4 py-12 md:py-14">
          <h2
            id={`titre-local-${content.deptCode}`}
            className="font-display text-2xl font-bold text-slate-900 md:text-3xl"
          >
            Formation IA BTP {content.departementNom} ({content.deptCode}) — ancrage local
          </h2>

          <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-700 md:text-lg">
            <p>{content.intro}</p>
            <p>{content.villesEtTrajets}</p>
            <p>{content.tissuEtUsages}</p>
          </div>

          <nav
            className="mt-8 grid gap-3 sm:grid-cols-3"
            aria-label={`Liens formations ${content.departementNom}`}
          >
            <Link
              href={LINKS.formationIaBtpNiveau1BatimentTp}
              className="rounded-xl border border-slate-200 bg-white p-4 text-sm shadow-sm transition hover:border-[#377CF3] hover:shadow-md"
            >
              <span className="font-semibold text-[#377CF3]">NIV-01</span>
              <span className="mt-1 block text-slate-700">
                L&apos;IA au service du bâtiment &amp; TP — programme 4 h
              </span>
            </Link>
            <Link
              href={content.metierLink.href}
              className="rounded-xl border border-slate-200 bg-white p-4 text-sm shadow-sm transition hover:border-[#377CF3] hover:shadow-md"
            >
              <span className="font-semibold text-[#377CF3]">{content.metierLink.label}</span>
              <span className="mt-1 block text-slate-700">{content.metierLink.description}</span>
            </Link>
            <Link
              href={LINKS.formationIleDeFrance}
              className="rounded-xl border border-slate-200 bg-white p-4 text-sm shadow-sm transition hover:border-[#377CF3] hover:shadow-md"
            >
              <span className="font-semibold text-[#377CF3]">Île-de-France</span>
              <span className="mt-1 block text-slate-700">
                Vue régionale : 8 départements, formats intra et inter
              </span>
            </Link>
          </nav>

          <div className="mt-10">
            <RdvLink
              campaign={calendlyCampaign}
              ctaPosition="inline"
              ctaId="local-block"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#377CF3] px-6 py-3.5 text-center text-base font-semibold text-white shadow-sm transition hover:bg-[#2d6ae0] sm:w-auto"
            >
              <Calendar size={20} strokeWidth={1.5} aria-hidden />
              Visio découverte gratuite — {content.departementNom} ({content.deptCode})
            </RdvLink>
          </div>

          <div className="mt-10">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#377CF3]">FAQ</p>
            <h3 className="font-display mt-2 text-xl font-bold text-slate-900 md:text-2xl">
              FAQ locale — {content.departementNom} ({content.deptCode})
            </h3>
            <p className="mt-2 text-sm text-slate-600 md:text-base">
              Déplacement, session intra et financement Constructys pour les entreprises du département.
            </p>
            <div className="mt-6 space-y-3">
              {content.faq.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm open:shadow-md [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-medium text-slate-900">
                    <span>{item.q}</span>
                  </summary>
                  <p className="mt-4 border-t border-slate-100 pt-4 text-base leading-relaxed text-slate-600">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
