import type { CatalogueFormationPageContent } from '@/lib/catalogue-formation-page-content';
import type {
  ApplicationMetierModule,
  ApplicationMetierNiveauConfig,
} from '@/lib/parcours-applications-metier-btp-content';
import { getFormationByCode } from '@/data/formations';
import { LINKS } from '@/lib/internal-links';
import { libellePrixSessionHt } from '@/data/formations';

function mapApplicationMetierModule(mod: ApplicationMetierModule): {
  title: string;
  points: readonly string[];
  practice?: string;
} {
  return {
    title: `${mod.title} — ${mod.duree}`,
    points: mod.items,
    practice:
      mod.items.length > 0
        ? `Expérimenter — ${mod.title.toLowerCase()} sur votre cas métier (prototype pédagogique, validation humaine avant usage en production).`
        : undefined,
  };
}

/** Contenu fiche catalogue — parcours applications métier NIV-06 à NIV-08. */
export function buildApplicationMetierCatalogueContent(
  config: ApplicationMetierNiveauConfig,
): CatalogueFormationPageContent {
  const formation = getFormationByCode(config.ref)!;
  const ux = config.ux;
  const prixLabel = libellePrixSessionHt(formation);

  const painPoints =
    ux?.casUsageCards.map((c) => ({ title: c.title, texte: c.text })) ??
    config.casUsageExemples?.flatMap((cas) =>
      cas.items.slice(0, 1).map((texte) => ({ title: cas.title, texte })),
    ) ??
    [];

  return {
    programmeRef: config.ref,
    parcoursKind: 'applications-metier',
    levelBadgeLabel: ux?.heroBadge ?? config.progressionLabel,
    heroPublicLine: formation.public,
    heroFacts: ux?.heroFacts.split(' · ').map((s) => s.trim()) ?? [
      config.duree,
      'Présentiel',
      'Île-de-France',
      prixLabel,
    ],
    quickFactsLevel: config.progressionLabel,
    formatLabel: 'Présentiel',
    locationLabel: 'Île-de-France',
    practiceShare: '70 %',
    pedagogicalNote:
      'L’IA accélère le prototypage. Vous validez le périmètre, les données, les droits et la mise en production.',
    painPointsTitle: ux?.casUsageTitle ?? 'Ce parcours est fait pour vous si…',
    painPoints,
    outcomes: config.objectifs,
    outcomesDescription: `${config.positionnement} ${config.promesseRealiste}`,
    deliverablesTitle: ux?.livrablesTitle ?? 'Les + de la formation',
    deliverables: ux?.livrables ?? [
      'Prototype ou socle d’application métier',
      'Cahier des charges simplifié',
      'Méthode de cadrage réutilisable',
      'Certificat de réalisation',
    ],
    deliverablesIntro: ux?.livrablesNote,
    publicPrerequisites: [
      {
        title: 'Prérequis pédagogiques',
        items: [config.prerequis],
      },
      {
        title: 'Conditions matérielles',
        items: [
          'Ordinateur portable et connexion internet par participant',
          'Comptes et outils IA selon le programme — à vérifier avant la session',
          'Cas métier ou documents anonymisés de l’entreprise',
        ],
      },
    ],
    programIntro: config.promesseRealiste,
    programmeHeading: `Programme — ${config.duree}`,
    programModules: config.modules.map(mapApplicationMetierModule),
    programLinks: [
      ...(config.ref !== 'NIV-06'
        ? [
            {
              prefix: 'Niveau précédent du parcours',
              href:
                config.ref === 'NIV-07'
                  ? LINKS.formationApplicationMetierBtpNiveau1
                  : LINKS.formationApplicationMetierBtpNiveau2,
              label:
                config.ref === 'NIV-07'
                  ? 'Application métier BTP — Niveau 1'
                  : 'Application métier BTP — Niveau 2',
            },
          ]
        : []),
      ...(config.ref !== 'NIV-08'
        ? [
            {
              prefix: 'Suite du parcours',
              href:
                config.ref === 'NIV-06'
                  ? LINKS.formationApplicationMetierBtpNiveau2
                  : LINKS.formationApplicationMetierBtpNiveau3,
              label:
                config.ref === 'NIV-06'
                  ? 'Application métier BTP — Niveau 2'
                  : 'Application métier BTP — Niveau 3',
            },
          ]
        : []),
    ],
    showBeworkPasserelle: false,
    showTrustBar: true,
    finalCta: {
      title: ux?.ctaFinal?.title ?? 'Parlons de votre projet de formation',
      description:
        ux?.ctaFinal?.text ??
        'Vous souhaitez organiser cette formation pour votre équipe ? Échangeons sur vos besoins et le format adapté.',
      primaryLabel: ux?.ctaFinal?.label ?? 'Demander un devis',
      devisHref: `${LINKS.contact}?objet=devis&formation=${encodeURIComponent(formation.titre)}`,
      secondaryLabel: 'Échanger sur votre projet',
      secondaryHref: LINKS.prendreRdv,
      note: 'Intra-entreprise · présentiel Île-de-France',
    },
    intraExtraBullets: ['Session dans vos locaux ou salle adaptée'],
  };
}
