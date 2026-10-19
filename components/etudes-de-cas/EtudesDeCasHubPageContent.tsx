import Link from 'next/link';
import { ClipboardList, Sparkles, ShieldCheck } from 'lucide-react';
import { EtudeCasHubCard } from '@/components/etudes-de-cas/EtudeCasHubCard';
import { LINKS } from '@/lib/internal-links';
import { FormationsFaqSection } from '@/components/formations/FormationsFaqSection';
import {
  ETUDES_DE_CAS_FAQ,
  ETUDES_DE_CAS_HERO,
  ETUDES_DE_CAS_HUB_CARDS,
  ETUDES_DE_CAS_INTERNAL_LINKS,
  ETUDES_DE_CAS_METHODOLOGY_STEPS,
} from '@/lib/etudes-de-cas-hub';
import {
  OFC_CTA_GHOST_ON_ACCENT,
  OFC_CTA_ON_ACCENT,
  OFC_HOWTO_STEP,
  OFC_TYPE_HERO,
  OFC_TYPE_LABEL,
  OFC_TYPE_LEAD,
} from '@/lib/ofc-interaction-classes';
import { OFC_INNER_ACCENT_BAND, OFC_SEC, OFC_SECTION_INNER } from '@/lib/ofc-section-classes';

const METHODOLOGY_ICONS = [ClipboardList, Sparkles, ShieldCheck] as const;

export function EtudesDeCasHubPageContent() {
  return (
    <div>
      <section className={OFC_SEC.heroWhite} aria-labelledby="etudes-cas-h1">
        <div className={`${OFC_SECTION_INNER} max-w-[75rem]`}>
          <p className={OFC_TYPE_LABEL}>{ETUDES_DE_CAS_HERO.eyebrow}</p>
          <h1 id="etudes-cas-h1" className={`${OFC_TYPE_HERO} mt-3 max-w-3xl`}>
            {ETUDES_DE_CAS_HERO.title}
          </h1>
          <p className={`${OFC_TYPE_LEAD} mt-5 max-w-2xl text-ofc-ink-muted`}>
            {ETUDES_DE_CAS_HERO.subtitle}
          </p>
        </div>
      </section>

      <section className={OFC_SEC.muted} aria-labelledby="etudes-cas-grille-titre">
        <div className={`${OFC_SECTION_INNER} max-w-[75rem]`}>
          <h2 id="etudes-cas-grille-titre" className="sr-only">
            Études de cas IA BTP publiées
          </h2>
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {ETUDES_DE_CAS_HUB_CARDS.map((etude) => (
              <EtudeCasHubCard key={etude.href} etude={etude} />
            ))}
          </div>

          <nav
            className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-2 border-t border-slate-200/80 pt-8 text-sm"
            aria-label="Liens utiles — formations et preuves"
          >
            <span className="mr-1 font-medium text-slate-700">Aller plus loin :</span>
            {ETUDES_DE_CAS_INTERNAL_LINKS.map((item, index) => (
              <span key={item.href} className="inline-flex items-center gap-2">
                {index > 0 ? (
                  <span className="text-slate-300" aria-hidden>
                    ·
                  </span>
                ) : null}
                <Link href={item.href} className="font-medium text-[var(--accent)] hover:underline">
                  {item.label}
                </Link>
              </span>
            ))}
          </nav>
          <p className="mt-4 text-sm text-slate-600">
            Références institutionnelles (FFB, CSFE…) :{' '}
            <Link href={LINKS.partenaires} className="font-medium text-[var(--accent)] hover:underline">
              Nos partenaires
            </Link>
            .
          </p>
        </div>
      </section>

      <section className={OFC_SEC.white} aria-labelledby="etudes-cas-methodologie-titre">
        <div className={`${OFC_SECTION_INNER} max-w-[75rem]`}>
          <h2
            id="etudes-cas-methodologie-titre"
            className="font-display text-xl font-bold text-ofc-ink md:text-2xl"
          >
            Une approche pratique, adaptée aux métiers du BTP
          </h2>
          <ol className="mt-8 grid gap-5 md:grid-cols-3 md:gap-6">
            {ETUDES_DE_CAS_METHODOLOGY_STEPS.map((step, index) => {
              const Icon = METHODOLOGY_ICONS[index] ?? ClipboardList;
              return (
                <li
                  key={step.title}
                  className={`${OFC_HOWTO_STEP} rounded-xl border border-slate-200/90 bg-white p-5 shadow-sm`}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EFF6FF] text-[var(--accent)]">
                    <Icon size={20} strokeWidth={1.75} aria-hidden />
                  </div>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Étape {index + 1}
                  </p>
                  <h3 className="mt-1 font-display text-base font-bold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className={OFC_SEC.white}>
        <div className={`${OFC_SECTION_INNER} max-w-[75rem]`}>
          <FormationsFaqSection
            items={ETUDES_DE_CAS_FAQ}
            title="Questions fréquentes sur les études de cas"
            subtitle="Comprendre le rôle de ces retours terrain et le lien avec les formations OFC."
          />
        </div>
      </section>

      <section className={OFC_SEC.whiteCompact} aria-labelledby="etudes-cas-cta-titre">
        <div className={`${OFC_SECTION_INNER} max-w-[75rem]`}>
          <div
            className={`${OFC_INNER_ACCENT_BAND} !mt-0 overflow-hidden rounded-2xl !px-5 py-10 sm:!px-8 sm:py-12 md:!px-10`}
          >
            <div className="mx-auto max-w-2xl text-center text-white">
              <h2 id="etudes-cas-cta-titre" className="font-display text-xl font-bold md:text-2xl">
                Formez vos équipes à l&apos;IA appliquée au BTP
              </h2>
              <p className="mt-4 text-base leading-relaxed text-blue-100">
                Découvrez des formations en présentiel, adaptées à vos métiers, à vos documents et à
                votre niveau.
              </p>
              <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                <Link href={LINKS.formations} className={`${OFC_CTA_ON_ACCENT} w-full sm:w-auto`}>
                  Découvrir les formations
                </Link>
                <Link href={LINKS.prendreRdv} className={`${OFC_CTA_GHOST_ON_ACCENT} w-full sm:w-auto`}>
                  Échanger sur mon projet
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
