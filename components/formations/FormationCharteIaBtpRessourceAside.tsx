import Link from 'next/link';
import {
  CHARTE_IA_BTP_BLOG_HREF,
  CHARTE_IA_BTP_DOWNLOAD_LABEL,
} from '@/lib/charte-ia-btp-ressource';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

type Props = {
  className?: string;
};

/** Bloc discret — lien vers le guide charte IA (fiches formation). */
export function FormationCharteIaBtpRessourceAside({ className = '' }: Props) {
  return (
    <aside
      className={`rounded-xl border border-slate-200 bg-slate-50/90 px-4 py-4 text-sm text-slate-700 md:px-5 ${className}`.trim()}
      aria-label="Ressource charte IA"
    >
      <p className="font-medium text-slate-900">Ressource pratique : votre modèle de charte IA BTP</p>
      <p className="mt-1 leading-relaxed">
        <Link href={CHARTE_IA_BTP_BLOG_HREF} className={`font-semibold ${OFC_LINK}`}>
          Télécharger et adapter la charte IA de votre entreprise
        </Link>
        {' — '}
        {CHARTE_IA_BTP_DOWNLOAD_LABEL.replace('Télécharger le ', '').replace(' (.doc)', '')} et tutoriel en
        sept étapes.
      </p>
    </aside>
  );
}
