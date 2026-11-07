import Image from 'next/image';
import { FileText, HardHat, Layers, Shield } from 'lucide-react';

const PEDAGOGIE_BG = '/images/accueil/03-parcours-metiers-chantier.webp';

/** Bandeau bleu marine — réalité du BTP. */
export function RessourcesHubBtpBanner() {
  return (
    <section aria-labelledby="ressources-btp-banner-title" className="mx-auto max-w-[80rem] px-4 py-12 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src={PEDAGOGIE_BG}
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F4F]/95 via-[#0B1F4F]/90 to-[#377CF3]/35" />
        </div>
        <div className="relative px-6 py-10 text-white md:px-10 md:py-12">
          <h2 id="ressources-btp-banner-title" className="ofc-type-h2 text-white">
            Des outils ancrés dans la réalité du BTP
          </h2>
          <ul className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-stretch lg:flex-nowrap lg:divide-x lg:divide-white/25">
            {[
              { icon: HardHat, label: 'Cas pratiques métier' },
              { icon: FileText, label: 'Documents concrets' },
              { icon: Layers, label: 'Téléchargements immédiats' },
              { icon: Shield, label: 'Validation humaine des usages IA' },
            ].map((item) => (
              <li
                key={item.label}
                className="flex flex-1 flex-col items-center gap-2 px-0 text-center sm:min-w-[9rem] lg:px-4"
              >
                <item.icon className="h-7 w-7 text-white" aria-hidden />
                <span className="text-sm font-semibold leading-snug text-white">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
