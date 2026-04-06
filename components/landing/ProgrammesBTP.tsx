import Link from 'next/link';
import { Check } from 'lucide-react';

const PROGRAMMES = [
  {
    id: 'essentiel',
    badge: '1 jour',
    title: 'IA Essentiel BTP',
    price: '2 500 €',
    priceSub: "Par session (jusqu'à 12 participants)",
    features: [
      'Prompt engineering adapté au BTP',
      "5 cas d'usage BTP en atelier pratique",
      'Templates mémoire technique & CCTP',
      'Attestation de formation',
    ],
    highlight: false,
    href: '/prendre-rdv',
    ctaLabel: 'Réserver un échange',
  },
  {
    id: 'transformation',
    badge: '1 mois',
    title: 'IA Transformation BTP',
    price: '12 000 € HT',
    priceSub: 'Accompagnement complet',
    features: [
      'Audit des processus BTP existants',
      'Formation équipes + direction',
      "Déploiement sur cas d'usage réels",
      'Suivi mensuel et optimisation',
      'Support dédié pendant 1 mois',
    ],
    highlight: true,
    href: '/contact',
    ctaLabel: 'Parler du projet',
  },
  {
    id: 'sur-mesure',
    badge: 'Sur mesure',
    title: 'Sur mesure Fédération / OPCO',
    price: 'Sur devis',
    priceSub: 'FFB, CAPEB, Constructys',
    features: [
      'Programme adapté à vos adhérents',
      'Déploiement multi-sites',
      "Cas d'usage sectoriels personnalisés",
      'Reporting et suivi de progression',
    ],
    highlight: false,
    href: '/contact',
    ctaLabel: 'Demander un devis',
  },
] as const;

export function ProgrammesBTP() {
  return (
    <section
      className="border-b border-slate-200 bg-white px-4 py-16 md:py-20"
      aria-labelledby="programmes-btp-titre"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2
            id="programmes-btp-titre"
            className="font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl"
          >
            Nos programmes BTP
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
            Des formations adaptées à chaque besoin, de la découverte au déploiement complet.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {PROGRAMMES.map((p) => (
            <div
              key={p.id}
              className={`flex flex-col rounded-2xl border bg-white p-6 shadow-sm md:p-8 ${
                p.highlight
                  ? 'border-2 border-[var(--accent)] ring-1 ring-[var(--accent)]/20'
                  : 'border border-slate-200'
              }`}
            >
              <span className="inline-flex w-fit rounded-full bg-[#eef2ff] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
                {p.badge}
              </span>
              <h3 className="mt-4 font-display text-xl font-bold text-slate-900">{p.title}</h3>
              <p className="mt-4 text-3xl font-bold tabular-nums text-slate-900 md:text-4xl">{p.price}</p>
              <p className="mt-1 text-sm text-slate-600">{p.priceSub}</p>
              <div className="my-6 border-t border-slate-100" />
              <ul className="flex-1 space-y-3 text-left">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-sm text-slate-700">
                    <Check
                      className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]"
                      strokeWidth={2}
                      aria-hidden
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={p.href}
                className="mt-8 block w-full rounded-xl bg-[var(--accent)] py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                {p.ctaLabel}
              </Link>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-slate-500">
          Tarifs indicatifs — devis personnalisé selon effectif et périmètre. Financement OPCO
          lorsque vous êtes éligible.
        </p>
      </div>
    </section>
  );
}
