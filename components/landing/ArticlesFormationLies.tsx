import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG } from '@/lib/seo';
import { PortraitLinkedInLink } from '@/components/PortraitLinkedInLink';
import { PHOTOS } from '@/lib/photos';
import { AUTHOR_HEADSHOT_OBJECT_POSITION } from '@/lib/author-headshot';
import { QualiopiWordmark } from '@/components/QualiopiLogo';
import { OFC_CARD, OFC_LINK } from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';
import { LINKS } from '@/lib/internal-links';

/** Cartes « articles liés » — titres alignés sur le H1 réel de chaque article cible. */
const ARTICLES = [
  {
    href: LINKS.blogCompteRenduChantierIa,
    image: PHOTOS.ouvrierPlan,
    category: 'Formation',
    date: '10 avril 2026',
    dateTime: '2026-04-10',
    title:
      'Compte-rendu de chantier et IA : comment automatiser vos CR pour gagner 5 h par semaine',
    excerpt:
      'Les comptes-rendus de chantier consomment entre 3 et 5 heures par…',
  },
  {
    href: LINKS.blogIaDevisBatimentChiffrageAutomatise,
    image: PHOTOS.architecteConcentration,
    category: 'Formation',
    date: '27 avril 2026',
    dateTime: '2026-04-27',
    title:
      'IA et devis bâtiment : automatiser le chiffrage BTP sans page blanche',
    excerpt:
      'Premier devis structuré en moins d’une heure vs demi-journée : méthode en 5 étapes et prompts ChatGPT…',
  },
  {
    href: LINKS.blogFinancerFormationIaBtpConstructys,
    image: PHOTOS.formationEntreprise,
    category: 'Formation',
    date: '3 mars 2026',
    dateTime: '2026-03-03',
    title:
      'Financer sa formation IA dans le BTP : le guide Constructys pour les PME du bâtiment',
    excerpt:
      "Constructys, l'OPCO de la construction, peut financer une partie ou la totalité des formations IA selon éligibilité…",
  },
] as const;

export function ArticlesFormationLies() {
  return (
    <section className={OFC_SEC.mutedMesh}>
      <div className="mx-auto max-w-6xl">
        <h3 className="text-center font-display text-2xl font-bold text-slate-900 md:text-3xl">
          Articles liés aux formations IA BTP
        </h3>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {ARTICLES.map((a) => (
            <article
              key={a.href}
              className={`${OFC_CARD} flex flex-col overflow-hidden`}
            >
              <Link href={a.href} className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <Image
                  src={a.image.src}
                  alt={a.image.alt}
                  title={`Article blog — ${a.title}`}
                  fill
                  loading="lazy"
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
                <h4 className="mt-3 font-display text-lg font-bold leading-snug text-slate-900">
                  <Link href={a.href} className={OFC_LINK}>
                    {a.title}
                  </Link>
                </h4>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{a.excerpt}</p>
                <div className="mt-4 flex items-start gap-2 border-t border-slate-100 pt-4">
                  <PortraitLinkedInLink className="shrink-0 rounded-full ring-2 ring-[var(--accent-soft)] transition-opacity hover:opacity-95">
                    <Image
                      src={PHOTOS.siteAvatar.src}
                      alt={PHOTOS.siteAvatar.alt}
                      title="Laure Olivié — profil LinkedIn, formatrice IA BTP OFC Qualiopi"
                      width={36}
                      height={36}
                      loading="lazy"
                      className={`h-9 w-9 rounded-full object-cover ${AUTHOR_HEADSHOT_OBJECT_POSITION}`}
                    />
                  </PortraitLinkedInLink>
                  <div className="min-w-0">
                    <span className="block text-sm font-medium text-slate-800">{SITE_CONFIG.name}</span>
                    <span className="mt-0.5 flex flex-wrap items-center gap-x-1 text-xs leading-snug text-slate-600">
                      <span>Formatrice IA &amp; ChatGPT —</span>
                      <QualiopiWordmark />
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center">
          <Link href="/blog" className={`text-sm ${OFC_LINK}`}>
            Tous les articles →
          </Link>
        </p>
      </div>
    </section>
  );
}
