import Link from 'next/link';
import { RdvLink } from '@/components/RdvLink';
import { Building2, Mic } from 'lucide-react';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';

const PAGE_META_DESCRIPTION =
  'Études de cas formation IA BTP : FFB & CSFE, compte rendu vocal de chantier. Retours terrain, méthodes et résultats. Laure Olivié, Qualiopi, présentiel IDF.';

export const metadata = createPageMetadata({
  title: 'Études de cas formation IA BTP',
  description: PAGE_META_DESCRIPTION,
  descriptionFinal: true,
  path: LINKS.etudesCasHub,
  keywords: [
    'étude de cas formation IA BTP',
    'retour expérience formation BTP',
    'FFB formation IA',
    'compte rendu chantier IA',
  ],
});

const ETUDES = [
  {
    href: LINKS.etudesCasFfbCsfe,
    title: 'FFB & CSFE — Étanchéité',
    description:
      'Interventions réseau FFB et Chambre syndicale française de l’étanchéité : modules, objectifs et bénéfices terrain.',
    icon: Building2,
  },
  {
    href: LINKS.etudesCasCrVocalChantier,
    title: 'Compte rendu vocal de chantier',
    description:
      'PME gros œuvre IDF : structurer un CR à partir d’une dictée et de l’IA — validation humaine systématique.',
    icon: Mic,
  },
] as const;

export default function EtudesDeCasHubPage() {
  return (
    <div>
      <section className="border-b border-slate-200 bg-gradient-to-b from-[#f8fbff] via-white to-white px-4 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Études de cas — formation IA pour le BTP
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Retours d&apos;expérience concrets : fédérations professionnelles, PME et équipes terrain
            accompagnées par {SITE_CONFIG.name}, organisme certifié Qualiopi.
          </p>
          <div className="mt-8">
            <RdvLink className="rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white hover:bg-blue-600">
              Prendre rendez-vous
            </RdvLink>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {ETUDES.map((etude) => {
            const Icon = etude.icon;
            return (
              <Link
                key={etude.href}
                href={etude.href}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-[var(--accent)] hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)] transition group-hover:bg-[var(--accent)] group-hover:text-white">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <h2 className="mt-4 font-display text-xl font-bold text-slate-900 group-hover:text-[var(--accent)]">
                  {etude.title}
                </h2>
                <p className="mt-2 text-sm text-slate-600">{etude.description}</p>
                <p className="mt-4 text-sm font-semibold text-[var(--accent)]">Lire l&apos;étude de cas →</p>
              </Link>
            );
          })}
        </div>

        <p className="mt-12 text-center text-sm text-slate-500">
          <Link href={LINKS.formations} className="font-medium text-[var(--accent)] hover:underline">
            Voir le catalogue des formations IA BTP
          </Link>
        </p>
      </div>
    </div>
  );
}
