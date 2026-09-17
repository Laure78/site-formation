import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { LINKS } from '@/lib/internal-links';
import { QUALIOPI_ORGANISME_CERTIFIE } from '@/config/qualiopi';
import { OFC_CTA_PRIMARY } from '@/lib/ofc-interaction-classes';

/** Financement — bloc visuel, formulation Qualiopi prudente. */
export function AccueilFinancementSection() {
  return (
    <Section id="accueil-financement" tone="canvas" aria-labelledby="accueil-financement-title" className="scroll-mt-24">
      <div className="ofc-card mx-auto max-w-4xl overflow-hidden p-0">
        <div className="grid md:grid-cols-[1.1fr_0.9fr]">
          <div className="p-8 md:p-12">
            <Badge>Financement</Badge>
            <SectionHeader
              titleId="accueil-financement-title"
              title="Formation professionnelle et financement"
              description={undefined}
              className="mt-4 max-w-xl"
            />
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ofc-ink-muted">
              Organisme certifié Qualiopi. Prise en charge possible par votre OPCO selon éligibilité,
              plafonds et accord de financement.
            </p>
            <p className="mt-3 max-w-xl text-sm text-ofc-ink-subtle">
              OFC Création d&apos;Entreprise est un {QUALIOPI_ORGANISME_CERTIFIE}.
            </p>
            <Link
              href={LINKS.financement}
              className={`${OFC_CTA_PRIMARY} mt-8 inline-flex min-h-11 items-center justify-center px-6 py-3`}
              title="Financement Constructys — formation IA pour le BTP"
            >
              Comprendre les possibilités de financement
            </Link>
          </div>
          <div
            className="flex flex-col justify-center gap-4 bg-ofc-accent-soft px-8 py-10 md:px-10"
            aria-hidden
          >
            <div className="rounded-2xl border border-ofc-border bg-white p-5 shadow-ofc-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ofc-ink-subtle">
                Certification
              </p>
              <p className="mt-2 font-display text-xl font-bold text-ofc-ink">Qualiopi</p>
              <p className="mt-1 text-sm text-ofc-ink-muted">Actions de formation</p>
            </div>
            <div className="rounded-2xl border border-ofc-border bg-white p-5 shadow-ofc-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ofc-ink-subtle">
                OPCO
              </p>
              <p className="mt-2 font-display text-xl font-bold text-ofc-ink">Selon éligibilité</p>
              <p className="mt-1 text-sm text-ofc-ink-muted">Pas de prise en charge automatique</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
