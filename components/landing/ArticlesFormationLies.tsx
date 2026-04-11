import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG } from '@/lib/seo';
import { PortraitLinkedInLink } from '@/components/PortraitLinkedInLink';
import { PHOTOS } from '@/lib/photos';

/** Cartes « articles liés » — titres & accroches alignés maquette ; liens vers articles du blog. */
const ARTICLES = [
  {
    href: '/blog/5-cas-usage-chatgpt-artisans-btp',
    image: PHOTOS.ouvrierPlan,
    category: 'Formation',
    date: '5 mars 2026',
    dateTime: '2026-03-05',
    title:
      'Compte-rendu de chantier et IA : comment automatiser vos CR pour gagner 5h par semaine',
    excerpt:
      'Les comptes-rendus de chantier consomment entre 3 et 5 heures par…',
  },
  {
    href: '/blog/ia-devis-gain-temps-pme-btp',
    image: PHOTOS.architecteConcentration,
    category: 'Formation',
    date: '5 mars 2026',
    dateTime: '2026-03-05',
    title:
      'IA et devis dans le BTP : automatiser le chiffrage et la mise en forme pour gagner 10h par mois',
    excerpt:
      'Le processus de devis dans le BTP consomme entre 15 et 25 heures par mois…',
  },
  {
    href: '/blog/financer-formation-ia-btp-constructys',
    image: PHOTOS.formationEntreprise,
    category: 'Formation',
    date: '3 mars 2026',
    dateTime: '2026-03-03',
    title:
      'Financer sa formation IA dans le BTP : le guide Constructys pour les PME du bâtiment',
    excerpt:
      "Constructys, l'OPCO de la construction, finance jusqu'à 100 % des formations IA…",
  },
] as const;

export function ArticlesFormationLies() {
  return (
    <section className="border-b border-slate-200 bg-white px-4 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-display text-2xl font-bold text-slate-900 md:text-3xl">
          Articles liés à cette formation
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {ARTICLES.map((a) => (
            <article
              key={a.href}
              className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <Link href={a.href} className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <Image
                  src={a.image.src}
                  alt={a.image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </Link>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                  <span className="font-semibold text-[var(--accent)]">{a.category}</span>
                  <span className="text-slate-400" aria-hidden>
                    |
                  </span>
                  <time className="text-slate-500" dateTime={a.dateTime}>
                    {a.date}
                  </time>
                </div>
                <h3 className="mt-3 font-display text-lg font-bold leading-snug text-slate-900">
                  <Link href={a.href} className="hover:text-[var(--accent)] hover:underline">
                    {a.title}
                  </Link>
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{a.excerpt}</p>
                <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4">
                  <PortraitLinkedInLink className="shrink-0 rounded-full ring-2 ring-[var(--accent-soft)] transition-opacity hover:opacity-95">
                    <Image
                      src={PHOTOS.linkedinGraz.src}
                      alt={PHOTOS.linkedinGraz.alt}
                      title="Profil LinkedIn — Laure Olivié, formatrice IA BTP"
                      width={36}
                      height={36}
                      className="h-9 w-9 rounded-full object-cover"
                    />
                  </PortraitLinkedInLink>
                  <span className="text-sm font-medium text-slate-800">{SITE_CONFIG.name}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center">
          <Link href="/blog" className="text-sm font-medium text-[var(--accent)] hover:underline">
            Tous les articles →
          </Link>
        </p>
      </div>
    </section>
  );
}
