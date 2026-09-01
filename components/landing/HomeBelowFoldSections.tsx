import dynamic from 'next/dynamic';

/** Sections accueil — code splitting JS (SSR conservé, contenu SEO intact). */

export const AccueilPreuveSocialeSection = dynamic(
  () =>
    import('@/components/landing/AccueilPreuveSocialeSection').then((m) => ({
      default: m.AccueilPreuveSocialeSection,
    })),
);

export const AccueilCasUsageIaVisuels = dynamic(
  () =>
    import('@/components/landing/AccueilCasUsageIaVisuels').then((m) => ({
      default: m.AccueilCasUsageIaVisuels,
    })),
);

export const HomePrincipalSections = dynamic(
  () =>
    import('@/components/landing/HomePrincipalSections').then((m) => ({
      default: m.HomePrincipalSections,
    })),
);

export const BeworkEtFormationsOffreSection = dynamic(
  () =>
    import('@/components/landing/BeworkEtFormationsOffreSection').then((m) => ({
      default: m.BeworkEtFormationsOffreSection,
    })),
);

export const AccueilBeworkAccordionSection = dynamic(
  () =>
    import('@/components/landing/AccueilBeworkAccordionSection').then((m) => ({
      default: m.AccueilBeworkAccordionSection,
    })),
);

export const HomeGuideConducteurTravauxSection = dynamic(
  () =>
    import('@/components/landing/HomeGuideConducteurTravauxSection').then((m) => ({
      default: m.HomeGuideConducteurTravauxSection,
    })),
);

export const AccueilFormationsIaMetiersSection = dynamic(
  () =>
    import('@/components/landing/AccueilFormationsIaMetiersSection').then((m) => ({
      default: m.AccueilFormationsIaMetiersSection,
    })),
);

export const GoogleReviewsSection = dynamic(
  () =>
    import('@/components/landing/GoogleReviewsSection').then((m) => ({
      default: m.GoogleReviewsSection,
    })),
);

export const HomeDeferredLinkedInLearning = dynamic(
  () =>
    import('@/components/landing/HomeDeferredLinkedInLearning').then((m) => ({
      default: m.HomeDeferredLinkedInLearning,
    })),
);

export const SelecteurMetier = dynamic(
  () =>
    import('@/components/SelecteurMetier/SelecteurMetier').then((m) => ({
      default: m.SelecteurMetier,
    })),
);

export const PourQuiSection = dynamic(
  () =>
    import('@/components/landing/PourQuiSection').then((m) => ({
      default: m.PourQuiSection,
    })),
);

export const HomeBeneficesSections = dynamic(
  () =>
    import('@/components/landing/HomeBeneficesSections').then((m) => ({
      default: m.HomeBeneficesSections,
    })),
);

export const HomeProgrammeFaqSections = dynamic(
  () =>
    import('@/components/landing/HomeProgrammeFaqSections').then((m) => ({
      default: m.HomeProgrammeFaqSections,
    })),
);
