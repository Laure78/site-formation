import { Check } from 'lucide-react';
import {
  FORMATION_CATALOGUE_H2,
  FORMATION_CATALOGUE_INNER_MAX_3XL,
  FORMATION_CATALOGUE_SECTION_MUTED,
} from '@/lib/formation-catalogue-layout-classes';
import { DEV_WEB_IA_DONNEES_CONTROLE } from '@/lib/formation-developpement-web-ia-content';
import { OFC_EYEBROW } from '@/lib/ofc-interaction-classes';

export function DevWebIaDonneesControleSection() {
  return (
    <section
      id="donnees-sous-controle"
      className={`${FORMATION_CATALOGUE_SECTION_MUTED} scroll-mt-24`}
      aria-labelledby="donnees-sous-controle-title"
    >
      <div className={FORMATION_CATALOGUE_INNER_MAX_3XL}>
        <p className={OFC_EYEBROW}>Confidentialité</p>
        <h2 id="donnees-sous-controle-title" className={`${FORMATION_CATALOGUE_H2} mt-3`}>
          Vos données restent sous contrôle
        </h2>
        <ul className="mt-6 space-y-3">
          {DEV_WEB_IA_DONNEES_CONTROLE.map((item) => (
            <li key={item} className="flex gap-3 text-base text-slate-800">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
