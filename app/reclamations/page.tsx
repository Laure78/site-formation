import Link from 'next/link';
import type { ReactNode } from 'react';
import { Poppins } from 'next/font/google';
import { Mail, Phone, FileDown } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { createPageMetadata, getFAQSchema } from '@/lib/seo';
import { CONTACT } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';
import { MediationCm2cBlock } from '@/components/qualiopi/MediationCm2cBlock';
import { OFC_IDENTITE } from '@/lib/ofc-identite';
import { QUALIOPI_MEDIATION_CM2C } from '@/lib/qualiopi-info';

export const revalidate = 3600;

const PAGE_TITLE = 'Réclamations et médiation | Laure Olivié';
const PAGE_DESCRIPTION =
  "Vous souhaitez déposer une réclamation auprès d'OFC Création d'Entreprise, organisme de formation ? Canaux, délai de réponse (48 h et 15 jours ouvrés), traitement et voies de recours.";

export const metadata = createPageMetadata({
  title: PAGE_TITLE,
  titleAbsolute: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  descriptionFinal: true,
  path: LINKS.reclamations,
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const SITUATIONS = [
  {
    title: 'Aléa',
    body: 'Évènement externe imprévisible qui implique une perturbation.',
  },
  {
    title: 'Difficulté',
    body: 'Élément qui empêche ou gêne dans la réalisation de la prestation.',
  },
  {
    title: 'Réclamation',
    body: 'Action visant à faire respecter un droit ou à demander une chose due, recueillie par écrit.',
  },
] as const;

const DELAIS_ROWS = [
  {
    etape: 'Accusé de réception',
    delai: '48 heures ouvrées',
    trace: 'courriel de prise en charge avec numéro de fiche',
  },
  {
    etape: 'Réponse de fond',
    delai: '15 jours ouvrés',
    trace: 'courriel ou lettre recommandée selon la gravité',
  },
  {
    etape: 'Délai maximum',
    delai: '2 mois',
    trace: "information écrite de l'avancement en cas de circonstances particulières",
  },
  {
    etape: 'Clôture',
    delai: "accord de l'auteur, ou 15 jours après la réponse",
    trace: 'fiche de suivi datée',
  },
] as const;

const TRAITEMENT_ETAPES = [
  'Réception et horodatage',
  "Ouverture d'une fiche de suivi numérotée",
  'Instruction et recherche de la cause racine',
  'Réponse écrite motivée',
  'Action corrective si la cause est interne',
  "Clôture et vérification d'efficacité lors de la session suivante",
] as const;

/** Réponses visibles — reprises mot pour mot dans le JSON-LD FAQPage. */
const FAQ_DEPOSER =
  `Canal principal : courriel à ${CONTACT.email}. Autres canaux : ${CONTACT.phoneDisplay} · courrier à ${OFC_IDENTITE.raisonSociale}, ${CONTACT.address} · formulaire de la page contact. Indiquez : intitulé et date de la session, identité et organisme de l'auteur, objet précis, pièces utiles.`;

const FAQ_DELAIS =
  'Accusé de réception : 48 heures ouvrées, courriel de prise en charge avec numéro de fiche. Réponse de fond : 15 jours ouvrés, courriel ou lettre recommandée selon la gravité. Délai maximum : 2 mois, information écrite de l\'avancement en cas de circonstances particulières. Clôture : accord de l\'auteur, ou 15 jours après la réponse, fiche de suivi datée.';

const FAQ_RECOURS =
  `Médiation de la consommation, pour les personnes ayant contracté à titre personnel, après démarche écrite préalable restée sans solution (articles L. 612-1 et suivants du code de la consommation). Médiateur : ${QUALIOPI_MEDIATION_CM2C.nom}, ${QUALIOPI_MEDIATION_CM2C.adresse}, ${QUALIOPI_MEDIATION_CM2C.siteUrl}, ${QUALIOPI_MEDIATION_CM2C.email}. Le financeur ou le partenaire organisateur de la session. CERTIFOPAC, organisme certificateur, pour toute réclamation portant sur le respect du Référentiel National Qualité.`;

const FAQ_ITEMS = [
  {
    q: "Comment déposer une réclamation auprès d'OFC Création d'Entreprise ?",
    a: FAQ_DEPOSER,
  },
  {
    q: 'Sous quel délai obtiendrai-je une réponse ?',
    a: FAQ_DELAIS,
  },
  {
    q: 'Que faire si la réponse ne me satisfait pas ?',
    a: FAQ_RECOURS,
  },
] as const;

const faqSchema = getFAQSchema([...FAQ_ITEMS]);

function Encadre({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-lg border-l-[6px] border-[#377CF3] bg-[#F2F2F2] p-4 text-[#1A1A1A] ${className}`}
    >
      {children}
    </div>
  );
}

function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="text-xl font-bold text-[#377CF3] md:text-2xl">
      {children}
    </h2>
  );
}

export default function ReclamationsPage() {
  return (
    <div className={`mx-auto max-w-4xl px-4 py-14 md:py-16 ${poppins.className} text-[#1A1A1A]`}>
      {faqSchema ? <JsonLd id="schema-faq-reclamations" schema={faqSchema} /> : null}

      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">
          {OFC_IDENTITE.raisonSociale} — actions de formation · présentiel · Île-de-France
        </p>
        <h1 className="mt-2 text-3xl font-bold text-[#377CF3] md:text-4xl">
          Réclamations, difficultés et aléas
        </h1>
        <p className="mt-4 leading-relaxed text-[#1A1A1A]/90">
          Une remarque, une difficulté, un désaccord ? Voici comment nous en informer et sous quel
          délai nous nous engageons à vous répondre.
        </p>
      </header>

      <article className="mt-12 space-y-12">
        {/* 1. Ce que couvre cette procédure */}
        <section aria-labelledby="couverture-procedure">
          <H2 id="couverture-procedure">Ce que couvre cette procédure</H2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {SITUATIONS.map((item) => (
              <Encadre key={item.title}>
                <h3 className="font-semibold text-[#377CF3]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed">{item.body}</p>
              </Encadre>
            ))}
          </div>
          <p className="mt-6 leading-relaxed">
            <strong>Ce qui n&apos;est pas une réclamation :</strong> une demande d&apos;information, de
            clarification, de prestation ou un simple avis. Ces demandes se traitent par le canal ordinaire.
          </p>
        </section>

        {/* 2. Qui peut nous saisir */}
        <section aria-labelledby="qui-saisir">
          <H2 id="qui-saisir">Qui peut nous saisir</H2>
          <p className="mt-4 leading-relaxed">
            Les bénéficiaires (stagiaires), les entreprises clientes, les financeurs (OPCO, Constructys,
            France Travail) et les partenaires organisateurs.
          </p>
        </section>

        {/* 3. Comment nous saisir */}
        <section aria-labelledby="comment-saisir">
          <H2 id="comment-saisir">Comment nous saisir</H2>
          <p className="mt-4 leading-relaxed">{FAQ_DEPOSER}</p>
          <Encadre className="mt-6">
            <p className="leading-relaxed">
              <strong>Traçabilité :</strong> une réclamation exprimée oralement fait l&apos;objet d&apos;un
              compte rendu écrit établi par l&apos;organisme, adressé à son auteur pour confirmation, puis
              enregistré. Aucune réclamation n&apos;est écartée au motif qu&apos;elle n&apos;a pas été formulée
              par écrit.
            </p>
          </Encadre>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`mailto:${CONTACT.email}?subject=${encodeURIComponent('Réclamation formation')}`}
              className="inline-flex items-center gap-2 rounded-lg bg-[#377CF3] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#2d66d6]"
            >
              <Mail className="h-4 w-4" aria-hidden />
              {CONTACT.email}
            </a>
            <a
              href={`tel:${CONTACT.phone}`}
              className="inline-flex items-center gap-2 rounded-lg border border-[#377CF3] px-4 py-2.5 text-sm font-semibold text-[#377CF3] hover:bg-[#F2F2F2]"
            >
              <Phone className="h-4 w-4" aria-hidden />
              {CONTACT.phoneDisplay}
            </a>
            <Link
              href={LINKS.contact}
              className="inline-flex items-center gap-2 rounded-lg border border-[#377CF3] px-4 py-2.5 text-sm font-semibold text-[#377CF3] hover:bg-[#F2F2F2]"
            >
              Formulaire contact
            </Link>
          </div>
        </section>

        {/* 4. Nos délais */}
        <section aria-labelledby="nos-delais">
          <H2 id="nos-delais">Nos délais</H2>
          <p className="mt-4 leading-relaxed">{FAQ_DELAIS}</p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[36rem] border-collapse text-sm">
              <thead>
                <tr className="border-b border-[#377CF3]/30 bg-[#F2F2F2]">
                  <th scope="col" className="p-3 text-left font-semibold text-[#377CF3]">
                    Étape
                  </th>
                  <th scope="col" className="p-3 text-left font-semibold text-[#377CF3]">
                    Délai
                  </th>
                  <th scope="col" className="p-3 text-left font-semibold text-[#377CF3]">
                    Trace produite
                  </th>
                </tr>
              </thead>
              <tbody>
                {DELAIS_ROWS.map((row) => (
                  <tr key={row.etape} className="border-b border-[#377CF3]/15">
                    <td className="p-3 font-medium">{row.etape}</td>
                    <td className="p-3">{row.delai}</td>
                    <td className="p-3">{row.trace}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 5. Comment votre réclamation est traitée */}
        <section aria-labelledby="traitement-reclamation">
          <H2 id="traitement-reclamation">Comment votre réclamation est traitée</H2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed">
            {TRAITEMENT_ETAPES.map((etape) => (
              <li key={etape}>{etape}</li>
            ))}
          </ol>
        </section>

        {/* 6. Si notre réponse ne vous satisfait pas */}
        <section aria-labelledby="recours">
          <H2 id="recours">Si notre réponse ne vous satisfait pas</H2>
          <ul className="mt-4 list-disc space-y-4 pl-5 leading-relaxed">
            <li>
              Médiation de la consommation, pour les personnes ayant contracté à titre personnel, après
              démarche écrite préalable restée sans solution (articles L. 612-1 et suivants du code de la
              consommation).
              <Encadre className="mt-3 border-dashed border-[#377CF3]/50 bg-white text-sm">
                <MediationCm2cBlock />
              </Encadre>
            </li>
            <li>Le financeur ou le partenaire organisateur de la session.</li>
            <li>
              CERTIFOPAC, organisme certificateur, pour toute réclamation portant sur le respect du
              Référentiel National Qualité.
            </li>
          </ul>
        </section>

        {/* 7. Accessibilité de cette procédure */}
        <section aria-labelledby="accessibilite-procedure">
          <H2 id="accessibilite-procedure">Accessibilité de cette procédure</H2>
          <p className="mt-4 leading-relaxed">
            Toute personne en situation de handicap qui rencontre une difficulté à formuler sa réclamation par
            écrit peut la transmettre oralement au {CONTACT.phoneDisplay} : la mise en forme écrite est assurée
            par l&apos;organisme et soumise à sa validation.{' '}
            <Link href={LINKS.accessibiliteHandicap} className="font-medium text-[#377CF3] hover:underline">
              Page Accessibilité &amp; handicap
            </Link>
            .
          </p>
        </section>
      </article>

      {/* Pied de page */}
      <footer className="mt-16 border-t border-[#377CF3]/20 pt-8 text-center">
        <p className="text-sm text-[#1A1A1A]/80">Procédure version 8 — mise à jour le 24/08/2026</p>
        <a
          href={LINKS.procedureReclamationsPdf}
          className="mt-4 inline-flex items-center gap-2 font-semibold text-[#377CF3] hover:underline"
          download
        >
          <FileDown className="h-5 w-5" aria-hidden />
          Télécharger la procédure complète (PDF)
        </a>
      </footer>
    </div>
  );
}
