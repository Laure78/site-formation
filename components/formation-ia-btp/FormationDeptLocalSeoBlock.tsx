import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { RdvLink } from '@/components/RdvLink';
import type { DeptLocalSeoContent } from '@/lib/formation-ia-btp-dept-local-content';
import { getFAQSchema } from '@/lib/seo';

type Props = {
  content: DeptLocalSeoContent;
  /** Si false, le parent fusionne le schéma FAQ (pages avec FAQ longue existante). */
  emitFaqSchema?: boolean;
  /** Placé directement sous le H1 de la page (moins de marge, pas de titre H2 redondant). */
  variant?: 'underH1' | 'standalone';
};

/**
 * Bloc SEO local unique par département — rendu serveur (SSR).
 */
export function FormationDeptLocalSeoBlock({
  content,
  emitFaqSchema = true,
  variant = 'standalone',
}: Props) {
  const calendlyCampaign = `dept-${content.deptCode}`;
  const faqSchema = getFAQSchema(content.faq);

  const sectionClass =
    variant === 'underH1'
      ? 'scroll-mt-24 border-b border-slate-200 bg-[#F2F2F2] px-4 py-8 md:py-10'
      : 'scroll-mt-24 border-y border-slate-200 bg-[#F2F2F2] px-4 py-12 md:py-14';

  return (
    <>
      {emitFaqSchema ? (
        <JsonLd id={`schema-dept-local-faq-${content.deptCode}`} schema={faqSchema} />
      ) : null}

      <section
        id={`contenu-local-${content.deptCode}`}
        className={sectionClass}
        aria-label={`Contenu local ${content.departementNom} (${content.deptCode})`}
      >
        <div className={variant === 'underH1' ? 'mx-auto max-w-4xl' : 'mx-auto max-w-4xl'}>
          <p className="text-base leading-relaxed text-slate-700 md:text-lg">{content.intro}</p>

          <h2 className="font-display mt-8 text-xl font-bold text-slate-900 md:text-2xl">
            Villes &amp; secteurs desservis
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-700 md:text-lg">
            {content.villesEtTrajets}
          </p>

          <h2 className="font-display mt-8 text-xl font-bold text-slate-900 md:text-2xl">
            Tissu BTP local
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-700 md:text-lg">
            {content.tissuBtpLocal}
          </p>

          <h2 className="font-display mt-8 text-xl font-bold text-slate-900 md:text-2xl">
            2 cas d&apos;usage prioritaires {content.deptCode === '75' ? 'à Paris' : `en ${content.departementNom}`}
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-slate-700 md:text-lg">
            {content.casUsage.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <nav
            className="mt-8 grid gap-3 sm:grid-cols-3"
            aria-label={`Liens formations ${content.departementNom}`}
          >
            {content.internalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl border border-slate-200 bg-white p-4 text-sm shadow-sm transition hover:border-[#377CF3] hover:shadow-md"
              >
                <span className="font-semibold text-[#377CF3]">{link.label}</span>
                <span className="mt-1 block text-slate-700">{link.description}</span>
              </Link>
            ))}
          </nav>

          <div className="mt-8">
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
              FAQ {content.departementNom} ({content.deptCode})
            </h3>
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
