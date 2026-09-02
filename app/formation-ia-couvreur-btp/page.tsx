import Link from 'next/link';
import { CTA_RDV_LABEL } from '@/components/CtaRdv';
import { ArrowRight, Check } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { PreuveSociale } from '@/components/PreuveSociale';
import { RelatedLinks } from '@/components/RelatedLinks';
import { LiensConnexes } from '@/components/LiensConnexes';
import { getLiensConnexesHrefs } from '@/lib/liens-connexes';
import { getClusterRelatedHrefs } from '@/lib/maillage-clusters';
import { RdvLink } from '@/components/RdvLink';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { FAQAnswer } from '@/components/landing/FAQAnswer';
import { PublicPhoneCta } from '@/components/PublicPhoneCta';
import { FormationMetierJsonLd } from '@/components/seo/FormationMetierJsonLd';
import { createPageMetadata, SITE_CONFIG, sitePhoneDisplaySuffix } from '@/lib/seo';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { LINKS } from '@/lib/internal-links';
import { LaureOlivieFormationPortrait } from '@/components/laure-olivie/LaureOlivieFormationPortrait';
import { TARIF_SESSION_DEBUTANT_HT } from '@/lib/tarifs-sessions';

import { RenvoiFicheCatalogue } from '@/components/qualiopi/RenvoiFicheCatalogue';

export const revalidate = 3600;
const PATH = '/formation-ia-couvreur-btp';

/** Segment avant suffixe — total avec « | Laure Olivié » = 53 car. (≤ 60). */
const SEO_TITLE = 'Formation IA couvreur-zingueur BTP IDF';
const SEO_DESCRIPTION =
  "Formation IA pour couvreurs-zingueurs en Île-de-France : devis toiture, CR de chantier, DTU et appels d'offres. Présentiel — organisme certifié Qualiopi. Visio découverte.";

export const metadata = createPageMetadata({
  title: SEO_TITLE,
  description: SEO_DESCRIPTION,
  descriptionFinal: true,
  path: PATH,
  appendAuthorSuffix: true,
  keywords: [
    'formation IA couvreur-zingueur',
    'formation IA couvreur BTP',
    'ChatGPT couverture zinguerie',
    'DTU 40 formation IA',
    'devis toiture IA',
    'métré couverture ChatGPT',
    'formation IA Île-de-France BTP',
    'OPCO Constructys couvreur',
    'Qualiopi couverture',
  ],
  openGraphType: 'website',
});

const PROMPT_DEVIS_TOITURE = `Tu es expert couvreur-zingueur en Île-de-France. Structure un devis pour une réfection de couverture à partir de ces données :

CHANTIER :
- Type de couverture : [tuile terre cuite / ardoise / bac acier / autre]
- Surface projetée / développée : [X] m² (je valide le métré — ne pas inventer)
- Pente(s) : [X] %, nombre de pans : [N]
- Dépose : [oui / non] — état de la charpente : [saine / à traiter / à préciser]
- Écran sous-toiture / isolation : [préciser]
- Zinguerie associée : gouttières [ml], noues [ml], faîtages [ml], solins / rives [ml]
- Accès : échafaudage / nacelle / [à préciser] — contraintes site : [intempéries, voisinage, site occupé…]

Pour chaque poste, donne :
1. Désignation technique (vocabulaire couverture / zinguerie)
2. Quantité + unité (m², ml, u) — [À COMPLÉTER] si la cote manque
3. Prix unitaire HT : laisse [À COMPLÉTER] — JAMAIS d'invention de prix
4. Sous-total HT
5. Référence DTU 40.x ou avis technique si pertinent

Format : tableau prêt à coller dans Word. Ton professionnel, factuel.`;

const PROMPT_CR_CHANTIER = `À partir de ces notes brutes de chantier de couverture, rédige un compte rendu clair :

NOTES BRUTES :
[COLLE ICI TES NOTES — avancement, météo, intempéries, réserves, sécurité échafaudage, livraisons]

Format attendu :
- En-tête : chantier, date, météo, présents
- Avancement couverture / zinguerie (pans, noues, raccords)
- Points techniques (calepinage, DTU 40.x, interfaces)
- Sécurité (échafaudage, accès toiture, EPI)
- Décisions et responsables / échéances
- Points en attente — [À CONFIRMER] si info manquante

Ton factuel, sans interprétation.`;

const PROMPT_SINISTRE_ASSURANCE = `Rédige un brouillon de courrier / note pour une relance d'assurance après sinistre toiture :

CONTEXTE :
- Nature du sinistre : [tempête / grêle / fuite / autre]
- Zones touchées : [pans, noues, solins, évacuations…]
- Constats terrain : [NOTES]
- Travaux proposés : [liste postes]
- Photos / annexes : [références]

Structure :
1. Objet et références dossier
2. Constat factuel (sans diagnostic définitif hors de mon périmètre)
3. Travaux nécessaires (structure de postes, pas de prix inventés)
4. Pièces jointes attendues
5. Demande claire (visite expert, accord de principe, délai)

Ton professionnel. Indiquer [À COMPLÉTER] pour montants et références manquantes.`;

const PROMPT_AO_DTU = `Analyse cet extrait de CCTP / DCE (lot couverture-zinguerie) et prépare ma réponse :

[COLLE ICI L'EXTRAIT]

Produis :
1. Synthèse (10 lignes max) : nature des travaux, surfaces, contraintes
2. Checklist des prestations exigées (avec DTU 40.x / AT si cités)
3. Points de vigilance : calepinage, raccords, évacuations, échafaudage, intempéries
4. Questions à poser au MOE avant chiffrage (5 à 8)
5. Esquisse de plan de mémoire technique (titres + bullets)

Ne pas inventer de cotes ni de références normatives absentes du texte.`;

const FAQ_ITEMS = [
  {
    question: "L'IA remplace-t-elle le couvreur ?",
    answer:
      "Non. L'IA accélère la rédaction (devis, CR, courriers, brouillons de mémoire). Le métré de toiture, le calepinage, le choix des systèmes, la pose et la responsabilité technique restent ceux de l'entreprise de couverture. Vous validez chaque sortie avant envoi.",
  },
  {
    question: 'Faut-il être bon en informatique ?',
    answer:
      "Non. Si vous savez utiliser un e-mail et un traitement de texte, vous savez utiliser ChatGPT ou Claude. La session part de zéro et travaille sur vos vrais devis, notes de chantier et extraits de CCTP — un navigateur suffit, sans installation technique.",
  },
  {
    question: 'La formation est-elle finançable via Constructys ?',
    answer:
      "OFC Création d'Entreprise est certifié Qualiopi. Les entreprises de couverture cotisant à Constructys (ou à leur OPCO) peuvent demander une prise en charge selon statut, branche et conditions en vigueur — financement OPCO possible selon éligibilité, jamais présenté comme acquis. Le dossier se prépare après la visio découverte.",
  },
  {
    question: 'Quelle durée et quel format ?',
    answer:
      'Session catalogue de 4 h, en présentiel uniquement, en Île-de-France uniquement : intra-entreprise, dans vos locaux. Le contenu s’appuie sur vos documents réels (devis toiture, CR, DTU 40.x, AO).',
  },
  {
    question: "L'IA sait-elle lire un plan de toiture ?",
    answer:
      "Honnêtement : non au sens d’un logiciel de métré. ChatGPT et Claude ne remplacent pas un relevé ni une lecture à l’échelle. Vous fournissez les cotes, pans, linéaires de zinguerie et photos ; l’IA structure le tableau de quantitatif, le calepinage textuel et le devis. Les surfaces complexes (noues, raccords, pénétrations) restent à votre charge.",
  },
  {
    question: 'Peut-on travailler sur nos vrais devis ?',
    answer:
      'Oui, c’est le principe de la session : devis toiture, notes après intempéries, extraits de CCTP, relances d’assurance — anonymisés si besoin. Aucun cas fictif hors sol : vous repartez avec des prompts adaptés à votre entreprise de couverture.',
  },
];

const SOMMAIRE = [
  { href: '#le-probleme', label: 'Le problème : pourquoi les entreprises de couverture perdent du temps' },
  { href: '#la-solution', label: "La solution : l'IA adaptée aux couvreurs" },
  { href: '#methode', label: 'Méthode pas à pas avec prompts ChatGPT' },
  { href: '#resultats', label: 'Résultats concrets' },
  { href: '#faq', label: "FAQ — questions des couvreurs sur l'IA" },
  { href: '#a-propos', label: 'Qui est Laure Olivié ?' },
  { href: LINKS.prendreRdv, label: CTA_RDV_LABEL },
];

const CAS_USAGE = [
  {
    titre: 'Devis toiture chiffré au m²',
    description:
      'Vous apportez le métré (pans, pente, dépose, écran, couverture, zinguerie) ; l’IA structure le tableau poste par poste. Vous validez quantités et prix — jamais d’invention de cotes.',
  },
  {
    titre: 'Calepinage et libellés techniques',
    description:
      'Reformuler clairement tuiles, ardoises, bac, noues, faîtages, solins et raccords pour un devis lisible client / MOE, aligné sur le DTU 40.x concerné.',
  },
  {
    titre: 'CR de chantier malgré intempéries',
    description:
      'Notes terrain → compte rendu structuré (avancement, météo, réserves, échafaudage, prochaines étapes) en quelques minutes, avec relecture avant envoi.',
  },
  {
    titre: 'Relances d’assurance après sinistre',
    description:
      'Brouillon de courrier ou note de constat après tempête / grêle / fuite : zones, travaux proposés, pièces jointes — sans promesse de prise en charge.',
  },
  {
    titre: 'Appels d’offres lot couverture',
    description:
      'Synthèse de CCTP, checklist DTU 40.x, questions au MOE, esquisse de mémoire technique — l’IA prépare, vos équipes valident avant dépôt.',
  },
  {
    titre: 'Sécurité et accès toiture',
    description:
      'Aide à formaliser les points d’organisation (échafaudage, accès, co-activité) dans un CR ou un mail de coordination — la validation sécurité reste humaine.',
  },
];

export default function FormationIaCouvreurBtpPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <FormationMetierJsonLd
        metierLabel="Couvreur-zingueur"
        path={PATH}
        courseName="Formation IA pour couvreurs-zingueurs — Île-de-France"
        courseDescription={SEO_DESCRIPTION}
        duration="PT4H"
        price={TARIF_SESSION_DEBUTANT_HT}
        level="Intermediate"
        faqItems={FAQ_ITEMS}
        teaches={[
          'Devis et métré de toiture assistés par IA',
          'Comptes rendus de chantier couverture / zinguerie',
          'DTU 40.x et réponse aux appels d’offres',
          'Relances d’assurance après sinistre toiture',
        ]}
        scriptId="schema-formation-ia-couvreur-btp"
      />

      <article>
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Formation IA pour couvreurs-zingueurs en Île-de-France
        </h1>
        <PreuveSociale className="mt-6" />
        <p className="mt-6 text-xl text-slate-600">
          Devis toiture, métrés, zinguerie, CR de chantier et réponses aux appels d&apos;offres :{' '}
          <strong>ChatGPT et Claude AI</strong> accélèrent l&apos;écrit administratif des entreprises de
          couverture, sans remplacer le terrain. Formation dispensée par un organisme certifié <strong>Qualiopi</strong>,{' '}
          <strong>présentiel uniquement</strong> en Île-de-France et Grand Paris — financement OPCO possible
          selon éligibilité.
        </p>

        <div className="mt-8">
          <ShortAnswerBlock>
            La formation IA pour couvreurs-zingueurs apprend à utiliser ChatGPT et Claude sur vos documents
            réels : devis au m² de couverture, calepinage, notes après intempéries, DTU 40.x et AO. Le métré
            et la pose restent humains ; l&apos;IA structure et accélère la rédaction.
          </ShortAnswerBlock>
        </div>

        <nav
          aria-label="Sommaire"
          className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6"
        >
          <h2 className="font-display text-lg font-bold text-slate-900">Sommaire</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-700">
            {SOMMAIRE.map(({ href, label }) => (
              <li key={href}>
                <a href={href} className="text-[var(--accent)] underline hover:no-underline">
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <section id="le-probleme" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Le problème : pourquoi les entreprises de couverture perdent du temps
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            En couverture-zinguerie, l&apos;administratif suit le rythme du chantier : métré de toiture,
            calepinage, linéaires de zinguerie, raccords, références <strong>DTU 40.x</strong>, organisation
            d&apos;échafaudage, reports pour intempéries, chiffrage au m², puis relances d&apos;assurance
            après sinistre. Les PME du bâtiment du Grand Paris y passent souvent des soirées entières.
          </p>
          <ul className="mt-4 space-y-3">
            {[
              'Métré de toiture multi-pans : surfaces développées, pentes, noues, faîtages — tableaux longs à monter à la main.',
              'Calepinage et libellés techniques (tuile, ardoise, bac, solins, gouttières) à harmoniser pour le client et le MOE.',
              'Zinguerie et raccords : linéaires, interfaces avec maçonnerie ou étanchéité, points singuliers souvent oubliés au devis.',
              'DTU 40.x et avis techniques à citer correctement dans devis, mémoires et réponses aux marchés.',
              'Échafaudage, accès toiture et intempéries : CR et mails de coordination à réécrire chaque semaine.',
              'Chiffrage au m² de couverture + options (dépose, écran, isolation) sous pression de délai.',
              "Relances d'assurance après sinistre (tempête, grêle, fuite) : constats, photos, listes de travaux.",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-slate-700">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-slate-600 leading-relaxed">
            Sans méthode, ce temps se prend sur la pose, la prospection ou la réponse aux{' '}
            <Link href={LINKS.iaDevis} className="font-semibold text-[var(--accent)] underline hover:no-underline">
              devis bâtiment
            </Link>{' '}
            — au détriment de la marge.
          </p>
        </section>

        <section id="la-solution" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            La solution : l&apos;IA adaptée aux couvreurs
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            <strong>ChatGPT</strong> et <strong>Claude AI</strong> accélèrent la mise en forme sur{' '}
            <strong>vos</strong> documents : un devis toiture en cours, des notes après une tempête, un
            extrait de CCTP lot couverture. La relecture technique reste celle du couvreur ou du chargé
            d&apos;affaires.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {CAS_USAGE.map(({ titre, description }) => (
              <div
                key={titre}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="font-display text-lg font-semibold text-slate-900">{titre}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm text-slate-500">
            Sessions en <strong>présentiel uniquement</strong>, catalogue{' '}
            <Link href={LINKS.formations} className="font-semibold text-[var(--accent)] underline hover:no-underline">
              formations IA pour le BTP
            </Link>
            , sur le bassin{' '}
            <Link
              href={LINKS.formationIleDeFrance}
              className="font-semibold text-[var(--accent)] underline hover:no-underline"
            >
              formation IA BTP Île-de-France
            </Link>
            .
          </p>
        </section>

        <aside
          className="mt-14 rounded-2xl bg-[var(--accent)] p-8 text-white md:p-10"
          aria-label="Réserver une visio découverte"
        >
          <h2 className="font-display text-2xl font-bold">
            Adapter ces usages à votre entreprise de couverture
          </h2>
          <p className="mt-4 text-blue-100 leading-relaxed">
            30 minutes en visio pour cadrer un devis toiture, un CR après intempéries ou un AO lot
            couverture. Sans engagement.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <RdvLink
              campaign="metier-couvreur-milieu"
              ctaPosition="inline"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[var(--accent)] hover:bg-blue-50"
             />
            <PublicPhoneCta className="inline-flex items-center gap-2 rounded-xl border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10" />
          </div>
        </aside>

        <section id="methode" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Méthode pas à pas avec prompts ChatGPT
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Quatre étapes, quatre prompts utilisables dès demain — adaptés à la couverture et à la
            zinguerie. Copiez, collez vos cotes, gardez la main sur le métré et les prix.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 1 — Structurer un devis toiture (m² et zinguerie)
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_DEVIS_TOITURE}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 2 — Compte rendu de chantier couverture
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_CR_CHANTIER}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 3 — Relance d&apos;assurance après sinistre
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_SINISTRE_ASSURANCE}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 4 — Analyser un CCTP / AO lot couverture (DTU 40.x)
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_AO_DTU}
          </pre>
        </section>

        <section id="resultats" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Résultats concrets</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Sur les sessions, les participants rapportent des devis toiture plus rapides à structurer, des
            CR de chantier plus homogènes et moins de temps perdu sur les relances d&apos;assurance ou les
            brouillons d&apos;AO. Gains variables selon l&apos;organisation.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              'Devis et tableaux de postes plus homogènes (couverture + zinguerie), avec relecture des quantités.',
              'CR après intempéries ou réunion chantier prêts plus vite à envoyer au MOE / client.',
              'Brouillons de courriers sinistre et plans de mémoire technique réutilisables en équipe.',
            ].map((item) => (
              <li key={item} className="flex gap-3 text-slate-700">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-slate-500">
            Aucun gain en heures ou en chiffre d&apos;affaires n&apos;est garanti : tout dépend du volume de
            dossiers et de la qualité de vos relectures techniques.
          </p>
        </section>

        <section id="faq" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            FAQ — questions des couvreurs sur l&apos;IA
          </h2>
          <div className="mt-8 space-y-6">
            {FAQ_ITEMS.map(({ question, answer }) => (
              <div key={question} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-slate-900">{question}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed">
                  <FAQAnswer content={answer} />
                </p>
              </div>
            ))}
          </div>
        </section>

        <LaureOlivieFormationPortrait contextLine="Sessions IA pour couvreurs-zingueurs — devis toiture, DTU 40.x, CR et AO." />

        <section
          id="rdv"
          className="scroll-mt-24 mt-14 rounded-2xl bg-[var(--accent)] p-8 text-white md:p-10"
        >
          <h2 className="font-display text-2xl font-bold">Visio découverte gratuite (30 min)</h2>
          <p className="mt-4 text-blue-100 leading-relaxed">
            Apportez un devis toiture, un CR ou un extrait de CCTP : on cadre la session sur votre
            entreprise de couverture. Présentiel uniquement · Île-de-France uniquement.
          </p>
          <div className="mt-8 flex flex-wrap gap-4" id="cta-calendly">
            <RdvLink
              campaign="metier-couvreur-footer"
              ctaPosition="footer"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[var(--accent)] hover:bg-blue-50"
             />
            <PublicPhoneCta className="inline-flex items-center gap-2 rounded-xl border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10" />
            <Link
              href={LINKS.contact}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10"
            >
              Contact
            </Link>
          </div>
          <p className="mt-6 text-sm text-blue-100">
            <a href={`mailto:${SITE_CONFIG.email}`} className="underline hover:text-white">
              {SITE_CONFIG.email}
            </a>
          </p>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-lg font-bold text-slate-900">
            Formation IA couvreur-zingueur — présentiel en Île-de-France uniquement
          </h2>
          <p className="mt-4 text-sm text-slate-600 leading-relaxed">
            OFC Création d&apos;Entreprise · Organisme certifié Qualiopi · SIRET {SITE_CONFIG.siret} · NDA 11788515078 ·{' '}
            {SITE_CONFIG.email}
            {sitePhoneDisplaySuffix()}
          </p>
        </section>

        <RelatedLinks
          path={PATH}
          className="mt-14 !px-0"
          tone="transparent"
          excludeHrefs={getLiensConnexesHrefs(PATH)}
        />

        <LiensConnexes currentPath={PATH} excludeHrefs={getClusterRelatedHrefs(PATH)} />

        <AllerPlusLoin
          links={[
            { href: LINKS.financement, label: 'Financement Constructys' },
            { href: LINKS.iaCompteRenduChantier, label: 'Compte rendu de chantier avec l’IA' },
            {
              href: LINKS.prendreRdv, label: CTA_RDV_LABEL,
            },
          ].filter(
            (l) =>
              !getClusterRelatedHrefs(PATH).includes(l.href) &&
              ![LINKS.formations, LINKS.formationIleDeFrance, LINKS.iaDevis, PATH].includes(l.href),
          )}
        />
      </article>
    </div>
  );
}
