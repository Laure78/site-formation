import { Calculator, LineChart, Wallet, type LucideIcon } from 'lucide-react';
import { CtaVisio } from '@/components/CtaVisio';
import { FAQSectionServer } from '@/components/landing/FAQSectionServer';
import { JsonLd } from '@/components/JsonLd';
import { FormateurProfileAudienceSection } from '@/components/formateurs/profile/FormateurProfileAudienceSection';
import { FormateurProfileClosingCtaSection } from '@/components/formateurs/profile/FormateurProfileClosingCtaSection';
import { FormateurProfileExperienceSection } from '@/components/formateurs/profile/FormateurProfileExperienceSection';
import { FormateurProfileExpertiseSection } from '@/components/formateurs/profile/FormateurProfileExpertiseSection';
import { FormateurProfileHeroSection } from '@/components/formateurs/profile/FormateurProfileHeroSection';
import { FormateurProfileMaillageSection } from '@/components/formateurs/profile/FormateurProfileMaillageSection';
import { FormateurProfileModuleFormationsSection } from '@/components/formateurs/profile/FormateurProfileModuleFormationsSection';
import { FormateurProfileReassuranceStrip } from '@/components/formateurs/profile/FormateurProfileReassuranceStrip';
import {
  getFormateurExplicitModuleLinks,
  type FormateurProfile,
} from '@/lib/formateurs';
import {
  MARC_DELCOURT_EN_BREF,
  MARC_EXPERTISE_CARDS,
  MARC_FORMATIONS_SECTION_ID,
  MARC_MAILLAGE,
  MARC_MODULE_FORMATION_CARDS,
  MARC_PUBLIC_CIBLE,
  getMarcDelcourtFaqItems,
} from '@/lib/formateurs/marc-delcourt/marc-delcourt-content';
import { getMarcDelcourtPageJsonLd } from '@/lib/formateurs/marc-delcourt/marc-delcourt-schema';
import { LINKS } from '@/lib/internal-links';
import { isParcoursMetiers2027Visible } from '@/lib/parcours-metiers-2027-visibility';
import { ofcSectionClasses } from '@/lib/ofc-section-classes';
import { SITE_CONFIG } from '@/lib/seo';
import { MODALITE_POSITIONNEMENT } from '@/lib/tarifs-sessions';

const EXPERTISE_ICONS: Record<(typeof MARC_EXPERTISE_CARDS)[number]['key'], LucideIcon> = {
  prix: Calculator,
  marges: LineChart,
  tresorerie: Wallet,
};

type Props = {
  formateur: FormateurProfile;
};

export function FormateurMarcDelcourtPage({ formateur }: Props) {
  const base = SITE_CONFIG.url.replace(/\/$/, '');
  const parcoursVisible = isParcoursMetiers2027Visible();
  const moduleLinks = getFormateurExplicitModuleLinks(formateur);
  const hasModuleFormations = moduleLinks.length > 0;

  const reassuranceSecond = parcoursVisible
    ? '2 formations prévues en 2027'
    : 'Expertise gestion et pilotage PME BTP';

  const heroPrimary =
    hasModuleFormations
      ? {
          href: `#${MARC_FORMATIONS_SECTION_ID}`,
          label: 'Découvrir ses formations',
        }
      : {
          href: LINKS.formations,
          label: 'Voir le catalogue des formations',
        };

  return (
    <main className="min-w-0">
      <JsonLd
        id="schema-marc-delcourt-profile"
        schema={getMarcDelcourtPageJsonLd(formateur, base)}
      />

      <FormateurProfileHeroSection
        formateur={formateur}
        h1Id="marc-delcourt-h1"
        enBrefId="marc-en-bref"
        enBrefText={MARC_DELCOURT_EN_BREF}
        badge="Formateur — direction et gestion BTP"
        h1="Marc Delcourt — Formateur en gestion de PME du BTP"
        tagline="Pilotez vos marges. Maîtrisez votre trésorerie."
        introParagraphs={[
          "Ancien dirigeant d'entreprise de travaux publics, Marc Delcourt accompagne les professionnels du BTP dans la compréhension de leurs coûts, la construction de leurs prix de vente et le pilotage de leur trésorerie.",
          "Son approche s'appuie sur 15 ans d'expérience à la direction d'une entreprise de travaux publics et sur les réalités économiques des entreprises du secteur.",
        ]}
        primaryCta={heroPrimary}
        visioCta={
          <CtaVisio
            src="formateur-marc-delcourt-hero"
            variant="secondary"
            className="inline-flex min-h-11 items-center justify-center rounded-lg px-6 py-2.5 text-base font-semibold"
            title="Échanger sur votre projet"
          />
        }
      />

      <FormateurProfileReassuranceStrip
        items={[
          "15 ans à la direction d'une entreprise de TP",
          reassuranceSecond,
          'Présentiel en Île-de-France',
        ]}
      />

      <FormateurProfileExpertiseSection
        headingId="marc-expertise-heading"
        title="Une expertise au service de la rentabilité des PME du BTP"
        intro="Dans le bâtiment et les travaux publics, maîtriser ses coûts, fixer des prix de vente cohérents et anticiper les besoins de trésorerie sont des enjeux essentiels pour préserver la rentabilité de l'entreprise."
        cards={MARC_EXPERTISE_CARDS}
        icons={EXPERTISE_ICONS}
      />

      <FormateurProfileModuleFormationsSection
        sectionId={MARC_FORMATIONS_SECTION_ID}
        headingId="marc-formations-heading"
        title="Les formations en gestion BTP de Marc Delcourt"
        tone="muted"
        moduleLinks={moduleLinks}
        cardContentByCode={MARC_MODULE_FORMATION_CARDS}
      />

      <FormateurProfileExperienceSection
        headingId="marc-parcours-heading"
        title="15 ans d'expérience à la direction d'une entreprise de travaux publics"
        formateur={formateur}
        tone="white"
      />

      <FormateurProfileAudienceSection
        headingId="marc-public-heading"
        title="À qui s'adressent les formations de Marc Delcourt ?"
        audience={MARC_PUBLIC_CIBLE}
        modaliteLine={MODALITE_POSITIONNEMENT}
        tone="muted"
      />

      <FAQSectionServer
        id="marc-faq"
        title="Questions fréquentes sur Marc Delcourt et ses formations BTP"
        items={getMarcDelcourtFaqItems()}
        layout="wide"
        className={ofcSectionClasses({ tone: 'white', size: 'compact' })}
      />

      <FormateurProfileMaillageSection links={MARC_MAILLAGE} tone="muted" />

      <FormateurProfileClosingCtaSection
        headingId="marc-cta-final-heading"
        title="Améliorez le pilotage financier de votre entreprise BTP"
        body="Échangeons sur vos besoins en matière de gestion, de rentabilité et de trésorerie afin d'identifier la formation adaptée à votre équipe."
        visioCta={
          <CtaVisio
            src="formateur-marc-delcourt-fin"
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-white px-6 py-2.5 text-base font-semibold text-[#377CF3] hover:bg-slate-50"
            title="Échanger sur votre projet"
          />
        }
        secondaryHref={
          parcoursVisible ? LINKS.parcoursDirigeantPmeBtp : LINKS.formations
        }
        secondaryLabel={
          parcoursVisible
            ? 'Découvrir le parcours dirigeant de PME BTP'
            : 'Voir le catalogue des formations'
        }
      />
    </main>
  );
}