import { CtaButton as RdvCtaButton } from '@/components/CtaButton';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Download, Calendar } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import {
  FAQ_GUIDE_MOE_IA,
  GUIDE_MOE_IA_H1,
  GUIDE_MOE_IA_PATH,
  GUIDE_MOE_IA_PDF_PATH,
  MISSIONS_MOE_IA,
  METHODE_MOE_5_ETAPES,
  TAG_LEGEND,
  type MissionMoeTag,
} from '@/lib/guide-moe-ia-content';
import { LINKS } from '@/lib/internal-links';
import { PHOTOS } from '@/lib/photos';
import { buildGuideMoeIaUnifiedGraphJsonLd } from '@/lib/schema-guide-moe-ia-jsonld';
import { FINANCEMENT_FORMULATION_COURTE } from '@/lib/financement-copy';
import { createPageMetadata } from '@/lib/seo';
import { MaillageRessourceFromConfig } from '@/app/components/MaillageRessource';
import { getMaillageRessourceConfig } from '@/lib/maillage-ressources';


export const metadata = createPageMetadata({
  title: "Guide Maître d'Œuvre × IA — 12 missions | Laure Olivié",
  description:
    'Guide gratuit : les 12 missions de maîtrise d\'œuvre classées IA / mixte / humain, limites, checklist et méthode. Formation IA BTP Qualiopi (Île-de-France).',
  path: GUIDE_MOE_IA_PATH,
  openGraphType: 'article',
  openGraphTitle: "Guide Maître d'Œuvre × IA — 12 missions MOE",
  openGraphDescription:
    'Classifiez vos missions MOE (IA, mixte, humain), créez vos skills Claude et libérez du temps administratif — guide PDF gratuit.',
  image: {
    url: PHOTOS.formationNiv05IaMaitriseOeuvre2026.src,
    width: PHOTOS.formationNiv05IaMaitriseOeuvre2026.width,
    height: PHOTOS.formationNiv05IaMaitriseOeuvre2026.height,
    alt: "Guide maîtrise d'œuvre BTP — 12 missions MOE classées IA, mixte et humain",
  },
  appendAuthorSuffix: false,
});

const TAG_STYLES: Record<MissionMoeTag, string> = {
  IA: 'bg-[#377CF3] text-white',
  MIXTE: 'bg-[#D4E3FC] text-[#377CF3]',
  HUMAIN: 'bg-[#F2F2F2] text-[#666666]',
};

function GuidePageActionLink({
  href,
  children,
  variant = 'primary',
}: {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-base font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';
  const styles =
    variant === 'primary'
      ? 'bg-[#377CF3] text-white hover:bg-[#2a63d4] focus-visible:outline-[#377CF3]'
      : 'border-2 border-white bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white';
  return (
    <a
      href={href}
      className={`${base} ${styles}`}
      {...(variant === 'secondary' ? { download: true } : {})}
    >
      {children}
    </a>
  );
}

export default function GuideMaitriseOeuvreIaPage() {
  const unifiedGraph = buildGuideMoeIaUnifiedGraphJsonLd();

  return (
    <div className="min-h-screen bg-white font-sans" style={{ color: '#1A1A1A' }}>
      <JsonLd id="schema-guide-moe-ia-unified" schema={unifiedGraph} />

      <section className="bg-[#377CF3] text-white" aria-labelledby="hero-guide-moe">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:items-center md:gap-12 md:py-20 lg:grid-cols-2">
          <div className="min-w-0">
            <h1 id="hero-guide-moe" className="font-display text-3xl font-bold leading-tight md:text-4xl lg:text-[2.35rem]">
              {GUIDE_MOE_IA_H1}
            </h1>
            <p className="mt-5 max-w-none text-lg leading-relaxed text-white/95">
              Gagne 2 week-ends par mois en confiant à l&apos;IA les bonnes tâches — et seulement celles-là.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <GuidePageActionLink href={GUIDE_MOE_IA_PDF_PATH} variant="secondary">
                <Download className="h-5 w-5 shrink-0" aria-hidden />
                Télécharger le guide (PDF)
              </GuidePageActionLink>
              <RdvCtaButton
                origin="ressources-guide-maitrise-oeuvre-ia-hero"
                variant="unstyled"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#377CF3] px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#2a63d4]"
              >
                <Calendar className="h-5 w-5 shrink-0" aria-hidden />
                Réserver ma visio découverte
              </RdvCtaButton>
            </div>
          </div>
          <figure className="mx-auto w-full max-w-[320px] lg:mx-0 lg:justify-self-end">
            <div className="overflow-hidden rounded-2xl shadow-[0_20px_48px_-16px_rgba(0,0,0,0.25)] ring-4 ring-white/30">
              <Image
                src={PHOTOS.formationNiv05IaMaitriseOeuvre2026.src}
                alt="Guide maîtrise d'œuvre BTP — 12 missions MOE avec skills Claude, PDF gratuit"
                width={PHOTOS.formationNiv05IaMaitriseOeuvre2026.width}
                height={PHOTOS.formationNiv05IaMaitriseOeuvre2026.height}
                className="h-auto w-full object-cover"
                sizes="(max-width: 1024px) 320px, 360px"
                priority
              
                quality={75}/>
            </div>
          </figure>
        </div>
      </section>

      <section className="py-14 md:py-16" aria-labelledby="pourquoi-guide-moe">
        <div className="mx-auto max-w-3xl px-4">
          <h2 id="pourquoi-guide-moe" className="font-display text-2xl font-bold md:text-3xl">
            Pourquoi ce guide
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-[#666666]">
            <p>
              En maîtrise d&apos;œuvre, la semaine affichée à 35&nbsp;h se transforme souvent en 48 à 55&nbsp;h réelles :
              DCE à décortiquer, devis à comparer, CR de chantier le soir, relances entreprises, réserves à suivre, DOE à
              compiler. Les week-ends deviennent le créneau de rattrapage administratif — pas celui de la vie personnelle.
            </p>
            <p>
              Ce guide classe les 12 missions MOE classiques selon ce que vous pouvez confier à Claude (skills IA), ce qui
              reste mixte (brouillon IA + validation humaine) et ce qui exige votre présence terrain ou votre signature. Objectif
              : gagner du temps administratif MOE sans fragiliser votre responsabilité professionnelle.
            </p>
            <p>
              Public visé : maîtres d&apos;œuvre, BET, cabinets d&apos;architecture, économistes de la construction, conducteurs
              de travaux et chargés d&apos;opération en Île-de-France et Grand Paris.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y bg-[#F2F2F2] py-14" aria-labelledby="contenu-guide-moe">
        <div className="mx-auto max-w-7xl px-4">
          <h2 id="contenu-guide-moe" className="font-display text-2xl font-bold md:text-3xl">
            Ce que contient le guide
          </h2>
          <p className="mt-3 max-w-3xl text-[#666666]">
            Les 12 missions MOE du quotidien, chacune étiquetée{' '}
            <span className="font-semibold text-[#377CF3]">[IA]</span>,{' '}
            <span className="font-semibold text-[#377CF3]">[MIXTE]</span> ou{' '}
            <span className="font-semibold text-[#666666]">[HUMAIN]</span> — avec limites, checklist de relecture et
            prompts pour skills Claude maîtrise d&apos;œuvre.
          </p>
          <ul className="mt-6 flex flex-wrap gap-3 text-sm">
            {(Object.entries(TAG_LEGEND) as [MissionMoeTag, string][]).map(([tag, label]) => (
              <li key={tag} className={`rounded-full px-4 py-1.5 font-medium ${TAG_STYLES[tag]}`}>
                [{tag}] {label}
              </li>
            ))}
          </ul>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MISSIONS_MOE_IA.map((m) => (
              <article
                key={m.id}
                className="rounded-2xl border-2 border-[#377CF3] bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg font-bold text-slate-900">{m.titre}</h3>
                  <span
                    className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-bold uppercase ${TAG_STYLES[m.tag]}`}
                  >
                    {m.tag}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[#666666]">{m.hint}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 text-center">
            <a
              href={GUIDE_MOE_IA_PDF_PATH}
              className="inline-flex items-center gap-2 font-semibold text-[#377CF3] hover:underline"
              download
            >
              <Download className="h-5 w-5" aria-hidden />
              Télécharger le PDF complet
            </a>
          </p>
        </div>
      </section>

      <section className="py-14" aria-labelledby="methode-5-etapes">
        <div className="mx-auto max-w-7xl px-4">
          <h2 id="methode-5-etapes" className="font-display text-2xl font-bold md:text-3xl">
            La méthode en 5 étapes
          </h2>
          <p className="mt-3 max-w-3xl text-[#666666]">
            Reproductible pour chaque mission [IA] ou [MIXTE] — du premier skill Claude à la généralisation sur vos dossiers
            CCTP, DPGF et CR de chantier.
          </p>
          <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {METHODE_MOE_5_ETAPES.map((step) => (
              <li
                key={step.position}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="text-sm font-bold text-[#377CF3]">Étape {step.position}</p>
                <h3 className="mt-2 font-display text-lg font-bold text-slate-900">{step.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#666666]">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[#F2F2F2] py-14" aria-labelledby="resultats-guide-moe">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 id="resultats-guide-moe" className="font-display text-2xl font-bold md:text-3xl">
            Les résultats
          </h2>
          <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border-2 border-[#377CF3] bg-white p-8">
              <p className="font-display text-4xl font-bold text-[#377CF3]">~110 h</p>
              <p className="mt-2 text-[#666666]">par mois libérées sur les missions [IA] (ordre de grandeur terrain)</p>
            </div>
            <div className="rounded-2xl border-2 border-[#377CF3] bg-white p-8">
              <p className="font-display text-4xl font-bold text-[#377CF3]">2 week-ends</p>
              <p className="mt-2 text-[#666666]">récupérés quand la méthode est ancrée sur vos dossiers réels</p>
            </div>
          </div>
          <p className="mx-auto mt-10 max-w-2xl rounded-xl bg-[#377CF3] px-6 py-4 text-lg font-medium text-white">
            Plus de {formatProfessionalsTrainedCount(SOCIAL_PROOF.PROFESSIONALS_TRAINED)} professionnels formés ·{' '}
            {FINANCEMENT_FORMULATION_COURTE}
          </p>
        </div>
      </section>

      <section className="py-14" aria-labelledby="cta-mid-moe">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 id="cta-mid-moe" className="font-display text-2xl font-bold md:text-3xl">
            Un doute sur la mission à automatiser en premier&nbsp;?
          </h2>
          <p className="mt-4 text-[#666666]">
            En 30&nbsp;minutes de visio découverte, on cible votre plus grosse douleur MOE (souvent les CR de chantier ou le
            suivi administratif) et on vérifie l&apos;éligibilité Constructys / OPCO pour une{' '}
            <Link href={LINKS.formationIaMaitriseOeuvre} className="font-semibold text-[#377CF3] hover:underline">
              formation IA maîtrise d&apos;œuvre
            </Link>
            .
          </p>
          <div className="mt-8">
            <RdvCtaButton origin="ressources-guide-maitrise-oeuvre-ia-mid"
              className="inline-flex items-center gap-2 rounded-lg bg-[#377CF3] px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-[#2a63d4]"
            >
              <Calendar className="h-5 w-5" aria-hidden />
              Réserver ma visio découverte gratuite
            </CtaButton>
          </div>
        </div>
      </section>

      <section className="border-t bg-white py-14" aria-labelledby="faq-guide-moe">
        <div className="mx-auto max-w-3xl px-4">
          <h2 id="faq-guide-moe" className="font-display text-2xl font-bold md:text-3xl">
            Questions fréquentes
          </h2>
          <dl className="mt-8 space-y-6">
            {FAQ_GUIDE_MOE_IA.map(({ q, a }) => (
              <div key={q} className="rounded-2xl border border-slate-200 bg-[#F2F2F2] p-6">
                <dt className="font-display text-lg font-bold text-slate-900">{q}</dt>
                <dd className="mt-3 leading-relaxed text-[#666666]">{a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t bg-[#F2F2F2] py-14" aria-labelledby="qui-est-laure">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-[280px_1fr] md:items-start">
          <figure className="mx-auto md:mx-0">
            <Image
              src={PHOTOS.siteAvatar.src}
              alt={PHOTOS.siteAvatar.alt}
              width={280}
              height={280}
              className="rounded-2xl object-cover shadow-lg"
              sizes="280px"
            
              quality={70}
              loading="lazy"/>
          </figure>
          <div>
            <h2 id="qui-est-laure" className="font-display text-2xl font-bold md:text-3xl">
              Qui est Laure Olivié&nbsp;?
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-[#666666]">
              <p>
                Plus de 10&nbsp;ans en conduite de travaux et pilotage de chantiers, Laure Olivié est aujourd&apos;hui
                formatrice IA spécialisée BTP au sein de l&apos;organisme OFC Création d&apos;Entreprise, certifié Qualiopi.
                Elle forme maîtres d&apos;œuvre, BET et directions techniques à utiliser Claude et ChatGPT sur leurs dossiers
                réels : DCE, DPGF, CR, réserves, OPR et DOE.
              </p>
              <p>
                Elle intervient notamment pour FFB Grand Paris, FFB Île-de-France, CSFE, CNAM Entreprise et Lefebvre
                Dalloz. Ses formations IA BTP Paris et Grand Paris sont finançables via Constructys / OPCO selon éligibilité.
              </p>
              <p>
                <Link href={LINKS.formations} className="font-semibold text-[#377CF3] hover:underline">
                  Catalogue des formations IA BTP
                </Link>
                {' · '}
                <Link href={LINKS.aPropos} className="font-semibold text-[#377CF3] hover:underline">
                  En savoir plus sur Laure Olivié
                </Link>
                {' · '}
                <Link href={LINKS.contact} className="font-semibold text-[#377CF3] hover:underline">
                  Contact
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <MaillageRessourceFromConfig
        config={getMaillageRessourceConfig(GUIDE_MOE_IA_PATH)!}
        currentPath={GUIDE_MOE_IA_PATH}
        excludeHrefs={[LINKS.formations, LINKS.aPropos, LINKS.contact]}
      />

      <section className="bg-[#377CF3] py-16 text-center text-white" aria-labelledby="cta-final-moe">
        <div className="mx-auto max-w-3xl px-4">
          <h2 id="cta-final-moe" className="font-display text-2xl font-bold md:text-3xl">
            Réservez votre visio découverte gratuite
          </h2>
          <p className="mt-4 text-lg text-white/95">
            30&nbsp;minutes pour cartographier vos missions MOE et valider la prochaine étape — guide PDF ou formation
            présentielle Qualiopi en Île-de-France.
          </p>
          <div className="mt-8">
            <RdvCtaButton origin="ressources-guide-maitrise-oeuvre-ia-final"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-[#377CF3] transition-colors hover:bg-[#F2F2F2]"
            >
              <Calendar className="h-5 w-5" aria-hidden />
              Réserver ma visio découverte
            </CtaButton>
          </div>
        </div>
      </section>
    </div>
  );
}
