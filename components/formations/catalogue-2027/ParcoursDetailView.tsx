import Link from 'next/link';
import {
  formatPrixInterHt,
  getModuleByCode,
  libelleJoursFormation,
  type ParcoursComputed,
} from '@/data/catalogue-2027';
import { libelleDisponibilite } from '@/lib/catalogue-2027/search-modules';
import { catalogueDemandeHref } from '@/lib/training-page-helpers';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { FormateursMetierSection } from '@/components/formateurs/FormateursDomaineSection';
import { getModule2027IaUsage, labelOutil } from '@/lib/formation-ia';
import { FormationsContact2027 } from './FormationsContact2027';

type Props = {
  parcours: ParcoursComputed;
};

export function ParcoursDetailView({ parcours: p }: Props) {
  const devisHref = catalogueDemandeHref({
    formationOuParcours: `Parcours ${p.titre}`,
    nature: 'devis',
    metier: p.metierId,
  });
  const programmeHref = catalogueDemandeHref({
    formationOuParcours: `Parcours ${p.titre}`,
    nature: 'choix-formation',
    metier: p.metierId,
  });
  const adaptHref = catalogueDemandeHref({
    formationOuParcours: `Parcours ${p.titre} — adaptation équipe`,
    nature: 'intra',
    metier: p.metierId,
  });

  return (
    <div className="mx-auto max-w-[80rem] px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <nav aria-label="Fil d’Ariane" className="text-sm text-ofc-ink-muted">
        <Link href={LINKS.formations} className="text-[#377CF3] underline">
          Formations
        </Link>
        <span aria-hidden className="mx-2">
          /
        </span>
        <span className="text-ofc-ink">{p.titre}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,320px)]">
        <div>
          <p className="ofc-badge bg-ofc-accent-soft text-ofc-accent">Parcours métier 2027</p>
          <h1 className="ofc-type-hero mt-4 text-ofc-ink">{p.titre}</h1>
          <p className="ofc-type-lead mt-4 text-ofc-ink-muted">{p.objectif}</p>
          <p className="mt-3 text-sm text-ofc-ink-muted">
            <span className="font-medium text-ofc-ink">Public :</span> {p.publicCible}
          </p>

          <section className="mt-10" aria-labelledby="competences-title">
            <h2 id="competences-title" className="ofc-type-h2 text-ofc-ink">
              Compétences visées
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-ofc-ink-muted">
              {p.competencesVisees.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </section>

          <section className="mt-10" aria-labelledby="prerequis-title">
            <h2 id="prerequis-title" className="ofc-type-h2 text-ofc-ink">
              Prérequis et positionnement
            </h2>
            <p className="mt-3 text-ofc-ink-muted">{p.prerequis}</p>
            <p className="mt-2 text-sm text-ofc-ink-muted">
              Un positionnement permet d’ajuster le parcours. L’évaluation des acquis est intégrée à
              la durée annoncée.
            </p>
            {p.varianteOptionnelle ? (
              <p className="mt-3 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-3 text-sm text-ofc-ink-muted">
                {p.varianteOptionnelle.label} : {p.varianteOptionnelle.dureeHeures} h —{' '}
                {formatPrixInterHt(p.varianteOptionnelle.prixInterHt)} / participant. Ce retrait
                n’est pas automatique.
              </p>
            ) : null}
            {p.initiationComplementaire ? (
              <p className="mt-3 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-3 text-sm text-ofc-ink-muted">
                {p.initiationComplementaire.label} : {p.initiationComplementaire.dureeHeures} h —{' '}
                {formatPrixInterHt(p.initiationComplementaire.prixInterHt)} / participant.
              </p>
            ) : null}
          </section>

          <section className="mt-10" aria-labelledby="etapes-title">
            <h2 id="etapes-title" className="ofc-type-h2 text-ofc-ink">
              Étapes du parcours
            </h2>
            <p className="mt-3 text-sm text-ofc-ink-muted">
              Frise verticale des modules. Un cas pratique commun relie les étapes. Les journées
              peuvent être espacées.
            </p>
            <ol className="relative mt-8 space-y-0 border-l-2 border-[#377CF3]/40 pl-6">
              {p.etapes.map((etape, index) => {
                const mod = getModuleByCode(etape.moduleCode);
                const duree = etape.dureeHeuresOverride ?? mod?.dureeHeures ?? 0;
                const iaUsage = getModule2027IaUsage(etape.moduleCode);
                return (
                  <li key={`${etape.moduleCode}-${index}`} className="relative pb-8 last:pb-0">
                    <span
                      className="absolute -left-[1.9rem] flex h-8 w-8 items-center justify-center rounded-full bg-[#377CF3] text-sm font-semibold text-white"
                      aria-hidden
                    >
                      {index + 1}
                    </span>
                    <article className="border border-[#E2E8F0] bg-white p-4">
                      <p className="text-xs text-ofc-ink-muted">
                        Module {etape.moduleCode}
                        {mod ? ` · ${duree} h` : ''}
                      </p>
                      <h3 className="mt-1 font-semibold text-ofc-ink">
                        {mod?.titre ?? etape.moduleCode}
                      </h3>
                      <dl className="mt-3 space-y-2 text-sm">
                        <div>
                          <dt className="font-medium text-ofc-ink">Compétence travaillée</dt>
                          <dd className="text-ofc-ink-muted">{etape.competence}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-ofc-ink">Exercice professionnel</dt>
                          <dd className="text-ofc-ink-muted">{etape.exercice}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-ofc-ink">Livrable</dt>
                          <dd className="text-ofc-ink-muted">{etape.livrable}</dd>
                        </div>
                      </dl>
                      {iaUsage ? (
                        <div className="mt-3 rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm">
                          <p className="font-medium text-ofc-ink">
                            Usage IA ({labelOutil(iaUsage.outil)})
                          </p>
                          <p className="mt-1 text-ofc-ink-muted">{iaUsage.tacheIa}</p>
                          <p className="mt-2 text-ofc-ink-muted">
                            <span className="font-medium text-ofc-ink">Contrôle humain : </span>
                            {iaUsage.controlesHumains}
                          </p>
                          <p className="mt-1 text-ofc-ink-muted">
                            <span className="font-medium text-ofc-ink">Évaluation : </span>
                            {iaUsage.critereEvaluation}
                          </p>
                        </div>
                      ) : null}
                      {mod?.href ? (
                        <Link
                          href={mod.href}
                          className="mt-3 inline-block text-sm font-medium text-[#377CF3] underline"
                        >
                          Voir le module {mod.titre}
                        </Link>
                      ) : (
                        <Link
                          href={catalogueDemandeHref({
                            formationOuParcours: `${etape.moduleCode} — ${mod?.titre ?? ''}`,
                            nature: 'choix-formation',
                          })}
                          className="mt-3 inline-block text-sm font-medium text-[#377CF3] underline"
                        >
                          Demander le programme du module
                        </Link>
                      )}
                    </article>
                  </li>
                );
              })}
            </ol>
          </section>

          <section className="mt-10" aria-labelledby="methodes-title">
            <h2 id="methodes-title" className="ofc-type-h2 text-ofc-ink">
              Méthodes et évaluation
            </h2>
            <p className="mt-3 text-ofc-ink-muted">
              Présentiel, exercices sur cas professionnels, livrables réutilisables. Évaluation des
              acquis en fin de parcours, intégrée à la durée annoncée. Formations non certifiantes.
            </p>
          </section>

          <section className="mt-10" aria-labelledby="adaptation-title">
            <h2 id="adaptation-title" className="ofc-type-h2 text-ofc-ink">
              Adaptation à l’entreprise
            </h2>
            <p className="mt-3 text-ofc-ink-muted">
              Le parcours peut être adapté en intra : ordre des modules, documents d’entreprise,
              effectif et calendrier. Tarif intra : sur devis.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href={programmeHref}
                className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center px-5 py-3`}
              >
                Demander le programme
              </Link>
              <Link
                href={adaptHref}
                className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center px-5 py-3`}
              >
                Adapter ce parcours à mon équipe
              </Link>
            </div>
          </section>

          <FormationsContact2027
            formationHint={`Parcours ${p.titre}`}
            initialObjet="devis"
          />
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24 border border-[#E2E8F0] bg-[#F8FAFC] p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ofc-ink">Récapitulatif</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-ofc-ink-muted">Durée</dt>
                <dd className="font-semibold text-ofc-ink">
                  {p.dureeHeures} h · {libelleJoursFormation(p.joursFormation)}
                </dd>
              </div>
              <div>
                <dt className="text-ofc-ink-muted">Tarif inter</dt>
                <dd className="font-semibold text-ofc-ink">
                  {formatPrixInterHt(p.prixInterHt)} / participant
                </dd>
              </div>
              <div>
                <dt className="text-ofc-ink-muted">Lieu</dt>
                <dd className="font-semibold text-ofc-ink">Présentiel Île-de-France</dd>
              </div>
              <div>
                <dt className="text-ofc-ink-muted">Disponibilité</dt>
                <dd className="font-semibold text-ofc-ink">
                  {p.mentionDisponibilite ?? libelleDisponibilite(p.disponibilite)}
                </dd>
              </div>
              <div>
                <dt className="text-ofc-ink-muted">Modules</dt>
                <dd className="font-semibold text-ofc-ink">{p.moduleCount}</dd>
              </div>
            </dl>
            <Link
              href={devisHref}
              className={`${OFC_CTA_PRIMARY} mt-5 inline-flex min-h-11 w-full items-center justify-center px-4 py-2 text-sm`}
            >
              Demander le programme
            </Link>
            <Link
              href={adaptHref}
              className={`${OFC_CTA_SECONDARY} mt-3 inline-flex min-h-11 w-full items-center justify-center px-4 py-2 text-sm`}
            >
              Adapter à mon équipe
            </Link>
          </div>
        </aside>
      </div>

      <FormateursMetierSection metierId={p.metierId} />

      {/* CTA mobile sticky */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E2E8F0] bg-white/95 p-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-[80rem] gap-2">
          <Link
            href={programmeHref}
            className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 flex-1 items-center justify-center px-3 py-2 text-sm`}
          >
            Demander le programme
          </Link>
          <Link
            href={adaptHref}
            className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 flex-1 items-center justify-center px-3 py-2 text-sm`}
          >
            Adapter
          </Link>
        </div>
      </div>
    </div>
  );
}
