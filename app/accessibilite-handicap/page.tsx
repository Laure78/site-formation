import Link from 'next/link';
import { Poppins } from 'next/font/google';
import { Mail, Phone } from 'lucide-react';
import { createPageMetadata } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import { CONTACT } from '@/lib/constants';
import { QUALIOPI_LEGAL, QUALIOPI_REFERENT_HANDICAP } from '@/lib/qualiopi-info';

export const revalidate = 3600;

export const metadata = createPageMetadata({
  title: 'Accessibilité handicap — formations BTP',
  description:
    "Accessibilité handicap OFC : référente Laure Olivié, adaptations en formation IA pour le BTP. Contact dès l'inscription, acteurs mobilisables (AGEFIPH, Cap Emploi, MDPH) selon besoin.",
  path: LINKS.accessibiliteHandicap,
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const PHONE_ARIA = `Appeler Laure Olivié, référente handicap, au ${CONTACT.phoneDisplay}`;

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
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

export default function AccessibiliteHandicapPage() {
  return (
    <div className={`mx-auto max-w-4xl px-4 py-14 md:py-16 ${poppins.className}`}>
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">
          {QUALIOPI_LEGAL.raisonSociale} — actions de formation
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
          Accessibilité &amp; handicap
        </h1>
        <p className="mt-4 text-slate-600">
          Formations IA en présentiel pour les pros du bâtiment et des travaux publics — démarche
          d&apos;accueil et d&apos;adaptation pour les salariés et dirigeants en situation de handicap.
        </p>
      </header>

      <article className="mt-12 space-y-10 rounded-lg bg-[#F2F2F2] px-5 py-8 md:space-y-12 md:px-8 md:py-10">
        <Section id="engagement-accessibilite" title="Nos formations sont accessibles aux personnes en situation de handicap">
          <p>
            {QUALIOPI_LEGAL.raisonSociale} s&apos;engage à rendre ses actions de formation accessibles
            aux personnes en situation de handicap, que la session ait lieu en intra dans votre
            entreprise ou en inter sur un site en Île-de-France.
          </p>
          <p>
            <strong>{QUALIOPI_REFERENT_HANDICAP.nom}</strong>, {QUALIOPI_REFERENT_HANDICAP.role} et
            présidente de l&apos;organisme, est votre interlocutrice unique pour étudier les besoins
            avant l&apos;entrée en formation : contraintes liées au chantier ou au bureau, fatigue,
            vision, audition, mobilité, cognition ou tout autre situation nécessitant un aménagement.
          </p>
          <p>
            L&apos;objectif est simple : vous permettre de suivre la session dans de bonnes conditions,
            avec des supports et un rythme adaptés, sans compromettre les objectifs pédagogiques ni la
            sécurité des exercices sur documents métier.
          </p>
        </Section>

        <Section id="comment-nous-prevenir" title="Comment nous prévenir">
          <p>
            Contactez la référente handicap <strong>dès votre demande d&apos;inscription</strong>, et au
            plus tard <strong>15 jours avant le début de la session</strong>. Ce délai laisse le temps
            d&apos;échanger avec vous, votre employeur et, si besoin, votre financeur (OPCO, etc.) sur
            les adaptations à prévoir.
          </p>
          <div className="rounded-lg border border-[#377CF3]/20 bg-white p-5">
            <p className="font-semibold text-slate-900">{QUALIOPI_REFERENT_HANDICAP.nom}</p>
            <p className="text-sm text-slate-600">{QUALIOPI_REFERENT_HANDICAP.role}</p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={`mailto:${CONTACT.email}?subject=${encodeURIComponent('Accessibilité handicap — demande avant formation OFC')}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#377CF3] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2d66d6]"
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden />
                {CONTACT.email}
              </a>
              <a
                href={`tel:${CONTACT.phone}`}
                aria-label={PHONE_ARIA}
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#377CF3] px-4 py-2.5 text-sm font-semibold text-[#377CF3] transition hover:bg-white"
              >
                <Phone className="h-4 w-4 shrink-0" aria-hidden />
                {CONTACT.phoneDisplay}
              </a>
            </div>
          </div>
          <p className="text-sm text-slate-600">
            Décrivez votre situation, le public visé (salarié, dirigeant, équipe), la date envisagée
            et toute contrainte connue (déplacement, horaires de chantier, matériel). Nous revenons
            vers vous avec une proposition d&apos;adaptations avant signature de la convention.
          </p>
        </Section>

        <Section id="adaptations-possibles" title="Les adaptations possibles">
          <p>
            Chaque demande est étudiée au cas par cas. Voici les aménagements les plus fréquents
            sur nos sessions IA BTP (devis, appels d&apos;offres, suivi de chantier, administratif) :
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Rythme et pauses</strong> — découpes, temps de repos, séquences plus courtes
              adaptées à la fatigue ou à la concentration.
            </li>
            <li>
              <strong>Supports pédagogiques</strong> — documents en gros caractères, contraste renforcé,
              versions numériques compatibles lecture vocale ou agrandissement.
            </li>
            <li>
              <strong>Lieu et accès</strong> — pour une session <strong>intra</strong> dans votre
              entreprise : vérification avec vous de la place de stationnement, de l&apos;accès de
              plain-pied ou des ascenseurs, et des locaux d&apos;accueil. Pour une session{' '}
              <strong>inter</strong> : choix d&apos;une salle accessible (PMR) communiquée à la
              convocation.
            </li>
            <li>
              <strong>Exercices pratiques</strong> — temps supplémentaire sur les mises en situation
              (devis, comptes rendus, pièces d&apos;appel d&apos;offres), consignes reformulées,
              accompagnement pas à pas si nécessaire.
            </li>
            <li>
              <strong>Matériel</strong> — poste adapté (clavier, souris, écran), siège ergonomique
              lorsque le site d&apos;accueil le permet, ou apport de matériel par le stagiaire /
              l&apos;employeur selon faisabilité.
            </li>
          </ul>
          <p className="text-sm text-slate-600">
            Les adaptations retenues sont formalisées dans la convention de formation ou le programme
            individualisé, puis ajustées en début et fin de session si besoin.
          </p>
        </Section>

        <Section id="reseau-acteurs" title="Notre réseau de partenaires">
          <p>
            OFC ne prétend pas disposer d&apos;un réseau de partenaires contractuels dédié au
            handicap. En revanche, l&apos;organisme peut <strong>orienter ou mobiliser, au cas par
            cas</strong>, les acteurs publics et professionnels suivants selon le besoin identifié avec
            le stagiaire et son employeur :
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>AGEFIPH</strong> — accompagnement et financements possibles pour l&apos;insertion
              et la formation dans le secteur privé.
            </li>
            <li>
              <strong>Cap Emploi</strong> — appui aux personnes en situation de handicap dans leur
              parcours professionnel.
            </li>
            <li>
              <strong>MDPH du département du stagiaire</strong> — démarches et aides selon la
              situation personnelle.
            </li>
            <li>
              <strong>Référent handicap de l&apos;entreprise</strong> ou de l&apos;OPCO — coordination
              avec le plan de développement des compétences et le financement.
            </li>
          </ul>
          <p>
            La mobilisation de ces acteurs dépend de votre situation : nous vous indiquons les
            interlocuteurs pertinents ; c&apos;est à vous ou à votre employeur d&apos;engager les démarches
            auprès de leurs services.
          </p>
          <p>
            <Link
              href={LINKS.annuaireHandicap}
              className="font-medium text-[#377CF3] underline-offset-2 hover:underline"
            >
              Consulter l&apos;annuaire de contacts handicap (PDF)
            </Link>{' '}
            — liste de ressources nationales et régionales, sans engagement de partenariat nominatif.
          </p>
        </Section>

        <Section id="si-pas-adaptation" title="Et si nous ne pouvons pas adapter">
          <p>
            Si, après échange avec la référente handicap, les contraintes (délai, lieu, matériel,
            objectifs pédagogiques ou sécurité des exercices) ne permettent pas de garantir un accueil
            de qualité, OFC propose une <strong>réorientation</strong> vers une solution plus adaptée :
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>report de la session à une date ou un lieu permettant les aménagements ;</li>
            <li>
              session intra dans l&apos;entreprise, lorsque l&apos;environnement du stagiaire (bureau,
              chantier, équipements) est plus favorable ;
            </li>
            <li>
              orientation vers un autre organisme ou dispositif identifié avec l&apos;employeur et le
              financeur (OPCO, AGEFIPH, etc.), en toute transparence sur les raisons du refus ou du
              report ;
            </li>
            <li>
              annulation sans pénalité du stagiaire si la convention n&apos;a pas encore démarré et qu&apos;aucune
              alternative n&apos;est trouvée dans un délai raisonnable.
            </li>
          </ul>
          <p>
            Cette démarche est menée en lien avec <strong>votre employeur</strong> et, le cas échéant,{' '}
            <strong>votre financeur</strong>, pour respecter vos obligations administratives et
            budgétaires. Notre priorité reste de trouver une modalité de formation viable plutôt que
            d&apos;imposer un parcours inadapté.
          </p>
        </Section>
      </article>

      <p className="mt-10 text-center text-sm text-slate-600">
        Une question avant de vous inscrire ?{' '}
        <Link href={LINKS.contact} className="font-medium text-[#377CF3] hover:underline">
          Page contact
        </Link>{' '}
        ·{' '}
        <Link href={LINKS.formations} className="font-medium text-[#377CF3] hover:underline">
          Catalogue formations
        </Link>
      </p>
    </div>
  );
}
