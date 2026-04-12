import { Poppins } from 'next/font/google';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

type BlogCTAProps = {
  className?: string;
  /** Suffixe unique pour id du titre (évite doublon quand 2 encarts sur la même page). */
  idSuffix?: 'mid' | 'end';
};

/**
 * Encart CTA blog — charte OFC (fond bleu clair, bouton primaire #377CF3).
 */
export function BlogCTA({ className = '', idSuffix = 'end' }: BlogCTAProps) {
  const titleId = `blog-cta-title-${idSuffix}`;
  return (
    <aside
      className={`rounded-[12px] bg-[#D4E3FC] p-6 ${poppins.className} ${className}`.trim()}
      aria-labelledby={titleId}
    >
      <h3
        id={titleId}
        className="text-lg font-semibold leading-snug text-slate-900 md:text-xl"
      >
        Vous souhaitez être accompagné ?
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-slate-700 md:text-base">
        Formation de 4h finançable à 100% par Constructys. Zéro théorie, 100% pratique sur vos documents réels.
      </p>
      <div className="mt-5">
        <a
          href={CALENDLY_BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-lg bg-[#377CF3] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#2d66d6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
        >
          Réserver une visio découverte gratuite
        </a>
      </div>
      <p className="mt-3 text-center text-xs text-slate-500 md:text-left">
        Gratuit et sans engagement · Réponse sous 24h
      </p>
    </aside>
  );
}
