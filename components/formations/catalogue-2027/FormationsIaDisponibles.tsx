import Link from 'next/link';
import {
  formatPrixInterHt,
  getModulesDisponibles,
  prixModuleInterHt,
} from '@/data/catalogue-2027';
import { catalogueDemandeHref } from '@/lib/training-page-helpers';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

export function FormationsIaDisponibles() {
  const modules = getModulesDisponibles();

  return (
    <section
      id="formations-ia-disponibles"
      className="mt-16 scroll-mt-24 border-t border-[#E2E8F0] pt-14"
      aria-labelledby="ia-disponibles-title"
    >
      {/* Ancres SEO legacy — conserver les URL /formations#… existantes */}
      <span id="catalogue-niveau-1" className="sr-only" />
      <span id="catalogue-niveau-2" className="sr-only" />
      <span id="catalogue-niveau-3" className="sr-only" />
      <span id="skills-metiers-btp" className="sr-only" />
      <h2 id="ia-disponibles-title" className="ofc-type-h2 text-ofc-ink">
        Formations IA disponibles
      </h2>
      <p className="mt-3 max-w-2xl text-ofc-ink-muted">
        Six modules numériques sont ouverts dès maintenant. Les autres modules du catalogue ont une
        ouverture prévue en 2027.
      </p>
      <ul className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {modules.map((m) => {
          const prix = prixModuleInterHt(m.code, m.dureeHeures);
          const prixLabel =
            m.code === 'NUM-04'
              ? `${formatPrixInterHt(310)} ou ${formatPrixInterHt(620)}`
              : formatPrixInterHt(prix);
          return (
            <li key={m.code} className="flex flex-col border border-[#E2E8F0] bg-white p-5">
              <p className="text-xs text-ofc-ink-muted">{m.code}</p>
              <h3 className="mt-1 text-base font-semibold text-ofc-ink">{m.titre}</h3>
              <p className="mt-2 text-sm text-ofc-ink-muted">{m.objectifPrincipal}</p>
              <p className="mt-3 text-sm font-semibold text-ofc-ink">
                {m.dureeHeures === 7 && m.variantesDureeHeures
                  ? '7 h ou 14 h'
                  : `${m.dureeHeures} h`}{' '}
                · {prixLabel} / participant
              </p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                {m.href ? (
                  <Link
                    href={m.href}
                    className={`${OFC_CTA_PRIMARY} inline-flex min-h-10 items-center justify-center px-4 py-2 text-sm`}
                  >
                    Voir la formation
                  </Link>
                ) : (
                  <Link
                    href={catalogueDemandeHref({
                      formationOuParcours: `${m.code} — ${m.titre}`,
                      nature: 'choix-formation',
                    })}
                    className={`${OFC_CTA_PRIMARY} inline-flex min-h-10 items-center justify-center px-4 py-2 text-sm`}
                  >
                    Demander le programme
                  </Link>
                )}
                <Link
                  href={catalogueDemandeHref({
                    formationOuParcours: `${m.code} — ${m.titre}`,
                    nature: 'devis',
                  })}
                  className={`${OFC_CTA_SECONDARY} inline-flex min-h-10 items-center justify-center px-4 py-2 text-sm`}
                >
                  Demander un devis
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
