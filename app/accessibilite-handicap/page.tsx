import Link from 'next/link';
import type { ReactNode } from 'react';
import { Poppins } from 'next/font/google';
import { Mail, Phone } from 'lucide-react';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { JsonLd } from '@/components/JsonLd';
import { createPageMetadata } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import { CONTACT } from '@/lib/constants';
import { EXTERNAL_SITE_URLS } from '@/lib/external-site-urls';
import { OFC_IDENTITE } from '@/lib/ofc-identite';
import { QUALIOPI_REFERENT_HANDICAP } from '@/lib/qualiopi-info';
import {
  ACCESSIBILITE_HANDICAP_PAGE_DESCRIPTION,
  ACCESSIBILITE_HANDICAP_PAGE_TITLE,
  getAccessibiliteHandicapPageJsonLd,
} from '@/lib/schema-accessibilite-handicap-page';

export const revalidate = 3600;

export const metadata = createPageMetadata({
  title: ACCESSIBILITE_HANDICAP_PAGE_TITLE,
  titleAbsolute: ACCESSIBILITE_HANDICAP_PAGE_TITLE,
  description: ACCESSIBILITE_HANDICAP_PAGE_DESCRIPTION,
  descriptionFinal: true,
  path: LINKS.accessibiliteHandicap,
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const MAIL_SUBJECT = 'Demande d’aménagement de formation';
const PHONE_ARIA = `Appeler ${QUALIOPI_REFERENT_HANDICAP.nom}, ${QUALIOPI_REFERENT_HANDICAP.role}, au ${CONTACT.phoneDisplay}`;

const ETAPES_DEMANDE = [
  {
    title: 'Prendre contact',
    body: `Contactez ${QUALIOPI_REFERENT_HANDICAP.nom}, ${QUALIOPI_REFERENT_HANDICAP.role} d’${OFC_IDENTITE.raisonSociale}, par e-mail ou téléphone. L’échange est confidentiel.`,
  },
  {
    title: 'Décrire le besoin fonctionnel',
    body: 'Expliquez ce qui peut gêner votre participation (rythme, supports, accès, concentration…) et les aménagements déjà utiles dans votre activité. Aucun diagnostic médical, dossier médical ou justificatif n’est demandé lors du premier contact.',
  },
  {
    title: 'Étudier les solutions',
    body: 'Nous vérifions avec vous le format de la session, le lieu d’accueil, les supports pédagogiques, le rythme et les objectifs de la formation pour identifier ce qui peut être aménagé.',
  },
  {
    title: 'Confirmer les adaptations',
    body: 'Les aménagements retenus sont confirmés avec vous avant la session. Seules les informations opérationnelles nécessaires sont formalisées — sans diffusion de données médicales.',
  },
] as const;

const ADAPTATIONS = [
  {
    title: 'Rythme et organisation',
    body: 'Pauses, séquences adaptées, temps supplémentaire ou horaires ajustés selon faisabilité et contraintes du lieu.',
  },
  {
    title: 'Supports pédagogiques',
    body: 'Format numérique, taille de texte, contraste, documents transmis en amont ou compatibilité avec vos outils d’assistance, selon les supports disponibles.',
  },
  {
    title: 'Lieu et matériel',
    body: 'Vérification de l’accès, de l’installation et du matériel avec l’entreprise ou le lieu d’accueil (sessions intra-entreprise en Île-de-France).',
  },
  {
    title: 'Modalités pédagogiques',
    body: 'Reformulation des consignes, accompagnement progressif ou adaptation des exercices, sans modifier les objectifs essentiels de la formation.',
  },
] as const;

const ACTEURS = [
  {
    name: 'Agefiph',
    role: 'Accompagnement et financements possibles pour l’insertion et la formation professionnelle dans le secteur privé.',
    href: EXTERNAL_SITE_URLS.agefiph,
  },
  {
    name: 'Ressource Handicap Formation (RHF)',
    role: 'Service gratuit Agefiph pour adapter une formation lorsque la personne a un projet de formation validé. La demande est faite par le référent handicap de l’organisme de formation auprès du conseiller RHF.',
    href: EXTERNAL_SITE_URLS.agefiphRhf,
  },
  {
    name: 'Cap emploi',
    role: 'Accompagnement des personnes en situation de handicap dans leur parcours professionnel.',
    href: EXTERNAL_SITE_URLS.capEmploi,
  },
  {
    name: 'MDPH ou Maison départementale de l’autonomie',
    role: 'Informations et démarches selon votre département (aides, orientation).',
    href: EXTERNAL_SITE_URLS.servicePublicMdph,
  },
  {
    name: 'Référent handicap de l’employeur ou du financeur',
    role: 'Coordination avec le plan de développement des compétences et le financement, si vous en avez un.',
    href: EXTERNAL_SITE_URLS.monParcoursHandicap,
  },
] as const;

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="scroll-mt-24">
      <h2 id={id} className="text-xl font-bold text-[#377CF3] md:text-2xl">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-[0.9375rem] leading-relaxed text-slate-700 md:text-base">
        {children}
      </div>
    </section>
  );
}

function Encadre({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border border-[#377CF3]/20 bg-white p-5">{children}</div>
  );
}

export default function AccessibiliteHandicapPage() {
  const mailtoHref = `mailto:${CONTACT.email}?subject=${encodeURIComponent(MAIL_SUBJECT)}`;

  return (
    <div className={`mx-auto max-w-4xl px-4 py-14 md:py-16 ${poppins.className}`}>
      <JsonLd
        id="schema-accessibilite-handicap"
        schema={getAccessibiliteHandicapPageJsonLd()}
      />

      {/* Hero */}
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">
          {OFC_IDENTITE.raisonSociale} — actions de formation
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
          Accessibilité des formations et besoins d&apos;aménagement
        </h1>
        <p className="mt-4 text-slate-600">
          Vous avez besoin d&apos;un aménagement pour suivre une formation ? Contactez la référente
          handicap afin d&apos;étudier les solutions possibles avec vous.
        </p>
        <p className="mt-3 text-sm text-slate-600">
          Échange confidentiel · Étude individualisée · Orientation si nécessaire
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={mailtoHref}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#377CF3] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2d66d6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
          >
            <Mail className="h-4 w-4 shrink-0" aria-hidden />
            Contacter la référente handicap
          </a>
          <a
            href="#essentiel"
            className="inline-flex min-h-11 items-center justify-center rounded-lg border-2 border-[#377CF3] px-5 py-2.5 text-sm font-semibold text-[#377CF3] transition hover:bg-[#EFF6FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
          >
            Voir les étapes
          </a>
        </div>
        <p className="mt-6 text-sm text-slate-600">
          Cette page concerne l&apos;accessibilité des <strong>actions de formation</strong> — pas
          l&apos;accessibilité numérique du site internet, qui fait l&apos;objet d&apos;une démarche
          distincte et n&apos;a pas fait l&apos;objet d&apos;audit de conformité RGAA publié.
        </p>
      </header>

      <article className="mt-12 space-y-10 rounded-lg bg-[#F2F2F2] px-5 py-8 md:space-y-12 md:px-8 md:py-10">
        {/* L'essentiel */}
        <Section id="essentiel" title="L'essentiel">
          <ul className="list-disc space-y-2 pl-5">
            <li>Signalez votre besoin d&apos;aménagement le plus tôt possible.</li>
            <li>
              Décrivez les difficultés rencontrées et les aménagements utiles, sans transmettre de
              diagnostic médical.
            </li>
            <li>La faisabilité est étudiée avec vous — aucune solution n&apos;est garantie avant cette étude.</li>
            <li>
              Une orientation vers un autre format, un autre lieu ou un acteur spécialisé peut être
              proposée si l&apos;adaptation n&apos;est pas réalisable.
            </li>
          </ul>
          <Encadre>
            <p>
              Contactez-nous le plus tôt possible, idéalement au moins{' '}
              <strong>15 jours avant la formation</strong>. Une demande plus tardive sera néanmoins
              examinée, dans la limite du temps nécessaire pour organiser les adaptations (article 17
              des{' '}
              <Link
                href={LINKS.cgv}
                className="font-medium text-[#377CF3] underline-offset-2 hover:underline"
              >
                conditions générales de vente
              </Link>
              ).
            </p>
          </Encadre>
        </Section>

        {/* Comment faire une demande */}
        <Section id="comment-faire-demande" title="Comment faire une demande ?">
          <ol className="space-y-5">
            {ETAPES_DEMANDE.map((etape, index) => (
              <li key={etape.title} className="flex gap-4">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#377CF3] text-sm font-bold text-white"
                  aria-hidden
                >
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-slate-900">{etape.title}</h3>
                  <p className="mt-1">{etape.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        {/* Adaptations */}
        <Section id="exemples-adaptations" title="Exemples d'adaptations possibles">
          <div className="grid gap-4 sm:grid-cols-2">
            {ADAPTATIONS.map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-slate-200/80 bg-white p-5"
              >
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm">{item.body}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-600">
            Ces exemples ne constituent pas une liste garantie. Chaque solution dépend du besoin, du
            lieu, du délai et de sa faisabilité.
          </p>
        </Section>

        {/* Confidentialité */}
        <Section id="confidentialite" title="Vos informations restent confidentielles">
          <p>
            Vous n&apos;avez pas à transmettre votre diagnostic médical. Indiquez uniquement les
            besoins utiles à l&apos;organisation de la formation.
          </p>
          <p>
            Les informations ne sont partagées avec l&apos;employeur, le lieu d&apos;accueil, le
            financeur ou un acteur spécialisé qu&apos;en fonction de la nécessité et après
            information de la personne concernée.
          </p>
          <p>
            Les aménagements opérationnels sont formalisés sans y faire figurer de données médicales
            inutiles (convention, programme, feuille d&apos;émargement). Pour le cadre juridique du
            traitement des données, consultez la{' '}
            <Link
              href={LINKS.politiqueConfidentialite}
              className="font-medium text-[#377CF3] underline-offset-2 hover:underline"
            >
              politique de confidentialité
            </Link>
            .
          </p>
        </Section>

        {/* Acteurs */}
        <Section id="acteurs-ressources" title="Acteurs et ressources utiles">
          <p>
            Les structures ci-dessous ne sont pas des partenaires contractuels d&apos;OFC. Elles
            peuvent être utiles selon votre situation ; nous pouvons vous orienter, sans garantie
            d&apos;éligibilité ni de financement.
          </p>
          <ul className="space-y-4">
            {ACTEURS.map((acteur) => (
              <li key={acteur.name} className="rounded-lg border border-slate-200/80 bg-white p-4">
                <p className="font-semibold text-slate-900">
                  <ExternalLinkAnchor
                    href={acteur.href}
                    className="text-[#377CF3] underline-offset-2 hover:underline"
                  >
                    {acteur.name}
                  </ExternalLinkAnchor>
                </p>
                <p className="mt-1 text-sm">{acteur.role}</p>
              </li>
            ))}
          </ul>
          <p className="text-sm text-slate-600">
            Contacts RHF par région :{' '}
            <ExternalLinkAnchor
              href={EXTERNAL_SITE_URLS.agefiphRhf}
              className="font-medium text-[#377CF3] underline-offset-2 hover:underline"
            >
              page officielle Agefiph — Ressource Handicap Formation
            </ExternalLinkAnchor>
            {' · '}
            <Link
              href={LINKS.annuaireHandicap}
              className="font-medium text-[#377CF3] underline-offset-2 hover:underline"
            >
              annuaire handicap OFC
            </Link>
            {' '}
            (PDF contacts RHF — janvier 2026).
          </p>
        </Section>

        {/* Si adaptation non réalisable */}
        <Section id="adaptation-non-realisable" title="Si une adaptation ne peut pas être mise en place">
          <p>
            Si, après échange, les contraintes (délai, lieu, matériel, objectifs pédagogiques ou
            sécurité) ne permettent pas de proposer un accueil satisfaisant, nous vous expliquons
            les raisons et recherchons avec vous d&apos;autres pistes :
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>report à une date ou un lieu permettant les aménagements ;</li>
            <li>autre format de session, lorsque cela est envisageable ;</li>
            <li>
              orientation vers un organisme ou un dispositif plus adapté, en lien avec l&apos;employeur
              et le financeur si nécessaire et avec votre accord ;
            </li>
            <li>
              conséquences contractuelles selon la convention signée et les{' '}
              <Link
                href={LINKS.cgv}
                className="font-medium text-[#377CF3] underline-offset-2 hover:underline"
              >
                conditions générales de vente
              </Link>{' '}
              applicables.
            </li>
          </ul>
          <p className="text-sm text-slate-600">
            Une trace interne proportionnée de la demande, des solutions étudiées et de la décision
            est conservée, sans données médicales inutiles.
          </p>
        </Section>

        {/* Contact */}
        <Section id="contacter-referente" title="Contacter la référente handicap">
          <Encadre>
            <p className="font-semibold text-slate-900">{QUALIOPI_REFERENT_HANDICAP.nom}</p>
            <p className="text-sm text-slate-600">
              {QUALIOPI_REFERENT_HANDICAP.role} — {OFC_IDENTITE.raisonSociale}
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={mailtoHref}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#377CF3] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2d66d6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden />
                Écrire à la référente handicap
              </a>
              <a
                href={`tel:${CONTACT.phone}`}
                aria-label={PHONE_ARIA}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border-2 border-[#377CF3] px-4 py-2.5 text-sm font-semibold text-[#377CF3] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
              >
                <Phone className="h-4 w-4 shrink-0" aria-hidden />
                Appeler — {CONTACT.phoneDisplay}
              </a>
            </div>
          </Encadre>
          <p className="text-sm text-slate-600">
            Dans votre premier message, indiquez la formation ou la période envisagée et les
            aménagements dont vous pourriez avoir besoin. N&apos;envoyez pas de document médical.
          </p>
          <p className="text-sm text-slate-600">
            <Link
              href={LINKS.contact}
              className="font-medium text-[#377CF3] underline-offset-2 hover:underline"
            >
              Page contact
            </Link>
            {' · '}
            <Link
              href={LINKS.formations}
              className="font-medium text-[#377CF3] underline-offset-2 hover:underline"
            >
              Catalogue formations
            </Link>
          </p>
        </Section>
      </article>
    </div>
  );
}
