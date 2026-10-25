import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { AccueilFormationsParcoursTabs } from '@/components/landing/accueil/AccueilFormationsParcoursTabs';
import {
  getAccueilFormationsPrioritaires,
  getAccueilFormationTarifApartir,
} from '@/lib/accueil-config';
import { getAccueilParcoursOffre } from '@/lib/accueil-offre-catalogue';
import { RevealShell } from '@/components/motion/RevealShell';
import { MOTION_REVEAL } from '@/lib/motion-config';
import { isParcoursMetiers2027Visible } from '@/lib/parcours-metiers-2027-visibility';

/** Formations et parcours — sélecteur à onglets (niveau / métier). */
export function AccueilFormationsParcoursSection() {
  const formations = getAccueilFormationsPrioritaires();
  const parcoursVisible = isParcoursMetiers2027Visible();
  const parcours = getAccueilParcoursOffre({ featuredOnly: true });

  const formationTarifs: Record<string, string> = {};
  for (const f of formations) {
    if (f.code) {
      const tarif = getAccueilFormationTarifApartir(f.code);
      if (tarif) formationTarifs[f.code] = tarif;
    }
  }

  return (
    <Section
      id="accueil-offre-choix"
      tone="white"
      className="scroll-mt-[calc(var(--site-header-height,4.5rem)+0.5rem)]"
      aria-labelledby="accueil-offre-choix-title"
    >
      <span id="accueil-formations" className="sr-only" />
      <span id="accueil-parcours" className="sr-only" />
      <RevealShell>
        <SectionHeader
          titleId="accueil-offre-choix-title"
          title={
            <span data-anim="split-words-scroll">
              {parcoursVisible
                ? 'Choisir sa formation ou son parcours métier'
                : 'Choisir sa formation IA BTP'}
            </span>
          }
          description={
            parcoursVisible
              ? 'Par niveau pédagogique ou par fonction — durées, formats et tarifs sur chaque fiche.'
              : 'Par niveau pédagogique — durées, formats et tarifs sur chaque fiche programme.'
          }
          className="max-w-2xl"
        />
      </RevealShell>
      <RevealShell delay={MOTION_REVEAL.contentDelayMs}>
        <AccueilFormationsParcoursTabs
          formations={formations}
          parcours={parcours}
          formationTarifs={formationTarifs}
        />
      </RevealShell>
    </Section>
  );
}
