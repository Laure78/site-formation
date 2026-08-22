import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, GraduationCap } from 'lucide-react';
import { Reveal, RevealGroup } from '@/components/motion/Reveal';
import { OFC_CAS_USAGE_CARD } from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';
import { LINKS } from '@/lib/internal-links';
import { PHOTOS } from '@/lib/photos';

const CAS_USAGE_VISUELS = [
  {
    photo: PHOTOS.accueilIaAppliqueeChantierBtp2026,
    title: 'IA appliquée au chantier',
    caption: 'Planification intelligente, rapports automatisés et contrôle documentaire — Laure Olivié formatrice IA BTP.',
    href: '#guide-conducteur-travaux',
    linkLabel: 'Guide conducteur de travaux (PDF gratuit)',
    /** Badge visible — doit coller à la destination (ancre guide PDF, pas tuto). */
    badge: 'Guide PDF gratuit',
  },
  {
    photo: PHOTOS.accueilIaDevisChiffrageBtp2026,
    title: 'Devis et chiffrage',
    caption: 'Notes, photos et plans transformés en devis structuré, conforme et prêt à envoyer.',
    href: LINKS.iaDevis,
    linkLabel: 'Méthode IA pour les devis bâtiment',
    badge: 'Voir la méthode',
  },
  {
    photo: PHOTOS.accueilAnalyseDceAppelsOffresBtp2026,
    title: 'Analyse DCE / appels d\'offres',
    caption: 'Extraction IA, évaluation et synthèse Go/No Go — décisions plus rapides, sûres et documentées.',
    href: LINKS.iaAnalyseDce,
    linkLabel: 'Méthode : analyser un DCE avec l\'IA',
    badge: 'Voir la méthode',
  },
  {
    photo: PHOTOS.accueilCompteRenduDoePvChantier2026,
    title: 'Compte rendu, DOE et PV',
    caption: 'Notes vocales sur chantier transformées en CR, DOE ou PV structurés — validation métier incluse.',
    href: LINKS.iaCompteRenduChantier,
    linkLabel: 'Méthode : comptes rendus de chantier avec l\'IA',
    badge: 'Voir la méthode',
  },
] as const;

export function AccueilCasUsageIaVisuels() {
  const sessionPhoto = PHOTOS.accueilFormationIaBtpSallePresentiel2026;

  return (
    <section
      aria-labelledby="home-cas-usage-ia-visuels"
      className={OFC_SEC.white}
    >
      <div className="mx-auto max-w-7xl">
        <Reveal as="header" className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#377CF3]/20 bg-[#F2F2F2]/80 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#377CF3] sm:text-xs">
            <GraduationCap className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
            Cas d&apos;usage terrain
          </p>
          <h2
            id="home-cas-usage-ia-visuels"
            className="mt-5 font-display text-2xl font-bold tracking-tight text-[#1A1A1A] md:text-3xl"
          >
            L&apos;IA en action sur vos documents BTP
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#5A5A5A] md:text-[17px]">
            De la saisie terrain au document final : des workflows concrets enseignés en formation,
            toujours avec relecture et validation métier de votre côté.
          </p>
        </Reveal>

        <div className="mt-10 space-y-10 lg:mt-12 lg:space-y-12">
          <Reveal className="mx-auto w-full max-w-sm sm:max-w-md">
            <p className="mb-3 text-center text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-slate-500 sm:text-xs">
              Formations présentiel
            </p>
            <Link
              href={LINKS.formations}
              title="Catalogue des formations IA pour le BTP — organisme certifié Qualiopi, présentiel Île-de-France"
              className={`${OFC_CAS_USAGE_CARD} group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_12px_32px_-20px_rgba(15,23,42,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]`}
            >
              <figure className="flex flex-col">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50 sm:aspect-[16/10]">
                  <Image
                    src={sessionPhoto.src}
                    alt={sessionPhoto.alt}
                    title={sessionPhoto.title}
                    fill
                    loading="lazy"
                    className="ofc-cas-usage-image object-cover"
                    sizes="(max-width: 640px) 100vw, 448px"
                  
                    quality={70}/>
                </div>
                <figcaption className="border-t border-slate-100 bg-[#F2F2F2]/60 px-4 py-4 text-center">
                  <p className="text-xs font-semibold leading-snug text-slate-900 sm:text-sm">
                    Mes formations IA pour le BTP — exercices terrain, cas réels et petits groupes
                  </p>
                  <p className="mt-2 inline-flex items-center justify-center gap-1 text-[0.7rem] font-semibold text-[#377CF3] sm:text-xs">
                    Voir le catalogue
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 transition group-hover:translate-x-0.5" aria-hidden />
                  </p>
                </figcaption>
              </figure>
            </Link>
          </Reveal>

          <div className="min-w-0">
            <Reveal>
              <h3 className="text-center font-display text-lg font-bold tracking-tight text-[#1A1A1A] md:text-xl">
                Méthodes IA par thématique terrain
              </h3>
              <p className="mt-2 text-center text-sm leading-relaxed text-[#5A5A5A]">
                Devis, DCE, comptes rendus — pages méthodes + formation, validation métier de votre côté.
              </p>
            </Reveal>

            <RevealGroup
              className="mt-5 grid grid-cols-2 items-stretch gap-4 sm:gap-5 lg:mt-6 xl:grid-cols-4"
              staggerMs={50}
            >
              {CAS_USAGE_VISUELS.map((item) => (
                <Link
                  key={item.photo.src}
                  href={item.href}
                  title={item.linkLabel}
                  className={`${OFC_CAS_USAGE_CARD} group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]`}
                >
                  <figure className="flex h-full flex-col">
                    <div className="relative aspect-square w-full overflow-hidden bg-slate-50">
                      <Image
                        src={item.photo.src}
                        alt={item.photo.alt}
                        title={`Cas d'usage formation IA BTP — ${item.title}`}
                        fill
                        loading="lazy"
                        className="ofc-cas-usage-image object-cover"
                        sizes="(max-width: 1280px) 25vw, 220px"
                      
                        quality={70}/>
                    </div>
                    <figcaption className="flex flex-1 flex-col gap-1.5 border-t border-slate-100 px-3 py-3">
                      <p className="text-xs font-semibold leading-snug text-slate-900 sm:text-sm">{item.title}</p>
                      <p className="flex-1 text-[0.7rem] leading-relaxed text-slate-600 sm:text-xs">{item.caption}</p>
                      <p className="mt-auto inline-flex items-center gap-1 pt-1 text-[0.7rem] font-semibold text-[#377CF3] sm:text-xs">
                        {item.badge}
                        <ArrowRight className="h-3 w-3 shrink-0 transition group-hover:translate-x-0.5" aria-hidden />
                      </p>
                    </figcaption>
                  </figure>
                </Link>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
