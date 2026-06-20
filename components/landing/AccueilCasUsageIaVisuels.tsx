import Image from 'next/image';
import { Reveal, RevealGroup } from '@/components/motion/Reveal';
import { OFC_SEC } from '@/lib/ofc-section-classes';
import { PHOTOS } from '@/lib/photos';

const CAS_USAGE_VISUELS = [
  {
    photo: PHOTOS.accueilIaAppliqueeChantierBtp2026,
    title: 'IA appliquée au chantier',
    caption: 'Planification, rapports d\'avancement et contrôle documentaire — décisions éclairées sur le terrain.',
  },
  {
    photo: PHOTOS.accueilIaDevisChiffrageBtp2026,
    title: 'Devis et chiffrage',
    caption: 'Notes, photos et plans transformés en devis structuré, conforme et prêt à envoyer.',
  },
  {
    photo: PHOTOS.accueilAnalyseDceAppelsOffresBtp2026,
    title: 'Analyse DCE / appels d\'offres',
    caption: 'Synthèse Go/No Go, risques et conformité — pour décider plus vite et plus sûrement.',
  },
  {
    photo: PHOTOS.accueilCompteRenduDoePvChantier2026,
    title: 'Compte rendu, DOE et PV',
    caption: 'Notes vocales et observations structurées en documents complets, prêts à partager.',
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

        <Reveal className="mt-10">
          <figure className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_20px_50px_-24px_rgba(15,23,42,0.12)]">
            <Image
              src={sessionPhoto.src}
              alt={sessionPhoto.alt}
              title={sessionPhoto.title}
              width={sessionPhoto.width}
              height={sessionPhoto.height}
              loading="lazy"
              className="h-auto w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 1152px"
            />
            <figcaption className="border-t border-slate-100 bg-[#F2F2F2]/60 px-5 py-4 text-center sm:px-6">
              <p className="text-sm font-semibold text-slate-900 md:text-base">
                Formations inter et intra en présentiel — ateliers pratiques avec votre métier
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
