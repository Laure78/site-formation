import { DevWebIaProjectContactForm } from '@/components/formations/DevWebIaProjectContactForm';
import {
  FORMATION_CATALOGUE_INNER_MAX_4XL,
  FORMATION_CATALOGUE_SECTION,
} from '@/lib/formation-catalogue-layout-classes';
import { DEV_WEB_IA_PROJECT_FORM_ID } from '@/lib/formation-developpement-web-ia-content';

export function DevWebIaProjectContactSection() {
  return (
    <section
      id={DEV_WEB_IA_PROJECT_FORM_ID}
      className={`${FORMATION_CATALOGUE_SECTION} scroll-mt-24`}
      aria-labelledby="dev-web-ia-project-form-title"
    >
      <div className={FORMATION_CATALOGUE_INNER_MAX_4XL}>
        <DevWebIaProjectContactForm />
      </div>
    </section>
  );
}
