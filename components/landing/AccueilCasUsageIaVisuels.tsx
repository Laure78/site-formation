import Image from 'next/image';
import { Reveal, RevealGroup } from '@/components/motion/Reveal';
import { OFC_SEC } from '@/lib/ofc-section-classes';
import { PHOTOS } from '@/lib/photos';

const CAS_USAGE_VISUELS = [
  {
    photo: PHOTOS.accueilIaAppliqueeChantierBtp2026,
    title: 'IA appliquée au chantier',
    caption: 'Planification intelligente, rapports automatisés et contrôle documentaire — Laure Olivié formatrice IA BTP.',
  },
  {
    photo: PHOTOS.accueilIaDevisChiffrageBtp2026,
    title: 'Devis et chiffrage',
    caption: 'Notes, photos et plans transformés en devis structuré, conforme et prêt à envoyer.',
  },
  {
    photo: PHOTOS.accueilAnalyseDceAppelsOffresBtp2026,
    title: 'Analyse DCE / appels d\'offres',
    caption: 'Extraction IA, évaluation et synthèse Go/No Go — décisions plus rapides, sûres et documentées.',
  },
  {
    photo: PHOTOS.accueilCompteRenduDoePvChantier2026,
    title: 'Compte rendu, DOE et PV',
    caption: 'Notes vocales sur chantier transformées en CR, DOE ou PV structurés — validation métier incluse.',
  },
] as const;

export function AccueilCasUsageIaVisuels() {
  const sessionPhoto = PHOTOS.accueilFormationIaBtpSallePresentiel2026;

  return (
    <section
      aria-labelledby="home-cas-usage-ia-visuels"
      className={OFC_SEC.white}
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <h2
            id="home-cas-usage-ia-visuels"
            className="font-display text-2xl font-bold tracking-tight text-[#1A1A1A] md:text-3xl"
          >
            L&apos;IA en action sur vos documents BTP
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#5A5A5A] md:text-[17px]">
            De la saisie terrain au document final : des workflows concrets enseignés en formation,
            toujours avec relecture et validation métier de votre côté.
          </p>
        </Reveal>

        <Reveal className="mt-10 flex justify-center">
          <figure className="w-full max-w-[280px] overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_12px_32px_-20px_rgba(15,23,42,0.14)] sm:max-w-xs md:max-w-sm">
            <Image
              src={sessionPhoto.src}
              alt={sessionPhoto.alt}
              title={sessionPhoto.title}
              width={sessionPhoto.width}
              height={sessionPhoto.height}
              loading="lazy"
              className="h-auto w-full object-cover"
              sizes="(max-width: 640px) 280px, 384px"
            />
            <figcaption className="border-t border-slate-100 bg-[#F2F2F2]/60 px-4 py-3 text-center">
              <p className="text-xs font-semibold leading-snug text-slate-900 sm:text-sm">
                Mes formations IA pour le BTP — exercices terrain, cas réels et petits groupes
              </p>
            </figcaption>
          </figure>
        </Reveal>

        <RevealGroup className="mt-8 grid gap-6 sm:grid-cols-2" staggerMs={50}>
          {CAS_USAGE_VISUELS.map((item) => (
            <figure
              key={item.photo.src}
              className="flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm"
            >
              <Image
                src={item.photo.src}
                alt={item.photo.alt}
                title={`Cas d'usage formation IA BTP — ${item.title}`}
                width={item.photo.width}
                height={item.photo.height}
                loading="lazy"
                className="h-auto w-full object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <figcaption className="flex flex-1 flex-col gap-1 border-t border-slate-100 px-4 py-4 sm:px-5">
                <p className="text-sm font-semibold text-slate-900 md:text-base">{item.title}</p>
                <p className="text-sm leading-relaxed text-slate-600">{item.caption}</p>
              </figcaption>
            </figure>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
