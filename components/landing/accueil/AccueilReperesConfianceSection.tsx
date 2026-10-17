import { Section } from '@/components/ui/Section';
import { LINKS } from '@/lib/internal-links';

const REPERES = [
  {
    title: 'Spécialisation BTP',
    body: 'Devis, appels d’offres, chantier et documents métier — pas de formation généraliste.',
  },
  {
    title: 'Présentiel en Île-de-France',
    body: 'Sessions en petit groupe sur vos cas réels, dans les départements 75 à 95.',
  },
  {
    title: 'Pratique contrôlée',
    body: 'Exercices sur documents anonymisés, relecture et validation humaine systématique.',
  },
  {
    title: 'Organisme certifié Qualiopi',
    body: 'OFC Création d’Entreprise — certification consultable sur la page dédiée.',
    href: LINKS.qualiopi as string,
  },
] as const satisfies ReadonlyArray<
  { title: string; body: string; href?: string }
>;

export function AccueilReperesConfianceSection() {
  return (
    <Section tone="white" size="compact" aria-labelledby="accueil-reperes-title">
      <h2 id="accueil-reperes-title" className="sr-only">
        Repères de confiance
      </h2>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {REPERES.map((item) => (
          <li
            key={item.title}
            className="rounded-xl border border-ofc-border bg-ofc-surface/50 px-4 py-4"
          >
            <p className="font-display text-sm font-bold text-ofc-ink">{item.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-ofc-ink-muted">{item.body}</p>
            {item.href ? (
              <p className="mt-2">
                <a href={item.href} className="text-sm font-semibold text-ofc-accent hover:underline">
                  Voir la certification Qualiopi
                </a>
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </Section>
  );
}
