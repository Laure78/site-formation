import { OFC_TYPE_H3 } from '@/lib/ofc-interaction-classes';

/**
 * Encart méthode de sélection — texte à valider par Laure.
 * TODO(Laure) : remplacer le contenu provisoire ci-dessous.
 */
export function FormateursSelectionEncart() {
  return (
    <aside
      className="formateurs-selection-encart rounded-xl border border-ofc-border bg-white p-5 sm:p-6"
      aria-labelledby="formateurs-selection-title"
    >
      <h2 id="formateurs-selection-title" className={`${OFC_TYPE_H3} text-ofc-ink`}>
        Comment nous choisissons nos formateurs
      </h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-ofc-ink-muted">
        <li>
          TODO — Expérience terrain BTP vérifiée (métier, durée, situations de chantier ou
          d’entreprise).
        </li>
        <li>
          TODO — Formation à la pédagogie IA OFC (cadre Qualiopi, supports et mises en situation).
        </li>
        <li>
          TODO — Suivi qualité après session (retours participants, mise à jour des programmes).
        </li>
      </ul>
    </aside>
  );
}
