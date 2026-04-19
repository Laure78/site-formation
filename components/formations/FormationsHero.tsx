import Link from 'next/link';
import { Check } from 'lucide-react';
import { RdvLink } from '@/components/RdvLink';
import { calendlyCatalogueUrl } from '@/lib/calendly';
import { ENCART_TARIFS_COMMERCIAUX } from '@/lib/tarifs-sessions';
import { LINKS } from '@/lib/internal-links';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';

const visioHeroUrl = calendlyCatalogueUrl('hero');

/**
 * Hero catalogue formations — texte SEO inchangé (H1 + paragraphe intro).
 */
export function FormationsHero() {
  return (
    <section
      className="relative min-h-[500px] overflow-hidden bg-gradient-to-br from-[#377CF3] via-[#2563EB] to-[#1E40AF] py-16 md:py-24"
      aria-labelledby="formations-catalogue-hero-h1"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:28px_28px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4">
        <p className="inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[13px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
          Catalogue 2026 · 6 formations Qualiopi
        </p>
        <h1
          id="formations-catalogue-hero-h1"
          className="mt-6 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl md:leading-[1.1] lg:text-[56px]"
        >
          Catalogue formation IA BTP : 6 formations Qualiopi de 4 h, bâtiment et travaux publics
        </h1>
        <p className="mt-5 max-w-[680px] text-base leading-relaxed text-white/80 md:text-base">
          Formations IA BTP finançables pour dirigeants,{' '}
          <strong className="font-semibold text-white">professionnels du BTP</strong>, PME bâtiment et fonctions support
          : intelligence artificielle bâtiment, formation IA travaux publics et{' '}
          <Link href={LINKS.chatgptArtisans} className="font-medium text-white underline-offset-2 hover:underline">
            ChatGPT pour entreprises BTP
          </Link>{' '}
          au service des devis, emails, comptes rendus de chantier et appels d&apos;offres. {ENCART_TARIFS_COMMERCIAUX}{' '}
          Méthode 100&nbsp;% terrain, orientée productivité — sessions en présentiel, inter en Île-de-France ou intra dans
          vos locaux.{' '}
          <RdvLink className="font-medium text-white underline-offset-2 hover:underline">Prenez rendez-vous</RdvLink> pour
          un diagnostic personnalisé.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <a
            href={visioHeroUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-center text-base font-semibold text-[#1E40AF] shadow-xl transition hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Réserver ma visio gratuite
          </a>
          <Link
            href={LINKS.financement}
            className="inline-flex items-center justify-center rounded-xl border border-white/40 bg-transparent px-8 py-4 text-center text-base font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Voir le financement Constructys
          </Link>
        </div>
        <p className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-white/70">
          <span className="inline-flex items-center gap-1.5">
            <Check className="h-4 w-4 shrink-0" strokeWidth={2.5} aria-hidden />
            Qualiopi
          </span>
          <span className="text-white/40" aria-hidden>
            ·
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Check className="h-4 w-4 shrink-0" strokeWidth={2.5} aria-hidden />
            100% finançable
          </span>
          <span className="text-white/40" aria-hidden>
            ·
          </span>
          <span>
            {formatProfessionalsTrainedCount()} pros formés
          </span>
          <span className="text-white/40" aria-hidden>
            ·
          </span>
          <span>{SOCIAL_PROOF.AVERAGE_RATING}</span>
        </p>
      </div>
    </section>
  );
}
