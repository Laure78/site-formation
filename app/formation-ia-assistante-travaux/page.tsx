import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
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
import { RESSOURCES_MINIATURES } from '@/lib/ressources-miniatures';

export const revalidate = 3600;
const PATH = '/formation-ia-assistante-travaux';
const GUIDE_THUMB = RESSOURCES_MINIATURES.guideAssistantsTravaux;

/** Segment avant suffixe — total avec « | Laure Olivié » ≈ 52 car. (≤ 60). */
const SEO_TITLE = 'Formation IA assistante travaux BTP';
const SEO_DESCRIPTION =
  'Formation IA pour assistantes travaux en Île-de-France : PPSPS, CR chantier, DOE, DC4 et suivi de marché. Présentiel Qualiopi. Visio découverte (30 min).';

export const metadata = createPageMetadata({
  title: SEO_TITLE,
  description: SEO_DESCRIPTION,
  descriptionFinal: true,
  path: PATH,
  appendAuthorSuffix: true,
  keywords: [
    'formation IA assistante travaux',
    'formation IA assistant travaux',
    'ChatGPT assistante travaux BTP',
    'IA PPSPS CR DOE',
    'formation IA suivi de marché BTP',
    'DC4 OS visas IA BTP',
    'formation IA Île-de-France BTP',
    'OPCO Constructys assistante travaux',
    'Qualiopi assistante travaux',
  ],
  openGraphType: 'website',
  image: {
    url: GUIDE_THUMB.src,
    width: GUIDE_THUMB.width,
    height: GUIDE_THUMB.height,
    alt: GUIDE_THUMB.alt,
  },
});

const PROMPT_PPS_ACCUEIL = `Tu es assistante / assistant travaux dans une PME BTP en Île-de-France.
À partir des notes et pièces ci-dessous, prépare une trame PPSPS / accueil sécurité pour le démarrage chantier.

CONTEXTE :
- Chantier / adresse : [À COMPLÉTER]
- Lots concernés : [À COMPLÉTER]
- Coactivité / entreprises présentes : [À COMPLÉTER]
- Risques déjà identifiés : [NOTES]
- EPI / consignes maison : [NOTES]
- Référent sécurité / tuteur : [fonction]

Produis :
1. Checklist documents à réunir (PPSPS, PIC, DICT, autorisations) — [À COMPLÉTER] si manquant
2. Plan d'accueil J1 (ordre des points, qui parle, signatures)
3. Encadré « 5 réflexes du premier jour sur chantier »
4. Liste des questions à poser au conducteur de travaux avant diffusion

N'invente aucune donnée absente. Ton factuel, vocabulaire BTP.`;

const PROMPT_CR_AVANCEMENT = `À partir de ces notes brutes (réunion / visite / WhatsApp), rédige un compte rendu d'avancement prêt à envoyer au conducteur de travaux et au MOE :

NOTES BRUTES :
[COLLE ICI]

Format :
- En-tête : chantier, date, présents, météo
- Avancement par lot / zone
- Décisions, responsables, échéances
- Réserves / points bloquants
- Documents attendus (plans, visas, OS, DC4…)
- Suite à donner

Indiquer [À CONFIRMER] si une info manque. Pas d'interprétation hors notes.`;

const PROMPT_ADMIN_MARCHE = `Prépare un suivi administratif de marché pour l'assistante travaux.

PIÈCES / NOTES :
[DC4, OS, avenants, cautions, sous-traitance, relances — COLLE ICI]

Produis un tableau :
| Pièce | Statut (reçu / manquant / à relancer) | Qui | Échéance | Relance type (objet + 3 phrases) |

Puis une checklist « avant envoi situation / DGD » (sans inventer de montants).
Signale [À COMPLÉTER] pour toute référence absente.`;

const PROMPT_DOE_CLOTURE = `Structure un plan de DOE / dossier de clôture pour mon lot, à partir de la liste de pièces ci-dessous.

PIÈCES DISPO / MANQUANTES :
[COLLE ICI]

Produis :
1. Sommaire DOE (rubriques standards BTP)
2. Checklist fourni / manquant
3. Mail type au conducteur / sous-traitants pour réclamer les pièces manquantes
4. Points de vigilance réception / réserves (sans inventer de dates)

Ne pas inventer de notices ni de plans absents des notes.`;

const FAQ_ITEMS = [
  {
    question: "L'IA remplace-t-elle l'assistante travaux ?",
    answer:
      "Non. L'IA accélère la production écrite (PPSPS, CR, checklists DC4/OS, DOE). La coordination terrain, la validation des pièces et la responsabilité auprès du conducteur de travaux restent humaines. Vous relisez chaque sortie avant diffusion.",
  },
  {
    question: 'Faut-il être bon en informatique ?',
    answer:
      "Non. Un navigateur, un traitement de texte et vos documents habituels suffisent. La session part de zéro et travaille sur vos vrais dossiers de marché — sans installation technique.",
  },
  {
    question: 'La formation est-elle finançable via Constructys ?',
    answer:
      "OFC Création d'Entreprise est certifié Qualiopi. Les entreprises cotisant à Constructys (ou à leur OPCO) peuvent demander une prise en charge selon statut, branche et conditions en vigueur — financement OPCO possible selon éligibilité, jamais présenté comme acquis. Le dossier se prépare après la visio découverte.",
  },
  {
    question: 'Quelle durée et quel format ?',
    answer:
      'Session catalogue de 4 h, en présentiel uniquement, en Île-de-France uniquement : intra dans vos locaux ou inter en salle. On s’appuie sur vos PPSPS, CR, DC4 et suivis de marché réels.',
  },
  {
    question: 'Quelle différence avec la formation assistante administrative ou de gestion ?',
    answer:
      "L'assistante travaux suit le marché et le chantier (PPSPS, visas, OS, CR, DOE, DGD). L'assistante administrative cible plutôt courriers et mails ; l'assistante de gestion, la facturation d'avancement et les relances impayés. Les trois pages sont distinctes pour coller à votre métier.",
  },
  {
    question: 'Peut-on travailler sur nos vrais dossiers de marché ?',
    answer:
      'Oui : c’est le principe. Apportez un PPSPS, un CR, une checklist DC4/OS ou un plan de DOE — anonymisés si besoin. Vous repartez avec des prompts calés sur votre entreprise.',
  },
];

const SOMMAIRE = [
  { href: '#le-probleme', label: 'Le problème : pourquoi les assistantes travaux perdent du temps' },
  { href: '#la-solution', label: "La solution : l'IA adaptée aux assistantes travaux" },
  { href: '#methode', label: 'Méthode pas à pas avec prompts ChatGPT' },
  { href: '#resultats', label: 'Résultats concrets' },
  { href: '#faq', label: "FAQ — questions des assistantes travaux sur l'IA" },
  { href: '#a-propos', label: 'Qui est Laure Olivié ?' },
  { href: '#rdv', label: 'Réservez votre visio découverte gratuite' },
];

const CAS_USAGE = [
  {
    titre: 'PPSPS, PIC et accueil sécurité',
    description:
      'Trames et checklists à partir de vos consignes et du DUERP : l’IA structure, le référent sécurité valide avant diffusion.',
  },
  {
    titre: 'CR et avancement de chantier',
    description:
      'Notes WhatsApp / réunion → compte rendu clair pour le conducteur de travaux et le MOE, avec décisions et échéances.',
  },
  {
    titre: 'Admin marché : DC4, OS, avenants',
    description:
      'Tableaux de suivi, mails de relance et checklists avant situation — sans inventer de montants ni de pièces.',
  },
  {
    titre: 'Plans, visas et indices',
    description:
      'Aide à lister les indices, visas et destinataires pour ne rien laisser traîner dans la diffusion documentaire.',
  },
  {
    titre: 'DOE et clôture de lot',
    description:
      'Sommaire DOE, checklist fourni / manquant, mails de relance pièces — avant la réception.',
  },
  {
    titre: 'Sous-traitance et QSE',
    description:
      'Synthèses d’attestations, accueils, registres : l’IA prépare, vous gardez le contrôle des pièces opposables.',
  },
];

export default function FormationIaAssistanteTravauxPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <FormationMetierJsonLd
        metierLabel="Assistante / assistant travaux"
        path={PATH}
        courseName="Formation IA pour assistantes travaux — Île-de-France"
        courseDescription={SEO_DESCRIPTION}
        duration="PT4H"
        price={TARIF_SESSION_DEBUTANT_HT}
        level="Intermediate"
        faqItems={FAQ_ITEMS}
        teaches={[
          'PPSPS, PIC et accueil sécurité assistés par IA',
          'Comptes rendus et suivi d’avancement de chantier',
          'Admin marché : DC4, OS, avenants et relances',
          'DOE et dossiers de clôture de lot',
        ]}
        scriptId="schema-formation-ia-assistante-travaux"
      />

      <article>
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Formation IA pour assistantes travaux en Île-de-France
        </h1>
        <p className="mt-6 text-xl text-slate-600">
          PPSPS, CR de chantier, DC4, OS, visas et DOE :{' '}
          <strong>ChatGPT et Claude AI</strong> accélèrent l&apos;écrit des assistantes et assistants
          travaux, sans remplacer la coordination terrain. Formation <strong>Qualiopi</strong>,{' '}
          <strong>présentiel uniquement</strong> en Île-de-France et Grand Paris — financement OPCO
          possible selon éligibilité.
        </p>

        <figure className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
          <Image
            src={GUIDE_THUMB.src}
            alt={GUIDE_THUMB.alt}
            fill
            className="object-cover object-top"
            priority
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </figure>

        <div className="mt-8">
          <ShortAnswerBlock>
            La formation IA assistante travaux apprend à utiliser ChatGPT et Claude sur vos dossiers de
            marché réels : PPSPS, comptes rendus, suivis DC4/OS, DOE et clôture. Vous validez chaque
            document avant envoi au conducteur de travaux ou au maître d&apos;œuvre.
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
            Le problème : pourquoi les assistantes travaux perdent du temps
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            L&apos;assistante travaux (ou assistant travaux) tient le fil du marché : prise en main du
            contrat, <strong>PPSPS</strong> et PIC, <strong>DICT</strong>, plans et visas, DC4 et OS,
            appros, QSE, avancement, situations, DOE et DGD. En Île-de-France et Grand Paris, le volume
            de pièces et de relances déborde souvent la journée — surtout quand plusieurs lots et
            sous-traitants avancent en parallèle.
          </p>
          <ul className="mt-4 space-y-3">
            {[
              'PPSPS / PIC / DICT à assembler et à tenir à jour au démarrage et à chaque évolution de coactivité.',
              'CR de réunion et notes d’avancement à reformater chaque semaine pour le conducteur et le MOE.',
              'Suivi DC4, OS, avenants, cautions : tableaux et relances qui s’accumulent.',
              'Plans d’exécution, indices et visas : diffusion documentaire chronophage.',
              'Appros, commandes et locations : mails fournisseurs sous pression de délai.',
              'DOE et clôture : course aux notices et plans de récolement avant réception.',
              'Accueils sécurité et registres QSE à tracer sans rien oublier.',
            ].map((item) => (
              <li key={item} className="flex gap-3 text-slate-700">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-slate-600 leading-relaxed">
            Ce rôle n&apos;est ni la{' '}
            <Link
              href={LINKS.formationIaAssistanteBtp}
              className="font-semibold text-[var(--accent)] underline hover:no-underline"
            >
              formation IA assistante administrative
            </Link>{' '}
            (courriers / mails), ni la{' '}
            <Link
              href={LINKS.formationIaAssistanteGestionBtp}
              className="font-semibold text-[var(--accent)] underline hover:no-underline"
            >
              formation IA assistante de gestion
            </Link>{' '}
            (facturation / impayés) : ici, on parle du suivi de marché et du chantier.
          </p>
        </section>

        <section id="la-solution" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            La solution : l&apos;IA adaptée aux assistantes travaux
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            <strong>ChatGPT</strong> et <strong>Claude AI</strong> accélèrent la mise en forme sur{' '}
            <strong>vos</strong> documents : un PPSPS en cours, des notes de réunion, une checklist DC4,
            un plan de DOE. La relecture et la diffusion restent celles de l&apos;assistante travaux et du
            conducteur.
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
            <Link
              href={LINKS.formations}
              className="font-semibold text-[var(--accent)] underline hover:no-underline"
            >
              formations IA pour le BTP
            </Link>
            , sur le bassin{' '}
            <Link
              href={LINKS.formationIleDeFrance}
              className="font-semibold text-[var(--accent)] underline hover:no-underline"
            >
              formation IA BTP Île-de-France
            </Link>
            . Pour approfondir les 12 missions du métier, voir aussi le{' '}
            <Link
              href={LINKS.guideAssistantsTravauxOfc}
              className="font-semibold text-[var(--accent)] underline hover:no-underline"
            >
              guide des assistants travaux
            </Link>
            .
          </p>
        </section>

        <aside
          className="mt-14 rounded-2xl bg-[var(--accent)] p-8 text-white md:p-10"
          aria-label="Réserver une visio découverte"
        >
          <h2 className="font-display text-2xl font-bold">
            Adapter ces usages à votre poste d&apos;assistante travaux
          </h2>
          <p className="mt-4 text-blue-100 leading-relaxed">
            30 minutes en visio pour cadrer un PPSPS, un CR ou un suivi DC4/OS. Sans engagement.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <RdvLink
              campaign="metier-assistante-travaux-milieu"
              ctaPosition="inline"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[var(--accent)] hover:bg-blue-50"
            >
              Réserver votre visio découverte
              <ArrowRight size={20} strokeWidth={1.5} />
            </RdvLink>
            <PublicPhoneCta className="inline-flex items-center gap-2 rounded-xl border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10" />
          </div>
        </aside>

        <section id="methode" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Méthode pas à pas avec prompts ChatGPT
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Quatre étapes, quatre prompts utilisables dès demain — calés sur le vocabulaire du suivi de
            marché. Copiez, collez vos notes, gardez la main sur les pièces opposables.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 1 — PPSPS / accueil sécurité
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_PPS_ACCUEIL}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 2 — Compte rendu d&apos;avancement
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_CR_AVANCEMENT}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 3 — Suivi admin marché (DC4, OS, avenants)
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_ADMIN_MARCHE}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 4 — Plan DOE / clôture de lot
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_DOE_CLOTURE}
          </pre>
        </section>

        <section id="resultats" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Résultats concrets</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Sur les sessions, les participants rapportent des CR plus rapides à sortir, des suivis DC4/OS
            plus lisibles et des DOE mieux structurés avant réception. Gains variables selon
            l&apos;organisation.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              'Moins de temps sur les relances et les tableaux de pièces manquantes.',
              'Des comptes rendus homogènes d’un chantier à l’autre, prêts à relire.',
              'Des trames PPSPS / DOE réutilisables en équipe, avec cases [À COMPLÉTER].',
            ].map((item) => (
              <li key={item} className="flex gap-3 text-slate-700">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-slate-500">
            Aucun gain en heures ou en chiffre d&apos;affaires n&apos;est garanti : tout dépend du volume de
            marchés et de la qualité de vos relectures.
          </p>
        </section>

        <section id="faq" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            FAQ — questions des assistantes travaux sur l&apos;IA
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

        <LaureOlivieFormationPortrait contextLine="Sessions IA pour assistantes et assistants travaux — PPSPS, CR, DOE, suivi de marché." />

        <section
          id="rdv"
          className="scroll-mt-24 mt-14 rounded-2xl bg-[var(--accent)] p-8 text-white md:p-10"
        >
          <h2 className="font-display text-2xl font-bold">Visio découverte gratuite (30 min)</h2>
          <p className="mt-4 text-blue-100 leading-relaxed">
            Apportez un PPSPS, un CR ou une checklist DC4 : on cadre la session sur votre poste.
            Présentiel uniquement · Île-de-France uniquement.
          </p>
          <div className="mt-8 flex flex-wrap gap-4" id="cta-calendly">
            <RdvLink
              campaign="metier-assistante-travaux-footer"
              ctaPosition="footer"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[var(--accent)] hover:bg-blue-50"
            >
              Réserver votre visio découverte
              <ArrowRight size={20} strokeWidth={1.5} />
            </RdvLink>
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
            Formation IA assistante travaux — présentiel en Île-de-France uniquement
          </h2>
          <p className="mt-4 text-sm text-slate-600 leading-relaxed">
            OFC Création d&apos;Entreprise · Certifiée Qualiopi · SIRET {SITE_CONFIG.siret} · NDA
            11788515078 · {SITE_CONFIG.email}
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
              href: buildSiteCalendlyCtaUrl('formation-ia-assistante-travaux-footer-rdv'),
              label: 'Prendre rendez-vous',
            },
          ].filter(
            (l) =>
              !getClusterRelatedHrefs(PATH).includes(l.href) &&
              ![
                LINKS.formations,
                LINKS.formationIleDeFrance,
                LINKS.guideAssistantsTravauxOfc,
                LINKS.formationIaAssistanteBtp,
                LINKS.formationIaAssistanteGestionBtp,
                PATH,
              ].includes(l.href),
          )}
        />
      </article>
    </div>
  );
}
