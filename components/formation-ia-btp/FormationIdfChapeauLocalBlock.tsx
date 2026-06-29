import Link from 'next/link';
import { IDF_CHAPEAU_LOCAL } from '@/lib/formation-ia-btp-dept-local-content';

/**
 * Bloc chapeau Île-de-France — intro, maillage départements, FAQ (SSR).
 * Le schéma FAQPage est fusionné dans la page parente.
 */
export function FormationIdfChapeauLocalBlock() {
  return (
    <section
        id="contenu-local-idf"
        className="scroll-mt-24 border-b border-slate-200 bg-[#F2F2F2] px-4 py-8 md:py-10"
        aria-label="Formation IA BTP en Île-de-France"
      >
        <div className="mx-auto max-w-4xl">
          <p className="text-base leading-relaxed text-slate-700 md:text-lg">
            {IDF_CHAPEAU_LOCAL.intro}
          </p>
          <p className="mt-5 text-base leading-relaxed text-slate-700 md:text-lg">
            {IDF_CHAPEAU_LOCAL.positionnement}
          </p>

          <h2 className="font-display mt-8 text-xl font-bold text-slate-900 md:text-2xl">
            Choisissez votre département
          </h2>
          <nav
            className="mt-4 flex flex-wrap gap-2"
            aria-label="Pages formation IA BTP par département"
          >
            {IDF_CHAPEAU_LOCAL.departements.map((dept) => (
              <Link
                key={dept.href}
                href={dept.href}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-[#377CF3] shadow-sm transition hover:border-[#377CF3] hover:bg-blue-50"
              >
                {dept.label}
              </Link>
            ))}
          </nav>

          <nav
            className="mt-8 grid gap-3 sm:grid-cols-3"
            aria-label="Liens formations Île-de-France"
          >
            {IDF_CHAPEAU_LOCAL.internalLinks.map((link) => (
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

          <div className="mt-10">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#377CF3]">FAQ</p>
            <h3 className="font-display mt-2 text-xl font-bold text-slate-900 md:text-2xl">
              FAQ Île-de-France
            </h3>
            <div className="mt-6 space-y-3">
              {IDF_CHAPEAU_LOCAL.faq.map((item) => (
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
  );
}
