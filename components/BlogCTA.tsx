import { Poppins } from 'next/font/google';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

type BlogCTAProps = {
  className?: string;
  /** Identifiant d’article (slug) pour utm_campaign. */
  articleSlug: string;
  /** Suffixe unique pour id du titre (évite doublon quand 2 encarts sur la même page). */
  idSuffix?: 'mid' | 'end';
};

/**
 * Encart CTA blog — charte OFC (fond bleu clair, popup Calendly natif).
 */
export function BlogCTA({ className = '', articleSlug, idSuffix = 'end' }: BlogCTAProps) {
  const titleId = `blog-cta-title-${idSuffix}`;
  const campaignMid = `blog-article-${articleSlug}`;
  const campaign = idSuffix === 'mid' ? campaignMid : `${campaignMid}-fin`;

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
        Formation de 4h éligible à une prise en charge par Constructys ou votre OPCO selon conditions en vigueur. Zéro théorie, 100% pratique sur vos documents réels.
      </p>
      <div className="mt-5">
        <CalendlyEmbed
          type="popup"
          variant="primary"
          ctaPosition={idSuffix === 'mid' ? 'middle' : 'footer'}
          ctaId={`blog-cta-${idSuffix}-${articleSlug}`}
          campaign={campaign}
          className="font-bold shadow-sm"
        />
      </div>
      <p className="mt-3 text-center text-xs text-slate-500 md:text-left">
        Gratuit et sans engagement · Réponse sous 24h
      </p>
    </aside>
  );
}
