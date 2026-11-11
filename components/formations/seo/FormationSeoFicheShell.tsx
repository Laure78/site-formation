import Link from 'next/link';
import { CtaVisio } from '@/components/CtaVisio';
import { FAQAnswer } from '@/components/landing/FAQAnswer';
import { BlogArticleEnBref } from '@/components/blog/BlogArticleEnBref';
import type { ReactNode } from 'react';
import { OFC_EDITORIAL, OFC_PAGE_ARTICLE_NARROW } from '@/lib/ofc-page-classes';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import type { FAQItem } from '@/lib/faq';

type VoirAussiItem = { href: string; label: string };

type Props = {
  h1: string;
  enBref: string;
  children: ReactNode;
  faq: FAQItem[];
  ctaSrcMid: string;
  ctaSrcEnd: string;
  ctaMidIntro?: string;
  ctaEndIntro?: string;
  voirAussi?: VoirAussiItem[];
};

export function FormationSeoFicheShell({
  h1,
  enBref,
  children,
  faq,
  ctaSrcMid,
  ctaSrcEnd,
  ctaMidIntro,
  ctaEndIntro = 'Un échange pour étudier vos missions, vos trames et le format adapté à votre équipe.',
  voirAussi = [],
}: Props) {
  return (
    <div className={`${OFC_PAGE_ARTICLE_NARROW} py-10 md:py-14`}>
      <article className={OFC_EDITORIAL}>
        <BlogArticleEnBref sentences={enBref} />
        <h1 className="mt-6 font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
          {h1}
        </h1>

        <div className="prose-formation mt-8 space-y-8 text-slate-700">{children}</div>

        {ctaMidIntro ? (
          <div className="mt-10 rounded-2xl border border-[#377CF3]/25 bg-slate-50 p-6">
            <p className="text-base font-medium text-slate-800">{ctaMidIntro}</p>
            <div className="mt-4">
              <CtaVisio src={ctaSrcMid} />
            </div>
          </div>
        ) : null}

        <section className="mt-12">
          <h2 className="font-display text-xl font-bold text-slate-900 md:text-2xl">FAQ</h2>
          <div className="mt-6 space-y-6">
            {faq.map((item) => (
              <div key={item.q} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="font-semibold text-slate-900">{item.q}</h3>
                <div className="mt-2 text-slate-600">
                  <FAQAnswer content={item.a} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {voirAussi.length > 0 ? (
          <section className="mt-12">
            <h2 className="font-display text-xl font-bold text-slate-900">Voir aussi</h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {voirAussi.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={OFC_LINK}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="mt-12 rounded-2xl bg-[#377CF3] p-8 text-white">
          <h2 className="font-display text-xl font-bold">Réservez votre visio découverte gratuite</h2>
          <p className="mt-3 text-white/95">{ctaEndIntro}</p>
          <div className="mt-5">
            <CtaVisio src={ctaSrcEnd} variant="primary" className="!bg-white !text-[#377CF3] hover:!bg-slate-50" />
          </div>
        </section>
      </article>
    </div>
  );
}
