import Image from 'next/image';

const VISUALS: { src: string; alt: string; caption: string; badge: string }[] = [
  {
    src: '/images/blog/guide-claude-btp-2026/slide-02.png',
    alt: 'Claude Chat : interface conversationnelle pour analyser un DCE ou un CCTP BTP',
    caption: 'Claude Chat — conversation et projets',
    badge: 'CHAT',
  },
  {
    src: '/images/blog/guide-claude-btp-2026/slide-04.png',
    alt: 'Claude Cowork : tableau de bord et missions sur fichiers pour un conducteur de travaux BTP',
    caption: 'Claude Cowork — missions sur dossiers locaux',
    badge: 'COWORK',
  },
  {
    src: '/images/blog/guide-claude-btp-2026/slide-06.png',
    alt: 'Claude Code dans l’environnement de développement pour automatiser devis et exports BTP',
    caption: 'Claude Code — automatisation et scripts',
    badge: 'CODE',
  },
  {
    src: '/images/blog/guide-claude-btp-2026/slide-08.png',
    alt: 'Application Claude sur bureau pour accéder à Cowork depuis le poste chantier ou bureau',
    caption: 'Application desktop Anthropic',
    badge: 'DESKTOP',
  },
  {
    src: '/images/blog/guide-claude-btp-2026/slide-10.png',
    alt: 'Extension Claude pour Chrome : analyse de fiches marchés publics et rédaction d’emails BTP',
    caption: 'Claude pour Chrome — page web ouverte',
    badge: 'CHROME',
  },
];

export function ClaudeBtpInterfaceGallery() {
  return (
    <section className="scroll-mt-24" aria-labelledby="interfaces-visuels">
      <h2
        id="interfaces-visuels"
        className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl"
      >
        Repères visuels — les 5 interfaces
      </h2>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#64748B]">
        Extraits pédagogiques du guide Claude BTP — pour situer chaque interface avant de plonger dans les ressources
        détaillées.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {VISUALS.slice(0, 3).map((vis) => (
          <figure
            key={vis.src}
            className="group overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition duration-300 hover:scale-[1.02] hover:shadow-[0_16px_48px_rgba(15,23,42,0.12)]"
          >
            <div className="relative aspect-[3/2] w-full">
              <span className="absolute left-3 top-3 z-10 rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#377CF3] shadow-sm backdrop-blur-md">
                {vis.badge}
              </span>
              <Image
                src={vis.src}
                alt={vis.alt}
                fill
                className="object-cover object-top transition duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-white/80 px-3 py-2.5 text-xs leading-snug text-[#334155] backdrop-blur-md">
                {vis.caption}
              </figcaption>
            </div>
          </figure>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap justify-center gap-6">
        {VISUALS.slice(3).map((vis) => (
          <figure
            key={vis.src}
            className="group w-full max-w-md overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition duration-300 hover:scale-[1.02] hover:shadow-[0_16px_48px_rgba(15,23,42,0.12)] sm:w-[calc(50%-12px)] lg:w-[min(100%,380px)]"
          >
            <div className="relative aspect-[3/2] w-full">
              <span className="absolute left-3 top-3 z-10 rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#377CF3] shadow-sm backdrop-blur-md">
                {vis.badge}
              </span>
              <Image
                src={vis.src}
                alt={vis.alt}
                fill
                className="object-cover object-top transition duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 640px) 100vw, 380px"
                loading="lazy"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-white/80 px-3 py-2.5 text-xs leading-snug text-[#334155] backdrop-blur-md">
                {vis.caption}
              </figcaption>
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}
