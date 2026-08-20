import Link from 'next/link';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { QualiopiBadge } from '@/components/QualiopiLogo';
import { QUALIOPI_LEGAL } from '@/lib/qualiopi-info';
import { EXTERNAL_AUTHORITY_LINKS } from '@/lib/seo-links';
import { LINKS } from '@/lib/internal-links';

type QualiopiCertificationNoticeProps = {
  className?: string;
  /** Afficher le lien vers le certificat PDF */
  showCertificateLink?: boolean;
  compact?: boolean;
};

/**
 * Logo Qualiopi Certifopac + mention périmètre obligatoire + liens certificat.
 * @see https://certifopac.fr/qualiopi/ressources/usage-logo/
 */
export function QualiopiCertificationNotice({
  className = '',
  showCertificateLink = true,
  compact = false,
}: QualiopiCertificationNoticeProps) {
  const textSize = compact ? 'text-xs' : 'text-sm';

  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-5 ${className}`}>
      <QualiopiBadge className="shrink-0" />
      <div className="min-w-0 text-center sm:text-left">
        <p className={`leading-snug text-slate-600 ${textSize}`}>
          {QUALIOPI_LEGAL.qualiopiCategoryMention}
        </p>
        <p className={`mt-2 text-slate-600 ${textSize}`}>
          Certificateur : Certifopac — certificat n° {QUALIOPI_LEGAL.certificatNumero}, validité{' '}
          {QUALIOPI_LEGAL.certificatValidite}
        </p>
        <div
          className={`mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 sm:justify-start ${textSize}`}
        >
          {showCertificateLink ? (
            <a
              href={QUALIOPI_LEGAL.certificatPdfHref}
              className="font-medium text-[#377CF3] hover:underline"
              download
            >
              {QUALIOPI_LEGAL.certificatPdfLabel}
            </a>
          ) : null}
          <ExternalLinkAnchor
            href={EXTERNAL_AUTHORITY_LINKS.dataGouvQualiopi.href}
            title={EXTERNAL_AUTHORITY_LINKS.dataGouvQualiopi.title}
            className="font-medium text-[#377CF3] hover:underline"
          >
            Vérifier sur data.gouv.fr
          </ExternalLinkAnchor>
          <Link href={LINKS.indicateursResultats} className="font-medium text-[#377CF3] hover:underline">
            Indicateurs de résultats
          </Link>
        </div>
      </div>
    </div>
  );
}
