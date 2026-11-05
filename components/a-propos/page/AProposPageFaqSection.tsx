import type { FAQItem } from '@/lib/faq';
import { AccueilFaqMaquetteList } from '@/components/landing/accueil/AccueilFaqMaquetteList';

type Props = {
  items: readonly FAQItem[];
};

/** FAQ À propos — titre à gauche, accordéon à droite (maquette). */
export function AProposPageFaqSection({ items }: Props) {
  return (
    <section className="scroll-mt-24" aria-labelledby="a-propos-faq-heading">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-12">
        <div>
          <h2
            id="a-propos-faq-heading"
            className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl"
          >
            Questions{' '}
            <span className="text-ofc-accent">fréquentes</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ofc-ink-muted sm:text-base">
            Identité, expérience BTP et lien entre la marque commerciale Laure Olivié et l&apos;organisme
            OFC Création d&apos;Entreprise.
          </p>
        </div>
        <AccueilFaqMaquetteList items={items} />
      </div>
    </section>
  );
}
