import {
  FORMATION_CATALOGUE_H2,
  FORMATION_CATALOGUE_INNER_MAX_6XL,
  FORMATION_CATALOGUE_SECTION_MUTED,
} from '@/lib/formation-catalogue-layout-classes';
import {
  DEV_WEB_IA_DONNEES_AXES,
  DEV_WEB_IA_DONNEES_CONTROLE,
  DEV_WEB_IA_DONNEES_PRUDENCE,
} from '@/lib/formation-developpement-web-ia-content';
import { OFC_EYEBROW, OFC_TYPE_H3 } from '@/lib/ofc-interaction-classes';

export function DevWebIaDonneesControleSection() {
  return (
    <section
      id="donnees-sous-controle"
      className={`${FORMATION_CATALOGUE_SECTION_MUTED} scroll-mt-24`}
      aria-labelledby="donnees-sous-controle-title"
    >
      <div className={FORMATION_CATALOGUE_INNER_MAX_6XL}>
        <p className={OFC_EYEBROW}>Confidentialité</p>
        <h2 id="donnees-sous-controle-title" className={`${FORMATION_CATALOGUE_H2} mt-3`}>
          Vos données métier sont un actif de l&apos;entreprise
        </h2>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {DEV_WEB_IA_DONNEES_AXES.map((axe) => (
            <li key={axe.title}>
              <article className="h-full rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className={OFC_TYPE_H3}>{axe.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{axe.texte}</p>
              </article>
            </li>
          ))}
        </ul>

        <p
          role="note"
          className="mt-8 max-w-3xl rounded-2xl border border-[#377CF3]/25 bg-[#EFF6FF] px-5 py-4 text-base font-medium leading-relaxed text-slate-800"
        >
          {DEV_WEB_IA_DONNEES_PRUDENCE}
        </p>

        <ul className="mt-6 space-y-2 text-sm leading-relaxed text-slate-600">
          {DEV_WEB_IA_DONNEES_CONTROLE.filter((item) => item !== DEV_WEB_IA_DONNEES_PRUDENCE).map(
            (item) => (
              <li key={item}>{item}</li>
            ),
          )}
        </ul>
      </div>
    </section>
  );
}
