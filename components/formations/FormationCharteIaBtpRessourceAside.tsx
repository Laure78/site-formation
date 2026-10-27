import Link from 'next/link';
import {
  CHARTE_IA_BTP_DOWNLOAD_LABEL,
  CHARTE_IA_BTP_PAGE_HREF,
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
        <Link href={CHARTE_IA_BTP_PAGE_HREF} className={`font-semibold ${OFC_LINK}`}>
          Lire le guide et télécharger la charte IA
        </Link>
        {' — '}
        modèle PDF {CHARTE_IA_BTP_DOWNLOAD_LABEL.replace('Télécharger ', '').toLowerCase()} et
        méthode pour l’adapter à votre PME.
      </p>
    </aside>
  );
}
