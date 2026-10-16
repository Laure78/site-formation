import Link from 'next/link';
import { CHARTE_IA_BTP_BLOG_HREF } from '@/lib/charte-ia-btp-ressource';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

/** Bloc parcours dirigeant — encadrer l’IA en entreprise. */
export function ParcoursEncadrerIaBlock() {
  return (
    <section
      className="mt-10 rounded-xl border border-[#377CF3]/20 bg-[#F2F2F2]/60 p-5 md:p-6"
      aria-labelledby="encadrer-ia-titre"
    >
      <h2 id="encadrer-ia-titre" className="ofc-type-h2 text-ofc-ink">
        Encadrer l’IA dans votre entreprise
      </h2>
      <p className="mt-3 text-ofc-ink-muted">
        Définissez les outils autorisés, les règles de confidentialité et les contrôles à appliquer avec une
        charte adaptée au BTP.
      </p>
      <p className="mt-4">
        <Link href={CHARTE_IA_BTP_BLOG_HREF} className={`font-semibold ${OFC_LINK}`}>
          Consulter le guide et télécharger la charte IA
        </Link>
      </p>
    </section>
  );
}
